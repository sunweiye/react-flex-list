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
        const {onSubmit, onChange, onSearch, searchOnChange, schema, uiSchema, formData, ...formProps} = this.props;

        if (searchOnChange) {
            formProps.onChange = this._submitSearchingData;
        }
        return <Form {...formProps}
                     schema={this.state.schema}
                     uiSchema={this.state.uiSchema}
                     formData={{...this.state.formData}}
                     onSubmit={this._submitSearchingData}
        />;
    }
}

SearchForm.defaultProps = {
    searchOnChange: false,
    children: <div className='form'>
        <button className="btn" type="submit">Search</button>
    </div>
};

SearchForm.propTypes = {
    searchOnChange: PropTypes.bool,
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.object,
    onSearch: PropTypes.func
};

export default SearchForm;
