"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactPaginate = _interopRequireDefault(require("react-paginate"));

var _listContainer = _interopRequireDefault(require("./listContainer"));

var _searchForm = _interopRequireDefault(require("./searchForm"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SimpleList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SimpleList, _Component);
  (0, _createClass2.default)(SimpleList, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var data = props.data,
          pageSize = props.pageSize,
          children = props.children;
      return {
        data: props.data.slice(0, pageSize),
        pageSize: pageSize,
        pageCount: 0 | ((0, _isEmpty.default)(props.paginationSettings) ? 0 : props.paginationSettings.pageCount),
        children: children
      };
    }
  }]);

  function SimpleList(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SimpleList);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SimpleList).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      listData: [],
      pageCount: 0,
      pageSize: _this.props.pageSize,
      children: _this.props.children
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_defaultRenderOrder", ['form', 'list', 'info', 'pagination', 'children']);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_preProcess", function () {
      var _this$props = _this.props,
          listData = _this$props.listData,
          listDataItemPreprocessor = _this$props.listDataItemPreprocessor,
          itemRender = _this$props.itemRender,
          searchForm = _this$props.searchForm,
          pageSize = _this$props.pageSize,
          paginationSettings = _this$props.paginationSettings,
          listContainerSettings = _this$props.listContainerSettings,
          resultInfoRender = _this$props.resultInfoRender,
          handelSearch = _this$props.handelSearch,
          handelPageChange = _this$props.handelPageChange,
          renderOrder = _this$props.renderOrder,
          containerProps = (0, _objectWithoutProperties2.default)(_this$props, ["listData", "listDataItemPreprocessor", "itemRender", "searchForm", "pageSize", "paginationSettings", "listContainerSettings", "resultInfoRender", "handelSearch", "handelPageChange", "renderOrder"]);
      Object.defineProperties((0, _assertThisInitialized2.default)(_this), {
        _renderProps: {
          value: {
            containerProps: containerProps,
            itemRender: itemRender,
            listContainerSettings: listContainerSettings,
            resultInfoRender: resultInfoRender,
            renderOrder: renderOrder
          },
          writable: false
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_handlePageClick",
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_ref) {
        var selected;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                selected = _ref.selected;

                _this.setState({
                  paginationSettings: _objectSpread({}, _this.state.paginationSettings, {
                    initialPage: selected
                  })
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_renderPagination", function () {
      var _this$props$paginatio = _this.props.paginationSettings,
          className = _this$props$paginatio.className,
          paginationSettings = (0, _objectWithoutProperties2.default)(_this$props$paginatio, ["className"]),
          currentPage = _this.state.currentPage;

      if (currentPage === 0) {
        paginationSettings.forcePage = currentPage;
      }

      return _react.default.createElement("nav", {
        className: className
      }, _react.default.createElement(_reactPaginate.default, (0, _extends2.default)({
        onPageChange: _this._handlePageClick
      }, paginationSettings)));
    });

    _this._preProcess();

    return _this;
  }

  (0, _createClass2.default)(SimpleList, [{
    key: "_renderSearchForm",
    value: function _renderSearchForm() {
      var _this2 = this;

      var _this$props$searchFor = this.props.searchForm,
          disabled = _this$props$searchFor.disabled,
          formProps = (0, _objectWithoutProperties2.default)(_this$props$searchFor, ["disabled"]);
      return (0, _isEmpty.default)(formProps) || disabled ? '' : _react.default.createElement(_searchForm.default, (0, _extends2.default)({}, formProps, {
        onSearch: this.props.handelSearch,
        ref: function ref(searchForm) {
          return _this2._searchForm = searchForm;
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          listData = _this$state.listData,
          pageCount = _this$state.pageCount,
          pageSize = _this$state.pageSize,
          children = _this$state.children,
          _this$_renderProps = this._renderProps,
          containerProps = _this$_renderProps.containerProps,
          itemRender = _this$_renderProps.itemRender,
          listContainerSettings = _this$_renderProps.listContainerSettings,
          renderOrder = _this$_renderProps.renderOrder;

      var listContainerProps = _objectSpread({
        itemRender: itemRender
      }, listContainerSettings),
          customRenderOrder = renderOrder.filter(function (element) {
        return _this3._defaultRenderOrder.includes(element);
      }),
          restDefaultOrder = this._defaultRenderOrder.filter(function (element) {
        return !customRenderOrder.includes(element);
      }),
          renderElements = {
        form: (0, _isEmpty.default)(this.props.searchForm) ? '' : this._renderSearchForm(),
        list: _react.default.createElement(_listContainer.default, (0, _extends2.default)({
          data: listData
        }, listContainerProps)),
        info: typeof this.props.resultInfoRender === 'function' ? this.props.resultInfoRender({
          pageCount: pageCount,
          pageSize: pageSize
        }) : '',
        pagination: pageCount > 1 ? this._renderPagination() : '',
        children: children
      };

      return _react.default.createElement("div", containerProps, [].concat((0, _toConsumableArray2.default)(customRenderOrder), (0, _toConsumableArray2.default)(restDefaultOrder)).map(function (elementKey) {
        return _react.default.createElement(_react.Fragment, {
          key: "content-".concat(elementKey)
        }, renderElements[elementKey]);
      }));
    }
  }]);
  return SimpleList;
}(_react.Component);

SimpleList.defaultProps = {
  listContainerSettings: {},
  searchForm: {},
  paginationSettings: {},
  renderOrder: []
};
SimpleList.propsTypes = {
  data: _propTypes.default.array.isRequired,
  searchForm: _propTypes.default.object,
  listContainerSettings: _propTypes.default.object,
  pageSize: _propTypes.default.number.isRequired,
  paginationSettings: _propTypes.default.object,
  initializationRender: _propTypes.default.func,
  resultInfoRender: _propTypes.default.func,
  itemRender: _propTypes.default.func.isRequired,
  handelSearch: function handelSearch(props, propName, componentName) {
    if (!(0, _isEmpty.default)(props.searchForm) && !props.searchForm.disabled && typeof props[propName] !== 'function') {
      throw new Error('Please provide a handelSearch function!');
    }
  },
  renderOrder: _propTypes.default.array
};
var _default = SimpleList;
exports.default = _default;