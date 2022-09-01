import { computed as C, getCurrentInstance as N, watch as w, isRef as G, ref as y, resolveComponent as b, openBlock as c, createBlock as E, withCtx as g, createElementVNode as o, toDisplayString as p, unref as l, createVNode as I, createTextVNode as T, createElementBlock as u, Fragment as v, renderList as S, shallowRef as z, withDirectives as j, vModelText as U, createCommentVNode as O, normalizeClass as Q, renderSlot as _, pushScopeId as J, popScopeId as X, vModelSelect as tt, markRaw as et, onUnmounted as W } from "vue";
import { ethers as x } from "ethers";
class st {
  constructor() {
  }
  init(t = null) {
    this.config = new ie(t), this.status = new P("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = C(() => this.status.is("INITIALIZED")), this.OnSafe = Ft, this.chainWatchers = new ce(), this.wallets = new we(), this.provider = new fe(), this.pro = this.provider, this.signer = new _e(), this.sig = this.signer, this.contracts = new ge(), this.con = this.contracts;
  }
  onSafe(t) {
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = w(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
const a = new st();
function V(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function D(r, ...t) {
  if (!t.length)
    return r;
  const e = t.shift();
  if (V(r) && V(e))
    for (const s in e)
      V(e[s]) ? (r[s] || Object.assign(r, {
        [s]: {}
      }), D(r[s], e[s])) : Object.assign(r, {
        [s]: e[s]
      });
  return D(r, ...t);
}
function nt(r) {
  const t = r.split(" ");
  for (let e = 0; e < t.length; e++)
    t[e] = t[e][0].toUpperCase() + t[e].substring(1);
  return t.join(" ");
}
function $(r) {
  return G(r) ? r.value : r;
}
function R(r, t) {
  G(r) ? r.value = t : r = t;
}
const at = {
  required: !1,
  type: String,
  default: "minimal",
  validator(r) {
    return ["unstylized", "minimal", "opinionated"].includes(r);
  }
}, rt = { class: "ContractInteractor" }, ot = /* @__PURE__ */ T(" Methods : "), it = /* @__PURE__ */ o("br", null, null, -1), ct = /* @__PURE__ */ T(" Events : "), lt = /* @__PURE__ */ o("br", null, null, -1), Ce = {
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
    }), (n, i) => {
      const h = b("OnContractReadSafe");
      return c(), E(h, {
        contract: t.contract
      }, {
        default: g(() => [
          o("div", rt, [
            o("ul", null, [
              o("li", null, "Address : " + p(l(e).address), 1),
              o("li", null, "Owner : " + p(s.value), 1),
              o("li", null, [
                ot,
                it,
                I(l(ht), {
                  contract: t.contract
                }, null, 8, ["contract"])
              ]),
              o("li", null, [
                ct,
                lt,
                I(l(bt), {
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
}, ut = { class: "MethodsInteractor" }, ht = {
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
      const i = b("OnContractReadSafe");
      return c(), E(i, {
        contract: t.contract
      }, {
        default: g(() => [
          o("div", ut, [
            o("ul", null, [
              (c(!0), u(v, null, S(l(e).interface.functions, (h, d) => (c(), u("li", null, [
                I(l(gt), {
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
}, dt = { class: "MethodInteractor" }, pt = { key: 0 }, ft = /* @__PURE__ */ o("p", null, "Inputs :", -1), mt = ["onUpdate:modelValue", "placeholder"], _t = { key: 0 }, yt = { key: 1 }, vt = /* @__PURE__ */ o("p", null, "Outputs :", -1), wt = ["onUpdate:modelValue", "placeholder"], St = ["placeholder"], Et = { key: 2 }, gt = {
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
    const t = r, e = z(new K(t.contract, t.method));
    function s(n) {
      return `${n.name && n.name !== "null" ? n.name : ""} (${n.type})`;
    }
    return (n, i) => {
      const h = b("OnContractReadSafe");
      return c(), E(h, {
        contract: t.contract
      }, {
        default: g(() => [
          o("div", dt, [
            I(l($t), {
              contract: t.contract,
              method: t.method,
              modelValue: e.value,
              "onUpdate:modelValue": i[0] || (i[0] = (d) => e.value = d),
              configs: { content: t.method, notx: !0, noerror: !0 }
            }, null, 8, ["contract", "method", "modelValue", "configs"]),
            o("small", null, p(e.value.methodInfos.stateMutability), 1),
            Object.keys(e.value.methodInfos.inputs).length > 0 || e.value.methodInfos.payable ? (c(), u("div", pt, [
              ft,
              o("ul", null, [
                (c(!0), u(v, null, S(e.value.methodInfos.inputs, (d, f) => (c(), u("li", null, [
                  j(o("input", {
                    "onUpdate:modelValue": (m) => e.value.args[f] = m,
                    type: "text",
                    placeholder: s(d)
                  }, null, 8, mt), [
                    [U, e.value.args[f]]
                  ])
                ]))), 256)),
                e.value.methodInfos.payable ? (c(), u("li", _t, [
                  I(l(se), {
                    modelValue: e.value.txArgs.value.value,
                    "onUpdate:modelValue": i[1] || (i[1] = (d) => e.value.txArgs.value.value = d)
                  }, null, 8, ["modelValue"])
                ])) : O("", !0)
              ])
            ])) : O("", !0),
            Object.keys(e.value.methodInfos.outputs).length > 0 ? (c(), u("div", yt, [
              vt,
              o("ul", null, [
                (c(!0), u(v, null, S(e.value.methodInfos.outputs, (d, f) => (c(), u("li", null, [
                  e.value.data.value ? j((c(), u("input", {
                    key: 0,
                    "onUpdate:modelValue": (m) => e.value.data.value[f] = m,
                    type: "text",
                    placeholder: s(d),
                    disabled: ""
                  }, null, 8, wt)), [
                    [U, e.value.data.value[f]]
                  ]) : (c(), u("input", {
                    key: 1,
                    type: "text",
                    placeholder: s(d),
                    disabled: ""
                  }, null, 8, St))
                ]))), 256))
              ])
            ])) : O("", !0),
            e.value.status.is("ERROR") ? (c(), u("p", Et, p(e.value.error.value.reason), 1)) : O("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ot = { class: "EventsInteractor" }, bt = {
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
      const i = b("OnContractReadSafe");
      return c(), E(i, {
        contract: t.contract
      }, {
        default: g(() => [
          o("div", Ot, [
            o("ul", null, [
              (c(!0), u(v, null, S(l(e).interface.events, (h, d) => (c(), u("li", null, [
                I(l(It), {
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
}, Rt = { class: "EventInteractor" }, Ct = /* @__PURE__ */ T("Logs: "), It = {
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
    let s = y({}), n = y({}), i = y(0), h = y([]);
    return e.onReadSafe(() => {
      s.value = e.interface.events[t.event], n.value = e.filters[s.value.name], e.on(n.value, (d) => {
        i.value++;
        let f = `Block ${d.blockNumber} -> {`;
        for (const m of s.value.inputs)
          f += `${m.name}:${d.args[m.name]}, `;
        f = f.substring(0, f.length - 2) + "}", h.value.push(f);
      });
    }), (d, f) => {
      const m = b("OnContractReadSafe");
      return c(), E(m, {
        contract: t.contract
      }, {
        default: g(() => [
          o("div", Rt, [
            o("p", null, p(s.value.name), 1),
            o("ul", null, [
              o("li", null, "Count : " + p(i.value), 1),
              o("li", null, [
                Ct,
                o("ul", null, [
                  (c(!0), u(v, null, S(h.value, (B) => (c(), u("li", null, p(B), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, kt = { class: "TransactButton" }, Nt = {
  key: 1,
  disabled: ""
}, xt = {
  key: 2,
  disabled: ""
}, Dt = {
  key: 3,
  disabled: ""
}, Pt = { key: 4 }, $t = {
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
    let n = C({
      get() {
        return e.modelValue;
      },
      set(h) {
        t("update:modelValue", h);
      }
    });
    function i() {
      const h = e.args ? e.args : [], d = e.txArgs ? e.txArgs : {};
      n.value.send(h, d);
    }
    return e.config && e.configs.notx && s.onReadSafe(() => {
      n = new K(e.contract, e.method);
    }), (h, d) => {
      const f = b("OnContractReadSafe");
      return c(), E(f, {
        contract: e.contract
      }, {
        default: g(() => [
          o("div", kt, [
            l(n).status.is("READY") ? (c(), u("button", {
              key: 0,
              onClick: i
            }, p(e.configs && e.configs.content ? e.configs.content : "Transact"), 1)) : l(n).status.is("SENT") ? (c(), u("button", Nt, "Transaction sent...")) : l(n).status.is("ERROR") ? (c(), u("button", xt, "Transaction error!")) : l(n).status.is("SUCCESS") ? (c(), u("button", Dt, "Success !")) : O("", !0),
            !(e.configs && e.configs.noerror) && l(n).status.is("ERROR") ? (c(), u("p", Pt, p(l(n).error.value.reason), 1)) : O("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
};
const q = (r, t) => {
  const e = r.__vccOpts || r;
  for (const [s, n] of t)
    e[s] = n;
  return e;
}, Wt = {
  key: 1,
  disabled: ""
}, jt = {
  key: 2,
  disabled: ""
}, Tt = {
  key: 3,
  disabled: ""
}, At = {
  key: 4,
  disabled: ""
}, Vt = {
  __name: "ConnectWalletButton",
  props: {
    styleLevel: at
  },
  setup(r) {
    const t = r;
    let e = y({});
    return a.provider.onSafe(async function() {
      e.value = await a.config.networks.getCurrent();
    }), (s, n) => (c(), E(l(a).provider.OnSafe, null, {
      default: g(() => [
        o("div", {
          class: Q(["ConnectWalletButton", `ve-${t.styleLevel}`])
        }, [
          l(a).signer.status.is("DISCONNECTED") ? (c(), u("button", {
            key: 0,
            onClick: n[0] || (n[0] = (i) => l(a).signer.connectWallet(l(a).wallets.metamask))
          }, "Connect Wallet")) : l(a).signer.status.is("REQUESTED") ? (c(), u("button", Wt, "Connection requested...")) : l(a).signer.status.is("REFUSED") ? (c(), u("button", jt, "Connection refused!")) : l(a).signer.status.is("ERROR") ? (c(), u("button", Tt, "Connection error!")) : l(a).provider.status.is("WRONG") ? (c(), u("button", At, "Wrong network! (" + p(l(e) ? l(e).value.displayName : "unknown") + ")", 1)) : l(a).signer.status.is("CONNECTED") ? (c(), u("button", {
            key: 5,
            onClick: n[1] || (n[1] = (...i) => l(a).signer.disconnectWallet && l(a).signer.disconnectWallet(...i))
          }, "Disconnect")) : O("", !0)
        ], 2)
      ]),
      _: 1
    }));
  }
}, Ie = /* @__PURE__ */ q(Vt, [["__scopeId", "data-v-2b282558"]]), Ut = /* @__PURE__ */ o("p", null, "Available wallets :", -1), ke = {
  __name: "AvailableWallets",
  setup(r) {
    return (t, e) => {
      const s = b("OnDappSafe");
      return c(), E(s, null, {
        default: g(() => [
          Ut,
          o("ul", null, [
            (c(!0), u(v, null, S(l(a).wallets, (n) => (c(), u("li", null, p(n.name), 1))), 256))
          ])
        ]),
        _: 1
      });
    };
  }
}, Mt = { class: "SelectNetworkDropdown" }, Bt = {
  key: 0,
  selected: ""
}, Lt = ["src", "alt"], Gt = ["onClick"], qt = ["src", "alt"], Ne = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    let t = y({}), e = y([]);
    a.onSafe(async function() {
      t.value = await a.config.networks.getCurrent(), e.value = a.config.networks.getAvailable(), e.value = e.value.filter((h) => h != t.value);
    });
    async function s(h) {
      const d = e.value.find((f) => f.chainId === parseInt(h));
      if (d) {
        h = x.utils.hexlify(parseInt(h)).toString(), h = x.utils.hexValue(h);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: h
            }]
          });
        } catch (f) {
          f.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: h,
              rpcUrls: [d.defaultRPC],
              chainName: d.name,
              nativeCurrency: {
                name: d.currency.symbol,
                symbol: d.currency.symbol,
                decimals: d.currency.decimals
              },
              blockExplorerUrls: d.explorer && d.explorer.url !== "" ? [d.explorer.url] : null
            }]
          });
        }
      }
    }
    function n() {
      i.value = !i.value;
    }
    let i = y(!1);
    return (h, d) => {
      const f = b("OnDappSafe");
      return c(), E(f, null, {
        default: g(() => [
          o("div", Mt, [
            o("ul", { onClick: n }, [
              t.value ? (c(), u("li", Bt, [
                o("img", {
                  width: "40",
                  src: t.value.icon ? t.value.icon : l(a).config.defaults.networks.icon,
                  alt: t.value.name + " logo"
                }, null, 8, Lt),
                o("p", null, p(t.value.displayName), 1)
              ])) : O("", !0),
              i.value ? (c(!0), u(v, { key: 1 }, S(e.value, (m) => (c(), u("li", {
                key: m.chainId,
                onClick: (B) => s(m.chainId)
              }, [
                o("img", {
                  width: "40",
                  src: m.icon ? m.icon : l(a).config.defaults.networks.icon,
                  alt: m.name + " logo"
                }, null, 8, qt),
                o("p", null, p(m.displayName), 1)
              ], 8, Gt))), 128)) : O("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Ft = {
  __name: "OnDappSafe",
  setup(r) {
    return (t, e) => l(a).isSafe.value ? (c(), u(v, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, Ht = {
  __name: "OnProviderSafe",
  setup(r) {
    return (t, e) => l(a).provider.isSafe.value ? (c(), u(v, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, Zt = {
  __name: "OnSignerSafe",
  setup(r) {
    return (t, e) => l(a).signer.isSafe.value ? (c(), u(v, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, xe = {
  __name: "OnContractsReadSafe",
  setup(r) {
    return (t, e) => l(a).contracts.areReadSafe.value ? (c(), u(v, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, De = {
  __name: "OnContractsWriteSafe",
  setup(r) {
    return (t, e) => l(a).contracts.areWriteSafe.value ? (c(), u(v, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, Yt = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r;
    return (e, s) => l(a).contracts[t.contract].isReadSafe.value ? (c(), u(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Kt = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r;
    return (e, s) => l(a).contracts[t.contract].isWriteSafe.value ? (c(), u(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
};
const F = (r) => (J("data-v-d83f3980"), r = r(), X(), r), zt = /* @__PURE__ */ F(() => /* @__PURE__ */ o("h3", null, "Safe Runners", -1)), Qt = /* @__PURE__ */ F(() => /* @__PURE__ */ o("h3", null, "Status", -1)), Jt = {
  __name: "DebugBar",
  setup(r) {
    return (t, e) => {
      const s = b("OnDappSafe");
      return c(), E(s, null, {
        default: g(() => [
          o("section", null, [
            o("div", null, [
              zt,
              o("ul", null, [
                o("li", null, "DApp safe : " + p(l(a).isSafe), 1),
                o("li", null, "Network safe : " + p(l(a).provider.isSafe), 1),
                o("li", null, "Wallet safe : " + p(l(a).signer.isSafe), 1),
                o("li", null, "Contracts read safe : " + p(l(a).contracts.areReadSafe), 1),
                o("li", null, "Contracts write safe : " + p(l(a).contracts.areWriteSafe), 1),
                (c(!0), u(v, null, S(l(a).contracts.getAll(), (n, i) => (c(), u("li", null, [
                  T(" contract " + p(i) + " : ", 1),
                  o("ul", null, [
                    o("li", null, "read safe : " + p(n.isReadSafe), 1),
                    o("li", null, "write safe : " + p(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            o("div", null, [
              Qt,
              o("ul", null, [
                o("li", null, "dapp : " + p(l(a).status.get()), 1),
                o("li", null, "provider : " + p(l(a).provider.status.get()), 1),
                o("li", null, "signer : " + p(l(a).signer.status.get()), 1),
                o("li", null, "contracts : " + p(l(a).contracts.status.get()), 1),
                (c(!0), u(v, null, S(l(a).contracts.getAll(), (n, i) => (c(), u("li", null, " contract " + p(i) + " : " + p(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Pe = /* @__PURE__ */ q(Jt, [["__scopeId", "data-v-d83f3980"]]), Xt = { class: "InputUnits" }, te = ["placeholder"], ee = ["value"], se = {
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
    let i = y("wei");
    function h() {
      if (s.value) {
        const d = x.utils.parseUnits(s.value, i.value);
        t("update:modelValue", d);
      }
    }
    return (d, f) => (c(), u("div", Xt, [
      j(o("input", {
        onInput: h,
        "onUpdate:modelValue": f[0] || (f[0] = (m) => s.value = m),
        type: "text",
        placeholder: l(e).placeholder
      }, null, 40, te), [
        [U, s.value]
      ]),
      j(o("select", {
        onChange: h,
        "onUpdate:modelValue": f[1] || (f[1] = (m) => i.value = m)
      }, [
        (c(), u(v, null, S(n, (m) => o("option", { value: m }, p(m), 9, ee)), 64))
      ], 544), [
        [tt, i.value]
      ])
    ]));
  }
};
class P {
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
    return $(this._state);
  }
  getRef() {
    return this._state;
  }
  set(t) {
    if (t = this._formatState(t), !this._isStateValid(t))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${t}`;
    R(this._state, t), console.log(`Status '${this._name}' set to '${$(this._state)}'`);
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
      w(this._state, () => {
        this.isIn(t) && e(this.get());
      });
    } else {
      if (!this._isStateValid(t))
        throw s;
      w(this._state, () => {
        this.is(t) && e(this.get());
      });
    }
  }
  watchAny(t) {
    this.watch(this.states, t);
  }
}
const k = {
  style: {
    level: "minimal"
  },
  networks: [
    {
      name: "Ethereum Mainnet",
      displayName: "Ethereum",
      chainId: 1,
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
      chainId: 3,
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
      chainId: 4,
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
      chainId: 5,
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
      chainId: 10,
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
      chainId: 25,
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
      chainId: 40,
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
      chainId: 56,
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
      chainId: 100,
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
      chainId: 122,
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
      chainId: 128,
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
      chainId: 137,
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
      chainId: 250,
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
      chainId: 1088,
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
      chainId: 1284,
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
      chainId: 1285,
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
      chainId: 8217,
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
      chainId: 31337,
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
      chainId: 42161,
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
      chainId: 42220,
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
      chainId: 42262,
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
      chainId: 43114,
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
      chainId: 1313161554,
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
      chainId: 16666e5,
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
      name: "metamask",
      displayName: "Metamask",
      icon: null
    },
    {
      name: "binanceChain",
      displayName: "Binance Chain",
      icon: null
    },
    {
      name: "coinbase",
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
class ne {
  constructor(t = null) {
    let e = {};
    return t ? e = D({ ...k.style }, { ...t }) : e = k.style, window.addEventListener("load", () => {
      const s = document.getElementsByClassName("ve-app");
      if (s)
        for (const n of s)
          n && n.classList.add(`ve-${e.level}`);
    }), e;
  }
}
class ae {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.chainId) {
          const s = k.networks.find((i) => i.chainId === e.chainId), n = D({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const e of k.networks)
      this._list.find((n) => n.chainId === e.chainId) || (e.available = !1, this._list.push(e));
  }
  async getCurrent() {
    if (a.provider.proxy.getEthersObject()) {
      const t = await a.provider.getNetwork().then((e) => e.chainId);
      return this._list.find((e) => e.chainId === t);
    }
    return null;
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
class re {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.name) {
          const s = k.wallets.find((i) => i.name === e.name), n = D({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const e of k.wallets)
      this._list.find((n) => n.name === e.name) || (e.available = !1, this._list.push(e));
  }
  async getCurrent() {
    if (a.signer.getEthersObject()) {
      const t = a.signer.name;
      return this._list.find((e) => e.name === t);
    }
    return null;
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
class oe {
  constructor(t = null) {
    let e = {};
    return t ? e = D({ ...k.defaults }, { ...t }) : e = k.defaults, e;
  }
}
class ie {
  constructor(t = null) {
    this.style = new ne(t ? t.style : null), this.networks = new ae(t ? t.networks : null), this.wallets = new re(t ? t.wallets : null), this.defaults = new oe(t ? t.defaults : null);
  }
}
class ce {
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
    Object.keys(this.contracts).includes(t.address) || (this.contracts[t.address] = new le(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.contracts).includes(t.address) && delete this.contracts[t.address];
  }
  addWalletWatcher(t) {
    Object.keys(this.wallets).includes(t) || (this.wallets[t] = new ue(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.wallets).includes(t) && delete this.wallets[t];
  }
}
class H {
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
class le extends H {
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
    let i = !1;
    Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: t,
      args: e,
      state: y(null),
      dependents: {}
    }, i = !0);
    let h = null;
    s && (h = w(this.sources[n].state, s));
    const d = this._generateDependentUUID();
    return this.sources[n].dependents[d] = h, i && this._updateState(this.sources[n]), d;
  }
  remove(t, e, s) {
    const n = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const i = this.sources[n].dependents[s];
      i && i(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(t, e) {
    const s = this._buildSourceName(t, e);
    return this.sources[s].state;
  }
}
class ue extends H {
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
    let i = null;
    s && (i = watch(this.sources[n].state, s));
    const h = this._generateDependentUUID();
    return this.sources[n].dependents[h] = i, newSource && this._updateState(this.sources[n]), h;
  }
  remove(t, e, s) {
    const n = this._buildSourceName(t, e);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const i = this.sources[n].dependents[s];
      i && i(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(t, e) {
    const s = this._buildSourceName(t, e);
    return this.sources[s].state;
  }
}
function he(r) {
  for (var t = []; r && r !== Object.prototype; )
    t.push.apply(t, Object.getOwnPropertyNames(r)), r = Object.getPrototypeOf(r);
  return t;
}
class de {
  constructor(t) {
    this._parent = t;
  }
  setEthersObject(t) {
    this._parent._ethersObject = t && et(t), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const t = he(this._parent._extensionObject);
      for (const e of t)
        if (e !== "constructor")
          try {
            this._parent._ethersObject[e] = this._parent._extensionObject[e].bind(this._parent._ethersObject);
          } catch (s) {
            if (s instanceof TypeError)
              this._parent._ethersObject[e] = this._parent._extensionObject[e];
            else
              throw s;
          }
    }
  }
}
class A {
  constructor(t = null, e = null) {
    return this._ethersObject = null, this._extensionObject = e, this.proxy = new de(this), this.proxy.setEthersObject(t), new Proxy(this, {
      get: function(s, n, i) {
        if (s._ethersObject && s._ethersObject[n])
          try {
            return s._ethersObject[n].bind(s._ethersObject);
          } catch (h) {
            if (h.message.includes(".bind is not a function"))
              return s._ethersObject[n];
            throw h;
          }
        else if (s[n])
          return s[n];
      },
      set: function(s, n, i) {
        return s._ethersObject && s._ethersObject[n] ? (s._ethersObject[n] = i, !0) : (s[n] = i, !0);
      }
    });
  }
}
class pe {
}
class fe extends A {
  constructor(t = null) {
    const e = new pe();
    super(t, e), this.status = new P("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = C(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this.OnSafe = Ht, this._asyncInit();
  }
  async _getProviderFromWebWallet() {
    for (const t of Object.values(a.wallets))
      if (t) {
        const e = t.getProvider();
        if (e)
          return e;
      }
    return null;
  }
  async _initProviderConnection() {
    const t = await this._getProviderFromWebWallet();
    if (t)
      this.proxy.setEthersObject(new x.providers.Web3Provider(t, "any"));
    else {
      const e = a.config.networks.getDefault();
      e && e.defaultRPC && this.proxy.setEthersObject(new x.providers.JsonRpcProvider(e.defaultRPC));
    }
  }
  async _asyncInit() {
    if (await this._initProviderConnection(), !this._ethersObject)
      this.status.set("DISCONNECTED");
    else {
      const t = await this.getNetwork();
      let e = await a.config.networks.getAvailable().find((s) => s.chainId === t.chainId);
      if (e)
        this.status.set("CONNECTED");
      else if (this.status.set("WRONG"), e = a.config.networks.getAll().find((s) => s.chainId === t.chainId), !e) {
        const s = {
          name: t.name,
          displayName: nt(t.name),
          chainId: t.chainId
        };
        a.config.network.append(s);
      }
      this.on("network", (s, n) => {
        n && n !== s && window.location.reload();
      }), this.on("error", () => {
        this.status.set("ERROR");
      }), e && e.pollingInterval && (this.pollingInterval = e.pollingInterval);
    }
  }
  onSafe(t) {
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = w(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
}
class me {
}
class _e extends A {
  constructor(t = null) {
    const e = new me();
    super(t, e), this.status = new P("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "CONNECTED"
    ]), a.provider.status.watchAny((s) => {
      s === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(s) && this.status.set("NO_PROVIDER");
    }), this.status.watch(["REFUSED", "ERROR"], () => {
      setTimeout(() => {
        this.status.set("DISCONNECTED");
      }, 5e3);
    }), this.isSafe = C(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this.OnSafe = Zt, this.address = y(null), this._asyncInit();
  }
  async _asyncInit() {
    const t = this;
    a.provider.onSafe(async function() {
      for (const e of Object.values(a.wallets))
        await t.connectWallet(e, !0);
    });
  }
  onSafe(t) {
    const e = N();
    if (this.isSafe.value)
      t(e);
    else {
      const s = w(this.isSafe, () => {
        this.isSafe.value && (t(e), s());
      });
    }
  }
  async connectWallet(t, e = !1) {
    if (a.signer.status.is("DISCONNECTED"))
      try {
        const s = await a.provider.getSigner(), n = await s.getAddress();
        a.signer.proxy.setEthersObject(s), this.address.value = n, a.signer.status.set("CONNECTED");
      } catch {
        if (e === !0)
          a.signer.status.set("DISCONNECTED");
        else {
          this.status.set("REQUESTED");
          try {
            await t.connect(), this.status.set("CONNECTED");
          } catch (n) {
            if (n instanceof M)
              this.status.set("REFUSED");
            else
              throw this.status.set("ERROR"), n;
          }
        }
      }
  }
  disconnectWallet() {
    a.signer.proxy.setEthersObject(null), this.address.value = null, a.signer.status.set("DISCONNECTED");
  }
}
class Z {
  constructor() {
    this.provider = null, this.name = "";
  }
  getProvider() {
    return null;
  }
  async connect() {
    throw `connect() method of ${this.name} wallet is not implemented.`;
  }
}
class M extends Error {
  constructor(t, ...e) {
    super(t, ...e), this.message = `${t} wallet has rejected the connection request.`;
  }
}
class Y extends Z {
  constructor() {
    super(), this.name = "Metamask", this.provider = this.getProvider();
  }
  getProvider() {
    return window.ethereum;
  }
  async connect() {
    try {
      await this.provider.request({ method: "eth_requestAccounts" });
    } catch (t) {
      throw t.code === 4001 ? M(this.name) : t;
    }
  }
}
class ye extends Z {
  constructor(t, e = {}) {
    super(), this.name = "Coinbase";
    const s = e.appName || "", n = e.appLogoUrl, i = e.darkMode || !1;
    this.coinbaseWalletSdk = new t({
      appName: s,
      appLogoUrl: n,
      darkMode: i
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
      throw M(this.name);
    }
  }
}
class ve extends Y {
  constructor() {
    super(), this.name = "BinanceChain";
  }
  getProvider() {
    return window.BinanceChain;
  }
}
class we {
  constructor() {
    const t = a.config.wallets.getAvailable();
    for (const e of t) {
      const s = Se[e.name];
      s && (this[e.name] = new s());
    }
  }
}
const Se = {
  metamask: Y,
  coinbase: ye,
  binanceChain: ve
};
class Ee {
  _watch(t, e, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(t, e, s);
  }
  watch(t, e, s, n = null) {
    const i = this._watch(t, e, s);
    return n ? W(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, i);
    }, n) : W(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, i);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], t, e, i);
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
class L extends A {
  constructor(t, e) {
    const s = new Ee();
    super(e, s), this.name = t, this.status = new P(`contract:${t}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((n) => {
      n === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(n) && this.status.set("NO_PROVIDER");
    }), this.isReadSafe = C(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = C(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.OnReadSafe = I(Yt, { contract: this.name }), this.OnWriteSafe = I(Kt, { contract: this.name }), this._asyncInit();
  }
  _watchSignerChanges(t, e) {
    w([a.signer.isSafe], (s, n) => {
      console.log("Refresh contract " + this.name), s !== n && (this.proxy.setEthersObject(null), this._updateContract(t, e));
    });
  }
  _updateContract(t, e) {
    if (a.signer.isSafe.value)
      this.proxy.setEthersObject(new x.Contract(t, e, a.signer.proxy.getEthersObject()));
    else if (a.provider.isSafe.value)
      this.proxy.setEthersObject(new x.Contract(t, e, a.provider.proxy.getEthersObject()));
    else
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`;
  }
  async _asyncInit() {
    const t = this;
    a.provider.onSafe(async function() {
      try {
        const e = await a.config.networks.getCurrent();
        if (e.contracts && Object.keys(e.contracts).includes(t.name)) {
          const s = e.contracts[t.name];
          t._updateContract(s.address, s.abi), t._watchSignerChanges(s.address, s.abi), t.status.set("INITIALIZED");
        } else
          t.status.set("WRONG_PROVIDER");
      } catch (e) {
        throw t.status.set("ERROR"), e;
      }
    });
  }
  onReadSafe(t) {
    const e = N();
    if (this.isReadSafe.value)
      t(e);
    else {
      const s = w(this.isReadSafe, () => {
        this.isReadSafe.value && (t(e), s());
      });
    }
  }
  onWriteSafe(t) {
    const e = N();
    if (this.isWriteSafe.value)
      t(e);
    else {
      const s = w(this.isWriteSafe, () => {
        this.isWriteSafe.value && (t(e), s());
      });
    }
  }
}
class ge {
  constructor() {
    this.status = new P("contracts", [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((t) => {
      t === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(t) && this.status.set("NO_PROVIDER");
    });
    for (const t of a.config.networks.getAll())
      if (t.contracts)
        for (const e of Object.keys(t.contracts))
          this[e] = new L(e);
    this.areReadSafe = C(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = C(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.status.set("INITIALIZED");
  }
  getAll() {
    const t = {};
    for (const [e, s] of Object.entries(this))
      s instanceof L && (t[e] = s);
    return t;
  }
  onReadSafe(t) {
    const e = N();
    if (this.areReadSafe.value)
      t(e);
    else {
      const s = w(this.areReadSafe, () => {
        this.areReadSafe.value && (t(e), s());
      });
    }
  }
  onWriteSafe(t) {
    const e = N();
    if (this.areWriteSafe.value)
      t(e);
    else {
      const s = w(this.areWriteSafe, () => {
        this.areWriteSafe.value && (t(e), s());
      });
    }
  }
}
class Oe {
}
class K extends A {
  constructor(t, e, s = [], n = { value: 0 }) {
    super(null, new Oe()), this.contractName = t, this.methodName = e, this.methodInfos = {}, this.args = y(s), this.txArgs = y(n), this.status = new P(`tx:${t}:${e}`, [
      "NOT_READY",
      "READY",
      "SENT",
      "ERROR",
      "SUCCESS"
    ]), this.status.watch(["ERROR", "SUCCESS"], () => {
      setTimeout(() => {
        this.status.set("READY");
      }, 3e3);
    }), this.data = y([]), this.error = y(null), this.call = null, this._init();
  }
  _init() {
    a.contracts[this.contractName].isReadSafe.value && this._initEthersObject(), a.contracts[this.contractName].onReadSafe(() => {
      this._initEthersObject();
    });
  }
  _initEthersObject() {
    this.methodInfos = a.contracts[this.contractName].interface.functions[this.methodName], this.methodInfos.inputs.forEach((t) => this.args.value.push(null)), this.methodInfos.outputs.forEach((t) => this.data.value.push(null)), this.proxy.setEthersObject(a.contracts[this.contractName][this.methodName]), this.status.set("READY");
  }
  send(t = null, e = null) {
    t = t || $(this.args), e = e || $(this.txArgs), t ? Array.isArray(t) ? this.call = this.proxy.getEthersObject()(...t, e) : this.call = this.proxy.getEthersObject()(t, e) : this.call = this.proxy.getEthersObject()(e), this.status.set("SENT"), this.methodInfos.constant ? this.call.then((s) => {
      Array.isArray(s) || (s = [s]), R(this.data, s), R(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      R(this.error, s), this.status.set("ERROR");
    }) : this.call.then((s) => s.wait()).then((s) => {
      Array.isArray(s) || (s = [s]), R(this.data, s), R(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      R(this.error, s), this.status.set("ERROR");
    });
  }
}
async function $e(r, t) {
  const e = t;
  try {
    a.init(e);
  } catch (n) {
    throw a && a.status && a.status.set("ERROR"), n;
  }
  r.config.globalProperties.dapp = a, r.config.globalProperties.rGet = $, r.config.globalProperties.rSet = R, window.dapp = a;
  const s = await import("./index.90b55ef3.js");
  r.component("OnDappSafe", s.OnDappSafe), r.component("OnProviderSafe", s.OnProviderSafe), r.component("OnSignerSafe", s.OnSignerSafe), r.component("OnContractsReadSafe", s.OnContractsReadSafe), r.component("OnContractsWriteSafe", s.OnContractsWriteSafe), r.component("OnContractReadSafe", s.OnContractReadSafe), r.component("OnContractWriteSafe", s.OnContractWriteSafe), a.status.set("INITIALIZED");
}
export {
  ke as AvailableWallets,
  ce as ChainWatchersList,
  Ie as ConnectWalletButton,
  Ce as ContractInteractor,
  le as ContractWatcher,
  ge as ContractsList,
  Pe as DebugBar,
  L as EthersContractProxy,
  fe as EthersProviderProxy,
  _e as EthersSignerProxy,
  K as EthersTransactionProxy,
  It as EventInteractor,
  bt as EventsInteractor,
  se as InputUnits,
  gt as MethodInteractor,
  ht as MethodsInteractor,
  Yt as OnContractReadSafe,
  Kt as OnContractWriteSafe,
  xe as OnContractsReadSafe,
  De as OnContractsWriteSafe,
  Ft as OnDappSafe,
  Ht as OnProviderSafe,
  Zt as OnSignerSafe,
  Ne as SelectNetworkDropdown,
  P as Status,
  $t as Transact,
  ie as TulipeConfig,
  M as WalletConnectionRejected,
  ue as WalletWatcher,
  we as WalletsList,
  nt as capitalizeWords,
  a as dapp,
  D as deepMerge,
  $e as initTulipe,
  V as isObject,
  $ as rGet,
  R as rSet,
  at as styleLevelProp,
  Se as wallets
};
