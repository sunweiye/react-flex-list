var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from "prop-types";
import AbstractFlexList from './abstractFlexList';
import ListContainer from './components/listContainer';

var SimpleFlexList = function (_AbstractFlexList) {
    _inherits(SimpleFlexList, _AbstractFlexList);

    function SimpleFlexList() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, SimpleFlexList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleFlexList.__proto__ || Object.getPrototypeOf(SimpleFlexList)).call.apply(_ref, [this].concat(args))), _this), _this._handlePageClick = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
                var selected = _ref2.selected;
                var paginationProps, listData;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                paginationProps = _extends({}, _this.state.paginationSettings);
                                _context.next = 3;
                                return _this.props.asyncDataLoader(selected);

                            case 3:
                                listData = _context.sent;

                                paginationProps.initialPage = selected;

                                _this.setState({
                                    currentListData: listData,
                                    paginationSettings: paginationProps
                                });

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x) {
                return _ref3.apply(this, arguments);
            };
        }(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SimpleFlexList, [{
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
                asyncDataLoader = _props.asyncDataLoader,
                containerProps = _objectWithoutProperties(_props, ['listData', 'listDataItemPreprocessor', 'renderItem', 'searchForm', 'searchTextFields', 'filtersFieldsMap', 'filtersVisibilityOnSearch', 'pageSize', 'paginationSettings', 'listContainerSettings', 'onListRender', 'asyncDataLoader']);

            var currentListData = this.state.currentListData;

            return React.createElement(
                'div',
                containerProps,
                this._renderSearchForm(),
                React.createElement(ListContainer, _extends({
                    data: currentListData,
                    renderItem: renderItem,
                    onListRender: onListRender
                }, listContainerSettings)),
                this._renderPagination()
            );
        }
    }]);

    return SimpleFlexList;
}(AbstractFlexList);

SimpleFlexList.propsTypes = {
    asyncDataLoader: PropTypes.func.isRequired
};

export default SimpleFlexList;