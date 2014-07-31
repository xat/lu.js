!function(glob) {

  var lu = function() {
    var registry = {}, injectable, container;

    injectable = function(deps, fn) {
      if (typeof deps === 'function') return deps;
      deps = pick(deps, registry);
      return function() {
        return fn.apply(fn, result(deps));
      }
    };

    container = function(deps, fn) {
      return injectable(deps, fn)();
    };

    container.service = function(name, deps, fn) {
      registry[name] = memoize(injectable(deps, fn));
    };

    container.factory = function(name, deps, fn) {
      registry[name] = injectable(deps, fn);
    };

    container.value = function(name, val) {
      registry[name] = identity(val);
    };

    container.get = function(name) {
      return registry[name]();
    };

    return container;
  };

  var memoize = function(fn) {
    var memo, memoized = false;
    return function() {
      if (!memoized) {
        memoized = true;
        memo = fn.apply(fn, arguments);
      }
      return memo;
    }
  };

  var pick = function(props, obj) {
    var res = [];
    for (var i=0, len = props.length; i < len; i++) {
      res.push(obj[props[i]]);
    }
    return res;
  };

  var result = function(props) {
    var res = [];
    for (var i=0, len = props.length; i < len; i++) {
      res.push(typeof props[i] === 'function' ? props[i]() : props[i]);
    }
    return res;
  };

  var identity = function(val) {
    return function() {
      return val;
    }
  };

  // Node.js / browserify
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = lu;
  }
  // <script>
  else {
    glob.lu = lu;
  }

}(this);