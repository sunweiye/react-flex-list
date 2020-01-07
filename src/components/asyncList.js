import React, {Component} from 'react';
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import ListContainer from './listContainer';
import SearchForm from "./searchForm";
import isEmpty from "lodash/isEmpty";

const SearchFormSettings = {
    searchOnChange: false
};

class AsyncList extends Component {
    static getDerivedStateFromProps(props, state) {
        const {listData, listDataItemPreprocessor, ...otherProps} = props;

        let pageSize = props.pageSize === state.previousPropsListData ? state.pageSize : props.pageSize;

        if (listData !== state.previousPropsListData) {
            return {
                currentListData: AsyncList.preProcessListData(listData.slice(0, pageSize), listDataItemPreprocessor),
                previousPropsListData: listData,
                ...otherProps
            }
        } else {
            const {currentListData, ...otherStates} = state;
            return {
                currentListData: AsyncList.preProcessListData(currentListData.slice(0, pageSize), listDataItemPreprocessor),
                ...otherStates
            }
        }
    }

    static preProcessListData(listData, listDataItemPreprocessor) {
        if (isEmpty(listData)) {
            return [];
        }
        if (typeof listDataItemPreprocessor === 'function') {
            for (let item of listData) {
                listDataItemPreprocessor(item);
            }
        }

        return listData;
    }

    state = {
        currentListData: [],
        pageCount: 0,
        pageSize: this.props.pageSize,
        previousPropsListData: [],
        previousPropsPageSize: this.props.pageSize
    };

    constructor(props) {
        super(props);
        this._preProcess();
    }

    _preProcess = () => {
        const {
            listData,
            listDataItemPreprocessor,
            itemRender,
            searchForm,
            pageSize,
            paginationSettings,
            listContainerSettings,
            beforeRenderList,
            beforeSearch,
            afterSearch,
            resultInfoRender,
            afterPageChanged,
            asyncDataLoader,
            ...containerProps
        } = this.props;

        Object.defineProperties(this, {
            _renderProps: {
                value: {
                    containerProps,
                    itemRender,
                    beforeRenderList,
                    listContainerSettings,
                    resultInfoRender
                },
                writable: false
            }
        });
    };


    _handlePageClick = async ({selected}) => {
        let paginationProps = {...this.state.paginationSettings},
            listData = await this.props.asyncDataLoader(selected);
        paginationProps.initialPage = selected;

        this.setState({
                currentListData: listData,
                paginationSettings: paginationProps
            }
        );
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

    render() {
        const {currentListData, pageCount, pageSize} = this.state,
            {containerProps, itemRender, beforeRenderList, listContainerSettings} = this._renderProps;
        let listContainerProps = {itemRender, beforeRenderList, ...listContainerSettings};
        return (
            <div {...containerProps}>
                {isEmpty(this.props.searchForm) ? '' : this._renderSearchForm()}
                <ListContainer data={currentListData} {...listContainerProps}/>
                {typeof this.props.resultInfoRender === 'function' ? this.props.resultInfoRender({currentListData, pageCount, pageSize}) : ''}
                {pageCount > 1 ? this._renderPagination() : ''}
            </div>
        );
    }
}


AsyncList.defaultProps = {
    listContainerSettings: {},
    searchForm: {},
    paginationSettings: {},
    pageSize: 10
};

AsyncList.propsTypes = {
    listData: PropTypes.array.isRequired,
    listDataItemPreprocessor: PropTypes.func,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number.isRequired,
    paginationSettings: PropTypes.object,
    initializationRender: PropTypes.func,
    resultInfoRender: PropTypes.func,
    itemRender: PropTypes.func.isRequired,
    beforeRenderList: PropTypes.func,
    beforeSearch: PropTypes.func,
    afterSearch: PropTypes.func,
    afterPageChanged: PropTypes.func,
    asyncDataLoader: PropTypes.func.isRequired
};

export default AsyncList;
