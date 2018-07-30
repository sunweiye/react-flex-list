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

        _this._getPropertySchemaWithDisabled = function (currentSchema, currentUiSchema, usedOptions) {
            var uiSchema = _utility2.default.isEmpty(currentUiSchema) ? {} : _extends({}, currentUiSchema);

            if (usedOptions.size > 0) {
                var enumDisabled = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = currentSchema.enum[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        if (!usedOptions.has(value)) {
                            enumDisabled.push(value);
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

                uiSchema['ui:enumDisabled'] = [832, 855];
            } else {
                uiSchema['ui:disabled'] = true;
            }

            return {
                schema: currentSchema,
                uiSchema: uiSchema
            };
        };

        _this._getPropertySchemaWithHide = function (currentSchema, currentUiSchema, usedOptions) {
            var schema = _extends({}, currentSchema),
                uiSchema = _utility2.default.isEmpty(currentUiSchema) ? {} : _extends({}, currentUiSchema);

            if (usedOptions.size > 0) {
                var enumKeys = [],
                    enumNames = currentSchema.hasOwnProperty('enumNames') ? [] : false,
                    index = void 0,
                    value = void 0;

                for (index in currentSchema.enum) {
                    value = currentSchema.enum[index];
                    if (usedOptions.has(currentSchema.enum[index])) {
                        enumKeys.push(value);
                        if (enumNames) {
                            enumNames.push(currentSchema.enumNames[index]);
                        }
                    }
                }
                schema.enum = enumKeys;
                schema.enumNames = enumNames;

                if (usedOptions.size === 1) {
                    delete uiSchema["ui:placeholder"];
                    uiSchema['ui:disabled'] = true;
                    schema['default'] = enumKeys[0];
                }
            } else {
                uiSchema['ui:disabled'] = true;
            }

            return {
                schema: schema,
                uiSchema: uiSchema
            };
        };

        _this._updateSchemaConfigurations = function (toBeShownFilters, visibilityConfig, changedFormFields, formData) {
            var schemaProperties = _extends({}, _this.props.schema.properties),
                uiSchema = _extends({}, _this.props.uiSchema),
                updatedProperties = {},
                formSchemas = void 0;
            for (var filterKey in toBeShownFilters) {
                if (changedFormFields.has(filterKey)) {
                    updatedProperties[filterKey] = _extends({}, _this.state.schema.properties[filterKey]);
                    uiSchema[filterKey] = _extends({}, _this.state.uiSchema[filterKey]);
                    continue;
                }

                var updateMethod = visibilityConfig[filterKey] === SearchForm.HIDE_UNUSED_OPTION ? _this._getPropertySchemaWithHide : _this._getPropertySchemaWithDisabled,
                    propertyConfig = updateMethod(schemaProperties[filterKey], uiSchema[filterKey], toBeShownFilters[filterKey]);

                updatedProperties[filterKey] = propertyConfig.schema;
                uiSchema[filterKey] = propertyConfig.uiSchema;
            }

            formSchemas = {
                schema: _extends({}, _this.props.schema, { properties: _extends({}, _this.props.schema.properties, updatedProperties) }),
                uiSchema: _extends({}, uiSchema)
            };

            if (typeof _this.props.onSchemaUpdate === 'function') {
                _this.props.onSchemaUpdate(formSchemas, formData);
            }

            return formSchemas;
        };

        _this._getChangedFieldsData = function (search, filters) {
            var _this$state$formData = _this.state.formData,
                _q = _this$state$formData._q,
                _sorting = _this$state$formData._sorting,
                theFilters = _objectWithoutProperties(_this$state$formData, ['_q', '_sorting']),
                lastSearchInput = _utility2.default.isEmpty(_this.state.formData['_q']) ? '' : _this.state.formData['_q'],
                changedFields = new Set();

            if (lastSearchInput !== search) {
                changedFields.add('_q');
                if (_this.props.searchOnChange) {
                    return changedFields;
                }
            }

            // @todo Deep compare for the filters. Now a simple first level compare is uesd
            for (var filterKey in filters) {
                if (theFilters[filterKey] !== filters[filterKey]) {
                    changedFields.add(filterKey);
                    if (_this.props.searchOnChange) {
                        return changedFields;
                    }
                }
            }

            return changedFields.size ? changedFields : false;
        };

        _this._submitSearchingData = function (_ref) {
            var formData = _ref.formData;

            var _q = formData._q,
                _sorting = formData._sorting,
                filters = _objectWithoutProperties(formData, ['_q', '_sorting']);

            formData._q = _utility2.default.isEmpty(_q) ? '' : _q.trim();

            var changedFormFields = _this._getChangedFieldsData(formData._q, filters);

            if (changedFormFields) {
                var message = _this.props.onSearch(formData, changedFormFields),
                    schemaConfiguration = {};

                if (message.operation === SearchForm.RESET_FORM_CONFIGURATION) {
                    _this.resetForm();
                    return;
                } else if (message.operation === SearchForm.UPDATE_FORM_CONFIGURATION) {
                    schemaConfiguration = _this._updateSchemaConfigurations(message.filtersData, message.filtersVisibility, changedFormFields, formData);
                }

                _this.setState(_extends({
                    formData: formData
                }, schemaConfiguration));
            }
        };

        _this.resetForm = function () {
            _this.setState({
                schema: _this.props.schema,
                uiSchema: _this.props.uiSchema,
                formData: _this.props.formData
            });
        };

        _this.state = {
            schema: _this.props.schema,
            uiSchema: _this.props.uiSchema,
            formData: _this.props.formData
        };
        return _this;
    }

    _createClass(SearchForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                onSchemaUpdate = _props.onSchemaUpdate,
                onSubmit = _props.onSubmit,
                onChange = _props.onChange,
                onSearch = _props.onSearch,
                searchOnChange = _props.searchOnChange,
                schema = _props.schema,
                uiSchema = _props.uiSchema,
                formData = _props.formData,
                formProps = _objectWithoutProperties(_props, ['onSchemaUpdate', 'onSubmit', 'onChange', 'onSearch', 'searchOnChange', 'schema', 'uiSchema', 'formData']);

            formProps.onSubmit = this._submitSearchingData;

            if (searchOnChange) {
                formProps.onChange = this._submitSearchingData;
            }

            return _react2.default.createElement(_reactJsonschemaForm2.default, _extends({}, formProps, { schema: this.state.schema, uiSchema: this.state.uiSchema,
                formData: this.state.formData }));
        }
    }]);

    return SearchForm;
}(_react.Component);

SearchForm.NOTHING_TO_CHANGE = 0;
SearchForm.RESET_FORM_CONFIGURATION = 1;
SearchForm.UPDATE_FORM_CONFIGURATION = 2;
SearchForm.HIDE_UNUSED_OPTION = 11;
SearchForm.DISABLE_UNUSED_OPTION = 12;


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
    onSchemaUpdate: _propTypes2.default.func,
    schema: _propTypes2.default.object,
    formData: _propTypes2.default.object,
    onSearch: _propTypes2.default.func
};

exports.default = SearchForm;