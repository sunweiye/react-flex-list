"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _repository = _interopRequireDefault(require("../ulits/repository"));

var _pouchDBQuery = require("../ulits/pouchDBQuery");

var _preProcessors = require("../ulits/preProcessors");

var _listContainer = _interopRequireDefault(require("./listContainer"));

var _searchForm = _interopRequireDefault(require("./searchForm"));

var _reactPaginate = _interopRequireDefault(require("react-paginate"));

var _helpers = require("../ulits/helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var StandardList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(StandardList, _Component);
  (0, _createClass2["default"])(StandardList, null, [{
    key: "calculatePageCount",
    value: function calculatePageCount(total, pageSize) {
      return Math.ceil(total / pageSize);
    }
  }]);

  function StandardList(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, StandardList);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(StandardList).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_data", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_repository", (0, _repository["default"])());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderProps", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_searchForm", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_defaultRenderOrder", ['form', 'list', 'info', 'pagination', 'children']);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_initializationContent", '');
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_afterSearchAction", function (docs) {
      return docs;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      query: null,
      totalResults: 0,
      currentPage: 0,
      pageSize: _this.props.pageSize,
      pageCount: 0,
      shownData: [],
      initialized: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_preProcess", function () {
      var _this$props = _this.props,
          data = _this$props.data,
          itemPreprocessor = _this$props.itemPreprocessor,
          itemRender = _this$props.itemRender,
          searchForm = _this$props.searchForm,
          indexFields = _this$props.indexFields,
          textSearchFieldName = _this$props.textSearchFieldName,
          sortFieldName = _this$props.sortFieldName,
          searchTextInFields = _this$props.searchTextInFields,
          filtersFieldsMap = _this$props.filtersFieldsMap,
          filtersVisibilityOnSearch = _this$props.filtersVisibilityOnSearch,
          pageSize = _this$props.pageSize,
          paginationSettings = _this$props.paginationSettings,
          listContainerSettings = _this$props.listContainerSettings,
          afterInitialized = _this$props.afterInitialized,
          beforeSearch = _this$props.beforeSearch,
          afterSearch = _this$props.afterSearch,
          resultInfoRender = _this$props.resultInfoRender,
          initializationRender = _this$props.initializationRender,
          afterPageChanged = _this$props.afterPageChanged,
          renderOrder = _this$props.renderOrder,
          containerProps = (0, _objectWithoutProperties2["default"])(_this$props, ["data", "itemPreprocessor", "itemRender", "searchForm", "indexFields", "textSearchFieldName", "sortFieldName", "searchTextInFields", "filtersFieldsMap", "filtersVisibilityOnSearch", "pageSize", "paginationSettings", "listContainerSettings", "afterInitialized", "beforeSearch", "afterSearch", "resultInfoRender", "initializationRender", "afterPageChanged", "renderOrder"]),
          processors = [_preProcessors.generateDocIdByTime].concat((0, _toConsumableArray2["default"])(typeof itemPreprocessor === 'function' ? [itemPreprocessor] : []));
      Object.defineProperties((0, _assertThisInitialized2["default"])(_this), {
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

      for (var itemKey in data) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = processors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var processor = _step.value;
            processor(data[itemKey], itemKey);
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

      _this._data = data;
      _this._initializationContent = (0, _helpers.renderContentHelper)(initializationRender);

      if (typeof afterSearch === 'function') {
        _this._afterSearchAction = afterSearch;
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_buildFieldQuery", function (fieldDef, operator, userValue) {
      var arrayConfigFlagPosition = fieldDef.indexOf('[]');

      if (arrayConfigFlagPosition !== -1) {
        return (0, _defineProperty2["default"])({}, fieldDef.substring(0, arrayConfigFlagPosition), {
          $elemMatch: _this._buildFieldQuery(fieldDef.substring(arrayConfigFlagPosition + 4), operator, userValue)
        });
      }

      if (fieldDef.length) {
        return (0, _defineProperty2["default"])({}, fieldDef.replace(/->/g, '.'), (0, _defineProperty2["default"])({}, operator, userValue));
      }

      return operator === '$regex' ? {
        $regex: userValue
      } : userValue;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleSearch",
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(formData) {
        var query, _this$props2, indexFields, textSearchFieldName, sortFieldName, searchTextInFields, filtersFieldsMap, beforeSearch, afterSearch, formDataForSearching, _i, _Object$keys, fieldKey, fieldValue, fieldDef, matcher, _ref6, total_rows, docs, _this$state, pageSize, initialized;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = new _pouchDBQuery.PouchDBQuery(), _this$props2 = _this.props, indexFields = _this$props2.indexFields, textSearchFieldName = _this$props2.textSearchFieldName, sortFieldName = _this$props2.sortFieldName, searchTextInFields = _this$props2.searchTextInFields, filtersFieldsMap = _this$props2.filtersFieldsMap, beforeSearch = _this$props2.beforeSearch, afterSearch = _this$props2.afterSearch;
                formDataForSearching = _objectSpread({}, formData);
                query.limit(_this.state.pageSize);

                if (typeof beforeSearch === 'function') {
                  formDataForSearching = beforeSearch(formDataForSearching);
                }

                if (!(0, _isEmpty["default"])(formDataForSearching)) {
                  for (_i = 0, _Object$keys = Object.keys(formDataForSearching); _i < _Object$keys.length; _i++) {
                    fieldKey = _Object$keys[_i];
                    fieldValue = formDataForSearching[fieldKey];

                    if (fieldKey === textSearchFieldName && typeof fieldValue === 'string' && !(0, _isEmpty["default"])(searchTextInFields)) {
                      fieldValue = fieldValue.trim();

                      if (!(0, _isEmpty["default"])(fieldValue)) {
                        (function () {
                          var keywordsRegExp = new RegExp(fieldValue.replace(/[\s]+/g, '|'), 'i'),
                              fieldMatchers = searchTextInFields.map(function (fieldDef) {
                            return _this._buildFieldQuery(fieldDef, '$regex', keywordsRegExp);
                          });
                          query.addCondition(null, '$or', fieldMatchers);
                        })();
                      }
                    } else if (fieldKey === sortFieldName) {
                      if (!(0, _isEmpty["default"])(indexFields)) {
                        (0, _typeof2["default"])(fieldValue) === 'object' ? Object.entries(fieldValue).map(function (_ref4) {
                          var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
                              sortFieldName = _ref5[0],
                              sortFieldValue = _ref5[1];

                          return query.sortBy(sortFieldName, sortFieldValue);
                        }) : query.sortBy(fieldKey, fieldValue);
                      }
                    } else {
                      if (typeof fieldValue === 'number' || !(0, _isEmpty["default"])(fieldValue)) {
                        fieldDef = filtersFieldsMap.hasOwnProperty(fieldKey) ? filtersFieldsMap[fieldKey] : fieldKey, matcher = _this._buildFieldQuery(fieldDef, '$eq', fieldValue);
                        query.addSelector(matcher);
                      }
                    }
                  }
                }

                _context.next = 7;
                return _this._executeQuery(query, true);

              case 7:
                _ref6 = _context.sent;
                total_rows = _ref6.total_rows;
                docs = _ref6.docs;
                _this$state = _this.state;
                pageSize = _this$state.pageSize;
                initialized = _this$state.initialized;

                _this.setState({
                  initialized: true | initialized,
                  totalResults: total_rows,
                  pageCount: StandardList.calculatePageCount(total_rows, pageSize),
                  shownData: _this._afterSearchAction(docs),
                  currentPage: 0,
                  query: query
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handlePageClick", function (_ref7) {
      var selected = _ref7.selected;
      var query = _this.state.query;
      query.skip(selected * _this.state.pageSize);

      _this._executeQuery(query).then(function (_ref8) {
        var docs = _ref8.docs;
        return _this.setState({
          shownData: _this._afterSearchAction(docs),
          currentPage: selected
        });
      });

      if (typeof _this.props.afterPageChanged === 'function') {
        _this.props.afterPageChanged(selected);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_executeQuery",
    /*#__PURE__*/
    function () {
      var _ref9 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(query) {
        var withTotalCount,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                withTotalCount = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                return _context2.abrupt("return", _this._repository.search(query, withTotalCount));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref9.apply(this, arguments);
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reset", function () {
      var formData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this._searchForm.resetFormData(formData);
    });

    _this._preProcess();

    return _this;
  }

  (0, _createClass2["default"])(StandardList, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._repository.insertRows(this._data).then(function (result) {
                  // Release the memory of list data
                  delete _this2._data;
                  return result;
                });

              case 2:
                _context3.next = 4;
                return this._repository.createIndex(this.props.indexFields);

              case 4:
                this._handleSearch(this.props.searchForm.formData).then(function () {
                  return typeof _this2.props.afterInitialized === 'function' ? _this2.props.afterInitialized() : '';
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }() //TODO: Enable set the id field

  }, {
    key: "_renderSearchForm",
    value: function _renderSearchForm() {
      var _this3 = this;

      var _this$props$searchFor = this.props.searchForm,
          disabled = _this$props$searchFor.disabled,
          formProps = (0, _objectWithoutProperties2["default"])(_this$props$searchFor, ["disabled"]);
      return (0, _isEmpty["default"])(formProps) || disabled ? '' : _react["default"].createElement(_searchForm["default"], (0, _extends2["default"])({}, formProps, {
        onSearch: this._handleSearch,
        ref: function ref(searchForm) {
          return _this3._searchForm = searchForm;
        }
      }));
    }
  }, {
    key: "_renderContent",
    value: function _renderContent() {
      var _this4 = this;

      var _this$state2 = this.state,
          totalResults = _this$state2.totalResults,
          shownData = _this$state2.shownData,
          pageCount = _this$state2.pageCount,
          pageSize = _this$state2.pageSize,
          currentPage = _this$state2.currentPage,
          _this$_renderProps = this._renderProps,
          containerProps = _this$_renderProps.containerProps,
          itemRender = _this$_renderProps.itemRender,
          listContainerSettings = _this$_renderProps.listContainerSettings,
          renderOrder = _this$_renderProps.renderOrder;

      var listContainerProps = _objectSpread({
        itemRender: itemRender
      }, listContainerSettings),
          customRenderOrder = renderOrder.filter(function (element) {
        return _this4._defaultRenderOrder.includes(element);
      }),
          restDefaultOrder = this._defaultRenderOrder.filter(function (element) {
        return !customRenderOrder.includes(element);
      }),
          renderElements = {
        form: (0, _isEmpty["default"])(this.props.searchForm) ? '' : this._renderSearchForm(),
        list: _react["default"].createElement(_listContainer["default"], (0, _extends2["default"])({
          data: shownData
        }, listContainerProps)),
        info: typeof this.props.resultInfoRender === 'function' ? this.props.resultInfoRender({
          totalResults: totalResults,
          shownData: shownData,
          pageCount: pageCount,
          pageSize: pageSize,
          currentPage: currentPage
        }) : '',
        pagination: pageCount > 1 ? this._renderPagination() : '',
        children: this.props.children ? this.props.children : ''
      };

      return _react["default"].createElement("div", containerProps, [].concat((0, _toConsumableArray2["default"])(customRenderOrder), (0, _toConsumableArray2["default"])(restDefaultOrder)).map(function (elementKey) {
        return _react["default"].createElement(_react.Fragment, {
          key: "content-".concat(elementKey)
        }, renderElements[elementKey]);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.initialized ? this._renderContent() : this._initializationContent;
    }
  }]);
  return StandardList;
}(_react.Component);

StandardList.defaultProps = {
  listContainerSettings: {},
  searchForm: {},
  paginationSettings: {},
  pageSize: 10,
  indexFields: [],
  textSearchFieldName: '_q',
  sortFieldName: '_sort',
  searchTextInFields: [],
  filtersFieldsMap: {},
  renderOrder: []
};
StandardList.propsTypes = {
  data: _propTypes["default"].array.isRequired,
  itemPreprocessor: _propTypes["default"].func,
  searchForm: _propTypes["default"].object,
  listContainerSettings: _propTypes["default"].object,
  pageSize: _propTypes["default"].number.isRequired,
  paginationSettings: _propTypes["default"].object,
  initializationRender: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func, _propTypes["default"].instanceOf(Element)]),
  resultInfoRender: _propTypes["default"].func,
  itemRender: _propTypes["default"].func.isRequired,
  afterInitialized: _propTypes["default"].func,
  beforeSearch: _propTypes["default"].func,
  afterSearch: _propTypes["default"].func,
  afterPageChanged: _propTypes["default"].func,
  indexFields: _propTypes["default"].array,
  textSearchFieldName: _propTypes["default"].string,
  sortFieldName: _propTypes["default"].string,
  searchTextInFields: _propTypes["default"].array,
  filtersFieldsMap: _propTypes["default"].object,
  renderOrder: _propTypes["default"].array
};
var _default = StandardList;
exports["default"] = _default;