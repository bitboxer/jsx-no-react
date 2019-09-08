"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports["default"] = _default;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function appendChild(elem, children) {
  if (!children || children === undefined) return;

  if (children instanceof Array) {
    children.map(function (child) {
      return appendChild(elem, child);
    });
    return;
  }

  var child = children;

  if (!(child instanceof Node)) {
    child = document.createTextNode(child.toString());
  }

  elem.appendChild(child);
}

function splitCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function createElement(elem, attrs) {
  if (typeof elem.render === 'function') return elem.render();
  if (elem instanceof Function) return elem(attrs);
  if (elem instanceof HTMLElement) return elem;
  return document.createElement(elem);
}

function render(elem, parent) {
  parent.insertAdjacentElement('afterbegin', elem);
}

function _default(tag, attrs) {
  var elem = createElement(tag, attrs);
  if (attrs === null || attrs === undefined) attrs = {};

  for (var _i = 0, _Object$entries = Object.entries(attrs); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        attr = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (value === true) elem.setAttribute(attr, attr);else if (attr.startsWith('on') && typeof value === 'function') {
      elem.addEventListener(attr.substr(2).toLowerCase(), value);
    } else if (value !== false && value !== null && value !== undefined) {
      var _elem$classList;

      if (value instanceof Object) {
        (function () {
          var modifier = attr === 'style' ? splitCamelCase : function (str) {
            return str.toLowerCase();
          };
          value = Object.entries(value).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                val = _ref2[1];

            return "".concat(modifier(key), ": ").concat(val);
          }).join('; ');
        })();
      }

      if (attr === 'className' && value !== '') (_elem$classList = elem.classList).add.apply(_elem$classList, _toConsumableArray(value.toString().trim().split(' ')));else elem.setAttribute(attr, value.toString());
    }
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  for (var _i2 = 0, _children = children; _i2 < _children.length; _i2++) {
    var child = _children[_i2];
    appendChild(elem, child);
  }

  return elem;
}