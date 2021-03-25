'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Content = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _Grid = require('../layout/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Img = require('./Img');

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  container: {
    color: '#333'
  }
};

var Content = exports.Content = function Content(_ref) {
  var content = _ref.content;

  return _react2.default.createElement(
    _Grid2.default,
    { style: style.container },
    _react2.default.createElement(
      _Grid2.default.Cell,
      null,
      _react2.default.createElement(
        _Grid2.default.Row,
        null,
        content
      )
    )
  );
};