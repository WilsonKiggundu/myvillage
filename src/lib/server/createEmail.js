'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEmail = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Path = require('path');

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Email = require('../lib/Email').default;

var STYLE_TAG = '%STYLE%';
var CONTENT_TAG = '%CONTENT%';

/**
 * Get the file from a relative path
 * @param {String} relativePath
 * @return {Promise.<string>}
 */
function getFile(relativePath) {
  return new Promise(function (resolve, reject) {
    var path = Path.join(__dirname, relativePath);

    return _fs2.default.readFile(path, { encoding: 'utf8' }, function (err, file) {
      if (err) return reject(err);
      return resolve(file);
    });
  });
}

var CreateEmail = exports.CreateEmail = function CreateEmail(data) {
  return Promise.all([getFile('../src/email-templates/inlined.css'), getFile('./email.html')]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        style = _ref2[0],
        template = _ref2[1];

    var emailElement = React.createElement(Email, { data: data });
    var content = ReactDOMServer.renderToStaticMarkup(emailElement);

    // Replace the template tags with the content
    var emailHTML = template;
    emailHTML = emailHTML.replace(CONTENT_TAG, content);
    emailHTML = emailHTML.replace(STYLE_TAG, style);

    return emailHTML;
  });
};