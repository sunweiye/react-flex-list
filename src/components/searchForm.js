import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import isEmpty from 'lodash/isEmpty';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this._emptyFormData = this.props.schema.type === 'string' ? '' : {};
        const {schema, uiSchema, formData} = this.props;
        this.state = {schema, uiSchema, formData};
    }

    _submitSearchingData = ({formData}) => {
        this.props.onSearch(formData);
        this.setState({
            formData
        });
    };

    resetFormData = (formData = {}) => {
        this._submitSearchingData({
            formData: isEmpty(formData) ? this._emptyFormData : formData
        });
    };

    render() {
        const {onSchemaUpdate, onSubmit, onChange, onSearch, searchOnChange, schema, uiSchema, formData, ...formProps} = this.props;
        formProps.onSubmit = this._submitSearchingData;

        if (searchOnChange) {
            formProps.onChange = this._submitSearchingData;
        }
        return <Form {...formProps} schema={this.state.schema} uiSchema={this.state.uiSchema}
                     formData={{...this.state.formData}}/>;
    }
}

SearchForm.defaultProps = {
    searchOnChange: false,
    children: <div className='flex-list__form'>
        <button className="btn" type="submit">Search</button>
    </div>
};

SearchForm.propTypes = {
    searchOnChange: PropTypes.bool,
    onSchemaUpdate: PropTypes.func,
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.object,
    onSearch: PropTypes.func
};

export default SearchForm;
