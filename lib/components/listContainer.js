"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListContainer = function (_Component) {
    _inherits(ListContainer, _Component);

    function ListContainer(props) {
        _classCallCheck(this, ListContainer);

        return _possibleConstructorReturn(this, (ListContainer.__proto__ || Object.getPrototypeOf(ListContainer)).call(this, props));
    }

    _createClass(ListContainer, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                data = _props.data,
                renderItem = _props.renderItem,
                onListRender = _props.onListRender,
                emptyListContent = _props.emptyListContent,
                children = _props.children,
                listContainerProps = _objectWithoutProperties(_props, ["data", "renderItem", "onListRender", "emptyListContent", "children"]);

            return _react2.default.createElement(
                "div",
                listContainerProps,
                data.length ? onListRender(data).map(function (itemData, index) {
                    return renderItem(index, itemData);
                }) : emptyListContent,
                children
            );
        }
    }]);

    return ListContainer;
}(_react.Component);

ListContainer.defaultProps = {
    data: [],
    renderItem: function renderItem(index, itemData) {
        return _react2.default.createElement(
            "div",
            { key: index },
            itemData instanceof Object ? JSON.stringify(itemData) : itemData
        );
    },
    onListRender: function onListRender(data) {
        return data;
    }
};

ListContainer.propsTypes = {
    data: _propTypes2.default.array,
    renderItem: _propTypes2.default.func,
    onListRender: _propTypes2.default.func,
    emptyListContent: _propTypes2.default.func
};

exports.default = ListContainer;