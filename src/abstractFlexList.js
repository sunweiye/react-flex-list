import React, {Component} from 'react';
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';
import SearchForm from './components/searchForm';
import ListContainer from './components/listContainer';
import Utility from "./ulits/utility";

const SearchFormSettings = {
    searchOnChange: false
};

class AbstractFlexList extends Component {
    static getDerivedStateFromProps(props, state) {
        const {listData, listDataItemPreprocessor, ...otherProps} = props;
        if (listData !== state.previousPropsListData) {
            return {
                currentListData: AbstractFlexList.preProcessListData(listData, listDataItemPreprocessor),
                previousPropsListData: listData,
                ...otherProps
            }
        } else {
            const {currentListData, ...otherStates} = state;
            return {
                currentListData: AbstractFlexList.preProcessListData(currentListData, listDataItemPreprocessor),
                ...otherStates
            }
        }
    }

    static preProcessListData(listData, listDataItemPreprocessor) {
        if (!Utility.isEmpty(listDataItemPreprocessor)) {
            for (let item of listData) {
                listDataItemPreprocessor(item);
            }
        }

        return listData;
    }

    state = {};

    _handleResetAction = () => {
        throw new Error('The handle reset action must be implemented.');
    };

    _handleSearch = () => {
        throw new Error('The handle search action must be implemented.');
    };

    _handlePageClick = () => {
        throw new Error('The handle pagination action must be implemented.');
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

        return <SearchForm {...searchFormProps} ref={searchForm => this.searchForm = searchForm} />;
    }

    _renderPagination() {
        if (this.state.paginationSettings.pageCount > 1) {
            const {className, ...paginationSettings} = this.state.paginationSettings;
            let paginationProps = {
                ...paginationSettings,
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
        throw new Error('This method should never be called.');
    }
}

AbstractFlexList.defaultProps = {
    searchForm: SearchFormSettings,
    searchTextFields: [],
    filtersFieldsMap: [],
    filtersVisibilityOnSearch: {},
    listContainerSettings: {},
    pageSize: 10,
    paginationSettings: {}
};

AbstractFlexList.propsTypes = {
    listData: PropTypes.array.isRequired,
    listDataItemPreprocessor: PropTypes.func,
    searchTextFields: PropTypes.array,
    filtersFieldsMap: PropTypes.array,
    filtersVisibilityOnSearch: PropTypes.object,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number,
    paginationSettings: PropTypes.object,
    onListRender: PropTypes.func,
    renderItem: PropTypes.func,
    beforeSearch: PropTypes.func,
    afterSearch: PropTypes.func
};

export default AbstractFlexList;
