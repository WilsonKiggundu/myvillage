'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid = require('./layout/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Header = require('./elements/Header');

var _Title = require('./elements/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Body = require('./elements/Body');

var _Content = require('./elements/Content');

var _Footer = require('./elements/Footer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {

  container: {
    backgroundColor: '#efefef',
    padding: '20px 0',
    fontFamily: 'sans-serif',
    textAlign: "center"
  },

  main: {
    maxWidth: '500px',
    width: '100%'
  }

};

var Email = exports.Email = function Email(_ref) {
  var data = _ref.data;

  return _react2.default.createElement(
    'div',
    { style: style.container },
    _react2.default.createElement(
      _Grid2.default,
      { style: style.main },
      _react2.default.createElement(_Header.Header, null),
      _react2.default.createElement(
        _Body.Body,
        null,
        _react2.default.createElement(_Content.Content, { content: data.content })
      ),
      _react2.default.createElement(_Footer.Footer, null)
    )
  );
};