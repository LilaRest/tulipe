import { isRef as $, ref as y, resolveComponent as R, openBlock as l, createBlock as I, withCtx as C, createElementVNode as c, toDisplayString as f, unref as i, createVNode as x, createTextVNode as P, createElementBlock as u, Fragment as w, renderList as g, shallowRef as nt, withDirectives as B, vModelText as L, createCommentVNode as E, computed as A, normalizeClass as at, renderSlot as v, pushScopeId as rt, popScopeId as it, vModelSelect as ot, watch as S, markRaw as ct, getCurrentInstance as N, onUnmounted as U } from "vue";
import { ethers as m } from "ethers";
class lt {
  constructor() {
    const t = a.config.wallets.getAvailable();
    for (const e of t) {
      const s = Fe[e.id];
      s && (this[e.id] = new s());
    }
  }
}
class ut {
  constructor() {
  }
  init() {
    for (const t of a.config.networks.getAll())
      if (t.contracts)
        for (const [e, s] of Object.entries(t.contracts))
          this.add(e, s.address, s.abi);
  }
  add(t, e, s) {
    const n = new m.Contract(e, s);
    a._ars.contracts.add(t), this[t] = new j(t, n), a._ars.contracts[t].start();
  }
  getAll() {
    const t = {};
    for (const [e, s] of Object.entries(this))
      s instanceof j && (t[e] = s);
    return t;
  }
}
class ht {
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
    Object.keys(this.contracts).includes(t.address) || (this.contracts[t.address] = new Ve(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.contracts).includes(t.address) && delete this.contracts[t.address];
  }
  addWalletWatcher(t) {
    Object.keys(this.wallets).includes(t) || (this.wallets[t] = new Me(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.wallets).includes(t) && delete this.wallets[t];
  }
}
class dt {
  constructor() {
  }
  init(t = null) {
    this.config = new xe(t), this._ars = new Ze(), this.status = this._ars.dapp.status, this.isSafe = this._ars.dapp.isSafe, this.OnSafe = this._ars.dapp.OnSafe, this.onSafe = this._ars.dapp.onSafe, this.chainWatchers = new ht(), this.wallets = new lt(), this.provider = new q(), this._ars.provider.start(), this.signer = new G(), this._ars.signer.start(), this.contracts = new ut(), this.contracts.init(), this.pro = this.provider, this.sig = this.signer, this.con = this.contracts;
  }
}
const a = new dt();
function M(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function W(r, ...t) {
  if (!t.length)
    return r;
  const e = t.shift();
  if (M(r) && M(e))
    for (const s in e)
      M(e[s]) ? (r[s] || Object.assign(r, {
        [s]: {}
      }), W(r[s], e[s])) : Object.assign(r, {
        [s]: e[s]
      });
  return W(r, ...t);
}
function pt(r) {
  const t = r.split(" ");
  for (let e = 0; e < t.length; e++)
    t[e] = t[e][0].toUpperCase() + t[e].substring(1);
  return t.join(" ");
}
function D(r) {
  return $(r) ? D(r.value) : r;
}
function b(r, t) {
  $(r) ? r.value = t : r = t;
}
const ft = {
  required: !1,
  type: String,
  default: "minimal",
  validator(r) {
    return ["unstylized", "minimal", "opinionated"].includes(r);
  }
}, mt = { class: "ContractInteractor" }, _t = /* @__PURE__ */ P(" Methods : "), yt = /* @__PURE__ */ c("br", null, null, -1), vt = /* @__PURE__ */ P(" Events : "), wt = /* @__PURE__ */ c("br", null, null, -1), ts = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r, e = a.contracts[t.contract];
    let s = y("not owned");
    return a.contracts[t.contract].onReadSafe(async function() {
      try {
        s.value = await e.owner();
      } catch {
      }
    }), (n, o) => {
      const h = R("OnContractReadSafe");
      return l(), I(h, {
        contract: t.contract
      }, {
        default: C(() => [
          c("div", mt, [
            c("ul", null, [
              c("li", null, "Address : " + f(i(e).address), 1),
              c("li", null, "Owner : " + f(i(s)), 1),
              c("li", null, [
                _t,
                yt,
                x(i(gt), {
                  contract: t.contract
                }, null, 8, ["contract"])
              ]),
              c("li", null, [
                vt,
                wt,
                x(i($t), {
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
}, St = { class: "MethodsInteractor" }, gt = {
  __name: "MethodsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r, e = a.contracts[t.contract];
    return (s, n) => {
      const o = R("OnContractReadSafe");
      return l(), I(o, {
        contract: t.contract
      }, {
        default: C(() => [
          c("div", St, [
            c("ul", null, [
              (l(!0), u(w, null, g(i(e).interface.functions, (h, d) => (l(), u("li", null, [
                x(i(At), {
                  contract: t.contract,
                  method: d
                }, null, 8, ["contract", "method"])
              ]))), 256))
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, It = { class: "MethodInteractor" }, Ct = { key: 0 }, Et = /* @__PURE__ */ c("p", null, "Inputs :", -1), Rt = ["onUpdate:modelValue", "placeholder"], bt = { key: 0 }, kt = { key: 1 }, xt = /* @__PURE__ */ c("p", null, "Outputs :", -1), Ot = ["onUpdate:modelValue", "placeholder"], Nt = ["placeholder"], Pt = { key: 2 }, At = {
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
  setup(r) {
    const t = r, e = nt(new Y(t.contract, t.method));
    function s(n) {
      return `${n.name && n.name !== "null" ? n.name : ""} (${n.type})`;
    }
    return (n, o) => {
      const h = R("OnContractReadSafe");
      return l(), I(h, {
        contract: t.contract
      }, {
        default: C(() => [
          c("div", It, [
            x(i(qt), {
              contract: t.contract,
              method: t.method,
              modelValue: i(e),
              "onUpdate:modelValue": o[0] || (o[0] = (d) => $(e) ? e.value = d : null),
              configs: { content: t.method, notx: !0, noerror: !0 }
            }, null, 8, ["contract", "method", "modelValue", "configs"]),
            c("small", null, f(i(e).methodInfos.stateMutability), 1),
            Object.keys(i(e).methodInfos.inputs).length > 0 || i(e).methodInfos.payable ? (l(), u("div", Ct, [
              Et,
              c("ul", null, [
                (l(!0), u(w, null, g(i(e).methodInfos.inputs, (d, p) => (l(), u("li", null, [
                  B(c("input", {
                    "onUpdate:modelValue": (_) => i(e).args.value[p] = _,
                    type: "text",
                    placeholder: s(d)
                  }, null, 8, Rt), [
                    [L, i(e).args.value[p]]
                  ]),
                  P(" " + f(i(e).args.value[p]) + " " + f(typeof i(e).args.value[p]), 1)
                ]))), 256)),
                i(e).methodInfos.payable ? (l(), u("li", bt, [
                  x(i(Ce), {
                    modelValue: i(e).txArgs.value.value,
                    "onUpdate:modelValue": o[1] || (o[1] = (d) => i(e).txArgs.value.value = d)
                  }, null, 8, ["modelValue"]),
                  P(" " + f(i(e).txArgs.value.value) + " " + f(typeof i(e).txArgs.value.value), 1)
                ])) : E("", !0)
              ])
            ])) : E("", !0),
            Object.keys(i(e).methodInfos.outputs).length > 0 ? (l(), u("div", kt, [
              xt,
              c("ul", null, [
                (l(!0), u(w, null, g(i(e).methodInfos.outputs, (d, p) => (l(), u("li", null, [
                  i(e).data.value ? B((l(), u("input", {
                    key: 0,
                    "onUpdate:modelValue": (_) => i(e).data.value[p] = _,
                    type: "text",
                    placeholder: s(d),
                    disabled: ""
                  }, null, 8, Ot)), [
                    [L, i(e).data.value[p]]
                  ]) : (l(), u("input", {
                    key: 1,
                    type: "text",
                    placeholder: s(d),
                    disabled: ""
                  }, null, 8, Nt))
                ]))), 256))
              ])
            ])) : E("", !0),
            i(e).status.is("ERROR") ? (l(), u("p", Pt, f(i(e).error.value.reason), 1)) : E("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Wt = { class: "EventsInteractor" }, $t = {
  __name: "EventsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r, e = a.contracts[t.contract];
    return (s, n) => {
      const o = R("OnContractReadSafe");
      return l(), I(o, {
        contract: t.contract
      }, {
        default: C(() => [
          c("div", Wt, [
            c("ul", null, [
              (l(!0), u(w, null, g(i(e).interface.events, (h, d) => (l(), u("li", null, [
                x(i(Ut), {
                  contract: t.contract,
                  event: d
                }, null, 8, ["contract", "event"])
              ]))), 256))
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Dt = { class: "EventInteractor" }, Tt = /* @__PURE__ */ P("Logs: "), Ut = {
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
  setup(r) {
    const t = r, e = a.contracts[t.contract];
    let s = y({}), n = y({}), o = y(0), h = y([]);
    return e.onReadSafe(() => {
      s.value = e.interface.events[t.event], n.value = e.filters[s.value.name], e.on(n.value, (d) => {
        o.value++;
        let p = `Block ${d.blockNumber} -> {`;
        for (const _ of s.value.inputs)
          p += `${_.name}:${d.args[_.name]}, `;
        p = p.substring(0, p.length - 2) + "}", h.value.push(p);
      });
    }), (d, p) => {
      const _ = R("OnContractReadSafe");
      return l(), I(_, {
        contract: t.contract
      }, {
        default: C(() => [
          c("div", Dt, [
            c("p", null, f(i(s).name), 1),
            c("ul", null, [
              c("li", null, "Count : " + f(i(o)), 1),
              c("li", null, [
                Tt,
                c("ul", null, [
                  (l(!0), u(w, null, g(i(h), (z) => (l(), u("li", null, f(z), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Bt = { class: "TransactButton" }, jt = {
  key: 1,
  disabled: ""
}, Vt = {
  key: 2,
  disabled: ""
}, Mt = {
  key: 3,
  disabled: ""
}, Lt = { key: 4 }, qt = {
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
  setup(r, { emit: t }) {
    const e = r, s = a.contracts[e.contract];
    let n = A({
      get() {
        return e.modelValue;
      },
      set(h) {
        t("update:modelValue", h);
      }
    });
    function o() {
      const h = e.args ? e.args : [], d = e.txArgs ? e.txArgs : {};
      n.value.send(h, d);
    }
    return e.config && e.configs.notx && s.onReadSafe(() => {
      n = new Y(e.contract, e.method);
    }), (h, d) => {
      const p = R("OnContractReadSafe");
      return l(), I(p, {
        contract: e.contract
      }, {
        default: C(() => [
          c("div", Bt, [
            i(n).status.is("READY") ? (l(), u("button", {
              key: 0,
              onClick: o
            }, f(e.configs && e.configs.content ? e.configs.content : "Transact"), 1)) : i(n).status.is("SENT") ? (l(), u("button", jt, "Transaction sent...")) : i(n).status.is("ERROR") ? (l(), u("button", Vt, "Transaction error!")) : i(n).status.is("SUCCESS") ? (l(), u("button", Mt, "Success !")) : E("", !0),
            !(e.configs && e.configs.noerror) && i(n).status.is("ERROR") ? (l(), u("p", Lt, f(i(n).error.value.reason), 1)) : E("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
};
const K = (r, t) => {
  const e = r.__vccOpts || r;
  for (const [s, n] of t)
    e[s] = n;
  return e;
}, Gt = {
  __name: "ConnectWalletButton",
  props: {
    styleLevel: ft
  },
  setup(r) {
    const t = r;
    return (e, s) => (l(), I(i(a).provider.OnSafe, null, {
      default: C(() => [
        c("div", {
          class: at(["ConnectWalletButton", `ve-${t.styleLevel}`])
        }, null, 2)
      ]),
      _: 1
    }));
  }
}, es = /* @__PURE__ */ K(Gt, [["__scopeId", "data-v-a10b4efb"]]), Ft = { class: "SelectWalletDropdown" }, Ht = { key: 0 }, zt = /* @__PURE__ */ c("p", null, "Connection requested...", -1), Kt = [
  zt
], Jt = { key: 1 }, Yt = /* @__PURE__ */ c("p", null, "Connection refused!", -1), Zt = [
  Yt
], Qt = { key: 2 }, Xt = /* @__PURE__ */ c("p", null, "Select a wallet", -1), te = [
  Xt
], ee = ["src", "alt"], se = ["onClick"], ne = ["src", "alt"], ss = {
  __name: "SelectWalletDropdown",
  setup(r) {
    let t = y(null), e = y([]), s = y(!1), n = y({});
    a.onSafe(async function() {
      e.value = a.config.wallets.getAvailable();
    }), a.provider.onSafe(async function() {
      n.value = await a.config.networks.getCurrent();
    }), a.signer.onSafe(async function() {
      t.value = await a.config.wallets.getCurrent(), e.value = a.config.wallets.getAvailable().filter((h) => h.id !== t.value.id);
    });
    function o() {
      s.value = !s.value;
    }
    return (h, d) => {
      const p = R("OnDappSafe");
      return l(), I(p, null, {
        default: C(() => [
          c("div", Ft, [
            c("ul", null, [
              i(a).signer.status.is("REQUESTED") ? (l(), u("li", Ht, Kt)) : i(a).signer.status.is("REFUSED") ? (l(), u("li", Jt, Zt)) : i(a).provider.status.is("WRONG_NETWORK") ? (l(), u("li", Qt, [
                c("p", null, "Wrong network! (" + f(i(n) ? i(n).displayName : "unknown") + ")", 1)
              ])) : i(a).signer.status.is("DISCONNECTED") || !i(t) ? (l(), u("li", {
                key: 3,
                onClick: o
              }, te)) : i(a).signer.status.is("CONNECTED") ? (l(), u("li", {
                key: 4,
                onClick: o
              }, [
                c("img", {
                  width: "40",
                  src: i(t).icon ? i(t).icon : i(a).config.defaults.wallets.icon,
                  alt: i(t).displayName + " logo"
                }, null, 8, ee),
                c("p", null, f(i(t).displayName), 1)
              ])) : E("", !0),
              i(s) ? (l(!0), u(w, { key: 5 }, g(i(e), (_) => (l(), u("li", {
                key: _.id,
                onClick: (z) => i(a).signer.connectWallet(_.id)
              }, [
                c("img", {
                  width: "40",
                  src: _.icon ? _.icon : i(a).config.defaults.wallets.icon,
                  alt: _.displayName + " logo"
                }, null, 8, ne),
                c("p", null, f(_.displayName), 1)
              ], 8, se))), 128)) : E("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, ae = { class: "SelectNetworkDropdown" }, re = { key: 0 }, ie = ["src", "alt"], oe = { key: 1 }, ce = /* @__PURE__ */ c("p", null, "Select a network", -1), le = [
  ce
], ue = ["onClick"], he = ["src", "alt"], ns = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    let t = y({}), e = y([]), s = y(!1);
    a.onSafe(async function() {
      e.value = a.config.networks.getAvailable();
    }), a.provider.onSafe(async function() {
      t.value = await a.config.networks.getCurrent(), e.value = a.config.networks.getAvailable().filter((o) => o.id !== t.value.id);
    });
    function n() {
      s.value = !s.value;
    }
    return (o, h) => {
      const d = R("OnDappSafe");
      return l(), I(d, null, {
        default: C(() => [
          c("div", ae, [
            c("ul", { onClick: n }, [
              i(t) ? (l(), u("li", re, [
                c("img", {
                  width: "40",
                  src: i(t).icon ? i(t).icon : i(a).config.defaults.networks.icon,
                  alt: i(t).displayName + " logo"
                }, null, 8, ie),
                c("p", null, f(i(t).displayName), 1)
              ])) : (l(), u("li", oe, le)),
              i(s) ? (l(!0), u(w, { key: 2 }, g(i(e), (p) => (l(), u("li", {
                key: p.id,
                onClick: (_) => i(a).provider.changeNetwork(p.id)
              }, [
                c("img", {
                  width: "40",
                  src: p.icon ? p.icon : i(a).config.defaults.networks.icon,
                  alt: p.displayName + " logo"
                }, null, 8, he),
                c("p", null, f(p.displayName), 1)
              ], 8, ue))), 128)) : E("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, de = {
  __name: "OnDappSafe",
  setup(r) {
    return (t, e) => i(a).isSafe.value ? (l(), u(w, { key: 0 }, [
      v(t.$slots, "default"),
      v(t.$slots, "safe")
    ], 64)) : v(t.$slots, "unsafe", { key: 1 });
  }
}, pe = {
  __name: "OnProviderSafe",
  setup(r) {
    return (t, e) => i(a).provider.isSafe.value ? (l(), u(w, { key: 0 }, [
      v(t.$slots, "default"),
      v(t.$slots, "safe")
    ], 64)) : v(t.$slots, "unsafe", { key: 1 });
  }
}, fe = {
  __name: "OnSignerSafe",
  setup(r) {
    return (t, e) => i(a).signer.isSafe.value ? (l(), u(w, { key: 0 }, [
      v(t.$slots, "default"),
      v(t.$slots, "safe")
    ], 64)) : v(t.$slots, "unsafe", { key: 1 });
  }
}, me = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r;
    return (e, s) => i(a).contracts[t.contract].isReadSafe.value ? (l(), u(w, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, _e = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r;
    return (e, s) => i(a).contracts[t.contract].isWriteSafe.value ? (l(), u(w, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
};
const J = (r) => (rt("data-v-a24ac687"), r = r(), it(), r), ye = /* @__PURE__ */ J(() => /* @__PURE__ */ c("h3", null, "Safe Runners", -1)), ve = /* @__PURE__ */ J(() => /* @__PURE__ */ c("h3", null, "Status", -1)), we = {
  __name: "DebugBar",
  setup(r) {
    return (t, e) => {
      const s = R("OnDappSafe");
      return l(), I(s, null, {
        default: C(() => [
          c("section", null, [
            c("div", null, [
              ye,
              c("ul", null, [
                c("li", null, "DApp safe : " + f(i(a).isSafe), 1),
                c("li", null, "Provider safe : " + f(i(a).provider.isSafe), 1),
                c("li", null, "Signer safe : " + f(i(a).signer.isSafe), 1),
                (l(!0), u(w, null, g(i(a).contracts.getAll(), (n, o) => (l(), u("li", null, [
                  P(" contract " + f(o) + " : ", 1),
                  c("ul", null, [
                    c("li", null, "read safe : " + f(n.isReadSafe), 1),
                    c("li", null, "write safe : " + f(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            c("div", null, [
              ve,
              c("ul", null, [
                c("li", null, "dapp : " + f(i(a).status.get()), 1),
                c("li", null, "provider : " + f(i(a).provider.status.get()), 1),
                c("li", null, "signer : " + f(i(a).signer.status.get()), 1),
                (l(!0), u(w, null, g(i(a).contracts.getAll(), (n, o) => (l(), u("li", null, " contract " + f(o) + " : " + f(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, as = /* @__PURE__ */ K(we, [["__scopeId", "data-v-a24ac687"]]), Se = { class: "InputUnits" }, ge = ["placeholder"], Ie = ["value"], Ce = {
  __name: "InputUnits",
  props: {
    modelValue: {},
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: t }) {
    const e = r;
    let s = y(null);
    const n = ["wei", "gwei", "ether"];
    let o = y("wei");
    function h() {
      if (s.value) {
        const d = m.utils.parseUnits(s.value, o.value);
        t("update:modelValue", d);
      }
    }
    return (d, p) => (l(), u("div", Se, [
      B(c("input", {
        onInput: h,
        "onUpdate:modelValue": p[0] || (p[0] = (_) => $(s) ? s.value = _ : s = _),
        type: "text",
        placeholder: i(e).placeholder
      }, null, 40, ge), [
        [L, i(s)]
      ]),
      B(c("select", {
        onChange: h,
        "onUpdate:modelValue": p[1] || (p[1] = (_) => $(o) ? o.value = _ : o = _)
      }, [
        (l(), u(w, null, g(n, (_) => c("option", { value: _ }, f(_), 9, Ie)), 64))
      ], 544), [
        [ot, i(o)]
      ])
    ]));
  }
};
class T {
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
    return D(this._state);
  }
  getRef() {
    return this._state;
  }
  set(t) {
    if (t = this._formatState(t), !this._isStateValid(t))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${t}`;
    b(this._state, t), console.log(`Status '${this._name}' set to '${D(this._state)}'`);
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
      return S(this._state, () => {
        this.isIn(t) && e(this.get());
      });
    } else {
      if (!this._isStateValid(t))
        throw s;
      return S(this._state, () => {
        this.is(t) && e(this.get());
      });
    }
  }
  watchAny(t) {
    return this.watch(this.states, t);
  }
}
const O = {
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
class Ee {
  constructor(t = null) {
    let e = {};
    return t ? e = W({ ...O.style }, { ...t }) : e = O.style, window.addEventListener("load", () => {
      const s = document.getElementsByClassName("ve-app");
      if (s)
        for (const n of s)
          n && n.classList.add(`ve-${e.level}`);
    }), e;
  }
}
class Re {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const s = O.networks.find((o) => o.id === e.id), n = W({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const e of O.networks)
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
class be {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const s = O.wallets.find((o) => o.id === e.id), n = W({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.id), this._list.push(n);
        }
    }
    for (const e of O.wallets)
      this._list.find((n) => n.id === e.id) || (e.available = !1, this._list.push(e));
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
class ke {
  constructor(t = null) {
    let e = {};
    return t ? e = W({ ...O.defaults }, { ...t }) : e = O.defaults, e;
  }
}
class xe {
  constructor(t = null) {
    this.style = new Ee(t ? t.style : null), this.networks = new Re(t ? t.networks : null), this.wallets = new be(t ? t.wallets : null), this.defaults = new ke(t ? t.defaults : null);
  }
}
class V {
  constructor(t = null, e = null) {
    console.log("TulipeProxy super");
    const s = new Proxy(this, {
      get: function(n, o, h) {
        if (n.proxy.ethersInstance && n.proxy.ethersInstance[o] !== void 0)
          return typeof n.proxy.ethersInstance[o] == "function" ? n.proxy.ethersInstance[o].bind(n.proxy.ethersInstance) : n.proxy.ethersInstance[o];
        if (n.proxy.ethersInstance && n.proxy.extensionInstance && n.proxy.extensionInstance[o] !== void 0)
          return typeof n.proxy.extensionInstance[o] == "function" ? n.proxy.extensionInstance[o].bind(h) : n.proxy.extensionInstance[o];
        if (n && n[o] !== void 0)
          return typeof n[o] == "function" ? n[o].bind(h) : n[o];
      },
      set: function(n, o, h, d) {
        return n.proxy.ethersInstance && n.proxy.ethersInstance[o] !== void 0 ? (n.proxy.ethersInstance[o] = h, !0) : n.proxy.extensionInstance && n.proxy.extensionInstance[o] !== void 0 ? (n.proxy.extensionInstance[o] = h, !0) : (n[o] = h, !0);
      }
    });
    return this.proxy = {
      _changeWatchers: [],
      onChange: function(n) {
        this._changeWatchers.push(n);
      },
      _initIsRunning: !1,
      _ethersInstance: null,
      get ethersInstance() {
        return this._ethersInstance;
      },
      set ethersInstance(n) {
        const o = { ...this._ethersInstance };
        this._ethersInstance = n && ct(n);
        for (const h of this._changeWatchers)
          h(this._ethersInstance, o);
        this._initIsRunning || (this._initIsRunning = !0, s._asyncInit().finally(() => {
          this._initIsRunning = !1;
        }));
      },
      extensionInstance: e
    }, this.proxy.ethersInstance = t, s;
  }
}
class Oe {
}
class Ne {
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
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = S(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
class q extends V {
  constructor(t = null, e = null) {
    super(
      t,
      e || new Oe()
    ), this.status = a._ars.provider.status, this.isSafe = a._ars.provider.isSafe, this.OnSafe = a._ars.provider.OnSafe, this.onSafe = a._ars.provider.onSafe;
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
    t && t.defaultRPC && (this.proxy.ethersInstance = new m.providers.JsonRpcProvider(t.defaultRPC));
  }
  async _autoInstantiate() {
    await this._autoInstantiateFromWallet(), this.proxy.ethersInstance || this._autoInstantiateFromDefaultConfig();
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
        displayName: pt(t.name),
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
    this.proxy.ethersInstance || await this._autoInstantiate(), this.proxy.ethersInstance ? (await this._checkNetwork(), await this._setNetworkSettings()) : this.status.set("DISCONNECTED");
  }
  async changeNetwork(t) {
    const e = await a.config.wallets.getCurrent();
    e && a.wallets[e.id].changeNetwork(t);
  }
}
class Pe {
}
class G extends V {
  constructor(t = null, e = null) {
    super(
      t,
      e || new Pe()
    ), this.walletId = null, this.address = y(null), this.status = a._ars.signer.status, this.isSafe = a._ars.signer.isSafe, this.OnSafe = a._ars.signer.OnSafe, this.onSafe = a._ars.signer.onSafe;
  }
  async _autoInstantiate() {
    for (const t of Object.keys(a.wallets))
      if (a.wallets[t].lazyConnectAvailable && (await this.connectWallet(t, !0), this.proxy.ethersInstance))
        break;
  }
  async _asyncInit() {
    a.provider.onSafe(async function() {
      this.proxy.ethersInstance || await this._autoInstantiate(), this.proxy.ethersInstance ? this.address.value = await this.getAddress() : this.status.set("DISCONNECTED");
    }.bind(this));
  }
  async connectWallet(t, e = !1) {
    const s = a.wallets[t];
    if (s.lazyConnectAvailable) {
      if (await s.connect(!0), await s.isConnected())
        a.signer.proxy.ethersInstance = await s.getSigner(), this.walletId = s.id, a.signer.status.set("CONNECTED");
      else if (e) {
        a.signer.status.set("DISCONNECTED");
        return;
      }
    }
    try {
      this.status.set("REQUESTED"), await s.connect(!1), a.signer.proxy.ethersInstance = await s.getSigner(), this.walletId = s.id, a.signer.status.set("CONNECTED");
    } catch (n) {
      if (n instanceof F)
        this.status.set("REFUSED");
      else
        throw this.status.set("ERROR"), n;
    }
  }
  disconnectWallet() {
    a.signer.proxy.ethersInstance = null, this.address.value = null, a.signer.status.set("DISCONNECTED");
  }
}
class Ae {
  _watch(t, e, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(t, e, s);
  }
  watch(t, e, s, n = null) {
    const o = this._watch(t, e, s);
    return n ? U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, o);
    }, n) : U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, o);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], t, e, o);
  }
  watchRef(t, e, s = null) {
    const n = this._watch(t, e, null);
    return s ? U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, n);
    }, s) : U(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, n);
    }), a.chainWatchers.contracts[this.address].getRef(t, e);
  }
}
class j extends V {
  constructor(t, e = null, s = null) {
    console.log("init proxy"), console.log(t), console.log(e), super(
      e,
      s || new Ae()
    ), console.log("proxxx"), console.log(this.proxy), this.name = t, this.status = a._ars.contracts[this.name].status, this.isReadSafe = a._ars.contracts[this.name].isReadSafe, this.isWriteSafe = a._ars.contracts[this.name].isWriteSafe, this.OnReadSafe = a._ars.contracts[this.name].OnReadSafe, this.OnWriteSafe = a._ars.contracts[this.name].OnWriteSafe, this.onReadSafe = a._ars.contracts[this.name].onReadSafe, this.onWriteSafe = a._ars.contracts[this.name].onWriteSafe, console.log("proxxx 2"), console.log(this.proxy);
  }
  onSafe(t) {
    throw "TulipeContract instances don't have 'onSafe()' method, use 'onReadSafe()' and 'onWriteSafe()' instead.";
  }
  async _asyncInit() {
    console.log("proxxx 3"), console.log(this.proxy), a.provider.onSafe(async function() {
      this.proxy.ethersInstance ? (this.name = "TODO", this.status.set("INITIALIZED")) : (console.log(this.proxy), console.log("marked as UNVAILABLE !"), this.status.set("UNAVAILABLE"));
    }.bind(this));
  }
}
class We {
}
class $e extends Ne {
  constructor() {
    super(), this.contractName = null, this.methodName = null, this.methodInfos = {}, this.args = y(args), this.txArgs = y(txArgs), this.data = y([]), this.error = y(null), this.call = null, this.status = new T(`tx:${contractName}:${methodName}`, [
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
    t = t && t.length > 0 ? t : D(this.args), t ? Array.isArray(t) ? this.call = this.proxy.ethersInstance(...t, e) : this.call = this.proxy.ethersInstance(t, e) : this.call = this.proxy.ethersInstance(e), this.status.set("SENT"), this.methodInfos.constant ? this.call.then((s) => {
      Array.isArray(s) || (s = [s]), b(this.data, s), b(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      b(this.error, s), this.status.set("ERROR");
    }) : this.call.then((s) => s.wait()).then((s) => {
      Array.isArray(s) || (s = [s]), b(this.data, s), b(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      b(this.error, s), this.status.set("ERROR"), console.log(s);
    });
  }
}
class Y extends V {
  constructor(t, e, s = [], n = { value: 0 }, o = null, h = null, d = null) {
    super(
      o,
      h || new We(),
      d || new $e(t, e, s = [], n = { value: 0 })
    ), this._asyncInit();
  }
}
const De = {
  JsonRpcProvider: m.providers.JsonRpcProvider,
  StaticJsonRpcProvider: m.providers.StaticJsonRpcProvider,
  EtherscanProvider: m.providers.EtherscanProvider,
  InfuraProvider: m.providers.InfuraProvider,
  AlchemyProvider: m.providers.AlchemyProvider,
  CloudflareProvider: m.providers.CloudflareProvider,
  PocketProvider: m.providers.PocketProvider,
  AnkrProvider: m.providers.AnkrProvider,
  FallbackProvider: m.providers.FallbackProvider,
  IpcProvider: m.providers.IpcProvider,
  JsonRpcBatchProvider: m.providers.JsonRpcBatchProvider,
  UrlJsonRpcProvider: m.providers.UrlJsonRpcProvider,
  Web3Provider: m.providers.Web3Provider,
  WebSocketProvider: m.providers.WebSocketProvider
}, Z = {};
for (const [r, t] of Object.entries(De))
  Z[r] = class extends t {
    constructor(...e) {
      let s = q;
      return e.length > 0 && e[e.length - 1] && e[e.length - 1].prototype instanceof q && (s = e.pop()), super(...e), new s(this);
    }
  };
const Te = {
  Wallet: m.Wallet,
  VoidSigner: m.VoidSigner
}, Q = {};
for (const [r, t] of Object.entries(Te))
  Q[r] = class extends t {
    constructor(...e) {
      let s = G;
      return e.length > 0 && e[e.length - 1] && e[e.length - 1].prototype instanceof G && (s = e.pop()), super(...e), new s(this);
    }
  };
const Ue = {
  Contract: m.Contract
}, X = {};
for (const [r, t] of Object.entries(Ue))
  X[r] = class extends t {
    constructor(...e) {
      let s = j;
      e.length > 0 && e[e.length - 1] && e[e.length - 1].prototype instanceof j && (s = e.pop()), super(...e);
      const n = new s(this);
      return console.log(n), n;
    }
  };
const Be = {
  ...Z,
  ...Q,
  ...X
}, je = { ...m };
for (const [r, t] of Object.entries(Be))
  je[r] = t;
class tt {
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
class Ve extends tt {
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
    let o = !1;
    Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: t,
      args: e,
      state: y(null),
      dependents: {}
    }, o = !0);
    let h = null;
    s && (h = S(this.sources[n].state, s));
    const d = this._generateDependentUUID();
    return this.sources[n].dependents[d] = h, o && this._updateState(this.sources[n]), d;
  }
  remove(t, e, s) {
    const n = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const o = this.sources[n].dependents[s];
      o && o(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(t, e) {
    const s = this._buildSourceName(t, e);
    return this.sources[s].state;
  }
}
class Me extends tt {
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
    let o = null;
    s && (o = watch(this.sources[n].state, s));
    const h = this._generateDependentUUID();
    return this.sources[n].dependents[h] = o, newSource && this._updateState(this.sources[n]), h;
  }
  remove(t, e, s) {
    const n = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const o = this.sources[n].dependents[s];
      o && o(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(t, e) {
    const s = this._buildSourceName(t, e);
    return this.sources[s].state;
  }
}
class F extends Error {
  constructor(t, ...e) {
    super(t, ...e), this.message = `'${t}' wallet has rejected the connection request.`;
  }
}
class k extends Error {
  constructor(t, ...e) {
    super(walletId, ...e), this.message = t;
  }
}
class et {
  constructor(t) {
    this.id = t, this.lazyConnectAvailable = !0;
  }
  isConnected() {
    throw new k(`isConnected() method is not implemented in ${this.id} wallet class.`);
  }
  getProvider() {
    throw new k(`getProvider() method is not implemented in ${this.id} wallet class.`);
  }
  getSigner(t = !1) {
    throw new k(`getSigner() method is not implemented in ${this.id} wallet class.`);
  }
  async connect(t = !1) {
    throw new k(`connect() method is not implemented in ${this.id} wallet class.`);
  }
  addNetwork(t) {
    throw new k(`addNetwork() method is not implemented in ${this.id} wallet class.`);
  }
  switchNetwork(t, e = !1) {
    throw new k(`switchNetwork() method is not implemented in ${this.id} wallet class.`);
  }
}
class st extends et {
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
    return this.exposedObject ? new m.providers.Web3Provider(this.exposedObject, "any") : null;
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
        throw e.code === 4001 ? new F(this.id) : e;
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
      t = m.utils.hexlify(parseInt(t)).toString(), t = m.utils.hexValue(t);
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
class Le extends st {
  constructor() {
    super("metamask", window.ethereum);
  }
}
class qe extends et {
  constructor(t, e = {}) {
    super(), this.id = "coinbase";
    const s = e.appName || "", n = e.appLogoUrl, o = e.darkMode || !1;
    this.coinbaseWalletSdk = new t({
      appName: s,
      appLogoUrl: n,
      darkMode: o
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
      throw F(this.id);
    }
  }
}
class Ge extends st {
  constructor() {
    super("binanceChain", window.BinanceChain), this.lazyConnectAvailable = !1;
  }
  async isConnected() {
    throw new k("isConnected() method is not available for BinanceChainWallet class since lazy connection is not available.");
  }
  async connect(t = !1) {
    if (t)
      throw new k("connect() with 'lazy=true' is not available for BinanceChainWallet class because isConnected() is not available on this class.");
  }
}
const Fe = {
  metamask: Le,
  coinbase: qe,
  binanceChain: Ge
};
class He {
  constructor() {
    this.status = new T("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = A(() => this.status.is("INITIALIZED")), this.OnSafe = de;
  }
  onSafe(t) {
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = S(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
class H {
  constructor() {
    this._ars = {
      oldEthersInstance: null,
      events: {},
      watchers: []
    };
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
  _initARS(t) {
    this._purgeARS(), t.proxy.ethersInstance && (console.log("instance ARS"), console.log(t), this._initEthersInstanceARS()), this._initPlaceholderInstanceARS();
  }
  start(t) {
    this._initARS(t), t.proxy.onChange(this._initARS.bind(this, t));
  }
  onSafe(t) {
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = S(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
class ze extends H {
  constructor() {
    super(), this.status = new T("provider", [
      "DISCONNECTED",
      "ERROR",
      "WRONG_NETWORK",
      "CONNECTED"
    ]), this.isSafe = A(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this.OnSafe = pe;
  }
  _initEthersInstanceARS() {
    a.provider.on("network", (t, e) => {
      e && e !== t && window.location.reload();
    }), a.provider.on("error", () => {
      this.status.set("ERROR");
    });
  }
  _initPlaceholderInstanceARS() {
  }
  start() {
    super.start(a.provider);
  }
  onSafe(t) {
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = S(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
class Ke extends H {
  constructor() {
    super(), this.status = new T("signer", [
      "NO_PROVIDER",
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "WRONG_NETWORK",
      "CONNECTED"
    ]), this.isSafe = A(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this.OnSafe = fe;
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
  start() {
    super.start(a.signer);
  }
  onSafe(t) {
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = S(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
class Je extends H {
  constructor(t) {
    super(), this.name = t, this.status = new T(`contract:${t}`, [
      "NO_PROVIDER",
      "UNAVAILABLE",
      "ERROR",
      "INITIALIZED"
    ]), this.isReadSafe = A(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = A(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.OnReadSafe = x(me, { contract: t }), this.OnWriteSafe = x(_e, { contract: t });
  }
  onReadSafe(t) {
    const e = N();
    if (this.isReadSafe.value)
      t(e);
    else {
      const s = S(this.isReadSafe, () => {
        this.isReadSafe.value && (t(e), s());
      });
    }
  }
  onWriteSafe(t) {
    const e = N();
    if (this.isWriteSafe.value)
      t(e);
    else {
      const s = S(this.isWriteSafe, () => {
        this.isWriteSafe.value && (t(e), s());
      });
    }
  }
  _updateContract(t, e) {
    if (a.signer.isSafe.value)
      a.contracts[this.name].proxy.ethersInstance = new m.Contract(t, e, a.signer.proxy.ethersInstance);
    else if (a.provider.isSafe.value)
      a.contracts[this.name].proxy.ethersInstance = new m.Contract(t, e, a.provider.proxy.ethersInstance);
    else
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`;
  }
  _initEthersInstanceARS() {
    this._ars.watchers.push(
      S(a.signer.isSafe, (t, e) => {
        if (t !== e) {
          const s = a.contracts[this.name].proxy.ethersInstance.interface, n = a.contracts[this.name].proxy.ethersInstance.address;
          this._updateContract(n, s);
        }
      })
    );
  }
  _initPlaceholderInstanceARS() {
    a.provider.status.watchAny((t) => {
      t === "WRONG_NETWORK" ? (console.log("UNAVVS"), this.status.set("UNAVAILABLE")) : ["DISCONNECTED", "ERROR"].includes(t) && this.status.set("NO_PROVIDER");
    });
  }
  start() {
    super.start(a.contracts[this.name]);
  }
}
class Ye {
  constructor(t) {
    for (const e of a.config.networks.getAll())
      if (e.contracts)
        for (const [s, n] of Object.entries(e.contracts))
          this.add(s);
  }
  add(t) {
    this[t] = new Je(t);
  }
}
class Ze {
  constructor() {
    this.dapp = new He(), this.provider = new ze(), this.signer = new Ke(), this.contracts = new Ye();
  }
}
async function rs(r, t) {
  const e = t;
  try {
    a.init(e);
  } catch (n) {
    throw a && a.status && a.status.set("ERROR"), n;
  }
  r.config.globalProperties.dapp = a, r.config.globalProperties.rGet = D, r.config.globalProperties.rSet = b, window.dapp = a;
  const s = await import("./index.7fcc06b4.mjs");
  r.component("OnDappSafe", s.OnDappSafe), r.component("OnProviderSafe", s.OnProviderSafe), r.component("OnSignerSafe", s.OnSignerSafe), r.component("OnContractReadSafe", s.OnContractReadSafe), r.component("OnContractWriteSafe", s.OnContractWriteSafe), a.status.set("INITIALIZED");
}
export {
  Ze as ARS,
  es as ConnectWalletButton,
  ts as ContractInteractor,
  Ve as ContractWatcher,
  as as DebugBar,
  Ut as EventInteractor,
  $t as EventsInteractor,
  Ce as InputUnits,
  At as MethodInteractor,
  gt as MethodsInteractor,
  me as OnContractReadSafe,
  _e as OnContractWriteSafe,
  de as OnDappSafe,
  pe as OnProviderSafe,
  fe as OnSignerSafe,
  ns as SelectNetworkDropdown,
  ss as SelectWalletDropdown,
  T as Status,
  qt as Transact,
  xe as TulipeConfig,
  j as TulipeContractProxy,
  q as TulipeProviderProxy,
  V as TulipeProxy,
  G as TulipeSignerProxy,
  Y as TulipeTransactionProxy,
  F as WalletConnectionRejected,
  Me as WalletWatcher,
  pt as capitalizeWords,
  a as dapp,
  W as deepMerge,
  rs as initTulipe,
  M as isObject,
  D as rGet,
  b as rSet,
  ft as styleLevelProp,
  je as tulipeEthers,
  Fe as wallets
};
