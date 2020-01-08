import React, {Fragment} from 'react';
import PropTypes from "prop-types";

import {renderContentHelper} from "../ulits/helpers";

const ListContainer = (props) => {
    const {listTagName, data, itemRender, beforeRenderList, emptyListContent, children, childrenBeforeList, listClassName, ...listContainerProps} = props,
        ListTag = listTagName,
        childrenContent = <Fragment key='contents-children'>{children}</Fragment>,
        listContent = <Fragment key='contents-the-list'>
            <div {...listContainerProps}>
                <ListTag className={listClassName}>
                    {data.length ?
                        data.map((itemData, index) => itemRender(index, itemData)) :
                        renderContentHelper(emptyListContent)
                    }
                </ListTag>
            </div>
        </Fragment>;
    return childrenBeforeList ? [childrenContent, listContent] : [listContent, childrenContent];
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
