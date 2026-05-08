const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/role-B7f6VJfE.js",
      "assets/Navbar-CDX-VLnU.js",
      "assets/github-DTU-TjY9.js",
      "assets/dashboard-BhoMfLL0.js",
      "assets/SuccessModal-CxSQrlYz.js",
      "assets/auth-CbBaPISU.js",
      "assets/index-C4M91O3s.js",
      "assets/projects._projectId-DEmizynJ.js",
      "assets/utils-DUfAGjcA.js",
      "assets/projects._projectId_.milestones._milestoneId-C25M6Rpm.js",
    ]),
) => i.map((i) => d[i]);
function Ev(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
function Y2(a) {
  if (Object.prototype.hasOwnProperty.call(a, "__esModule")) return a;
  var l = a.default;
  if (typeof l == "function") {
    var r = function o() {
      var c = !1;
      try {
        c = this instanceof o;
      } catch {}
      return c ? Reflect.construct(l, arguments, this.constructor) : l.apply(this, arguments);
    };
    r.prototype = l.prototype;
  } else r = {};
  return (
    Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.keys(a).forEach(function (o) {
      var c = Object.getOwnPropertyDescriptor(a, o);
      Object.defineProperty(
        r,
        o,
        c.get
          ? c
          : {
              enumerable: !0,
              get: function () {
                return a[o];
              },
            },
      );
    }),
    r
  );
}
var rc = { exports: {} },
  Yl = {};
var Qp;
function _v() {
  if (Qp) return Yl;
  Qp = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function r(o, c, d) {
    var y = null;
    if ((d !== void 0 && (y = "" + d), c.key !== void 0 && (y = "" + c.key), "key" in c)) {
      d = {};
      for (var h in c) h !== "key" && (d[h] = c[h]);
    } else d = c;
    return ((c = d.ref), { $$typeof: a, type: o, key: y, ref: c !== void 0 ? c : null, props: d });
  }
  return ((Yl.Fragment = l), (Yl.jsx = r), (Yl.jsxs = r), Yl);
}
var Zp;
function xv() {
  return (Zp || ((Zp = 1), (rc.exports = _v())), rc.exports);
}
var W = xv(),
  uc = { exports: {} },
  yt = {};
var Kp;
function Av() {
  if (Kp) return yt;
  Kp = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    r = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    y = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    v = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    _ = Symbol.for("react.lazy"),
    S = Symbol.for("react.activity"),
    A = Symbol.iterator;
  function x(z) {
    return z === null || typeof z != "object"
      ? null
      : ((z = (A && z[A]) || z["@@iterator"]), typeof z == "function" ? z : null);
  }
  var M = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    D = Object.assign,
    C = {};
  function B(z, K, at) {
    ((this.props = z), (this.context = K), (this.refs = C), (this.updater = at || M));
  }
  ((B.prototype.isReactComponent = {}),
    (B.prototype.setState = function (z, K) {
      if (typeof z != "object" && typeof z != "function" && z != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, z, K, "setState");
    }),
    (B.prototype.forceUpdate = function (z) {
      this.updater.enqueueForceUpdate(this, z, "forceUpdate");
    }));
  function q() {}
  q.prototype = B.prototype;
  function Q(z, K, at) {
    ((this.props = z), (this.context = K), (this.refs = C), (this.updater = at || M));
  }
  var V = (Q.prototype = new q());
  ((V.constructor = Q), D(V, B.prototype), (V.isPureReactComponent = !0));
  var $ = Array.isArray;
  function nt() {}
  var F = { H: null, A: null, T: null, S: null },
    et = Object.prototype.hasOwnProperty;
  function it(z, K, at) {
    var lt = at.ref;
    return { $$typeof: a, type: z, key: K, ref: lt !== void 0 ? lt : null, props: at };
  }
  function ht(z, K) {
    return it(z.type, K, z.props);
  }
  function ot(z) {
    return typeof z == "object" && z !== null && z.$$typeof === a;
  }
  function St(z) {
    var K = { "=": "=0", ":": "=2" };
    return (
      "$" +
      z.replace(/[=:]/g, function (at) {
        return K[at];
      })
    );
  }
  var _t = /\/+/g;
  function Pt(z, K) {
    return typeof z == "object" && z !== null && z.key != null ? St("" + z.key) : K.toString(36);
  }
  function Nt(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (
          (typeof z.status == "string"
            ? z.then(nt, nt)
            : ((z.status = "pending"),
              z.then(
                function (K) {
                  z.status === "pending" && ((z.status = "fulfilled"), (z.value = K));
                },
                function (K) {
                  z.status === "pending" && ((z.status = "rejected"), (z.reason = K));
                },
              )),
          z.status)
        ) {
          case "fulfilled":
            return z.value;
          case "rejected":
            throw z.reason;
        }
    }
    throw z;
  }
  function Z(z, K, at, lt, st) {
    var gt = typeof z;
    (gt === "undefined" || gt === "boolean") && (z = null);
    var wt = !1;
    if (z === null) wt = !0;
    else
      switch (gt) {
        case "bigint":
        case "string":
        case "number":
          wt = !0;
          break;
        case "object":
          switch (z.$$typeof) {
            case a:
            case l:
              wt = !0;
              break;
            case _:
              return ((wt = z._init), Z(wt(z._payload), K, at, lt, st));
          }
      }
    if (wt)
      return (
        (st = st(z)),
        (wt = lt === "" ? "." + Pt(z, 0) : lt),
        $(st)
          ? ((at = ""),
            wt != null && (at = wt.replace(_t, "$&/") + "/"),
            Z(st, K, at, "", function (Ke) {
              return Ke;
            }))
          : st != null &&
            (ot(st) &&
              (st = ht(
                st,
                at +
                  (st.key == null || (z && z.key === st.key)
                    ? ""
                    : ("" + st.key).replace(_t, "$&/") + "/") +
                  wt,
              )),
            K.push(st)),
        1
      );
    wt = 0;
    var Xt = lt === "" ? "." : lt + ":";
    if ($(z))
      for (var jt = 0; jt < z.length; jt++)
        ((lt = z[jt]), (gt = Xt + Pt(lt, jt)), (wt += Z(lt, K, at, gt, st)));
    else if (((jt = x(z)), typeof jt == "function"))
      for (z = jt.call(z), jt = 0; !(lt = z.next()).done; )
        ((lt = lt.value), (gt = Xt + Pt(lt, jt++)), (wt += Z(lt, K, at, gt, st)));
    else if (gt === "object") {
      if (typeof z.then == "function") return Z(Nt(z), K, at, lt, st);
      throw (
        (K = String(z)),
        Error(
          "Objects are not valid as a React child (found: " +
            (K === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : K) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return wt;
  }
  function tt(z, K, at) {
    if (z == null) return z;
    var lt = [],
      st = 0;
    return (
      Z(z, lt, "", "", function (gt) {
        return K.call(at, gt, st++);
      }),
      lt
    );
  }
  function ft(z) {
    if (z._status === -1) {
      var K = z._result;
      ((K = K()),
        K.then(
          function (at) {
            (z._status === 0 || z._status === -1) && ((z._status = 1), (z._result = at));
          },
          function (at) {
            (z._status === 0 || z._status === -1) && ((z._status = 2), (z._result = at));
          },
        ),
        z._status === -1 && ((z._status = 0), (z._result = K)));
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var zt =
      typeof reportError == "function"
        ? reportError
        : function (z) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var K = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof z == "object" && z !== null && typeof z.message == "string"
                    ? String(z.message)
                    : String(z),
                error: z,
              });
              if (!window.dispatchEvent(K)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", z);
              return;
            }
            console.error(z);
          },
    Bt = {
      map: tt,
      forEach: function (z, K, at) {
        tt(
          z,
          function () {
            K.apply(this, arguments);
          },
          at,
        );
      },
      count: function (z) {
        var K = 0;
        return (
          tt(z, function () {
            K++;
          }),
          K
        );
      },
      toArray: function (z) {
        return (
          tt(z, function (K) {
            return K;
          }) || []
        );
      },
      only: function (z) {
        if (!ot(z))
          throw Error("React.Children.only expected to receive a single React element child.");
        return z;
      },
    };
  return (
    (yt.Activity = S),
    (yt.Children = Bt),
    (yt.Component = B),
    (yt.Fragment = r),
    (yt.Profiler = c),
    (yt.PureComponent = Q),
    (yt.StrictMode = o),
    (yt.Suspense = v),
    (yt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F),
    (yt.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (z) {
        return F.H.useMemoCache(z);
      },
    }),
    (yt.cache = function (z) {
      return function () {
        return z.apply(null, arguments);
      };
    }),
    (yt.cacheSignal = function () {
      return null;
    }),
    (yt.cloneElement = function (z, K, at) {
      if (z == null) throw Error("The argument must be a React element, but you passed " + z + ".");
      var lt = D({}, z.props),
        st = z.key;
      if (K != null)
        for (gt in (K.key !== void 0 && (st = "" + K.key), K))
          !et.call(K, gt) ||
            gt === "key" ||
            gt === "__self" ||
            gt === "__source" ||
            (gt === "ref" && K.ref === void 0) ||
            (lt[gt] = K[gt]);
      var gt = arguments.length - 2;
      if (gt === 1) lt.children = at;
      else if (1 < gt) {
        for (var wt = Array(gt), Xt = 0; Xt < gt; Xt++) wt[Xt] = arguments[Xt + 2];
        lt.children = wt;
      }
      return it(z.type, st, lt);
    }),
    (yt.createContext = function (z) {
      return (
        (z = {
          $$typeof: y,
          _currentValue: z,
          _currentValue2: z,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (z.Provider = z),
        (z.Consumer = { $$typeof: d, _context: z }),
        z
      );
    }),
    (yt.createElement = function (z, K, at) {
      var lt,
        st = {},
        gt = null;
      if (K != null)
        for (lt in (K.key !== void 0 && (gt = "" + K.key), K))
          et.call(K, lt) &&
            lt !== "key" &&
            lt !== "__self" &&
            lt !== "__source" &&
            (st[lt] = K[lt]);
      var wt = arguments.length - 2;
      if (wt === 1) st.children = at;
      else if (1 < wt) {
        for (var Xt = Array(wt), jt = 0; jt < wt; jt++) Xt[jt] = arguments[jt + 2];
        st.children = Xt;
      }
      if (z && z.defaultProps)
        for (lt in ((wt = z.defaultProps), wt)) st[lt] === void 0 && (st[lt] = wt[lt]);
      return it(z, gt, st);
    }),
    (yt.createRef = function () {
      return { current: null };
    }),
    (yt.forwardRef = function (z) {
      return { $$typeof: h, render: z };
    }),
    (yt.isValidElement = ot),
    (yt.lazy = function (z) {
      return { $$typeof: _, _payload: { _status: -1, _result: z }, _init: ft };
    }),
    (yt.memo = function (z, K) {
      return { $$typeof: g, type: z, compare: K === void 0 ? null : K };
    }),
    (yt.startTransition = function (z) {
      var K = F.T,
        at = {};
      F.T = at;
      try {
        var lt = z(),
          st = F.S;
        (st !== null && st(at, lt),
          typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then(nt, zt));
      } catch (gt) {
        zt(gt);
      } finally {
        (K !== null && at.types !== null && (K.types = at.types), (F.T = K));
      }
    }),
    (yt.unstable_useCacheRefresh = function () {
      return F.H.useCacheRefresh();
    }),
    (yt.use = function (z) {
      return F.H.use(z);
    }),
    (yt.useActionState = function (z, K, at) {
      return F.H.useActionState(z, K, at);
    }),
    (yt.useCallback = function (z, K) {
      return F.H.useCallback(z, K);
    }),
    (yt.useContext = function (z) {
      return F.H.useContext(z);
    }),
    (yt.useDebugValue = function () {}),
    (yt.useDeferredValue = function (z, K) {
      return F.H.useDeferredValue(z, K);
    }),
    (yt.useEffect = function (z, K) {
      return F.H.useEffect(z, K);
    }),
    (yt.useEffectEvent = function (z) {
      return F.H.useEffectEvent(z);
    }),
    (yt.useId = function () {
      return F.H.useId();
    }),
    (yt.useImperativeHandle = function (z, K, at) {
      return F.H.useImperativeHandle(z, K, at);
    }),
    (yt.useInsertionEffect = function (z, K) {
      return F.H.useInsertionEffect(z, K);
    }),
    (yt.useLayoutEffect = function (z, K) {
      return F.H.useLayoutEffect(z, K);
    }),
    (yt.useMemo = function (z, K) {
      return F.H.useMemo(z, K);
    }),
    (yt.useOptimistic = function (z, K) {
      return F.H.useOptimistic(z, K);
    }),
    (yt.useReducer = function (z, K, at) {
      return F.H.useReducer(z, K, at);
    }),
    (yt.useRef = function (z) {
      return F.H.useRef(z);
    }),
    (yt.useState = function (z) {
      return F.H.useState(z);
    }),
    (yt.useSyncExternalStore = function (z, K, at) {
      return F.H.useSyncExternalStore(z, K, at);
    }),
    (yt.useTransition = function () {
      return F.H.useTransition();
    }),
    (yt.version = "19.2.5"),
    yt
  );
}
var Ip;
function ar() {
  return (Ip || ((Ip = 1), (uc.exports = Av())), uc.exports);
}
var rt = ar();
const kl = Ev(rt);
var oc = { exports: {} },
  Gl = {},
  sc = { exports: {} },
  cc = {};
var Fp;
function wv() {
  return (
    Fp ||
      ((Fp = 1),
      (function (a) {
        function l(Z, tt) {
          var ft = Z.length;
          Z.push(tt);
          t: for (; 0 < ft; ) {
            var zt = (ft - 1) >>> 1,
              Bt = Z[zt];
            if (0 < c(Bt, tt)) ((Z[zt] = tt), (Z[ft] = Bt), (ft = zt));
            else break t;
          }
        }
        function r(Z) {
          return Z.length === 0 ? null : Z[0];
        }
        function o(Z) {
          if (Z.length === 0) return null;
          var tt = Z[0],
            ft = Z.pop();
          if (ft !== tt) {
            Z[0] = ft;
            t: for (var zt = 0, Bt = Z.length, z = Bt >>> 1; zt < z; ) {
              var K = 2 * (zt + 1) - 1,
                at = Z[K],
                lt = K + 1,
                st = Z[lt];
              if (0 > c(at, ft))
                lt < Bt && 0 > c(st, at)
                  ? ((Z[zt] = st), (Z[lt] = ft), (zt = lt))
                  : ((Z[zt] = at), (Z[K] = ft), (zt = K));
              else if (lt < Bt && 0 > c(st, ft)) ((Z[zt] = st), (Z[lt] = ft), (zt = lt));
              else break t;
            }
          }
          return tt;
        }
        function c(Z, tt) {
          var ft = Z.sortIndex - tt.sortIndex;
          return ft !== 0 ? ft : Z.id - tt.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == "object" && typeof performance.now == "function")
        ) {
          var d = performance;
          a.unstable_now = function () {
            return d.now();
          };
        } else {
          var y = Date,
            h = y.now();
          a.unstable_now = function () {
            return y.now() - h;
          };
        }
        var v = [],
          g = [],
          _ = 1,
          S = null,
          A = 3,
          x = !1,
          M = !1,
          D = !1,
          C = !1,
          B = typeof setTimeout == "function" ? setTimeout : null,
          q = typeof clearTimeout == "function" ? clearTimeout : null,
          Q = typeof setImmediate < "u" ? setImmediate : null;
        function V(Z) {
          for (var tt = r(g); tt !== null; ) {
            if (tt.callback === null) o(g);
            else if (tt.startTime <= Z) (o(g), (tt.sortIndex = tt.expirationTime), l(v, tt));
            else break;
            tt = r(g);
          }
        }
        function $(Z) {
          if (((D = !1), V(Z), !M))
            if (r(v) !== null) ((M = !0), nt || ((nt = !0), St()));
            else {
              var tt = r(g);
              tt !== null && Nt($, tt.startTime - Z);
            }
        }
        var nt = !1,
          F = -1,
          et = 5,
          it = -1;
        function ht() {
          return C ? !0 : !(a.unstable_now() - it < et);
        }
        function ot() {
          if (((C = !1), nt)) {
            var Z = a.unstable_now();
            it = Z;
            var tt = !0;
            try {
              t: {
                ((M = !1), D && ((D = !1), q(F), (F = -1)), (x = !0));
                var ft = A;
                try {
                  e: {
                    for (V(Z), S = r(v); S !== null && !(S.expirationTime > Z && ht()); ) {
                      var zt = S.callback;
                      if (typeof zt == "function") {
                        ((S.callback = null), (A = S.priorityLevel));
                        var Bt = zt(S.expirationTime <= Z);
                        if (((Z = a.unstable_now()), typeof Bt == "function")) {
                          ((S.callback = Bt), V(Z), (tt = !0));
                          break e;
                        }
                        (S === r(v) && o(v), V(Z));
                      } else o(v);
                      S = r(v);
                    }
                    if (S !== null) tt = !0;
                    else {
                      var z = r(g);
                      (z !== null && Nt($, z.startTime - Z), (tt = !1));
                    }
                  }
                  break t;
                } finally {
                  ((S = null), (A = ft), (x = !1));
                }
                tt = void 0;
              }
            } finally {
              tt ? St() : (nt = !1);
            }
          }
        }
        var St;
        if (typeof Q == "function")
          St = function () {
            Q(ot);
          };
        else if (typeof MessageChannel < "u") {
          var _t = new MessageChannel(),
            Pt = _t.port2;
          ((_t.port1.onmessage = ot),
            (St = function () {
              Pt.postMessage(null);
            }));
        } else
          St = function () {
            B(ot, 0);
          };
        function Nt(Z, tt) {
          F = B(function () {
            Z(a.unstable_now());
          }, tt);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (Z) {
            Z.callback = null;
          }),
          (a.unstable_forceFrameRate = function (Z) {
            0 > Z || 125 < Z
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (et = 0 < Z ? Math.floor(1e3 / Z) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (a.unstable_next = function (Z) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var tt = 3;
                break;
              default:
                tt = A;
            }
            var ft = A;
            A = tt;
            try {
              return Z();
            } finally {
              A = ft;
            }
          }),
          (a.unstable_requestPaint = function () {
            C = !0;
          }),
          (a.unstable_runWithPriority = function (Z, tt) {
            switch (Z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                Z = 3;
            }
            var ft = A;
            A = Z;
            try {
              return tt();
            } finally {
              A = ft;
            }
          }),
          (a.unstable_scheduleCallback = function (Z, tt, ft) {
            var zt = a.unstable_now();
            switch (
              (typeof ft == "object" && ft !== null
                ? ((ft = ft.delay), (ft = typeof ft == "number" && 0 < ft ? zt + ft : zt))
                : (ft = zt),
              Z)
            ) {
              case 1:
                var Bt = -1;
                break;
              case 2:
                Bt = 250;
                break;
              case 5:
                Bt = 1073741823;
                break;
              case 4:
                Bt = 1e4;
                break;
              default:
                Bt = 5e3;
            }
            return (
              (Bt = ft + Bt),
              (Z = {
                id: _++,
                callback: tt,
                priorityLevel: Z,
                startTime: ft,
                expirationTime: Bt,
                sortIndex: -1,
              }),
              ft > zt
                ? ((Z.sortIndex = ft),
                  l(g, Z),
                  r(v) === null && Z === r(g) && (D ? (q(F), (F = -1)) : (D = !0), Nt($, ft - zt)))
                : ((Z.sortIndex = Bt), l(v, Z), M || x || ((M = !0), nt || ((nt = !0), St()))),
              Z
            );
          }),
          (a.unstable_shouldYield = ht),
          (a.unstable_wrapCallback = function (Z) {
            var tt = A;
            return function () {
              var ft = A;
              A = tt;
              try {
                return Z.apply(this, arguments);
              } finally {
                A = ft;
              }
            };
          }));
      })(cc)),
    cc
  );
}
var Pp;
function Rv() {
  return (Pp || ((Pp = 1), (sc.exports = wv())), sc.exports);
}
var fc = { exports: {} },
  we = {};
var Jp;
function Tv() {
  if (Jp) return we;
  Jp = 1;
  var a = ar();
  function l(v) {
    var g = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var _ = 2; _ < arguments.length; _++) g += "&args[]=" + encodeURIComponent(arguments[_]);
    }
    return (
      "Minified React error #" +
      v +
      "; visit " +
      g +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function r() {}
  var o = {
      d: {
        f: r,
        r: function () {
          throw Error(l(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function d(v, g, _) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: S == null ? null : "" + S,
      children: v,
      containerInfo: g,
      implementation: _,
    };
  }
  var y = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(v, g) {
    if (v === "font") return "";
    if (typeof g == "string") return g === "use-credentials" ? g : "";
  }
  return (
    (we.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (we.createPortal = function (v, g) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(l(299));
      return d(v, g, null, _);
    }),
    (we.flushSync = function (v) {
      var g = y.T,
        _ = o.p;
      try {
        if (((y.T = null), (o.p = 2), v)) return v();
      } finally {
        ((y.T = g), (o.p = _), o.d.f());
      }
    }),
    (we.preconnect = function (v, g) {
      typeof v == "string" &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == "string" ? (g === "use-credentials" ? g : "") : void 0))
          : (g = null),
        o.d.C(v, g));
    }),
    (we.prefetchDNS = function (v) {
      typeof v == "string" && o.d.D(v);
    }),
    (we.preinit = function (v, g) {
      if (typeof v == "string" && g && typeof g.as == "string") {
        var _ = g.as,
          S = h(_, g.crossOrigin),
          A = typeof g.integrity == "string" ? g.integrity : void 0,
          x = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
        _ === "style"
          ? o.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, {
              crossOrigin: S,
              integrity: A,
              fetchPriority: x,
            })
          : _ === "script" &&
            o.d.X(v, {
              crossOrigin: S,
              integrity: A,
              fetchPriority: x,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
      }
    }),
    (we.preinitModule = function (v, g) {
      if (typeof v == "string")
        if (typeof g == "object" && g !== null) {
          if (g.as == null || g.as === "script") {
            var _ = h(g.as, g.crossOrigin);
            o.d.M(v, {
              crossOrigin: _,
              integrity: typeof g.integrity == "string" ? g.integrity : void 0,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(v);
    }),
    (we.preload = function (v, g) {
      if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
        var _ = g.as,
          S = h(_, g.crossOrigin);
        o.d.L(v, _, {
          crossOrigin: S,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          type: typeof g.type == "string" ? g.type : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
          referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
          imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
          media: typeof g.media == "string" ? g.media : void 0,
        });
      }
    }),
    (we.preloadModule = function (v, g) {
      if (typeof v == "string")
        if (g) {
          var _ = h(g.as, g.crossOrigin);
          o.d.m(v, {
            as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
            crossOrigin: _,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          });
        } else o.d.m(v);
    }),
    (we.requestFormReset = function (v) {
      o.d.r(v);
    }),
    (we.unstable_batchedUpdates = function (v, g) {
      return v(g);
    }),
    (we.useFormState = function (v, g, _) {
      return y.H.useFormState(v, g, _);
    }),
    (we.useFormStatus = function () {
      return y.H.useHostTransitionStatus();
    }),
    (we.version = "19.2.5"),
    we
  );
}
var kp;
function Pm() {
  if (kp) return fc.exports;
  kp = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return (a(), (fc.exports = Tv()), fc.exports);
}
var $p;
function Mv() {
  if ($p) return Gl;
  $p = 1;
  var a = Rv(),
    l = ar(),
    r = Pm();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function d(t) {
    var e = t,
      n = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do ((e = t), (e.flags & 4098) !== 0 && (n = e.return), (t = e.return));
      while (t);
    }
    return e.tag === 3 ? n : null;
  }
  function y(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function v(t) {
    if (d(t) !== t) throw Error(o(188));
  }
  function g(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var u = n.return;
      if (u === null) break;
      var s = u.alternate;
      if (s === null) {
        if (((i = u.return), i !== null)) {
          n = i;
          continue;
        }
        break;
      }
      if (u.child === s.child) {
        for (s = u.child; s; ) {
          if (s === n) return (v(u), t);
          if (s === i) return (v(u), e);
          s = s.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== i.return) ((n = u), (i = s));
      else {
        for (var m = !1, E = u.child; E; ) {
          if (E === n) {
            ((m = !0), (n = u), (i = s));
            break;
          }
          if (E === i) {
            ((m = !0), (i = u), (n = s));
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = s.child; E; ) {
            if (E === n) {
              ((m = !0), (n = s), (i = u));
              break;
            }
            if (E === i) {
              ((m = !0), (i = s), (n = u));
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(o(189));
        }
      }
      if (n.alternate !== i) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? t : e;
  }
  function _(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = _(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var S = Object.assign,
    A = Symbol.for("react.element"),
    x = Symbol.for("react.transitional.element"),
    M = Symbol.for("react.portal"),
    D = Symbol.for("react.fragment"),
    C = Symbol.for("react.strict_mode"),
    B = Symbol.for("react.profiler"),
    q = Symbol.for("react.consumer"),
    Q = Symbol.for("react.context"),
    V = Symbol.for("react.forward_ref"),
    $ = Symbol.for("react.suspense"),
    nt = Symbol.for("react.suspense_list"),
    F = Symbol.for("react.memo"),
    et = Symbol.for("react.lazy"),
    it = Symbol.for("react.activity"),
    ht = Symbol.for("react.memo_cache_sentinel"),
    ot = Symbol.iterator;
  function St(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (ot && t[ot]) || t["@@iterator"]), typeof t == "function" ? t : null);
  }
  var _t = Symbol.for("react.client.reference");
  function Pt(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.$$typeof === _t ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case D:
        return "Fragment";
      case B:
        return "Profiler";
      case C:
        return "StrictMode";
      case $:
        return "Suspense";
      case nt:
        return "SuspenseList";
      case it:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case M:
          return "Portal";
        case Q:
          return t.displayName || "Context";
        case q:
          return (t._context.displayName || "Context") + ".Consumer";
        case V:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case F:
          return ((e = t.displayName || null), e !== null ? e : Pt(t.type) || "Memo");
        case et:
          ((e = t._payload), (t = t._init));
          try {
            return Pt(t(e));
          } catch {}
      }
    return null;
  }
  var Nt = Array.isArray,
    Z = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    tt = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ft = { pending: !1, data: null, method: null, action: null },
    zt = [],
    Bt = -1;
  function z(t) {
    return { current: t };
  }
  function K(t) {
    0 > Bt || ((t.current = zt[Bt]), (zt[Bt] = null), Bt--);
  }
  function at(t, e) {
    (Bt++, (zt[Bt] = t.current), (t.current = e));
  }
  var lt = z(null),
    st = z(null),
    gt = z(null),
    wt = z(null);
  function Xt(t, e) {
    switch ((at(gt, e), at(st, t), at(lt, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? hp(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = hp(e)), (t = pp(e, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (K(lt), at(lt, t));
  }
  function jt() {
    (K(lt), K(st), K(gt));
  }
  function Ke(t) {
    t.memoizedState !== null && at(wt, t);
    var e = lt.current,
      n = pp(e, t.type);
    e !== n && (at(st, t), at(lt, n));
  }
  function ln(t) {
    (st.current === t && (K(lt), K(st)), wt.current === t && (K(wt), (Nl._currentValue = ft)));
  }
  var rn, Ie;
  function Ae(t) {
    if (rn === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        ((rn = (e && e[1]) || ""),
          (Ie =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      rn +
      t +
      Ie
    );
  }
  var Ta = !1;
  function Vn(t, e) {
    if (!t || Ta) return "";
    Ta = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var k = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(k.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(k, []);
                } catch (X) {
                  var Y = X;
                }
                Reflect.construct(t, [], k);
              } else {
                try {
                  k.call();
                } catch (X) {
                  Y = X;
                }
                t.call(k.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                Y = X;
              }
              (k = t()) && typeof k.catch == "function" && k.catch(function () {});
            }
          } catch (X) {
            if (X && Y && typeof X.stack == "string") return [X.stack, Y.stack];
          }
          return [null, null];
        },
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
      u &&
        u.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var s = i.DetermineComponentFrameRoot(),
        m = s[0],
        E = s[1];
      if (m && E) {
        var O = m.split(`
`),
          H = E.split(`
`);
        for (u = i = 0; i < O.length && !O[i].includes("DetermineComponentFrameRoot"); ) i++;
        for (; u < H.length && !H[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (i === O.length || u === H.length)
          for (i = O.length - 1, u = H.length - 1; 1 <= i && 0 <= u && O[i] !== H[u]; ) u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (O[i] !== H[u]) {
            if (i !== 1 || u !== 1)
              do
                if ((i--, u--, 0 > u || O[i] !== H[u])) {
                  var I =
                    `
` + O[i].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      I.includes("<anonymous>") &&
                      (I = I.replace("<anonymous>", t.displayName)),
                    I
                  );
                }
              while (1 <= i && 0 <= u);
            break;
          }
      }
    } finally {
      ((Ta = !1), (Error.prepareStackTrace = n));
    }
    return (n = t ? t.displayName || t.name : "") ? Ae(n) : "";
  }
  function Xn(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ae(t.type);
      case 16:
        return Ae("Lazy");
      case 13:
        return t.child !== e && e !== null ? Ae("Suspense Fallback") : Ae("Suspense");
      case 19:
        return Ae("SuspenseList");
      case 0:
      case 15:
        return Vn(t.type, !1);
      case 11:
        return Vn(t.type.render, !1);
      case 1:
        return Vn(t.type, !0);
      case 31:
        return Ae("Activity");
      default:
        return "";
    }
  }
  function un(t) {
    try {
      var e = "",
        n = null;
      do ((e += Xn(t, n)), (n = t), (t = t.return));
      while (t);
      return e;
    } catch (i) {
      return (
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack
      );
    }
  }
  var vn = Object.prototype.hasOwnProperty,
    Me = a.unstable_scheduleCallback,
    fn = a.unstable_cancelCallback,
    Re = a.unstable_shouldYield,
    Ma = a.unstable_requestPaint,
    pe = a.unstable_now,
    Mt = a.unstable_getCurrentPriorityLevel,
    ce = a.unstable_ImmediatePriority,
    b = a.unstable_UserBlockingPriority,
    f = a.unstable_NormalPriority,
    p = a.unstable_LowPriority,
    R = a.unstable_IdlePriority,
    L = a.log,
    G = a.unstable_setDisableYieldValue,
    P = null,
    pt = null;
  function Ht(t) {
    if ((typeof L == "function" && G(t), pt && typeof pt.setStrictMode == "function"))
      try {
        pt.setStrictMode(P, t);
      } catch {}
  }
  var Et = Math.clz32 ? Math.clz32 : u0,
    $t = Math.log,
    Yt = Math.LN2;
  function u0(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - (($t(t) / Yt) | 0)) | 0);
  }
  var lr = 256,
    rr = 262144,
    ur = 4194304;
  function Ca(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function or(t, e, n) {
    var i = t.pendingLanes;
    if (i === 0) return 0;
    var u = 0,
      s = t.suspendedLanes,
      m = t.pingedLanes;
    t = t.warmLanes;
    var E = i & 134217727;
    return (
      E !== 0
        ? ((i = E & ~s),
          i !== 0
            ? (u = Ca(i))
            : ((m &= E), m !== 0 ? (u = Ca(m)) : n || ((n = E & ~t), n !== 0 && (u = Ca(n)))))
        : ((E = i & ~s),
          E !== 0
            ? (u = Ca(E))
            : m !== 0
              ? (u = Ca(m))
              : n || ((n = i & ~t), n !== 0 && (u = Ca(n)))),
      u === 0
        ? 0
        : e !== 0 &&
            e !== u &&
            (e & s) === 0 &&
            ((s = u & -u), (n = e & -e), s >= n || (s === 32 && (n & 4194048) !== 0))
          ? e
          : u
    );
  }
  function Pi(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function o0(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ic() {
    var t = ur;
    return ((ur <<= 1), (ur & 62914560) === 0 && (ur = 4194304), t);
  }
  function Iu(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function Ji(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function s0(t, e, n, i, u, s) {
    var m = t.pendingLanes;
    ((t.pendingLanes = n),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= n),
      (t.entangledLanes &= n),
      (t.errorRecoveryDisabledLanes &= n),
      (t.shellSuspendCounter = 0));
    var E = t.entanglements,
      O = t.expirationTimes,
      H = t.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var I = 31 - Et(n),
        k = 1 << I;
      ((E[I] = 0), (O[I] = -1));
      var Y = H[I];
      if (Y !== null)
        for (H[I] = null, I = 0; I < Y.length; I++) {
          var X = Y[I];
          X !== null && (X.lane &= -536870913);
        }
      n &= ~k;
    }
    (i !== 0 && Fc(t, i, 0),
      s !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= s & ~(m & ~e)));
  }
  function Fc(t, e, n) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var i = 31 - Et(e);
    ((t.entangledLanes |= e),
      (t.entanglements[i] = t.entanglements[i] | 1073741824 | (n & 261930)));
  }
  function Pc(t, e) {
    var n = (t.entangledLanes |= e);
    for (t = t.entanglements; n; ) {
      var i = 31 - Et(n),
        u = 1 << i;
      ((u & e) | (t[i] & e) && (t[i] |= e), (n &= ~u));
    }
  }
  function Jc(t, e) {
    var n = e & -e;
    return ((n = (n & 42) !== 0 ? 1 : Fu(n)), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n);
  }
  function Fu(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Pu(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function kc() {
    var t = tt.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : jp(t.type));
  }
  function $c(t, e) {
    var n = tt.p;
    try {
      return ((tt.p = t), e());
    } finally {
      tt.p = n;
    }
  }
  var Qn = Math.random().toString(36).slice(2),
    ve = "__reactFiber$" + Qn,
    Ce = "__reactProps$" + Qn,
    ai = "__reactContainer$" + Qn,
    Ju = "__reactEvents$" + Qn,
    c0 = "__reactListeners$" + Qn,
    f0 = "__reactHandles$" + Qn,
    Wc = "__reactResources$" + Qn,
    ki = "__reactMarker$" + Qn;
  function ku(t) {
    (delete t[ve], delete t[Ce], delete t[Ju], delete t[c0], delete t[f0]);
  }
  function ii(t) {
    var e = t[ve];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if ((e = n[ai] || n[ve])) {
        if (((n = e.alternate), e.child !== null || (n !== null && n.child !== null)))
          for (t = Ep(t); t !== null; ) {
            if ((n = t[ve])) return n;
            t = Ep(t);
          }
        return e;
      }
      ((t = n), (n = t.parentNode));
    }
    return null;
  }
  function li(t) {
    if ((t = t[ve] || t[ai])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function $i(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function ri(t) {
    var e = t[Wc];
    return (e || (e = t[Wc] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function me(t) {
    t[ki] = !0;
  }
  var tf = new Set(),
    ef = {};
  function Oa(t, e) {
    (ui(t, e), ui(t + "Capture", e));
  }
  function ui(t, e) {
    for (ef[t] = e, t = 0; t < e.length; t++) tf.add(e[t]);
  }
  var d0 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    nf = {},
    af = {};
  function h0(t) {
    return vn.call(af, t)
      ? !0
      : vn.call(nf, t)
        ? !1
        : d0.test(t)
          ? (af[t] = !0)
          : ((nf[t] = !0), !1);
  }
  function sr(t, e, n) {
    if (h0(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var i = e.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
  }
  function cr(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + n);
    }
  }
  function Sn(t, e, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, "" + i);
    }
  }
  function Fe(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function lf(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function p0(t, e, n) {
    var i = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof i < "u" &&
      typeof i.get == "function" &&
      typeof i.set == "function"
    ) {
      var u = i.get,
        s = i.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (m) {
            ((n = "" + m), s.call(this, m));
          },
        }),
        Object.defineProperty(t, e, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (m) {
            n = "" + m;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function $u(t) {
    if (!t._valueTracker) {
      var e = lf(t) ? "checked" : "value";
      t._valueTracker = p0(t, e, "" + t[e]);
    }
  }
  function rf(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(),
      i = "";
    return (
      t && (i = lf(t) ? (t.checked ? "true" : "false") : t.value),
      (t = i),
      t !== n ? (e.setValue(t), !0) : !1
    );
  }
  function fr(t) {
    if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var m0 = /[\n"\\]/g;
  function Pe(t) {
    return t.replace(m0, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function Wu(t, e, n, i, u, s, m, E) {
    ((t.name = ""),
      m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean"
        ? (t.type = m)
        : t.removeAttribute("type"),
      e != null
        ? m === "number"
          ? ((e === 0 && t.value === "") || t.value != e) && (t.value = "" + Fe(e))
          : t.value !== "" + Fe(e) && (t.value = "" + Fe(e))
        : (m !== "submit" && m !== "reset") || t.removeAttribute("value"),
      e != null
        ? to(t, m, Fe(e))
        : n != null
          ? to(t, m, Fe(n))
          : i != null && t.removeAttribute("value"),
      u == null && s != null && (t.defaultChecked = !!s),
      u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean"
        ? (t.name = "" + Fe(E))
        : t.removeAttribute("name"));
  }
  function uf(t, e, n, i, u, s, m, E) {
    if (
      (s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        typeof s != "boolean" &&
        (t.type = s),
      e != null || n != null)
    ) {
      if (!((s !== "submit" && s !== "reset") || e != null)) {
        $u(t);
        return;
      }
      ((n = n != null ? "" + Fe(n) : ""),
        (e = e != null ? "" + Fe(e) : n),
        E || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((i = i ?? u),
      (i = typeof i != "function" && typeof i != "symbol" && !!i),
      (t.checked = E ? t.checked : !!i),
      (t.defaultChecked = !!i),
      m != null &&
        typeof m != "function" &&
        typeof m != "symbol" &&
        typeof m != "boolean" &&
        (t.name = m),
      $u(t));
  }
  function to(t, e, n) {
    (e === "number" && fr(t.ownerDocument) === t) ||
      t.defaultValue === "" + n ||
      (t.defaultValue = "" + n);
  }
  function oi(t, e, n, i) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < n.length; u++) e["$" + n[u]] = !0;
      for (n = 0; n < t.length; n++)
        ((u = e.hasOwnProperty("$" + t[n].value)),
          t[n].selected !== u && (t[n].selected = u),
          u && i && (t[n].defaultSelected = !0));
    } else {
      for (n = "" + Fe(n), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === n) {
          ((t[u].selected = !0), i && (t[u].defaultSelected = !0));
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function of(t, e, n) {
    if (e != null && ((e = "" + Fe(e)), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + Fe(n) : "";
  }
  function sf(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(o(92));
        if (Nt(i)) {
          if (1 < i.length) throw Error(o(93));
          i = i[0];
        }
        n = i;
      }
      (n == null && (n = ""), (e = n));
    }
    ((n = Fe(e)),
      (t.defaultValue = n),
      (i = t.textContent),
      i === n && i !== "" && i !== null && (t.value = i),
      $u(t));
  }
  function si(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var y0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function cf(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? i
        ? t.setProperty(e, "")
        : e === "float"
          ? (t.cssFloat = "")
          : (t[e] = "")
      : i
        ? t.setProperty(e, n)
        : typeof n != "number" || n === 0 || y0.has(e)
          ? e === "float"
            ? (t.cssFloat = n)
            : (t[e] = ("" + n).trim())
          : (t[e] = n + "px");
  }
  function ff(t, e, n) {
    if (e != null && typeof e != "object") throw Error(o(62));
    if (((t = t.style), n != null)) {
      for (var i in n)
        !n.hasOwnProperty(i) ||
          (e != null && e.hasOwnProperty(i)) ||
          (i.indexOf("--") === 0
            ? t.setProperty(i, "")
            : i === "float"
              ? (t.cssFloat = "")
              : (t[i] = ""));
      for (var u in e) ((i = e[u]), e.hasOwnProperty(u) && n[u] !== i && cf(t, u, i));
    } else for (var s in e) e.hasOwnProperty(s) && cf(t, s, e[s]);
  }
  function eo(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var g0 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    v0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function dr(t) {
    return v0.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function bn() {}
  var no = null;
  function ao(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ci = null,
    fi = null;
  function df(t) {
    var e = li(t);
    if (e && (t = e.stateNode)) {
      var n = t[Ce] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (Wu(
              t,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name,
            ),
            (e = n.name),
            n.type === "radio" && e != null)
          ) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll('input[name="' + Pe("" + e) + '"][type="radio"]'), e = 0;
              e < n.length;
              e++
            ) {
              var i = n[e];
              if (i !== t && i.form === t.form) {
                var u = i[Ce] || null;
                if (!u) throw Error(o(90));
                Wu(
                  i,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (e = 0; e < n.length; e++) ((i = n[e]), i.form === t.form && rf(i));
          }
          break t;
        case "textarea":
          of(t, n.value, n.defaultValue);
          break t;
        case "select":
          ((e = n.value), e != null && oi(t, !!n.multiple, e, !1));
      }
    }
  }
  var io = !1;
  function hf(t, e, n) {
    if (io) return t(e, n);
    io = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (
        ((io = !1),
        (ci !== null || fi !== null) &&
          (Wr(), ci && ((e = ci), (t = fi), (fi = ci = null), df(e), t)))
      )
        for (e = 0; e < t.length; e++) df(t[e]);
    }
  }
  function Wi(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[Ce] || null;
    if (i === null) return null;
    n = i[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((i = !i.disabled) ||
          ((t = t.type),
          (i = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
          (t = !i));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function") throw Error(o(231, e, typeof n));
    return n;
  }
  var En = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    lo = !1;
  if (En)
    try {
      var tl = {};
      (Object.defineProperty(tl, "passive", {
        get: function () {
          lo = !0;
        },
      }),
        window.addEventListener("test", tl, tl),
        window.removeEventListener("test", tl, tl));
    } catch {
      lo = !1;
    }
  var Zn = null,
    ro = null,
    hr = null;
  function pf() {
    if (hr) return hr;
    var t,
      e = ro,
      n = e.length,
      i,
      u = "value" in Zn ? Zn.value : Zn.textContent,
      s = u.length;
    for (t = 0; t < n && e[t] === u[t]; t++);
    var m = n - t;
    for (i = 1; i <= m && e[n - i] === u[s - i]; i++);
    return (hr = u.slice(t, 1 < i ? 1 - i : void 0));
  }
  function pr(t) {
    var e = t.keyCode;
    return (
      "charCode" in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function mr() {
    return !0;
  }
  function mf() {
    return !1;
  }
  function Oe(t) {
    function e(n, i, u, s, m) {
      ((this._reactName = n),
        (this._targetInst = u),
        (this.type = i),
        (this.nativeEvent = s),
        (this.target = m),
        (this.currentTarget = null));
      for (var E in t) t.hasOwnProperty(E) && ((n = t[E]), (this[E] = n ? n(s) : s[E]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? mr
          : mf),
        (this.isPropagationStopped = mf),
        this
      );
    }
    return (
      S(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = mr));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = mr));
        },
        persist: function () {},
        isPersistent: mr,
      }),
      e
    );
  }
  var za = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    yr = Oe(za),
    el = S({}, za, { view: 0, detail: 0 }),
    S0 = Oe(el),
    uo,
    oo,
    nl,
    gr = S({}, el, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: co,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== nl &&
              (nl && t.type === "mousemove"
                ? ((uo = t.screenX - nl.screenX), (oo = t.screenY - nl.screenY))
                : (oo = uo = 0),
              (nl = t)),
            uo);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : oo;
      },
    }),
    yf = Oe(gr),
    b0 = S({}, gr, { dataTransfer: 0 }),
    E0 = Oe(b0),
    _0 = S({}, el, { relatedTarget: 0 }),
    so = Oe(_0),
    x0 = S({}, za, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    A0 = Oe(x0),
    w0 = S({}, za, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    R0 = Oe(w0),
    T0 = S({}, za, { data: 0 }),
    gf = Oe(T0),
    M0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    C0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    O0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function z0(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = O0[t]) ? !!e[t] : !1;
  }
  function co() {
    return z0;
  }
  var B0 = S({}, el, {
      key: function (t) {
        if (t.key) {
          var e = M0[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = pr(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? C0[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: co,
      charCode: function (t) {
        return t.type === "keypress" ? pr(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? pr(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    U0 = Oe(B0),
    D0 = S({}, gr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    vf = Oe(D0),
    L0 = S({}, el, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: co,
    }),
    N0 = Oe(L0),
    j0 = S({}, za, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    H0 = Oe(j0),
    q0 = S({}, gr, {
      deltaX: function (t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Y0 = Oe(q0),
    G0 = S({}, za, { newState: 0, oldState: 0 }),
    V0 = Oe(G0),
    X0 = [9, 13, 27, 32],
    fo = En && "CompositionEvent" in window,
    al = null;
  En && "documentMode" in document && (al = document.documentMode);
  var Q0 = En && "TextEvent" in window && !al,
    Sf = En && (!fo || (al && 8 < al && 11 >= al)),
    bf = " ",
    Ef = !1;
  function _f(t, e) {
    switch (t) {
      case "keyup":
        return X0.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function xf(t) {
    return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
  }
  var di = !1;
  function Z0(t, e) {
    switch (t) {
      case "compositionend":
        return xf(e);
      case "keypress":
        return e.which !== 32 ? null : ((Ef = !0), bf);
      case "textInput":
        return ((t = e.data), t === bf && Ef ? null : t);
      default:
        return null;
    }
  }
  function K0(t, e) {
    if (di)
      return t === "compositionend" || (!fo && _f(t, e))
        ? ((t = pf()), (hr = ro = Zn = null), (di = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Sf && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var I0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Af(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!I0[t.type] : e === "textarea";
  }
  function wf(t, e, n, i) {
    (ci ? (fi ? fi.push(i) : (fi = [i])) : (ci = i),
      (e = ru(e, "onChange")),
      0 < e.length &&
        ((n = new yr("onChange", "change", null, n, i)), t.push({ event: n, listeners: e })));
  }
  var il = null,
    ll = null;
  function F0(t) {
    up(t, 0);
  }
  function vr(t) {
    var e = $i(t);
    if (rf(e)) return t;
  }
  function Rf(t, e) {
    if (t === "change") return e;
  }
  var Tf = !1;
  if (En) {
    var ho;
    if (En) {
      var po = "oninput" in document;
      if (!po) {
        var Mf = document.createElement("div");
        (Mf.setAttribute("oninput", "return;"), (po = typeof Mf.oninput == "function"));
      }
      ho = po;
    } else ho = !1;
    Tf = ho && (!document.documentMode || 9 < document.documentMode);
  }
  function Cf() {
    il && (il.detachEvent("onpropertychange", Of), (ll = il = null));
  }
  function Of(t) {
    if (t.propertyName === "value" && vr(ll)) {
      var e = [];
      (wf(e, ll, t, ao(t)), hf(F0, e));
    }
  }
  function P0(t, e, n) {
    t === "focusin"
      ? (Cf(), (il = e), (ll = n), il.attachEvent("onpropertychange", Of))
      : t === "focusout" && Cf();
  }
  function J0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return vr(ll);
  }
  function k0(t, e) {
    if (t === "click") return vr(e);
  }
  function $0(t, e) {
    if (t === "input" || t === "change") return vr(e);
  }
  function W0(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var qe = typeof Object.is == "function" ? Object.is : W0;
  function rl(t, e) {
    if (qe(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
    var n = Object.keys(t),
      i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var u = n[i];
      if (!vn.call(e, u) || !qe(t[u], e[u])) return !1;
    }
    return !0;
  }
  function zf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Bf(t, e) {
    var n = zf(t);
    t = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (((i = t + n.textContent.length), t <= e && i >= e)) return { node: n, offset: e - t };
        t = i;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = zf(n);
    }
  }
  function Uf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Uf(t, e.parentNode)
            : "contains" in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function Df(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = fr(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = fr(t.document);
    }
    return e;
  }
  function mo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var tg = En && "documentMode" in document && 11 >= document.documentMode,
    hi = null,
    yo = null,
    ul = null,
    go = !1;
  function Lf(t, e, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    go ||
      hi == null ||
      hi !== fr(i) ||
      ((i = hi),
      "selectionStart" in i && mo(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = ((i.ownerDocument && i.ownerDocument.defaultView) || window).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (ul && rl(ul, i)) ||
        ((ul = i),
        (i = ru(yo, "onSelect")),
        0 < i.length &&
          ((e = new yr("onSelect", "select", null, e, n)),
          t.push({ event: e, listeners: i }),
          (e.target = hi))));
  }
  function Ba(t, e) {
    var n = {};
    return (
      (n[t.toLowerCase()] = e.toLowerCase()),
      (n["Webkit" + t] = "webkit" + e),
      (n["Moz" + t] = "moz" + e),
      n
    );
  }
  var pi = {
      animationend: Ba("Animation", "AnimationEnd"),
      animationiteration: Ba("Animation", "AnimationIteration"),
      animationstart: Ba("Animation", "AnimationStart"),
      transitionrun: Ba("Transition", "TransitionRun"),
      transitionstart: Ba("Transition", "TransitionStart"),
      transitioncancel: Ba("Transition", "TransitionCancel"),
      transitionend: Ba("Transition", "TransitionEnd"),
    },
    vo = {},
    Nf = {};
  En &&
    ((Nf = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete pi.animationend.animation,
      delete pi.animationiteration.animation,
      delete pi.animationstart.animation),
    "TransitionEvent" in window || delete pi.transitionend.transition);
  function Ua(t) {
    if (vo[t]) return vo[t];
    if (!pi[t]) return t;
    var e = pi[t],
      n;
    for (n in e) if (e.hasOwnProperty(n) && n in Nf) return (vo[t] = e[n]);
    return t;
  }
  var jf = Ua("animationend"),
    Hf = Ua("animationiteration"),
    qf = Ua("animationstart"),
    eg = Ua("transitionrun"),
    ng = Ua("transitionstart"),
    ag = Ua("transitioncancel"),
    Yf = Ua("transitionend"),
    Gf = new Map(),
    So =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  So.push("scrollEnd");
  function on(t, e) {
    (Gf.set(t, e), Oa(e, [t]));
  }
  var Sr =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" && t !== null && typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    Je = [],
    mi = 0,
    bo = 0;
  function br() {
    for (var t = mi, e = (bo = mi = 0); e < t; ) {
      var n = Je[e];
      Je[e++] = null;
      var i = Je[e];
      Je[e++] = null;
      var u = Je[e];
      Je[e++] = null;
      var s = Je[e];
      if (((Je[e++] = null), i !== null && u !== null)) {
        var m = i.pending;
        (m === null ? (u.next = u) : ((u.next = m.next), (m.next = u)), (i.pending = u));
      }
      s !== 0 && Vf(n, u, s);
    }
  }
  function Er(t, e, n, i) {
    ((Je[mi++] = t),
      (Je[mi++] = e),
      (Je[mi++] = n),
      (Je[mi++] = i),
      (bo |= i),
      (t.lanes |= i),
      (t = t.alternate),
      t !== null && (t.lanes |= i));
  }
  function Eo(t, e, n, i) {
    return (Er(t, e, n, i), _r(t));
  }
  function Da(t, e) {
    return (Er(t, null, null, e), _r(t));
  }
  function Vf(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var u = !1, s = t.return; s !== null; )
      ((s.childLanes |= n),
        (i = s.alternate),
        i !== null && (i.childLanes |= n),
        s.tag === 22 && ((t = s.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = s),
        (s = s.return));
    return t.tag === 3
      ? ((s = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - Et(n)),
          (t = s.hiddenUpdates),
          (i = t[u]),
          i === null ? (t[u] = [e]) : i.push(e),
          (e.lane = n | 536870912)),
        s)
      : null;
  }
  function _r(t) {
    if (50 < Cl) throw ((Cl = 0), (Os = null), Error(o(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var yi = {};
  function ig(t, e, n, i) {
    ((this.tag = t),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Ye(t, e, n, i) {
    return new ig(t, e, n, i);
  }
  function _o(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function _n(t, e) {
    var n = t.alternate;
    return (
      n === null
        ? ((n = Ye(t.tag, e, t.key, t.mode)),
          (n.elementType = t.elementType),
          (n.type = t.type),
          (n.stateNode = t.stateNode),
          (n.alternate = t),
          (t.alternate = n))
        : ((n.pendingProps = e),
          (n.type = t.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = t.flags & 65011712),
      (n.childLanes = t.childLanes),
      (n.lanes = t.lanes),
      (n.child = t.child),
      (n.memoizedProps = t.memoizedProps),
      (n.memoizedState = t.memoizedState),
      (n.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (n.sibling = t.sibling),
      (n.index = t.index),
      (n.ref = t.ref),
      (n.refCleanup = t.refCleanup),
      n
    );
  }
  function Xf(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return (
      n === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = n.childLanes),
          (t.lanes = n.lanes),
          (t.child = n.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = n.memoizedProps),
          (t.memoizedState = n.memoizedState),
          (t.updateQueue = n.updateQueue),
          (t.type = n.type),
          (e = n.dependencies),
          (t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function xr(t, e, n, i, u, s) {
    var m = 0;
    if (((i = t), typeof t == "function")) _o(t) && (m = 1);
    else if (typeof t == "string")
      m = sv(t, n, lt.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case it:
          return ((t = Ye(31, n, e, u)), (t.elementType = it), (t.lanes = s), t);
        case D:
          return La(n.children, u, s, e);
        case C:
          ((m = 8), (u |= 24));
          break;
        case B:
          return ((t = Ye(12, n, e, u | 2)), (t.elementType = B), (t.lanes = s), t);
        case $:
          return ((t = Ye(13, n, e, u)), (t.elementType = $), (t.lanes = s), t);
        case nt:
          return ((t = Ye(19, n, e, u)), (t.elementType = nt), (t.lanes = s), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Q:
                m = 10;
                break t;
              case q:
                m = 9;
                break t;
              case V:
                m = 11;
                break t;
              case F:
                m = 14;
                break t;
              case et:
                ((m = 16), (i = null));
                break t;
            }
          ((m = 29), (n = Error(o(130, t === null ? "null" : typeof t, ""))), (i = null));
      }
    return ((e = Ye(m, n, e, u)), (e.elementType = t), (e.type = i), (e.lanes = s), e);
  }
  function La(t, e, n, i) {
    return ((t = Ye(7, t, i, e)), (t.lanes = n), t);
  }
  function xo(t, e, n) {
    return ((t = Ye(6, t, null, e)), (t.lanes = n), t);
  }
  function Qf(t) {
    var e = Ye(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function Ao(t, e, n) {
    return (
      (e = Ye(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = n),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Zf = new WeakMap();
  function ke(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Zf.get(t);
      return n !== void 0 ? n : ((e = { value: t, source: e, stack: un(e) }), Zf.set(t, e), e);
    }
    return { value: t, source: e, stack: un(e) };
  }
  var gi = [],
    vi = 0,
    Ar = null,
    ol = 0,
    $e = [],
    We = 0,
    Kn = null,
    dn = 1,
    hn = "";
  function xn(t, e) {
    ((gi[vi++] = ol), (gi[vi++] = Ar), (Ar = t), (ol = e));
  }
  function Kf(t, e, n) {
    (($e[We++] = dn), ($e[We++] = hn), ($e[We++] = Kn), (Kn = t));
    var i = dn;
    t = hn;
    var u = 32 - Et(i) - 1;
    ((i &= ~(1 << u)), (n += 1));
    var s = 32 - Et(e) + u;
    if (30 < s) {
      var m = u - (u % 5);
      ((s = (i & ((1 << m) - 1)).toString(32)),
        (i >>= m),
        (u -= m),
        (dn = (1 << (32 - Et(e) + u)) | (n << u) | i),
        (hn = s + t));
    } else ((dn = (1 << s) | (n << u) | i), (hn = t));
  }
  function wo(t) {
    t.return !== null && (xn(t, 1), Kf(t, 1, 0));
  }
  function Ro(t) {
    for (; t === Ar; ) ((Ar = gi[--vi]), (gi[vi] = null), (ol = gi[--vi]), (gi[vi] = null));
    for (; t === Kn; )
      ((Kn = $e[--We]),
        ($e[We] = null),
        (hn = $e[--We]),
        ($e[We] = null),
        (dn = $e[--We]),
        ($e[We] = null));
  }
  function If(t, e) {
    (($e[We++] = dn), ($e[We++] = hn), ($e[We++] = Kn), (dn = e.id), (hn = e.overflow), (Kn = t));
  }
  var Se = null,
    Jt = null,
    Ct = !1,
    In = null,
    tn = !1,
    To = Error(o(519));
  function Fn(t) {
    var e = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""),
    );
    throw (sl(ke(e, t)), To);
  }
  function Ff(t) {
    var e = t.stateNode,
      n = t.type,
      i = t.memoizedProps;
    switch (((e[ve] = t), (e[Ce] = i), n)) {
      case "dialog":
        (At("cancel", e), At("close", e));
        break;
      case "iframe":
      case "object":
      case "embed":
        At("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < zl.length; n++) At(zl[n], e);
        break;
      case "source":
        At("error", e);
        break;
      case "img":
      case "image":
      case "link":
        (At("error", e), At("load", e));
        break;
      case "details":
        At("toggle", e);
        break;
      case "input":
        (At("invalid", e),
          uf(e, i.value, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name, !0));
        break;
      case "select":
        At("invalid", e);
        break;
      case "textarea":
        (At("invalid", e), sf(e, i.value, i.defaultValue, i.children));
    }
    ((n = i.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      e.textContent === "" + n ||
      i.suppressHydrationWarning === !0 ||
      fp(e.textContent, n)
        ? (i.popover != null && (At("beforetoggle", e), At("toggle", e)),
          i.onScroll != null && At("scroll", e),
          i.onScrollEnd != null && At("scrollend", e),
          i.onClick != null && (e.onclick = bn),
          (e = !0))
        : (e = !1),
      e || Fn(t, !0));
  }
  function Pf(t) {
    for (Se = t.return; Se; )
      switch (Se.tag) {
        case 5:
        case 31:
        case 13:
          tn = !1;
          return;
        case 27:
        case 3:
          tn = !0;
          return;
        default:
          Se = Se.return;
      }
  }
  function Si(t) {
    if (t !== Se) return !1;
    if (!Ct) return (Pf(t), (Ct = !0), !1);
    var e = t.tag,
      n;
    if (
      ((n = e !== 3 && e !== 27) &&
        ((n = e === 5) &&
          ((n = t.type), (n = !(n !== "form" && n !== "button") || Zs(t.type, t.memoizedProps))),
        (n = !n)),
      n && Jt && Fn(t),
      Pf(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Jt = bp(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(o(317));
      Jt = bp(t);
    } else
      e === 27
        ? ((e = Jt), oa(t.type) ? ((t = Js), (Js = null), (Jt = t)) : (Jt = e))
        : (Jt = Se ? nn(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Na() {
    ((Jt = Se = null), (Ct = !1));
  }
  function Mo() {
    var t = In;
    return (t !== null && (De === null ? (De = t) : De.push.apply(De, t), (In = null)), t);
  }
  function sl(t) {
    In === null ? (In = [t]) : In.push(t);
  }
  var Co = z(null),
    ja = null,
    An = null;
  function Pn(t, e, n) {
    (at(Co, e._currentValue), (e._currentValue = n));
  }
  function wn(t) {
    ((t._currentValue = Co.current), K(Co));
  }
  function Oo(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), i !== null && (i.childLanes |= e))
          : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e),
        t === n)
      )
        break;
      t = t.return;
    }
  }
  function zo(t, e, n, i) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var s = u.dependencies;
      if (s !== null) {
        var m = u.child;
        s = s.firstContext;
        t: for (; s !== null; ) {
          var E = s;
          s = u;
          for (var O = 0; O < e.length; O++)
            if (E.context === e[O]) {
              ((s.lanes |= n),
                (E = s.alternate),
                E !== null && (E.lanes |= n),
                Oo(s.return, n, t),
                i || (m = null));
              break t;
            }
          s = E.next;
        }
      } else if (u.tag === 18) {
        if (((m = u.return), m === null)) throw Error(o(341));
        ((m.lanes |= n), (s = m.alternate), s !== null && (s.lanes |= n), Oo(m, n, t), (m = null));
      } else m = u.child;
      if (m !== null) m.return = u;
      else
        for (m = u; m !== null; ) {
          if (m === t) {
            m = null;
            break;
          }
          if (((u = m.sibling), u !== null)) {
            ((u.return = m.return), (m = u));
            break;
          }
          m = m.return;
        }
      u = m;
    }
  }
  function bi(t, e, n, i) {
    t = null;
    for (var u = e, s = !1; u !== null; ) {
      if (!s) {
        if ((u.flags & 524288) !== 0) s = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var m = u.alternate;
        if (m === null) throw Error(o(387));
        if (((m = m.memoizedProps), m !== null)) {
          var E = u.type;
          qe(u.pendingProps.value, m.value) || (t !== null ? t.push(E) : (t = [E]));
        }
      } else if (u === wt.current) {
        if (((m = u.alternate), m === null)) throw Error(o(387));
        m.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(Nl) : (t = [Nl]));
      }
      u = u.return;
    }
    (t !== null && zo(e, t, n, i), (e.flags |= 262144));
  }
  function wr(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!qe(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Ha(t) {
    ((ja = t), (An = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function be(t) {
    return Jf(ja, t);
  }
  function Rr(t, e) {
    return (ja === null && Ha(t), Jf(t, e));
  }
  function Jf(t, e) {
    var n = e._currentValue;
    if (((e = { context: e, memoizedValue: n, next: null }), An === null)) {
      if (t === null) throw Error(o(308));
      ((An = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else An = An.next = e;
    return n;
  }
  var lg =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (n, i) {
                  t.push(i);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (n) {
                  return n();
                }));
            };
          },
    rg = a.unstable_scheduleCallback,
    ug = a.unstable_NormalPriority,
    le = {
      $$typeof: Q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Bo() {
    return { controller: new lg(), data: new Map(), refCount: 0 };
  }
  function cl(t) {
    (t.refCount--,
      t.refCount === 0 &&
        rg(ug, function () {
          t.controller.abort();
        }));
  }
  var fl = null,
    Uo = 0,
    Ei = 0,
    _i = null;
  function og(t, e) {
    if (fl === null) {
      var n = (fl = []);
      ((Uo = 0),
        (Ei = Ns()),
        (_i = {
          status: "pending",
          value: void 0,
          then: function (i) {
            n.push(i);
          },
        }));
    }
    return (Uo++, e.then(kf, kf), e);
  }
  function kf() {
    if (--Uo === 0 && fl !== null) {
      _i !== null && (_i.status = "fulfilled");
      var t = fl;
      ((fl = null), (Ei = 0), (_i = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function sg(t, e) {
    var n = [],
      i = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          n.push(u);
        },
      };
    return (
      t.then(
        function () {
          ((i.status = "fulfilled"), (i.value = e));
          for (var u = 0; u < n.length; u++) (0, n[u])(e);
        },
        function (u) {
          for (i.status = "rejected", i.reason = u, u = 0; u < n.length; u++) (0, n[u])(void 0);
        },
      ),
      i
    );
  }
  var $f = Z.S;
  Z.S = function (t, e) {
    ((Lh = pe()),
      typeof e == "object" && e !== null && typeof e.then == "function" && og(t, e),
      $f !== null && $f(t, e));
  };
  var qa = z(null);
  function Do() {
    var t = qa.current;
    return t !== null ? t : It.pooledCache;
  }
  function Tr(t, e) {
    e === null ? at(qa, qa.current) : at(qa, e.pool);
  }
  function Wf() {
    var t = Do();
    return t === null ? null : { parent: le._currentValue, pool: t };
  }
  var xi = Error(o(460)),
    Lo = Error(o(474)),
    Mr = Error(o(542)),
    Cr = { then: function () {} };
  function td(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function ed(t, e, n) {
    switch (
      ((n = t[n]), n === void 0 ? t.push(e) : n !== e && (e.then(bn, bn), (e = n)), e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), ad(t), t);
      default:
        if (typeof e.status == "string") e.then(bn, bn);
        else {
          if (((t = It), t !== null && 100 < t.shellSuspendCounter)) throw Error(o(482));
          ((t = e),
            (t.status = "pending"),
            t.then(
              function (i) {
                if (e.status === "pending") {
                  var u = e;
                  ((u.status = "fulfilled"), (u.value = i));
                }
              },
              function (i) {
                if (e.status === "pending") {
                  var u = e;
                  ((u.status = "rejected"), (u.reason = i));
                }
              },
            ));
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), ad(t), t);
        }
        throw ((Ga = e), xi);
    }
  }
  function Ya(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? ((Ga = n), xi) : n;
    }
  }
  var Ga = null;
  function nd() {
    if (Ga === null) throw Error(o(459));
    var t = Ga;
    return ((Ga = null), t);
  }
  function ad(t) {
    if (t === xi || t === Mr) throw Error(o(483));
  }
  var Ai = null,
    dl = 0;
  function Or(t) {
    var e = dl;
    return ((dl += 1), Ai === null && (Ai = []), ed(Ai, t, e));
  }
  function hl(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function zr(t, e) {
    throw e.$$typeof === A
      ? Error(o(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          o(
            31,
            t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t,
          ),
        ));
  }
  function id(t) {
    function e(N, U) {
      if (t) {
        var j = N.deletions;
        j === null ? ((N.deletions = [U]), (N.flags |= 16)) : j.push(U);
      }
    }
    function n(N, U) {
      if (!t) return null;
      for (; U !== null; ) (e(N, U), (U = U.sibling));
      return null;
    }
    function i(N) {
      for (var U = new Map(); N !== null; )
        (N.key !== null ? U.set(N.key, N) : U.set(N.index, N), (N = N.sibling));
      return U;
    }
    function u(N, U) {
      return ((N = _n(N, U)), (N.index = 0), (N.sibling = null), N);
    }
    function s(N, U, j) {
      return (
        (N.index = j),
        t
          ? ((j = N.alternate),
            j !== null
              ? ((j = j.index), j < U ? ((N.flags |= 67108866), U) : j)
              : ((N.flags |= 67108866), U))
          : ((N.flags |= 1048576), U)
      );
    }
    function m(N) {
      return (t && N.alternate === null && (N.flags |= 67108866), N);
    }
    function E(N, U, j, J) {
      return U === null || U.tag !== 6
        ? ((U = xo(j, N.mode, J)), (U.return = N), U)
        : ((U = u(U, j)), (U.return = N), U);
    }
    function O(N, U, j, J) {
      var dt = j.type;
      return dt === D
        ? I(N, U, j.props.children, J, j.key)
        : U !== null &&
            (U.elementType === dt ||
              (typeof dt == "object" && dt !== null && dt.$$typeof === et && Ya(dt) === U.type))
          ? ((U = u(U, j.props)), hl(U, j), (U.return = N), U)
          : ((U = xr(j.type, j.key, j.props, null, N.mode, J)), hl(U, j), (U.return = N), U);
    }
    function H(N, U, j, J) {
      return U === null ||
        U.tag !== 4 ||
        U.stateNode.containerInfo !== j.containerInfo ||
        U.stateNode.implementation !== j.implementation
        ? ((U = Ao(j, N.mode, J)), (U.return = N), U)
        : ((U = u(U, j.children || [])), (U.return = N), U);
    }
    function I(N, U, j, J, dt) {
      return U === null || U.tag !== 7
        ? ((U = La(j, N.mode, J, dt)), (U.return = N), U)
        : ((U = u(U, j)), (U.return = N), U);
    }
    function k(N, U, j) {
      if ((typeof U == "string" && U !== "") || typeof U == "number" || typeof U == "bigint")
        return ((U = xo("" + U, N.mode, j)), (U.return = N), U);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case x:
            return ((j = xr(U.type, U.key, U.props, null, N.mode, j)), hl(j, U), (j.return = N), j);
          case M:
            return ((U = Ao(U, N.mode, j)), (U.return = N), U);
          case et:
            return ((U = Ya(U)), k(N, U, j));
        }
        if (Nt(U) || St(U)) return ((U = La(U, N.mode, j, null)), (U.return = N), U);
        if (typeof U.then == "function") return k(N, Or(U), j);
        if (U.$$typeof === Q) return k(N, Rr(N, U), j);
        zr(N, U);
      }
      return null;
    }
    function Y(N, U, j, J) {
      var dt = U !== null ? U.key : null;
      if ((typeof j == "string" && j !== "") || typeof j == "number" || typeof j == "bigint")
        return dt !== null ? null : E(N, U, "" + j, J);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case x:
            return j.key === dt ? O(N, U, j, J) : null;
          case M:
            return j.key === dt ? H(N, U, j, J) : null;
          case et:
            return ((j = Ya(j)), Y(N, U, j, J));
        }
        if (Nt(j) || St(j)) return dt !== null ? null : I(N, U, j, J, null);
        if (typeof j.then == "function") return Y(N, U, Or(j), J);
        if (j.$$typeof === Q) return Y(N, U, Rr(N, j), J);
        zr(N, j);
      }
      return null;
    }
    function X(N, U, j, J, dt) {
      if ((typeof J == "string" && J !== "") || typeof J == "number" || typeof J == "bigint")
        return ((N = N.get(j) || null), E(U, N, "" + J, dt));
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case x:
            return ((N = N.get(J.key === null ? j : J.key) || null), O(U, N, J, dt));
          case M:
            return ((N = N.get(J.key === null ? j : J.key) || null), H(U, N, J, dt));
          case et:
            return ((J = Ya(J)), X(N, U, j, J, dt));
        }
        if (Nt(J) || St(J)) return ((N = N.get(j) || null), I(U, N, J, dt, null));
        if (typeof J.then == "function") return X(N, U, j, Or(J), dt);
        if (J.$$typeof === Q) return X(N, U, j, Rr(U, J), dt);
        zr(U, J);
      }
      return null;
    }
    function ut(N, U, j, J) {
      for (
        var dt = null, Ut = null, ct = U, bt = (U = 0), Tt = null;
        ct !== null && bt < j.length;
        bt++
      ) {
        ct.index > bt ? ((Tt = ct), (ct = null)) : (Tt = ct.sibling);
        var Dt = Y(N, ct, j[bt], J);
        if (Dt === null) {
          ct === null && (ct = Tt);
          break;
        }
        (t && ct && Dt.alternate === null && e(N, ct),
          (U = s(Dt, U, bt)),
          Ut === null ? (dt = Dt) : (Ut.sibling = Dt),
          (Ut = Dt),
          (ct = Tt));
      }
      if (bt === j.length) return (n(N, ct), Ct && xn(N, bt), dt);
      if (ct === null) {
        for (; bt < j.length; bt++)
          ((ct = k(N, j[bt], J)),
            ct !== null &&
              ((U = s(ct, U, bt)), Ut === null ? (dt = ct) : (Ut.sibling = ct), (Ut = ct)));
        return (Ct && xn(N, bt), dt);
      }
      for (ct = i(ct); bt < j.length; bt++)
        ((Tt = X(ct, N, bt, j[bt], J)),
          Tt !== null &&
            (t && Tt.alternate !== null && ct.delete(Tt.key === null ? bt : Tt.key),
            (U = s(Tt, U, bt)),
            Ut === null ? (dt = Tt) : (Ut.sibling = Tt),
            (Ut = Tt)));
      return (
        t &&
          ct.forEach(function (ha) {
            return e(N, ha);
          }),
        Ct && xn(N, bt),
        dt
      );
    }
    function mt(N, U, j, J) {
      if (j == null) throw Error(o(151));
      for (
        var dt = null, Ut = null, ct = U, bt = (U = 0), Tt = null, Dt = j.next();
        ct !== null && !Dt.done;
        bt++, Dt = j.next()
      ) {
        ct.index > bt ? ((Tt = ct), (ct = null)) : (Tt = ct.sibling);
        var ha = Y(N, ct, Dt.value, J);
        if (ha === null) {
          ct === null && (ct = Tt);
          break;
        }
        (t && ct && ha.alternate === null && e(N, ct),
          (U = s(ha, U, bt)),
          Ut === null ? (dt = ha) : (Ut.sibling = ha),
          (Ut = ha),
          (ct = Tt));
      }
      if (Dt.done) return (n(N, ct), Ct && xn(N, bt), dt);
      if (ct === null) {
        for (; !Dt.done; bt++, Dt = j.next())
          ((Dt = k(N, Dt.value, J)),
            Dt !== null &&
              ((U = s(Dt, U, bt)), Ut === null ? (dt = Dt) : (Ut.sibling = Dt), (Ut = Dt)));
        return (Ct && xn(N, bt), dt);
      }
      for (ct = i(ct); !Dt.done; bt++, Dt = j.next())
        ((Dt = X(ct, N, bt, Dt.value, J)),
          Dt !== null &&
            (t && Dt.alternate !== null && ct.delete(Dt.key === null ? bt : Dt.key),
            (U = s(Dt, U, bt)),
            Ut === null ? (dt = Dt) : (Ut.sibling = Dt),
            (Ut = Dt)));
      return (
        t &&
          ct.forEach(function (bv) {
            return e(N, bv);
          }),
        Ct && xn(N, bt),
        dt
      );
    }
    function Kt(N, U, j, J) {
      if (
        (typeof j == "object" &&
          j !== null &&
          j.type === D &&
          j.key === null &&
          (j = j.props.children),
        typeof j == "object" && j !== null)
      ) {
        switch (j.$$typeof) {
          case x:
            t: {
              for (var dt = j.key; U !== null; ) {
                if (U.key === dt) {
                  if (((dt = j.type), dt === D)) {
                    if (U.tag === 7) {
                      (n(N, U.sibling), (J = u(U, j.props.children)), (J.return = N), (N = J));
                      break t;
                    }
                  } else if (
                    U.elementType === dt ||
                    (typeof dt == "object" &&
                      dt !== null &&
                      dt.$$typeof === et &&
                      Ya(dt) === U.type)
                  ) {
                    (n(N, U.sibling), (J = u(U, j.props)), hl(J, j), (J.return = N), (N = J));
                    break t;
                  }
                  n(N, U);
                  break;
                } else e(N, U);
                U = U.sibling;
              }
              j.type === D
                ? ((J = La(j.props.children, N.mode, J, j.key)), (J.return = N), (N = J))
                : ((J = xr(j.type, j.key, j.props, null, N.mode, J)),
                  hl(J, j),
                  (J.return = N),
                  (N = J));
            }
            return m(N);
          case M:
            t: {
              for (dt = j.key; U !== null; ) {
                if (U.key === dt)
                  if (
                    U.tag === 4 &&
                    U.stateNode.containerInfo === j.containerInfo &&
                    U.stateNode.implementation === j.implementation
                  ) {
                    (n(N, U.sibling), (J = u(U, j.children || [])), (J.return = N), (N = J));
                    break t;
                  } else {
                    n(N, U);
                    break;
                  }
                else e(N, U);
                U = U.sibling;
              }
              ((J = Ao(j, N.mode, J)), (J.return = N), (N = J));
            }
            return m(N);
          case et:
            return ((j = Ya(j)), Kt(N, U, j, J));
        }
        if (Nt(j)) return ut(N, U, j, J);
        if (St(j)) {
          if (((dt = St(j)), typeof dt != "function")) throw Error(o(150));
          return ((j = dt.call(j)), mt(N, U, j, J));
        }
        if (typeof j.then == "function") return Kt(N, U, Or(j), J);
        if (j.$$typeof === Q) return Kt(N, U, Rr(N, j), J);
        zr(N, j);
      }
      return (typeof j == "string" && j !== "") || typeof j == "number" || typeof j == "bigint"
        ? ((j = "" + j),
          U !== null && U.tag === 6
            ? (n(N, U.sibling), (J = u(U, j)), (J.return = N), (N = J))
            : (n(N, U), (J = xo(j, N.mode, J)), (J.return = N), (N = J)),
          m(N))
        : n(N, U);
    }
    return function (N, U, j, J) {
      try {
        dl = 0;
        var dt = Kt(N, U, j, J);
        return ((Ai = null), dt);
      } catch (ct) {
        if (ct === xi || ct === Mr) throw ct;
        var Ut = Ye(29, ct, null, N.mode);
        return ((Ut.lanes = J), (Ut.return = N), Ut);
      }
    };
  }
  var Va = id(!0),
    ld = id(!1),
    Jn = !1;
  function No(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function jo(t, e) {
    ((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function kn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function $n(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (qt & 2) !== 0)) {
      var u = i.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (i.pending = e),
        (e = _r(t)),
        Vf(t, null, n),
        e
      );
    }
    return (Er(t, i, e, n), _r(t));
  }
  function pl(t, e, n) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194048) !== 0))) {
      var i = e.lanes;
      ((i &= t.pendingLanes), (n |= i), (e.lanes = n), Pc(t, n));
    }
  }
  function Ho(t, e) {
    var n = t.updateQueue,
      i = t.alternate;
    if (i !== null && ((i = i.updateQueue), n === i)) {
      var u = null,
        s = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var m = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
          (s === null ? (u = s = m) : (s = s.next = m), (n = n.next));
        } while (n !== null);
        s === null ? (u = s = e) : (s = s.next = e);
      } else u = s = e;
      ((n = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: s,
        shared: i.shared,
        callbacks: i.callbacks,
      }),
        (t.updateQueue = n));
      return;
    }
    ((t = n.lastBaseUpdate),
      t === null ? (n.firstBaseUpdate = e) : (t.next = e),
      (n.lastBaseUpdate = e));
  }
  var qo = !1;
  function ml() {
    if (qo) {
      var t = _i;
      if (t !== null) throw t;
    }
  }
  function yl(t, e, n, i) {
    qo = !1;
    var u = t.updateQueue;
    Jn = !1;
    var s = u.firstBaseUpdate,
      m = u.lastBaseUpdate,
      E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var O = E,
        H = O.next;
      ((O.next = null), m === null ? (s = H) : (m.next = H), (m = O));
      var I = t.alternate;
      I !== null &&
        ((I = I.updateQueue),
        (E = I.lastBaseUpdate),
        E !== m && (E === null ? (I.firstBaseUpdate = H) : (E.next = H), (I.lastBaseUpdate = O)));
    }
    if (s !== null) {
      var k = u.baseState;
      ((m = 0), (I = H = O = null), (E = s));
      do {
        var Y = E.lane & -536870913,
          X = Y !== E.lane;
        if (X ? (Rt & Y) === Y : (i & Y) === Y) {
          (Y !== 0 && Y === Ei && (qo = !0),
            I !== null &&
              (I = I.next =
                { lane: 0, tag: E.tag, payload: E.payload, callback: null, next: null }));
          t: {
            var ut = t,
              mt = E;
            Y = e;
            var Kt = n;
            switch (mt.tag) {
              case 1:
                if (((ut = mt.payload), typeof ut == "function")) {
                  k = ut.call(Kt, k, Y);
                  break t;
                }
                k = ut;
                break t;
              case 3:
                ut.flags = (ut.flags & -65537) | 128;
              case 0:
                if (
                  ((ut = mt.payload),
                  (Y = typeof ut == "function" ? ut.call(Kt, k, Y) : ut),
                  Y == null)
                )
                  break t;
                k = S({}, k, Y);
                break t;
              case 2:
                Jn = !0;
            }
          }
          ((Y = E.callback),
            Y !== null &&
              ((t.flags |= 64),
              X && (t.flags |= 8192),
              (X = u.callbacks),
              X === null ? (u.callbacks = [Y]) : X.push(Y)));
        } else
          ((X = { lane: Y, tag: E.tag, payload: E.payload, callback: E.callback, next: null }),
            I === null ? ((H = I = X), (O = k)) : (I = I.next = X),
            (m |= Y));
        if (((E = E.next), E === null)) {
          if (((E = u.shared.pending), E === null)) break;
          ((X = E),
            (E = X.next),
            (X.next = null),
            (u.lastBaseUpdate = X),
            (u.shared.pending = null));
        }
      } while (!0);
      (I === null && (O = k),
        (u.baseState = O),
        (u.firstBaseUpdate = H),
        (u.lastBaseUpdate = I),
        s === null && (u.shared.lanes = 0),
        (aa |= m),
        (t.lanes = m),
        (t.memoizedState = k));
    }
  }
  function rd(t, e) {
    if (typeof t != "function") throw Error(o(191, t));
    t.call(e);
  }
  function ud(t, e) {
    var n = t.callbacks;
    if (n !== null) for (t.callbacks = null, t = 0; t < n.length; t++) rd(n[t], e);
  }
  var wi = z(null),
    Br = z(0);
  function od(t, e) {
    ((t = Dn), at(Br, t), at(wi, e), (Dn = t | e.baseLanes));
  }
  function Yo() {
    (at(Br, Dn), at(wi, wi.current));
  }
  function Go() {
    ((Dn = Br.current), K(wi), K(Br));
  }
  var Ge = z(null),
    en = null;
  function Wn(t) {
    var e = t.alternate;
    (at(ae, ae.current & 1),
      at(Ge, t),
      en === null && (e === null || wi.current !== null || e.memoizedState !== null) && (en = t));
  }
  function Vo(t) {
    (at(ae, ae.current), at(Ge, t), en === null && (en = t));
  }
  function sd(t) {
    t.tag === 22 ? (at(ae, ae.current), at(Ge, t), en === null && (en = t)) : ta();
  }
  function ta() {
    (at(ae, ae.current), at(Ge, Ge.current));
  }
  function Ve(t) {
    (K(Ge), en === t && (en = null), K(ae));
  }
  var ae = z(0);
  function Ur(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || Fs(n) || Ps(n))) return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === "forwards" ||
          e.memoizedProps.revealOrder === "backwards" ||
          e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          e.memoizedProps.revealOrder === "together")
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
    return null;
  }
  var Rn = 0,
    vt = null,
    Qt = null,
    re = null,
    Dr = !1,
    Ri = !1,
    Xa = !1,
    Lr = 0,
    gl = 0,
    Ti = null,
    cg = 0;
  function ee() {
    throw Error(o(321));
  }
  function Xo(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++) if (!qe(t[n], e[n])) return !1;
    return !0;
  }
  function Qo(t, e, n, i, u, s) {
    return (
      (Rn = s),
      (vt = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (Z.H = t === null || t.memoizedState === null ? Kd : ls),
      (Xa = !1),
      (s = n(i, u)),
      (Xa = !1),
      Ri && (s = fd(e, n, i, u)),
      cd(t),
      s
    );
  }
  function cd(t) {
    Z.H = bl;
    var e = Qt !== null && Qt.next !== null;
    if (((Rn = 0), (re = Qt = vt = null), (Dr = !1), (gl = 0), (Ti = null), e)) throw Error(o(300));
    t === null || ue || ((t = t.dependencies), t !== null && wr(t) && (ue = !0));
  }
  function fd(t, e, n, i) {
    vt = t;
    var u = 0;
    do {
      if ((Ri && (Ti = null), (gl = 0), (Ri = !1), 25 <= u)) throw Error(o(301));
      if (((u += 1), (re = Qt = null), t.updateQueue != null)) {
        var s = t.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((Z.H = Id), (s = e(n, i)));
    } while (Ri);
    return s;
  }
  function fg() {
    var t = Z.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? vl(e) : e),
      (t = t.useState()[0]),
      (Qt !== null ? Qt.memoizedState : null) !== t && (vt.flags |= 1024),
      e
    );
  }
  function Zo() {
    var t = Lr !== 0;
    return ((Lr = 0), t);
  }
  function Ko(t, e, n) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n));
  }
  function Io(t) {
    if (Dr) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      Dr = !1;
    }
    ((Rn = 0), (re = Qt = vt = null), (Ri = !1), (gl = Lr = 0), (Ti = null));
  }
  function Te() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (re === null ? (vt.memoizedState = re = t) : (re = re.next = t), re);
  }
  function ie() {
    if (Qt === null) {
      var t = vt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Qt.next;
    var e = re === null ? vt.memoizedState : re.next;
    if (e !== null) ((re = e), (Qt = t));
    else {
      if (t === null) throw vt.alternate === null ? Error(o(467)) : Error(o(310));
      ((Qt = t),
        (t = {
          memoizedState: Qt.memoizedState,
          baseState: Qt.baseState,
          baseQueue: Qt.baseQueue,
          queue: Qt.queue,
          next: null,
        }),
        re === null ? (vt.memoizedState = re = t) : (re = re.next = t));
    }
    return re;
  }
  function Nr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function vl(t) {
    var e = gl;
    return (
      (gl += 1),
      Ti === null && (Ti = []),
      (t = ed(Ti, t, e)),
      (e = vt),
      (re === null ? e.memoizedState : re.next) === null &&
        ((e = e.alternate), (Z.H = e === null || e.memoizedState === null ? Kd : ls)),
      t
    );
  }
  function jr(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return vl(t);
      if (t.$$typeof === Q) return be(t);
    }
    throw Error(o(438, String(t)));
  }
  function Fo(t) {
    var e = null,
      n = vt.updateQueue;
    if ((n !== null && (e = n.memoCache), e == null)) {
      var i = vt.alternate;
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (e = {
              data: i.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      n === null && ((n = Nr()), (vt.updateQueue = n)),
      (n.memoCache = e),
      (n = e.data[e.index]),
      n === void 0)
    )
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++) n[i] = ht;
    return (e.index++, n);
  }
  function Tn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Hr(t) {
    var e = ie();
    return Po(e, Qt, t);
  }
  function Po(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = n;
    var u = t.baseQueue,
      s = i.pending;
    if (s !== null) {
      if (u !== null) {
        var m = u.next;
        ((u.next = s.next), (s.next = m));
      }
      ((e.baseQueue = u = s), (i.pending = null));
    }
    if (((s = t.baseState), u === null)) t.memoizedState = s;
    else {
      e = u.next;
      var E = (m = null),
        O = null,
        H = e,
        I = !1;
      do {
        var k = H.lane & -536870913;
        if (k !== H.lane ? (Rt & k) === k : (Rn & k) === k) {
          var Y = H.revertLane;
          if (Y === 0)
            (O !== null &&
              (O = O.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: H.action,
                  hasEagerState: H.hasEagerState,
                  eagerState: H.eagerState,
                  next: null,
                }),
              k === Ei && (I = !0));
          else if ((Rn & Y) === Y) {
            ((H = H.next), Y === Ei && (I = !0));
            continue;
          } else
            ((k = {
              lane: 0,
              revertLane: H.revertLane,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null,
            }),
              O === null ? ((E = O = k), (m = s)) : (O = O.next = k),
              (vt.lanes |= Y),
              (aa |= Y));
          ((k = H.action), Xa && n(s, k), (s = H.hasEagerState ? H.eagerState : n(s, k)));
        } else
          ((Y = {
            lane: k,
            revertLane: H.revertLane,
            gesture: H.gesture,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null,
          }),
            O === null ? ((E = O = Y), (m = s)) : (O = O.next = Y),
            (vt.lanes |= k),
            (aa |= k));
        H = H.next;
      } while (H !== null && H !== e);
      if (
        (O === null ? (m = s) : (O.next = E),
        !qe(s, t.memoizedState) && ((ue = !0), I && ((n = _i), n !== null)))
      )
        throw n;
      ((t.memoizedState = s), (t.baseState = m), (t.baseQueue = O), (i.lastRenderedState = s));
    }
    return (u === null && (i.lanes = 0), [t.memoizedState, i.dispatch]);
  }
  function Jo(t) {
    var e = ie(),
      n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch,
      u = n.pending,
      s = e.memoizedState;
    if (u !== null) {
      n.pending = null;
      var m = (u = u.next);
      do ((s = t(s, m.action)), (m = m.next));
      while (m !== u);
      (qe(s, e.memoizedState) || (ue = !0),
        (e.memoizedState = s),
        e.baseQueue === null && (e.baseState = s),
        (n.lastRenderedState = s));
    }
    return [s, i];
  }
  function dd(t, e, n) {
    var i = vt,
      u = ie(),
      s = Ct;
    if (s) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = e();
    var m = !qe((Qt || u).memoizedState, n);
    if (
      (m && ((u.memoizedState = n), (ue = !0)),
      (u = u.queue),
      Wo(md.bind(null, i, u, t), [t]),
      u.getSnapshot !== e || m || (re !== null && re.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        Mi(9, { destroy: void 0 }, pd.bind(null, i, u, n, e), null),
        It === null)
      )
        throw Error(o(349));
      s || (Rn & 127) !== 0 || hd(i, e, n);
    }
    return n;
  }
  function hd(t, e, n) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: n }),
      (e = vt.updateQueue),
      e === null
        ? ((e = Nr()), (vt.updateQueue = e), (e.stores = [t]))
        : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t)));
  }
  function pd(t, e, n, i) {
    ((e.value = n), (e.getSnapshot = i), yd(e) && gd(t));
  }
  function md(t, e, n) {
    return n(function () {
      yd(e) && gd(t);
    });
  }
  function yd(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !qe(t, n);
    } catch {
      return !0;
    }
  }
  function gd(t) {
    var e = Da(t, 2);
    e !== null && Le(e, t, 2);
  }
  function ko(t) {
    var e = Te();
    if (typeof t == "function") {
      var n = t;
      if (((t = n()), Xa)) {
        Ht(!0);
        try {
          n();
        } finally {
          Ht(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tn,
        lastRenderedState: t,
      }),
      e
    );
  }
  function vd(t, e, n, i) {
    return ((t.baseState = n), Po(t, Qt, typeof i == "function" ? i : Tn));
  }
  function dg(t, e, n, i, u) {
    if (Gr(t)) throw Error(o(485));
    if (((t = e.action), t !== null)) {
      var s = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (m) {
          s.listeners.push(m);
        },
      };
      (Z.T !== null ? n(!0) : (s.isTransition = !1),
        i(s),
        (n = e.pending),
        n === null
          ? ((s.next = e.pending = s), Sd(e, s))
          : ((s.next = n.next), (e.pending = n.next = s)));
    }
  }
  function Sd(t, e) {
    var n = e.action,
      i = e.payload,
      u = t.state;
    if (e.isTransition) {
      var s = Z.T,
        m = {};
      Z.T = m;
      try {
        var E = n(u, i),
          O = Z.S;
        (O !== null && O(m, E), bd(t, e, E));
      } catch (H) {
        $o(t, e, H);
      } finally {
        (s !== null && m.types !== null && (s.types = m.types), (Z.T = s));
      }
    } else
      try {
        ((s = n(u, i)), bd(t, e, s));
      } catch (H) {
        $o(t, e, H);
      }
  }
  function bd(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (i) {
            Ed(t, e, i);
          },
          function (i) {
            return $o(t, e, i);
          },
        )
      : Ed(t, e, n);
  }
  function Ed(t, e, n) {
    ((e.status = "fulfilled"),
      (e.value = n),
      _d(e),
      (t.state = n),
      (e = t.pending),
      e !== null &&
        ((n = e.next), n === e ? (t.pending = null) : ((n = n.next), (e.next = n), Sd(t, n))));
  }
  function $o(t, e, n) {
    var i = t.pending;
    if (((t.pending = null), i !== null)) {
      i = i.next;
      do ((e.status = "rejected"), (e.reason = n), _d(e), (e = e.next));
      while (e !== i);
    }
    t.action = null;
  }
  function _d(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function xd(t, e) {
    return e;
  }
  function Ad(t, e) {
    if (Ct) {
      var n = It.formState;
      if (n !== null) {
        t: {
          var i = vt;
          if (Ct) {
            if (Jt) {
              e: {
                for (var u = Jt, s = tn; u.nodeType !== 8; ) {
                  if (!s) {
                    u = null;
                    break e;
                  }
                  if (((u = nn(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                ((s = u.data), (u = s === "F!" || s === "F" ? u : null));
              }
              if (u) {
                ((Jt = nn(u.nextSibling)), (i = u.data === "F!"));
                break t;
              }
            }
            Fn(i);
          }
          i = !1;
        }
        i && (e = n[0]);
      }
    }
    return (
      (n = Te()),
      (n.memoizedState = n.baseState = e),
      (i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xd,
        lastRenderedState: e,
      }),
      (n.queue = i),
      (n = Xd.bind(null, vt, i)),
      (i.dispatch = n),
      (i = ko(!1)),
      (s = is.bind(null, vt, !1, i.queue)),
      (i = Te()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (i.queue = u),
      (n = dg.bind(null, vt, u, s, n)),
      (u.dispatch = n),
      (i.memoizedState = t),
      [e, n, !1]
    );
  }
  function wd(t) {
    var e = ie();
    return Rd(e, Qt, t);
  }
  function Rd(t, e, n) {
    if (
      ((e = Po(t, e, xd)[0]),
      (t = Hr(Tn)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var i = vl(e);
      } catch (m) {
        throw m === xi ? Mr : m;
      }
    else i = e;
    e = ie();
    var u = e.queue,
      s = u.dispatch;
    return (
      n !== e.memoizedState &&
        ((vt.flags |= 2048), Mi(9, { destroy: void 0 }, hg.bind(null, u, n), null)),
      [i, s, t]
    );
  }
  function hg(t, e) {
    t.action = e;
  }
  function Td(t) {
    var e = ie(),
      n = Qt;
    if (n !== null) return Rd(e, n, t);
    (ie(), (e = e.memoizedState), (n = ie()));
    var i = n.queue.dispatch;
    return ((n.memoizedState = t), [e, i, !1]);
  }
  function Mi(t, e, n, i) {
    return (
      (t = { tag: t, create: n, deps: i, inst: e, next: null }),
      (e = vt.updateQueue),
      e === null && ((e = Nr()), (vt.updateQueue = e)),
      (n = e.lastEffect),
      n === null
        ? (e.lastEffect = t.next = t)
        : ((i = n.next), (n.next = t), (t.next = i), (e.lastEffect = t)),
      t
    );
  }
  function Md() {
    return ie().memoizedState;
  }
  function qr(t, e, n, i) {
    var u = Te();
    ((vt.flags |= t),
      (u.memoizedState = Mi(1 | e, { destroy: void 0 }, n, i === void 0 ? null : i)));
  }
  function Yr(t, e, n, i) {
    var u = ie();
    i = i === void 0 ? null : i;
    var s = u.memoizedState.inst;
    Qt !== null && i !== null && Xo(i, Qt.memoizedState.deps)
      ? (u.memoizedState = Mi(e, s, n, i))
      : ((vt.flags |= t), (u.memoizedState = Mi(1 | e, s, n, i)));
  }
  function Cd(t, e) {
    qr(8390656, 8, t, e);
  }
  function Wo(t, e) {
    Yr(2048, 8, t, e);
  }
  function pg(t) {
    vt.flags |= 4;
    var e = vt.updateQueue;
    if (e === null) ((e = Nr()), (vt.updateQueue = e), (e.events = [t]));
    else {
      var n = e.events;
      n === null ? (e.events = [t]) : n.push(t);
    }
  }
  function Od(t) {
    var e = ie().memoizedState;
    return (
      pg({ ref: e, nextImpl: t }),
      function () {
        if ((qt & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function zd(t, e) {
    return Yr(4, 2, t, e);
  }
  function Bd(t, e) {
    return Yr(4, 4, t, e);
  }
  function Ud(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function () {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Dd(t, e, n) {
    ((n = n != null ? n.concat([t]) : null), Yr(4, 4, Ud.bind(null, e, t), n));
  }
  function ts() {}
  function Ld(t, e) {
    var n = ie();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && Xo(e, i[1]) ? i[0] : ((n.memoizedState = [t, e]), t);
  }
  function Nd(t, e) {
    var n = ie();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && Xo(e, i[1])) return i[0];
    if (((i = t()), Xa)) {
      Ht(!0);
      try {
        t();
      } finally {
        Ht(!1);
      }
    }
    return ((n.memoizedState = [i, e]), i);
  }
  function es(t, e, n) {
    return n === void 0 || ((Rn & 1073741824) !== 0 && (Rt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = n), (t = jh()), (vt.lanes |= t), (aa |= t), n);
  }
  function jd(t, e, n, i) {
    return qe(n, e)
      ? n
      : wi.current !== null
        ? ((t = es(t, n, i)), qe(t, e) || (ue = !0), t)
        : (Rn & 42) === 0 || ((Rn & 1073741824) !== 0 && (Rt & 261930) === 0)
          ? ((ue = !0), (t.memoizedState = n))
          : ((t = jh()), (vt.lanes |= t), (aa |= t), e);
  }
  function Hd(t, e, n, i, u) {
    var s = tt.p;
    tt.p = s !== 0 && 8 > s ? s : 8;
    var m = Z.T,
      E = {};
    ((Z.T = E), is(t, !1, e, n));
    try {
      var O = u(),
        H = Z.S;
      if (
        (H !== null && H(E, O), O !== null && typeof O == "object" && typeof O.then == "function")
      ) {
        var I = sg(O, i);
        Sl(t, e, I, Ze(t));
      } else Sl(t, e, i, Ze(t));
    } catch (k) {
      Sl(t, e, { then: function () {}, status: "rejected", reason: k }, Ze());
    } finally {
      ((tt.p = s), m !== null && E.types !== null && (m.types = E.types), (Z.T = m));
    }
  }
  function mg() {}
  function ns(t, e, n, i) {
    if (t.tag !== 5) throw Error(o(476));
    var u = qd(t).queue;
    Hd(
      t,
      u,
      e,
      ft,
      n === null
        ? mg
        : function () {
            return (Yd(t), n(i));
          },
    );
  }
  function qd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: ft,
      baseState: ft,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tn,
        lastRenderedState: ft,
      },
      next: null,
    };
    var n = {};
    return (
      (e.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Tn,
          lastRenderedState: n,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Yd(t) {
    var e = qd(t);
    (e.next === null && (e = t.alternate.memoizedState), Sl(t, e.next.queue, {}, Ze()));
  }
  function as() {
    return be(Nl);
  }
  function Gd() {
    return ie().memoizedState;
  }
  function Vd() {
    return ie().memoizedState;
  }
  function yg(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Ze();
          t = kn(n);
          var i = $n(e, t, n);
          (i !== null && (Le(i, e, n), pl(i, e, n)), (e = { cache: Bo() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function gg(t, e, n) {
    var i = Ze();
    ((n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Gr(t) ? Qd(e, n) : ((n = Eo(t, e, n, i)), n !== null && (Le(n, t, i), Zd(n, e, i))));
  }
  function Xd(t, e, n) {
    var i = Ze();
    Sl(t, e, n, i);
  }
  function Sl(t, e, n, i) {
    var u = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Gr(t)) Qd(e, u);
    else {
      var s = t.alternate;
      if (
        t.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = e.lastRenderedReducer), s !== null)
      )
        try {
          var m = e.lastRenderedState,
            E = s(m, n);
          if (((u.hasEagerState = !0), (u.eagerState = E), qe(E, m)))
            return (Er(t, e, u, 0), It === null && br(), !1);
        } catch {}
      if (((n = Eo(t, e, u, i)), n !== null)) return (Le(n, t, i), Zd(n, e, i), !0);
    }
    return !1;
  }
  function is(t, e, n, i) {
    if (
      ((i = {
        lane: 2,
        revertLane: Ns(),
        gesture: null,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Gr(t))
    ) {
      if (e) throw Error(o(479));
    } else ((e = Eo(t, n, i, 2)), e !== null && Le(e, t, 2));
  }
  function Gr(t) {
    var e = t.alternate;
    return t === vt || (e !== null && e === vt);
  }
  function Qd(t, e) {
    Ri = Dr = !0;
    var n = t.pending;
    (n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)), (t.pending = e));
  }
  function Zd(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      ((i &= t.pendingLanes), (n |= i), (e.lanes = n), Pc(t, n));
    }
  }
  var bl = {
    readContext: be,
    use: jr,
    useCallback: ee,
    useContext: ee,
    useEffect: ee,
    useImperativeHandle: ee,
    useLayoutEffect: ee,
    useInsertionEffect: ee,
    useMemo: ee,
    useReducer: ee,
    useRef: ee,
    useState: ee,
    useDebugValue: ee,
    useDeferredValue: ee,
    useTransition: ee,
    useSyncExternalStore: ee,
    useId: ee,
    useHostTransitionStatus: ee,
    useFormState: ee,
    useActionState: ee,
    useOptimistic: ee,
    useMemoCache: ee,
    useCacheRefresh: ee,
  };
  bl.useEffectEvent = ee;
  var Kd = {
      readContext: be,
      use: jr,
      useCallback: function (t, e) {
        return ((Te().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: be,
      useEffect: Cd,
      useImperativeHandle: function (t, e, n) {
        ((n = n != null ? n.concat([t]) : null), qr(4194308, 4, Ud.bind(null, e, t), n));
      },
      useLayoutEffect: function (t, e) {
        return qr(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        qr(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var n = Te();
        e = e === void 0 ? null : e;
        var i = t();
        if (Xa) {
          Ht(!0);
          try {
            t();
          } finally {
            Ht(!1);
          }
        }
        return ((n.memoizedState = [i, e]), i);
      },
      useReducer: function (t, e, n) {
        var i = Te();
        if (n !== void 0) {
          var u = n(e);
          if (Xa) {
            Ht(!0);
            try {
              n(e);
            } finally {
              Ht(!1);
            }
          }
        } else u = e;
        return (
          (i.memoizedState = i.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (i.queue = t),
          (t = t.dispatch = gg.bind(null, vt, t)),
          [i.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = Te();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = ko(t);
        var e = t.queue,
          n = Xd.bind(null, vt, e);
        return ((e.dispatch = n), [t.memoizedState, n]);
      },
      useDebugValue: ts,
      useDeferredValue: function (t, e) {
        var n = Te();
        return es(n, t, e);
      },
      useTransition: function () {
        var t = ko(!1);
        return ((t = Hd.bind(null, vt, t.queue, !0, !1)), (Te().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, n) {
        var i = vt,
          u = Te();
        if (Ct) {
          if (n === void 0) throw Error(o(407));
          n = n();
        } else {
          if (((n = e()), It === null)) throw Error(o(349));
          (Rt & 127) !== 0 || hd(i, e, n);
        }
        u.memoizedState = n;
        var s = { value: n, getSnapshot: e };
        return (
          (u.queue = s),
          Cd(md.bind(null, i, s, t), [t]),
          (i.flags |= 2048),
          Mi(9, { destroy: void 0 }, pd.bind(null, i, s, n, e), null),
          n
        );
      },
      useId: function () {
        var t = Te(),
          e = It.identifierPrefix;
        if (Ct) {
          var n = hn,
            i = dn;
          ((n = (i & ~(1 << (32 - Et(i) - 1))).toString(32) + n),
            (e = "_" + e + "R_" + n),
            (n = Lr++),
            0 < n && (e += "H" + n.toString(32)),
            (e += "_"));
        } else ((n = cg++), (e = "_" + e + "r_" + n.toString(32) + "_"));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: as,
      useFormState: Ad,
      useActionState: Ad,
      useOptimistic: function (t) {
        var e = Te();
        e.memoizedState = e.baseState = t;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = n), (e = is.bind(null, vt, !0, n)), (n.dispatch = e), [t, e]);
      },
      useMemoCache: Fo,
      useCacheRefresh: function () {
        return (Te().memoizedState = yg.bind(null, vt));
      },
      useEffectEvent: function (t) {
        var e = Te(),
          n = { impl: t };
        return (
          (e.memoizedState = n),
          function () {
            if ((qt & 2) !== 0) throw Error(o(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ls = {
      readContext: be,
      use: jr,
      useCallback: Ld,
      useContext: be,
      useEffect: Wo,
      useImperativeHandle: Dd,
      useInsertionEffect: zd,
      useLayoutEffect: Bd,
      useMemo: Nd,
      useReducer: Hr,
      useRef: Md,
      useState: function () {
        return Hr(Tn);
      },
      useDebugValue: ts,
      useDeferredValue: function (t, e) {
        var n = ie();
        return jd(n, Qt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = Hr(Tn)[0],
          e = ie().memoizedState;
        return [typeof t == "boolean" ? t : vl(t), e];
      },
      useSyncExternalStore: dd,
      useId: Gd,
      useHostTransitionStatus: as,
      useFormState: wd,
      useActionState: wd,
      useOptimistic: function (t, e) {
        var n = ie();
        return vd(n, Qt, t, e);
      },
      useMemoCache: Fo,
      useCacheRefresh: Vd,
    };
  ls.useEffectEvent = Od;
  var Id = {
    readContext: be,
    use: jr,
    useCallback: Ld,
    useContext: be,
    useEffect: Wo,
    useImperativeHandle: Dd,
    useInsertionEffect: zd,
    useLayoutEffect: Bd,
    useMemo: Nd,
    useReducer: Jo,
    useRef: Md,
    useState: function () {
      return Jo(Tn);
    },
    useDebugValue: ts,
    useDeferredValue: function (t, e) {
      var n = ie();
      return Qt === null ? es(n, t, e) : jd(n, Qt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Jo(Tn)[0],
        e = ie().memoizedState;
      return [typeof t == "boolean" ? t : vl(t), e];
    },
    useSyncExternalStore: dd,
    useId: Gd,
    useHostTransitionStatus: as,
    useFormState: Td,
    useActionState: Td,
    useOptimistic: function (t, e) {
      var n = ie();
      return Qt !== null ? vd(n, Qt, t, e) : ((n.baseState = t), [t, n.queue.dispatch]);
    },
    useMemoCache: Fo,
    useCacheRefresh: Vd,
  };
  Id.useEffectEvent = Od;
  function rs(t, e, n, i) {
    ((e = t.memoizedState),
      (n = n(i, e)),
      (n = n == null ? e : S({}, e, n)),
      (t.memoizedState = n),
      t.lanes === 0 && (t.updateQueue.baseState = n));
  }
  var us = {
    enqueueSetState: function (t, e, n) {
      t = t._reactInternals;
      var i = Ze(),
        u = kn(i);
      ((u.payload = e),
        n != null && (u.callback = n),
        (e = $n(t, u, i)),
        e !== null && (Le(e, t, i), pl(e, t, i)));
    },
    enqueueReplaceState: function (t, e, n) {
      t = t._reactInternals;
      var i = Ze(),
        u = kn(i);
      ((u.tag = 1),
        (u.payload = e),
        n != null && (u.callback = n),
        (e = $n(t, u, i)),
        e !== null && (Le(e, t, i), pl(e, t, i)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var n = Ze(),
        i = kn(n);
      ((i.tag = 2),
        e != null && (i.callback = e),
        (e = $n(t, i, n)),
        e !== null && (Le(e, t, n), pl(e, t, n)));
    },
  };
  function Fd(t, e, n, i, u, s, m) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(i, s, m)
        : e.prototype && e.prototype.isPureReactComponent
          ? !rl(n, i) || !rl(u, s)
          : !0
    );
  }
  function Pd(t, e, n, i) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(n, i),
      e.state !== t && us.enqueueReplaceState(e, e.state, null));
  }
  function Qa(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e) i !== "ref" && (n[i] = e[i]);
    }
    if ((t = t.defaultProps)) {
      n === e && (n = S({}, n));
      for (var u in t) n[u] === void 0 && (n[u] = t[u]);
    }
    return n;
  }
  function Jd(t) {
    Sr(t);
  }
  function kd(t) {
    console.error(t);
  }
  function $d(t) {
    Sr(t);
  }
  function Vr(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Wd(t, e, n) {
    try {
      var i = t.onCaughtError;
      i(n.value, { componentStack: n.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function os(t, e, n) {
    return (
      (n = kn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        Vr(t, e);
      }),
      n
    );
  }
  function th(t) {
    return ((t = kn(t)), (t.tag = 3), t);
  }
  function eh(t, e, n, i) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var s = i.value;
      ((t.payload = function () {
        return u(s);
      }),
        (t.callback = function () {
          Wd(e, n, i);
        }));
    }
    var m = n.stateNode;
    m !== null &&
      typeof m.componentDidCatch == "function" &&
      (t.callback = function () {
        (Wd(e, n, i),
          typeof u != "function" && (ia === null ? (ia = new Set([this])) : ia.add(this)));
        var E = i.stack;
        this.componentDidCatch(i.value, { componentStack: E !== null ? E : "" });
      });
  }
  function vg(t, e, n, i, u) {
    if (((n.flags |= 32768), i !== null && typeof i == "object" && typeof i.then == "function")) {
      if (((e = n.alternate), e !== null && bi(e, n, u, !0), (n = Ge.current), n !== null)) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              en === null ? tu() : n.alternate === null && ne === 0 && (ne = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = u),
              i === Cr
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null ? (n.updateQueue = new Set([i])) : e.add(i),
                  Us(t, i, u)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              i === Cr
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([i]) }),
                      (n.updateQueue = e))
                    : ((n = e.retryQueue), n === null ? (e.retryQueue = new Set([i])) : n.add(i)),
                  Us(t, i, u)),
              !1
            );
        }
        throw Error(o(435, n.tag));
      }
      return (Us(t, i, u), tu(), !1);
    }
    if (Ct)
      return (
        (e = Ge.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            i !== To && ((t = Error(o(422), { cause: i })), sl(ke(t, n))))
          : (i !== To && ((e = Error(o(423), { cause: i })), sl(ke(e, n))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (i = ke(i, n)),
            (u = os(t.stateNode, i, u)),
            Ho(t, u),
            ne !== 4 && (ne = 2)),
        !1
      );
    var s = Error(o(520), { cause: i });
    if (((s = ke(s, n)), Ml === null ? (Ml = [s]) : Ml.push(s), ne !== 4 && (ne = 2), e === null))
      return !0;
    ((i = ke(i, n)), (n = e));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (t = u & -u),
            (n.lanes |= t),
            (t = os(n.stateNode, i, t)),
            Ho(n, t),
            !1
          );
        case 1:
          if (
            ((e = n.type),
            (s = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (s !== null &&
                  typeof s.componentDidCatch == "function" &&
                  (ia === null || !ia.has(s)))))
          )
            return (
              (n.flags |= 65536),
              (u &= -u),
              (n.lanes |= u),
              (u = th(u)),
              eh(u, t, n, i),
              Ho(n, u),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var ss = Error(o(461)),
    ue = !1;
  function Ee(t, e, n, i) {
    e.child = t === null ? ld(e, null, n, i) : Va(e, t.child, n, i);
  }
  function nh(t, e, n, i, u) {
    n = n.render;
    var s = e.ref;
    if ("ref" in i) {
      var m = {};
      for (var E in i) E !== "ref" && (m[E] = i[E]);
    } else m = i;
    return (
      Ha(e),
      (i = Qo(t, e, n, m, s, u)),
      (E = Zo()),
      t !== null && !ue
        ? (Ko(t, e, u), Mn(t, e, u))
        : (Ct && E && wo(e), (e.flags |= 1), Ee(t, e, i, u), e.child)
    );
  }
  function ah(t, e, n, i, u) {
    if (t === null) {
      var s = n.type;
      return typeof s == "function" && !_o(s) && s.defaultProps === void 0 && n.compare === null
        ? ((e.tag = 15), (e.type = s), ih(t, e, s, i, u))
        : ((t = xr(n.type, null, i, e, e.mode, u)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((s = t.child), !gs(t, u))) {
      var m = s.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : rl), n(m, i) && t.ref === e.ref))
        return Mn(t, e, u);
    }
    return ((e.flags |= 1), (t = _n(s, i)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function ih(t, e, n, i, u) {
    if (t !== null) {
      var s = t.memoizedProps;
      if (rl(s, i) && t.ref === e.ref)
        if (((ue = !1), (e.pendingProps = i = s), gs(t, u))) (t.flags & 131072) !== 0 && (ue = !0);
        else return ((e.lanes = t.lanes), Mn(t, e, u));
    }
    return cs(t, e, n, i, u);
  }
  function lh(t, e, n, i) {
    var u = i.children,
      s = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      i.mode === "hidden")
    ) {
      if ((e.flags & 128) !== 0) {
        if (((s = s !== null ? s.baseLanes | n : n), t !== null)) {
          for (i = e.child = t.child, u = 0; i !== null; )
            ((u = u | i.lanes | i.childLanes), (i = i.sibling));
          i = u & ~s;
        } else ((i = 0), (e.child = null));
        return rh(t, e, s, n, i);
      }
      if ((n & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Tr(e, s !== null ? s.cachePool : null),
          s !== null ? od(e, s) : Yo(),
          sd(e));
      else return ((i = e.lanes = 536870912), rh(t, e, s !== null ? s.baseLanes | n : n, n, i));
    } else
      s !== null
        ? (Tr(e, s.cachePool), od(e, s), ta(), (e.memoizedState = null))
        : (t !== null && Tr(e, null), Yo(), ta());
    return (Ee(t, e, u, n), e.child);
  }
  function El(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function rh(t, e, n, i, u) {
    var s = Do();
    return (
      (s = s === null ? null : { parent: le._currentValue, pool: s }),
      (e.memoizedState = { baseLanes: n, cachePool: s }),
      t !== null && Tr(e, null),
      Yo(),
      sd(e),
      t !== null && bi(t, e, i, !0),
      (e.childLanes = u),
      null
    );
  }
  function Xr(t, e) {
    return (
      (e = Zr({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function uh(t, e, n) {
    return (
      Va(e, t.child, null, n),
      (t = Xr(e, e.pendingProps)),
      (t.flags |= 2),
      Ve(e),
      (e.memoizedState = null),
      t
    );
  }
  function Sg(t, e, n) {
    var i = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (Ct) {
        if (i.mode === "hidden") return ((t = Xr(e, i)), (e.lanes = 536870912), El(null, t));
        if (
          (Vo(e),
          (t = Jt)
            ? ((t = Sp(t, tn)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Kn !== null ? { id: dn, overflow: hn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = Qf(t)),
                (n.return = e),
                (e.child = n),
                (Se = e),
                (Jt = null)))
            : (t = null),
          t === null)
        )
          throw Fn(e);
        return ((e.lanes = 536870912), null);
      }
      return Xr(e, i);
    }
    var s = t.memoizedState;
    if (s !== null) {
      var m = s.dehydrated;
      if ((Vo(e), u))
        if (e.flags & 256) ((e.flags &= -257), (e = uh(t, e, n)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(o(558));
      else if ((ue || bi(t, e, n, !1), (u = (n & t.childLanes) !== 0), ue || u)) {
        if (((i = It), i !== null && ((m = Jc(i, n)), m !== 0 && m !== s.retryLane)))
          throw ((s.retryLane = m), Da(t, m), Le(i, t, m), ss);
        (tu(), (e = uh(t, e, n)));
      } else
        ((t = s.treeContext),
          (Jt = nn(m.nextSibling)),
          (Se = e),
          (Ct = !0),
          (In = null),
          (tn = !1),
          t !== null && If(e, t),
          (e = Xr(e, i)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = _n(t.child, { mode: i.mode, children: i.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Qr(t, e) {
    var n = e.ref;
    if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(o(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function cs(t, e, n, i, u) {
    return (
      Ha(e),
      (n = Qo(t, e, n, i, void 0, u)),
      (i = Zo()),
      t !== null && !ue
        ? (Ko(t, e, u), Mn(t, e, u))
        : (Ct && i && wo(e), (e.flags |= 1), Ee(t, e, n, u), e.child)
    );
  }
  function oh(t, e, n, i, u, s) {
    return (
      Ha(e),
      (e.updateQueue = null),
      (n = fd(e, i, n, u)),
      cd(t),
      (i = Zo()),
      t !== null && !ue
        ? (Ko(t, e, s), Mn(t, e, s))
        : (Ct && i && wo(e), (e.flags |= 1), Ee(t, e, n, s), e.child)
    );
  }
  function sh(t, e, n, i, u) {
    if ((Ha(e), e.stateNode === null)) {
      var s = yi,
        m = n.contextType;
      (typeof m == "object" && m !== null && (s = be(m)),
        (s = new n(i, s)),
        (e.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = us),
        (e.stateNode = s),
        (s._reactInternals = e),
        (s = e.stateNode),
        (s.props = i),
        (s.state = e.memoizedState),
        (s.refs = {}),
        No(e),
        (m = n.contextType),
        (s.context = typeof m == "object" && m !== null ? be(m) : yi),
        (s.state = e.memoizedState),
        (m = n.getDerivedStateFromProps),
        typeof m == "function" && (rs(e, n, m, i), (s.state = e.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof s.getSnapshotBeforeUpdate == "function" ||
          (typeof s.UNSAFE_componentWillMount != "function" &&
            typeof s.componentWillMount != "function") ||
          ((m = s.state),
          typeof s.componentWillMount == "function" && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(),
          m !== s.state && us.enqueueReplaceState(s, s.state, null),
          yl(e, i, s, u),
          ml(),
          (s.state = e.memoizedState)),
        typeof s.componentDidMount == "function" && (e.flags |= 4194308),
        (i = !0));
    } else if (t === null) {
      s = e.stateNode;
      var E = e.memoizedProps,
        O = Qa(n, E);
      s.props = O;
      var H = s.context,
        I = n.contextType;
      ((m = yi), typeof I == "object" && I !== null && (m = be(I)));
      var k = n.getDerivedStateFromProps;
      ((I = typeof k == "function" || typeof s.getSnapshotBeforeUpdate == "function"),
        (E = e.pendingProps !== E),
        I ||
          (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
            typeof s.componentWillReceiveProps != "function") ||
          ((E || H !== m) && Pd(e, s, i, m)),
        (Jn = !1));
      var Y = e.memoizedState;
      ((s.state = Y),
        yl(e, i, s, u),
        ml(),
        (H = e.memoizedState),
        E || Y !== H || Jn
          ? (typeof k == "function" && (rs(e, n, k, i), (H = e.memoizedState)),
            (O = Jn || Fd(e, n, O, i, Y, H, m))
              ? (I ||
                  (typeof s.UNSAFE_componentWillMount != "function" &&
                    typeof s.componentWillMount != "function") ||
                  (typeof s.componentWillMount == "function" && s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == "function" &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == "function" && (e.flags |= 4194308))
              : (typeof s.componentDidMount == "function" && (e.flags |= 4194308),
                (e.memoizedProps = i),
                (e.memoizedState = H)),
            (s.props = i),
            (s.state = H),
            (s.context = m),
            (i = O))
          : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), (i = !1)));
    } else {
      ((s = e.stateNode),
        jo(t, e),
        (m = e.memoizedProps),
        (I = Qa(n, m)),
        (s.props = I),
        (k = e.pendingProps),
        (Y = s.context),
        (H = n.contextType),
        (O = yi),
        typeof H == "object" && H !== null && (O = be(H)),
        (E = n.getDerivedStateFromProps),
        (H = typeof E == "function" || typeof s.getSnapshotBeforeUpdate == "function") ||
          (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
            typeof s.componentWillReceiveProps != "function") ||
          ((m !== k || Y !== O) && Pd(e, s, i, O)),
        (Jn = !1),
        (Y = e.memoizedState),
        (s.state = Y),
        yl(e, i, s, u),
        ml());
      var X = e.memoizedState;
      m !== k || Y !== X || Jn || (t !== null && t.dependencies !== null && wr(t.dependencies))
        ? (typeof E == "function" && (rs(e, n, E, i), (X = e.memoizedState)),
          (I =
            Jn ||
            Fd(e, n, I, i, Y, X, O) ||
            (t !== null && t.dependencies !== null && wr(t.dependencies)))
            ? (H ||
                (typeof s.UNSAFE_componentWillUpdate != "function" &&
                  typeof s.componentWillUpdate != "function") ||
                (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, X, O),
                typeof s.UNSAFE_componentWillUpdate == "function" &&
                  s.UNSAFE_componentWillUpdate(i, X, O)),
              typeof s.componentDidUpdate == "function" && (e.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024))
            : (typeof s.componentDidUpdate != "function" ||
                (m === t.memoizedProps && Y === t.memoizedState) ||
                (e.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != "function" ||
                (m === t.memoizedProps && Y === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = i),
              (e.memoizedState = X)),
          (s.props = i),
          (s.state = X),
          (s.context = O),
          (i = I))
        : (typeof s.componentDidUpdate != "function" ||
            (m === t.memoizedProps && Y === t.memoizedState) ||
            (e.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != "function" ||
            (m === t.memoizedProps && Y === t.memoizedState) ||
            (e.flags |= 1024),
          (i = !1));
    }
    return (
      (s = i),
      Qr(t, e),
      (i = (e.flags & 128) !== 0),
      s || i
        ? ((s = e.stateNode),
          (n = i && typeof n.getDerivedStateFromError != "function" ? null : s.render()),
          (e.flags |= 1),
          t !== null && i
            ? ((e.child = Va(e, t.child, null, u)), (e.child = Va(e, null, n, u)))
            : Ee(t, e, n, u),
          (e.memoizedState = s.state),
          (t = e.child))
        : (t = Mn(t, e, u)),
      t
    );
  }
  function ch(t, e, n, i) {
    return (Na(), (e.flags |= 256), Ee(t, e, n, i), e.child);
  }
  var fs = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function ds(t) {
    return { baseLanes: t, cachePool: Wf() };
  }
  function hs(t, e, n) {
    return ((t = t !== null ? t.childLanes & ~n : 0), e && (t |= Qe), t);
  }
  function fh(t, e, n) {
    var i = e.pendingProps,
      u = !1,
      s = (e.flags & 128) !== 0,
      m;
    if (
      ((m = s) || (m = t !== null && t.memoizedState === null ? !1 : (ae.current & 2) !== 0),
      m && ((u = !0), (e.flags &= -129)),
      (m = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (Ct) {
        if (
          (u ? Wn(e) : ta(),
          (t = Jt)
            ? ((t = Sp(t, tn)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Kn !== null ? { id: dn, overflow: hn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = Qf(t)),
                (n.return = e),
                (e.child = n),
                (Se = e),
                (Jt = null)))
            : (t = null),
          t === null)
        )
          throw Fn(e);
        return (Ps(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var E = i.children;
      return (
        (i = i.fallback),
        u
          ? (ta(),
            (u = e.mode),
            (E = Zr({ mode: "hidden", children: E }, u)),
            (i = La(i, u, n, null)),
            (E.return = e),
            (i.return = e),
            (E.sibling = i),
            (e.child = E),
            (i = e.child),
            (i.memoizedState = ds(n)),
            (i.childLanes = hs(t, m, n)),
            (e.memoizedState = fs),
            El(null, i))
          : (Wn(e), ps(e, E))
      );
    }
    var O = t.memoizedState;
    if (O !== null && ((E = O.dehydrated), E !== null)) {
      if (s)
        e.flags & 256
          ? (Wn(e), (e.flags &= -257), (e = ms(t, e, n)))
          : e.memoizedState !== null
            ? (ta(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (ta(),
              (E = i.fallback),
              (u = e.mode),
              (i = Zr({ mode: "visible", children: i.children }, u)),
              (E = La(E, u, n, null)),
              (E.flags |= 2),
              (i.return = e),
              (E.return = e),
              (i.sibling = E),
              (e.child = i),
              Va(e, t.child, null, n),
              (i = e.child),
              (i.memoizedState = ds(n)),
              (i.childLanes = hs(t, m, n)),
              (e.memoizedState = fs),
              (e = El(null, i)));
      else if ((Wn(e), Ps(E))) {
        if (((m = E.nextSibling && E.nextSibling.dataset), m)) var H = m.dgst;
        ((m = H),
          (i = Error(o(419))),
          (i.stack = ""),
          (i.digest = m),
          sl({ value: i, source: null, stack: null }),
          (e = ms(t, e, n)));
      } else if ((ue || bi(t, e, n, !1), (m = (n & t.childLanes) !== 0), ue || m)) {
        if (((m = It), m !== null && ((i = Jc(m, n)), i !== 0 && i !== O.retryLane)))
          throw ((O.retryLane = i), Da(t, i), Le(m, t, i), ss);
        (Fs(E) || tu(), (e = ms(t, e, n)));
      } else
        Fs(E)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = O.treeContext),
            (Jt = nn(E.nextSibling)),
            (Se = e),
            (Ct = !0),
            (In = null),
            (tn = !1),
            t !== null && If(e, t),
            (e = ps(e, i.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (ta(),
        (E = i.fallback),
        (u = e.mode),
        (O = t.child),
        (H = O.sibling),
        (i = _n(O, { mode: "hidden", children: i.children })),
        (i.subtreeFlags = O.subtreeFlags & 65011712),
        H !== null ? (E = _n(H, E)) : ((E = La(E, u, n, null)), (E.flags |= 2)),
        (E.return = e),
        (i.return = e),
        (i.sibling = E),
        (e.child = i),
        El(null, i),
        (i = e.child),
        (E = t.child.memoizedState),
        E === null
          ? (E = ds(n))
          : ((u = E.cachePool),
            u !== null
              ? ((O = le._currentValue), (u = u.parent !== O ? { parent: O, pool: O } : u))
              : (u = Wf()),
            (E = { baseLanes: E.baseLanes | n, cachePool: u })),
        (i.memoizedState = E),
        (i.childLanes = hs(t, m, n)),
        (e.memoizedState = fs),
        El(t.child, i))
      : (Wn(e),
        (n = t.child),
        (t = n.sibling),
        (n = _n(n, { mode: "visible", children: i.children })),
        (n.return = e),
        (n.sibling = null),
        t !== null &&
          ((m = e.deletions), m === null ? ((e.deletions = [t]), (e.flags |= 16)) : m.push(t)),
        (e.child = n),
        (e.memoizedState = null),
        n);
  }
  function ps(t, e) {
    return ((e = Zr({ mode: "visible", children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function Zr(t, e) {
    return ((t = Ye(22, t, null, e)), (t.lanes = 0), t);
  }
  function ms(t, e, n) {
    return (
      Va(e, t.child, null, n),
      (t = ps(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function dh(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    (i !== null && (i.lanes |= e), Oo(t.return, e, n));
  }
  function ys(t, e, n, i, u, s) {
    var m = t.memoizedState;
    m === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: n,
          tailMode: u,
          treeForkCount: s,
        })
      : ((m.isBackwards = e),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = i),
        (m.tail = n),
        (m.tailMode = u),
        (m.treeForkCount = s));
  }
  function hh(t, e, n) {
    var i = e.pendingProps,
      u = i.revealOrder,
      s = i.tail;
    i = i.children;
    var m = ae.current,
      E = (m & 2) !== 0;
    if (
      (E ? ((m = (m & 1) | 2), (e.flags |= 128)) : (m &= 1),
      at(ae, m),
      Ee(t, e, i, n),
      (i = Ct ? ol : 0),
      !E && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && dh(t, n, e);
        else if (t.tag === 19) dh(t, n, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (u) {
      case "forwards":
        for (n = e.child, u = null; n !== null; )
          ((t = n.alternate), t !== null && Ur(t) === null && (u = n), (n = n.sibling));
        ((n = u),
          n === null ? ((u = e.child), (e.child = null)) : ((u = n.sibling), (n.sibling = null)),
          ys(e, !1, u, n, s, i));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && Ur(t) === null)) {
            e.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = n), (n = u), (u = t));
        }
        ys(e, !0, n, null, s, i);
        break;
      case "together":
        ys(e, !1, null, null, void 0, i);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Mn(t, e, n) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (aa |= e.lanes), (n & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((bi(t, e, n, !1), (n & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, n = _n(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        ((t = t.sibling), (n = n.sibling = _n(t, t.pendingProps)), (n.return = e));
      n.sibling = null;
    }
    return e.child;
  }
  function gs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && wr(t)));
  }
  function bg(t, e, n) {
    switch (e.tag) {
      case 3:
        (Xt(e, e.stateNode.containerInfo), Pn(e, le, t.memoizedState.cache), Na());
        break;
      case 27:
      case 5:
        Ke(e);
        break;
      case 4:
        Xt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Pn(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Vo(e), null);
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (Wn(e), (e.flags |= 128), null)
            : (n & e.child.childLanes) !== 0
              ? fh(t, e, n)
              : (Wn(e), (t = Mn(t, e, n)), t !== null ? t.sibling : null);
        Wn(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((i = (n & e.childLanes) !== 0),
          i || (bi(t, e, n, !1), (i = (n & e.childLanes) !== 0)),
          u)
        ) {
          if (i) return hh(t, e, n);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          at(ae, ae.current),
          i)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), lh(t, e, n, e.pendingProps));
      case 24:
        Pn(e, le, t.memoizedState.cache);
    }
    return Mn(t, e, n);
  }
  function ph(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) ue = !0;
      else {
        if (!gs(t, n) && (e.flags & 128) === 0) return ((ue = !1), bg(t, e, n));
        ue = (t.flags & 131072) !== 0;
      }
    else ((ue = !1), Ct && (e.flags & 1048576) !== 0 && Kf(e, ol, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var i = e.pendingProps;
          if (((t = Ya(e.elementType)), (e.type = t), typeof t == "function"))
            _o(t)
              ? ((i = Qa(t, i)), (e.tag = 1), (e = sh(null, e, t, i, n)))
              : ((e.tag = 0), (e = cs(null, e, t, i, n)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === V) {
                ((e.tag = 11), (e = nh(null, e, t, i, n)));
                break t;
              } else if (u === F) {
                ((e.tag = 14), (e = ah(null, e, t, i, n)));
                break t;
              }
            }
            throw ((e = Pt(t) || t), Error(o(306, e, "")));
          }
        }
        return e;
      case 0:
        return cs(t, e, e.type, e.pendingProps, n);
      case 1:
        return ((i = e.type), (u = Qa(i, e.pendingProps)), sh(t, e, i, u, n));
      case 3:
        t: {
          if ((Xt(e, e.stateNode.containerInfo), t === null)) throw Error(o(387));
          i = e.pendingProps;
          var s = e.memoizedState;
          ((u = s.element), jo(t, e), yl(e, i, null, n));
          var m = e.memoizedState;
          if (
            ((i = m.cache),
            Pn(e, le, i),
            i !== s.cache && zo(e, [le], n, !0),
            ml(),
            (i = m.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: i, isDehydrated: !1, cache: m.cache }),
              (e.updateQueue.baseState = s),
              (e.memoizedState = s),
              e.flags & 256)
            ) {
              e = ch(t, e, i, n);
              break t;
            } else if (i !== u) {
              ((u = ke(Error(o(424)), e)), sl(u), (e = ch(t, e, i, n)));
              break t;
            } else
              for (
                t = e.stateNode.containerInfo,
                  t.nodeType === 9
                    ? (t = t.body)
                    : (t = t.nodeName === "HTML" ? t.ownerDocument.body : t),
                  Jt = nn(t.firstChild),
                  Se = e,
                  Ct = !0,
                  In = null,
                  tn = !0,
                  n = ld(e, null, i, n),
                  e.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((Na(), i === u)) {
              e = Mn(t, e, n);
              break t;
            }
            Ee(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Qr(t, e),
          t === null
            ? (n = wp(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = n)
              : Ct ||
                ((n = e.type),
                (t = e.pendingProps),
                (i = uu(gt.current).createElement(n)),
                (i[ve] = e),
                (i[Ce] = t),
                _e(i, n, t),
                me(i),
                (e.stateNode = i))
            : (e.memoizedState = wp(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          Ke(e),
          t === null &&
            Ct &&
            ((i = e.stateNode = _p(e.type, e.pendingProps, gt.current)),
            (Se = e),
            (tn = !0),
            (u = Jt),
            oa(e.type) ? ((Js = u), (Jt = nn(i.firstChild))) : (Jt = u)),
          Ee(t, e, e.pendingProps.children, n),
          Qr(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            Ct &&
            ((u = i = Jt) &&
              ((i = Jg(i, e.type, e.pendingProps, tn)),
              i !== null
                ? ((e.stateNode = i), (Se = e), (Jt = nn(i.firstChild)), (tn = !1), (u = !0))
                : (u = !1)),
            u || Fn(e)),
          Ke(e),
          (u = e.type),
          (s = e.pendingProps),
          (m = t !== null ? t.memoizedProps : null),
          (i = s.children),
          Zs(u, s) ? (i = null) : m !== null && Zs(u, m) && (e.flags |= 32),
          e.memoizedState !== null && ((u = Qo(t, e, fg, null, null, n)), (Nl._currentValue = u)),
          Qr(t, e),
          Ee(t, e, i, n),
          e.child
        );
      case 6:
        return (
          t === null &&
            Ct &&
            ((t = n = Jt) &&
              ((n = kg(n, e.pendingProps, tn)),
              n !== null ? ((e.stateNode = n), (Se = e), (Jt = null), (t = !0)) : (t = !1)),
            t || Fn(e)),
          null
        );
      case 13:
        return fh(t, e, n);
      case 4:
        return (
          Xt(e, e.stateNode.containerInfo),
          (i = e.pendingProps),
          t === null ? (e.child = Va(e, null, i, n)) : Ee(t, e, i, n),
          e.child
        );
      case 11:
        return nh(t, e, e.type, e.pendingProps, n);
      case 7:
        return (Ee(t, e, e.pendingProps, n), e.child);
      case 8:
        return (Ee(t, e, e.pendingProps.children, n), e.child);
      case 12:
        return (Ee(t, e, e.pendingProps.children, n), e.child);
      case 10:
        return ((i = e.pendingProps), Pn(e, e.type, i.value), Ee(t, e, i.children, n), e.child);
      case 9:
        return (
          (u = e.type._context),
          (i = e.pendingProps.children),
          Ha(e),
          (u = be(u)),
          (i = i(u)),
          (e.flags |= 1),
          Ee(t, e, i, n),
          e.child
        );
      case 14:
        return ah(t, e, e.type, e.pendingProps, n);
      case 15:
        return ih(t, e, e.type, e.pendingProps, n);
      case 19:
        return hh(t, e, n);
      case 31:
        return Sg(t, e, n);
      case 22:
        return lh(t, e, n, e.pendingProps);
      case 24:
        return (
          Ha(e),
          (i = be(le)),
          t === null
            ? ((u = Do()),
              u === null &&
                ((u = It),
                (s = Bo()),
                (u.pooledCache = s),
                s.refCount++,
                s !== null && (u.pooledCacheLanes |= n),
                (u = s)),
              (e.memoizedState = { parent: i, cache: u }),
              No(e),
              Pn(e, le, u))
            : ((t.lanes & n) !== 0 && (jo(t, e), yl(e, null, null, n), ml()),
              (u = t.memoizedState),
              (s = e.memoizedState),
              u.parent !== i
                ? ((u = { parent: i, cache: i }),
                  (e.memoizedState = u),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u),
                  Pn(e, le, i))
                : ((i = s.cache), Pn(e, le, i), i !== u.cache && zo(e, [le], n, !0))),
          Ee(t, e, e.pendingProps.children, n),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function Cn(t) {
    t.flags |= 4;
  }
  function vs(t, e, n, i, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Gh()) t.flags |= 8192;
        else throw ((Ga = Cr), Lo);
    } else t.flags &= -16777217;
  }
  function mh(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !Op(e)))
      if (Gh()) t.flags |= 8192;
      else throw ((Ga = Cr), Lo);
  }
  function Kr(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Ic() : 536870912), (t.lanes |= e), (Bi |= e)));
  }
  function _l(t, e) {
    if (!Ct)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; ) (e.alternate !== null && (n = e), (e = e.sibling));
          n === null ? (t.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = t.tail;
          for (var i = null; n !== null; ) (n.alternate !== null && (i = n), (n = n.sibling));
          i === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (i.sibling = null);
      }
  }
  function kt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      n = 0,
      i = 0;
    if (e)
      for (var u = t.child; u !== null; )
        ((n |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags & 65011712),
          (i |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling));
    else
      for (u = t.child; u !== null; )
        ((n |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags),
          (i |= u.flags),
          (u.return = t),
          (u = u.sibling));
    return ((t.subtreeFlags |= i), (t.childLanes = n), e);
  }
  function Eg(t, e, n) {
    var i = e.pendingProps;
    switch ((Ro(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (kt(e), null);
      case 1:
        return (kt(e), null);
      case 3:
        return (
          (n = e.stateNode),
          (i = null),
          t !== null && (i = t.memoizedState.cache),
          e.memoizedState.cache !== i && (e.flags |= 2048),
          wn(le),
          jt(),
          n.pendingContext && ((n.context = n.pendingContext), (n.pendingContext = null)),
          (t === null || t.child === null) &&
            (Si(e)
              ? Cn(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Mo())),
          kt(e),
          null
        );
      case 26:
        var u = e.type,
          s = e.memoizedState;
        return (
          t === null
            ? (Cn(e), s !== null ? (kt(e), mh(e, s)) : (kt(e), vs(e, u, null, i, n)))
            : s
              ? s !== t.memoizedState
                ? (Cn(e), kt(e), mh(e, s))
                : (kt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== i && Cn(e), kt(e), vs(e, u, t, i, n)),
          null
        );
      case 27:
        if ((ln(e), (n = gt.current), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== i && Cn(e);
        else {
          if (!i) {
            if (e.stateNode === null) throw Error(o(166));
            return (kt(e), null);
          }
          ((t = lt.current), Si(e) ? Ff(e) : ((t = _p(u, i, n)), (e.stateNode = t), Cn(e)));
        }
        return (kt(e), null);
      case 5:
        if ((ln(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== i && Cn(e);
        else {
          if (!i) {
            if (e.stateNode === null) throw Error(o(166));
            return (kt(e), null);
          }
          if (((s = lt.current), Si(e))) Ff(e);
          else {
            var m = uu(gt.current);
            switch (s) {
              case 1:
                s = m.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                s = m.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    s = m.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    s = m.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                    break;
                  case "script":
                    ((s = m.createElement("div")),
                      (s.innerHTML = "<script><\/script>"),
                      (s = s.removeChild(s.firstChild)));
                    break;
                  case "select":
                    ((s =
                      typeof i.is == "string"
                        ? m.createElement("select", { is: i.is })
                        : m.createElement("select")),
                      i.multiple ? (s.multiple = !0) : i.size && (s.size = i.size));
                    break;
                  default:
                    s =
                      typeof i.is == "string"
                        ? m.createElement(u, { is: i.is })
                        : m.createElement(u);
                }
            }
            ((s[ve] = e), (s[Ce] = i));
            t: for (m = e.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6) s.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === e) break t;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === e) break t;
                m = m.return;
              }
              ((m.sibling.return = m.return), (m = m.sibling));
            }
            e.stateNode = s;
            t: switch ((_e(s, u, i), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
            i && Cn(e);
          }
        }
        return (kt(e), vs(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, n), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== i && Cn(e);
        else {
          if (typeof i != "string" && e.stateNode === null) throw Error(o(166));
          if (((t = gt.current), Si(e))) {
            if (((t = e.stateNode), (n = e.memoizedProps), (i = null), (u = Se), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            ((t[ve] = e),
              (t = !!(
                t.nodeValue === n ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                fp(t.nodeValue, n)
              )),
              t || Fn(e, !0));
          } else ((t = uu(t).createTextNode(i)), (t[ve] = e), (e.stateNode = t));
        }
        return (kt(e), null);
      case 31:
        if (((n = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((i = Si(e)), n !== null)) {
            if (t === null) {
              if (!i) throw Error(o(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(o(557));
              t[ve] = e;
            } else (Na(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (kt(e), (t = !1));
          } else
            ((n = Mo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n),
              (t = !0));
          if (!t) return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
          if ((e.flags & 128) !== 0) throw Error(o(558));
        }
        return (kt(e), null);
      case 13:
        if (
          ((i = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = Si(e)), i !== null && i.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(o(318));
              if (((u = e.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(o(317));
              u[ve] = e;
            } else (Na(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (kt(e), (u = !1));
          } else
            ((u = Mo()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
        }
        return (
          Ve(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = n), e)
            : ((n = i !== null),
              (t = t !== null && t.memoizedState !== null),
              n &&
                ((i = e.child),
                (u = null),
                i.alternate !== null &&
                  i.alternate.memoizedState !== null &&
                  i.alternate.memoizedState.cachePool !== null &&
                  (u = i.alternate.memoizedState.cachePool.pool),
                (s = null),
                i.memoizedState !== null &&
                  i.memoizedState.cachePool !== null &&
                  (s = i.memoizedState.cachePool.pool),
                s !== u && (i.flags |= 2048)),
              n !== t && n && (e.child.flags |= 8192),
              Kr(e, e.updateQueue),
              kt(e),
              null)
        );
      case 4:
        return (jt(), t === null && Ys(e.stateNode.containerInfo), kt(e), null);
      case 10:
        return (wn(e.type), kt(e), null);
      case 19:
        if ((K(ae), (i = e.memoizedState), i === null)) return (kt(e), null);
        if (((u = (e.flags & 128) !== 0), (s = i.rendering), s === null))
          if (u) _l(i, !1);
          else {
            if (ne !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((s = Ur(t)), s !== null)) {
                  for (
                    e.flags |= 128,
                      _l(i, !1),
                      t = s.updateQueue,
                      e.updateQueue = t,
                      Kr(e, t),
                      e.subtreeFlags = 0,
                      t = n,
                      n = e.child;
                    n !== null;
                  )
                    (Xf(n, t), (n = n.sibling));
                  return (at(ae, (ae.current & 1) | 2), Ct && xn(e, i.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            i.tail !== null &&
              pe() > kr &&
              ((e.flags |= 128), (u = !0), _l(i, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = Ur(s)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Kr(e, t),
                _l(i, !0),
                i.tail === null && i.tailMode === "hidden" && !s.alternate && !Ct)
              )
                return (kt(e), null);
            } else
              2 * pe() - i.renderingStartTime > kr &&
                n !== 536870912 &&
                ((e.flags |= 128), (u = !0), _l(i, !1), (e.lanes = 4194304));
          i.isBackwards
            ? ((s.sibling = e.child), (e.child = s))
            : ((t = i.last), t !== null ? (t.sibling = s) : (e.child = s), (i.last = s));
        }
        return i.tail !== null
          ? ((t = i.tail),
            (i.rendering = t),
            (i.tail = t.sibling),
            (i.renderingStartTime = pe()),
            (t.sibling = null),
            (n = ae.current),
            at(ae, u ? (n & 1) | 2 : n & 1),
            Ct && xn(e, i.treeForkCount),
            t)
          : (kt(e), null);
      case 22:
      case 23:
        return (
          Ve(e),
          Go(),
          (i = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== i && (e.flags |= 8192)
            : i && (e.flags |= 8192),
          i
            ? (n & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (kt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : kt(e),
          (n = e.updateQueue),
          n !== null && Kr(e, n.retryQueue),
          (n = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          (i = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (i = e.memoizedState.cachePool.pool),
          i !== n && (e.flags |= 2048),
          t !== null && K(qa),
          null
        );
      case 24:
        return (
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          wn(le),
          kt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function _g(t, e) {
    switch ((Ro(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          wn(le),
          jt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (ln(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((Ve(e), e.alternate === null)) throw Error(o(340));
          Na();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((Ve(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(o(340));
          Na();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (K(ae), null);
      case 4:
        return (jt(), null);
      case 10:
        return (wn(e.type), null);
      case 22:
      case 23:
        return (
          Ve(e),
          Go(),
          t !== null && K(qa),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (wn(le), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function yh(t, e) {
    switch ((Ro(e), e.tag)) {
      case 3:
        (wn(le), jt());
        break;
      case 26:
      case 27:
      case 5:
        ln(e);
        break;
      case 4:
        jt();
        break;
      case 31:
        e.memoizedState !== null && Ve(e);
        break;
      case 13:
        Ve(e);
        break;
      case 19:
        K(ae);
        break;
      case 10:
        wn(e.type);
        break;
      case 22:
      case 23:
        (Ve(e), Go(), t !== null && K(qa));
        break;
      case 24:
        wn(le);
    }
  }
  function xl(t, e) {
    try {
      var n = e.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var s = n.create,
              m = n.inst;
            ((i = s()), (m.destroy = i));
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (E) {
      Vt(e, e.return, E);
    }
  }
  function ea(t, e, n) {
    try {
      var i = e.updateQueue,
        u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next;
        i = s;
        do {
          if ((i.tag & t) === t) {
            var m = i.inst,
              E = m.destroy;
            if (E !== void 0) {
              ((m.destroy = void 0), (u = e));
              var O = n,
                H = E;
              try {
                H();
              } catch (I) {
                Vt(u, O, I);
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (I) {
      Vt(e, e.return, I);
    }
  }
  function gh(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        ud(e, n);
      } catch (i) {
        Vt(t, t.return, i);
      }
    }
  }
  function vh(t, e, n) {
    ((n.props = Qa(t.type, t.memoizedProps)), (n.state = t.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (i) {
      Vt(t, e, i);
    }
  }
  function Al(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var i = t.stateNode;
            break;
          case 30:
            i = t.stateNode;
            break;
          default:
            i = t.stateNode;
        }
        typeof n == "function" ? (t.refCleanup = n(i)) : (n.current = i);
      }
    } catch (u) {
      Vt(t, e, u);
    }
  }
  function pn(t, e) {
    var n = t.ref,
      i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (u) {
          Vt(t, e, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Vt(t, e, u);
        }
      else n.current = null;
  }
  function Sh(t) {
    var e = t.type,
      n = t.memoizedProps,
      i = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break t;
        case "img":
          n.src ? (i.src = n.src) : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (u) {
      Vt(t, t.return, u);
    }
  }
  function Ss(t, e, n) {
    try {
      var i = t.stateNode;
      (Qg(i, t.type, n, e), (i[Ce] = e));
    } catch (u) {
      Vt(t, t.return, u);
    }
  }
  function bh(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && oa(t.type)) || t.tag === 4
    );
  }
  function bs(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || bh(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && oa(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Es(t, e, n) {
    var i = t.tag;
    if (i === 5 || i === 6)
      ((t = t.stateNode),
        e
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n
            ).insertBefore(t, e)
          : ((e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n),
            e.appendChild(t),
            (n = n._reactRootContainer),
            n != null || e.onclick !== null || (e.onclick = bn)));
    else if (
      i !== 4 &&
      (i === 27 && oa(t.type) && ((n = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (Es(t, e, n), t = t.sibling; t !== null; ) (Es(t, e, n), (t = t.sibling));
  }
  function Ir(t, e, n) {
    var i = t.tag;
    if (i === 5 || i === 6) ((t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t));
    else if (i !== 4 && (i === 27 && oa(t.type) && (n = t.stateNode), (t = t.child), t !== null))
      for (Ir(t, e, n), t = t.sibling; t !== null; ) (Ir(t, e, n), (t = t.sibling));
  }
  function Eh(t) {
    var e = t.stateNode,
      n = t.memoizedProps;
    try {
      for (var i = t.type, u = e.attributes; u.length; ) e.removeAttributeNode(u[0]);
      (_e(e, i, n), (e[ve] = t), (e[Ce] = n));
    } catch (s) {
      Vt(t, t.return, s);
    }
  }
  var On = !1,
    oe = !1,
    _s = !1,
    _h = typeof WeakSet == "function" ? WeakSet : Set,
    ye = null;
  function xg(t, e) {
    if (((t = t.containerInfo), (Xs = pu), (t = Df(t)), mo(t))) {
      if ("selectionStart" in t) var n = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          n = ((n = t.ownerDocument) && n.defaultView) || window;
          var i = n.getSelection && n.getSelection();
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode;
            var u = i.anchorOffset,
              s = i.focusNode;
            i = i.focusOffset;
            try {
              (n.nodeType, s.nodeType);
            } catch {
              n = null;
              break t;
            }
            var m = 0,
              E = -1,
              O = -1,
              H = 0,
              I = 0,
              k = t,
              Y = null;
            e: for (;;) {
              for (
                var X;
                k !== n || (u !== 0 && k.nodeType !== 3) || (E = m + u),
                  k !== s || (i !== 0 && k.nodeType !== 3) || (O = m + i),
                  k.nodeType === 3 && (m += k.nodeValue.length),
                  (X = k.firstChild) !== null;
              )
                ((Y = k), (k = X));
              for (;;) {
                if (k === t) break e;
                if (
                  (Y === n && ++H === u && (E = m),
                  Y === s && ++I === i && (O = m),
                  (X = k.nextSibling) !== null)
                )
                  break;
                ((k = Y), (Y = k.parentNode));
              }
              k = X;
            }
            n = E === -1 || O === -1 ? null : { start: E, end: O };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Qs = { focusedElem: t, selectionRange: n }, pu = !1, ye = e; ye !== null; )
      if (((e = ye), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (ye = t));
      else
        for (; ye !== null; ) {
          switch (((e = ye), (s = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (n = 0; n < t.length; n++) ((u = t[n]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && s !== null) {
                ((t = void 0),
                  (n = e),
                  (u = s.memoizedProps),
                  (s = s.memoizedState),
                  (i = n.stateNode));
                try {
                  var ut = Qa(n.type, u);
                  ((t = i.getSnapshotBeforeUpdate(ut, s)),
                    (i.__reactInternalSnapshotBeforeUpdate = t));
                } catch (mt) {
                  Vt(n, n.return, mt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9)) Is(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Is(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (ye = t));
            break;
          }
          ye = e.return;
        }
  }
  function xh(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (Bn(t, n), i & 4 && xl(5, n));
        break;
      case 1:
        if ((Bn(t, n), i & 4))
          if (((t = n.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (m) {
              Vt(n, n.return, m);
            }
          else {
            var u = Qa(n.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              Vt(n, n.return, m);
            }
          }
        (i & 64 && gh(n), i & 512 && Al(n, n.return));
        break;
      case 3:
        if ((Bn(t, n), i & 64 && ((t = n.updateQueue), t !== null))) {
          if (((e = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            ud(t, e);
          } catch (m) {
            Vt(n, n.return, m);
          }
        }
        break;
      case 27:
        e === null && i & 4 && Eh(n);
      case 26:
      case 5:
        (Bn(t, n), e === null && i & 4 && Sh(n), i & 512 && Al(n, n.return));
        break;
      case 12:
        Bn(t, n);
        break;
      case 31:
        (Bn(t, n), i & 4 && Rh(t, n));
        break;
      case 13:
        (Bn(t, n),
          i & 4 && Th(t, n),
          i & 64 &&
            ((t = n.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((n = Bg.bind(null, n)), $g(t, n)))));
        break;
      case 22:
        if (((i = n.memoizedState !== null || On), !i)) {
          ((e = (e !== null && e.memoizedState !== null) || oe), (u = On));
          var s = oe;
          ((On = i),
            (oe = e) && !s ? Un(t, n, (n.subtreeFlags & 8772) !== 0) : Bn(t, n),
            (On = u),
            (oe = s));
        }
        break;
      case 30:
        break;
      default:
        Bn(t, n);
    }
  }
  function Ah(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), Ah(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && ku(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Wt = null,
    ze = !1;
  function zn(t, e, n) {
    for (n = n.child; n !== null; ) (wh(t, e, n), (n = n.sibling));
  }
  function wh(t, e, n) {
    if (pt && typeof pt.onCommitFiberUnmount == "function")
      try {
        pt.onCommitFiberUnmount(P, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (oe || pn(n, e),
          zn(t, e, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        oe || pn(n, e);
        var i = Wt,
          u = ze;
        (oa(n.type) && ((Wt = n.stateNode), (ze = !1)),
          zn(t, e, n),
          Ul(n.stateNode),
          (Wt = i),
          (ze = u));
        break;
      case 5:
        oe || pn(n, e);
      case 6:
        if (((i = Wt), (u = ze), (Wt = null), zn(t, e, n), (Wt = i), (ze = u), Wt !== null))
          if (ze)
            try {
              (Wt.nodeType === 9
                ? Wt.body
                : Wt.nodeName === "HTML"
                  ? Wt.ownerDocument.body
                  : Wt
              ).removeChild(n.stateNode);
            } catch (s) {
              Vt(n, e, s);
            }
          else
            try {
              Wt.removeChild(n.stateNode);
            } catch (s) {
              Vt(n, e, s);
            }
        break;
      case 18:
        Wt !== null &&
          (ze
            ? ((t = Wt),
              gp(
                t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
                n.stateNode,
              ),
              Yi(t))
            : gp(Wt, n.stateNode));
        break;
      case 4:
        ((i = Wt),
          (u = ze),
          (Wt = n.stateNode.containerInfo),
          (ze = !0),
          zn(t, e, n),
          (Wt = i),
          (ze = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ea(2, n, e), oe || ea(4, n, e), zn(t, e, n));
        break;
      case 1:
        (oe ||
          (pn(n, e), (i = n.stateNode), typeof i.componentWillUnmount == "function" && vh(n, e, i)),
          zn(t, e, n));
        break;
      case 21:
        zn(t, e, n);
        break;
      case 22:
        ((oe = (i = oe) || n.memoizedState !== null), zn(t, e, n), (oe = i));
        break;
      default:
        zn(t, e, n);
    }
  }
  function Rh(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Yi(t);
      } catch (n) {
        Vt(e, e.return, n);
      }
    }
  }
  function Th(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Yi(t);
      } catch (n) {
        Vt(e, e.return, n);
      }
  }
  function Ag(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new _h()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new _h()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function Fr(t, e) {
    var n = Ag(t);
    e.forEach(function (i) {
      if (!n.has(i)) {
        n.add(i);
        var u = Ug.bind(null, t, i);
        i.then(u, u);
      }
    });
  }
  function Be(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i],
          s = t,
          m = e,
          E = m;
        t: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (oa(E.type)) {
                ((Wt = E.stateNode), (ze = !1));
                break t;
              }
              break;
            case 5:
              ((Wt = E.stateNode), (ze = !1));
              break t;
            case 3:
            case 4:
              ((Wt = E.stateNode.containerInfo), (ze = !0));
              break t;
          }
          E = E.return;
        }
        if (Wt === null) throw Error(o(160));
        (wh(s, m, u),
          (Wt = null),
          (ze = !1),
          (s = u.alternate),
          s !== null && (s.return = null),
          (u.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (Mh(e, t), (e = e.sibling));
  }
  var sn = null;
  function Mh(t, e) {
    var n = t.alternate,
      i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Be(e, t), Ue(t), i & 4 && (ea(3, t, t.return), xl(3, t), ea(5, t, t.return)));
        break;
      case 1:
        (Be(e, t),
          Ue(t),
          i & 512 && (oe || n === null || pn(n, n.return)),
          i & 64 &&
            On &&
            ((t = t.updateQueue),
            t !== null &&
              ((i = t.callbacks),
              i !== null &&
                ((n = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = n === null ? i : n.concat(i))))));
        break;
      case 26:
        var u = sn;
        if ((Be(e, t), Ue(t), i & 512 && (oe || n === null || pn(n, n.return)), i & 4)) {
          var s = n !== null ? n.memoizedState : null;
          if (((i = t.memoizedState), n === null))
            if (i === null)
              if (t.stateNode === null) {
                t: {
                  ((i = t.type), (n = t.memoizedProps), (u = u.ownerDocument || u));
                  e: switch (i) {
                    case "title":
                      ((s = u.getElementsByTagName("title")[0]),
                        (!s ||
                          s[ki] ||
                          s[ve] ||
                          s.namespaceURI === "http://www.w3.org/2000/svg" ||
                          s.hasAttribute("itemprop")) &&
                          ((s = u.createElement(i)),
                          u.head.insertBefore(s, u.querySelector("head > title"))),
                        _e(s, i, n),
                        (s[ve] = t),
                        me(s),
                        (i = s));
                      break t;
                    case "link":
                      var m = Mp("link", "href", u).get(i + (n.href || ""));
                      if (m) {
                        for (var E = 0; E < m.length; E++)
                          if (
                            ((s = m[E]),
                            s.getAttribute("href") ===
                              (n.href == null || n.href === "" ? null : n.href) &&
                              s.getAttribute("rel") === (n.rel == null ? null : n.rel) &&
                              s.getAttribute("title") === (n.title == null ? null : n.title) &&
                              s.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            m.splice(E, 1);
                            break e;
                          }
                      }
                      ((s = u.createElement(i)), _e(s, i, n), u.head.appendChild(s));
                      break;
                    case "meta":
                      if ((m = Mp("meta", "content", u).get(i + (n.content || "")))) {
                        for (E = 0; E < m.length; E++)
                          if (
                            ((s = m[E]),
                            s.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              s.getAttribute("name") === (n.name == null ? null : n.name) &&
                              s.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              s.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              s.getAttribute("charset") === (n.charSet == null ? null : n.charSet))
                          ) {
                            m.splice(E, 1);
                            break e;
                          }
                      }
                      ((s = u.createElement(i)), _e(s, i, n), u.head.appendChild(s));
                      break;
                    default:
                      throw Error(o(468, i));
                  }
                  ((s[ve] = t), me(s), (i = s));
                }
                t.stateNode = i;
              } else Cp(u, t.type, t.stateNode);
            else t.stateNode = Tp(u, i, t.memoizedProps);
          else
            s !== i
              ? (s === null
                  ? n.stateNode !== null && ((n = n.stateNode), n.parentNode.removeChild(n))
                  : s.count--,
                i === null ? Cp(u, t.type, t.stateNode) : Tp(u, i, t.memoizedProps))
              : i === null && t.stateNode !== null && Ss(t, t.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (Be(e, t),
          Ue(t),
          i & 512 && (oe || n === null || pn(n, n.return)),
          n !== null && i & 4 && Ss(t, t.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if ((Be(e, t), Ue(t), i & 512 && (oe || n === null || pn(n, n.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            si(u, "");
          } catch (ut) {
            Vt(t, t.return, ut);
          }
        }
        (i & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Ss(t, u, n !== null ? n.memoizedProps : u)),
          i & 1024 && (_s = !0));
        break;
      case 6:
        if ((Be(e, t), Ue(t), i & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((i = t.memoizedProps), (n = t.stateNode));
          try {
            n.nodeValue = i;
          } catch (ut) {
            Vt(t, t.return, ut);
          }
        }
        break;
      case 3:
        if (
          ((cu = null),
          (u = sn),
          (sn = ou(e.containerInfo)),
          Be(e, t),
          (sn = u),
          Ue(t),
          i & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Yi(e.containerInfo);
          } catch (ut) {
            Vt(t, t.return, ut);
          }
        _s && ((_s = !1), Ch(t));
        break;
      case 4:
        ((i = sn), (sn = ou(t.stateNode.containerInfo)), Be(e, t), Ue(t), (sn = i));
        break;
      case 12:
        (Be(e, t), Ue(t));
        break;
      case 31:
        (Be(e, t),
          Ue(t),
          i & 4 && ((i = t.updateQueue), i !== null && ((t.updateQueue = null), Fr(t, i))));
        break;
      case 13:
        (Be(e, t),
          Ue(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (n !== null && n.memoizedState !== null) &&
            (Jr = pe()),
          i & 4 && ((i = t.updateQueue), i !== null && ((t.updateQueue = null), Fr(t, i))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var O = n !== null && n.memoizedState !== null,
          H = On,
          I = oe;
        if (((On = H || u), (oe = I || O), Be(e, t), (oe = I), (On = H), Ue(t), i & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (n === null || O || On || oe || Za(t)),
              n = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                O = n = e;
                try {
                  if (((s = O.stateNode), u))
                    ((m = s.style),
                      typeof m.setProperty == "function"
                        ? m.setProperty("display", "none", "important")
                        : (m.display = "none"));
                  else {
                    E = O.stateNode;
                    var k = O.memoizedProps.style,
                      Y = k != null && k.hasOwnProperty("display") ? k.display : null;
                    E.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (ut) {
                  Vt(O, O.return, ut);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                O = e;
                try {
                  O.stateNode.nodeValue = u ? "" : O.memoizedProps;
                } catch (ut) {
                  Vt(O, O.return, ut);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                O = e;
                try {
                  var X = O.stateNode;
                  u ? vp(X, !0) : vp(O.stateNode, !1);
                } catch (ut) {
                  Vt(O, O.return, ut);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) || e.memoizedState === null || e === t) &&
              e.child !== null
            ) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              (n === e && (n = null), (e = e.return));
            }
            (n === e && (n = null), (e.sibling.return = e.return), (e = e.sibling));
          }
        i & 4 &&
          ((i = t.updateQueue),
          i !== null && ((n = i.retryQueue), n !== null && ((i.retryQueue = null), Fr(t, n))));
        break;
      case 19:
        (Be(e, t),
          Ue(t),
          i & 4 && ((i = t.updateQueue), i !== null && ((t.updateQueue = null), Fr(t, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Be(e, t), Ue(t));
    }
  }
  function Ue(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (bh(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var u = n.stateNode,
              s = bs(t);
            Ir(t, s, u);
            break;
          case 5:
            var m = n.stateNode;
            n.flags & 32 && (si(m, ""), (n.flags &= -33));
            var E = bs(t);
            Ir(t, E, m);
            break;
          case 3:
          case 4:
            var O = n.stateNode.containerInfo,
              H = bs(t);
            Es(t, H, O);
            break;
          default:
            throw Error(o(161));
        }
      } catch (I) {
        Vt(t, t.return, I);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Ch(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (Ch(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function Bn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (xh(t, e.alternate, e), (e = e.sibling));
  }
  function Za(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ea(4, e, e.return), Za(e));
          break;
        case 1:
          pn(e, e.return);
          var n = e.stateNode;
          (typeof n.componentWillUnmount == "function" && vh(e, e.return, n), Za(e));
          break;
        case 27:
          Ul(e.stateNode);
        case 26:
        case 5:
          (pn(e, e.return), Za(e));
          break;
        case 22:
          e.memoizedState === null && Za(e);
          break;
        case 30:
          Za(e);
          break;
        default:
          Za(e);
      }
      t = t.sibling;
    }
  }
  function Un(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var i = e.alternate,
        u = t,
        s = e,
        m = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          (Un(u, s, n), xl(4, s));
          break;
        case 1:
          if ((Un(u, s, n), (i = s), (u = i.stateNode), typeof u.componentDidMount == "function"))
            try {
              u.componentDidMount();
            } catch (H) {
              Vt(i, i.return, H);
            }
          if (((i = s), (u = i.updateQueue), u !== null)) {
            var E = i.stateNode;
            try {
              var O = u.shared.hiddenCallbacks;
              if (O !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < O.length; u++) rd(O[u], E);
            } catch (H) {
              Vt(i, i.return, H);
            }
          }
          (n && m & 64 && gh(s), Al(s, s.return));
          break;
        case 27:
          Eh(s);
        case 26:
        case 5:
          (Un(u, s, n), n && i === null && m & 4 && Sh(s), Al(s, s.return));
          break;
        case 12:
          Un(u, s, n);
          break;
        case 31:
          (Un(u, s, n), n && m & 4 && Rh(u, s));
          break;
        case 13:
          (Un(u, s, n), n && m & 4 && Th(u, s));
          break;
        case 22:
          (s.memoizedState === null && Un(u, s, n), Al(s, s.return));
          break;
        case 30:
          break;
        default:
          Un(u, s, n);
      }
      e = e.sibling;
    }
  }
  function xs(t, e) {
    var n = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (n = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== n && (t != null && t.refCount++, n != null && cl(n)));
  }
  function As(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && cl(t)));
  }
  function cn(t, e, n, i) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Oh(t, e, n, i), (e = e.sibling));
  }
  function Oh(t, e, n, i) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (cn(t, e, n, i), u & 2048 && xl(9, e));
        break;
      case 1:
        cn(t, e, n, i);
        break;
      case 3:
        (cn(t, e, n, i),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && cl(t))));
        break;
      case 12:
        if (u & 2048) {
          (cn(t, e, n, i), (t = e.stateNode));
          try {
            var s = e.memoizedProps,
              m = s.id,
              E = s.onPostCommit;
            typeof E == "function" &&
              E(m, e.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
          } catch (O) {
            Vt(e, e.return, O);
          }
        } else cn(t, e, n, i);
        break;
      case 31:
        cn(t, e, n, i);
        break;
      case 13:
        cn(t, e, n, i);
        break;
      case 23:
        break;
      case 22:
        ((s = e.stateNode),
          (m = e.alternate),
          e.memoizedState !== null
            ? s._visibility & 2
              ? cn(t, e, n, i)
              : wl(t, e)
            : s._visibility & 2
              ? cn(t, e, n, i)
              : ((s._visibility |= 2), Ci(t, e, n, i, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && xs(m, e));
        break;
      case 24:
        (cn(t, e, n, i), u & 2048 && As(e.alternate, e));
        break;
      default:
        cn(t, e, n, i);
    }
  }
  function Ci(t, e, n, i, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var s = t,
        m = e,
        E = n,
        O = i,
        H = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (Ci(s, m, E, O, u), xl(8, m));
          break;
        case 23:
          break;
        case 22:
          var I = m.stateNode;
          (m.memoizedState !== null
            ? I._visibility & 2
              ? Ci(s, m, E, O, u)
              : wl(s, m)
            : ((I._visibility |= 2), Ci(s, m, E, O, u)),
            u && H & 2048 && xs(m.alternate, m));
          break;
        case 24:
          (Ci(s, m, E, O, u), u && H & 2048 && As(m.alternate, m));
          break;
        default:
          Ci(s, m, E, O, u);
      }
      e = e.sibling;
    }
  }
  function wl(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t,
          i = e,
          u = i.flags;
        switch (i.tag) {
          case 22:
            (wl(n, i), u & 2048 && xs(i.alternate, i));
            break;
          case 24:
            (wl(n, i), u & 2048 && As(i.alternate, i));
            break;
          default:
            wl(n, i);
        }
        e = e.sibling;
      }
  }
  var Rl = 8192;
  function Oi(t, e, n) {
    if (t.subtreeFlags & Rl) for (t = t.child; t !== null; ) (zh(t, e, n), (t = t.sibling));
  }
  function zh(t, e, n) {
    switch (t.tag) {
      case 26:
        (Oi(t, e, n),
          t.flags & Rl && t.memoizedState !== null && cv(n, sn, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Oi(t, e, n);
        break;
      case 3:
      case 4:
        var i = sn;
        ((sn = ou(t.stateNode.containerInfo)), Oi(t, e, n), (sn = i));
        break;
      case 22:
        t.memoizedState === null &&
          ((i = t.alternate),
          i !== null && i.memoizedState !== null
            ? ((i = Rl), (Rl = 16777216), Oi(t, e, n), (Rl = i))
            : Oi(t, e, n));
        break;
      default:
        Oi(t, e, n);
    }
  }
  function Bh(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Tl(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ((ye = i), Dh(i, t));
        }
      Bh(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Uh(t), (t = t.sibling));
  }
  function Uh(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Tl(t), t.flags & 2048 && ea(9, t, t.return));
        break;
      case 3:
        Tl(t);
        break;
      case 12:
        Tl(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Pr(t))
          : Tl(t);
        break;
      default:
        Tl(t);
    }
  }
  function Pr(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ((ye = i), Dh(i, t));
        }
      Bh(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (ea(8, e, e.return), Pr(e));
          break;
        case 22:
          ((n = e.stateNode), n._visibility & 2 && ((n._visibility &= -3), Pr(e)));
          break;
        default:
          Pr(e);
      }
      t = t.sibling;
    }
  }
  function Dh(t, e) {
    for (; ye !== null; ) {
      var n = ye;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ea(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          cl(n.memoizedState.cache);
      }
      if (((i = n.child), i !== null)) ((i.return = n), (ye = i));
      else
        t: for (n = t; ye !== null; ) {
          i = ye;
          var u = i.sibling,
            s = i.return;
          if ((Ah(i), i === n)) {
            ye = null;
            break t;
          }
          if (u !== null) {
            ((u.return = s), (ye = u));
            break t;
          }
          ye = s;
        }
    }
  }
  var wg = {
      getCacheForType: function (t) {
        var e = be(le),
          n = e.data.get(t);
        return (n === void 0 && ((n = t()), e.data.set(t, n)), n);
      },
      cacheSignal: function () {
        return be(le).controller.signal;
      },
    },
    Rg = typeof WeakMap == "function" ? WeakMap : Map,
    qt = 0,
    It = null,
    xt = null,
    Rt = 0,
    Gt = 0,
    Xe = null,
    na = !1,
    zi = !1,
    ws = !1,
    Dn = 0,
    ne = 0,
    aa = 0,
    Ka = 0,
    Rs = 0,
    Qe = 0,
    Bi = 0,
    Ml = null,
    De = null,
    Ts = !1,
    Jr = 0,
    Lh = 0,
    kr = 1 / 0,
    $r = null,
    ia = null,
    fe = 0,
    la = null,
    Ui = null,
    Ln = 0,
    Ms = 0,
    Cs = null,
    Nh = null,
    Cl = 0,
    Os = null;
  function Ze() {
    return (qt & 2) !== 0 && Rt !== 0 ? Rt & -Rt : Z.T !== null ? Ns() : kc();
  }
  function jh() {
    if (Qe === 0)
      if ((Rt & 536870912) === 0 || Ct) {
        var t = rr;
        ((rr <<= 1), (rr & 3932160) === 0 && (rr = 262144), (Qe = t));
      } else Qe = 536870912;
    return ((t = Ge.current), t !== null && (t.flags |= 32), Qe);
  }
  function Le(t, e, n) {
    (((t === It && (Gt === 2 || Gt === 9)) || t.cancelPendingCommit !== null) &&
      (Di(t, 0), ra(t, Rt, Qe, !1)),
      Ji(t, n),
      ((qt & 2) === 0 || t !== It) &&
        (t === It && ((qt & 2) === 0 && (Ka |= n), ne === 4 && ra(t, Rt, Qe, !1)), mn(t)));
  }
  function Hh(t, e, n) {
    if ((qt & 6) !== 0) throw Error(o(327));
    var i = (!n && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Pi(t, e),
      u = i ? Cg(t, e) : Bs(t, e, !0),
      s = i;
    do {
      if (u === 0) {
        zi && !i && ra(t, e, 0, !1);
        break;
      } else {
        if (((n = t.current.alternate), s && !Tg(n))) {
          ((u = Bs(t, e, !1)), (s = !1));
          continue;
        }
        if (u === 2) {
          if (((s = e), t.errorRecoveryDisabledLanes & s)) var m = 0;
          else
            ((m = t.pendingLanes & -536870913), (m = m !== 0 ? m : m & 536870912 ? 536870912 : 0));
          if (m !== 0) {
            e = m;
            t: {
              var E = t;
              u = Ml;
              var O = E.current.memoizedState.isDehydrated;
              if ((O && (Di(E, m).flags |= 256), (m = Bs(E, m, !1)), m !== 2)) {
                if (ws && !O) {
                  ((E.errorRecoveryDisabledLanes |= s), (Ka |= s), (u = 4));
                  break t;
                }
                ((s = De), (De = u), s !== null && (De === null ? (De = s) : De.push.apply(De, s)));
              }
              u = m;
            }
            if (((s = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Di(t, 0), ra(t, e, 0, !0));
          break;
        }
        t: {
          switch (((i = t), (s = u), s)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              ra(i, e, Qe, !na);
              break t;
            case 2:
              De = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && ((u = Jr + 300 - pe()), 10 < u)) {
            if ((ra(i, e, Qe, !na), or(i, 0, !0) !== 0)) break t;
            ((Ln = e),
              (i.timeoutHandle = mp(
                qh.bind(null, i, n, De, $r, Ts, e, Qe, Ka, Bi, na, s, "Throttled", -0, 0),
                u,
              )));
            break t;
          }
          qh(i, n, De, $r, Ts, e, Qe, Ka, Bi, na, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    mn(t);
  }
  function qh(t, e, n, i, u, s, m, E, O, H, I, k, Y, X) {
    if (((t.timeoutHandle = -1), (k = e.subtreeFlags), k & 8192 || (k & 16785408) === 16785408)) {
      ((k = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: bn,
      }),
        zh(e, s, k));
      var ut = (s & 62914560) === s ? Jr - pe() : (s & 4194048) === s ? Lh - pe() : 0;
      if (((ut = fv(k, ut)), ut !== null)) {
        ((Ln = s),
          (t.cancelPendingCommit = ut(Ih.bind(null, t, e, s, n, i, u, m, E, O, I, k, null, Y, X))),
          ra(t, s, m, !H));
        return;
      }
    }
    Ih(t, e, s, n, i, u, m, E, O);
  }
  function Tg(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        e.flags & 16384 &&
        ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var i = 0; i < n.length; i++) {
          var u = n[i],
            s = u.getSnapshot;
          u = u.value;
          try {
            if (!qe(s(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = e.child), e.subtreeFlags & 16384 && n !== null)) ((n.return = e), (e = n));
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    }
    return !0;
  }
  function ra(t, e, n, i) {
    ((e &= ~Rs),
      (e &= ~Ka),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      i && (t.warmLanes |= e),
      (i = t.expirationTimes));
    for (var u = e; 0 < u; ) {
      var s = 31 - Et(u),
        m = 1 << s;
      ((i[s] = -1), (u &= ~m));
    }
    n !== 0 && Fc(t, n, e);
  }
  function Wr() {
    return (qt & 6) === 0 ? (Ol(0), !1) : !0;
  }
  function zs() {
    if (xt !== null) {
      if (Gt === 0) var t = xt.return;
      else ((t = xt), (An = ja = null), Io(t), (Ai = null), (dl = 0), (t = xt));
      for (; t !== null; ) (yh(t.alternate, t), (t = t.return));
      xt = null;
    }
  }
  function Di(t, e) {
    var n = t.timeoutHandle;
    (n !== -1 && ((t.timeoutHandle = -1), Ig(n)),
      (n = t.cancelPendingCommit),
      n !== null && ((t.cancelPendingCommit = null), n()),
      (Ln = 0),
      zs(),
      (It = t),
      (xt = n = _n(t.current, null)),
      (Rt = e),
      (Gt = 0),
      (Xe = null),
      (na = !1),
      (zi = Pi(t, e)),
      (ws = !1),
      (Bi = Qe = Rs = Ka = aa = ne = 0),
      (De = Ml = null),
      (Ts = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var i = t.entangledLanes;
    if (i !== 0)
      for (t = t.entanglements, i &= e; 0 < i; ) {
        var u = 31 - Et(i),
          s = 1 << u;
        ((e |= t[u]), (i &= ~s));
      }
    return ((Dn = e), br(), n);
  }
  function Yh(t, e) {
    ((vt = null),
      (Z.H = bl),
      e === xi || e === Mr
        ? ((e = nd()), (Gt = 3))
        : e === Lo
          ? ((e = nd()), (Gt = 4))
          : (Gt =
              e === ss
                ? 8
                : e !== null && typeof e == "object" && typeof e.then == "function"
                  ? 6
                  : 1),
      (Xe = e),
      xt === null && ((ne = 1), Vr(t, ke(e, t.current))));
  }
  function Gh() {
    var t = Ge.current;
    return t === null
      ? !0
      : (Rt & 4194048) === Rt
        ? en === null
        : (Rt & 62914560) === Rt || (Rt & 536870912) !== 0
          ? t === en
          : !1;
  }
  function Vh() {
    var t = Z.H;
    return ((Z.H = bl), t === null ? bl : t);
  }
  function Xh() {
    var t = Z.A;
    return ((Z.A = wg), t);
  }
  function tu() {
    ((ne = 4),
      na || ((Rt & 4194048) !== Rt && Ge.current !== null) || (zi = !0),
      ((aa & 134217727) === 0 && (Ka & 134217727) === 0) || It === null || ra(It, Rt, Qe, !1));
  }
  function Bs(t, e, n) {
    var i = qt;
    qt |= 2;
    var u = Vh(),
      s = Xh();
    ((It !== t || Rt !== e) && (($r = null), Di(t, e)), (e = !1));
    var m = ne;
    t: do
      try {
        if (Gt !== 0 && xt !== null) {
          var E = xt,
            O = Xe;
          switch (Gt) {
            case 8:
              (zs(), (m = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ge.current === null && (e = !0);
              var H = Gt;
              if (((Gt = 0), (Xe = null), Li(t, E, O, H), n && zi)) {
                m = 0;
                break t;
              }
              break;
            default:
              ((H = Gt), (Gt = 0), (Xe = null), Li(t, E, O, H));
          }
        }
        (Mg(), (m = ne));
        break;
      } catch (I) {
        Yh(t, I);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (An = ja = null),
      (qt = i),
      (Z.H = u),
      (Z.A = s),
      xt === null && ((It = null), (Rt = 0), br()),
      m
    );
  }
  function Mg() {
    for (; xt !== null; ) Qh(xt);
  }
  function Cg(t, e) {
    var n = qt;
    qt |= 2;
    var i = Vh(),
      u = Xh();
    It !== t || Rt !== e ? (($r = null), (kr = pe() + 500), Di(t, e)) : (zi = Pi(t, e));
    t: do
      try {
        if (Gt !== 0 && xt !== null) {
          e = xt;
          var s = Xe;
          e: switch (Gt) {
            case 1:
              ((Gt = 0), (Xe = null), Li(t, e, s, 1));
              break;
            case 2:
            case 9:
              if (td(s)) {
                ((Gt = 0), (Xe = null), Zh(e));
                break;
              }
              ((e = function () {
                ((Gt !== 2 && Gt !== 9) || It !== t || (Gt = 7), mn(t));
              }),
                s.then(e, e));
              break t;
            case 3:
              Gt = 7;
              break t;
            case 4:
              Gt = 5;
              break t;
            case 7:
              td(s) ? ((Gt = 0), (Xe = null), Zh(e)) : ((Gt = 0), (Xe = null), Li(t, e, s, 7));
              break;
            case 5:
              var m = null;
              switch (xt.tag) {
                case 26:
                  m = xt.memoizedState;
                case 5:
                case 27:
                  var E = xt;
                  if (m ? Op(m) : E.stateNode.complete) {
                    ((Gt = 0), (Xe = null));
                    var O = E.sibling;
                    if (O !== null) xt = O;
                    else {
                      var H = E.return;
                      H !== null ? ((xt = H), eu(H)) : (xt = null);
                    }
                    break e;
                  }
              }
              ((Gt = 0), (Xe = null), Li(t, e, s, 5));
              break;
            case 6:
              ((Gt = 0), (Xe = null), Li(t, e, s, 6));
              break;
            case 8:
              (zs(), (ne = 6));
              break t;
            default:
              throw Error(o(462));
          }
        }
        Og();
        break;
      } catch (I) {
        Yh(t, I);
      }
    while (!0);
    return (
      (An = ja = null),
      (Z.H = i),
      (Z.A = u),
      (qt = n),
      xt !== null ? 0 : ((It = null), (Rt = 0), br(), ne)
    );
  }
  function Og() {
    for (; xt !== null && !Re(); ) Qh(xt);
  }
  function Qh(t) {
    var e = ph(t.alternate, t, Dn);
    ((t.memoizedProps = t.pendingProps), e === null ? eu(t) : (xt = e));
  }
  function Zh(t) {
    var e = t,
      n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = oh(n, e, e.pendingProps, e.type, void 0, Rt);
        break;
      case 11:
        e = oh(n, e, e.pendingProps, e.type.render, e.ref, Rt);
        break;
      case 5:
        Io(e);
      default:
        (yh(n, e), (e = xt = Xf(e, Dn)), (e = ph(n, e, Dn)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? eu(t) : (xt = e));
  }
  function Li(t, e, n, i) {
    ((An = ja = null), Io(e), (Ai = null), (dl = 0));
    var u = e.return;
    try {
      if (vg(t, u, e, n, Rt)) {
        ((ne = 1), Vr(t, ke(n, t.current)), (xt = null));
        return;
      }
    } catch (s) {
      if (u !== null) throw ((xt = u), s);
      ((ne = 1), Vr(t, ke(n, t.current)), (xt = null));
      return;
    }
    e.flags & 32768
      ? (Ct || i === 1
          ? (t = !0)
          : zi || (Rt & 536870912) !== 0
            ? (t = !1)
            : ((na = t = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Ge.current), i !== null && i.tag === 13 && (i.flags |= 16384))),
        Kh(e, t))
      : eu(e);
  }
  function eu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Kh(e, na);
        return;
      }
      t = e.return;
      var n = Eg(e.alternate, e, Dn);
      if (n !== null) {
        xt = n;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        xt = e;
        return;
      }
      xt = e = t;
    } while (e !== null);
    ne === 0 && (ne = 5);
  }
  function Kh(t, e) {
    do {
      var n = _g(t.alternate, t);
      if (n !== null) {
        ((n.flags &= 32767), (xt = n));
        return;
      }
      if (
        ((n = t.return),
        n !== null && ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        xt = t;
        return;
      }
      xt = t = n;
    } while (t !== null);
    ((ne = 6), (xt = null));
  }
  function Ih(t, e, n, i, u, s, m, E, O) {
    t.cancelPendingCommit = null;
    do nu();
    while (fe !== 0);
    if ((qt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((s = e.lanes | e.childLanes),
        (s |= bo),
        s0(t, n, s, m, E, O),
        t === It && ((xt = It = null), (Rt = 0)),
        (Ui = e),
        (la = t),
        (Ln = n),
        (Ms = s),
        (Cs = u),
        (Nh = i),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            Dg(f, function () {
              return ($h(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (i = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = Z.T), (Z.T = null), (u = tt.p), (tt.p = 2), (m = qt), (qt |= 4));
        try {
          xg(t, e, n);
        } finally {
          ((qt = m), (tt.p = u), (Z.T = i));
        }
      }
      ((fe = 1), Fh(), Ph(), Jh());
    }
  }
  function Fh() {
    if (fe === 1) {
      fe = 0;
      var t = la,
        e = Ui,
        n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        ((n = Z.T), (Z.T = null));
        var i = tt.p;
        tt.p = 2;
        var u = qt;
        qt |= 4;
        try {
          Mh(e, t);
          var s = Qs,
            m = Df(t.containerInfo),
            E = s.focusedElem,
            O = s.selectionRange;
          if (m !== E && E && E.ownerDocument && Uf(E.ownerDocument.documentElement, E)) {
            if (O !== null && mo(E)) {
              var H = O.start,
                I = O.end;
              if ((I === void 0 && (I = H), "selectionStart" in E))
                ((E.selectionStart = H), (E.selectionEnd = Math.min(I, E.value.length)));
              else {
                var k = E.ownerDocument || document,
                  Y = (k && k.defaultView) || window;
                if (Y.getSelection) {
                  var X = Y.getSelection(),
                    ut = E.textContent.length,
                    mt = Math.min(O.start, ut),
                    Kt = O.end === void 0 ? mt : Math.min(O.end, ut);
                  !X.extend && mt > Kt && ((m = Kt), (Kt = mt), (mt = m));
                  var N = Bf(E, mt),
                    U = Bf(E, Kt);
                  if (
                    N &&
                    U &&
                    (X.rangeCount !== 1 ||
                      X.anchorNode !== N.node ||
                      X.anchorOffset !== N.offset ||
                      X.focusNode !== U.node ||
                      X.focusOffset !== U.offset)
                  ) {
                    var j = k.createRange();
                    (j.setStart(N.node, N.offset),
                      X.removeAllRanges(),
                      mt > Kt
                        ? (X.addRange(j), X.extend(U.node, U.offset))
                        : (j.setEnd(U.node, U.offset), X.addRange(j)));
                  }
                }
              }
            }
            for (k = [], X = E; (X = X.parentNode); )
              X.nodeType === 1 && k.push({ element: X, left: X.scrollLeft, top: X.scrollTop });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < k.length; E++) {
              var J = k[E];
              ((J.element.scrollLeft = J.left), (J.element.scrollTop = J.top));
            }
          }
          ((pu = !!Xs), (Qs = Xs = null));
        } finally {
          ((qt = u), (tt.p = i), (Z.T = n));
        }
      }
      ((t.current = e), (fe = 2));
    }
  }
  function Ph() {
    if (fe === 2) {
      fe = 0;
      var t = la,
        e = Ui,
        n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        ((n = Z.T), (Z.T = null));
        var i = tt.p;
        tt.p = 2;
        var u = qt;
        qt |= 4;
        try {
          xh(t, e.alternate, e);
        } finally {
          ((qt = u), (tt.p = i), (Z.T = n));
        }
      }
      fe = 3;
    }
  }
  function Jh() {
    if (fe === 4 || fe === 3) {
      ((fe = 0), Ma());
      var t = la,
        e = Ui,
        n = Ln,
        i = Nh;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (fe = 5)
        : ((fe = 0), (Ui = la = null), kh(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (ia = null),
        Pu(n),
        (e = e.stateNode),
        pt && typeof pt.onCommitFiberRoot == "function")
      )
        try {
          pt.onCommitFiberRoot(P, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((e = Z.T), (u = tt.p), (tt.p = 2), (Z.T = null));
        try {
          for (var s = t.onRecoverableError, m = 0; m < i.length; m++) {
            var E = i[m];
            s(E.value, { componentStack: E.stack });
          }
        } finally {
          ((Z.T = e), (tt.p = u));
        }
      }
      ((Ln & 3) !== 0 && nu(),
        mn(t),
        (u = t.pendingLanes),
        (n & 261930) !== 0 && (u & 42) !== 0 ? (t === Os ? Cl++ : ((Cl = 0), (Os = t))) : (Cl = 0),
        Ol(0));
    }
  }
  function kh(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), cl(e)));
  }
  function nu() {
    return (Fh(), Ph(), Jh(), $h());
  }
  function $h() {
    if (fe !== 5) return !1;
    var t = la,
      e = Ms;
    Ms = 0;
    var n = Pu(Ln),
      i = Z.T,
      u = tt.p;
    try {
      ((tt.p = 32 > n ? 32 : n), (Z.T = null), (n = Cs), (Cs = null));
      var s = la,
        m = Ln;
      if (((fe = 0), (Ui = la = null), (Ln = 0), (qt & 6) !== 0)) throw Error(o(331));
      var E = qt;
      if (
        ((qt |= 4),
        Uh(s.current),
        Oh(s, s.current, m, n),
        (qt = E),
        Ol(0, !1),
        pt && typeof pt.onPostCommitFiberRoot == "function")
      )
        try {
          pt.onPostCommitFiberRoot(P, s);
        } catch {}
      return !0;
    } finally {
      ((tt.p = u), (Z.T = i), kh(t, e));
    }
  }
  function Wh(t, e, n) {
    ((e = ke(n, e)),
      (e = os(t.stateNode, e, 2)),
      (t = $n(t, e, 2)),
      t !== null && (Ji(t, 2), mn(t)));
  }
  function Vt(t, e, n) {
    if (t.tag === 3) Wh(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Wh(e, t, n);
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" && (ia === null || !ia.has(i)))
          ) {
            ((t = ke(n, t)),
              (n = th(2)),
              (i = $n(e, n, 2)),
              i !== null && (eh(n, i, e, t), Ji(i, 2), mn(i)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Us(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new Rg();
      var u = new Set();
      i.set(e, u);
    } else ((u = i.get(e)), u === void 0 && ((u = new Set()), i.set(e, u)));
    u.has(n) || ((ws = !0), u.add(n), (t = zg.bind(null, t, e, n)), e.then(t, t));
  }
  function zg(t, e, n) {
    var i = t.pingCache;
    (i !== null && i.delete(e),
      (t.pingedLanes |= t.suspendedLanes & n),
      (t.warmLanes &= ~n),
      It === t &&
        (Rt & n) === n &&
        (ne === 4 || (ne === 3 && (Rt & 62914560) === Rt && 300 > pe() - Jr)
          ? (qt & 2) === 0 && Di(t, 0)
          : (Rs |= n),
        Bi === Rt && (Bi = 0)),
      mn(t));
  }
  function tp(t, e) {
    (e === 0 && (e = Ic()), (t = Da(t, e)), t !== null && (Ji(t, e), mn(t)));
  }
  function Bg(t) {
    var e = t.memoizedState,
      n = 0;
    (e !== null && (n = e.retryLane), tp(t, n));
  }
  function Ug(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var i = t.stateNode,
          u = t.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        i = t.stateNode;
        break;
      case 22:
        i = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (i !== null && i.delete(e), tp(t, n));
  }
  function Dg(t, e) {
    return Me(t, e);
  }
  var au = null,
    Ni = null,
    Ds = !1,
    iu = !1,
    Ls = !1,
    ua = 0;
  function mn(t) {
    (t !== Ni && t.next === null && (Ni === null ? (au = Ni = t) : (Ni = Ni.next = t)),
      (iu = !0),
      Ds || ((Ds = !0), Ng()));
  }
  function Ol(t, e) {
    if (!Ls && iu) {
      Ls = !0;
      do
        for (var n = !1, i = au; i !== null; ) {
          if (t !== 0) {
            var u = i.pendingLanes;
            if (u === 0) var s = 0;
            else {
              var m = i.suspendedLanes,
                E = i.pingedLanes;
              ((s = (1 << (31 - Et(42 | t) + 1)) - 1),
                (s &= u & ~(m & ~E)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((n = !0), ip(i, s));
          } else
            ((s = Rt),
              (s = or(
                i,
                i === It ? s : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1,
              )),
              (s & 3) === 0 || Pi(i, s) || ((n = !0), ip(i, s)));
          i = i.next;
        }
      while (n);
      Ls = !1;
    }
  }
  function Lg() {
    ep();
  }
  function ep() {
    iu = Ds = !1;
    var t = 0;
    ua !== 0 && Kg() && (t = ua);
    for (var e = pe(), n = null, i = au; i !== null; ) {
      var u = i.next,
        s = np(i, e);
      (s === 0
        ? ((i.next = null), n === null ? (au = u) : (n.next = u), u === null && (Ni = n))
        : ((n = i), (t !== 0 || (s & 3) !== 0) && (iu = !0)),
        (i = u));
    }
    ((fe !== 0 && fe !== 5) || Ol(t), ua !== 0 && (ua = 0));
  }
  function np(t, e) {
    for (
      var n = t.suspendedLanes,
        i = t.pingedLanes,
        u = t.expirationTimes,
        s = t.pendingLanes & -62914561;
      0 < s;
    ) {
      var m = 31 - Et(s),
        E = 1 << m,
        O = u[m];
      (O === -1
        ? ((E & n) === 0 || (E & i) !== 0) && (u[m] = o0(E, e))
        : O <= e && (t.expiredLanes |= E),
        (s &= ~E));
    }
    if (
      ((e = It),
      (n = Rt),
      (n = or(t, t === e ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (i = t.callbackNode),
      n === 0 || (t === e && (Gt === 2 || Gt === 9)) || t.cancelPendingCommit !== null)
    )
      return (i !== null && i !== null && fn(i), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((n & 3) === 0 || Pi(t, n)) {
      if (((e = n & -n), e === t.callbackPriority)) return e;
      switch ((i !== null && fn(i), Pu(n))) {
        case 2:
        case 8:
          n = b;
          break;
        case 32:
          n = f;
          break;
        case 268435456:
          n = R;
          break;
        default:
          n = f;
      }
      return (
        (i = ap.bind(null, t)),
        (n = Me(n, i)),
        (t.callbackPriority = e),
        (t.callbackNode = n),
        e
      );
    }
    return (
      i !== null && i !== null && fn(i),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function ap(t, e) {
    if (fe !== 0 && fe !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var n = t.callbackNode;
    if (nu() && t.callbackNode !== n) return null;
    var i = Rt;
    return (
      (i = or(t, t === It ? i : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      i === 0
        ? null
        : (Hh(t, i, e),
          np(t, pe()),
          t.callbackNode != null && t.callbackNode === n ? ap.bind(null, t) : null)
    );
  }
  function ip(t, e) {
    if (nu()) return null;
    Hh(t, e, !0);
  }
  function Ng() {
    Fg(function () {
      (qt & 6) !== 0 ? Me(ce, Lg) : ep();
    });
  }
  function Ns() {
    if (ua === 0) {
      var t = Ei;
      (t === 0 && ((t = lr), (lr <<= 1), (lr & 261888) === 0 && (lr = 256)), (ua = t));
    }
    return ua;
  }
  function lp(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : dr("" + t);
  }
  function rp(t, e) {
    var n = e.ownerDocument.createElement("input");
    return (
      (n.name = e.name),
      (n.value = e.value),
      t.id && n.setAttribute("form", t.id),
      e.parentNode.insertBefore(n, e),
      (t = new FormData(t)),
      n.parentNode.removeChild(n),
      t
    );
  }
  function jg(t, e, n, i, u) {
    if (e === "submit" && n && n.stateNode === u) {
      var s = lp((u[Ce] || null).action),
        m = i.submitter;
      m &&
        ((e = (e = m[Ce] || null) ? lp(e.formAction) : m.getAttribute("formAction")),
        e !== null && ((s = e), (m = null)));
      var E = new yr("action", "action", null, i, u);
      t.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if (ua !== 0) {
                  var O = m ? rp(u, m) : new FormData(u);
                  ns(n, { pending: !0, data: O, method: u.method, action: s }, null, O);
                }
              } else
                typeof s == "function" &&
                  (E.preventDefault(),
                  (O = m ? rp(u, m) : new FormData(u)),
                  ns(n, { pending: !0, data: O, method: u.method, action: s }, s, O));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var js = 0; js < So.length; js++) {
    var Hs = So[js],
      Hg = Hs.toLowerCase(),
      qg = Hs[0].toUpperCase() + Hs.slice(1);
    on(Hg, "on" + qg);
  }
  (on(jf, "onAnimationEnd"),
    on(Hf, "onAnimationIteration"),
    on(qf, "onAnimationStart"),
    on("dblclick", "onDoubleClick"),
    on("focusin", "onFocus"),
    on("focusout", "onBlur"),
    on(eg, "onTransitionRun"),
    on(ng, "onTransitionStart"),
    on(ag, "onTransitionCancel"),
    on(Yf, "onTransitionEnd"),
    ui("onMouseEnter", ["mouseout", "mouseover"]),
    ui("onMouseLeave", ["mouseout", "mouseover"]),
    ui("onPointerEnter", ["pointerout", "pointerover"]),
    ui("onPointerLeave", ["pointerout", "pointerover"]),
    Oa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    Oa(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Oa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Oa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    Oa(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Oa(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var zl =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Yg = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zl),
    );
  function up(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n],
        u = i.event;
      i = i.listeners;
      t: {
        var s = void 0;
        if (e)
          for (var m = i.length - 1; 0 <= m; m--) {
            var E = i[m],
              O = E.instance,
              H = E.currentTarget;
            if (((E = E.listener), O !== s && u.isPropagationStopped())) break t;
            ((s = E), (u.currentTarget = H));
            try {
              s(u);
            } catch (I) {
              Sr(I);
            }
            ((u.currentTarget = null), (s = O));
          }
        else
          for (m = 0; m < i.length; m++) {
            if (
              ((E = i[m]),
              (O = E.instance),
              (H = E.currentTarget),
              (E = E.listener),
              O !== s && u.isPropagationStopped())
            )
              break t;
            ((s = E), (u.currentTarget = H));
            try {
              s(u);
            } catch (I) {
              Sr(I);
            }
            ((u.currentTarget = null), (s = O));
          }
      }
    }
  }
  function At(t, e) {
    var n = e[Ju];
    n === void 0 && (n = e[Ju] = new Set());
    var i = t + "__bubble";
    n.has(i) || (op(e, t, 2, !1), n.add(i));
  }
  function qs(t, e, n) {
    var i = 0;
    (e && (i |= 4), op(n, t, i, e));
  }
  var lu = "_reactListening" + Math.random().toString(36).slice(2);
  function Ys(t) {
    if (!t[lu]) {
      ((t[lu] = !0),
        tf.forEach(function (n) {
          n !== "selectionchange" && (Yg.has(n) || qs(n, !1, t), qs(n, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[lu] || ((e[lu] = !0), qs("selectionchange", !1, e));
    }
  }
  function op(t, e, n, i) {
    switch (jp(e)) {
      case 2:
        var u = pv;
        break;
      case 8:
        u = mv;
        break;
      default:
        u = ec;
    }
    ((n = u.bind(null, e, n, t)),
      (u = void 0),
      !lo || (e !== "touchstart" && e !== "touchmove" && e !== "wheel") || (u = !0),
      i
        ? u !== void 0
          ? t.addEventListener(e, n, { capture: !0, passive: u })
          : t.addEventListener(e, n, !0)
        : u !== void 0
          ? t.addEventListener(e, n, { passive: u })
          : t.addEventListener(e, n, !1));
  }
  function Gs(t, e, n, i, u) {
    var s = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (;;) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var E = i.stateNode.containerInfo;
          if (E === u) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var O = m.tag;
              if ((O === 3 || O === 4) && m.stateNode.containerInfo === u) return;
              m = m.return;
            }
          for (; E !== null; ) {
            if (((m = ii(E)), m === null)) return;
            if (((O = m.tag), O === 5 || O === 6 || O === 26 || O === 27)) {
              i = s = m;
              continue t;
            }
            E = E.parentNode;
          }
        }
        i = i.return;
      }
    hf(function () {
      var H = s,
        I = ao(n),
        k = [];
      t: {
        var Y = Gf.get(t);
        if (Y !== void 0) {
          var X = yr,
            ut = t;
          switch (t) {
            case "keypress":
              if (pr(n) === 0) break t;
            case "keydown":
            case "keyup":
              X = U0;
              break;
            case "focusin":
              ((ut = "focus"), (X = so));
              break;
            case "focusout":
              ((ut = "blur"), (X = so));
              break;
            case "beforeblur":
            case "afterblur":
              X = so;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              X = yf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              X = E0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              X = N0;
              break;
            case jf:
            case Hf:
            case qf:
              X = A0;
              break;
            case Yf:
              X = H0;
              break;
            case "scroll":
            case "scrollend":
              X = S0;
              break;
            case "wheel":
              X = Y0;
              break;
            case "copy":
            case "cut":
            case "paste":
              X = R0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              X = vf;
              break;
            case "toggle":
            case "beforetoggle":
              X = V0;
          }
          var mt = (e & 4) !== 0,
            Kt = !mt && (t === "scroll" || t === "scrollend"),
            N = mt ? (Y !== null ? Y + "Capture" : null) : Y;
          mt = [];
          for (var U = H, j; U !== null; ) {
            var J = U;
            if (
              ((j = J.stateNode),
              (J = J.tag),
              (J !== 5 && J !== 26 && J !== 27) ||
                j === null ||
                N === null ||
                ((J = Wi(U, N)), J != null && mt.push(Bl(U, J, j))),
              Kt)
            )
              break;
            U = U.return;
          }
          0 < mt.length && ((Y = new X(Y, ut, null, n, I)), k.push({ event: Y, listeners: mt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((Y = t === "mouseover" || t === "pointerover"),
            (X = t === "mouseout" || t === "pointerout"),
            Y && n !== no && (ut = n.relatedTarget || n.fromElement) && (ii(ut) || ut[ai]))
          )
            break t;
          if (
            (X || Y) &&
            ((Y =
              I.window === I
                ? I
                : (Y = I.ownerDocument)
                  ? Y.defaultView || Y.parentWindow
                  : window),
            X
              ? ((ut = n.relatedTarget || n.toElement),
                (X = H),
                (ut = ut ? ii(ut) : null),
                ut !== null &&
                  ((Kt = d(ut)), (mt = ut.tag), ut !== Kt || (mt !== 5 && mt !== 27 && mt !== 6)) &&
                  (ut = null))
              : ((X = null), (ut = H)),
            X !== ut)
          ) {
            if (
              ((mt = yf),
              (J = "onMouseLeave"),
              (N = "onMouseEnter"),
              (U = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((mt = vf), (J = "onPointerLeave"), (N = "onPointerEnter"), (U = "pointer")),
              (Kt = X == null ? Y : $i(X)),
              (j = ut == null ? Y : $i(ut)),
              (Y = new mt(J, U + "leave", X, n, I)),
              (Y.target = Kt),
              (Y.relatedTarget = j),
              (J = null),
              ii(I) === H &&
                ((mt = new mt(N, U + "enter", ut, n, I)),
                (mt.target = j),
                (mt.relatedTarget = Kt),
                (J = mt)),
              (Kt = J),
              X && ut)
            )
              e: {
                for (mt = Gg, N = X, U = ut, j = 0, J = N; J; J = mt(J)) j++;
                J = 0;
                for (var dt = U; dt; dt = mt(dt)) J++;
                for (; 0 < j - J; ) ((N = mt(N)), j--);
                for (; 0 < J - j; ) ((U = mt(U)), J--);
                for (; j--; ) {
                  if (N === U || (U !== null && N === U.alternate)) {
                    mt = N;
                    break e;
                  }
                  ((N = mt(N)), (U = mt(U)));
                }
                mt = null;
              }
            else mt = null;
            (X !== null && sp(k, Y, X, mt, !1),
              ut !== null && Kt !== null && sp(k, Kt, ut, mt, !0));
          }
        }
        t: {
          if (
            ((Y = H ? $i(H) : window),
            (X = Y.nodeName && Y.nodeName.toLowerCase()),
            X === "select" || (X === "input" && Y.type === "file"))
          )
            var Ut = Rf;
          else if (Af(Y))
            if (Tf) Ut = $0;
            else {
              Ut = J0;
              var ct = P0;
            }
          else
            ((X = Y.nodeName),
              !X || X.toLowerCase() !== "input" || (Y.type !== "checkbox" && Y.type !== "radio")
                ? H && eo(H.elementType) && (Ut = Rf)
                : (Ut = k0));
          if (Ut && (Ut = Ut(t, H))) {
            wf(k, Ut, n, I);
            break t;
          }
          (ct && ct(t, Y, H),
            t === "focusout" &&
              H &&
              Y.type === "number" &&
              H.memoizedProps.value != null &&
              to(Y, "number", Y.value));
        }
        switch (((ct = H ? $i(H) : window), t)) {
          case "focusin":
            (Af(ct) || ct.contentEditable === "true") && ((hi = ct), (yo = H), (ul = null));
            break;
          case "focusout":
            ul = yo = hi = null;
            break;
          case "mousedown":
            go = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((go = !1), Lf(k, n, I));
            break;
          case "selectionchange":
            if (tg) break;
          case "keydown":
          case "keyup":
            Lf(k, n, I);
        }
        var bt;
        if (fo)
          t: {
            switch (t) {
              case "compositionstart":
                var Tt = "onCompositionStart";
                break t;
              case "compositionend":
                Tt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Tt = "onCompositionUpdate";
                break t;
            }
            Tt = void 0;
          }
        else
          di
            ? _f(t, n) && (Tt = "onCompositionEnd")
            : t === "keydown" && n.keyCode === 229 && (Tt = "onCompositionStart");
        (Tt &&
          (Sf &&
            n.locale !== "ko" &&
            (di || Tt !== "onCompositionStart"
              ? Tt === "onCompositionEnd" && di && (bt = pf())
              : ((Zn = I), (ro = "value" in Zn ? Zn.value : Zn.textContent), (di = !0))),
          (ct = ru(H, Tt)),
          0 < ct.length &&
            ((Tt = new gf(Tt, t, null, n, I)),
            k.push({ event: Tt, listeners: ct }),
            bt ? (Tt.data = bt) : ((bt = xf(n)), bt !== null && (Tt.data = bt)))),
          (bt = Q0 ? Z0(t, n) : K0(t, n)) &&
            ((Tt = ru(H, "onBeforeInput")),
            0 < Tt.length &&
              ((ct = new gf("onBeforeInput", "beforeinput", null, n, I)),
              k.push({ event: ct, listeners: Tt }),
              (ct.data = bt))),
          jg(k, t, H, n, I));
      }
      up(k, e);
    });
  }
  function Bl(t, e, n) {
    return { instance: t, listener: e, currentTarget: n };
  }
  function ru(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var u = t,
        s = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          s === null ||
          ((u = Wi(t, n)),
          u != null && i.unshift(Bl(t, u, s)),
          (u = Wi(t, e)),
          u != null && i.push(Bl(t, u, s))),
        t.tag === 3)
      )
        return i;
      t = t.return;
    }
    return [];
  }
  function Gg(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function sp(t, e, n, i, u) {
    for (var s = e._reactName, m = []; n !== null && n !== i; ) {
      var E = n,
        O = E.alternate,
        H = E.stateNode;
      if (((E = E.tag), O !== null && O === i)) break;
      ((E !== 5 && E !== 26 && E !== 27) ||
        H === null ||
        ((O = H),
        u
          ? ((H = Wi(n, s)), H != null && m.unshift(Bl(n, H, O)))
          : u || ((H = Wi(n, s)), H != null && m.push(Bl(n, H, O)))),
        (n = n.return));
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var Vg = /\r\n?/g,
    Xg = /\u0000|\uFFFD/g;
  function cp(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        Vg,
        `
`,
      )
      .replace(Xg, "");
  }
  function fp(t, e) {
    return ((e = cp(e)), cp(t) === e);
  }
  function Zt(t, e, n, i, u, s) {
    switch (n) {
      case "children":
        typeof i == "string"
          ? e === "body" || (e === "textarea" && i === "") || si(t, i)
          : (typeof i == "number" || typeof i == "bigint") && e !== "body" && si(t, "" + i);
        break;
      case "className":
        cr(t, "class", i);
        break;
      case "tabIndex":
        cr(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        cr(t, n, i);
        break;
      case "style":
        ff(t, i, s);
        break;
      case "data":
        if (e !== "object") {
          cr(t, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        ((i = dr("" + i)), t.setAttribute(n, i));
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof s == "function" &&
            (n === "formAction"
              ? (e !== "input" && Zt(t, e, "name", u.name, u, null),
                Zt(t, e, "formEncType", u.formEncType, u, null),
                Zt(t, e, "formMethod", u.formMethod, u, null),
                Zt(t, e, "formTarget", u.formTarget, u, null))
              : (Zt(t, e, "encType", u.encType, u, null),
                Zt(t, e, "method", u.method, u, null),
                Zt(t, e, "target", u.target, u, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        ((i = dr("" + i)), t.setAttribute(n, i));
        break;
      case "onClick":
        i != null && (t.onclick = bn);
        break;
      case "onScroll":
        i != null && At("scroll", t);
        break;
      case "onScrollEnd":
        i != null && At("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
          if (((n = i.__html), n != null)) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "multiple":
        t.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        t.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        ((n = dr("" + i)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol"
          ? t.setAttribute(n, "" + i)
          : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol"
          ? t.setAttribute(n, "")
          : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0
          ? t.setAttribute(n, "")
          : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol"
            ? t.setAttribute(n, i)
            : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i
          ? t.setAttribute(n, i)
          : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i)
          ? t.removeAttribute(n)
          : t.setAttribute(n, i);
        break;
      case "popover":
        (At("beforetoggle", t), At("toggle", t), sr(t, "popover", i));
        break;
      case "xlinkActuate":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        Sn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        Sn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        Sn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        sr(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || (n[0] !== "o" && n[0] !== "O") || (n[1] !== "n" && n[1] !== "N")) &&
          ((n = g0.get(n) || n), sr(t, n, i));
    }
  }
  function Vs(t, e, n, i, u, s) {
    switch (n) {
      case "style":
        ff(t, i, s);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
          if (((n = i.__html), n != null)) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string"
          ? si(t, i)
          : (typeof i == "number" || typeof i == "bigint") && si(t, "" + i);
        break;
      case "onScroll":
        i != null && At("scroll", t);
        break;
      case "onScrollEnd":
        i != null && At("scrollend", t);
        break;
      case "onClick":
        i != null && (t.onclick = bn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!ef.hasOwnProperty(n))
          t: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((u = n.endsWith("Capture")),
              (e = n.slice(2, u ? n.length - 7 : void 0)),
              (s = t[Ce] || null),
              (s = s != null ? s[n] : null),
              typeof s == "function" && t.removeEventListener(e, s, u),
              typeof i == "function")
            ) {
              (typeof s != "function" &&
                s !== null &&
                (n in t ? (t[n] = null) : t.hasAttribute(n) && t.removeAttribute(n)),
                t.addEventListener(e, i, u));
              break t;
            }
            n in t ? (t[n] = i) : i === !0 ? t.setAttribute(n, "") : sr(t, n, i);
          }
    }
  }
  function _e(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (At("error", t), At("load", t));
        var i = !1,
          u = !1,
          s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var m = n[s];
            if (m != null)
              switch (s) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  Zt(t, e, s, m, n, null);
              }
          }
        (u && Zt(t, e, "srcSet", n.srcSet, n, null), i && Zt(t, e, "src", n.src, n, null));
        return;
      case "input":
        At("invalid", t);
        var E = (s = m = u = null),
          O = null,
          H = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var I = n[i];
            if (I != null)
              switch (i) {
                case "name":
                  u = I;
                  break;
                case "type":
                  m = I;
                  break;
                case "checked":
                  O = I;
                  break;
                case "defaultChecked":
                  H = I;
                  break;
                case "value":
                  s = I;
                  break;
                case "defaultValue":
                  E = I;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (I != null) throw Error(o(137, e));
                  break;
                default:
                  Zt(t, e, i, I, n, null);
              }
          }
        uf(t, s, E, O, H, m, u, !1);
        return;
      case "select":
        (At("invalid", t), (i = m = s = null));
        for (u in n)
          if (n.hasOwnProperty(u) && ((E = n[u]), E != null))
            switch (u) {
              case "value":
                s = E;
                break;
              case "defaultValue":
                m = E;
                break;
              case "multiple":
                i = E;
              default:
                Zt(t, e, u, E, n, null);
            }
        ((e = s),
          (n = m),
          (t.multiple = !!i),
          e != null ? oi(t, !!i, e, !1) : n != null && oi(t, !!i, n, !0));
        return;
      case "textarea":
        (At("invalid", t), (s = u = i = null));
        for (m in n)
          if (n.hasOwnProperty(m) && ((E = n[m]), E != null))
            switch (m) {
              case "value":
                i = E;
                break;
              case "defaultValue":
                u = E;
                break;
              case "children":
                s = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(o(91));
                break;
              default:
                Zt(t, e, m, E, n, null);
            }
        sf(t, i, u, s);
        return;
      case "option":
        for (O in n)
          n.hasOwnProperty(O) &&
            ((i = n[O]), i != null) &&
            (O === "selected"
              ? (t.selected = i && typeof i != "function" && typeof i != "symbol")
              : Zt(t, e, O, i, n, null));
        return;
      case "dialog":
        (At("beforetoggle", t), At("toggle", t), At("cancel", t), At("close", t));
        break;
      case "iframe":
      case "object":
        At("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < zl.length; i++) At(zl[i], t);
        break;
      case "image":
        (At("error", t), At("load", t));
        break;
      case "details":
        At("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        (At("error", t), At("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in n)
          if (n.hasOwnProperty(H) && ((i = n[H]), i != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                Zt(t, e, H, i, n, null);
            }
        return;
      default:
        if (eo(e)) {
          for (I in n)
            n.hasOwnProperty(I) && ((i = n[I]), i !== void 0 && Vs(t, e, I, i, n, void 0));
          return;
        }
    }
    for (E in n) n.hasOwnProperty(E) && ((i = n[E]), i != null && Zt(t, e, E, i, n, null));
  }
  function Qg(t, e, n, i) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          s = null,
          m = null,
          E = null,
          O = null,
          H = null,
          I = null;
        for (X in n) {
          var k = n[X];
          if (n.hasOwnProperty(X) && k != null)
            switch (X) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                O = k;
              default:
                i.hasOwnProperty(X) || Zt(t, e, X, null, i, k);
            }
        }
        for (var Y in i) {
          var X = i[Y];
          if (((k = n[Y]), i.hasOwnProperty(Y) && (X != null || k != null)))
            switch (Y) {
              case "type":
                s = X;
                break;
              case "name":
                u = X;
                break;
              case "checked":
                H = X;
                break;
              case "defaultChecked":
                I = X;
                break;
              case "value":
                m = X;
                break;
              case "defaultValue":
                E = X;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null) throw Error(o(137, e));
                break;
              default:
                X !== k && Zt(t, e, Y, X, i, k);
            }
        }
        Wu(t, m, E, O, H, I, s, u);
        return;
      case "select":
        X = m = E = Y = null;
        for (s in n)
          if (((O = n[s]), n.hasOwnProperty(s) && O != null))
            switch (s) {
              case "value":
                break;
              case "multiple":
                X = O;
              default:
                i.hasOwnProperty(s) || Zt(t, e, s, null, i, O);
            }
        for (u in i)
          if (((s = i[u]), (O = n[u]), i.hasOwnProperty(u) && (s != null || O != null)))
            switch (u) {
              case "value":
                Y = s;
                break;
              case "defaultValue":
                E = s;
                break;
              case "multiple":
                m = s;
              default:
                s !== O && Zt(t, e, u, s, i, O);
            }
        ((e = E),
          (n = m),
          (i = X),
          Y != null
            ? oi(t, !!n, Y, !1)
            : !!i != !!n && (e != null ? oi(t, !!n, e, !0) : oi(t, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        X = Y = null;
        for (E in n)
          if (((u = n[E]), n.hasOwnProperty(E) && u != null && !i.hasOwnProperty(E)))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Zt(t, e, E, null, i, u);
            }
        for (m in i)
          if (((u = i[m]), (s = n[m]), i.hasOwnProperty(m) && (u != null || s != null)))
            switch (m) {
              case "value":
                Y = u;
                break;
              case "defaultValue":
                X = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== s && Zt(t, e, m, u, i, s);
            }
        of(t, Y, X);
        return;
      case "option":
        for (var ut in n)
          ((Y = n[ut]),
            n.hasOwnProperty(ut) &&
              Y != null &&
              !i.hasOwnProperty(ut) &&
              (ut === "selected" ? (t.selected = !1) : Zt(t, e, ut, null, i, Y)));
        for (O in i)
          ((Y = i[O]),
            (X = n[O]),
            i.hasOwnProperty(O) &&
              Y !== X &&
              (Y != null || X != null) &&
              (O === "selected"
                ? (t.selected = Y && typeof Y != "function" && typeof Y != "symbol")
                : Zt(t, e, O, Y, i, X)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var mt in n)
          ((Y = n[mt]),
            n.hasOwnProperty(mt) && Y != null && !i.hasOwnProperty(mt) && Zt(t, e, mt, null, i, Y));
        for (H in i)
          if (((Y = i[H]), (X = n[H]), i.hasOwnProperty(H) && Y !== X && (Y != null || X != null)))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null) throw Error(o(137, e));
                break;
              default:
                Zt(t, e, H, Y, i, X);
            }
        return;
      default:
        if (eo(e)) {
          for (var Kt in n)
            ((Y = n[Kt]),
              n.hasOwnProperty(Kt) &&
                Y !== void 0 &&
                !i.hasOwnProperty(Kt) &&
                Vs(t, e, Kt, void 0, i, Y));
          for (I in i)
            ((Y = i[I]),
              (X = n[I]),
              !i.hasOwnProperty(I) ||
                Y === X ||
                (Y === void 0 && X === void 0) ||
                Vs(t, e, I, Y, i, X));
          return;
        }
    }
    for (var N in n)
      ((Y = n[N]),
        n.hasOwnProperty(N) && Y != null && !i.hasOwnProperty(N) && Zt(t, e, N, null, i, Y));
    for (k in i)
      ((Y = i[k]),
        (X = n[k]),
        !i.hasOwnProperty(k) || Y === X || (Y == null && X == null) || Zt(t, e, k, Y, i, X));
  }
  function dp(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Zg() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, e = 0, n = performance.getEntriesByType("resource"), i = 0;
        i < n.length;
        i++
      ) {
        var u = n[i],
          s = u.transferSize,
          m = u.initiatorType,
          E = u.duration;
        if (s && E && dp(m)) {
          for (m = 0, E = u.responseEnd, i += 1; i < n.length; i++) {
            var O = n[i],
              H = O.startTime;
            if (H > E) break;
            var I = O.transferSize,
              k = O.initiatorType;
            I && dp(k) && ((O = O.responseEnd), (m += I * (O < E ? 1 : (E - H) / (O - H))));
          }
          if ((--i, (e += (8 * (s + m)) / (u.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var Xs = null,
    Qs = null;
  function uu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function hp(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function pp(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Zs(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Ks = null;
  function Kg() {
    var t = window.event;
    return t && t.type === "popstate" ? (t === Ks ? !1 : ((Ks = t), !0)) : ((Ks = null), !1);
  }
  var mp = typeof setTimeout == "function" ? setTimeout : void 0,
    Ig = typeof clearTimeout == "function" ? clearTimeout : void 0,
    yp = typeof Promise == "function" ? Promise : void 0,
    Fg =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof yp < "u"
          ? function (t) {
              return yp.resolve(null).then(t).catch(Pg);
            }
          : mp;
  function Pg(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function oa(t) {
    return t === "head";
  }
  function gp(t, e) {
    var n = e,
      i = 0;
    do {
      var u = n.nextSibling;
      if ((t.removeChild(n), u && u.nodeType === 8))
        if (((n = u.data), n === "/$" || n === "/&")) {
          if (i === 0) {
            (t.removeChild(u), Yi(e));
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") i++;
        else if (n === "html") Ul(t.ownerDocument.documentElement);
        else if (n === "head") {
          ((n = t.ownerDocument.head), Ul(n));
          for (var s = n.firstChild; s; ) {
            var m = s.nextSibling,
              E = s.nodeName;
            (s[ki] ||
              E === "SCRIPT" ||
              E === "STYLE" ||
              (E === "LINK" && s.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(s),
              (s = m));
          }
        } else n === "body" && Ul(t.ownerDocument.body);
      n = u;
    } while (n);
    Yi(e);
  }
  function vp(t, e) {
    var n = t;
    t = 0;
    do {
      var i = n.nextSibling;
      if (
        (n.nodeType === 1
          ? e
            ? ((n._stashedDisplay = n.style.display), (n.style.display = "none"))
            : ((n.style.display = n._stashedDisplay || ""),
              n.getAttribute("style") === "" && n.removeAttribute("style"))
          : n.nodeType === 3 &&
            (e
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
              : (n.nodeValue = n._stashedText || "")),
        i && i.nodeType === 8)
      )
        if (((n = i.data), n === "/$")) {
          if (t === 0) break;
          t--;
        } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || t++;
      n = i;
    } while (n);
  }
  function Is(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (((e = e.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Is(n), ku(n));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function Jg(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var u = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (i) {
        if (!t[ki])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((s = t.getAttribute("rel")),
                s === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                s !== u.rel ||
                t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((s = t.getAttribute("src")),
                (s !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  s &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var s = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === s) return t;
      } else return t;
      if (((t = nn(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function kg(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n) ||
        ((t = nn(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Sp(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e) ||
        ((t = nn(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Fs(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ps(t) {
    return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
  }
  function $g(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading") e();
    else {
      var i = function () {
        (e(), n.removeEventListener("DOMContentLoaded", i));
      };
      (n.addEventListener("DOMContentLoaded", i), (t._reactRetry = i));
    }
  }
  function nn(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" ||
            e === "$!" ||
            e === "$?" ||
            e === "$~" ||
            e === "&" ||
            e === "F!" ||
            e === "F")
        )
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Js = null;
  function bp(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0) return nn(t.nextSibling);
          e--;
        } else (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Ep(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else (n !== "/$" && n !== "/&") || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function _p(t, e, n) {
    switch (((e = uu(n)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(o(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(o(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function Ul(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    ku(t);
  }
  var an = new Map(),
    xp = new Set();
  function ou(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var Nn = tt.d;
  tt.d = { f: Wg, r: tv, D: ev, C: nv, L: av, m: iv, X: rv, S: lv, M: uv };
  function Wg() {
    var t = Nn.f(),
      e = Wr();
    return t || e;
  }
  function tv(t) {
    var e = li(t);
    e !== null && e.tag === 5 && e.type === "form" ? Yd(e) : Nn.r(t);
  }
  var ji = typeof document > "u" ? null : document;
  function Ap(t, e, n) {
    var i = ji;
    if (i && typeof e == "string" && e) {
      var u = Pe(e);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof n == "string" && (u += '[crossorigin="' + n + '"]'),
        xp.has(u) ||
          (xp.add(u),
          (t = { rel: t, crossOrigin: n, href: e }),
          i.querySelector(u) === null &&
            ((e = i.createElement("link")), _e(e, "link", t), me(e), i.head.appendChild(e))));
    }
  }
  function ev(t) {
    (Nn.D(t), Ap("dns-prefetch", t, null));
  }
  function nv(t, e) {
    (Nn.C(t, e), Ap("preconnect", t, e));
  }
  function av(t, e, n) {
    Nn.L(t, e, n);
    var i = ji;
    if (i && t && e) {
      var u = 'link[rel="preload"][as="' + Pe(e) + '"]';
      e === "image" && n && n.imageSrcSet
        ? ((u += '[imagesrcset="' + Pe(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" && (u += '[imagesizes="' + Pe(n.imageSizes) + '"]'))
        : (u += '[href="' + Pe(t) + '"]');
      var s = u;
      switch (e) {
        case "style":
          s = Hi(t);
          break;
        case "script":
          s = qi(t);
      }
      an.has(s) ||
        ((t = S(
          { rel: "preload", href: e === "image" && n && n.imageSrcSet ? void 0 : t, as: e },
          n,
        )),
        an.set(s, t),
        i.querySelector(u) !== null ||
          (e === "style" && i.querySelector(Dl(s))) ||
          (e === "script" && i.querySelector(Ll(s))) ||
          ((e = i.createElement("link")), _e(e, "link", t), me(e), i.head.appendChild(e)));
    }
  }
  function iv(t, e) {
    Nn.m(t, e);
    var n = ji;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script",
        u = 'link[rel="modulepreload"][as="' + Pe(i) + '"][href="' + Pe(t) + '"]',
        s = u;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = qi(t);
      }
      if (
        !an.has(s) &&
        ((t = S({ rel: "modulepreload", href: t }, e)), an.set(s, t), n.querySelector(u) === null)
      ) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ll(s))) return;
        }
        ((i = n.createElement("link")), _e(i, "link", t), me(i), n.head.appendChild(i));
      }
    }
  }
  function lv(t, e, n) {
    Nn.S(t, e, n);
    var i = ji;
    if (i && t) {
      var u = ri(i).hoistableStyles,
        s = Hi(t);
      e = e || "default";
      var m = u.get(s);
      if (!m) {
        var E = { loading: 0, preload: null };
        if ((m = i.querySelector(Dl(s)))) E.loading = 5;
        else {
          ((t = S({ rel: "stylesheet", href: t, "data-precedence": e }, n)),
            (n = an.get(s)) && ks(t, n));
          var O = (m = i.createElement("link"));
          (me(O),
            _e(O, "link", t),
            (O._p = new Promise(function (H, I) {
              ((O.onload = H), (O.onerror = I));
            })),
            O.addEventListener("load", function () {
              E.loading |= 1;
            }),
            O.addEventListener("error", function () {
              E.loading |= 2;
            }),
            (E.loading |= 4),
            su(m, e, i));
        }
        ((m = { type: "stylesheet", instance: m, count: 1, state: E }), u.set(s, m));
      }
    }
  }
  function rv(t, e) {
    Nn.X(t, e);
    var n = ji;
    if (n && t) {
      var i = ri(n).hoistableScripts,
        u = qi(t),
        s = i.get(u);
      s ||
        ((s = n.querySelector(Ll(u))),
        s ||
          ((t = S({ src: t, async: !0 }, e)),
          (e = an.get(u)) && $s(t, e),
          (s = n.createElement("script")),
          me(s),
          _e(s, "link", t),
          n.head.appendChild(s)),
        (s = { type: "script", instance: s, count: 1, state: null }),
        i.set(u, s));
    }
  }
  function uv(t, e) {
    Nn.M(t, e);
    var n = ji;
    if (n && t) {
      var i = ri(n).hoistableScripts,
        u = qi(t),
        s = i.get(u);
      s ||
        ((s = n.querySelector(Ll(u))),
        s ||
          ((t = S({ src: t, async: !0, type: "module" }, e)),
          (e = an.get(u)) && $s(t, e),
          (s = n.createElement("script")),
          me(s),
          _e(s, "link", t),
          n.head.appendChild(s)),
        (s = { type: "script", instance: s, count: 1, state: null }),
        i.set(u, s));
    }
  }
  function wp(t, e, n, i) {
    var u = (u = gt.current) ? ou(u) : null;
    if (!u) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((e = Hi(n.href)),
            (n = ri(u).hoistableStyles),
            (i = n.get(e)),
            i || ((i = { type: "style", instance: null, count: 0, state: null }), n.set(e, i)),
            i)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          t = Hi(n.href);
          var s = ri(u).hoistableStyles,
            m = s.get(t);
          if (
            (m ||
              ((u = u.ownerDocument || u),
              (m = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              s.set(t, m),
              (s = u.querySelector(Dl(t))) && !s._p && ((m.instance = s), (m.state.loading = 5)),
              an.has(t) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                an.set(t, n),
                s || ov(u, t, n, m.state))),
            e && i === null)
          )
            throw Error(o(528, ""));
          return m;
        }
        if (e && i !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (e = n.async),
          (n = n.src),
          typeof n == "string" && e && typeof e != "function" && typeof e != "symbol"
            ? ((e = qi(n)),
              (n = ri(u).hoistableScripts),
              (i = n.get(e)),
              i || ((i = { type: "script", instance: null, count: 0, state: null }), n.set(e, i)),
              i)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function Hi(t) {
    return 'href="' + Pe(t) + '"';
  }
  function Dl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Rp(t) {
    return S({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function ov(t, e, n, i) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (i.loading = 1)
      : ((e = t.createElement("link")),
        (i.preload = e),
        e.addEventListener("load", function () {
          return (i.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (i.loading |= 2);
        }),
        _e(e, "link", n),
        me(e),
        t.head.appendChild(e));
  }
  function qi(t) {
    return '[src="' + Pe(t) + '"]';
  }
  function Ll(t) {
    return "script[async]" + t;
  }
  function Tp(t, e, n) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var i = t.querySelector('style[data-href~="' + Pe(n.href) + '"]');
          if (i) return ((e.instance = i), me(i), i);
          var u = S({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (i = (t.ownerDocument || t).createElement("style")),
            me(i),
            _e(i, "style", u),
            su(i, n.precedence, t),
            (e.instance = i)
          );
        case "stylesheet":
          u = Hi(n.href);
          var s = t.querySelector(Dl(u));
          if (s) return ((e.state.loading |= 4), (e.instance = s), me(s), s);
          ((i = Rp(n)),
            (u = an.get(u)) && ks(i, u),
            (s = (t.ownerDocument || t).createElement("link")),
            me(s));
          var m = s;
          return (
            (m._p = new Promise(function (E, O) {
              ((m.onload = E), (m.onerror = O));
            })),
            _e(s, "link", i),
            (e.state.loading |= 4),
            su(s, n.precedence, t),
            (e.instance = s)
          );
        case "script":
          return (
            (s = qi(n.src)),
            (u = t.querySelector(Ll(s)))
              ? ((e.instance = u), me(u), u)
              : ((i = n),
                (u = an.get(s)) && ((i = S({}, n)), $s(i, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                me(u),
                _e(u, "link", i),
                t.head.appendChild(u),
                (e.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((i = e.instance), (e.state.loading |= 4), su(i, n.precedence, t));
    return e.instance;
  }
  function su(t, e, n) {
    for (
      var i = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = i.length ? i[i.length - 1] : null,
        s = u,
        m = 0;
      m < i.length;
      m++
    ) {
      var E = i[m];
      if (E.dataset.precedence === e) s = E;
      else if (s !== u) break;
    }
    s
      ? s.parentNode.insertBefore(t, s.nextSibling)
      : ((e = n.nodeType === 9 ? n.head : n), e.insertBefore(t, e.firstChild));
  }
  function ks(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function $s(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var cu = null;
  function Mp(t, e, n) {
    if (cu === null) {
      var i = new Map(),
        u = (cu = new Map());
      u.set(n, i);
    } else ((u = cu), (i = u.get(n)), i || ((i = new Map()), u.set(n, i)));
    if (i.has(t)) return i;
    for (i.set(t, null), n = n.getElementsByTagName(t), u = 0; u < n.length; u++) {
      var s = n[u];
      if (
        !(s[ki] || s[ve] || (t === "link" && s.getAttribute("rel") === "stylesheet")) &&
        s.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var m = s.getAttribute(e) || "";
        m = t + m;
        var E = i.get(m);
        E ? E.push(s) : i.set(m, [s]);
      }
    }
    return i;
  }
  function Cp(t, e, n) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(n, e === "title" ? t.querySelector("head > title") : null));
  }
  function sv(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "") break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        return e.rel === "stylesheet"
          ? ((t = e.disabled), typeof e.precedence == "string" && t == null)
          : !0;
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Op(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function cv(t, e, n, i) {
    if (
      n.type === "stylesheet" &&
      (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var u = Hi(i.href),
          s = e.querySelector(Dl(u));
        if (s) {
          ((e = s._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (t.count++, (t = fu.bind(t)), e.then(t, t)),
            (n.state.loading |= 4),
            (n.instance = s),
            me(s));
          return;
        }
        ((s = e.ownerDocument || e),
          (i = Rp(i)),
          (u = an.get(u)) && ks(i, u),
          (s = s.createElement("link")),
          me(s));
        var m = s;
        ((m._p = new Promise(function (E, O) {
          ((m.onload = E), (m.onerror = O));
        })),
          _e(s, "link", i),
          (n.instance = s));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(n, e),
        (e = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (t.count++,
          (n = fu.bind(t)),
          e.addEventListener("load", n),
          e.addEventListener("error", n)));
    }
  }
  var Ws = 0;
  function fv(t, e) {
    return (
      t.stylesheets && t.count === 0 && hu(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (n) {
            var i = setTimeout(function () {
              if ((t.stylesheets && hu(t, t.stylesheets), t.unsuspend)) {
                var s = t.unsuspend;
                ((t.unsuspend = null), s());
              }
            }, 6e4 + e);
            0 < t.imgBytes && Ws === 0 && (Ws = 62500 * Zg());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && hu(t, t.stylesheets), t.unsuspend))
                ) {
                  var s = t.unsuspend;
                  ((t.unsuspend = null), s());
                }
              },
              (t.imgBytes > Ws ? 50 : 800) + e,
            );
            return (
              (t.unsuspend = n),
              function () {
                ((t.unsuspend = null), clearTimeout(i), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function fu() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) hu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var du = null;
  function hu(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (du = new Map()), e.forEach(dv, t), (du = null), fu.call(t)));
  }
  function dv(t, e) {
    if (!(e.state.loading & 4)) {
      var n = du.get(t);
      if (n) var i = n.get(null);
      else {
        ((n = new Map()), du.set(t, n));
        for (
          var u = t.querySelectorAll("link[data-precedence],style[data-precedence]"), s = 0;
          s < u.length;
          s++
        ) {
          var m = u[s];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") &&
            (n.set(m.dataset.precedence, m), (i = m));
        }
        i && n.set(null, i);
      }
      ((u = e.instance),
        (m = u.getAttribute("data-precedence")),
        (s = n.get(m) || i),
        s === i && n.set(null, u),
        n.set(m, u),
        this.count++,
        (i = fu.bind(this)),
        u.addEventListener("load", i),
        u.addEventListener("error", i),
        s
          ? s.parentNode.insertBefore(u, s.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var Nl = {
    $$typeof: Q,
    Provider: null,
    Consumer: null,
    _currentValue: ft,
    _currentValue2: ft,
    _threadCount: 0,
  };
  function hv(t, e, n, i, u, s, m, E, O) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Iu(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Iu(0)),
      (this.hiddenUpdates = Iu(null)),
      (this.identifierPrefix = i),
      (this.onUncaughtError = u),
      (this.onCaughtError = s),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = O),
      (this.incompleteTransitions = new Map()));
  }
  function zp(t, e, n, i, u, s, m, E, O, H, I, k) {
    return (
      (t = new hv(t, e, n, m, O, H, I, k, E)),
      (e = 1),
      s === !0 && (e |= 24),
      (s = Ye(3, null, null, e)),
      (t.current = s),
      (s.stateNode = t),
      (e = Bo()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (s.memoizedState = { element: i, isDehydrated: n, cache: e }),
      No(s),
      t
    );
  }
  function Bp(t) {
    return t ? ((t = yi), t) : yi;
  }
  function Up(t, e, n, i, u, s) {
    ((u = Bp(u)),
      i.context === null ? (i.context = u) : (i.pendingContext = u),
      (i = kn(e)),
      (i.payload = { element: n }),
      (s = s === void 0 ? null : s),
      s !== null && (i.callback = s),
      (n = $n(t, i, e)),
      n !== null && (Le(n, t, e), pl(n, t, e)));
  }
  function Dp(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function tc(t, e) {
    (Dp(t, e), (t = t.alternate) && Dp(t, e));
  }
  function Lp(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Da(t, 67108864);
      (e !== null && Le(e, t, 67108864), tc(t, 67108864));
    }
  }
  function Np(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ze();
      e = Fu(e);
      var n = Da(t, e);
      (n !== null && Le(n, t, e), tc(t, e));
    }
  }
  var pu = !0;
  function pv(t, e, n, i) {
    var u = Z.T;
    Z.T = null;
    var s = tt.p;
    try {
      ((tt.p = 2), ec(t, e, n, i));
    } finally {
      ((tt.p = s), (Z.T = u));
    }
  }
  function mv(t, e, n, i) {
    var u = Z.T;
    Z.T = null;
    var s = tt.p;
    try {
      ((tt.p = 8), ec(t, e, n, i));
    } finally {
      ((tt.p = s), (Z.T = u));
    }
  }
  function ec(t, e, n, i) {
    if (pu) {
      var u = nc(i);
      if (u === null) (Gs(t, e, i, mu, n), Hp(t, i));
      else if (gv(u, t, e, n, i)) i.stopPropagation();
      else if ((Hp(t, i), e & 4 && -1 < yv.indexOf(t))) {
        for (; u !== null; ) {
          var s = li(u);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var m = Ca(s.pendingLanes);
                  if (m !== 0) {
                    var E = s;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; m; ) {
                      var O = 1 << (31 - Et(m));
                      ((E.entanglements[1] |= O), (m &= ~O));
                    }
                    (mn(s), (qt & 6) === 0 && ((kr = pe() + 500), Ol(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((E = Da(s, 2)), E !== null && Le(E, s, 2), Wr(), tc(s, 2));
            }
          if (((s = nc(i)), s === null && Gs(t, e, i, mu, n), s === u)) break;
          u = s;
        }
        u !== null && i.stopPropagation();
      } else Gs(t, e, i, null, n);
    }
  }
  function nc(t) {
    return ((t = ao(t)), ac(t));
  }
  var mu = null;
  function ac(t) {
    if (((mu = null), (t = ii(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (((t = y(e)), t !== null)) return t;
          t = null;
        } else if (n === 31) {
          if (((t = h(e)), t !== null)) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((mu = t), null);
  }
  function jp(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Mt()) {
          case ce:
            return 2;
          case b:
            return 8;
          case f:
          case p:
            return 32;
          case R:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ic = !1,
    sa = null,
    ca = null,
    fa = null,
    jl = new Map(),
    Hl = new Map(),
    da = [],
    yv =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Hp(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        sa = null;
        break;
      case "dragenter":
      case "dragleave":
        ca = null;
        break;
      case "mouseover":
      case "mouseout":
        fa = null;
        break;
      case "pointerover":
      case "pointerout":
        jl.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hl.delete(e.pointerId);
    }
  }
  function ql(t, e, n, i, u, s) {
    return t === null || t.nativeEvent !== s
      ? ((t = {
          blockedOn: e,
          domEventName: n,
          eventSystemFlags: i,
          nativeEvent: s,
          targetContainers: [u],
        }),
        e !== null && ((e = li(e)), e !== null && Lp(e)),
        t)
      : ((t.eventSystemFlags |= i),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function gv(t, e, n, i, u) {
    switch (e) {
      case "focusin":
        return ((sa = ql(sa, t, e, n, i, u)), !0);
      case "dragenter":
        return ((ca = ql(ca, t, e, n, i, u)), !0);
      case "mouseover":
        return ((fa = ql(fa, t, e, n, i, u)), !0);
      case "pointerover":
        var s = u.pointerId;
        return (jl.set(s, ql(jl.get(s) || null, t, e, n, i, u)), !0);
      case "gotpointercapture":
        return ((s = u.pointerId), Hl.set(s, ql(Hl.get(s) || null, t, e, n, i, u)), !0);
    }
    return !1;
  }
  function qp(t) {
    var e = ii(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (((e = n.tag), e === 13)) {
          if (((e = y(n)), e !== null)) {
            ((t.blockedOn = e),
              $c(t.priority, function () {
                Np(n);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = h(n)), e !== null)) {
            ((t.blockedOn = e),
              $c(t.priority, function () {
                Np(n);
              }));
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function yu(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = nc(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(n.type, n);
        ((no = i), n.target.dispatchEvent(i), (no = null));
      } else return ((e = li(n)), e !== null && Lp(e), (t.blockedOn = n), !1);
      e.shift();
    }
    return !0;
  }
  function Yp(t, e, n) {
    yu(t) && n.delete(e);
  }
  function vv() {
    ((ic = !1),
      sa !== null && yu(sa) && (sa = null),
      ca !== null && yu(ca) && (ca = null),
      fa !== null && yu(fa) && (fa = null),
      jl.forEach(Yp),
      Hl.forEach(Yp));
  }
  function gu(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      ic || ((ic = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, vv)));
  }
  var vu = null;
  function Gp(t) {
    vu !== t &&
      ((vu = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        vu === t && (vu = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e],
            i = t[e + 1],
            u = t[e + 2];
          if (typeof i != "function") {
            if (ac(i || n) === null) continue;
            break;
          }
          var s = li(n);
          s !== null &&
            (t.splice(e, 3),
            (e -= 3),
            ns(s, { pending: !0, data: u, method: n.method, action: i }, i, u));
        }
      }));
  }
  function Yi(t) {
    function e(O) {
      return gu(O, t);
    }
    (sa !== null && gu(sa, t),
      ca !== null && gu(ca, t),
      fa !== null && gu(fa, t),
      jl.forEach(e),
      Hl.forEach(e));
    for (var n = 0; n < da.length; n++) {
      var i = da[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < da.length && ((n = da[0]), n.blockedOn === null); )
      (qp(n), n.blockedOn === null && da.shift());
    if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
      for (i = 0; i < n.length; i += 3) {
        var u = n[i],
          s = n[i + 1],
          m = u[Ce] || null;
        if (typeof s == "function") m || Gp(n);
        else if (m) {
          var E = null;
          if (s && s.hasAttribute("formAction")) {
            if (((u = s), (m = s[Ce] || null))) E = m.formAction;
            else if (ac(u) !== null) continue;
          } else E = m.action;
          (typeof E == "function" ? (n[i + 1] = E) : (n.splice(i, 3), (i -= 3)), Gp(n));
        }
      }
  }
  function Vp() {
    function t(s) {
      s.canIntercept &&
        s.info === "react-transition" &&
        s.intercept({
          handler: function () {
            return new Promise(function (m) {
              return (u = m);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function e() {
      (u !== null && (u(), (u = null)), i || setTimeout(n, 20));
    }
    function n() {
      if (!i && !navigation.transition) {
        var s = navigation.currentEntry;
        s &&
          s.url != null &&
          navigation.navigate(s.url, {
            state: s.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var i = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", e),
        navigation.addEventListener("navigateerror", e),
        setTimeout(n, 100),
        function () {
          ((i = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", e),
            navigation.removeEventListener("navigateerror", e),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function lc(t) {
    this._internalRoot = t;
  }
  ((Su.prototype.render = lc.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var n = e.current,
        i = Ze();
      Up(n, i, t, e, null, null);
    }),
    (Su.prototype.unmount = lc.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (Up(t.current, 2, null, t, null, null), Wr(), (e[ai] = null));
        }
      }));
  function Su(t) {
    this._internalRoot = t;
  }
  Su.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = kc();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < da.length && e !== 0 && e < da[n].priority; n++);
      (da.splice(n, 0, t), n === 0 && qp(t));
    }
  };
  var Xp = l.version;
  if (Xp !== "19.2.5") throw Error(o(527, Xp, "19.2.5"));
  tt.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(o(188))
        : ((t = Object.keys(t).join(",")), Error(o(268, t)));
    return ((t = g(e)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Sv = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: Z,
    reconcilerVersion: "19.2.5",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bu.isDisabled && bu.supportsFiber)
      try {
        ((P = bu.inject(Sv)), (pt = bu));
      } catch {}
  }
  return (
    (Gl.createRoot = function (t, e) {
      if (!c(t)) throw Error(o(299));
      var n = !1,
        i = "",
        u = Jd,
        s = kd,
        m = $d;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (n = !0),
          e.identifierPrefix !== void 0 && (i = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (s = e.onCaughtError),
          e.onRecoverableError !== void 0 && (m = e.onRecoverableError)),
        (e = zp(t, 1, !1, null, null, n, i, null, u, s, m, Vp)),
        (t[ai] = e.current),
        Ys(t),
        new lc(e)
      );
    }),
    (Gl.hydrateRoot = function (t, e, n) {
      if (!c(t)) throw Error(o(299));
      var i = !1,
        u = "",
        s = Jd,
        m = kd,
        E = $d,
        O = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (s = n.onUncaughtError),
          n.onCaughtError !== void 0 && (m = n.onCaughtError),
          n.onRecoverableError !== void 0 && (E = n.onRecoverableError),
          n.formState !== void 0 && (O = n.formState)),
        (e = zp(t, 1, !0, e, n ?? null, i, u, O, s, m, E, Vp)),
        (e.context = Bp(null)),
        (n = e.current),
        (i = Ze()),
        (i = Fu(i)),
        (u = kn(i)),
        (u.callback = null),
        $n(n, u, i),
        (n = i),
        (e.current.lanes = n),
        Ji(e, n),
        mn(e),
        (t[ai] = e.current),
        Ys(t),
        new Su(e)
      );
    }),
    (Gl.version = "19.2.5"),
    Gl
  );
}
var Wp;
function Cv() {
  if (Wp) return oc.exports;
  Wp = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return (a(), (oc.exports = Mv()), oc.exports);
}
var Ov = Cv(),
  zv = "__TSS_CONTEXT",
  Mc = Symbol.for("TSS_SERVER_FUNCTION"),
  Bv = "application/x-tss-framed",
  jn = { JSON: 0, CHUNK: 1, END: 2, ERROR: 3 },
  Uv = /;\s*v=(\d+)/;
function Dv(a) {
  const l = a.match(Uv);
  return l ? parseInt(l[1], 10) : void 0;
}
function Lv(a) {
  const l = Dv(a);
  if (l !== void 0 && l !== 1)
    throw new Error(
      `Incompatible framed protocol version: server=${l}, client=1. Please ensure client and server are using compatible versions.`,
    );
}
var Jm = () => window.__TSS_START_OPTIONS__,
  km = !1;
function $l(a) {
  return a[a.length - 1];
}
function Nv(a) {
  return typeof a == "function";
}
function ya(a, l) {
  return Nv(a) ? a(l) : a;
}
var jv = Object.prototype.hasOwnProperty,
  tm = Object.prototype.propertyIsEnumerable,
  Hv = () => Object.create(null),
  Ia = (a, l) => Fa(a, l, Hv);
function Fa(a, l, r = () => ({}), o = 0) {
  if (a === l) return a;
  if (o > 500) return l;
  const c = l,
    d = am(a) && am(c);
  if (!d && !(Fi(a) && Fi(c))) return c;
  const y = d ? a : em(a);
  if (!y) return c;
  const h = d ? c : em(c);
  if (!h) return c;
  const v = y.length,
    g = h.length,
    _ = d ? new Array(g) : r();
  let S = 0;
  for (let A = 0; A < g; A++) {
    const x = d ? A : h[A],
      M = a[x],
      D = c[x];
    if (M === D) {
      ((_[x] = M), (d ? A < v : jv.call(a, x)) && S++);
      continue;
    }
    if (M === null || D === null || typeof M != "object" || typeof D != "object") {
      _[x] = D;
      continue;
    }
    const C = Fa(M, D, r, o + 1);
    ((_[x] = C), C === M && S++);
  }
  return v === g && S === v ? a : _;
}
function em(a) {
  const l = Object.getOwnPropertyNames(a);
  for (const c of l) if (!tm.call(a, c)) return !1;
  const r = Object.getOwnPropertySymbols(a);
  if (r.length === 0) return l;
  const o = l;
  for (const c of r) {
    if (!tm.call(a, c)) return !1;
    o.push(c);
  }
  return o;
}
function Fi(a) {
  if (!nm(a)) return !1;
  const l = a.constructor;
  if (typeof l > "u") return !0;
  const r = l.prototype;
  return !(!nm(r) || !r.hasOwnProperty("isPrototypeOf"));
}
function nm(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
}
function am(a) {
  return Array.isArray(a) && a.length === Object.keys(a).length;
}
function Ne(a, l, r) {
  if (a === l) return !0;
  if (typeof a != typeof l) return !1;
  if (Array.isArray(a) && Array.isArray(l)) {
    if (a.length !== l.length) return !1;
    for (let o = 0, c = a.length; o < c; o++) if (!Ne(a[o], l[o], r)) return !1;
    return !0;
  }
  if (Fi(a) && Fi(l)) {
    const o = r?.ignoreUndefined ?? !0;
    if (r?.partial) {
      for (const y in l) if ((!o || l[y] !== void 0) && !Ne(a[y], l[y], r)) return !1;
      return !0;
    }
    let c = 0;
    if (!o) c = Object.keys(a).length;
    else for (const y in a) a[y] !== void 0 && c++;
    let d = 0;
    for (const y in l) if ((!o || l[y] !== void 0) && (d++, d > c || !Ne(a[y], l[y], r))) return !1;
    return c === d;
  }
  return !1;
}
function ti(a) {
  let l, r;
  const o = new Promise((c, d) => {
    ((l = c), (r = d));
  });
  return (
    (o.status = "pending"),
    (o.resolve = (c) => {
      ((o.status = "resolved"), (o.value = c), l(c), a?.(c));
    }),
    (o.reject = (c) => {
      ((o.status = "rejected"), r(c));
    }),
    o
  );
}
function qv(a) {
  return typeof a?.message != "string"
    ? !1
    : a.message.startsWith("Failed to fetch dynamically imported module") ||
        a.message.startsWith("error loading dynamically imported module") ||
        a.message.startsWith("Importing a module script failed");
}
function Wl(a) {
  return !!(a && typeof a == "object" && typeof a.then == "function");
}
function Yv(a) {
  return a.replace(/[\x00-\x1f\x7f]/g, "");
}
function im(a) {
  let l;
  try {
    l = decodeURI(a);
  } catch {
    l = a.replaceAll(/%[0-9A-F]{2}/gi, (r) => {
      try {
        return decodeURI(r);
      } catch {
        return r;
      }
    });
  }
  return Yv(l);
}
var Gv = ["http:", "https:", "mailto:", "tel:"];
function Bu(a, l) {
  if (!a) return !1;
  try {
    const r = new URL(a);
    return !l.has(r.protocol);
  } catch {
    return !1;
  }
}
var Vv = {
    "&": "\\u0026",
    ">": "\\u003e",
    "<": "\\u003c",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  },
  Xv = /[&><\u2028\u2029]/g;
function Qv(a) {
  return a.replace(Xv, (l) => Vv[l]);
}
function Vl(a) {
  if (!a) return { path: a, handledProtocolRelativeURL: !1 };
  if (!/[%\\\x00-\x1f\x7f]/.test(a) && !a.startsWith("//"))
    return { path: a, handledProtocolRelativeURL: !1 };
  const l = /%25|%5C/gi;
  let r = 0,
    o = "",
    c;
  for (; (c = l.exec(a)) !== null; ) ((o += im(a.slice(r, c.index)) + c[0]), (r = l.lastIndex));
  o = o + im(r ? a.slice(r) : a);
  let d = !1;
  return (
    o.startsWith("//") && ((d = !0), (o = "/" + o.replace(/^\/+/, ""))),
    { path: o, handledProtocolRelativeURL: d }
  );
}
function Zv(a) {
  return /\s|[^\u0000-\u007F]/.test(a) ? a.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent) : a;
}
function Kv(a, l) {
  if (a === l) return !0;
  if (a.length !== l.length) return !1;
  for (let r = 0; r < a.length; r++) if (a[r] !== l[r]) return !1;
  return !0;
}
function He() {
  throw new Error("Invariant failed");
}
function tr(a) {
  const l = new Map();
  let r, o;
  const c = (d) => {
    d.next &&
      (d.prev
        ? ((d.prev.next = d.next),
          (d.next.prev = d.prev),
          (d.next = void 0),
          o && ((o.next = d), (d.prev = o)))
        : ((d.next.prev = void 0),
          (r = d.next),
          (d.next = void 0),
          o && ((d.prev = o), (o.next = d))),
      (o = d));
  };
  return {
    get(d) {
      const y = l.get(d);
      if (y) return (c(y), y.value);
    },
    set(d, y) {
      if (l.size >= a && r) {
        const v = r;
        (l.delete(v.key),
          v.next && ((r = v.next), (v.next.prev = void 0)),
          v === o && (o = void 0));
      }
      const h = l.get(d);
      if (h) ((h.value = y), c(h));
      else {
        const v = { key: d, value: y, prev: o };
        (o && (o.next = v), (o = v), r || (r = v), l.set(d, v));
      }
    },
    clear() {
      (l.clear(), (r = void 0), (o = void 0));
    },
  };
}
var Pa = 4,
  $m = 5;
function Iv(a) {
  const l = a.indexOf("{");
  if (l === -1) return null;
  const r = a.indexOf("}", l);
  return r === -1 || l + 1 >= a.length ? null : [l, r];
}
function Nc(a, l, r = new Uint16Array(6)) {
  const o = a.indexOf("/", l),
    c = o === -1 ? a.length : o,
    d = a.substring(l, c);
  if (!d || !d.includes("$"))
    return ((r[0] = 0), (r[1] = l), (r[2] = l), (r[3] = c), (r[4] = c), (r[5] = c), r);
  if (d === "$") {
    const h = a.length;
    return ((r[0] = 2), (r[1] = l), (r[2] = l), (r[3] = h), (r[4] = h), (r[5] = h), r);
  }
  if (d.charCodeAt(0) === 36)
    return ((r[0] = 1), (r[1] = l), (r[2] = l + 1), (r[3] = c), (r[4] = c), (r[5] = c), r);
  const y = Iv(d);
  if (y) {
    const [h, v] = y,
      g = d.charCodeAt(h + 1);
    if (g === 45) {
      if (h + 2 < d.length && d.charCodeAt(h + 2) === 36) {
        const _ = h + 3,
          S = v;
        if (_ < S)
          return (
            (r[0] = 3),
            (r[1] = l + h),
            (r[2] = l + _),
            (r[3] = l + S),
            (r[4] = l + v + 1),
            (r[5] = c),
            r
          );
      }
    } else if (g === 36) {
      const _ = h + 1,
        S = h + 2;
      return S === v
        ? ((r[0] = 2),
          (r[1] = l + h),
          (r[2] = l + _),
          (r[3] = l + S),
          (r[4] = l + v + 1),
          (r[5] = a.length),
          r)
        : ((r[0] = 1),
          (r[1] = l + h),
          (r[2] = l + S),
          (r[3] = l + v),
          (r[4] = l + v + 1),
          (r[5] = c),
          r);
    }
  }
  return ((r[0] = 0), (r[1] = l), (r[2] = l), (r[3] = c), (r[4] = c), (r[5] = c), r);
}
function qu(a, l, r, o, c, d, y) {
  y?.(r);
  let h = o;
  {
    const v = r.fullPath ?? r.from,
      g = v.length,
      _ = r.options?.caseSensitive ?? a,
      S = !!(r.options?.params?.parse && r.options?.skipRouteOnParseError?.params);
    for (; h < g; ) {
      const x = Nc(v, h, l);
      let M;
      const D = h,
        C = x[5];
      switch (((h = C + 1), d++, x[0])) {
        case 0: {
          const B = v.substring(x[2], x[3]);
          if (_) {
            const q = c.static?.get(B);
            if (q) M = q;
            else {
              c.static ??= new Map();
              const Q = Ja(r.fullPath ?? r.from);
              ((Q.parent = c), (Q.depth = d), (M = Q), c.static.set(B, Q));
            }
          } else {
            const q = B.toLowerCase(),
              Q = c.staticInsensitive?.get(q);
            if (Q) M = Q;
            else {
              c.staticInsensitive ??= new Map();
              const V = Ja(r.fullPath ?? r.from);
              ((V.parent = c), (V.depth = d), (M = V), c.staticInsensitive.set(q, V));
            }
          }
          break;
        }
        case 1: {
          const B = v.substring(D, x[1]),
            q = v.substring(x[4], C),
            Q = _ && !!(B || q),
            V = B ? (Q ? B : B.toLowerCase()) : void 0,
            $ = q ? (Q ? q : q.toLowerCase()) : void 0,
            nt =
              !S &&
              c.dynamic?.find(
                (F) =>
                  !F.skipOnParamError && F.caseSensitive === Q && F.prefix === V && F.suffix === $,
              );
          if (nt) M = nt;
          else {
            const F = hc(1, r.fullPath ?? r.from, Q, V, $);
            ((M = F), (F.depth = d), (F.parent = c), (c.dynamic ??= []), c.dynamic.push(F));
          }
          break;
        }
        case 3: {
          const B = v.substring(D, x[1]),
            q = v.substring(x[4], C),
            Q = _ && !!(B || q),
            V = B ? (Q ? B : B.toLowerCase()) : void 0,
            $ = q ? (Q ? q : q.toLowerCase()) : void 0,
            nt =
              !S &&
              c.optional?.find(
                (F) =>
                  !F.skipOnParamError && F.caseSensitive === Q && F.prefix === V && F.suffix === $,
              );
          if (nt) M = nt;
          else {
            const F = hc(3, r.fullPath ?? r.from, Q, V, $);
            ((M = F), (F.parent = c), (F.depth = d), (c.optional ??= []), c.optional.push(F));
          }
          break;
        }
        case 2: {
          const B = v.substring(D, x[1]),
            q = v.substring(x[4], C),
            Q = _ && !!(B || q),
            V = B ? (Q ? B : B.toLowerCase()) : void 0,
            $ = q ? (Q ? q : q.toLowerCase()) : void 0,
            nt = hc(2, r.fullPath ?? r.from, Q, V, $);
          ((M = nt), (nt.parent = c), (nt.depth = d), (c.wildcard ??= []), c.wildcard.push(nt));
        }
      }
      c = M;
    }
    if (S && r.children && !r.isRoot && r.id && r.id.charCodeAt(r.id.lastIndexOf("/") + 1) === 95) {
      const x = Ja(r.fullPath ?? r.from);
      ((x.kind = $m),
        (x.parent = c),
        d++,
        (x.depth = d),
        (c.pathless ??= []),
        c.pathless.push(x),
        (c = x));
    }
    const A = (r.path || !r.children) && !r.isRoot;
    if (A && v.endsWith("/")) {
      const x = Ja(r.fullPath ?? r.from);
      ((x.kind = Pa), (x.parent = c), d++, (x.depth = d), (c.index = x), (c = x));
    }
    ((c.parse = r.options?.params?.parse ?? null),
      (c.skipOnParamError = S),
      (c.parsingPriority = r.options?.skipRouteOnParseError?.priority ?? 0),
      A && !c.route && ((c.route = r), (c.fullPath = r.fullPath ?? r.from)));
  }
  if (r.children) for (const v of r.children) qu(a, l, v, h, c, d, y);
}
function dc(a, l) {
  if (a.skipOnParamError && !l.skipOnParamError) return -1;
  if (!a.skipOnParamError && l.skipOnParamError) return 1;
  if (a.skipOnParamError && l.skipOnParamError && (a.parsingPriority || l.parsingPriority))
    return l.parsingPriority - a.parsingPriority;
  if (a.prefix && l.prefix && a.prefix !== l.prefix) {
    if (a.prefix.startsWith(l.prefix)) return -1;
    if (l.prefix.startsWith(a.prefix)) return 1;
  }
  if (a.suffix && l.suffix && a.suffix !== l.suffix) {
    if (a.suffix.endsWith(l.suffix)) return -1;
    if (l.suffix.endsWith(a.suffix)) return 1;
  }
  return a.prefix && !l.prefix
    ? -1
    : !a.prefix && l.prefix
      ? 1
      : a.suffix && !l.suffix
        ? -1
        : !a.suffix && l.suffix
          ? 1
          : a.caseSensitive && !l.caseSensitive
            ? -1
            : !a.caseSensitive && l.caseSensitive
              ? 1
              : 0;
}
function pa(a) {
  if (a.pathless) for (const l of a.pathless) pa(l);
  if (a.static) for (const l of a.static.values()) pa(l);
  if (a.staticInsensitive) for (const l of a.staticInsensitive.values()) pa(l);
  if (a.dynamic?.length) {
    a.dynamic.sort(dc);
    for (const l of a.dynamic) pa(l);
  }
  if (a.optional?.length) {
    a.optional.sort(dc);
    for (const l of a.optional) pa(l);
  }
  if (a.wildcard?.length) {
    a.wildcard.sort(dc);
    for (const l of a.wildcard) pa(l);
  }
}
function Ja(a) {
  return {
    kind: 0,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: a,
    parent: null,
    parse: null,
    skipOnParamError: !1,
    parsingPriority: 0,
  };
}
function hc(a, l, r, o, c) {
  return {
    kind: a,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: l,
    parent: null,
    parse: null,
    skipOnParamError: !1,
    parsingPriority: 0,
    caseSensitive: r,
    prefix: o,
    suffix: c,
  };
}
function Fv(a, l) {
  const r = Ja("/"),
    o = new Uint16Array(6);
  for (const c of a) qu(!1, o, c, 1, r, 0);
  (pa(r), (l.masksTree = r), (l.flatCache = tr(1e3)));
}
function Pv(a, l) {
  a ||= "/";
  const r = l.flatCache.get(a);
  if (r) return r;
  const o = jc(a, l.masksTree);
  return (l.flatCache.set(a, o), o);
}
function Jv(a, l, r, o, c) {
  ((a ||= "/"), (o ||= "/"));
  const d = l ? `case\0${a}` : a;
  let y = c.singleCache.get(d);
  return (
    y || ((y = Ja("/")), qu(l, new Uint16Array(6), { from: a }, 1, y, 0), c.singleCache.set(d, y)),
    jc(o, y, r)
  );
}
function kv(a, l, r = !1) {
  const o = r ? a : `nofuzz\0${a}`,
    c = l.matchCache.get(o);
  if (c !== void 0) return c;
  a ||= "/";
  let d;
  try {
    d = jc(a, l.segmentTree, r);
  } catch (y) {
    if (y instanceof URIError) d = null;
    else throw y;
  }
  return (d && (d.branch = t1(d.route)), l.matchCache.set(o, d), d);
}
function $v(a) {
  return a === "/" ? a : a.replace(/\/{1,}$/, "");
}
function Wv(a, l = !1, r) {
  const o = Ja(a.fullPath),
    c = new Uint16Array(6),
    d = {},
    y = {};
  let h = 0;
  return (
    qu(l, c, a, 1, o, 0, (v) => {
      if ((r?.(v, h), v.id in d && He(), (d[v.id] = v), h !== 0 && v.path)) {
        const g = $v(v.fullPath);
        (!y[g] || v.fullPath.endsWith("/")) && (y[g] = v);
      }
      h++;
    }),
    pa(o),
    {
      processedTree: {
        segmentTree: o,
        singleCache: tr(1e3),
        matchCache: tr(1e3),
        flatCache: null,
        masksTree: null,
      },
      routesById: d,
      routesByPath: y,
    }
  );
}
function jc(a, l, r = !1) {
  const o = a.split("/"),
    c = n1(a, o, l, r);
  if (!c) return null;
  const [d] = Wm(a, o, c);
  return { route: c.node.route, rawParams: d, parsedParams: c.parsedParams };
}
function Wm(a, l, r) {
  const o = e1(r.node);
  let c = null;
  const d = Object.create(null);
  let y = r.extract?.part ?? 0,
    h = r.extract?.node ?? 0,
    v = r.extract?.path ?? 0,
    g = r.extract?.segment ?? 0;
  for (; h < o.length; y++, h++, v++, g++) {
    const _ = o[h];
    if (_.kind === Pa) break;
    if (_.kind === $m) {
      (g--, y--, v--);
      continue;
    }
    const S = l[y],
      A = v;
    if ((S && (v += S.length), _.kind === 1)) {
      c ??= r.node.fullPath.split("/");
      const x = c[g],
        M = _.prefix?.length ?? 0;
      if (x.charCodeAt(M) === 123) {
        const D = _.suffix?.length ?? 0,
          C = x.substring(M + 2, x.length - D - 1),
          B = S.substring(M, S.length - D);
        d[C] = decodeURIComponent(B);
      } else {
        const D = x.substring(1);
        d[D] = decodeURIComponent(S);
      }
    } else if (_.kind === 3) {
      if (r.skipped & (1 << h)) {
        (y--, (v = A - 1));
        continue;
      }
      c ??= r.node.fullPath.split("/");
      const x = c[g],
        M = _.prefix?.length ?? 0,
        D = _.suffix?.length ?? 0,
        C = x.substring(M + 3, x.length - D - 1),
        B = _.suffix || _.prefix ? S.substring(M, S.length - D) : S;
      B && (d[C] = decodeURIComponent(B));
    } else if (_.kind === 2) {
      const x = _,
        M = a.substring(A + (x.prefix?.length ?? 0), a.length - (x.suffix?.length ?? 0)),
        D = decodeURIComponent(M);
      ((d["*"] = D), (d._splat = D));
      break;
    }
  }
  return (
    r.rawParams && Object.assign(d, r.rawParams),
    [d, { part: y, node: h, path: v, segment: g }]
  );
}
function t1(a) {
  const l = [a];
  for (; a.parentRoute; ) ((a = a.parentRoute), l.push(a));
  return (l.reverse(), l);
}
function e1(a) {
  const l = Array(a.depth + 1);
  do ((l[a.depth] = a), (a = a.parent));
  while (a);
  return l;
}
function n1(a, l, r, o) {
  if (a === "/" && r.index) return { node: r.index, skipped: 0 };
  const c = !$l(l),
    d = c && a !== "/",
    y = l.length - (c ? 1 : 0),
    h = [{ node: r, index: 1, skipped: 0, depth: 1, statics: 1, dynamics: 0, optionals: 0 }];
  let v = null,
    g = null,
    _ = null;
  for (; h.length; ) {
    const S = h.pop(),
      { node: A, index: x, skipped: M, depth: D, statics: C, dynamics: B, optionals: q } = S;
    let { extract: Q, rawParams: V, parsedParams: $ } = S;
    if (A.skipOnParamError) {
      if (!pc(a, l, S)) continue;
      ((V = S.rawParams), (Q = S.extract), ($ = S.parsedParams));
    }
    o && A.route && A.kind !== Pa && Xl(g, S) && (g = S);
    const nt = x === y;
    if (
      nt &&
      (A.route && !d && Xl(_, S) && (_ = S), !A.optional && !A.wildcard && !A.index && !A.pathless)
    )
      continue;
    const F = nt ? void 0 : l[x];
    let et;
    if (nt && A.index) {
      const it = {
        node: A.index,
        index: x,
        skipped: M,
        depth: D + 1,
        statics: C,
        dynamics: B,
        optionals: q,
        extract: Q,
        rawParams: V,
        parsedParams: $,
      };
      let ht = !0;
      if ((A.index.skipOnParamError && (pc(a, l, it) || (ht = !1)), ht)) {
        if (C === y && !B && !q && !M) return it;
        Xl(_, it) && (_ = it);
      }
    }
    if (A.wildcard && Xl(v, S))
      for (const it of A.wildcard) {
        const { prefix: ht, suffix: ot } = it;
        if (ht && (nt || !(it.caseSensitive ? F : (et ??= F.toLowerCase())).startsWith(ht)))
          continue;
        if (ot) {
          if (nt) continue;
          const _t = l.slice(x).join("/").slice(-ot.length);
          if ((it.caseSensitive ? _t : _t.toLowerCase()) !== ot) continue;
        }
        const St = {
          node: it,
          index: y,
          skipped: M,
          depth: D,
          statics: C,
          dynamics: B,
          optionals: q,
          extract: Q,
          rawParams: V,
          parsedParams: $,
        };
        if (!(it.skipOnParamError && !pc(a, l, St))) {
          v = St;
          break;
        }
      }
    if (A.optional) {
      const it = M | (1 << D),
        ht = D + 1;
      for (let ot = A.optional.length - 1; ot >= 0; ot--) {
        const St = A.optional[ot];
        h.push({
          node: St,
          index: x,
          skipped: it,
          depth: ht,
          statics: C,
          dynamics: B,
          optionals: q,
          extract: Q,
          rawParams: V,
          parsedParams: $,
        });
      }
      if (!nt)
        for (let ot = A.optional.length - 1; ot >= 0; ot--) {
          const St = A.optional[ot],
            { prefix: _t, suffix: Pt } = St;
          if (_t || Pt) {
            const Nt = St.caseSensitive ? F : (et ??= F.toLowerCase());
            if ((_t && !Nt.startsWith(_t)) || (Pt && !Nt.endsWith(Pt))) continue;
          }
          h.push({
            node: St,
            index: x + 1,
            skipped: M,
            depth: ht,
            statics: C,
            dynamics: B,
            optionals: q + 1,
            extract: Q,
            rawParams: V,
            parsedParams: $,
          });
        }
    }
    if (!nt && A.dynamic && F)
      for (let it = A.dynamic.length - 1; it >= 0; it--) {
        const ht = A.dynamic[it],
          { prefix: ot, suffix: St } = ht;
        if (ot || St) {
          const _t = ht.caseSensitive ? F : (et ??= F.toLowerCase());
          if ((ot && !_t.startsWith(ot)) || (St && !_t.endsWith(St))) continue;
        }
        h.push({
          node: ht,
          index: x + 1,
          skipped: M,
          depth: D + 1,
          statics: C,
          dynamics: B + 1,
          optionals: q,
          extract: Q,
          rawParams: V,
          parsedParams: $,
        });
      }
    if (!nt && A.staticInsensitive) {
      const it = A.staticInsensitive.get((et ??= F.toLowerCase()));
      it &&
        h.push({
          node: it,
          index: x + 1,
          skipped: M,
          depth: D + 1,
          statics: C + 1,
          dynamics: B,
          optionals: q,
          extract: Q,
          rawParams: V,
          parsedParams: $,
        });
    }
    if (!nt && A.static) {
      const it = A.static.get(F);
      it &&
        h.push({
          node: it,
          index: x + 1,
          skipped: M,
          depth: D + 1,
          statics: C + 1,
          dynamics: B,
          optionals: q,
          extract: Q,
          rawParams: V,
          parsedParams: $,
        });
    }
    if (A.pathless) {
      const it = D + 1;
      for (let ht = A.pathless.length - 1; ht >= 0; ht--) {
        const ot = A.pathless[ht];
        h.push({
          node: ot,
          index: x,
          skipped: M,
          depth: it,
          statics: C,
          dynamics: B,
          optionals: q,
          extract: Q,
          rawParams: V,
          parsedParams: $,
        });
      }
    }
  }
  if (_ && v) return Xl(v, _) ? _ : v;
  if (_) return _;
  if (v) return v;
  if (o && g) {
    let S = g.index;
    for (let x = 0; x < g.index; x++) S += l[x].length;
    const A = S === a.length ? "/" : a.slice(S);
    return ((g.rawParams ??= Object.create(null)), (g.rawParams["**"] = decodeURIComponent(A)), g);
  }
  return null;
}
function pc(a, l, r) {
  try {
    const [o, c] = Wm(a, l, r);
    ((r.rawParams = o), (r.extract = c));
    const d = r.node.parse(o);
    return ((r.parsedParams = Object.assign(Object.create(null), r.parsedParams, d)), !0);
  } catch {
    return null;
  }
}
function Xl(a, l) {
  return a
    ? l.statics > a.statics ||
        (l.statics === a.statics &&
          (l.dynamics > a.dynamics ||
            (l.dynamics === a.dynamics &&
              (l.optionals > a.optionals ||
                (l.optionals === a.optionals &&
                  ((l.node.kind === Pa) > (a.node.kind === Pa) ||
                    ((l.node.kind === Pa) == (a.node.kind === Pa) && l.depth > a.depth)))))))
    : !0;
}
function Tu(a) {
  return Hc(a.filter((l) => l !== void 0).join("/"));
}
function Hc(a) {
  return a.replace(/\/{2,}/g, "/");
}
function ty(a) {
  return a === "/" ? a : a.replace(/^\/{1,}/, "");
}
function va(a) {
  const l = a.length;
  return l > 1 && a[l - 1] === "/" ? a.replace(/\/{1,}$/, "") : a;
}
function ey(a) {
  return va(ty(a));
}
function Uu(a, l) {
  return a?.endsWith("/") && a !== "/" && a !== `${l}/` ? a.slice(0, -1) : a;
}
function a1(a, l, r) {
  return Uu(a, r) === Uu(l, r);
}
function i1({ base: a, to: l, trailingSlash: r = "never", cache: o }) {
  const c = l.startsWith("/"),
    d = !c && l === ".";
  let y;
  if (o) {
    y = c ? l : d ? a : a + "\0" + l;
    const S = o.get(y);
    if (S) return S;
  }
  let h;
  if (d) h = a.split("/");
  else if (c) h = l.split("/");
  else {
    for (h = a.split("/"); h.length > 1 && $l(h) === ""; ) h.pop();
    const S = l.split("/");
    for (let A = 0, x = S.length; A < x; A++) {
      const M = S[A];
      M === ""
        ? A
          ? A === x - 1 && h.push(M)
          : (h = [M])
        : M === ".."
          ? h.pop()
          : M === "." || h.push(M);
    }
  }
  h.length > 1 && ($l(h) === "" ? r === "never" && h.pop() : r === "always" && h.push(""));
  let v,
    g = "";
  for (let S = 0; S < h.length; S++) {
    S > 0 && (g += "/");
    const A = h[S];
    if (!A) continue;
    v = Nc(A, 0, v);
    const x = v[0];
    if (x === 0) {
      g += A;
      continue;
    }
    const M = v[5],
      D = A.substring(0, v[1]),
      C = A.substring(v[4], M),
      B = A.substring(v[2], v[3]);
    x === 1
      ? (g += D || C ? `${D}{$${B}}${C}` : `$${B}`)
      : x === 2
        ? (g += D || C ? `${D}{$}${C}` : "$")
        : (g += `${D}{-$${B}}${C}`);
  }
  g = Hc(g);
  const _ = g || "/";
  return (y && o && o.set(y, _), _);
}
function l1(a) {
  const l = new Map(a.map((c) => [encodeURIComponent(c), c])),
    r = Array.from(l.keys())
      .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    o = new RegExp(r, "g");
  return (c) => c.replace(o, (d) => l.get(d) ?? d);
}
function mc(a, l, r) {
  const o = l[a];
  return typeof o != "string"
    ? o
    : a === "_splat"
      ? /^[a-zA-Z0-9\-._~!/]*$/.test(o)
        ? o
        : o
            .split("/")
            .map((c) => rm(c, r))
            .join("/")
      : rm(o, r);
}
function lm({ path: a, params: l, decoder: r, ...o }) {
  let c = !1;
  const d = Object.create(null);
  if (!a || a === "/") return { interpolatedPath: "/", usedParams: d, isMissingParams: c };
  if (!a.includes("$")) return { interpolatedPath: a, usedParams: d, isMissingParams: c };
  const y = a.length;
  let h = 0,
    v,
    g = "";
  for (; h < y; ) {
    const _ = h;
    v = Nc(a, _, v);
    const S = v[5];
    if (((h = S + 1), _ === S)) continue;
    const A = v[0];
    if (A === 0) {
      g += "/" + a.substring(_, S);
      continue;
    }
    if (A === 2) {
      const x = l._splat;
      ((d._splat = x), (d["*"] = x));
      const M = a.substring(_, v[1]),
        D = a.substring(v[4], S);
      if (!x) {
        ((c = !0), (M || D) && (g += "/" + M + D));
        continue;
      }
      const C = mc("_splat", l, r);
      g += "/" + M + C + D;
      continue;
    }
    if (A === 1) {
      const x = a.substring(v[2], v[3]);
      (!c && !(x in l) && (c = !0), (d[x] = l[x]));
      const M = a.substring(_, v[1]),
        D = a.substring(v[4], S),
        C = mc(x, l, r) ?? "undefined";
      g += "/" + M + C + D;
      continue;
    }
    if (A === 3) {
      const x = a.substring(v[2], v[3]),
        M = l[x];
      if (M == null) continue;
      d[x] = M;
      const D = a.substring(_, v[1]),
        C = a.substring(v[4], S),
        B = mc(x, l, r) ?? "";
      g += "/" + D + B + C;
      continue;
    }
  }
  return (
    a.endsWith("/") && (g += "/"),
    { usedParams: d, interpolatedPath: g || "/", isMissingParams: c }
  );
}
function rm(a, l) {
  const r = encodeURIComponent(a);
  return l?.(r) ?? r;
}
function ge(a) {
  return a?.isNotFound === !0;
}
function r1() {
  try {
    return typeof window < "u" && typeof window.sessionStorage == "object"
      ? window.sessionStorage
      : void 0;
  } catch {
    return;
  }
}
var u1 = "tsr-scroll-restoration-v1_3";
function o1() {
  const a = r1();
  if (!a) return null;
  let l = {};
  try {
    const o = JSON.parse(a.getItem("tsr-scroll-restoration-v1_3") || "{}");
    Fi(o) && (l = o);
  } catch {}
  return {
    get state() {
      return l;
    },
    set: (o) => {
      l = ya(o, l) || l;
    },
    persist: () => {
      try {
        a.setItem(u1, JSON.stringify(l));
      } catch {}
    },
  };
}
var um = o1(),
  s1 = (a) => a.state.__TSR_key || a.href;
function c1(a) {
  const l = [];
  let r;
  for (; (r = a.parentNode); )
    (l.push(`${a.tagName}:nth-child(${Array.prototype.indexOf.call(r.children, a) + 1})`), (a = r));
  return `${l.reverse().join(" > ")}`.toLowerCase();
}
var Eu = !1,
  Ql = "window",
  om = "data-scroll-restoration-id";
function f1(a, l) {
  if (!um) return;
  const r = um;
  if (
    ((a.options.scrollRestoration ?? !1) && (a.isScrollRestoring = !0),
    a.isScrollRestorationSetup || !r)
  )
    return;
  ((a.isScrollRestorationSetup = !0), (Eu = !1));
  const o = a.options.getScrollRestorationKey || s1,
    c = new Map();
  window.history.scrollRestoration = "manual";
  const d = (h) => {
      if (!(Eu || !a.isScrollRestoring))
        if (h.target === document || h.target === window)
          c.set(Ql, { scrollX: window.scrollX || 0, scrollY: window.scrollY || 0 });
        else {
          const v = h.target;
          c.set(v, { scrollX: v.scrollLeft || 0, scrollY: v.scrollTop || 0 });
        }
    },
    y = (h) => {
      if (!a.isScrollRestoring || !h || c.size === 0 || !r) return;
      const v = (r.state[h] ||= {});
      for (const [g, _] of c) {
        let S;
        if (g === Ql) S = Ql;
        else if (g.isConnected) {
          const A = g.getAttribute(om);
          S = A ? `[${om}="${A}"]` : c1(g);
        }
        S && (v[S] = _);
      }
    };
  (document.addEventListener("scroll", d, !0),
    a.subscribe("onBeforeLoad", (h) => {
      (y(h.fromLocation ? o(h.fromLocation) : void 0), c.clear());
    }),
    window.addEventListener("pagehide", () => {
      (y(o(a.stores.resolvedLocation.get() ?? a.stores.location.get())), r.persist());
    }),
    a.subscribe("onRendered", (h) => {
      const v = o(h.toLocation),
        g = a.options.scrollRestorationBehavior,
        _ = a.options.scrollToTopSelectors;
      if ((c.clear(), !a.resetNextScroll)) {
        a.resetNextScroll = !0;
        return;
      }
      if (
        !(
          typeof a.options.scrollRestoration == "function" &&
          !a.options.scrollRestoration({ location: a.latestLocation })
        )
      ) {
        Eu = !0;
        try {
          const S = a.isScrollRestoring ? r.state[v] : void 0;
          let A = !1;
          if (S)
            for (const x in S) {
              const M = S[x];
              if (!Fi(M)) continue;
              const { scrollX: D, scrollY: C } = M;
              if (!(!Number.isFinite(D) || !Number.isFinite(C))) {
                if (x === Ql) (window.scrollTo({ top: C, left: D, behavior: g }), (A = !0));
                else if (x) {
                  let B;
                  try {
                    B = document.querySelector(x);
                  } catch {
                    continue;
                  }
                  B && ((B.scrollLeft = D), (B.scrollTop = C), (A = !0));
                }
              }
            }
          if (!A) {
            const x = a.history.location.hash.slice(1);
            if (x) {
              const M = window.history.state?.__hashScrollIntoViewOptions ?? !0;
              if (M) {
                const D = document.getElementById(x);
                D && D.scrollIntoView(M);
              }
            } else {
              const M = { top: 0, left: 0, behavior: g };
              if ((window.scrollTo(M), _))
                for (const D of _) {
                  if (D === Ql) continue;
                  const C = typeof D == "function" ? D() : document.querySelector(D);
                  C && C.scrollTo(M);
                }
            }
          }
        } finally {
          Eu = !1;
        }
        a.isScrollRestoring && r.set((S) => ((S[v] ||= {}), S));
      }
    }));
}
function ny(a, l = String) {
  const r = new URLSearchParams();
  for (const o in a) {
    const c = a[o];
    c !== void 0 && r.set(o, l(c));
  }
  return r.toString();
}
function yc(a) {
  return a ? (a === "false" ? !1 : a === "true" ? !0 : +a * 0 === 0 && +a + "" === a ? +a : a) : "";
}
function d1(a) {
  const l = new URLSearchParams(a),
    r = Object.create(null);
  for (const [o, c] of l.entries()) {
    const d = r[o];
    d == null ? (r[o] = yc(c)) : Array.isArray(d) ? d.push(yc(c)) : (r[o] = [d, yc(c)]);
  }
  return r;
}
var h1 = m1(JSON.parse),
  p1 = y1(JSON.stringify, JSON.parse);
function m1(a) {
  return (l) => {
    l[0] === "?" && (l = l.substring(1));
    const r = d1(l);
    for (const o in r) {
      const c = r[o];
      if (typeof c == "string")
        try {
          r[o] = a(c);
        } catch {}
    }
    return r;
  };
}
function y1(a, l) {
  const r = typeof l == "function";
  function o(c) {
    if (typeof c == "object" && c !== null)
      try {
        return a(c);
      } catch {}
    else if (r && typeof c == "string")
      try {
        return (l(c), a(c));
      } catch {}
    return c;
  }
  return (c) => {
    const d = ny(c, o);
    return d ? `?${d}` : "";
  };
}
var $a = "__root__";
function ay(a) {
  if (
    ((a.statusCode = a.statusCode || a.code || 307),
    !a._builtLocation && !a.reloadDocument && typeof a.href == "string")
  )
    try {
      (new URL(a.href), (a.reloadDocument = !0));
    } catch {}
  const l = new Headers(a.headers);
  a.href && l.get("Location") === null && l.set("Location", a.href);
  const r = new Response(null, { status: a.statusCode, headers: l });
  if (((r.options = a), a.throw)) throw r;
  return r;
}
function je(a) {
  return a instanceof Response && !!a.options;
}
function g1(a) {
  if (a !== null && typeof a == "object" && a.isSerializedRedirect) return ay(a);
}
function v1(a) {
  return {
    input: ({ url: l }) => {
      for (const r of a) l = Cc(r, l);
      return l;
    },
    output: ({ url: l }) => {
      for (let r = a.length - 1; r >= 0; r--) l = iy(a[r], l);
      return l;
    },
  };
}
function S1(a) {
  const l = ey(a.basepath),
    r = `/${l}`,
    o = `${r}/`,
    c = a.caseSensitive ? r : r.toLowerCase(),
    d = a.caseSensitive ? o : o.toLowerCase();
  return {
    input: ({ url: y }) => {
      const h = a.caseSensitive ? y.pathname : y.pathname.toLowerCase();
      return (
        h === c ? (y.pathname = "/") : h.startsWith(d) && (y.pathname = y.pathname.slice(r.length)),
        y
      );
    },
    output: ({ url: y }) => ((y.pathname = Tu(["/", l, y.pathname])), y),
  };
}
function Cc(a, l) {
  const r = a?.input?.({ url: l });
  if (r) {
    if (typeof r == "string") return new URL(r);
    if (r instanceof URL) return r;
  }
  return l;
}
function iy(a, l) {
  const r = a?.output?.({ url: l });
  if (r) {
    if (typeof r == "string") return new URL(r);
    if (r instanceof URL) return r;
  }
  return l;
}
function b1(a, l) {
  const { createMutableStore: r, createReadonlyStore: o, batch: c, init: d } = l,
    y = new Map(),
    h = new Map(),
    v = new Map(),
    g = r(a.status),
    _ = r(a.loadedAt),
    S = r(a.isLoading),
    A = r(a.isTransitioning),
    x = r(a.location),
    M = r(a.resolvedLocation),
    D = r(a.statusCode),
    C = r(a.redirect),
    B = r([]),
    q = r([]),
    Q = r([]),
    V = o(() => gc(y, B.get())),
    $ = o(() => gc(h, q.get())),
    nt = o(() => gc(v, Q.get())),
    F = o(() => B.get()[0]),
    et = o(() => B.get().some((tt) => y.get(tt)?.get().status === "pending")),
    it = o(() => ({
      locationHref: x.get().href,
      resolvedLocationHref: M.get()?.href,
      status: g.get(),
    })),
    ht = o(() => ({
      status: g.get(),
      loadedAt: _.get(),
      isLoading: S.get(),
      isTransitioning: A.get(),
      matches: V.get(),
      location: x.get(),
      resolvedLocation: M.get(),
      statusCode: D.get(),
      redirect: C.get(),
    })),
    ot = tr(64);
  function St(tt) {
    let ft = ot.get(tt);
    return (
      ft ||
        ((ft = o(() => {
          const zt = B.get();
          for (const Bt of zt) {
            const z = y.get(Bt);
            if (z && z.routeId === tt) return z.get();
          }
        })),
        ot.set(tt, ft)),
      ft
    );
  }
  const _t = {
    status: g,
    loadedAt: _,
    isLoading: S,
    isTransitioning: A,
    location: x,
    resolvedLocation: M,
    statusCode: D,
    redirect: C,
    matchesId: B,
    pendingIds: q,
    cachedIds: Q,
    matches: V,
    pendingMatches: $,
    cachedMatches: nt,
    firstId: F,
    hasPending: et,
    matchRouteDeps: it,
    matchStores: y,
    pendingMatchStores: h,
    cachedMatchStores: v,
    __store: ht,
    getRouteMatchStore: St,
    setMatches: Pt,
    setPending: Nt,
    setCached: Z,
  };
  (Pt(a.matches), d?.(_t));
  function Pt(tt) {
    vc(tt, y, B, r, c);
  }
  function Nt(tt) {
    vc(tt, h, q, r, c);
  }
  function Z(tt) {
    vc(tt, v, Q, r, c);
  }
  return _t;
}
function gc(a, l) {
  const r = [];
  for (const o of l) {
    const c = a.get(o);
    c && r.push(c.get());
  }
  return r;
}
function vc(a, l, r, o, c) {
  const d = a.map((h) => h.id),
    y = new Set(d);
  c(() => {
    for (const h of l.keys()) y.has(h) || l.delete(h);
    for (const h of a) {
      const v = l.get(h.id);
      if (!v) {
        const g = o(h);
        ((g.routeId = h.routeId), l.set(h.id, g));
        continue;
      }
      ((v.routeId = h.routeId), v.get() !== h && v.set(h));
    }
    Kv(r.get(), d) || r.set(d);
  });
}
var Oc = (a) => {
    if (!a.rendered) return ((a.rendered = !0), a.onReady?.());
  },
  E1 = (a) =>
    a.stores.matchesId.get().some((l) => a.stores.matchStores.get(l)?.get()._forcePending),
  Yu = (a, l) => !!(a.preload && !a.router.stores.matchStores.has(l)),
  Wa = (a, l, r = !0) => {
    const o = { ...(a.router.options.context ?? {}) },
      c = r ? l : l - 1;
    for (let d = 0; d <= c; d++) {
      const y = a.matches[d];
      if (!y) continue;
      const h = a.router.getMatch(y.id);
      h && Object.assign(o, h.__routeContext, h.__beforeLoadContext);
    }
    return o;
  },
  sm = (a, l) => {
    if (!a.matches.length) return;
    const r = l.routeId,
      o = a.matches.findIndex((y) => y.routeId === a.router.routeTree.id),
      c = o >= 0 ? o : 0;
    let d = r
      ? a.matches.findIndex((y) => y.routeId === r)
      : (a.firstBadMatchIndex ?? a.matches.length - 1);
    d < 0 && (d = c);
    for (let y = d; y >= 0; y--) {
      const h = a.matches[y];
      if (a.router.looseRoutesById[h.routeId].options.notFoundComponent) return y;
    }
    return r ? d : c;
  },
  ga = (a, l, r) => {
    if (!(!je(r) && !ge(r)))
      throw (
        (je(r) && r.redirectHandled && !r.options.reloadDocument) ||
          (l &&
            (l._nonReactive.beforeLoadPromise?.resolve(),
            l._nonReactive.loaderPromise?.resolve(),
            (l._nonReactive.beforeLoadPromise = void 0),
            (l._nonReactive.loaderPromise = void 0),
            (l._nonReactive.error = r),
            a.updateMatch(l.id, (o) => ({
              ...o,
              status: je(r)
                ? "redirected"
                : ge(r)
                  ? "notFound"
                  : o.status === "pending"
                    ? "success"
                    : o.status,
              context: Wa(a, l.index),
              isFetching: !1,
              error: r,
            })),
            ge(r) && !r.routeId && (r.routeId = l.routeId),
            l._nonReactive.loadPromise?.resolve()),
          je(r) &&
            ((a.rendered = !0),
            (r.options._fromLocation = a.location),
            (r.redirectHandled = !0),
            (r = a.router.resolveRedirect(r)))),
        r
      );
  },
  ly = (a, l) => {
    const r = a.router.getMatch(l);
    return !!(!r || r._nonReactive.dehydrated);
  },
  cm = (a, l, r) => {
    const o = Wa(a, r);
    a.updateMatch(l, (c) => ({ ...c, context: o }));
  },
  Zl = (a, l, r, o) => {
    const { id: c, routeId: d } = a.matches[l],
      y = a.router.looseRoutesById[d];
    if (r instanceof Promise) throw r;
    ((r.routerCode = o), (a.firstBadMatchIndex ??= l), ga(a, a.router.getMatch(c), r));
    try {
      y.options.onError?.(r);
    } catch (h) {
      ((r = h), ga(a, a.router.getMatch(c), r));
    }
    (a.updateMatch(
      c,
      (h) => (
        h._nonReactive.beforeLoadPromise?.resolve(),
        (h._nonReactive.beforeLoadPromise = void 0),
        h._nonReactive.loadPromise?.resolve(),
        {
          ...h,
          error: r,
          status: "error",
          isFetching: !1,
          updatedAt: Date.now(),
          abortController: new AbortController(),
        }
      ),
    ),
      !a.preload && !je(r) && !ge(r) && (a.serialError ??= r));
  },
  ry = (a, l, r, o) => {
    if (o._nonReactive.pendingTimeout !== void 0) return;
    const c = r.options.pendingMs ?? a.router.options.defaultPendingMs;
    if (
      a.onReady &&
      !Yu(a, l) &&
      (r.options.loader || r.options.beforeLoad || oy(r)) &&
      typeof c == "number" &&
      c !== 1 / 0 &&
      (r.options.pendingComponent ?? a.router.options?.defaultPendingComponent)
    ) {
      const d = setTimeout(() => {
        Oc(a);
      }, c);
      o._nonReactive.pendingTimeout = d;
    }
  },
  _1 = (a, l, r) => {
    const o = a.router.getMatch(l);
    if (!o._nonReactive.beforeLoadPromise && !o._nonReactive.loaderPromise) return;
    ry(a, l, r, o);
    const c = () => {
      const d = a.router.getMatch(l);
      d.preload && (d.status === "redirected" || d.status === "notFound") && ga(a, d, d.error);
    };
    return o._nonReactive.beforeLoadPromise ? o._nonReactive.beforeLoadPromise.then(c) : c();
  },
  x1 = (a, l, r, o) => {
    const c = a.router.getMatch(l);
    let d = c._nonReactive.loadPromise;
    c._nonReactive.loadPromise = ti(() => {
      (d?.resolve(), (d = void 0));
    });
    const { paramsError: y, searchError: h } = c;
    (y && Zl(a, r, y, "PARSE_PARAMS"), h && Zl(a, r, h, "VALIDATE_SEARCH"), ry(a, l, o, c));
    const v = new AbortController();
    let g = !1;
    const _ = () => {
        g ||
          ((g = !0),
          a.updateMatch(l, (V) => ({
            ...V,
            isFetching: "beforeLoad",
            fetchCount: V.fetchCount + 1,
            abortController: v,
          })));
      },
      S = () => {
        (c._nonReactive.beforeLoadPromise?.resolve(),
          (c._nonReactive.beforeLoadPromise = void 0),
          a.updateMatch(l, (V) => ({ ...V, isFetching: !1 })));
      };
    if (!o.options.beforeLoad) {
      a.router.batch(() => {
        (_(), S());
      });
      return;
    }
    c._nonReactive.beforeLoadPromise = ti();
    const A = { ...Wa(a, r, !1), ...c.__routeContext },
      { search: x, params: M, cause: D } = c,
      C = Yu(a, l),
      B = {
        search: x,
        abortController: v,
        params: M,
        preload: C,
        context: A,
        location: a.location,
        navigate: (V) => a.router.navigate({ ...V, _fromLocation: a.location }),
        buildLocation: a.router.buildLocation,
        cause: C ? "preload" : D,
        matches: a.matches,
        routeId: o.id,
        ...a.router.options.additionalContext,
      },
      q = (V) => {
        if (V === void 0) {
          a.router.batch(() => {
            (_(), S());
          });
          return;
        }
        ((je(V) || ge(V)) && (_(), Zl(a, r, V, "BEFORE_LOAD")),
          a.router.batch(() => {
            (_(), a.updateMatch(l, ($) => ({ ...$, __beforeLoadContext: V })), S());
          }));
      };
    let Q;
    try {
      if (((Q = o.options.beforeLoad(B)), Wl(Q)))
        return (
          _(),
          Q.catch((V) => {
            Zl(a, r, V, "BEFORE_LOAD");
          }).then(q)
        );
    } catch (V) {
      (_(), Zl(a, r, V, "BEFORE_LOAD"));
    }
    q(Q);
  },
  A1 = (a, l) => {
    const { id: r, routeId: o } = a.matches[l],
      c = a.router.looseRoutesById[o],
      d = () => h(),
      y = () => x1(a, r, l, c),
      h = () => {
        if (ly(a, r)) return;
        const v = _1(a, r, c);
        return Wl(v) ? v.then(y) : y();
      };
    return d();
  },
  w1 = (a, l, r) => {
    const o = a.router.getMatch(l);
    if (!o || (!r.options.head && !r.options.scripts && !r.options.headers)) return;
    const c = {
      ssr: a.router.options.ssr,
      matches: a.matches,
      match: o,
      params: o.params,
      loaderData: o.loaderData,
    };
    return Promise.all([r.options.head?.(c), r.options.scripts?.(c), r.options.headers?.(c)]).then(
      ([d, y, h]) => ({
        meta: d?.meta,
        links: d?.links,
        headScripts: d?.scripts,
        headers: h,
        scripts: y,
        styles: d?.styles,
      }),
    );
  },
  uy = (a, l, r, o, c) => {
    const d = l[o - 1],
      { params: y, loaderDeps: h, abortController: v, cause: g } = a.router.getMatch(r),
      _ = Wa(a, o),
      S = Yu(a, r);
    return {
      params: y,
      deps: h,
      preload: !!S,
      parentMatchPromise: d,
      abortController: v,
      context: _,
      location: a.location,
      navigate: (A) => a.router.navigate({ ...A, _fromLocation: a.location }),
      cause: S ? "preload" : g,
      route: c,
      ...a.router.options.additionalContext,
    };
  },
  fm = async (a, l, r, o, c) => {
    try {
      const d = a.router.getMatch(r);
      try {
        (!(km ?? a.router.isServer) || d.ssr === !0) && er(c);
        const y = c.options.loader,
          h = typeof y == "function" ? y : y?.handler,
          v = h?.(uy(a, l, r, o, c)),
          g = !!h && Wl(v);
        if (
          ((g ||
            c._lazyPromise ||
            c._componentsPromise ||
            c.options.head ||
            c.options.scripts ||
            c.options.headers ||
            d._nonReactive.minPendingPromise) &&
            a.updateMatch(r, (S) => ({ ...S, isFetching: "loader" })),
          h)
        ) {
          const S = g ? await v : v;
          (ga(a, a.router.getMatch(r), S),
            S !== void 0 && a.updateMatch(r, (A) => ({ ...A, loaderData: S })));
        }
        c._lazyPromise && (await c._lazyPromise);
        const _ = d._nonReactive.minPendingPromise;
        (_ && (await _),
          c._componentsPromise && (await c._componentsPromise),
          a.updateMatch(r, (S) => ({
            ...S,
            error: void 0,
            context: Wa(a, o),
            status: "success",
            isFetching: !1,
            updatedAt: Date.now(),
          })));
      } catch (y) {
        let h = y;
        if (h?.name === "AbortError") {
          if (d.abortController.signal.aborted) {
            (d._nonReactive.loaderPromise?.resolve(), (d._nonReactive.loaderPromise = void 0));
            return;
          }
          a.updateMatch(r, (g) => ({
            ...g,
            status: g.status === "pending" ? "success" : g.status,
            isFetching: !1,
            context: Wa(a, o),
          }));
          return;
        }
        const v = d._nonReactive.minPendingPromise;
        (v && (await v),
          ge(y) && (await c.options.notFoundComponent?.preload?.()),
          ga(a, a.router.getMatch(r), y));
        try {
          c.options.onError?.(y);
        } catch (g) {
          ((h = g), ga(a, a.router.getMatch(r), g));
        }
        (!je(h) && !ge(h) && (await er(c, ["errorComponent"])),
          a.updateMatch(r, (g) => ({
            ...g,
            error: h,
            context: Wa(a, o),
            status: "error",
            isFetching: !1,
          })));
      }
    } catch (d) {
      const y = a.router.getMatch(r);
      (y && (y._nonReactive.loaderPromise = void 0), ga(a, y, d));
    }
  },
  R1 = async (a, l, r) => {
    async function o(x, M, D, C, B) {
      const q = Date.now() - M.updatedAt,
        Q = x
          ? (B.options.preloadStaleTime ?? a.router.options.defaultPreloadStaleTime ?? 3e4)
          : (B.options.staleTime ?? a.router.options.defaultStaleTime ?? 0),
        V = B.options.shouldReload,
        $ = typeof V == "function" ? V(uy(a, l, c, r, B)) : V,
        { status: nt, invalid: F } = C,
        et =
          q >= Q && (!!a.forceStaleReload || C.cause === "enter" || (D !== void 0 && D !== C.id));
      ((y = nt === "success" && (F || ($ ?? et))),
        (x && B.options.preload === !1) ||
          (y && !a.sync && _
            ? ((h = !0),
              (async () => {
                try {
                  await fm(a, l, c, r, B);
                  const it = a.router.getMatch(c);
                  (it._nonReactive.loaderPromise?.resolve(),
                    it._nonReactive.loadPromise?.resolve(),
                    (it._nonReactive.loaderPromise = void 0),
                    (it._nonReactive.loadPromise = void 0));
                } catch (it) {
                  je(it) && (await a.router.navigate(it.options));
                }
              })())
            : nt !== "success" || y
              ? await fm(a, l, c, r, B)
              : cm(a, c, r)));
    }
    const { id: c, routeId: d } = a.matches[r];
    let y = !1,
      h = !1;
    const v = a.router.looseRoutesById[d],
      g = v.options.loader,
      _ =
        ((typeof g == "function" ? void 0 : g?.staleReloadMode) ??
          a.router.options.defaultStaleReloadMode) !== "blocking";
    if (ly(a, c)) {
      if (!a.router.getMatch(c)) return a.matches[r];
      cm(a, c, r);
    } else {
      const x = a.router.getMatch(c),
        M = a.router.stores.matchesId.get()[r],
        D =
          ((M && a.router.stores.matchStores.get(M)) || null)?.routeId === d
            ? M
            : a.router.stores.matches.get().find((B) => B.routeId === d)?.id,
        C = Yu(a, c);
      if (x._nonReactive.loaderPromise) {
        if (x.status === "success" && !a.sync && !x.preload && _) return x;
        await x._nonReactive.loaderPromise;
        const B = a.router.getMatch(c),
          q = B._nonReactive.error || B.error;
        (q && ga(a, B, q), B.status === "pending" && (await o(C, x, D, B, v)));
      } else {
        const B = C && !a.router.stores.matchStores.has(c),
          q = a.router.getMatch(c);
        ((q._nonReactive.loaderPromise = ti()),
          B !== q.preload && a.updateMatch(c, (Q) => ({ ...Q, preload: B })),
          await o(C, x, D, q, v));
      }
    }
    const S = a.router.getMatch(c);
    (h ||
      (S._nonReactive.loaderPromise?.resolve(),
      S._nonReactive.loadPromise?.resolve(),
      (S._nonReactive.loadPromise = void 0)),
      clearTimeout(S._nonReactive.pendingTimeout),
      (S._nonReactive.pendingTimeout = void 0),
      h || (S._nonReactive.loaderPromise = void 0),
      (S._nonReactive.dehydrated = void 0));
    const A = h ? S.isFetching : !1;
    return A !== S.isFetching || S.invalid !== !1
      ? (a.updateMatch(c, (x) => ({ ...x, isFetching: A, invalid: !1 })), a.router.getMatch(c))
      : S;
  };
async function dm(a) {
  const l = a,
    r = [];
  E1(l.router) && Oc(l);
  let o;
  for (let A = 0; A < l.matches.length; A++) {
    try {
      const x = A1(l, A);
      Wl(x) && (await x);
    } catch (x) {
      if (je(x)) throw x;
      if (ge(x)) o = x;
      else if (!l.preload) throw x;
      break;
    }
    if (l.serialError || l.firstBadMatchIndex != null) break;
  }
  const c = l.firstBadMatchIndex ?? l.matches.length,
    d = o && !l.preload ? sm(l, o) : void 0,
    y = o && l.preload ? 0 : d !== void 0 ? Math.min(d + 1, c) : c;
  let h, v;
  for (let A = 0; A < y; A++) r.push(R1(l, r, A));
  try {
    await Promise.all(r);
  } catch {
    const A = await Promise.allSettled(r);
    for (const x of A) {
      if (x.status !== "rejected") continue;
      const M = x.reason;
      if (je(M)) throw M;
      ge(M) ? (h ??= M) : (v ??= M);
    }
    if (v !== void 0) throw v;
  }
  const g = h ?? (o && !l.preload ? o : void 0);
  let _ = l.firstBadMatchIndex !== void 0 ? l.firstBadMatchIndex : l.matches.length - 1;
  if (!g && o && l.preload) return l.matches;
  if (g) {
    const A = sm(l, g);
    A === void 0 && He();
    const x = l.matches[A],
      M = l.router.looseRoutesById[x.routeId],
      D = l.router.options?.defaultNotFoundComponent;
    (!M.options.notFoundComponent && D && (M.options.notFoundComponent = D),
      (g.routeId = x.routeId));
    const C = x.routeId === l.router.routeTree.id;
    (l.updateMatch(x.id, (B) => ({
      ...B,
      ...(C
        ? { status: "success", globalNotFound: !0, error: void 0 }
        : { status: "notFound", error: g }),
      isFetching: !1,
    })),
      (_ = A),
      await er(M, ["notFoundComponent"]));
  } else if (!l.preload) {
    const A = l.matches[0];
    A.globalNotFound ||
      (l.router.getMatch(A.id)?.globalNotFound &&
        l.updateMatch(A.id, (x) => ({ ...x, globalNotFound: !1, error: void 0 })));
  }
  if (l.serialError && l.firstBadMatchIndex !== void 0) {
    const A = l.router.looseRoutesById[l.matches[l.firstBadMatchIndex].routeId];
    await er(A, ["errorComponent"]);
  }
  for (let A = 0; A <= _; A++) {
    const { id: x, routeId: M } = l.matches[A],
      D = l.router.looseRoutesById[M];
    try {
      const C = w1(l, x, D);
      if (C) {
        const B = await C;
        l.updateMatch(x, (q) => ({ ...q, ...B }));
      }
    } catch (C) {
      console.error(`Error executing head for route ${M}:`, C);
    }
  }
  const S = Oc(l);
  if ((Wl(S) && (await S), g)) throw g;
  if (l.serialError && !l.preload && !l.onReady) throw l.serialError;
  return l.matches;
}
function hm(a, l) {
  const r = l.map((o) => a.options[o]?.preload?.()).filter(Boolean);
  if (r.length !== 0) return Promise.all(r);
}
function er(a, l = Mu) {
  !a._lazyLoaded &&
    a._lazyPromise === void 0 &&
    (a.lazyFn
      ? (a._lazyPromise = a.lazyFn().then((o) => {
          const { id: c, ...d } = o.options;
          (Object.assign(a.options, d), (a._lazyLoaded = !0), (a._lazyPromise = void 0));
        }))
      : (a._lazyLoaded = !0));
  const r = () =>
    a._componentsLoaded
      ? void 0
      : l === Mu
        ? (() => {
            if (a._componentsPromise === void 0) {
              const o = hm(a, Mu);
              o
                ? (a._componentsPromise = o.then(() => {
                    ((a._componentsLoaded = !0), (a._componentsPromise = void 0));
                  }))
                : (a._componentsLoaded = !0);
            }
            return a._componentsPromise;
          })()
        : hm(a, l);
  return a._lazyPromise ? a._lazyPromise.then(r) : r();
}
function oy(a) {
  for (const l of Mu) if (a.options[l]?.preload) return !0;
  return !1;
}
var Mu = ["component", "errorComponent", "pendingComponent", "notFoundComponent"],
  Sa = "__TSR_index",
  pm = "popstate",
  mm = "beforeunload";
function T1(a) {
  let l = a.getLocation();
  const r = new Set(),
    o = (y) => {
      ((l = a.getLocation()), r.forEach((h) => h({ location: l, action: y })));
    },
    c = (y) => {
      (a.notifyOnIndexChange ?? !0) ? o(y) : (l = a.getLocation());
    },
    d = async ({ task: y, navigateOpts: h, ...v }) => {
      if (h?.ignoreBlocker ?? !1) {
        y();
        return;
      }
      const g = a.getBlockers?.() ?? [],
        _ = v.type === "PUSH" || v.type === "REPLACE";
      if (typeof document < "u" && g.length && _)
        for (const S of g) {
          const A = Du(v.path, v.state);
          if (await S.blockerFn({ currentLocation: l, nextLocation: A, action: v.type })) {
            a.onBlocked?.();
            return;
          }
        }
      y();
    };
  return {
    get location() {
      return l;
    },
    get length() {
      return a.getLength();
    },
    subscribers: r,
    subscribe: (y) => (
      r.add(y),
      () => {
        r.delete(y);
      }
    ),
    push: (y, h, v) => {
      const g = l.state[Sa];
      ((h = ym(g + 1, h)),
        d({
          task: () => {
            (a.pushState(y, h), o({ type: "PUSH" }));
          },
          navigateOpts: v,
          type: "PUSH",
          path: y,
          state: h,
        }));
    },
    replace: (y, h, v) => {
      const g = l.state[Sa];
      ((h = ym(g, h)),
        d({
          task: () => {
            (a.replaceState(y, h), o({ type: "REPLACE" }));
          },
          navigateOpts: v,
          type: "REPLACE",
          path: y,
          state: h,
        }));
    },
    go: (y, h) => {
      d({
        task: () => {
          (a.go(y), c({ type: "GO", index: y }));
        },
        navigateOpts: h,
        type: "GO",
      });
    },
    back: (y) => {
      d({
        task: () => {
          (a.back(y?.ignoreBlocker ?? !1), c({ type: "BACK" }));
        },
        navigateOpts: y,
        type: "BACK",
      });
    },
    forward: (y) => {
      d({
        task: () => {
          (a.forward(y?.ignoreBlocker ?? !1), c({ type: "FORWARD" }));
        },
        navigateOpts: y,
        type: "FORWARD",
      });
    },
    canGoBack: () => l.state[Sa] !== 0,
    createHref: (y) => a.createHref(y),
    block: (y) => {
      if (!a.setBlockers) return () => {};
      const h = a.getBlockers?.() ?? [];
      return (
        a.setBlockers([...h, y]),
        () => {
          const v = a.getBlockers?.() ?? [];
          a.setBlockers?.(v.filter((g) => g !== y));
        }
      );
    },
    flush: () => a.flush?.(),
    destroy: () => a.destroy?.(),
    notify: o,
  };
}
function ym(a, l) {
  l || (l = {});
  const r = qc();
  return { ...l, key: r, __TSR_key: r, [Sa]: a };
}
function M1(a) {
  const l = typeof document < "u" ? window : void 0,
    r = l.history.pushState,
    o = l.history.replaceState;
  let c = [];
  const d = () => c,
    y = (et) => (c = et),
    h = (et) => et,
    v = () => Du(`${l.location.pathname}${l.location.search}${l.location.hash}`, l.history.state);
  if (!l.history.state?.__TSR_key && !l.history.state?.key) {
    const et = qc();
    l.history.replaceState({ [Sa]: 0, key: et, __TSR_key: et }, "");
  }
  let g = v(),
    _,
    S = !1,
    A = !1,
    x = !1,
    M = !1;
  const D = () => g;
  let C, B;
  const q = () => {
      C &&
        ((F._ignoreSubscribers = !0),
        (C.isPush ? l.history.pushState : l.history.replaceState)(C.state, "", C.href),
        (F._ignoreSubscribers = !1),
        (C = void 0),
        (B = void 0),
        (_ = void 0));
    },
    Q = (et, it, ht) => {
      const ot = h(it);
      (B || (_ = g),
        (g = Du(it, ht)),
        (C = { href: ot, state: ht, isPush: C?.isPush || et === "push" }),
        B || (B = Promise.resolve().then(() => q())));
    },
    V = (et) => {
      ((g = v()), F.notify({ type: et }));
    },
    $ = async () => {
      if (A) {
        A = !1;
        return;
      }
      const et = v(),
        it = et.state[Sa] - g.state[Sa],
        ht = it === 1,
        ot = it === -1,
        St = (!ht && !ot) || S;
      S = !1;
      const _t = St ? "GO" : ot ? "BACK" : "FORWARD",
        Pt = St ? { type: "GO", index: it } : { type: ot ? "BACK" : "FORWARD" };
      if (x) x = !1;
      else {
        const Nt = d();
        if (typeof document < "u" && Nt.length) {
          for (const Z of Nt)
            if (await Z.blockerFn({ currentLocation: g, nextLocation: et, action: _t })) {
              ((A = !0), l.history.go(1), F.notify(Pt));
              return;
            }
        }
      }
      ((g = v()), F.notify(Pt));
    },
    nt = (et) => {
      if (M) {
        M = !1;
        return;
      }
      let it = !1;
      const ht = d();
      if (typeof document < "u" && ht.length)
        for (const ot of ht) {
          const St = ot.enableBeforeUnload ?? !0;
          if (St === !0) {
            it = !0;
            break;
          }
          if (typeof St == "function" && St() === !0) {
            it = !0;
            break;
          }
        }
      if (it) return (et.preventDefault(), (et.returnValue = ""));
    },
    F = T1({
      getLocation: D,
      getLength: () => l.history.length,
      pushState: (et, it) => Q("push", et, it),
      replaceState: (et, it) => Q("replace", et, it),
      back: (et) => (et && (x = !0), (M = !0), l.history.back()),
      forward: (et) => {
        (et && (x = !0), (M = !0), l.history.forward());
      },
      go: (et) => {
        ((S = !0), l.history.go(et));
      },
      createHref: (et) => h(et),
      flush: q,
      destroy: () => {
        ((l.history.pushState = r),
          (l.history.replaceState = o),
          l.removeEventListener(mm, nt, { capture: !0 }),
          l.removeEventListener(pm, $));
      },
      onBlocked: () => {
        _ && g !== _ && (g = _);
      },
      getBlockers: d,
      setBlockers: y,
      notifyOnIndexChange: !1,
    });
  return (
    l.addEventListener(mm, nt, { capture: !0 }),
    l.addEventListener(pm, $),
    (l.history.pushState = function (...et) {
      const it = r.apply(l.history, et);
      return (F._ignoreSubscribers || V("PUSH"), it);
    }),
    (l.history.replaceState = function (...et) {
      const it = o.apply(l.history, et);
      return (F._ignoreSubscribers || V("REPLACE"), it);
    }),
    F
  );
}
function C1(a) {
  let l = a.replace(/[\x00-\x1f\x7f]/g, "");
  return (l.startsWith("//") && (l = "/" + l.replace(/^\/+/, "")), l);
}
function Du(a, l) {
  const r = C1(a),
    o = r.indexOf("#"),
    c = r.indexOf("?"),
    d = qc();
  return {
    href: r,
    pathname: r.substring(0, o > 0 ? (c > 0 ? Math.min(o, c) : o) : c > 0 ? c : r.length),
    hash: o > -1 ? r.substring(o) : "",
    search: c > -1 ? r.slice(c, o === -1 ? void 0 : o) : "",
    state: l || { [Sa]: 0, key: d, __TSR_key: d },
  };
}
function qc() {
  return (Math.random() + 1).toString(36).substring(7);
}
function O1(a) {
  return a instanceof Error ? { name: a.name, message: a.message } : { data: a };
}
function Zi(a, l) {
  const r = l,
    o = a;
  return {
    fromLocation: r,
    toLocation: o,
    pathChanged: r?.pathname !== o.pathname,
    hrefChanged: r?.href !== o.href,
    hashChanged: r?.hash !== o.hash,
  };
}
var z1 = class {
    constructor(a, l) {
      ((this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`),
        (this.resetNextScroll = !0),
        (this.shouldViewTransition = void 0),
        (this.isViewTransitionTypesSupported = void 0),
        (this.subscribers = new Set()),
        (this.isScrollRestoring = !1),
        (this.isScrollRestorationSetup = !1),
        (this.startTransition = (r) => r()),
        (this.update = (r) => {
          const o = this.options,
            c = this.basepath ?? o?.basepath ?? "/",
            d = this.basepath === void 0,
            y = o?.rewrite;
          if (
            ((this.options = { ...o, ...r }),
            (this.isServer = this.options.isServer ?? typeof document > "u"),
            (this.protocolAllowlist = new Set(this.options.protocolAllowlist)),
            this.options.pathParamsAllowedCharacters &&
              (this.pathParamsDecoder = l1(this.options.pathParamsAllowedCharacters)),
            (!this.history || (this.options.history && this.options.history !== this.history)) &&
              (this.options.history
                ? (this.history = this.options.history)
                : (this.history = M1())),
            (this.origin = this.options.origin),
            this.origin ||
              (window?.origin && window.origin !== "null"
                ? (this.origin = window.origin)
                : (this.origin = "http://localhost")),
            this.history && this.updateLatestLocation(),
            this.options.routeTree !== this.routeTree)
          ) {
            this.routeTree = this.options.routeTree;
            let _;
            ((this.resolvePathCache = tr(1e3)), (_ = this.buildRouteTree()), this.setRoutes(_));
          }
          if (!this.stores && this.latestLocation) {
            const _ = this.getStoreConfig(this);
            ((this.batch = _.batch), (this.stores = b1(U1(this.latestLocation), _)), f1(this));
          }
          let h = !1;
          const v = this.options.basepath ?? "/",
            g = this.options.rewrite;
          if (d || c !== v || y !== g) {
            this.basepath = v;
            const _ = [],
              S = ey(v);
            (S && S !== "/" && _.push(S1({ basepath: v })),
              g && _.push(g),
              (this.rewrite = _.length === 0 ? void 0 : _.length === 1 ? _[0] : v1(_)),
              this.history && this.updateLatestLocation(),
              (h = !0));
          }
          (h && this.stores && this.stores.location.set(this.latestLocation),
            typeof window < "u" &&
              "CSS" in window &&
              typeof window.CSS?.supports == "function" &&
              (this.isViewTransitionTypesSupported = window.CSS.supports(
                "selector(:active-view-transition-type(a)",
              )));
        }),
        (this.updateLatestLocation = () => {
          this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
        }),
        (this.buildRouteTree = () => {
          const r = Wv(this.routeTree, this.options.caseSensitive, (o, c) => {
            o.init({ originalIndex: c });
          });
          return (this.options.routeMasks && Fv(this.options.routeMasks, r.processedTree), r);
        }),
        (this.subscribe = (r, o) => {
          const c = { eventType: r, fn: o };
          return (
            this.subscribers.add(c),
            () => {
              this.subscribers.delete(c);
            }
          );
        }),
        (this.emit = (r) => {
          this.subscribers.forEach((o) => {
            o.eventType === r.type && o.fn(r);
          });
        }),
        (this.parseLocation = (r, o) => {
          const c = ({ pathname: v, search: g, hash: _, href: S, state: A }) => {
              if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(v)) {
                const B = this.options.parseSearch(g),
                  q = this.options.stringifySearch(B);
                return {
                  href: v + q + _,
                  publicHref: v + q + _,
                  pathname: Vl(v).path,
                  external: !1,
                  searchStr: q,
                  search: Ia(o?.search, B),
                  hash: Vl(_.slice(1)).path,
                  state: Fa(o?.state, A),
                };
              }
              const x = new URL(S, this.origin),
                M = Cc(this.rewrite, x),
                D = this.options.parseSearch(M.search),
                C = this.options.stringifySearch(D);
              return (
                (M.search = C),
                {
                  href: M.href.replace(M.origin, ""),
                  publicHref: S,
                  pathname: Vl(M.pathname).path,
                  external: !!this.rewrite && M.origin !== this.origin,
                  searchStr: C,
                  search: Ia(o?.search, D),
                  hash: Vl(M.hash.slice(1)).path,
                  state: Fa(o?.state, A),
                }
              );
            },
            d = c(r),
            { __tempLocation: y, __tempKey: h } = d.state;
          if (y && (!h || h === this.tempLocationKey)) {
            const v = c(y);
            return (
              (v.state.key = d.state.key),
              (v.state.__TSR_key = d.state.__TSR_key),
              delete v.state.__tempLocation,
              { ...v, maskedLocation: d }
            );
          }
          return d;
        }),
        (this.resolvePathWithBase = (r, o) =>
          i1({
            base: r,
            to: Hc(o),
            trailingSlash: this.options.trailingSlash,
            cache: this.resolvePathCache,
          })),
        (this.matchRoutes = (r, o, c) =>
          typeof r == "string"
            ? this.matchRoutesInternal({ pathname: r, search: o }, c)
            : this.matchRoutesInternal(r, o)),
        (this.getMatchedRoutes = (r) =>
          D1({ pathname: r, routesById: this.routesById, processedTree: this.processedTree })),
        (this.cancelMatch = (r) => {
          const o = this.getMatch(r);
          o &&
            (o.abortController.abort(),
            clearTimeout(o._nonReactive.pendingTimeout),
            (o._nonReactive.pendingTimeout = void 0));
        }),
        (this.cancelMatches = () => {
          (this.stores.pendingIds.get().forEach((r) => {
            this.cancelMatch(r);
          }),
            this.stores.matchesId.get().forEach((r) => {
              if (this.stores.pendingMatchStores.has(r)) return;
              const o = this.stores.matchStores.get(r)?.get();
              o && (o.status === "pending" || o.isFetching === "loader") && this.cancelMatch(r);
            }));
        }),
        (this.buildLocation = (r) => {
          const o = (d = {}) => {
              const y = d._fromLocation || this.pendingBuiltLocation || this.latestLocation,
                h = this.matchRoutesLightweight(y);
              d.from;
              const v = d.unsafeRelative === "path" ? y.pathname : (d.from ?? h.fullPath),
                g = this.resolvePathWithBase(v, "."),
                _ = h.search,
                S = Object.assign(Object.create(null), h.params),
                A = d.to
                  ? this.resolvePathWithBase(g, `${d.to}`)
                  : this.resolvePathWithBase(g, "."),
                x =
                  d.params === !1 || d.params === null
                    ? Object.create(null)
                    : (d.params ?? !0) === !0
                      ? S
                      : Object.assign(S, ya(d.params, S)),
                M = this.getMatchedRoutes(A);
              let D = M.matchedRoutes;
              if (
                ((!M.foundRoute || (M.foundRoute.path !== "/" && M.routeParams["**"])) &&
                  this.options.notFoundRoute &&
                  (D = [...D, this.options.notFoundRoute]),
                Object.keys(x).length > 0)
              )
                for (const ht of D) {
                  const ot = ht.options.params?.stringify ?? ht.options.stringifyParams;
                  if (ot)
                    try {
                      Object.assign(x, ot(x));
                    } catch {}
                }
              const C = r.leaveParams
                ? A
                : Vl(
                    lm({
                      path: A,
                      params: x,
                      decoder: this.pathParamsDecoder,
                      server: this.isServer,
                    }).interpolatedPath,
                  ).path;
              let B = _;
              if (r._includeValidateSearch && this.options.search?.strict) {
                const ht = {};
                (D.forEach((ot) => {
                  if (ot.options.validateSearch)
                    try {
                      Object.assign(ht, Cu(ot.options.validateSearch, { ...ht, ...B }));
                    } catch {}
                }),
                  (B = ht));
              }
              ((B = L1({
                search: B,
                dest: d,
                destRoutes: D,
                _includeValidateSearch: r._includeValidateSearch,
              })),
                (B = Ia(_, B)));
              const q = this.options.stringifySearch(B),
                Q = d.hash === !0 ? y.hash : d.hash ? ya(d.hash, y.hash) : void 0,
                V = Q ? `#${Q}` : "";
              let $ = d.state === !0 ? y.state : d.state ? ya(d.state, y.state) : {};
              $ = Fa(y.state, $);
              const nt = `${C}${q}${V}`;
              let F,
                et,
                it = !1;
              if (this.rewrite) {
                const ht = new URL(nt, this.origin),
                  ot = iy(this.rewrite, ht);
                ((F = ht.href.replace(ht.origin, "")),
                  ot.origin !== this.origin
                    ? ((et = ot.href), (it = !0))
                    : (et = ot.pathname + ot.search + ot.hash));
              } else ((F = Zv(nt)), (et = F));
              return {
                publicHref: et,
                href: F,
                pathname: C,
                search: B,
                searchStr: q,
                state: $,
                hash: Q ?? "",
                external: it,
                unmaskOnReload: d.unmaskOnReload,
              };
            },
            c = (d = {}, y) => {
              const h = o(d);
              let v = y ? o(y) : void 0;
              if (!v) {
                const g = Object.create(null);
                if (this.options.routeMasks) {
                  const _ = Pv(h.pathname, this.processedTree);
                  if (_) {
                    Object.assign(g, _.rawParams);
                    const { from: S, params: A, ...x } = _.route,
                      M =
                        A === !1 || A === null
                          ? Object.create(null)
                          : (A ?? !0) === !0
                            ? g
                            : Object.assign(g, ya(A, g));
                    ((y = { from: r.from, ...x, params: M }), (v = o(y)));
                  }
                }
              }
              return (v && (h.maskedLocation = v), h);
            };
          return r.mask ? c(r, { from: r.from, ...r.mask }) : c(r);
        }),
        (this.commitLocation = async ({ viewTransition: r, ignoreBlocker: o, ...c }) => {
          const d = () => {
              const v = ["key", "__TSR_key", "__TSR_index", "__hashScrollIntoViewOptions"];
              v.forEach((_) => {
                c.state[_] = this.latestLocation.state[_];
              });
              const g = Ne(c.state, this.latestLocation.state);
              return (
                v.forEach((_) => {
                  delete c.state[_];
                }),
                g
              );
            },
            y = va(this.latestLocation.href) === va(c.href);
          let h = this.commitLocationPromise;
          if (
            ((this.commitLocationPromise = ti(() => {
              (h?.resolve(), (h = void 0));
            })),
            y && d())
          )
            this.load();
          else {
            let { maskedLocation: v, hashScrollIntoView: g, ..._ } = c;
            (v &&
              ((_ = {
                ...v,
                state: {
                  ...v.state,
                  __tempKey: void 0,
                  __tempLocation: {
                    ..._,
                    search: _.searchStr,
                    state: {
                      ..._.state,
                      __tempKey: void 0,
                      __tempLocation: void 0,
                      __TSR_key: void 0,
                      key: void 0,
                    },
                  },
                },
              }),
              (_.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) &&
                (_.state.__tempKey = this.tempLocationKey)),
              (_.state.__hashScrollIntoViewOptions =
                g ?? this.options.defaultHashScrollIntoView ?? !0),
              (this.shouldViewTransition = r),
              this.history[c.replace ? "replace" : "push"](_.publicHref, _.state, {
                ignoreBlocker: o,
              }));
          }
          return (
            (this.resetNextScroll = c.resetScroll ?? !0),
            this.history.subscribers.size || this.load(),
            this.commitLocationPromise
          );
        }),
        (this.buildAndCommitLocation = ({
          replace: r,
          resetScroll: o,
          hashScrollIntoView: c,
          viewTransition: d,
          ignoreBlocker: y,
          href: h,
          ...v
        } = {}) => {
          if (h) {
            const S = this.history.location.state.__TSR_index,
              A = Du(h, { __TSR_index: r ? S : S + 1 }),
              x = new URL(A.pathname, this.origin);
            ((v.to = Cc(this.rewrite, x).pathname),
              (v.search = this.options.parseSearch(A.search)),
              (v.hash = A.hash.slice(1)));
          }
          const g = this.buildLocation({ ...v, _includeValidateSearch: !0 });
          this.pendingBuiltLocation = g;
          const _ = this.commitLocation({
            ...g,
            viewTransition: d,
            replace: r,
            resetScroll: o,
            hashScrollIntoView: c,
            ignoreBlocker: y,
          });
          return (
            Promise.resolve().then(() => {
              this.pendingBuiltLocation === g && (this.pendingBuiltLocation = void 0);
            }),
            _
          );
        }),
        (this.navigate = async ({ to: r, reloadDocument: o, href: c, publicHref: d, ...y }) => {
          let h = !1;
          if (c)
            try {
              (new URL(`${c}`), (h = !0));
            } catch {}
          if ((h && !o && (o = !0), o)) {
            if (r !== void 0 || !c) {
              const g = this.buildLocation({ to: r, ...y });
              ((c = c ?? g.publicHref), (d = d ?? g.publicHref));
            }
            const v = !h && d ? d : c;
            if (Bu(v, this.protocolAllowlist)) return Promise.resolve();
            if (!y.ignoreBlocker) {
              const g = this.history.getBlockers?.() ?? [];
              for (const _ of g)
                if (
                  _?.blockerFn &&
                  (await _.blockerFn({
                    currentLocation: this.latestLocation,
                    nextLocation: this.latestLocation,
                    action: "PUSH",
                  }))
                )
                  return Promise.resolve();
            }
            return (
              y.replace ? window.location.replace(v) : (window.location.href = v),
              Promise.resolve()
            );
          }
          return this.buildAndCommitLocation({ ...y, href: c, to: r, _isNavigate: !0 });
        }),
        (this.beforeLoad = () => {
          (this.cancelMatches(), this.updateLatestLocation());
          const r = this.matchRoutes(this.latestLocation),
            o = this.stores.cachedMatches.get().filter((c) => !r.some((d) => d.id === c.id));
          this.batch(() => {
            (this.stores.status.set("pending"),
              this.stores.statusCode.set(200),
              this.stores.isLoading.set(!0),
              this.stores.location.set(this.latestLocation),
              this.stores.setPending(r),
              this.stores.setCached(o));
          });
        }),
        (this.load = async (r) => {
          let o, c, d;
          const y = this.stores.resolvedLocation.get() ?? this.stores.location.get();
          for (
            d = new Promise((v) => {
              this.startTransition(async () => {
                try {
                  this.beforeLoad();
                  const g = this.latestLocation,
                    _ = Zi(g, this.stores.resolvedLocation.get());
                  (this.stores.redirect.get() || this.emit({ type: "onBeforeNavigate", ..._ }),
                    this.emit({ type: "onBeforeLoad", ..._ }),
                    await dm({
                      router: this,
                      sync: r?.sync,
                      forceStaleReload: y.href === g.href,
                      matches: this.stores.pendingMatches.get(),
                      location: g,
                      updateMatch: this.updateMatch,
                      onReady: async () => {
                        this.startTransition(() => {
                          this.startViewTransition(async () => {
                            let S = null,
                              A = null,
                              x = null,
                              M = null;
                            this.batch(() => {
                              const D = this.stores.pendingMatches.get(),
                                C = D.length,
                                B = this.stores.matches.get();
                              S = C
                                ? B.filter((V) => !this.stores.pendingMatchStores.has(V.id))
                                : null;
                              const q = new Set();
                              for (const V of this.stores.pendingMatchStores.values())
                                V.routeId && q.add(V.routeId);
                              const Q = new Set();
                              for (const V of this.stores.matchStores.values())
                                V.routeId && Q.add(V.routeId);
                              ((A = C ? B.filter((V) => !q.has(V.routeId)) : null),
                                (x = C ? D.filter((V) => !Q.has(V.routeId)) : null),
                                (M = C ? D.filter((V) => Q.has(V.routeId)) : B),
                                this.stores.isLoading.set(!1),
                                this.stores.loadedAt.set(Date.now()),
                                C &&
                                  (this.stores.setMatches(D),
                                  this.stores.setPending([]),
                                  this.stores.setCached([
                                    ...this.stores.cachedMatches.get(),
                                    ...S.filter(
                                      (V) =>
                                        V.status !== "error" &&
                                        V.status !== "notFound" &&
                                        V.status !== "redirected",
                                    ),
                                  ]),
                                  this.clearExpiredCache()));
                            });
                            for (const [D, C] of [
                              [A, "onLeave"],
                              [x, "onEnter"],
                              [M, "onStay"],
                            ])
                              if (D)
                                for (const B of D) this.looseRoutesById[B.routeId].options[C]?.(B);
                          });
                        });
                      },
                    }));
                } catch (g) {
                  je(g)
                    ? ((o = g), this.navigate({ ...o.options, replace: !0, ignoreBlocker: !0 }))
                    : ge(g) && (c = g);
                  const _ = o
                    ? o.status
                    : c
                      ? 404
                      : this.stores.matches.get().some((S) => S.status === "error")
                        ? 500
                        : 200;
                  this.batch(() => {
                    (this.stores.statusCode.set(_), this.stores.redirect.set(o));
                  });
                }
                (this.latestLoadPromise === d &&
                  (this.commitLocationPromise?.resolve(),
                  (this.latestLoadPromise = void 0),
                  (this.commitLocationPromise = void 0)),
                  v());
              });
            }),
              this.latestLoadPromise = d,
              await d;
            this.latestLoadPromise && d !== this.latestLoadPromise;
          )
            await this.latestLoadPromise;
          let h;
          (this.hasNotFoundMatch()
            ? (h = 404)
            : this.stores.matches.get().some((v) => v.status === "error") && (h = 500),
            h !== void 0 && this.stores.statusCode.set(h));
        }),
        (this.startViewTransition = (r) => {
          const o = this.shouldViewTransition ?? this.options.defaultViewTransition;
          if (
            ((this.shouldViewTransition = void 0),
            o &&
              typeof document < "u" &&
              "startViewTransition" in document &&
              typeof document.startViewTransition == "function")
          ) {
            let c;
            if (typeof o == "object" && this.isViewTransitionTypesSupported) {
              const d = this.latestLocation,
                y = this.stores.resolvedLocation.get(),
                h = typeof o.types == "function" ? o.types(Zi(d, y)) : o.types;
              if (h === !1) {
                r();
                return;
              }
              c = { update: r, types: h };
            } else c = r;
            document.startViewTransition(c);
          } else r();
        }),
        (this.updateMatch = (r, o) => {
          this.startTransition(() => {
            const c = this.stores.pendingMatchStores.get(r);
            if (c) {
              c.set(o);
              return;
            }
            const d = this.stores.matchStores.get(r);
            if (d) {
              d.set(o);
              return;
            }
            const y = this.stores.cachedMatchStores.get(r);
            if (y) {
              const h = o(y.get());
              h.status === "redirected"
                ? this.stores.cachedMatchStores.delete(r) &&
                  this.stores.cachedIds.set((v) => v.filter((g) => g !== r))
                : y.set(h);
            }
          });
        }),
        (this.getMatch = (r) =>
          this.stores.cachedMatchStores.get(r)?.get() ??
          this.stores.pendingMatchStores.get(r)?.get() ??
          this.stores.matchStores.get(r)?.get()),
        (this.invalidate = (r) => {
          const o = (c) =>
            (r?.filter?.(c) ?? !0)
              ? {
                  ...c,
                  invalid: !0,
                  ...(r?.forcePending || c.status === "error" || c.status === "notFound"
                    ? { status: "pending", error: void 0 }
                    : void 0),
                }
              : c;
          return (
            this.batch(() => {
              (this.stores.setMatches(this.stores.matches.get().map(o)),
                this.stores.setCached(this.stores.cachedMatches.get().map(o)),
                this.stores.setPending(this.stores.pendingMatches.get().map(o)));
            }),
            (this.shouldViewTransition = !1),
            this.load({ sync: r?.sync })
          );
        }),
        (this.getParsedLocationHref = (r) => r.publicHref || "/"),
        (this.resolveRedirect = (r) => {
          const o = r.headers.get("Location");
          if (!r.options.href || r.options._builtLocation) {
            const c = r.options._builtLocation ?? this.buildLocation(r.options),
              d = this.getParsedLocationHref(c);
            ((r.options.href = d), r.headers.set("Location", d));
          } else if (o)
            try {
              const c = new URL(o);
              if (this.origin && c.origin === this.origin) {
                const d = c.pathname + c.search + c.hash;
                ((r.options.href = d), r.headers.set("Location", d));
              }
            } catch {}
          if (
            r.options.href &&
            !r.options._builtLocation &&
            Bu(r.options.href, this.protocolAllowlist)
          )
            throw new Error("Redirect blocked: unsafe protocol");
          return (r.headers.get("Location") || r.headers.set("Location", r.options.href), r);
        }),
        (this.clearCache = (r) => {
          const o = r?.filter;
          o !== void 0
            ? this.stores.setCached(this.stores.cachedMatches.get().filter((c) => !o(c)))
            : this.stores.setCached([]);
        }),
        (this.clearExpiredCache = () => {
          const r = Date.now(),
            o = (c) => {
              const d = this.looseRoutesById[c.routeId];
              if (!d.options.loader) return !0;
              const y =
                (c.preload
                  ? (d.options.preloadGcTime ?? this.options.defaultPreloadGcTime)
                  : (d.options.gcTime ?? this.options.defaultGcTime)) ?? 300 * 1e3;
              return c.status === "error" ? !0 : r - c.updatedAt >= y;
            };
          this.clearCache({ filter: o });
        }),
        (this.loadRouteChunk = er),
        (this.preloadRoute = async (r) => {
          const o = r._builtLocation ?? this.buildLocation(r);
          let c = this.matchRoutes(o, { throwOnError: !0, preload: !0, dest: r });
          const d = new Set([...this.stores.matchesId.get(), ...this.stores.pendingIds.get()]),
            y = new Set([...d, ...this.stores.cachedIds.get()]),
            h = c.filter((v) => !y.has(v.id));
          if (h.length) {
            const v = this.stores.cachedMatches.get();
            this.stores.setCached([...v, ...h]);
          }
          try {
            return (
              (c = await dm({
                router: this,
                matches: c,
                location: o,
                preload: !0,
                updateMatch: (v, g) => {
                  d.has(v) ? (c = c.map((_) => (_.id === v ? g(_) : _))) : this.updateMatch(v, g);
                },
              })),
              c
            );
          } catch (v) {
            if (je(v))
              return v.options.reloadDocument
                ? void 0
                : await this.preloadRoute({ ...v.options, _fromLocation: o });
            ge(v) || console.error(v);
            return;
          }
        }),
        (this.matchRoute = (r, o) => {
          const c = {
              ...r,
              to: r.to ? this.resolvePathWithBase(r.from || "", r.to) : void 0,
              params: r.params || {},
              leaveParams: !0,
            },
            d = this.buildLocation(c);
          if (o?.pending && this.stores.status.get() !== "pending") return !1;
          const y = (o?.pending === void 0 ? !this.stores.isLoading.get() : o.pending)
              ? this.latestLocation
              : this.stores.resolvedLocation.get() || this.stores.location.get(),
            h = Jv(
              d.pathname,
              o?.caseSensitive ?? !1,
              o?.fuzzy ?? !1,
              y.pathname,
              this.processedTree,
            );
          return !h || (r.params && !Ne(h.rawParams, r.params, { partial: !0 }))
            ? !1
            : (o?.includeSearch ?? !0)
              ? Ne(y.search, d.search, { partial: !0 })
                ? h.rawParams
                : !1
              : h.rawParams;
        }),
        (this.hasNotFoundMatch = () =>
          this.stores.matches.get().some((r) => r.status === "notFound" || r.globalNotFound)),
        (this.getStoreConfig = l),
        this.update({
          defaultPreloadDelay: 50,
          defaultPendingMs: 1e3,
          defaultPendingMinMs: 500,
          context: void 0,
          ...a,
          caseSensitive: a.caseSensitive ?? !1,
          notFoundMode: a.notFoundMode ?? "fuzzy",
          stringifySearch: a.stringifySearch ?? p1,
          parseSearch: a.parseSearch ?? h1,
          protocolAllowlist: a.protocolAllowlist ?? Gv,
        }),
        typeof document < "u" && (self.__TSR_ROUTER__ = this));
    }
    isShell() {
      return !!this.options.isShell;
    }
    isPrerendering() {
      return !!this.options.isPrerendering;
    }
    get state() {
      return this.stores.__store.get();
    }
    setRoutes({ routesById: a, routesByPath: l, processedTree: r }) {
      ((this.routesById = a), (this.routesByPath = l), (this.processedTree = r));
      const o = this.options.notFoundRoute;
      o && (o.init({ originalIndex: 99999999999 }), (this.routesById[o.id] = o));
    }
    get looseRoutesById() {
      return this.routesById;
    }
    getParentContext(a) {
      return a?.id
        ? (a.context ?? this.options.context ?? void 0)
        : (this.options.context ?? void 0);
    }
    matchRoutesInternal(a, l) {
      const r = this.getMatchedRoutes(a.pathname),
        { foundRoute: o, routeParams: c, parsedParams: d } = r;
      let { matchedRoutes: y } = r,
        h = !1;
      (o ? o.path !== "/" && c["**"] : va(a.pathname)) &&
        (this.options.notFoundRoute ? (y = [...y, this.options.notFoundRoute]) : (h = !0));
      const v = h ? j1(this.options.notFoundMode, y) : void 0,
        g = new Array(y.length),
        _ = new Map();
      for (const S of this.stores.matchStores.values()) S.routeId && _.set(S.routeId, S.get());
      for (let S = 0; S < y.length; S++) {
        const A = y[S],
          x = g[S - 1];
        let M, D, C;
        {
          const _t = x?.search ?? a.search,
            Pt = x?._strictSearch ?? void 0;
          try {
            const Nt = Cu(A.options.validateSearch, { ..._t }) ?? void 0;
            ((M = { ..._t, ...Nt }), (D = { ...Pt, ...Nt }), (C = void 0));
          } catch (Nt) {
            let Z = Nt;
            if ((Nt instanceof Lu || (Z = new Lu(Nt.message, { cause: Nt })), l?.throwOnError))
              throw Z;
            ((M = _t), (D = {}), (C = Z));
          }
        }
        const B = A.options.loaderDeps?.({ search: M }) ?? "",
          q = B ? JSON.stringify(B) : "",
          { interpolatedPath: Q, usedParams: V } = lm({
            path: A.fullPath,
            params: c,
            decoder: this.pathParamsDecoder,
            server: this.isServer,
          }),
          $ = A.id + Q + q,
          nt = this.getMatch($),
          F = _.get(A.id),
          et = nt?._strictParams ?? V;
        let it;
        if (!nt)
          try {
            gm(A, V, d, et);
          } catch (_t) {
            if (
              (ge(_t) || je(_t) ? (it = _t) : (it = new B1(_t.message, { cause: _t })),
              l?.throwOnError)
            )
              throw it;
          }
        Object.assign(c, et);
        const ht = F ? "stay" : "enter";
        let ot;
        if (nt)
          ot = {
            ...nt,
            cause: ht,
            params: F?.params ?? c,
            _strictParams: et,
            search: Ia(F ? F.search : nt.search, M),
            _strictSearch: D,
          };
        else {
          const _t =
            A.options.loader || A.options.beforeLoad || A.lazyFn || oy(A) ? "pending" : "success";
          ot = {
            id: $,
            ssr: A.options.ssr,
            index: S,
            routeId: A.id,
            params: F?.params ?? c,
            _strictParams: et,
            pathname: Q,
            updatedAt: Date.now(),
            search: F ? Ia(F.search, M) : M,
            _strictSearch: D,
            searchError: void 0,
            status: _t,
            isFetching: !1,
            error: void 0,
            paramsError: it,
            __routeContext: void 0,
            _nonReactive: { loadPromise: ti() },
            __beforeLoadContext: void 0,
            context: {},
            abortController: new AbortController(),
            fetchCount: 0,
            cause: ht,
            loaderDeps: F ? Fa(F.loaderDeps, B) : B,
            invalid: !1,
            preload: !1,
            links: void 0,
            scripts: void 0,
            headScripts: void 0,
            meta: void 0,
            staticData: A.options.staticData || {},
            fullPath: A.fullPath,
          };
        }
        (l?.preload || (ot.globalNotFound = v === A.id), (ot.searchError = C));
        const St = this.getParentContext(x);
        ((ot.context = { ...St, ...ot.__routeContext, ...ot.__beforeLoadContext }), (g[S] = ot));
      }
      for (let S = 0; S < g.length; S++) {
        const A = g[S],
          x = this.looseRoutesById[A.routeId],
          M = this.getMatch(A.id),
          D = _.get(A.routeId);
        if (((A.params = D ? Ia(D.params, c) : c), !M)) {
          const C = g[S - 1],
            B = this.getParentContext(C);
          if (x.options.context) {
            const q = {
              deps: A.loaderDeps,
              params: A.params,
              context: B ?? {},
              location: a,
              navigate: (Q) => this.navigate({ ...Q, _fromLocation: a }),
              buildLocation: this.buildLocation,
              cause: A.cause,
              abortController: A.abortController,
              preload: !!A.preload,
              matches: g,
              routeId: x.id,
            };
            A.__routeContext = x.options.context(q) ?? void 0;
          }
          A.context = { ...B, ...A.__routeContext, ...A.__beforeLoadContext };
        }
      }
      return g;
    }
    matchRoutesLightweight(a) {
      const {
          matchedRoutes: l,
          routeParams: r,
          parsedParams: o,
        } = this.getMatchedRoutes(a.pathname),
        c = $l(l),
        d = { ...a.search };
      for (const _ of l)
        try {
          Object.assign(d, Cu(_.options.validateSearch, d));
        } catch {}
      const y = $l(this.stores.matchesId.get()),
        h = y && this.stores.matchStores.get(y)?.get(),
        v = h && h.routeId === c.id && h.pathname === a.pathname;
      let g;
      if (v) g = h.params;
      else {
        const _ = Object.assign(Object.create(null), r);
        for (const S of l)
          try {
            gm(S, r, o ?? {}, _);
          } catch {}
        g = _;
      }
      return { matchedRoutes: l, fullPath: c.fullPath, search: d, params: g };
    }
  },
  Lu = class extends Error {},
  B1 = class extends Error {};
function U1(a) {
  return {
    loadedAt: 0,
    isLoading: !1,
    isTransitioning: !1,
    status: "idle",
    resolvedLocation: void 0,
    location: a,
    matches: [],
    statusCode: 200,
  };
}
function Cu(a, l) {
  if (a == null) return {};
  if ("~standard" in a) {
    const r = a["~standard"].validate(l);
    if (r instanceof Promise) throw new Lu("Async validation not supported");
    if (r.issues) throw new Lu(JSON.stringify(r.issues, void 0, 2), { cause: r });
    return r.value;
  }
  return "parse" in a ? a.parse(l) : typeof a == "function" ? a(l) : {};
}
function D1({ pathname: a, routesById: l, processedTree: r }) {
  const o = Object.create(null),
    c = va(a);
  let d, y;
  const h = kv(c, r, !0);
  return (
    h &&
      ((d = h.route),
      Object.assign(o, h.rawParams),
      (y = Object.assign(Object.create(null), h.parsedParams))),
    { matchedRoutes: h?.branch || [l.__root__], routeParams: o, foundRoute: d, parsedParams: y }
  );
}
function L1({ search: a, dest: l, destRoutes: r, _includeValidateSearch: o }) {
  return N1(r)(a, l, o ?? !1);
}
function N1(a) {
  const l = { dest: null, _includeValidateSearch: !1, middlewares: [] };
  for (const c of a) {
    if ("search" in c.options)
      c.options.search?.middlewares && l.middlewares.push(...c.options.search.middlewares);
    else if (c.options.preSearchFilters || c.options.postSearchFilters) {
      const d = ({ search: y, next: h }) => {
        let v = y;
        "preSearchFilters" in c.options &&
          c.options.preSearchFilters &&
          (v = c.options.preSearchFilters.reduce((_, S) => S(_), y));
        const g = h(v);
        return "postSearchFilters" in c.options && c.options.postSearchFilters
          ? c.options.postSearchFilters.reduce((_, S) => S(_), g)
          : g;
      };
      l.middlewares.push(d);
    }
    if (c.options.validateSearch) {
      const d = ({ search: y, next: h }) => {
        const v = h(y);
        if (!l._includeValidateSearch) return v;
        try {
          return { ...v, ...(Cu(c.options.validateSearch, v) ?? void 0) };
        } catch {
          return v;
        }
      };
      l.middlewares.push(d);
    }
  }
  const r = ({ search: c }) => {
    const d = l.dest;
    return d.search ? (d.search === !0 ? c : ya(d.search, c)) : {};
  };
  l.middlewares.push(r);
  const o = (c, d, y) => {
    if (c >= y.length) return d;
    const h = y[c];
    return h({ search: d, next: (g) => o(c + 1, g, y) });
  };
  return function (d, y, h) {
    return ((l.dest = y), (l._includeValidateSearch = h), o(0, d, l.middlewares));
  };
}
function j1(a, l) {
  if (a !== "root")
    for (let r = l.length - 1; r >= 0; r--) {
      const o = l[r];
      if (o.children) return o.id;
    }
  return $a;
}
function gm(a, l, r, o) {
  const c = a.options.params?.parse ?? a.options.parseParams;
  if (c)
    if (a.options.skipRouteOnParseError) for (const d in l) d in r && (o[d] = r[d]);
    else {
      const d = c(o);
      Object.assign(o, d);
    }
}
var gn = Symbol.for("TSR_DEFERRED_PROMISE");
function H1(a, l) {
  const r = a;
  return (
    r[gn] ||
      ((r[gn] = { status: "pending" }),
      r
        .then((o) => {
          ((r[gn].status = "success"), (r[gn].data = o));
        })
        .catch((o) => {
          ((r[gn].status = "error"), (r[gn].error = { data: O1(o), __isServerError: !0 }));
        })),
    r
  );
}
var q1 = "Error preloading route! ☝️";
function vm(a, l) {
  if (a) return typeof a == "string" ? a : a[l];
}
function Y1(a) {
  return typeof a == "string" ? { href: a, crossOrigin: void 0 } : a;
}
var sy = class {
    get to() {
      return this._to;
    }
    get id() {
      return this._id;
    }
    get path() {
      return this._path;
    }
    get fullPath() {
      return this._fullPath;
    }
    constructor(a) {
      if (
        ((this.init = (l) => {
          this.originalIndex = l.originalIndex;
          const r = this.options,
            o = !r?.path && !r?.id;
          ((this.parentRoute = this.options.getParentRoute?.()),
            o ? (this._path = $a) : this.parentRoute || He());
          let c = o ? $a : r?.path;
          c && c !== "/" && (c = ty(c));
          const d = r?.id || c;
          let y = o ? $a : Tu([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, d]);
          (c === "__root__" && (c = "/"), y !== "__root__" && (y = Tu(["/", y])));
          const h = y === "__root__" ? "/" : Tu([this.parentRoute.fullPath, c]);
          ((this._path = c), (this._id = y), (this._fullPath = h), (this._to = va(h)));
        }),
        (this.addChildren = (l) => this._addFileChildren(l)),
        (this._addFileChildren = (l) => (
          Array.isArray(l) && (this.children = l),
          typeof l == "object" && l !== null && (this.children = Object.values(l)),
          this
        )),
        (this._addFileTypes = () => this),
        (this.updateLoader = (l) => (Object.assign(this.options, l), this)),
        (this.update = (l) => (Object.assign(this.options, l), this)),
        (this.lazy = (l) => ((this.lazyFn = l), this)),
        (this.redirect = (l) => ay({ from: this.fullPath, ...l })),
        (this.options = a || {}),
        (this.isRoot = !a?.getParentRoute),
        a?.id && a?.path)
      )
        throw new Error("Route cannot have both an 'id' and a 'path' option.");
    }
  },
  G1 = class extends sy {
    constructor(a) {
      super(a);
    }
  };
function V1(a) {
  if (typeof document < "u" && document.querySelector) {
    const l = a.stores.location.get(),
      r = l.state.__hashScrollIntoViewOptions ?? !0;
    if (r && l.hash !== "") {
      const o = document.getElementById(l.hash);
      o && o.scrollIntoView(r);
    }
  }
}
var X1 = ((a) => (
    (a[(a.AggregateError = 1)] = "AggregateError"),
    (a[(a.ArrowFunction = 2)] = "ArrowFunction"),
    (a[(a.ErrorPrototypeStack = 4)] = "ErrorPrototypeStack"),
    (a[(a.ObjectAssign = 8)] = "ObjectAssign"),
    (a[(a.BigIntTypedArray = 16)] = "BigIntTypedArray"),
    (a[(a.RegExp = 32)] = "RegExp"),
    a
  ))(X1 || {}),
  Hn = Symbol.asyncIterator,
  cy = Symbol.hasInstance,
  Ki = Symbol.isConcatSpreadable,
  qn = Symbol.iterator,
  fy = Symbol.match,
  dy = Symbol.matchAll,
  hy = Symbol.replace,
  py = Symbol.search,
  my = Symbol.species,
  yy = Symbol.split,
  gy = Symbol.toPrimitive,
  Ii = Symbol.toStringTag,
  vy = Symbol.unscopables,
  Sy = {
    [Hn]: 0,
    [cy]: 1,
    [Ki]: 2,
    [qn]: 3,
    [fy]: 4,
    [dy]: 5,
    [hy]: 6,
    [py]: 7,
    [my]: 8,
    [yy]: 9,
    [gy]: 10,
    [Ii]: 11,
    [vy]: 12,
  },
  Q1 = {
    0: Hn,
    1: cy,
    2: Ki,
    3: qn,
    4: fy,
    5: dy,
    6: hy,
    7: py,
    8: my,
    9: yy,
    10: gy,
    11: Ii,
    12: vy,
  },
  w = void 0,
  Z1 = {
    2: !0,
    3: !1,
    1: w,
    0: null,
    4: -0,
    5: Number.POSITIVE_INFINITY,
    6: Number.NEGATIVE_INFINITY,
    7: Number.NaN,
  },
  K1 = {
    0: "Error",
    1: "EvalError",
    2: "RangeError",
    3: "ReferenceError",
    4: "SyntaxError",
    5: "TypeError",
    6: "URIError",
  },
  I1 = {
    0: Error,
    1: EvalError,
    2: RangeError,
    3: ReferenceError,
    4: SyntaxError,
    5: TypeError,
    6: URIError,
  };
function Lt(a, l, r, o, c, d, y, h, v, g, _, S) {
  return { t: a, i: l, s: r, c: o, m: c, p: d, e: y, a: h, f: v, b: g, o: _, l: S };
}
function ba(a) {
  return Lt(2, w, a, w, w, w, w, w, w, w, w, w);
}
var by = ba(2),
  Ey = ba(3),
  F1 = ba(1),
  P1 = ba(0),
  J1 = ba(4),
  k1 = ba(5),
  $1 = ba(6),
  W1 = ba(7);
function tS(a) {
  switch (a) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return w;
  }
}
function Ea(a) {
  let l = "",
    r = 0,
    o;
  for (let c = 0, d = a.length; c < d; c++)
    ((o = tS(a[c])), o && ((l += a.slice(r, c) + o), (r = c + 1)));
  return (r === 0 ? (l = a) : (l += a.slice(r)), l);
}
function eS(a) {
  switch (a) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return `
`;
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return a;
  }
}
function _a(a) {
  return a.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, eS);
}
var _u = "__SEROVAL_REFS__",
  _y = new Map(),
  Qi = new Map();
function xy(a) {
  return _y.has(a);
}
function nS(a) {
  return Qi.has(a);
}
function aS(a) {
  if (xy(a)) return _y.get(a);
  throw new DS(a);
}
function iS(a) {
  if (nS(a)) return Qi.get(a);
  throw new LS(a);
}
typeof globalThis < "u"
  ? Object.defineProperty(globalThis, _u, {
      value: Qi,
      configurable: !0,
      writable: !1,
      enumerable: !1,
    })
  : typeof window < "u"
    ? Object.defineProperty(window, _u, {
        value: Qi,
        configurable: !0,
        writable: !1,
        enumerable: !1,
      })
    : typeof self < "u"
      ? Object.defineProperty(self, _u, {
          value: Qi,
          configurable: !0,
          writable: !1,
          enumerable: !1,
        })
      : typeof global < "u" &&
        Object.defineProperty(global, _u, {
          value: Qi,
          configurable: !0,
          writable: !1,
          enumerable: !1,
        });
function Yc(a) {
  return a instanceof EvalError
    ? 1
    : a instanceof RangeError
      ? 2
      : a instanceof ReferenceError
        ? 3
        : a instanceof SyntaxError
          ? 4
          : a instanceof TypeError
            ? 5
            : a instanceof URIError
              ? 6
              : 0;
}
function lS(a) {
  let l = K1[Yc(a)];
  return a.name !== l
    ? { name: a.name }
    : a.constructor.name !== l
      ? { name: a.constructor.name }
      : {};
}
function Ay(a, l) {
  let r = lS(a),
    o = Object.getOwnPropertyNames(a);
  for (let c = 0, d = o.length, y; c < d; c++)
    ((y = o[c]),
      y !== "name" &&
        y !== "message" &&
        (y === "stack" ? l & 4 && ((r = r || {}), (r[y] = a[y])) : ((r = r || {}), (r[y] = a[y]))));
  return r;
}
function wy(a) {
  return Object.isFrozen(a) ? 3 : Object.isSealed(a) ? 2 : Object.isExtensible(a) ? 0 : 1;
}
function rS(a) {
  switch (a) {
    case Number.POSITIVE_INFINITY:
      return k1;
    case Number.NEGATIVE_INFINITY:
      return $1;
  }
  return a !== a ? W1 : Object.is(a, -0) ? J1 : Lt(0, w, a, w, w, w, w, w, w, w, w, w);
}
function Ry(a) {
  return Lt(1, w, Ea(a), w, w, w, w, w, w, w, w, w);
}
function uS(a) {
  return Lt(3, w, "" + a, w, w, w, w, w, w, w, w, w);
}
function oS(a) {
  return Lt(4, a, w, w, w, w, w, w, w, w, w, w);
}
function sS(a, l) {
  let r = l.valueOf();
  return Lt(5, a, r !== r ? "" : l.toISOString(), w, w, w, w, w, w, w, w, w);
}
function cS(a, l) {
  return Lt(6, a, w, Ea(l.source), l.flags, w, w, w, w, w, w, w);
}
function fS(a, l) {
  return Lt(17, a, Sy[l], w, w, w, w, w, w, w, w, w);
}
function dS(a, l) {
  return Lt(18, a, Ea(aS(l)), w, w, w, w, w, w, w, w, w);
}
function hS(a, l, r) {
  return Lt(25, a, r, Ea(l), w, w, w, w, w, w, w, w);
}
function pS(a, l, r) {
  return Lt(9, a, w, w, w, w, w, r, w, w, wy(l), w);
}
function mS(a, l) {
  return Lt(21, a, w, w, w, w, w, w, l, w, w, w);
}
function yS(a, l, r) {
  return Lt(15, a, w, l.constructor.name, w, w, w, w, r, l.byteOffset, w, l.length);
}
function gS(a, l, r) {
  return Lt(16, a, w, l.constructor.name, w, w, w, w, r, l.byteOffset, w, l.byteLength);
}
function vS(a, l, r) {
  return Lt(20, a, w, w, w, w, w, w, r, l.byteOffset, w, l.byteLength);
}
function SS(a, l, r) {
  return Lt(13, a, Yc(l), w, Ea(l.message), r, w, w, w, w, w, w);
}
function bS(a, l, r) {
  return Lt(14, a, Yc(l), w, Ea(l.message), r, w, w, w, w, w, w);
}
function ES(a, l) {
  return Lt(7, a, w, w, w, w, w, l, w, w, w, w);
}
function _S(a, l) {
  return Lt(28, w, w, w, w, w, w, [a, l], w, w, w, w);
}
function xS(a, l) {
  return Lt(30, w, w, w, w, w, w, [a, l], w, w, w, w);
}
function AS(a, l, r) {
  return Lt(31, a, w, w, w, w, w, r, l, w, w, w);
}
function wS(a, l) {
  return Lt(32, a, w, w, w, w, w, w, l, w, w, w);
}
function RS(a, l) {
  return Lt(33, a, w, w, w, w, w, w, l, w, w, w);
}
function TS(a, l) {
  return Lt(34, a, w, w, w, w, w, w, l, w, w, w);
}
function MS(a, l, r, o) {
  return Lt(35, a, r, w, w, w, w, l, w, w, w, o);
}
var CS = { parsing: 1, serialization: 2, deserialization: 3 };
function OS(a) {
  return `Seroval Error (step: ${CS[a]})`;
}
var zS = (a, l) => OS(a),
  Ty = class extends Error {
    constructor(a, l) {
      (super(zS(a)), (this.cause = l));
    }
  },
  Sm = class extends Ty {
    constructor(a) {
      super("parsing", a);
    }
  },
  BS = class extends Ty {
    constructor(a) {
      super("deserialization", a);
    }
  };
function Yn(a) {
  return `Seroval Error (specific: ${a})`;
}
var Gu = class extends Error {
    constructor(l) {
      (super(Yn(1)), (this.value = l));
    }
  },
  My = class extends Error {
    constructor(l) {
      super(Yn(2));
    }
  },
  US = class extends Error {
    constructor(a) {
      super(Yn(3));
    }
  },
  ir = class extends Error {
    constructor(a) {
      super(Yn(4));
    }
  },
  DS = class extends Error {
    constructor(a) {
      (super(Yn(5)), (this.value = a));
    }
  },
  LS = class extends Error {
    constructor(a) {
      super(Yn(6));
    }
  },
  NS = class extends Error {
    constructor(a) {
      super(Yn(7));
    }
  },
  xa = class extends Error {
    constructor(a) {
      super(Yn(8));
    }
  },
  jS = class extends Error {
    constructor(l) {
      super(Yn(9));
    }
  },
  HS = class {
    constructor(a, l) {
      ((this.value = a), (this.replacement = l));
    }
  },
  Vu = () => {
    let a = { p: 0, s: 0, f: 0 };
    return (
      (a.p = new Promise((l, r) => {
        ((a.s = l), (a.f = r));
      })),
      a
    );
  },
  qS = (a, l) => {
    (a.s(l), (a.p.s = 1), (a.p.v = l));
  },
  YS = (a, l) => {
    (a.f(l), (a.p.s = 2), (a.p.v = l));
  };
Vu.toString();
qS.toString();
YS.toString();
var GS = () => {
    let a = [],
      l = [],
      r = !0,
      o = !1,
      c = 0,
      d = (v, g, _) => {
        for (_ = 0; _ < c; _++) l[_] && l[_][g](v);
      },
      y = (v, g, _, S) => {
        for (g = 0, _ = a.length; g < _; g++)
          ((S = a[g]), !r && g === _ - 1 ? v[o ? "return" : "throw"](S) : v.next(S));
      },
      h = (v, g) => (
        r && ((g = c++), (l[g] = v)),
        y(v),
        () => {
          r && ((l[g] = l[c]), (l[c--] = void 0));
        }
      );
    return {
      __SEROVAL_STREAM__: !0,
      on: (v) => h(v),
      next: (v) => {
        r && (a.push(v), d(v, "next"));
      },
      throw: (v) => {
        r && (a.push(v), d(v, "throw"), (r = !1), (o = !1), (l.length = 0));
      },
      return: (v) => {
        r && (a.push(v), d(v, "return"), (r = !1), (o = !0), (l.length = 0));
      },
    };
  },
  VS = (a) => (l) => () => {
    let r = 0,
      o = {
        [a]: () => o,
        next: () => {
          if (r > l.d) return { done: !0, value: void 0 };
          let c = r++,
            d = l.v[c];
          if (c === l.t) throw d;
          return { done: c === l.d, value: d };
        },
      };
    return o;
  },
  XS = (a, l) => (r) => () => {
    let o = 0,
      c = -1,
      d = !1,
      y = [],
      h = [],
      v = (_ = 0, S = h.length) => {
        for (; _ < S; _++) h[_].s({ done: !0, value: void 0 });
      };
    r.on({
      next: (_) => {
        let S = h.shift();
        (S && S.s({ done: !1, value: _ }), y.push(_));
      },
      throw: (_) => {
        let S = h.shift();
        (S && S.f(_), v(), (c = y.length), (d = !0), y.push(_));
      },
      return: (_) => {
        let S = h.shift();
        (S && S.s({ done: !0, value: _ }), v(), (c = y.length), y.push(_));
      },
    });
    let g = {
      [a]: () => g,
      next: () => {
        if (c === -1) {
          let A = o++;
          if (A >= y.length) {
            let x = l();
            return (h.push(x), x.p);
          }
          return { done: !1, value: y[A] };
        }
        if (o > c) return { done: !0, value: void 0 };
        let _ = o++,
          S = y[_];
        if (_ !== c) return { done: !1, value: S };
        if (d) throw S;
        return { done: !0, value: S };
      },
    };
    return g;
  },
  Cy = (a) => {
    let l = atob(a),
      r = l.length,
      o = new Uint8Array(r);
    for (let c = 0; c < r; c++) o[c] = l.charCodeAt(c);
    return o.buffer;
  };
Cy.toString();
function QS(a) {
  return "__SEROVAL_SEQUENCE__" in a;
}
function Oy(a, l, r) {
  return { __SEROVAL_SEQUENCE__: !0, v: a, t: l, d: r };
}
function ZS(a) {
  let l = [],
    r = -1,
    o = -1,
    c = a[qn]();
  for (;;)
    try {
      let d = c.next();
      if ((l.push(d.value), d.done)) {
        o = l.length - 1;
        break;
      }
    } catch (d) {
      ((r = l.length), l.push(d));
    }
  return Oy(l, r, o);
}
var KS = VS(qn);
function IS(a) {
  return KS(a);
}
var FS = {},
  PS = {},
  JS = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
function Xu(a) {
  return "__SEROVAL_STREAM__" in a;
}
function ei() {
  return GS();
}
function kS(a) {
  let l = ei(),
    r = a[Hn]();
  async function o() {
    try {
      let c = await r.next();
      c.done ? l.return(c.value) : (l.next(c.value), await o());
    } catch (c) {
      l.throw(c);
    }
  }
  return (o().catch(() => {}), l);
}
var $S = XS(Hn, Vu);
function WS(a) {
  return $S(a);
}
async function tb(a) {
  try {
    return [1, await a];
  } catch (l) {
    return [0, l];
  }
}
function eb(a, l) {
  return {
    plugins: l.plugins,
    mode: a,
    marked: new Set(),
    features: 63 ^ (l.disabledFeatures || 0),
    refs: l.refs || new Map(),
    depthLimit: l.depthLimit || 1e3,
  };
}
function Ou(a, l) {
  a.marked.add(l);
}
function nb(a, l) {
  let r = a.refs.size;
  return (a.refs.set(l, r), r);
}
function Qu(a, l) {
  let r = a.refs.get(l);
  return r != null ? (Ou(a, r), { type: 1, value: oS(r) }) : { type: 0, value: nb(a, l) };
}
function Gc(a, l) {
  let r = Qu(a, l);
  return r.type === 1 ? r : xy(l) ? { type: 2, value: dS(r.value, l) } : r;
}
function ka(a, l) {
  let r = Gc(a, l);
  if (r.type !== 0) return r.value;
  if (l in Sy) return fS(r.value, l);
  throw new Gu(l);
}
function Zu(a, l) {
  let r = Qu(a, JS[l]);
  return r.type === 1 ? r.value : Lt(26, r.value, l, w, w, w, w, w, w, w, w, w);
}
function ab(a) {
  let l = Qu(a, FS);
  return l.type === 1 ? l.value : Lt(27, l.value, w, w, w, w, w, w, ka(a, qn), w, w, w);
}
function ib(a) {
  let l = Qu(a, PS);
  return l.type === 1 ? l.value : Lt(29, l.value, w, w, w, w, w, [Zu(a, 1), ka(a, Hn)], w, w, w, w);
}
function lb(a, l, r, o) {
  return Lt(r ? 11 : 10, a, w, w, w, o, w, w, w, w, wy(l), w);
}
function rb(a, l, r, o) {
  return Lt(8, l, w, w, w, w, { k: r, v: o }, w, Zu(a, 0), w, w, w);
}
function ub(a, l, r) {
  let o = new Uint8Array(r),
    c = "";
  for (let d = 0, y = o.length; d < y; d++) c += String.fromCharCode(o[d]);
  return Lt(19, l, Ea(btoa(c)), w, w, w, w, w, Zu(a, 5), w, w, w);
}
function ob(a, l) {
  return { base: eb(a, l), child: void 0 };
}
var sb = class {
  constructor(a, l) {
    ((this._p = a), (this.depth = l));
  }
  parse(a) {
    return de(this._p, this.depth, a);
  }
};
async function cb(a, l, r) {
  let o = [];
  for (let c = 0, d = r.length; c < d; c++) c in r ? (o[c] = await de(a, l, r[c])) : (o[c] = 0);
  return o;
}
async function fb(a, l, r, o) {
  return pS(r, o, await cb(a, l, o));
}
async function Vc(a, l, r) {
  let o = Object.entries(r),
    c = [],
    d = [];
  for (let y = 0, h = o.length; y < h; y++) (c.push(Ea(o[y][0])), d.push(await de(a, l, o[y][1])));
  return (
    qn in r && (c.push(ka(a.base, qn)), d.push(_S(ab(a.base), await de(a, l, ZS(r))))),
    Hn in r && (c.push(ka(a.base, Hn)), d.push(xS(ib(a.base), await de(a, l, kS(r))))),
    Ii in r && (c.push(ka(a.base, Ii)), d.push(Ry(r[Ii]))),
    Ki in r && (c.push(ka(a.base, Ki)), d.push(r[Ki] ? by : Ey)),
    { k: c, v: d }
  );
}
async function Sc(a, l, r, o, c) {
  return lb(r, o, c, await Vc(a, l, o));
}
async function db(a, l, r, o) {
  return mS(r, await de(a, l, o.valueOf()));
}
async function hb(a, l, r, o) {
  return yS(r, o, await de(a, l, o.buffer));
}
async function pb(a, l, r, o) {
  return gS(r, o, await de(a, l, o.buffer));
}
async function mb(a, l, r, o) {
  return vS(r, o, await de(a, l, o.buffer));
}
async function bm(a, l, r, o) {
  let c = Ay(o, a.base.features);
  return SS(r, o, c ? await Vc(a, l, c) : w);
}
async function yb(a, l, r, o) {
  let c = Ay(o, a.base.features);
  return bS(r, o, c ? await Vc(a, l, c) : w);
}
async function gb(a, l, r, o) {
  let c = [],
    d = [];
  for (let [y, h] of o.entries()) (c.push(await de(a, l, y)), d.push(await de(a, l, h)));
  return rb(a.base, r, c, d);
}
async function vb(a, l, r, o) {
  let c = [];
  for (let d of o.keys()) c.push(await de(a, l, d));
  return ES(r, c);
}
async function zy(a, l, r, o) {
  let c = a.base.plugins;
  if (c)
    for (let d = 0, y = c.length; d < y; d++) {
      let h = c[d];
      if (h.parse.async && h.test(o))
        return hS(r, h.tag, await h.parse.async(o, new sb(a, l), { id: r }));
    }
  return w;
}
async function Sb(a, l, r, o) {
  let [c, d] = await tb(o);
  return Lt(12, r, c, w, w, w, w, w, await de(a, l, d), w, w, w);
}
function bb(a, l, r, o, c) {
  let d = [],
    y = r.on({
      next: (h) => {
        (Ou(this.base, l),
          de(this, a, h).then(
            (v) => {
              d.push(wS(l, v));
            },
            (v) => {
              (c(v), y());
            },
          ));
      },
      throw: (h) => {
        (Ou(this.base, l),
          de(this, a, h).then(
            (v) => {
              (d.push(RS(l, v)), o(d), y());
            },
            (v) => {
              (c(v), y());
            },
          ));
      },
      return: (h) => {
        (Ou(this.base, l),
          de(this, a, h).then(
            (v) => {
              (d.push(TS(l, v)), o(d), y());
            },
            (v) => {
              (c(v), y());
            },
          ));
      },
    });
}
async function Eb(a, l, r, o) {
  return AS(r, Zu(a.base, 4), await new Promise(bb.bind(a, l, r, o)));
}
async function _b(a, l, r, o) {
  let c = [];
  for (let d = 0, y = o.v.length; d < y; d++) c[d] = await de(a, l, o.v[d]);
  return MS(r, c, o.t, o.d);
}
async function xb(a, l, r, o) {
  if (Array.isArray(o)) return fb(a, l, r, o);
  if (Xu(o)) return Eb(a, l, r, o);
  if (QS(o)) return _b(a, l, r, o);
  let c = o.constructor;
  if (c === HS) return de(a, l, o.replacement);
  let d = await zy(a, l, r, o);
  if (d) return d;
  switch (c) {
    case Object:
      return Sc(a, l, r, o, !1);
    case w:
      return Sc(a, l, r, o, !0);
    case Date:
      return sS(r, o);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return bm(a, l, r, o);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return db(a, l, r, o);
    case ArrayBuffer:
      return ub(a.base, r, o);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return hb(a, l, r, o);
    case DataView:
      return mb(a, l, r, o);
    case Map:
      return gb(a, l, r, o);
    case Set:
      return vb(a, l, r, o);
  }
  if (c === Promise || o instanceof Promise) return Sb(a, l, r, o);
  let y = a.base.features;
  if (y & 32 && c === RegExp) return cS(r, o);
  if (y & 16)
    switch (c) {
      case BigInt64Array:
      case BigUint64Array:
        return pb(a, l, r, o);
    }
  if (y & 1 && typeof AggregateError < "u" && (c === AggregateError || o instanceof AggregateError))
    return yb(a, l, r, o);
  if (o instanceof Error) return bm(a, l, r, o);
  if (qn in o || Hn in o) return Sc(a, l, r, o, !!c);
  throw new Gu(o);
}
async function Ab(a, l, r) {
  let o = Gc(a.base, r);
  if (o.type !== 0) return o.value;
  let c = await zy(a, l, o.value, r);
  if (c) return c;
  throw new Gu(r);
}
async function de(a, l, r) {
  switch (typeof r) {
    case "boolean":
      return r ? by : Ey;
    case "undefined":
      return F1;
    case "string":
      return Ry(r);
    case "number":
      return rS(r);
    case "bigint":
      return uS(r);
    case "object": {
      if (r) {
        let o = Gc(a.base, r);
        return o.type === 0 ? await xb(a, l + 1, o.value, r) : o.value;
      }
      return P1;
    }
    case "symbol":
      return ka(a.base, r);
    case "function":
      return Ab(a, l, r);
    default:
      throw new Gu(r);
  }
}
async function wb(a, l) {
  try {
    return await de(a, 0, l);
  } catch (r) {
    throw r instanceof Sm ? r : new Sm(r);
  }
}
var Rb = ((a) => ((a[(a.Vanilla = 1)] = "Vanilla"), (a[(a.Cross = 2)] = "Cross"), a))(Rb || {});
function By(a, l) {
  for (let r = 0, o = l.length; r < o; r++) {
    let c = l[r];
    a.has(c) || (a.add(c), c.extends && By(a, c.extends));
  }
}
function Uy(a) {
  if (a) {
    let l = new Set();
    return (By(l, a), [...l]);
  }
}
function Tb(a) {
  switch (a) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new NS(a);
  }
}
var Mb = 1e6,
  Cb = 1e4,
  Ob = 2e4;
function Dy(a, l) {
  switch (l) {
    case 3:
      return Object.freeze(a);
    case 1:
      return Object.preventExtensions(a);
    case 2:
      return Object.seal(a);
    default:
      return a;
  }
}
var zb = 1e3;
function Bb(a, l) {
  var r;
  return {
    mode: a,
    plugins: l.plugins,
    refs: l.refs || new Map(),
    features: (r = l.features) != null ? r : 63 ^ (l.disabledFeatures || 0),
    depthLimit: l.depthLimit || zb,
  };
}
function Ub(a) {
  return { mode: 2, base: Bb(2, a), child: w };
}
var Db = class {
  constructor(a, l) {
    ((this._p = a), (this.depth = l));
  }
  deserialize(a) {
    return Ft(this._p, this.depth, a);
  }
};
function Ly(a, l) {
  if (l < 0 || !Number.isFinite(l) || !Number.isInteger(l)) throw new xa({ t: 4, i: l });
  if (a.refs.has(l)) throw new Error("Conflicted ref id: " + l);
}
function Lb(a, l, r) {
  return (Ly(a.base, l), a.state.marked.has(l) && a.base.refs.set(l, r), r);
}
function Nb(a, l, r) {
  return (Ly(a.base, l), a.base.refs.set(l, r), r);
}
function he(a, l, r) {
  return a.mode === 1 ? Lb(a, l, r) : Nb(a, l, r);
}
function zc(a, l, r) {
  if (Object.hasOwn(l, r)) return l[r];
  throw new xa(a);
}
function jb(a, l) {
  return he(a, l.i, iS(_a(l.s)));
}
function Hb(a, l, r) {
  let o = r.a,
    c = o.length,
    d = he(a, r.i, new Array(c));
  for (let y = 0, h; y < c; y++) ((h = o[y]), h && (d[y] = Ft(a, l, h)));
  return (Dy(d, r.o), d);
}
function qb(a) {
  switch (a) {
    case "constructor":
    case "__proto__":
    case "prototype":
    case "__defineGetter__":
    case "__defineSetter__":
    case "__lookupGetter__":
    case "__lookupSetter__":
      return !1;
    default:
      return !0;
  }
}
function Yb(a) {
  switch (a) {
    case Hn:
    case Ki:
    case Ii:
    case qn:
      return !0;
    default:
      return !1;
  }
}
function Em(a, l, r) {
  qb(l)
    ? (a[l] = r)
    : Object.defineProperty(a, l, { value: r, configurable: !0, enumerable: !0, writable: !0 });
}
function Gb(a, l, r, o, c) {
  if (typeof o == "string") Em(r, _a(o), Ft(a, l, c));
  else {
    let d = Ft(a, l, o);
    switch (typeof d) {
      case "string":
        Em(r, d, Ft(a, l, c));
        break;
      case "symbol":
        Yb(d) && (r[d] = Ft(a, l, c));
        break;
      default:
        throw new xa(o);
    }
  }
}
function Ny(a, l, r, o) {
  let c = r.k;
  if (c.length > 0) for (let d = 0, y = r.v, h = c.length; d < h; d++) Gb(a, l, o, c[d], y[d]);
  return o;
}
function Vb(a, l, r) {
  let o = he(a, r.i, r.t === 10 ? {} : Object.create(null));
  return (Ny(a, l, r.p, o), Dy(o, r.o), o);
}
function Xb(a, l) {
  return he(a, l.i, new Date(l.s));
}
function Qb(a, l) {
  if (a.base.features & 32) {
    let r = _a(l.c);
    if (r.length > Ob) throw new xa(l);
    return he(a, l.i, new RegExp(r, l.m));
  }
  throw new My(l);
}
function Zb(a, l, r) {
  let o = he(a, r.i, new Set());
  for (let c = 0, d = r.a, y = d.length; c < y; c++) o.add(Ft(a, l, d[c]));
  return o;
}
function Kb(a, l, r) {
  let o = he(a, r.i, new Map());
  for (let c = 0, d = r.e.k, y = r.e.v, h = d.length; c < h; c++)
    o.set(Ft(a, l, d[c]), Ft(a, l, y[c]));
  return o;
}
function Ib(a, l) {
  if (l.s.length > Mb) throw new xa(l);
  return he(a, l.i, Cy(_a(l.s)));
}
function Fb(a, l, r) {
  var o;
  let c = Tb(r.c),
    d = Ft(a, l, r.f),
    y = (o = r.b) != null ? o : 0;
  if (y < 0 || y > d.byteLength) throw new xa(r);
  return he(a, r.i, new c(d, y, r.l));
}
function Pb(a, l, r) {
  var o;
  let c = Ft(a, l, r.f),
    d = (o = r.b) != null ? o : 0;
  if (d < 0 || d > c.byteLength) throw new xa(r);
  return he(a, r.i, new DataView(c, d, r.l));
}
function jy(a, l, r, o) {
  if (r.p) {
    let c = Ny(a, l, r.p, {});
    Object.defineProperties(o, Object.getOwnPropertyDescriptors(c));
  }
  return o;
}
function Jb(a, l, r) {
  let o = he(a, r.i, new AggregateError([], _a(r.m)));
  return jy(a, l, r, o);
}
function kb(a, l, r) {
  let o = zc(r, I1, r.s),
    c = he(a, r.i, new o(_a(r.m)));
  return jy(a, l, r, c);
}
function $b(a, l, r) {
  let o = Vu(),
    c = he(a, r.i, o.p),
    d = Ft(a, l, r.f);
  return (r.s ? o.s(d) : o.f(d), c);
}
function Wb(a, l, r) {
  return he(a, r.i, Object(Ft(a, l, r.f)));
}
function tE(a, l, r) {
  let o = a.base.plugins;
  if (o) {
    let c = _a(r.c);
    for (let d = 0, y = o.length; d < y; d++) {
      let h = o[d];
      if (h.tag === c) return he(a, r.i, h.deserialize(r.s, new Db(a, l), { id: r.i }));
    }
  }
  throw new US(r.c);
}
function eE(a, l) {
  return he(a, l.i, he(a, l.s, Vu()).p);
}
function nE(a, l, r) {
  let o = a.base.refs.get(r.i);
  if (o) return (o.s(Ft(a, l, r.a[1])), w);
  throw new ir("Promise");
}
function aE(a, l, r) {
  let o = a.base.refs.get(r.i);
  if (o) return (o.f(Ft(a, l, r.a[1])), w);
  throw new ir("Promise");
}
function iE(a, l, r) {
  Ft(a, l, r.a[0]);
  let o = Ft(a, l, r.a[1]);
  return IS(o);
}
function lE(a, l, r) {
  Ft(a, l, r.a[0]);
  let o = Ft(a, l, r.a[1]);
  return WS(o);
}
function rE(a, l, r) {
  let o = he(a, r.i, ei()),
    c = r.a,
    d = c.length;
  if (d) for (let y = 0; y < d; y++) Ft(a, l, c[y]);
  return o;
}
function uE(a, l, r) {
  let o = a.base.refs.get(r.i);
  if (o && Xu(o)) return (o.next(Ft(a, l, r.f)), w);
  throw new ir("Stream");
}
function oE(a, l, r) {
  let o = a.base.refs.get(r.i);
  if (o && Xu(o)) return (o.throw(Ft(a, l, r.f)), w);
  throw new ir("Stream");
}
function sE(a, l, r) {
  let o = a.base.refs.get(r.i);
  if (o && Xu(o)) return (o.return(Ft(a, l, r.f)), w);
  throw new ir("Stream");
}
function cE(a, l, r) {
  return (Ft(a, l, r.f), w);
}
function fE(a, l, r) {
  return (Ft(a, l, r.a[1]), w);
}
function dE(a, l, r) {
  let o = he(a, r.i, Oy([], r.s, r.l));
  for (let c = 0, d = r.a.length; c < d; c++) o.v[c] = Ft(a, l, r.a[c]);
  return o;
}
function Ft(a, l, r) {
  if (l > a.base.depthLimit) throw new jS(a.base.depthLimit);
  switch (((l += 1), r.t)) {
    case 2:
      return zc(r, Z1, r.s);
    case 0:
      return Number(r.s);
    case 1:
      return _a(String(r.s));
    case 3:
      if (String(r.s).length > Cb) throw new xa(r);
      return BigInt(r.s);
    case 4:
      return a.base.refs.get(r.i);
    case 18:
      return jb(a, r);
    case 9:
      return Hb(a, l, r);
    case 10:
    case 11:
      return Vb(a, l, r);
    case 5:
      return Xb(a, r);
    case 6:
      return Qb(a, r);
    case 7:
      return Zb(a, l, r);
    case 8:
      return Kb(a, l, r);
    case 19:
      return Ib(a, r);
    case 16:
    case 15:
      return Fb(a, l, r);
    case 20:
      return Pb(a, l, r);
    case 14:
      return Jb(a, l, r);
    case 13:
      return kb(a, l, r);
    case 12:
      return $b(a, l, r);
    case 17:
      return zc(r, Q1, r.s);
    case 21:
      return Wb(a, l, r);
    case 25:
      return tE(a, l, r);
    case 22:
      return eE(a, r);
    case 23:
      return nE(a, l, r);
    case 24:
      return aE(a, l, r);
    case 28:
      return iE(a, l, r);
    case 30:
      return lE(a, l, r);
    case 31:
      return rE(a, l, r);
    case 32:
      return uE(a, l, r);
    case 33:
      return oE(a, l, r);
    case 34:
      return sE(a, l, r);
    case 27:
      return cE(a, l, r);
    case 29:
      return fE(a, l, r);
    case 35:
      return dE(a, l, r);
    default:
      throw new My(r);
  }
}
function hE(a, l) {
  try {
    return Ft(a, 0, l);
  } catch (r) {
    throw new BS(r);
  }
}
var pE = () => T;
pE.toString();
function _m(a, l) {
  let r = Uy(l.plugins),
    o = Ub({
      plugins: r,
      refs: l.refs,
      features: l.features,
      disabledFeatures: l.disabledFeatures,
      depthLimit: l.depthLimit,
    });
  return hE(o, a);
}
async function mE(a, l = {}) {
  let r = Uy(l.plugins),
    o = ob(1, { plugins: r, disabledFeatures: l.disabledFeatures });
  return { t: await wb(o, a), f: o.base.features, m: Array.from(o.base.marked) };
}
function yE(a) {
  return {
    tag: "$TSR/t/" + a.key,
    test: a.test,
    parse: {
      sync(l, r, o) {
        return { v: r.parse(a.toSerializable(l)) };
      },
      async async(l, r, o) {
        return { v: await r.parse(a.toSerializable(l)) };
      },
      stream(l, r, o) {
        return { v: r.parse(a.toSerializable(l)) };
      },
    },
    serialize: void 0,
    deserialize(l, r, o) {
      return a.fromSerializable(r.deserialize(l.v));
    },
  };
}
var gE = class {
    constructor(a, l) {
      ((this.stream = a), (this.hint = l?.hint ?? "binary"));
    }
  },
  Nu = globalThis.Buffer,
  Hy = !!Nu && typeof Nu.from == "function";
function qy(a) {
  if (a.length === 0) return "";
  if (Hy) return Nu.from(a).toString("base64");
  const l = 32768,
    r = [];
  for (let o = 0; o < a.length; o += l) {
    const c = a.subarray(o, o + l);
    r.push(String.fromCharCode.apply(null, c));
  }
  return btoa(r.join(""));
}
function Yy(a) {
  if (a.length === 0) return new Uint8Array(0);
  if (Hy) {
    const o = Nu.from(a, "base64");
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  const l = atob(a),
    r = new Uint8Array(l.length);
  for (let o = 0; o < l.length; o++) r[o] = l.charCodeAt(o);
  return r;
}
var Kl = Object.create(null),
  Il = Object.create(null),
  vE = (a) =>
    new ReadableStream({
      start(l) {
        a.on({
          next(r) {
            try {
              l.enqueue(Yy(r));
            } catch {}
          },
          throw(r) {
            l.error(r);
          },
          return() {
            try {
              l.close();
            } catch {}
          },
        });
      },
    }),
  SE = new TextEncoder(),
  bE = (a) =>
    new ReadableStream({
      start(l) {
        a.on({
          next(r) {
            try {
              typeof r == "string" ? l.enqueue(SE.encode(r)) : l.enqueue(Yy(r.$b64));
            } catch {}
          },
          throw(r) {
            l.error(r);
          },
          return() {
            try {
              l.close();
            } catch {}
          },
        });
      },
    }),
  EE =
    "(s=>new ReadableStream({start(c){s.on({next(b){try{const d=atob(b),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}catch(_){}},throw(e){c.error(e)},return(){try{c.close()}catch(_){}}})}}))",
  _E =
    "(s=>{const e=new TextEncoder();return new ReadableStream({start(c){s.on({next(v){try{if(typeof v==='string'){c.enqueue(e.encode(v))}else{const d=atob(v.$b64),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}}catch(_){}},throw(x){c.error(x)},return(){try{c.close()}catch(_){}}})}})})";
function xm(a) {
  const l = ei(),
    r = a.getReader();
  return (
    (async () => {
      try {
        for (;;) {
          const { done: o, value: c } = await r.read();
          if (o) {
            l.return(void 0);
            break;
          }
          l.next(qy(c));
        }
      } catch (o) {
        l.throw(o);
      } finally {
        r.releaseLock();
      }
    })(),
    l
  );
}
function Am(a) {
  const l = ei(),
    r = a.getReader(),
    o = new TextDecoder("utf-8", { fatal: !0 });
  return (
    (async () => {
      try {
        for (;;) {
          const { done: c, value: d } = await r.read();
          if (c) {
            try {
              const y = o.decode();
              y.length > 0 && l.next(y);
            } catch {}
            l.return(void 0);
            break;
          }
          try {
            const y = o.decode(d, { stream: !0 });
            y.length > 0 && l.next(y);
          } catch {
            l.next({ $b64: qy(d) });
          }
        }
      } catch (c) {
        l.throw(c);
      } finally {
        r.releaseLock();
      }
    })(),
    l
  );
}
var xE = {
  tag: "tss/RawStream",
  extends: [
    {
      tag: "tss/RawStreamFactory",
      test(a) {
        return a === Kl;
      },
      parse: {
        sync(a, l, r) {
          return {};
        },
        async async(a, l, r) {
          return {};
        },
        stream(a, l, r) {
          return {};
        },
      },
      serialize(a, l, r) {
        return EE;
      },
      deserialize(a, l, r) {
        return Kl;
      },
    },
    {
      tag: "tss/RawStreamFactoryText",
      test(a) {
        return a === Il;
      },
      parse: {
        sync(a, l, r) {
          return {};
        },
        async async(a, l, r) {
          return {};
        },
        stream(a, l, r) {
          return {};
        },
      },
      serialize(a, l, r) {
        return _E;
      },
      deserialize(a, l, r) {
        return Il;
      },
    },
  ],
  test(a) {
    return a instanceof gE;
  },
  parse: {
    sync(a, l, r) {
      const o = a.hint === "text" ? Il : Kl;
      return { hint: l.parse(a.hint), factory: l.parse(o), stream: l.parse(ei()) };
    },
    async async(a, l, r) {
      const o = a.hint === "text" ? Il : Kl,
        c = a.hint === "text" ? Am(a.stream) : xm(a.stream);
      return { hint: await l.parse(a.hint), factory: await l.parse(o), stream: await l.parse(c) };
    },
    stream(a, l, r) {
      const o = a.hint === "text" ? Il : Kl,
        c = a.hint === "text" ? Am(a.stream) : xm(a.stream);
      return { hint: l.parse(a.hint), factory: l.parse(o), stream: l.parse(c) };
    },
  },
  serialize(a, l, r) {
    return "(" + l.serialize(a.factory) + ")(" + l.serialize(a.stream) + ")";
  },
  deserialize(a, l, r) {
    const o = l.deserialize(a.stream);
    return l.deserialize(a.hint) === "text" ? bE(o) : vE(o);
  },
};
function AE(a) {
  return {
    tag: "tss/RawStream",
    test: () => !1,
    parse: {},
    serialize() {
      throw new Error(
        "RawStreamDeserializePlugin.serialize should not be called. Client only deserializes.",
      );
    },
    deserialize(l, r, o) {
      return a(typeof r?.deserialize == "function" ? r.deserialize(l.streamId) : l.streamId);
    },
  };
}
var wE = {
    tag: "$TSR/Error",
    test(a) {
      return a instanceof Error;
    },
    parse: {
      sync(a, l) {
        return { message: l.parse(a.message) };
      },
      async async(a, l) {
        return { message: await l.parse(a.message) };
      },
      stream(a, l) {
        return { message: l.parse(a.message) };
      },
    },
    serialize(a, l) {
      return "new Error(" + l.serialize(a.message) + ")";
    },
    deserialize(a, l) {
      return new Error(l.deserialize(a.message));
    },
  },
  ma = {},
  Gy = (a) =>
    new ReadableStream({
      start: (l) => {
        a.on({
          next: (r) => {
            try {
              l.enqueue(r);
            } catch {}
          },
          throw: (r) => {
            l.error(r);
          },
          return: () => {
            try {
              l.close();
            } catch {}
          },
        });
      },
    }),
  RE = {
    tag: "seroval-plugins/web/ReadableStreamFactory",
    test(a) {
      return a === ma;
    },
    parse: {
      sync() {
        return ma;
      },
      async async() {
        return await Promise.resolve(ma);
      },
      stream() {
        return ma;
      },
    },
    serialize() {
      return Gy.toString();
    },
    deserialize() {
      return ma;
    },
  };
function wm(a) {
  let l = ei(),
    r = a.getReader();
  async function o() {
    try {
      let c = await r.read();
      c.done ? l.return(c.value) : (l.next(c.value), await o());
    } catch (c) {
      l.throw(c);
    }
  }
  return (o().catch(() => {}), l);
}
var TE = {
    tag: "seroval/plugins/web/ReadableStream",
    extends: [RE],
    test(a) {
      return typeof ReadableStream > "u" ? !1 : a instanceof ReadableStream;
    },
    parse: {
      sync(a, l) {
        return { factory: l.parse(ma), stream: l.parse(ei()) };
      },
      async async(a, l) {
        return { factory: await l.parse(ma), stream: await l.parse(wm(a)) };
      },
      stream(a, l) {
        return { factory: l.parse(ma), stream: l.parse(wm(a)) };
      },
    },
    serialize(a, l) {
      return "(" + l.serialize(a.factory) + ")(" + l.serialize(a.stream) + ")";
    },
    deserialize(a, l) {
      let r = l.deserialize(a.stream);
      return Gy(r);
    },
  },
  ME = TE,
  CE = [wE, xE, ME];
function OE() {
  return [...(Jm()?.serializationAdapters?.map(yE) ?? []), ...CE];
}
var Rm = new TextDecoder(),
  zE = new Uint8Array(0),
  Tm = 16 * 1024 * 1024,
  Mm = 32 * 1024 * 1024,
  Cm = 1024,
  Om = 1e5;
function BE(a) {
  const l = new Map(),
    r = new Map(),
    o = new Set();
  let c = !1,
    d = null,
    y = 0,
    h;
  const v = new ReadableStream({
    start(S) {
      h = S;
    },
    cancel() {
      c = !0;
      try {
        d?.cancel();
      } catch {}
      (l.forEach((S) => {
        try {
          S.error(new Error("Framed response cancelled"));
        } catch {}
      }),
        l.clear(),
        r.clear(),
        o.clear());
    },
  });
  function g(S) {
    const A = r.get(S);
    if (A) return A;
    if (o.has(S))
      return new ReadableStream({
        start(M) {
          M.close();
        },
      });
    if (r.size >= Cm) throw new Error(`Too many raw streams in framed response (max ${Cm})`);
    const x = new ReadableStream({
      start(M) {
        l.set(S, M);
      },
      cancel() {
        (o.add(S), l.delete(S), r.delete(S));
      },
    });
    return (r.set(S, x), x);
  }
  function _(S) {
    return (g(S), l.get(S));
  }
  return (
    (async () => {
      const S = a.getReader();
      d = S;
      const A = [];
      let x = 0;
      function M() {
        if (x < 9) return null;
        const C = A[0];
        if (C.length >= 9)
          return {
            type: C[0],
            streamId: ((C[1] << 24) | (C[2] << 16) | (C[3] << 8) | C[4]) >>> 0,
            length: ((C[5] << 24) | (C[6] << 16) | (C[7] << 8) | C[8]) >>> 0,
          };
        const B = new Uint8Array(9);
        let q = 0,
          Q = 9;
        for (let V = 0; V < A.length && Q > 0; V++) {
          const $ = A[V],
            nt = Math.min($.length, Q);
          (B.set($.subarray(0, nt), q), (q += nt), (Q -= nt));
        }
        return {
          type: B[0],
          streamId: ((B[1] << 24) | (B[2] << 16) | (B[3] << 8) | B[4]) >>> 0,
          length: ((B[5] << 24) | (B[6] << 16) | (B[7] << 8) | B[8]) >>> 0,
        };
      }
      function D(C) {
        if (C === 0) return zE;
        const B = new Uint8Array(C);
        let q = 0,
          Q = C;
        for (; Q > 0 && A.length > 0; ) {
          const V = A[0];
          if (!V) break;
          const $ = Math.min(V.length, Q);
          (B.set(V.subarray(0, $), q),
            (q += $),
            (Q -= $),
            $ === V.length ? A.shift() : (A[0] = V.subarray($)));
        }
        return ((x -= C), B);
      }
      try {
        for (;;) {
          const { done: C, value: B } = await S.read();
          if (c || C) break;
          if (B) {
            if (x + B.length > Mm) throw new Error(`Framed response buffer exceeded ${Mm} bytes`);
            for (A.push(B), x += B.length; ; ) {
              const q = M();
              if (!q) break;
              const { type: Q, streamId: V, length: $ } = q;
              if (Q !== jn.JSON && Q !== jn.CHUNK && Q !== jn.END && Q !== jn.ERROR)
                throw new Error(`Unknown frame type: ${Q}`);
              if (Q === jn.JSON) {
                if (V !== 0) throw new Error("Invalid JSON frame streamId (expected 0)");
              } else if (V === 0) throw new Error("Invalid raw frame streamId (expected non-zero)");
              if ($ > Tm) throw new Error(`Frame payload too large: ${$} bytes (max ${Tm})`);
              const nt = 9 + $;
              if (x < nt) break;
              if (++y > Om) throw new Error(`Too many frames in framed response (max ${Om})`);
              D(9);
              const F = D($);
              switch (Q) {
                case jn.JSON:
                  try {
                    h.enqueue(Rm.decode(F));
                  } catch {}
                  break;
                case jn.CHUNK: {
                  const et = _(V);
                  et && et.enqueue(F);
                  break;
                }
                case jn.END: {
                  const et = _(V);
                  if ((o.add(V), et)) {
                    try {
                      et.close();
                    } catch {}
                    l.delete(V);
                  }
                  break;
                }
                case jn.ERROR: {
                  const et = _(V);
                  if ((o.add(V), et)) {
                    const it = Rm.decode(F);
                    (et.error(new Error(it)), l.delete(V));
                  }
                  break;
                }
              }
            }
          }
        }
        if (x !== 0) throw new Error("Incomplete frame at end of framed response");
        try {
          h.close();
        } catch {}
        (l.forEach((C) => {
          try {
            C.close();
          } catch {}
        }),
          l.clear());
      } catch (C) {
        try {
          h.error(C);
        } catch {}
        (l.forEach((B) => {
          try {
            B.error(C);
          } catch {}
        }),
          l.clear());
      } finally {
        try {
          S.releaseLock();
        } catch {}
        d = null;
      }
    })(),
    { getOrCreateStream: g, jsonChunks: v }
  );
}
var nr = null;
async function Bc(a) {
  a.length > 0 && (await Promise.allSettled(a));
}
var UE = Object.prototype.hasOwnProperty;
function Vy(a) {
  for (const l in a) if (UE.call(a, l)) return !0;
  return !1;
}
async function DE(a, l, r) {
  nr || (nr = OE());
  const o = l[0],
    c = o.fetch ?? r,
    d = o.data instanceof FormData ? "formData" : "payload",
    y = o.headers ? new Headers(o.headers) : new Headers();
  if (
    (y.set("x-tsr-serverFn", "true"),
    d === "payload" && y.set("accept", `${Bv}, application/x-ndjson, application/json`),
    o.method === "GET")
  ) {
    if (d === "formData") throw new Error("FormData is not supported with GET requests");
    const v = await Xy(o);
    if (v !== void 0) {
      const g = ny({ payload: v });
      a.includes("?") ? (a += `&${g}`) : (a += `?${g}`);
    }
  }
  let h;
  if (o.method === "POST") {
    const v = await LE(o);
    (v?.contentType && y.set("content-type", v.contentType), (h = v?.body));
  }
  return await NE(async () => c(a, { method: o.method, headers: y, signal: o.signal, body: h }));
}
async function Xy(a) {
  let l = !1;
  const r = {};
  if (
    (a.data !== void 0 && ((l = !0), (r.data = a.data)),
    a.context && Vy(a.context) && ((l = !0), (r.context = a.context)),
    l)
  )
    return Qy(r);
}
async function Qy(a) {
  return JSON.stringify(await Promise.resolve(mE(a, { plugins: nr })));
}
async function LE(a) {
  if (a.data instanceof FormData) {
    let r;
    return (
      a.context && Vy(a.context) && (r = await Qy(a.context)),
      r !== void 0 && a.data.set(zv, r),
      { body: a.data }
    );
  }
  const l = await Xy(a);
  if (l) return { body: l, contentType: "application/json" };
}
async function NE(a) {
  let l;
  try {
    l = await a();
  } catch (o) {
    if (o instanceof Response) l = o;
    else throw (console.log(o), o);
  }
  if (l.headers.get("x-tss-raw") === "true") return l;
  const r = l.headers.get("content-type");
  if ((r || He(), l.headers.get("x-tss-serialized"))) {
    let o;
    if (r.includes("application/x-tss-framed")) {
      if ((Lv(r), !l.body)) throw new Error("No response body for framed response");
      const { getOrCreateStream: c, jsonChunks: d } = BE(l.body),
        y = [AE(c), ...(nr || [])],
        h = new Map();
      o = await jE({
        jsonStream: d,
        onMessage: (v) => _m(v, { refs: h, plugins: y }),
        onError(v, g) {
          console.error(v, g);
        },
      });
    } else if (r.includes("application/json")) {
      const c = await l.json(),
        d = [];
      ((o = _m(c, { plugins: nr })), await Bc(d));
    }
    if ((o || He(), o instanceof Error)) throw o;
    return o;
  }
  if (r.includes("application/json")) {
    const o = await l.json(),
      c = g1(o);
    if (c) throw c;
    if (ge(o)) throw o;
    return o;
  }
  if (!l.ok) throw new Error(await l.text());
  return l;
}
async function jE({ jsonStream: a, onMessage: l, onError: r }) {
  const o = a.getReader(),
    { value: c, done: d } = await o.read();
  if (d || !c) throw new Error("Stream ended before first object");
  const y = JSON.parse(c);
  let h = !1;
  const v = (async () => {
    try {
      for (;;) {
        const { value: S, done: A } = await o.read();
        if (A) break;
        if (S)
          try {
            const x = [];
            try {
              l(JSON.parse(S));
            } finally {
            }
            await Bc(x);
          } catch (x) {
            r?.(`Invalid JSON: ${S}`, x);
          }
      }
    } catch (S) {
      h || r?.("Stream processing error:", S);
    }
  })();
  let g;
  const _ = [];
  try {
    g = l(y);
  } catch (S) {
    throw ((h = !0), o.cancel().catch(() => {}), S);
  }
  return (
    await Bc(_),
    Promise.resolve(g).catch(() => {
      ((h = !0), o.cancel().catch(() => {}));
    }),
    v.finally(() => {
      try {
        o.releaseLock();
      } catch {}
    }),
    g
  );
}
function HE(a) {
  const l = "/_serverFn/" + a;
  return Object.assign(
    (...c) => {
      const d = Jm()?.serverFns?.fetch;
      return DE(l, c, d ?? fetch);
    },
    { url: l, serverFnMeta: { id: a }, [Mc]: !0 },
  );
}
var qE = {
  key: "$TSS/serverfn",
  test: (a) => (typeof a != "function" || !(Mc in a) ? !1 : !!a[Mc]),
  toSerializable: ({ serverFnMeta: a }) => ({ functionId: a.id }),
  fromSerializable: ({ functionId: a }) => HE(a),
};
function zm(a) {
  return a.replaceAll("\0", "/").replaceAll("�", "/");
}
function YE(a, l) {
  ((a.id = l.i),
    (a.__beforeLoadContext = l.b),
    (a.loaderData = l.l),
    (a.status = l.s),
    (a.ssr = l.ssr),
    (a.updatedAt = l.u),
    (a.error = l.e),
    l.g !== void 0 && (a.globalNotFound = l.g));
}
async function GE(a) {
  window.$_TSR || He();
  const l = a.options.serializationAdapters;
  if (l?.length) {
    const C = new Map();
    (l.forEach((B) => {
      C.set(B.key, B.fromSerializable);
    }),
      (window.$_TSR.t = C),
      window.$_TSR.buffer.forEach((B) => B()));
  }
  ((window.$_TSR.initialized = !0), window.$_TSR.router || He());
  const r = window.$_TSR.router;
  (r.matches.forEach((C) => {
    C.i = zm(C.i);
  }),
    r.lastMatchId && (r.lastMatchId = zm(r.lastMatchId)));
  const { manifest: o, dehydratedData: c, lastMatchId: d } = r;
  a.ssr = { manifest: o };
  const y = document.querySelector('meta[property="csp-nonce"]')?.content;
  a.options.ssr = { nonce: y };
  const h = a.matchRoutes(a.stores.location.get()),
    v = Promise.all(h.map((C) => a.loadRouteChunk(a.looseRoutesById[C.routeId])));
  function g(C) {
    const B = a.looseRoutesById[C.routeId].options.pendingMinMs ?? a.options.defaultPendingMinMs;
    if (B) {
      const q = ti();
      ((C._nonReactive.minPendingPromise = q),
        (C._forcePending = !0),
        setTimeout(() => {
          (q.resolve(),
            a.updateMatch(
              C.id,
              (Q) => ((Q._nonReactive.minPendingPromise = void 0), { ...Q, _forcePending: void 0 }),
            ));
        }, B));
    }
  }
  function _(C) {
    const B = a.looseRoutesById[C.routeId];
    B && (B.options.ssr = C.ssr);
  }
  let S;
  (h.forEach((C) => {
    const B = r.matches.find((q) => q.i === C.id);
    if (!B) {
      ((C._nonReactive.dehydrated = !1), (C.ssr = !1), _(C));
      return;
    }
    (YE(C, B),
      _(C),
      (C._nonReactive.dehydrated = C.ssr !== !1),
      (C.ssr === "data-only" || C.ssr === !1) && S === void 0 && ((S = C.index), g(C)));
  }),
    a.stores.setMatches(h),
    await a.options.hydrate?.(c));
  const A = a.stores.matches.get(),
    x = a.stores.location.get();
  await Promise.all(
    A.map(async (C) => {
      try {
        const B = a.looseRoutesById[C.routeId],
          q = A[C.index - 1]?.context ?? a.options.context;
        if (B.options.context) {
          const nt = {
            deps: C.loaderDeps,
            params: C.params,
            context: q ?? {},
            location: x,
            navigate: (F) => a.navigate({ ...F, _fromLocation: x }),
            buildLocation: a.buildLocation,
            cause: C.cause,
            abortController: C.abortController,
            preload: !1,
            matches: h,
            routeId: B.id,
          };
          C.__routeContext = B.options.context(nt) ?? void 0;
        }
        C.context = { ...q, ...C.__routeContext, ...C.__beforeLoadContext };
        const Q = {
            ssr: a.options.ssr,
            matches: A,
            match: C,
            params: C.params,
            loaderData: C.loaderData,
          },
          V = await B.options.head?.(Q),
          $ = await B.options.scripts?.(Q);
        ((C.meta = V?.meta),
          (C.links = V?.links),
          (C.headScripts = V?.scripts),
          (C.styles = V?.styles),
          (C.scripts = $));
      } catch (B) {
        if (ge(B))
          ((C.error = { isNotFound: !0 }),
            console.error(`NotFound error during hydration for routeId: ${C.routeId}`, B));
        else
          throw (
            (C.error = B),
            console.error(`Error during hydration for route ${C.routeId}:`, B),
            B
          );
      }
    }),
  );
  const M = h[h.length - 1].id !== d;
  if (!h.some((C) => C.ssr === !1) && !M)
    return (
      h.forEach((C) => {
        C._nonReactive.dehydrated = void 0;
      }),
      a.stores.resolvedLocation.set(a.stores.location.get()),
      v
    );
  const D = Promise.resolve()
    .then(() => a.load())
    .catch((C) => {
      console.error("Error during router hydration:", C);
    });
  if (M) {
    const C = h[1];
    (C || He(),
      g(C),
      (C._displayPending = !0),
      (C._nonReactive.displayPendingPromise = D),
      D.then(() => {
        a.batch(() => {
          (a.stores.status.get() === "pending" &&
            (a.stores.status.set("idle"), a.stores.resolvedLocation.set(a.stores.location.get())),
            a.updateMatch(C.id, (B) => ({
              ...B,
              _displayPending: void 0,
              displayPendingPromise: void 0,
            })));
        });
      }));
  }
  return v;
}
var ju = rt.use,
  Jl = typeof window < "u" ? rt.useLayoutEffect : rt.useEffect;
function bc(a) {
  const l = rt.useRef({ value: a, prev: null }),
    r = l.current.value;
  return (a !== r && (l.current = { value: a, prev: r }), l.current.prev);
}
function VE(a, l, r = {}, o = {}) {
  rt.useEffect(() => {
    if (!a.current || o.disabled || typeof IntersectionObserver != "function") return;
    const c = new IntersectionObserver(([d]) => {
      l(d);
    }, r);
    return (
      c.observe(a.current),
      () => {
        c.disconnect();
      }
    );
  }, [l, r, o.disabled, a]);
}
function XE(a) {
  const l = rt.useRef(null);
  return (rt.useImperativeHandle(a, () => l.current, []), l);
}
function QE({ promise: a }) {
  if (ju) return ju(a);
  const l = H1(a);
  if (l[gn].status === "pending") throw l;
  if (l[gn].status === "error") throw l[gn].error;
  return l[gn].data;
}
function ZE(a) {
  const l = W.jsx(KE, { ...a });
  return a.fallback ? W.jsx(rt.Suspense, { fallback: a.fallback, children: l }) : l;
}
function KE(a) {
  const l = QE(a);
  return a.children(l);
}
function Xc(a) {
  const l = a.errorComponent ?? Qc;
  return W.jsx(IE, {
    getResetKey: a.getResetKey,
    onCatch: a.onCatch,
    children: ({ error: r, reset: o }) =>
      r ? rt.createElement(l, { error: r, reset: o }) : a.children,
  });
}
var IE = class extends rt.Component {
  constructor(...a) {
    (super(...a), (this.state = { error: null }));
  }
  static getDerivedStateFromProps(a, l) {
    const r = a.getResetKey();
    return l.error && l.resetKey !== r ? { resetKey: r, error: null } : { resetKey: r };
  }
  static getDerivedStateFromError(a) {
    return { error: a };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidCatch(a, l) {
    this.props.onCatch && this.props.onCatch(a, l);
  }
  render() {
    return this.props.children({
      error: this.state.error,
      reset: () => {
        this.reset();
      },
    });
  }
};
function Qc({ error: a }) {
  const [l, r] = rt.useState(!1);
  return W.jsxs("div", {
    style: { padding: ".5rem", maxWidth: "100%" },
    children: [
      W.jsxs("div", {
        style: { display: "flex", alignItems: "center", gap: ".5rem" },
        children: [
          W.jsx("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
          W.jsx("button", {
            style: {
              appearance: "none",
              fontSize: ".6em",
              border: "1px solid currentColor",
              padding: ".1rem .2rem",
              fontWeight: "bold",
              borderRadius: ".25rem",
            },
            onClick: () => r((o) => !o),
            children: l ? "Hide Error" : "Show Error",
          }),
        ],
      }),
      W.jsx("div", { style: { height: ".25rem" } }),
      l
        ? W.jsx("div", {
            children: W.jsx("pre", {
              style: {
                fontSize: ".7em",
                border: "1px solid red",
                borderRadius: ".25rem",
                padding: ".3rem",
                color: "red",
                overflow: "auto",
              },
              children: a.message ? W.jsx("code", { children: a.message }) : null,
            }),
          })
        : null,
    ],
  });
}
function FE({ children: a, fallback: l = null }) {
  return Zc() ? W.jsx(kl.Fragment, { children: a }) : W.jsx(kl.Fragment, { children: l });
}
function Zc() {
  return kl.useSyncExternalStore(
    PE,
    () => !0,
    () => !1,
  );
}
function PE() {
  return () => {};
}
var Zy = rt.createContext(null);
function xe(a) {
  return rt.useContext(Zy);
}
var Ku = rt.createContext(void 0),
  JE = rt.createContext(void 0),
  te = ((a) => (
    (a[(a.None = 0)] = "None"),
    (a[(a.Mutable = 1)] = "Mutable"),
    (a[(a.Watching = 2)] = "Watching"),
    (a[(a.RecursedCheck = 4)] = "RecursedCheck"),
    (a[(a.Recursed = 8)] = "Recursed"),
    (a[(a.Dirty = 16)] = "Dirty"),
    (a[(a.Pending = 32)] = "Pending"),
    a
  ))(te || {});
function kE({ update: a, notify: l, unwatched: r }) {
  return { link: o, unlink: c, propagate: d, checkDirty: y, shallowPropagate: h };
  function o(g, _, S) {
    const A = _.depsTail;
    if (A !== void 0 && A.dep === g) return;
    const x = A !== void 0 ? A.nextDep : _.deps;
    if (x !== void 0 && x.dep === g) {
      ((x.version = S), (_.depsTail = x));
      return;
    }
    const M = g.subsTail;
    if (M !== void 0 && M.version === S && M.sub === _) return;
    const D =
      (_.depsTail =
      g.subsTail =
        { version: S, dep: g, sub: _, prevDep: A, nextDep: x, prevSub: M, nextSub: void 0 });
    (x !== void 0 && (x.prevDep = D),
      A !== void 0 ? (A.nextDep = D) : (_.deps = D),
      M !== void 0 ? (M.nextSub = D) : (g.subs = D));
  }
  function c(g, _ = g.sub) {
    const S = g.dep,
      A = g.prevDep,
      x = g.nextDep,
      M = g.nextSub,
      D = g.prevSub;
    return (
      x !== void 0 ? (x.prevDep = A) : (_.depsTail = A),
      A !== void 0 ? (A.nextDep = x) : (_.deps = x),
      M !== void 0 ? (M.prevSub = D) : (S.subsTail = D),
      D !== void 0 ? (D.nextSub = M) : (S.subs = M) === void 0 && r(S),
      x
    );
  }
  function d(g) {
    let _ = g.nextSub,
      S;
    t: do {
      const A = g.sub;
      let x = A.flags;
      if (
        (x & 60
          ? x & 12
            ? x & 4
              ? !(x & 48) && v(g, A)
                ? ((A.flags = x | 40), (x &= 1))
                : (x = 0)
              : (A.flags = (x & -9) | 32)
            : (x = 0)
          : (A.flags = x | 32),
        x & 2 && l(A),
        x & 1)
      ) {
        const M = A.subs;
        if (M !== void 0) {
          const D = (g = M).nextSub;
          D !== void 0 && ((S = { value: _, prev: S }), (_ = D));
          continue;
        }
      }
      if ((g = _) !== void 0) {
        _ = g.nextSub;
        continue;
      }
      for (; S !== void 0; )
        if (((g = S.value), (S = S.prev), g !== void 0)) {
          _ = g.nextSub;
          continue t;
        }
      break;
    } while (!0);
  }
  function y(g, _) {
    let S,
      A = 0,
      x = !1;
    t: do {
      const M = g.dep,
        D = M.flags;
      if (_.flags & 16) x = !0;
      else if ((D & 17) === 17) {
        if (a(M)) {
          const C = M.subs;
          (C.nextSub !== void 0 && h(C), (x = !0));
        }
      } else if ((D & 33) === 33) {
        ((g.nextSub !== void 0 || g.prevSub !== void 0) && (S = { value: g, prev: S }),
          (g = M.deps),
          (_ = M),
          ++A);
        continue;
      }
      if (!x) {
        const C = g.nextDep;
        if (C !== void 0) {
          g = C;
          continue;
        }
      }
      for (; A--; ) {
        const C = _.subs,
          B = C.nextSub !== void 0;
        if ((B ? ((g = S.value), (S = S.prev)) : (g = C), x)) {
          if (a(_)) {
            (B && h(C), (_ = g.sub));
            continue;
          }
          x = !1;
        } else _.flags &= -33;
        _ = g.sub;
        const q = g.nextDep;
        if (q !== void 0) {
          g = q;
          continue t;
        }
      }
      return x;
    } while (!0);
  }
  function h(g) {
    do {
      const _ = g.sub,
        S = _.flags;
      (S & 48) === 32 && ((_.flags = S | 16), (S & 6) === 2 && l(_));
    } while ((g = g.nextSub) !== void 0);
  }
  function v(g, _) {
    let S = _.depsTail;
    for (; S !== void 0; ) {
      if (S === g) return !0;
      S = S.prevDep;
    }
    return !1;
  }
}
function $E(a, l, r) {
  const o = typeof a == "object",
    c = o ? a : void 0;
  return {
    next: (o ? a.next : a)?.bind(c),
    error: (o ? a.error : l)?.bind(c),
    complete: (o ? a.complete : r)?.bind(c),
  };
}
const Uc = [];
let zu = 0;
const {
  link: Bm,
  unlink: WE,
  propagate: t_,
  checkDirty: Ky,
  shallowPropagate: Um,
} = kE({
  update(a) {
    return a._update();
  },
  notify(a) {
    ((Uc[Dc++] = a), (a.flags &= ~te.Watching));
  },
  unwatched(a) {
    a.depsTail !== void 0 && ((a.depsTail = void 0), (a.flags = te.Mutable | te.Dirty), Hu(a));
  },
});
let xu = 0,
  Dc = 0,
  yn,
  Lc = 0;
function Iy(a) {
  try {
    (++Lc, a());
  } finally {
    --Lc || Fy();
  }
}
function Hu(a) {
  const l = a.depsTail;
  let r = l !== void 0 ? l.nextDep : a.deps;
  for (; r !== void 0; ) r = WE(r, a);
}
function Fy() {
  if (!(Lc > 0)) {
    for (; xu < Dc; ) {
      const a = Uc[xu];
      ((Uc[xu++] = void 0), a.notify());
    }
    ((xu = 0), (Dc = 0));
  }
}
function Dm(a, l) {
  const r = typeof a == "function",
    o = a,
    c = {
      _snapshot: r ? void 0 : a,
      subs: void 0,
      subsTail: void 0,
      deps: void 0,
      depsTail: void 0,
      flags: r ? te.None : te.Mutable,
      get() {
        return (yn !== void 0 && Bm(c, yn, zu), c._snapshot);
      },
      subscribe(d) {
        const y = $E(d),
          h = { current: !1 },
          v = e_(() => {
            (c.get(), h.current ? y.next?.(c._snapshot) : (h.current = !0));
          });
        return {
          unsubscribe: () => {
            v.stop();
          },
        };
      },
      _update(d) {
        const y = yn,
          h = l?.compare ?? Object.is;
        if (r) ((yn = c), ++zu, (c.depsTail = void 0));
        else if (d === void 0) return !1;
        r && (c.flags = te.Mutable | te.RecursedCheck);
        try {
          const v = c._snapshot,
            g = typeof d == "function" ? d(v) : d === void 0 && r ? o(v) : d;
          return v === void 0 || !h(v, g) ? ((c._snapshot = g), !0) : !1;
        } finally {
          ((yn = y), r && (c.flags &= ~te.RecursedCheck), Hu(c));
        }
      },
    };
  return (
    r
      ? ((c.flags = te.Mutable | te.Dirty),
        (c.get = function () {
          const d = c.flags;
          if (d & te.Dirty || (d & te.Pending && Ky(c.deps, c))) {
            if (c._update()) {
              const y = c.subs;
              y !== void 0 && Um(y);
            }
          } else d & te.Pending && (c.flags = d & ~te.Pending);
          return (yn !== void 0 && Bm(c, yn, zu), c._snapshot);
        }))
      : (c.set = function (d) {
          if (c._update(d)) {
            const y = c.subs;
            y !== void 0 && (t_(y), Um(y), Fy());
          }
        }),
    c
  );
}
function e_(a) {
  const l = () => {
      const o = yn;
      ((yn = r), ++zu, (r.depsTail = void 0), (r.flags = te.Watching | te.RecursedCheck));
      try {
        return a();
      } finally {
        ((yn = o), (r.flags &= ~te.RecursedCheck), Hu(r));
      }
    },
    r = {
      deps: void 0,
      depsTail: void 0,
      subs: void 0,
      subsTail: void 0,
      flags: te.Watching | te.RecursedCheck,
      notify() {
        const o = this.flags;
        o & te.Dirty || (o & te.Pending && Ky(this.deps, this)) ? l() : (this.flags = te.Watching);
      },
      stop() {
        ((this.flags = te.None), (this.depsTail = void 0), Hu(this));
      },
    };
  return (l(), r);
}
var Ec = { exports: {} },
  _c = {},
  xc = { exports: {} },
  Ac = {};
var Lm;
function n_() {
  if (Lm) return Ac;
  Lm = 1;
  var a = ar();
  function l(S, A) {
    return (S === A && (S !== 0 || 1 / S === 1 / A)) || (S !== S && A !== A);
  }
  var r = typeof Object.is == "function" ? Object.is : l,
    o = a.useState,
    c = a.useEffect,
    d = a.useLayoutEffect,
    y = a.useDebugValue;
  function h(S, A) {
    var x = A(),
      M = o({ inst: { value: x, getSnapshot: A } }),
      D = M[0].inst,
      C = M[1];
    return (
      d(
        function () {
          ((D.value = x), (D.getSnapshot = A), v(D) && C({ inst: D }));
        },
        [S, x, A],
      ),
      c(
        function () {
          return (
            v(D) && C({ inst: D }),
            S(function () {
              v(D) && C({ inst: D });
            })
          );
        },
        [S],
      ),
      y(x),
      x
    );
  }
  function v(S) {
    var A = S.getSnapshot;
    S = S.value;
    try {
      var x = A();
      return !r(S, x);
    } catch {
      return !0;
    }
  }
  function g(S, A) {
    return A();
  }
  var _ =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? g
      : h;
  return (
    (Ac.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : _),
    Ac
  );
}
var Nm;
function a_() {
  return (Nm || ((Nm = 1), (xc.exports = n_())), xc.exports);
}
var jm;
function i_() {
  if (jm) return _c;
  jm = 1;
  var a = ar(),
    l = a_();
  function r(g, _) {
    return (g === _ && (g !== 0 || 1 / g === 1 / _)) || (g !== g && _ !== _);
  }
  var o = typeof Object.is == "function" ? Object.is : r,
    c = l.useSyncExternalStore,
    d = a.useRef,
    y = a.useEffect,
    h = a.useMemo,
    v = a.useDebugValue;
  return (
    (_c.useSyncExternalStoreWithSelector = function (g, _, S, A, x) {
      var M = d(null);
      if (M.current === null) {
        var D = { hasValue: !1, value: null };
        M.current = D;
      } else D = M.current;
      M = h(
        function () {
          function B(nt) {
            if (!q) {
              if (((q = !0), (Q = nt), (nt = A(nt)), x !== void 0 && D.hasValue)) {
                var F = D.value;
                if (x(F, nt)) return (V = F);
              }
              return (V = nt);
            }
            if (((F = V), o(Q, nt))) return F;
            var et = A(nt);
            return x !== void 0 && x(F, et) ? ((Q = nt), F) : ((Q = nt), (V = et));
          }
          var q = !1,
            Q,
            V,
            $ = S === void 0 ? null : S;
          return [
            function () {
              return B(_());
            },
            $ === null
              ? void 0
              : function () {
                  return B($());
                },
          ];
        },
        [_, S, A, x],
      );
      var C = c(g, M[0], M[1]);
      return (
        y(
          function () {
            ((D.hasValue = !0), (D.value = C));
          },
          [C],
        ),
        v(C),
        C
      );
    }),
    _c
  );
}
var Hm;
function l_() {
  return (Hm || ((Hm = 1), (Ec.exports = i_())), Ec.exports);
}
var r_ = l_();
function u_(a, l) {
  return a === l;
}
function se(a, l, r = u_) {
  const o = rt.useCallback(
      (y) => {
        if (!a) return () => {};
        const { unsubscribe: h } = a.subscribe(y);
        return h;
      },
      [a],
    ),
    c = rt.useCallback(() => a?.get(), [a]);
  return r_.useSyncExternalStoreWithSelector(o, c, c, l, r);
}
var o_ = { get: () => {}, subscribe: () => ({ unsubscribe: () => {} }) };
function ni(a) {
  const l = xe(),
    r = rt.useContext(a.from ? JE : Ku),
    o = a.from ?? r,
    c = o ? (a.from ? l.stores.getRouteMatchStore(o) : l.stores.matchStores.get(o)) : void 0,
    d = rt.useRef(void 0);
  return se(c ?? o_, (y) => {
    if (((a.shouldThrow ?? !0) && !y && He(), y === void 0)) return;
    const h = a.select ? a.select(y) : y;
    if (a.structuralSharing ?? l.options.defaultStructuralSharing) {
      const v = Fa(d.current, h);
      return ((d.current = v), v);
    }
    return h;
  });
}
function Py(a) {
  return ni({
    from: a.from,
    strict: a.strict,
    structuralSharing: a.structuralSharing,
    select: (l) => (a.select ? a.select(l.loaderData) : l.loaderData),
  });
}
function Jy(a) {
  const { select: l, ...r } = a;
  return ni({ ...r, select: (o) => (l ? l(o.loaderDeps) : o.loaderDeps) });
}
function ky(a) {
  return ni({
    from: a.from,
    shouldThrow: a.shouldThrow,
    structuralSharing: a.structuralSharing,
    strict: a.strict,
    select: (l) => {
      const r = a.strict === !1 ? l.params : l._strictParams;
      return a.select ? a.select(r) : r;
    },
  });
}
function $y(a) {
  return ni({
    from: a.from,
    strict: a.strict,
    shouldThrow: a.shouldThrow,
    structuralSharing: a.structuralSharing,
    select: (l) => (a.select ? a.select(l.search) : l.search),
  });
}
function Wy(a) {
  const l = xe();
  return rt.useCallback((r) => l.navigate({ ...r, from: r.from ?? a?.from }), [a?.from, l]);
}
function t0(a) {
  return ni({ ...a, select: (l) => (a.select ? a.select(l.context) : l.context) });
}
var s_ = Pm();
function c_(a, l) {
  const r = xe(),
    o = XE(l),
    {
      activeProps: c,
      inactiveProps: d,
      activeOptions: y,
      to: h,
      preload: v,
      preloadDelay: g,
      preloadIntentProximity: _,
      hashScrollIntoView: S,
      replace: A,
      startTransition: x,
      resetScroll: M,
      viewTransition: D,
      children: C,
      target: B,
      disabled: q,
      style: Q,
      className: V,
      onClick: $,
      onBlur: nt,
      onFocus: F,
      onMouseEnter: et,
      onMouseLeave: it,
      onTouchStart: ht,
      ignoreBlocker: ot,
      params: St,
      search: _t,
      hash: Pt,
      state: Nt,
      mask: Z,
      reloadDocument: tt,
      unsafeRelative: ft,
      from: zt,
      _fromLocation: Bt,
      ...z
    } = a,
    K = Zc(),
    at = rt.useMemo(
      () => a,
      [
        r,
        a.from,
        a._fromLocation,
        a.hash,
        a.to,
        a.search,
        a.params,
        a.state,
        a.mask,
        a.unsafeRelative,
      ],
    ),
    lt = se(
      r.stores.location,
      (Mt) => Mt,
      (Mt, ce) => Mt.href === ce.href,
    ),
    st = rt.useMemo(() => {
      const Mt = { _fromLocation: lt, ...at };
      return r.buildLocation(Mt);
    }, [r, lt, at]),
    gt = st.maskedLocation ? st.maskedLocation.publicHref : st.publicHref,
    wt = st.maskedLocation ? st.maskedLocation.external : st.external,
    Xt = rt.useMemo(() => y_(gt, wt, r.history, q), [q, wt, gt, r.history]),
    jt = rt.useMemo(() => {
      if (Xt?.external) return Bu(Xt.href, r.protocolAllowlist) ? void 0 : Xt.href;
      if (!g_(h) && !(typeof h != "string" || h.indexOf(":") === -1))
        try {
          return (new URL(h), Bu(h, r.protocolAllowlist) ? void 0 : h);
        } catch {}
    }, [h, Xt, r.protocolAllowlist]),
    Ke = rt.useMemo(() => {
      if (jt) return !1;
      if (y?.exact) {
        if (!a1(lt.pathname, st.pathname, r.basepath)) return !1;
      } else {
        const Mt = Uu(lt.pathname, r.basepath),
          ce = Uu(st.pathname, r.basepath);
        if (!(Mt.startsWith(ce) && (Mt.length === ce.length || Mt[ce.length] === "/"))) return !1;
      }
      return (y?.includeSearch ?? !0) &&
        !Ne(lt.search, st.search, { partial: !y?.exact, ignoreUndefined: !y?.explicitUndefined })
        ? !1
        : y?.includeHash
          ? K && lt.hash === st.hash
          : !0;
    }, [
      y?.exact,
      y?.explicitUndefined,
      y?.includeHash,
      y?.includeSearch,
      lt,
      jt,
      K,
      st.hash,
      st.pathname,
      st.search,
      r.basepath,
    ]),
    ln = Ke ? (ya(c, {}) ?? f_) : wc,
    rn = Ke ? wc : (ya(d, {}) ?? wc),
    Ie = [V, ln.className, rn.className].filter(Boolean).join(" "),
    Ae = (Q || ln.style || rn.style) && { ...Q, ...ln.style, ...rn.style },
    [Ta, Vn] = rt.useState(!1),
    Xn = rt.useRef(!1),
    un = a.reloadDocument || jt ? !1 : (v ?? r.options.defaultPreload),
    vn = g ?? r.options.defaultPreloadDelay ?? 0,
    Me = rt.useCallback(() => {
      r.preloadRoute({ ...at, _builtLocation: st }).catch((Mt) => {
        (console.warn(Mt), console.warn(q1));
      });
    }, [r, at, st]);
  (VE(
    o,
    rt.useCallback(
      (Mt) => {
        Mt?.isIntersecting && Me();
      },
      [Me],
    ),
    m_,
    { disabled: !!q || un !== "viewport" },
  ),
    rt.useEffect(() => {
      Xn.current || (!q && un === "render" && (Me(), (Xn.current = !0)));
    }, [q, Me, un]));
  const fn = (Mt) => {
    const ce = Mt.currentTarget.getAttribute("target"),
      b = B !== void 0 ? B : ce;
    if (!q && !v_(Mt) && !Mt.defaultPrevented && (!b || b === "_self") && Mt.button === 0) {
      (Mt.preventDefault(),
        s_.flushSync(() => {
          Vn(!0);
        }));
      const f = r.subscribe("onResolved", () => {
        (f(), Vn(!1));
      });
      r.navigate({
        ...at,
        replace: A,
        resetScroll: M,
        hashScrollIntoView: S,
        startTransition: x,
        viewTransition: D,
        ignoreBlocker: ot,
      });
    }
  };
  if (jt)
    return {
      ...z,
      ref: o,
      href: jt,
      ...(C && { children: C }),
      ...(B && { target: B }),
      ...(q && { disabled: q }),
      ...(Q && { style: Q }),
      ...(V && { className: V }),
      ...($ && { onClick: $ }),
      ...(nt && { onBlur: nt }),
      ...(F && { onFocus: F }),
      ...(et && { onMouseEnter: et }),
      ...(it && { onMouseLeave: it }),
      ...(ht && { onTouchStart: ht }),
    };
  const Re = (Mt) => {
      if (q || un !== "intent") return;
      if (!vn) {
        Me();
        return;
      }
      const ce = Mt.currentTarget;
      if (Fl.has(ce)) return;
      const b = setTimeout(() => {
        (Fl.delete(ce), Me());
      }, vn);
      Fl.set(ce, b);
    },
    Ma = (Mt) => {
      q || un !== "intent" || Me();
    },
    pe = (Mt) => {
      if (q || !un || !vn) return;
      const ce = Mt.currentTarget,
        b = Fl.get(ce);
      b && (clearTimeout(b), Fl.delete(ce));
    };
  return {
    ...z,
    ...ln,
    ...rn,
    href: Xt?.href,
    ref: o,
    onClick: Gi([$, fn]),
    onBlur: Gi([nt, pe]),
    onFocus: Gi([F, Re]),
    onMouseEnter: Gi([et, Re]),
    onMouseLeave: Gi([it, pe]),
    onTouchStart: Gi([ht, Ma]),
    disabled: !!q,
    target: B,
    ...(Ae && { style: Ae }),
    ...(Ie && { className: Ie }),
    ...(q && d_),
    ...(Ke && h_),
    ...(K && Ta && p_),
  };
}
var wc = {},
  f_ = { className: "active" },
  d_ = { role: "link", "aria-disabled": !0 },
  h_ = { "data-status": "active", "aria-current": "page" },
  p_ = { "data-transitioning": "transitioning" },
  Fl = new WeakMap(),
  m_ = { rootMargin: "100px" },
  Gi = (a) => (l) => {
    for (const r of a)
      if (r) {
        if (l.defaultPrevented) return;
        r(l);
      }
  };
function y_(a, l, r, o) {
  if (!o) return l ? { href: a, external: !0 } : { href: r.createHref(a) || "/", external: !1 };
}
function g_(a) {
  if (typeof a != "string") return !1;
  const l = a.charCodeAt(0);
  return l === 47 ? a.charCodeAt(1) !== 47 : l === 46;
}
var Kc = rt.forwardRef((a, l) => {
  const { _asChild: r, ...o } = a,
    { type: c, ...d } = c_(o, l),
    y =
      typeof o.children == "function"
        ? o.children({ isActive: d["data-status"] === "active" })
        : o.children;
  if (!r) {
    const { disabled: h, ...v } = d;
    return rt.createElement("a", v, y);
  }
  return rt.createElement(r, d, y);
});
function v_(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
var S_ = class extends sy {
  constructor(l) {
    (super(l),
      (this.useMatch = (r) =>
        ni({ select: r?.select, from: this.id, structuralSharing: r?.structuralSharing })),
      (this.useRouteContext = (r) => t0({ ...r, from: this.id })),
      (this.useSearch = (r) =>
        $y({ select: r?.select, structuralSharing: r?.structuralSharing, from: this.id })),
      (this.useParams = (r) =>
        ky({ select: r?.select, structuralSharing: r?.structuralSharing, from: this.id })),
      (this.useLoaderDeps = (r) => Jy({ ...r, from: this.id })),
      (this.useLoaderData = (r) => Py({ ...r, from: this.id })),
      (this.useNavigate = () => Wy({ from: this.fullPath })),
      (this.Link = kl.forwardRef((r, o) => W.jsx(Kc, { ref: o, from: this.fullPath, ...r }))));
  }
};
function b_(a) {
  return new S_(a);
}
var E_ = class extends G1 {
  constructor(a) {
    (super(a),
      (this.useMatch = (l) =>
        ni({ select: l?.select, from: this.id, structuralSharing: l?.structuralSharing })),
      (this.useRouteContext = (l) => t0({ ...l, from: this.id })),
      (this.useSearch = (l) =>
        $y({ select: l?.select, structuralSharing: l?.structuralSharing, from: this.id })),
      (this.useParams = (l) =>
        ky({ select: l?.select, structuralSharing: l?.structuralSharing, from: this.id })),
      (this.useLoaderDeps = (l) => Jy({ ...l, from: this.id })),
      (this.useLoaderData = (l) => Py({ ...l, from: this.id })),
      (this.useNavigate = () => Wy({ from: this.fullPath })),
      (this.Link = kl.forwardRef((l, r) => W.jsx(Kc, { ref: r, from: this.fullPath, ...l }))));
  }
};
function __(a) {
  return new E_(a);
}
function Aa(a) {
  return new x_(a, { silent: !0 }).createRoute;
}
var x_ = class {
  constructor(a, l) {
    ((this.path = a),
      (this.createRoute = (r) => {
        const o = b_(r);
        return ((o.isRoot = !1), o);
      }),
      (this.silent = l?.silent));
  }
};
function wa(a, l) {
  let r, o, c, d;
  const y = () => (
      r ||
        (r = a()
          .then((v) => {
            ((r = void 0), (o = v[l]));
          })
          .catch((v) => {
            if (
              ((c = v),
              qv(c) && c instanceof Error && typeof window < "u" && typeof sessionStorage < "u")
            ) {
              const g = `tanstack_router_reload:${c.message}`;
              sessionStorage.getItem(g) || (sessionStorage.setItem(g, "1"), (d = !0));
            }
          })),
      r
    ),
    h = function (g) {
      if (d) throw (window.location.reload(), new Promise(() => {}));
      if (c) throw c;
      if (!o)
        if (ju) ju(y());
        else throw y();
      return rt.createElement(o, g);
    };
  return ((h.preload = y), h);
}
function A_(a) {
  const l = xe(),
    r = `not-found-${se(l.stores.location, (o) => o.pathname)}-${se(l.stores.status, (o) => o)}`;
  return W.jsx(Xc, {
    getResetKey: () => r,
    onCatch: (o, c) => {
      if (ge(o)) a.onCatch?.(o, c);
      else throw o;
    },
    errorComponent: ({ error: o }) => {
      if (ge(o)) return a.fallback?.(o);
      throw o;
    },
    children: a.children,
  });
}
function w_() {
  return W.jsx("p", { children: "Not Found" });
}
function Xi(a) {
  return W.jsx(W.Fragment, { children: a.children });
}
function e0(a, l, r) {
  return l.options.notFoundComponent
    ? W.jsx(l.options.notFoundComponent, { ...r })
    : a.options.defaultNotFoundComponent
      ? W.jsx(a.options.defaultNotFoundComponent, { ...r })
      : W.jsx(w_, {});
}
function R_(a) {
  return null;
}
function T_() {
  return (R_(xe()), null);
}
var n0 = rt.memo(function ({ matchId: l }) {
  const r = xe(),
    o = r.stores.matchStores.get(l);
  o || He();
  const c = se(r.stores.loadedAt, (y) => y),
    d = se(o, (y) => y);
  return W.jsx(M_, {
    router: r,
    matchId: l,
    resetKey: c,
    matchState: rt.useMemo(() => {
      const y = d.routeId,
        h = r.routesById[y].parentRoute?.id;
      return { routeId: y, ssr: d.ssr, _displayPending: d._displayPending, parentRouteId: h };
    }, [d._displayPending, d.routeId, d.ssr, r.routesById]),
  });
});
function M_({ router: a, matchId: l, resetKey: r, matchState: o }) {
  const c = a.routesById[o.routeId],
    d = c.options.pendingComponent ?? a.options.defaultPendingComponent,
    y = d ? W.jsx(d, {}) : null,
    h = c.options.errorComponent ?? a.options.defaultErrorComponent,
    v = c.options.onCatch ?? a.options.defaultOnCatch,
    g = c.isRoot
      ? (c.options.notFoundComponent ?? a.options.notFoundRoute?.options.component)
      : c.options.notFoundComponent,
    _ = o.ssr === !1 || o.ssr === "data-only",
    S =
      (!c.isRoot || c.options.wrapInSuspense || _) &&
      (c.options.wrapInSuspense ?? d ?? (c.options.errorComponent?.preload || _))
        ? rt.Suspense
        : Xi,
    A = h ? Xc : Xi,
    x = g ? A_ : Xi;
  return W.jsxs(c.isRoot ? (c.options.shellComponent ?? Xi) : Xi, {
    children: [
      W.jsx(Ku.Provider, {
        value: l,
        children: W.jsx(S, {
          fallback: y,
          children: W.jsx(A, {
            getResetKey: () => r,
            errorComponent: h || Qc,
            onCatch: (M, D) => {
              if (ge(M)) throw ((M.routeId ??= o.routeId), M);
              v?.(M, D);
            },
            children: W.jsx(x, {
              fallback: (M) => {
                if (
                  ((M.routeId ??= o.routeId),
                  !g || (M.routeId && M.routeId !== o.routeId) || (!M.routeId && !c.isRoot))
                )
                  throw M;
                return rt.createElement(g, M);
              },
              children:
                _ || o._displayPending
                  ? W.jsx(FE, { fallback: y, children: W.jsx(qm, { matchId: l }) })
                  : W.jsx(qm, { matchId: l }),
            }),
          }),
        }),
      }),
      o.parentRouteId === $a
        ? W.jsxs(W.Fragment, {
            children: [
              W.jsx(C_, { resetKey: r }),
              a.options.scrollRestoration && km ? W.jsx(T_, {}) : null,
            ],
          })
        : null,
    ],
  });
}
function C_({ resetKey: a }) {
  const l = xe(),
    r = rt.useRef(void 0);
  return (
    Jl(() => {
      const o = l.latestLocation.href;
      (r.current === void 0 || r.current !== o) &&
        (l.emit({
          type: "onRendered",
          ...Zi(l.stores.location.get(), l.stores.resolvedLocation.get()),
        }),
        (r.current = o));
    }, [l.latestLocation.state.__TSR_key, a, l]),
    null
  );
}
var qm = rt.memo(function ({ matchId: l }) {
    const r = xe(),
      o = (_, S) => r.getMatch(_.id)?._nonReactive[S] ?? _._nonReactive[S],
      c = r.stores.matchStores.get(l);
    c || He();
    const d = se(c, (_) => _),
      y = d.routeId,
      h = r.routesById[y],
      v = rt.useMemo(() => {
        const _ = (r.routesById[y].options.remountDeps ?? r.options.defaultRemountDeps)?.({
          routeId: y,
          loaderDeps: d.loaderDeps,
          params: d._strictParams,
          search: d._strictSearch,
        });
        return _ ? JSON.stringify(_) : void 0;
      }, [
        y,
        d.loaderDeps,
        d._strictParams,
        d._strictSearch,
        r.options.defaultRemountDeps,
        r.routesById,
      ]),
      g = rt.useMemo(() => {
        const _ = h.options.component ?? r.options.defaultComponent;
        return _ ? W.jsx(_, {}, v) : W.jsx(a0, {});
      }, [v, h.options.component, r.options.defaultComponent]);
    if (d._displayPending) throw o(d, "displayPendingPromise");
    if (d._forcePending) throw o(d, "minPendingPromise");
    if (d.status === "pending") {
      const _ = h.options.pendingMinMs ?? r.options.defaultPendingMinMs;
      if (_) {
        const S = r.getMatch(d.id);
        if (S && !S._nonReactive.minPendingPromise) {
          const A = ti();
          ((S._nonReactive.minPendingPromise = A),
            setTimeout(() => {
              (A.resolve(), (S._nonReactive.minPendingPromise = void 0));
            }, _));
        }
      }
      throw o(d, "loadPromise");
    }
    if (d.status === "notFound") return (ge(d.error) || He(), e0(r, h, d.error));
    if (d.status === "redirected") throw (je(d.error) || He(), o(d, "loadPromise"));
    if (d.status === "error") throw d.error;
    return g;
  }),
  a0 = rt.memo(function () {
    const l = xe(),
      r = rt.useContext(Ku);
    let o,
      c = !1,
      d;
    {
      const g = r ? l.stores.matchStores.get(r) : void 0;
      (([o, c] = se(g, (_) => [_?.routeId, _?.globalNotFound ?? !1])),
        (d = se(l.stores.matchesId, (_) => _[_.findIndex((S) => S === r) + 1])));
    }
    const y = o ? l.routesById[o] : void 0,
      h = l.options.defaultPendingComponent ? W.jsx(l.options.defaultPendingComponent, {}) : null;
    if (c) return (y || He(), e0(l, y, void 0));
    if (!d) return null;
    const v = W.jsx(n0, { matchId: d });
    return o === $a ? W.jsx(rt.Suspense, { fallback: h, children: v }) : v;
  });
function O_() {
  const a = xe(),
    l = rt.useRef({ router: a, mounted: !1 }),
    [r, o] = rt.useState(!1),
    c = se(a.stores.isLoading, (S) => S),
    d = se(a.stores.hasPending, (S) => S),
    y = bc(c),
    h = c || r || d,
    v = bc(h),
    g = c || d,
    _ = bc(g);
  return (
    (a.startTransition = (S) => {
      (o(!0),
        rt.startTransition(() => {
          (S(), o(!1));
        }));
    }),
    rt.useEffect(() => {
      const S = a.history.subscribe(a.load),
        A = a.buildLocation({
          to: a.latestLocation.pathname,
          search: !0,
          params: !0,
          hash: !0,
          state: !0,
          _includeValidateSearch: !0,
        });
      return (
        va(a.latestLocation.publicHref) !== va(A.publicHref) &&
          a.commitLocation({ ...A, replace: !0 }),
        () => {
          S();
        }
      );
    }, [a, a.history]),
    Jl(() => {
      if ((typeof window < "u" && a.ssr) || (l.current.router === a && l.current.mounted)) return;
      ((l.current = { router: a, mounted: !0 }),
        (async () => {
          try {
            await a.load();
          } catch (A) {
            console.error(A);
          }
        })());
    }, [a]),
    Jl(() => {
      y &&
        !c &&
        a.emit({ type: "onLoad", ...Zi(a.stores.location.get(), a.stores.resolvedLocation.get()) });
    }, [y, a, c]),
    Jl(() => {
      _ &&
        !g &&
        a.emit({
          type: "onBeforeRouteMount",
          ...Zi(a.stores.location.get(), a.stores.resolvedLocation.get()),
        });
    }, [g, _, a]),
    Jl(() => {
      if (v && !h) {
        const S = Zi(a.stores.location.get(), a.stores.resolvedLocation.get());
        (a.emit({ type: "onResolved", ...S }),
          Iy(() => {
            (a.stores.status.set("idle"), a.stores.resolvedLocation.set(a.stores.location.get()));
          }),
          S.hrefChanged && V1(a));
      }
    }, [h, v, a]),
    null
  );
}
function z_() {
  const a = xe(),
    l = a.routesById[$a].options.pendingComponent ?? a.options.defaultPendingComponent,
    r = l ? W.jsx(l, {}) : null,
    o = W.jsxs(typeof document < "u" && a.ssr ? Xi : rt.Suspense, {
      fallback: r,
      children: [W.jsx(O_, {}), W.jsx(B_, {})],
    });
  return a.options.InnerWrap ? W.jsx(a.options.InnerWrap, { children: o }) : o;
}
function B_() {
  const a = xe(),
    l = se(a.stores.firstId, (c) => c),
    r = se(a.stores.loadedAt, (c) => c),
    o = l ? W.jsx(n0, { matchId: l }) : null;
  return W.jsx(Ku.Provider, {
    value: l,
    children: a.options.disableGlobalCatchBoundary
      ? o
      : W.jsx(Xc, { getResetKey: () => r, errorComponent: Qc, onCatch: void 0, children: o }),
  });
}
var U_ = (a) => ({ createMutableStore: Dm, createReadonlyStore: Dm, batch: Iy }),
  D_ = (a) => new L_(a),
  L_ = class extends z1 {
    constructor(a) {
      super(a, U_);
    }
  };
function N_({ router: a, children: l, ...r }) {
  Object.keys(r).length > 0 &&
    a.update({ ...a.options, ...r, context: { ...a.options.context, ...r.context } });
  const o = W.jsx(Zy.Provider, { value: a, children: l });
  return a.options.Wrap ? W.jsx(a.options.Wrap, { children: o }) : o;
}
function j_({ router: a, ...l }) {
  return W.jsx(N_, { router: a, ...l, children: W.jsx(z_, {}) });
}
function i0({ tag: a, attrs: l, children: r, nonce: o }) {
  switch (a) {
    case "title":
      return W.jsx("title", { ...l, suppressHydrationWarning: !0, children: r });
    case "meta":
      return W.jsx("meta", { ...l, suppressHydrationWarning: !0 });
    case "link":
      return W.jsx("link", { ...l, nonce: o, suppressHydrationWarning: !0 });
    case "style":
      return W.jsx("style", { ...l, dangerouslySetInnerHTML: { __html: r }, nonce: o });
    case "script":
      return W.jsx(H_, { attrs: l, children: r });
    default:
      return null;
  }
}
function H_({ attrs: a, children: l }) {
  xe();
  const r = Zc(),
    o =
      typeof a?.type == "string" &&
      a.type !== "" &&
      a.type !== "text/javascript" &&
      a.type !== "module";
  if (
    (rt.useEffect(() => {
      if (!o) {
        if (a?.src) {
          const c = (() => {
            try {
              const y = document.baseURI || window.location.href;
              return new URL(a.src, y).href;
            } catch {
              return a.src;
            }
          })();
          if (Array.from(document.querySelectorAll("script[src]")).find((y) => y.src === c)) return;
          const d = document.createElement("script");
          for (const [y, h] of Object.entries(a))
            y !== "suppressHydrationWarning" &&
              h !== void 0 &&
              h !== !1 &&
              d.setAttribute(y, typeof h == "boolean" ? "" : String(h));
          return (
            document.head.appendChild(d),
            () => {
              d.parentNode && d.parentNode.removeChild(d);
            }
          );
        }
        if (typeof l == "string") {
          const c = typeof a?.type == "string" ? a.type : "text/javascript",
            d = typeof a?.nonce == "string" ? a.nonce : void 0;
          if (
            Array.from(document.querySelectorAll("script:not([src])")).find((h) => {
              if (!(h instanceof HTMLScriptElement)) return !1;
              const v = h.getAttribute("type") ?? "text/javascript",
                g = h.getAttribute("nonce") ?? void 0;
              return h.textContent === l && v === c && g === d;
            })
          )
            return;
          const y = document.createElement("script");
          if (((y.textContent = l), a))
            for (const [h, v] of Object.entries(a))
              h !== "suppressHydrationWarning" &&
                v !== void 0 &&
                v !== !1 &&
                y.setAttribute(h, typeof v == "boolean" ? "" : String(v));
          return (
            document.head.appendChild(y),
            () => {
              y.parentNode && y.parentNode.removeChild(y);
            }
          );
        }
      }
    }, [a, l, o]),
    o && typeof l == "string")
  )
    return W.jsx("script", {
      ...a,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: { __html: l },
    });
  if (!r) {
    if (a?.src) return W.jsx("script", { ...a, suppressHydrationWarning: !0 });
    if (typeof l == "string")
      return W.jsx("script", {
        ...a,
        dangerouslySetInnerHTML: { __html: l },
        suppressHydrationWarning: !0,
      });
  }
  return null;
}
var q_ = (a) => {
  const l = xe(),
    r = l.options.ssr?.nonce,
    o = se(l.stores.matches, (g) => g.map((_) => _.meta).filter(Boolean), Ne),
    c = rt.useMemo(() => {
      const g = [],
        _ = {};
      let S;
      for (let A = o.length - 1; A >= 0; A--) {
        const x = o[A];
        for (let M = x.length - 1; M >= 0; M--) {
          const D = x[M];
          if (D)
            if (D.title) S || (S = { tag: "title", children: D.title });
            else if ("script:ld+json" in D)
              try {
                const C = JSON.stringify(D["script:ld+json"]);
                g.push({ tag: "script", attrs: { type: "application/ld+json" }, children: Qv(C) });
              } catch {}
            else {
              const C = D.name ?? D.property;
              if (C) {
                if (_[C]) continue;
                _[C] = !0;
              }
              g.push({ tag: "meta", attrs: { ...D, nonce: r } });
            }
        }
      }
      return (
        S && g.push(S),
        r && g.push({ tag: "meta", attrs: { property: "csp-nonce", content: r } }),
        g.reverse(),
        g
      );
    }, [o, r]),
    d = se(
      l.stores.matches,
      (g) => {
        const _ = g
            .map((x) => x.links)
            .filter(Boolean)
            .flat(1)
            .map((x) => ({ tag: "link", attrs: { ...x, nonce: r } })),
          S = l.ssr?.manifest,
          A = g
            .map((x) => S?.routes[x.routeId]?.assets ?? [])
            .filter(Boolean)
            .flat(1)
            .filter((x) => x.tag === "link")
            .map((x) => ({
              tag: "link",
              attrs: {
                ...x.attrs,
                crossOrigin: vm(a, "stylesheet") ?? x.attrs?.crossOrigin,
                suppressHydrationWarning: !0,
                nonce: r,
              },
            }));
        return [..._, ...A];
      },
      Ne,
    ),
    y = se(
      l.stores.matches,
      (g) => {
        const _ = [];
        return (
          g
            .map((S) => l.looseRoutesById[S.routeId])
            .forEach((S) =>
              l.ssr?.manifest?.routes[S.id]?.preloads?.filter(Boolean).forEach((A) => {
                const x = Y1(A);
                _.push({
                  tag: "link",
                  attrs: {
                    rel: "modulepreload",
                    href: x.href,
                    crossOrigin: vm(a, "modulepreload") ?? x.crossOrigin,
                    nonce: r,
                  },
                });
              }),
            ),
          _
        );
      },
      Ne,
    ),
    h = se(
      l.stores.matches,
      (g) =>
        g
          .map((_) => _.styles)
          .flat(1)
          .filter(Boolean)
          .map(({ children: _, ...S }) => ({
            tag: "style",
            attrs: { ...S, nonce: r },
            children: _,
          })),
      Ne,
    ),
    v = se(
      l.stores.matches,
      (g) =>
        g
          .map((_) => _.headScripts)
          .flat(1)
          .filter(Boolean)
          .map(({ children: _, ...S }) => ({
            tag: "script",
            attrs: { ...S, nonce: r },
            children: _,
          })),
      Ne,
    );
  return Y_([...c, ...y, ...d, ...h, ...v], (g) => JSON.stringify(g));
};
function Y_(a, l) {
  const r = new Set();
  return a.filter((o) => {
    const c = l(o);
    return r.has(c) ? !1 : (r.add(c), !0);
  });
}
function G_(a) {
  const l = q_(a.assetCrossOrigin),
    r = xe().options.ssr?.nonce;
  return W.jsx(W.Fragment, {
    children: l.map((o) =>
      rt.createElement(i0, { ...o, key: `tsr-meta-${JSON.stringify(o)}`, nonce: r }),
    ),
  });
}
var V_ = () => {
  const a = xe(),
    l = a.options.ssr?.nonce,
    r = (d) => {
      const y = [],
        h = a.ssr?.manifest;
      return h
        ? (d
            .map((v) => a.looseRoutesById[v.routeId])
            .forEach((v) =>
              h.routes[v.id]?.assets
                ?.filter((g) => g.tag === "script")
                .forEach((g) => {
                  y.push({ tag: "script", attrs: { ...g.attrs, nonce: l }, children: g.children });
                }),
            ),
          y)
        : [];
    },
    o = (d) =>
      d
        .map((y) => y.scripts)
        .flat(1)
        .filter(Boolean)
        .map(({ children: y, ...h }) => ({
          tag: "script",
          attrs: { ...h, suppressHydrationWarning: !0, nonce: l },
          children: y,
        })),
    c = se(a.stores.matches, r, Ne);
  return X_(a, se(a.stores.matches, o, Ne), c);
};
function X_(a, l, r) {
  let o;
  a.serverSsr && (o = a.serverSsr.takeBufferedScripts());
  const c = [...l, ...r];
  return (
    o && c.unshift(o),
    W.jsx(W.Fragment, {
      children: c.map((d, y) => rt.createElement(i0, { ...d, key: `tsr-scripts-${d.tag}-${y}` })),
    })
  );
}
var Rc = {},
  Pl = {},
  Ym;
function Q_() {
  if (Ym) return Pl;
  ((Ym = 1), (Pl.byteLength = h), (Pl.toByteArray = g), (Pl.fromByteArray = A));
  for (
    var a = [],
      l = [],
      r = typeof Uint8Array < "u" ? Uint8Array : Array,
      o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      c = 0,
      d = o.length;
    c < d;
    ++c
  )
    ((a[c] = o[c]), (l[o.charCodeAt(c)] = c));
  ((l[45] = 62), (l[95] = 63));
  function y(x) {
    var M = x.length;
    if (M % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var D = x.indexOf("=");
    D === -1 && (D = M);
    var C = D === M ? 0 : 4 - (D % 4);
    return [D, C];
  }
  function h(x) {
    var M = y(x),
      D = M[0],
      C = M[1];
    return ((D + C) * 3) / 4 - C;
  }
  function v(x, M, D) {
    return ((M + D) * 3) / 4 - D;
  }
  function g(x) {
    var M,
      D = y(x),
      C = D[0],
      B = D[1],
      q = new r(v(x, C, B)),
      Q = 0,
      V = B > 0 ? C - 4 : C,
      $;
    for ($ = 0; $ < V; $ += 4)
      ((M =
        (l[x.charCodeAt($)] << 18) |
        (l[x.charCodeAt($ + 1)] << 12) |
        (l[x.charCodeAt($ + 2)] << 6) |
        l[x.charCodeAt($ + 3)]),
        (q[Q++] = (M >> 16) & 255),
        (q[Q++] = (M >> 8) & 255),
        (q[Q++] = M & 255));
    return (
      B === 2 &&
        ((M = (l[x.charCodeAt($)] << 2) | (l[x.charCodeAt($ + 1)] >> 4)), (q[Q++] = M & 255)),
      B === 1 &&
        ((M =
          (l[x.charCodeAt($)] << 10) |
          (l[x.charCodeAt($ + 1)] << 4) |
          (l[x.charCodeAt($ + 2)] >> 2)),
        (q[Q++] = (M >> 8) & 255),
        (q[Q++] = M & 255)),
      q
    );
  }
  function _(x) {
    return a[(x >> 18) & 63] + a[(x >> 12) & 63] + a[(x >> 6) & 63] + a[x & 63];
  }
  function S(x, M, D) {
    for (var C, B = [], q = M; q < D; q += 3)
      ((C = ((x[q] << 16) & 16711680) + ((x[q + 1] << 8) & 65280) + (x[q + 2] & 255)),
        B.push(_(C)));
    return B.join("");
  }
  function A(x) {
    for (var M, D = x.length, C = D % 3, B = [], q = 16383, Q = 0, V = D - C; Q < V; Q += q)
      B.push(S(x, Q, Q + q > V ? V : Q + q));
    return (
      C === 1
        ? ((M = x[D - 1]), B.push(a[M >> 2] + a[(M << 4) & 63] + "=="))
        : C === 2 &&
          ((M = (x[D - 2] << 8) + x[D - 1]),
          B.push(a[M >> 10] + a[(M >> 4) & 63] + a[(M << 2) & 63] + "=")),
      B.join("")
    );
  }
  return Pl;
}
var Au = {};
var Gm;
function Z_() {
  return (
    Gm ||
      ((Gm = 1),
      (Au.read = function (a, l, r, o, c) {
        var d,
          y,
          h = c * 8 - o - 1,
          v = (1 << h) - 1,
          g = v >> 1,
          _ = -7,
          S = r ? c - 1 : 0,
          A = r ? -1 : 1,
          x = a[l + S];
        for (
          S += A, d = x & ((1 << -_) - 1), x >>= -_, _ += h;
          _ > 0;
          d = d * 256 + a[l + S], S += A, _ -= 8
        );
        for (
          y = d & ((1 << -_) - 1), d >>= -_, _ += o;
          _ > 0;
          y = y * 256 + a[l + S], S += A, _ -= 8
        );
        if (d === 0) d = 1 - g;
        else {
          if (d === v) return y ? NaN : (x ? -1 : 1) * (1 / 0);
          ((y = y + Math.pow(2, o)), (d = d - g));
        }
        return (x ? -1 : 1) * y * Math.pow(2, d - o);
      }),
      (Au.write = function (a, l, r, o, c, d) {
        var y,
          h,
          v,
          g = d * 8 - c - 1,
          _ = (1 << g) - 1,
          S = _ >> 1,
          A = c === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          x = o ? 0 : d - 1,
          M = o ? 1 : -1,
          D = l < 0 || (l === 0 && 1 / l < 0) ? 1 : 0;
        for (
          l = Math.abs(l),
            isNaN(l) || l === 1 / 0
              ? ((h = isNaN(l) ? 1 : 0), (y = _))
              : ((y = Math.floor(Math.log(l) / Math.LN2)),
                l * (v = Math.pow(2, -y)) < 1 && (y--, (v *= 2)),
                y + S >= 1 ? (l += A / v) : (l += A * Math.pow(2, 1 - S)),
                l * v >= 2 && (y++, (v /= 2)),
                y + S >= _
                  ? ((h = 0), (y = _))
                  : y + S >= 1
                    ? ((h = (l * v - 1) * Math.pow(2, c)), (y = y + S))
                    : ((h = l * Math.pow(2, S - 1) * Math.pow(2, c)), (y = 0)));
          c >= 8;
          a[r + x] = h & 255, x += M, h /= 256, c -= 8
        );
        for (y = (y << c) | h, g += c; g > 0; a[r + x] = y & 255, x += M, y /= 256, g -= 8);
        a[r + x - M] |= D * 128;
      })),
    Au
  );
}
var Vm;
function K_() {
  return (
    Vm ||
      ((Vm = 1),
      (function (a) {
        const l = Q_(),
          r = Z_(),
          o =
            typeof Symbol == "function" && typeof Symbol.for == "function"
              ? Symbol.for("nodejs.util.inspect.custom")
              : null;
        ((a.Buffer = h), (a.SlowBuffer = q), (a.INSPECT_MAX_BYTES = 50));
        const c = 2147483647;
        ((a.kMaxLength = c),
          (h.TYPED_ARRAY_SUPPORT = d()),
          !h.TYPED_ARRAY_SUPPORT &&
            typeof console < "u" &&
            typeof console.error == "function" &&
            console.error(
              "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
            ));
        function d() {
          try {
            const b = new Uint8Array(1),
              f = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(f, Uint8Array.prototype),
              Object.setPrototypeOf(b, f),
              b.foo() === 42
            );
          } catch {
            return !1;
          }
        }
        (Object.defineProperty(h.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (h.isBuffer(this)) return this.buffer;
          },
        }),
          Object.defineProperty(h.prototype, "offset", {
            enumerable: !0,
            get: function () {
              if (h.isBuffer(this)) return this.byteOffset;
            },
          }));
        function y(b) {
          if (b > c) throw new RangeError('The value "' + b + '" is invalid for option "size"');
          const f = new Uint8Array(b);
          return (Object.setPrototypeOf(f, h.prototype), f);
        }
        function h(b, f, p) {
          if (typeof b == "number") {
            if (typeof f == "string")
              throw new TypeError(
                'The "string" argument must be of type string. Received type number',
              );
            return S(b);
          }
          return v(b, f, p);
        }
        h.poolSize = 8192;
        function v(b, f, p) {
          if (typeof b == "string") return A(b, f);
          if (ArrayBuffer.isView(b)) return M(b);
          if (b == null)
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof b,
            );
          if (
            Re(b, ArrayBuffer) ||
            (b && Re(b.buffer, ArrayBuffer)) ||
            (typeof SharedArrayBuffer < "u" &&
              (Re(b, SharedArrayBuffer) || (b && Re(b.buffer, SharedArrayBuffer))))
          )
            return D(b, f, p);
          if (typeof b == "number")
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number',
            );
          const R = b.valueOf && b.valueOf();
          if (R != null && R !== b) return h.from(R, f, p);
          const L = C(b);
          if (L) return L;
          if (
            typeof Symbol < "u" &&
            Symbol.toPrimitive != null &&
            typeof b[Symbol.toPrimitive] == "function"
          )
            return h.from(b[Symbol.toPrimitive]("string"), f, p);
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof b,
          );
        }
        ((h.from = function (b, f, p) {
          return v(b, f, p);
        }),
          Object.setPrototypeOf(h.prototype, Uint8Array.prototype),
          Object.setPrototypeOf(h, Uint8Array));
        function g(b) {
          if (typeof b != "number") throw new TypeError('"size" argument must be of type number');
          if (b < 0) throw new RangeError('The value "' + b + '" is invalid for option "size"');
        }
        function _(b, f, p) {
          return (
            g(b),
            b <= 0
              ? y(b)
              : f !== void 0
                ? typeof p == "string"
                  ? y(b).fill(f, p)
                  : y(b).fill(f)
                : y(b)
          );
        }
        h.alloc = function (b, f, p) {
          return _(b, f, p);
        };
        function S(b) {
          return (g(b), y(b < 0 ? 0 : B(b) | 0));
        }
        ((h.allocUnsafe = function (b) {
          return S(b);
        }),
          (h.allocUnsafeSlow = function (b) {
            return S(b);
          }));
        function A(b, f) {
          if (((typeof f != "string" || f === "") && (f = "utf8"), !h.isEncoding(f)))
            throw new TypeError("Unknown encoding: " + f);
          const p = Q(b, f) | 0;
          let R = y(p);
          const L = R.write(b, f);
          return (L !== p && (R = R.slice(0, L)), R);
        }
        function x(b) {
          const f = b.length < 0 ? 0 : B(b.length) | 0,
            p = y(f);
          for (let R = 0; R < f; R += 1) p[R] = b[R] & 255;
          return p;
        }
        function M(b) {
          if (Re(b, Uint8Array)) {
            const f = new Uint8Array(b);
            return D(f.buffer, f.byteOffset, f.byteLength);
          }
          return x(b);
        }
        function D(b, f, p) {
          if (f < 0 || b.byteLength < f)
            throw new RangeError('"offset" is outside of buffer bounds');
          if (b.byteLength < f + (p || 0))
            throw new RangeError('"length" is outside of buffer bounds');
          let R;
          return (
            f === void 0 && p === void 0
              ? (R = new Uint8Array(b))
              : p === void 0
                ? (R = new Uint8Array(b, f))
                : (R = new Uint8Array(b, f, p)),
            Object.setPrototypeOf(R, h.prototype),
            R
          );
        }
        function C(b) {
          if (h.isBuffer(b)) {
            const f = B(b.length) | 0,
              p = y(f);
            return (p.length === 0 || b.copy(p, 0, 0, f), p);
          }
          if (b.length !== void 0) return typeof b.length != "number" || Ma(b.length) ? y(0) : x(b);
          if (b.type === "Buffer" && Array.isArray(b.data)) return x(b.data);
        }
        function B(b) {
          if (b >= c)
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" + c.toString(16) + " bytes",
            );
          return b | 0;
        }
        function q(b) {
          return (+b != b && (b = 0), h.alloc(+b));
        }
        ((h.isBuffer = function (f) {
          return f != null && f._isBuffer === !0 && f !== h.prototype;
        }),
          (h.compare = function (f, p) {
            if (
              (Re(f, Uint8Array) && (f = h.from(f, f.offset, f.byteLength)),
              Re(p, Uint8Array) && (p = h.from(p, p.offset, p.byteLength)),
              !h.isBuffer(f) || !h.isBuffer(p))
            )
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
              );
            if (f === p) return 0;
            let R = f.length,
              L = p.length;
            for (let G = 0, P = Math.min(R, L); G < P; ++G)
              if (f[G] !== p[G]) {
                ((R = f[G]), (L = p[G]));
                break;
              }
            return R < L ? -1 : L < R ? 1 : 0;
          }),
          (h.isEncoding = function (f) {
            switch (String(f).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }),
          (h.concat = function (f, p) {
            if (!Array.isArray(f))
              throw new TypeError('"list" argument must be an Array of Buffers');
            if (f.length === 0) return h.alloc(0);
            let R;
            if (p === void 0) for (p = 0, R = 0; R < f.length; ++R) p += f[R].length;
            const L = h.allocUnsafe(p);
            let G = 0;
            for (R = 0; R < f.length; ++R) {
              let P = f[R];
              if (Re(P, Uint8Array))
                G + P.length > L.length
                  ? (h.isBuffer(P) || (P = h.from(P)), P.copy(L, G))
                  : Uint8Array.prototype.set.call(L, P, G);
              else if (h.isBuffer(P)) P.copy(L, G);
              else throw new TypeError('"list" argument must be an Array of Buffers');
              G += P.length;
            }
            return L;
          }));
        function Q(b, f) {
          if (h.isBuffer(b)) return b.length;
          if (ArrayBuffer.isView(b) || Re(b, ArrayBuffer)) return b.byteLength;
          if (typeof b != "string")
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                typeof b,
            );
          const p = b.length,
            R = arguments.length > 2 && arguments[2] === !0;
          if (!R && p === 0) return 0;
          let L = !1;
          for (;;)
            switch (f) {
              case "ascii":
              case "latin1":
              case "binary":
                return p;
              case "utf8":
              case "utf-8":
                return Xn(b).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return p * 2;
              case "hex":
                return p >>> 1;
              case "base64":
                return Me(b).length;
              default:
                if (L) return R ? -1 : Xn(b).length;
                ((f = ("" + f).toLowerCase()), (L = !0));
            }
        }
        h.byteLength = Q;
        function V(b, f, p) {
          let R = !1;
          if (
            ((f === void 0 || f < 0) && (f = 0),
            f > this.length ||
              ((p === void 0 || p > this.length) && (p = this.length), p <= 0) ||
              ((p >>>= 0), (f >>>= 0), p <= f))
          )
            return "";
          for (b || (b = "utf8"); ; )
            switch (b) {
              case "hex":
                return zt(this, f, p);
              case "utf8":
              case "utf-8":
                return Pt(this, f, p);
              case "ascii":
                return tt(this, f, p);
              case "latin1":
              case "binary":
                return ft(this, f, p);
              case "base64":
                return _t(this, f, p);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return Bt(this, f, p);
              default:
                if (R) throw new TypeError("Unknown encoding: " + b);
                ((b = (b + "").toLowerCase()), (R = !0));
            }
        }
        h.prototype._isBuffer = !0;
        function $(b, f, p) {
          const R = b[f];
          ((b[f] = b[p]), (b[p] = R));
        }
        ((h.prototype.swap16 = function () {
          const f = this.length;
          if (f % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (let p = 0; p < f; p += 2) $(this, p, p + 1);
          return this;
        }),
          (h.prototype.swap32 = function () {
            const f = this.length;
            if (f % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let p = 0; p < f; p += 4) ($(this, p, p + 3), $(this, p + 1, p + 2));
            return this;
          }),
          (h.prototype.swap64 = function () {
            const f = this.length;
            if (f % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let p = 0; p < f; p += 8)
              ($(this, p, p + 7),
                $(this, p + 1, p + 6),
                $(this, p + 2, p + 5),
                $(this, p + 3, p + 4));
            return this;
          }),
          (h.prototype.toString = function () {
            const f = this.length;
            return f === 0
              ? ""
              : arguments.length === 0
                ? Pt(this, 0, f)
                : V.apply(this, arguments);
          }),
          (h.prototype.toLocaleString = h.prototype.toString),
          (h.prototype.equals = function (f) {
            if (!h.isBuffer(f)) throw new TypeError("Argument must be a Buffer");
            return this === f ? !0 : h.compare(this, f) === 0;
          }),
          (h.prototype.inspect = function () {
            let f = "";
            const p = a.INSPECT_MAX_BYTES;
            return (
              (f = this.toString("hex", 0, p)
                .replace(/(.{2})/g, "$1 ")
                .trim()),
              this.length > p && (f += " ... "),
              "<Buffer " + f + ">"
            );
          }),
          o && (h.prototype[o] = h.prototype.inspect),
          (h.prototype.compare = function (f, p, R, L, G) {
            if ((Re(f, Uint8Array) && (f = h.from(f, f.offset, f.byteLength)), !h.isBuffer(f)))
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                  typeof f,
              );
            if (
              (p === void 0 && (p = 0),
              R === void 0 && (R = f ? f.length : 0),
              L === void 0 && (L = 0),
              G === void 0 && (G = this.length),
              p < 0 || R > f.length || L < 0 || G > this.length)
            )
              throw new RangeError("out of range index");
            if (L >= G && p >= R) return 0;
            if (L >= G) return -1;
            if (p >= R) return 1;
            if (((p >>>= 0), (R >>>= 0), (L >>>= 0), (G >>>= 0), this === f)) return 0;
            let P = G - L,
              pt = R - p;
            const Ht = Math.min(P, pt),
              Et = this.slice(L, G),
              $t = f.slice(p, R);
            for (let Yt = 0; Yt < Ht; ++Yt)
              if (Et[Yt] !== $t[Yt]) {
                ((P = Et[Yt]), (pt = $t[Yt]));
                break;
              }
            return P < pt ? -1 : pt < P ? 1 : 0;
          }));
        function nt(b, f, p, R, L) {
          if (b.length === 0) return -1;
          if (
            (typeof p == "string"
              ? ((R = p), (p = 0))
              : p > 2147483647
                ? (p = 2147483647)
                : p < -2147483648 && (p = -2147483648),
            (p = +p),
            Ma(p) && (p = L ? 0 : b.length - 1),
            p < 0 && (p = b.length + p),
            p >= b.length)
          ) {
            if (L) return -1;
            p = b.length - 1;
          } else if (p < 0)
            if (L) p = 0;
            else return -1;
          if ((typeof f == "string" && (f = h.from(f, R)), h.isBuffer(f)))
            return f.length === 0 ? -1 : F(b, f, p, R, L);
          if (typeof f == "number")
            return (
              (f = f & 255),
              typeof Uint8Array.prototype.indexOf == "function"
                ? L
                  ? Uint8Array.prototype.indexOf.call(b, f, p)
                  : Uint8Array.prototype.lastIndexOf.call(b, f, p)
                : F(b, [f], p, R, L)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function F(b, f, p, R, L) {
          let G = 1,
            P = b.length,
            pt = f.length;
          if (
            R !== void 0 &&
            ((R = String(R).toLowerCase()),
            R === "ucs2" || R === "ucs-2" || R === "utf16le" || R === "utf-16le")
          ) {
            if (b.length < 2 || f.length < 2) return -1;
            ((G = 2), (P /= 2), (pt /= 2), (p /= 2));
          }
          function Ht($t, Yt) {
            return G === 1 ? $t[Yt] : $t.readUInt16BE(Yt * G);
          }
          let Et;
          if (L) {
            let $t = -1;
            for (Et = p; Et < P; Et++)
              if (Ht(b, Et) === Ht(f, $t === -1 ? 0 : Et - $t)) {
                if (($t === -1 && ($t = Et), Et - $t + 1 === pt)) return $t * G;
              } else ($t !== -1 && (Et -= Et - $t), ($t = -1));
          } else
            for (p + pt > P && (p = P - pt), Et = p; Et >= 0; Et--) {
              let $t = !0;
              for (let Yt = 0; Yt < pt; Yt++)
                if (Ht(b, Et + Yt) !== Ht(f, Yt)) {
                  $t = !1;
                  break;
                }
              if ($t) return Et;
            }
          return -1;
        }
        ((h.prototype.includes = function (f, p, R) {
          return this.indexOf(f, p, R) !== -1;
        }),
          (h.prototype.indexOf = function (f, p, R) {
            return nt(this, f, p, R, !0);
          }),
          (h.prototype.lastIndexOf = function (f, p, R) {
            return nt(this, f, p, R, !1);
          }));
        function et(b, f, p, R) {
          p = Number(p) || 0;
          const L = b.length - p;
          R ? ((R = Number(R)), R > L && (R = L)) : (R = L);
          const G = f.length;
          R > G / 2 && (R = G / 2);
          let P;
          for (P = 0; P < R; ++P) {
            const pt = parseInt(f.substr(P * 2, 2), 16);
            if (Ma(pt)) return P;
            b[p + P] = pt;
          }
          return P;
        }
        function it(b, f, p, R) {
          return fn(Xn(f, b.length - p), b, p, R);
        }
        function ht(b, f, p, R) {
          return fn(un(f), b, p, R);
        }
        function ot(b, f, p, R) {
          return fn(Me(f), b, p, R);
        }
        function St(b, f, p, R) {
          return fn(vn(f, b.length - p), b, p, R);
        }
        ((h.prototype.write = function (f, p, R, L) {
          if (p === void 0) ((L = "utf8"), (R = this.length), (p = 0));
          else if (R === void 0 && typeof p == "string") ((L = p), (R = this.length), (p = 0));
          else if (isFinite(p))
            ((p = p >>> 0),
              isFinite(R)
                ? ((R = R >>> 0), L === void 0 && (L = "utf8"))
                : ((L = R), (R = void 0)));
          else
            throw new Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported",
            );
          const G = this.length - p;
          if (
            ((R === void 0 || R > G) && (R = G),
            (f.length > 0 && (R < 0 || p < 0)) || p > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          L || (L = "utf8");
          let P = !1;
          for (;;)
            switch (L) {
              case "hex":
                return et(this, f, p, R);
              case "utf8":
              case "utf-8":
                return it(this, f, p, R);
              case "ascii":
              case "latin1":
              case "binary":
                return ht(this, f, p, R);
              case "base64":
                return ot(this, f, p, R);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return St(this, f, p, R);
              default:
                if (P) throw new TypeError("Unknown encoding: " + L);
                ((L = ("" + L).toLowerCase()), (P = !0));
            }
        }),
          (h.prototype.toJSON = function () {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          }));
        function _t(b, f, p) {
          return f === 0 && p === b.length ? l.fromByteArray(b) : l.fromByteArray(b.slice(f, p));
        }
        function Pt(b, f, p) {
          p = Math.min(b.length, p);
          const R = [];
          let L = f;
          for (; L < p; ) {
            const G = b[L];
            let P = null,
              pt = G > 239 ? 4 : G > 223 ? 3 : G > 191 ? 2 : 1;
            if (L + pt <= p) {
              let Ht, Et, $t, Yt;
              switch (pt) {
                case 1:
                  G < 128 && (P = G);
                  break;
                case 2:
                  ((Ht = b[L + 1]),
                    (Ht & 192) === 128 &&
                      ((Yt = ((G & 31) << 6) | (Ht & 63)), Yt > 127 && (P = Yt)));
                  break;
                case 3:
                  ((Ht = b[L + 1]),
                    (Et = b[L + 2]),
                    (Ht & 192) === 128 &&
                      (Et & 192) === 128 &&
                      ((Yt = ((G & 15) << 12) | ((Ht & 63) << 6) | (Et & 63)),
                      Yt > 2047 && (Yt < 55296 || Yt > 57343) && (P = Yt)));
                  break;
                case 4:
                  ((Ht = b[L + 1]),
                    (Et = b[L + 2]),
                    ($t = b[L + 3]),
                    (Ht & 192) === 128 &&
                      (Et & 192) === 128 &&
                      ($t & 192) === 128 &&
                      ((Yt = ((G & 15) << 18) | ((Ht & 63) << 12) | ((Et & 63) << 6) | ($t & 63)),
                      Yt > 65535 && Yt < 1114112 && (P = Yt)));
              }
            }
            (P === null
              ? ((P = 65533), (pt = 1))
              : P > 65535 &&
                ((P -= 65536), R.push(((P >>> 10) & 1023) | 55296), (P = 56320 | (P & 1023))),
              R.push(P),
              (L += pt));
          }
          return Z(R);
        }
        const Nt = 4096;
        function Z(b) {
          const f = b.length;
          if (f <= Nt) return String.fromCharCode.apply(String, b);
          let p = "",
            R = 0;
          for (; R < f; ) p += String.fromCharCode.apply(String, b.slice(R, (R += Nt)));
          return p;
        }
        function tt(b, f, p) {
          let R = "";
          p = Math.min(b.length, p);
          for (let L = f; L < p; ++L) R += String.fromCharCode(b[L] & 127);
          return R;
        }
        function ft(b, f, p) {
          let R = "";
          p = Math.min(b.length, p);
          for (let L = f; L < p; ++L) R += String.fromCharCode(b[L]);
          return R;
        }
        function zt(b, f, p) {
          const R = b.length;
          ((!f || f < 0) && (f = 0), (!p || p < 0 || p > R) && (p = R));
          let L = "";
          for (let G = f; G < p; ++G) L += pe[b[G]];
          return L;
        }
        function Bt(b, f, p) {
          const R = b.slice(f, p);
          let L = "";
          for (let G = 0; G < R.length - 1; G += 2) L += String.fromCharCode(R[G] + R[G + 1] * 256);
          return L;
        }
        h.prototype.slice = function (f, p) {
          const R = this.length;
          ((f = ~~f),
            (p = p === void 0 ? R : ~~p),
            f < 0 ? ((f += R), f < 0 && (f = 0)) : f > R && (f = R),
            p < 0 ? ((p += R), p < 0 && (p = 0)) : p > R && (p = R),
            p < f && (p = f));
          const L = this.subarray(f, p);
          return (Object.setPrototypeOf(L, h.prototype), L);
        };
        function z(b, f, p) {
          if (b % 1 !== 0 || b < 0) throw new RangeError("offset is not uint");
          if (b + f > p) throw new RangeError("Trying to access beyond buffer length");
        }
        ((h.prototype.readUintLE = h.prototype.readUIntLE =
          function (f, p, R) {
            ((f = f >>> 0), (p = p >>> 0), R || z(f, p, this.length));
            let L = this[f],
              G = 1,
              P = 0;
            for (; ++P < p && (G *= 256); ) L += this[f + P] * G;
            return L;
          }),
          (h.prototype.readUintBE = h.prototype.readUIntBE =
            function (f, p, R) {
              ((f = f >>> 0), (p = p >>> 0), R || z(f, p, this.length));
              let L = this[f + --p],
                G = 1;
              for (; p > 0 && (G *= 256); ) L += this[f + --p] * G;
              return L;
            }),
          (h.prototype.readUint8 = h.prototype.readUInt8 =
            function (f, p) {
              return ((f = f >>> 0), p || z(f, 1, this.length), this[f]);
            }),
          (h.prototype.readUint16LE = h.prototype.readUInt16LE =
            function (f, p) {
              return ((f = f >>> 0), p || z(f, 2, this.length), this[f] | (this[f + 1] << 8));
            }),
          (h.prototype.readUint16BE = h.prototype.readUInt16BE =
            function (f, p) {
              return ((f = f >>> 0), p || z(f, 2, this.length), (this[f] << 8) | this[f + 1]);
            }),
          (h.prototype.readUint32LE = h.prototype.readUInt32LE =
            function (f, p) {
              return (
                (f = f >>> 0),
                p || z(f, 4, this.length),
                (this[f] | (this[f + 1] << 8) | (this[f + 2] << 16)) + this[f + 3] * 16777216
              );
            }),
          (h.prototype.readUint32BE = h.prototype.readUInt32BE =
            function (f, p) {
              return (
                (f = f >>> 0),
                p || z(f, 4, this.length),
                this[f] * 16777216 + ((this[f + 1] << 16) | (this[f + 2] << 8) | this[f + 3])
              );
            }),
          (h.prototype.readBigUInt64LE = Mt(function (f) {
            ((f = f >>> 0), Ie(f, "offset"));
            const p = this[f],
              R = this[f + 7];
            (p === void 0 || R === void 0) && Ae(f, this.length - 8);
            const L = p + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24,
              G = this[++f] + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + R * 2 ** 24;
            return BigInt(L) + (BigInt(G) << BigInt(32));
          })),
          (h.prototype.readBigUInt64BE = Mt(function (f) {
            ((f = f >>> 0), Ie(f, "offset"));
            const p = this[f],
              R = this[f + 7];
            (p === void 0 || R === void 0) && Ae(f, this.length - 8);
            const L = p * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f],
              G = this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + R;
            return (BigInt(L) << BigInt(32)) + BigInt(G);
          })),
          (h.prototype.readIntLE = function (f, p, R) {
            ((f = f >>> 0), (p = p >>> 0), R || z(f, p, this.length));
            let L = this[f],
              G = 1,
              P = 0;
            for (; ++P < p && (G *= 256); ) L += this[f + P] * G;
            return ((G *= 128), L >= G && (L -= Math.pow(2, 8 * p)), L);
          }),
          (h.prototype.readIntBE = function (f, p, R) {
            ((f = f >>> 0), (p = p >>> 0), R || z(f, p, this.length));
            let L = p,
              G = 1,
              P = this[f + --L];
            for (; L > 0 && (G *= 256); ) P += this[f + --L] * G;
            return ((G *= 128), P >= G && (P -= Math.pow(2, 8 * p)), P);
          }),
          (h.prototype.readInt8 = function (f, p) {
            return (
              (f = f >>> 0),
              p || z(f, 1, this.length),
              this[f] & 128 ? (255 - this[f] + 1) * -1 : this[f]
            );
          }),
          (h.prototype.readInt16LE = function (f, p) {
            ((f = f >>> 0), p || z(f, 2, this.length));
            const R = this[f] | (this[f + 1] << 8);
            return R & 32768 ? R | 4294901760 : R;
          }),
          (h.prototype.readInt16BE = function (f, p) {
            ((f = f >>> 0), p || z(f, 2, this.length));
            const R = this[f + 1] | (this[f] << 8);
            return R & 32768 ? R | 4294901760 : R;
          }),
          (h.prototype.readInt32LE = function (f, p) {
            return (
              (f = f >>> 0),
              p || z(f, 4, this.length),
              this[f] | (this[f + 1] << 8) | (this[f + 2] << 16) | (this[f + 3] << 24)
            );
          }),
          (h.prototype.readInt32BE = function (f, p) {
            return (
              (f = f >>> 0),
              p || z(f, 4, this.length),
              (this[f] << 24) | (this[f + 1] << 16) | (this[f + 2] << 8) | this[f + 3]
            );
          }),
          (h.prototype.readBigInt64LE = Mt(function (f) {
            ((f = f >>> 0), Ie(f, "offset"));
            const p = this[f],
              R = this[f + 7];
            (p === void 0 || R === void 0) && Ae(f, this.length - 8);
            const L = this[f + 4] + this[f + 5] * 2 ** 8 + this[f + 6] * 2 ** 16 + (R << 24);
            return (
              (BigInt(L) << BigInt(32)) +
              BigInt(p + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24)
            );
          })),
          (h.prototype.readBigInt64BE = Mt(function (f) {
            ((f = f >>> 0), Ie(f, "offset"));
            const p = this[f],
              R = this[f + 7];
            (p === void 0 || R === void 0) && Ae(f, this.length - 8);
            const L = (p << 24) + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f];
            return (
              (BigInt(L) << BigInt(32)) +
              BigInt(this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + R)
            );
          })),
          (h.prototype.readFloatLE = function (f, p) {
            return ((f = f >>> 0), p || z(f, 4, this.length), r.read(this, f, !0, 23, 4));
          }),
          (h.prototype.readFloatBE = function (f, p) {
            return ((f = f >>> 0), p || z(f, 4, this.length), r.read(this, f, !1, 23, 4));
          }),
          (h.prototype.readDoubleLE = function (f, p) {
            return ((f = f >>> 0), p || z(f, 8, this.length), r.read(this, f, !0, 52, 8));
          }),
          (h.prototype.readDoubleBE = function (f, p) {
            return ((f = f >>> 0), p || z(f, 8, this.length), r.read(this, f, !1, 52, 8));
          }));
        function K(b, f, p, R, L, G) {
          if (!h.isBuffer(b)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (f > L || f < G) throw new RangeError('"value" argument is out of bounds');
          if (p + R > b.length) throw new RangeError("Index out of range");
        }
        ((h.prototype.writeUintLE = h.prototype.writeUIntLE =
          function (f, p, R, L) {
            if (((f = +f), (p = p >>> 0), (R = R >>> 0), !L)) {
              const pt = Math.pow(2, 8 * R) - 1;
              K(this, f, p, R, pt, 0);
            }
            let G = 1,
              P = 0;
            for (this[p] = f & 255; ++P < R && (G *= 256); ) this[p + P] = (f / G) & 255;
            return p + R;
          }),
          (h.prototype.writeUintBE = h.prototype.writeUIntBE =
            function (f, p, R, L) {
              if (((f = +f), (p = p >>> 0), (R = R >>> 0), !L)) {
                const pt = Math.pow(2, 8 * R) - 1;
                K(this, f, p, R, pt, 0);
              }
              let G = R - 1,
                P = 1;
              for (this[p + G] = f & 255; --G >= 0 && (P *= 256); ) this[p + G] = (f / P) & 255;
              return p + R;
            }),
          (h.prototype.writeUint8 = h.prototype.writeUInt8 =
            function (f, p, R) {
              return (
                (f = +f),
                (p = p >>> 0),
                R || K(this, f, p, 1, 255, 0),
                (this[p] = f & 255),
                p + 1
              );
            }),
          (h.prototype.writeUint16LE = h.prototype.writeUInt16LE =
            function (f, p, R) {
              return (
                (f = +f),
                (p = p >>> 0),
                R || K(this, f, p, 2, 65535, 0),
                (this[p] = f & 255),
                (this[p + 1] = f >>> 8),
                p + 2
              );
            }),
          (h.prototype.writeUint16BE = h.prototype.writeUInt16BE =
            function (f, p, R) {
              return (
                (f = +f),
                (p = p >>> 0),
                R || K(this, f, p, 2, 65535, 0),
                (this[p] = f >>> 8),
                (this[p + 1] = f & 255),
                p + 2
              );
            }),
          (h.prototype.writeUint32LE = h.prototype.writeUInt32LE =
            function (f, p, R) {
              return (
                (f = +f),
                (p = p >>> 0),
                R || K(this, f, p, 4, 4294967295, 0),
                (this[p + 3] = f >>> 24),
                (this[p + 2] = f >>> 16),
                (this[p + 1] = f >>> 8),
                (this[p] = f & 255),
                p + 4
              );
            }),
          (h.prototype.writeUint32BE = h.prototype.writeUInt32BE =
            function (f, p, R) {
              return (
                (f = +f),
                (p = p >>> 0),
                R || K(this, f, p, 4, 4294967295, 0),
                (this[p] = f >>> 24),
                (this[p + 1] = f >>> 16),
                (this[p + 2] = f >>> 8),
                (this[p + 3] = f & 255),
                p + 4
              );
            }));
        function at(b, f, p, R, L) {
          rn(f, R, L, b, p, 7);
          let G = Number(f & BigInt(4294967295));
          ((b[p++] = G),
            (G = G >> 8),
            (b[p++] = G),
            (G = G >> 8),
            (b[p++] = G),
            (G = G >> 8),
            (b[p++] = G));
          let P = Number((f >> BigInt(32)) & BigInt(4294967295));
          return (
            (b[p++] = P),
            (P = P >> 8),
            (b[p++] = P),
            (P = P >> 8),
            (b[p++] = P),
            (P = P >> 8),
            (b[p++] = P),
            p
          );
        }
        function lt(b, f, p, R, L) {
          rn(f, R, L, b, p, 7);
          let G = Number(f & BigInt(4294967295));
          ((b[p + 7] = G),
            (G = G >> 8),
            (b[p + 6] = G),
            (G = G >> 8),
            (b[p + 5] = G),
            (G = G >> 8),
            (b[p + 4] = G));
          let P = Number((f >> BigInt(32)) & BigInt(4294967295));
          return (
            (b[p + 3] = P),
            (P = P >> 8),
            (b[p + 2] = P),
            (P = P >> 8),
            (b[p + 1] = P),
            (P = P >> 8),
            (b[p] = P),
            p + 8
          );
        }
        ((h.prototype.writeBigUInt64LE = Mt(function (f, p = 0) {
          return at(this, f, p, BigInt(0), BigInt("0xffffffffffffffff"));
        })),
          (h.prototype.writeBigUInt64BE = Mt(function (f, p = 0) {
            return lt(this, f, p, BigInt(0), BigInt("0xffffffffffffffff"));
          })),
          (h.prototype.writeIntLE = function (f, p, R, L) {
            if (((f = +f), (p = p >>> 0), !L)) {
              const Ht = Math.pow(2, 8 * R - 1);
              K(this, f, p, R, Ht - 1, -Ht);
            }
            let G = 0,
              P = 1,
              pt = 0;
            for (this[p] = f & 255; ++G < R && (P *= 256); )
              (f < 0 && pt === 0 && this[p + G - 1] !== 0 && (pt = 1),
                (this[p + G] = (((f / P) >> 0) - pt) & 255));
            return p + R;
          }),
          (h.prototype.writeIntBE = function (f, p, R, L) {
            if (((f = +f), (p = p >>> 0), !L)) {
              const Ht = Math.pow(2, 8 * R - 1);
              K(this, f, p, R, Ht - 1, -Ht);
            }
            let G = R - 1,
              P = 1,
              pt = 0;
            for (this[p + G] = f & 255; --G >= 0 && (P *= 256); )
              (f < 0 && pt === 0 && this[p + G + 1] !== 0 && (pt = 1),
                (this[p + G] = (((f / P) >> 0) - pt) & 255));
            return p + R;
          }),
          (h.prototype.writeInt8 = function (f, p, R) {
            return (
              (f = +f),
              (p = p >>> 0),
              R || K(this, f, p, 1, 127, -128),
              f < 0 && (f = 255 + f + 1),
              (this[p] = f & 255),
              p + 1
            );
          }),
          (h.prototype.writeInt16LE = function (f, p, R) {
            return (
              (f = +f),
              (p = p >>> 0),
              R || K(this, f, p, 2, 32767, -32768),
              (this[p] = f & 255),
              (this[p + 1] = f >>> 8),
              p + 2
            );
          }),
          (h.prototype.writeInt16BE = function (f, p, R) {
            return (
              (f = +f),
              (p = p >>> 0),
              R || K(this, f, p, 2, 32767, -32768),
              (this[p] = f >>> 8),
              (this[p + 1] = f & 255),
              p + 2
            );
          }),
          (h.prototype.writeInt32LE = function (f, p, R) {
            return (
              (f = +f),
              (p = p >>> 0),
              R || K(this, f, p, 4, 2147483647, -2147483648),
              (this[p] = f & 255),
              (this[p + 1] = f >>> 8),
              (this[p + 2] = f >>> 16),
              (this[p + 3] = f >>> 24),
              p + 4
            );
          }),
          (h.prototype.writeInt32BE = function (f, p, R) {
            return (
              (f = +f),
              (p = p >>> 0),
              R || K(this, f, p, 4, 2147483647, -2147483648),
              f < 0 && (f = 4294967295 + f + 1),
              (this[p] = f >>> 24),
              (this[p + 1] = f >>> 16),
              (this[p + 2] = f >>> 8),
              (this[p + 3] = f & 255),
              p + 4
            );
          }),
          (h.prototype.writeBigInt64LE = Mt(function (f, p = 0) {
            return at(this, f, p, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
          })),
          (h.prototype.writeBigInt64BE = Mt(function (f, p = 0) {
            return lt(this, f, p, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
          })));
        function st(b, f, p, R, L, G) {
          if (p + R > b.length) throw new RangeError("Index out of range");
          if (p < 0) throw new RangeError("Index out of range");
        }
        function gt(b, f, p, R, L) {
          return ((f = +f), (p = p >>> 0), L || st(b, f, p, 4), r.write(b, f, p, R, 23, 4), p + 4);
        }
        ((h.prototype.writeFloatLE = function (f, p, R) {
          return gt(this, f, p, !0, R);
        }),
          (h.prototype.writeFloatBE = function (f, p, R) {
            return gt(this, f, p, !1, R);
          }));
        function wt(b, f, p, R, L) {
          return ((f = +f), (p = p >>> 0), L || st(b, f, p, 8), r.write(b, f, p, R, 52, 8), p + 8);
        }
        ((h.prototype.writeDoubleLE = function (f, p, R) {
          return wt(this, f, p, !0, R);
        }),
          (h.prototype.writeDoubleBE = function (f, p, R) {
            return wt(this, f, p, !1, R);
          }),
          (h.prototype.copy = function (f, p, R, L) {
            if (!h.isBuffer(f)) throw new TypeError("argument should be a Buffer");
            if (
              (R || (R = 0),
              !L && L !== 0 && (L = this.length),
              p >= f.length && (p = f.length),
              p || (p = 0),
              L > 0 && L < R && (L = R),
              L === R || f.length === 0 || this.length === 0)
            )
              return 0;
            if (p < 0) throw new RangeError("targetStart out of bounds");
            if (R < 0 || R >= this.length) throw new RangeError("Index out of range");
            if (L < 0) throw new RangeError("sourceEnd out of bounds");
            (L > this.length && (L = this.length), f.length - p < L - R && (L = f.length - p + R));
            const G = L - R;
            return (
              this === f && typeof Uint8Array.prototype.copyWithin == "function"
                ? this.copyWithin(p, R, L)
                : Uint8Array.prototype.set.call(f, this.subarray(R, L), p),
              G
            );
          }),
          (h.prototype.fill = function (f, p, R, L) {
            if (typeof f == "string") {
              if (
                (typeof p == "string"
                  ? ((L = p), (p = 0), (R = this.length))
                  : typeof R == "string" && ((L = R), (R = this.length)),
                L !== void 0 && typeof L != "string")
              )
                throw new TypeError("encoding must be a string");
              if (typeof L == "string" && !h.isEncoding(L))
                throw new TypeError("Unknown encoding: " + L);
              if (f.length === 1) {
                const P = f.charCodeAt(0);
                ((L === "utf8" && P < 128) || L === "latin1") && (f = P);
              }
            } else typeof f == "number" ? (f = f & 255) : typeof f == "boolean" && (f = Number(f));
            if (p < 0 || this.length < p || this.length < R)
              throw new RangeError("Out of range index");
            if (R <= p) return this;
            ((p = p >>> 0), (R = R === void 0 ? this.length : R >>> 0), f || (f = 0));
            let G;
            if (typeof f == "number") for (G = p; G < R; ++G) this[G] = f;
            else {
              const P = h.isBuffer(f) ? f : h.from(f, L),
                pt = P.length;
              if (pt === 0)
                throw new TypeError('The value "' + f + '" is invalid for argument "value"');
              for (G = 0; G < R - p; ++G) this[G + p] = P[G % pt];
            }
            return this;
          }));
        const Xt = {};
        function jt(b, f, p) {
          Xt[b] = class extends p {
            constructor() {
              (super(),
                Object.defineProperty(this, "message", {
                  value: f.apply(this, arguments),
                  writable: !0,
                  configurable: !0,
                }),
                (this.name = `${this.name} [${b}]`),
                this.stack,
                delete this.name);
            }
            get code() {
              return b;
            }
            set code(L) {
              Object.defineProperty(this, "code", {
                configurable: !0,
                enumerable: !0,
                value: L,
                writable: !0,
              });
            }
            toString() {
              return `${this.name} [${b}]: ${this.message}`;
            }
          };
        }
        (jt(
          "ERR_BUFFER_OUT_OF_BOUNDS",
          function (b) {
            return b
              ? `${b} is outside of buffer bounds`
              : "Attempt to access memory outside buffer bounds";
          },
          RangeError,
        ),
          jt(
            "ERR_INVALID_ARG_TYPE",
            function (b, f) {
              return `The "${b}" argument must be of type number. Received type ${typeof f}`;
            },
            TypeError,
          ),
          jt(
            "ERR_OUT_OF_RANGE",
            function (b, f, p) {
              let R = `The value of "${b}" is out of range.`,
                L = p;
              return (
                Number.isInteger(p) && Math.abs(p) > 2 ** 32
                  ? (L = Ke(String(p)))
                  : typeof p == "bigint" &&
                    ((L = String(p)),
                    (p > BigInt(2) ** BigInt(32) || p < -(BigInt(2) ** BigInt(32))) && (L = Ke(L)),
                    (L += "n")),
                (R += ` It must be ${f}. Received ${L}`),
                R
              );
            },
            RangeError,
          ));
        function Ke(b) {
          let f = "",
            p = b.length;
          const R = b[0] === "-" ? 1 : 0;
          for (; p >= R + 4; p -= 3) f = `_${b.slice(p - 3, p)}${f}`;
          return `${b.slice(0, p)}${f}`;
        }
        function ln(b, f, p) {
          (Ie(f, "offset"), (b[f] === void 0 || b[f + p] === void 0) && Ae(f, b.length - (p + 1)));
        }
        function rn(b, f, p, R, L, G) {
          if (b > p || b < f) {
            const P = typeof f == "bigint" ? "n" : "";
            let pt;
            throw (
              f === 0 || f === BigInt(0)
                ? (pt = `>= 0${P} and < 2${P} ** ${(G + 1) * 8}${P}`)
                : (pt = `>= -(2${P} ** ${(G + 1) * 8 - 1}${P}) and < 2 ** ${(G + 1) * 8 - 1}${P}`),
              new Xt.ERR_OUT_OF_RANGE("value", pt, b)
            );
          }
          ln(R, L, G);
        }
        function Ie(b, f) {
          if (typeof b != "number") throw new Xt.ERR_INVALID_ARG_TYPE(f, "number", b);
        }
        function Ae(b, f, p) {
          throw Math.floor(b) !== b
            ? (Ie(b, p), new Xt.ERR_OUT_OF_RANGE("offset", "an integer", b))
            : f < 0
              ? new Xt.ERR_BUFFER_OUT_OF_BOUNDS()
              : new Xt.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${f}`, b);
        }
        const Ta = /[^+/0-9A-Za-z-_]/g;
        function Vn(b) {
          if (((b = b.split("=")[0]), (b = b.trim().replace(Ta, "")), b.length < 2)) return "";
          for (; b.length % 4 !== 0; ) b = b + "=";
          return b;
        }
        function Xn(b, f) {
          f = f || 1 / 0;
          let p;
          const R = b.length;
          let L = null;
          const G = [];
          for (let P = 0; P < R; ++P) {
            if (((p = b.charCodeAt(P)), p > 55295 && p < 57344)) {
              if (!L) {
                if (p > 56319) {
                  (f -= 3) > -1 && G.push(239, 191, 189);
                  continue;
                } else if (P + 1 === R) {
                  (f -= 3) > -1 && G.push(239, 191, 189);
                  continue;
                }
                L = p;
                continue;
              }
              if (p < 56320) {
                ((f -= 3) > -1 && G.push(239, 191, 189), (L = p));
                continue;
              }
              p = (((L - 55296) << 10) | (p - 56320)) + 65536;
            } else L && (f -= 3) > -1 && G.push(239, 191, 189);
            if (((L = null), p < 128)) {
              if ((f -= 1) < 0) break;
              G.push(p);
            } else if (p < 2048) {
              if ((f -= 2) < 0) break;
              G.push((p >> 6) | 192, (p & 63) | 128);
            } else if (p < 65536) {
              if ((f -= 3) < 0) break;
              G.push((p >> 12) | 224, ((p >> 6) & 63) | 128, (p & 63) | 128);
            } else if (p < 1114112) {
              if ((f -= 4) < 0) break;
              G.push(
                (p >> 18) | 240,
                ((p >> 12) & 63) | 128,
                ((p >> 6) & 63) | 128,
                (p & 63) | 128,
              );
            } else throw new Error("Invalid code point");
          }
          return G;
        }
        function un(b) {
          const f = [];
          for (let p = 0; p < b.length; ++p) f.push(b.charCodeAt(p) & 255);
          return f;
        }
        function vn(b, f) {
          let p, R, L;
          const G = [];
          for (let P = 0; P < b.length && !((f -= 2) < 0); ++P)
            ((p = b.charCodeAt(P)), (R = p >> 8), (L = p % 256), G.push(L), G.push(R));
          return G;
        }
        function Me(b) {
          return l.toByteArray(Vn(b));
        }
        function fn(b, f, p, R) {
          let L;
          for (L = 0; L < R && !(L + p >= f.length || L >= b.length); ++L) f[L + p] = b[L];
          return L;
        }
        function Re(b, f) {
          return (
            b instanceof f ||
            (b != null &&
              b.constructor != null &&
              b.constructor.name != null &&
              b.constructor.name === f.name)
          );
        }
        function Ma(b) {
          return b !== b;
        }
        const pe = (function () {
          const b = "0123456789abcdef",
            f = new Array(256);
          for (let p = 0; p < 16; ++p) {
            const R = p * 16;
            for (let L = 0; L < 16; ++L) f[R + L] = b[p] + b[L];
          }
          return f;
        })();
        function Mt(b) {
          return typeof BigInt > "u" ? ce : b;
        }
        function ce() {
          throw new Error("BigInt not supported");
        }
      })(Rc)),
    Rc
  );
}
var I_ = K_();
const F_ = "/assets/styles-Du7m1urp.css",
  P_ = "http://localhost:3000";
async function Ot(a, l) {
  const r = l?.body instanceof FormData,
    o = await fetch(`${P_}${a}`, {
      ...l,
      headers: r ? { ...l?.headers } : { "Content-Type": "application/json", ...l?.headers },
    });
  if (!o.ok) {
    const c = await o.text().catch(() => o.statusText);
    throw new Error(c || `Request failed: ${o.status}`);
  }
  return o.json();
}
const Xm = {
    getMessage: () => Ot("/auth/message"),
    authenticate: (a) => Ot("/auth/wallet", { method: "POST", body: JSON.stringify(a) }),
  },
  J_ = { getMe: (a) => Ot("/auth/me", { headers: { Authorization: `Bearer ${a}` } }) },
  k_ = {
    setRole: (a, l) =>
      Ot("/user/role", {
        method: "POST",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify({ role: l }),
      }),
  },
  Qm = {
    connect: (a, l) =>
      Ot("/auth/github", {
        method: "POST",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify({ code: l }),
      }),
    disconnect: (a) =>
      Ot("/auth/github", { method: "DELETE", headers: { Authorization: `Bearer ${a}` } }),
    saveInstallation: (a, l) =>
      Ot("/auth/github/installation", {
        method: "POST",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify({ installationId: l }),
      }),
    listRepos: (a) => Ot("/github/repos", { headers: { Authorization: `Bearer ${a}` } }),
    checkInstallation: (a) =>
      Ot("/github/installation", { headers: { Authorization: `Bearer ${a}` } }),
  },
  Zm = {
    send: (a, l) =>
      Ot("/invite", {
        method: "POST",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify(l),
      }),
    getMyInvites: (a) => Ot("/invite/me", { headers: { Authorization: `Bearer ${a}` } }),
    getProjectInvites: (a, l) =>
      Ot(`/invite/project/${l}`, { headers: { Authorization: `Bearer ${a}` } }),
    accept: (a, l) =>
      Ot(`/invite/${l}/accept`, { method: "PATCH", headers: { Authorization: `Bearer ${a}` } }),
    reject: (a, l) =>
      Ot(`/invite/${l}/reject`, { method: "PATCH", headers: { Authorization: `Bearer ${a}` } }),
    cancel: (a, l) =>
      Ot(`/invite/${l}`, { method: "DELETE", headers: { Authorization: `Bearer ${a}` } }),
  };
var $_ = ((a) => (
  (a.PENDING_PROVIDER_APPROVAL = "pending_provider_approval"),
  (a.REJECTED = "rejected"),
  (a.WAITING_FOR_DEPOSIT = "waiting_for_deposit"),
  (a.ACTIVE = "active"),
  (a.IN_PROGRESS = "in_progress"),
  (a.COMPLETED = "completed"),
  (a.DISPUTED = "disputed"),
  a
))($_ || {});
const wu = {
    list: (a) => Ot("/project", { headers: { Authorization: `Bearer ${a}` } }),
    getMembers: (a) => Ot("/project/members", { headers: { Authorization: `Bearer ${a}` } }),
    get: (a, l) => Ot(`/project/${l}`, { headers: { Authorization: `Bearer ${a}` } }),
    create: (a, l) =>
      Ot("/project", {
        method: "POST",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify(l),
      }),
    update: (a, l, r) =>
      Ot(`/project/${l}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify(r),
      }),
    removeMember: (a, l, r) =>
      Ot(`/project/${l}/members/${r}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${a}` },
      }),
  },
  K2 = {
    create: (a, l, r) => {
      const o = new FormData();
      return (
        o.append("providerId", r.providerId),
        o.append("title", r.title),
        o.append("description", r.description),
        o.append("amount", r.amount),
        r.startDate && o.append("startDate", r.startDate),
        r.endDate && o.append("endDate", r.endDate),
        (r.files ?? []).forEach((c) => o.append("files", c)),
        Ot(`/milestone/project/${l}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${a}` },
          body: o,
        })
      );
    },
    listForProject: (a, l) =>
      Ot(`/milestone/project/${l}`, { headers: { Authorization: `Bearer ${a}` } }),
    listForProvider: (a) => Ot("/milestone/me", { headers: { Authorization: `Bearer ${a}` } }),
    get: (a, l) => Ot(`/milestone/${l}`, { headers: { Authorization: `Bearer ${a}` } }),
    accept: (a, l) =>
      Ot(`/milestone/${l}/accept`, { method: "PATCH", headers: { Authorization: `Bearer ${a}` } }),
    reject: (a, l, r) =>
      Ot(`/milestone/${l}/reject`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify({ rejectionReason: r }),
      }),
    fund: (a, l) =>
      Ot(`/milestone/${l}/fund`, { method: "PATCH", headers: { Authorization: `Bearer ${a}` } }),
    complete: (a, l) =>
      Ot(`/milestone/${l}/complete`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${a}` },
      }),
    dispute: (a, l) =>
      Ot(`/milestone/${l}/dispute`, { method: "PATCH", headers: { Authorization: `Bearer ${a}` } }),
    submitRepo: (a, l, r) =>
      Ot(`/milestone/${l}/github-repo`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${a}` },
        body: JSON.stringify({ githubRepo: r }),
      }),
    getPinataGatewayUrl: (a) =>
      Ot("/milestone/pinata-gateway-url", { headers: { Authorization: `Bearer ${a}` } }),
    getFiles: (a, l) => Ot(`/milestone/${l}/files`, { headers: { Authorization: `Bearer ${a}` } }),
  },
  I2 = {
    listForMilestone: (a, l) =>
      Ot(`/analyze/milestone/${l}`, { headers: { Authorization: `Bearer ${a}` } }),
  },
  Ru = "jwt";
function Km() {
  if (typeof window > "u") return null;
  const a = window,
    l = a.phantom?.solana ?? a.solana;
  return l?.isPhantom ? l : null;
}
function W_(a) {
  const l = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let r = "",
    o = BigInt(0);
  for (const c of a) o = o * BigInt(256) + BigInt(c);
  for (; o > BigInt(0); ) ((r = l[Number(o % BigInt(58))] + r), (o = o / BigInt(58)));
  for (const c of a)
    if (c === 0) r = "1" + r;
    else break;
  return r;
}
function Im(a) {
  return a.length <= 10 ? a : `${a.slice(0, 4)}…${a.slice(-4)}`;
}
const l0 = rt.createContext(null);
function t2({ children: a }) {
  const [l, r] = rt.useState(null),
    [o, c] = rt.useState(null),
    [d, y] = rt.useState(!0);
  rt.useEffect(() => {
    const A = localStorage.getItem(Ru);
    if (!A) {
      y(!1);
      return;
    }
    J_.getMe(A)
      .then((x) => {
        c(A);
        const M = Im(x.publicKey);
        r({
          id: x.id,
          address: x.publicKey,
          short: M,
          initial: x.publicKey.charAt(0).toUpperCase(),
          name: M,
          role: x.role,
          githubUsername: x.githubUsername ?? null,
          githubAvatarUrl: x.githubAvatarUrl ?? null,
        });
      })
      .catch(() => {
        localStorage.removeItem(Ru);
      })
      .finally(() => {
        y(!1);
      });
  }, []);
  const h = async () => {
      const A = Km();
      if (!A)
        throw (
          typeof window < "u" &&
            window.open("https://phantom.app/", "_blank", "noopener,noreferrer"),
          new Error("Phantom wallet not detected. Please install Phantom and retry.")
        );
      const { publicKey: x } = await A.connect(),
        M = x.toString(),
        { message: D, nonce: C } = await Xm.getMessage(),
        B = new TextEncoder().encode(D),
        { signature: q } = await A.signMessage(B, "utf8"),
        Q = W_(q),
        { token: V, user: $ } = await Xm.authenticate({ publicKey: M, signature: Q, nonce: C });
      (c(V), localStorage.setItem(Ru, V));
      const nt = Im(M),
        F = {
          id: $.id,
          address: M,
          short: nt,
          initial: M.charAt(0).toUpperCase(),
          name: nt,
          role: $.role,
          githubUsername: $.githubUsername ?? null,
          githubAvatarUrl: $.githubAvatarUrl ?? null,
        };
      return (r(F), F);
    },
    v = async (A) => {
      if (!o) throw new Error("Not authenticated");
      (await k_.setRole(o, A), r((x) => x && { ...x, role: A }));
    },
    g = async (A) => {
      if (!o) throw new Error("Not authenticated");
      const x = await Qm.connect(o, A);
      r(
        (M) =>
          M && {
            ...M,
            githubUsername: x.githubUsername ?? null,
            githubAvatarUrl: x.githubAvatarUrl ?? null,
          },
      );
    },
    _ = async () => {
      if (!o) throw new Error("Not authenticated");
      (await Qm.disconnect(o),
        r((A) => A && { ...A, githubUsername: null, githubAvatarUrl: null }));
    },
    S = async () => {
      const A = Km();
      try {
        await A?.disconnect();
      } catch {}
      (r(null), c(null), localStorage.removeItem(Ru));
    };
  return W.jsx(l0.Provider, {
    value: {
      user: l,
      token: o,
      isInitializing: d,
      connectPhantom: h,
      setRole: v,
      connectGithub: g,
      disconnectGithub: _,
      logout: S,
    },
    children: a,
  });
}
function e2() {
  const a = rt.useContext(l0);
  if (!a) throw new Error("useAuth must be used inside AuthProvider");
  return a;
}
const r0 = rt.createContext(null),
  n2 = (a) => (a.length <= 10 ? a : `${a.slice(0, 4)}…${a.slice(-4)}`);
function Vi(a) {
  return {
    id: a.id,
    name: a.title,
    description: a.description ?? "",
    createdAt: a.createdAt,
    ownerId: a.owner.id,
  };
}
function a2({ children: a }) {
  const { token: l, user: r } = e2(),
    [o, c] = rt.useState([]),
    [d, y] = rt.useState([]),
    [h, v] = rt.useState([]),
    [g, _] = rt.useState(!1);
  rt.useEffect(() => {
    !l ||
      !r ||
      (_(!0),
      r.role === "provider"
        ? Promise.all([wu.getMembers(l), Zm.getMyInvites(l)])
            .then(([B, q]) => {
              (console.log("🚀 ~ AppDataProvider ~ invites:", q), y(B.map(Vi)), v(q));
            })
            .catch(() => {})
            .finally(() => _(!1))
        : wu
            .list(l)
            .then((B) => c(B.map(Vi)))
            .catch(() => {})
            .finally(() => _(!1)));
  }, [l, r]);
  const S = async ({ name: B, description: q }) => {
      const Q = await wu.create(l, { title: B, description: q }),
        V = Vi(Q);
      return (c(($) => [V, ...$]), V);
    },
    A = async (B, { name: q, description: Q }) => {
      const V = await wu.update(l, B, {
          ...(q !== void 0 && { title: q }),
          ...(Q !== void 0 && { description: Q }),
        }),
        $ = Vi(V);
      return (
        c((nt) =>
          nt.map((F) => (F.id === B ? { ...F, name: $.name, description: $.description } : F)),
        ),
        $
      );
    },
    x = async (B) => {
      (await Zm.accept(l, B),
        v((Q) => Q.map((V) => (V.id === B ? { ...V, status: "accepted" } : V))));
      const q = h.find((Q) => Q.id === B);
      if (q) {
        const Q = Vi(q.project);
        y((V) => (V.some(($) => $.id === Q.id) ? V : [Q, ...V]));
      }
    },
    M = (B) => o,
    D = (B) => d,
    C = (B) =>
      h
        .filter((q) => q.status === "pending")
        .map((q) => ({
          project: Vi(q.project),
          invite: {
            id: q.id,
            address: q.for.publicKey,
            short: n2(q.for.publicKey),
            invitedAt: q.createdAt,
          },
        }));
  return W.jsx(r0.Provider, {
    value: {
      projects: o,
      memberProjects: d,
      myInvites: h,
      projectsLoading: g,
      createProject: S,
      updateProject: A,
      acceptInvite: x,
      projectsOwnedBy: M,
      projectsForProvider: D,
      invitesForProvider: C,
    },
    children: a,
  });
}
function F2() {
  const a = rt.useContext(r0);
  if (!a) throw new Error("useAppData must be used inside AppDataProvider");
  return a;
}
typeof window < "u" && (window.Buffer = I_.Buffer);
function i2() {
  return W.jsx("div", {
    className: "flex min-h-screen items-center justify-center bg-background px-4",
    children: W.jsxs("div", {
      className: "max-w-md text-center",
      children: [
        W.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
        W.jsx("h2", {
          className: "mt-4 text-xl font-semibold text-foreground",
          children: "Page not found",
        }),
        W.jsx("p", {
          className: "mt-2 text-sm text-muted-foreground",
          children: "The page you're looking for doesn't exist or has been moved.",
        }),
        W.jsx("div", {
          className: "mt-6",
          children: W.jsx(Kc, {
            to: "/",
            className:
              "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
            children: "Go home",
          }),
        }),
      ],
    }),
  });
}
const Gn = __({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [{ rel: "stylesheet", href: F_ }],
  }),
  shellComponent: l2,
  component: r2,
  notFoundComponent: i2,
});
function l2({ children: a }) {
  return W.jsxs("html", {
    lang: "en",
    children: [
      W.jsx("head", { children: W.jsx(G_, {}) }),
      W.jsxs("body", { children: [a, W.jsx(V_, {})] }),
    ],
  });
}
function r2() {
  return W.jsx(t2, { children: W.jsx(a2, { children: W.jsx(a0, {}) }) });
}
const u2 = "modulepreload",
  o2 = function (a) {
    return "/" + a;
  },
  Fm = {},
  Ra = function (l, r, o) {
    let c = Promise.resolve();
    if (r && r.length > 0) {
      let v = function (g) {
        return Promise.all(
          g.map((_) =>
            Promise.resolve(_).then(
              (S) => ({ status: "fulfilled", value: S }),
              (S) => ({ status: "rejected", reason: S }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const y = document.querySelector("meta[property=csp-nonce]"),
        h = y?.nonce || y?.getAttribute("nonce");
      c = v(
        r.map((g) => {
          if (((g = o2(g)), g in Fm)) return;
          Fm[g] = !0;
          const _ = g.endsWith(".css"),
            S = _ ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${g}"]${S}`)) return;
          const A = document.createElement("link");
          if (
            ((A.rel = _ ? "stylesheet" : u2),
            _ || (A.as = "script"),
            (A.crossOrigin = ""),
            (A.href = g),
            h && A.setAttribute("nonce", h),
            document.head.appendChild(A),
            _)
          )
            return new Promise((x, M) => {
              (A.addEventListener("load", x),
                A.addEventListener("error", () => M(new Error(`Unable to preload CSS for ${g}`))));
            });
        }),
      );
    }
    function d(y) {
      const h = new Event("vite:preloadError", { cancelable: !0 });
      if (((h.payload = y), window.dispatchEvent(h), !h.defaultPrevented)) throw y;
    }
    return c.then((y) => {
      for (const h of y || []) h.status === "rejected" && d(h.reason);
      return l().catch(d);
    });
  },
  s2 = () => Ra(() => import("./role-B7f6VJfE.js"), __vite__mapDeps([0, 1])),
  c2 = Aa("/role")({
    component: wa(s2, "component"),
    head: () => ({
      meta: [
        { title: "Choose your role — Git Escrow" },
        {
          name: "description",
          content: "Select whether you join Git Escrow as a Provider or Consumer.",
        },
      ],
    }),
  }),
  f2 = () => Ra(() => import("./github-callback-PxlxoFch.js"), []),
  d2 = Aa("/github-callback")({ component: wa(f2, "component") }),
  h2 = () => Ra(() => import("./github-DTU-TjY9.js"), __vite__mapDeps([2, 1])),
  p2 = Aa("/github")({
    component: wa(h2, "component"),
    head: () => ({
      meta: [
        { title: "Connect GitHub — Git Escrow" },
        { name: "description", content: "Link your GitHub account to verify code deliverables." },
      ],
    }),
  });
function P2(a) {
  const r = new URLSearchParams({ redirect_uri: `${window.location.origin}/github-callback` });
  return (
    a && r.set("state", a),
    `https://github.com/apps/undefined/installations/new?${r.toString()}`
  );
}
const m2 = () => Ra(() => import("./dashboard-BhoMfLL0.js"), __vite__mapDeps([3, 1, 4])),
  y2 = Aa("/dashboard")({
    component: wa(m2, "component"),
    head: () => ({
      meta: [
        { title: "Dashboard — Git Escrow" },
        { name: "description", content: "Your Git Escrow projects and milestones." },
      ],
    }),
  }),
  g2 = () => Ra(() => import("./auth-CbBaPISU.js"), __vite__mapDeps([5, 1])),
  v2 = Aa("/auth")({
    component: wa(g2, "component"),
    head: () => ({
      meta: [
        { title: "Connect wallet — Git Escrow" },
        {
          name: "description",
          content: "Connect your Phantom Solana wallet to access your Git Escrow workspace.",
        },
      ],
    }),
  }),
  S2 = () => Ra(() => import("./index-C4M91O3s.js"), __vite__mapDeps([6, 1])),
  b2 = Aa("/")({
    component: wa(S2, "component"),
    head: () => ({
      meta: [
        { title: "Git Escrow — Verification Console" },
        {
          name: "description",
          content:
            "Git Escrow Verification Console — submit specification archive and deliverables for multi-model AI consensus scoring.",
        },
      ],
    }),
  }),
  E2 = () => Ra(() => import("./projects._projectId-DEmizynJ.js"), __vite__mapDeps([7, 1, 4, 8])),
  _2 = Aa("/projects/$projectId")({
    component: wa(E2, "component"),
    head: () => ({
      meta: [
        { title: "Project — Git Escrow" },
        { name: "description", content: "Project milestones and escrow detail." },
      ],
    }),
  }),
  x2 = () =>
    Ra(
      () => import("./projects._projectId_.milestones._milestoneId-C25M6Rpm.js"),
      __vite__mapDeps([9, 1, 8]),
    ),
  A2 = Aa("/projects/$projectId_/milestones/$milestoneId")({
    component: wa(x2, "component"),
    head: () => ({
      meta: [
        { title: "Milestone — Git Escrow" },
        { name: "description", content: "Milestone detail and escrow actions." },
      ],
    }),
  }),
  w2 = c2.update({ id: "/role", path: "/role", getParentRoute: () => Gn }),
  R2 = d2.update({ id: "/github-callback", path: "/github-callback", getParentRoute: () => Gn }),
  T2 = p2.update({ id: "/github", path: "/github", getParentRoute: () => Gn }),
  M2 = y2.update({ id: "/dashboard", path: "/dashboard", getParentRoute: () => Gn }),
  C2 = v2.update({ id: "/auth", path: "/auth", getParentRoute: () => Gn }),
  O2 = b2.update({ id: "/", path: "/", getParentRoute: () => Gn }),
  z2 = _2.update({
    id: "/projects/$projectId",
    path: "/projects/$projectId",
    getParentRoute: () => Gn,
  }),
  B2 = A2.update({
    id: "/projects/$projectId_/milestones/$milestoneId",
    path: "/projects/$projectId/milestones/$milestoneId",
    getParentRoute: () => Gn,
  }),
  U2 = {
    IndexRoute: O2,
    AuthRoute: C2,
    DashboardRoute: M2,
    GithubRoute: T2,
    GithubCallbackRoute: R2,
    RoleRoute: w2,
    ProjectsProjectIdRoute: z2,
    ProjectsProjectIdMilestonesMilestoneIdRoute: B2,
  },
  D2 = Gn._addFileChildren(U2);
function L2({ error: a, reset: l }) {
  const r = xe();
  return W.jsx("div", {
    className: "flex min-h-screen items-center justify-center bg-background px-4",
    children: W.jsxs("div", {
      className: "max-w-md text-center",
      children: [
        W.jsx("div", {
          className:
            "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10",
          children: W.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-8 w-8 text-destructive",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: W.jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
            }),
          }),
        }),
        W.jsx("h1", {
          className: "text-2xl font-bold tracking-tight text-foreground",
          children: "Something went wrong",
        }),
        W.jsx("p", {
          className: "mt-2 text-sm text-muted-foreground",
          children: "An unexpected error occurred. Please try again.",
        }),
        !1,
        W.jsxs("div", {
          className: "mt-6 flex items-center justify-center gap-3",
          children: [
            W.jsx("button", {
              onClick: () => {
                (r.invalidate(), l());
              },
              className:
                "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
              children: "Try again",
            }),
            W.jsx("a", {
              href: "/",
              className:
                "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
              children: "Go home",
            }),
          ],
        }),
      ],
    }),
  });
}
const N2 = () =>
  D_({
    routeTree: D2,
    context: {},
    scrollRestoration: !0,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: L2,
  });
async function j2() {
  const a = await N2();
  let l;
  return (
    (l = []),
    (window.__TSS_START_OPTIONS__ = { serializationAdapters: l }),
    l.push(qE),
    a.options.serializationAdapters && l.push(...a.options.serializationAdapters),
    a.update({ basepath: "", serializationAdapters: l }),
    a.stores.matchesId.get().length || (await GE(a)),
    a
  );
}
async function H2() {
  const a = await j2();
  return (window.$_TSR?.h(), a);
}
var Tc;
function q2() {
  return (Tc || (Tc = H2()), W.jsx(ZE, { promise: Tc, children: (a) => W.jsx(j_, { router: a }) }));
}
rt.startTransition(() => {
  Ov.hydrateRoot(document, W.jsx(rt.StrictMode, { children: W.jsx(q2, {}) }));
});
export {
  Kc as L,
  $_ as M,
  _2 as R,
  Wy as a,
  F2 as b,
  P2 as c,
  Y2 as d,
  Ev as e,
  K_ as f,
  Qm as g,
  I_ as h,
  Zm as i,
  W as j,
  I2 as k,
  A2 as l,
  K2 as m,
  xe as n,
  se as o,
  wu as p,
  Fa as q,
  rt as r,
  e2 as u,
};
