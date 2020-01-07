"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PouchDBQuery = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PouchDBQuery =
/*#__PURE__*/
function () {
  function PouchDBQuery() {
    (0, _classCallCheck2["default"])(this, PouchDBQuery);
    (0, _defineProperty2["default"])(this, "_request", {
      selector: {}
    });
  }

  (0, _createClass2["default"])(PouchDBQuery, [{
    key: "addCondition",
    value: function addCondition() {
      var fieldName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var operator = arguments.length > 1 ? arguments[1] : undefined;
      var value = arguments.length > 2 ? arguments[2] : undefined;
      var selector = this._request.selector;
      fieldName ? selector[fieldName] = (0, _defineProperty2["default"])({}, operator, value) : selector[operator] = value;
    }
  }, {
    key: "addSelector",
    value: function addSelector(selectorObj) {
      this._request.selector = _objectSpread({}, this._request.selector, {}, selectorObj);
    }
  }, {
    key: "sortBy",
    value: function sortBy(field) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ASC';
      var fieldSortConfig = (0, _defineProperty2["default"])({}, field, 'desc');
      this._request.sort = (0, _isEmpty["default"])(this._request.sort) ? [fieldSortConfig] : [].concat((0, _toConsumableArray2["default"])(this._request.sort), [fieldSortConfig]);

      if (!this._request.selector.hasOwnProperty(field)) {
        this.addCondition(field, '$exists', true);
      }
    }
  }, {
    key: "limit",
    value: function limit(_limit) {
      this._request.limit = _limit;
    }
  }, {
    key: "skip",
    value: function skip() {
      var _skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._request.skip = _skip;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._request = {
        selector: {}
      };
    }
  }, {
    key: "getQueryRequest",
    value: function getQueryRequest() {
      return _objectSpread({}, this._request);
    }
  }]);
  return PouchDBQuery;
}();

exports.PouchDBQuery = PouchDBQuery;