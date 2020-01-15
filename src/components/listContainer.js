import React, {Fragment} from 'react';
import PropTypes from "prop-types";

import {renderContentHelper} from "../ulits/helpers";

const ListContainer = (props) => {
    const {listTagName, data, itemRender, emptyListContent, children, childrenBeforeList, listClassName, ...listContainerProps} = props,
        ListTag = listTagName,
        childrenContent = <Fragment key='cc'>{children}</Fragment>,
        listContent = <Fragment key='lc'>
            <ListTag className={listClassName + (data.length ? '' : ' no-result')}>
                {data.length ?
                    data.map((itemData, index) => itemRender(index, itemData)) :
                    renderContentHelper(emptyListContent)
                }
            </ListTag>
        </Fragment>;
    return <div {...listContainerProps}>{childrenBeforeList ? [childrenContent, listContent] : [listContent, childrenContent]}</div>;
};

ListContainer.defaultProps = {
    listTagName: 'ul',
    childrenBeforeList: false,
    listClassName: 'list-group'
};

ListContainer.propsTypes = {
    listTagName: PropTypes.string,
    listClassName: PropTypes.string,
    data: PropTypes.array.isRequired,
    itemRender: PropTypes.func.isRequired,
    emptyListContent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.instanceOf(Element)
    ]),
    childrenBeforeList: PropTypes.bool
};

export default ListContainer;
