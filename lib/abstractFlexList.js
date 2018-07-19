'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPaginate = require('react-paginate');

var _reactPaginate2 = _interopRequireDefault(_reactPaginate);

var _searchForm = require('./components/searchForm');

var _searchForm2 = _interopRequireDefault(_searchForm);

var _listContainer = require('./components/listContainer');

var _listContainer2 = _interopRequireDefault(_listContainer);

var _utility = require('./ulits/utility');

var _utility2 = _interopRequireDefault(_utility);

var _flexList = require('./flexList');

var _flexList2 = _interopRequireDefault(_flexList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchFormSettings = {
    searchOnChange: false
};

var AbstractFlexList = function (_Component) {
    _inherits(AbstractFlexList, _Component);

    _createClass(AbstractFlexList, null, [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            return {
                currentListData: AbstractFlexList.preProcessListData(props.listData, props.listDataItemPreprocessor),
                paginationSettings: props.paginationSettings
            };
        }
    }, {
        key: 'preProcessListData',
        value: function preProcessListData(listData, listDataItemPreprocessor) {
            if (!_utility2.default.isEmpty(listDataItemPreprocessor)) {
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
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
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

    function AbstractFlexList(props) {
        _classCallCheck(this, AbstractFlexList);

        var _this = _possibleConstructorReturn(this, (AbstractFlexList.__proto__ || Object.getPrototypeOf(AbstractFlexList)).call(this, props));

        _this._preProcess = function () {
            var _this$props = _this.props,
                listData = _this$props.listData,
                listDataItemPreprocessor = _this$props.listDataItemPreprocessor;

            return AbstractFlexList.preProcessListData(listData, listDataItemPreprocessor);
        };

        _this._handleResetAction = function () {
            throw new Error('The handle reset action must be implemented.');
        };

        _this._handleSearch = function () {
            throw new Error('The handle search action must be implemented.');
        };

        _this._handlePageClick = function () {
            throw new Error('The handle pagination action must be implemented.');
        };

        _this.listData = _this._preProcess();
        _this.state = {
            currentListData: _this.listData,
            paginationSettings: _this.props.paginationSettings
        };
        return _this;
    }

    _createClass(AbstractFlexList, [{
        key: '_renderSearchForm',
        value: function _renderSearchForm() {
            var _this2 = this;

            if (this.props.searchForm.disable) {
                return '';
            }

            var searchFormProps = _extends({}, SearchFormSettings, this.props.searchForm, {
                onSearch: this._handleSearch
            });

            return _react2.default.createElement(_searchForm2.default, _extends({}, searchFormProps, { ref: function ref(searchForm) {
                    return _this2.searchForm = searchForm;
                } }));
        }
    }, {
        key: '_renderPagination',
        value: function _renderPagination() {
            if (this.state.paginationSettings.pageCount > 1) {
                var _state$paginationSett = this.state.paginationSettings,
                    className = _state$paginationSett.className,
                    paginationSettings = _objectWithoutProperties(_state$paginationSett, ['className']);

                var paginationProps = _extends({}, paginationSettings, {
                    onPageChange: this._handlePageClick
                });
                return _react2.default.createElement(
                    'nav',
                    { className: className },
                    _react2.default.createElement(_reactPaginate2.default, paginationProps)
                );
            } else {
                return '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            throw new Error('This method should never be called.');
        }
    }]);

    return AbstractFlexList;
}(_react.Component);

AbstractFlexList.defaultProps = {
    searchForm: SearchFormSettings,
    searchTextFields: [],
    filtersFieldsMap: [],
    filtersVisibilityOnSearch: {},
    listContainerSettings: {},
    pageSize: 10,
    paginationSettings: {}
};

AbstractFlexList.propsTypes = {
    listData: _propTypes2.default.array.isRequired,
    listDataItemPreprocessor: _propTypes2.default.func,
    searchTextFields: _propTypes2.default.array,
    filtersFieldsMap: _propTypes2.default.array,
    filtersVisibilityOnSearch: _propTypes2.default.object,
    searchForm: _propTypes2.default.object,
    listContainerSettings: _propTypes2.default.object,
    pageSize: _propTypes2.default.number,
    paginationSettings: _propTypes2.default.object,
    onListRender: _propTypes2.default.func,
    renderItem: _propTypes2.default.func,
    beforeSearch: _propTypes2.default.func,
    afterSearch: _propTypes2.default.func
};

exports.default = AbstractFlexList;