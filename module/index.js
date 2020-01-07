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

var _standardList = _interopRequireDefault(require("./components/standardList"));

var _asyncList = _interopRequireDefault(require("./components/asyncList"));

var _simpleList = _interopRequireDefault(require("./components/simpleList"));

var ListTypes = {
  'standard': _standardList["default"],
  'async': _asyncList["default"],
  'simple': _simpleList["default"]
};

var FlexList = _react["default"].forwardRef(function (props, ref) {
  var type = props.type,
      listProps = (0, _objectWithoutProperties2["default"])(props, ["type"]);
  listProps.ref = ref;
  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(ListTypes[type] ? ListTypes[type] : ListTypes.standard, listProps));
});

FlexList.propsTypes = {
  type: _propTypes["default"].string
};
FlexList.defaultProps = {
  type: 'standard'
};
var _default = FlexList;
exports["default"] = _default;