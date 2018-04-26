'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJsonschemaForm = require('react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        _this.state = {
            formData: _this.props.formData
        };
        return _this;
    }

    _createClass(SearchForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_reactJsonschemaForm2.default, this.props);
        }
    }]);

    return SearchForm;
}(_react.Component);

SearchForm.defaultProps = {
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
    schema: _propTypes2.default.object,
    formData: _propTypes2.default.object
};

exports.default = SearchForm;