import isEmpty from 'lodash/isEmpty';

class PouchDBQuery {
    _request = {selector: {}};

    addCondition(fieldName = null, operator, value) {
        let selector = this._request.selector;
        fieldName ? selector[fieldName] = {[operator]: value} : selector[operator] = value;
    }

    addSelector(selectorObj) {
        this._request.selector = {...this._request.selector, ...selectorObj};
    }

    sortBy(field, order = 'ASC') {
        let fieldSortConfig = {[field]: 'desc'};
        this._request.sort = isEmpty(this._request.sort) ? [fieldSortConfig] : [...this._request.sort, fieldSortConfig];
        if(!this._request.selector.hasOwnProperty(field)) {
            this.addCondition(field, '$exists', true)
        }
    };

    limit(limit) {
        this._request.limit = limit;
    };

    skip(skip = 0) {
        this._request.skip = skip;
    };

    reset() {
        this._request = {selector: {}};
    }

    getQueryRequest () {
        return {...this._request};
    }
}

export {PouchDBQuery}
