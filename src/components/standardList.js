import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import getRepository from '../ulits/repository';
import {PouchDBQuery} from '../ulits/pouchDBQuery';
import {generateDocIdByTime} from '../ulits/preProcessors';
import ListContainer from './listContainer';
import SearchForm from "./searchForm";
import ReactPaginate from "react-paginate";

class StandardList extends Component {
    static calculatePageCount(total, pageSize) {
        return Math.ceil(total / pageSize)
    }

    _listData = [];
    _repository = getRepository();
    _renderProps = {};
    _searchForm = null;

    constructor(props) {
        super(props);
        this._preProcess();

        this.state = {
            query: null,
            currentPage: 0,
            pageSize: this.props.pageSize,
            currentListData: [],
            initialized: typeof this.props.initializationRender !== 'function'
        }
    }

    //TODO: Enable set the id field
    _preProcess = () => {
        const {
                listData,
                listDataItemPreprocessor,
                itemRender,
                searchForm,
                indexFields,
                textSearchFieldName,
                sortFieldName,
                searchTextInFields,
                filtersFieldsMap,
                filtersVisibilityOnSearch,
                pageSize,
                paginationSettings,
                listContainerSettings,
                beforeRenderList,
                beforeSearch,
                afterSearch,
                resultsCountRender,
                afterPageChanged,
                ...containerProps
            } = this.props,
            processors = [generateDocIdByTime, ...(typeof listDataItemPreprocessor === 'function' ? [listDataItemPreprocessor] : [])];

        if (typeof itemRender !== 'function') {
            // TODO: Message only be shown in development mode
            console.error('The `itemRender` props is not given.');
        }

        Object.defineProperties(this, {
            _renderProps: {
                value: {
                    containerProps,
                    itemRender,
                    beforeRenderList,
                    listContainerSettings,
                    resultsCountRender
                },
                writable: false
            }
        });

        for (let itemKey in listData) {
            for (let processor of processors) {
                processor(listData[itemKey], itemKey);
            }
        }

        this._listData = listData;
    };

    _buildFieldQuery = (fieldDef, operator, userValue) => {
        let arrayConfigFlagPosition = fieldDef.indexOf('[]');
        if (arrayConfigFlagPosition !== -1) {
            return {
                [fieldDef.substring(0, arrayConfigFlagPosition)]: {
                    $elemMatch: this._buildFieldQuery(fieldDef.substring(arrayConfigFlagPosition + 4), operator, userValue)
                }
            };
        }
        return {[fieldDef.replace(/->/g, '.')]: {[operator]: userValue}};
    };

    _handleSearch = async (formData) => {
        const query = new PouchDBQuery(),
            {indexFields, textSearchFieldName, sortFieldName, searchTextInFields, filtersFieldsMap, beforeSearch, afterSearch} = this.props;
        let formDataForSearching = {...formData};
        query.limit(this.state.pageSize);

        if (typeof beforeSearch === 'function') {
            formDataForSearching = beforeSearch(formDataForSearching);
        }

        if (!isEmpty(formDataForSearching)) {
            for (let fieldKey of Object.keys(formDataForSearching)) {
                let fieldValue = formDataForSearching[fieldKey];

                if (fieldKey === textSearchFieldName && typeof fieldValue === 'string' && !isEmpty(searchTextInFields)) {
                    fieldValue = fieldValue.trim();
                    if (!isEmpty(fieldValue)) {
                        let keywordsRegExp = new RegExp(fieldValue.replace(/[\s]+/g, '|'), 'i'),
                            fieldMatchers = searchTextInFields.map(fieldDef => {
                                return this._buildFieldQuery(fieldDef, '$regex', keywordsRegExp);
                            });

                        query.addCondition(null, '$or', fieldMatchers);
                    }
                } else if (fieldKey === sortFieldName) {
                    if(!isEmpty(indexFields)) {
                        typeof fieldValue === 'object' ?
                            Object.entries(fieldValue).map(([sortFieldName, sortFieldValue]) => query.sortBy(sortFieldName, sortFieldValue)) :
                            query.sortBy(fieldKey, fieldValue);
                    }
                } else {
                    if (typeof fieldValue === 'number' || !isEmpty(fieldValue)) {
                        let fieldDef = filtersFieldsMap.hasOwnProperty(fieldKey) ? filtersFieldsMap[fieldKey] : fieldKey,
                            matcher = this._buildFieldQuery(fieldDef, '$eq', fieldValue);
                        query.addSelector(matcher);
                    }
                }
            }
        }

        const {total_rows, docs} = await this._executeQuery(query, true);
        if (typeof afterSearch === 'function') {
            afterSearch(formDataForSearching, docs);
        }

        this.setState({
            resultsCount: total_rows,
            pageCount: StandardList.calculatePageCount(total_rows, this.state.pageSize),
            currentListData: docs,
            currentPage: 0,
            query
        });
    };

    _handlePageClick = ({selected}) => {
        const {query} = this.state;
        query.skip(selected * this.state.pageSize);
        this._executeQuery(query).then(({docs}) => this.setState({
            currentListData: docs,
            currentPage: selected
        }));
        if (typeof this.props.afterPageChanged === 'function') {
            this.props.afterPageChanged(selected);
        }
    };

    _executeQuery = async (query, withTotalCount = false) => {
        return this._repository.search(query, withTotalCount);
    };

    async componentDidMount() {
        await this._repository.insertRows(this._listData)
            .then(() => {
                this._listData = null;
                return this._repository.createIndex(this.props.indexFields);
            });
        this._handleSearch(this.props.searchForm.formData);
        this.setState({initialized: true});
    }

    _renderSearchForm() {
        const {disabled, ...formProps} = this.props.searchForm;
        return isEmpty(formProps) || disabled ? '' : <SearchForm
            {...formProps} onSearch={this._handleSearch} ref={searchForm => this._searchForm = searchForm}
        />;
    };

    _renderPagination = () => {
        const {className, ...paginationSettings} = this.props.paginationSettings,
            {currentPage} = this.state;
        if (currentPage === 0) {
            paginationSettings.forcePage = currentPage;
        }
        return <nav className={className}>
            <ReactPaginate pageCount={this.state.pageCount}
                           onPageChange={this._handlePageClick} {...paginationSettings}/>
        </nav>;
    };

    _renderContent() {
        const {resultsCount, currentListData, pageCount} = this.state,
            {containerProps, itemRender, beforeRenderList, listContainerSettings} = this._renderProps;
        let listContainerProps = {itemRender, beforeRenderList, ...listContainerSettings};
        return (
            <div {...containerProps}>
                {isEmpty(this.props.searchForm) ? '' : this._renderSearchForm()}
                <ListContainer data={currentListData} {...listContainerProps}/>
                {typeof this.props.resultsCountRender === 'function' ? this.props.resultsCountRender(resultsCount) : ''}
                {pageCount > 1 ? this._renderPagination() : ''}
            </div>
        );
    }

    render() {
        return this.state.initialized ? this._renderContent() : this.props.initializationRender();
    }

    reset = (formData = {}) => {
        this._searchForm.resetFormData(formData);
    };
}

StandardList.defaultProps = {
    indexFields: [],
    textSearchFieldName: '_q',
    sortFieldName: '_sort',
    searchTextInFields: [],
    filtersFieldsMap: {},
    listContainerSettings: {},
    pageSize: 10,
    searchForm: {},
    paginationSettings: {}
};

StandardList.propsTypes = {
    listData: PropTypes.array,
    listDataItemPreprocessor: PropTypes.func,
    indexFields: PropTypes.array,
    textSearchFieldName: PropTypes.string,
    sortFieldName: PropTypes.string,
    searchTextInFields: PropTypes.array,
    filtersFieldsMap: PropTypes.object,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number,
    paginationSettings: PropTypes.object,
    initializationRender: PropTypes.func,
    beforeRenderList: PropTypes.func,
    itemRender: PropTypes.func,
    beforeSearch: PropTypes.func,
    afterSearch: PropTypes.func,
    resultsCountRender: PropTypes.func,
    afterPageChanged: PropTypes.func
};

export default StandardList
