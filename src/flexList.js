import React, {Component} from 'react';
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';
import SearchForm from './components/searchForm';
import ListContainer from './components/listContainer';
import {QuerySearch} from './ulits/querySearch';
import Utility from './ulits/utility';

const SearchFormSettings = {
    searchOnChange: false
};

class FlexList extends Component {
    constructor(props) {
        super(props);
        this._fullListPageCount = Math.ceil(this.props.listData.length / this.props.pageSize);
        this.state = {
            currentListData: this.props.listData,
            pageCount: this._fullListPageCount,
            currentPage: 0
        }
    }

    _buildFilterCondition = (key, value) => {
        const {filtersFieldsMap} = this.props;
        if(typeof value === 'string') {
            value = '"' + value + '"';
        }

        if(filtersFieldsMap.hasOwnProperty(key)) {
            if (typeof filtersFieldsMap[key] === 'string') {
                key = filtersFieldsMap[key];
            } else {
                key = Utility.isEmpty(filtersFieldsMap[key].name) ? key : filtersFieldsMap[key].name;
                if(filtersFieldsMap[key].hasMultiValues) {
                    return value + ' = ANY (' + key +')';
                }
            }
        }

        return (key + ' = ' + value);
    };

    _handleSearch = (formData) => {
        const {_q, ...filters} = formData;

        let results,
            resetAll = true,
            searchKeywords = '',
            queryKeywordsConditions = '',
            queryFiltersConditions = [],
            resultsPageCount;

        if (_q !== '') {
            resetAll = false;
            searchKeywords = _q.split(' ').map((keyword) => keyword.trim());
            queryKeywordsConditions = this.props.searchTextFields.map((field) => searchKeywords.map(
                (searchKeyword) => `${field} LIKE "%${searchKeyword}%"`).join(' OR ')).join(' OR ');
        }

        for (let filterKey in filters) {
            if(!Utility.isEmpty(filters[filterKey])) {
                resetAll = false;
                queryFiltersConditions.push(this._buildFilterCondition(filterKey, filters[filterKey]));
            }
        }

        if (resetAll) {
            results = this.props.listData;
            resultsPageCount = this._fullListPageCount;
        } else {
            let queryWhere = queryFiltersConditions.join(' AND ');
            if(searchKeywords.length) {
                queryWhere = queryWhere + (queryWhere.length ? ' AND ' : '') + '(' + queryKeywordsConditions + ')';
            }

            results = new QuerySearch()
                .from(this.props.listData)
                .where(queryWhere)
                .execute();
            resultsPageCount = Math.ceil(results.length / this.props.pageSize);
        }

        this.setState({
            currentListData: results,
            pageCount: resultsPageCount,
            currentPage: 0
        });
    };

    _handlePageClick = ({selected}) => {
        this.setState({currentPage: selected});
    };

    _renderSearchForm() {
        if (this.props.searchForm.disable) {
            return '';
        }

        const searchFormProps = {
            ...SearchFormSettings,
            ...this.props.searchForm,
            onSearch: this._handleSearch
        };

        return <SearchForm {...searchFormProps} />;
    }

    _renderPagination() {
        if (this.state.pageCount > 1) {
            const {className, ...paginationSettings} = this.props.paginationSettings;
            let paginationProps = {
                ...paginationSettings,
                pageCount: this.state.pageCount,
                onPageChange: this._handlePageClick
            };
            return <nav className={className}>
                <ReactPaginate {...paginationProps}/>
            </nav>;
        } else {
            return '';
        }
    }

    render() {
        const {listData, renderItem, searchForm, searchTextFields, filtersFieldsMap, pageSize, paginationSettings, listContainerSettings, onListRender, ...containerProps} = this.props;
        const {currentListData, currentPage} = this.state;
        return (
            <div {...containerProps}>
                {this._renderSearchForm()}
                <ListContainer
                    data={currentListData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)}
                    renderItem={renderItem}
                    onListRender={onListRender}
                    {...listContainerSettings}
                />
                {this._renderPagination()}
            </div>
        );
    }
}

FlexList.defaultProps = {
    searchForm: SearchFormSettings,
    searchTextFields: [],
    filtersFieldsMap: [],
    listContainerSettings: {},
    pageSize: 10,
    paginationSettings: {}
};

FlexList.propsTypes = {
    listData: PropTypes.array,
    searchTextFields: PropTypes.array,
    filtersFieldsMap: PropTypes.array,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number,
    paginationSettings: PropTypes.object,
    onListRender: PropTypes.func,
    renderItem: PropTypes.func
};

export default FlexList
