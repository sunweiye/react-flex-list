import React, {Component} from 'react';
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';
import SearchForm from './components/searchForm';
import ListContainer from './components/listContainer';
import {QuerySearch} from './ulits/querySearch';

const SearchFormSettings = {
    searchOnChange: false
};

class FlexList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentListData: this.props.listData,
            pageCount: Math.ceil(this.props.listData.length / this.props.pageSize),
            formData: this.props.searchForm.formData,
            currentPage: 0
        }
    }

    _handleSearch = ({formData}) => {
        const {_q, ...filters} = formData;
        let results;
        if(typeof _q === 'undefined' || _q.trim().length === 0) {
            results = this.props.listData;
        } else {
            let searchKeywords = _q.trim().split(' ').map((keyword) => keyword.trim()),
                queryConditions = this.props.searchTextFields.map((field) => searchKeywords.map(
                    (searchKeyword) => `${field} LIKE "%${searchKeyword}%"`).join(' OR ')).join(' OR ');
            results = new QuerySearch()
                .from(this.props.listData)
                .where(queryConditions)
                .execute();
        }

        this.setState({
            currentListData: results,
            formData: formData,
            pageCount: Math.ceil(results.length / this.props.pageSize),
        });
    };

    _handlePageClick = ({selected}) => {
        this.setState({currentPage: selected});
    };

    _renderSearchForm() {
        if(this.props.searchForm.disable) {
            return '';
        }

        const searchFormProps = {
            ...SearchFormSettings,
            ...this.props.searchForm,
            formData: this.state.formData,
            onSubmit: this._handleSearch
        };
        if (this.props.searchForm.searchOnChange) {
            searchFormProps.onChange = this._handleSearch;
        }

        return <SearchForm {...searchFormProps} />;
    }

    _renderPagination() {
        if (this.state.pageCount > 1) {
            return <ReactPaginate previousLabel={"previous"}
                                  nextLabel={"next"}
                                  breakLabel={<a href="">...</a>}
                                  breakClassName={"break-me"}
                                  pageCount={this.state.pageCount}
                                  marginPagesDisplayed={2}
                                  pageRangeDisplayed={5}
                                  onPageChange={this._handlePageClick}
                                  containerClassName={"pagination"}
                                  subContainerClassName={"pages pagination"}
                                  activeClassName={"active"}/>;
        } else {
            return '';
        }
    }

    render() {
        const {listData, renderItem, searchForm, searchTextFields, pageSize, listContainerSettings, onListRender, ...containerProps} = this.props;
        const {currentListData, currentPage} = this.state;
        return (
            <div {...containerProps}>
                {this._renderSearchForm()}
                <ListContainer
                    data={currentListData.slice(currentPage * pageSize, (currentPage + 1) * pageSize )}
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
    listContainerSettings: {},
    pageSize: 10
};

FlexList.propsTypes = {
    listData: PropTypes.array,
    searchTextFields: PropTypes.array,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number,
    onListRender: PropTypes.func,
    renderItem: PropTypes.func
};

export default FlexList
