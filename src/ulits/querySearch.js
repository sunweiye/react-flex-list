import alasql from 'alasql';

class QuerySearch {
    constructor() {
        this.source = [];
        this.selection = '*';
        this.conditions = '';
        this.sortings = ''
    }

    select = (selection = '*') => {
        this.selection = selection;
        return this;
    };

    from = (source = []) => {
        this.source.push(source);
        return this;
    };

    where = (conditions = '') => {
        this.conditions = conditions;
        return this;
    };

    sort = (sortings = '') => {
        this.sortings = sortings;
        return this;
    };

    execute = () => {
        let sql = `SELECT ${this.selection} FROM ?`;

        if(this.conditions.length) {
            sql = sql + ' WHERE ' + this.conditions;
        }

        if(this.sortings.length) {
            sql = sql + ' ORDER BY ' + this.sortings;
        }

        return alasql(sql, this.source);
    }

}

export {QuerySearch};
