// Version 1.39.1 three-forcegraph - https://github.com/vasturiano/three-forcegraph
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
  typeof define === 'function' && define.amd ? define(['three'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ThreeForceGraph = factory(global.THREE));
}(this, (function (three$2) { 'use strict';

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2$1(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$1(Object(source), true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _objectWithoutPropertiesLoose$2(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties$2(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose$2(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray$3(arr, i) {
    return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
  }

  function _toConsumableArray$2(arr) {
    return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$2();
  }

  function _arrayWithoutHoles$2(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$3(arr);
  }

  function _arrayWithHoles$3(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray$2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit$3(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

  function _unsupportedIterableToArray$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
  }

  function _arrayLikeToArray$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread$2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function d3ForceCenter(x, y, z) {
    var nodes, strength = 1;

    if (x == null) x = 0;
    if (y == null) y = 0;
    if (z == null) z = 0;

    function force() {
      var i,
          n = nodes.length,
          node,
          sx = 0,
          sy = 0,
          sz = 0;

      for (i = 0; i < n; ++i) {
        node = nodes[i], sx += node.x || 0, sy += node.y || 0, sz += node.z || 0;
      }

      for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, sz = (sz / n - z) * strength, i = 0; i < n; ++i) {
        node = nodes[i];
        if (sx) { node.x -= sx; }
        if (sy) { node.y -= sy; }
        if (sz) { node.z -= sz; }
      }
    }

    force.initialize = function(_) {
      nodes = _;
    };

    force.x = function(_) {
      return arguments.length ? (x = +_, force) : x;
    };

    force.y = function(_) {
      return arguments.length ? (y = +_, force) : y;
    };

    force.z = function(_) {
      return arguments.length ? (z = +_, force) : z;
    };

    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };

    return force;
  }

  function tree_add$2(d) {
    var x = +this._x.call(null, d);
    return add$2(this.cover(x), x, d);
  }

  function add$2(tree, x, d) {
    if (isNaN(x)) return tree; // ignore invalid points

    var parent,
        node = tree._root,
        leaf = {data: d},
        x0 = tree._x0,
        x1 = tree._x1,
        xm,
        xp,
        right,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return tree._root = leaf, tree;

    // Find the existing leaf for the new point, or add it.
    while (node.length) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (parent = node, !(node = node[i = +right])) return parent[i] = leaf, tree;
    }

    // Is the new point is exactly coincident with the existing point?
    xp = +tree._x.call(null, node.data);
    if (x === xp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

    // Otherwise, split the leaf node until the old and new point are separated.
    do {
      parent = parent ? parent[i] = new Array(2) : tree._root = new Array(2);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    } while ((i = +right) === (j = +(xp >= xm)));
    return parent[j] = node, parent[i] = leaf, tree;
  }

  function addAll$2(data) {
    var i, n = data.length,
        x,
        xz = new Array(n),
        x0 = Infinity,
        x1 = -Infinity;

    // Compute the points and their extent.
    for (i = 0; i < n; ++i) {
      if (isNaN(x = +this._x.call(null, data[i]))) continue;
      xz[i] = x;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
    }

    // If there were no (valid) points, abort.
    if (x0 > x1) return this;

    // Expand the tree to cover the new points.
    this.cover(x0).cover(x1);

    // Add the new points.
    for (i = 0; i < n; ++i) {
      add$2(this, xz[i], data[i]);
    }

    return this;
  }

  function tree_cover$2(x) {
    if (isNaN(x = +x)) return this; // ignore invalid points

    var x0 = this._x0,
        x1 = this._x1;

    // If the binarytree has no extent, initialize them.
    // Integer extent are necessary so that if we later double the extent,
    // the existing half boundaries don’t change due to floating point error!
    if (isNaN(x0)) {
      x1 = (x0 = Math.floor(x)) + 1;
    }

    // Otherwise, double repeatedly to cover.
    else {
      var z = x1 - x0 || 1,
          node = this._root,
          parent,
          i;

      while (x0 > x || x >= x1) {
        i = +(x < x0);
        parent = new Array(2), parent[i] = node, node = parent, z *= 2;
        switch (i) {
          case 0: x1 = x0 + z; break;
          case 1: x0 = x1 - z; break;
        }
      }

      if (this._root && this._root.length) this._root = node;
    }

    this._x0 = x0;
    this._x1 = x1;
    return this;
  }

  function tree_data$2() {
    var data = [];
    this.visit(function(node) {
      if (!node.length) do data.push(node.data); while (node = node.next)
    });
    return data;
  }

  function tree_extent$2(_) {
    return arguments.length
        ? this.cover(+_[0][0]).cover(+_[1][0])
        : isNaN(this._x0) ? undefined : [[this._x0], [this._x1]];
  }

  function Half(node, x0, x1) {
    this.node = node;
    this.x0 = x0;
    this.x1 = x1;
  }

  function tree_find$2(x, radius) {
    var data,
        x0 = this._x0,
        x1,
        x2,
        x3 = this._x1,
        halves = [],
        node = this._root,
        q,
        i;

    if (node) halves.push(new Half(node, x0, x3));
    if (radius == null) radius = Infinity;
    else {
      x0 = x - radius;
      x3 = x + radius;
    }

    while (q = halves.pop()) {

      // Stop searching if this half can’t contain a closer node.
      if (!(node = q.node)
          || (x1 = q.x0) > x3
          || (x2 = q.x1) < x0) continue;

      // Bisect the current half.
      if (node.length) {
        var xm = (x1 + x2) / 2;

        halves.push(
          new Half(node[1], xm, x2),
          new Half(node[0], x1, xm)
        );

        // Visit the closest half first.
        if (i = +(x >= xm)) {
          q = halves[halves.length - 1];
          halves[halves.length - 1] = halves[halves.length - 1 - i];
          halves[halves.length - 1 - i] = q;
        }
      }

      // Visit this point. (Visiting coincident points isn’t necessary!)
      else {
        var d = Math.abs(x - +this._x.call(null, node.data));
        if (d < radius) {
          radius = d;
          x0 = x - d;
          x3 = x + d;
          data = node.data;
        }
      }
    }

    return data;
  }

  function tree_remove$2(d) {
    if (isNaN(x = +this._x.call(null, d))) return this; // ignore invalid points

    var parent,
        node = this._root,
        retainer,
        previous,
        next,
        x0 = this._x0,
        x1 = this._x1,
        x,
        xm,
        right,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return this;

    // Find the leaf node for the point.
    // While descending, also retain the deepest parent with a non-removed sibling.
    if (node.length) while (true) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (!(parent = node, node = node[i = +right])) return this;
      if (!node.length) break;
      if (parent[(i + 1) & 1]) retainer = parent, j = i;
    }

    // Find the point to remove.
    while (node.data !== d) if (!(previous = node, node = node.next)) return this;
    if (next = node.next) delete node.next;

    // If there are multiple coincident points, remove just the point.
    if (previous) return (next ? previous.next = next : delete previous.next), this;

    // If this is the root point, remove it.
    if (!parent) return this._root = next, this;

    // Remove this leaf.
    next ? parent[i] = next : delete parent[i];

    // If the parent now contains exactly one leaf, collapse superfluous parents.
    if ((node = parent[0] || parent[1])
        && node === (parent[1] || parent[0])
        && !node.length) {
      if (retainer) retainer[j] = node;
      else this._root = node;
    }

    return this;
  }

  function removeAll$2(data) {
    for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
    return this;
  }

  function tree_root$2() {
    return this._root;
  }

  function tree_size$2() {
    var size = 0;
    this.visit(function(node) {
      if (!node.length) do ++size; while (node = node.next)
    });
    return size;
  }

  function tree_visit$2(callback) {
    var halves = [], q, node = this._root, child, x0, x1;
    if (node) halves.push(new Half(node, this._x0, this._x1));
    while (q = halves.pop()) {
      if (!callback(node = q.node, x0 = q.x0, x1 = q.x1) && node.length) {
        var xm = (x0 + x1) / 2;
        if (child = node[1]) halves.push(new Half(child, xm, x1));
        if (child = node[0]) halves.push(new Half(child, x0, xm));
      }
    }
    return this;
  }

  function tree_visitAfter$2(callback) {
    var halves = [], next = [], q;
    if (this._root) halves.push(new Half(this._root, this._x0, this._x1));
    while (q = halves.pop()) {
      var node = q.node;
      if (node.length) {
        var child, x0 = q.x0, x1 = q.x1, xm = (x0 + x1) / 2;
        if (child = node[0]) halves.push(new Half(child, x0, xm));
        if (child = node[1]) halves.push(new Half(child, xm, x1));
      }
      next.push(q);
    }
    while (q = next.pop()) {
      callback(q.node, q.x0, q.x1);
    }
    return this;
  }

  function defaultX$2(d) {
    return d[0];
  }

  function tree_x$2(_) {
    return arguments.length ? (this._x = _, this) : this._x;
  }

  function binarytree(nodes, x) {
    var tree = new Binarytree(x == null ? defaultX$2 : x, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
  }

  function Binarytree(x, x0, x1) {
    this._x = x;
    this._x0 = x0;
    this._x1 = x1;
    this._root = undefined;
  }

  function leaf_copy$2(leaf) {
    var copy = {data: leaf.data}, next = copy;
    while (leaf = leaf.next) next = next.next = {data: leaf.data};
    return copy;
  }

  var treeProto$2 = binarytree.prototype = Binarytree.prototype;

  treeProto$2.copy = function() {
    var copy = new Binarytree(this._x, this._x0, this._x1),
        node = this._root,
        nodes,
        child;

    if (!node) return copy;

    if (!node.length) return copy._root = leaf_copy$2(node), copy;

    nodes = [{source: node, target: copy._root = new Array(2)}];
    while (node = nodes.pop()) {
      for (var i = 0; i < 2; ++i) {
        if (child = node.source[i]) {
          if (child.length) nodes.push({source: child, target: node.target[i] = new Array(2)});
          else node.target[i] = leaf_copy$2(child);
        }
      }
    }

    return copy;
  };

  treeProto$2.add = tree_add$2;
  treeProto$2.addAll = addAll$2;
  treeProto$2.cover = tree_cover$2;
  treeProto$2.data = tree_data$2;
  treeProto$2.extent = tree_extent$2;
  treeProto$2.find = tree_find$2;
  treeProto$2.remove = tree_remove$2;
  treeProto$2.removeAll = removeAll$2;
  treeProto$2.root = tree_root$2;
  treeProto$2.size = tree_size$2;
  treeProto$2.visit = tree_visit$2;
  treeProto$2.visitAfter = tree_visitAfter$2;
  treeProto$2.x = tree_x$2;

  function tree_add$1(d) {
    const x = +this._x.call(null, d),
        y = +this._y.call(null, d);
    return add$1(this.cover(x, y), x, y, d);
  }

  function add$1(tree, x, y, d) {
    if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

    var parent,
        node = tree._root,
        leaf = {data: d},
        x0 = tree._x0,
        y0 = tree._y0,
        x1 = tree._x1,
        y1 = tree._y1,
        xm,
        ym,
        xp,
        yp,
        right,
        bottom,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return tree._root = leaf, tree;

    // Find the existing leaf for the new point, or add it.
    while (node.length) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
    }

    // Is the new point is exactly coincident with the existing point?
    xp = +tree._x.call(null, node.data);
    yp = +tree._y.call(null, node.data);
    if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

    // Otherwise, split the leaf node until the old and new point are separated.
    do {
      parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
    return parent[j] = node, parent[i] = leaf, tree;
  }

  function addAll$1(data) {
    var d, i, n = data.length,
        x,
        y,
        xz = new Array(n),
        yz = new Array(n),
        x0 = Infinity,
        y0 = Infinity,
        x1 = -Infinity,
        y1 = -Infinity;

    // Compute the points and their extent.
    for (i = 0; i < n; ++i) {
      if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
      xz[i] = x;
      yz[i] = y;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }

    // If there were no (valid) points, abort.
    if (x0 > x1 || y0 > y1) return this;

    // Expand the tree to cover the new points.
    this.cover(x0, y0).cover(x1, y1);

    // Add the new points.
    for (i = 0; i < n; ++i) {
      add$1(this, xz[i], yz[i], data[i]);
    }

    return this;
  }

  function tree_cover$1(x, y) {
    if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

    var x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1;

    // If the quadtree has no extent, initialize them.
    // Integer extent are necessary so that if we later double the extent,
    // the existing quadrant boundaries don’t change due to floating point error!
    if (isNaN(x0)) {
      x1 = (x0 = Math.floor(x)) + 1;
      y1 = (y0 = Math.floor(y)) + 1;
    }

    // Otherwise, double repeatedly to cover.
    else {
      var z = x1 - x0 || 1,
          node = this._root,
          parent,
          i;

      while (x0 > x || x >= x1 || y0 > y || y >= y1) {
        i = (y < y0) << 1 | (x < x0);
        parent = new Array(4), parent[i] = node, node = parent, z *= 2;
        switch (i) {
          case 0: x1 = x0 + z, y1 = y0 + z; break;
          case 1: x0 = x1 - z, y1 = y0 + z; break;
          case 2: x1 = x0 + z, y0 = y1 - z; break;
          case 3: x0 = x1 - z, y0 = y1 - z; break;
        }
      }

      if (this._root && this._root.length) this._root = node;
    }

    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    return this;
  }

  function tree_data$1() {
    var data = [];
    this.visit(function(node) {
      if (!node.length) do data.push(node.data); while (node = node.next)
    });
    return data;
  }

  function tree_extent$1(_) {
    return arguments.length
        ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
        : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
  }

  function Quad(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  function tree_find$1(x, y, radius) {
    var data,
        x0 = this._x0,
        y0 = this._y0,
        x1,
        y1,
        x2,
        y2,
        x3 = this._x1,
        y3 = this._y1,
        quads = [],
        node = this._root,
        q,
        i;

    if (node) quads.push(new Quad(node, x0, y0, x3, y3));
    if (radius == null) radius = Infinity;
    else {
      x0 = x - radius, y0 = y - radius;
      x3 = x + radius, y3 = y + radius;
      radius *= radius;
    }

    while (q = quads.pop()) {

      // Stop searching if this quadrant can’t contain a closer node.
      if (!(node = q.node)
          || (x1 = q.x0) > x3
          || (y1 = q.y0) > y3
          || (x2 = q.x1) < x0
          || (y2 = q.y1) < y0) continue;

      // Bisect the current quadrant.
      if (node.length) {
        var xm = (x1 + x2) / 2,
            ym = (y1 + y2) / 2;

        quads.push(
          new Quad(node[3], xm, ym, x2, y2),
          new Quad(node[2], x1, ym, xm, y2),
          new Quad(node[1], xm, y1, x2, ym),
          new Quad(node[0], x1, y1, xm, ym)
        );

        // Visit the closest quadrant first.
        if (i = (y >= ym) << 1 | (x >= xm)) {
          q = quads[quads.length - 1];
          quads[quads.length - 1] = quads[quads.length - 1 - i];
          quads[quads.length - 1 - i] = q;
        }
      }

      // Visit this point. (Visiting coincident points isn’t necessary!)
      else {
        var dx = x - +this._x.call(null, node.data),
            dy = y - +this._y.call(null, node.data),
            d2 = dx * dx + dy * dy;
        if (d2 < radius) {
          var d = Math.sqrt(radius = d2);
          x0 = x - d, y0 = y - d;
          x3 = x + d, y3 = y + d;
          data = node.data;
        }
      }
    }

    return data;
  }

  function tree_remove$1(d) {
    if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

    var parent,
        node = this._root,
        retainer,
        previous,
        next,
        x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1,
        x,
        y,
        xm,
        ym,
        right,
        bottom,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return this;

    // Find the leaf node for the point.
    // While descending, also retain the deepest parent with a non-removed sibling.
    if (node.length) while (true) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
      if (!node.length) break;
      if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
    }

    // Find the point to remove.
    while (node.data !== d) if (!(previous = node, node = node.next)) return this;
    if (next = node.next) delete node.next;

    // If there are multiple coincident points, remove just the point.
    if (previous) return (next ? previous.next = next : delete previous.next), this;

    // If this is the root point, remove it.
    if (!parent) return this._root = next, this;

    // Remove this leaf.
    next ? parent[i] = next : delete parent[i];

    // If the parent now contains exactly one leaf, collapse superfluous parents.
    if ((node = parent[0] || parent[1] || parent[2] || parent[3])
        && node === (parent[3] || parent[2] || parent[1] || parent[0])
        && !node.length) {
      if (retainer) retainer[j] = node;
      else this._root = node;
    }

    return this;
  }

  function removeAll$1(data) {
    for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
    return this;
  }

  function tree_root$1() {
    return this._root;
  }

  function tree_size$1() {
    var size = 0;
    this.visit(function(node) {
      if (!node.length) do ++size; while (node = node.next)
    });
    return size;
  }

  function tree_visit$1(callback) {
    var quads = [], q, node = this._root, child, x0, y0, x1, y1;
    if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
        var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      }
    }
    return this;
  }

  function tree_visitAfter$1(callback) {
    var quads = [], next = [], q;
    if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      var node = q.node;
      if (node.length) {
        var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      }
      next.push(q);
    }
    while (q = next.pop()) {
      callback(q.node, q.x0, q.y0, q.x1, q.y1);
    }
    return this;
  }

  function defaultX$1(d) {
    return d[0];
  }

  function tree_x$1(_) {
    return arguments.length ? (this._x = _, this) : this._x;
  }

  function defaultY$1(d) {
    return d[1];
  }

  function tree_y$1(_) {
    return arguments.length ? (this._y = _, this) : this._y;
  }

  function quadtree(nodes, x, y) {
    var tree = new Quadtree(x == null ? defaultX$1 : x, y == null ? defaultY$1 : y, NaN, NaN, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
  }

  function Quadtree(x, y, x0, y0, x1, y1) {
    this._x = x;
    this._y = y;
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    this._root = undefined;
  }

  function leaf_copy$1(leaf) {
    var copy = {data: leaf.data}, next = copy;
    while (leaf = leaf.next) next = next.next = {data: leaf.data};
    return copy;
  }

  var treeProto$1 = quadtree.prototype = Quadtree.prototype;

  treeProto$1.copy = function() {
    var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
        node = this._root,
        nodes,
        child;

    if (!node) return copy;

    if (!node.length) return copy._root = leaf_copy$1(node), copy;

    nodes = [{source: node, target: copy._root = new Array(4)}];
    while (node = nodes.pop()) {
      for (var i = 0; i < 4; ++i) {
        if (child = node.source[i]) {
          if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
          else node.target[i] = leaf_copy$1(child);
        }
      }
    }

    return copy;
  };

  treeProto$1.add = tree_add$1;
  treeProto$1.addAll = addAll$1;
  treeProto$1.cover = tree_cover$1;
  treeProto$1.data = tree_data$1;
  treeProto$1.extent = tree_extent$1;
  treeProto$1.find = tree_find$1;
  treeProto$1.remove = tree_remove$1;
  treeProto$1.removeAll = removeAll$1;
  treeProto$1.root = tree_root$1;
  treeProto$1.size = tree_size$1;
  treeProto$1.visit = tree_visit$1;
  treeProto$1.visitAfter = tree_visitAfter$1;
  treeProto$1.x = tree_x$1;
  treeProto$1.y = tree_y$1;

  function tree_add(d) {
    var x = +this._x.call(null, d),
        y = +this._y.call(null, d),
        z = +this._z.call(null, d);
    return add(this.cover(x, y, z), x, y, z, d);
  }

  function add(tree, x, y, z, d) {
    if (isNaN(x) || isNaN(y) || isNaN(z)) return tree; // ignore invalid points

    var parent,
        node = tree._root,
        leaf = {data: d},
        x0 = tree._x0,
        y0 = tree._y0,
        z0 = tree._z0,
        x1 = tree._x1,
        y1 = tree._y1,
        z1 = tree._z1,
        xm,
        ym,
        zm,
        xp,
        yp,
        zp,
        right,
        bottom,
        deep,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return tree._root = leaf, tree;

    // Find the existing leaf for the new point, or add it.
    while (node.length) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (deep = z >= (zm = (z0 + z1) / 2)) z0 = zm; else z1 = zm;
      if (parent = node, !(node = node[i = deep << 2 | bottom << 1 | right])) return parent[i] = leaf, tree;
    }

    // Is the new point is exactly coincident with the existing point?
    xp = +tree._x.call(null, node.data);
    yp = +tree._y.call(null, node.data);
    zp = +tree._z.call(null, node.data);
    if (x === xp && y === yp && z === zp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

    // Otherwise, split the leaf node until the old and new point are separated.
    do {
      parent = parent ? parent[i] = new Array(8) : tree._root = new Array(8);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (deep = z >= (zm = (z0 + z1) / 2)) z0 = zm; else z1 = zm;
    } while ((i = deep << 2 | bottom << 1 | right) === (j = (zp >= zm) << 2 | (yp >= ym) << 1 | (xp >= xm)));
    return parent[j] = node, parent[i] = leaf, tree;
  }

  function addAll(data) {
    var d, i, n = data.length,
        x,
        y,
        z,
        xz = new Array(n),
        yz = new Array(n),
        zz = new Array(n),
        x0 = Infinity,
        y0 = Infinity,
        z0 = Infinity,
        x1 = -Infinity,
        y1 = -Infinity,
        z1 = -Infinity;

    // Compute the points and their extent.
    for (i = 0; i < n; ++i) {
      if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d)) || isNaN(z = +this._z.call(null, d))) continue;
      xz[i] = x;
      yz[i] = y;
      zz[i] = z;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      if (z < z0) z0 = z;
      if (z > z1) z1 = z;
    }

    // If there were no (valid) points, abort.
    if (x0 > x1 || y0 > y1 || z0 > z1) return this;

    // Expand the tree to cover the new points.
    this.cover(x0, y0, z0).cover(x1, y1, z1);

    // Add the new points.
    for (i = 0; i < n; ++i) {
      add(this, xz[i], yz[i], zz[i], data[i]);
    }

    return this;
  }

  function tree_cover(x, y, z) {
    if (isNaN(x = +x) || isNaN(y = +y) || isNaN(z = +z)) return this; // ignore invalid points

    var x0 = this._x0,
        y0 = this._y0,
        z0 = this._z0,
        x1 = this._x1,
        y1 = this._y1,
        z1 = this._z1;

    // If the octree has no extent, initialize them.
    // Integer extent are necessary so that if we later double the extent,
    // the existing octant boundaries don’t change due to floating point error!
    if (isNaN(x0)) {
      x1 = (x0 = Math.floor(x)) + 1;
      y1 = (y0 = Math.floor(y)) + 1;
      z1 = (z0 = Math.floor(z)) + 1;
    }

    // Otherwise, double repeatedly to cover.
    else {
      var t = x1 - x0 || 1,
          node = this._root,
          parent,
          i;

      while (x0 > x || x >= x1 || y0 > y || y >= y1 || z0 > z || z >= z1) {
        i = (z < z0) << 2 | (y < y0) << 1 | (x < x0);
        parent = new Array(8), parent[i] = node, node = parent, t *= 2;
        switch (i) {
          case 0: x1 = x0 + t, y1 = y0 + t, z1 = z0 + t; break;
          case 1: x0 = x1 - t, y1 = y0 + t, z1 = z0 + t; break;
          case 2: x1 = x0 + t, y0 = y1 - t, z1 = z0 + t; break;
          case 3: x0 = x1 - t, y0 = y1 - t, z1 = z0 + t; break;
          case 4: x1 = x0 + t, y1 = y0 + t, z0 = z1 - t; break;
          case 5: x0 = x1 - t, y1 = y0 + t, z0 = z1 - t; break;
          case 6: x1 = x0 + t, y0 = y1 - t, z0 = z1 - t; break;
          case 7: x0 = x1 - t, y0 = y1 - t, z0 = z1 - t; break;
        }
      }

      if (this._root && this._root.length) this._root = node;
    }

    this._x0 = x0;
    this._y0 = y0;
    this._z0 = z0;
    this._x1 = x1;
    this._y1 = y1;
    this._z1 = z1;
    return this;
  }

  function tree_data() {
    var data = [];
    this.visit(function(node) {
      if (!node.length) do data.push(node.data); while (node = node.next)
    });
    return data;
  }

  function tree_extent(_) {
    return arguments.length
        ? this.cover(+_[0][0], +_[0][1], +_[0][2]).cover(+_[1][0], +_[1][1], +_[1][2])
        : isNaN(this._x0) ? undefined : [[this._x0, this._y0, this._z0], [this._x1, this._y1, this._z1]];
  }

  function Octant(node, x0, y0, z0, x1, y1, z1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.z0 = z0;
    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
  }

  function tree_find(x, y, z, radius) {
    var data,
        x0 = this._x0,
        y0 = this._y0,
        z0 = this._z0,
        x1,
        y1,
        z1,
        x2,
        y2,
        z2,
        x3 = this._x1,
        y3 = this._y1,
        z3 = this._z1,
        octs = [],
        node = this._root,
        q,
        i;

    if (node) octs.push(new Octant(node, x0, y0, z0, x3, y3, z3));
    if (radius == null) radius = Infinity;
    else {
      x0 = x - radius, y0 = y - radius, z0 = z - radius;
      x3 = x + radius, y3 = y + radius, z3 = z + radius;
      radius *= radius;
    }

    while (q = octs.pop()) {

      // Stop searching if this octant can’t contain a closer node.
      if (!(node = q.node)
          || (x1 = q.x0) > x3
          || (y1 = q.y0) > y3
          || (z1 = q.z0) > z3
          || (x2 = q.x1) < x0
          || (y2 = q.y1) < y0
          || (z2 = q.z1) < z0) continue;

      // Bisect the current octant.
      if (node.length) {
        var xm = (x1 + x2) / 2,
            ym = (y1 + y2) / 2,
            zm = (z1 + z2) / 2;

        octs.push(
          new Octant(node[7], xm, ym, zm, x2, y2, z2),
          new Octant(node[6], x1, ym, zm, xm, y2, z2),
          new Octant(node[5], xm, y1, zm, x2, ym, z2),
          new Octant(node[4], x1, y1, zm, xm, ym, z2),
          new Octant(node[3], xm, ym, z1, x2, y2, zm),
          new Octant(node[2], x1, ym, z1, xm, y2, zm),
          new Octant(node[1], xm, y1, z1, x2, ym, zm),
          new Octant(node[0], x1, y1, z1, xm, ym, zm)
        );

        // Visit the closest octant first.
        if (i = (z >= zm) << 2 | (y >= ym) << 1 | (x >= xm)) {
          q = octs[octs.length - 1];
          octs[octs.length - 1] = octs[octs.length - 1 - i];
          octs[octs.length - 1 - i] = q;
        }
      }

      // Visit this point. (Visiting coincident points isn’t necessary!)
      else {
        var dx = x - +this._x.call(null, node.data),
            dy = y - +this._y.call(null, node.data),
            dz = z - +this._z.call(null, node.data),
            d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < radius) {
          var d = Math.sqrt(radius = d2);
          x0 = x - d, y0 = y - d, z0 = z - d;
          x3 = x + d, y3 = y + d, z3 = z + d;
          data = node.data;
        }
      }
    }

    return data;
  }

  function tree_remove(d) {
    if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d)) || isNaN(z = +this._z.call(null, d))) return this; // ignore invalid points

    var parent,
        node = this._root,
        retainer,
        previous,
        next,
        x0 = this._x0,
        y0 = this._y0,
        z0 = this._z0,
        x1 = this._x1,
        y1 = this._y1,
        z1 = this._z1,
        x,
        y,
        z,
        xm,
        ym,
        zm,
        right,
        bottom,
        deep,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return this;

    // Find the leaf node for the point.
    // While descending, also retain the deepest parent with a non-removed sibling.
    if (node.length) while (true) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (deep = z >= (zm = (z0 + z1) / 2)) z0 = zm; else z1 = zm;
      if (!(parent = node, node = node[i = deep << 2 | bottom << 1 | right])) return this;
      if (!node.length) break;
      if (parent[(i + 1) & 7] || parent[(i + 2) & 7] || parent[(i + 3) & 7] || parent[(i + 4) & 7] || parent[(i + 5) & 7] || parent[(i + 6) & 7] || parent[(i + 7) & 7]) retainer = parent, j = i;
    }

    // Find the point to remove.
    while (node.data !== d) if (!(previous = node, node = node.next)) return this;
    if (next = node.next) delete node.next;

    // If there are multiple coincident points, remove just the point.
    if (previous) return (next ? previous.next = next : delete previous.next), this;

    // If this is the root point, remove it.
    if (!parent) return this._root = next, this;

    // Remove this leaf.
    next ? parent[i] = next : delete parent[i];

    // If the parent now contains exactly one leaf, collapse superfluous parents.
    if ((node = parent[0] || parent[1] || parent[2] || parent[3] || parent[4] || parent[5] || parent[6] || parent[7])
        && node === (parent[7] || parent[6] || parent[5] || parent[4] || parent[3] || parent[2] || parent[1] || parent[0])
        && !node.length) {
      if (retainer) retainer[j] = node;
      else this._root = node;
    }

    return this;
  }

  function removeAll(data) {
    for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
    return this;
  }

  function tree_root() {
    return this._root;
  }

  function tree_size() {
    var size = 0;
    this.visit(function(node) {
      if (!node.length) do ++size; while (node = node.next)
    });
    return size;
  }

  function tree_visit(callback) {
    var octs = [], q, node = this._root, child, x0, y0, z0, x1, y1, z1;
    if (node) octs.push(new Octant(node, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
    while (q = octs.pop()) {
      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, z0 = q.z0, x1 = q.x1, y1 = q.y1, z1 = q.z1) && node.length) {
        var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2, zm = (z0 + z1) / 2;
        if (child = node[7]) octs.push(new Octant(child, xm, ym, zm, x1, y1, z1));
        if (child = node[6]) octs.push(new Octant(child, x0, ym, zm, xm, y1, z1));
        if (child = node[5]) octs.push(new Octant(child, xm, y0, zm, x1, ym, z1));
        if (child = node[4]) octs.push(new Octant(child, x0, y0, zm, xm, ym, z1));
        if (child = node[3]) octs.push(new Octant(child, xm, ym, z0, x1, y1, zm));
        if (child = node[2]) octs.push(new Octant(child, x0, ym, z0, xm, y1, zm));
        if (child = node[1]) octs.push(new Octant(child, xm, y0, z0, x1, ym, zm));
        if (child = node[0]) octs.push(new Octant(child, x0, y0, z0, xm, ym, zm));
      }
    }
    return this;
  }

  function tree_visitAfter(callback) {
    var octs = [], next = [], q;
    if (this._root) octs.push(new Octant(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
    while (q = octs.pop()) {
      var node = q.node;
      if (node.length) {
        var child, x0 = q.x0, y0 = q.y0, z0 = q.z0, x1 = q.x1, y1 = q.y1, z1 = q.z1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2, zm = (z0 + z1) / 2;
        if (child = node[0]) octs.push(new Octant(child, x0, y0, z0, xm, ym, zm));
        if (child = node[1]) octs.push(new Octant(child, xm, y0, z0, x1, ym, zm));
        if (child = node[2]) octs.push(new Octant(child, x0, ym, z0, xm, y1, zm));
        if (child = node[3]) octs.push(new Octant(child, xm, ym, z0, x1, y1, zm));
        if (child = node[4]) octs.push(new Octant(child, x0, y0, zm, xm, ym, z1));
        if (child = node[5]) octs.push(new Octant(child, xm, y0, zm, x1, ym, z1));
        if (child = node[6]) octs.push(new Octant(child, x0, ym, zm, xm, y1, z1));
        if (child = node[7]) octs.push(new Octant(child, xm, ym, zm, x1, y1, z1));
      }
      next.push(q);
    }
    while (q = next.pop()) {
      callback(q.node, q.x0, q.y0, q.z0, q.x1, q.y1, q.z1);
    }
    return this;
  }

  function defaultX(d) {
    return d[0];
  }

  function tree_x(_) {
    return arguments.length ? (this._x = _, this) : this._x;
  }

  function defaultY(d) {
    return d[1];
  }

  function tree_y(_) {
    return arguments.length ? (this._y = _, this) : this._y;
  }

  function defaultZ(d) {
    return d[2];
  }

  function tree_z(_) {
    return arguments.length ? (this._z = _, this) : this._z;
  }

  function octree(nodes, x, y, z) {
    var tree = new Octree(x == null ? defaultX : x, y == null ? defaultY : y, z == null ? defaultZ : z, NaN, NaN, NaN, NaN, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
  }

  function Octree(x, y, z, x0, y0, z0, x1, y1, z1) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._x0 = x0;
    this._y0 = y0;
    this._z0 = z0;
    this._x1 = x1;
    this._y1 = y1;
    this._z1 = z1;
    this._root = undefined;
  }

  function leaf_copy(leaf) {
    var copy = {data: leaf.data}, next = copy;
    while (leaf = leaf.next) next = next.next = {data: leaf.data};
    return copy;
  }

  var treeProto = octree.prototype = Octree.prototype;

  treeProto.copy = function() {
    var copy = new Octree(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1),
        node = this._root,
        nodes,
        child;

    if (!node) return copy;

    if (!node.length) return copy._root = leaf_copy(node), copy;

    nodes = [{source: node, target: copy._root = new Array(8)}];
    while (node = nodes.pop()) {
      for (var i = 0; i < 8; ++i) {
        if (child = node.source[i]) {
          if (child.length) nodes.push({source: child, target: node.target[i] = new Array(8)});
          else node.target[i] = leaf_copy(child);
        }
      }
    }

    return copy;
  };

  treeProto.add = tree_add;
  treeProto.addAll = addAll;
  treeProto.cover = tree_cover;
  treeProto.data = tree_data;
  treeProto.extent = tree_extent;
  treeProto.find = tree_find;
  treeProto.remove = tree_remove;
  treeProto.removeAll = removeAll;
  treeProto.root = tree_root;
  treeProto.size = tree_size;
  treeProto.visit = tree_visit;
  treeProto.visitAfter = tree_visitAfter;
  treeProto.x = tree_x;
  treeProto.y = tree_y;
  treeProto.z = tree_z;

  function constant(x) {
    return function() {
      return x;
    };
  }

  function jiggle(random) {
    return (random() - 0.5) * 1e-6;
  }

  function index$3(d) {
    return d.index;
  }

  function find(nodeById, nodeId) {
    var node = nodeById.get(nodeId);
    if (!node) throw new Error("node not found: " + nodeId);
    return node;
  }

  function d3ForceLink(links) {
    var id = index$3,
        strength = defaultStrength,
        strengths,
        distance = constant(30),
        distances,
        nodes,
        nDim,
        count,
        bias,
        random,
        iterations = 1;

    if (links == null) links = [];

    function defaultStrength(link) {
      return 1 / Math.min(count[link.source.index], count[link.target.index]);
    }

    function force(alpha) {
      for (var k = 0, n = links.length; k < iterations; ++k) {
        for (var i = 0, link, source, target, x = 0, y = 0, z = 0, l, b; i < n; ++i) {
          link = links[i], source = link.source, target = link.target;
          x = target.x + target.vx - source.x - source.vx || jiggle(random);
          if (nDim > 1) { y = target.y + target.vy - source.y - source.vy || jiggle(random); }
          if (nDim > 2) { z = target.z + target.vz - source.z - source.vz || jiggle(random); }
          l = Math.sqrt(x * x + y * y + z * z);
          l = (l - distances[i]) / l * alpha * strengths[i];
          x *= l, y *= l, z *= l;

          target.vx -= x * (b = bias[i]);
          if (nDim > 1) { target.vy -= y * b; }
          if (nDim > 2) { target.vz -= z * b; }

          source.vx += x * (b = 1 - b);
          if (nDim > 1) { source.vy += y * b; }
          if (nDim > 2) { source.vz += z * b; }
        }
      }
    }

    function initialize() {
      if (!nodes) return;

      var i,
          n = nodes.length,
          m = links.length,
          nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
          link;

      for (i = 0, count = new Array(n); i < m; ++i) {
        link = links[i], link.index = i;
        if (typeof link.source !== "object") link.source = find(nodeById, link.source);
        if (typeof link.target !== "object") link.target = find(nodeById, link.target);
        count[link.source.index] = (count[link.source.index] || 0) + 1;
        count[link.target.index] = (count[link.target.index] || 0) + 1;
      }

      for (i = 0, bias = new Array(m); i < m; ++i) {
        link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
      }

      strengths = new Array(m), initializeStrength();
      distances = new Array(m), initializeDistance();
    }

    function initializeStrength() {
      if (!nodes) return;

      for (var i = 0, n = links.length; i < n; ++i) {
        strengths[i] = +strength(links[i], i, links);
      }
    }

    function initializeDistance() {
      if (!nodes) return;

      for (var i = 0, n = links.length; i < n; ++i) {
        distances[i] = +distance(links[i], i, links);
      }
    }

    force.initialize = function(_nodes, ...args) {
      nodes = _nodes;
      random = args.find(arg => typeof arg === 'function') || Math.random;
      nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
      initialize();
    };

    force.links = function(_) {
      return arguments.length ? (links = _, initialize(), force) : links;
    };

    force.id = function(_) {
      return arguments.length ? (id = _, force) : id;
    };

    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
    };

    force.distance = function(_) {
      return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
    };

    return force;
  }

  var noop$1 = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop$1, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var frame = 0, // is an animation frame pending?
      timeout = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  // https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
  const a = 1664525;
  const c = 1013904223;
  const m = 4294967296; // 2^32

  function lcg() {
    let s = 1;
    return () => (s = (a * s + c) % m) / m;
  }

  var MAX_DIMENSIONS = 3;

  function x(d) {
    return d.x;
  }

  function y(d) {
    return d.y;
  }

  function z(d) {
    return d.z;
  }

  var initialRadius = 10,
      initialAngleRoll = Math.PI * (3 - Math.sqrt(5)), // Golden ratio angle
      initialAngleYaw = Math.PI * 20 / (9 + Math.sqrt(221)); // Markov irrational number

  function d3ForceSimulation(nodes, numDimensions) {
    numDimensions = numDimensions || 2;

    var nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(numDimensions))),
        simulation,
        alpha = 1,
        alphaMin = 0.001,
        alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
        alphaTarget = 0,
        velocityDecay = 0.6,
        forces = new Map(),
        stepper = timer(step),
        event = dispatch("tick", "end"),
        random = lcg();

    if (nodes == null) nodes = [];

    function step() {
      tick();
      event.call("tick", simulation);
      if (alpha < alphaMin) {
        stepper.stop();
        event.call("end", simulation);
      }
    }

    function tick(iterations) {
      var i, n = nodes.length, node;

      if (iterations === undefined) iterations = 1;

      for (var k = 0; k < iterations; ++k) {
        alpha += (alphaTarget - alpha) * alphaDecay;

        forces.forEach(function (force) {
          force(alpha);
        });

        for (i = 0; i < n; ++i) {
          node = nodes[i];
          if (node.fx == null) node.x += node.vx *= velocityDecay;
          else node.x = node.fx, node.vx = 0;
          if (nDim > 1) {
            if (node.fy == null) node.y += node.vy *= velocityDecay;
            else node.y = node.fy, node.vy = 0;
          }
          if (nDim > 2) {
            if (node.fz == null) node.z += node.vz *= velocityDecay;
            else node.z = node.fz, node.vz = 0;
          }
        }
      }

      return simulation;
    }

    function initializeNodes() {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.index = i;
        if (node.fx != null) node.x = node.fx;
        if (node.fy != null) node.y = node.fy;
        if (node.fz != null) node.z = node.fz;
        if (isNaN(node.x) || (nDim > 1 && isNaN(node.y)) || (nDim > 2 && isNaN(node.z))) {
          var radius = initialRadius * (nDim > 2 ? Math.cbrt(0.5 + i) : (nDim > 1 ? Math.sqrt(0.5 + i) : i)),
            rollAngle = i * initialAngleRoll,
            yawAngle = i * initialAngleYaw;

          if (nDim === 1) {
            node.x = radius;
          } else if (nDim === 2) {
            node.x = radius * Math.cos(rollAngle);
            node.y = radius * Math.sin(rollAngle);
          } else { // 3 dimensions: use spherical distribution along 2 irrational number angles
            node.x = radius * Math.sin(rollAngle) * Math.cos(yawAngle);
            node.y = radius * Math.cos(rollAngle);
            node.z = radius * Math.sin(rollAngle) * Math.sin(yawAngle);
          }
        }
        if (isNaN(node.vx) || (nDim > 1 && isNaN(node.vy)) || (nDim > 2 && isNaN(node.vz))) {
          node.vx = 0;
          if (nDim > 1) { node.vy = 0; }
          if (nDim > 2) { node.vz = 0; }
        }
      }
    }

    function initializeForce(force) {
      if (force.initialize) force.initialize(nodes, random, nDim);
      return force;
    }

    initializeNodes();

    return simulation = {
      tick: tick,

      restart: function() {
        return stepper.restart(step), simulation;
      },

      stop: function() {
        return stepper.stop(), simulation;
      },

      numDimensions: function(_) {
        return arguments.length
            ? (nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(_))), forces.forEach(initializeForce), simulation)
            : nDim;
      },

      nodes: function(_) {
        return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
      },

      alpha: function(_) {
        return arguments.length ? (alpha = +_, simulation) : alpha;
      },

      alphaMin: function(_) {
        return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
      },

      alphaDecay: function(_) {
        return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
      },

      alphaTarget: function(_) {
        return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
      },

      velocityDecay: function(_) {
        return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
      },

      randomSource: function(_) {
        return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
      },

      force: function(name, _) {
        return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
      },

      find: function() {
        var args = Array.prototype.slice.call(arguments);
        var x = args.shift() || 0,
            y = (nDim > 1 ? args.shift() : null) || 0,
            z = (nDim > 2 ? args.shift() : null) || 0,
            radius = args.shift() || Infinity;

        var i = 0,
            n = nodes.length,
            dx,
            dy,
            dz,
            d2,
            node,
            closest;

        radius *= radius;

        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dx = x - node.x;
          dy = y - (node.y || 0);
          dz = z - (node.z ||0);
          d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < radius) closest = node, radius = d2;
        }

        return closest;
      },

      on: function(name, _) {
        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
      }
    };
  }

  function d3ForceManyBody() {
    var nodes,
        nDim,
        node,
        random,
        alpha,
        strength = constant(-30),
        strengths,
        distanceMin2 = 1,
        distanceMax2 = Infinity,
        theta2 = 0.81;

    function force(_) {
      var i,
          n = nodes.length,
          tree =
              (nDim === 1 ? binarytree(nodes, x)
              :(nDim === 2 ? quadtree(nodes, x, y)
              :(nDim === 3 ? octree(nodes, x, y, z)
              :null
          ))).visitAfter(accumulate);

      for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length, node;
      strengths = new Array(n);
      for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
    }

    function accumulate(treeNode) {
      var strength = 0, q, c, weight = 0, x, y, z, i;
      var numChildren = treeNode.length;

      // For internal nodes, accumulate forces from children.
      if (numChildren) {
        for (x = y = z = i = 0; i < numChildren; ++i) {
          if ((q = treeNode[i]) && (c = Math.abs(q.value))) {
            strength += q.value, weight += c, x += c * (q.x || 0), y += c * (q.y || 0), z += c * (q.z || 0);
          }
        }
        strength *= Math.sqrt(4 / numChildren); // scale accumulated strength according to number of dimensions

        treeNode.x = x / weight;
        if (nDim > 1) { treeNode.y = y / weight; }
        if (nDim > 2) { treeNode.z = z / weight; }
      }

      // For leaf nodes, accumulate forces from coincident nodes.
      else {
        q = treeNode;
        q.x = q.data.x;
        if (nDim > 1) { q.y = q.data.y; }
        if (nDim > 2) { q.z = q.data.z; }
        do strength += strengths[q.data.index];
        while (q = q.next);
      }

      treeNode.value = strength;
    }

    function apply(treeNode, x1, arg1, arg2, arg3) {
      if (!treeNode.value) return true;
      var x2 = [arg1, arg2, arg3][nDim-1];

      var x = treeNode.x - node.x,
          y = (nDim > 1 ? treeNode.y - node.y : 0),
          z = (nDim > 2 ? treeNode.z - node.z : 0),
          w = x2 - x1,
          l = x * x + y * y + z * z;

      // Apply the Barnes-Hut approximation if possible.
      // Limit forces for very close nodes; randomize direction if coincident.
      if (w * w / theta2 < l) {
        if (l < distanceMax2) {
          if (x === 0) x = jiggle(random), l += x * x;
          if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
          if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
          if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
          node.vx += x * treeNode.value * alpha / l;
          if (nDim > 1) { node.vy += y * treeNode.value * alpha / l; }
          if (nDim > 2) { node.vz += z * treeNode.value * alpha / l; }
        }
        return true;
      }

      // Otherwise, process points directly.
      else if (treeNode.length || l >= distanceMax2) return;

      // Limit forces for very close nodes; randomize direction if coincident.
      if (treeNode.data !== node || treeNode.next) {
        if (x === 0) x = jiggle(random), l += x * x;
        if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
        if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
      }

      do if (treeNode.data !== node) {
        w = strengths[treeNode.data.index] * alpha / l;
        node.vx += x * w;
        if (nDim > 1) { node.vy += y * w; }
        if (nDim > 2) { node.vz += z * w; }
      } while (treeNode = treeNode.next);
    }

    force.initialize = function(_nodes, ...args) {
      nodes = _nodes;
      random = args.find(arg => typeof arg === 'function') || Math.random;
      nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
      initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
    };

    force.distanceMin = function(_) {
      return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
    };

    force.distanceMax = function(_) {
      return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
    };

    force.theta = function(_) {
      return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
    };

    return force;
  }

  function d3ForceRadial(radius, x, y, z) {
    var nodes,
        nDim,
        strength = constant(0.1),
        strengths,
        radiuses;

    if (typeof radius !== "function") radius = constant(+radius);
    if (x == null) x = 0;
    if (y == null) y = 0;
    if (z == null) z = 0;

    function force(alpha) {
      for (var i = 0, n = nodes.length; i < n; ++i) {
        var node = nodes[i],
            dx = node.x - x || 1e-6,
            dy = (node.y || 0) - y || 1e-6,
            dz = (node.z || 0) - z || 1e-6,
            r = Math.sqrt(dx * dx + dy * dy + dz * dz),
            k = (radiuses[i] - r) * strengths[i] * alpha / r;
        node.vx += dx * k;
        if (nDim>1) { node.vy += dy * k; }
        if (nDim>2) { node.vz += dz * k; }
      }
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      strengths = new Array(n);
      radiuses = new Array(n);
      for (i = 0; i < n; ++i) {
        radiuses[i] = +radius(nodes[i], i, nodes);
        strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
      }
    }

    force.initialize = function(initNodes, ...args) {
      nodes = initNodes;
      nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
      initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
    };

    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
    };

    force.x = function(_) {
      return arguments.length ? (x = +_, force) : x;
    };

    force.y = function(_) {
      return arguments.length ? (y = +_, force) : y;
    };

    force.z = function(_) {
      return arguments.length ? (z = +_, force) : z;
    };

    return force;
  }

  var ngraph_events = function eventify(subject) {
    validateSubject(subject);

    var eventsStorage = createEventsStorage(subject);
    subject.on = eventsStorage.on;
    subject.off = eventsStorage.off;
    subject.fire = eventsStorage.fire;
    return subject;
  };

  function createEventsStorage(subject) {
    // Store all event listeners to this hash. Key is event name, value is array
    // of callback records.
    //
    // A callback record consists of callback function and its optional context:
    // { 'eventName' => [{callback: function, ctx: object}] }
    var registeredEvents = Object.create(null);

    return {
      on: function (eventName, callback, ctx) {
        if (typeof callback !== 'function') {
          throw new Error('callback is expected to be a function');
        }
        var handlers = registeredEvents[eventName];
        if (!handlers) {
          handlers = registeredEvents[eventName] = [];
        }
        handlers.push({callback: callback, ctx: ctx});

        return subject;
      },

      off: function (eventName, callback) {
        var wantToRemoveAll = (typeof eventName === 'undefined');
        if (wantToRemoveAll) {
          // Killing old events storage should be enough in this case:
          registeredEvents = Object.create(null);
          return subject;
        }

        if (registeredEvents[eventName]) {
          var deleteAllCallbacksForEvent = (typeof callback !== 'function');
          if (deleteAllCallbacksForEvent) {
            delete registeredEvents[eventName];
          } else {
            var callbacks = registeredEvents[eventName];
            for (var i = 0; i < callbacks.length; ++i) {
              if (callbacks[i].callback === callback) {
                callbacks.splice(i, 1);
              }
            }
          }
        }

        return subject;
      },

      fire: function (eventName) {
        var callbacks = registeredEvents[eventName];
        if (!callbacks) {
          return subject;
        }

        var fireArguments;
        if (arguments.length > 1) {
          fireArguments = Array.prototype.splice.call(arguments, 1);
        }
        for(var i = 0; i < callbacks.length; ++i) {
          var callbackInfo = callbacks[i];
          callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
        }

        return subject;
      }
    };
  }

  function validateSubject(subject) {
    if (!subject) {
      throw new Error('Eventify cannot use falsy object as events subject');
    }
    var reservedWords = ['on', 'fire', 'off'];
    for (var i = 0; i < reservedWords.length; ++i) {
      if (subject.hasOwnProperty(reservedWords[i])) {
        throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i] + "'");
      }
    }
  }

  /**
   * @fileOverview Contains definition of the core graph object.
   */

  // TODO: need to change storage layer:
  // 1. Be able to get all nodes O(1)
  // 2. Be able to get number of links O(1)

  /**
   * @example
   *  var graph = require('ngraph.graph')();
   *  graph.addNode(1);     // graph has one node.
   *  graph.addLink(2, 3);  // now graph contains three nodes and one link.
   *
   */
  var ngraph_graph = createGraph;

  var eventify$1 = ngraph_events;

  /**
   * Creates a new graph
   */
  function createGraph(options) {
    // Graph structure is maintained as dictionary of nodes
    // and array of links. Each node has 'links' property which
    // hold all links related to that node. And general links
    // array is used to speed up all links enumeration. This is inefficient
    // in terms of memory, but simplifies coding.
    options = options || {};
    if ('uniqueLinkId' in options) {
      console.warn(
        'ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\n' +
        'Use `multigraph` option instead\n',
        '\n',
        'Note: there is also change in default behavior: From now on each graph\n'+
        'is considered to be not a multigraph by default (each edge is unique).'
      );

      options.multigraph = options.uniqueLinkId;
    }

    // Dear reader, the non-multigraphs do not guarantee that there is only
    // one link for a given pair of node. When this option is set to false
    // we can save some memory and CPU (18% faster for non-multigraph);
    if (options.multigraph === undefined) options.multigraph = false;

    if (typeof Map !== 'function') {
      // TODO: Should we polyfill it ourselves? We don't use much operations there..
      throw new Error('ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph');
    } 

    var nodes = new Map();
    var links = [],
      // Hash of multi-edges. Used to track ids of edges between same nodes
      multiEdges = {},
      suspendEvents = 0,

      createLink = options.multigraph ? createUniqueLink : createSingleLink,

      // Our graph API provides means to listen to graph changes. Users can subscribe
      // to be notified about changes in the graph by using `on` method. However
      // in some cases they don't use it. To avoid unnecessary memory consumption
      // we will not record graph changes until we have at least one subscriber.
      // Code below supports this optimization.
      //
      // Accumulates all changes made during graph updates.
      // Each change element contains:
      //  changeType - one of the strings: 'add', 'remove' or 'update';
      //  node - if change is related to node this property is set to changed graph's node;
      //  link - if change is related to link this property is set to changed graph's link;
      changes = [],
      recordLinkChange = noop,
      recordNodeChange = noop,
      enterModification = noop,
      exitModification = noop;

    // this is our public API:
    var graphPart = {
      /**
       * Adds node to the graph. If node with given id already exists in the graph
       * its data is extended with whatever comes in 'data' argument.
       *
       * @param nodeId the node's identifier. A string or number is preferred.
       * @param [data] additional data for the node being added. If node already
       *   exists its data object is augmented with the new one.
       *
       * @return {node} The newly added node or node with given id if it already exists.
       */
      addNode: addNode,

      /**
       * Adds a link to the graph. The function always create a new
       * link between two nodes. If one of the nodes does not exists
       * a new node is created.
       *
       * @param fromId link start node id;
       * @param toId link end node id;
       * @param [data] additional data to be set on the new link;
       *
       * @return {link} The newly created link
       */
      addLink: addLink,

      /**
       * Removes link from the graph. If link does not exist does nothing.
       *
       * @param link - object returned by addLink() or getLinks() methods.
       *
       * @returns true if link was removed; false otherwise.
       */
      removeLink: removeLink,

      /**
       * Removes node with given id from the graph. If node does not exist in the graph
       * does nothing.
       *
       * @param nodeId node's identifier passed to addNode() function.
       *
       * @returns true if node was removed; false otherwise.
       */
      removeNode: removeNode,

      /**
       * Gets node with given identifier. If node does not exist undefined value is returned.
       *
       * @param nodeId requested node identifier;
       *
       * @return {node} in with requested identifier or undefined if no such node exists.
       */
      getNode: getNode,

      /**
       * Gets number of nodes in this graph.
       *
       * @return number of nodes in the graph.
       */
      getNodeCount: getNodeCount,

      /**
       * Gets total number of links in the graph.
       */
      getLinkCount: getLinkCount,

      /**
       * Synonym for `getLinkCount()`
       */
      getLinksCount: getLinkCount,
      
      /**
       * Synonym for `getNodeCount()`
       */
      getNodesCount: getNodeCount,

      /**
       * Gets all links (inbound and outbound) from the node with given id.
       * If node with given id is not found null is returned.
       *
       * @param nodeId requested node identifier.
       *
       * @return Array of links from and to requested node if such node exists;
       *   otherwise null is returned.
       */
      getLinks: getLinks,

      /**
       * Invokes callback on each node of the graph.
       *
       * @param {Function(node)} callback Function to be invoked. The function
       *   is passed one argument: visited node.
       */
      forEachNode: forEachNode,

      /**
       * Invokes callback on every linked (adjacent) node to the given one.
       *
       * @param nodeId Identifier of the requested node.
       * @param {Function(node, link)} callback Function to be called on all linked nodes.
       *   The function is passed two parameters: adjacent node and link object itself.
       * @param oriented if true graph treated as oriented.
       */
      forEachLinkedNode: forEachLinkedNode,

      /**
       * Enumerates all links in the graph
       *
       * @param {Function(link)} callback Function to be called on all links in the graph.
       *   The function is passed one parameter: graph's link object.
       *
       * Link object contains at least the following fields:
       *  fromId - node id where link starts;
       *  toId - node id where link ends,
       *  data - additional data passed to graph.addLink() method.
       */
      forEachLink: forEachLink,

      /**
       * Suspend all notifications about graph changes until
       * endUpdate is called.
       */
      beginUpdate: enterModification,

      /**
       * Resumes all notifications about graph changes and fires
       * graph 'changed' event in case there are any pending changes.
       */
      endUpdate: exitModification,

      /**
       * Removes all nodes and links from the graph.
       */
      clear: clear,

      /**
       * Detects whether there is a link between two nodes.
       * Operation complexity is O(n) where n - number of links of a node.
       * NOTE: this function is synonim for getLink()
       *
       * @returns link if there is one. null otherwise.
       */
      hasLink: getLink,

      /**
       * Detects whether there is a node with given id
       * 
       * Operation complexity is O(1)
       * NOTE: this function is synonim for getNode()
       *
       * @returns node if there is one; Falsy value otherwise.
       */
      hasNode: getNode,

      /**
       * Gets an edge between two nodes.
       * Operation complexity is O(n) where n - number of links of a node.
       *
       * @param {string} fromId link start identifier
       * @param {string} toId link end identifier
       *
       * @returns link if there is one. null otherwise.
       */
      getLink: getLink
    };

    // this will add `on()` and `fire()` methods.
    eventify$1(graphPart);

    monitorSubscribers();

    return graphPart;

    function monitorSubscribers() {
      var realOn = graphPart.on;

      // replace real `on` with our temporary on, which will trigger change
      // modification monitoring:
      graphPart.on = on;

      function on() {
        // now it's time to start tracking stuff:
        graphPart.beginUpdate = enterModification = enterModificationReal;
        graphPart.endUpdate = exitModification = exitModificationReal;
        recordLinkChange = recordLinkChangeReal;
        recordNodeChange = recordNodeChangeReal;

        // this will replace current `on` method with real pub/sub from `eventify`.
        graphPart.on = realOn;
        // delegate to real `on` handler:
        return realOn.apply(graphPart, arguments);
      }
    }

    function recordLinkChangeReal(link, changeType) {
      changes.push({
        link: link,
        changeType: changeType
      });
    }

    function recordNodeChangeReal(node, changeType) {
      changes.push({
        node: node,
        changeType: changeType
      });
    }

    function addNode(nodeId, data) {
      if (nodeId === undefined) {
        throw new Error('Invalid node identifier');
      }

      enterModification();

      var node = getNode(nodeId);
      if (!node) {
        node = new Node(nodeId, data);
        recordNodeChange(node, 'add');
      } else {
        node.data = data;
        recordNodeChange(node, 'update');
      }

      nodes.set(nodeId, node);

      exitModification();
      return node;
    }

    function getNode(nodeId) {
      return nodes.get(nodeId);
    }

    function removeNode(nodeId) {
      var node = getNode(nodeId);
      if (!node) {
        return false;
      }

      enterModification();

      var prevLinks = node.links;
      if (prevLinks) {
        node.links = null;
        for(var i = 0; i < prevLinks.length; ++i) {
          removeLink(prevLinks[i]);
        }
      }

      nodes.delete(nodeId);

      recordNodeChange(node, 'remove');

      exitModification();

      return true;
    }


    function addLink(fromId, toId, data) {
      enterModification();

      var fromNode = getNode(fromId) || addNode(fromId);
      var toNode = getNode(toId) || addNode(toId);

      var link = createLink(fromId, toId, data);

      links.push(link);

      // TODO: this is not cool. On large graphs potentially would consume more memory.
      addLinkToNode(fromNode, link);
      if (fromId !== toId) {
        // make sure we are not duplicating links for self-loops
        addLinkToNode(toNode, link);
      }

      recordLinkChange(link, 'add');

      exitModification();

      return link;
    }

    function createSingleLink(fromId, toId, data) {
      var linkId = makeLinkId(fromId, toId);
      return new Link(fromId, toId, data, linkId);
    }

    function createUniqueLink(fromId, toId, data) {
      // TODO: Get rid of this method.
      var linkId = makeLinkId(fromId, toId);
      var isMultiEdge = multiEdges.hasOwnProperty(linkId);
      if (isMultiEdge || getLink(fromId, toId)) {
        if (!isMultiEdge) {
          multiEdges[linkId] = 0;
        }
        var suffix = '@' + (++multiEdges[linkId]);
        linkId = makeLinkId(fromId + suffix, toId + suffix);
      }

      return new Link(fromId, toId, data, linkId);
    }

    function getNodeCount() {
      return nodes.size;
    }

    function getLinkCount() {
      return links.length;
    }

    function getLinks(nodeId) {
      var node = getNode(nodeId);
      return node ? node.links : null;
    }

    function removeLink(link) {
      if (!link) {
        return false;
      }
      var idx = indexOfElementInArray(link, links);
      if (idx < 0) {
        return false;
      }

      enterModification();

      links.splice(idx, 1);

      var fromNode = getNode(link.fromId);
      var toNode = getNode(link.toId);

      if (fromNode) {
        idx = indexOfElementInArray(link, fromNode.links);
        if (idx >= 0) {
          fromNode.links.splice(idx, 1);
        }
      }

      if (toNode) {
        idx = indexOfElementInArray(link, toNode.links);
        if (idx >= 0) {
          toNode.links.splice(idx, 1);
        }
      }

      recordLinkChange(link, 'remove');

      exitModification();

      return true;
    }

    function getLink(fromNodeId, toNodeId) {
      // TODO: Use sorted links to speed this up
      var node = getNode(fromNodeId),
        i;
      if (!node || !node.links) {
        return null;
      }

      for (i = 0; i < node.links.length; ++i) {
        var link = node.links[i];
        if (link.fromId === fromNodeId && link.toId === toNodeId) {
          return link;
        }
      }

      return null; // no link.
    }

    function clear() {
      enterModification();
      forEachNode(function(node) {
        removeNode(node.id);
      });
      exitModification();
    }

    function forEachLink(callback) {
      var i, length;
      if (typeof callback === 'function') {
        for (i = 0, length = links.length; i < length; ++i) {
          callback(links[i]);
        }
      }
    }

    function forEachLinkedNode(nodeId, callback, oriented) {
      var node = getNode(nodeId);

      if (node && node.links && typeof callback === 'function') {
        if (oriented) {
          return forEachOrientedLink(node.links, nodeId, callback);
        } else {
          return forEachNonOrientedLink(node.links, nodeId, callback);
        }
      }
    }

    function forEachNonOrientedLink(links, nodeId, callback) {
      var quitFast;
      for (var i = 0; i < links.length; ++i) {
        var link = links[i];
        var linkedNodeId = link.fromId === nodeId ? link.toId : link.fromId;

        quitFast = callback(nodes.get(linkedNodeId), link);
        if (quitFast) {
          return true; // Client does not need more iterations. Break now.
        }
      }
    }

    function forEachOrientedLink(links, nodeId, callback) {
      var quitFast;
      for (var i = 0; i < links.length; ++i) {
        var link = links[i];
        if (link.fromId === nodeId) {
          quitFast = callback(nodes.get(link.toId), link);
          if (quitFast) {
            return true; // Client does not need more iterations. Break now.
          }
        }
      }
    }

    // we will not fire anything until users of this library explicitly call `on()`
    // method.
    function noop() {}

    // Enter, Exit modification allows bulk graph updates without firing events.
    function enterModificationReal() {
      suspendEvents += 1;
    }

    function exitModificationReal() {
      suspendEvents -= 1;
      if (suspendEvents === 0 && changes.length > 0) {
        graphPart.fire('changed', changes);
        changes.length = 0;
      }
    }

    function forEachNode(callback) {
      if (typeof callback !== 'function') {
        throw new Error('Function is expected to iterate over graph nodes. You passed ' + callback);
      }

      var valuesIterator = nodes.values();
      var nextValue = valuesIterator.next();
      while (!nextValue.done) {
        if (callback(nextValue.value)) {
          return true; // client doesn't want to proceed. Return.
        }
        nextValue = valuesIterator.next();
      }
    }
  }

  // need this for old browsers. Should this be a separate module?
  function indexOfElementInArray(element, array) {
    if (!array) return -1;

    if (array.indexOf) {
      return array.indexOf(element);
    }

    var len = array.length,
      i;

    for (i = 0; i < len; i += 1) {
      if (array[i] === element) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Internal structure to represent node;
   */
  function Node(id, data) {
    this.id = id;
    this.links = null;
    this.data = data;
  }

  function addLinkToNode(node, link) {
    if (node.links) {
      node.links.push(link);
    } else {
      node.links = [link];
    }
  }

  /**
   * Internal structure to represent links;
   */
  function Link(fromId, toId, data, id) {
    this.fromId = fromId;
    this.toId = toId;
    this.data = data;
    this.id = id;
  }

  function makeLinkId(fromId, toId) {
    return fromId.toString() + '👉 ' + toId.toString();
  }

  var ngraph_forcelayout = {exports: {}};

  var generateCreateBody = {exports: {}};

  var getVariableName$2 = function getVariableName(index) {
    if (index === 0) return 'x';
    if (index === 1) return 'y';
    if (index === 2) return 'z';
    return 'c' + (index + 1);
  };

  const getVariableName$1 = getVariableName$2;

  var createPatternBuilder$6 = function createPatternBuilder(dimension) {

    return pattern;
    
    function pattern(template, config) {
      let indent = (config && config.indent) || 0;
      let join = (config && config.join !== undefined) ? config.join : '\n';
      let indentString = Array(indent + 1).join(' ');
      let buffer = [];
      for (let i = 0; i < dimension; ++i) {
        let variableName = getVariableName$1(i);
        let prefix = (i === 0) ? '' : indentString;
        buffer.push(prefix + template.replace(/{var}/g, variableName));
      }
      return buffer.join(join);
    }
  };

  const createPatternBuilder$5 = createPatternBuilder$6;

  generateCreateBody.exports = generateCreateBodyFunction$1;
  generateCreateBody.exports.generateCreateBodyFunctionBody = generateCreateBodyFunctionBody;

  // InlineTransform: getVectorCode
  generateCreateBody.exports.getVectorCode = getVectorCode;
  // InlineTransform: getBodyCode
  generateCreateBody.exports.getBodyCode = getBodyCode;
  // InlineTransformExport: module.exports = function() { return Body; }

  function generateCreateBodyFunction$1(dimension, debugSetters) {
    let code = generateCreateBodyFunctionBody(dimension, debugSetters);
    let {Body} = (new Function(code))();
    return Body;
  }

  function generateCreateBodyFunctionBody(dimension, debugSetters) {
    let code = `
${getVectorCode(dimension, debugSetters)}
${getBodyCode(dimension)}
return {Body: Body, Vector: Vector};
`;
    return code;
  }

  function getBodyCode(dimension) {
    let pattern = createPatternBuilder$5(dimension);
    let variableList = pattern('{var}', {join: ', '});
    return `
function Body(${variableList}) {
  this.isPinned = false;
  this.pos = new Vector(${variableList});
  this.force = new Vector();
  this.velocity = new Vector();
  this.mass = 1;

  this.springCount = 0;
  this.springLength = 0;
}

Body.prototype.reset = function() {
  this.force.reset();
  this.springCount = 0;
  this.springLength = 0;
}

Body.prototype.setPosition = function (${variableList}) {
  ${pattern('this.pos.{var} = {var} || 0;', {indent: 2})}
};`;
  }

  function getVectorCode(dimension, debugSetters) {
    let pattern = createPatternBuilder$5(dimension);
    let setters = '';
    if (debugSetters) {
      setters = `${pattern("\n\
   var v{var};\n\
Object.defineProperty(this, '{var}', {\n\
  set: function(v) { \n\
    if (!Number.isFinite(v)) throw new Error('Cannot set non-numbers to {var}');\n\
    v{var} = v; \n\
  },\n\
  get: function() { return v{var}; }\n\
});")}`;
    }

    let variableList = pattern('{var}', {join: ', '});
    return `function Vector(${variableList}) {
  ${setters}
    if (typeof arguments[0] === 'object') {
      // could be another vector
      let v = arguments[0];
      ${pattern('if (!Number.isFinite(v.{var})) throw new Error("Expected value is not a finite number at Vector constructor ({var})");', {indent: 4})}
      ${pattern('this.{var} = v.{var};', {indent: 4})}
    } else {
      ${pattern('this.{var} = typeof {var} === "number" ? {var} : 0;', {indent: 4})}
    }
  }
  
  Vector.prototype.reset = function () {
    ${pattern('this.{var} = ', {join: ''})}0;
  };`;
  }

  var generateQuadTree = {exports: {}};

  const createPatternBuilder$4 = createPatternBuilder$6;
  const getVariableName = getVariableName$2;

  generateQuadTree.exports = generateQuadTreeFunction$1;
  generateQuadTree.exports.generateQuadTreeFunctionBody = generateQuadTreeFunctionBody;

  // These exports are for InlineTransform tool.
  // InlineTransform: getInsertStackCode
  generateQuadTree.exports.getInsertStackCode = getInsertStackCode;
  // InlineTransform: getQuadNodeCode
  generateQuadTree.exports.getQuadNodeCode = getQuadNodeCode;
  // InlineTransform: isSamePosition
  generateQuadTree.exports.isSamePosition = isSamePosition;
  // InlineTransform: getChildBodyCode
  generateQuadTree.exports.getChildBodyCode = getChildBodyCode;
  // InlineTransform: setChildBodyCode
  generateQuadTree.exports.setChildBodyCode = setChildBodyCode;

  function generateQuadTreeFunction$1(dimension) {
    let code = generateQuadTreeFunctionBody(dimension);
    return (new Function(code))();
  }

  function generateQuadTreeFunctionBody(dimension) {
    let pattern = createPatternBuilder$4(dimension);
    let quadCount = Math.pow(2, dimension);

    let code = `
${getInsertStackCode()}
${getQuadNodeCode(dimension)}
${isSamePosition(dimension)}
${getChildBodyCode(dimension)}
${setChildBodyCode(dimension)}

function createQuadTree(options, random) {
  options = options || {};
  options.gravity = typeof options.gravity === 'number' ? options.gravity : -1;
  options.theta = typeof options.theta === 'number' ? options.theta : 0.8;

  var gravity = options.gravity;
  var updateQueue = [];
  var insertStack = new InsertStack();
  var theta = options.theta;

  var nodesCache = [];
  var currentInCache = 0;
  var root = newNode();

  return {
    insertBodies: insertBodies,

    /**
     * Gets root node if it is present
     */
    getRoot: function() {
      return root;
    },

    updateBodyForce: update,

    options: function(newOptions) {
      if (newOptions) {
        if (typeof newOptions.gravity === 'number') {
          gravity = newOptions.gravity;
        }
        if (typeof newOptions.theta === 'number') {
          theta = newOptions.theta;
        }

        return this;
      }

      return {
        gravity: gravity,
        theta: theta
      };
    }
  };

  function newNode() {
    // To avoid pressure on GC we reuse nodes.
    var node = nodesCache[currentInCache];
    if (node) {
${assignQuads('      node.')}
      node.body = null;
      node.mass = ${pattern('node.mass_{var} = ', {join: ''})}0;
      ${pattern('node.min_{var} = node.max_{var} = ', {join: ''})}0;
    } else {
      node = new QuadNode();
      nodesCache[currentInCache] = node;
    }

    ++currentInCache;
    return node;
  }

  function update(sourceBody) {
    var queue = updateQueue;
    var v;
    ${pattern('var d{var};', {indent: 4})}
    var r; 
    ${pattern('var f{var} = 0;', {indent: 4})}
    var queueLength = 1;
    var shiftIdx = 0;
    var pushIdx = 1;

    queue[0] = root;

    while (queueLength) {
      var node = queue[shiftIdx];
      var body = node.body;

      queueLength -= 1;
      shiftIdx += 1;
      var differentBody = (body !== sourceBody);
      if (body && differentBody) {
        // If the current node is a leaf node (and it is not source body),
        // calculate the force exerted by the current node on body, and add this
        // amount to body's net force.
        ${pattern('d{var} = body.pos.{var} - sourceBody.pos.{var};', {indent: 8})}
        r = Math.sqrt(${pattern('d{var} * d{var}', {join: ' + '})});

        if (r === 0) {
          // Poor man's protection against zero distance.
          ${pattern('d{var} = (random.nextDouble() - 0.5) / 50;', {indent: 10})}
          r = Math.sqrt(${pattern('d{var} * d{var}', {join: ' + '})});
        }

        // This is standard gravitation force calculation but we divide
        // by r^3 to save two operations when normalizing force vector.
        v = gravity * body.mass * sourceBody.mass / (r * r * r);
        ${pattern('f{var} += v * d{var};', {indent: 8})}
      } else if (differentBody) {
        // Otherwise, calculate the ratio s / r,  where s is the width of the region
        // represented by the internal node, and r is the distance between the body
        // and the node's center-of-mass
        ${pattern('d{var} = node.mass_{var} / node.mass - sourceBody.pos.{var};', {indent: 8})}
        r = Math.sqrt(${pattern('d{var} * d{var}', {join: ' + '})});

        if (r === 0) {
          // Sorry about code duplication. I don't want to create many functions
          // right away. Just want to see performance first.
          ${pattern('d{var} = (random.nextDouble() - 0.5) / 50;', {indent: 10})}
          r = Math.sqrt(${pattern('d{var} * d{var}', {join: ' + '})});
        }
        // If s / r < θ, treat this internal node as a single body, and calculate the
        // force it exerts on sourceBody, and add this amount to sourceBody's net force.
        if ((node.max_${getVariableName(0)} - node.min_${getVariableName(0)}) / r < theta) {
          // in the if statement above we consider node's width only
          // because the region was made into square during tree creation.
          // Thus there is no difference between using width or height.
          v = gravity * node.mass * sourceBody.mass / (r * r * r);
          ${pattern('f{var} += v * d{var};', {indent: 10})}
        } else {
          // Otherwise, run the procedure recursively on each of the current node's children.

          // I intentionally unfolded this loop, to save several CPU cycles.
${runRecursiveOnChildren()}
        }
      }
    }

    ${pattern('sourceBody.force.{var} += f{var};', {indent: 4})}
  }

  function insertBodies(bodies) {
    ${pattern('var {var}min = Number.MAX_VALUE;', {indent: 4})}
    ${pattern('var {var}max = Number.MIN_VALUE;', {indent: 4})}
    var i = bodies.length;

    // To reduce quad tree depth we are looking for exact bounding box of all particles.
    while (i--) {
      var pos = bodies[i].pos;
      ${pattern('if (pos.{var} < {var}min) {var}min = pos.{var};', {indent: 6})}
      ${pattern('if (pos.{var} > {var}max) {var}max = pos.{var};', {indent: 6})}
    }

    // Makes the bounds square.
    var maxSideLength = -Infinity;
    ${pattern('if ({var}max - {var}min > maxSideLength) maxSideLength = {var}max - {var}min ;', {indent: 4})}

    currentInCache = 0;
    root = newNode();
    ${pattern('root.min_{var} = {var}min;', {indent: 4})}
    ${pattern('root.max_{var} = {var}min + maxSideLength;', {indent: 4})}

    i = bodies.length - 1;
    if (i >= 0) {
      root.body = bodies[i];
    }
    while (i--) {
      insert(bodies[i], root);
    }
  }

  function insert(newBody) {
    insertStack.reset();
    insertStack.push(root, newBody);

    while (!insertStack.isEmpty()) {
      var stackItem = insertStack.pop();
      var node = stackItem.node;
      var body = stackItem.body;

      if (!node.body) {
        // This is internal node. Update the total mass of the node and center-of-mass.
        ${pattern('var {var} = body.pos.{var};', {indent: 8})}
        node.mass += body.mass;
        ${pattern('node.mass_{var} += body.mass * {var};', {indent: 8})}

        // Recursively insert the body in the appropriate quadrant.
        // But first find the appropriate quadrant.
        var quadIdx = 0; // Assume we are in the 0's quad.
        ${pattern('var min_{var} = node.min_{var};', {indent: 8})}
        ${pattern('var max_{var} = (min_{var} + node.max_{var}) / 2;', {indent: 8})}

${assignInsertionQuadIndex(8)}

        var child = getChild(node, quadIdx);

        if (!child) {
          // The node is internal but this quadrant is not taken. Add
          // subnode to it.
          child = newNode();
          ${pattern('child.min_{var} = min_{var};', {indent: 10})}
          ${pattern('child.max_{var} = max_{var};', {indent: 10})}
          child.body = body;

          setChild(node, quadIdx, child);
        } else {
          // continue searching in this quadrant.
          insertStack.push(child, body);
        }
      } else {
        // We are trying to add to the leaf node.
        // We have to convert current leaf into internal node
        // and continue adding two nodes.
        var oldBody = node.body;
        node.body = null; // internal nodes do not cary bodies

        if (isSamePosition(oldBody.pos, body.pos)) {
          // Prevent infinite subdivision by bumping one node
          // anywhere in this quadrant
          var retriesCount = 3;
          do {
            var offset = random.nextDouble();
            ${pattern('var d{var} = (node.max_{var} - node.min_{var}) * offset;', {indent: 12})}

            ${pattern('oldBody.pos.{var} = node.min_{var} + d{var};', {indent: 12})}
            retriesCount -= 1;
            // Make sure we don't bump it out of the box. If we do, next iteration should fix it
          } while (retriesCount > 0 && isSamePosition(oldBody.pos, body.pos));

          if (retriesCount === 0 && isSamePosition(oldBody.pos, body.pos)) {
            // This is very bad, we ran out of precision.
            // if we do not return from the method we'll get into
            // infinite loop here. So we sacrifice correctness of layout, and keep the app running
            // Next layout iteration should get larger bounding box in the first step and fix this
            return;
          }
        }
        // Next iteration should subdivide node further.
        insertStack.push(node, oldBody);
        insertStack.push(node, body);
      }
    }
  }
}
return createQuadTree;

`;
    return code;


    function assignInsertionQuadIndex(indentCount) {
      let insertionCode = [];
      let indent = Array(indentCount + 1).join(' ');
      for (let i = 0; i < dimension; ++i) {
        insertionCode.push(indent + `if (${getVariableName(i)} > max_${getVariableName(i)}) {`);
        insertionCode.push(indent + `  quadIdx = quadIdx + ${Math.pow(2, i)};`);
        insertionCode.push(indent + `  min_${getVariableName(i)} = max_${getVariableName(i)};`);
        insertionCode.push(indent + `  max_${getVariableName(i)} = node.max_${getVariableName(i)};`);
        insertionCode.push(indent + `}`);
      }
      return insertionCode.join('\n');
      // if (x > max_x) { // somewhere in the eastern part.
      //   quadIdx = quadIdx + 1;
      //   left = right;
      //   right = node.right;
      // }
    }

    function runRecursiveOnChildren() {
      let indent = Array(11).join(' ');
      let recursiveCode = [];
      for (let i = 0; i < quadCount; ++i) {
        recursiveCode.push(indent + `if (node.quad${i}) {`);
        recursiveCode.push(indent + `  queue[pushIdx] = node.quad${i};`);
        recursiveCode.push(indent + `  queueLength += 1;`);
        recursiveCode.push(indent + `  pushIdx += 1;`);
        recursiveCode.push(indent + `}`);
      }
      return recursiveCode.join('\n');
      // if (node.quad0) {
      //   queue[pushIdx] = node.quad0;
      //   queueLength += 1;
      //   pushIdx += 1;
      // }
    }

    function assignQuads(indent) {
      // this.quad0 = null;
      // this.quad1 = null;
      // this.quad2 = null;
      // this.quad3 = null;
      let quads = [];
      for (let i = 0; i < quadCount; ++i) {
        quads.push(`${indent}quad${i} = null;`);
      }
      return quads.join('\n');
    }
  }

  function isSamePosition(dimension) {
    let pattern = createPatternBuilder$4(dimension);
    return `
  function isSamePosition(point1, point2) {
    ${pattern('var d{var} = Math.abs(point1.{var} - point2.{var});', {indent: 2})}
  
    return ${pattern('d{var} < 1e-8', {join: ' && '})};
  }  
`;
  }

  function setChildBodyCode(dimension) {
    var quadCount = Math.pow(2, dimension);
    return `
function setChild(node, idx, child) {
  ${setChildBody()}
}`;
    function setChildBody() {
      let childBody = [];
      for (let i = 0; i < quadCount; ++i) {
        let prefix = (i === 0) ? '  ' : '  else ';
        childBody.push(`${prefix}if (idx === ${i}) node.quad${i} = child;`);
      }

      return childBody.join('\n');
      // if (idx === 0) node.quad0 = child;
      // else if (idx === 1) node.quad1 = child;
      // else if (idx === 2) node.quad2 = child;
      // else if (idx === 3) node.quad3 = child;
    }
  }

  function getChildBodyCode(dimension) {
    return `function getChild(node, idx) {
${getChildBody()}
  return null;
}`;

    function getChildBody() {
      let childBody = [];
      let quadCount = Math.pow(2, dimension);
      for (let i = 0; i < quadCount; ++i) {
        childBody.push(`  if (idx === ${i}) return node.quad${i};`);
      }

      return childBody.join('\n');
      // if (idx === 0) return node.quad0;
      // if (idx === 1) return node.quad1;
      // if (idx === 2) return node.quad2;
      // if (idx === 3) return node.quad3;
    }
  }

  function getQuadNodeCode(dimension) {
    let pattern = createPatternBuilder$4(dimension);
    let quadCount = Math.pow(2, dimension);
    var quadNodeCode = `
function QuadNode() {
  // body stored inside this node. In quad tree only leaf nodes (by construction)
  // contain bodies:
  this.body = null;

  // Child nodes are stored in quads. Each quad is presented by number:
  // 0 | 1
  // -----
  // 2 | 3
${assignQuads('  this.')}

  // Total mass of current node
  this.mass = 0;

  // Center of mass coordinates
  ${pattern('this.mass_{var} = 0;', {indent: 2})}

  // bounding box coordinates
  ${pattern('this.min_{var} = 0;', {indent: 2})}
  ${pattern('this.max_{var} = 0;', {indent: 2})}
}
`;
    return quadNodeCode;

    function assignQuads(indent) {
      // this.quad0 = null;
      // this.quad1 = null;
      // this.quad2 = null;
      // this.quad3 = null;
      let quads = [];
      for (let i = 0; i < quadCount; ++i) {
        quads.push(`${indent}quad${i} = null;`);
      }
      return quads.join('\n');
    }
  }

  function getInsertStackCode() {
    return `
/**
 * Our implementation of QuadTree is non-recursive to avoid GC hit
 * This data structure represent stack of elements
 * which we are trying to insert into quad tree.
 */
function InsertStack () {
    this.stack = [];
    this.popIdx = 0;
}

InsertStack.prototype = {
    isEmpty: function() {
        return this.popIdx === 0;
    },
    push: function (node, body) {
        var item = this.stack[this.popIdx];
        if (!item) {
            // we are trying to avoid memory pressure: create new element
            // only when absolutely necessary
            this.stack[this.popIdx] = new InsertStackElement(node, body);
        } else {
            item.node = node;
            item.body = body;
        }
        ++this.popIdx;
    },
    pop: function () {
        if (this.popIdx > 0) {
            return this.stack[--this.popIdx];
        }
    },
    reset: function () {
        this.popIdx = 0;
    }
};

function InsertStackElement(node, body) {
    this.node = node; // QuadTree node
    this.body = body; // physical body which needs to be inserted to node
}
`;
  }

  var generateBounds = {exports: {}};

  generateBounds.exports = generateBoundsFunction$1;
  generateBounds.exports.generateFunctionBody = generateBoundsFunctionBody;

  const createPatternBuilder$3 = createPatternBuilder$6;

  function generateBoundsFunction$1(dimension) {
    let code = generateBoundsFunctionBody(dimension);
    return new Function('bodies', 'settings', 'random', code);
  }

  function generateBoundsFunctionBody(dimension) {
    let pattern = createPatternBuilder$3(dimension);

    let code = `
  var boundingBox = {
    ${pattern('min_{var}: 0, max_{var}: 0,', {indent: 4})}
  };

  return {
    box: boundingBox,

    update: updateBoundingBox,

    reset: resetBoundingBox,

    getBestNewPosition: function (neighbors) {
      var ${pattern('base_{var} = 0', {join: ', '})};

      if (neighbors.length) {
        for (var i = 0; i < neighbors.length; ++i) {
          let neighborPos = neighbors[i].pos;
          ${pattern('base_{var} += neighborPos.{var};', {indent: 10})}
        }

        ${pattern('base_{var} /= neighbors.length;', {indent: 8})}
      } else {
        ${pattern('base_{var} = (boundingBox.min_{var} + boundingBox.max_{var}) / 2;', {indent: 8})}
      }

      var springLength = settings.springLength;
      return {
        ${pattern('{var}: base_{var} + (random.nextDouble() - 0.5) * springLength,', {indent: 8})}
      };
    }
  };

  function updateBoundingBox() {
    var i = bodies.length;
    if (i === 0) return; // No bodies - no borders.

    ${pattern('var max_{var} = -Infinity;', {indent: 4})}
    ${pattern('var min_{var} = Infinity;', {indent: 4})}

    while(i--) {
      // this is O(n), it could be done faster with quadtree, if we check the root node bounds
      var bodyPos = bodies[i].pos;
      ${pattern('if (bodyPos.{var} < min_{var}) min_{var} = bodyPos.{var};', {indent: 6})}
      ${pattern('if (bodyPos.{var} > max_{var}) max_{var} = bodyPos.{var};', {indent: 6})}
    }

    ${pattern('boundingBox.min_{var} = min_{var};', {indent: 4})}
    ${pattern('boundingBox.max_{var} = max_{var};', {indent: 4})}
  }

  function resetBoundingBox() {
    ${pattern('boundingBox.min_{var} = boundingBox.max_{var} = 0;', {indent: 4})}
  }
`;
    return code;
  }

  var generateCreateDragForce = {exports: {}};

  const createPatternBuilder$2 = createPatternBuilder$6;

  generateCreateDragForce.exports = generateCreateDragForceFunction$1;
  generateCreateDragForce.exports.generateCreateDragForceFunctionBody = generateCreateDragForceFunctionBody;

  function generateCreateDragForceFunction$1(dimension) {
    let code = generateCreateDragForceFunctionBody(dimension);
    return new Function('options', code);
  }

  function generateCreateDragForceFunctionBody(dimension) {
    let pattern = createPatternBuilder$2(dimension);
    let code = `
  if (!Number.isFinite(options.dragCoefficient)) throw new Error('dragCoefficient is not a finite number');

  return {
    update: function(body) {
      ${pattern('body.force.{var} -= options.dragCoefficient * body.velocity.{var};', {indent: 6})}
    }
  };
`;
    return code;
  }

  var generateCreateSpringForce = {exports: {}};

  const createPatternBuilder$1 = createPatternBuilder$6;

  generateCreateSpringForce.exports = generateCreateSpringForceFunction$1;
  generateCreateSpringForce.exports.generateCreateSpringForceFunctionBody = generateCreateSpringForceFunctionBody;

  function generateCreateSpringForceFunction$1(dimension) {
    let code = generateCreateSpringForceFunctionBody(dimension);
    return new Function('options', 'random', code);
  }

  function generateCreateSpringForceFunctionBody(dimension) {
    let pattern = createPatternBuilder$1(dimension);
    let code = `
  if (!Number.isFinite(options.springCoefficient)) throw new Error('Spring coefficient is not a number');
  if (!Number.isFinite(options.springLength)) throw new Error('Spring length is not a number');

  return {
    /**
     * Updates forces acting on a spring
     */
    update: function (spring) {
      var body1 = spring.from;
      var body2 = spring.to;
      var length = spring.length < 0 ? options.springLength : spring.length;
      ${pattern('var d{var} = body2.pos.{var} - body1.pos.{var};', {indent: 6})}
      var r = Math.sqrt(${pattern('d{var} * d{var}', {join: ' + '})});

      if (r === 0) {
        ${pattern('d{var} = (random.nextDouble() - 0.5) / 50;', {indent: 8})}
        r = Math.sqrt(${pattern('d{var} * d{var}', {join: ' + '})});
      }

      var d = r - length;
      var coefficient = ((spring.coefficient > 0) ? spring.coefficient : options.springCoefficient) * d / r;

      ${pattern('body1.force.{var} += coefficient * d{var}', {indent: 6})};
      body1.springCount += 1;
      body1.springLength += r;

      ${pattern('body2.force.{var} -= coefficient * d{var}', {indent: 6})};
      body2.springCount += 1;
      body2.springLength += r;
    }
  };
`;
    return code;
  }

  var generateIntegrator = {exports: {}};

  const createPatternBuilder = createPatternBuilder$6;

  generateIntegrator.exports = generateIntegratorFunction$1;
  generateIntegrator.exports.generateIntegratorFunctionBody = generateIntegratorFunctionBody;

  function generateIntegratorFunction$1(dimension) {
    let code = generateIntegratorFunctionBody(dimension);
    return new Function('bodies', 'timeStep', 'adaptiveTimeStepWeight', code);
  }

  function generateIntegratorFunctionBody(dimension) {
    let pattern = createPatternBuilder(dimension);
    let code = `
  var length = bodies.length;
  if (length === 0) return 0;

  ${pattern('var d{var} = 0, t{var} = 0;', {indent: 2})}

  for (var i = 0; i < length; ++i) {
    var body = bodies[i];
    if (body.isPinned) continue;

    if (adaptiveTimeStepWeight && body.springCount) {
      timeStep = (adaptiveTimeStepWeight * body.springLength/body.springCount);
    }

    var coeff = timeStep / body.mass;

    ${pattern('body.velocity.{var} += coeff * body.force.{var};', {indent: 4})}
    ${pattern('var v{var} = body.velocity.{var};', {indent: 4})}
    var v = Math.sqrt(${pattern('v{var} * v{var}', {join: ' + '})});

    if (v > 1) {
      // We normalize it so that we move within timeStep range. 
      // for the case when v <= 1 - we let velocity to fade out.
      ${pattern('body.velocity.{var} = v{var} / v;', {indent: 6})}
    }

    ${pattern('d{var} = timeStep * body.velocity.{var};', {indent: 4})}

    ${pattern('body.pos.{var} += d{var};', {indent: 4})}

    ${pattern('t{var} += Math.abs(d{var});', {indent: 4})}
  }

  return (${pattern('t{var} * t{var}', {join: ' + '})})/length;
`;
    return code;
  }

  var spring = Spring;

  /**
   * Represents a physical spring. Spring connects two bodies, has rest length
   * stiffness coefficient and optional weight
   */
  function Spring(fromBody, toBody, length, springCoefficient) {
      this.from = fromBody;
      this.to = toBody;
      this.length = length;
      this.coefficient = springCoefficient;
  }

  var ngraph_merge = merge;

  /**
   * Augments `target` with properties in `options`. Does not override
   * target's properties if they are defined and matches expected type in 
   * options
   *
   * @returns {Object} merged object
   */
  function merge(target, options) {
    var key;
    if (!target) { target = {}; }
    if (options) {
      for (key in options) {
        if (options.hasOwnProperty(key)) {
          var targetHasIt = target.hasOwnProperty(key),
              optionsValueType = typeof options[key],
              shouldReplace = !targetHasIt || (typeof target[key] !== optionsValueType);

          if (shouldReplace) {
            target[key] = options[key];
          } else if (optionsValueType === 'object') {
            // go deep, don't care about loops here, we are simple API!:
            target[key] = merge(target[key], options[key]);
          }
        }
      }
    }

    return target;
  }

  var ngraph_random = {exports: {}};

  ngraph_random.exports = random;

  // TODO: Deprecate?
  ngraph_random.exports.random = random,
  ngraph_random.exports.randomIterator = randomIterator;

  /**
   * Creates seeded PRNG with two methods:
   *   next() and nextDouble()
   */
  function random(inputSeed) {
    var seed = typeof inputSeed === 'number' ? inputSeed : (+new Date());
    return new Generator(seed)
  }

  function Generator(seed) {
    this.seed = seed;
  }

  /**
    * Generates random integer number in the range from 0 (inclusive) to maxValue (exclusive)
    *
    * @param maxValue Number REQUIRED. Omitting this number will result in NaN values from PRNG.
    */
  Generator.prototype.next = next;

  /**
    * Generates random double number in the range from 0 (inclusive) to 1 (exclusive)
    * This function is the same as Math.random() (except that it could be seeded)
    */
  Generator.prototype.nextDouble = nextDouble;

  /**
   * Returns a random real number from uniform distribution in [0, 1)
   */
  Generator.prototype.uniform = nextDouble;

  /**
   * Returns a random real number from a Gaussian distribution
   * with 0 as a mean, and 1 as standard deviation u ~ N(0,1)
   */
  Generator.prototype.gaussian = gaussian;

  function gaussian() {
    // use the polar form of the Box-Muller transform
    // based on https://introcs.cs.princeton.edu/java/23recursion/StdRandom.java
    var r, x, y;
    do {
      x = this.nextDouble() * 2 - 1;
      y = this.nextDouble() * 2 - 1;
      r = x * x + y * y;
    } while (r >= 1 || r === 0);

    return x * Math.sqrt(-2 * Math.log(r)/r);
  }

  /**
   * See https://twitter.com/anvaka/status/1296182534150135808
   */
  Generator.prototype.levy = levy;

  function levy() {
    var beta = 3 / 2;
    var sigma = Math.pow(
        gamma( 1 + beta ) * Math.sin(Math.PI * beta / 2) / 
          (gamma((1 + beta) / 2) * beta * Math.pow(2, (beta - 1) / 2)),
        1/beta
    );
    return this.gaussian() * sigma / Math.pow(Math.abs(this.gaussian()), 1/beta);
  }

  // gamma function approximation
  function gamma(z) {
    return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
  }

  function nextDouble() {
    var seed = this.seed;
    // Robert Jenkins' 32 bit integer hash function.
    seed = ((seed + 0x7ed55d16) + (seed << 12)) & 0xffffffff;
    seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
    seed = ((seed + 0x165667b1) + (seed << 5)) & 0xffffffff;
    seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
    seed = ((seed + 0xfd7046c5) + (seed << 3)) & 0xffffffff;
    seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
    this.seed = seed;
    return (seed & 0xfffffff) / 0x10000000;
  }

  function next(maxValue) {
    return Math.floor(this.nextDouble() * maxValue);
  }

  /*
   * Creates iterator over array, which returns items of array in random order
   * Time complexity is guaranteed to be O(n);
   */
  function randomIterator(array, customRandom) {
    var localRandom = customRandom || random();
    if (typeof localRandom.next !== 'function') {
      throw new Error('customRandom does not match expected API: next() function is missing');
    }

    return {
      forEach: forEach,

      /**
       * Shuffles array randomly, in place.
       */
      shuffle: shuffle
    };

    function shuffle() {
      var i, j, t;
      for (i = array.length - 1; i > 0; --i) {
        j = localRandom.next(i + 1); // i inclusive
        t = array[j];
        array[j] = array[i];
        array[i] = t;
      }

      return array;
    }

    function forEach(callback) {
      var i, j, t;
      for (i = array.length - 1; i > 0; --i) {
        j = localRandom.next(i + 1); // i inclusive
        t = array[j];
        array[j] = array[i];
        array[i] = t;

        callback(t);
      }

      if (array.length) {
        callback(array[0]);
      }
    }
  }

  /**
   * Manages a simulation of physical forces acting on bodies and springs.
   */

  var createPhysicsSimulator_1 = createPhysicsSimulator;

  var generateCreateBodyFunction = generateCreateBody.exports;
  var generateQuadTreeFunction = generateQuadTree.exports;
  var generateBoundsFunction = generateBounds.exports;
  var generateCreateDragForceFunction = generateCreateDragForce.exports;
  var generateCreateSpringForceFunction = generateCreateSpringForce.exports;
  var generateIntegratorFunction = generateIntegrator.exports;

  var dimensionalCache = {};

  function createPhysicsSimulator(settings) {
    var Spring = spring;
    var merge = ngraph_merge;
    var eventify = ngraph_events;
    if (settings) {
      // Check for names from older versions of the layout
      if (settings.springCoeff !== undefined) throw new Error('springCoeff was renamed to springCoefficient');
      if (settings.dragCoeff !== undefined) throw new Error('dragCoeff was renamed to dragCoefficient');
    }

    settings = merge(settings, {
        /**
         * Ideal length for links (springs in physical model).
         */
        springLength: 10,

        /**
         * Hook's law coefficient. 1 - solid spring.
         */
        springCoefficient: 0.8, 

        /**
         * Coulomb's law coefficient. It's used to repel nodes thus should be negative
         * if you make it positive nodes start attract each other :).
         */
        gravity: -12,

        /**
         * Theta coefficient from Barnes Hut simulation. Ranged between (0, 1).
         * The closer it's to 1 the more nodes algorithm will have to go through.
         * Setting it to one makes Barnes Hut simulation no different from
         * brute-force forces calculation (each node is considered).
         */
        theta: 0.8,

        /**
         * Drag force coefficient. Used to slow down system, thus should be less than 1.
         * The closer it is to 0 the less tight system will be.
         */
        dragCoefficient: 0.9, // TODO: Need to rename this to something better. E.g. `dragCoefficient`

        /**
         * Default time step (dt) for forces integration
         */
        timeStep : 0.5,

        /**
         * Adaptive time step uses average spring length to compute actual time step:
         * See: https://twitter.com/anvaka/status/1293067160755957760
         */
        adaptiveTimeStepWeight: 0,

        /**
         * This parameter defines number of dimensions of the space where simulation
         * is performed. 
         */
        dimensions: 2,

        /**
         * In debug mode more checks are performed, this will help you catch errors
         * quickly, however for production build it is recommended to turn off this flag
         * to speed up computation.
         */
        debug: false
    });

    var factory = dimensionalCache[settings.dimensions];
    if (!factory) {
      var dimensions = settings.dimensions;
      factory = {
        Body: generateCreateBodyFunction(dimensions, settings.debug),
        createQuadTree: generateQuadTreeFunction(dimensions),
        createBounds: generateBoundsFunction(dimensions),
        createDragForce: generateCreateDragForceFunction(dimensions),
        createSpringForce: generateCreateSpringForceFunction(dimensions),
        integrate: generateIntegratorFunction(dimensions),
      };
      dimensionalCache[dimensions] = factory;
    }

    var Body = factory.Body;
    var createQuadTree = factory.createQuadTree;
    var createBounds = factory.createBounds;
    var createDragForce = factory.createDragForce;
    var createSpringForce = factory.createSpringForce;
    var integrate = factory.integrate;
    var createBody = pos => new Body(pos);

    var random = ngraph_random.exports.random(42);
    var bodies = []; // Bodies in this simulation.
    var springs = []; // Springs in this simulation.

    var quadTree = createQuadTree(settings, random);
    var bounds = createBounds(bodies, settings, random);
    var springForce = createSpringForce(settings, random);
    var dragForce = createDragForce(settings);

    var totalMovement = 0; // how much movement we made on last step
    var forces = [];
    var forceMap = new Map();
    var iterationNumber = 0;
   
    addForce('nbody', nbodyForce);
    addForce('spring', updateSpringForce);

    var publicApi = {
      /**
       * Array of bodies, registered with current simulator
       *
       * Note: To add new body, use addBody() method. This property is only
       * exposed for testing/performance purposes.
       */
      bodies: bodies,
    
      quadTree: quadTree,

      /**
       * Array of springs, registered with current simulator
       *
       * Note: To add new spring, use addSpring() method. This property is only
       * exposed for testing/performance purposes.
       */
      springs: springs,

      /**
       * Returns settings with which current simulator was initialized
       */
      settings: settings,

      /**
       * Adds a new force to simulation
       */
      addForce: addForce,
      
      /**
       * Removes a force from the simulation.
       */
      removeForce: removeForce,

      /**
       * Returns a map of all registered forces.
       */
      getForces: getForces,

      /**
       * Performs one step of force simulation.
       *
       * @returns {boolean} true if system is considered stable; False otherwise.
       */
      step: function () {
        for (var i = 0; i < forces.length; ++i) {
          forces[i](iterationNumber);
        }
        var movement = integrate(bodies, settings.timeStep, settings.adaptiveTimeStepWeight);
        iterationNumber += 1;
        return movement;
      },

      /**
       * Adds body to the system
       *
       * @param {ngraph.physics.primitives.Body} body physical body
       *
       * @returns {ngraph.physics.primitives.Body} added body
       */
      addBody: function (body) {
        if (!body) {
          throw new Error('Body is required');
        }
        bodies.push(body);

        return body;
      },

      /**
       * Adds body to the system at given position
       *
       * @param {Object} pos position of a body
       *
       * @returns {ngraph.physics.primitives.Body} added body
       */
      addBodyAt: function (pos) {
        if (!pos) {
          throw new Error('Body position is required');
        }
        var body = createBody(pos);
        bodies.push(body);

        return body;
      },

      /**
       * Removes body from the system
       *
       * @param {ngraph.physics.primitives.Body} body to remove
       *
       * @returns {Boolean} true if body found and removed. falsy otherwise;
       */
      removeBody: function (body) {
        if (!body) { return; }

        var idx = bodies.indexOf(body);
        if (idx < 0) { return; }

        bodies.splice(idx, 1);
        if (bodies.length === 0) {
          bounds.reset();
        }
        return true;
      },

      /**
       * Adds a spring to this simulation.
       *
       * @returns {Object} - a handle for a spring. If you want to later remove
       * spring pass it to removeSpring() method.
       */
      addSpring: function (body1, body2, springLength, springCoefficient) {
        if (!body1 || !body2) {
          throw new Error('Cannot add null spring to force simulator');
        }

        if (typeof springLength !== 'number') {
          springLength = -1; // assume global configuration
        }

        var spring = new Spring(body1, body2, springLength, springCoefficient >= 0 ? springCoefficient : -1);
        springs.push(spring);

        // TODO: could mark simulator as dirty.
        return spring;
      },

      /**
       * Returns amount of movement performed on last step() call
       */
      getTotalMovement: function () {
        return totalMovement;
      },

      /**
       * Removes spring from the system
       *
       * @param {Object} spring to remove. Spring is an object returned by addSpring
       *
       * @returns {Boolean} true if spring found and removed. falsy otherwise;
       */
      removeSpring: function (spring) {
        if (!spring) { return; }
        var idx = springs.indexOf(spring);
        if (idx > -1) {
          springs.splice(idx, 1);
          return true;
        }
      },

      getBestNewBodyPosition: function (neighbors) {
        return bounds.getBestNewPosition(neighbors);
      },

      /**
       * Returns bounding box which covers all bodies
       */
      getBBox: getBoundingBox, 
      getBoundingBox: getBoundingBox, 

      invalidateBBox: function () {
        console.warn('invalidateBBox() is deprecated, bounds always recomputed on `getBBox()` call');
      },

      // TODO: Move the force specific stuff to force
      gravity: function (value) {
        if (value !== undefined) {
          settings.gravity = value;
          quadTree.options({gravity: value});
          return this;
        } else {
          return settings.gravity;
        }
      },

      theta: function (value) {
        if (value !== undefined) {
          settings.theta = value;
          quadTree.options({theta: value});
          return this;
        } else {
          return settings.theta;
        }
      },

      /**
       * Returns pseudo-random number generator instance.
       */
      random: random
    };

    // allow settings modification via public API:
    expose(settings, publicApi);

    eventify(publicApi);

    return publicApi;

    function getBoundingBox() {
      bounds.update();
      return bounds.box;
    }

    function addForce(forceName, forceFunction) {
      if (forceMap.has(forceName)) throw new Error('Force ' + forceName + ' is already added');

      forceMap.set(forceName, forceFunction);
      forces.push(forceFunction);
    }

    function removeForce(forceName) {
      var forceIndex = forces.indexOf(forceMap.get(forceName));
      if (forceIndex < 0) return;
      forces.splice(forceIndex, 1);
      forceMap.delete(forceName);
    }

    function getForces() {
      // TODO: Should I trust them or clone the forces?
      return forceMap;
    }

    function nbodyForce(/* iterationUmber */) {
      if (bodies.length === 0) return;

      quadTree.insertBodies(bodies);
      var i = bodies.length;
      while (i--) {
        var body = bodies[i];
        if (!body.isPinned) {
          body.reset();
          quadTree.updateBodyForce(body);
          dragForce.update(body);
        }
      }
    }

    function updateSpringForce() {
      var i = springs.length;
      while (i--) {
        springForce.update(springs[i]);
      }
    }

  }

  function expose(settings, target) {
    for (var key in settings) {
      augment(settings, target, key);
    }
  }

  function augment(source, target, key) {
    if (!source.hasOwnProperty(key)) return;
    if (typeof target[key] === 'function') {
      // this accessor is already defined. Ignore it
      return;
    }
    var sourceIsNumber = Number.isFinite(source[key]);

    if (sourceIsNumber) {
      target[key] = function (value) {
        if (value !== undefined) {
          if (!Number.isFinite(value)) throw new Error('Value of ' + key + ' should be a valid number.');
          source[key] = value;
          return target;
        }
        return source[key];
      };
    } else {
      target[key] = function (value) {
        if (value !== undefined) {
          source[key] = value;
          return target;
        }
        return source[key];
      };
    }
  }

  ngraph_forcelayout.exports = createLayout;
  ngraph_forcelayout.exports.simulator = createPhysicsSimulator_1;

  var eventify = ngraph_events;

  /**
   * Creates force based layout for a given graph.
   *
   * @param {ngraph.graph} graph which needs to be laid out
   * @param {object} physicsSettings if you need custom settings
   * for physics simulator you can pass your own settings here. If it's not passed
   * a default one will be created.
   */
  function createLayout(graph, physicsSettings) {
    if (!graph) {
      throw new Error('Graph structure cannot be undefined');
    }

    var createSimulator = (physicsSettings && physicsSettings.createSimulator) || createPhysicsSimulator_1;
    var physicsSimulator = createSimulator(physicsSettings);
    if (Array.isArray(physicsSettings)) throw new Error('Physics settings is expected to be an object');

    var nodeMass = defaultNodeMass;
    if (physicsSettings && typeof physicsSettings.nodeMass === 'function') {
      nodeMass = physicsSettings.nodeMass;
    }

    var nodeBodies = new Map();
    var springs = {};
    var bodiesCount = 0;

    var springTransform = physicsSimulator.settings.springTransform || noop;

    // Initialize physics with what we have in the graph:
    initPhysics();
    listenToEvents();

    var wasStable = false;

    var api = {
      /**
       * Performs one step of iterative layout algorithm
       *
       * @returns {boolean} true if the system should be considered stable; False otherwise.
       * The system is stable if no further call to `step()` can improve the layout.
       */
      step: function() {
        if (bodiesCount === 0) {
          updateStableStatus(true);
          return true;
        }

        var lastMove = physicsSimulator.step();

        // Save the movement in case if someone wants to query it in the step
        // callback.
        api.lastMove = lastMove;

        // Allow listeners to perform low-level actions after nodes are updated.
        api.fire('step');

        var ratio = lastMove/bodiesCount;
        var isStableNow = ratio <= 0.01; // TODO: The number is somewhat arbitrary...
        updateStableStatus(isStableNow);


        return isStableNow;
      },

      /**
       * For a given `nodeId` returns position
       */
      getNodePosition: function (nodeId) {
        return getInitializedBody(nodeId).pos;
      },

      /**
       * Sets position of a node to a given coordinates
       * @param {string} nodeId node identifier
       * @param {number} x position of a node
       * @param {number} y position of a node
       * @param {number=} z position of node (only if applicable to body)
       */
      setNodePosition: function (nodeId) {
        var body = getInitializedBody(nodeId);
        body.setPosition.apply(body, Array.prototype.slice.call(arguments, 1));
      },

      /**
       * @returns {Object} Link position by link id
       * @returns {Object.from} {x, y} coordinates of link start
       * @returns {Object.to} {x, y} coordinates of link end
       */
      getLinkPosition: function (linkId) {
        var spring = springs[linkId];
        if (spring) {
          return {
            from: spring.from.pos,
            to: spring.to.pos
          };
        }
      },

      /**
       * @returns {Object} area required to fit in the graph. Object contains
       * `x1`, `y1` - top left coordinates
       * `x2`, `y2` - bottom right coordinates
       */
      getGraphRect: function () {
        return physicsSimulator.getBBox();
      },

      /**
       * Iterates over each body in the layout simulator and performs a callback(body, nodeId)
       */
      forEachBody: forEachBody,

      /*
       * Requests layout algorithm to pin/unpin node to its current position
       * Pinned nodes should not be affected by layout algorithm and always
       * remain at their position
       */
      pinNode: function (node, isPinned) {
        var body = getInitializedBody(node.id);
         body.isPinned = !!isPinned;
      },

      /**
       * Checks whether given graph's node is currently pinned
       */
      isNodePinned: function (node) {
        return getInitializedBody(node.id).isPinned;
      },

      /**
       * Request to release all resources
       */
      dispose: function() {
        graph.off('changed', onGraphChanged);
        api.fire('disposed');
      },

      /**
       * Gets physical body for a given node id. If node is not found undefined
       * value is returned.
       */
      getBody: getBody,

      /**
       * Gets spring for a given edge.
       *
       * @param {string} linkId link identifer. If two arguments are passed then
       * this argument is treated as formNodeId
       * @param {string=} toId when defined this parameter denotes head of the link
       * and first argument is treated as tail of the link (fromId)
       */
      getSpring: getSpring,

      /**
       * Returns length of cumulative force vector. The closer this to zero - the more stable the system is
       */
      getForceVectorLength: getForceVectorLength,

      /**
       * [Read only] Gets current physics simulator
       */
      simulator: physicsSimulator,

      /**
       * Gets the graph that was used for layout
       */
      graph: graph,

      /**
       * Gets amount of movement performed during last step operation
       */
      lastMove: 0
    };

    eventify(api);

    return api;

    function updateStableStatus(isStableNow) {
      if (wasStable !== isStableNow) {
        wasStable = isStableNow;
        onStableChanged(isStableNow);
      }
    }

    function forEachBody(cb) {
      nodeBodies.forEach(cb);
    }

    function getForceVectorLength() {
      var fx = 0, fy = 0;
      forEachBody(function(body) {
        fx += Math.abs(body.force.x);
        fy += Math.abs(body.force.y);
      });
      return Math.sqrt(fx * fx + fy * fy);
    }

    function getSpring(fromId, toId) {
      var linkId;
      if (toId === undefined) {
        if (typeof fromId !== 'object') {
          // assume fromId as a linkId:
          linkId = fromId;
        } else {
          // assume fromId to be a link object:
          linkId = fromId.id;
        }
      } else {
        // toId is defined, should grab link:
        var link = graph.hasLink(fromId, toId);
        if (!link) return;
        linkId = link.id;
      }

      return springs[linkId];
    }

    function getBody(nodeId) {
      return nodeBodies.get(nodeId);
    }

    function listenToEvents() {
      graph.on('changed', onGraphChanged);
    }

    function onStableChanged(isStable) {
      api.fire('stable', isStable);
    }

    function onGraphChanged(changes) {
      for (var i = 0; i < changes.length; ++i) {
        var change = changes[i];
        if (change.changeType === 'add') {
          if (change.node) {
            initBody(change.node.id);
          }
          if (change.link) {
            initLink(change.link);
          }
        } else if (change.changeType === 'remove') {
          if (change.node) {
            releaseNode(change.node);
          }
          if (change.link) {
            releaseLink(change.link);
          }
        }
      }
      bodiesCount = graph.getNodesCount();
    }

    function initPhysics() {
      bodiesCount = 0;

      graph.forEachNode(function (node) {
        initBody(node.id);
        bodiesCount += 1;
      });

      graph.forEachLink(initLink);
    }

    function initBody(nodeId) {
      var body = nodeBodies.get(nodeId);
      if (!body) {
        var node = graph.getNode(nodeId);
        if (!node) {
          throw new Error('initBody() was called with unknown node id');
        }

        var pos = node.position;
        if (!pos) {
          var neighbors = getNeighborBodies(node);
          pos = physicsSimulator.getBestNewBodyPosition(neighbors);
        }

        body = physicsSimulator.addBodyAt(pos);
        body.id = nodeId;

        nodeBodies.set(nodeId, body);
        updateBodyMass(nodeId);

        if (isNodeOriginallyPinned(node)) {
          body.isPinned = true;
        }
      }
    }

    function releaseNode(node) {
      var nodeId = node.id;
      var body = nodeBodies.get(nodeId);
      if (body) {
        nodeBodies.delete(nodeId);
        physicsSimulator.removeBody(body);
      }
    }

    function initLink(link) {
      updateBodyMass(link.fromId);
      updateBodyMass(link.toId);

      var fromBody = nodeBodies.get(link.fromId),
          toBody  = nodeBodies.get(link.toId),
          spring = physicsSimulator.addSpring(fromBody, toBody, link.length);

      springTransform(link, spring);

      springs[link.id] = spring;
    }

    function releaseLink(link) {
      var spring = springs[link.id];
      if (spring) {
        var from = graph.getNode(link.fromId),
            to = graph.getNode(link.toId);

        if (from) updateBodyMass(from.id);
        if (to) updateBodyMass(to.id);

        delete springs[link.id];

        physicsSimulator.removeSpring(spring);
      }
    }

    function getNeighborBodies(node) {
      // TODO: Could probably be done better on memory
      var neighbors = [];
      if (!node.links) {
        return neighbors;
      }
      var maxNeighbors = Math.min(node.links.length, 2);
      for (var i = 0; i < maxNeighbors; ++i) {
        var link = node.links[i];
        var otherBody = link.fromId !== node.id ? nodeBodies.get(link.fromId) : nodeBodies.get(link.toId);
        if (otherBody && otherBody.pos) {
          neighbors.push(otherBody);
        }
      }

      return neighbors;
    }

    function updateBodyMass(nodeId) {
      var body = nodeBodies.get(nodeId);
      body.mass = nodeMass(nodeId);
      if (Number.isNaN(body.mass)) {
        throw new Error('Node mass should be a number');
      }
    }

    /**
     * Checks whether graph node has in its settings pinned attribute,
     * which means layout algorithm cannot move it. Node can be marked
     * as pinned, if it has "isPinned" attribute, or when node.data has it.
     *
     * @param {Object} node a graph node to check
     * @return {Boolean} true if node should be treated as pinned; false otherwise.
     */
    function isNodeOriginallyPinned(node) {
      return (node && (node.isPinned || (node.data && node.data.isPinned)));
    }

    function getInitializedBody(nodeId) {
      var body = nodeBodies.get(nodeId);
      if (!body) {
        initBody(nodeId);
        body = nodeBodies.get(nodeId);
      }
      return body;
    }

    /**
     * Calculates mass of a body, which corresponds to node with given id.
     *
     * @param {String|Number} nodeId identifier of a node, for which body mass needs to be calculated
     * @returns {Number} recommended mass of the body;
     */
    function defaultNodeMass(nodeId) {
      var links = graph.getLinks(nodeId);
      if (!links) return 1;
      return 1 + links.length / 3.0;
    }
  }

  function noop() { }

  var forcelayout = ngraph_forcelayout.exports;

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing. The function also has a property 'clear' 
   * that is a function which will clear the timer to prevent previously scheduled executions. 
   *
   * @source underscore.js
   * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
   * @param {Function} function to wrap
   * @param {Number} timeout in ms (`100`)
   * @param {Boolean} whether to execute at the beginning (`false`)
   * @api public
   */

  function debounce(func, wait, immediate){
    var timeout, args, context, timestamp, result;
    if (null == wait) wait = 100;

    function later() {
      var last = Date.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    }
    var debounced = function(){
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };

    debounced.clear = function() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
    
    debounced.flush = function() {
      if (timeout) {
        result = func.apply(context, args);
        context = args = null;
        
        clearTimeout(timeout);
        timeout = null;
      }
    };

    return debounced;
  }
  // Adds compatibility for ES modules
  debounce.debounce = debounce;

  var debounce_1 = debounce;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _slicedToArray$2(arr, i) {
    return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
  }

  function _arrayWithHoles$2(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit$2(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Prop = function Prop(name, _ref) {
    var _ref$default = _ref["default"],
        defaultVal = _ref$default === void 0 ? null : _ref$default,
        _ref$triggerUpdate = _ref.triggerUpdate,
        triggerUpdate = _ref$triggerUpdate === void 0 ? true : _ref$triggerUpdate,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === void 0 ? function (newVal, state) {} : _ref$onChange;

    _classCallCheck(this, Prop);

    this.name = name;
    this.defaultVal = defaultVal;
    this.triggerUpdate = triggerUpdate;
    this.onChange = onChange;
  };

  function index$2 (_ref2) {
    var _ref2$stateInit = _ref2.stateInit,
        stateInit = _ref2$stateInit === void 0 ? function () {
      return {};
    } : _ref2$stateInit,
        _ref2$props = _ref2.props,
        rawProps = _ref2$props === void 0 ? {} : _ref2$props,
        _ref2$methods = _ref2.methods,
        methods = _ref2$methods === void 0 ? {} : _ref2$methods,
        _ref2$aliases = _ref2.aliases,
        aliases = _ref2$aliases === void 0 ? {} : _ref2$aliases,
        _ref2$init = _ref2.init,
        initFn = _ref2$init === void 0 ? function () {} : _ref2$init,
        _ref2$update = _ref2.update,
        updateFn = _ref2$update === void 0 ? function () {} : _ref2$update;
    // Parse props into Prop instances
    var props = Object.keys(rawProps).map(function (propName) {
      return new Prop(propName, rawProps[propName]);
    });
    return function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Holds component state
      var state = Object.assign({}, stateInit instanceof Function ? stateInit(options) : stateInit, // Support plain objects for backwards compatibility
      {
        initialised: false
      }); // keeps track of which props triggered an update

      var changedProps = {}; // Component constructor

      function comp(nodeElement) {
        initStatic(nodeElement, options);
        digest();
        return comp;
      }

      var initStatic = function initStatic(nodeElement, options) {
        initFn.call(comp, nodeElement, state, options);
        state.initialised = true;
      };

      var digest = debounce_1(function () {
        if (!state.initialised) {
          return;
        }

        updateFn.call(comp, state, changedProps);
        changedProps = {};
      }, 1); // Getter/setter methods

      props.forEach(function (prop) {
        comp[prop.name] = getSetProp(prop);

        function getSetProp(_ref3) {
          var prop = _ref3.name,
              _ref3$triggerUpdate = _ref3.triggerUpdate,
              redigest = _ref3$triggerUpdate === void 0 ? false : _ref3$triggerUpdate,
              _ref3$onChange = _ref3.onChange,
              onChange = _ref3$onChange === void 0 ? function (newVal, state) {} : _ref3$onChange,
              _ref3$defaultVal = _ref3.defaultVal,
              defaultVal = _ref3$defaultVal === void 0 ? null : _ref3$defaultVal;
          return function (_) {
            var curVal = state[prop];

            if (!arguments.length) {
              return curVal;
            } // Getter mode


            var val = _ === undefined ? defaultVal : _; // pick default if value passed is undefined

            state[prop] = val;
            onChange.call(comp, val, state, curVal); // track changed props

            !changedProps.hasOwnProperty(prop) && (changedProps[prop] = curVal);

            if (redigest) {
              digest();
            }

            return comp;
          };
        }
      }); // Other methods

      Object.keys(methods).forEach(function (methodName) {
        comp[methodName] = function () {
          var _methods$methodName;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_methods$methodName = methods[methodName]).call.apply(_methods$methodName, [comp, state].concat(args));
        };
      }); // Link aliases

      Object.entries(aliases).forEach(function (_ref4) {
        var _ref5 = _slicedToArray$2(_ref4, 2),
            alias = _ref5[0],
            target = _ref5[1];

        return comp[alias] = comp[target];
      }); // Reset all component props to their default value

      comp.resetProps = function () {
        props.forEach(function (prop) {
          comp[prop.name](prop.defaultVal);
        });
        return comp;
      }; //


      comp.resetProps(); // Apply all prop defaults

      state._rerender = digest; // Expose digest method

      return comp;
    };
  }

  var index$1 = (function (p) {
    return p instanceof Function ? p // fn
    : typeof p === 'string' ? function (obj) {
      return obj[p];
    } // property name
    : function (obj) {
      return p;
    };
  }); // constant

  class InternMap extends Map {
    constructor(entries, key = keyof) {
      super();
      Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
      if (entries != null) for (const [key, value] of entries) this.set(key, value);
    }
    get(key) {
      return super.get(intern_get(this, key));
    }
    has(key) {
      return super.has(intern_get(this, key));
    }
    set(key, value) {
      return super.set(intern_set(this, key), value);
    }
    delete(key) {
      return super.delete(intern_delete(this, key));
    }
  }

  function intern_get({_intern, _key}, value) {
    const key = _key(value);
    return _intern.has(key) ? _intern.get(key) : value;
  }

  function intern_set({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key)) return _intern.get(key);
    _intern.set(key, value);
    return value;
  }

  function intern_delete({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key)) {
      value = _intern.get(value);
      _intern.delete(key);
    }
    return value;
  }

  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function max(values, valueof) {
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    }
    return max;
  }

  function min(values, valueof) {
    let min;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    }
    return min;
  }

  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties$1(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose$1(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit$1(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];

    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }

    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");

    return typeof key === "symbol" ? key : String(key);
  }

  var index = (function () {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var keyAccessors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var multiItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var flattenKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var keys = (keyAccessors instanceof Array ? keyAccessors.length ? keyAccessors : [undefined] : [keyAccessors]).map(function (key) {
      return {
        keyAccessor: key,
        isProp: !(key instanceof Function)
      };
    });
    var indexedResult = list.reduce(function (res, item) {
      var iterObj = res;
      var itemVal = item;
      keys.forEach(function (_ref, idx) {
        var keyAccessor = _ref.keyAccessor,
            isProp = _ref.isProp;
        var key;

        if (isProp) {
          var _itemVal = itemVal,
              propVal = _itemVal[keyAccessor],
              rest = _objectWithoutProperties$1(_itemVal, [keyAccessor].map(_toPropertyKey));

          key = propVal;
          itemVal = rest;
        } else {
          key = keyAccessor(itemVal, idx);
        }

        if (idx + 1 < keys.length) {
          if (!iterObj.hasOwnProperty(key)) {
            iterObj[key] = {};
          }

          iterObj = iterObj[key];
        } else {
          // Leaf key
          if (multiItem) {
            if (!iterObj.hasOwnProperty(key)) {
              iterObj[key] = [];
            }

            iterObj[key].push(itemVal);
          } else {
            iterObj[key] = itemVal;
          }
        }
      });
      return res;
    }, {});

    if (multiItem instanceof Function) {
      // Reduce leaf multiple values
      (function reduce(node) {
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (level === keys.length) {
          Object.keys(node).forEach(function (k) {
            return node[k] = multiItem(node[k]);
          });
        } else {
          Object.values(node).forEach(function (child) {
            return reduce(child, level + 1);
          });
        }
      })(indexedResult); // IIFE

    }

    var result = indexedResult;

    if (flattenKeys) {
      // flatten into array
      result = [];

      (function flatten(node) {
        var accKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (accKeys.length === keys.length) {
          result.push({
            keys: accKeys,
            vals: node
          });
        } else {
          Object.entries(node).forEach(function (_ref2) {
            var _ref3 = _slicedToArray$1(_ref2, 2),
                key = _ref3[0],
                val = _ref3[1];

            return flatten(val, [].concat(_toConsumableArray$1(accKeys), [key]));
          });
        }
      })(indexedResult); //IIFE


      if (keyAccessors instanceof Array && keyAccessors.length === 0 && result.length === 1) {
        // clear keys if there's no key accessors (single result)
        result[0].keys = [];
      }
    }

    return result;
  });

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

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
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

  function diffArrays(prev, next, idAccessor) {
    var result = {
      enter: [],
      update: [],
      exit: []
    };

    if (!idAccessor) {
      // use object references for comparison
      var prevSet = new Set(prev);
      var nextSet = new Set(next);
      new Set([].concat(_toConsumableArray(prevSet), _toConsumableArray(nextSet))).forEach(function (item) {
        var type = !prevSet.has(item) ? 'enter' : !nextSet.has(item) ? 'exit' : 'update';
        result[type].push(type === 'update' ? [item, item] : item);
      });
    } else {
      // compare by id (duplicate keys are ignored)
      var prevById = index(prev, idAccessor, false);
      var nextById = index(next, idAccessor, false);
      var byId = Object.assign({}, prevById, nextById);
      Object.entries(byId).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            item = _ref2[1];

        var type = !prevById.hasOwnProperty(id) ? 'enter' : !nextById.hasOwnProperty(id) ? 'exit' : 'update';
        result[type].push(type === 'update' ? [prevById[id], nextById[id]] : item);
      });
    }

    return result;
  }

  function dataBindDiff(data, existingObjs, _ref3) {
    var _ref3$objBindAttr = _ref3.objBindAttr,
        objBindAttr = _ref3$objBindAttr === void 0 ? '__obj' : _ref3$objBindAttr,
        _ref3$dataBindAttr = _ref3.dataBindAttr,
        dataBindAttr = _ref3$dataBindAttr === void 0 ? '__data' : _ref3$dataBindAttr,
        idAccessor = _ref3.idAccessor,
        _ref3$purge = _ref3.purge,
        purge = _ref3$purge === void 0 ? false : _ref3$purge;

    var isObjValid = function isObjValid(obj) {
      return obj.hasOwnProperty(dataBindAttr);
    };

    var removeObjs = existingObjs.filter(function (obj) {
      return !isObjValid(obj);
    });
    var prevD = existingObjs.filter(isObjValid).map(function (obj) {
      return obj[dataBindAttr];
    });
    var nextD = data;
    var diff = purge ? {
      enter: nextD,
      exit: prevD,
      update: []
    } // don't diff data in purge mode
    : diffArrays(prevD, nextD, idAccessor);
    diff.update = diff.update.map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          prevD = _ref5[0],
          nextD = _ref5[1];

      if (prevD !== nextD) {
        // transfer obj to new data point (if different)
        nextD[objBindAttr] = prevD[objBindAttr];
        nextD[objBindAttr][dataBindAttr] = nextD;
      }

      return nextD;
    });
    diff.exit = diff.exit.concat(removeObjs.map(function (obj) {
      return _defineProperty({}, objBindAttr, obj);
    }));
    return diff;
  }

  function viewDigest(data, existingObjs, // list
  appendObj, // item => {...} function
  removeObj, // item => {...} function
  _ref7) {
    var _ref7$createObj = _ref7.createObj,
        createObj = _ref7$createObj === void 0 ? function (d) {
      return {};
    } : _ref7$createObj,
        _ref7$updateObj = _ref7.updateObj,
        updateObj = _ref7$updateObj === void 0 ? function (obj, d) {} : _ref7$updateObj,
        _ref7$exitObj = _ref7.exitObj,
        exitObj = _ref7$exitObj === void 0 ? function (obj) {} : _ref7$exitObj,
        _ref7$objBindAttr = _ref7.objBindAttr,
        objBindAttr = _ref7$objBindAttr === void 0 ? '__obj' : _ref7$objBindAttr,
        _ref7$dataBindAttr = _ref7.dataBindAttr,
        dataBindAttr = _ref7$dataBindAttr === void 0 ? '__data' : _ref7$dataBindAttr,
        dataDiffOptions = _objectWithoutProperties(_ref7, ["createObj", "updateObj", "exitObj", "objBindAttr", "dataBindAttr"]);

    var _dataBindDiff = dataBindDiff(data, existingObjs, _objectSpread2({
      objBindAttr: objBindAttr,
      dataBindAttr: dataBindAttr
    }, dataDiffOptions)),
        enter = _dataBindDiff.enter,
        update = _dataBindDiff.update,
        exit = _dataBindDiff.exit; // Remove exiting points


    exit.forEach(function (d) {
      var obj = d[objBindAttr];
      delete d[objBindAttr]; // unbind obj

      exitObj(obj);
      removeObj(obj);
    });
    var newObjs = createObjs(enter);
    var pointsData = [].concat(_toConsumableArray(enter), _toConsumableArray(update));
    updateObjs(pointsData); // Add new points

    newObjs.forEach(appendObj); //

    function createObjs(data) {
      var newObjs = [];
      data.forEach(function (d) {
        var obj = createObj(d);

        if (obj) {
          obj[dataBindAttr] = d;
          d[objBindAttr] = obj;
          newObjs.push(obj);
        }
      });
      return newObjs;
    }

    function updateObjs(data) {
      data.forEach(function (d) {
        var obj = d[objBindAttr];

        if (obj) {
          obj[dataBindAttr] = d;
          updateObj(obj, d);
        }
      });
    }
  }

  var materialDispose = function materialDispose(material) {
    if (material instanceof Array) {
      material.forEach(materialDispose);
    } else {
      if (material.map) {
        material.map.dispose();
      }

      material.dispose();
    }
  };

  var deallocate = function deallocate(obj) {
    if (obj.geometry) {
      obj.geometry.dispose();
    }

    if (obj.material) {
      materialDispose(obj.material);
    }

    if (obj.texture) {
      obj.texture.dispose();
    }

    if (obj.children) {
      obj.children.forEach(deallocate);
    }
  };

  var emptyObject = function emptyObject(obj) {
    while (obj.children.length) {
      var childObj = obj.children[0];
      obj.remove(childObj);
      deallocate(childObj);
    }
  };

  var _excluded = ["objFilter"];

  function threeDigest(data, scene) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _ref$objFilter = _ref.objFilter,
        objFilter = _ref$objFilter === void 0 ? function () {
      return true;
    } : _ref$objFilter,
        options = _objectWithoutProperties$2(_ref, _excluded);

    return viewDigest(data, scene.children.filter(objFilter), function (obj) {
      return scene.add(obj);
    }, function (obj) {
      scene.remove(obj);
      emptyObject(obj);
    }, _objectSpread2$1({
      objBindAttr: '__threeObj'
    }, options));
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0: break;
      case 1: this.range(domain); break;
      default: this.range(range).domain(domain); break;
    }
    return this;
  }

  const implicit = Symbol("implicit");

  function ordinal() {
    var index = new InternMap(),
        domain = [],
        range = [],
        unknown = implicit;

    function scale(d) {
      let i = index.get(d);
      if (i === undefined) {
        if (unknown !== implicit) return unknown;
        index.set(d, i = domain.push(d) - 1);
      }
      return range[i % range.length];
    }

    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = new InternMap();
      for (const value of _) {
        if (index.has(value)) continue;
        index.set(value, domain.push(value) - 1);
      }
      return scale;
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), scale) : range.slice();
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function() {
      return ordinal(domain, range).unknown(unknown);
    };

    initRange.apply(scale, arguments);

    return scale;
  }

  function colors(specifier) {
    var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
    while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    return colors;
  }

  var schemePaired = colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

  var tinycolor = {exports: {}};

  (function (module) {
  // TinyColor v1.4.2
  // https://github.com/bgrins/TinyColor
  // Brian Grinstead, MIT License

  (function(Math) {

  var trimLeft = /^\s+/,
      trimRight = /\s+$/,
      tinyCounter = 0,
      mathRound = Math.round,
      mathMin = Math.min,
      mathMax = Math.max,
      mathRandom = Math.random;

  function tinycolor (color, opts) {

      color = (color) ? color : '';
      opts = opts || { };

      // If input is already a tinycolor, return itself
      if (color instanceof tinycolor) {
         return color;
      }
      // If we are called as a function, call using new instead
      if (!(this instanceof tinycolor)) {
          return new tinycolor(color, opts);
      }

      var rgb = inputToRGB(color);
      this._originalInput = color,
      this._r = rgb.r,
      this._g = rgb.g,
      this._b = rgb.b,
      this._a = rgb.a,
      this._roundA = mathRound(100*this._a) / 100,
      this._format = opts.format || rgb.format;
      this._gradientType = opts.gradientType;

      // Don't let the range of [0,255] come back in [0,1].
      // Potentially lose a little bit of precision here, but will fix issues where
      // .5 gets interpreted as half of the total, instead of half of 1
      // If it was supposed to be 128, this was already taken care of by `inputToRgb`
      if (this._r < 1) { this._r = mathRound(this._r); }
      if (this._g < 1) { this._g = mathRound(this._g); }
      if (this._b < 1) { this._b = mathRound(this._b); }

      this._ok = rgb.ok;
      this._tc_id = tinyCounter++;
  }

  tinycolor.prototype = {
      isDark: function() {
          return this.getBrightness() < 128;
      },
      isLight: function() {
          return !this.isDark();
      },
      isValid: function() {
          return this._ok;
      },
      getOriginalInput: function() {
        return this._originalInput;
      },
      getFormat: function() {
          return this._format;
      },
      getAlpha: function() {
          return this._a;
      },
      getBrightness: function() {
          //http://www.w3.org/TR/AERT#color-contrast
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      },
      getLuminance: function() {
          //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
          var rgb = this.toRgb();
          var RsRGB, GsRGB, BsRGB, R, G, B;
          RsRGB = rgb.r/255;
          GsRGB = rgb.g/255;
          BsRGB = rgb.b/255;

          if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
          if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
          if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
          return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
      },
      setAlpha: function(value) {
          this._a = boundAlpha(value);
          this._roundA = mathRound(100*this._a) / 100;
          return this;
      },
      toHsv: function() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
      },
      toHsvString: function() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
          return (this._a == 1) ?
            "hsv("  + h + ", " + s + "%, " + v + "%)" :
            "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
      },
      toHsl: function() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
      },
      toHslString: function() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
          return (this._a == 1) ?
            "hsl("  + h + ", " + s + "%, " + l + "%)" :
            "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
      },
      toHex: function(allow3Char) {
          return rgbToHex(this._r, this._g, this._b, allow3Char);
      },
      toHexString: function(allow3Char) {
          return '#' + this.toHex(allow3Char);
      },
      toHex8: function(allow4Char) {
          return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
      },
      toHex8String: function(allow4Char) {
          return '#' + this.toHex8(allow4Char);
      },
      toRgb: function() {
          return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
      },
      toRgbString: function() {
          return (this._a == 1) ?
            "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
            "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function() {
          return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
      },
      toPercentageRgbString: function() {
          return (this._a == 1) ?
            "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
            "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
      },
      toName: function() {
          if (this._a === 0) {
              return "transparent";
          }

          if (this._a < 1) {
              return false;
          }

          return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
      },
      toFilter: function(secondColor) {
          var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
          var secondHex8String = hex8String;
          var gradientType = this._gradientType ? "GradientType = 1, " : "";

          if (secondColor) {
              var s = tinycolor(secondColor);
              secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
          }

          return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
      },
      toString: function(format) {
          var formatSet = !!format;
          format = format || this._format;

          var formattedString = false;
          var hasAlpha = this._a < 1 && this._a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

          if (needsAlphaFormat) {
              // Special case for "transparent", all other non-alpha formats
              // will return rgba when there is transparency.
              if (format === "name" && this._a === 0) {
                  return this.toName();
              }
              return this.toRgbString();
          }
          if (format === "rgb") {
              formattedString = this.toRgbString();
          }
          if (format === "prgb") {
              formattedString = this.toPercentageRgbString();
          }
          if (format === "hex" || format === "hex6") {
              formattedString = this.toHexString();
          }
          if (format === "hex3") {
              formattedString = this.toHexString(true);
          }
          if (format === "hex4") {
              formattedString = this.toHex8String(true);
          }
          if (format === "hex8") {
              formattedString = this.toHex8String();
          }
          if (format === "name") {
              formattedString = this.toName();
          }
          if (format === "hsl") {
              formattedString = this.toHslString();
          }
          if (format === "hsv") {
              formattedString = this.toHsvString();
          }

          return formattedString || this.toHexString();
      },
      clone: function() {
          return tinycolor(this.toString());
      },

      _applyModification: function(fn, args) {
          var color = fn.apply(null, [this].concat([].slice.call(args)));
          this._r = color._r;
          this._g = color._g;
          this._b = color._b;
          this.setAlpha(color._a);
          return this;
      },
      lighten: function() {
          return this._applyModification(lighten, arguments);
      },
      brighten: function() {
          return this._applyModification(brighten, arguments);
      },
      darken: function() {
          return this._applyModification(darken, arguments);
      },
      desaturate: function() {
          return this._applyModification(desaturate, arguments);
      },
      saturate: function() {
          return this._applyModification(saturate, arguments);
      },
      greyscale: function() {
          return this._applyModification(greyscale, arguments);
      },
      spin: function() {
          return this._applyModification(spin, arguments);
      },

      _applyCombination: function(fn, args) {
          return fn.apply(null, [this].concat([].slice.call(args)));
      },
      analogous: function() {
          return this._applyCombination(analogous, arguments);
      },
      complement: function() {
          return this._applyCombination(complement, arguments);
      },
      monochromatic: function() {
          return this._applyCombination(monochromatic, arguments);
      },
      splitcomplement: function() {
          return this._applyCombination(splitcomplement, arguments);
      },
      triad: function() {
          return this._applyCombination(triad, arguments);
      },
      tetrad: function() {
          return this._applyCombination(tetrad, arguments);
      }
  };

  // If input is an object, force 1 into "1.0" to handle ratios properly
  // String input requires "1.0" as input, so 1 will be treated as 1
  tinycolor.fromRatio = function(color, opts) {
      if (typeof color == "object") {
          var newColor = {};
          for (var i in color) {
              if (color.hasOwnProperty(i)) {
                  if (i === "a") {
                      newColor[i] = color[i];
                  }
                  else {
                      newColor[i] = convertToPercentage(color[i]);
                  }
              }
          }
          color = newColor;
      }

      return tinycolor(color, opts);
  };

  // Given a string or object, convert that input to RGB
  // Possible string inputs:
  //
  //     "red"
  //     "#f00" or "f00"
  //     "#ff0000" or "ff0000"
  //     "#ff000000" or "ff000000"
  //     "rgb 255 0 0" or "rgb (255, 0, 0)"
  //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
  //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
  //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
  //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
  //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
  //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
  //
  function inputToRGB(color) {

      var rgb = { r: 0, g: 0, b: 0 };
      var a = 1;
      var s = null;
      var v = null;
      var l = null;
      var ok = false;
      var format = false;

      if (typeof color == "string") {
          color = stringInputToObject(color);
      }

      if (typeof color == "object") {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
              rgb = rgbToRgb(color.r, color.g, color.b);
              ok = true;
              format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
          }
          else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
              s = convertToPercentage(color.s);
              v = convertToPercentage(color.v);
              rgb = hsvToRgb(color.h, s, v);
              ok = true;
              format = "hsv";
          }
          else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
              s = convertToPercentage(color.s);
              l = convertToPercentage(color.l);
              rgb = hslToRgb(color.h, s, l);
              ok = true;
              format = "hsl";
          }

          if (color.hasOwnProperty("a")) {
              a = color.a;
          }
      }

      a = boundAlpha(a);

      return {
          ok: ok,
          format: color.format || format,
          r: mathMin(255, mathMax(rgb.r, 0)),
          g: mathMin(255, mathMax(rgb.g, 0)),
          b: mathMin(255, mathMax(rgb.b, 0)),
          a: a
      };
  }


  // Conversion Functions
  // --------------------

  // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
  // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

  // `rgbToRgb`
  // Handle bounds / percentage checking to conform to CSS color spec
  // <http://www.w3.org/TR/css3-color/>
  // *Assumes:* r, g, b in [0, 255] or [0, 1]
  // *Returns:* { r, g, b } in [0, 255]
  function rgbToRgb(r, g, b){
      return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
      };
  }

  // `rgbToHsl`
  // Converts an RGB color value to HSL.
  // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
  // *Returns:* { h, s, l } in [0,1]
  function rgbToHsl(r, g, b) {

      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);

      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min) {
          h = s = 0; // achromatic
      }
      else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }

          h /= 6;
      }

      return { h: h, s: s, l: l };
  }

  // `hslToRgb`
  // Converts an HSL color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]
  function hslToRgb(h, s, l) {
      var r, g, b;

      h = bound01(h, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);

      function hue2rgb(p, q, t) {
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      if(s === 0) {
          r = g = b = l; // achromatic
      }
      else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return { r: r * 255, g: g * 255, b: b * 255 };
  }

  // `rgbToHsv`
  // Converts an RGB color value to HSV
  // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
  // *Returns:* { h, s, v } in [0,1]
  function rgbToHsv(r, g, b) {

      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);

      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, v = max;

      var d = max - min;
      s = max === 0 ? 0 : d / max;

      if(max == min) {
          h = 0; // achromatic
      }
      else {
          switch(max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }
      return { h: h, s: s, v: v };
  }

  // `hsvToRgb`
  // Converts an HSV color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]
   function hsvToRgb(h, s, v) {

      h = bound01(h, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);

      var i = Math.floor(h),
          f = h - i,
          p = v * (1 - s),
          q = v * (1 - f * s),
          t = v * (1 - (1 - f) * s),
          mod = i % 6,
          r = [v, q, p, p, t, v][mod],
          g = [t, v, v, q, p, p][mod],
          b = [p, p, t, v, v, q][mod];

      return { r: r * 255, g: g * 255, b: b * 255 };
  }

  // `rgbToHex`
  // Converts an RGB color to hex
  // Assumes r, g, and b are contained in the set [0, 255]
  // Returns a 3 or 6 character hex
  function rgbToHex(r, g, b, allow3Char) {

      var hex = [
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
      ];

      // Return a 3 character hex if possible
      if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }

      return hex.join("");
  }

  // `rgbaToHex`
  // Converts an RGBA color plus alpha transparency to hex
  // Assumes r, g, b are contained in the set [0, 255] and
  // a in [0, 1]. Returns a 4 or 8 character rgba hex
  function rgbaToHex(r, g, b, a, allow4Char) {

      var hex = [
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16)),
          pad2(convertDecimalToHex(a))
      ];

      // Return a 4 character hex if possible
      if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
      }

      return hex.join("");
  }

  // `rgbaToArgbHex`
  // Converts an RGBA color to an ARGB Hex8 string
  // Rarely used, but required for "toFilter()"
  function rgbaToArgbHex(r, g, b, a) {

      var hex = [
          pad2(convertDecimalToHex(a)),
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
      ];

      return hex.join("");
  }

  // `equals`
  // Can be called with any tinycolor input
  tinycolor.equals = function (color1, color2) {
      if (!color1 || !color2) { return false; }
      return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
  };

  tinycolor.random = function() {
      return tinycolor.fromRatio({
          r: mathRandom(),
          g: mathRandom(),
          b: mathRandom()
      });
  };


  // Modification Functions
  // ----------------------
  // Thanks to less.js for some of the basics here
  // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

  function desaturate(color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor(hsl);
  }

  function saturate(color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor(hsl);
  }

  function greyscale(color) {
      return tinycolor(color).desaturate(100);
  }

  function lighten (color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor(hsl);
  }

  function brighten(color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var rgb = tinycolor(color).toRgb();
      rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
      rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
      rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
      return tinycolor(rgb);
  }

  function darken (color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor(hsl);
  }

  // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
  // Values outside of this range will be wrapped into this range.
  function spin(color, amount) {
      var hsl = tinycolor(color).toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return tinycolor(hsl);
  }

  // Combination Functions
  // ---------------------
  // Thanks to jQuery xColor for some of the ideas behind these
  // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

  function complement(color) {
      var hsl = tinycolor(color).toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return tinycolor(hsl);
  }

  function triad(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [
          tinycolor(color),
          tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
          tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
      ];
  }

  function tetrad(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [
          tinycolor(color),
          tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
          tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
          tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
      ];
  }

  function splitcomplement(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [
          tinycolor(color),
          tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
          tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
      ];
  }

  function analogous(color, results, slices) {
      results = results || 6;
      slices = slices || 30;

      var hsl = tinycolor(color).toHsl();
      var part = 360 / slices;
      var ret = [tinycolor(color)];

      for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(tinycolor(hsl));
      }
      return ret;
  }

  function monochromatic(color, results) {
      results = results || 6;
      var hsv = tinycolor(color).toHsv();
      var h = hsv.h, s = hsv.s, v = hsv.v;
      var ret = [];
      var modification = 1 / results;

      while (results--) {
          ret.push(tinycolor({ h: h, s: s, v: v}));
          v = (v + modification) % 1;
      }

      return ret;
  }

  // Utility Functions
  // ---------------------

  tinycolor.mix = function(color1, color2, amount) {
      amount = (amount === 0) ? 0 : (amount || 50);

      var rgb1 = tinycolor(color1).toRgb();
      var rgb2 = tinycolor(color2).toRgb();

      var p = amount / 100;

      var rgba = {
          r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
          g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
          b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
          a: ((rgb2.a - rgb1.a) * p) + rgb1.a
      };

      return tinycolor(rgba);
  };


  // Readability Functions
  // ---------------------
  // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

  // `contrast`
  // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
  tinycolor.readability = function(color1, color2) {
      var c1 = tinycolor(color1);
      var c2 = tinycolor(color2);
      return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
  };

  // `isReadable`
  // Ensure that foreground and background color combinations meet WCAG2 guidelines.
  // The third argument is an optional Object.
  //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
  //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
  // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

  // *Example*
  //    tinycolor.isReadable("#000", "#111") => false
  //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
  tinycolor.isReadable = function(color1, color2, wcag2) {
      var readability = tinycolor.readability(color1, color2);
      var wcag2Parms, out;

      out = false;

      wcag2Parms = validateWCAG2Parms(wcag2);
      switch (wcag2Parms.level + wcag2Parms.size) {
          case "AAsmall":
          case "AAAlarge":
              out = readability >= 4.5;
              break;
          case "AAlarge":
              out = readability >= 3;
              break;
          case "AAAsmall":
              out = readability >= 7;
              break;
      }
      return out;

  };

  // `mostReadable`
  // Given a base color and a list of possible foreground or background
  // colors for that base, returns the most readable color.
  // Optionally returns Black or White if the most readable color is unreadable.
  // *Example*
  //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
  //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
  //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
  //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
  tinycolor.mostReadable = function(baseColor, colorList, args) {
      var bestColor = null;
      var bestScore = 0;
      var readability;
      var includeFallbackColors, level, size ;
      args = args || {};
      includeFallbackColors = args.includeFallbackColors ;
      level = args.level;
      size = args.size;

      for (var i= 0; i < colorList.length ; i++) {
          readability = tinycolor.readability(baseColor, colorList[i]);
          if (readability > bestScore) {
              bestScore = readability;
              bestColor = tinycolor(colorList[i]);
          }
      }

      if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
          return bestColor;
      }
      else {
          args.includeFallbackColors=false;
          return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
      }
  };


  // Big List of Colors
  // ------------------
  // <http://www.w3.org/TR/css3-color/#svg-color>
  var names = tinycolor.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
  };

  // Make it easy to access colors via `hexNames[hex]`
  var hexNames = tinycolor.hexNames = flip(names);


  // Utilities
  // ---------

  // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
  function flip(o) {
      var flipped = { };
      for (var i in o) {
          if (o.hasOwnProperty(i)) {
              flipped[o[i]] = i;
          }
      }
      return flipped;
  }

  // Return a valid alpha value [0,1] with all invalid values being set to 1
  function boundAlpha(a) {
      a = parseFloat(a);

      if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
      }

      return a;
  }

  // Take input from [0, n] and return it as [0, 1]
  function bound01(n, max) {
      if (isOnePointZero(n)) { n = "100%"; }

      var processPercent = isPercentage(n);
      n = mathMin(max, mathMax(0, parseFloat(n)));

      // Automatically convert percentage into number
      if (processPercent) {
          n = parseInt(n * max, 10) / 100;
      }

      // Handle floating point rounding errors
      if ((Math.abs(n - max) < 0.000001)) {
          return 1;
      }

      // Convert into [0, 1] range if it isn't already
      return (n % max) / parseFloat(max);
  }

  // Force a number between 0 and 1
  function clamp01(val) {
      return mathMin(1, mathMax(0, val));
  }

  // Parse a base-16 hex value into a base-10 integer
  function parseIntFromHex(val) {
      return parseInt(val, 16);
  }

  // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
  // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
  function isOnePointZero(n) {
      return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
  }

  // Check to see if string passed in is a percentage
  function isPercentage(n) {
      return typeof n === "string" && n.indexOf('%') != -1;
  }

  // Force a hex value to have 2 characters
  function pad2(c) {
      return c.length == 1 ? '0' + c : '' + c;
  }

  // Replace a decimal with it's percentage value
  function convertToPercentage(n) {
      if (n <= 1) {
          n = (n * 100) + "%";
      }

      return n;
  }

  // Converts a decimal to a hex value
  function convertDecimalToHex(d) {
      return Math.round(parseFloat(d) * 255).toString(16);
  }
  // Converts a hex value to a decimal
  function convertHexToDecimal(h) {
      return (parseIntFromHex(h) / 255);
  }

  var matchers = (function() {

      // <http://www.w3.org/TR/css3-values/#integers>
      var CSS_INTEGER = "[-\\+]?\\d+%?";

      // <http://www.w3.org/TR/css3-values/#number-value>
      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

      // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
      var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

      // Actual matching.
      // Parentheses and commas are optional, but not required.
      // Whitespace can take the place of commas or opening paren
      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

      return {
          CSS_UNIT: new RegExp(CSS_UNIT),
          rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
          rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
          hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
          hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
          hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
          hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
          hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
  })();

  // `isValidCSSUnit`
  // Take in a single string / number and check to see if it looks like a CSS unit
  // (see `matchers` above for definition).
  function isValidCSSUnit(color) {
      return !!matchers.CSS_UNIT.exec(color);
  }

  // `stringInputToObject`
  // Permissive string parsing.  Take in a number of formats, and output an object
  // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
  function stringInputToObject(color) {

      color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
      var named = false;
      if (names[color]) {
          color = names[color];
          named = true;
      }
      else if (color == 'transparent') {
          return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      }

      // Try to match string input using regular expressions.
      // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
      // Just return an object and let the conversion functions handle that.
      // This way the result will be the same whether the tinycolor is initialized with string or object.
      var match;
      if ((match = matchers.rgb.exec(color))) {
          return { r: match[1], g: match[2], b: match[3] };
      }
      if ((match = matchers.rgba.exec(color))) {
          return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      if ((match = matchers.hsl.exec(color))) {
          return { h: match[1], s: match[2], l: match[3] };
      }
      if ((match = matchers.hsla.exec(color))) {
          return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      if ((match = matchers.hsv.exec(color))) {
          return { h: match[1], s: match[2], v: match[3] };
      }
      if ((match = matchers.hsva.exec(color))) {
          return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      if ((match = matchers.hex8.exec(color))) {
          return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              a: convertHexToDecimal(match[4]),
              format: named ? "name" : "hex8"
          };
      }
      if ((match = matchers.hex6.exec(color))) {
          return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              format: named ? "name" : "hex"
          };
      }
      if ((match = matchers.hex4.exec(color))) {
          return {
              r: parseIntFromHex(match[1] + '' + match[1]),
              g: parseIntFromHex(match[2] + '' + match[2]),
              b: parseIntFromHex(match[3] + '' + match[3]),
              a: convertHexToDecimal(match[4] + '' + match[4]),
              format: named ? "name" : "hex8"
          };
      }
      if ((match = matchers.hex3.exec(color))) {
          return {
              r: parseIntFromHex(match[1] + '' + match[1]),
              g: parseIntFromHex(match[2] + '' + match[2]),
              b: parseIntFromHex(match[3] + '' + match[3]),
              format: named ? "name" : "hex"
          };
      }

      return false;
  }

  function validateWCAG2Parms(parms) {
      // return valid WCAG2 parms for isReadable.
      // If input parms are invalid, return {"level":"AA", "size":"small"}
      var level, size;
      parms = parms || {"level":"AA", "size":"small"};
      level = (parms.level || "AA").toUpperCase();
      size = (parms.size || "small").toLowerCase();
      if (level !== "AA" && level !== "AAA") {
          level = "AA";
      }
      if (size !== "small" && size !== "large") {
          size = "small";
      }
      return {"level":level, "size":size};
  }

  // Node: Export function
  if (module.exports) {
      module.exports = tinycolor;
  }
  // AMD/requirejs: Define the module
  else {
      window.tinycolor = tinycolor;
  }

  })(Math);
  }(tinycolor));

  var tinyColor = tinycolor.exports;

  var colorStr2Hex = function colorStr2Hex(str) {
    return isNaN(str) ? parseInt(tinyColor(str).toHex(), 16) : str;
  };

  var colorAlpha = function colorAlpha(str) {
    return isNaN(str) ? tinyColor(str).getAlpha() : 1;
  };

  var autoColorScale = ordinal(schemePaired); // Autoset attribute colorField by colorByAccessor property
  // If an object has already a color, don't set it
  // Objects can be nodes or links

  function autoColorObjects(objects, colorByAccessor, colorField) {
    if (!colorByAccessor || typeof colorField !== 'string') return;
    objects.filter(function (obj) {
      return !obj[colorField];
    }).forEach(function (obj) {
      obj[colorField] = autoColorScale(colorByAccessor(obj));
    });
  }

  function getDagDepths (_ref, idAccessor) {
    var nodes = _ref.nodes,
        links = _ref.links;

    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$nodeFilter = _ref2.nodeFilter,
        nodeFilter = _ref2$nodeFilter === void 0 ? function () {
      return true;
    } : _ref2$nodeFilter,
        _ref2$onLoopError = _ref2.onLoopError,
        onLoopError = _ref2$onLoopError === void 0 ? function (loopIds) {
      throw "Invalid DAG structure! Found cycle in node path: ".concat(loopIds.join(' -> '), ".");
    } : _ref2$onLoopError;

    // linked graph
    var graph = {};
    nodes.forEach(function (node) {
      return graph[idAccessor(node)] = {
        data: node,
        out: [],
        depth: -1,
        skip: !nodeFilter(node)
      };
    });
    links.forEach(function (_ref3) {
      var source = _ref3.source,
          target = _ref3.target;
      var sourceId = getNodeId(source);
      var targetId = getNodeId(target);
      if (!graph.hasOwnProperty(sourceId)) throw "Missing source node with id: ".concat(sourceId);
      if (!graph.hasOwnProperty(targetId)) throw "Missing target node with id: ".concat(targetId);
      var sourceNode = graph[sourceId];
      var targetNode = graph[targetId];
      sourceNode.out.push(targetNode);

      function getNodeId(node) {
        return _typeof(node) === 'object' ? idAccessor(node) : node;
      }
    });
    var foundLoops = [];
    traverse(Object.values(graph));
    var nodeDepths = Object.assign.apply(Object, [{}].concat(_toConsumableArray$2(Object.entries(graph).filter(function (_ref4) {
      var _ref5 = _slicedToArray$3(_ref4, 2),
          node = _ref5[1];

      return !node.skip;
    }).map(function (_ref6) {
      var _ref7 = _slicedToArray$3(_ref6, 2),
          id = _ref7[0],
          node = _ref7[1];

      return _defineProperty$1({}, id, node.depth);
    }))));
    return nodeDepths;

    function traverse(nodes) {
      var nodeStack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];

        if (nodeStack.indexOf(node) !== -1) {
          var _ret = function () {
            var loop = [].concat(_toConsumableArray$2(nodeStack.slice(nodeStack.indexOf(node))), [node]).map(function (d) {
              return idAccessor(d.data);
            });

            if (!foundLoops.some(function (foundLoop) {
              return foundLoop.length === loop.length && foundLoop.every(function (id, idx) {
                return id === loop[idx];
              });
            })) {
              foundLoops.push(loop);
              onLoopError(loop);
            }

            return "continue";
          }();

          if (_ret === "continue") continue;
        }

        if (currentDepth > node.depth) {
          // Don't unnecessarily revisit chunks of the graph
          node.depth = currentDepth;
          traverse(node.out, [].concat(_toConsumableArray$2(nodeStack), [node]), currentDepth + (node.skip ? 0 : 1));
        }
      }
    }
  }

  var three$1 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
  : {
    Group: three$2.Group,
    Mesh: three$2.Mesh,
    MeshLambertMaterial: three$2.MeshLambertMaterial,
    Color: three$2.Color,
    BufferGeometry: three$2.BufferGeometry,
    BufferAttribute: three$2.BufferAttribute,
    Matrix4: three$2.Matrix4,
    Vector3: three$2.Vector3,
    SphereBufferGeometry: three$2.SphereBufferGeometry,
    CylinderBufferGeometry: three$2.CylinderBufferGeometry,
    TubeBufferGeometry: three$2.TubeBufferGeometry,
    ConeBufferGeometry: three$2.ConeBufferGeometry,
    Line: three$2.Line,
    LineBasicMaterial: three$2.LineBasicMaterial,
    QuadraticBezierCurve3: three$2.QuadraticBezierCurve3,
    CubicBezierCurve3: three$2.CubicBezierCurve3,
    Box3: three$2.Box3
  };
  var ngraph = {
    graph: ngraph_graph,
    forcelayout: forcelayout
  };

  var DAG_LEVEL_NODE_RATIO = 2; // support multiple method names for backwards threejs compatibility

  var setAttributeFn = new three$1.BufferGeometry().setAttribute ? 'setAttribute' : 'addAttribute';
  var applyMatrix4Fn = new three$1.BufferGeometry().applyMatrix4 ? 'applyMatrix4' : 'applyMatrix';
  var ForceGraph = index$2({
    props: {
      jsonUrl: {
        onChange: function onChange(jsonUrl, state) {
          var _this = this;

          if (jsonUrl && !state.fetchingJson) {
            // Load data asynchronously
            state.fetchingJson = true;
            state.onLoading();
            fetch(jsonUrl).then(function (r) {
              return r.json();
            }).then(function (json) {
              state.fetchingJson = false;
              state.onFinishLoading(json);

              _this.graphData(json);
            });
          }
        },
        triggerUpdate: false
      },
      graphData: {
        "default": {
          nodes: [],
          links: []
        },
        onChange: function onChange(graphData, state) {
          state.engineRunning = false; // Pause simulation immediately
        }
      },
      numDimensions: {
        "default": 3,
        onChange: function onChange(numDim, state) {
          var chargeForce = state.d3ForceLayout.force('charge'); // Increase repulsion on 3D mode for improved spatial separation

          if (chargeForce) {
            chargeForce.strength(numDim > 2 ? -60 : -30);
          }

          if (numDim < 3) {
            eraseDimension(state.graphData.nodes, 'z');
          }

          if (numDim < 2) {
            eraseDimension(state.graphData.nodes, 'y');
          }

          function eraseDimension(nodes, dim) {
            nodes.forEach(function (d) {
              delete d[dim]; // position

              delete d["v".concat(dim)]; // velocity
            });
          }
        }
      },
      dagMode: {
        onChange: function onChange(dagMode, state) {
          // td, bu, lr, rl, zin, zout, radialin, radialout
          !dagMode && state.forceEngine === 'd3' && (state.graphData.nodes || []).forEach(function (n) {
            return n.fx = n.fy = n.fz = undefined;
          }); // unfix nodes when disabling dag mode
        }
      },
      dagLevelDistance: {},
      dagNodeFilter: {
        "default": function _default(node) {
          return true;
        }
      },
      onDagError: {
        triggerUpdate: false
      },
      nodeRelSize: {
        "default": 4
      },
      // volume per val unit
      nodeId: {
        "default": 'id'
      },
      nodeVal: {
        "default": 'val'
      },
      nodeResolution: {
        "default": 8
      },
      // how many slice segments in the sphere's circumference
      nodeColor: {
        "default": 'color'
      },
      nodeAutoColorBy: {},
      nodeOpacity: {
        "default": 0.75
      },
      nodeVisibility: {
        "default": true
      },
      nodeThreeObject: {},
      nodeThreeObjectExtend: {
        "default": false
      },
      linkSource: {
        "default": 'source'
      },
      linkTarget: {
        "default": 'target'
      },
      linkVisibility: {
        "default": true
      },
      linkColor: {
        "default": 'color'
      },
      linkAutoColorBy: {},
      linkOpacity: {
        "default": 0.2
      },
      linkWidth: {},
      // Rounded to nearest decimal. For falsy values use dimensionless line with 1px regardless of distance.
      linkResolution: {
        "default": 6
      },
      // how many radial segments in each line tube's geometry
      linkCurvature: {
        "default": 0,
        triggerUpdate: false
      },
      // line curvature radius (0: straight, 1: semi-circle)
      linkCurveRotation: {
        "default": 0,
        triggerUpdate: false
      },
      // line curve rotation along the line axis (0: interection with XY plane, PI: upside down)
      linkMaterial: {},
      linkThreeObject: {},
      linkThreeObjectExtend: {
        "default": false
      },
      linkPositionUpdate: {
        triggerUpdate: false
      },
      // custom function to call for updating the link's position. Signature: (threeObj, { start: { x, y, z},  end: { x, y, z }}, link). If the function returns a truthy value, the regular link position update will not run.
      linkDirectionalArrowLength: {
        "default": 0
      },
      linkDirectionalArrowColor: {},
      linkDirectionalArrowRelPos: {
        "default": 0.5,
        triggerUpdate: false
      },
      // value between 0<>1 indicating the relative pos along the (exposed) line
      linkDirectionalArrowResolution: {
        "default": 8
      },
      // how many slice segments in the arrow's conic circumference
      linkDirectionalParticles: {
        "default": 0
      },
      // animate photons travelling in the link direction
      linkDirectionalParticleSpeed: {
        "default": 0.01,
        triggerUpdate: false
      },
      // in link length ratio per frame
      linkDirectionalParticleWidth: {
        "default": 0.5
      },
      linkDirectionalParticleColor: {},
      linkDirectionalParticleResolution: {
        "default": 4
      },
      // how many slice segments in the particle sphere's circumference
      forceEngine: {
        "default": 'd3'
      },
      // d3 or ngraph
      d3AlphaMin: {
        "default": 0
      },
      d3AlphaDecay: {
        "default": 0.0228,
        triggerUpdate: false,
        onChange: function onChange(alphaDecay, state) {
          state.d3ForceLayout.alphaDecay(alphaDecay);
        }
      },
      d3AlphaTarget: {
        "default": 0,
        triggerUpdate: false,
        onChange: function onChange(alphaTarget, state) {
          state.d3ForceLayout.alphaTarget(alphaTarget);
        }
      },
      d3VelocityDecay: {
        "default": 0.4,
        triggerUpdate: false,
        onChange: function onChange(velocityDecay, state) {
          state.d3ForceLayout.velocityDecay(velocityDecay);
        }
      },
      ngraphPhysics: {
        "default": {
          // defaults from https://github.com/anvaka/ngraph.physics.simulator/blob/master/index.js
          timeStep: 20,
          gravity: -1.2,
          theta: 0.8,
          springLength: 30,
          springCoefficient: 0.0008,
          dragCoefficient: 0.02
        }
      },
      warmupTicks: {
        "default": 0,
        triggerUpdate: false
      },
      // how many times to tick the force engine at init before starting to render
      cooldownTicks: {
        "default": Infinity,
        triggerUpdate: false
      },
      cooldownTime: {
        "default": 15000,
        triggerUpdate: false
      },
      // ms
      onLoading: {
        "default": function _default() {},
        triggerUpdate: false
      },
      onFinishLoading: {
        "default": function _default() {},
        triggerUpdate: false
      },
      onUpdate: {
        "default": function _default() {},
        triggerUpdate: false
      },
      onFinishUpdate: {
        "default": function _default() {},
        triggerUpdate: false
      },
      onEngineTick: {
        "default": function _default() {},
        triggerUpdate: false
      },
      onEngineStop: {
        "default": function _default() {},
        triggerUpdate: false
      }
    },
    methods: {
      refresh: function refresh(state) {
        state._flushObjects = true;

        state._rerender();

        return this;
      },
      // Expose d3 forces for external manipulation
      d3Force: function d3Force(state, forceName, forceFn) {
        if (forceFn === undefined) {
          return state.d3ForceLayout.force(forceName); // Force getter
        }

        state.d3ForceLayout.force(forceName, forceFn); // Force setter

        return this;
      },
      d3ReheatSimulation: function d3ReheatSimulation(state) {
        state.d3ForceLayout.alpha(1);
        this.resetCountdown();
        return this;
      },
      // reset cooldown state
      resetCountdown: function resetCountdown(state) {
        state.cntTicks = 0;
        state.startTickTime = new Date();
        state.engineRunning = true;
        return this;
      },
      tickFrame: function tickFrame(state) {
        var isD3Sim = state.forceEngine !== 'ngraph';

        if (state.engineRunning) {
          layoutTick();
        }

        updateArrows();
        updatePhotons();
        return this; //

        function layoutTick() {
          if (++state.cntTicks > state.cooldownTicks || new Date() - state.startTickTime > state.cooldownTime || isD3Sim && state.d3AlphaMin > 0 && state.d3ForceLayout.alpha() < state.d3AlphaMin) {
            state.engineRunning = false; // Stop ticking graph

            state.onEngineStop();
          } else {
            state.layout[isD3Sim ? 'tick' : 'step'](); // Tick it

            state.onEngineTick();
          } // Update nodes position


          state.graphData.nodes.forEach(function (node) {
            var obj = node.__threeObj;
            if (!obj) return;
            var pos = isD3Sim ? node : state.layout.getNodePosition(node[state.nodeId]);
            obj.position.x = pos.x;
            obj.position.y = pos.y || 0;
            obj.position.z = pos.z || 0;
          }); // Update links position

          var linkWidthAccessor = index$1(state.linkWidth);
          var linkCurvatureAccessor = index$1(state.linkCurvature);
          var linkCurveRotationAccessor = index$1(state.linkCurveRotation);
          var linkThreeObjectExtendAccessor = index$1(state.linkThreeObjectExtend);
          state.graphData.links.forEach(function (link) {
            var lineObj = link.__lineObj;
            if (!lineObj) return;
            var pos = isD3Sim ? link : state.layout.getLinkPosition(state.layout.graph.getLink(link.source, link.target).id);
            var start = pos[isD3Sim ? 'source' : 'from'];
            var end = pos[isD3Sim ? 'target' : 'to'];
            if (!start || !end || !start.hasOwnProperty('x') || !end.hasOwnProperty('x')) return; // skip invalid link

            calcLinkCurve(link); // calculate link curve for all links, including custom replaced, so it can be used in directional functionality

            var extendedObj = linkThreeObjectExtendAccessor(link);

            if (state.linkPositionUpdate && state.linkPositionUpdate(extendedObj ? lineObj.children[1] : lineObj, // pass child custom object if extending the default
            {
              start: {
                x: start.x,
                y: start.y,
                z: start.z
              },
              end: {
                x: end.x,
                y: end.y,
                z: end.z
              }
            }, link) && !extendedObj) {
              // exit if successfully custom updated position of non-extended obj
              return;
            }

            var curveResolution = 30; // # line segments

            var curve = link.__curve; // select default line obj if it's an extended group

            var line = lineObj.children.length ? lineObj.children[0] : lineObj;

            if (line.type === 'Line') {
              // Update line geometry
              if (!curve) {
                // straight line
                var linePos = line.geometry.getAttribute('position');

                if (!linePos || !linePos.array || linePos.array.length !== 6) {
                  line.geometry[setAttributeFn]('position', linePos = new three$1.BufferAttribute(new Float32Array(2 * 3), 3));
                }

                linePos.array[0] = start.x;
                linePos.array[1] = start.y || 0;
                linePos.array[2] = start.z || 0;
                linePos.array[3] = end.x;
                linePos.array[4] = end.y || 0;
                linePos.array[5] = end.z || 0;
                linePos.needsUpdate = true;
              } else {
                // bezier curve line
                line.geometry.setFromPoints(curve.getPoints(curveResolution));
              }

              line.geometry.computeBoundingSphere();
            } else if (line.type === 'Mesh') {
              // Update cylinder geometry
              if (!curve) {
                // straight tube
                if (!line.geometry.type.match(/^Cylinder(Buffer)?Geometry$/)) {
                  var linkWidth = Math.ceil(linkWidthAccessor(link) * 10) / 10;
                  var r = linkWidth / 2;
                  var geometry = new three$1.CylinderBufferGeometry(r, r, 1, state.linkResolution, 1, false);
                  geometry[applyMatrix4Fn](new three$1.Matrix4().makeTranslation(0, 1 / 2, 0));
                  geometry[applyMatrix4Fn](new three$1.Matrix4().makeRotationX(Math.PI / 2));
                  line.geometry.dispose();
                  line.geometry = geometry;
                }

                var vStart = new three$1.Vector3(start.x, start.y || 0, start.z || 0);
                var vEnd = new three$1.Vector3(end.x, end.y || 0, end.z || 0);
                var distance = vStart.distanceTo(vEnd);
                line.position.x = vStart.x;
                line.position.y = vStart.y;
                line.position.z = vStart.z;
                line.scale.z = distance;
                line.parent.localToWorld(vEnd); // lookAt requires world coords

                line.lookAt(vEnd);
              } else {
                // curved tube
                if (!line.geometry.type.match(/^Tube(Buffer)?Geometry$/)) {
                  // reset object positioning
                  line.position.set(0, 0, 0);
                  line.rotation.set(0, 0, 0);
                  line.scale.set(1, 1, 1);
                }

                var _linkWidth = Math.ceil(linkWidthAccessor(link) * 10) / 10;

                var _r = _linkWidth / 2;

                var _geometry = new three$1.TubeBufferGeometry(curve, curveResolution, _r, state.linkResolution, false);

                line.geometry.dispose();
                line.geometry = _geometry;
              }
            }
          }); //

          function calcLinkCurve(link) {
            var pos = isD3Sim ? link : state.layout.getLinkPosition(state.layout.graph.getLink(link.source, link.target).id);
            var start = pos[isD3Sim ? 'source' : 'from'];
            var end = pos[isD3Sim ? 'target' : 'to'];
            if (!start || !end || !start.hasOwnProperty('x') || !end.hasOwnProperty('x')) return; // skip invalid link

            var curvature = linkCurvatureAccessor(link);

            if (!curvature) {
              link.__curve = null; // Straight line
            } else {
              // bezier curve line (only for line types)
              var vStart = new three$1.Vector3(start.x, start.y || 0, start.z || 0);
              var vEnd = new three$1.Vector3(end.x, end.y || 0, end.z || 0);
              var l = vStart.distanceTo(vEnd); // line length

              var curve;
              var curveRotation = linkCurveRotationAccessor(link);

              if (l > 0) {
                var dx = end.x - start.x;
                var dy = end.y - start.y || 0;
                var vLine = new three$1.Vector3().subVectors(vEnd, vStart);
                var cp = vLine.clone().multiplyScalar(curvature).cross(dx !== 0 || dy !== 0 ? new three$1.Vector3(0, 0, 1) : new three$1.Vector3(0, 1, 0)) // avoid cross-product of parallel vectors (prefer Z, fallback to Y)
                .applyAxisAngle(vLine.normalize(), curveRotation) // rotate along line axis according to linkCurveRotation
                .add(new three$1.Vector3().addVectors(vStart, vEnd).divideScalar(2));
                curve = new three$1.QuadraticBezierCurve3(vStart, cp, vEnd);
              } else {
                // Same point, draw a loop
                var d = curvature * 70;
                var endAngle = -curveRotation; // Rotate clockwise (from Z angle perspective)

                var startAngle = endAngle + Math.PI / 2;
                curve = new three$1.CubicBezierCurve3(vStart, new three$1.Vector3(d * Math.cos(startAngle), d * Math.sin(startAngle), 0).add(vStart), new three$1.Vector3(d * Math.cos(endAngle), d * Math.sin(endAngle), 0).add(vStart), vEnd);
              }

              link.__curve = curve;
            }
          }
        }

        function updateArrows() {
          // update link arrow position
          var arrowRelPosAccessor = index$1(state.linkDirectionalArrowRelPos);
          var arrowLengthAccessor = index$1(state.linkDirectionalArrowLength);
          var nodeValAccessor = index$1(state.nodeVal);
          state.graphData.links.forEach(function (link) {
            var arrowObj = link.__arrowObj;
            if (!arrowObj) return;
            var pos = isD3Sim ? link : state.layout.getLinkPosition(state.layout.graph.getLink(link.source, link.target).id);
            var start = pos[isD3Sim ? 'source' : 'from'];
            var end = pos[isD3Sim ? 'target' : 'to'];
            if (!start || !end || !start.hasOwnProperty('x') || !end.hasOwnProperty('x')) return; // skip invalid link

            var startR = Math.sqrt(Math.max(0, nodeValAccessor(start) || 1)) * state.nodeRelSize;
            var endR = Math.sqrt(Math.max(0, nodeValAccessor(end) || 1)) * state.nodeRelSize;
            var arrowLength = arrowLengthAccessor(link);
            var arrowRelPos = arrowRelPosAccessor(link);
            var getPosAlongLine = link.__curve ? function (t) {
              return link.__curve.getPoint(t);
            } // interpolate along bezier curve
            : function (t) {
              // straight line: interpolate linearly
              var iplt = function iplt(dim, start, end, t) {
                return start[dim] + (end[dim] - start[dim]) * t || 0;
              };

              return {
                x: iplt('x', start, end, t),
                y: iplt('y', start, end, t),
                z: iplt('z', start, end, t)
              };
            };
            var lineLen = link.__curve ? link.__curve.getLength() : Math.sqrt(['x', 'y', 'z'].map(function (dim) {
              return Math.pow((end[dim] || 0) - (start[dim] || 0), 2);
            }).reduce(function (acc, v) {
              return acc + v;
            }, 0));
            var posAlongLine = startR + arrowLength + (lineLen - startR - endR - arrowLength) * arrowRelPos;
            var arrowHead = getPosAlongLine(posAlongLine / lineLen);
            var arrowTail = getPosAlongLine((posAlongLine - arrowLength) / lineLen);
            ['x', 'y', 'z'].forEach(function (dim) {
              return arrowObj.position[dim] = arrowTail[dim];
            });

            var headVec = _construct(three$1.Vector3, _toConsumableArray$2(['x', 'y', 'z'].map(function (c) {
              return arrowHead[c];
            })));

            arrowObj.parent.localToWorld(headVec); // lookAt requires world coords

            arrowObj.lookAt(headVec);
          });
        }

        function updatePhotons() {
          // update link particle positions
          var particleSpeedAccessor = index$1(state.linkDirectionalParticleSpeed);
          state.graphData.links.forEach(function (link) {
            var cyclePhotons = link.__photonsObj && link.__photonsObj.children;
            var singleHopPhotons = link.__singleHopPhotonsObj && link.__singleHopPhotonsObj.children;
            if ((!singleHopPhotons || !singleHopPhotons.length) && (!cyclePhotons || !cyclePhotons.length)) return;
            var pos = isD3Sim ? link : state.layout.getLinkPosition(state.layout.graph.getLink(link.source, link.target).id);
            var start = pos[isD3Sim ? 'source' : 'from'];
            var end = pos[isD3Sim ? 'target' : 'to'];
            if (!start || !end || !start.hasOwnProperty('x') || !end.hasOwnProperty('x')) return; // skip invalid link

            var particleSpeed = particleSpeedAccessor(link);
            var getPhotonPos = link.__curve ? function (t) {
              return link.__curve.getPoint(t);
            } // interpolate along bezier curve
            : function (t) {
              // straight line: interpolate linearly
              var iplt = function iplt(dim, start, end, t) {
                return start[dim] + (end[dim] - start[dim]) * t || 0;
              };

              return {
                x: iplt('x', start, end, t),
                y: iplt('y', start, end, t),
                z: iplt('z', start, end, t)
              };
            };
            var photons = [].concat(_toConsumableArray$2(cyclePhotons || []), _toConsumableArray$2(singleHopPhotons || []));
            photons.forEach(function (photon, idx) {
              var singleHop = photon.parent.__linkThreeObjType === 'singleHopPhotons';

              if (!photon.hasOwnProperty('__progressRatio')) {
                photon.__progressRatio = singleHop ? 0 : idx / cyclePhotons.length;
              }

              photon.__progressRatio += particleSpeed;

              if (photon.__progressRatio >= 1) {
                if (!singleHop) {
                  photon.__progressRatio = photon.__progressRatio % 1;
                } else {
                  // remove particle
                  photon.parent.remove(photon);
                  emptyObject(photon);
                  return;
                }
              }

              var photonPosRatio = photon.__progressRatio;
              var pos = getPhotonPos(photonPosRatio);
              ['x', 'y', 'z'].forEach(function (dim) {
                return photon.position[dim] = pos[dim];
              });
            });
          });
        }
      },
      emitParticle: function emitParticle(state, link) {
        if (link) {
          if (!link.__singleHopPhotonsObj) {
            var obj = new three$1.Group();
            obj.__linkThreeObjType = 'singleHopPhotons';
            link.__singleHopPhotonsObj = obj;
            state.graphScene.add(obj);
          }

          var particleWidthAccessor = index$1(state.linkDirectionalParticleWidth);
          var photonR = Math.ceil(particleWidthAccessor(link) * 10) / 10 / 2;
          var numSegments = state.linkDirectionalParticleResolution;
          var particleGeometry = new three$1.SphereBufferGeometry(photonR, numSegments, numSegments);
          var linkColorAccessor = index$1(state.linkColor);
          var particleColorAccessor = index$1(state.linkDirectionalParticleColor);
          var photonColor = particleColorAccessor(link) || linkColorAccessor(link) || '#f0f0f0';
          var materialColor = new three$1.Color(colorStr2Hex(photonColor));
          var opacity = state.linkOpacity * 3;
          var particleMaterial = new three$1.MeshLambertMaterial({
            color: materialColor,
            transparent: true,
            opacity: opacity
          }); // add a single hop particle

          link.__singleHopPhotonsObj.add(new three$1.Mesh(particleGeometry, particleMaterial));
        }

        return this;
      },
      getGraphBbox: function getGraphBbox(state) {
        var nodeFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
          return true;
        };
        if (!state.initialised) return null; // recursively collect all nested geometries bboxes

        var bboxes = function getBboxes(obj) {
          var bboxes = [];

          if (obj.geometry) {
            obj.geometry.computeBoundingBox();
            var box = new three$1.Box3();
            box.copy(obj.geometry.boundingBox).applyMatrix4(obj.matrixWorld);
            bboxes.push(box);
          }

          return bboxes.concat.apply(bboxes, _toConsumableArray$2((obj.children || []).filter(function (obj) {
            return !obj.hasOwnProperty('__graphObjType') || obj.__graphObjType === 'node' && nodeFilter(obj.__data);
          } // exclude filtered out nodes
          ).map(getBboxes)));
        }(state.graphScene);

        if (!bboxes.length) return null; // extract global x,y,z min/max

        return Object.assign.apply(Object, _toConsumableArray$2(['x', 'y', 'z'].map(function (c) {
          return _defineProperty$1({}, c, [min(bboxes, function (bb) {
            return bb.min[c];
          }), max(bboxes, function (bb) {
            return bb.max[c];
          })]);
        })));
      }
    },
    stateInit: function stateInit() {
      return {
        d3ForceLayout: d3ForceSimulation().force('link', d3ForceLink()).force('charge', d3ForceManyBody()).force('center', d3ForceCenter()).force('dagRadial', null).stop(),
        engineRunning: false
      };
    },
    init: function init(threeObj, state) {
      // Main three object to manipulate
      state.graphScene = threeObj;
    },
    update: function update(state, changedProps) {
      var hasAnyPropChanged = function hasAnyPropChanged(propList) {
        return propList.some(function (p) {
          return changedProps.hasOwnProperty(p);
        });
      };

      state.engineRunning = false; // pause simulation

      state.onUpdate();

      if (state.nodeAutoColorBy !== null && hasAnyPropChanged(['nodeAutoColorBy', 'graphData', 'nodeColor'])) {
        // Auto add color to uncolored nodes
        autoColorObjects(state.graphData.nodes, index$1(state.nodeAutoColorBy), state.nodeColor);
      }

      if (state.linkAutoColorBy !== null && hasAnyPropChanged(['linkAutoColorBy', 'graphData', 'linkColor'])) {
        // Auto add color to uncolored links
        autoColorObjects(state.graphData.links, index$1(state.linkAutoColorBy), state.linkColor);
      } // Digest nodes WebGL objects


      if (state._flushObjects || hasAnyPropChanged(['graphData', 'nodeThreeObject', 'nodeThreeObjectExtend', 'nodeVal', 'nodeColor', 'nodeVisibility', 'nodeRelSize', 'nodeResolution', 'nodeOpacity'])) {
        var customObjectAccessor = index$1(state.nodeThreeObject);
        var customObjectExtendAccessor = index$1(state.nodeThreeObjectExtend);
        var valAccessor = index$1(state.nodeVal);
        var colorAccessor = index$1(state.nodeColor);
        var visibilityAccessor = index$1(state.nodeVisibility);
        var sphereGeometries = {}; // indexed by node value

        var sphereMaterials = {}; // indexed by color

        threeDigest(state.graphData.nodes.filter(visibilityAccessor), state.graphScene, {
          purge: state._flushObjects || hasAnyPropChanged([// recreate objects if any of these props have changed
          'nodeThreeObject', 'nodeThreeObjectExtend']),
          objFilter: function objFilter(obj) {
            return obj.__graphObjType === 'node';
          },
          createObj: function createObj(node) {
            var customObj = customObjectAccessor(node);
            var extendObj = customObjectExtendAccessor(node);

            if (customObj && state.nodeThreeObject === customObj) {
              // clone object if it's a shared object among all nodes
              customObj = customObj.clone();
            }

            var obj;

            if (customObj && !extendObj) {
              obj = customObj;
            } else {
              // Add default object (sphere mesh)
              obj = new three$1.Mesh();
              obj.__graphDefaultObj = true;

              if (customObj && extendObj) {
                obj.add(customObj); // extend default with custom
              }
            }

            obj.__graphObjType = 'node'; // Add object type

            return obj;
          },
          updateObj: function updateObj(obj, node) {
            if (obj.__graphDefaultObj) {
              // bypass internal updates for custom node objects
              var val = valAccessor(node) || 1;
              var radius = Math.cbrt(val) * state.nodeRelSize;
              var numSegments = state.nodeResolution;

              if (!obj.geometry.type.match(/^Sphere(Buffer)?Geometry$/) || obj.geometry.parameters.radius !== radius || obj.geometry.parameters.widthSegments !== numSegments) {
                if (!sphereGeometries.hasOwnProperty(val)) {
                  sphereGeometries[val] = new three$1.SphereBufferGeometry(radius, numSegments, numSegments);
                }

                obj.geometry.dispose();
                obj.geometry = sphereGeometries[val];
              }

              var color = colorAccessor(node);
              var materialColor = new three$1.Color(colorStr2Hex(color || '#ffffaa'));
              var opacity = state.nodeOpacity * colorAlpha(color);

              if (obj.material.type !== 'MeshLambertMaterial' || !obj.material.color.equals(materialColor) || obj.material.opacity !== opacity) {
                if (!sphereMaterials.hasOwnProperty(color)) {
                  sphereMaterials[color] = new three$1.MeshLambertMaterial({
                    color: materialColor,
                    transparent: true,
                    opacity: opacity
                  });
                }

                obj.material.dispose();
                obj.material = sphereMaterials[color];
              }
            }
          }
        });
      } // Digest links WebGL objects


      if (state._flushObjects || hasAnyPropChanged(['graphData', 'linkThreeObject', 'linkThreeObjectExtend', 'linkMaterial', 'linkColor', 'linkWidth', 'linkVisibility', 'linkResolution', 'linkOpacity', 'linkDirectionalArrowLength', 'linkDirectionalArrowColor', 'linkDirectionalArrowResolution', 'linkDirectionalParticles', 'linkDirectionalParticleWidth', 'linkDirectionalParticleColor', 'linkDirectionalParticleResolution'])) {
        var _customObjectAccessor = index$1(state.linkThreeObject);

        var _customObjectExtendAccessor = index$1(state.linkThreeObjectExtend);

        var customMaterialAccessor = index$1(state.linkMaterial);

        var _visibilityAccessor = index$1(state.linkVisibility);

        var _colorAccessor = index$1(state.linkColor);

        var widthAccessor = index$1(state.linkWidth);
        var cylinderGeometries = {}; // indexed by link width

        var lambertLineMaterials = {}; // for cylinder objects, indexed by link color

        var basicLineMaterials = {}; // for line objects, indexed by link color

        var visibleLinks = state.graphData.links.filter(_visibilityAccessor); // lines digest cycle

        threeDigest(visibleLinks, state.graphScene, {
          objBindAttr: '__lineObj',
          purge: state._flushObjects || hasAnyPropChanged([// recreate objects if any of these props have changed
          'linkThreeObject', 'linkThreeObjectExtend', 'linkWidth']),
          objFilter: function objFilter(obj) {
            return obj.__graphObjType === 'link';
          },
          createObj: function createObj(link) {
            var customObj = _customObjectAccessor(link);

            var extendObj = _customObjectExtendAccessor(link);

            if (customObj && state.linkThreeObject === customObj) {
              // clone object if it's a shared object among all links
              customObj = customObj.clone();
            }

            var defaultObj;

            if (!customObj || extendObj) {
              // construct default line obj
              var useCylinder = !!widthAccessor(link);

              if (useCylinder) {
                defaultObj = new three$1.Mesh();
              } else {
                // Use plain line (constant width)
                var lineGeometry = new three$1.BufferGeometry();
                lineGeometry[setAttributeFn]('position', new three$1.BufferAttribute(new Float32Array(2 * 3), 3));
                defaultObj = new three$1.Line(lineGeometry);
              }
            }

            var obj;

            if (!customObj) {
              obj = defaultObj;
              obj.__graphDefaultObj = true;
            } else {
              if (!extendObj) {
                // use custom object
                obj = customObj;
              } else {
                // extend default with custom in a group
                obj = new three$1.Group();
                obj.__graphDefaultObj = true;
                obj.add(defaultObj);
                obj.add(customObj);
              }
            }

            obj.renderOrder = 10; // Prevent visual glitches of dark lines on top of nodes by rendering them last

            obj.__graphObjType = 'link'; // Add object type

            return obj;
          },
          updateObj: function updateObj(updObj, link) {
            if (updObj.__graphDefaultObj) {
              // bypass internal updates for custom link objects
              // select default object if it's an extended group
              var obj = updObj.children.length ? updObj.children[0] : updObj;
              var linkWidth = Math.ceil(widthAccessor(link) * 10) / 10;
              var useCylinder = !!linkWidth;

              if (useCylinder) {
                var r = linkWidth / 2;
                var numSegments = state.linkResolution;

                if (!obj.geometry.type.match(/^Cylinder(Buffer)?Geometry$/) || obj.geometry.parameters.radiusTop !== r || obj.geometry.parameters.radialSegments !== numSegments) {
                  if (!cylinderGeometries.hasOwnProperty(linkWidth)) {
                    var geometry = new three$1.CylinderBufferGeometry(r, r, 1, numSegments, 1, false);
                    geometry[applyMatrix4Fn](new three$1.Matrix4().makeTranslation(0, 1 / 2, 0));
                    geometry[applyMatrix4Fn](new three$1.Matrix4().makeRotationX(Math.PI / 2));
                    cylinderGeometries[linkWidth] = geometry;
                  }

                  obj.geometry.dispose();
                  obj.geometry = cylinderGeometries[linkWidth];
                }
              }

              var customMaterial = customMaterialAccessor(link);

              if (customMaterial) {
                obj.material = customMaterial;
              } else {
                var color = _colorAccessor(link);

                var materialColor = new three$1.Color(colorStr2Hex(color || '#f0f0f0'));
                var opacity = state.linkOpacity * colorAlpha(color);
                var materialType = useCylinder ? 'MeshLambertMaterial' : 'LineBasicMaterial';

                if (obj.material.type !== materialType || !obj.material.color.equals(materialColor) || obj.material.opacity !== opacity) {
                  var lineMaterials = useCylinder ? lambertLineMaterials : basicLineMaterials;

                  if (!lineMaterials.hasOwnProperty(color)) {
                    lineMaterials[color] = new three$1[materialType]({
                      color: materialColor,
                      transparent: opacity < 1,
                      opacity: opacity,
                      depthWrite: opacity >= 1 // Prevent transparency issues

                    });
                  }

                  obj.material.dispose();
                  obj.material = lineMaterials[color];
                }
              }
            }
          }
        }); // Arrows digest cycle

        if (state.linkDirectionalArrowLength || changedProps.hasOwnProperty('linkDirectionalArrowLength')) {
          var arrowLengthAccessor = index$1(state.linkDirectionalArrowLength);
          var arrowColorAccessor = index$1(state.linkDirectionalArrowColor);
          threeDigest(visibleLinks.filter(arrowLengthAccessor), state.graphScene, {
            objBindAttr: '__arrowObj',
            objFilter: function objFilter(obj) {
              return obj.__linkThreeObjType === 'arrow';
            },
            createObj: function createObj() {
              var obj = new three$1.Mesh(undefined, new three$1.MeshLambertMaterial({
                transparent: true
              }));
              obj.__linkThreeObjType = 'arrow'; // Add object type

              return obj;
            },
            updateObj: function updateObj(obj, link) {
              var arrowLength = arrowLengthAccessor(link);
              var numSegments = state.linkDirectionalArrowResolution;

              if (!obj.geometry.type.match(/^Cone(Buffer)?Geometry$/) || obj.geometry.parameters.height !== arrowLength || obj.geometry.parameters.radialSegments !== numSegments) {
                var coneGeometry = new three$1.ConeBufferGeometry(arrowLength * 0.25, arrowLength, numSegments); // Correct orientation

                coneGeometry.translate(0, arrowLength / 2, 0);
                coneGeometry.rotateX(Math.PI / 2);
                obj.geometry.dispose();
                obj.geometry = coneGeometry;
              }

              obj.material.color = new three$1.Color(arrowColorAccessor(link) || _colorAccessor(link) || '#f0f0f0');
              obj.material.opacity = state.linkOpacity * 3;
            }
          });
        } // Photon particles digest cycle


        if (state.linkDirectionalParticles || changedProps.hasOwnProperty('linkDirectionalParticles')) {
          var particlesAccessor = index$1(state.linkDirectionalParticles);
          var particleWidthAccessor = index$1(state.linkDirectionalParticleWidth);
          var particleColorAccessor = index$1(state.linkDirectionalParticleColor);
          var particleMaterials = {}; // indexed by link color

          var particleGeometries = {}; // indexed by particle width

          threeDigest(visibleLinks.filter(particlesAccessor), state.graphScene, {
            objBindAttr: '__photonsObj',
            objFilter: function objFilter(obj) {
              return obj.__linkThreeObjType === 'photons';
            },
            createObj: function createObj() {
              var obj = new three$1.Group();
              obj.__linkThreeObjType = 'photons'; // Add object type

              return obj;
            },
            updateObj: function updateObj(obj, link) {
              var numPhotons = Math.round(Math.abs(particlesAccessor(link)));
              var curPhoton = !!obj.children.length && obj.children[0];
              var photonR = Math.ceil(particleWidthAccessor(link) * 10) / 10 / 2;
              var numSegments = state.linkDirectionalParticleResolution;
              var particleGeometry;

              if (curPhoton && curPhoton.geometry.parameters.radius === photonR && curPhoton.geometry.parameters.widthSegments === numSegments) {
                particleGeometry = curPhoton.geometry;
              } else {
                if (!particleGeometries.hasOwnProperty(photonR)) {
                  particleGeometries[photonR] = new three$1.SphereBufferGeometry(photonR, numSegments, numSegments);
                }

                particleGeometry = particleGeometries[photonR];
                curPhoton && curPhoton.geometry.dispose();
              }

              var photonColor = particleColorAccessor(link) || _colorAccessor(link) || '#f0f0f0';
              var materialColor = new three$1.Color(colorStr2Hex(photonColor));
              var opacity = state.linkOpacity * 3;
              var particleMaterial;

              if (curPhoton && curPhoton.material.color.equals(materialColor) && curPhoton.material.opacity === opacity) {
                particleMaterial = curPhoton.material;
              } else {
                if (!particleMaterials.hasOwnProperty(photonColor)) {
                  particleMaterials[photonColor] = new three$1.MeshLambertMaterial({
                    color: materialColor,
                    transparent: true,
                    opacity: opacity
                  });
                }

                particleMaterial = particleMaterials[photonColor];
                curPhoton && curPhoton.material.dispose();
              } // digest cycle for each photon


              threeDigest(_toConsumableArray$2(new Array(numPhotons)).map(function (_, idx) {
                return {
                  idx: idx
                };
              }), obj, {
                idAccessor: function idAccessor(d) {
                  return d.idx;
                },
                createObj: function createObj() {
                  return new three$1.Mesh(particleGeometry, particleMaterial);
                },
                updateObj: function updateObj(obj) {
                  obj.geometry = particleGeometry;
                  obj.material = particleMaterial;
                }
              });
            }
          });
        }
      }

      state._flushObjects = false; // reset objects refresh flag
      // simulation engine

      if (hasAnyPropChanged(['graphData', 'nodeId', 'linkSource', 'linkTarget', 'numDimensions', 'forceEngine', 'dagMode', 'dagNodeFilter', 'dagLevelDistance'])) {
        state.engineRunning = false; // Pause simulation
        // parse links

        state.graphData.links.forEach(function (link) {
          link.source = link[state.linkSource];
          link.target = link[state.linkTarget];
        }); // Feed data to force-directed layout

        var isD3Sim = state.forceEngine !== 'ngraph';
        var layout;

        if (isD3Sim) {
          // D3-force
          (layout = state.d3ForceLayout).stop().alpha(1) // re-heat the simulation
          .numDimensions(state.numDimensions).nodes(state.graphData.nodes); // add links (if link force is still active)

          var linkForce = state.d3ForceLayout.force('link');

          if (linkForce) {
            linkForce.id(function (d) {
              return d[state.nodeId];
            }).links(state.graphData.links);
          } // setup dag force constraints


          var nodeDepths = state.dagMode && getDagDepths(state.graphData, function (node) {
            return node[state.nodeId];
          }, {
            nodeFilter: state.dagNodeFilter,
            onLoopError: state.onDagError || undefined
          });
          var maxDepth = Math.max.apply(Math, _toConsumableArray$2(Object.values(nodeDepths || [])));
          var dagLevelDistance = state.dagLevelDistance || state.graphData.nodes.length / (maxDepth || 1) * DAG_LEVEL_NODE_RATIO * (['radialin', 'radialout'].indexOf(state.dagMode) !== -1 ? 0.7 : 1); // Fix nodes to x,y,z for dag mode

          if (state.dagMode) {
            var getFFn = function getFFn(fix, invert) {
              return function (node) {
                return !fix ? undefined : (nodeDepths[node[state.nodeId]] - maxDepth / 2) * dagLevelDistance * (invert ? -1 : 1);
              };
            };

            var fxFn = getFFn(['lr', 'rl'].indexOf(state.dagMode) !== -1, state.dagMode === 'rl');
            var fyFn = getFFn(['td', 'bu'].indexOf(state.dagMode) !== -1, state.dagMode === 'td');
            var fzFn = getFFn(['zin', 'zout'].indexOf(state.dagMode) !== -1, state.dagMode === 'zout');
            state.graphData.nodes.filter(state.dagNodeFilter).forEach(function (node) {
              node.fx = fxFn(node);
              node.fy = fyFn(node);
              node.fz = fzFn(node);
            });
          } // Use radial force for radial dags


          state.d3ForceLayout.force('dagRadial', ['radialin', 'radialout'].indexOf(state.dagMode) !== -1 ? d3ForceRadial(function (node) {
            var nodeDepth = nodeDepths[node[state.nodeId]] || -1;
            return (state.dagMode === 'radialin' ? maxDepth - nodeDepth : nodeDepth) * dagLevelDistance;
          }).strength(function (node) {
            return state.dagNodeFilter(node) ? 1 : 0;
          }) : null);
        } else {
          // ngraph
          var _graph = ngraph.graph();

          state.graphData.nodes.forEach(function (node) {
            _graph.addNode(node[state.nodeId]);
          });
          state.graphData.links.forEach(function (link) {
            _graph.addLink(link.source, link.target);
          });
          layout = ngraph.forcelayout(_graph, _objectSpread2$1({
            dimensions: state.numDimensions
          }, state.ngraphPhysics));
          layout.graph = _graph; // Attach graph reference to layout
        }

        for (var i = 0; i < state.warmupTicks && !(isD3Sim && state.d3AlphaMin > 0 && state.d3ForceLayout.alpha() < state.d3AlphaMin); i++) {
          layout[isD3Sim ? "tick" : "step"]();
        } // Initial ticks before starting to render


        state.layout = layout;
        this.resetCountdown();
      }

      state.engineRunning = true; // resume simulation

      state.onFinishUpdate();
    }
  });

  function fromKapsule (kapsule) {
    var baseClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
    var initKapsuleWithSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var FromKapsule = /*#__PURE__*/function (_baseClass) {
      _inherits(FromKapsule, _baseClass);

      var _super = _createSuper(FromKapsule);

      function FromKapsule() {
        var _this;

        _classCallCheck$1(this, FromKapsule);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));
        _this.__kapsuleInstance = kapsule().apply(void 0, [].concat(_toConsumableArray$2(initKapsuleWithSelf ? [_assertThisInitialized(_this)] : []), args));
        return _this;
      }

      return FromKapsule;
    }(baseClass); // attach kapsule props/methods to class prototype


    Object.keys(kapsule()).forEach(function (m) {
      return FromKapsule.prototype[m] = function () {
        var _this$__kapsuleInstan;

        var returnVal = (_this$__kapsuleInstan = this.__kapsuleInstance)[m].apply(_this$__kapsuleInstan, arguments);

        return returnVal === this.__kapsuleInstance ? this // chain based on this class, not the kapsule obj
        : returnVal;
      };
    });
    return FromKapsule;
  }

  var three = window.THREE ? window.THREE : {
    Group: three$2.Group
  }; // Prefer consumption from global THREE, if exists
  var threeForcegraph = fromKapsule(ForceGraph, three.Group, true);

  return threeForcegraph;

})));
//# sourceMappingURL=three-forcegraph.js.map