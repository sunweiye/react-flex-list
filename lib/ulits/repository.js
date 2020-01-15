"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _pouchdbCore = _interopRequireDefault(require("pouchdb-core"));

var _pouchdbAdapterMemory = _interopRequireDefault(require("pouchdb-adapter-memory"));

var _pouchdbFind = _interopRequireDefault(require("pouchdb-find"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _pouchDBQuery = require("./pouchDBQuery");

_pouchdbCore.default.plugin(_pouchdbFind.default);

var Repository =
/*#__PURE__*/
function () {
  function Repository() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var adapter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'memory';
    (0, _classCallCheck2.default)(this, Repository);
    (0, _defineProperty2.default)(this, "name", '');
    this.name = name ? name : (0, _v.default)().replace(/-/g, '').toLowerCase();

    _pouchdbCore.default.plugin(_pouchdbAdapterMemory.default);

    this._persistence = new _pouchdbCore.default(this.name, {
      adapter: adapter
    });
  }

  (0, _createClass2.default)(Repository, [{
    key: "insertRows",
    value: function () {
      var _insertRows = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var rows,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                rows = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
                return _context.abrupt("return", this._persistence.bulkDocs(rows));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function insertRows() {
        return _insertRows.apply(this, arguments);
      }

      return insertRows;
    }()
  }, {
    key: "createIndex",
    value: function () {
      var _createIndex = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var fields,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fields = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];
                return _context2.abrupt("return", this._persistence.createIndex({
                  index: {
                    fields: fields
                  }
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createIndex() {
        return _createIndex.apply(this, arguments);
      }

      return createIndex;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var query,
            withTotalCount,
            request,
            skip,
            limit,
            queryRequest,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                withTotalCount = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                request = query instanceof _pouchDBQuery.PouchDBQuery ? query.getQueryRequest() : query;

                if ((0, _typeof2.default)(request.selector) !== 'object') {
                  request.selector = {};
                }

                if (!withTotalCount) {
                  _context3.next = 7;
                  break;
                }

                skip = request.skip, limit = request.limit, queryRequest = (0, _objectWithoutProperties2.default)(request, ["skip", "limit"]);
                return _context3.abrupt("return", this._persistence.find(queryRequest).then(function (result) {
                  skip = skip || 0;
                  return {
                    total_rows: result.docs.length,
                    docs: result.docs.slice(skip, skip + limit)
                  };
                }));

              case 7:
                return _context3.abrupt("return", this._persistence.find(request));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function search() {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }]);
  return Repository;
}();

var repositories = {};

var getRepository = function getRepository() {
  var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'memory';
  var dbName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var repositoryInstance = repositories[dbName];

  if (!repositoryInstance) {
    repositoryInstance = new Repository(dbName, adapter);
    Object.freeze(repositoryInstance);
    repositories[repositoryInstance.name] = repositoryInstance;
  }

  return repositoryInstance;
};

var _default = getRepository;
exports.default = _default;