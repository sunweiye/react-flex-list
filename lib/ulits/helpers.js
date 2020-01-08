"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderContentHelper = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var renderContentHelper = function renderContentHelper(contentRender) {
  switch ((0, _typeof2["default"])(contentRender)) {
    case "function":
      return contentRender();

    case "string":
      return _react["default"].createElement("div", {
        dangerouslySetInnerHTML: {
          __html: contentRender
        }
      });

    case "object":
      return contentRender instanceof Element ? _react["default"].createElement("div", {
        dangerouslySetInnerHTML: {
          __html: contentRender.outerHTML
        }
      }) : contentRender;

    case "undefined":
      return '';

    default:
      return contentRender;
  }
};

exports.renderContentHelper = renderContentHelper;