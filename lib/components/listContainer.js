"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _helpers = require("../ulits/helpers");

var ListContainer = function ListContainer(props) {
  var listTagName = props.listTagName,
      data = props.data,
      itemRender = props.itemRender,
      beforeRenderList = props.beforeRenderList,
      emptyListContent = props.emptyListContent,
      children = props.children,
      childrenBeforeList = props.childrenBeforeList,
      listClassName = props.listClassName,
      listContainerProps = (0, _objectWithoutProperties2["default"])(props, ["listTagName", "data", "itemRender", "beforeRenderList", "emptyListContent", "children", "childrenBeforeList", "listClassName"]),
      ListTag = listTagName,
      childrenContent = _react["default"].createElement(_react.Fragment, {
    key: "contents-children"
  }, children),
      listContent = _react["default"].createElement(_react.Fragment, {
    key: "contents-the-list"
  }, _react["default"].createElement("div", listContainerProps, _react["default"].createElement(ListTag, {
    className: listClassName + (data.length ? '' : ' no-result')
  }, data.length ? data.map(function (itemData, index) {
    return itemRender(index, itemData);
  }) : (0, _helpers.renderContentHelper)(emptyListContent))));

  return childrenBeforeList ? [childrenContent, listContent] : [listContent, childrenContent];
};

ListContainer.defaultProps = {
  listTagName: 'ul',
  childrenBeforeList: false,
  listClassName: 'list-group'
};
ListContainer.propsTypes = {
  listTagName: _propTypes["default"].string,
  listClassName: _propTypes["default"].string,
  data: _propTypes["default"].array.isRequired,
  itemRender: _propTypes["default"].func.isRequired,
  emptyListContent: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func, _propTypes["default"].instanceOf(Element)]),
  childrenBeforeList: _propTypes["default"].bool
};
var _default = ListContainer;
exports["default"] = _default;