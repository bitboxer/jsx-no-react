(function (exports) {
  'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  if (!Object.entries) {
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array

      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }

      return resArray;
    };
  }

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
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }

  function createElement(elem, attrs) {
    if (typeof elem.render === "function") {
      return elem.render();
    }

    if (elem instanceof Function) {
      return elem(attrs);
    }

    if (elem instanceof HTMLElement) {
      addAttributes(elem, attrs);
      return elem;
    }

    var element = document.createElement(elem);
    addAttributes(element, attrs);
    return element;
  }

  function render(elem, parent) {
    parent.insertAdjacentElement("afterbegin", elem);
  }

  function addAttributes(elem, attrs) {
    if (attrs === null || attrs === undefined) attrs = {};

    for (var _i = 0, _Object$entries = Object.entries(attrs); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          attr = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (value === true) elem.setAttribute(attr, attr);else if (attr.startsWith("on") && typeof value === "function") {
        elem.addEventListener(attr.substr(2).toLowerCase(), value);
      } else if (value !== false && value !== null && value !== undefined) {
        var _elem$classList;

        if (value instanceof Object) {
          (function () {
            var modifier = attr === "style" ? splitCamelCase : function (str) {
              return str.toLowerCase();
            };
            value = Object.entries(value).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  val = _ref2[1];

              return "".concat(modifier(key), ": ").concat(val);
            }).join("; ");
          })();
        }

        if (attr === "className" && value !== "") (_elem$classList = elem.classList).add.apply(_elem$classList, _toConsumableArray(value.toString().trim().split(" ")));else elem.setAttribute(attr, value.toString());
      }
    }
  }

  var createAndAppendSVG = function createAndAppendSVG(tag, attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    addAttributes(element, attrs);

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    for (var _i2 = 0, _children = children; _i2 < _children.length; _i2++) {
      var child = _children[_i2];
      var childElement = document.createElementNS('http://www.w3.org/2000/svg', child.nodeName.toLowerCase());

      var _iterator = _createForOfIteratorHelper(child.attributes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var attribute = _step.value;
          childElement.setAttributeNS(null, attribute.nodeName, attribute.nodeValue);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      appendChild(element, childElement);
    }

    return element;
  };

  function module (tag, attrs) {
    for (var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      children[_key2 - 2] = arguments[_key2];
    }

    if (tag === "svg") {
      return createAndAppendSVG.apply(void 0, [tag, attrs].concat(children));
    }

    var elem = createElement(tag, attrs);

    for (var _i3 = 0, _children2 = children; _i3 < _children2.length; _i3++) {
      var child = _children2[_i3];
      appendChild(elem, child);
    }

    return elem;
  }

  exports.default = module;
  exports.render = render;

  return exports;

}({}));
