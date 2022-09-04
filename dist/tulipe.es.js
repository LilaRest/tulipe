import { computed as O, getCurrentInstance as U, watch as k, isRef as T, ref as y, resolveComponent as C, openBlock as c, createBlock as g, withCtx as S, createElementVNode as l, toDisplayString as f, unref as o, createVNode as x, createTextVNode as $, createElementBlock as d, Fragment as w, renderList as v, shallowRef as J, withDirectives as B, vModelText as L, createCommentVNode as I, normalizeClass as X, renderSlot as _, pushScopeId as tt, popScopeId as et, vModelSelect as st, markRaw as nt, onUnmounted as W } from "vue";
import { ethers as N } from "ethers";
class at {
  constructor() {
    const t = a.config.wallets.getAvailable();
    for (const e of t) {
      const s = je[e.id];
      s && (this[e.id] = new s());
    }
  }
}
class it {
  constructor() {
    for (const t of a.config.networks.getAll())
      if (t.contracts)
        for (const e of Object.keys(t.contracts))
          this[e] = new F(e);
  }
  getAll() {
    const t = {};
    for (const [e, s] of Object.entries(this))
      s instanceof F && (t[e] = s);
    return t;
  }
}
class rt {
  constructor() {
    this.contracts = {}, this.wallets = {};
  }
  async _asyncInit() {
    a.provider.onSafe(() => {
      a.provider.on("block", async function(t) {
        const e = await a.provider.getBlockWithTransactions(t);
        for (const s of e.transactions)
          Object.keys(this.contracts).includes(s.to) ? this.contracts[s.to].update() : Object.keys(this.wallets).includes(s.to) && this.wallets[s.to].update(), Object.keys(this.contracts).includes(s.from) ? this.contracts[s.from].update() : Object.keys(this.wallets).includes(s.from) && this.wallets[s.from].update();
      });
    });
  }
  addContractWatcher(t) {
    Object.keys(this.contracts).includes(t.address) || (this.contracts[t.address] = new Pe(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.contracts).includes(t.address) && delete this.contracts[t.address];
  }
  addWalletWatcher(t) {
    Object.keys(this.wallets).includes(t) || (this.wallets[t] = new De(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.wallets).includes(t) && delete this.wallets[t];
  }
}
class ot {
  constructor() {
  }
  init(t = null) {
    this.config = new Ce(t), this.status = new D("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = O(() => this.status.is("INITIALIZED")), this.OnSafe = oe, this.chainWatchers = new rt(), this.wallets = new at(), this.provider = new ke(), this.pro = this.provider, this.signer = new Ne(), this.sig = this.signer, this.contracts = new it(), this.con = this.contracts;
  }
  onSafe(t) {
    const e = U();
    if (this.isSafe.value)
      t(e);
    else {
      const s = k(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
const a = new ot();
function V(i) {
  return i && typeof i == "object" && !Array.isArray(i);
}
function A(i, ...t) {
  if (!t.length)
    return i;
  const e = t.shift();
  if (V(i) && V(e))
    for (const s in e)
      V(e[s]) ? (i[s] || Object.assign(i, {
        [s]: {}
      }), A(i[s], e[s])) : Object.assign(i, {
        [s]: e[s]
      });
  return A(i, ...t);
}
function lt(i) {
  const t = i.split(" ");
  for (let e = 0; e < t.length; e++)
    t[e] = t[e][0].toUpperCase() + t[e].substring(1);
  return t.join(" ");
}
function P(i) {
  return T(i) ? P(i.value) : i;
}
function E(i, t) {
  T(i) ? i.value = t : i = t;
}
const ct = {
  required: !1,
  type: String,
  default: "minimal",
  validator(i) {
    return ["unstylized", "minimal", "opinionated"].includes(i);
  }
}, ut = { class: "ContractInteractor" }, dt = /* @__PURE__ */ $(" Methods : "), ht = /* @__PURE__ */ l("br", null, null, -1), pt = /* @__PURE__ */ $(" Events : "), ft = /* @__PURE__ */ l("br", null, null, -1), Le = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(i) {
    const t = i, e = a.contracts[t.contract];
    let s = y("not owned");
    return a.contracts[t.contract].onReadSafe(async function() {
      try {
        s.value = await e.owner();
      } catch {
      }
    }), (n, r) => {
      const u = C("OnContractReadSafe");
      return c(), g(u, {
        contract: t.contract
      }, {
        default: S(() => [
          l("div", ut, [
            l("ul", null, [
              l("li", null, "Address : " + f(o(e).address), 1),
              l("li", null, "Owner : " + f(o(s)), 1),
              l("li", null, [
                dt,
                ht,
                x(o(yt), {
                  contract: t.contract
                }, null, 8, ["contract"])
              ]),
              l("li", null, [
                pt,
                ft,
                x(o(Nt), {
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
}, mt = { class: "MethodsInteractor" }, yt = {
  __name: "MethodsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(i) {
    const t = i, e = a.contracts[t.contract];
    return (s, n) => {
      const r = C("OnContractReadSafe");
      return c(), g(r, {
        contract: t.contract
      }, {
        default: S(() => [
          l("div", mt, [
            l("ul", null, [
              (c(!0), d(w, null, v(o(e).interface.functions, (u, h) => (c(), d("li", null, [
                x(o(xt), {
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
}, _t = { class: "MethodInteractor" }, wt = { key: 0 }, vt = /* @__PURE__ */ l("p", null, "Inputs :", -1), gt = ["onUpdate:modelValue", "placeholder"], St = { key: 0 }, It = { key: 1 }, Ct = /* @__PURE__ */ l("p", null, "Outputs :", -1), Et = ["onUpdate:modelValue", "placeholder"], bt = ["placeholder"], kt = { key: 2 }, xt = {
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
  setup(i) {
    const t = i, e = J(new K(t.contract, t.method));
    function s(n) {
      return `${n.name && n.name !== "null" ? n.name : ""} (${n.type})`;
    }
    return (n, r) => {
      const u = C("OnContractReadSafe");
      return c(), g(u, {
        contract: t.contract
      }, {
        default: S(() => [
          l("div", _t, [
            x(o(Bt), {
              contract: t.contract,
              method: t.method,
              modelValue: o(e),
              "onUpdate:modelValue": r[0] || (r[0] = (h) => T(e) ? e.value = h : null),
              configs: { content: t.method, notx: !0, noerror: !0 }
            }, null, 8, ["contract", "method", "modelValue", "configs"]),
            l("small", null, f(o(e).methodInfos.stateMutability), 1),
            Object.keys(o(e).methodInfos.inputs).length > 0 || o(e).methodInfos.payable ? (c(), d("div", wt, [
              vt,
              l("ul", null, [
                (c(!0), d(w, null, v(o(e).methodInfos.inputs, (h, p) => (c(), d("li", null, [
                  B(l("input", {
                    "onUpdate:modelValue": (m) => o(e).args.value[p] = m,
                    type: "text",
                    placeholder: s(h)
                  }, null, 8, gt), [
                    [L, o(e).args.value[p]]
                  ]),
                  $(" " + f(o(e).args.value[p]) + " " + f(typeof o(e).args.value[p]), 1)
                ]))), 256)),
                o(e).methodInfos.payable ? (c(), d("li", St, [
                  x(o(we), {
                    modelValue: o(e).txArgs.value.value,
                    "onUpdate:modelValue": r[1] || (r[1] = (h) => o(e).txArgs.value.value = h)
                  }, null, 8, ["modelValue"]),
                  $(" " + f(o(e).txArgs.value.value) + " " + f(typeof o(e).txArgs.value.value), 1)
                ])) : I("", !0)
              ])
            ])) : I("", !0),
            Object.keys(o(e).methodInfos.outputs).length > 0 ? (c(), d("div", It, [
              Ct,
              l("ul", null, [
                (c(!0), d(w, null, v(o(e).methodInfos.outputs, (h, p) => (c(), d("li", null, [
                  o(e).data.value ? B((c(), d("input", {
                    key: 0,
                    "onUpdate:modelValue": (m) => o(e).data.value[p] = m,
                    type: "text",
                    placeholder: s(h),
                    disabled: ""
                  }, null, 8, Et)), [
                    [L, o(e).data.value[p]]
                  ]) : (c(), d("input", {
                    key: 1,
                    type: "text",
                    placeholder: s(h),
                    disabled: ""
                  }, null, 8, bt))
                ]))), 256))
              ])
            ])) : I("", !0),
            o(e).status.is("ERROR") ? (c(), d("p", kt, f(o(e).error.value.reason), 1)) : I("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Rt = { class: "EventsInteractor" }, Nt = {
  __name: "EventsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(i) {
    const t = i, e = a.contracts[t.contract];
    return (s, n) => {
      const r = C("OnContractReadSafe");
      return c(), g(r, {
        contract: t.contract
      }, {
        default: S(() => [
          l("div", Rt, [
            l("ul", null, [
              (c(!0), d(w, null, v(o(e).interface.events, (u, h) => (c(), d("li", null, [
                x(o(At), {
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
}, Ot = { class: "EventInteractor" }, $t = /* @__PURE__ */ $("Logs: "), At = {
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
  setup(i) {
    const t = i, e = a.contracts[t.contract];
    let s = y({}), n = y({}), r = y(0), u = y([]);
    return e.onReadSafe(() => {
      s.value = e.interface.events[t.event], n.value = e.filters[s.value.name], e.on(n.value, (h) => {
        r.value++;
        let p = `Block ${h.blockNumber} -> {`;
        for (const m of s.value.inputs)
          p += `${m.name}:${h.args[m.name]}, `;
        p = p.substring(0, p.length - 2) + "}", u.value.push(p);
      });
    }), (h, p) => {
      const m = C("OnContractReadSafe");
      return c(), g(m, {
        contract: t.contract
      }, {
        default: S(() => [
          l("div", Ot, [
            l("p", null, f(o(s).name), 1),
            l("ul", null, [
              l("li", null, "Count : " + f(o(r)), 1),
              l("li", null, [
                $t,
                l("ul", null, [
                  (c(!0), d(w, null, v(o(u), (G) => (c(), d("li", null, f(G), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Tt = { class: "TransactButton" }, Pt = {
  key: 1,
  disabled: ""
}, Dt = {
  key: 2,
  disabled: ""
}, Wt = {
  key: 3,
  disabled: ""
}, Ut = { key: 4 }, Bt = {
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
  setup(i, { emit: t }) {
    const e = i, s = a.contracts[e.contract];
    let n = O({
      get() {
        return e.modelValue;
      },
      set(u) {
        t("update:modelValue", u);
      }
    });
    function r() {
      const u = e.args ? e.args : [], h = e.txArgs ? e.txArgs : {};
      n.value.send(u, h);
    }
    return e.config && e.configs.notx && s.onReadSafe(() => {
      n = new K(e.contract, e.method);
    }), (u, h) => {
      const p = C("OnContractReadSafe");
      return c(), g(p, {
        contract: e.contract
      }, {
        default: S(() => [
          l("div", Tt, [
            o(n).status.is("READY") ? (c(), d("button", {
              key: 0,
              onClick: r
            }, f(e.configs && e.configs.content ? e.configs.content : "Transact"), 1)) : o(n).status.is("SENT") ? (c(), d("button", Pt, "Transaction sent...")) : o(n).status.is("ERROR") ? (c(), d("button", Dt, "Transaction error!")) : o(n).status.is("SUCCESS") ? (c(), d("button", Wt, "Success !")) : I("", !0),
            !(e.configs && e.configs.noerror) && o(n).status.is("ERROR") ? (c(), d("p", Ut, f(o(n).error.value.reason), 1)) : I("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
};
const H = (i, t) => {
  const e = i.__vccOpts || i;
  for (const [s, n] of t)
    e[s] = n;
  return e;
}, jt = {
  __name: "ConnectWalletButton",
  props: {
    styleLevel: ct
  },
  setup(i) {
    const t = i;
    return (e, s) => (c(), g(o(a).provider.OnSafe, null, {
      default: S(() => [
        l("div", {
          class: X(["ConnectWalletButton", `ve-${t.styleLevel}`])
        }, null, 2)
      ]),
      _: 1
    }));
  }
}, qe = /* @__PURE__ */ H(jt, [["__scopeId", "data-v-a10b4efb"]]), Mt = { class: "SelectWalletDropdown" }, Vt = { key: 0 }, Lt = /* @__PURE__ */ l("p", null, "Connection requested...", -1), qt = [
  Lt
], Gt = { key: 1 }, Ft = /* @__PURE__ */ l("p", null, "Connection refused!", -1), Ht = [
  Ft
], zt = { key: 2 }, Kt = /* @__PURE__ */ l("p", null, "Select a wallet", -1), Yt = [
  Kt
], Zt = ["src", "alt"], Qt = ["onClick"], Jt = ["src", "alt"], Ge = {
  __name: "SelectWalletDropdown",
  setup(i) {
    let t = y(null), e = y([]), s = y(!1), n = y({});
    a.onSafe(async function() {
      e.value = a.config.wallets.getAvailable();
    }), a.provider.onSafe(async function() {
      n.value = await a.config.networks.getCurrent();
    }), a.signer.onSafe(async function() {
      t.value = await a.config.wallets.getCurrent(), e.value = a.config.wallets.getAvailable().filter((u) => u.id !== t.value.id);
    });
    function r() {
      s.value = !s.value;
    }
    return (u, h) => {
      const p = C("OnDappSafe");
      return c(), g(p, null, {
        default: S(() => [
          l("div", Mt, [
            l("ul", null, [
              o(a).signer.status.is("REQUESTED") ? (c(), d("li", Vt, qt)) : o(a).signer.status.is("REFUSED") ? (c(), d("li", Gt, Ht)) : o(a).provider.status.is("WRONG_NETWORK") ? (c(), d("li", zt, [
                l("p", null, "Wrong network! (" + f(o(n) ? o(n).displayName : "unknown") + ")", 1)
              ])) : o(a).signer.status.is("DISCONNECTED") || !o(t) ? (c(), d("li", {
                key: 3,
                onClick: r
              }, Yt)) : o(a).signer.status.is("CONNECTED") ? (c(), d("li", {
                key: 4,
                onClick: r
              }, [
                l("img", {
                  width: "40",
                  src: o(t).icon ? o(t).icon : o(a).config.defaults.wallets.icon,
                  alt: o(t).displayName + " logo"
                }, null, 8, Zt),
                l("p", null, f(o(t).displayName), 1)
              ])) : I("", !0),
              o(s) ? (c(!0), d(w, { key: 5 }, v(o(e), (m) => (c(), d("li", {
                key: m.id,
                onClick: (G) => o(a).signer.connectWallet(m.id)
              }, [
                l("img", {
                  width: "40",
                  src: m.icon ? m.icon : o(a).config.defaults.wallets.icon,
                  alt: m.displayName + " logo"
                }, null, 8, Jt),
                l("p", null, f(m.displayName), 1)
              ], 8, Qt))), 128)) : I("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Xt = { class: "SelectNetworkDropdown" }, te = { key: 0 }, ee = ["src", "alt"], se = { key: 1 }, ne = /* @__PURE__ */ l("p", null, "Select a network", -1), ae = [
  ne
], ie = ["onClick"], re = ["src", "alt"], Fe = {
  __name: "SelectNetworkDropdown",
  setup(i) {
    let t = y({}), e = y([]), s = y(!1);
    a.onSafe(async function() {
      e.value = a.config.networks.getAvailable();
    }), a.provider.onSafe(async function() {
      t.value = await a.config.networks.getCurrent(), e.value = a.config.networks.getAvailable().filter((r) => r.id !== t.value.id);
    });
    function n() {
      s.value = !s.value;
    }
    return (r, u) => {
      const h = C("OnDappSafe");
      return c(), g(h, null, {
        default: S(() => [
          l("div", Xt, [
            l("ul", { onClick: n }, [
              o(t) ? (c(), d("li", te, [
                l("img", {
                  width: "40",
                  src: o(t).icon ? o(t).icon : o(a).config.defaults.networks.icon,
                  alt: o(t).displayName + " logo"
                }, null, 8, ee),
                l("p", null, f(o(t).displayName), 1)
              ])) : (c(), d("li", se, ae)),
              o(s) ? (c(!0), d(w, { key: 2 }, v(o(e), (p) => (c(), d("li", {
                key: p.id,
                onClick: (m) => o(a).provider.changeNetwork(p.id)
              }, [
                l("img", {
                  width: "40",
                  src: p.icon ? p.icon : o(a).config.defaults.networks.icon,
                  alt: p.displayName + " logo"
                }, null, 8, re),
                l("p", null, f(p.displayName), 1)
              ], 8, ie))), 128)) : I("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, oe = {
  __name: "OnDappSafe",
  setup(i) {
    return (t, e) => o(a).isSafe.value ? (c(), d(w, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, le = {
  __name: "OnProviderSafe",
  setup(i) {
    return (t, e) => o(a).provider.isSafe.value ? (c(), d(w, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, ce = {
  __name: "OnSignerSafe",
  setup(i) {
    return (t, e) => o(a).signer.isSafe.value ? (c(), d(w, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, ue = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(i) {
    const t = i;
    return (e, s) => o(a).contracts[t.contract].isReadSafe.value ? (c(), d(w, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, de = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(i) {
    const t = i;
    return (e, s) => o(a).contracts[t.contract].isWriteSafe.value ? (c(), d(w, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
};
const z = (i) => (tt("data-v-a24ac687"), i = i(), et(), i), he = /* @__PURE__ */ z(() => /* @__PURE__ */ l("h3", null, "Safe Runners", -1)), pe = /* @__PURE__ */ z(() => /* @__PURE__ */ l("h3", null, "Status", -1)), fe = {
  __name: "DebugBar",
  setup(i) {
    return (t, e) => {
      const s = C("OnDappSafe");
      return c(), g(s, null, {
        default: S(() => [
          l("section", null, [
            l("div", null, [
              he,
              l("ul", null, [
                l("li", null, "DApp safe : " + f(o(a).isSafe), 1),
                l("li", null, "Provider safe : " + f(o(a).provider.isSafe), 1),
                l("li", null, "Signer safe : " + f(o(a).signer.isSafe), 1),
                (c(!0), d(w, null, v(o(a).contracts.getAll(), (n, r) => (c(), d("li", null, [
                  $(" contract " + f(r) + " : ", 1),
                  l("ul", null, [
                    l("li", null, "read safe : " + f(n.isReadSafe), 1),
                    l("li", null, "write safe : " + f(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            l("div", null, [
              pe,
              l("ul", null, [
                l("li", null, "dapp : " + f(o(a).status.get()), 1),
                l("li", null, "provider : " + f(o(a).provider.status.get()), 1),
                l("li", null, "signer : " + f(o(a).signer.status.get()), 1),
                (c(!0), d(w, null, v(o(a).contracts.getAll(), (n, r) => (c(), d("li", null, " contract " + f(r) + " : " + f(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, He = /* @__PURE__ */ H(fe, [["__scopeId", "data-v-a24ac687"]]), me = { class: "InputUnits" }, ye = ["placeholder"], _e = ["value"], we = {
  __name: "InputUnits",
  props: {
    modelValue: {},
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(i, { emit: t }) {
    const e = i;
    let s = y(null);
    const n = ["wei", "gwei", "ether"];
    let r = y("wei");
    function u() {
      if (s.value) {
        const h = N.utils.parseUnits(s.value, r.value);
        t("update:modelValue", h);
      }
    }
    return (h, p) => (c(), d("div", me, [
      B(l("input", {
        onInput: u,
        "onUpdate:modelValue": p[0] || (p[0] = (m) => T(s) ? s.value = m : s = m),
        type: "text",
        placeholder: o(e).placeholder
      }, null, 40, ye), [
        [L, o(s)]
      ]),
      B(l("select", {
        onChange: u,
        "onUpdate:modelValue": p[1] || (p[1] = (m) => T(r) ? r.value = m : r = m)
      }, [
        (c(), d(w, null, v(n, (m) => l("option", { value: m }, f(m), 9, _e)), 64))
      ], 544), [
        [st, o(r)]
      ])
    ]));
  }
};
class D {
  constructor(t, e) {
    if (this._name = t, this.states = [], !Array.isArray(e))
      throw `The 'states' parameter of a Status instance '${t}' must an array of strings. Got: ${e}`;
    for (const s of e)
      this.states.push(this._formatState(s));
    this._state = y(this.states[0]);
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
    return P(this._state);
  }
  getRef() {
    return this._state;
  }
  set(t) {
    if (t = this._formatState(t), !this._isStateValid(t))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${t}`;
    E(this._state, t), console.log(`Status '${this._name}' set to '${P(this._state)}'`);
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
    let s = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${t}`;
    if (Array.isArray(t)) {
      if (!this._areStatesValid(t))
        throw s;
      return k(this._state, () => {
        this.isIn(t) && e(this.get());
      });
    } else {
      if (!this._isStateValid(t))
        throw s;
      return k(this._state, () => {
        this.is(t) && e(this.get());
      });
    }
  }
  watchAny(t) {
    return this.watch(this.states, t);
  }
}
const R = {
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
class ve {
  constructor(t = null) {
    let e = {};
    return t ? e = A({ ...R.style }, { ...t }) : e = R.style, window.addEventListener("load", () => {
      const s = document.getElementsByClassName("ve-app");
      if (s)
        for (const n of s)
          n && n.classList.add(`ve-${e.level}`);
    }), e;
  }
}
class ge {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const s = R.networks.find((r) => r.id === e.id), n = A({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const e of R.networks)
      this._list.find((n) => n.id === e.id) || (e.available = !1, this._list.push(e));
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
class Se {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const s = R.wallets.find((r) => r.id === e.id), n = A({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.id), this._list.push(n);
        }
    }
    for (const e of R.wallets)
      this._list.find((n) => n.id === e.id) || (e.available = !1, this._list.push(e));
  }
  getCurrent() {
    return console.log("GET CURRENT, id = " + a.signer.id), a.signer.proxy.ethersInstance ? this.getById(a.signer.id) : null;
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
class Ie {
  constructor(t = null) {
    let e = {};
    return t ? e = A({ ...R.defaults }, { ...t }) : e = R.defaults, e;
  }
}
class Ce {
  constructor(t = null) {
    this.style = new ve(t ? t.style : null), this.networks = new ge(t ? t.networks : null), this.wallets = new Se(t ? t.wallets : null), this.defaults = new Ie(t ? t.defaults : null);
  }
}
class j {
  constructor(t = null, e = null, s = null) {
    const n = new Proxy(this, {
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
        this.placeholderInstance._ars.oldEthersInstance = { ...this._ethersInstance }, this._ethersInstance = r && nt(r), this._initIsRunning || n._asyncInit();
      },
      extensionInstance: e,
      placeholderInstance: s
    }, this.proxy.ethersInstance = t, n;
  }
}
class Ee {
}
class M {
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
    const e = U();
    if (this.isSafe.value)
      t(e);
    else {
      const s = k(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
class be extends M {
  constructor() {
    super(), this.status = new D("provider", [
      "DISCONNECTED",
      "ERROR",
      "WRONG_NETWORK",
      "CONNECTED"
    ]), this.isSafe = O(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this.OnSafe = le;
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
        const s = e.getProvider();
        s && (this.proxy.ethersInstance = s);
      }
  }
  _autoInstantiateFromDefaultConfig() {
    const t = a.config.networks.getDefault();
    t && t.defaultRPC && (this.proxy.ethersInstance = new N.providers.JsonRpcProvider(t.defaultRPC));
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
    else if (this.status.set("WRONG_NETWORK"), e = a.config.networks.getAll().find((s) => s.id === t.id), !e) {
      const s = {
        name: t.name,
        displayName: lt(t.name),
        id: t.chainId
      };
      console.log(s), a.config.networks.add(s);
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
class ke extends j {
  constructor(t = null, e = null, s = null) {
    super(
      t,
      e || new Ee(),
      s || new be()
    ), this._asyncInit();
  }
}
class xe {
}
class Re extends M {
  constructor() {
    super(), this.id = null, this.address = y(null), this.status = new D("signer", [
      "NO_PROVIDER",
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "WRONG_NETWORK",
      "CONNECTED"
    ]), this.isSafe = O(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this.OnSafe = ce;
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
      this.proxy.ethersInstance || await this._autoInstantiate(), this.proxy.ethersInstance || this.status.set("DISCONNECTED"), this._initARS(), this.proxy._initIsRunning = !1;
    }.bind(this));
  }
  async _setSignerDatas(t) {
    const e = await t.getSigner(), s = await e.getAddress();
    this.address.value = s, a.signer.proxy.ethersInstance = e, this.id = t.id, a.signer.status.set("CONNECTED");
  }
  async connectWallet(t, e = !1) {
    console.log("CONNECT lazy = " + e);
    const s = a.wallets[t];
    if (s.lazyConnectAvailable) {
      if (await s.connect(!0), await s.isConnected())
        await this._setSignerDatas(s);
      else if (e) {
        a.signer.status.set("DISCONNECTED");
        return;
      }
    }
    try {
      this.status.set("REQUESTED"), await s.connect(!1), await this._setSignerDatas(s);
    } catch (n) {
      if (n instanceof q)
        this.status.set("REFUSED");
      else
        throw this.status.set("ERROR"), n;
    }
  }
  disconnectWallet() {
    a.signer.proxy.ethersInstance = null, this.address.value = null, a.signer.status.set("DISCONNECTED");
  }
}
class Ne extends j {
  constructor(t = null, e = null, s = null) {
    super(
      t,
      e || new xe(),
      s || new Re()
    ), this._asyncInit();
  }
}
class Oe {
  _watch(t, e, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(t, e, s);
  }
  watch(t, e, s, n = null) {
    const r = this._watch(t, e, s);
    return n ? W(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, r);
    }, n) : W(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, r);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], t, e, r);
  }
  watchRef(t, e, s = null) {
    const n = this._watch(t, e, null);
    return s ? W(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, n);
    }, s) : W(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, n);
    }), a.chainWatchers.contracts[this.address].getRef(t, e);
  }
}
class $e extends M {
  constructor() {
    super(), this.name = "TODO", this.status = new D(`contract:${name}`, [
      "NO_PROVIDER",
      "UNAVAILABLE",
      "ERROR",
      "INITIALIZED"
    ]), this.isReadSafe = O(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = O(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.OnReadSafe = x(ue, { contract: this.name }), this.OnWriteSafe = x(de, { contract: this.name });
  }
  onSafe(t) {
    throw "TulipeContract instances don't have 'onSafe()' method, use 'onReadSafe()' and 'onWriteSafe()' instead.";
  }
  onReadSafe(t) {
    const e = U();
    if (this.isReadSafe.value)
      t(e);
    else {
      const s = k(this.isReadSafe, () => {
        this.isReadSafe.value && (t(e), s());
      });
    }
  }
  onWriteSafe(t) {
    const e = U();
    if (this.isWriteSafe.value)
      t(e);
    else {
      const s = k(this.isWriteSafe, () => {
        this.isWriteSafe.value && (t(e), s());
      });
    }
  }
  _updateContract(t, e) {
    if (a.signer.isSafe.value)
      this.proxy.ethersInstance = new N.Contract(t, e, a.signer.proxy.ethersInstance);
    else if (a.provider.isSafe.value)
      this.proxy.ethersInstance = new N.Contract(t, e, a.provider.proxy.ethersInstance);
    else
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`;
  }
  _initARS(t, e) {
    this._purgeARS(), this._ars.unwatchers.push(
      a.provider.status.watchAny((s) => {
        s === "WRONG_NETWORK" ? this.status.set("UNAVAILABLE") : ["DISCONNECTED", "ERROR"].includes(s) && this.status.set("NO_PROVIDER");
      })
    ), this._ars.unwatchers.push(
      k([a.signer.isSafe], (s, n) => {
        s !== n && (this.proxy.ethersInstance = null, this._updateContract(t, e));
      })
    );
  }
  async _asyncInit() {
    this.proxy._initIsRunning = !0, a.provider.onSafe(async function() {
      this.proxy.ethersInstance ? this._initARS() : this.status.set("UNAVAILABLE"), this.proxy._initIsRunning = !1;
    }.bind(this));
  }
}
class F extends j {
  constructor(t, e = null, s = null, n = null) {
    super(
      e,
      s || new Oe(),
      n || new $e(t)
    ), this._asyncInit();
  }
}
class Ae {
}
class Te extends M {
  constructor(t, e, s = [], n = { value: 0 }) {
    super(), this.contractName = t, this.methodName = e, this.methodInfos = {}, this.args = y(s), this.txArgs = y(n), this.data = y([]), this.error = y(null), this.call = null, this.status = new D(`tx:${t}:${e}`, [
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
    t = t && t.length > 0 ? t : P(this.args), t ? Array.isArray(t) ? this.call = this.proxy.ethersInstance(...t, e) : this.call = this.proxy.ethersInstance(t, e) : this.call = this.proxy.ethersInstance(e), this.status.set("SENT"), this.methodInfos.constant ? this.call.then((s) => {
      Array.isArray(s) || (s = [s]), E(this.data, s), E(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      E(this.error, s), this.status.set("ERROR");
    }) : this.call.then((s) => s.wait()).then((s) => {
      Array.isArray(s) || (s = [s]), E(this.data, s), E(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      E(this.error, s), this.status.set("ERROR"), console.log(s);
    });
  }
}
class K extends j {
  constructor(t, e, s = [], n = { value: 0 }, r = null, u = null, h = null) {
    super(
      r,
      u || new Ae(),
      h || new Te(t, e, s = [], n = { value: 0 })
    ), this._asyncInit();
  }
}
class Y {
  constructor() {
    this.lastUpdateBlock = 0, this.sources = {};
  }
  _generateDependentUUID() {
    return "xxxxxxxx".replace(/[xy]/g, function(t) {
      var e = Math.random() * 16 | 0, s = t == "x" ? e : e & 3 | 8;
      return s.toString(16);
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
class Pe extends Y {
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
  add(t, e, s = null) {
    const n = this._buildSourceName(t, e);
    let r = !1;
    Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: t,
      args: e,
      state: y(null),
      dependents: {}
    }, r = !0);
    let u = null;
    s && (u = k(this.sources[n].state, s));
    const h = this._generateDependentUUID();
    return this.sources[n].dependents[h] = u, r && this._updateState(this.sources[n]), h;
  }
  remove(t, e, s) {
    const n = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const r = this.sources[n].dependents[s];
      r && r(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(t, e) {
    const s = this._buildSourceName(t, e);
    return this.sources[s].state;
  }
}
class De extends Y {
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
  add(t, e, s = null) {
    if (!this.availableSources.includes(t))
      throw `Sources added to a ChainWalletWatcher must be in ${this.availableSources}. Got ${t}`;
    const n = this._buildSourceName(t, e);
    newSource = !1, Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: t,
      args: e,
      state: ref(null),
      dependents: {}
    }, newSource = !0);
    let r = null;
    s && (r = watch(this.sources[n].state, s));
    const u = this._generateDependentUUID();
    return this.sources[n].dependents[u] = r, newSource && this._updateState(this.sources[n]), u;
  }
  remove(t, e, s) {
    const n = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const r = this.sources[n].dependents[s];
      r && r(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(t, e) {
    const s = this._buildSourceName(t, e);
    return this.sources[s].state;
  }
}
class q extends Error {
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
    return this.exposedObject ? new N.providers.Web3Provider(this.exposedObject, "any") : null;
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
        throw e.code === 4001 ? new q(this.id) : e;
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
      t = N.utils.hexlify(parseInt(t)).toString(), t = N.utils.hexValue(t);
      try {
        await this.exposedObject.request({
          method: "wallet_switchEthereumChain",
          params: [{
            chainId: t
          }]
        });
      } catch (n) {
        if (n.code === 4902)
          this.addNetwork(t);
        else
          throw n;
      }
    }
  }
}
class We extends Q {
  constructor() {
    super("metamask", window.ethereum);
  }
}
class Ue extends Z {
  constructor(t, e = {}) {
    super(), this.id = "coinbase";
    const s = e.appName || "", n = e.appLogoUrl, r = e.darkMode || !1;
    this.coinbaseWalletSdk = new t({
      appName: s,
      appLogoUrl: n,
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
      throw q(this.id);
    }
  }
}
class Be extends Q {
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
const je = {
  metamask: We,
  coinbase: Ue,
  binanceChain: Be
};
async function ze(i, t) {
  const e = t;
  try {
    a.init(e);
  } catch (n) {
    throw a && a.status && a.status.set("ERROR"), n;
  }
  i.config.globalProperties.dapp = a, i.config.globalProperties.rGet = P, i.config.globalProperties.rSet = E, window.dapp = a;
  const s = await import("./index.5b13cfde.mjs");
  i.component("OnDappSafe", s.OnDappSafe), i.component("OnProviderSafe", s.OnProviderSafe), i.component("OnSignerSafe", s.OnSignerSafe), i.component("OnContractReadSafe", s.OnContractReadSafe), i.component("OnContractWriteSafe", s.OnContractWriteSafe), a.status.set("INITIALIZED");
}
export {
  qe as ConnectWalletButton,
  Le as ContractInteractor,
  Pe as ContractWatcher,
  He as DebugBar,
  At as EventInteractor,
  Nt as EventsInteractor,
  we as InputUnits,
  xt as MethodInteractor,
  yt as MethodsInteractor,
  ue as OnContractReadSafe,
  de as OnContractWriteSafe,
  oe as OnDappSafe,
  le as OnProviderSafe,
  ce as OnSignerSafe,
  Fe as SelectNetworkDropdown,
  Ge as SelectWalletDropdown,
  D as Status,
  Bt as Transact,
  Ce as TulipeConfig,
  F as TulipeContractProxy,
  ke as TulipeProviderProxy,
  j as TulipeProxy,
  Ne as TulipeSignerProxy,
  K as TulipeTransactionProxy,
  q as WalletConnectionRejected,
  De as WalletWatcher,
  lt as capitalizeWords,
  a as dapp,
  A as deepMerge,
  ze as initTulipe,
  V as isObject,
  P as rGet,
  E as rSet,
  ct as styleLevelProp,
  je as wallets
};
