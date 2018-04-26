import React, {Component} from 'react';
import Form from 'react-jsonschema-form';
import PropTypes from "prop-types";

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
    constructor(props) {
        super(props);

        this.state = {
            formData: this.props.formData
        };
    }

    render() {
        return (
            <Form {...this.props} />
        );
    }
}

SearchForm.defaultProps = {
    schema: defaultSearchFormSchema,
    formData: {},
    children: <div className={'flex-list__form'}><button className="btn" type="submit">Search</button></div>
};

SearchForm.propTypes = {
    schema: PropTypes.object,
    formData: PropTypes.object
};

export default SearchForm;
