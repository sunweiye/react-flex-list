var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';
import SearchForm from './components/searchForm';
import ListContainer from './components/listContainer';
import Utility from "./ulits/utility";

var SearchFormSettings = {
    searchOnChange: false
};

var AbstractFlexList = function (_Component) {
    _inherits(AbstractFlexList, _Component);

    function AbstractFlexList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AbstractFlexList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractFlexList.__proto__ || Object.getPrototypeOf(AbstractFlexList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._handleResetAction = function () {
            throw new Error('The handle reset action must be implemented.');
        }, _this._handleSearch = function () {
            throw new Error('The handle search action must be implemented.');
        }, _this._handlePageClick = function () {
            throw new Error('The handle pagination action must be implemented.');
        }, _temp), _possibleConstructorReturn(_this, _ret);
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

            return React.createElement(SearchForm, _extends({}, searchFormProps, { ref: function ref(searchForm) {
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
                return React.createElement(
                    'nav',
                    { className: className },
                    React.createElement(ReactPaginate, paginationProps)
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
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            var listData = props.listData,
                listDataItemPreprocessor = props.listDataItemPreprocessor,
                otherProps = _objectWithoutProperties(props, ['listData', 'listDataItemPreprocessor']);

            if (listData !== state.previousPropsListData) {
                return _extends({
                    currentListData: AbstractFlexList.preProcessListData(listData, listDataItemPreprocessor),
                    previousPropsListData: listData
                }, otherProps);
            } else {
                var currentListData = state.currentListData,
                    otherStates = _objectWithoutProperties(state, ['currentListData']);

                return _extends({
                    currentListData: AbstractFlexList.preProcessListData(currentListData, listDataItemPreprocessor)
                }, otherStates);
            }
        }
    }, {
        key: 'preProcessListData',
        value: function preProcessListData(listData, listDataItemPreprocessor) {
            if (!Utility.isEmpty(listDataItemPreprocessor)) {
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

    return AbstractFlexList;
}(Component);

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
    listData: PropTypes.array.isRequired,
    listDataItemPreprocessor: PropTypes.func,
    searchTextFields: PropTypes.array,
    filtersFieldsMap: PropTypes.array,
    filtersVisibilityOnSearch: PropTypes.object,
    searchForm: PropTypes.object,
    listContainerSettings: PropTypes.object,
    pageSize: PropTypes.number,
    paginationSettings: PropTypes.object,
    onListRender: PropTypes.func,
    renderItem: PropTypes.func,
    beforeSearch: PropTypes.func,
    afterSearch: PropTypes.func
};

export default AbstractFlexList;