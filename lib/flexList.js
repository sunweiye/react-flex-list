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

var _querySearch = require('./ulits/querySearch');

var _utility = require('./ulits/utility');

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchFormSettings = {
    searchOnChange: false
};

var FlexList = function (_Component) {
    _inherits(FlexList, _Component);

    function FlexList(props) {
        _classCallCheck(this, FlexList);

        var _this = _possibleConstructorReturn(this, (FlexList.__proto__ || Object.getPrototypeOf(FlexList)).call(this, props));

        _this._buildFilterCondition = function (key, value) {
            var filtersFieldsMap = _this.props.filtersFieldsMap;

            if (typeof value === 'string') {
                value = '"' + value + '"';
            }

            if (filtersFieldsMap.hasOwnProperty(key)) {
                if (typeof filtersFieldsMap[key] === 'string') {
                    key = filtersFieldsMap[key];
                } else {
                    key = _utility2.default.isEmpty(filtersFieldsMap[key].name) ? key : filtersFieldsMap[key].name;
                    if (filtersFieldsMap[key].hasMultiValues) {
                        return value + ' = ANY (' + key + ')';
                    }
                }
            }

            return key + ' = ' + value;
        };

        _this._handleSearch = function (formData) {
            var _q = formData._q,
                filters = _objectWithoutProperties(formData, ['_q']);

            var results = void 0,
                resetAll = true,
                searchKeywords = '',
                queryKeywordsConditions = '',
                queryFiltersConditions = [],
                resultsPageCount = void 0;

            if (_q !== '') {
                resetAll = false;
                searchKeywords = _q.split(' ').map(function (keyword) {
                    return keyword.trim();
                });
                queryKeywordsConditions = _this.props.searchTextFields.map(function (field) {
                    return searchKeywords.map(function (searchKeyword) {
                        return field + ' LIKE "%' + searchKeyword + '%"';
                    }).join(' OR ');
                }).join(' OR ');
            }

            for (var filterKey in filters) {
                if (!_utility2.default.isEmpty(filters[filterKey])) {
                    resetAll = false;
                    queryFiltersConditions.push(_this._buildFilterCondition(filterKey, filters[filterKey]));
                }
            }

            if (resetAll) {
                results = _this.props.listData;
                resultsPageCount = _this._fullListPageCount;
            } else {
                var queryWhere = queryFiltersConditions.join(' AND ');
                if (searchKeywords.length) {
                    queryWhere = queryWhere + (queryWhere.length ? ' AND ' : '') + '(' + queryKeywordsConditions + ')';
                }

                results = new _querySearch.QuerySearch().from(_this.props.listData).where(queryWhere).execute();
                resultsPageCount = Math.ceil(results.length / _this.props.pageSize);
            }

            _this.setState({
                currentListData: results,
                pageCount: resultsPageCount,
                currentPage: 0
            });
        };

        _this._handlePageClick = function (_ref) {
            var selected = _ref.selected;

            _this.setState({ currentPage: selected });
        };

        _this._fullListPageCount = Math.ceil(_this.props.listData.length / _this.props.pageSize);
        _this.state = {
            currentListData: _this.props.listData,
            pageCount: _this._fullListPageCount,
            currentPage: 0
        };
        return _this;
    }

    _createClass(FlexList, [{
        key: '_renderSearchForm',
        value: function _renderSearchForm() {
            if (this.props.searchForm.disable) {
                return '';
            }

            var searchFormProps = _extends({}, SearchFormSettings, this.props.searchForm, {
                onSearch: this._handleSearch
            });

            return _react2.default.createElement(_searchForm2.default, searchFormProps);
        }
    }, {
        key: '_renderPagination',
        value: function _renderPagination() {
            if (this.state.pageCount > 1) {
                var _props$paginationSett = this.props.paginationSettings,
                    className = _props$paginationSett.className,
                    paginationSettings = _objectWithoutProperties(_props$paginationSett, ['className']);

                var paginationProps = _extends({}, paginationSettings, {
                    pageCount: this.state.pageCount,
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
            var _props = this.props,
                listData = _props.listData,
                renderItem = _props.renderItem,
                searchForm = _props.searchForm,
                searchTextFields = _props.searchTextFields,
                filtersFieldsMap = _props.filtersFieldsMap,
                pageSize = _props.pageSize,
                paginationSettings = _props.paginationSettings,
                listContainerSettings = _props.listContainerSettings,
                onListRender = _props.onListRender,
                containerProps = _objectWithoutProperties(_props, ['listData', 'renderItem', 'searchForm', 'searchTextFields', 'filtersFieldsMap', 'pageSize', 'paginationSettings', 'listContainerSettings', 'onListRender']);

            var _state = this.state,
                currentListData = _state.currentListData,
                currentPage = _state.currentPage;

            return _react2.default.createElement(
                'div',
                containerProps,
                this._renderSearchForm(),
                _react2.default.createElement(_listContainer2.default, _extends({
                    data: currentListData.slice(currentPage * pageSize, (currentPage + 1) * pageSize),
                    renderItem: renderItem,
                    onListRender: onListRender
                }, listContainerSettings)),
                this._renderPagination()
            );
        }
    }]);

    return FlexList;
}(_react.Component);

FlexList.defaultProps = {
    searchForm: SearchFormSettings,
    searchTextFields: [],
    filtersFieldsMap: [],
    listContainerSettings: {},
    pageSize: 10,
    paginationSettings: {}
};

FlexList.propsTypes = {
    listData: _propTypes2.default.array,
    searchTextFields: _propTypes2.default.array,
    filtersFieldsMap: _propTypes2.default.array,
    searchForm: _propTypes2.default.object,
    listContainerSettings: _propTypes2.default.object,
    pageSize: _propTypes2.default.number,
    paginationSettings: _propTypes2.default.object,
    onListRender: _propTypes2.default.func,
    renderItem: _propTypes2.default.func
};

exports.default = FlexList;