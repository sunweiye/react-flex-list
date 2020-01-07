import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import ListContainer from './listContainer';
import SearchForm from "./searchForm";
import isEmpty from "lodash/isEmpty";
import {generateDocIdByTime} from "../ulits/preProcessors";

const SearchFormSettings = {
    searchOnChange: false
};

class SimpleList extends Component {
    static getDerivedStateFromProps(props, state) {
        const {listData, ...otherStates} = state,
            {pageSize, children, renderOrder} = props;

        return {
            listData: props.listData.slice(0, pageSize),
            pageSize,
            pageCount: 0 | (isEmpty(props.paginationSettings) ? 0 : props.paginationSettings.pageCount),
            children: children,
            renderOrder
        };
    }

    state = {
        listData: [],
        pageCount: 0,
        pageSize: this.props.pageSize,
        children: this.props.children,
        renderOrder: this.props.renderOrder
    };

    _defaultRenderOrder = ['form', 'list', 'info', 'pagination', 'children'];

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
            resultInfoRender,
            handelSearch,
            handelPageChange,
            renderOrder,
            ...containerProps
        } = this.props;

        Object.defineProperties(this, {
            _renderProps: {
                value: {
                    containerProps,
                    itemRender,
                    listContainerSettings,
                    resultInfoRender
                },
                writable: false
            }
        });
    };


    _handlePageClick = async ({selected}) => {
        this.setState({
                paginationSettings: {...this.state.paginationSettings, initialPage: selected}
            }
        );
    };

    _renderSearchForm() {
        const {disabled, ...formProps} = this.props.searchForm;
        return isEmpty(formProps) || disabled ? '' : <SearchForm
            {...formProps} onSearch={this.props.handelSearch} ref={searchForm => this._searchForm = searchForm}
        />;
    };

    _renderPagination = () => {
        const {className, ...paginationSettings} = this.props.paginationSettings,
            {currentPage} = this.state;
        if (currentPage === 0) {
            paginationSettings.forcePage = currentPage;
        }
        return <nav className={className}>
            <ReactPaginate onPageChange={this._handlePageClick} {...paginationSettings}/>
        </nav>;
    };

    render() {
        const {listData, pageCount, pageSize, children, renderOrder} = this.state,
            {containerProps, itemRender, listContainerSettings} = this._renderProps;
        let listContainerProps = {itemRender, ...listContainerSettings},
            customRenderOrder = renderOrder.filter((element) => this._defaultRenderOrder.includes(element)),
            restDefaultOrder = this._defaultRenderOrder.filter((element) => !customRenderOrder.includes(element)),
            renderElements = {
                form: isEmpty(this.props.searchForm) ? '' : this._renderSearchForm(),
                list: <ListContainer data={listData} {...listContainerProps}/>,
                info: typeof this.props.resultInfoRender === 'function' ? this.props.resultInfoRender({pageCount, pageSize}) : '',
                pagination: pageCount > 1 ? this._renderPagination() : '',
                children
            };

        return (
            <div {...containerProps}>
                {[...customRenderOrder, ...restDefaultOrder].map(
                    elementKey => <Fragment key={`content-${elementKey}`}>{renderElements[elementKey]}</Fragment>
                )}
            </div>
        );
    }
}


SimpleList.defaultProps = {
    listContainerSettings: {},
    searchForm: {},
    paginationSettings: {},
    renderOrder: []
};

SimpleList.propsTypes = {
    listData: PropTypes.array.isRequired,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number.isRequired,
    paginationSettings: PropTypes.object,
    initializationRender: PropTypes.func,
    resultInfoRender: PropTypes.func,
    itemRender: PropTypes.func.isRequired,
    beforeRenderList: PropTypes.func,
    handelSearch: (props, propName, componentName) => {
        if(!isEmpty(props.searchForm) && !props.searchForm.disabled && typeof props[propName] !== 'function'){
            throw new Error('Please provide a handelSearch function!');
        }
    },
    handelPageChange: PropTypes.func.isRequired,
    renderOrder: PropTypes.array
};

export default SimpleList;
