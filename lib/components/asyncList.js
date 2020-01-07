"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SearchFormSettings = {
  searchOnChange: false
};

var AsyncList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(AsyncList, _Component);
  (0, _createClass2["default"])(AsyncList, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var listData = props.listData,
          listDataItemPreprocessor = props.listDataItemPreprocessor,
          otherProps = (0, _objectWithoutProperties2["default"])(props, ["listData", "listDataItemPreprocessor"]);
      var pageSize = props.pageSize === state.previousPropsListData ? state.pageSize : props.pageSize;

      if (listData !== state.previousPropsListData) {
        return _objectSpread({
          currentListData: AsyncList.preProcessListData(listData.slice(0, pageSize), listDataItemPreprocessor),
          previousPropsListData: listData
        }, otherProps);
      } else {
        var currentListData = state.currentListData,
            otherStates = (0, _objectWithoutProperties2["default"])(state, ["currentListData"]);
        return _objectSpread({
          currentListData: AsyncList.preProcessListData(currentListData.slice(0, pageSize), listDataItemPreprocessor)
        }, otherStates);
      }
    }
  }, {
    key: "preProcessListData",
    value: function preProcessListData(listData, listDataItemPreprocessor) {
      if ((0, _isEmpty["default"])(listData)) {
        return [];
      }

      if (typeof listDataItemPreprocessor === 'function') {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = listData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            listDataItemPreprocessor(item);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return listData;
    }
  }]);

  function AsyncList(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, AsyncList);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AsyncList).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      currentListData: [],
      pageCount: 0,
      pageSize: _this.props.pageSize,
      previousPropsListData: [],
      previousPropsPageSize: _this.props.pageSize
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_preProcess", function () {
      var _this$props = _this.props,
          listData = _this$props.listData,
          listDataItemPreprocessor = _this$props.listDataItemPreprocessor,
          itemRender = _this$props.itemRender,
          searchForm = _this$props.searchForm,
          pageSize = _this$props.pageSize,
          paginationSettings = _this$props.paginationSettings,
          listContainerSettings = _this$props.listContainerSettings,
          beforeRenderList = _this$props.beforeRenderList,
          beforeSearch = _this$props.beforeSearch,
          afterSearch = _this$props.afterSearch,
          resultInfoRender = _this$props.resultInfoRender,
          afterPageChanged = _this$props.afterPageChanged,
          asyncDataLoader = _this$props.asyncDataLoader,
          containerProps = (0, _objectWithoutProperties2["default"])(_this$props, ["listData", "listDataItemPreprocessor", "itemRender", "searchForm", "pageSize", "paginationSettings", "listContainerSettings", "beforeRenderList", "beforeSearch", "afterSearch", "resultInfoRender", "afterPageChanged", "asyncDataLoader"]);
      Object.defineProperties((0, _assertThisInitialized2["default"])(_this), {
        _renderProps: {
          value: {
            containerProps: containerProps,
            itemRender: itemRender,
            beforeRenderList: beforeRenderList,
            listContainerSettings: listContainerSettings,
            resultInfoRender: resultInfoRender
          },
          writable: false
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handlePageClick",
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_ref) {
        var selected, paginationProps, listData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                selected = _ref.selected;
                paginationProps = _objectSpread({}, _this.state.paginationSettings);
                _context.next = 4;
                return _this.props.asyncDataLoader(selected);

              case 4:
                listData = _context.sent;
                paginationProps.initialPage = selected;

                _this.setState({
                  currentListData: listData,
                  paginationSettings: paginationProps
                });

              case 7:
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderPagination", function () {
      var _this$props$paginatio = _this.props.paginationSettings,
          className = _this$props$paginatio.className,
          paginationSettings = (0, _objectWithoutProperties2["default"])(_this$props$paginatio, ["className"]),
          currentPage = _this.state.currentPage;

      if (currentPage === 0) {
        paginationSettings.forcePage = currentPage;
      }

      return _react["default"].createElement("nav", {
        className: className
      }, _react["default"].createElement(_reactPaginate["default"], (0, _extends2["default"])({
        pageCount: _this.state.pageCount,
        onPageChange: _this._handlePageClick
      }, paginationSettings)));
    });

    _this._preProcess();

    return _this;
  }

  (0, _createClass2["default"])(AsyncList, [{
    key: "_renderSearchForm",
    value: function _renderSearchForm() {
      var _this2 = this;

      var _this$props$searchFor = this.props.searchForm,
          disabled = _this$props$searchFor.disabled,
          formProps = (0, _objectWithoutProperties2["default"])(_this$props$searchFor, ["disabled"]);
      return (0, _isEmpty["default"])(formProps) || disabled ? '' : _react["default"].createElement(_searchForm["default"], (0, _extends2["default"])({}, formProps, {
        onSearch: this._handleSearch,
        ref: function ref(searchForm) {
          return _this2._searchForm = searchForm;
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          currentListData = _this$state.currentListData,
          pageCount = _this$state.pageCount,
          pageSize = _this$state.pageSize,
          _this$_renderProps = this._renderProps,
          containerProps = _this$_renderProps.containerProps,
          itemRender = _this$_renderProps.itemRender,
          beforeRenderList = _this$_renderProps.beforeRenderList,
          listContainerSettings = _this$_renderProps.listContainerSettings;

      var listContainerProps = _objectSpread({
        itemRender: itemRender,
        beforeRenderList: beforeRenderList
      }, listContainerSettings);

      return _react["default"].createElement("div", containerProps, (0, _isEmpty["default"])(this.props.searchForm) ? '' : this._renderSearchForm(), _react["default"].createElement(_listContainer["default"], (0, _extends2["default"])({
        data: currentListData
      }, listContainerProps)), typeof this.props.resultInfoRender === 'function' ? this.props.resultInfoRender({
        currentListData: currentListData,
        pageCount: pageCount,
        pageSize: pageSize
      }) : '', pageCount > 1 ? this._renderPagination() : '');
    }
  }]);
  return AsyncList;
}(_react.Component);

AsyncList.defaultProps = {
  listContainerSettings: {},
  searchForm: {},
  paginationSettings: {},
  pageSize: 10
};
AsyncList.propsTypes = {
  listData: _propTypes["default"].array.isRequired,
  listDataItemPreprocessor: _propTypes["default"].func,
  searchForm: _propTypes["default"].object,
  listContainerSettings: _propTypes["default"].object,
  pageSize: _propTypes["default"].number.isRequired,
  paginationSettings: _propTypes["default"].object,
  initializationRender: _propTypes["default"].func,
  resultInfoRender: _propTypes["default"].func,
  itemRender: _propTypes["default"].func.isRequired,
  beforeRenderList: _propTypes["default"].func,
  beforeSearch: _propTypes["default"].func,
  afterSearch: _propTypes["default"].func,
  afterPageChanged: _propTypes["default"].func,
  asyncDataLoader: _propTypes["default"].func.isRequired
};
var _default = AsyncList;
exports["default"] = _default;