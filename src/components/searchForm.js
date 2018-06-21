import React, {Component} from 'react';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';
import Utility from '../ulits/utility';

const defaultSearchFormSchema = {
    type: "object",
    properties: {
        "_q": {
            "type": "string",
            "title": "Search"
        }
    }
};

class SearchForm extends Component {
    static NOTHING_TO_CHANGE = 0;
    static RESET_FORM_CONFIGURATION = 1;
    static UPDATE_FORM_CONFIGURATION = 2;

    static HIDE_UNUSED_OPTION = 11;
    static DISABLE_UNUSED_OPTION = 12;

    constructor(props) {
        super(props);

        this.state = {
            schema: this.props.schema,
            uiSchema: this.props.uiSchema,
            formData: this.props.formData
        };
    }

    _getPropertySchemaWithDisabled = (currentSchema, currentUiSchema, usedOptions) => {
        let uiSchema = Utility.isEmpty(currentUiSchema) ? {} : {...currentUiSchema};

        if (usedOptions.size > 0) {
            let enumDisabled = [];
            for (let value of currentSchema.enum) {
                if(!usedOptions.has(value)) {
                    enumDisabled.push(value);
                }
            }
            uiSchema['ui:enumDisabled'] = [832, 855];
        } else {
            uiSchema['ui:disabled'] = true;
        }

        return {
            schema: currentSchema,
            uiSchema: uiSchema
        }
    };

    _getPropertySchemaWithHide = (currentSchema, currentUiSchema, usedOptions) => {
        let schema = {...currentSchema},
            uiSchema = Utility.isEmpty(currentUiSchema) ? {} : {...currentUiSchema};

        if (usedOptions.size > 0) {
            let enumKeys =[],
                enumNames = currentSchema.hasOwnProperty('enumNames') ? [] : false,
                index,
                value;

            for(index in currentSchema.enum) {
                value = currentSchema.enum[index];
                if(usedOptions.has(currentSchema.enum[index])) {
                    enumKeys.push(value);
                    if(enumNames) {
                        enumNames.push(currentSchema.enumNames[index])
                    }
                }
            }
            schema.enum = enumKeys;
            schema.enumNames = enumNames;

            if(usedOptions.size === 1) {
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
        }

    };


    _updateSchemaConfigurations = (toBeShownFilters, visibilityConfig, changedFormFields, formData) => {
        let schemaProperties = {...this.props.schema.properties},
            uiSchema = {...this.props.uiSchema},
            updatedProperties = {},
            formSchemas;
        for (let filterKey in toBeShownFilters) {
            if(changedFormFields.has(filterKey)) {
                updatedProperties[filterKey] = {...this.state.schema.properties[filterKey]};
                uiSchema[filterKey] = {...this.state.uiSchema[filterKey]};
                continue;
            }

            let updateMethod = visibilityConfig[filterKey] === SearchForm.HIDE_UNUSED_OPTION ? this._getPropertySchemaWithHide : this._getPropertySchemaWithDisabled,
                propertyConfig = updateMethod(schemaProperties[filterKey], uiSchema[filterKey], toBeShownFilters[filterKey]);

            updatedProperties[filterKey] = propertyConfig.schema;
            uiSchema[filterKey] = propertyConfig.uiSchema;
        }

        formSchemas = {
            schema: {...this.props.schema, properties: {...this.props.schema.properties, ...updatedProperties}},
            uiSchema: {...uiSchema}
        };

        if (typeof this.props.onSchemaUpdate === 'function') {
            this.props.onSchemaUpdate(formSchemas, formData);
        }

        return formSchemas;
    };

    _getChangedFieldsData = (search, filters) => {
        let {_q, _sorting, ...theFilters} = this.state.formData,
            lastSearchInput = Utility.isEmpty(this.state.formData['_q']) ? '' : this.state.formData['_q'],
            changedFields = new Set();

        if (lastSearchInput !== search) {
            changedFields.add('_q');
            if (this.props.searchOnChange) {
                return changedFields;
            }
        }

        // @todo Deep compare for the filters. Now a simple first level compare is uesd
        for (let filterKey in filters) {
            if (theFilters[filterKey] !== filters[filterKey]) {
                changedFields.add(filterKey);
                if (this.props.searchOnChange) {
                    return changedFields;
                }
            }
        }

        return false;
    };

    _submitSearchingData = ({formData}) => {
        const {_q, _sorting, ...filters} = formData;
        formData._q = Utility.isEmpty(_q) ? '' : _q.trim();

        let changedFormFields = this._getChangedFieldsData(formData._q, filters);

        if (changedFormFields) {
            let message = this.props.onSearch(formData, changedFormFields),
                schemaConfiguration = {};

            if (message.operation === SearchForm.RESET_FORM_CONFIGURATION) {
                schemaConfiguration = {
                    schema: this.props.schema,
                    uiSchema: this.props.uiSchema
                }
            } else if (message.operation === SearchForm.UPDATE_FORM_CONFIGURATION) {
                schemaConfiguration = this._updateSchemaConfigurations(message.filtersData, message.filtersVisibility, changedFormFields, formData);
            }

            this.setState({
                formData: formData,
                ...schemaConfiguration
            });
        }
    };

    resetForm = () => {
        this.setState({
            schema: this.props.schema,
            uiSchema: this.props.uiSchema,
            formData: this.props.formData
        });
    };

    render() {
        const {onSchemaUpdate, onSubmit, onChange, onSearch, searchOnChange, schema, uiSchema, formData, ...formProps} = this.props;
        formProps.onSubmit = this._submitSearchingData;

        if (searchOnChange) {
            formProps.onChange = this._submitSearchingData;
        }

        return (
            <Form {...formProps} schema={this.state.schema} uiSchema={this.state.uiSchema}
                  formData={this.state.formData}/>
        );
    }
}

SearchForm.defaultProps = {
    searchOnChange: false,
    schema: defaultSearchFormSchema,
    formData: {},
    children: <div className={'flex-list__form'}>
        <button className="btn" type="submit">Search</button>
    </div>
};

SearchForm.propTypes = {
    searchOnChange: PropTypes.bool,
    onSchemaUpdate: PropTypes.func,
    schema: PropTypes.object,
    formData: PropTypes.object,
    onSearch: PropTypes.func
};

export default SearchForm;
