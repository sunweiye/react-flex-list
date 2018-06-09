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
    constructor(props) {
        super(props);

        this.state = {
            formData: this.props.formData
        };
    }

    _shouldSubmitData(search, filters) {
        let {_q, ...lastFilters} = this.state.formData,
            lastSearchInput = this.state.formData['_q'] + '';

        if (lastSearchInput !== search) {
            return true;
        }

        // @todo Deep compare for the filters. Now a simple first level compare is uesd
        for (let filterKey in filters) {
            if (lastFilters[filterKey] !== filters[filterKey]) {
                return true;
            }
        }

        return false;
    }

    _submitSearchingData = ({formData}) => {
        const {_q, ...filters} = formData;
        formData._q = Utility.isEmpty(_q) ? '' : _q.trim();

        if (this._shouldSubmitData(formData._q, filters)) {
            this.props.onSearch(formData);
            this.setState({
                formData: formData
            });
        }
    };

    render() {
        const {onSubmit, onChange, onSearch, searchOnChange, formData, ...formProps} = this.props;
        formProps.onSubmit = this._submitSearchingData;

        if (searchOnChange) {
            formProps.onChange = this._submitSearchingData;
        }

        return (
            <Form {...formProps} formData={this.state.formData}/>
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
    schema: PropTypes.object,
    formData: PropTypes.object,
    onSearch: PropTypes.func
};

export default SearchForm;
