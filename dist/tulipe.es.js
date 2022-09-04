import { computed as P, getCurrentInstance as B, watch as k, isRef as A, ref as _, resolveComponent as C, openBlock as c, createBlock as g, withCtx as I, createElementVNode as l, toDisplayString as f, unref as i, createVNode as R, createTextVNode as T, createElementBlock as d, Fragment as v, renderList as S, shallowRef as X, withDirectives as j, vModelText as q, createCommentVNode as x, normalizeClass as tt, renderSlot as w, pushScopeId as et, popScopeId as nt, vModelSelect as st, markRaw as at, onUnmounted as U } from "vue";
import { ethers as O, JsonRpcProvider as ot, StaticJsonRpcProvider as rt, EtherscanProvider as it, InfuraProvider as lt, AlchemyProvider as ct, CloudflareProvider as ut, PocketProvider as dt, AnkrProvider as ht, FallbackProvider as pt, IpcProvider as ft, JsonRpcBatchProvider as mt, UrlJsonRpcProvider as yt, Web3Provider as _t, WebSocketProvider as wt } from "ethers";
class vt {
  constructor() {
    const t = a.config.wallets.getAvailable();
    for (const e of t) {
      const n = Xe[e.id];
      n && (this[e.id] = new n());
    }
  }
}
class St {
  constructor() {
    for (const t of a.config.networks.getAll())
      if (t.contracts)
        for (const e of Object.keys(t.contracts))
          this[e] = new H();
  }
  getAll() {
    const t = {};
    for (const [e, n] of Object.entries(this))
      n instanceof H && (t[e] = n);
    return t;
  }
}
class gt {
  constructor() {
    this.contracts = {}, this.wallets = {};
  }
  async _asyncInit() {
    a.provider.onSafe(() => {
      a.provider.on("block", async function(t) {
        const e = await a.provider.getBlockWithTransactions(t);
        for (const n of e.transactions)
          Object.keys(this.contracts).includes(n.to) ? this.contracts[n.to].update() : Object.keys(this.wallets).includes(n.to) && this.wallets[n.to].update(), Object.keys(this.contracts).includes(n.from) ? this.contracts[n.from].update() : Object.keys(this.wallets).includes(n.from) && this.wallets[n.from].update();
      });
    });
  }
  addContractWatcher(t) {
    Object.keys(this.contracts).includes(t.address) || (this.contracts[t.address] = new Ke(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.contracts).includes(t.address) && delete this.contracts[t.address];
  }
  addWalletWatcher(t) {
    Object.keys(this.wallets).includes(t) || (this.wallets[t] = new Je(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.wallets).includes(t) && delete this.wallets[t];
  }
}
class It {
  constructor() {
  }
  init(t = null) {
    this.config = new Be(t), this.status = new W("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = P(() => this.status.is("INITIALIZED")), this.OnSafe = Ie, this.chainWatchers = new gt(), this.wallets = new vt(), this.provider = new m(), this.pro = this.provider, this.signer = new qe(), this.sig = this.signer, this.contracts = new St(), this.con = this.contracts;
  }
  onSafe(t) {
    const e = B();
    if (this.isSafe.value)
      t(e);
    else {
      const n = k(this.isSafe, () => {
        this.isSafe.value && (t(e), n());
      });
    }
  }
}
const a = new It();
function L(s) {
  return s && typeof s == "object" && !Array.isArray(s);
}
function $(s, ...t) {
  if (!t.length)
    return s;
  const e = t.shift();
  if (L(s) && L(e))
    for (const n in e)
      L(e[n]) ? (s[n] || Object.assign(s, {
        [n]: {}
      }), $(s[n], e[n])) : Object.assign(s, {
        [n]: e[n]
      });
  return $(s, ...t);
}
function xt(s) {
  const t = s.split(" ");
  for (let e = 0; e < t.length; e++)
    t[e] = t[e][0].toUpperCase() + t[e].substring(1);
  return t.join(" ");
}
function D(s) {
  return A(s) ? D(s.value) : s;
}
function E(s, t) {
  A(s) ? s.value = t : s = t;
}
const Ct = {
  required: !1,
  type: String,
  default: "minimal",
  validator(s) {
    return ["unstylized", "minimal", "opinionated"].includes(s);
  }
}, Et = { class: "ContractInteractor" }, bt = /* @__PURE__ */ T(" Methods : "), kt = /* @__PURE__ */ l("br", null, null, -1), Rt = /* @__PURE__ */ T(" Events : "), Nt = /* @__PURE__ */ l("br", null, null, -1), nn = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const t = s, e = a.contracts[t.contract];
    let n = _("not owned");
    return a.contracts[t.contract].onReadSafe(async function() {
      try {
        n.value = await e.owner();
      } catch {
      }
    }), (o, r) => {
      const u = C("OnContractReadSafe");
      return c(), g(u, {
        contract: t.contract
      }, {
        default: I(() => [
          l("div", Et, [
            l("ul", null, [
              l("li", null, "Address : " + f(i(e).address), 1),
              l("li", null, "Owner : " + f(i(n)), 1),
              l("li", null, [
                bt,
                kt,
                R(i(Pt), {
                  contract: t.contract
                }, null, 8, ["contract"])
              ]),
              l("li", null, [
                Rt,
                Nt,
                R(i(Gt), {
                  contract: t.contract
                }, null, 8, ["contract"])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ot = { class: "MethodsInteractor" }, Pt = {
  __name: "MethodsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const t = s, e = a.contracts[t.contract];
    return (n, o) => {
      const r = C("OnContractReadSafe");
      return c(), g(r, {
        contract: t.contract
      }, {
        default: I(() => [
          l("div", Ot, [
            l("ul", null, [
              (c(!0), d(v, null, S(i(e).interface.functions, (u, h) => (c(), d("li", null, [
                R(i(Lt), {
                  contract: t.contract,
                  method: h
                }, null, 8, ["contract", "method"])
              ]))), 256))
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Tt = { class: "MethodInteractor" }, $t = { key: 0 }, At = /* @__PURE__ */ l("p", null, "Inputs :", -1), Dt = ["onUpdate:modelValue", "placeholder"], Wt = { key: 0 }, Ut = { key: 1 }, Bt = /* @__PURE__ */ l("p", null, "Outputs :", -1), jt = ["onUpdate:modelValue", "placeholder"], Mt = ["placeholder"], Vt = { key: 2 }, Lt = {
  __name: "MethodInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const t = s, e = X(new J(t.contract, t.method));
    function n(o) {
      return `${o.name && o.name !== "null" ? o.name : ""} (${o.type})`;
    }
    return (o, r) => {
      const u = C("OnContractReadSafe");
      return c(), g(u, {
        contract: t.contract
      }, {
        default: I(() => [
          l("div", Tt, [
            R(i(Xt), {
              contract: t.contract,
              method: t.method,
              modelValue: i(e),
              "onUpdate:modelValue": r[0] || (r[0] = (h) => A(e) ? e.value = h : null),
              configs: { content: t.method, notx: !0, noerror: !0 }
            }, null, 8, ["contract", "method", "modelValue", "configs"]),
            l("small", null, f(i(e).methodInfos.stateMutability), 1),
            Object.keys(i(e).methodInfos.inputs).length > 0 || i(e).methodInfos.payable ? (c(), d("div", $t, [
              At,
              l("ul", null, [
                (c(!0), d(v, null, S(i(e).methodInfos.inputs, (h, p) => (c(), d("li", null, [
                  j(l("input", {
                    "onUpdate:modelValue": (y) => i(e).args.value[p] = y,
                    type: "text",
                    placeholder: n(h)
                  }, null, 8, Dt), [
                    [q, i(e).args.value[p]]
                  ]),
                  T(" " + f(i(e).args.value[p]) + " " + f(typeof i(e).args.value[p]), 1)
                ]))), 256)),
                i(e).methodInfos.payable ? (c(), d("li", Wt, [
                  R(i($e), {
                    modelValue: i(e).txArgs.value.value,
                    "onUpdate:modelValue": r[1] || (r[1] = (h) => i(e).txArgs.value.value = h)
                  }, null, 8, ["modelValue"]),
                  T(" " + f(i(e).txArgs.value.value) + " " + f(typeof i(e).txArgs.value.value), 1)
                ])) : x("", !0)
              ])
            ])) : x("", !0),
            Object.keys(i(e).methodInfos.outputs).length > 0 ? (c(), d("div", Ut, [
              Bt,
              l("ul", null, [
                (c(!0), d(v, null, S(i(e).methodInfos.outputs, (h, p) => (c(), d("li", null, [
                  i(e).data.value ? j((c(), d("input", {
                    key: 0,
                    "onUpdate:modelValue": (y) => i(e).data.value[p] = y,
                    type: "text",
                    placeholder: n(h),
                    disabled: ""
                  }, null, 8, jt)), [
                    [q, i(e).data.value[p]]
                  ]) : (c(), d("input", {
                    key: 1,
                    type: "text",
                    placeholder: n(h),
                    disabled: ""
                  }, null, 8, Mt))
                ]))), 256))
              ])
            ])) : x("", !0),
            i(e).status.is("ERROR") ? (c(), d("p", Vt, f(i(e).error.value.reason), 1)) : x("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, qt = { class: "EventsInteractor" }, Gt = {
  __name: "EventsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const t = s, e = a.contracts[t.contract];
    return (n, o) => {
      const r = C("OnContractReadSafe");
      return c(), g(r, {
        contract: t.contract
      }, {
        default: I(() => [
          l("div", qt, [
            l("ul", null, [
              (c(!0), d(v, null, S(i(e).interface.events, (u, h) => (c(), d("li", null, [
                R(i(zt), {
                  contract: t.contract,
                  event: h
                }, null, 8, ["contract", "event"])
              ]))), 256))
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ft = { class: "EventInteractor" }, Ht = /* @__PURE__ */ T("Logs: "), zt = {
  __name: "EventInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    },
    event: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const t = s, e = a.contracts[t.contract];
    let n = _({}), o = _({}), r = _(0), u = _([]);
    return e.onReadSafe(() => {
      n.value = e.interface.events[t.event], o.value = e.filters[n.value.name], e.on(o.value, (h) => {
        r.value++;
        let p = `Block ${h.blockNumber} -> {`;
        for (const y of n.value.inputs)
          p += `${y.name}:${h.args[y.name]}, `;
        p = p.substring(0, p.length - 2) + "}", u.value.push(p);
      });
    }), (h, p) => {
      const y = C("OnContractReadSafe");
      return c(), g(y, {
        contract: t.contract
      }, {
        default: I(() => [
          l("div", Ft, [
            l("p", null, f(i(n).name), 1),
            l("ul", null, [
              l("li", null, "Count : " + f(i(r)), 1),
              l("li", null, [
                Ht,
                l("ul", null, [
                  (c(!0), d(v, null, S(i(u), (F) => (c(), d("li", null, f(F), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Kt = { class: "TransactButton" }, Jt = {
  key: 1,
  disabled: ""
}, Yt = {
  key: 2,
  disabled: ""
}, Zt = {
  key: 3,
  disabled: ""
}, Qt = { key: 4 }, Xt = {
  __name: "Transact",
  props: {
    modelValue: {},
    contract: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      required: !0
    },
    args: {
      type: Array,
      required: !1
    },
    txArgs: {
      type: Object,
      required: !1
    },
    configs: {
      type: Object,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(s, { emit: t }) {
    const e = s, n = a.contracts[e.contract];
    let o = P({
      get() {
        return e.modelValue;
      },
      set(u) {
        t("update:modelValue", u);
      }
    });
    function r() {
      const u = e.args ? e.args : [], h = e.txArgs ? e.txArgs : {};
      o.value.send(u, h);
    }
    return e.config && e.configs.notx && n.onReadSafe(() => {
      o = new J(e.contract, e.method);
    }), (u, h) => {
      const p = C("OnContractReadSafe");
      return c(), g(p, {
        contract: e.contract
      }, {
        default: I(() => [
          l("div", Kt, [
            i(o).status.is("READY") ? (c(), d("button", {
              key: 0,
              onClick: r
            }, f(e.configs && e.configs.content ? e.configs.content : "Transact"), 1)) : i(o).status.is("SENT") ? (c(), d("button", Jt, "Transaction sent...")) : i(o).status.is("ERROR") ? (c(), d("button", Yt, "Transaction error!")) : i(o).status.is("SUCCESS") ? (c(), d("button", Zt, "Success !")) : x("", !0),
            !(e.configs && e.configs.noerror) && i(o).status.is("ERROR") ? (c(), d("p", Qt, f(i(o).error.value.reason), 1)) : x("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
};
const z = (s, t) => {
  const e = s.__vccOpts || s;
  for (const [n, o] of t)
    e[n] = o;
  return e;
}, te = {
  __name: "ConnectWalletButton",
  props: {
    styleLevel: Ct
  },
  setup(s) {
    const t = s;
    return (e, n) => (c(), g(i(a).provider.OnSafe, null, {
      default: I(() => [
        l("div", {
          class: tt(["ConnectWalletButton", `ve-${t.styleLevel}`])
        }, null, 2)
      ]),
      _: 1
    }));
  }
}, sn = /* @__PURE__ */ z(te, [["__scopeId", "data-v-a10b4efb"]]), ee = { class: "SelectWalletDropdown" }, ne = { key: 0 }, se = /* @__PURE__ */ l("p", null, "Connection requested...", -1), ae = [
  se
], oe = { key: 1 }, re = /* @__PURE__ */ l("p", null, "Connection refused!", -1), ie = [
  re
], le = { key: 2 }, ce = /* @__PURE__ */ l("p", null, "Select a wallet", -1), ue = [
  ce
], de = ["src", "alt"], he = ["onClick"], pe = ["src", "alt"], an = {
  __name: "SelectWalletDropdown",
  setup(s) {
    let t = _(null), e = _([]), n = _(!1), o = _({});
    a.onSafe(async function() {
      e.value = a.config.wallets.getAvailable();
    }), a.provider.onSafe(async function() {
      o.value = await a.config.networks.getCurrent();
    }), a.signer.onSafe(async function() {
      t.value = await a.config.wallets.getCurrent(), e.value = a.config.wallets.getAvailable().filter((u) => u.id !== t.value.id);
    });
    function r() {
      n.value = !n.value;
    }
    return (u, h) => {
      const p = C("OnDappSafe");
      return c(), g(p, null, {
        default: I(() => [
          l("div", ee, [
            l("ul", null, [
              i(a).signer.status.is("REQUESTED") ? (c(), d("li", ne, ae)) : i(a).signer.status.is("REFUSED") ? (c(), d("li", oe, ie)) : i(a).provider.status.is("WRONG_NETWORK") ? (c(), d("li", le, [
                l("p", null, "Wrong network! (" + f(i(o) ? i(o).displayName : "unknown") + ")", 1)
              ])) : i(a).signer.status.is("DISCONNECTED") || !i(t) ? (c(), d("li", {
                key: 3,
                onClick: r
              }, ue)) : i(a).signer.status.is("CONNECTED") ? (c(), d("li", {
                key: 4,
                onClick: r
              }, [
                l("img", {
                  width: "40",
                  src: i(t).icon ? i(t).icon : i(a).config.defaults.wallets.icon,
                  alt: i(t).displayName + " logo"
                }, null, 8, de),
                l("p", null, f(i(t).displayName), 1)
              ])) : x("", !0),
              i(n) ? (c(!0), d(v, { key: 5 }, S(i(e), (y) => (c(), d("li", {
                key: y.id,
                onClick: (F) => i(a).signer.connectWallet(y.id)
              }, [
                l("img", {
                  width: "40",
                  src: y.icon ? y.icon : i(a).config.defaults.wallets.icon,
                  alt: y.displayName + " logo"
                }, null, 8, pe),
                l("p", null, f(y.displayName), 1)
              ], 8, he))), 128)) : x("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, fe = { class: "SelectNetworkDropdown" }, me = { key: 0 }, ye = ["src", "alt"], _e = { key: 1 }, we = /* @__PURE__ */ l("p", null, "Select a network", -1), ve = [
  we
], Se = ["onClick"], ge = ["src", "alt"], on = {
  __name: "SelectNetworkDropdown",
  setup(s) {
    let t = _({}), e = _([]), n = _(!1);
    a.onSafe(async function() {
      e.value = a.config.networks.getAvailable();
    }), a.provider.onSafe(async function() {
      t.value = await a.config.networks.getCurrent(), e.value = a.config.networks.getAvailable().filter((r) => r.id !== t.value.id);
    });
    function o() {
      n.value = !n.value;
    }
    return (r, u) => {
      const h = C("OnDappSafe");
      return c(), g(h, null, {
        default: I(() => [
          l("div", fe, [
            l("ul", { onClick: o }, [
              i(t) ? (c(), d("li", me, [
                l("img", {
                  width: "40",
                  src: i(t).icon ? i(t).icon : i(a).config.defaults.networks.icon,
                  alt: i(t).displayName + " logo"
                }, null, 8, ye),
                l("p", null, f(i(t).displayName), 1)
              ])) : (c(), d("li", _e, ve)),
              i(n) ? (c(!0), d(v, { key: 2 }, S(i(e), (p) => (c(), d("li", {
                key: p.id,
                onClick: (y) => i(a).provider.changeNetwork(p.id)
              }, [
                l("img", {
                  width: "40",
                  src: p.icon ? p.icon : i(a).config.defaults.networks.icon,
                  alt: p.displayName + " logo"
                }, null, 8, ge),
                l("p", null, f(p.displayName), 1)
              ], 8, Se))), 128)) : x("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Ie = {
  __name: "OnDappSafe",
  setup(s) {
    return (t, e) => i(a).isSafe.value ? (c(), d(v, { key: 0 }, [
      w(t.$slots, "default"),
      w(t.$slots, "safe")
    ], 64)) : w(t.$slots, "unsafe", { key: 1 });
  }
}, xe = {
  __name: "OnProviderSafe",
  setup(s) {
    return (t, e) => i(a).provider.isSafe.value ? (c(), d(v, { key: 0 }, [
      w(t.$slots, "default"),
      w(t.$slots, "safe")
    ], 64)) : w(t.$slots, "unsafe", { key: 1 });
  }
}, Ce = {
  __name: "OnSignerSafe",
  setup(s) {
    return (t, e) => i(a).signer.isSafe.value ? (c(), d(v, { key: 0 }, [
      w(t.$slots, "default"),
      w(t.$slots, "safe")
    ], 64)) : w(t.$slots, "unsafe", { key: 1 });
  }
}, Ee = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const t = s;
    return (e, n) => i(a).contracts[t.contract].isReadSafe.value ? (c(), d(v, { key: 0 }, [
      w(e.$slots, "default"),
      w(e.$slots, "safe")
    ], 64)) : w(e.$slots, "unsafe", { key: 1 });
  }
}, be = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const t = s;
    return (e, n) => i(a).contracts[t.contract].isWriteSafe.value ? (c(), d(v, { key: 0 }, [
      w(e.$slots, "default"),
      w(e.$slots, "safe")
    ], 64)) : w(e.$slots, "unsafe", { key: 1 });
  }
};
const K = (s) => (et("data-v-a24ac687"), s = s(), nt(), s), ke = /* @__PURE__ */ K(() => /* @__PURE__ */ l("h3", null, "Safe Runners", -1)), Re = /* @__PURE__ */ K(() => /* @__PURE__ */ l("h3", null, "Status", -1)), Ne = {
  __name: "DebugBar",
  setup(s) {
    return (t, e) => {
      const n = C("OnDappSafe");
      return c(), g(n, null, {
        default: I(() => [
          l("section", null, [
            l("div", null, [
              ke,
              l("ul", null, [
                l("li", null, "DApp safe : " + f(i(a).isSafe), 1),
                l("li", null, "Provider safe : " + f(i(a).provider.isSafe), 1),
                l("li", null, "Signer safe : " + f(i(a).signer.isSafe), 1),
                (c(!0), d(v, null, S(i(a).contracts.getAll(), (o, r) => (c(), d("li", null, [
                  T(" contract " + f(r) + " : ", 1),
                  l("ul", null, [
                    l("li", null, "read safe : " + f(o.isReadSafe), 1),
                    l("li", null, "write safe : " + f(o.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            l("div", null, [
              Re,
              l("ul", null, [
                l("li", null, "dapp : " + f(i(a).status.get()), 1),
                l("li", null, "provider : " + f(i(a).provider.status.get()), 1),
                l("li", null, "signer : " + f(i(a).signer.status.get()), 1),
                (c(!0), d(v, null, S(i(a).contracts.getAll(), (o, r) => (c(), d("li", null, " contract " + f(r) + " : " + f(o.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, rn = /* @__PURE__ */ z(Ne, [["__scopeId", "data-v-a24ac687"]]), Oe = { class: "InputUnits" }, Pe = ["placeholder"], Te = ["value"], $e = {
  __name: "InputUnits",
  props: {
    modelValue: {},
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(s, { emit: t }) {
    const e = s;
    let n = _(null);
    const o = ["wei", "gwei", "ether"];
    let r = _("wei");
    function u() {
      if (n.value) {
        const h = O.utils.parseUnits(n.value, r.value);
        t("update:modelValue", h);
      }
    }
    return (h, p) => (c(), d("div", Oe, [
      j(l("input", {
        onInput: u,
        "onUpdate:modelValue": p[0] || (p[0] = (y) => A(n) ? n.value = y : n = y),
        type: "text",
        placeholder: i(e).placeholder
      }, null, 40, Pe), [
        [q, i(n)]
      ]),
      j(l("select", {
        onChange: u,
        "onUpdate:modelValue": p[1] || (p[1] = (y) => A(r) ? r.value = y : r = y)
      }, [
        (c(), d(v, null, S(o, (y) => l("option", { value: y }, f(y), 9, Te)), 64))
      ], 544), [
        [st, i(r)]
      ])
    ]));
  }
};
class W {
  constructor(t, e) {
    if (this._name = t, this.states = [], !Array.isArray(e))
      throw `The 'states' parameter of a Status instance '${t}' must an array of strings. Got: ${e}`;
    for (const n of e)
      this.states.push(this._formatState(n));
    this._state = _(this.states[0]);
  }
  _formatState(t) {
    return t.toString().toUpperCase();
  }
  _isStateValid(t) {
    return !!this.states.includes(this._formatState(t));
  }
  _areStatesValid(t) {
    for (const e of t)
      if (!this._isStateValid(e))
        return !1;
    return !0;
  }
  get() {
    return D(this._state);
  }
  getRef() {
    return this._state;
  }
  set(t) {
    if (t = this._formatState(t), !this._isStateValid(t))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${t}`;
    E(this._state, t), console.log(`Status '${this._name}' set to '${D(this._state)}'`);
  }
  is(t) {
    if (!this._isStateValid(t))
      throw `The state given to the is() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${t}`;
    return this.get() == this._formatState(t);
  }
  isIn(t) {
    if (!this._areStatesValid(t))
      throw `The states given to the isIn() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${t}`;
    for (const e of t)
      if (this.is(e))
        return !0;
    return !1;
  }
  watch(t, e) {
    let n = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${t}`;
    if (Array.isArray(t)) {
      if (!this._areStatesValid(t))
        throw n;
      return k(this._state, () => {
        this.isIn(t) && e(this.get());
      });
    } else {
      if (!this._isStateValid(t))
        throw n;
      return k(this._state, () => {
        this.is(t) && e(this.get());
      });
    }
  }
  watchAny(t) {
    return this.watch(this.states, t);
  }
}
const N = {
  style: {
    level: "minimal"
  },
  networks: [
    {
      name: "Ethereum Mainnet",
      displayName: "Ethereum",
      id: 1,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/ethereum.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.infura.io/v3/"
    },
    {
      name: "Ropsten",
      displayName: "Ropsten (Ethereum Testnet)",
      id: 3,
      type: "testnet",
      icon: null,
      currency: {
        name: "Ropsten Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://ropsten.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://ropsten.infura.io/v3/"
    },
    {
      name: "Rinkeby",
      displayName: "Rinkeby (Ethereum Testnet)",
      id: 4,
      type: "testnet",
      icon: null,
      currency: {
        name: "Rinkeby Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://rinkeby.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rinkeby.infura.io/v3/"
    },
    {
      name: "G\xF6rli",
      displayName: "G\xF6rli (Ethereum Testnet)",
      id: 5,
      type: "testnet",
      icon: null,
      currency: {
        name: "G\xF6rli Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://goerli.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://goerli.infura.io/v3/"
    },
    {
      name: "Optimism",
      id: 10,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/optimism.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://optimistic.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.optimism.io/"
    },
    {
      name: "Cronos Mainnet Beta",
      displayName: "Cronos",
      id: 25,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/cronos.svg",
      currency: {
        name: "Cronos",
        symbol: "CRO",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Cronos Explorer",
        url: "https://cronos.org/explorer",
        standard: "EIP3091"
      },
      defaultRPC: "https://evm.cronos.org"
    },
    {
      name: "Telos EVM Mainnet",
      displayName: "Telos",
      id: 40,
      type: "mainnet",
      icon: null,
      currency: {
        name: "Telos",
        symbol: "TLOS",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Teloscan",
        url: "https://teloscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.telos.net/evm"
    },
    {
      name: "Binance Smart Chain Mainnet",
      displayName: "BSC",
      id: 56,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/bsc.svg",
      currency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Bscscan",
        url: "https://bscscan.com/",
        standard: "EIP3091"
      },
      defaultRPC: "https://bsc-dataseed1.binance.org/"
    },
    {
      name: "Gnosis Chain",
      displayName: "Gnosis",
      id: 100,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/gnosis.svg",
      currency: {
        name: "xDAI",
        symbol: "xDAI",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Blockscout",
        url: "https://blockscout.com/xdai/mainnet/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.gnosischain.com"
    },
    {
      name: "Fuse Mainnet",
      displayName: "Fuse",
      id: 122,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/fuse.svg",
      currency: {
        name: "Fuse",
        symbol: "FUSE",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Fuse Explorer",
        url: "https://explorer.fuse.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.fuse.io"
    },
    {
      name: "Huobi ECO Chain Mainnet",
      displayName: "HECO",
      id: 128,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/heco.svg",
      currency: {
        name: "Huobi ECO Chain Native Token",
        symbol: "HT",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Hecoinfo",
        url: "https://hecoinfo.com",
        standard: "EIP3091"
      },
      defaultRPC: "https://http-mainnet.hecochain.com"
    },
    {
      name: "Polygon Mainnet",
      displayName: "Polygon",
      id: 137,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/polygon.svg",
      currency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Polygonscan",
        url: "https://polygonscan.com/",
        standard: "EIP3091"
      },
      defaultRPC: "https://polygon-rpc.com/"
    },
    {
      name: "Fantom Opera",
      displayName: "Fantom",
      id: 250,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/fantom.svg",
      currency: {
        name: "Fantom",
        symbol: "FTM",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Ftmscan",
        url: "https://ftmscan.com/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.ftm.tools"
    },
    {
      name: "Metis Andromeda Mainnet",
      displayName: "Metis",
      id: 1088,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/metis.svg",
      currency: {
        name: "Metis",
        symbol: "METIS",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Metis Explorer",
        url: "https://andromeda-explorer.metis.io",
        standard: "EIP3091"
      },
      defaultRPC: "https://andromeda.metis.io/?owner=1088"
    },
    {
      name: "Moonbeam",
      id: 1284,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/moonbeam.svg",
      currency: {
        name: "Glimmer",
        symbol: "GLMR",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Moonscan",
        url: "https://moonbeam.moonscan.io",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.api.moonbeam.network"
    },
    {
      name: "Moonriver",
      id: 1285,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/moonriver.svg",
      currency: {
        name: "Moonriver",
        symbol: "MOVR",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Moonscan",
        url: "https://moonriver.moonscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.api.moonriver.moonbeam.network"
    },
    {
      name: "Klaytn Mainnet Cypress",
      displayName: "Klaytn",
      id: 8217,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/klaytn.svg",
      currency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Klaytnscope",
        url: "https://scope.klaytn.com",
        standard: "EIP3091"
      },
      defaultRPC: "https://public-node-api.klaytnapi.com/v1/cypress"
    },
    {
      name: "Hardhat",
      displayName: "Hardhat",
      id: 31337,
      type: "testnet",
      icon: null,
      currency: {
        name: "GoChain Coin",
        symbol: "GO",
        decimals: 18
      },
      contracts: null,
      explorer: null,
      defaultRPC: "http://127.0.0.1:8545/"
    },
    {
      name: "Arbitrum One",
      displayName: "Arbitrum",
      id: 42161,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/arbitrum.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Arbiscan",
        url: "https://arbiscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://arbitrum-mainnet.infura.io/v3/"
    },
    {
      name: "Celo Mainnet",
      displayName: "Celo",
      id: 42220,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/celo.svg",
      currency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Celo Explorer",
        url: "https://explorer.celo.org/",
        standard: "EIP3091"
      },
      defaultRPC: "https://forno.celo.org"
    },
    {
      name: "Emerald Paratime Mainnet",
      displayName: "Emerald",
      id: 42262,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/emerald.svg",
      currency: {
        name: "Emerald Rose",
        symbol: "ROSE",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Emerald Explorer",
        url: "https://explorer.emerald.oasis.dev/",
        standard: "EIP3091"
      },
      defaultRPC: "https://emerald.oasis.dev"
    },
    {
      name: "Avalanche C-Chain",
      displayName: "Avalanche",
      id: 43114,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/avalanche.svg",
      currency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Snowtrace",
        url: "https://snowtrace.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://api.avax.network/ext/bc/C/rpc"
    },
    {
      name: "Aurora Mainnet",
      displayName: "Aurora",
      id: 1313161554,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/aurora.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Aurorascan",
        url: "https://aurorascan.dev",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.aurora.dev"
    },
    {
      name: "Harmony Mainnet Shard 0",
      displayName: "Harmony",
      id: 16666e5,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/harmony.svg",
      currency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Harmony Block Explorer",
        url: "https://explorer.harmony.one",
        standard: "EIP3091"
      },
      defaultRPC: "https://api.harmony.one"
    }
  ],
  wallets: [
    {
      id: "metamask",
      displayName: "Metamask",
      icon: null
    },
    {
      id: "binanceChain",
      displayName: "Binance Chain",
      icon: null
    },
    {
      id: "coinbase",
      displayName: "Coinbase",
      icon: null
    }
  ],
  defaults: {
    networks: {
      icon: "https://static.tuli.pe/icons/networks/unknown.svg"
    },
    wallets: {
      icon: "TODO"
    }
  }
};
class Ae {
  constructor(t = null) {
    let e = {};
    return t ? e = $({ ...N.style }, { ...t }) : e = N.style, window.addEventListener("load", () => {
      const n = document.getElementsByClassName("ve-app");
      if (n)
        for (const o of n)
          o && o.classList.add(`ve-${e.level}`);
    }), e;
  }
}
class De {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const n = N.networks.find((r) => r.id === e.id), o = $({ ...n }, { ...e });
          o.available !== !1 && (o.available = !0), o.displayName || (o.displayName = o.name), this._list.push(o);
        }
    }
    for (const e of N.networks)
      this._list.find((o) => o.id === e.id) || (e.available = !1, this._list.push(e));
  }
  add(t) {
    this._list.push(t);
  }
  async getCurrent() {
    if (a.provider.proxy.ethersInstance) {
      const t = await a.provider.getNetwork().then((e) => e.chainId);
      return this.getById(t);
    }
    return null;
  }
  getById(t) {
    try {
      t = parseInt(t);
    } catch {
      throw "'id' given to getById() method must be an integer or any data type that can be parsed to interger.";
    }
    return this._list.find((e) => e.id === parseInt(t));
  }
  getDefault() {
    return this._list.find((t) => t.default === !0);
  }
  getAvailable() {
    return this._list.filter((t) => t.available);
  }
  getAll() {
    return this._list;
  }
}
class We {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const n = N.wallets.find((r) => r.id === e.id), o = $({ ...n }, { ...e });
          o.available !== !1 && (o.available = !0), o.displayName || (o.displayName = o.id), this._list.push(o);
        }
    }
    for (const e of N.wallets)
      this._list.find((o) => o.id === e.id) || (e.available = !1, this._list.push(e));
  }
  getCurrent() {
    return a.signer.proxy.ethersInstance ? this.getById(a.signer.walletId) : null;
  }
  getById(t) {
    return this._list.find((e) => e.id === t);
  }
  getDefault() {
    return this._list.find((t) => t.default === !0);
  }
  getAvailable() {
    return this._list.filter((t) => t.available);
  }
  getAll() {
    return this._list;
  }
}
class Ue {
  constructor(t = null) {
    let e = {};
    return t ? e = $({ ...N.defaults }, { ...t }) : e = N.defaults, e;
  }
}
class Be {
  constructor(t = null) {
    this.style = new Ae(t ? t.style : null), this.networks = new De(t ? t.networks : null), this.wallets = new We(t ? t.wallets : null), this.defaults = new Ue(t ? t.defaults : null);
  }
}
class M {
  constructor(t = null, e = null, n = null) {
    const o = new Proxy(this, {
      get: function(r, u, h) {
        if (u === "proxy")
          return r.proxy;
        if (r.proxy.ethersInstance && r.proxy.ethersInstance[u] !== void 0)
          return typeof r.proxy.ethersInstance[u] == "function" ? r.proxy.ethersInstance[u].bind(r.proxy.ethersInstance) : r.proxy.ethersInstance[u];
        if (r.proxy.ethersInstance && r.proxy.extensionInstance && r.proxy.extensionInstance[u] !== void 0)
          return typeof r.proxy.extensionInstance[u] == "function" ? r.proxy.extensionInstance[u].bind(h) : r.proxy.extensionInstance[u];
        if (r.proxy.placeholderInstance && r.proxy.placeholderInstance[u] !== void 0)
          return typeof r.proxy.placeholderInstance[u] == "function" ? r.proxy.placeholderInstance[u].bind(h) : r.proxy.placeholderInstance[u];
      },
      set: function(r, u, h, p) {
        if (r.proxy.ethersInstance && r.proxy.ethersInstance[u] !== void 0)
          return r.proxy.ethersInstance[u] = h, !0;
        if (r.proxy.extensionInstance && r.proxy.extensionInstance[u] !== void 0)
          return r.proxy.extensionInstance[u] = h, !0;
        if (r.proxy.placeholderInstance && r.proxy.placeholderInstance[u] !== void 0)
          return r.proxy.placeholderInstance[u] = h, !0;
        throw console.log(r.proxy.placeholderInstance), console.log(r.proxy.placeholderInstance[u]), `New properties cannot be set on TulipeProxy instances. Please define '${u}' in constructor firstly.`;
      }
    });
    return this.proxy = {
      _initIsRunning: !1,
      _ethersInstance: null,
      get ethersInstance() {
        return this._ethersInstance;
      },
      set ethersInstance(r) {
        this.placeholderInstance._ars.oldEthersInstance = { ...this._ethersInstance }, this._ethersInstance = r && at(r), this._initIsRunning || o._asyncInit();
      },
      extensionInstance: e,
      placeholderInstance: n
    }, this.proxy.ethersInstance = t, o;
  }
}
class je {
}
class V {
  constructor() {
    this._ars = {};
  }
  _purgeARS() {
    if (this._ars.unwatchers)
      for (const t of this._ars.unwatchers)
        t();
    if (this._ars.unwatchers = [], this._ars.oldEthersInstance && this._ars.events)
      for (const [t, e] of Object.entries(this._ars.events))
        this._ars.oldEthersInstance.off(t, e);
  }
  _initEthersInstanceARS() {
  }
  _initPlaceholderInstanceARS() {
  }
  _initARS() {
    this._purgeARS(), this.proxy.ethersInstance && this._initEthersInstanceARS(), this._initPlaceholderInstanceARS();
  }
  onSafe(t) {
    const e = B();
    if (this.isSafe.value)
      t(e);
    else {
      const n = k(this.isSafe, () => {
        this.isSafe.value && (t(e), n());
      });
    }
  }
}
class Me extends V {
  constructor() {
    super(), this.status = new W("provider", [
      "DISCONNECTED",
      "ERROR",
      "WRONG_NETWORK",
      "CONNECTED"
    ]), this.isSafe = P(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this.OnSafe = xe;
  }
  async _autoInstantiateFromWallet() {
    let t = null;
    for (const e of Object.values(a.wallets))
      if (e.lazyConnectAvailable && await e.isConnected()) {
        t = e;
        break;
      }
    if (t)
      this.proxy.ethersInstance = t.getProvider();
    else
      for (const e of Object.values(a.wallets)) {
        const n = e.getProvider();
        n && (this.proxy.ethersInstance = n);
      }
  }
  _autoInstantiateFromDefaultConfig() {
    const t = a.config.networks.getDefault();
    t && t.defaultRPC && (this.proxy.ethersInstance = new O.providers.JsonRpcProvider(t.defaultRPC));
  }
  async _autoInstantiate() {
    await this._autoInstantiateFromWallet(), this.proxy.ethersInstance || this._autoInstantiateFromDefaultConfig();
  }
  _initARS() {
    this.on("network", (t, e) => {
      e && e !== t && window.location.reload();
    });
  }
  async _checkNetwork() {
    if (!this.proxy.ethersInstance)
      throw "<TulipeProviderProxy instance>._checkNetwork() method must not be called if the ethersInstance is null (if not connected to any network).";
    const t = await this.getNetwork();
    let e = await a.config.networks.getById(t.chainId);
    if (e)
      this.status.set("CONNECTED");
    else if (this.status.set("WRONG_NETWORK"), e = a.config.networks.getAll().find((n) => n.id === t.id), !e) {
      const n = {
        name: t.name,
        displayName: xt(t.name),
        id: t.chainId
      };
      console.log(n), a.config.networks.add(n);
    }
  }
  async _setNetworkSettings() {
    const t = await this.getNetwork();
    let e = await a.config.networks.getById(t.chainId);
    e && e && e.pollingInterval && (this.pollingInterval = e.pollingInterval);
  }
  async _asyncInit() {
    this.proxy._initIsRunning = !0, this.proxy.ethersInstance || await this._autoInstantiate(), this.proxy.ethersInstance ? (await this._checkNetwork(), await this._setNetworkSettings(), this._initARS()) : this.status.set("DISCONNECTED"), this.proxy._initIsRunning = !1;
  }
  async changeNetwork(t) {
    const e = await a.config.wallets.getCurrent();
    e && a.wallets[e.id].changeNetwork(t);
  }
}
class m extends M {
  constructor(t = null, e = null, n = null) {
    super(
      t,
      e || new je(),
      n || new Me()
    ), this._asyncInit();
  }
}
class Ve {
}
class Le extends V {
  constructor() {
    super(), this.walletId = null, this.address = _(null), this.status = new W("signer", [
      "NO_PROVIDER",
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "WRONG_NETWORK",
      "CONNECTED"
    ]), this.isSafe = P(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this.OnSafe = Ce;
  }
  _initEthersInstanceARS() {
  }
  _initPlaceholderInstanceARS() {
    a.provider.status.watchAny((t) => {
      t === "WRONG_NETWORK" ? this.status.set("WRONG_NETWORK") : ["DISCONNECTED", "ERROR"].includes(t) && this.status.set("NO_PROVIDER");
    }), this.status.watch(["REFUSED", "ERROR"], () => {
      setTimeout(() => {
        this.status.set("DISCONNECTED");
      }, 5e3);
    });
  }
  async _autoInstantiate() {
    console.log(a.wallets);
    for (const t of Object.keys(a.wallets))
      if (a.wallets[t].lazyConnectAvailable && (await this.connectWallet(t, !0), this.proxy.ethersInstance))
        break;
  }
  async _asyncInit() {
    this.proxy._initIsRunning = !0, a.provider.onSafe(async function() {
      this.proxy.ethersInstance || await this._autoInstantiate(), this.proxy.ethersInstance ? this.address.value = await this.getAddress() : this.status.set("DISCONNECTED"), this._initARS(), this.proxy._initIsRunning = !1;
    }.bind(this));
  }
  async _setSignerDatas(t) {
  }
  async connectWallet(t, e = !1) {
    console.log("CONNECT lazy = " + e);
    const n = a.wallets[t];
    if (n.lazyConnectAvailable) {
      if (await n.connect(!0), await n.isConnected())
        a.signer.proxy.ethersInstance = await n.getSigner(), this.walletId = n.id, a.signer.status.set("CONNECTED");
      else if (e) {
        a.signer.status.set("DISCONNECTED");
        return;
      }
    }
    try {
      this.status.set("REQUESTED"), await n.connect(!1), a.signer.proxy.ethersInstance = await n.getSigner(), this.walletId = n.id, a.signer.status.set("CONNECTED");
    } catch (o) {
      if (o instanceof G)
        this.status.set("REFUSED");
      else
        throw this.status.set("ERROR"), o;
    }
  }
  disconnectWallet() {
    a.signer.proxy.ethersInstance = null, this.address.value = null, a.signer.status.set("DISCONNECTED");
  }
}
class qe extends M {
  constructor(t = null, e = null, n = null) {
    super(
      t,
      e || new Ve(),
      n || new Le()
    ), this._asyncInit();
  }
}
class Ge {
  _watch(t, e, n = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(t, e, n);
  }
  watch(t, e, n, o = null) {
    const r = this._watch(t, e, n);
    return o ? U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, r);
    }, o) : U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, r);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], t, e, r);
  }
  watchRef(t, e, n = null) {
    const o = this._watch(t, e, null);
    return n ? U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, o);
    }, n) : U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, o);
    }), a.chainWatchers.contracts[this.address].getRef(t, e);
  }
}
class Fe extends V {
  constructor() {
    super(), this.name = null, this.status = new W(`contract:${name}`, [
      "NO_PROVIDER",
      "UNAVAILABLE",
      "ERROR",
      "INITIALIZED"
    ]), this.isReadSafe = P(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = P(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.OnReadSafe = R(Ee, { contract: this.name }), this.OnWriteSafe = R(be, { contract: this.name });
  }
  onSafe(t) {
    throw "TulipeContract instances don't have 'onSafe()' method, use 'onReadSafe()' and 'onWriteSafe()' instead.";
  }
  onReadSafe(t) {
    const e = B();
    if (this.isReadSafe.value)
      t(e);
    else {
      const n = k(this.isReadSafe, () => {
        this.isReadSafe.value && (t(e), n());
      });
    }
  }
  onWriteSafe(t) {
    const e = B();
    if (this.isWriteSafe.value)
      t(e);
    else {
      const n = k(this.isWriteSafe, () => {
        this.isWriteSafe.value && (t(e), n());
      });
    }
  }
  _updateContract(t, e) {
    if (a.signer.isSafe.value)
      this.proxy.ethersInstance = new O.Contract(t, e, a.signer.proxy.ethersInstance);
    else if (a.provider.isSafe.value)
      this.proxy.ethersInstance = new O.Contract(t, e, a.provider.proxy.ethersInstance);
    else
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`;
  }
  _initEthersInstanceARS() {
    this._ars.unwatchers.push(
      k(a.signer.isSafe, (t, e) => {
        if (t !== e) {
          const n = this.proxy.ethersInstance.interface, o = this.proxy.ethersInstance.address;
          this.proxy.ethersInstance = null, this._updateContract(o, n);
        }
      })
    );
  }
  _initPlaceholderInstanceARS() {
    a.provider.status.watchAny((t) => {
      t === "WRONG_NETWORK" ? this.status.set("UNAVAILABLE") : ["DISCONNECTED", "ERROR"].includes(t) && this.status.set("NO_PROVIDER");
    });
  }
  async _asyncInit() {
    this.proxy._initIsRunning = !0, a.provider.onSafe(async function() {
      this.proxy.ethersInstance ? this.name = "TODO" : this.status.set("UNAVAILABLE"), this._initARS(), this.proxy._initIsRunning = !1;
    }.bind(this));
  }
}
class H extends M {
  constructor(t, e = null, n = null, o = null) {
    super(
      e,
      n || new Ge(),
      o || new Fe(t)
    ), this._asyncInit();
  }
}
class He {
}
class ze extends V {
  constructor(t, e, n = [], o = { value: 0 }) {
    super(), this.contractName = t, this.methodName = e, this.methodInfos = {}, this.args = _(n), this.txArgs = _(o), this.data = _([]), this.error = _(null), this.call = null, this.status = new W(`tx:${t}:${e}`, [
      "NOT_READY",
      "READY",
      "SENT",
      "ERROR",
      "SUCCESS"
    ]);
  }
  initARS() {
    this.status.watch(["ERROR", "SUCCESS"], () => {
      setTimeout(() => {
        this.status.set("READY");
      }, 3e3);
    });
  }
  _asyncInit() {
    this.proxy._initIsRunning = !0, a.contracts[this.contractName].isReadSafe.value && this._initEthersInstance(), a.contracts[this.contractName].onReadSafe(() => {
      this._initEthersInstance();
    }), this.initARS(), this.proxy._initIsRunning = !1;
  }
  _initEthersInstance() {
    this.methodInfos = a.contracts[this.contractName].interface.functions[this.methodName], this.methodInfos.inputs.forEach((t) => this.args.value.push(null)), this.methodInfos.outputs.forEach((t) => this.data.value.push(null)), this.proxy.ethersInstance = a.contracts[this.contractName][this.methodName], this.status.set("READY");
  }
  send(t = null, e = null) {
    t = t && t.length > 0 ? t : D(this.args), t ? Array.isArray(t) ? this.call = this.proxy.ethersInstance(...t, e) : this.call = this.proxy.ethersInstance(t, e) : this.call = this.proxy.ethersInstance(e), this.status.set("SENT"), this.methodInfos.constant ? this.call.then((n) => {
      Array.isArray(n) || (n = [n]), E(this.data, n), E(this.error, null), this.status.set("SUCCESS");
    }).catch((n) => {
      E(this.error, n), this.status.set("ERROR");
    }) : this.call.then((n) => n.wait()).then((n) => {
      Array.isArray(n) || (n = [n]), E(this.data, n), E(this.error, null), this.status.set("SUCCESS");
    }).catch((n) => {
      E(this.error, n), this.status.set("ERROR"), console.log(n);
    });
  }
}
class J extends M {
  constructor(t, e, n = [], o = { value: 0 }, r = null, u = null, h = null) {
    super(
      r,
      u || new He(),
      h || new ze(t, e, n = [], o = { value: 0 })
    ), this._asyncInit();
  }
}
class ln extends ot {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class cn extends rt {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class un extends it {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class dn extends lt {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class hn extends ct {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class pn extends ut {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class fn extends dt {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class mn extends ht {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class yn extends pt {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class _n extends ft {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class wn extends mt {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class vn extends yt {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class Sn extends _t {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class gn extends wt {
  constructor(...t) {
    let e = m;
    return t[t.length - 1].prototype instanceof m && (e = t.pop()), super(...t), new e(this);
  }
}
class Y {
  constructor() {
    this.lastUpdateBlock = 0, this.sources = {};
  }
  _generateDependentUUID() {
    return "xxxxxxxx".replace(/[xy]/g, function(t) {
      var e = Math.random() * 16 | 0, n = t == "x" ? e : e & 3 | 8;
      return n.toString(16);
    });
  }
  async requiresUpdate() {
    if (!a.provider.isSafe.value)
      return !1;
    const t = await a.provider.getBlockNumber();
    return this.lastUpdateBlock < t;
  }
  async updateLastUpdateBlock() {
    const t = await a.provider.getBlockNumber();
    this.lastUpdateBlock = t;
  }
  async _update() {
    throw "_update() method not implemented in that ChainWatcher child class.";
  }
  update() {
    this._update();
  }
}
class Ke extends Y {
  constructor(t) {
    super(), this.contract = t;
  }
  _buildSourceName(t, e) {
    return `${t}:${e ? e.toString() : ""}`;
  }
  async _updateState(t) {
    t.args ? t.state.value = await this.contract[t.name](...t.args) : t.state.value = await this.contract[t.name]();
  }
  async _update() {
    if (await this.requiresUpdate()) {
      for (const t of Object.values(this.sources))
        this._updateState(t);
      await this.updateLastUpdateBlock();
    }
  }
  add(t, e, n = null) {
    const o = this._buildSourceName(t, e);
    let r = !1;
    Object.keys(this.sources).includes(o) || (this.sources[o] = {
      name: t,
      args: e,
      state: _(null),
      dependents: {}
    }, r = !0);
    let u = null;
    n && (u = k(this.sources[o].state, n));
    const h = this._generateDependentUUID();
    return this.sources[o].dependents[h] = u, r && this._updateState(this.sources[o]), h;
  }
  remove(t, e, n) {
    const o = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(o) && Object.keys(this.sources[o].dependents).includes(n)) {
      const r = this.sources[o].dependents[n];
      r && r(), delete this.sources[o].dependents[n];
    }
    Object.keys(this.sources[o].dependents).length === 0 && delete this.sources[o];
  }
  getRef(t, e) {
    const n = this._buildSourceName(t, e);
    return this.sources[n].state;
  }
}
class Je extends Y {
  constructor(t) {
    super(), this.address = t, this.availableSources = ["balance"];
  }
  async _updateState(t) {
    t.name === "balance" && (t.state.value = await a.provider.getBalance(this.address));
  }
  async _update() {
    if (await this.requiresUpdate()) {
      for (const t of Object.values(this.sources))
        await this._updateState(t);
      await this.updateLastUpdateBlock();
    }
  }
  add(t, e, n = null) {
    if (!this.availableSources.includes(t))
      throw `Sources added to a ChainWalletWatcher must be in ${this.availableSources}. Got ${t}`;
    const o = this._buildSourceName(t, e);
    newSource = !1, Object.keys(this.sources).includes(o) || (this.sources[o] = {
      name: t,
      args: e,
      state: ref(null),
      dependents: {}
    }, newSource = !0);
    let r = null;
    n && (r = watch(this.sources[o].state, n));
    const u = this._generateDependentUUID();
    return this.sources[o].dependents[u] = r, newSource && this._updateState(this.sources[o]), u;
  }
  remove(t, e, n) {
    const o = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(o) && Object.keys(this.sources[o].dependents).includes(n)) {
      const r = this.sources[o].dependents[n];
      r && r(), delete this.sources[o].dependents[n];
    }
    Object.keys(this.sources[o].dependents).length === 0 && delete this.sources[o];
  }
  getRef(t, e) {
    const n = this._buildSourceName(t, e);
    return this.sources[n].state;
  }
}
class G extends Error {
  constructor(t, ...e) {
    super(t, ...e), this.message = `'${t}' wallet has rejected the connection request.`;
  }
}
class b extends Error {
  constructor(t, ...e) {
    super(walletId, ...e), this.message = t;
  }
}
class Z {
  constructor(t) {
    this.id = t, this.lazyConnectAvailable = !0;
  }
  isConnected() {
    throw new b(`isConnected() method is not implemented in ${this.id} wallet class.`);
  }
  getProvider() {
    throw new b(`getProvider() method is not implemented in ${this.id} wallet class.`);
  }
  getSigner(t = !1) {
    throw new b(`getSigner() method is not implemented in ${this.id} wallet class.`);
  }
  async connect(t = !1) {
    throw new b(`connect() method is not implemented in ${this.id} wallet class.`);
  }
  addNetwork(t) {
    throw new b(`addNetwork() method is not implemented in ${this.id} wallet class.`);
  }
  switchNetwork(t, e = !1) {
    throw new b(`switchNetwork() method is not implemented in ${this.id} wallet class.`);
  }
}
class Q extends Z {
  constructor(t, e = null) {
    super(t), this.exposedObject = e;
  }
  async isConnected() {
    if (this.exposedObject && this.getSigner())
      try {
        const e = await this.exposedObject.request({ method: "eth_accounts" });
        if (e && e.length > 0)
          return !0;
      } catch {
      }
    return !1;
  }
  getProvider() {
    return this.exposedObject ? new O.providers.Web3Provider(this.exposedObject, "any") : null;
  }
  async getSigner() {
    if (this.exposedObject) {
      const t = this.getProvider();
      if (t)
        return await t.getSigner();
    }
    return null;
  }
  async connect(t = !1) {
    if (this.exposedObject) {
      if (await this.isConnected() || t)
        return;
      try {
        await this.exposedObject.request({ method: "eth_requestAccounts" });
      } catch (e) {
        throw e.code === 4001 ? new G(this.id) : e;
      }
    }
    throw "exposedObject not available";
  }
  async addNetwork(t) {
    const e = a.config.networks.getById(t);
    await this.exposedObject.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: t,
        rpcUrls: [e.defaultRPC],
        chainName: e.name,
        nativeCurrency: {
          name: e.currency.symbol,
          symbol: e.currency.symbol,
          decimals: e.currency.decimals
        },
        blockExplorerUrls: e.explorer && e.explorer.url !== "" ? [e.explorer.url] : null
      }]
    });
  }
  async changeNetwork(t, e = !1) {
    if (a.config.networks.getById(t)) {
      t = O.utils.hexlify(parseInt(t)).toString(), t = O.utils.hexValue(t);
      try {
        await this.exposedObject.request({
          method: "wallet_switchEthereumChain",
          params: [{
            chainId: t
          }]
        });
      } catch (o) {
        if (o.code === 4902)
          this.addNetwork(t);
        else
          throw o;
      }
    }
  }
}
class Ye extends Q {
  constructor() {
    super("metamask", window.ethereum);
  }
}
class Ze extends Z {
  constructor(t, e = {}) {
    super(), this.id = "coinbase";
    const n = e.appName || "", o = e.appLogoUrl, r = e.darkMode || !1;
    this.coinbaseWalletSdk = new t({
      appName: n,
      appLogoUrl: o,
      darkMode: r
    }), this.provider = this.getProvider();
  }
  getProvider() {
    try {
      return this.coinbaseWalletSdk.makeWeb3Provider();
    } catch (t) {
      return console.log(t), null;
    }
  }
  async connect() {
    try {
      await this.provider.send("eth_requestAccounts");
    } catch {
      throw G(this.id);
    }
  }
}
class Qe extends Q {
  constructor() {
    super("binanceChain", window.BinanceChain), this.lazyConnectAvailable = !1;
  }
  async isConnected() {
    throw new b("isConnected() method is not available for BinanceChainWallet class since lazy connection is not available.");
  }
  async connect(t = !1) {
    if (t)
      throw new b("connect() with 'lazy=true' is not available for BinanceChainWallet class because isConnected() is not available on this class.");
  }
}
const Xe = {
  metamask: Ye,
  coinbase: Ze,
  binanceChain: Qe
};
async function In(s, t) {
  const e = t;
  try {
    a.init(e);
  } catch (o) {
    throw a && a.status && a.status.set("ERROR"), o;
  }
  s.config.globalProperties.dapp = a, s.config.globalProperties.rGet = D, s.config.globalProperties.rSet = E, window.dapp = a;
  const n = await import("./index.f6dbe69a.mjs");
  s.component("OnDappSafe", n.OnDappSafe), s.component("OnProviderSafe", n.OnProviderSafe), s.component("OnSignerSafe", n.OnSignerSafe), s.component("OnContractReadSafe", n.OnContractReadSafe), s.component("OnContractWriteSafe", n.OnContractWriteSafe), a.status.set("INITIALIZED");
}
export {
  sn as ConnectWalletButton,
  nn as ContractInteractor,
  Ke as ContractWatcher,
  rn as DebugBar,
  zt as EventInteractor,
  Gt as EventsInteractor,
  $e as InputUnits,
  Lt as MethodInteractor,
  Pt as MethodsInteractor,
  Ee as OnContractReadSafe,
  be as OnContractWriteSafe,
  Ie as OnDappSafe,
  xe as OnProviderSafe,
  Ce as OnSignerSafe,
  on as SelectNetworkDropdown,
  an as SelectWalletDropdown,
  W as Status,
  Xt as Transact,
  hn as TulipeAlchemyProvider,
  mn as TulipeAnkrProvider,
  pn as TulipeCloudflareProvider,
  Be as TulipeConfig,
  H as TulipeContractProxy,
  un as TulipeEtherscanProvider,
  yn as TulipeFallbackProvider,
  dn as TulipeInfuraProvider,
  _n as TulipeIpcProvider,
  wn as TulipeJsonRpcBatchProvider,
  ln as TulipeJsonRpcProvider,
  fn as TulipePocketProvider,
  m as TulipeProviderProxy,
  M as TulipeProxy,
  qe as TulipeSignerProxy,
  cn as TulipeStaticJsonRpcProvider,
  J as TulipeTransactionProxy,
  vn as TulipeUrlJsonRpcProvider,
  Sn as TulipeWeb3Provider,
  gn as TulipeWebSocketProvider,
  G as WalletConnectionRejected,
  Je as WalletWatcher,
  xt as capitalizeWords,
  a as dapp,
  $ as deepMerge,
  In as initTulipe,
  L as isObject,
  D as rGet,
  E as rSet,
  Ct as styleLevelProp,
  Xe as wallets
};
