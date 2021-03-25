'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableStyle = {

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  }

};

function Cell(_ref) {
  var children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      className = _ref.className;

  return _react2.default.createElement(
    'td',
    { style: style, className: className },
    children
  );
}

function Row(_ref2) {
  var children = _ref2.children,
      _ref2$style = _ref2.style,
      style = _ref2$style === undefined ? {} : _ref2$style;

  return _react2.default.createElement(
    'tr',
    { style: style },
    _react2.default.Children.map(children, function (el) {
      if (el.type === Cell) return el;
      return _react2.default.createElement(
        'td',
        null,
        el
      );
    })
  );
}

function Grid(_ref3) {
  var children = _ref3.children,
      _ref3$style = _ref3.style,
      style = _ref3$style === undefined ? {} : _ref3$style;

  return _react2.default.createElement(
    'table',
    { style: Object.assign({}, tableStyle.table, style) },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.Children.map(children, function (el) {
        if (!el) return;

        // We want this content the be on it's own row.
        if (el.type === Row) return el;

        // The content is all inside a single cell (so a row)
        if (el.type === Cell) {
          return _react2.default.createElement(
            'tr',
            null,
            el
          );
        }

        // The content is one cell inside it's own row
        return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            el
          )
        );
      })
    )
  );
}

Grid.Row = Row;
Grid.Cell = Cell;

exports.default = Grid;