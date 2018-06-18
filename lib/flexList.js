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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CallbackHelper = function CallbackHelper() {
    _classCallCheck(this, CallbackHelper);

    this.callback = function (func) {
        return typeof func === 'function' ? func() : '';
    };
};

var SearchFormSettings = {
    searchOnChange: false
};

var itemCallbackHelper = new CallbackHelper();

var FlexList = function (_Component) {
    _inherits(FlexList, _Component);

    function FlexList(props) {
        _classCallCheck(this, FlexList);

        var _this = _possibleConstructorReturn(this, (FlexList.__proto__ || Object.getPrototypeOf(FlexList)).call(this, props));

        _this._preProcess = function () {
            var _this$props = _this.props,
                listData = _this$props.listData,
                listDataItemPreprocessor = _this$props.listDataItemPreprocessor,
                filtersVisibilityOnSearch = _this$props.filtersVisibilityOnSearch;
            var schema = _this.props.searchForm.schema;

            var formFilters = {},
                processors = [],
                shouldAddCallbackInProcessors = false;

            if (!_utility2.default.isEmpty(schema)) {
                var _schema$properties = schema.properties,
                    _q = _schema$properties._q,
                    configuredFilters = _objectWithoutProperties(_schema$properties, ['_q']);

                formFilters = configuredFilters;
            }

            if (!_utility2.default.isEmpty(listDataItemPreprocessor)) {
                processors.push(listDataItemPreprocessor);
            }

            for (var filterKey in formFilters) {
                if (filtersVisibilityOnSearch.hasOwnProperty(filterKey) && parseInt(filtersVisibilityOnSearch[filterKey]) > FlexList.SHOW_ALL_FILTERS_OPTIONS) {
                    shouldAddCallbackInProcessors = true;
                    _this._dynamicUpdateFilters[filterKey] = new Set();
                }
            }

            if (shouldAddCallbackInProcessors) {
                processors.push(function (listItem) {
                    listItem._updateFilterDataOnSearch = _this._updateFilterDataOnSearch;
                    listItem._callback = itemCallbackHelper;
                });
            }

            if (processors.length) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = listData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = processors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var processor = _step2.value;

                                processor(item);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
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
        };

        _this._resolveFilterMapping = function () {
            var filtersFieldsMap = _this.props.filtersFieldsMap;

            var mapping = {};
            for (var filterName in filtersFieldsMap) {
                if (typeof filtersFieldsMap[filterName] === 'string') {
                    mapping[filterName] = filtersFieldsMap[filterName];
                } else {
                    mapping[filterName] = _utility2.default.isEmpty(filtersFieldsMap[filterName].name) ? filterName : filtersFieldsMap[filterName].name;
                }
            }

            return mapping;
        };

        _this._updateFilterDataOnSearch = function (filterKey, itemFiledData) {
            if (Array.isArray(itemFiledData)) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = itemFiledData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var value = _step3.value;

                        _this.toBeUpdatedFilters[filterKey].add(value);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            } else if (typeof itemFiledData === 'string' || typeof itemFiledData === 'number') {
                _this.toBeUpdatedFilters[filterKey].add(itemFiledData);
            }

            return itemFiledData;
        };

        _this._buildFilterCondition = function (key, value) {
            var filtersFieldsMap = _this.props.filtersFieldsMap;

            if (typeof value === 'string') {
                value = '"' + value + '"';
            }

            if (filtersFieldsMap.hasOwnProperty(key) && filtersFieldsMap[key] instanceof Object && filtersFieldsMap[key].hasMultiValues) {
                return value + ' = ANY (' + key + ')';
            }

            if (!_this.resolvedFiltersMapping.hasOwnProperty(key)) {
                _this.resolvedFiltersMapping[key] = key;
            }

            return _this.resolvedFiltersMapping[key] + ' = ' + value;
        };

        _this._handleResetAction = function () {
            _this.setState({
                currentListData: _this.listData,
                pageCount: _this._fullListPageCount,
                currentPage: 0
            });

            return {
                operation: _searchForm2.default.RESET_FORM_CONFIGURATION
            };
        };

        _this._handleSearch = function (formData, changedFormFields) {
            var results = void 0,
                resetAll = true,
                searchKeywords = '',
                queryKeywordsConditions = '',
                queryFiltersConditions = [],
                resultsPageCount = void 0,
                messageToSearchForm = void 0;

            _this.toBeUpdatedFilters = {};
            for (var filterKey in _this._dynamicUpdateFilters) {
                _this.toBeUpdatedFilters[filterKey] = new Set();
            }

            if (typeof _this.props.beforeSearch === 'function') {
                _this.props.beforeSearch(formData, changedFormFields);
            }

            var _q = formData._q,
                filters = _objectWithoutProperties(formData, ['_q']);

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

            for (var _filterKey in filters) {
                if (!_utility2.default.isEmpty(filters[_filterKey])) {
                    resetAll = false;
                    queryFiltersConditions.push(_this._buildFilterCondition(_filterKey, filters[_filterKey]));
                }
            }

            if (resetAll) {
                return _this._handleResetAction();
            }

            var queryWhere = queryFiltersConditions.join(' AND '),
                selection = '*',
                filtersVisibilityConfig = {};

            for (var _filterKey2 in _this.toBeUpdatedFilters) {
                var propertyFieldName = _this.resolvedFiltersMapping.hasOwnProperty(_filterKey2) ? _this.resolvedFiltersMapping[_filterKey2] : _filterKey2;

                selection += ', _callback->callback(_updateFilterDataOnSearch->bind("", "' + _filterKey2 + '", ' + propertyFieldName + '))';
                filtersVisibilityConfig[_filterKey2] = _this.props.filtersVisibilityOnSearch[_filterKey2] === FlexList.HIDE_UNUSED_FILTERS_OPTIONS ? _searchForm2.default.HIDE_UNUSED_OPTION : _searchForm2.default.DISABLE_UNUSED_OPTION;
            }

            if (searchKeywords.length) {
                queryWhere = queryWhere + (queryWhere.length ? ' AND ' : '') + '(' + queryKeywordsConditions + ')';
            }

            results = new _querySearch.QuerySearch().select(selection).from(_this.listData).where(queryWhere).execute();
            resultsPageCount = Math.ceil(results.length / _this.props.pageSize);

            messageToSearchForm = {
                operation: selection.length > 1 ? _searchForm2.default.UPDATE_FORM_CONFIGURATION : _searchForm2.default.NOTHING_TO_CHANGE,
                filtersData: _this.toBeUpdatedFilters,
                filtersVisibility: filtersVisibilityConfig
            };

            if (typeof _this.props.afterSearch === 'function') {
                results = _this.props.afterSearch(formData, changedFormFields, results);
            }

            _this.setState({
                currentListData: results,
                pageCount: resultsPageCount,
                currentPage: 0
            });

            return messageToSearchForm;
        };

        _this._handlePageClick = function (_ref) {
            var selected = _ref.selected;

            _this.setState({ currentPage: selected });
        };

        _this.resolvedFiltersMapping = _this._resolveFilterMapping();
        _this._dynamicUpdateFilters = {};
        _this.listData = _this._preProcess();
        _this.toBeUpdatedFilters = {};
        _this._fullListPageCount = Math.ceil(_this.props.listData.length / _this.props.pageSize);
        _this.state = {
            currentListData: _this.listData,
            pageCount: _this._fullListPageCount,
            currentPage: 0
        };
        return _this;
    }

    // @todo condition of item field is object


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
                listDataItemPreprocessor = _props.listDataItemPreprocessor,
                renderItem = _props.renderItem,
                searchForm = _props.searchForm,
                searchTextFields = _props.searchTextFields,
                filtersFieldsMap = _props.filtersFieldsMap,
                filtersVisibilityOnSearch = _props.filtersVisibilityOnSearch,
                pageSize = _props.pageSize,
                paginationSettings = _props.paginationSettings,
                listContainerSettings = _props.listContainerSettings,
                onListRender = _props.onListRender,
                beforeSearch = _props.beforeSearch,
                afterSearch = _props.afterSearch,
                containerProps = _objectWithoutProperties(_props, ['listData', 'listDataItemPreprocessor', 'renderItem', 'searchForm', 'searchTextFields', 'filtersFieldsMap', 'filtersVisibilityOnSearch', 'pageSize', 'paginationSettings', 'listContainerSettings', 'onListRender', 'beforeSearch', 'afterSearch']);

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

FlexList.SHOW_ALL_FILTERS_OPTIONS = 1;
FlexList.HIDE_UNUSED_FILTERS_OPTIONS = 2;
FlexList.DISABLE_UNUSED_FILTERS_OPTIONS = 3;


FlexList.defaultProps = {
    searchForm: SearchFormSettings,
    searchTextFields: [],
    filtersFieldsMap: [],
    filtersVisibilityOnSearch: {},
    listContainerSettings: {},
    pageSize: 10,
    paginationSettings: {}
};

FlexList.propsTypes = {
    listData: _propTypes2.default.array,
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

exports.default = FlexList;