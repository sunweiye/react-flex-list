"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactJsonschemaForm = _interopRequireDefault(require("react-jsonschema-form"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SearchForm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(SearchForm, _Component);

  function SearchForm(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SearchForm);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SearchForm).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_submitSearchingData", function (_ref) {
      var formData = _ref.formData;

      _this.props.onSearch(formData);

      _this.setState({
        formData: formData
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "resetFormData", function () {
      var formData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this._submitSearchingData({
        formData: (0, _isEmpty["default"])(formData) ? _this._emptyFormData : formData
      });
    });
    _this._emptyFormData = _this.props.schema.type === 'string' ? '' : {};
    var _this$props = _this.props,
        schema = _this$props.schema,
        uiSchema = _this$props.uiSchema,
        _formData = _this$props.formData;
    _this.state = {
      schema: schema,
      uiSchema: uiSchema,
      formData: _formData
    };
    return _this;
  }

  (0, _createClass2["default"])(SearchForm, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          onSchemaUpdate = _this$props2.onSchemaUpdate,
          onSubmit = _this$props2.onSubmit,
          onChange = _this$props2.onChange,
          onSearch = _this$props2.onSearch,
          searchOnChange = _this$props2.searchOnChange,
          schema = _this$props2.schema,
          uiSchema = _this$props2.uiSchema,
          formData = _this$props2.formData,
          formProps = (0, _objectWithoutProperties2["default"])(_this$props2, ["onSchemaUpdate", "onSubmit", "onChange", "onSearch", "searchOnChange", "schema", "uiSchema", "formData"]);
      formProps.onSubmit = this._submitSearchingData;

      if (searchOnChange) {
        formProps.onChange = this._submitSearchingData;
      }

      return _react["default"].createElement(_reactJsonschemaForm["default"], (0, _extends2["default"])({}, formProps, {
        schema: this.state.schema,
        uiSchema: this.state.uiSchema,
        formData: _objectSpread({}, this.state.formData)
      }));
    }
  }]);
  return SearchForm;
}(_react.Component);

SearchForm.defaultProps = {
  searchOnChange: false,
  children: _react["default"].createElement("div", {
    className: "flex-list__form"
  }, _react["default"].createElement("button", {
    className: "btn",
    type: "submit"
  }, "Search"))
};
SearchForm.propTypes = {
  searchOnChange: _propTypes["default"].bool,
  onSchemaUpdate: _propTypes["default"].func,
  schema: _propTypes["default"].object.isRequired,
  uiSchema: _propTypes["default"].object,
  formData: _propTypes["default"].object,
  onSearch: _propTypes["default"].func
};
var _default = SearchForm;
exports["default"] = _default;