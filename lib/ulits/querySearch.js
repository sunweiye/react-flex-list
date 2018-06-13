'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuerySearch = undefined;

var _alasql = require('alasql');

var _alasql2 = _interopRequireDefault(_alasql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuerySearch = function QuerySearch() {
    var _this = this;

    _classCallCheck(this, QuerySearch);

    this.select = function (selection) {
        _this.selection = selection;
        return _this;
    };

    this.from = function (source) {
        _this.source.push(source);
        return _this;
    };

    this.where = function (conditions) {
        _this.conditions = conditions;
        return _this;
    };

    this.execute = function () {
        var sql = 'SELECT ' + _this.selection + ' FROM ?';
        if (_this.conditions.length) {
            sql = sql + ' WHERE ' + _this.conditions;
        };

        return (0, _alasql2.default)(sql, _this.source);
    };

    this.source = [];
    this.selection = '*';
    this.conditions = '';
};

exports.QuerySearch = QuerySearch;