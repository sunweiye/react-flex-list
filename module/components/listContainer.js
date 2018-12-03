var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

var ListContainer = function (_Component) {
    _inherits(ListContainer, _Component);

    function ListContainer() {
        _classCallCheck(this, ListContainer);

        return _possibleConstructorReturn(this, (ListContainer.__proto__ || Object.getPrototypeOf(ListContainer)).apply(this, arguments));
    }

    _createClass(ListContainer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                listTagName = _props.listTagName,
                data = _props.data,
                renderItem = _props.renderItem,
                onListRender = _props.onListRender,
                emptyListContent = _props.emptyListContent,
                children = _props.children,
                childrenBeforeList = _props.childrenBeforeList,
                listClassName = _props.listClassName,
                listContainerProps = _objectWithoutProperties(_props, ['listTagName', 'data', 'renderItem', 'onListRender', 'emptyListContent', 'children', 'childrenBeforeList', 'listClassName']);

            var ListTag = listTagName;
            return React.createElement(
                Fragment,
                null,
                childrenBeforeList ? children : '',
                React.createElement(
                    'div',
                    listContainerProps,
                    React.createElement(
                        ListTag,
                        { className: listClassName },
                        data.length ? onListRender(data).map(function (itemData, index) {
                            return renderItem(index, itemData);
                        }) : emptyListContent
                    )
                ),
                !childrenBeforeList ? children : ''
            );
        }
    }]);

    return ListContainer;
}(Component);

ListContainer.defaultProps = {
    listTagName: 'ul',
    data: [],
    renderItem: function renderItem(index, itemData) {
        return React.createElement(
            'div',
            { key: index },
            itemData instanceof Object ? JSON.stringify(itemData) : itemData
        );
    },
    onListRender: function onListRender(data) {
        return data;
    },
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