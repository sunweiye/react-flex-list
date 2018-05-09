import React, {Component} from 'react';
import PropTypes from "prop-types";

class ListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data, renderItem, ...listContainerProps} = this.props;
        return (
            <div {...listContainerProps}>
                {data.map((itemData, index) => renderItem(index, itemData))}
            </div>
        );
    }
}

ListContainer.defaultProps = {
    data: [],
    renderItem: (index, itemData) => <div key={index}>{itemData instanceof Object ? JSON.stringify(itemData) : itemData}</div>
}

ListContainer.propsTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.func
};

export default ListContainer;
