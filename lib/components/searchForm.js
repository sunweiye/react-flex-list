'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJsonschemaForm = require('react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utility = require('../ulits/utility');

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultSearchFormSchema = {
    type: "object",
    properties: {
        "_q": {
            "type": "string",
            "title": "Search"
        }
    }
};

var SearchForm = function (_Component) {
    _inherits(SearchForm, _Component);

    function SearchForm(props) {
        _classCallCheck(this, SearchForm);

        var _this = _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).call(this, props));

        _this._submitSearchingData = function (_ref) {
            var formData = _ref.formData;

            var _q = formData._q,
                filters = _objectWithoutProperties(formData, ['_q']);

            formData._q = _utility2.default.isEmpty(_q) ? '' : _q.trim();

            if (_this._shouldSubmitData(formData._q, filters)) {
                _this.props.onSearch(formData);
                _this.setState({
                    formData: formData
                });
            }
        };

        _this.state = {
            formData: _this.props.formData
        };
        return _this;
    }

    _createClass(SearchForm, [{
        key: '_shouldSubmitData',
        value: function _shouldSubmitData(search, filters) {
            var _state$formData = this.state.formData,
                _q = _state$formData._q,
                lastFilters = _objectWithoutProperties(_state$formData, ['_q']),
                lastSearchInput = this.state.formData['_q'] + '';

            if (lastSearchInput !== search) {
                return true;
            }

            // @todo Deep compare for the filters. Now a simple first level compare is uesd
            for (var filterKey in filters) {
                if (lastFilters[filterKey] !== filters[filterKey]) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                onSubmit = _props.onSubmit,
                onChange = _props.onChange,
                onSearch = _props.onSearch,
                searchOnChange = _props.searchOnChange,
                formData = _props.formData,
                formProps = _objectWithoutProperties(_props, ['onSubmit', 'onChange', 'onSearch', 'searchOnChange', 'formData']);

            formProps.onSubmit = this._submitSearchingData;

            if (searchOnChange) {
                formProps.onChange = this._submitSearchingData;
            }

            return _react2.default.createElement(_reactJsonschemaForm2.default, _extends({}, formProps, { formData: this.state.formData }));
        }
    }]);

    return SearchForm;
}(_react.Component);

SearchForm.defaultProps = {
    searchOnChange: false,
    schema: defaultSearchFormSchema,
    formData: {},
    children: _react2.default.createElement(
        'div',
        { className: 'flex-list__form' },
        _react2.default.createElement(
            'button',
            { className: 'btn', type: 'submit' },
            'Search'
        )
    )
};

SearchForm.propTypes = {
    searchOnChange: _propTypes2.default.bool,
    schema: _propTypes2.default.object,
    formData: _propTypes2.default.object,
    onSearch: _propTypes2.default.func
};

exports.default = SearchForm;