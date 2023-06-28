import ha, { jsx as ue, jsxs as Mt } from "react/jsx-runtime";
import * as x from "react";
import Ze, { forwardRef as va, useContext as ya, Children as ga, isValidElement as Pr, cloneElement as _r, useState as ba } from "react";
import * as Ea from "react-dom";
import Tr from "react-dom";
function xa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ta(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      if (this instanceof n) {
        var o = [null];
        o.push.apply(o, arguments);
        var i = Function.bind.apply(t, o);
        return new i();
      }
      return t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Un = {}, Zi = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Zi);
var wa = Zi.exports, bn = {};
function Yr(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || t(...n);
  };
}
function S() {
  return S = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, S.apply(this, arguments);
}
function pt(e) {
  return e !== null && typeof e == "object" && e.constructor === Object;
}
function Qi(e) {
  if (!pt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = Qi(e[r]);
  }), t;
}
function Qe(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? S({}, e) : e;
  return pt(e) && pt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (pt(t[o]) && o in e && pt(e[o]) ? n[o] = Qe(e[o], t[o], r) : r.clone ? n[o] = pt(t[o]) ? Qi(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var Nn = { exports: {} }, wr = { exports: {} }, ne = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Do;
function Oa() {
  if (Do)
    return ne;
  Do = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, g = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function w(p) {
    if (typeof p == "object" && p !== null) {
      var C = p.$$typeof;
      switch (C) {
        case t:
          switch (p = p.type, p) {
            case l:
            case f:
            case n:
            case i:
            case o:
            case d:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case c:
                case u:
                case g:
                case y:
                case s:
                  return p;
                default:
                  return C;
              }
          }
        case r:
          return C;
      }
    }
  }
  function b(p) {
    return w(p) === f;
  }
  return ne.AsyncMode = l, ne.ConcurrentMode = f, ne.ContextConsumer = c, ne.ContextProvider = s, ne.Element = t, ne.ForwardRef = u, ne.Fragment = n, ne.Lazy = g, ne.Memo = y, ne.Portal = r, ne.Profiler = i, ne.StrictMode = o, ne.Suspense = d, ne.isAsyncMode = function(p) {
    return b(p) || w(p) === l;
  }, ne.isConcurrentMode = b, ne.isContextConsumer = function(p) {
    return w(p) === c;
  }, ne.isContextProvider = function(p) {
    return w(p) === s;
  }, ne.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === t;
  }, ne.isForwardRef = function(p) {
    return w(p) === u;
  }, ne.isFragment = function(p) {
    return w(p) === n;
  }, ne.isLazy = function(p) {
    return w(p) === g;
  }, ne.isMemo = function(p) {
    return w(p) === y;
  }, ne.isPortal = function(p) {
    return w(p) === r;
  }, ne.isProfiler = function(p) {
    return w(p) === i;
  }, ne.isStrictMode = function(p) {
    return w(p) === o;
  }, ne.isSuspense = function(p) {
    return w(p) === d;
  }, ne.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === n || p === f || p === i || p === o || p === d || p === h || typeof p == "object" && p !== null && (p.$$typeof === g || p.$$typeof === y || p.$$typeof === s || p.$$typeof === c || p.$$typeof === u || p.$$typeof === v || p.$$typeof === T || p.$$typeof === $ || p.$$typeof === m);
  }, ne.typeOf = w, ne;
}
var oe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lo;
function Sa() {
  return Lo || (Lo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, g = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function w(E) {
      return typeof E == "string" || typeof E == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      E === n || E === f || E === i || E === o || E === d || E === h || typeof E == "object" && E !== null && (E.$$typeof === g || E.$$typeof === y || E.$$typeof === s || E.$$typeof === c || E.$$typeof === u || E.$$typeof === v || E.$$typeof === T || E.$$typeof === $ || E.$$typeof === m);
    }
    function b(E) {
      if (typeof E == "object" && E !== null) {
        var de = E.$$typeof;
        switch (de) {
          case t:
            var N = E.type;
            switch (N) {
              case l:
              case f:
              case n:
              case i:
              case o:
              case d:
                return N;
              default:
                var fe = N && N.$$typeof;
                switch (fe) {
                  case c:
                  case u:
                  case g:
                  case y:
                  case s:
                    return fe;
                  default:
                    return de;
                }
            }
          case r:
            return de;
        }
      }
    }
    var p = l, C = f, R = c, V = s, M = t, P = u, F = n, J = g, G = y, Z = r, z = i, k = o, q = d, H = !1;
    function ee(E) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(E) || b(E) === l;
    }
    function O(E) {
      return b(E) === f;
    }
    function _(E) {
      return b(E) === c;
    }
    function U(E) {
      return b(E) === s;
    }
    function W(E) {
      return typeof E == "object" && E !== null && E.$$typeof === t;
    }
    function A(E) {
      return b(E) === u;
    }
    function L(E) {
      return b(E) === n;
    }
    function D(E) {
      return b(E) === g;
    }
    function B(E) {
      return b(E) === y;
    }
    function I(E) {
      return b(E) === r;
    }
    function j(E) {
      return b(E) === i;
    }
    function Y(E) {
      return b(E) === o;
    }
    function Q(E) {
      return b(E) === d;
    }
    oe.AsyncMode = p, oe.ConcurrentMode = C, oe.ContextConsumer = R, oe.ContextProvider = V, oe.Element = M, oe.ForwardRef = P, oe.Fragment = F, oe.Lazy = J, oe.Memo = G, oe.Portal = Z, oe.Profiler = z, oe.StrictMode = k, oe.Suspense = q, oe.isAsyncMode = ee, oe.isConcurrentMode = O, oe.isContextConsumer = _, oe.isContextProvider = U, oe.isElement = W, oe.isForwardRef = A, oe.isFragment = L, oe.isLazy = D, oe.isMemo = B, oe.isPortal = I, oe.isProfiler = j, oe.isStrictMode = Y, oe.isSuspense = Q, oe.isValidElementType = w, oe.typeOf = b;
  }()), oe;
}
var Vo;
function es() {
  return Vo || (Vo = 1, process.env.NODE_ENV === "production" ? wr.exports = Oa() : wr.exports = Sa()), wr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var En, zo;
function Ca() {
  if (zo)
    return En;
  zo = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, c = 0; c < 10; c++)
        s["_" + String.fromCharCode(c)] = c;
      var l = Object.getOwnPropertyNames(s).map(function(u) {
        return s[u];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var f = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        f[u] = u;
      }), Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return En = o() ? Object.assign : function(i, s) {
    for (var c, l = n(i), f, u = 1; u < arguments.length; u++) {
      c = Object(arguments[u]);
      for (var d in c)
        t.call(c, d) && (l[d] = c[d]);
      if (e) {
        f = e(c);
        for (var h = 0; h < f.length; h++)
          r.call(c, f[h]) && (l[f[h]] = c[f[h]]);
      }
    }
    return l;
  }, En;
}
var xn, Bo;
function Yn() {
  if (Bo)
    return xn;
  Bo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return xn = e, xn;
}
var Tn, Fo;
function ts() {
  return Fo || (Fo = 1, Tn = Function.call.bind(Object.prototype.hasOwnProperty)), Tn;
}
var wn, Wo;
function Ra() {
  if (Wo)
    return wn;
  Wo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Yn(), r = {}, n = ts();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, c, l, f) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in i)
        if (n(i, u)) {
          var d;
          try {
            if (typeof i[u] != "function") {
              var h = Error(
                (l || "React class") + ": " + c + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw h.name = "Invariant Violation", h;
            }
            d = i[u](s, u, l, c, null, t);
          } catch (g) {
            d = g;
          }
          if (d && !(d instanceof Error) && e(
            (l || "React class") + ": type specification of " + c + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof d + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), d instanceof Error && !(d.message in r)) {
            r[d.message] = !0;
            var y = f ? f() : "";
            e(
              "Failed " + c + " type: " + d.message + (y ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, wn = o, wn;
}
var On, Uo;
function $a() {
  if (Uo)
    return On;
  Uo = 1;
  var e = es(), t = Ca(), r = Yn(), n = ts(), o = Ra(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(c) {
    var l = "Warning: " + c;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return On = function(c, l) {
    var f = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function d(O) {
      var _ = O && (f && O[f] || O[u]);
      if (typeof _ == "function")
        return _;
    }
    var h = "<<anonymous>>", y = {
      array: T("array"),
      bigint: T("bigint"),
      bool: T("boolean"),
      func: T("function"),
      number: T("number"),
      object: T("object"),
      string: T("string"),
      symbol: T("symbol"),
      any: $(),
      arrayOf: w,
      element: b(),
      elementType: p(),
      instanceOf: C,
      node: P(),
      objectOf: V,
      oneOf: R,
      oneOfType: M,
      shape: J,
      exact: G
    };
    function g(O, _) {
      return O === _ ? O !== 0 || 1 / O === 1 / _ : O !== O && _ !== _;
    }
    function m(O, _) {
      this.message = O, this.data = _ && typeof _ == "object" ? _ : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function v(O) {
      if (process.env.NODE_ENV !== "production")
        var _ = {}, U = 0;
      function W(L, D, B, I, j, Y, Q) {
        if (I = I || h, Y = Y || B, Q !== r) {
          if (l) {
            var E = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw E.name = "Invariant Violation", E;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var de = I + ":" + B;
            !_[de] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + I + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), _[de] = !0, U++);
          }
        }
        return D[B] == null ? L ? D[B] === null ? new m("The " + j + " `" + Y + "` is marked as required " + ("in `" + I + "`, but its value is `null`.")) : new m("The " + j + " `" + Y + "` is marked as required in " + ("`" + I + "`, but its value is `undefined`.")) : null : O(D, B, I, j, Y);
      }
      var A = W.bind(null, !1);
      return A.isRequired = W.bind(null, !0), A;
    }
    function T(O) {
      function _(U, W, A, L, D, B) {
        var I = U[W], j = k(I);
        if (j !== O) {
          var Y = q(I);
          return new m(
            "Invalid " + L + " `" + D + "` of type " + ("`" + Y + "` supplied to `" + A + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return v(_);
    }
    function $() {
      return v(s);
    }
    function w(O) {
      function _(U, W, A, L, D) {
        if (typeof O != "function")
          return new m("Property `" + D + "` of component `" + A + "` has invalid PropType notation inside arrayOf.");
        var B = U[W];
        if (!Array.isArray(B)) {
          var I = k(B);
          return new m("Invalid " + L + " `" + D + "` of type " + ("`" + I + "` supplied to `" + A + "`, expected an array."));
        }
        for (var j = 0; j < B.length; j++) {
          var Y = O(B, j, A, L, D + "[" + j + "]", r);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return v(_);
    }
    function b() {
      function O(_, U, W, A, L) {
        var D = _[U];
        if (!c(D)) {
          var B = k(D);
          return new m("Invalid " + A + " `" + L + "` of type " + ("`" + B + "` supplied to `" + W + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(O);
    }
    function p() {
      function O(_, U, W, A, L) {
        var D = _[U];
        if (!e.isValidElementType(D)) {
          var B = k(D);
          return new m("Invalid " + A + " `" + L + "` of type " + ("`" + B + "` supplied to `" + W + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(O);
    }
    function C(O) {
      function _(U, W, A, L, D) {
        if (!(U[W] instanceof O)) {
          var B = O.name || h, I = ee(U[W]);
          return new m("Invalid " + L + " `" + D + "` of type " + ("`" + I + "` supplied to `" + A + "`, expected ") + ("instance of `" + B + "`."));
        }
        return null;
      }
      return v(_);
    }
    function R(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function _(U, W, A, L, D) {
        for (var B = U[W], I = 0; I < O.length; I++)
          if (g(B, O[I]))
            return null;
        var j = JSON.stringify(O, function(Q, E) {
          var de = q(E);
          return de === "symbol" ? String(E) : E;
        });
        return new m("Invalid " + L + " `" + D + "` of value `" + String(B) + "` " + ("supplied to `" + A + "`, expected one of " + j + "."));
      }
      return v(_);
    }
    function V(O) {
      function _(U, W, A, L, D) {
        if (typeof O != "function")
          return new m("Property `" + D + "` of component `" + A + "` has invalid PropType notation inside objectOf.");
        var B = U[W], I = k(B);
        if (I !== "object")
          return new m("Invalid " + L + " `" + D + "` of type " + ("`" + I + "` supplied to `" + A + "`, expected an object."));
        for (var j in B)
          if (n(B, j)) {
            var Y = O(B, j, A, L, D + "." + j, r);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return v(_);
    }
    function M(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var _ = 0; _ < O.length; _++) {
        var U = O[_];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + H(U) + " at index " + _ + "."
          ), s;
      }
      function W(A, L, D, B, I) {
        for (var j = [], Y = 0; Y < O.length; Y++) {
          var Q = O[Y], E = Q(A, L, D, B, I, r);
          if (E == null)
            return null;
          E.data && n(E.data, "expectedType") && j.push(E.data.expectedType);
        }
        var de = j.length > 0 ? ", expected one of type [" + j.join(", ") + "]" : "";
        return new m("Invalid " + B + " `" + I + "` supplied to " + ("`" + D + "`" + de + "."));
      }
      return v(W);
    }
    function P() {
      function O(_, U, W, A, L) {
        return Z(_[U]) ? null : new m("Invalid " + A + " `" + L + "` supplied to " + ("`" + W + "`, expected a ReactNode."));
      }
      return v(O);
    }
    function F(O, _, U, W, A) {
      return new m(
        (O || "React class") + ": " + _ + " type `" + U + "." + W + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + A + "`."
      );
    }
    function J(O) {
      function _(U, W, A, L, D) {
        var B = U[W], I = k(B);
        if (I !== "object")
          return new m("Invalid " + L + " `" + D + "` of type `" + I + "` " + ("supplied to `" + A + "`, expected `object`."));
        for (var j in O) {
          var Y = O[j];
          if (typeof Y != "function")
            return F(A, L, D, j, q(Y));
          var Q = Y(B, j, A, L, D + "." + j, r);
          if (Q)
            return Q;
        }
        return null;
      }
      return v(_);
    }
    function G(O) {
      function _(U, W, A, L, D) {
        var B = U[W], I = k(B);
        if (I !== "object")
          return new m("Invalid " + L + " `" + D + "` of type `" + I + "` " + ("supplied to `" + A + "`, expected `object`."));
        var j = t({}, U[W], O);
        for (var Y in j) {
          var Q = O[Y];
          if (n(O, Y) && typeof Q != "function")
            return F(A, L, D, Y, q(Q));
          if (!Q)
            return new m(
              "Invalid " + L + " `" + D + "` key `" + Y + "` supplied to `" + A + "`.\nBad object: " + JSON.stringify(U[W], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var E = Q(B, Y, A, L, D + "." + Y, r);
          if (E)
            return E;
        }
        return null;
      }
      return v(_);
    }
    function Z(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(Z);
          if (O === null || c(O))
            return !0;
          var _ = d(O);
          if (_) {
            var U = _.call(O), W;
            if (_ !== O.entries) {
              for (; !(W = U.next()).done; )
                if (!Z(W.value))
                  return !1;
            } else
              for (; !(W = U.next()).done; ) {
                var A = W.value;
                if (A && !Z(A[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function z(O, _) {
      return O === "symbol" ? !0 : _ ? _["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && _ instanceof Symbol : !1;
    }
    function k(O) {
      var _ = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : z(_, O) ? "symbol" : _;
    }
    function q(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var _ = k(O);
      if (_ === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return _;
    }
    function H(O) {
      var _ = q(O);
      switch (_) {
        case "array":
        case "object":
          return "an " + _;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + _;
        default:
          return _;
      }
    }
    function ee(O) {
      return !O.constructor || !O.constructor.name ? h : O.constructor.name;
    }
    return y.checkPropTypes = o, y.resetWarningCache = o.resetWarningCache, y.PropTypes = y, y;
  }, On;
}
var Sn, Yo;
function Pa() {
  if (Yo)
    return Sn;
  Yo = 1;
  var e = Yn();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Sn = function() {
    function n(s, c, l, f, u, d) {
      if (d !== e) {
        var h = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw h.name = "Invariant Violation", h;
      }
    }
    n.isRequired = n;
    function o() {
      return n;
    }
    var i = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: o,
      element: n,
      elementType: n,
      instanceOf: o,
      node: n,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, Sn;
}
if (process.env.NODE_ENV !== "production") {
  var _a = es(), Na = !0;
  Nn.exports = $a()(_a.isElement, Na);
} else
  Nn.exports = Pa()();
var Aa = Nn.exports;
const a = /* @__PURE__ */ xa(Aa);
function Ma(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function rs(e, t, r, n, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const l = i.type;
  return typeof l == "function" && !Ma(l) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ns = Yr(a.element, rs);
ns.isRequired = Yr(a.element.isRequired, rs);
const os = ns;
function ka(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ia(e, t, r, n, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof i == "function" && !ka(i) && (c = "Did you accidentally provide a plain function component instead?"), c !== void 0 ? new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ja = Yr(a.elementType, Ia), Da = "exact-prop: ​";
function La(e) {
  return process.env.NODE_ENV === "production" ? e : S({}, e, {
    [Da]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function kt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var An = { exports: {} }, ie = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo;
function Va() {
  if (qo)
    return ie;
  qo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), g;
  g = Symbol.for("react.module.reference");
  function m(v) {
    if (typeof v == "object" && v !== null) {
      var T = v.$$typeof;
      switch (T) {
        case e:
          switch (v = v.type, v) {
            case r:
            case o:
            case n:
            case f:
            case u:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case c:
                case s:
                case l:
                case h:
                case d:
                case i:
                  return v;
                default:
                  return T;
              }
          }
        case t:
          return T;
      }
    }
  }
  return ie.ContextConsumer = s, ie.ContextProvider = i, ie.Element = e, ie.ForwardRef = l, ie.Fragment = r, ie.Lazy = h, ie.Memo = d, ie.Portal = t, ie.Profiler = o, ie.StrictMode = n, ie.Suspense = f, ie.SuspenseList = u, ie.isAsyncMode = function() {
    return !1;
  }, ie.isConcurrentMode = function() {
    return !1;
  }, ie.isContextConsumer = function(v) {
    return m(v) === s;
  }, ie.isContextProvider = function(v) {
    return m(v) === i;
  }, ie.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, ie.isForwardRef = function(v) {
    return m(v) === l;
  }, ie.isFragment = function(v) {
    return m(v) === r;
  }, ie.isLazy = function(v) {
    return m(v) === h;
  }, ie.isMemo = function(v) {
    return m(v) === d;
  }, ie.isPortal = function(v) {
    return m(v) === t;
  }, ie.isProfiler = function(v) {
    return m(v) === o;
  }, ie.isStrictMode = function(v) {
    return m(v) === n;
  }, ie.isSuspense = function(v) {
    return m(v) === f;
  }, ie.isSuspenseList = function(v) {
    return m(v) === u;
  }, ie.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === o || v === n || v === f || v === u || v === y || typeof v == "object" && v !== null && (v.$$typeof === h || v.$$typeof === d || v.$$typeof === i || v.$$typeof === s || v.$$typeof === l || v.$$typeof === g || v.getModuleId !== void 0);
  }, ie.typeOf = m, ie;
}
var se = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Go;
function za() {
  return Go || (Go = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), g = !1, m = !1, v = !1, T = !1, $ = !1, w;
    w = Symbol.for("react.module.reference");
    function b(N) {
      return !!(typeof N == "string" || typeof N == "function" || N === r || N === o || $ || N === n || N === f || N === u || T || N === y || g || m || v || typeof N == "object" && N !== null && (N.$$typeof === h || N.$$typeof === d || N.$$typeof === i || N.$$typeof === s || N.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      N.$$typeof === w || N.getModuleId !== void 0));
    }
    function p(N) {
      if (typeof N == "object" && N !== null) {
        var fe = N.$$typeof;
        switch (fe) {
          case e:
            var Re = N.type;
            switch (Re) {
              case r:
              case o:
              case n:
              case f:
              case u:
                return Re;
              default:
                var Xe = Re && Re.$$typeof;
                switch (Xe) {
                  case c:
                  case s:
                  case l:
                  case h:
                  case d:
                  case i:
                    return Xe;
                  default:
                    return fe;
                }
            }
          case t:
            return fe;
        }
      }
    }
    var C = s, R = i, V = e, M = l, P = r, F = h, J = d, G = t, Z = o, z = n, k = f, q = u, H = !1, ee = !1;
    function O(N) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function _(N) {
      return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(N) {
      return p(N) === s;
    }
    function W(N) {
      return p(N) === i;
    }
    function A(N) {
      return typeof N == "object" && N !== null && N.$$typeof === e;
    }
    function L(N) {
      return p(N) === l;
    }
    function D(N) {
      return p(N) === r;
    }
    function B(N) {
      return p(N) === h;
    }
    function I(N) {
      return p(N) === d;
    }
    function j(N) {
      return p(N) === t;
    }
    function Y(N) {
      return p(N) === o;
    }
    function Q(N) {
      return p(N) === n;
    }
    function E(N) {
      return p(N) === f;
    }
    function de(N) {
      return p(N) === u;
    }
    se.ContextConsumer = C, se.ContextProvider = R, se.Element = V, se.ForwardRef = M, se.Fragment = P, se.Lazy = F, se.Memo = J, se.Portal = G, se.Profiler = Z, se.StrictMode = z, se.Suspense = k, se.SuspenseList = q, se.isAsyncMode = O, se.isConcurrentMode = _, se.isContextConsumer = U, se.isContextProvider = W, se.isElement = A, se.isForwardRef = L, se.isFragment = D, se.isLazy = B, se.isMemo = I, se.isPortal = j, se.isProfiler = Y, se.isStrictMode = Q, se.isSuspense = E, se.isSuspenseList = de, se.isValidElementType = b, se.typeOf = p;
  }()), se;
}
process.env.NODE_ENV === "production" ? An.exports = Va() : An.exports = za();
var Ho = An.exports;
const Ba = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Fa(e) {
  const t = `${e}`.match(Ba);
  return t && t[1] || "";
}
function is(e, t = "") {
  return e.displayName || e.name || Fa(e) || t;
}
function Ko(e, t, r) {
  const n = is(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function Wa(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return is(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ho.ForwardRef:
          return Ko(e, e.render, "ForwardRef");
        case Ho.Memo:
          return Ko(e, e.type, "memo");
        default:
          return;
      }
  }
}
function cr(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const Ua = a.oneOfType([a.func, a.object]), qn = Ua;
function ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : kt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ya(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function qa(e, t = 166) {
  let r;
  function n(...o) {
    const i = () => {
      e.apply(this, o);
    };
    clearTimeout(r), r = setTimeout(i, t);
  }
  return n.clear = () => {
    clearTimeout(r);
  }, n;
}
function Ga(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, i, s) => {
    const c = o || "<<anonymous>>", l = s || n;
    return typeof r[n] < "u" ? new Error(`The ${i} \`${l}\` of \`${c}\` is deprecated. ${t}`) : null;
  };
}
function Ha(e, t) {
  return /* @__PURE__ */ x.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function jr(e) {
  return e && e.ownerDocument || document;
}
function Ka(e) {
  return jr(e).defaultView || window;
}
function ss(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? S({}, t.propTypes) : null;
  return (o) => (i, s, c, l, f, ...u) => {
    const d = f || s, h = r?.[d];
    if (h) {
      const y = h(i, s, c, l, f, ...u);
      if (y)
        return y;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${d}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Dr(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Xa = typeof window < "u" ? x.useLayoutEffect : x.useEffect, It = Xa;
let Xo = 0;
function Ja(e) {
  const [t, r] = x.useState(e), n = e || t;
  return x.useEffect(() => {
    t == null && (Xo += 1, r(`mui-${Xo}`));
  }, [t]), n;
}
const Jo = x["useId".toString()];
function as(e) {
  if (Jo !== void 0) {
    const t = Jo();
    return e ?? t;
  }
  return Ja(e);
}
function Za(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function cs({
  controlled: e,
  default: t,
  name: r,
  state: n = "value"
}) {
  const {
    current: o
  } = x.useRef(e !== void 0), [i, s] = x.useState(t), c = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    x.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${r} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, r, e]);
    const {
      current: f
    } = x.useRef(t);
    x.useEffect(() => {
      !o && f !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const l = x.useCallback((f) => {
    o || s(f);
  }, []);
  return [c, l];
}
function $t(e) {
  const t = x.useRef(e);
  return It(() => {
    t.current = e;
  }), x.useCallback((...r) => (
    // @ts-expect-error hide `this`
    // tslint:disable-next-line:ban-comma-operator
    (0, t.current)(...r)
  ), []);
}
function et(...e) {
  return x.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      Dr(r, t);
    });
  }, e);
}
let qr = !0, Mn = !1, Zo;
const Qa = {
  text: !0,
  search: !0,
  url: !0,
  tel: !0,
  email: !0,
  password: !0,
  number: !0,
  date: !0,
  month: !0,
  week: !0,
  time: !0,
  datetime: !0,
  "datetime-local": !0
};
function ec(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && Qa[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function tc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (qr = !0);
}
function Cn() {
  qr = !1;
}
function rc() {
  this.visibilityState === "hidden" && Mn && (qr = !0);
}
function nc(e) {
  e.addEventListener("keydown", tc, !0), e.addEventListener("mousedown", Cn, !0), e.addEventListener("pointerdown", Cn, !0), e.addEventListener("touchstart", Cn, !0), e.addEventListener("visibilitychange", rc, !0);
}
function oc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return qr || ec(t);
}
function Gn() {
  const e = x.useCallback((o) => {
    o != null && nc(o.ownerDocument);
  }, []), t = x.useRef(!1);
  function r() {
    return t.current ? (Mn = !0, window.clearTimeout(Zo), Zo = window.setTimeout(() => {
      Mn = !1;
    }, 100), t.current = !1, !0) : !1;
  }
  function n(o) {
    return oc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function Hn(e, t) {
  const r = S({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = S({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, i = t[n];
      r[n] = {}, !i || !Object.keys(i) ? r[n] = o : !o || !Object.keys(o) ? r[n] = i : (r[n] = S({}, i), Object.keys(o).forEach((s) => {
        r[n][s] = Hn(o[s], i[s]);
      }));
    } else
      r[n] === void 0 && (r[n] = e[n]);
  }), r;
}
function Ft(e, t, r = void 0) {
  const n = {};
  return Object.keys(e).forEach(
    // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      n[o] = e[o].reduce((i, s) => {
        if (s) {
          const c = t(s);
          c !== "" && i.push(c), r && r[s] && i.push(r[s]);
        }
        return i;
      }, []).join(" ");
    }
  ), n;
}
const Qo = (e) => e, ic = () => {
  let e = Qo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Qo;
    }
  };
}, sc = ic(), ls = sc, ac = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  readOnly: "readOnly",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  required: "required",
  selected: "selected"
};
function at(e, t, r = "Mui") {
  const n = ac[t];
  return n ? `${r}-${n}` : `${ls.generate(e)}-${t}`;
}
function yt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = at(e, o, r);
  }), n;
}
function me(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function us(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (r = us(e[t])) && (n && (n += " "), n += r);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function ge() {
  for (var e, t, r = 0, n = ""; r < arguments.length; )
    (e = arguments[r++]) && (t = us(e)) && (n && (n += " "), n += t);
  return n;
}
function cc(e) {
  return typeof e == "string";
}
function rr(e, t, r) {
  return e === void 0 || cc(e) ? t : S({}, t, {
    ownerState: S({}, t.ownerState, r)
  });
}
const lc = {
  disableDefaultClasses: !1
}, uc = /* @__PURE__ */ x.createContext(lc);
function fc(e) {
  const {
    disableDefaultClasses: t
  } = x.useContext(uc);
  return (r) => t ? "" : e(r);
}
function pc(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function dc(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ei(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function mc(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const y = ge(o?.className, n?.className, i, r?.className), g = S({}, r?.style, o?.style, n?.style), m = S({}, r, o, n);
    return y.length > 0 && (m.className = y), Object.keys(g).length > 0 && (m.style = g), {
      props: m,
      internalRef: void 0
    };
  }
  const s = pc(S({}, o, n)), c = ei(n), l = ei(o), f = t(s), u = ge(f?.className, r?.className, i, o?.className, n?.className), d = S({}, f?.style, r?.style, o?.style, n?.style), h = S({}, f, r, l, c);
  return u.length > 0 && (h.className = u), Object.keys(d).length > 0 && (h.style = d), {
    props: h,
    internalRef: f.ref
  };
}
const hc = ["elementType", "externalSlotProps", "ownerState"];
function vc(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o
  } = e, i = me(e, hc), s = dc(n, o), {
    props: c,
    internalRef: l
  } = mc(S({}, i, {
    externalSlotProps: s
  })), f = et(l, s?.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return rr(r, S({}, c, {
    ref: f
  }), o);
}
var Oe = "top", Ve = "bottom", ze = "right", Se = "left", Kn = "auto", vr = [Oe, Ve, ze, Se], jt = "start", lr = "end", yc = "clippingParents", fs = "viewport", Xt = "popper", gc = "reference", ti = /* @__PURE__ */ vr.reduce(function(e, t) {
  return e.concat([t + "-" + jt, t + "-" + lr]);
}, []), ps = /* @__PURE__ */ [].concat(vr, [Kn]).reduce(function(e, t) {
  return e.concat([t, t + "-" + jt, t + "-" + lr]);
}, []), bc = "beforeRead", Ec = "read", xc = "afterRead", Tc = "beforeMain", wc = "main", Oc = "afterMain", Sc = "beforeWrite", Cc = "write", Rc = "afterWrite", $c = [bc, Ec, xc, Tc, wc, Oc, Sc, Cc, Rc];
function Ke(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Me(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function ht(e) {
  var t = Me(e).Element;
  return e instanceof t || e instanceof Element;
}
function Le(e) {
  var t = Me(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Xn(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Me(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Pc(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, i = t.elements[r];
    !Le(i) || !Ke(i) || (Object.assign(i.style, n), Object.keys(o).forEach(function(s) {
      var c = o[s];
      c === !1 ? i.removeAttribute(s) : i.setAttribute(s, c === !0 ? "" : c);
    }));
  });
}
function _c(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var o = t.elements[n], i = t.attributes[n] || {}, s = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), c = s.reduce(function(l, f) {
        return l[f] = "", l;
      }, {});
      !Le(o) || !Ke(o) || (Object.assign(o.style, c), Object.keys(i).forEach(function(l) {
        o.removeAttribute(l);
      }));
    });
  };
}
const Nc = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Pc,
  effect: _c,
  requires: ["computeStyles"]
};
function Ge(e) {
  return e.split("-")[0];
}
var mt = Math.max, Lr = Math.min, Dt = Math.round;
function kn() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ds() {
  return !/^((?!chrome|android).)*safari/i.test(kn());
}
function Lt(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, i = 1;
  t && Le(e) && (o = e.offsetWidth > 0 && Dt(n.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Dt(n.height) / e.offsetHeight || 1);
  var s = ht(e) ? Me(e) : window, c = s.visualViewport, l = !ds() && r, f = (n.left + (l && c ? c.offsetLeft : 0)) / o, u = (n.top + (l && c ? c.offsetTop : 0)) / i, d = n.width / o, h = n.height / i;
  return {
    width: d,
    height: h,
    top: u,
    right: f + d,
    bottom: u + h,
    left: f,
    x: f,
    y: u
  };
}
function Jn(e) {
  var t = Lt(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function ms(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Xn(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function tt(e) {
  return Me(e).getComputedStyle(e);
}
function Ac(e) {
  return ["table", "td", "th"].indexOf(Ke(e)) >= 0;
}
function ct(e) {
  return ((ht(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Gr(e) {
  return Ke(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Xn(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ct(e)
  );
}
function ri(e) {
  return !Le(e) || // https://github.com/popperjs/popper-core/issues/837
  tt(e).position === "fixed" ? null : e.offsetParent;
}
function Mc(e) {
  var t = /firefox/i.test(kn()), r = /Trident/i.test(kn());
  if (r && Le(e)) {
    var n = tt(e);
    if (n.position === "fixed")
      return null;
  }
  var o = Gr(e);
  for (Xn(o) && (o = o.host); Le(o) && ["html", "body"].indexOf(Ke(o)) < 0; ) {
    var i = tt(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function yr(e) {
  for (var t = Me(e), r = ri(e); r && Ac(r) && tt(r).position === "static"; )
    r = ri(r);
  return r && (Ke(r) === "html" || Ke(r) === "body" && tt(r).position === "static") ? t : r || Mc(e) || t;
}
function Zn(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function or(e, t, r) {
  return mt(e, Lr(t, r));
}
function kc(e, t, r) {
  var n = or(e, t, r);
  return n > r ? r : n;
}
function hs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function vs(e) {
  return Object.assign({}, hs(), e);
}
function ys(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var Ic = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, vs(typeof t != "number" ? t : ys(t, vr));
};
function jc(e) {
  var t, r = e.state, n = e.name, o = e.options, i = r.elements.arrow, s = r.modifiersData.popperOffsets, c = Ge(r.placement), l = Zn(c), f = [Se, ze].indexOf(c) >= 0, u = f ? "height" : "width";
  if (!(!i || !s)) {
    var d = Ic(o.padding, r), h = Jn(i), y = l === "y" ? Oe : Se, g = l === "y" ? Ve : ze, m = r.rects.reference[u] + r.rects.reference[l] - s[l] - r.rects.popper[u], v = s[l] - r.rects.reference[l], T = yr(i), $ = T ? l === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, w = m / 2 - v / 2, b = d[y], p = $ - h[u] - d[g], C = $ / 2 - h[u] / 2 + w, R = or(b, C, p), V = l;
    r.modifiersData[n] = (t = {}, t[V] = R, t.centerOffset = R - C, t);
  }
}
function Dc(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ms(t.elements.popper, o) && (t.elements.arrow = o));
}
const Lc = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: jc,
  effect: Dc,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Vt(e) {
  return e.split("-")[1];
}
var Vc = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function zc(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Dt(r * o) / o || 0,
    y: Dt(n * o) / o || 0
  };
}
function ni(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, c = e.position, l = e.gpuAcceleration, f = e.adaptive, u = e.roundOffsets, d = e.isFixed, h = s.x, y = h === void 0 ? 0 : h, g = s.y, m = g === void 0 ? 0 : g, v = typeof u == "function" ? u({
    x: y,
    y: m
  }) : {
    x: y,
    y: m
  };
  y = v.x, m = v.y;
  var T = s.hasOwnProperty("x"), $ = s.hasOwnProperty("y"), w = Se, b = Oe, p = window;
  if (f) {
    var C = yr(r), R = "clientHeight", V = "clientWidth";
    if (C === Me(r) && (C = ct(r), tt(C).position !== "static" && c === "absolute" && (R = "scrollHeight", V = "scrollWidth")), C = C, o === Oe || (o === Se || o === ze) && i === lr) {
      b = Ve;
      var M = d && C === p && p.visualViewport ? p.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[R]
      );
      m -= M - n.height, m *= l ? 1 : -1;
    }
    if (o === Se || (o === Oe || o === Ve) && i === lr) {
      w = ze;
      var P = d && C === p && p.visualViewport ? p.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[V]
      );
      y -= P - n.width, y *= l ? 1 : -1;
    }
  }
  var F = Object.assign({
    position: c
  }, f && Vc), J = u === !0 ? zc({
    x: y,
    y: m
  }, Me(r)) : {
    x: y,
    y: m
  };
  if (y = J.x, m = J.y, l) {
    var G;
    return Object.assign({}, F, (G = {}, G[b] = $ ? "0" : "", G[w] = T ? "0" : "", G.transform = (p.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + m + "px)" : "translate3d(" + y + "px, " + m + "px, 0)", G));
  }
  return Object.assign({}, F, (t = {}, t[b] = $ ? m + "px" : "", t[w] = T ? y + "px" : "", t.transform = "", t));
}
function Bc(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, i = r.adaptive, s = i === void 0 ? !0 : i, c = r.roundOffsets, l = c === void 0 ? !0 : c, f = {
    placement: Ge(t.placement),
    variation: Vt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ni(Object.assign({}, f, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ni(Object.assign({}, f, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Fc = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Bc,
  data: {}
};
var Or = {
  passive: !0
};
function Wc(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, i = o === void 0 ? !0 : o, s = n.resize, c = s === void 0 ? !0 : s, l = Me(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && f.forEach(function(u) {
    u.addEventListener("scroll", r.update, Or);
  }), c && l.addEventListener("resize", r.update, Or), function() {
    i && f.forEach(function(u) {
      u.removeEventListener("scroll", r.update, Or);
    }), c && l.removeEventListener("resize", r.update, Or);
  };
}
const Uc = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Wc,
  data: {}
};
var Yc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Nr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Yc[t];
  });
}
var qc = {
  start: "end",
  end: "start"
};
function oi(e) {
  return e.replace(/start|end/g, function(t) {
    return qc[t];
  });
}
function Qn(e) {
  var t = Me(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function eo(e) {
  return Lt(ct(e)).left + Qn(e).scrollLeft;
}
function Gc(e, t) {
  var r = Me(e), n = ct(e), o = r.visualViewport, i = n.clientWidth, s = n.clientHeight, c = 0, l = 0;
  if (o) {
    i = o.width, s = o.height;
    var f = ds();
    (f || !f && t === "fixed") && (c = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: c + eo(e),
    y: l
  };
}
function Hc(e) {
  var t, r = ct(e), n = Qn(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = mt(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = mt(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), c = -n.scrollLeft + eo(e), l = -n.scrollTop;
  return tt(o || r).direction === "rtl" && (c += mt(r.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: c,
    y: l
  };
}
function to(e) {
  var t = tt(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function gs(e) {
  return ["html", "body", "#document"].indexOf(Ke(e)) >= 0 ? e.ownerDocument.body : Le(e) && to(e) ? e : gs(Gr(e));
}
function ir(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = gs(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Me(n), s = o ? [i].concat(i.visualViewport || [], to(n) ? n : []) : n, c = t.concat(s);
  return o ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(ir(Gr(s)))
  );
}
function In(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Kc(e, t) {
  var r = Lt(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ii(e, t, r) {
  return t === fs ? In(Gc(e, r)) : ht(t) ? Kc(t, r) : In(Hc(ct(e)));
}
function Xc(e) {
  var t = ir(Gr(e)), r = ["absolute", "fixed"].indexOf(tt(e).position) >= 0, n = r && Le(e) ? yr(e) : e;
  return ht(n) ? t.filter(function(o) {
    return ht(o) && ms(o, n) && Ke(o) !== "body";
  }) : [];
}
function Jc(e, t, r, n) {
  var o = t === "clippingParents" ? Xc(e) : [].concat(t), i = [].concat(o, [r]), s = i[0], c = i.reduce(function(l, f) {
    var u = ii(e, f, n);
    return l.top = mt(u.top, l.top), l.right = Lr(u.right, l.right), l.bottom = Lr(u.bottom, l.bottom), l.left = mt(u.left, l.left), l;
  }, ii(e, s, n));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function bs(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? Ge(n) : null, i = n ? Vt(n) : null, s = t.x + t.width / 2 - r.width / 2, c = t.y + t.height / 2 - r.height / 2, l;
  switch (o) {
    case Oe:
      l = {
        x: s,
        y: t.y - r.height
      };
      break;
    case Ve:
      l = {
        x: s,
        y: t.y + t.height
      };
      break;
    case ze:
      l = {
        x: t.x + t.width,
        y: c
      };
      break;
    case Se:
      l = {
        x: t.x - r.width,
        y: c
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var f = o ? Zn(o) : null;
  if (f != null) {
    var u = f === "y" ? "height" : "width";
    switch (i) {
      case jt:
        l[f] = l[f] - (t[u] / 2 - r[u] / 2);
        break;
      case lr:
        l[f] = l[f] + (t[u] / 2 - r[u] / 2);
        break;
    }
  }
  return l;
}
function ur(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, i = r.strategy, s = i === void 0 ? e.strategy : i, c = r.boundary, l = c === void 0 ? yc : c, f = r.rootBoundary, u = f === void 0 ? fs : f, d = r.elementContext, h = d === void 0 ? Xt : d, y = r.altBoundary, g = y === void 0 ? !1 : y, m = r.padding, v = m === void 0 ? 0 : m, T = vs(typeof v != "number" ? v : ys(v, vr)), $ = h === Xt ? gc : Xt, w = e.rects.popper, b = e.elements[g ? $ : h], p = Jc(ht(b) ? b : b.contextElement || ct(e.elements.popper), l, u, s), C = Lt(e.elements.reference), R = bs({
    reference: C,
    element: w,
    strategy: "absolute",
    placement: o
  }), V = In(Object.assign({}, w, R)), M = h === Xt ? V : C, P = {
    top: p.top - M.top + T.top,
    bottom: M.bottom - p.bottom + T.bottom,
    left: p.left - M.left + T.left,
    right: M.right - p.right + T.right
  }, F = e.modifiersData.offset;
  if (h === Xt && F) {
    var J = F[o];
    Object.keys(P).forEach(function(G) {
      var Z = [ze, Ve].indexOf(G) >= 0 ? 1 : -1, z = [Oe, Ve].indexOf(G) >= 0 ? "y" : "x";
      P[G] += J[z] * Z;
    });
  }
  return P;
}
function Zc(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, i = r.rootBoundary, s = r.padding, c = r.flipVariations, l = r.allowedAutoPlacements, f = l === void 0 ? ps : l, u = Vt(n), d = u ? c ? ti : ti.filter(function(g) {
    return Vt(g) === u;
  }) : vr, h = d.filter(function(g) {
    return f.indexOf(g) >= 0;
  });
  h.length === 0 && (h = d);
  var y = h.reduce(function(g, m) {
    return g[m] = ur(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ge(m)], g;
  }, {});
  return Object.keys(y).sort(function(g, m) {
    return y[g] - y[m];
  });
}
function Qc(e) {
  if (Ge(e) === Kn)
    return [];
  var t = Nr(e);
  return [oi(e), t, oi(t)];
}
function el(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, i = o === void 0 ? !0 : o, s = r.altAxis, c = s === void 0 ? !0 : s, l = r.fallbackPlacements, f = r.padding, u = r.boundary, d = r.rootBoundary, h = r.altBoundary, y = r.flipVariations, g = y === void 0 ? !0 : y, m = r.allowedAutoPlacements, v = t.options.placement, T = Ge(v), $ = T === v, w = l || ($ || !g ? [Nr(v)] : Qc(v)), b = [v].concat(w).reduce(function(A, L) {
      return A.concat(Ge(L) === Kn ? Zc(t, {
        placement: L,
        boundary: u,
        rootBoundary: d,
        padding: f,
        flipVariations: g,
        allowedAutoPlacements: m
      }) : L);
    }, []), p = t.rects.reference, C = t.rects.popper, R = /* @__PURE__ */ new Map(), V = !0, M = b[0], P = 0; P < b.length; P++) {
      var F = b[P], J = Ge(F), G = Vt(F) === jt, Z = [Oe, Ve].indexOf(J) >= 0, z = Z ? "width" : "height", k = ur(t, {
        placement: F,
        boundary: u,
        rootBoundary: d,
        altBoundary: h,
        padding: f
      }), q = Z ? G ? ze : Se : G ? Ve : Oe;
      p[z] > C[z] && (q = Nr(q));
      var H = Nr(q), ee = [];
      if (i && ee.push(k[J] <= 0), c && ee.push(k[q] <= 0, k[H] <= 0), ee.every(function(A) {
        return A;
      })) {
        M = F, V = !1;
        break;
      }
      R.set(F, ee);
    }
    if (V)
      for (var O = g ? 3 : 1, _ = function(L) {
        var D = b.find(function(B) {
          var I = R.get(B);
          if (I)
            return I.slice(0, L).every(function(j) {
              return j;
            });
        });
        if (D)
          return M = D, "break";
      }, U = O; U > 0; U--) {
        var W = _(U);
        if (W === "break")
          break;
      }
    t.placement !== M && (t.modifiersData[n]._skip = !0, t.placement = M, t.reset = !0);
  }
}
const tl = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: el,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function si(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function ai(e) {
  return [Oe, ze, Ve, Se].some(function(t) {
    return e[t] >= 0;
  });
}
function rl(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = ur(t, {
    elementContext: "reference"
  }), c = ur(t, {
    altBoundary: !0
  }), l = si(s, n), f = si(c, o, i), u = ai(l), d = ai(f);
  t.modifiersData[r] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: f,
    isReferenceHidden: u,
    hasPopperEscaped: d
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": d
  });
}
const nl = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: rl
};
function ol(e, t, r) {
  var n = Ge(e), o = [Se, Oe].indexOf(n) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, s = i[0], c = i[1];
  return s = s || 0, c = (c || 0) * o, [Se, ze].indexOf(n) >= 0 ? {
    x: c,
    y: s
  } : {
    x: s,
    y: c
  };
}
function il(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, i = o === void 0 ? [0, 0] : o, s = ps.reduce(function(u, d) {
    return u[d] = ol(d, t.rects, i), u;
  }, {}), c = s[t.placement], l = c.x, f = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += f), t.modifiersData[n] = s;
}
const sl = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: il
};
function al(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = bs({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const cl = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: al,
  data: {}
};
function ll(e) {
  return e === "x" ? "y" : "x";
}
function ul(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, i = o === void 0 ? !0 : o, s = r.altAxis, c = s === void 0 ? !1 : s, l = r.boundary, f = r.rootBoundary, u = r.altBoundary, d = r.padding, h = r.tether, y = h === void 0 ? !0 : h, g = r.tetherOffset, m = g === void 0 ? 0 : g, v = ur(t, {
    boundary: l,
    rootBoundary: f,
    padding: d,
    altBoundary: u
  }), T = Ge(t.placement), $ = Vt(t.placement), w = !$, b = Zn(T), p = ll(b), C = t.modifiersData.popperOffsets, R = t.rects.reference, V = t.rects.popper, M = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, P = typeof M == "number" ? {
    mainAxis: M,
    altAxis: M
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, M), F = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, J = {
    x: 0,
    y: 0
  };
  if (C) {
    if (i) {
      var G, Z = b === "y" ? Oe : Se, z = b === "y" ? Ve : ze, k = b === "y" ? "height" : "width", q = C[b], H = q + v[Z], ee = q - v[z], O = y ? -V[k] / 2 : 0, _ = $ === jt ? R[k] : V[k], U = $ === jt ? -V[k] : -R[k], W = t.elements.arrow, A = y && W ? Jn(W) : {
        width: 0,
        height: 0
      }, L = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : hs(), D = L[Z], B = L[z], I = or(0, R[k], A[k]), j = w ? R[k] / 2 - O - I - D - P.mainAxis : _ - I - D - P.mainAxis, Y = w ? -R[k] / 2 + O + I + B + P.mainAxis : U + I + B + P.mainAxis, Q = t.elements.arrow && yr(t.elements.arrow), E = Q ? b === "y" ? Q.clientTop || 0 : Q.clientLeft || 0 : 0, de = (G = F?.[b]) != null ? G : 0, N = q + j - de - E, fe = q + Y - de, Re = or(y ? Lr(H, N) : H, q, y ? mt(ee, fe) : ee);
      C[b] = Re, J[b] = Re - q;
    }
    if (c) {
      var Xe, xe = b === "x" ? Oe : Se, bt = b === "x" ? Ve : ze, we = C[p], Ue = p === "y" ? "height" : "width", Je = we + v[xe], nt = we - v[bt], $e = [Oe, Se].indexOf(T) !== -1, Pe = (Xe = F?.[p]) != null ? Xe : 0, ke = $e ? Je : we - R[Ue] - V[Ue] - Pe + P.altAxis, ot = $e ? we + R[Ue] + V[Ue] - Pe - P.altAxis : nt, Et = y && $e ? kc(ke, we, ot) : or(y ? ke : Je, we, y ? ot : nt);
      C[p] = Et, J[p] = Et - we;
    }
    t.modifiersData[n] = J;
  }
}
const fl = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ul,
  requiresIfExists: ["offset"]
};
function pl(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function dl(e) {
  return e === Me(e) || !Le(e) ? Qn(e) : pl(e);
}
function ml(e) {
  var t = e.getBoundingClientRect(), r = Dt(t.width) / e.offsetWidth || 1, n = Dt(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function hl(e, t, r) {
  r === void 0 && (r = !1);
  var n = Le(t), o = Le(t) && ml(t), i = ct(t), s = Lt(e, o, r), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((Ke(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  to(i)) && (c = dl(t)), Le(t) ? (l = Lt(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : i && (l.x = eo(i))), {
    x: s.left + c.scrollLeft - l.x,
    y: s.top + c.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function vl(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    r.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(c) {
      if (!r.has(c)) {
        var l = t.get(c);
        l && o(l);
      }
    }), n.push(i);
  }
  return e.forEach(function(i) {
    r.has(i.name) || o(i);
  }), n;
}
function yl(e) {
  var t = vl(e);
  return $c.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function gl(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function bl(e) {
  var t = e.reduce(function(r, n) {
    var o = r[n.name];
    return r[n.name] = o ? Object.assign({}, o, n, {
      options: Object.assign({}, o.options, n.options),
      data: Object.assign({}, o.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var ci = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function li() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function El(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, i = o === void 0 ? ci : o;
  return function(c, l, f) {
    f === void 0 && (f = i);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ci, i),
      modifiersData: {},
      elements: {
        reference: c,
        popper: l
      },
      attributes: {},
      styles: {}
    }, d = [], h = !1, y = {
      state: u,
      setOptions: function(T) {
        var $ = typeof T == "function" ? T(u.options) : T;
        m(), u.options = Object.assign({}, i, u.options, $), u.scrollParents = {
          reference: ht(c) ? ir(c) : c.contextElement ? ir(c.contextElement) : [],
          popper: ir(l)
        };
        var w = yl(bl([].concat(n, u.options.modifiers)));
        return u.orderedModifiers = w.filter(function(b) {
          return b.enabled;
        }), g(), y.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!h) {
          var T = u.elements, $ = T.reference, w = T.popper;
          if (li($, w)) {
            u.rects = {
              reference: hl($, yr(w), u.options.strategy === "fixed"),
              popper: Jn(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(P) {
              return u.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var b = 0; b < u.orderedModifiers.length; b++) {
              if (u.reset === !0) {
                u.reset = !1, b = -1;
                continue;
              }
              var p = u.orderedModifiers[b], C = p.fn, R = p.options, V = R === void 0 ? {} : R, M = p.name;
              typeof C == "function" && (u = C({
                state: u,
                options: V,
                name: M,
                instance: y
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: gl(function() {
        return new Promise(function(v) {
          y.forceUpdate(), v(u);
        });
      }),
      destroy: function() {
        m(), h = !0;
      }
    };
    if (!li(c, l))
      return y;
    y.setOptions(f).then(function(v) {
      !h && f.onFirstUpdate && f.onFirstUpdate(v);
    });
    function g() {
      u.orderedModifiers.forEach(function(v) {
        var T = v.name, $ = v.options, w = $ === void 0 ? {} : $, b = v.effect;
        if (typeof b == "function") {
          var p = b({
            state: u,
            name: T,
            instance: y,
            options: w
          }), C = function() {
          };
          d.push(p || C);
        }
      });
    }
    function m() {
      d.forEach(function(v) {
        return v();
      }), d = [];
    }
    return y;
  };
}
var xl = [Uc, cl, Fc, Nc, sl, tl, fl, Lc, nl], Tl = /* @__PURE__ */ El({
  defaultModifiers: xl
});
function wl(e) {
  return typeof e == "function" ? e() : e;
}
const Vr = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: i = !1
  } = t, [s, c] = x.useState(null), l = et(/* @__PURE__ */ x.isValidElement(n) ? n.ref : null, r);
  if (It(() => {
    i || c(wl(o) || document.body);
  }, [o, i]), It(() => {
    if (s && !i)
      return Dr(r, s), () => {
        Dr(r, null);
      };
  }, [r, s, i]), i) {
    if (/* @__PURE__ */ x.isValidElement(n)) {
      const f = {
        ref: l
      };
      return /* @__PURE__ */ x.cloneElement(n, f);
    }
    return /* @__PURE__ */ ue(x.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ ue(x.Fragment, {
    children: s && /* @__PURE__ */ Ea.createPortal(n, s)
  });
});
process.env.NODE_ENV !== "production" && (Vr.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The children to render into the `container`.
   */
  children: a.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([cr, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (Vr["propTypes"] = La(Vr.propTypes));
const Ol = Vr;
function Sl(e) {
  return at("MuiPopper", e);
}
yt("MuiPopper", ["root"]);
const Cl = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Rl = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function $l(e, t) {
  if (t === "ltr")
    return e;
  switch (e) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return e;
  }
}
function zr(e) {
  return typeof e == "function" ? e() : e;
}
function Hr(e) {
  return e.nodeType !== void 0;
}
function Pl(e) {
  return !Hr(e);
}
const _l = () => Ft({
  root: ["root"]
}, fc(Sl)), Nl = {}, Al = /* @__PURE__ */ x.forwardRef(function(t, r) {
  var n;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: c,
    modifiers: l,
    open: f,
    placement: u,
    popperOptions: d,
    popperRef: h,
    slotProps: y = {},
    slots: g = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = me(t, Cl), T = x.useRef(null), $ = et(T, r), w = x.useRef(null), b = et(w, h), p = x.useRef(b);
  It(() => {
    p.current = b;
  }, [b]), x.useImperativeHandle(h, () => w.current, []);
  const C = $l(u, s), [R, V] = x.useState(C), [M, P] = x.useState(zr(o));
  x.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), x.useEffect(() => {
    o && P(zr(o));
  }, [o]), It(() => {
    if (!M || !f)
      return;
    const z = (H) => {
      V(H.placement);
    };
    if (process.env.NODE_ENV !== "production" && M && Hr(M) && M.nodeType === 1) {
      const H = M.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && H.top === 0 && H.left === 0 && H.right === 0 && H.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let k = [{
      name: "preventOverflow",
      options: {
        altBoundary: c
      }
    }, {
      name: "flip",
      options: {
        altBoundary: c
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: H
      }) => {
        z(H);
      }
    }];
    l != null && (k = k.concat(l)), d && d.modifiers != null && (k = k.concat(d.modifiers));
    const q = Tl(M, T.current, S({
      placement: C
    }, d, {
      modifiers: k
    }));
    return p.current(q), () => {
      q.destroy(), p.current(null);
    };
  }, [M, c, l, f, d, C]);
  const F = {
    placement: R
  };
  m !== null && (F.TransitionProps = m);
  const J = _l(), G = (n = g.root) != null ? n : "div", Z = vc({
    elementType: G,
    externalSlotProps: y.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: $
    },
    ownerState: t,
    className: J.root
  });
  return /* @__PURE__ */ ue(G, S({}, Z, {
    children: typeof i == "function" ? i(F) : i
  }));
}), Es = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const {
    anchorEl: n,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: c = !1,
    keepMounted: l = !1,
    modifiers: f,
    open: u,
    placement: d = "bottom",
    popperOptions: h = Nl,
    popperRef: y,
    style: g,
    transition: m = !1,
    slotProps: v = {},
    slots: T = {}
  } = t, $ = me(t, Rl), [w, b] = x.useState(!0), p = () => {
    b(!1);
  }, C = () => {
    b(!0);
  };
  if (!l && !u && (!m || w))
    return null;
  let R;
  if (i)
    R = i;
  else if (n) {
    const P = zr(n);
    R = P && Hr(P) ? jr(P).body : jr(null).body;
  }
  const V = !u && l && (!m || w) ? "none" : void 0, M = m ? {
    in: u,
    onEnter: p,
    onExited: C
  } : void 0;
  return /* @__PURE__ */ ue(Ol, {
    disablePortal: c,
    container: R,
    children: /* @__PURE__ */ ue(Al, S({
      anchorEl: n,
      direction: s,
      disablePortal: c,
      modifiers: f,
      ref: r,
      open: m ? !w : u,
      placement: d,
      popperOptions: h,
      popperRef: y,
      slotProps: v,
      slots: T
    }, $, {
      style: S({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: V
      }, g),
      TransitionProps: M,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Es.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: Yr(a.oneOfType([cr, a.object, a.func]), (e) => {
    if (e.open) {
      const t = zr(e.anchorEl);
      if (t && Hr(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Pl(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: a.oneOfType([a.node, a.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([cr, a.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: a.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: a.arrayOf(a.shape({
    data: a.object,
    effect: a.func,
    enabled: a.bool,
    fn: a.func,
    name: a.any,
    options: a.object,
    phase: a.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: a.arrayOf(a.string),
    requiresIfExists: a.arrayOf(a.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: a.shape({
    modifiers: a.array,
    onFirstUpdate: a.func,
    placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: a.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: qn,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: a.bool
});
const Ml = Es;
function xs(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var kl = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, Il = /* @__PURE__ */ xs(
  function(e) {
    return kl.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
function jl(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function Dl(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Ll = /* @__PURE__ */ function() {
  function e(r) {
    var n = this;
    this._insertTag = function(o) {
      var i;
      n.tags.length === 0 ? n.insertionPoint ? i = n.insertionPoint.nextSibling : n.prepend ? i = n.container.firstChild : i = n.before : i = n.tags[n.tags.length - 1].nextSibling, n.container.insertBefore(o, i), n.tags.push(o);
    }, this.isSpeedy = r.speedy === void 0 ? process.env.NODE_ENV === "production" : r.speedy, this.tags = [], this.ctr = 0, this.nonce = r.nonce, this.key = r.key, this.container = r.container, this.prepend = r.prepend, this.insertionPoint = r.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(n) {
    n.forEach(this._insertTag);
  }, t.insert = function(n) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Dl(this));
    var o = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var i = n.charCodeAt(0) === 64 && n.charCodeAt(1) === 105;
      i && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + n + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !i;
    }
    if (this.isSpeedy) {
      var s = jl(o);
      try {
        s.insertRule(n, s.cssRules.length);
      } catch (c) {
        process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(n) && console.error('There was a problem inserting the following rule: "' + n + '"', c);
      }
    } else
      o.appendChild(document.createTextNode(n));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(n) {
      return n.parentNode && n.parentNode.removeChild(n);
    }), this.tags = [], this.ctr = 0, process.env.NODE_ENV !== "production" && (this._alreadyInsertedOrderInsensitiveRule = !1);
  }, e;
}(), Te = "-ms-", Br = "-moz-", te = "-webkit-", ro = "comm", no = "rule", oo = "decl", Vl = "@import", Ts = "@keyframes", zl = "@layer", Bl = Math.abs, Kr = String.fromCharCode, Fl = Object.assign;
function Wl(e, t) {
  return Ee(e, 0) ^ 45 ? (((t << 2 ^ Ee(e, 0)) << 2 ^ Ee(e, 1)) << 2 ^ Ee(e, 2)) << 2 ^ Ee(e, 3) : 0;
}
function ws(e) {
  return e.trim();
}
function Ul(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function re(e, t, r) {
  return e.replace(t, r);
}
function jn(e, t) {
  return e.indexOf(t);
}
function Ee(e, t) {
  return e.charCodeAt(t) | 0;
}
function fr(e, t, r) {
  return e.slice(t, r);
}
function Ye(e) {
  return e.length;
}
function io(e) {
  return e.length;
}
function Sr(e, t) {
  return t.push(e), e;
}
function Yl(e, t) {
  return e.map(t).join("");
}
var Xr = 1, zt = 1, Os = 0, Ce = 0, be = 0, Wt = "";
function Jr(e, t, r, n, o, i, s) {
  return { value: e, root: t, parent: r, type: n, props: o, children: i, line: Xr, column: zt, length: s, return: "" };
}
function Jt(e, t) {
  return Fl(Jr("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function ql() {
  return be;
}
function Gl() {
  return be = Ce > 0 ? Ee(Wt, --Ce) : 0, zt--, be === 10 && (zt = 1, Xr--), be;
}
function Ae() {
  return be = Ce < Os ? Ee(Wt, Ce++) : 0, zt++, be === 10 && (zt = 1, Xr++), be;
}
function He() {
  return Ee(Wt, Ce);
}
function Ar() {
  return Ce;
}
function gr(e, t) {
  return fr(Wt, e, t);
}
function pr(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Ss(e) {
  return Xr = zt = 1, Os = Ye(Wt = e), Ce = 0, [];
}
function Cs(e) {
  return Wt = "", e;
}
function Mr(e) {
  return ws(gr(Ce - 1, Dn(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Hl(e) {
  for (; (be = He()) && be < 33; )
    Ae();
  return pr(e) > 2 || pr(be) > 3 ? "" : " ";
}
function Kl(e, t) {
  for (; --t && Ae() && !(be < 48 || be > 102 || be > 57 && be < 65 || be > 70 && be < 97); )
    ;
  return gr(e, Ar() + (t < 6 && He() == 32 && Ae() == 32));
}
function Dn(e) {
  for (; Ae(); )
    switch (be) {
      case e:
        return Ce;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Dn(be);
        break;
      case 40:
        e === 41 && Dn(e);
        break;
      case 92:
        Ae();
        break;
    }
  return Ce;
}
function Xl(e, t) {
  for (; Ae() && e + be !== 47 + 10; )
    if (e + be === 42 + 42 && He() === 47)
      break;
  return "/*" + gr(t, Ce - 1) + "*" + Kr(e === 47 ? e : Ae());
}
function Jl(e) {
  for (; !pr(He()); )
    Ae();
  return gr(e, Ce);
}
function Zl(e) {
  return Cs(kr("", null, null, null, [""], e = Ss(e), 0, [0], e));
}
function kr(e, t, r, n, o, i, s, c, l) {
  for (var f = 0, u = 0, d = s, h = 0, y = 0, g = 0, m = 1, v = 1, T = 1, $ = 0, w = "", b = o, p = i, C = n, R = w; v; )
    switch (g = $, $ = Ae()) {
      case 40:
        if (g != 108 && Ee(R, d - 1) == 58) {
          jn(R += re(Mr($), "&", "&\f"), "&\f") != -1 && (T = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        R += Mr($);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        R += Hl(g);
        break;
      case 92:
        R += Kl(Ar() - 1, 7);
        continue;
      case 47:
        switch (He()) {
          case 42:
          case 47:
            Sr(Ql(Xl(Ae(), Ar()), t, r), l);
            break;
          default:
            R += "/";
        }
        break;
      case 123 * m:
        c[f++] = Ye(R) * T;
      case 125 * m:
      case 59:
      case 0:
        switch ($) {
          case 0:
          case 125:
            v = 0;
          case 59 + u:
            T == -1 && (R = re(R, /\f/g, "")), y > 0 && Ye(R) - d && Sr(y > 32 ? fi(R + ";", n, r, d - 1) : fi(re(R, " ", "") + ";", n, r, d - 2), l);
            break;
          case 59:
            R += ";";
          default:
            if (Sr(C = ui(R, t, r, f, u, o, c, w, b = [], p = [], d), i), $ === 123)
              if (u === 0)
                kr(R, t, C, C, b, i, d, c, p);
              else
                switch (h === 99 && Ee(R, 3) === 110 ? 100 : h) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    kr(e, C, C, n && Sr(ui(e, C, C, 0, 0, o, c, w, o, b = [], d), p), o, p, d, c, n ? b : p);
                    break;
                  default:
                    kr(R, C, C, C, [""], p, 0, c, p);
                }
        }
        f = u = y = 0, m = T = 1, w = R = "", d = s;
        break;
      case 58:
        d = 1 + Ye(R), y = g;
      default:
        if (m < 1) {
          if ($ == 123)
            --m;
          else if ($ == 125 && m++ == 0 && Gl() == 125)
            continue;
        }
        switch (R += Kr($), $ * m) {
          case 38:
            T = u > 0 ? 1 : (R += "\f", -1);
            break;
          case 44:
            c[f++] = (Ye(R) - 1) * T, T = 1;
            break;
          case 64:
            He() === 45 && (R += Mr(Ae())), h = He(), u = d = Ye(w = R += Jl(Ar())), $++;
            break;
          case 45:
            g === 45 && Ye(R) == 2 && (m = 0);
        }
    }
  return i;
}
function ui(e, t, r, n, o, i, s, c, l, f, u) {
  for (var d = o - 1, h = o === 0 ? i : [""], y = io(h), g = 0, m = 0, v = 0; g < n; ++g)
    for (var T = 0, $ = fr(e, d + 1, d = Bl(m = s[g])), w = e; T < y; ++T)
      (w = ws(m > 0 ? h[T] + " " + $ : re($, /&\f/g, h[T]))) && (l[v++] = w);
  return Jr(e, t, r, o === 0 ? no : c, l, f, u);
}
function Ql(e, t, r) {
  return Jr(e, t, r, ro, Kr(ql()), fr(e, 2, -2), 0);
}
function fi(e, t, r, n) {
  return Jr(e, t, r, oo, fr(e, 0, n), fr(e, n + 1, -1), n);
}
function _t(e, t) {
  for (var r = "", n = io(e), o = 0; o < n; o++)
    r += t(e[o], o, e, t) || "";
  return r;
}
function eu(e, t, r, n) {
  switch (e.type) {
    case zl:
      if (e.children.length)
        break;
    case Vl:
    case oo:
      return e.return = e.return || e.value;
    case ro:
      return "";
    case Ts:
      return e.return = e.value + "{" + _t(e.children, n) + "}";
    case no:
      e.value = e.props.join(",");
  }
  return Ye(r = _t(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function tu(e) {
  var t = io(e);
  return function(r, n, o, i) {
    for (var s = "", c = 0; c < t; c++)
      s += e[c](r, n, o, i) || "";
    return s;
  };
}
function ru(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
var nu = function(t, r, n) {
  for (var o = 0, i = 0; o = i, i = He(), o === 38 && i === 12 && (r[n] = 1), !pr(i); )
    Ae();
  return gr(t, Ce);
}, ou = function(t, r) {
  var n = -1, o = 44;
  do
    switch (pr(o)) {
      case 0:
        o === 38 && He() === 12 && (r[n] = 1), t[n] += nu(Ce - 1, r, n);
        break;
      case 2:
        t[n] += Mr(o);
        break;
      case 4:
        if (o === 44) {
          t[++n] = He() === 58 ? "&\f" : "", r[n] = t[n].length;
          break;
        }
      default:
        t[n] += Kr(o);
    }
  while (o = Ae());
  return t;
}, iu = function(t, r) {
  return Cs(ou(Ss(t), r));
}, pi = /* @__PURE__ */ new WeakMap(), su = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var r = t.value, n = t.parent, o = t.column === n.column && t.line === n.line; n.type !== "rule"; )
      if (n = n.parent, !n)
        return;
    if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !pi.get(n)) && !o) {
      pi.set(t, !0);
      for (var i = [], s = iu(r, i), c = n.props, l = 0, f = 0; l < s.length; l++)
        for (var u = 0; u < c.length; u++, f++)
          t.props[f] = i[l] ? s[l].replace(/&\f/g, c[u]) : c[u] + " " + s[l];
    }
  }
}, au = function(t) {
  if (t.type === "decl") {
    var r = t.value;
    // charcode for l
    r.charCodeAt(0) === 108 && // charcode for b
    r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
}, cu = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", lu = function(t) {
  return t.type === "comm" && t.children.indexOf(cu) > -1;
}, uu = function(t) {
  return function(r, n, o) {
    if (!(r.type !== "rule" || t.compat)) {
      var i = r.value.match(/(:first|:nth|:nth-last)-child/g);
      if (i) {
        for (var s = !!r.parent, c = s ? r.parent.children : (
          // global rule at the root level
          o
        ), l = c.length - 1; l >= 0; l--) {
          var f = c[l];
          if (f.line < r.line)
            break;
          if (f.column < r.column) {
            if (lu(f))
              return;
            break;
          }
        }
        i.forEach(function(u) {
          console.error('The pseudo class "' + u + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + u.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
}, Rs = function(t) {
  return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
}, fu = function(t, r) {
  for (var n = t - 1; n >= 0; n--)
    if (!Rs(r[n]))
      return !0;
  return !1;
}, di = function(t) {
  t.type = "", t.value = "", t.return = "", t.children = "", t.props = "";
}, pu = function(t, r, n) {
  Rs(t) && (t.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), di(t)) : fu(r, n) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), di(t)));
};
function $s(e, t) {
  switch (Wl(e, t)) {
    case 5103:
      return te + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return te + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return te + e + Br + e + Te + e + e;
    case 6828:
    case 4268:
      return te + e + Te + e + e;
    case 6165:
      return te + e + Te + "flex-" + e + e;
    case 5187:
      return te + e + re(e, /(\w+).+(:[^]+)/, te + "box-$1$2" + Te + "flex-$1$2") + e;
    case 5443:
      return te + e + Te + "flex-item-" + re(e, /flex-|-self/, "") + e;
    case 4675:
      return te + e + Te + "flex-line-pack" + re(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return te + e + Te + re(e, "shrink", "negative") + e;
    case 5292:
      return te + e + Te + re(e, "basis", "preferred-size") + e;
    case 6060:
      return te + "box-" + re(e, "-grow", "") + te + e + Te + re(e, "grow", "positive") + e;
    case 4554:
      return te + re(e, /([^-])(transform)/g, "$1" + te + "$2") + e;
    case 6187:
      return re(re(re(e, /(zoom-|grab)/, te + "$1"), /(image-set)/, te + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return re(e, /(image-set\([^]*)/, te + "$1$`$1");
    case 4968:
      return re(re(e, /(.+:)(flex-)?(.*)/, te + "box-pack:$3" + Te + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + te + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return re(e, /(.+)-inline(.+)/, te + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Ye(e) - 1 - t > 6)
        switch (Ee(e, t + 1)) {
          case 109:
            if (Ee(e, t + 4) !== 45)
              break;
          case 102:
            return re(e, /(.+:)(.+)-([^]+)/, "$1" + te + "$2-$3$1" + Br + (Ee(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~jn(e, "stretch") ? $s(re(e, "stretch", "fill-available"), t) + e : e;
        }
      break;
    case 4949:
      if (Ee(e, t + 1) !== 115)
        break;
    case 6444:
      switch (Ee(e, Ye(e) - 3 - (~jn(e, "!important") && 10))) {
        case 107:
          return re(e, ":", ":" + te) + e;
        case 101:
          return re(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + te + (Ee(e, 14) === 45 ? "inline-" : "") + "box$3$1" + te + "$2$3$1" + Te + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (Ee(e, t + 11)) {
        case 114:
          return te + e + Te + re(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return te + e + Te + re(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return te + e + Te + re(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return te + e + Te + e + e;
  }
  return e;
}
var du = function(t, r, n, o) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case oo:
        t.return = $s(t.value, t.length);
        break;
      case Ts:
        return _t([Jt(t, {
          value: re(t.value, "@", "@" + te)
        })], o);
      case no:
        if (t.length)
          return Yl(t.props, function(i) {
            switch (Ul(i, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return _t([Jt(t, {
                  props: [re(i, /:(read-\w+)/, ":" + Br + "$1")]
                })], o);
              case "::placeholder":
                return _t([Jt(t, {
                  props: [re(i, /:(plac\w+)/, ":" + te + "input-$1")]
                }), Jt(t, {
                  props: [re(i, /:(plac\w+)/, ":" + Br + "$1")]
                }), Jt(t, {
                  props: [re(i, /:(plac\w+)/, Te + "input-$1")]
                })], o);
            }
            return "";
          });
    }
}, mu = [du], hu = function(t) {
  var r = t.key;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (r === "css") {
    var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n, function(m) {
      var v = m.getAttribute("data-emotion");
      v.indexOf(" ") !== -1 && (document.head.appendChild(m), m.setAttribute("data-s", ""));
    });
  }
  var o = t.stylisPlugins || mu;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(r))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + r + '" was passed');
  var i = {}, s, c = [];
  s = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(m) {
      for (var v = m.getAttribute("data-emotion").split(" "), T = 1; T < v.length; T++)
        i[v[T]] = !0;
      c.push(m);
    }
  );
  var l, f = [su, au];
  process.env.NODE_ENV !== "production" && f.push(uu({
    get compat() {
      return g.compat;
    }
  }), pu);
  {
    var u, d = [eu, process.env.NODE_ENV !== "production" ? function(m) {
      m.root || (m.return ? u.insert(m.return) : m.value && m.type !== ro && u.insert(m.value + "{}"));
    } : ru(function(m) {
      u.insert(m);
    })], h = tu(f.concat(o, d)), y = function(v) {
      return _t(Zl(v), h);
    };
    l = function(v, T, $, w) {
      u = $, process.env.NODE_ENV !== "production" && T.map !== void 0 && (u = {
        insert: function(p) {
          $.insert(p + T.map);
        }
      }), y(v ? v + "{" + T.styles + "}" : T.styles), w && (g.inserted[T.name] = !0);
    };
  }
  var g = {
    key: r,
    sheet: new Ll({
      key: r,
      container: s,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: i,
    registered: {},
    insert: l
  };
  return g.sheet.hydrate(c), g;
}, Ln = { exports: {} }, ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mi;
function vu() {
  if (mi)
    return ae;
  mi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, g = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function w(p) {
    if (typeof p == "object" && p !== null) {
      var C = p.$$typeof;
      switch (C) {
        case t:
          switch (p = p.type, p) {
            case l:
            case f:
            case n:
            case i:
            case o:
            case d:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case c:
                case u:
                case g:
                case y:
                case s:
                  return p;
                default:
                  return C;
              }
          }
        case r:
          return C;
      }
    }
  }
  function b(p) {
    return w(p) === f;
  }
  return ae.AsyncMode = l, ae.ConcurrentMode = f, ae.ContextConsumer = c, ae.ContextProvider = s, ae.Element = t, ae.ForwardRef = u, ae.Fragment = n, ae.Lazy = g, ae.Memo = y, ae.Portal = r, ae.Profiler = i, ae.StrictMode = o, ae.Suspense = d, ae.isAsyncMode = function(p) {
    return b(p) || w(p) === l;
  }, ae.isConcurrentMode = b, ae.isContextConsumer = function(p) {
    return w(p) === c;
  }, ae.isContextProvider = function(p) {
    return w(p) === s;
  }, ae.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === t;
  }, ae.isForwardRef = function(p) {
    return w(p) === u;
  }, ae.isFragment = function(p) {
    return w(p) === n;
  }, ae.isLazy = function(p) {
    return w(p) === g;
  }, ae.isMemo = function(p) {
    return w(p) === y;
  }, ae.isPortal = function(p) {
    return w(p) === r;
  }, ae.isProfiler = function(p) {
    return w(p) === i;
  }, ae.isStrictMode = function(p) {
    return w(p) === o;
  }, ae.isSuspense = function(p) {
    return w(p) === d;
  }, ae.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === n || p === f || p === i || p === o || p === d || p === h || typeof p == "object" && p !== null && (p.$$typeof === g || p.$$typeof === y || p.$$typeof === s || p.$$typeof === c || p.$$typeof === u || p.$$typeof === v || p.$$typeof === T || p.$$typeof === $ || p.$$typeof === m);
  }, ae.typeOf = w, ae;
}
var ce = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hi;
function yu() {
  return hi || (hi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, g = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function w(E) {
      return typeof E == "string" || typeof E == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      E === n || E === f || E === i || E === o || E === d || E === h || typeof E == "object" && E !== null && (E.$$typeof === g || E.$$typeof === y || E.$$typeof === s || E.$$typeof === c || E.$$typeof === u || E.$$typeof === v || E.$$typeof === T || E.$$typeof === $ || E.$$typeof === m);
    }
    function b(E) {
      if (typeof E == "object" && E !== null) {
        var de = E.$$typeof;
        switch (de) {
          case t:
            var N = E.type;
            switch (N) {
              case l:
              case f:
              case n:
              case i:
              case o:
              case d:
                return N;
              default:
                var fe = N && N.$$typeof;
                switch (fe) {
                  case c:
                  case u:
                  case g:
                  case y:
                  case s:
                    return fe;
                  default:
                    return de;
                }
            }
          case r:
            return de;
        }
      }
    }
    var p = l, C = f, R = c, V = s, M = t, P = u, F = n, J = g, G = y, Z = r, z = i, k = o, q = d, H = !1;
    function ee(E) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(E) || b(E) === l;
    }
    function O(E) {
      return b(E) === f;
    }
    function _(E) {
      return b(E) === c;
    }
    function U(E) {
      return b(E) === s;
    }
    function W(E) {
      return typeof E == "object" && E !== null && E.$$typeof === t;
    }
    function A(E) {
      return b(E) === u;
    }
    function L(E) {
      return b(E) === n;
    }
    function D(E) {
      return b(E) === g;
    }
    function B(E) {
      return b(E) === y;
    }
    function I(E) {
      return b(E) === r;
    }
    function j(E) {
      return b(E) === i;
    }
    function Y(E) {
      return b(E) === o;
    }
    function Q(E) {
      return b(E) === d;
    }
    ce.AsyncMode = p, ce.ConcurrentMode = C, ce.ContextConsumer = R, ce.ContextProvider = V, ce.Element = M, ce.ForwardRef = P, ce.Fragment = F, ce.Lazy = J, ce.Memo = G, ce.Portal = Z, ce.Profiler = z, ce.StrictMode = k, ce.Suspense = q, ce.isAsyncMode = ee, ce.isConcurrentMode = O, ce.isContextConsumer = _, ce.isContextProvider = U, ce.isElement = W, ce.isForwardRef = A, ce.isFragment = L, ce.isLazy = D, ce.isMemo = B, ce.isPortal = I, ce.isProfiler = j, ce.isStrictMode = Y, ce.isSuspense = Q, ce.isValidElementType = w, ce.typeOf = b;
  }()), ce;
}
process.env.NODE_ENV === "production" ? Ln.exports = vu() : Ln.exports = yu();
var gu = Ln.exports, Ps = gu, bu = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, Eu = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, _s = {};
_s[Ps.ForwardRef] = bu;
_s[Ps.Memo] = Eu;
var xu = !0;
function so(e, t, r) {
  var n = "";
  return r.split(" ").forEach(function(o) {
    e[o] !== void 0 ? t.push(e[o] + ";") : n += o + " ";
  }), n;
}
var Zr = function(t, r, n) {
  var o = t.key + "-" + r.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (n === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  xu === !1) && t.registered[o] === void 0 && (t.registered[o] = r.styles);
}, Qr = function(t, r, n) {
  Zr(t, r, n);
  var o = t.key + "-" + r.name;
  if (t.inserted[r.name] === void 0) {
    var i = r;
    do
      t.insert(r === i ? "." + o : "", i, t.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function Tu(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(n) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var wu = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, yi = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, Ou = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", Su = /[A-Z]|^ms/g, Ns = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ao = function(t) {
  return t.charCodeAt(1) === 45;
}, gi = function(t) {
  return t != null && typeof t != "boolean";
}, Rn = /* @__PURE__ */ xs(function(e) {
  return ao(e) ? e : e.replace(Su, "-$&").toLowerCase();
}), Fr = function(t, r) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(Ns, function(n, o, i) {
          return We = {
            name: o,
            styles: i,
            next: We
          }, o;
        });
  }
  return wu[t] !== 1 && !ao(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
if (process.env.NODE_ENV !== "production") {
  var Cu = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, Ru = ["normal", "none", "initial", "inherit", "unset"], $u = Fr, Pu = /^-ms-/, _u = /-(.)/g, bi = {};
  Fr = function(t, r) {
    if (t === "content" && (typeof r != "string" || Ru.indexOf(r) === -1 && !Cu.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")))
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + r + "\"'`");
    var n = $u(t, r);
    return n !== "" && !ao(t) && t.indexOf("-") !== -1 && bi[t] === void 0 && (bi[t] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + t.replace(Pu, "ms-").replace(_u, function(o, i) {
      return i.toUpperCase();
    }) + "?")), n;
  };
}
var As = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function dr(e, t, r) {
  if (r == null)
    return "";
  if (r.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && r.toString() === "NO_COMPONENT_SELECTOR")
      throw new Error(As);
    return r;
  }
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      if (r.anim === 1)
        return We = {
          name: r.name,
          styles: r.styles,
          next: We
        }, r.name;
      if (r.styles !== void 0) {
        var n = r.next;
        if (n !== void 0)
          for (; n !== void 0; )
            We = {
              name: n.name,
              styles: n.styles,
              next: We
            }, n = n.next;
        var o = r.styles + ";";
        return process.env.NODE_ENV !== "production" && r.map !== void 0 && (o += r.map), o;
      }
      return Nu(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var i = We, s = r(e);
        return We = i, dr(e, t, s);
      } else
        process.env.NODE_ENV !== "production" && console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var c = [], l = r.replace(Ns, function(u, d, h) {
          var y = "animation" + c.length;
          return c.push("const " + y + " = keyframes`" + h.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + y + "}";
        });
        c.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(c, ["`" + l + "`"]).join(`
`) + `

You should wrap it with \`css\` like this:

` + ("css`" + l + "`"));
      }
      break;
  }
  if (t == null)
    return r;
  var f = t[r];
  return f !== void 0 ? f : r;
}
function Nu(e, t, r) {
  var n = "";
  if (Array.isArray(r))
    for (var o = 0; o < r.length; o++)
      n += dr(e, t, r[o]) + ";";
  else
    for (var i in r) {
      var s = r[i];
      if (typeof s != "object")
        t != null && t[s] !== void 0 ? n += i + "{" + t[s] + "}" : gi(s) && (n += Rn(i) + ":" + Fr(i, s) + ";");
      else {
        if (i === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production")
          throw new Error(As);
        if (Array.isArray(s) && typeof s[0] == "string" && (t == null || t[s[0]] === void 0))
          for (var c = 0; c < s.length; c++)
            gi(s[c]) && (n += Rn(i) + ":" + Fr(i, s[c]) + ";");
        else {
          var l = dr(e, t, s);
          switch (i) {
            case "animation":
            case "animationName": {
              n += Rn(i) + ":" + l + ";";
              break;
            }
            default:
              process.env.NODE_ENV !== "production" && i === "undefined" && console.error(Ou), n += i + "{" + l + "}";
          }
        }
      }
    }
  return n;
}
var Ei = /label:\s*([^\s;\n{]+)\s*(;|$)/g, Ms;
process.env.NODE_ENV !== "production" && (Ms = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var We, Bt = function(t, r, n) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var o = !0, i = "";
  We = void 0;
  var s = t[0];
  s == null || s.raw === void 0 ? (o = !1, i += dr(n, r, s)) : (process.env.NODE_ENV !== "production" && s[0] === void 0 && console.error(yi), i += s[0]);
  for (var c = 1; c < t.length; c++)
    i += dr(n, r, t[c]), o && (process.env.NODE_ENV !== "production" && s[c] === void 0 && console.error(yi), i += s[c]);
  var l;
  process.env.NODE_ENV !== "production" && (i = i.replace(Ms, function(h) {
    return l = h, "";
  })), Ei.lastIndex = 0;
  for (var f = "", u; (u = Ei.exec(i)) !== null; )
    f += "-" + // $FlowFixMe we know it's not null
    u[1];
  var d = Tu(i) + f;
  return process.env.NODE_ENV !== "production" ? {
    name: d,
    styles: i,
    map: l,
    next: We,
    toString: function() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: d,
    styles: i,
    next: We
  };
}, Au = function(t) {
  return t();
}, ks = x["useInsertionEffect"] ? x["useInsertionEffect"] : !1, co = ks || Au, xi = ks || x.useLayoutEffect, Mu = {}.hasOwnProperty, lo = /* @__PURE__ */ x.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ hu({
    key: "css"
  }) : null
);
process.env.NODE_ENV !== "production" && (lo.displayName = "EmotionCacheContext");
lo.Provider;
var en = function(t) {
  return /* @__PURE__ */ va(function(r, n) {
    var o = ya(lo);
    return t(r, o, n);
  });
}, Ut = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== "production" && (Ut.displayName = "EmotionThemeContext");
var Ti = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", wi = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__", ku = function(t) {
  var r = t.cache, n = t.serialized, o = t.isStringTag;
  return Zr(r, n, o), co(function() {
    return Qr(r, n, o);
  }), null;
}, Iu = /* @__PURE__ */ en(function(e, t, r) {
  var n = e.css;
  typeof n == "string" && t.registered[n] !== void 0 && (n = t.registered[n]);
  var o = e[Ti], i = [n], s = "";
  typeof e.className == "string" ? s = so(t.registered, i, e.className) : e.className != null && (s = e.className + " ");
  var c = Bt(i, void 0, x.useContext(Ut));
  if (process.env.NODE_ENV !== "production" && c.name.indexOf("-") === -1) {
    var l = e[wi];
    l && (c = Bt([c, "label:" + l + ";"]));
  }
  s += t.key + "-" + c.name;
  var f = {};
  for (var u in e)
    Mu.call(e, u) && u !== "css" && u !== Ti && (process.env.NODE_ENV === "production" || u !== wi) && (f[u] = e[u]);
  return f.ref = r, f.className = s, /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(ku, {
    cache: t,
    serialized: c,
    isStringTag: typeof o == "string"
  }), /* @__PURE__ */ x.createElement(o, f));
});
process.env.NODE_ENV !== "production" && (Iu.displayName = "EmotionCssPropInternal");
var ju = {
  name: "@emotion/react",
  version: "11.11.1",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  exports: {
    ".": {
      module: {
        worker: "./dist/emotion-react.worker.esm.js",
        browser: "./dist/emotion-react.browser.esm.js",
        default: "./dist/emotion-react.esm.js"
      },
      import: "./dist/emotion-react.cjs.mjs",
      default: "./dist/emotion-react.cjs.js"
    },
    "./jsx-runtime": {
      module: {
        worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
        browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
        default: "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
      },
      import: "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
      default: "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
    },
    "./_isolated-hnrs": {
      module: {
        worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
        browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
        default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
      },
      import: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
      default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
    },
    "./jsx-dev-runtime": {
      module: {
        worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
        browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
        default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
      },
      import: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
      default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
    },
    "./package.json": "./package.json",
    "./types/css-prop": "./types/css-prop.d.ts",
    "./macro": {
      types: {
        import: "./macro.d.mts",
        default: "./macro.d.ts"
      },
      default: "./macro.js"
    }
  },
  types: "types/index.d.ts",
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/*.d.ts",
    "macro.*"
  ],
  sideEffects: !1,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.18.3",
    "@emotion/babel-plugin": "^11.11.0",
    "@emotion/cache": "^11.11.0",
    "@emotion/serialize": "^1.1.2",
    "@emotion/use-insertion-effect-with-fallbacks": "^1.0.1",
    "@emotion/utils": "^1.2.1",
    "@emotion/weak-memoize": "^0.3.1",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@types/react": {
      optional: !0
    }
  },
  devDependencies: {
    "@definitelytyped/dtslint": "0.0.112",
    "@emotion/css": "11.11.0",
    "@emotion/css-prettifier": "1.1.3",
    "@emotion/server": "11.11.0",
    "@emotion/styled": "11.11.0",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^4.5.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.js",
      "./jsx-runtime.js",
      "./jsx-dev-runtime.js",
      "./_isolated-hnrs.js"
    ],
    umdName: "emotionReact",
    exports: {
      envConditions: [
        "browser",
        "worker"
      ],
      extra: {
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": {
          types: {
            import: "./macro.d.mts",
            default: "./macro.d.ts"
          },
          default: "./macro.js"
        }
      }
    }
  }
}, Oi = !1, Du = /* @__PURE__ */ en(function(e, t) {
  process.env.NODE_ENV !== "production" && !Oi && // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  (e.className || e.css) && (console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"), Oi = !0);
  var r = e.styles, n = Bt([r], void 0, x.useContext(Ut)), o = x.useRef();
  return xi(function() {
    var i = t.key + "-global", s = new t.sheet.constructor({
      key: i,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), c = !1, l = document.querySelector('style[data-emotion="' + i + " " + n.name + '"]');
    return t.sheet.tags.length && (s.before = t.sheet.tags[0]), l !== null && (c = !0, l.setAttribute("data-emotion", i), s.hydrate([l])), o.current = [s, c], function() {
      s.flush();
    };
  }, [t]), xi(function() {
    var i = o.current, s = i[0], c = i[1];
    if (c) {
      i[1] = !1;
      return;
    }
    if (n.next !== void 0 && Qr(t, n.next, !0), s.tags.length) {
      var l = s.tags[s.tags.length - 1].nextElementSibling;
      s.before = l, s.flush();
    }
    t.insert("", n, s, !1);
  }, [t, n.name]), null;
});
process.env.NODE_ENV !== "production" && (Du.displayName = "EmotionGlobal");
function Lu() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return Bt(t);
}
var uo = function() {
  var t = Lu.apply(void 0, arguments), r = "animation-" + t.name;
  return {
    name: r,
    styles: "@keyframes " + r + "{" + t.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}, Vu = function e(t) {
  for (var r = t.length, n = 0, o = ""; n < r; n++) {
    var i = t[n];
    if (i != null) {
      var s = void 0;
      switch (typeof i) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(i))
            s = e(i);
          else {
            process.env.NODE_ENV !== "production" && i.styles !== void 0 && i.name !== void 0 && console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component."), s = "";
            for (var c in i)
              i[c] && c && (s && (s += " "), s += c);
          }
          break;
        }
        default:
          s = i;
      }
      s && (o && (o += " "), o += s);
    }
  }
  return o;
};
function zu(e, t, r) {
  var n = [], o = so(e, n, r);
  return n.length < 2 ? r : o + t(n);
}
var Bu = function(t) {
  var r = t.cache, n = t.serializedArr;
  return co(function() {
    for (var o = 0; o < n.length; o++)
      Qr(r, n[o], !1);
  }), null;
}, Fu = /* @__PURE__ */ en(function(e, t) {
  var r = !1, n = [], o = function() {
    if (r && process.env.NODE_ENV !== "production")
      throw new Error("css can only be used during render");
    for (var f = arguments.length, u = new Array(f), d = 0; d < f; d++)
      u[d] = arguments[d];
    var h = Bt(u, t.registered);
    return n.push(h), Zr(t, h, !1), t.key + "-" + h.name;
  }, i = function() {
    if (r && process.env.NODE_ENV !== "production")
      throw new Error("cx can only be used during render");
    for (var f = arguments.length, u = new Array(f), d = 0; d < f; d++)
      u[d] = arguments[d];
    return zu(t.registered, o, Vu(u));
  }, s = {
    css: o,
    cx: i,
    theme: x.useContext(Ut)
  }, c = e.children(s);
  return r = !0, /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Bu, {
    cache: t,
    serializedArr: n
  }), c);
});
process.env.NODE_ENV !== "production" && (Fu.displayName = "EmotionClassNames");
if (process.env.NODE_ENV !== "production") {
  var Si = !0, Wu = typeof jest < "u" || typeof vi < "u";
  if (Si && !Wu) {
    var Ci = (
      // $FlowIgnore
      typeof globalThis < "u" ? globalThis : Si ? window : global
    ), Ri = "__EMOTION_REACT_" + ju.version.split(".")[0] + "__";
    Ci[Ri] && console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."), Ci[Ri] = !0;
  }
}
var Uu = Il, Yu = function(t) {
  return t !== "theme";
}, $i = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? Uu : Yu;
}, Pi = function(t, r, n) {
  var o;
  if (r) {
    var i = r.shouldForwardProp;
    o = t.__emotion_forwardProp && i ? function(s) {
      return t.__emotion_forwardProp(s) && i(s);
    } : i;
  }
  return typeof o != "function" && n && (o = t.__emotion_forwardProp), o;
}, _i = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, qu = function(t) {
  var r = t.cache, n = t.serialized, o = t.isStringTag;
  return Zr(r, n, o), co(function() {
    return Qr(r, n, o);
  }), null;
}, Gu = function e(t, r) {
  if (process.env.NODE_ENV !== "production" && t === void 0)
    throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
  var n = t.__emotion_real === t, o = n && t.__emotion_base || t, i, s;
  r !== void 0 && (i = r.label, s = r.target);
  var c = Pi(t, r, n), l = c || $i(o), f = !l("as");
  return function() {
    var u = arguments, d = n && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (i !== void 0 && d.push("label:" + i + ";"), u[0] == null || u[0].raw === void 0)
      d.push.apply(d, u);
    else {
      process.env.NODE_ENV !== "production" && u[0][0] === void 0 && console.error(_i), d.push(u[0][0]);
      for (var h = u.length, y = 1; y < h; y++)
        process.env.NODE_ENV !== "production" && u[0][y] === void 0 && console.error(_i), d.push(u[y], u[0][y]);
    }
    var g = en(function(m, v, T) {
      var $ = f && m.as || o, w = "", b = [], p = m;
      if (m.theme == null) {
        p = {};
        for (var C in m)
          p[C] = m[C];
        p.theme = x.useContext(Ut);
      }
      typeof m.className == "string" ? w = so(v.registered, b, m.className) : m.className != null && (w = m.className + " ");
      var R = Bt(d.concat(b), v.registered, p);
      w += v.key + "-" + R.name, s !== void 0 && (w += " " + s);
      var V = f && c === void 0 ? $i($) : l, M = {};
      for (var P in m)
        f && P === "as" || // $FlowFixMe
        V(P) && (M[P] = m[P]);
      return M.className = w, M.ref = T, /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(qu, {
        cache: v,
        serialized: R,
        isStringTag: typeof $ == "string"
      }), /* @__PURE__ */ x.createElement($, M));
    });
    return g.displayName = i !== void 0 ? i : "Styled(" + (typeof o == "string" ? o : o.displayName || o.name || "Component") + ")", g.defaultProps = t.defaultProps, g.__emotion_real = g, g.__emotion_base = o, g.__emotion_styles = d, g.__emotion_forwardProp = c, Object.defineProperty(g, "toString", {
      value: function() {
        return s === void 0 && process.env.NODE_ENV !== "production" ? "NO_COMPONENT_SELECTOR" : "." + s;
      }
    }), g.withComponent = function(m, v) {
      return e(m, S({}, r, v, {
        shouldForwardProp: Pi(g, v, !0)
      })).apply(void 0, d);
    }, g;
  };
}, Hu = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], Vn = Gu.bind();
Hu.forEach(function(e) {
  Vn[e] = Vn(e);
});
/**
 * @mui/styled-engine v5.13.2
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Is(e, t) {
  const r = Vn(e, t);
  return process.env.NODE_ENV !== "production" ? (...n) => {
    const o = typeof e == "string" ? `"${e}"` : "component";
    return n.length === 0 ? console.error([`MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : n.some((i) => i === void 0) && console.error(`MUI: the styled(${o})(...args) API requires all its args to be defined.`), r(...n);
  } : r;
}
const Ku = (e, t) => {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}, Xu = ["values", "unit", "step"], Ju = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => S({}, r, {
    [n.key]: n.val
  }), {});
};
function Zu(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: r = "px",
    step: n = 5
  } = e, o = me(e, Xu), i = Ju(t), s = Object.keys(i);
  function c(h) {
    return `@media (min-width:${typeof t[h] == "number" ? t[h] : h}${r})`;
  }
  function l(h) {
    return `@media (max-width:${(typeof t[h] == "number" ? t[h] : h) - n / 100}${r})`;
  }
  function f(h, y) {
    const g = s.indexOf(y);
    return `@media (min-width:${typeof t[h] == "number" ? t[h] : h}${r}) and (max-width:${(g !== -1 && typeof t[s[g]] == "number" ? t[s[g]] : y) - n / 100}${r})`;
  }
  function u(h) {
    return s.indexOf(h) + 1 < s.length ? f(h, s[s.indexOf(h) + 1]) : c(h);
  }
  function d(h) {
    const y = s.indexOf(h);
    return y === 0 ? c(s[1]) : y === s.length - 1 ? l(s[y]) : f(h, s[s.indexOf(h) + 1]).replace("@media", "@media not all and");
  }
  return S({
    keys: s,
    values: i,
    up: c,
    down: l,
    between: f,
    only: u,
    not: d,
    unit: r
  }, o);
}
const Qu = {
  borderRadius: 4
}, ef = Qu, tf = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, lt = tf;
function sr(e, t) {
  return t ? Qe(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const fo = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, Ni = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${fo[e]}px)`
};
function Be(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const i = n.breakpoints || Ni;
    return t.reduce((s, c, l) => (s[i.up(i.keys[l])] = r(t[l]), s), {});
  }
  if (typeof t == "object") {
    const i = n.breakpoints || Ni;
    return Object.keys(t).reduce((s, c) => {
      if (Object.keys(i.values || fo).indexOf(c) !== -1) {
        const l = i.up(c);
        s[l] = r(t[c], c);
      } else {
        const l = c;
        s[l] = t[l];
      }
      return s;
    }, {});
  }
  return r(t);
}
function rf(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const i = e.up(o);
    return n[i] = {}, n;
  }, {})) || {};
}
function nf(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function of(e, t) {
  if (typeof e != "object")
    return {};
  const r = {}, n = Object.keys(t);
  return Array.isArray(e) ? n.forEach((o, i) => {
    i < e.length && (r[o] = !0);
  }) : n.forEach((o) => {
    e[o] != null && (r[o] = !0);
  }), r;
}
function tn({
  values: e,
  breakpoints: t,
  base: r
}) {
  const n = r || of(e, t), o = Object.keys(n);
  if (o.length === 0)
    return e;
  let i;
  return o.reduce((s, c, l) => (Array.isArray(e) ? (s[c] = e[l] != null ? e[l] : e[i], i = l) : typeof e == "object" ? (s[c] = e[c] != null ? e[c] : e[i], i = c) : s[c] = e, s), {});
}
function rn(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function Wr(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = rn(e, r) || n, t && (o = t(o, n, e)), o;
}
function le(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: n,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const c = s[t], l = s.theme, f = rn(l, n) || {};
    return Be(s, c, (d) => {
      let h = Wr(f, o, d);
      return d === h && typeof d == "string" && (h = Wr(f, o, `${t}${d === "default" ? "" : ye(d)}`, d)), r === !1 ? h : {
        [r]: h
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: lt
  } : {}, i.filterProps = [t], i;
}
function sf(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const af = {
  m: "margin",
  p: "padding"
}, cf = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ai = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, lf = sf((e) => {
  if (e.length > 2)
    if (Ai[e])
      e = Ai[e];
    else
      return [e];
  const [t, r] = e.split(""), n = af[t], o = cf[r] || "";
  return Array.isArray(o) ? o.map((i) => n + i) : [n + o];
}), nn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], on = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], uf = [...nn, ...on];
function br(e, t, r, n) {
  var o;
  const i = (o = rn(e, t, !1)) != null ? o : r;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function js(e) {
  return br(e, "spacing", 8, "spacing");
}
function Er(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function ff(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Er(t, r), n), {});
}
function pf(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = lf(r), i = ff(o, n), s = e[r];
  return Be(e, s, i);
}
function Ds(e, t) {
  const r = js(e.theme);
  return Object.keys(e).map((n) => pf(e, t, n, r)).reduce(sr, {});
}
function he(e) {
  return Ds(e, nn);
}
he.propTypes = process.env.NODE_ENV !== "production" ? nn.reduce((e, t) => (e[t] = lt, e), {}) : {};
he.filterProps = nn;
function ve(e) {
  return Ds(e, on);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? on.reduce((e, t) => (e[t] = lt, e), {}) : {};
ve.filterProps = on;
process.env.NODE_ENV !== "production" && uf.reduce((e, t) => (e[t] = lt, e), {});
function df(e = 8) {
  if (e.mui)
    return e;
  const t = js({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return r.mui = !0, r;
}
function sn(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((i) => {
    n[i] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, i) => t[i] ? sr(o, t[i](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function qe(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
const mf = le({
  prop: "border",
  themeKey: "borders",
  transform: qe
}), hf = le({
  prop: "borderTop",
  themeKey: "borders",
  transform: qe
}), vf = le({
  prop: "borderRight",
  themeKey: "borders",
  transform: qe
}), yf = le({
  prop: "borderBottom",
  themeKey: "borders",
  transform: qe
}), gf = le({
  prop: "borderLeft",
  themeKey: "borders",
  transform: qe
}), bf = le({
  prop: "borderColor",
  themeKey: "palette"
}), Ef = le({
  prop: "borderTopColor",
  themeKey: "palette"
}), xf = le({
  prop: "borderRightColor",
  themeKey: "palette"
}), Tf = le({
  prop: "borderBottomColor",
  themeKey: "palette"
}), wf = le({
  prop: "borderLeftColor",
  themeKey: "palette"
}), an = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = br(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Er(t, n)
    });
    return Be(e, e.borderRadius, r);
  }
  return null;
};
an.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: lt
} : {};
an.filterProps = ["borderRadius"];
sn(mf, hf, vf, yf, gf, bf, Ef, xf, Tf, wf, an);
const cn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = br(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Er(t, n)
    });
    return Be(e, e.gap, r);
  }
  return null;
};
cn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: lt
} : {};
cn.filterProps = ["gap"];
const ln = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = br(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Er(t, n)
    });
    return Be(e, e.columnGap, r);
  }
  return null;
};
ln.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: lt
} : {};
ln.filterProps = ["columnGap"];
const un = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = br(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Er(t, n)
    });
    return Be(e, e.rowGap, r);
  }
  return null;
};
un.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: lt
} : {};
un.filterProps = ["rowGap"];
const Of = le({
  prop: "gridColumn"
}), Sf = le({
  prop: "gridRow"
}), Cf = le({
  prop: "gridAutoFlow"
}), Rf = le({
  prop: "gridAutoColumns"
}), $f = le({
  prop: "gridAutoRows"
}), Pf = le({
  prop: "gridTemplateColumns"
}), _f = le({
  prop: "gridTemplateRows"
}), Nf = le({
  prop: "gridTemplateAreas"
}), Af = le({
  prop: "gridArea"
});
sn(cn, ln, un, Of, Sf, Cf, Rf, $f, Pf, _f, Nf, Af);
function Nt(e, t) {
  return t === "grey" ? t : e;
}
const Mf = le({
  prop: "color",
  themeKey: "palette",
  transform: Nt
}), kf = le({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Nt
}), If = le({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Nt
});
sn(Mf, kf, If);
function Ne(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const jf = le({
  prop: "width",
  transform: Ne
}), po = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o, i;
      return {
        maxWidth: ((n = e.theme) == null || (o = n.breakpoints) == null || (i = o.values) == null ? void 0 : i[r]) || fo[r] || Ne(r)
      };
    };
    return Be(e, e.maxWidth, t);
  }
  return null;
};
po.filterProps = ["maxWidth"];
const Df = le({
  prop: "minWidth",
  transform: Ne
}), Lf = le({
  prop: "height",
  transform: Ne
}), Vf = le({
  prop: "maxHeight",
  transform: Ne
}), zf = le({
  prop: "minHeight",
  transform: Ne
});
le({
  prop: "size",
  cssProperty: "width",
  transform: Ne
});
le({
  prop: "size",
  cssProperty: "height",
  transform: Ne
});
const Bf = le({
  prop: "boxSizing"
});
sn(jf, po, Df, Lf, Vf, zf, Bf);
const Ff = {
  // borders
  border: {
    themeKey: "borders",
    transform: qe
  },
  borderTop: {
    themeKey: "borders",
    transform: qe
  },
  borderRight: {
    themeKey: "borders",
    transform: qe
  },
  borderBottom: {
    themeKey: "borders",
    transform: qe
  },
  borderLeft: {
    themeKey: "borders",
    transform: qe
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: an
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Nt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Nt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Nt
  },
  // spacing
  p: {
    style: ve
  },
  pt: {
    style: ve
  },
  pr: {
    style: ve
  },
  pb: {
    style: ve
  },
  pl: {
    style: ve
  },
  px: {
    style: ve
  },
  py: {
    style: ve
  },
  padding: {
    style: ve
  },
  paddingTop: {
    style: ve
  },
  paddingRight: {
    style: ve
  },
  paddingBottom: {
    style: ve
  },
  paddingLeft: {
    style: ve
  },
  paddingX: {
    style: ve
  },
  paddingY: {
    style: ve
  },
  paddingInline: {
    style: ve
  },
  paddingInlineStart: {
    style: ve
  },
  paddingInlineEnd: {
    style: ve
  },
  paddingBlock: {
    style: ve
  },
  paddingBlockStart: {
    style: ve
  },
  paddingBlockEnd: {
    style: ve
  },
  m: {
    style: he
  },
  mt: {
    style: he
  },
  mr: {
    style: he
  },
  mb: {
    style: he
  },
  ml: {
    style: he
  },
  mx: {
    style: he
  },
  my: {
    style: he
  },
  margin: {
    style: he
  },
  marginTop: {
    style: he
  },
  marginRight: {
    style: he
  },
  marginBottom: {
    style: he
  },
  marginLeft: {
    style: he
  },
  marginX: {
    style: he
  },
  marginY: {
    style: he
  },
  marginInline: {
    style: he
  },
  marginInlineStart: {
    style: he
  },
  marginInlineEnd: {
    style: he
  },
  marginBlock: {
    style: he
  },
  marginBlockStart: {
    style: he
  },
  marginBlockEnd: {
    style: he
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: cn
  },
  rowGap: {
    style: un
  },
  columnGap: {
    style: ln
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: Ne
  },
  maxWidth: {
    style: po
  },
  minWidth: {
    transform: Ne
  },
  height: {
    transform: Ne
  },
  maxHeight: {
    transform: Ne
  },
  minHeight: {
    transform: Ne
  },
  boxSizing: {},
  // typography
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
}, fn = Ff;
function Wf(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function Uf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Yf() {
  function e(r, n, o, i) {
    const s = {
      [r]: n,
      theme: o
    }, c = i[r];
    if (!c)
      return {
        [r]: n
      };
    const {
      cssProperty: l = r,
      themeKey: f,
      transform: u,
      style: d
    } = c;
    if (n == null)
      return null;
    if (f === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const h = rn(o, f) || {};
    return d ? d(s) : Be(s, n, (g) => {
      let m = Wr(h, u, g);
      return g === m && typeof g == "string" && (m = Wr(h, u, `${r}${g === "default" ? "" : ye(g)}`, g)), l === !1 ? m : {
        [l]: m
      };
    });
  }
  function t(r) {
    var n;
    const {
      sx: o,
      theme: i = {}
    } = r || {};
    if (!o)
      return null;
    const s = (n = i.unstable_sxConfig) != null ? n : fn;
    function c(l) {
      let f = l;
      if (typeof l == "function")
        f = l(i);
      else if (typeof l != "object")
        return l;
      if (!f)
        return null;
      const u = rf(i.breakpoints), d = Object.keys(u);
      let h = u;
      return Object.keys(f).forEach((y) => {
        const g = Uf(f[y], i);
        if (g != null)
          if (typeof g == "object")
            if (s[y])
              h = sr(h, e(y, g, i, s));
            else {
              const m = Be({
                theme: i
              }, g, (v) => ({
                [y]: v
              }));
              Wf(m, g) ? h[y] = t({
                sx: g,
                theme: i
              }) : h = sr(h, m);
            }
          else
            h = sr(h, e(y, g, i, s));
      }), nf(d, h);
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return t;
}
const Ls = Yf();
Ls.filterProps = ["sx"];
const pn = Ls, qf = ["breakpoints", "palette", "spacing", "shape"];
function mo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: i = {}
  } = e, s = me(e, qf), c = Zu(r), l = df(o);
  let f = Qe({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: S({
      mode: "light"
    }, n),
    spacing: l,
    shape: S({}, ef, i)
  }, s);
  return f = t.reduce((u, d) => Qe(u, d), f), f.unstable_sxConfig = S({}, fn, s?.unstable_sxConfig), f.unstable_sx = function(d) {
    return pn({
      sx: d,
      theme: this
    });
  }, f;
}
function Gf(e) {
  return Object.keys(e).length === 0;
}
function Vs(e = null) {
  const t = x.useContext(Ut);
  return !t || Gf(t) ? e : t;
}
const Hf = mo();
function ho(e = Hf) {
  return Vs(e);
}
const Kf = ["sx"], Xf = (e) => {
  var t, r;
  const n = {
    systemProps: {},
    otherProps: {}
  }, o = (t = e == null || (r = e.theme) == null ? void 0 : r.unstable_sxConfig) != null ? t : fn;
  return Object.keys(e).forEach((i) => {
    o[i] ? n.systemProps[i] = e[i] : n.otherProps[i] = e[i];
  }), n;
};
function zs(e) {
  const {
    sx: t
  } = e, r = me(e, Kf), {
    systemProps: n,
    otherProps: o
  } = Xf(r);
  let i;
  return Array.isArray(t) ? i = [n, ...t] : typeof t == "function" ? i = (...s) => {
    const c = t(...s);
    return pt(c) ? S({}, n, c) : n;
  } : i = S({}, n, t), S({}, o, {
    sx: i
  });
}
const Jf = ["className", "component"];
function Zf(e = {}) {
  const {
    themeId: t,
    defaultTheme: r,
    defaultClassName: n = "MuiBox-root",
    generateClassName: o
  } = e, i = Is("div", {
    shouldForwardProp: (c) => c !== "theme" && c !== "sx" && c !== "as"
  })(pn);
  return /* @__PURE__ */ x.forwardRef(function(l, f) {
    const u = ho(r), d = zs(l), {
      className: h,
      component: y = "div"
    } = d, g = me(d, Jf);
    return /* @__PURE__ */ ue(i, S({
      as: y,
      ref: f,
      className: ge(h, o ? o(n) : n),
      theme: t && u[t] || u
    }, g));
  });
}
const Bs = Zf();
process.env.NODE_ENV !== "production" && (Bs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: a.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object])
});
const Mi = Bs, Qf = ["variant"];
function ki(e) {
  return e.length === 0;
}
function Fs(e) {
  const {
    variant: t
  } = e, r = me(e, Qf);
  let n = t || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? n += ki(n) ? e[o] : ye(e[o]) : n += `${ki(n) ? o : ye(o)}${ye(e[o].toString())}`;
  }), n;
}
const ep = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function tp(e) {
  return Object.keys(e).length === 0;
}
function rp(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const np = (e, t) => t.components && t.components[e] && t.components[e].styleOverrides ? t.components[e].styleOverrides : null, op = (e, t) => {
  let r = [];
  t && t.components && t.components[e] && t.components[e].variants && (r = t.components[e].variants);
  const n = {};
  return r.forEach((o) => {
    const i = Fs(o.props);
    n[i] = o.style;
  }), n;
}, ip = (e, t, r, n) => {
  var o, i;
  const {
    ownerState: s = {}
  } = e, c = [], l = r == null || (o = r.components) == null || (i = o[n]) == null ? void 0 : i.variants;
  return l && l.forEach((f) => {
    let u = !0;
    Object.keys(f.props).forEach((d) => {
      s[d] !== f.props[d] && e[d] !== f.props[d] && (u = !1);
    }), u && c.push(t[Fs(f.props)]);
  }), c;
};
function Ir(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const sp = mo(), ap = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Zt({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return tp(t) ? e : t[r] || t;
}
function cp(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = sp,
    rootShouldForwardProp: n = Ir,
    slotShouldForwardProp: o = Ir
  } = e, i = (s) => pn(S({}, s, {
    theme: Zt(S({}, s, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, c = {}) => {
    Ku(s, (b) => b.filter((p) => !(p != null && p.__mui_systemSx)));
    const {
      name: l,
      slot: f,
      skipVariantsResolver: u,
      skipSx: d,
      overridesResolver: h
    } = c, y = me(c, ep), g = u !== void 0 ? u : f && f !== "Root" || !1, m = d || !1;
    let v;
    process.env.NODE_ENV !== "production" && l && (v = `${l}-${ap(f || "Root")}`);
    let T = Ir;
    f === "Root" ? T = n : f ? T = o : rp(s) && (T = void 0);
    const $ = Is(s, S({
      shouldForwardProp: T,
      label: v
    }, y)), w = (b, ...p) => {
      const C = p ? p.map((P) => typeof P == "function" && P.__emotion_real !== P ? (F) => P(S({}, F, {
        theme: Zt(S({}, F, {
          defaultTheme: r,
          themeId: t
        }))
      })) : P) : [];
      let R = b;
      l && h && C.push((P) => {
        const F = Zt(S({}, P, {
          defaultTheme: r,
          themeId: t
        })), J = np(l, F);
        if (J) {
          const G = {};
          return Object.entries(J).forEach(([Z, z]) => {
            G[Z] = typeof z == "function" ? z(S({}, P, {
              theme: F
            })) : z;
          }), h(P, G);
        }
        return null;
      }), l && !g && C.push((P) => {
        const F = Zt(S({}, P, {
          defaultTheme: r,
          themeId: t
        }));
        return ip(P, op(l, F), F, l);
      }), m || C.push(i);
      const V = C.length - p.length;
      if (Array.isArray(b) && V > 0) {
        const P = new Array(V).fill("");
        R = [...b, ...P], R.raw = [...b.raw, ...P];
      } else
        typeof b == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        b.__emotion_real !== b && (R = (P) => b(S({}, P, {
          theme: Zt(S({}, P, {
            defaultTheme: r,
            themeId: t
          }))
        })));
      const M = $(R, ...C);
      if (process.env.NODE_ENV !== "production") {
        let P;
        l && (P = `${l}${f || ""}`), P === void 0 && (P = `Styled(${Wa(s)})`), M.displayName = P;
      }
      return s.muiName && (M.muiName = s.muiName), M;
    };
    return $.withConfig && (w.withConfig = $.withConfig), w;
  };
}
function lp(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : Hn(t.components[r].defaultProps, n);
}
function up({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = ho(r);
  return n && (o = o[n] || o), lp({
    theme: o,
    name: t,
    props: e
  });
}
function vo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), Math.min(Math.max(t, e), r);
}
function fp(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function vt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return vt(fp(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : kt(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : kt(10, o));
  } else
    n = n.split(",");
  return n = n.map((i) => parseFloat(i)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function dn(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function pp(e) {
  e = vt(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, i = n * Math.min(o, 1 - o), s = (f, u = (f + r / 30) % 12) => o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let c = "rgb";
  const l = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (c += "a", l.push(t[3])), dn({
    type: c,
    values: l
  });
}
function Ii(e) {
  e = vt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? vt(pp(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function ji(e, t) {
  const r = Ii(e), n = Ii(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function Pt(e, t) {
  return e = vt(e), t = vo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, dn(e);
}
function dp(e, t) {
  if (e = vt(e), t = vo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return dn(e);
}
function mp(e, t) {
  if (e = vt(e), t = vo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return dn(e);
}
function hp(e, t) {
  return S({
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    }
  }, t);
}
const vp = {
  black: "#000",
  white: "#fff"
}, mr = vp, yp = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, gp = yp, bp = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, xt = bp, Ep = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, Tt = Ep, xp = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, Qt = xp, Tp = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, wt = Tp, wp = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, Ot = wp, Op = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
}, St = Op, Sp = ["mode", "contrastThreshold", "tonalOffset"], Di = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: mr.white,
    default: mr.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
}, $n = {
  text: {
    primary: mr.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: mr.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function Li(e, t, r, n) {
  const o = n.light || n, i = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = mp(e.main, o) : t === "dark" && (e.dark = dp(e.main, i)));
}
function Cp(e = "light") {
  return e === "dark" ? {
    main: wt[200],
    light: wt[50],
    dark: wt[400]
  } : {
    main: wt[700],
    light: wt[400],
    dark: wt[800]
  };
}
function Rp(e = "light") {
  return e === "dark" ? {
    main: xt[200],
    light: xt[50],
    dark: xt[400]
  } : {
    main: xt[500],
    light: xt[300],
    dark: xt[700]
  };
}
function $p(e = "light") {
  return e === "dark" ? {
    main: Tt[500],
    light: Tt[300],
    dark: Tt[700]
  } : {
    main: Tt[700],
    light: Tt[400],
    dark: Tt[800]
  };
}
function Pp(e = "light") {
  return e === "dark" ? {
    main: Ot[400],
    light: Ot[300],
    dark: Ot[700]
  } : {
    main: Ot[700],
    light: Ot[500],
    dark: Ot[900]
  };
}
function _p(e = "light") {
  return e === "dark" ? {
    main: St[400],
    light: St[300],
    dark: St[700]
  } : {
    main: St[800],
    light: St[500],
    dark: St[900]
  };
}
function Np(e = "light") {
  return e === "dark" ? {
    main: Qt[400],
    light: Qt[300],
    dark: Qt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Qt[500],
    dark: Qt[900]
  };
}
function Ap(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = me(e, Sp), i = e.primary || Cp(t), s = e.secondary || Rp(t), c = e.error || $p(t), l = e.info || Pp(t), f = e.success || _p(t), u = e.warning || Np(t);
  function d(m) {
    const v = ji(m, $n.text.primary) >= r ? $n.text.primary : Di.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const T = ji(m, v);
      T < 3 && console.error([`MUI: The contrast ratio of ${T}:1 for ${v} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const h = ({
    color: m,
    name: v,
    mainShade: T = 500,
    lightShade: $ = 300,
    darkShade: w = 700
  }) => {
    if (m = S({}, m), !m.main && m[T] && (m.main = m[T]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.` : kt(11, v ? ` (${v})` : "", T));
    if (typeof m.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : kt(12, v ? ` (${v})` : "", JSON.stringify(m.main)));
    return Li(m, "light", $, n), Li(m, "dark", w, n), m.contrastText || (m.contrastText = d(m.main)), m;
  }, y = {
    dark: $n,
    light: Di
  };
  return process.env.NODE_ENV !== "production" && (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Qe(S({
    // A collection of common colors.
    common: S({}, mr),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: h({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: h({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: h({
      color: c,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: h({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: h({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: h({
      color: f,
      name: "success"
    }),
    // The grey colors.
    grey: gp,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: d,
    // Generate a rich color object.
    augmentColor: h,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, y[t]), o);
}
const Mp = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function kp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Vi = {
  textTransform: "uppercase"
}, zi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ip(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = zi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: c = 500,
    fontWeightBold: l = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: f = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: d
  } = r, h = me(r, Mp);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof f != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const y = o / 14, g = d || ((T) => `${T / f * y}rem`), m = (T, $, w, b, p) => S({
    fontFamily: n,
    fontWeight: T,
    fontSize: g($),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, n === zi ? {
    letterSpacing: `${kp(b / $)}em`
  } : {}, p, u), v = {
    h1: m(i, 96, 1.167, -1.5),
    h2: m(i, 60, 1.2, -0.5),
    h3: m(s, 48, 1.167, 0),
    h4: m(s, 34, 1.235, 0.25),
    h5: m(s, 24, 1.334, 0),
    h6: m(c, 20, 1.6, 0.15),
    subtitle1: m(s, 16, 1.75, 0.15),
    subtitle2: m(c, 14, 1.57, 0.1),
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(c, 14, 1.75, 0.4, Vi),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Vi),
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Qe(S({
    htmlFontSize: f,
    pxToRem: g,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: c,
    fontWeightBold: l
  }, v), h, {
    clone: !1
    // No need to clone deep
  });
}
const jp = 0.2, Dp = 0.14, Lp = 0.12;
function pe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${jp})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Dp})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Lp})`].join(",");
}
const Vp = ["none", pe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), pe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), pe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), pe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), pe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), pe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), pe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), pe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), pe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), pe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), pe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), pe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), pe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), pe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), pe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), pe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), pe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), pe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), pe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), pe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), pe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), pe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), pe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), pe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], zp = Vp, Bp = ["duration", "easing", "delay"], Fp = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Wp = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function Bi(e) {
  return `${Math.round(e)}ms`;
}
function Up(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Yp(e) {
  const t = S({}, Fp, e.easing), r = S({}, Wp, e.duration);
  return S({
    getAutoHeightDuration: Up,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = r.standard,
        easing: c = t.easeInOut,
        delay: l = 0
      } = i, f = me(i, Bp);
      if (process.env.NODE_ENV !== "production") {
        const u = (h) => typeof h == "string", d = (h) => !isNaN(parseFloat(h));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !d(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(c) || console.error('MUI: Argument "easing" must be a string.'), !d(l) && !u(l) && console.error('MUI: Argument "delay" must be a number or a string.'), Object.keys(f).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Bi(s)} ${c} ${typeof l == "string" ? l : Bi(l)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const qp = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Gp = qp, Hp = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Kp(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = me(e, Hp);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : kt(18));
  const c = Ap(n), l = mo(e);
  let f = Qe(l, {
    mixins: hp(l.breakpoints, r),
    palette: c,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: zp.slice(),
    typography: Ip(c, i),
    transitions: Yp(o),
    zIndex: S({}, Gp)
  });
  if (f = Qe(f, s), f = t.reduce((u, d) => Qe(u, d), f), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], d = (h, y) => {
      let g;
      for (g in h) {
        const m = h[g];
        if (u.indexOf(g) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = at("", g);
            console.error([`MUI: The \`${y}\` component increases the CSS specificity of the \`${g}\` internal state.`, "You can not override it like this: ", JSON.stringify(h, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          h[g] = {};
        }
      }
    };
    Object.keys(f.components).forEach((h) => {
      const y = f.components[h].styleOverrides;
      y && h.indexOf("Mui") === 0 && d(y, h);
    });
  }
  return f.unstable_sxConfig = S({}, fn, s?.unstable_sxConfig), f.unstable_sx = function(d) {
    return pn({
      sx: d,
      theme: this
    });
  }, f;
}
const Xp = Kp(), yo = Xp, go = "$$material";
function gt({
  props: e,
  name: t
}) {
  return up({
    props: e,
    name: t,
    defaultTheme: yo,
    themeId: go
  });
}
const Ws = (e) => Ir(e) && e !== "classes", Jp = cp({
  themeId: go,
  defaultTheme: yo,
  rootShouldForwardProp: Ws
}), Fe = Jp;
function Zp(e) {
  return at("MuiSvgIcon", e);
}
yt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Qp = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ed = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${ye(t)}`, `fontSize${ye(r)}`]
  };
  return Ft(o, Zp, n);
}, td = Fe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${ye(r.color)}`], t[`fontSize${ye(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n, o, i, s, c, l, f, u, d, h, y, g, m, v, T, $;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: t.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (r = e.transitions) == null || (n = r.create) == null ? void 0 : n.call(r, "fill", {
      duration: (o = e.transitions) == null || (i = o.duration) == null ? void 0 : i.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((s = e.typography) == null || (c = s.pxToRem) == null ? void 0 : c.call(s, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (f = l.pxToRem) == null ? void 0 : f.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (d = u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (h = (y = (e.vars || e).palette) == null || (g = y[t.color]) == null ? void 0 : g.main) != null ? h : {
      action: (m = (e.vars || e).palette) == null || (v = m.action) == null ? void 0 : v.active,
      disabled: (T = (e.vars || e).palette) == null || ($ = T.action) == null ? void 0 : $.disabled,
      inherit: void 0
    }[t.color]
  };
}), bo = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const n = gt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: c = "svg",
    fontSize: l = "medium",
    htmlColor: f,
    inheritViewBox: u = !1,
    titleAccess: d,
    viewBox: h = "0 0 24 24"
  } = n, y = me(n, Qp), g = /* @__PURE__ */ x.isValidElement(o) && o.type === "svg", m = S({}, n, {
    color: s,
    component: c,
    fontSize: l,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: h,
    hasSvgAsChild: g
  }), v = {};
  u || (v.viewBox = h);
  const T = ed(m);
  return /* @__PURE__ */ Mt(td, S({
    as: c,
    className: ge(T.root, i),
    focusable: "false",
    color: f,
    "aria-hidden": d ? void 0 : !0,
    role: d ? "img" : void 0,
    ref: r
  }, v, y, g && o.props, {
    ownerState: m,
    children: [g ? o.props.children : o, d ? /* @__PURE__ */ ue("title", {
      children: d
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (bo.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: a.oneOfType([a.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), a.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: a.oneOfType([a.oneOf(["inherit", "large", "medium", "small"]), a.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: a.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: a.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: a.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: a.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: a.string
});
bo.muiName = "SvgIcon";
const Fi = bo;
function rd(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ ue(Fi, S({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = Fi.muiName, /* @__PURE__ */ x.memo(/* @__PURE__ */ x.forwardRef(r));
}
const nd = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ls.configure(e);
  }
}, od = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: ye,
  createChainedFunction: Ya,
  createSvgIcon: rd,
  debounce: qa,
  deprecatedPropType: Ga,
  isMuiElement: Ha,
  ownerDocument: jr,
  ownerWindow: Ka,
  requirePropFactory: ss,
  setRef: Dr,
  unstable_ClassNameGenerator: nd,
  unstable_useEnhancedEffect: It,
  unstable_useId: as,
  unsupportedProp: Za,
  useControlled: cs,
  useEventCallback: $t,
  useForkRef: et,
  useIsFocusVisible: Gn
}, Symbol.toStringTag, { value: "Module" })), id = /* @__PURE__ */ Ta(od);
var Wi;
function sd() {
  return Wi || (Wi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = id;
  }(bn)), bn;
}
var ad = wa;
Object.defineProperty(Un, "__esModule", {
  value: !0
});
var Us = Un.default = void 0, cd = ad(sd()), ld = ha, ud = (0, cd.default)(/* @__PURE__ */ (0, ld.jsx)("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
Us = Un.default = ud;
function Eo() {
  const e = ho(yo);
  return process.env.NODE_ENV !== "production" && x.useDebugValue(e), e[go] || e;
}
function zn(e, t) {
  return zn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, zn(e, t);
}
function Ys(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, zn(e, t);
}
const Ui = {
  disabled: !1
};
var fd = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
  enter: a.number,
  exit: a.number,
  appear: a.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && a.oneOfType([a.string, a.shape({
  enter: a.string,
  exit: a.string,
  active: a.string
}), a.shape({
  enter: a.string,
  enterDone: a.string,
  enterActive: a.string,
  exit: a.string,
  exitDone: a.string,
  exitActive: a.string
})]);
const Ur = Ze.createContext(null);
var pd = function(t) {
  return t.scrollTop;
}, nr = "unmounted", ut = "exited", ft = "entering", Rt = "entered", Bn = "exiting", rt = /* @__PURE__ */ function(e) {
  Ys(t, e);
  function t(n, o) {
    var i;
    i = e.call(this, n, o) || this;
    var s = o, c = s && !s.isMounting ? n.enter : n.appear, l;
    return i.appearStatus = null, n.in ? c ? (l = ut, i.appearStatus = ft) : l = Rt : n.unmountOnExit || n.mountOnEnter ? l = nr : l = ut, i.state = {
      status: l
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === nr ? {
      status: ut
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== ft && s !== Rt && (i = ft) : (s === ft || s === Rt) && (i = Bn);
    }
    this.updateStatus(!1, i);
  }, r.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, r.getTimeouts = function() {
    var o = this.props.timeout, i, s, c;
    return i = s = c = o, o != null && typeof o != "number" && (i = o.exit, s = o.enter, c = o.appear !== void 0 ? o.appear : s), {
      exit: i,
      enter: s,
      appear: c
    };
  }, r.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === ft) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Tr.findDOMNode(this);
          s && pd(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ut && this.setState({
        status: nr
      });
  }, r.performEnter = function(o) {
    var i = this, s = this.props.enter, c = this.context ? this.context.isMounting : o, l = this.props.nodeRef ? [c] : [Tr.findDOMNode(this), c], f = l[0], u = l[1], d = this.getTimeouts(), h = c ? d.appear : d.enter;
    if (!o && !s || Ui.disabled) {
      this.safeSetState({
        status: Rt
      }, function() {
        i.props.onEntered(f);
      });
      return;
    }
    this.props.onEnter(f, u), this.safeSetState({
      status: ft
    }, function() {
      i.props.onEntering(f, u), i.onTransitionEnd(h, function() {
        i.safeSetState({
          status: Rt
        }, function() {
          i.props.onEntered(f, u);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), c = this.props.nodeRef ? void 0 : Tr.findDOMNode(this);
    if (!i || Ui.disabled) {
      this.safeSetState({
        status: ut
      }, function() {
        o.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: Bn
    }, function() {
      o.props.onExiting(c), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ut
        }, function() {
          o.props.onExited(c);
        });
      });
    });
  }, r.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, r.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, r.setNextCallback = function(o) {
    var i = this, s = !0;
    return this.nextCallback = function(c) {
      s && (s = !1, i.nextCallback = null, o(c));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, r.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Tr.findDOMNode(this), c = o == null && !this.props.addEndListener;
    if (!s || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], f = l[0], u = l[1];
      this.props.addEndListener(f, u);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, r.render = function() {
    var o = this.state.status;
    if (o === nr)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var c = me(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Ze.createElement(Ur.Provider, {
        value: null
      }, typeof s == "function" ? s(o, c) : Ze.cloneElement(Ze.Children.only(s), c))
    );
  }, t;
}(Ze.Component);
rt.contextType = Ur;
rt.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: a.shape({
    current: typeof Element > "u" ? a.any : function(e, t, r, n, o, i) {
      var s = e[t];
      return a.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, r, n, o, i);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: a.oneOfType([a.func.isRequired, a.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: a.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: a.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: a.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: a.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: a.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: a.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(t) {
    var r = fd;
    t.addEndListener || (r = r.isRequired);
    for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      o[i - 1] = arguments[i];
    return r.apply(void 0, [t].concat(o));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: a.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: a.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: a.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: a.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: a.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: a.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: a.func
} : {};
function Ct() {
}
rt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ct,
  onEntering: Ct,
  onEntered: Ct,
  onExit: Ct,
  onExiting: Ct,
  onExited: Ct
};
rt.UNMOUNTED = nr;
rt.EXITED = ut;
rt.ENTERING = ft;
rt.ENTERED = Rt;
rt.EXITING = Bn;
const dd = rt;
function md(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xo(e, t) {
  var r = function(i) {
    return t && Pr(i) ? t(i) : i;
  }, n = /* @__PURE__ */ Object.create(null);
  return e && ga.map(e, function(o) {
    return o;
  }).forEach(function(o) {
    n[o.key] = r(o);
  }), n;
}
function hd(e, t) {
  e = e || {}, t = t || {};
  function r(u) {
    return u in t ? t[u] : e[u];
  }
  var n = /* @__PURE__ */ Object.create(null), o = [];
  for (var i in e)
    i in t ? o.length && (n[i] = o, o = []) : o.push(i);
  var s, c = {};
  for (var l in t) {
    if (n[l])
      for (s = 0; s < n[l].length; s++) {
        var f = n[l][s];
        c[n[l][s]] = r(f);
      }
    c[l] = r(l);
  }
  for (s = 0; s < o.length; s++)
    c[o[s]] = r(o[s]);
  return c;
}
function dt(e, t, r) {
  return r[t] != null ? r[t] : e.props[t];
}
function vd(e, t) {
  return xo(e.children, function(r) {
    return _r(r, {
      onExited: t.bind(null, r),
      in: !0,
      appear: dt(r, "appear", e),
      enter: dt(r, "enter", e),
      exit: dt(r, "exit", e)
    });
  });
}
function yd(e, t, r) {
  var n = xo(e.children), o = hd(t, n);
  return Object.keys(o).forEach(function(i) {
    var s = o[i];
    if (Pr(s)) {
      var c = i in t, l = i in n, f = t[i], u = Pr(f) && !f.props.in;
      l && (!c || u) ? o[i] = _r(s, {
        onExited: r.bind(null, s),
        in: !0,
        exit: dt(s, "exit", e),
        enter: dt(s, "enter", e)
      }) : !l && c && !u ? o[i] = _r(s, {
        in: !1
      }) : l && c && Pr(f) && (o[i] = _r(s, {
        onExited: r.bind(null, s),
        in: f.props.in,
        exit: dt(s, "exit", e),
        enter: dt(s, "enter", e)
      }));
    }
  }), o;
}
var gd = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, bd = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, To = /* @__PURE__ */ function(e) {
  Ys(t, e);
  function t(n, o) {
    var i;
    i = e.call(this, n, o) || this;
    var s = i.handleExited.bind(md(i));
    return i.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: s,
      firstRender: !0
    }, i;
  }
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, r.componentWillUnmount = function() {
    this.mounted = !1;
  }, t.getDerivedStateFromProps = function(o, i) {
    var s = i.children, c = i.handleExited, l = i.firstRender;
    return {
      children: l ? vd(o, c) : yd(o, s, c),
      firstRender: !1
    };
  }, r.handleExited = function(o, i) {
    var s = xo(this.props.children);
    o.key in s || (o.props.onExited && o.props.onExited(i), this.mounted && this.setState(function(c) {
      var l = S({}, c.children);
      return delete l[o.key], {
        children: l
      };
    }));
  }, r.render = function() {
    var o = this.props, i = o.component, s = o.childFactory, c = me(o, ["component", "childFactory"]), l = this.state.contextValue, f = gd(this.state.children).map(s);
    return delete c.appear, delete c.enter, delete c.exit, i === null ? /* @__PURE__ */ Ze.createElement(Ur.Provider, {
      value: l
    }, f) : /* @__PURE__ */ Ze.createElement(Ur.Provider, {
      value: l
    }, /* @__PURE__ */ Ze.createElement(i, c, f));
  }, t;
}(Ze.Component);
To.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: a.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: a.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: a.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: a.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: a.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: a.func
} : {};
To.defaultProps = bd;
const Ed = To, xd = (e) => e.scrollTop;
function Yi(e, t) {
  var r, n;
  const {
    timeout: o,
    easing: i,
    style: s = {}
  } = e;
  return {
    duration: (r = s.transitionDuration) != null ? r : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (n = s.transitionTimingFunction) != null ? n : typeof i == "object" ? i[t.mode] : i,
    delay: s.transitionDelay
  };
}
function qs(e) {
  const {
    className: t,
    classes: r,
    pulsate: n = !1,
    rippleX: o,
    rippleY: i,
    rippleSize: s,
    in: c,
    onExited: l,
    timeout: f
  } = e, [u, d] = x.useState(!1), h = ge(t, r.ripple, r.rippleVisible, n && r.ripplePulsate), y = {
    width: s,
    height: s,
    top: -(s / 2) + i,
    left: -(s / 2) + o
  }, g = ge(r.child, u && r.childLeaving, n && r.childPulsate);
  return !c && !u && d(!0), x.useEffect(() => {
    if (!c && l != null) {
      const m = setTimeout(l, f);
      return () => {
        clearTimeout(m);
      };
    }
  }, [l, c, f]), /* @__PURE__ */ ue("span", {
    className: h,
    style: y,
    children: /* @__PURE__ */ ue("span", {
      className: g
    })
  });
}
process.env.NODE_ENV !== "production" && (qs.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: a.object.isRequired,
  className: a.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: a.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: a.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: a.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: a.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: a.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: a.number,
  /**
   * exit delay
   */
  timeout: a.number.isRequired
});
const Td = yt("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), De = Td, wd = ["center", "classes", "className"];
let mn = (e) => e, qi, Gi, Hi, Ki;
const Fn = 550, Od = 80, Sd = uo(qi || (qi = mn`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)), Cd = uo(Gi || (Gi = mn`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)), Rd = uo(Hi || (Hi = mn`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)), $d = Fe("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), Pd = Fe(qs, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(Ki || (Ki = mn`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), De.rippleVisible, Sd, Fn, ({
  theme: e
}) => e.transitions.easing.easeInOut, De.ripplePulsate, ({
  theme: e
}) => e.transitions.duration.shorter, De.child, De.childLeaving, Cd, Fn, ({
  theme: e
}) => e.transitions.easing.easeInOut, De.childPulsate, Rd, ({
  theme: e
}) => e.transitions.easing.easeInOut), Gs = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const n = gt({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: o = !1,
    classes: i = {},
    className: s
  } = n, c = me(n, wd), [l, f] = x.useState([]), u = x.useRef(0), d = x.useRef(null);
  x.useEffect(() => {
    d.current && (d.current(), d.current = null);
  }, [l]);
  const h = x.useRef(!1), y = x.useRef(0), g = x.useRef(null), m = x.useRef(null);
  x.useEffect(() => () => {
    y.current && clearTimeout(y.current);
  }, []);
  const v = x.useCallback((b) => {
    const {
      pulsate: p,
      rippleX: C,
      rippleY: R,
      rippleSize: V,
      cb: M
    } = b;
    f((P) => [...P, /* @__PURE__ */ ue(Pd, {
      classes: {
        ripple: ge(i.ripple, De.ripple),
        rippleVisible: ge(i.rippleVisible, De.rippleVisible),
        ripplePulsate: ge(i.ripplePulsate, De.ripplePulsate),
        child: ge(i.child, De.child),
        childLeaving: ge(i.childLeaving, De.childLeaving),
        childPulsate: ge(i.childPulsate, De.childPulsate)
      },
      timeout: Fn,
      pulsate: p,
      rippleX: C,
      rippleY: R,
      rippleSize: V
    }, u.current)]), u.current += 1, d.current = M;
  }, [i]), T = x.useCallback((b = {}, p = {}, C = () => {
  }) => {
    const {
      pulsate: R = !1,
      center: V = o || p.pulsate,
      fakeElement: M = !1
      // For test purposes
    } = p;
    if (b?.type === "mousedown" && h.current) {
      h.current = !1;
      return;
    }
    b?.type === "touchstart" && (h.current = !0);
    const P = M ? null : m.current, F = P ? P.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let J, G, Z;
    if (V || b === void 0 || b.clientX === 0 && b.clientY === 0 || !b.clientX && !b.touches)
      J = Math.round(F.width / 2), G = Math.round(F.height / 2);
    else {
      const {
        clientX: z,
        clientY: k
      } = b.touches && b.touches.length > 0 ? b.touches[0] : b;
      J = Math.round(z - F.left), G = Math.round(k - F.top);
    }
    if (V)
      Z = Math.sqrt((2 * F.width ** 2 + F.height ** 2) / 3), Z % 2 === 0 && (Z += 1);
    else {
      const z = Math.max(Math.abs((P ? P.clientWidth : 0) - J), J) * 2 + 2, k = Math.max(Math.abs((P ? P.clientHeight : 0) - G), G) * 2 + 2;
      Z = Math.sqrt(z ** 2 + k ** 2);
    }
    b != null && b.touches ? g.current === null && (g.current = () => {
      v({
        pulsate: R,
        rippleX: J,
        rippleY: G,
        rippleSize: Z,
        cb: C
      });
    }, y.current = setTimeout(() => {
      g.current && (g.current(), g.current = null);
    }, Od)) : v({
      pulsate: R,
      rippleX: J,
      rippleY: G,
      rippleSize: Z,
      cb: C
    });
  }, [o, v]), $ = x.useCallback(() => {
    T({}, {
      pulsate: !0
    });
  }, [T]), w = x.useCallback((b, p) => {
    if (clearTimeout(y.current), b?.type === "touchend" && g.current) {
      g.current(), g.current = null, y.current = setTimeout(() => {
        w(b, p);
      });
      return;
    }
    g.current = null, f((C) => C.length > 0 ? C.slice(1) : C), d.current = p;
  }, []);
  return x.useImperativeHandle(r, () => ({
    pulsate: $,
    start: T,
    stop: w
  }), [$, T, w]), /* @__PURE__ */ ue($d, S({
    className: ge(De.root, i.root, s),
    ref: m
  }, c, {
    children: /* @__PURE__ */ ue(Ed, {
      component: null,
      exit: !0,
      children: l
    })
  }));
});
process.env.NODE_ENV !== "production" && (Gs.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: a.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string
});
const _d = Gs;
function Nd(e) {
  return at("MuiButtonBase", e);
}
const Ad = yt("MuiButtonBase", ["root", "disabled", "focusVisible"]), Md = Ad, kd = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"], Id = (e) => {
  const {
    disabled: t,
    focusVisible: r,
    focusVisibleClassName: n,
    classes: o
  } = e, s = Ft({
    root: ["root", t && "disabled", r && "focusVisible"]
  }, Nd, o);
  return r && n && (s.root += ` ${n}`), s;
}, jd = Fe("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${Md.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), Hs = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const n = gt({
    props: t,
    name: "MuiButtonBase"
  }), {
    action: o,
    centerRipple: i = !1,
    children: s,
    className: c,
    component: l = "button",
    disabled: f = !1,
    disableRipple: u = !1,
    disableTouchRipple: d = !1,
    focusRipple: h = !1,
    LinkComponent: y = "a",
    onBlur: g,
    onClick: m,
    onContextMenu: v,
    onDragLeave: T,
    onFocus: $,
    onFocusVisible: w,
    onKeyDown: b,
    onKeyUp: p,
    onMouseDown: C,
    onMouseLeave: R,
    onMouseUp: V,
    onTouchEnd: M,
    onTouchMove: P,
    onTouchStart: F,
    tabIndex: J = 0,
    TouchRippleProps: G,
    touchRippleRef: Z,
    type: z
  } = n, k = me(n, kd), q = x.useRef(null), H = x.useRef(null), ee = et(H, Z), {
    isFocusVisibleRef: O,
    onFocus: _,
    onBlur: U,
    ref: W
  } = Gn(), [A, L] = x.useState(!1);
  f && A && L(!1), x.useImperativeHandle(o, () => ({
    focusVisible: () => {
      L(!0), q.current.focus();
    }
  }), []);
  const [D, B] = x.useState(!1);
  x.useEffect(() => {
    B(!0);
  }, []);
  const I = D && !u && !f;
  x.useEffect(() => {
    A && h && !u && D && H.current.pulsate();
  }, [u, h, A, D]);
  function j(K, Ie, Yt = d) {
    return $t((it) => (Ie && Ie(it), !Yt && H.current && H.current[K](it), !0));
  }
  const Y = j("start", C), Q = j("stop", v), E = j("stop", T), de = j("stop", V), N = j("stop", (K) => {
    A && K.preventDefault(), R && R(K);
  }), fe = j("start", F), Re = j("stop", M), Xe = j("stop", P), xe = j("stop", (K) => {
    U(K), O.current === !1 && L(!1), g && g(K);
  }, !1), bt = $t((K) => {
    q.current || (q.current = K.currentTarget), _(K), O.current === !0 && (L(!0), w && w(K)), $ && $(K);
  }), we = () => {
    const K = q.current;
    return l && l !== "button" && !(K.tagName === "A" && K.href);
  }, Ue = x.useRef(!1), Je = $t((K) => {
    h && !Ue.current && A && H.current && K.key === " " && (Ue.current = !0, H.current.stop(K, () => {
      H.current.start(K);
    })), K.target === K.currentTarget && we() && K.key === " " && K.preventDefault(), b && b(K), K.target === K.currentTarget && we() && K.key === "Enter" && !f && (K.preventDefault(), m && m(K));
  }), nt = $t((K) => {
    h && K.key === " " && H.current && A && !K.defaultPrevented && (Ue.current = !1, H.current.stop(K, () => {
      H.current.pulsate(K);
    })), p && p(K), m && K.target === K.currentTarget && we() && K.key === " " && !K.defaultPrevented && m(K);
  });
  let $e = l;
  $e === "button" && (k.href || k.to) && ($e = y);
  const Pe = {};
  $e === "button" ? (Pe.type = z === void 0 ? "button" : z, Pe.disabled = f) : (!k.href && !k.to && (Pe.role = "button"), f && (Pe["aria-disabled"] = f));
  const ke = et(r, W, q);
  process.env.NODE_ENV !== "production" && x.useEffect(() => {
    I && !H.current && console.error(["MUI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join(`
`));
  }, [I]);
  const ot = S({}, n, {
    centerRipple: i,
    component: l,
    disabled: f,
    disableRipple: u,
    disableTouchRipple: d,
    focusRipple: h,
    tabIndex: J,
    focusVisible: A
  }), Et = Id(ot);
  return /* @__PURE__ */ Mt(jd, S({
    as: $e,
    className: ge(Et.root, c),
    ownerState: ot,
    onBlur: xe,
    onClick: m,
    onContextMenu: Q,
    onFocus: bt,
    onKeyDown: Je,
    onKeyUp: nt,
    onMouseDown: Y,
    onMouseLeave: N,
    onMouseUp: de,
    onDragLeave: E,
    onTouchEnd: Re,
    onTouchMove: Xe,
    onTouchStart: fe,
    ref: ke,
    tabIndex: f ? -1 : J,
    type: z
  }, Pe, k, {
    children: [s, I ? (
      /* TouchRipple is only needed client-side, x2 boost on the server. */
      /* @__PURE__ */ ue(_d, S({
        ref: ee,
        center: i
      }, G))
    ) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Hs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: qn,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: a.bool,
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: ja,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: a.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: a.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: a.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: a.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: a.string,
  /**
   * @ignore
   */
  href: a.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: a.elementType,
  /**
   * @ignore
   */
  onBlur: a.func,
  /**
   * @ignore
   */
  onClick: a.func,
  /**
   * @ignore
   */
  onContextMenu: a.func,
  /**
   * @ignore
   */
  onDragLeave: a.func,
  /**
   * @ignore
   */
  onFocus: a.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: a.func,
  /**
   * @ignore
   */
  onKeyDown: a.func,
  /**
   * @ignore
   */
  onKeyUp: a.func,
  /**
   * @ignore
   */
  onMouseDown: a.func,
  /**
   * @ignore
   */
  onMouseLeave: a.func,
  /**
   * @ignore
   */
  onMouseUp: a.func,
  /**
   * @ignore
   */
  onTouchEnd: a.func,
  /**
   * @ignore
   */
  onTouchMove: a.func,
  /**
   * @ignore
   */
  onTouchStart: a.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * @default 0
   */
  tabIndex: a.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: a.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: a.oneOfType([a.func, a.shape({
    current: a.shape({
      pulsate: a.func.isRequired,
      start: a.func.isRequired,
      stop: a.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: a.oneOfType([a.oneOf(["button", "reset", "submit"]), a.string])
});
const Dd = Hs, Ld = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Vd = Fe(Ml, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ks = /* @__PURE__ */ x.forwardRef(function(t, r) {
  var n;
  const o = Vs(), i = gt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: c,
    components: l,
    componentsProps: f,
    container: u,
    disablePortal: d,
    keepMounted: h,
    modifiers: y,
    open: g,
    placement: m,
    popperOptions: v,
    popperRef: T,
    transition: $,
    slots: w,
    slotProps: b
  } = i, p = me(i, Ld), C = (n = w?.root) != null ? n : l?.Root, R = S({
    anchorEl: s,
    container: u,
    disablePortal: d,
    keepMounted: h,
    modifiers: y,
    open: g,
    placement: m,
    popperOptions: v,
    popperRef: T,
    transition: $
  }, p);
  return /* @__PURE__ */ ue(Vd, S({
    as: c,
    direction: o?.direction,
    slots: {
      root: C
    },
    slotProps: b ?? f
  }, R, {
    ref: r
  }));
});
process.env.NODE_ENV !== "production" && (Ks.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: a.oneOfType([cr, a.object, a.func]),
  /**
   * Popper render function or node.
   */
  children: a.oneOfType([a.node, a.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: a.shape({
    Root: a.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([cr, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: a.arrayOf(a.shape({
    data: a.object,
    effect: a.func,
    enabled: a.bool,
    fn: a.func,
    name: a.any,
    options: a.object,
    phase: a.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: a.arrayOf(a.string),
    requiresIfExists: a.arrayOf(a.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: a.shape({
    modifiers: a.array,
    onFirstUpdate: a.func,
    placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: a.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: qn,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: a.bool
});
const Xs = Ks;
function zd(e) {
  return at("MuiButton", e);
}
const Bd = yt("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), Cr = Bd, Js = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== "production" && (Js.displayName = "ButtonGroupContext");
const Fd = Js, Wd = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"], Ud = (e) => {
  const {
    color: t,
    disableElevation: r,
    fullWidth: n,
    size: o,
    variant: i,
    classes: s
  } = e, c = {
    root: ["root", i, `${i}${ye(t)}`, `size${ye(o)}`, `${i}Size${ye(o)}`, t === "inherit" && "colorInherit", r && "disableElevation", n && "fullWidth"],
    label: ["label"],
    startIcon: ["startIcon", `iconSize${ye(o)}`],
    endIcon: ["endIcon", `iconSize${ye(o)}`]
  }, l = Ft(c, zd, s);
  return S({}, s, l);
}, Zs = (e) => S({}, e.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, e.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, e.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
}), Yd = Fe(Dd, {
  shouldForwardProp: (e) => Ws(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`${r.variant}${ye(r.color)}`], t[`size${ye(r.size)}`], t[`${r.variant}Size${ye(r.size)}`], r.color === "inherit" && t.colorInherit, r.disableElevation && t.disableElevation, r.fullWidth && t.fullWidth];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n;
  const o = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], i = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
  return S({}, e.typography.button, {
    minWidth: 64,
    padding: "6px 16px",
    borderRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: e.transitions.duration.short
    }),
    "&:hover": S({
      textDecoration: "none",
      backgroundColor: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(e.palette.text.primary, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, t.variant === "text" && t.color !== "inherit" && {
      backgroundColor: e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(e.palette[t.color].main, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, t.variant === "outlined" && t.color !== "inherit" && {
      border: `1px solid ${(e.vars || e).palette[t.color].main}`,
      backgroundColor: e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(e.palette[t.color].main, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, t.variant === "contained" && {
      backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedHoverBg : i,
      boxShadow: (e.vars || e).shadows[4],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: (e.vars || e).shadows[2],
        backgroundColor: (e.vars || e).palette.grey[300]
      }
    }, t.variant === "contained" && t.color !== "inherit" && {
      backgroundColor: (e.vars || e).palette[t.color].dark,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: (e.vars || e).palette[t.color].main
      }
    }),
    "&:active": S({}, t.variant === "contained" && {
      boxShadow: (e.vars || e).shadows[8]
    }),
    [`&.${Cr.focusVisible}`]: S({}, t.variant === "contained" && {
      boxShadow: (e.vars || e).shadows[6]
    }),
    [`&.${Cr.disabled}`]: S({
      color: (e.vars || e).palette.action.disabled
    }, t.variant === "outlined" && {
      border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`
    }, t.variant === "contained" && {
      color: (e.vars || e).palette.action.disabled,
      boxShadow: (e.vars || e).shadows[0],
      backgroundColor: (e.vars || e).palette.action.disabledBackground
    })
  }, t.variant === "text" && {
    padding: "6px 8px"
  }, t.variant === "text" && t.color !== "inherit" && {
    color: (e.vars || e).palette[t.color].main
  }, t.variant === "outlined" && {
    padding: "5px 15px",
    border: "1px solid currentColor"
  }, t.variant === "outlined" && t.color !== "inherit" && {
    color: (e.vars || e).palette[t.color].main,
    border: e.vars ? `1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)` : `1px solid ${Pt(e.palette[t.color].main, 0.5)}`
  }, t.variant === "contained" && {
    color: e.vars ? (
      // this is safe because grey does not change between default light/dark mode
      e.vars.palette.text.primary
    ) : (r = (n = e.palette).getContrastText) == null ? void 0 : r.call(n, e.palette.grey[300]),
    backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedBg : o,
    boxShadow: (e.vars || e).shadows[2]
  }, t.variant === "contained" && t.color !== "inherit" && {
    color: (e.vars || e).palette[t.color].contrastText,
    backgroundColor: (e.vars || e).palette[t.color].main
  }, t.color === "inherit" && {
    color: "inherit",
    borderColor: "currentColor"
  }, t.size === "small" && t.variant === "text" && {
    padding: "4px 5px",
    fontSize: e.typography.pxToRem(13)
  }, t.size === "large" && t.variant === "text" && {
    padding: "8px 11px",
    fontSize: e.typography.pxToRem(15)
  }, t.size === "small" && t.variant === "outlined" && {
    padding: "3px 9px",
    fontSize: e.typography.pxToRem(13)
  }, t.size === "large" && t.variant === "outlined" && {
    padding: "7px 21px",
    fontSize: e.typography.pxToRem(15)
  }, t.size === "small" && t.variant === "contained" && {
    padding: "4px 10px",
    fontSize: e.typography.pxToRem(13)
  }, t.size === "large" && t.variant === "contained" && {
    padding: "8px 22px",
    fontSize: e.typography.pxToRem(15)
  }, t.fullWidth && {
    width: "100%"
  });
}, ({
  ownerState: e
}) => e.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${Cr.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${Cr.disabled}`]: {
    boxShadow: "none"
  }
}), qd = Fe("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.startIcon, t[`iconSize${ye(r.size)}`]];
  }
})(({
  ownerState: e
}) => S({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, e.size === "small" && {
  marginLeft: -2
}, Zs(e))), Gd = Fe("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.endIcon, t[`iconSize${ye(r.size)}`]];
  }
})(({
  ownerState: e
}) => S({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, e.size === "small" && {
  marginRight: -2
}, Zs(e))), Qs = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const n = x.useContext(Fd), o = Hn(n, t), i = gt({
    props: o,
    name: "MuiButton"
  }), {
    children: s,
    color: c = "primary",
    component: l = "button",
    className: f,
    disabled: u = !1,
    disableElevation: d = !1,
    disableFocusRipple: h = !1,
    endIcon: y,
    focusVisibleClassName: g,
    fullWidth: m = !1,
    size: v = "medium",
    startIcon: T,
    type: $,
    variant: w = "text"
  } = i, b = me(i, Wd), p = S({}, i, {
    color: c,
    component: l,
    disabled: u,
    disableElevation: d,
    disableFocusRipple: h,
    fullWidth: m,
    size: v,
    type: $,
    variant: w
  }), C = Ud(p), R = T && /* @__PURE__ */ ue(qd, {
    className: C.startIcon,
    ownerState: p,
    children: T
  }), V = y && /* @__PURE__ */ ue(Gd, {
    className: C.endIcon,
    ownerState: p,
    children: y
  });
  return /* @__PURE__ */ Mt(Yd, S({
    ownerState: p,
    className: ge(n.className, C.root, f),
    component: l,
    disabled: u,
    focusRipple: !h,
    focusVisibleClassName: ge(C.focusVisible, g),
    ref: r,
    type: $
  }, b, {
    classes: C,
    children: [R, s, V]
  }));
});
process.env.NODE_ENV !== "production" && (Qs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: a.oneOfType([a.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), a.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: a.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: a.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: a.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: a.bool,
  /**
   * Element placed after the children.
   */
  endIcon: a.node,
  /**
   * @ignore
   */
  focusVisibleClassName: a.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: a.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: a.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: a.oneOfType([a.oneOf(["small", "medium", "large"]), a.string]),
  /**
   * Element placed before the children.
   */
  startIcon: a.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * @ignore
   */
  type: a.oneOfType([a.oneOf(["button", "reset", "submit"]), a.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: a.oneOfType([a.oneOf(["contained", "outlined", "text"]), a.string])
});
const Hd = Qs, ea = /* @__PURE__ */ x.createContext();
process.env.NODE_ENV !== "production" && (ea.displayName = "GridContext");
const Xi = ea;
function Kd(e) {
  return at("MuiGrid", e);
}
const Xd = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Jd = ["column-reverse", "column", "row-reverse", "row"], Zd = ["nowrap", "wrap-reverse", "wrap"], er = ["auto", !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hr = yt("MuiGrid", [
  "root",
  "container",
  "item",
  "zeroMinWidth",
  // spacings
  ...Xd.map((e) => `spacing-xs-${e}`),
  // direction values
  ...Jd.map((e) => `direction-xs-${e}`),
  // wrap values
  ...Zd.map((e) => `wrap-xs-${e}`),
  // grid sizes for all breakpoints
  ...er.map((e) => `grid-xs-${e}`),
  ...er.map((e) => `grid-sm-${e}`),
  ...er.map((e) => `grid-md-${e}`),
  ...er.map((e) => `grid-lg-${e}`),
  ...er.map((e) => `grid-xl-${e}`)
]), Qd = ["className", "columns", "columnSpacing", "component", "container", "direction", "item", "rowSpacing", "spacing", "wrap", "zeroMinWidth"];
function At(e) {
  const t = parseFloat(e);
  return `${t}${String(e).replace(String(t), "") || "px"}`;
}
function em({
  theme: e,
  ownerState: t
}) {
  let r;
  return e.breakpoints.keys.reduce((n, o) => {
    let i = {};
    if (t[o] && (r = t[o]), !r)
      return n;
    if (r === !0)
      i = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
    else if (r === "auto")
      i = {
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: "none",
        width: "auto"
      };
    else {
      const s = tn({
        values: t.columns,
        breakpoints: e.breakpoints.values
      }), c = typeof s == "object" ? s[o] : s;
      if (c == null)
        return n;
      const l = `${Math.round(r / c * 1e8) / 1e6}%`;
      let f = {};
      if (t.container && t.item && t.columnSpacing !== 0) {
        const u = e.spacing(t.columnSpacing);
        if (u !== "0px") {
          const d = `calc(${l} + ${At(u)})`;
          f = {
            flexBasis: d,
            maxWidth: d
          };
        }
      }
      i = S({
        flexBasis: l,
        flexGrow: 0,
        maxWidth: l
      }, f);
    }
    return e.breakpoints.values[o] === 0 ? Object.assign(n, i) : n[e.breakpoints.up(o)] = i, n;
  }, {});
}
function tm({
  theme: e,
  ownerState: t
}) {
  const r = tn({
    values: t.direction,
    breakpoints: e.breakpoints.values
  });
  return Be({
    theme: e
  }, r, (n) => {
    const o = {
      flexDirection: n
    };
    return n.indexOf("column") === 0 && (o[`& > .${hr.item}`] = {
      maxWidth: "none"
    }), o;
  });
}
function ta({
  breakpoints: e,
  values: t
}) {
  let r = "";
  Object.keys(t).forEach((o) => {
    r === "" && t[o] !== 0 && (r = o);
  });
  const n = Object.keys(e).sort((o, i) => e[o] - e[i]);
  return n.slice(0, n.indexOf(r));
}
function rm({
  theme: e,
  ownerState: t
}) {
  const {
    container: r,
    rowSpacing: n
  } = t;
  let o = {};
  if (r && n !== 0) {
    const i = tn({
      values: n,
      breakpoints: e.breakpoints.values
    });
    let s;
    typeof i == "object" && (s = ta({
      breakpoints: e.breakpoints.values,
      values: i
    })), o = Be({
      theme: e
    }, i, (c, l) => {
      var f;
      const u = e.spacing(c);
      return u !== "0px" ? {
        marginTop: `-${At(u)}`,
        [`& > .${hr.item}`]: {
          paddingTop: At(u)
        }
      } : (f = s) != null && f.includes(l) ? {} : {
        marginTop: 0,
        [`& > .${hr.item}`]: {
          paddingTop: 0
        }
      };
    });
  }
  return o;
}
function nm({
  theme: e,
  ownerState: t
}) {
  const {
    container: r,
    columnSpacing: n
  } = t;
  let o = {};
  if (r && n !== 0) {
    const i = tn({
      values: n,
      breakpoints: e.breakpoints.values
    });
    let s;
    typeof i == "object" && (s = ta({
      breakpoints: e.breakpoints.values,
      values: i
    })), o = Be({
      theme: e
    }, i, (c, l) => {
      var f;
      const u = e.spacing(c);
      return u !== "0px" ? {
        width: `calc(100% + ${At(u)})`,
        marginLeft: `-${At(u)}`,
        [`& > .${hr.item}`]: {
          paddingLeft: At(u)
        }
      } : (f = s) != null && f.includes(l) ? {} : {
        width: "100%",
        marginLeft: 0,
        [`& > .${hr.item}`]: {
          paddingLeft: 0
        }
      };
    });
  }
  return o;
}
function om(e, t, r = {}) {
  if (!e || e <= 0)
    return [];
  if (typeof e == "string" && !Number.isNaN(Number(e)) || typeof e == "number")
    return [r[`spacing-xs-${String(e)}`]];
  const n = [];
  return t.forEach((o) => {
    const i = e[o];
    Number(i) > 0 && n.push(r[`spacing-${o}-${String(i)}`]);
  }), n;
}
const im = Fe("div", {
  name: "MuiGrid",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e, {
      container: n,
      direction: o,
      item: i,
      spacing: s,
      wrap: c,
      zeroMinWidth: l,
      breakpoints: f
    } = r;
    let u = [];
    n && (u = om(s, f, t));
    const d = [];
    return f.forEach((h) => {
      const y = r[h];
      y && d.push(t[`grid-${h}-${String(y)}`]);
    }), [t.root, n && t.container, i && t.item, l && t.zeroMinWidth, ...u, o !== "row" && t[`direction-xs-${String(o)}`], c !== "wrap" && t[`wrap-xs-${String(c)}`], ...d];
  }
})(({
  ownerState: e
}) => S({
  boxSizing: "border-box"
}, e.container && {
  display: "flex",
  flexWrap: "wrap",
  width: "100%"
}, e.item && {
  margin: 0
  // For instance, it's useful when used with a `figure` element.
}, e.zeroMinWidth && {
  minWidth: 0
}, e.wrap !== "wrap" && {
  flexWrap: e.wrap
}), tm, rm, nm, em);
function sm(e, t) {
  if (!e || e <= 0)
    return [];
  if (typeof e == "string" && !Number.isNaN(Number(e)) || typeof e == "number")
    return [`spacing-xs-${String(e)}`];
  const r = [];
  return t.forEach((n) => {
    const o = e[n];
    if (Number(o) > 0) {
      const i = `spacing-${n}-${String(o)}`;
      r.push(i);
    }
  }), r;
}
const am = (e) => {
  const {
    classes: t,
    container: r,
    direction: n,
    item: o,
    spacing: i,
    wrap: s,
    zeroMinWidth: c,
    breakpoints: l
  } = e;
  let f = [];
  r && (f = sm(i, l));
  const u = [];
  l.forEach((h) => {
    const y = e[h];
    y && u.push(`grid-${h}-${String(y)}`);
  });
  const d = {
    root: ["root", r && "container", o && "item", c && "zeroMinWidth", ...f, n !== "row" && `direction-xs-${String(n)}`, s !== "wrap" && `wrap-xs-${String(s)}`, ...u]
  };
  return Ft(d, Kd, t);
}, ar = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const n = gt({
    props: t,
    name: "MuiGrid"
  }), {
    breakpoints: o
  } = Eo(), i = zs(n), {
    className: s,
    columns: c,
    columnSpacing: l,
    component: f = "div",
    container: u = !1,
    direction: d = "row",
    item: h = !1,
    rowSpacing: y,
    spacing: g = 0,
    wrap: m = "wrap",
    zeroMinWidth: v = !1
  } = i, T = me(i, Qd), $ = y || g, w = l || g, b = x.useContext(Xi), p = u ? c || 12 : b, C = {}, R = S({}, T);
  o.keys.forEach((P) => {
    T[P] != null && (C[P] = T[P], delete R[P]);
  });
  const V = S({}, i, {
    columns: p,
    container: u,
    direction: d,
    item: h,
    rowSpacing: $,
    columnSpacing: w,
    wrap: m,
    zeroMinWidth: v,
    spacing: g
  }, C, {
    breakpoints: o.keys
  }), M = am(V);
  return /* @__PURE__ */ ue(Xi.Provider, {
    value: p,
    children: /* @__PURE__ */ ue(im, S({
      ownerState: V,
      className: ge(M.root, s),
      as: f,
      ref: r
    }, R))
  });
});
process.env.NODE_ENV !== "production" && (ar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The number of columns.
   * @default 12
   */
  columns: a.oneOfType([a.arrayOf(a.number), a.number, a.object]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: a.oneOfType([a.arrayOf(a.oneOfType([a.number, a.string])), a.number, a.object, a.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: a.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction: a.oneOfType([a.oneOf(["column-reverse", "column", "row-reverse", "row"]), a.arrayOf(a.oneOf(["column-reverse", "column", "row-reverse", "row"])), a.object]),
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item: a.bool,
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg: a.oneOfType([a.oneOf(["auto"]), a.number, a.bool]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md: a.oneOfType([a.oneOf(["auto"]), a.number, a.bool]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: a.oneOfType([a.arrayOf(a.oneOfType([a.number, a.string])), a.number, a.object, a.string]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm: a.oneOfType([a.oneOf(["auto"]), a.number, a.bool]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: a.oneOfType([a.arrayOf(a.oneOfType([a.number, a.string])), a.number, a.object, a.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: a.oneOf(["nowrap", "wrap-reverse", "wrap"]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   * @default false
   */
  xl: a.oneOfType([a.oneOf(["auto"]), a.number, a.bool]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs: a.oneOfType([a.oneOf(["auto"]), a.number, a.bool]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth: a.bool
});
if (process.env.NODE_ENV !== "production") {
  const e = ss("Grid", ar);
  ar["propTypes"] = S({}, ar.propTypes, {
    direction: e("container"),
    lg: e("item"),
    md: e("item"),
    sm: e("item"),
    spacing: e("container"),
    wrap: e("container"),
    xs: e("item"),
    zeroMinWidth: e("item")
  });
}
const cm = ar, lm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Wn(e) {
  return `scale(${e}, ${e ** 2})`;
}
const um = {
  entering: {
    opacity: 1,
    transform: Wn(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Pn = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), wo = /* @__PURE__ */ x.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: i,
    easing: s,
    in: c,
    onEnter: l,
    onEntered: f,
    onEntering: u,
    onExit: d,
    onExited: h,
    onExiting: y,
    style: g,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = dd
  } = t, T = me(t, lm), $ = x.useRef(), w = x.useRef(), b = Eo(), p = x.useRef(null), C = et(p, i.ref, r), R = (z) => (k) => {
    if (z) {
      const q = p.current;
      k === void 0 ? z(q) : z(q, k);
    }
  }, V = R(u), M = R((z, k) => {
    xd(z);
    const {
      duration: q,
      delay: H,
      easing: ee
    } = Yi({
      style: g,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = b.transitions.getAutoHeightDuration(z.clientHeight), w.current = O) : O = q, z.style.transition = [b.transitions.create("opacity", {
      duration: O,
      delay: H
    }), b.transitions.create("transform", {
      duration: Pn ? O : O * 0.666,
      delay: H,
      easing: ee
    })].join(","), l && l(z, k);
  }), P = R(f), F = R(y), J = R((z) => {
    const {
      duration: k,
      delay: q,
      easing: H
    } = Yi({
      style: g,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let ee;
    m === "auto" ? (ee = b.transitions.getAutoHeightDuration(z.clientHeight), w.current = ee) : ee = k, z.style.transition = [b.transitions.create("opacity", {
      duration: ee,
      delay: q
    }), b.transitions.create("transform", {
      duration: Pn ? ee : ee * 0.666,
      delay: Pn ? q : q || ee * 0.333,
      easing: H
    })].join(","), z.style.opacity = 0, z.style.transform = Wn(0.75), d && d(z);
  }), G = R(h), Z = (z) => {
    m === "auto" && ($.current = setTimeout(z, w.current || 0)), n && n(p.current, z);
  };
  return x.useEffect(() => () => {
    clearTimeout($.current);
  }, []), /* @__PURE__ */ ue(v, S({
    appear: o,
    in: c,
    nodeRef: p,
    onEnter: M,
    onEntered: P,
    onEntering: V,
    onExit: J,
    onExited: G,
    onExiting: F,
    addEndListener: Z,
    timeout: m === "auto" ? null : m
  }, T, {
    children: (z, k) => /* @__PURE__ */ x.cloneElement(i, S({
      style: S({
        opacity: 0,
        transform: Wn(0.75),
        visibility: z === "exited" && !c ? "hidden" : void 0
      }, um[z], g, i.props.style),
      ref: C
    }, k))
  }));
});
process.env.NODE_ENV !== "production" && (wo.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: a.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: a.bool,
  /**
   * A single child content element.
   */
  children: os.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: a.oneOfType([a.shape({
    enter: a.string,
    exit: a.string
  }), a.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: a.bool,
  /**
   * @ignore
   */
  onEnter: a.func,
  /**
   * @ignore
   */
  onEntered: a.func,
  /**
   * @ignore
   */
  onEntering: a.func,
  /**
   * @ignore
   */
  onExit: a.func,
  /**
   * @ignore
   */
  onExited: a.func,
  /**
   * @ignore
   */
  onExiting: a.func,
  /**
   * @ignore
   */
  style: a.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
wo.muiSupportAuto = !0;
const Ji = wo;
function fm(e) {
  return at("MuiTooltip", e);
}
const pm = yt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), st = pm, dm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function mm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const hm = (e) => {
  const {
    classes: t,
    disableInteractive: r,
    arrow: n,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !r && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${ye(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Ft(s, fm, t);
}, vm = Fe(Xs, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.popper, !r.disableInteractive && t.popperInteractive, r.arrow && t.popperArrow, !r.open && t.popperClose];
  }
})(({
  theme: e,
  ownerState: t,
  open: r
}) => S({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !r && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${st.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${st.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${st.arrow}`]: S({}, t.isRtl ? {
    right: 0,
    marginRight: "-0.71em"
  } : {
    left: 0,
    marginLeft: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "100% 100%"
    }
  }),
  [`&[data-popper-placement*="left"] .${st.arrow}`]: S({}, t.isRtl ? {
    left: 0,
    marginLeft: "-0.71em"
  } : {
    right: 0,
    marginRight: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "0 0"
    }
  })
})), ym = Fe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.tooltip, r.touch && t.touch, r.arrow && t.tooltipArrow, t[`tooltipPlacement${ye(r.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => S({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Pt(e.palette.grey[700], 0.92),
  borderRadius: (e.vars || e).shape.borderRadius,
  color: (e.vars || e).palette.common.white,
  fontFamily: e.typography.fontFamily,
  padding: "4px 8px",
  fontSize: e.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: e.typography.fontWeightMedium
}, t.arrow && {
  position: "relative",
  margin: 0
}, t.touch && {
  padding: "8px 16px",
  fontSize: e.typography.pxToRem(14),
  lineHeight: `${mm(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${st.popper}[data-popper-placement*="left"] &`]: S({
    transformOrigin: "right center"
  }, t.isRtl ? S({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : S({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${st.popper}[data-popper-placement*="right"] &`]: S({
    transformOrigin: "left center"
  }, t.isRtl ? S({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : S({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${st.popper}[data-popper-placement*="top"] &`]: S({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${st.popper}[data-popper-placement*="bottom"] &`]: S({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), gm = Fe("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (e, t) => t.arrow
})(({
  theme: e
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: e.vars ? e.vars.palette.Tooltip.bg : Pt(e.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
}));
let Rr = !1, _n = null, tr = {
  x: 0,
  y: 0
};
function $r(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const ra = /* @__PURE__ */ x.forwardRef(function(t, r) {
  var n, o, i, s, c, l, f, u, d, h, y, g, m, v, T, $, w, b, p;
  const C = gt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: R = !1,
    children: V,
    components: M = {},
    componentsProps: P = {},
    describeChild: F = !1,
    disableFocusListener: J = !1,
    disableHoverListener: G = !1,
    disableInteractive: Z = !1,
    disableTouchListener: z = !1,
    enterDelay: k = 100,
    enterNextDelay: q = 0,
    enterTouchDelay: H = 700,
    followCursor: ee = !1,
    id: O,
    leaveDelay: _ = 0,
    leaveTouchDelay: U = 1500,
    onClose: W,
    onOpen: A,
    open: L,
    placement: D = "bottom",
    PopperComponent: B,
    PopperProps: I = {},
    slotProps: j = {},
    slots: Y = {},
    title: Q,
    TransitionComponent: E = Ji,
    TransitionProps: de
  } = C, N = me(C, dm), fe = /* @__PURE__ */ x.isValidElement(V) ? V : /* @__PURE__ */ ue("span", {
    children: V
  }), Re = Eo(), Xe = Re.direction === "rtl", [xe, bt] = x.useState(), [we, Ue] = x.useState(null), Je = x.useRef(!1), nt = Z || ee, $e = x.useRef(), Pe = x.useRef(), ke = x.useRef(), ot = x.useRef(), [Et, K] = cs({
    controlled: L,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ie = Et;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: X
    } = x.useRef(L !== void 0);
    x.useEffect(() => {
      xe && xe.disabled && !X && Q !== "" && xe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [Q, xe, X]);
  }
  const Yt = as(O), it = x.useRef(), qt = x.useCallback(() => {
    it.current !== void 0 && (document.body.style.WebkitUserSelect = it.current, it.current = void 0), clearTimeout(ot.current);
  }, []);
  x.useEffect(() => () => {
    clearTimeout($e.current), clearTimeout(Pe.current), clearTimeout(ke.current), qt();
  }, [qt]);
  const Oo = (X) => {
    clearTimeout(_n), Rr = !0, K(!0), A && !Ie && A(X);
  }, xr = $t(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (X) => {
      clearTimeout(_n), _n = setTimeout(() => {
        Rr = !1;
      }, 800 + _), K(!1), W && Ie && W(X), clearTimeout($e.current), $e.current = setTimeout(() => {
        Je.current = !1;
      }, Re.transitions.duration.shortest);
    }
  ), hn = (X) => {
    Je.current && X.type !== "touchstart" || (xe && xe.removeAttribute("title"), clearTimeout(Pe.current), clearTimeout(ke.current), k || Rr && q ? Pe.current = setTimeout(() => {
      Oo(X);
    }, Rr ? q : k) : Oo(X));
  }, So = (X) => {
    clearTimeout(Pe.current), clearTimeout(ke.current), ke.current = setTimeout(() => {
      xr(X);
    }, _);
  }, {
    isFocusVisibleRef: Co,
    onBlur: na,
    onFocus: oa,
    ref: ia
  } = Gn(), [, Ro] = x.useState(!1), $o = (X) => {
    na(X), Co.current === !1 && (Ro(!1), So(X));
  }, Po = (X) => {
    xe || bt(X.currentTarget), oa(X), Co.current === !0 && (Ro(!0), hn(X));
  }, _o = (X) => {
    Je.current = !0;
    const _e = fe.props;
    _e.onTouchStart && _e.onTouchStart(X);
  }, No = hn, Ao = So, sa = (X) => {
    _o(X), clearTimeout(ke.current), clearTimeout($e.current), qt(), it.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", ot.current = setTimeout(() => {
      document.body.style.WebkitUserSelect = it.current, hn(X);
    }, H);
  }, aa = (X) => {
    fe.props.onTouchEnd && fe.props.onTouchEnd(X), qt(), clearTimeout(ke.current), ke.current = setTimeout(() => {
      xr(X);
    }, U);
  };
  x.useEffect(() => {
    if (!Ie)
      return;
    function X(_e) {
      (_e.key === "Escape" || _e.key === "Esc") && xr(_e);
    }
    return document.addEventListener("keydown", X), () => {
      document.removeEventListener("keydown", X);
    };
  }, [xr, Ie]);
  const ca = et(fe.ref, ia, bt, r);
  !Q && Q !== 0 && (Ie = !1);
  const vn = x.useRef(), la = (X) => {
    const _e = fe.props;
    _e.onMouseMove && _e.onMouseMove(X), tr = {
      x: X.clientX,
      y: X.clientY
    }, vn.current && vn.current.update();
  }, Gt = {}, yn = typeof Q == "string";
  F ? (Gt.title = !Ie && yn && !G ? Q : null, Gt["aria-describedby"] = Ie ? Yt : null) : (Gt["aria-label"] = yn ? Q : null, Gt["aria-labelledby"] = Ie && !yn ? Yt : null);
  const je = S({}, Gt, N, fe.props, {
    className: ge(N.className, fe.props.className),
    onTouchStart: _o,
    ref: ca
  }, ee ? {
    onMouseMove: la
  } : {});
  process.env.NODE_ENV !== "production" && (je["data-mui-internal-clone-element"] = !0, x.useEffect(() => {
    xe && !xe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [xe]));
  const Ht = {};
  z || (je.onTouchStart = sa, je.onTouchEnd = aa), G || (je.onMouseOver = $r(No, je.onMouseOver), je.onMouseLeave = $r(Ao, je.onMouseLeave), nt || (Ht.onMouseOver = No, Ht.onMouseLeave = Ao)), J || (je.onFocus = $r(Po, je.onFocus), je.onBlur = $r($o, je.onBlur), nt || (Ht.onFocus = Po, Ht.onBlur = $o)), process.env.NODE_ENV !== "production" && fe.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${fe.props.title}\` or the Tooltip component.`].join(`
`));
  const ua = x.useMemo(() => {
    var X;
    let _e = [{
      name: "arrow",
      enabled: !!we,
      options: {
        element: we,
        padding: 4
      }
    }];
    return (X = I.popperOptions) != null && X.modifiers && (_e = _e.concat(I.popperOptions.modifiers)), S({}, I.popperOptions, {
      modifiers: _e
    });
  }, [we, I]), Kt = S({}, C, {
    isRtl: Xe,
    arrow: R,
    disableInteractive: nt,
    placement: D,
    PopperComponentProp: B,
    touch: Je.current
  }), gn = hm(Kt), Mo = (n = (o = Y.popper) != null ? o : M.Popper) != null ? n : vm, ko = (i = (s = (c = Y.transition) != null ? c : M.Transition) != null ? s : E) != null ? i : Ji, Io = (l = (f = Y.tooltip) != null ? f : M.Tooltip) != null ? l : ym, jo = (u = (d = Y.arrow) != null ? d : M.Arrow) != null ? u : gm, fa = rr(Mo, S({}, I, (h = j.popper) != null ? h : P.popper, {
    className: ge(gn.popper, I?.className, (y = (g = j.popper) != null ? g : P.popper) == null ? void 0 : y.className)
  }), Kt), pa = rr(ko, S({}, de, (m = j.transition) != null ? m : P.transition), Kt), da = rr(Io, S({}, (v = j.tooltip) != null ? v : P.tooltip, {
    className: ge(gn.tooltip, (T = ($ = j.tooltip) != null ? $ : P.tooltip) == null ? void 0 : T.className)
  }), Kt), ma = rr(jo, S({}, (w = j.arrow) != null ? w : P.arrow, {
    className: ge(gn.arrow, (b = (p = j.arrow) != null ? p : P.arrow) == null ? void 0 : b.className)
  }), Kt);
  return /* @__PURE__ */ Mt(x.Fragment, {
    children: [/* @__PURE__ */ x.cloneElement(fe, je), /* @__PURE__ */ ue(Mo, S({
      as: B ?? Xs,
      placement: D,
      anchorEl: ee ? {
        getBoundingClientRect: () => ({
          top: tr.y,
          left: tr.x,
          right: tr.x,
          bottom: tr.y,
          width: 0,
          height: 0
        })
      } : xe,
      popperRef: vn,
      open: xe ? Ie : !1,
      id: Yt,
      transition: !0
    }, Ht, fa, {
      popperOptions: ua,
      children: ({
        TransitionProps: X
      }) => /* @__PURE__ */ ue(ko, S({
        timeout: Re.transitions.duration.shorter
      }, X, pa, {
        children: /* @__PURE__ */ Mt(Io, S({}, da, {
          children: [Q, R ? /* @__PURE__ */ ue(jo, S({}, ma, {
            ref: Ue
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (ra.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: a.bool,
  /**
   * Tooltip reference element.
   */
  children: os.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Arrow: a.elementType,
    Popper: a.elementType,
    Tooltip: a.elementType,
    Transition: a.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: a.shape({
    arrow: a.object,
    popper: a.object,
    tooltip: a.object,
    transition: a.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: a.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: a.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: a.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: a.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: a.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: a.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: a.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: a.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: a.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: a.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: a.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: a.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: a.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: a.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: a.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: a.shape({
    arrow: a.object,
    popper: a.object,
    tooltip: a.object,
    transition: a.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: a.shape({
    arrow: a.elementType,
    popper: a.elementType,
    tooltip: a.elementType,
    transition: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: a.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: a.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: a.object
});
const bm = ra, wm = (e) => {
  const [t, r] = ba(e?.selected), n = () => {
    e?.handleSelect(), r(!t);
  };
  return /* @__PURE__ */ Mt(Mi, { children: [
    e.cancelField && /* @__PURE__ */ ue(
      Mi,
      {
        sx: {
          display: "flex",
          justifyContent: "flex-end",
          mb: "-20px",
          mr: "-5px"
        },
        children: /* @__PURE__ */ ue(
          Us,
          {
            "aria-label": "Cancel Icon",
            onClick: n,
            sx: {
              color: t ? "warning.dark" : "grey.600",
              zIndex: 1e3,
              "&:hover": {
                color: "warning.dark"
              }
            }
          }
        )
      }
    ),
    /* @__PURE__ */ ue(
      bm,
      {
        title: e.tooltipTitle ? e.tooltipTitle : "",
        arrow: !0,
        placement: "top",
        children: /* @__PURE__ */ ue(
          Hd,
          {
            onClick: e.onClick,
            type: e.type,
            variant: e.variant ? e.variant : "contained",
            size: e.size ? e.size : "small",
            endIcon: e.endIcon,
            startIcon: e.startIcon,
            disabled: e.disabled,
            disableElevation: !0,
            "data-testid": e?.testid ? e.testid : e?.label,
            sx: {
              backgroundColor: e.backgroundColor ? e.backgroundColor : "primary.main",
              color: e.color ? e.color : "common.white",
              minWidth: "80px",
              height: e.height,
              marginY: e?.marginY ? e?.marginY : "10px",
              border: 1,
              borderRadius: e.borderRadius ? e.borderRadius : "",
              borderColor: e.borderColor ? e.borderColor : "",
              "&:hover": {
                backgroundColor: e.backgroundColor ? e.backgroundColor : "primary.main",
                boxShadow: 2,
                borderColor: "primary.dark"
              }
            },
            children: /* @__PURE__ */ ue(cm, { item: !0, onClick: e.onLabelClick, children: e.label })
          }
        )
      }
    )
  ] });
};
export {
  wm as CellmaButton
};
