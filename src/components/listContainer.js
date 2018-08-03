import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";

class ListContainer extends Component {
    render() {
        const {listTagName, data, renderItem, onListRender, emptyListContent, children, childrenBeforeList, listClassName, ...listContainerProps} = this.props;
        const ListTag = listTagName;
        return (
            <Fragment>
                {childrenBeforeList ? children : ''}
                <div {...listContainerProps}>
                    <ListTag className={listClassName}>{data.length ? onListRender(data).map((itemData, index) => renderItem(index, itemData)) : emptyListContent}</ListTag>
                </div>
                {!childrenBeforeList ? children : ''}
            </Fragment>
        );
    }
}

ListContainer.defaultProps = {
    listTagName: 'ul',
    data: [],
    renderItem: (index, itemData) => <div key={index}>{itemData instanceof Object ? JSON.stringify(itemData) : itemData}</div>,
    onListRender: (data) => data,
    childrenBeforeList: false,
    listClassName: 'list-group'
};

ListContainer.propsTypes = {
    listTagName: PropTypes.string,
    data: PropTypes.array,
    renderItem: PropTypes.func,
    onListRender: PropTypes.func,
    emptyListContent: PropTypes.func,
    childrenBeforeList: PropTypes.bool,
    listClassName: PropTypes.string
};

export default ListContainer;
