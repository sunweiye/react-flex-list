import React, {Component} from 'react';
import PropTypes from "prop-types";
import AbstractFlexList from './abstractFlexList';
import ListContainer from './components/listContainer';

class SimpleFlexList extends AbstractFlexList {
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

    render() {
        const {listData, listDataItemPreprocessor, renderItem, searchForm, searchTextFields, filtersFieldsMap, filtersVisibilityOnSearch, pageSize, paginationSettings, listContainerSettings, onListRender, asyncDataLoader, ...containerProps} = this.props;
        const {currentListData, currentPage} = this.state;
        return (
            <div {...containerProps}>
                {this._renderSearchForm()}
                <ListContainer
                    data={currentListData}
                    renderItem={renderItem}
                    onListRender={onListRender}
                    {...listContainerSettings}
                />
                {this._renderPagination()}
            </div>
        );
    }
}

SimpleFlexList.propsTypes = {
    asyncDataLoader: PropTypes.func.isRequired
};

export default SimpleFlexList;
