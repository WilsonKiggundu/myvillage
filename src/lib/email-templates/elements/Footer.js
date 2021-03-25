'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid = require('../layout/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {

  footer: {
    margin: '20px 0'
  },

  p: {
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0,
    color: '#607D8B',
    textAlign: 'center'
  },

  a: {
    color: '#00a1ef'
  }

};

var Footer = exports.Footer = function Footer() {
  return _react2.default.createElement(
    _Grid2.default,
    { style: style.footer },
    _react2.default.createElement(
      _Grid2.default.Cell,
      { style: style.content },
      _react2.default.createElement(
        'p',
        { style: style.p },
        'This is an auto-generated email sent from an unmonitored emailing list. You may not reply to it directly.'
      ),
      _react2.default.createElement(
        'p',
        { style: style.p },
        _react2.default.createElement(
          'a',
          { style: style.a, href: 'https://myvillage.africa' },
          'My Village'
        )
      )
    )
  );
};