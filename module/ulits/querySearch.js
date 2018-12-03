function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import alasql from 'alasql';

var QuerySearch = function QuerySearch() {
    var _this = this;

    _classCallCheck(this, QuerySearch);

    this.select = function () {
        var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        _this.selection = selection;
        return _this;
    };

    this.from = function () {
        var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _this.source.push(source);
        return _this;
    };

    this.where = function () {
        var conditions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _this.conditions = conditions;
        return _this;
    };

    this.sort = function () {
        var sortings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _this.sortings = sortings;
        return _this;
    };

    this.execute = function () {
        var sql = 'SELECT ' + _this.selection + ' FROM ?';

        if (_this.conditions.length) {
            sql = sql + ' WHERE ' + _this.conditions;
        }

        if (_this.sortings.length) {
            sql = sql + ' ORDER BY ' + _this.sortings;
        }

        return alasql(sql, _this.source);
    };

    this.source = [];
    this.selection = '*';
    this.conditions = '';
    this.sortings = '';
};

export { QuerySearch };