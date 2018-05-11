import React, {Component} from 'react';
import PropTypes from "prop-types";

class ListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data, renderItem, onListRender, ...listContainerProps} = this.props;
        return (
            <div {...listContainerProps}>
                {onListRender(data).map((itemData, index) => renderItem(index, itemData))}
            </div>
        );
    }
}

ListContainer.defaultProps = {
    data: [],
    renderItem: (index, itemData) => <div key={index}>{itemData instanceof Object ? JSON.stringify(itemData) : itemData}</div>,
    onListRender: (data) => data
};

ListContainer.propsTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.func,
    onListRender: PropTypes.func
};

export default ListContainer;
