import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import ListContainer from './listContainer';
import SearchForm from "./searchForm";
import isEmpty from "lodash/isEmpty";

class SimpleList extends Component {
    static getDerivedStateFromProps(props, state) {
        const {data, pageSize, children} = props;

        return {
            data: props.data.slice(0, pageSize),
            pageSize,
            pageCount: 0 | (isEmpty(props.paginationSettings) ? 0 : props.paginationSettings.pageCount),
            children: children
        };
    }

    state = {
        listData: [],
        pageCount: 0,
        pageSize: this.props.pageSize,
        children: this.props.children
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
                    resultInfoRender,
                    renderOrder
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
        const {listData, pageCount, pageSize, children} = this.state,
            {containerProps, itemRender, listContainerSettings, renderOrder} = this._renderProps;
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
    data: PropTypes.array.isRequired,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number.isRequired,
    paginationSettings: PropTypes.object,
    initializationRender: PropTypes.func,
    resultInfoRender: PropTypes.func,
    itemRender: PropTypes.func.isRequired,
    handelSearch: (props, propName, componentName) => {
        if(!isEmpty(props.searchForm) && !props.searchForm.disabled && typeof props[propName] !== 'function'){
            throw new Error('Please provide a handelSearch function!');
        }
    },
    renderOrder: PropTypes.array
};

export default SimpleList;
