import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import getRepository from '../ulits/repository';
import {PouchDBQuery} from '../ulits/pouchDBQuery';
import {generateDocIdByTime} from '../ulits/preProcessors';
import ListContainer from './listContainer';
import SearchForm from "./searchForm";
import ReactPaginate from "react-paginate";
import {renderContentHelper} from "../ulits/helpers";

class StandardList extends Component {
    static calculatePageCount(total, pageSize) {
        return Math.ceil(total / pageSize)
    }

    _data = [];
    _repository = getRepository();
    _renderProps = {};
    _searchForm = null;
    _defaultRenderOrder = ['form', 'list', 'info', 'pagination', 'children'];
    _initializationContent = '';
    _afterSearchAction = docs => docs;

    state = {
        query: null,
        totalResults: 0,
        currentPage: 0,
        pageSize: this.props.pageSize,
        pageCount: 0,
        shownData: [],
        initialized: false
    };

    constructor(props) {
        super(props);
        this._preProcess();
    }

    async componentDidMount() {
        await this._repository.insertRows(this._data)
            .then((result => {
                // Release the memory of list data
                delete this._data;
                return result;
            }));
        await this._repository.createIndex(this.props.indexFields);
        this._handleSearch(this.props.searchForm.formData).then(
            () => typeof this.props.afterInitialized === 'function' ? this.props.afterInitialized() : ''
        );
    }

    //TODO: Enable set the id field
    _preProcess = () => {
        const {
                data,
                itemPreprocessor,
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
                afterInitialized,
                beforeSearch,
                afterSearch,
                resultInfoRender,
                initializationRender,
                afterPageChanged,
                renderOrder,
                ...containerProps
            } = this.props,
            processors = [generateDocIdByTime, ...(typeof itemPreprocessor === 'function' ? [itemPreprocessor] : [])];

        Object.defineProperties(this, {
            _renderProps: {
                value: {
                    containerProps,
                    itemRender,
                    listContainerSettings,
                    resultInfoRender,
                    renderOrder
                },
                writable: false
            }
        });

        for (let itemKey in data) {
            for (let processor of processors) {
                processor(data[itemKey], itemKey);
            }
        }

        this._data = data;
        this._initializationContent = renderContentHelper(initializationRender);
        if (typeof afterSearch === 'function') {
            this._afterSearchAction = afterSearch;
        }
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
        if(fieldDef.length) {
            return {[fieldDef.replace(/->/g, '.')]: {[operator]: userValue}};
        }

        return operator === '$regex' ? {$regex: userValue} : userValue;
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

        const {total_rows, docs} = await this._executeQuery(query, true),
            {pageSize, initialized} = this.state;

        this.setState({
            initialized: true | initialized,
            totalResults: total_rows,
            pageCount: StandardList.calculatePageCount(total_rows, pageSize),
            shownData: this._afterSearchAction(docs),
            currentPage: 0,
            query
        });
    };

    _handlePageClick = ({selected}) => {
        const {query} = this.state;
        query.skip(selected * this.state.pageSize);
        this._executeQuery(query).then(({docs}) => this.setState({
            shownData: this._afterSearchAction(docs),
            currentPage: selected
        }));
        if (typeof this.props.afterPageChanged === 'function') {
            this.props.afterPageChanged(selected);
        }
    };

    _executeQuery = async (query, withTotalCount = false) => {
        return this._repository.search(query, withTotalCount);
    };

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
        const {totalResults, shownData, pageCount, pageSize, currentPage} = this.state,
            {containerProps, itemRender, listContainerSettings, renderOrder} = this._renderProps;
        let listContainerProps = {itemRender, ...listContainerSettings},
            customRenderOrder = renderOrder.filter((element) => this._defaultRenderOrder.includes(element)),
            restDefaultOrder = this._defaultRenderOrder.filter((element) => !customRenderOrder.includes(element)),
            renderElements = {
                form: isEmpty(this.props.searchForm) ? '' : this._renderSearchForm(),
                list: <ListContainer data={shownData} {...listContainerProps}/>,
                info: typeof this.props.resultInfoRender === 'function' ? this.props.resultInfoRender({totalResults, shownData, pageCount, pageSize, currentPage}) : '',
                pagination: pageCount > 1 ? this._renderPagination() : '',
                children: this.props.children ? this.props.children : ''
            };

        return (
            <div {...containerProps}>
                {[...customRenderOrder, ...restDefaultOrder].map(
                    elementKey => <Fragment key={`content-${elementKey}`}>{renderElements[elementKey]}</Fragment>
                )}
            </div>
        );
    }

    render() {
        return this.state.initialized ? this._renderContent() : this._initializationContent;
    }

    reset = (formData = {}) => {
        this._searchForm.resetFormData(formData);
    };
}

StandardList.defaultProps = {
    listContainerSettings: {},
    searchForm: {},
    paginationSettings: {},
    pageSize: 10,
    indexFields: [],
    textSearchFieldName: '_q',
    sortFieldName: '_sort',
    searchTextInFields: [],
    filtersFieldsMap: {},
    renderOrder: []
};

StandardList.propsTypes = {
    data: PropTypes.array.isRequired,
    itemPreprocessor: PropTypes.func,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number.isRequired,
    paginationSettings: PropTypes.object,
    initializationRender: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.instanceOf(Element)
    ]),
    resultInfoRender: PropTypes.func,
    itemRender: PropTypes.func.isRequired,
    afterInitialized: PropTypes.func,
    beforeSearch: PropTypes.func,
    afterSearch: PropTypes.func,
    afterPageChanged: PropTypes.func,
    indexFields: PropTypes.array,
    textSearchFieldName: PropTypes.string,
    sortFieldName: PropTypes.string,
    searchTextInFields: PropTypes.array,
    filtersFieldsMap: PropTypes.object,
    renderOrder: PropTypes.array
};

export default StandardList
