import { computed as k, getCurrentInstance as N, watch as v, isRef as G, ref as b, resolveComponent as O, openBlock as c, createBlock as w, withCtx as S, createElementVNode as i, toDisplayString as f, unref as l, createVNode as C, createTextVNode as T, createElementBlock as u, Fragment as y, renderList as g, shallowRef as z, withDirectives as j, vModelText as U, createCommentVNode as E, normalizeClass as Q, renderSlot as _, pushScopeId as J, popScopeId as X, vModelSelect as ee, markRaw as te, onUnmounted as W } from "vue";
import { ethers as x } from "ethers";
class se {
  constructor() {
  }
  init(e = null) {
    this.config = new it(e), this.status = new P("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = k(() => this.status.is("INITIALIZED")), this.OnSafe = Fe, this.chainWatchers = new ct(), this.wallets = new vt(), this.provider = new pt(), this.pro = this.provider, this.signer = new _t(), this.sig = this.signer, this.contracts = new St(), this.con = this.contracts;
  }
  onSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const s = v(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
const a = new se();
function V(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function D(r, ...e) {
  if (!e.length)
    return r;
  const t = e.shift();
  if (V(r) && V(t))
    for (const s in t)
      V(t[s]) ? (r[s] || Object.assign(r, {
        [s]: {}
      }), D(r[s], t[s])) : Object.assign(r, {
        [s]: t[s]
      });
  return D(r, ...e);
}
function ne(r) {
  const e = r.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
function $(r) {
  return G(r) ? r.value : r;
}
function R(r, e) {
  G(r) ? r.value = e : r = e;
}
const ae = {
  required: !1,
  type: String,
  default: "minimal",
  validator(r) {
    return ["unstylized", "minimal", "opinionated"].includes(r);
  }
}, re = { class: "ContractInteractor" }, oe = /* @__PURE__ */ T(" Methods : "), ie = /* @__PURE__ */ i("br", null, null, -1), ce = /* @__PURE__ */ T(" Events : "), le = /* @__PURE__ */ i("br", null, null, -1), kt = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    let s = b("not owned");
    return a.contracts[e.contract].onReadSafe(async function() {
      try {
        s.value = await t.owner();
      } catch {
      }
    }), (n, o) => {
      const d = O("OnContractReadSafe");
      return c(), w(d, {
        contract: e.contract
      }, {
        default: S(() => [
          i("div", re, [
            i("ul", null, [
              i("li", null, "Address : " + f(l(t).address), 1),
              i("li", null, "Owner : " + f(s.value), 1),
              i("li", null, [
                oe,
                ie,
                C(l(de), {
                  contract: e.contract
                }, null, 8, ["contract"])
              ]),
              i("li", null, [
                ce,
                le,
                C(l(Oe), {
                  contract: e.contract
                }, null, 8, ["contract"])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, ue = { class: "MethodsInteractor" }, de = {
  __name: "MethodsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    return (s, n) => {
      const o = O("OnContractReadSafe");
      return c(), w(o, {
        contract: e.contract
      }, {
        default: S(() => [
          i("div", ue, [
            i("ul", null, [
              (c(!0), u(y, null, g(l(t).interface.functions, (d, h) => (c(), u("li", null, [
                C(l(Se), {
                  contract: e.contract,
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
}, he = { class: "MethodInteractor" }, fe = { key: 0 }, pe = /* @__PURE__ */ i("p", null, "Inputs :", -1), me = ["onUpdate:modelValue", "placeholder"], _e = { key: 0 }, be = { key: 1 }, ye = /* @__PURE__ */ i("p", null, "Outputs :", -1), ve = ["onUpdate:modelValue", "placeholder"], ge = ["placeholder"], we = { key: 2 }, Se = {
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
    const e = r, t = z(new K(e.contract, e.method));
    function s(n) {
      return `${n.name && n.name !== "null" ? n.name : ""} (${n.type})`;
    }
    return (n, o) => {
      const d = O("OnContractReadSafe");
      return c(), w(d, {
        contract: e.contract
      }, {
        default: S(() => [
          i("div", he, [
            C(l($e), {
              contract: e.contract,
              method: e.method,
              modelValue: t.value,
              "onUpdate:modelValue": o[0] || (o[0] = (h) => t.value = h),
              configs: { content: e.method, notx: !0, noerror: !0 }
            }, null, 8, ["contract", "method", "modelValue", "configs"]),
            i("small", null, f(t.value.methodInfos.stateMutability), 1),
            Object.keys(t.value.methodInfos.inputs).length > 0 || t.value.methodInfos.payable ? (c(), u("div", fe, [
              pe,
              i("ul", null, [
                (c(!0), u(y, null, g(t.value.methodInfos.inputs, (h, p) => (c(), u("li", null, [
                  j(i("input", {
                    "onUpdate:modelValue": (m) => t.value.args[p] = m,
                    type: "text",
                    placeholder: s(h)
                  }, null, 8, me), [
                    [U, t.value.args[p]]
                  ])
                ]))), 256)),
                t.value.methodInfos.payable ? (c(), u("li", _e, [
                  C(l(st), {
                    modelValue: t.value.txArgs.value.value,
                    "onUpdate:modelValue": o[1] || (o[1] = (h) => t.value.txArgs.value.value = h)
                  }, null, 8, ["modelValue"])
                ])) : E("", !0)
              ])
            ])) : E("", !0),
            Object.keys(t.value.methodInfos.outputs).length > 0 ? (c(), u("div", be, [
              ye,
              i("ul", null, [
                (c(!0), u(y, null, g(t.value.methodInfos.outputs, (h, p) => (c(), u("li", null, [
                  t.value.data.value ? j((c(), u("input", {
                    key: 0,
                    "onUpdate:modelValue": (m) => t.value.data.value[p] = m,
                    type: "text",
                    placeholder: s(h),
                    disabled: ""
                  }, null, 8, ve)), [
                    [U, t.value.data.value[p]]
                  ]) : (c(), u("input", {
                    key: 1,
                    type: "text",
                    placeholder: s(h),
                    disabled: ""
                  }, null, 8, ge))
                ]))), 256))
              ])
            ])) : E("", !0),
            t.value.status.is("ERROR") ? (c(), u("p", we, f(t.value.error.value.reason), 1)) : E("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ee = { class: "EventsInteractor" }, Oe = {
  __name: "EventsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    return (s, n) => {
      const o = O("OnContractReadSafe");
      return c(), w(o, {
        contract: e.contract
      }, {
        default: S(() => [
          i("div", Ee, [
            i("ul", null, [
              (c(!0), u(y, null, g(l(t).interface.events, (d, h) => (c(), u("li", null, [
                C(l(Ce), {
                  contract: e.contract,
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
}, Re = { class: "EventInteractor" }, ke = /* @__PURE__ */ T("Logs: "), Ce = {
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
    const e = r, t = a.contracts[e.contract];
    let s = b({}), n = b({}), o = b(0), d = b([]);
    return t.onReadSafe(() => {
      s.value = t.interface.events[e.event], n.value = t.filters[s.value.name], t.on(n.value, (h) => {
        o.value++;
        let p = `Block ${h.blockNumber} -> {`;
        for (const m of s.value.inputs)
          p += `${m.name}:${h.args[m.name]}, `;
        p = p.substring(0, p.length - 2) + "}", d.value.push(p);
      });
    }), (h, p) => {
      const m = O("OnContractReadSafe");
      return c(), w(m, {
        contract: e.contract
      }, {
        default: S(() => [
          i("div", Re, [
            i("p", null, f(s.value.name), 1),
            i("ul", null, [
              i("li", null, "Count : " + f(o.value), 1),
              i("li", null, [
                ke,
                i("ul", null, [
                  (c(!0), u(y, null, g(d.value, (B) => (c(), u("li", null, f(B), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ie = { class: "TransactButton" }, Ne = {
  key: 1,
  disabled: ""
}, xe = {
  key: 2,
  disabled: ""
}, De = {
  key: 3,
  disabled: ""
}, Pe = { key: 4 }, $e = {
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
  setup(r, { emit: e }) {
    const t = r, s = a.contracts[t.contract];
    let n = k({
      get() {
        return t.modelValue;
      },
      set(d) {
        e("update:modelValue", d);
      }
    });
    function o() {
      const d = t.args ? t.args : [], h = t.txArgs ? t.txArgs : {};
      n.value.send(d, h);
    }
    return t.config && t.configs.notx && s.onReadSafe(() => {
      n = new K(t.contract, t.method);
    }), (d, h) => {
      const p = O("OnContractReadSafe");
      return c(), w(p, {
        contract: t.contract
      }, {
        default: S(() => [
          i("div", Ie, [
            l(n).status.is("READY") ? (c(), u("button", {
              key: 0,
              onClick: o
            }, f(t.configs && t.configs.content ? t.configs.content : "Transact"), 1)) : l(n).status.is("SENT") ? (c(), u("button", Ne, "Transaction sent...")) : l(n).status.is("ERROR") ? (c(), u("button", xe, "Transaction error!")) : l(n).status.is("SUCCESS") ? (c(), u("button", De, "Success !")) : E("", !0),
            !(t.configs && t.configs.noerror) && l(n).status.is("ERROR") ? (c(), u("p", Pe, f(l(n).error.value.reason), 1)) : E("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
};
const q = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, n] of e)
    t[s] = n;
  return t;
}, We = {
  key: 1,
  disabled: ""
}, je = {
  key: 2,
  disabled: ""
}, Te = {
  key: 3,
  disabled: ""
}, Ae = {
  key: 4,
  disabled: ""
}, Ve = {
  __name: "ConnectWalletButton",
  props: {
    styleLevel: ae
  },
  setup(r) {
    const e = r;
    let t = b({});
    return a.provider.onSafe(async function() {
      t.value = await a.config.networks.getCurrent();
    }), (s, n) => (c(), w(l(a).provider.OnSafe, null, {
      default: S(() => [
        i("div", {
          class: Q(["ConnectWalletButton", `ve-${e.styleLevel}`])
        }, [
          l(a).signer.status.is("DISCONNECTED") ? (c(), u("button", {
            key: 0,
            onClick: n[0] || (n[0] = (o) => l(a).signer.connectWallet(l(a).wallets.metamask))
          }, "Connect Wallet")) : l(a).signer.status.is("REQUESTED") ? (c(), u("button", We, "Connection requested...")) : l(a).signer.status.is("REFUSED") ? (c(), u("button", je, "Connection refused!")) : l(a).signer.status.is("ERROR") ? (c(), u("button", Te, "Connection error!")) : l(a).provider.status.is("WRONG") ? (c(), u("button", Ae, "Wrong network! (" + f(l(t) ? l(t).value.displayName : "unknown") + ")", 1)) : l(a).signer.status.is("CONNECTED") ? (c(), u("button", {
            key: 5,
            onClick: n[1] || (n[1] = (...o) => l(a).signer.disconnectWallet && l(a).signer.disconnectWallet(...o))
          }, "Disconnect")) : E("", !0)
        ], 2)
      ]),
      _: 1
    }));
  }
}, Ct = /* @__PURE__ */ q(Ve, [["__scopeId", "data-v-651e098d"]]), Ue = /* @__PURE__ */ i("p", null, "Available wallets :", -1), It = {
  __name: "AvailableWallets",
  setup(r) {
    return (e, t) => {
      const s = O("OnDappSafe");
      return c(), w(s, null, {
        default: S(() => [
          Ue,
          i("ul", null, [
            (c(!0), u(y, null, g(l(a).wallets, (n) => (c(), u("li", null, f(n.name), 1))), 256))
          ])
        ]),
        _: 1
      });
    };
  }
}, Me = { class: "SelectNetworkDropdown" }, Be = {
  key: 0,
  selected: ""
}, Le = ["src", "alt"], Ge = ["onClick"], qe = ["src", "alt"], Nt = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    let e = b({}), t = b([]);
    a.onSafe(async function() {
      e.value = await a.config.networks.getCurrent(), t.value = a.config.networks.getAvailable(), t.value = t.value.filter((d) => d != e.value);
    });
    async function s(d) {
      const h = t.value.find((p) => p.chainId === parseInt(d));
      if (h) {
        d = x.utils.hexlify(parseInt(d)).toString(), d = x.utils.hexValue(d);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: d
            }]
          });
        } catch (p) {
          p.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: d,
              rpcUrls: [h.defaultRPC],
              chainName: h.name,
              nativeCurrency: {
                name: h.currency.symbol,
                symbol: h.currency.symbol,
                decimals: h.currency.decimals
              },
              blockExplorerUrls: h.explorer && h.explorer.url !== "" ? [h.explorer.url] : null
            }]
          });
        }
      }
    }
    function n() {
      o.value = !o.value;
    }
    let o = b(!1);
    return (d, h) => {
      const p = O("OnDappSafe");
      return c(), w(p, null, {
        default: S(() => [
          i("div", Me, [
            i("ul", { onClick: n }, [
              e.value ? (c(), u("li", Be, [
                i("img", {
                  width: "40",
                  src: e.value.icon ? e.value.icon : l(a).config.defaults.providers.icon,
                  alt: e.value.name + " logo"
                }, null, 8, Le),
                i("p", null, f(e.value.displayName), 1)
              ])) : E("", !0),
              o.value ? (c(!0), u(y, { key: 1 }, g(t.value, (m) => (c(), u("li", {
                key: m.chainId,
                onClick: (B) => s(m.chainId)
              }, [
                i("img", {
                  width: "40",
                  src: m.icon ? m.icon : l(a).config.defaults.providers.icon,
                  alt: m.name + " logo"
                }, null, 8, qe),
                i("p", null, f(m.displayName), 1)
              ], 8, Ge))), 128)) : E("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Fe = {
  __name: "OnDappSafe",
  setup(r) {
    return (e, t) => l(a).isSafe.value ? (c(), u(y, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, He = {
  __name: "OnProviderSafe",
  setup(r) {
    return (e, t) => l(a).provider.isSafe.value ? (c(), u(y, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Ze = {
  __name: "OnSignerSafe",
  setup(r) {
    return (e, t) => l(a).signer.isSafe.value ? (c(), u(y, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, xt = {
  __name: "OnContractsReadSafe",
  setup(r) {
    return (e, t) => l(a).contracts.areReadSafe.value ? (c(), u(y, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Dt = {
  __name: "OnContractsWriteSafe",
  setup(r) {
    return (e, t) => l(a).contracts.areWriteSafe.value ? (c(), u(y, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Ye = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => l(a).contracts[e.contract].isReadSafe.value ? (c(), u(y, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, Ke = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => l(a).contracts[e.contract].isWriteSafe.value ? (c(), u(y, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
};
const F = (r) => (J("data-v-d83f3980"), r = r(), X(), r), ze = /* @__PURE__ */ F(() => /* @__PURE__ */ i("h3", null, "Safe Runners", -1)), Qe = /* @__PURE__ */ F(() => /* @__PURE__ */ i("h3", null, "Status", -1)), Je = {
  __name: "DebugBar",
  setup(r) {
    return (e, t) => {
      const s = O("OnDappSafe");
      return c(), w(s, null, {
        default: S(() => [
          i("section", null, [
            i("div", null, [
              ze,
              i("ul", null, [
                i("li", null, "DApp safe : " + f(l(a).isSafe), 1),
                i("li", null, "Network safe : " + f(l(a).provider.isSafe), 1),
                i("li", null, "Wallet safe : " + f(l(a).signer.isSafe), 1),
                i("li", null, "Contracts read safe : " + f(l(a).contracts.areReadSafe), 1),
                i("li", null, "Contracts write safe : " + f(l(a).contracts.areWriteSafe), 1),
                (c(!0), u(y, null, g(l(a).contracts.getAll(), (n, o) => (c(), u("li", null, [
                  T(" contract " + f(o) + " : ", 1),
                  i("ul", null, [
                    i("li", null, "read safe : " + f(n.isReadSafe), 1),
                    i("li", null, "write safe : " + f(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            i("div", null, [
              Qe,
              i("ul", null, [
                i("li", null, "dapp : " + f(l(a).status.get()), 1),
                i("li", null, "provider : " + f(l(a).provider.status.get()), 1),
                i("li", null, "signer : " + f(l(a).signer.status.get()), 1),
                i("li", null, "contracts : " + f(l(a).contracts.status.get()), 1),
                (c(!0), u(y, null, g(l(a).contracts.getAll(), (n, o) => (c(), u("li", null, " contract " + f(o) + " : " + f(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Pt = /* @__PURE__ */ q(Je, [["__scopeId", "data-v-d83f3980"]]), Xe = { class: "InputUnits" }, et = ["placeholder"], tt = ["value"], st = {
  __name: "InputUnits",
  props: {
    modelValue: {},
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r;
    let s = b(null);
    const n = ["wei", "gwei", "ether"];
    let o = b("wei");
    function d() {
      if (s.value) {
        const h = x.utils.parseUnits(s.value, o.value);
        e("update:modelValue", h);
      }
    }
    return (h, p) => (c(), u("div", Xe, [
      j(i("input", {
        onInput: d,
        "onUpdate:modelValue": p[0] || (p[0] = (m) => s.value = m),
        type: "text",
        placeholder: l(t).placeholder
      }, null, 40, et), [
        [U, s.value]
      ]),
      j(i("select", {
        onChange: d,
        "onUpdate:modelValue": p[1] || (p[1] = (m) => o.value = m)
      }, [
        (c(), u(y, null, g(n, (m) => i("option", { value: m }, f(m), 9, tt)), 64))
      ], 544), [
        [ee, o.value]
      ])
    ]));
  }
};
class P {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const s of t)
      this.states.push(this._formatState(s));
    this._state = b(this.states[0]);
  }
  _formatState(e) {
    return e.toString().toUpperCase();
  }
  _isStateValid(e) {
    return !!this.states.includes(this._formatState(e));
  }
  _areStatesValid(e) {
    for (const t of e)
      if (!this._isStateValid(t))
        return !1;
    return !0;
  }
  get() {
    return $(this._state);
  }
  getRef() {
    return this._state;
  }
  set(e) {
    if (e = this._formatState(e), !this._isStateValid(e))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    R(this._state, e), console.log(`Status '${this._name}' set to '${$(this._state)}'`);
  }
  is(e) {
    if (!this._isStateValid(e))
      throw `The state given to the is() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    return this.get() == this._formatState(e);
  }
  isIn(e) {
    if (!this._areStatesValid(e))
      throw `The states given to the isIn() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
    for (const t of e)
      if (this.is(t))
        return !0;
    return !1;
  }
  watch(e, t) {
    let s = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (Array.isArray(e)) {
      if (!this._areStatesValid(e))
        throw s;
      v(this._state, () => {
        this.isIn(e) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      v(this._state, () => {
        this.is(e) && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
const I = {
  style: {
    level: "minimal"
  },
  networks: [
    {
      name: "Ethereum Mainnet",
      displayName: "Ethereum",
      chainId: 1,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/ethereum.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/optimism.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/cronos.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/bsc.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/gnosis.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/fuse.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/heco.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/polygon.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/fantom.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/metis.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/moonbeam.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/moonriver.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/klaytn.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/arbitrum.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/celo.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/emerald.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/avalanche.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/aurora.svg",
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
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/harmony.svg",
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
    providers: {
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/unknown.svg"
    }
  }
};
class nt {
  constructor(e = null) {
    let t = {};
    return e ? t = D({ ...I.style }, { ...e }) : t = I.style, window.addEventListener("load", () => {
      const s = document.getElementsByClassName("ve-app");
      if (appDiv)
        for (const n of s)
          n.classList.add(`ve-${t.level}`);
    }), t;
  }
}
class at {
  constructor(e = null) {
    if (this._list = [], e) {
      for (const t of e)
        if (t.chainId) {
          const s = I.networks.find((o) => o.chainId === t.chainId), n = D({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of I.networks)
      this._list.find((n) => n.chainId === t.chainId) || (t.available = !1, this._list.push(t));
  }
  async getCurrent() {
    if (a.provider.proxy.getEthersObject()) {
      const e = await a.provider.getNetwork().then((t) => t.chainId);
      return this._list.find((t) => t.chainId === e);
    }
    return null;
  }
  getDefault() {
    return this._list.find((e) => e.default === !0);
  }
  getAvailable() {
    return this._list.filter((e) => e.available);
  }
  getAll() {
    return this._list;
  }
}
class rt {
  constructor(e = null) {
    if (this._list = [], e) {
      for (const t of e)
        if (t.name) {
          const s = I.wallets.find((o) => o.name === t.name), n = D({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of I.wallets)
      this._list.find((n) => n.name === t.name) || (t.available = !1, this._list.push(t));
  }
  async getCurrent() {
    if (a.signer.getEthersObject()) {
      const e = a.signer.name;
      return this._list.find((t) => t.name === e);
    }
    return null;
  }
  getDefault() {
    return this._list.find((e) => e.default === !0);
  }
  getAvailable() {
    return this._list.filter((e) => e.available);
  }
  getAll() {
    return this._list;
  }
}
class ot {
  constructor(e = null) {
    let t = {};
    return e ? t = D({ ...I.defaults }, { ...e }) : t = I.defaults, t;
  }
}
class it {
  constructor(e = null) {
    this.style = new nt(e ? e.style : null), this.networks = new at(e ? e.networks : null), this.wallets = new rt(e ? e.wallets : null), this.defaults = new ot(e ? e.defaults : null);
  }
}
class ct {
  constructor() {
    this.contracts = {}, this.wallets = {};
  }
  async _asyncInit() {
    a.provider.onSafe(() => {
      a.provider.on("block", async function(e) {
        const t = await a.provider.getBlockWithTransactions(e);
        for (const s of t.transactions)
          Object.keys(this.contracts).includes(s.to) ? this.contracts[s.to].update() : Object.keys(this.wallets).includes(s.to) && this.wallets[s.to].update(), Object.keys(this.contracts).includes(s.from) ? this.contracts[s.from].update() : Object.keys(this.wallets).includes(s.from) && this.wallets[s.from].update();
      });
    });
  }
  addContractWatcher(e) {
    Object.keys(this.contracts).includes(e.address) || (this.contracts[e.address] = new lt(e));
  }
  removeContractWatcher(e) {
    Object.keys(this.contracts).includes(e.address) && delete this.contracts[e.address];
  }
  addWalletWatcher(e) {
    Object.keys(this.wallets).includes(e) || (this.wallets[e] = new ut(e));
  }
  removeContractWatcher(e) {
    Object.keys(this.wallets).includes(e) && delete this.wallets[e];
  }
}
class H {
  constructor() {
    this.lastUpdateBlock = 0, this.sources = {};
  }
  _generateDependentUUID() {
    return "xxxxxxxx".replace(/[xy]/g, function(e) {
      var t = Math.random() * 16 | 0, s = e == "x" ? t : t & 3 | 8;
      return s.toString(16);
    });
  }
  async requiresUpdate() {
    if (!a.provider.isSafe.value)
      return !1;
    const e = await a.provider.getBlockNumber();
    return this.lastUpdateBlock < e;
  }
  async updateLastUpdateBlock() {
    const e = await a.provider.getBlockNumber();
    this.lastUpdateBlock = e;
  }
  async _update() {
    throw "_update() method not implemented in that ChainWatcher child class.";
  }
  update() {
    this._update();
  }
}
class lt extends H {
  constructor(e) {
    super(), this.contract = e;
  }
  _buildSourceName(e, t) {
    return `${e}:${t ? t.toString() : ""}`;
  }
  async _updateState(e) {
    e.args ? e.state.value = await this.contract[e.name](...e.args) : e.state.value = await this.contract[e.name]();
  }
  async _update() {
    if (await this.requiresUpdate()) {
      for (const e of Object.values(this.sources))
        this._updateState(e);
      await this.updateLastUpdateBlock();
    }
  }
  add(e, t, s = null) {
    const n = this._buildSourceName(e, t);
    let o = !1;
    Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: e,
      args: t,
      state: b(null),
      dependents: {}
    }, o = !0);
    let d = null;
    s && (d = v(this.sources[n].state, s));
    const h = this._generateDependentUUID();
    return this.sources[n].dependents[h] = d, o && this._updateState(this.sources[n]), h;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const o = this.sources[n].dependents[s];
      o && o(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
class ut extends H {
  constructor(e) {
    super(), this.address = e, this.availableSources = ["balance"];
  }
  async _updateState(e) {
    e.name === "balance" && (e.state.value = await a.provider.getBalance(this.address));
  }
  async _update() {
    if (await this.requiresUpdate()) {
      for (const e of Object.values(this.sources))
        await this._updateState(e);
      await this.updateLastUpdateBlock();
    }
  }
  add(e, t, s = null) {
    if (!this.availableSources.includes(e))
      throw `Sources added to a ChainWalletWatcher must be in ${this.availableSources}. Got ${e}`;
    const n = this._buildSourceName(e, t);
    newSource = !1, Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: e,
      args: t,
      state: ref(null),
      dependents: {}
    }, newSource = !0);
    let o = null;
    s && (o = watch(this.sources[n].state, s));
    const d = this._generateDependentUUID();
    return this.sources[n].dependents[d] = o, newSource && this._updateState(this.sources[n]), d;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const o = this.sources[n].dependents[s];
      o && o(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
function dt(r) {
  for (var e = []; r && r !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(r)), r = Object.getPrototypeOf(r);
  return e;
}
class ht {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && te(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = dt(this._parent._extensionObject);
      for (const t of e)
        if (t !== "constructor")
          try {
            this._parent._ethersObject[t] = this._parent._extensionObject[t].bind(this._parent._ethersObject);
          } catch (s) {
            if (s instanceof TypeError)
              this._parent._ethersObject[t] = this._parent._extensionObject[t];
            else
              throw s;
          }
    }
  }
}
class A {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new ht(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(s, n, o) {
        if (s._ethersObject && s._ethersObject[n])
          try {
            return s._ethersObject[n].bind(s._ethersObject);
          } catch (d) {
            if (d.message.includes(".bind is not a function"))
              return s._ethersObject[n];
            throw d;
          }
        else if (s[n])
          return s[n];
      },
      set: function(s, n, o) {
        return s._ethersObject && s._ethersObject[n] ? (s._ethersObject[n] = o, !0) : (s[n] = o, !0);
      }
    });
  }
}
class ft {
}
class pt extends A {
  constructor(e = null) {
    const t = new ft();
    super(e, t), this.status = new P("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = k(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this.OnSafe = He, this._asyncInit();
  }
  async _getProviderFromWebWallet() {
    for (const e of Object.values(a.wallets))
      if (e) {
        const t = e.getProvider();
        if (t)
          return t;
      }
    return null;
  }
  async _initProviderConnection() {
    const e = await this._getProviderFromWebWallet();
    if (e)
      this.proxy.setEthersObject(new x.providers.Web3Provider(e, "any"));
    else {
      const t = a.config.networks.getDefault();
      t && t.defaultRPC && this.proxy.setEthersObject(new x.providers.JsonRpcProvider(t.defaultRPC));
    }
  }
  async _asyncInit() {
    if (await this._initProviderConnection(), !this._ethersObject)
      this.status.set("DISCONNECTED");
    else {
      const e = await this.getNetwork();
      let t = await a.config.networks.getAvailable().find((s) => s.chainId === e.chainId);
      if (t)
        this.status.set("CONNECTED");
      else if (this.status.set("WRONG"), t = a.config.networks.getAll().find((s) => s.chainId === e.chainId), !t) {
        const s = {
          name: e.name,
          displayName: ne(e.name),
          chainId: e.chainId
        };
        a.config.network.append(s);
      }
      this.on("network", (s, n) => {
        n && n !== s && window.location.reload();
      }), this.on("error", () => {
        this.status.set("ERROR");
      }), t && t.pollingInterval && (this.pollingInterval = t.pollingInterval);
    }
  }
  onSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const s = v(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class mt {
}
class _t extends A {
  constructor(e = null) {
    const t = new mt();
    super(e, t), this.status = new P("signer", [
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
    }), this.isSafe = k(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this.OnSafe = Ze, this._asyncInit();
  }
  async _asyncInit() {
    const e = this;
    a.provider.onSafe(async function() {
      for (const t of Object.values(a.wallets))
        await e.connectWallet(t, !0);
    });
  }
  onSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const s = v(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
  async connectWallet(e, t = !1) {
    if (a.signer.status.is("DISCONNECTED"))
      try {
        const s = await a.provider.getSigner();
        await s.getAddress(), a.signer.proxy.setEthersObject(s), a.signer.status.set("CONNECTED");
      } catch {
        if (t === !0)
          a.signer.status.set("DISCONNECTED");
        else {
          this.status.set("REQUESTED");
          try {
            await e.connect(), this.status.set("CONNECTED");
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
    a.signer.proxy.setEthersObject(null), a.signer.status.set("DISCONNECTED");
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
  constructor(e, ...t) {
    super(e, ...t), this.message = `${e} wallet has rejected the connection request.`;
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
    } catch (e) {
      throw e.code === 4001 ? M(this.name) : e;
    }
  }
}
class bt extends Z {
  constructor(e, t = {}) {
    super(), this.name = "Coinbase";
    const s = t.appName || "", n = t.appLogoUrl, o = t.darkMode || !1;
    this.coinbaseWalletSdk = new e({
      appName: s,
      appLogoUrl: n,
      darkMode: o
    }), this.provider = this.getProvider();
  }
  getProvider() {
    try {
      return this.coinbaseWalletSdk.makeWeb3Provider();
    } catch (e) {
      return console.log(e), null;
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
class yt extends Y {
  constructor() {
    super(), this.name = "BinanceChain";
  }
  getProvider() {
    return window.BinanceChain;
  }
}
class vt {
  constructor() {
    const e = a.config.wallets.getAvailable();
    for (const t of e) {
      const s = gt[t.name];
      s && (this[t.name] = new s());
    }
  }
}
const gt = {
  metamask: Y,
  coinbase: bt,
  binanceChain: yt
};
class wt {
  _watch(e, t, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(e, t, s);
  }
  watch(e, t, s, n = null) {
    const o = this._watch(e, t, s);
    return n ? W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, o);
    }, n) : W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, o);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], e, t, o);
  }
  watchRef(e, t, s = null) {
    const n = this._watch(e, t, null);
    return s ? W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }, s) : W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }), a.chainWatchers.contracts[this.address].getRef(e, t);
  }
}
class L extends A {
  constructor(e, t) {
    const s = new wt();
    super(t, s), this.name = e, this.status = new P(`contract:${e}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((n) => {
      n === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(n) && this.status.set("NO_PROVIDER");
    }), this.isReadSafe = k(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = k(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.OnReadSafe = C(Ye, { contract: this.name }), this.OnWriteSafe = C(Ke, { contract: this.name }), this._asyncInit();
  }
  _watchSignerChanges(e, t) {
    v([a.signer.isSafe], (s, n) => {
      console.log("Refresh contract " + this.name), s !== n && (this.proxy.setEthersObject(null), this._updateContract(e, t));
    });
  }
  _updateContract(e, t) {
    if (a.signer.isSafe.value)
      this.proxy.setEthersObject(new x.Contract(e, t, a.signer.proxy.getEthersObject()));
    else if (a.provider.isSafe.value)
      this.proxy.setEthersObject(new x.Contract(e, t, a.provider.proxy.getEthersObject()));
    else
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`;
  }
  async _asyncInit() {
    const e = this;
    a.provider.onSafe(async function() {
      try {
        const t = await a.config.networks.getCurrent();
        if (t.contracts && Object.keys(t.contracts).includes(e.name)) {
          const s = t.contracts[e.name];
          e._updateContract(s.address, s.abi), e._watchSignerChanges(s.address, s.abi), e.status.set("INITIALIZED");
        } else
          e.status.set("WRONG_PROVIDER");
      } catch (t) {
        throw e.status.set("ERROR"), t;
      }
    });
  }
  onReadSafe(e) {
    const t = N();
    if (this.isReadSafe.value)
      e(t);
    else {
      const s = v(this.isReadSafe, () => {
        this.isReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = N();
    if (this.isWriteSafe.value)
      e(t);
    else {
      const s = v(this.isWriteSafe, () => {
        this.isWriteSafe.value && (e(t), s());
      });
    }
  }
}
class St {
  constructor() {
    this.status = new P("contracts", [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((e) => {
      e === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(e) && this.status.set("NO_PROVIDER");
    });
    for (const e of a.config.networks.getAll())
      if (e.contracts)
        for (const t of Object.keys(e.contracts))
          this[t] = new L(t);
    this.areReadSafe = k(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = k(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.status.set("INITIALIZED");
  }
  getAll() {
    const e = {};
    for (const [t, s] of Object.entries(this))
      s instanceof L && (e[t] = s);
    return e;
  }
  onReadSafe(e) {
    const t = N();
    if (this.areReadSafe.value)
      e(t);
    else {
      const s = v(this.areReadSafe, () => {
        this.areReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = N();
    if (this.areWriteSafe.value)
      e(t);
    else {
      const s = v(this.areWriteSafe, () => {
        this.areWriteSafe.value && (e(t), s());
      });
    }
  }
}
class Et {
}
class K extends A {
  constructor(e, t, s = [], n = { value: 0 }) {
    super(null, new Et()), this.contractName = e, this.methodName = t, this.methodInfos = {}, this.args = b(s), this.txArgs = b(n), this.status = new P(`tx:${e}:${t}`, [
      "NOT_READY",
      "READY",
      "SENT",
      "ERROR",
      "SUCCESS"
    ]), this.status.watch(["ERROR", "SUCCESS"], () => {
      setTimeout(() => {
        this.status.set("READY");
      }, 3e3);
    }), this.data = b([]), this.error = b(null), this.call = null, this._init();
  }
  _init() {
    a.contracts[this.contractName].isReadSafe.value && this._initEthersObject(), a.contracts[this.contractName].onReadSafe(() => {
      this._initEthersObject();
    });
  }
  _initEthersObject() {
    this.methodInfos = a.contracts[this.contractName].interface.functions[this.methodName], this.methodInfos.inputs.forEach((e) => this.args.value.push(null)), this.methodInfos.outputs.forEach((e) => this.data.value.push(null)), this.proxy.setEthersObject(a.contracts[this.contractName][this.methodName]), this.status.set("READY");
  }
  send(e = null, t = null) {
    e = e || $(this.args), t = t || $(this.txArgs), e ? Array.isArray(e) ? this.call = this.proxy.getEthersObject()(...e, t) : this.call = this.proxy.getEthersObject()(e, t) : this.call = this.proxy.getEthersObject()(t), this.status.set("SENT"), this.methodInfos.constant ? this.call.then((s) => {
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
async function $t(r, e) {
  const t = e.config, s = e.start;
  try {
    a.init(t);
  } catch (o) {
    throw a && a.status && a.status.set("ERROR"), o;
  }
  r.config.globalProperties.dapp = a, r.config.globalProperties.rGet = $, r.config.globalProperties.rSet = R, window.dapp = a;
  const n = await import("./index.c6aa2f9c.js");
  r.component("OnDappSafe", n.OnDappSafe), r.component("OnProviderSafe", n.OnProviderSafe), r.component("OnSignerSafe", n.OnSignerSafe), r.component("OnContractsReadSafe", n.OnContractsReadSafe), r.component("OnContractsWriteSafe", n.OnContractsWriteSafe), r.component("OnContractReadSafe", n.OnContractReadSafe), r.component("OnContractWriteSafe", n.OnContractWriteSafe), s(), a.status.set("INITIALIZED");
}
export {
  It as AvailableWallets,
  ct as ChainWatchersList,
  Ct as ConnectWalletButton,
  kt as ContractInteractor,
  lt as ContractWatcher,
  St as ContractsList,
  Pt as DebugBar,
  L as EthersContractProxy,
  pt as EthersProviderProxy,
  _t as EthersSignerProxy,
  K as EthersTransactionProxy,
  Ce as EventInteractor,
  Oe as EventsInteractor,
  st as InputUnits,
  Se as MethodInteractor,
  de as MethodsInteractor,
  Ye as OnContractReadSafe,
  Ke as OnContractWriteSafe,
  xt as OnContractsReadSafe,
  Dt as OnContractsWriteSafe,
  Fe as OnDappSafe,
  He as OnProviderSafe,
  Ze as OnSignerSafe,
  Nt as SelectNetworkDropdown,
  P as Status,
  $e as Transact,
  it as VuethersConfig,
  M as WalletConnectionRejected,
  ut as WalletWatcher,
  vt as WalletsList,
  ne as capitalizeWords,
  a as dapp,
  D as deepMerge,
  $t as initVuethers,
  V as isObject,
  $ as rGet,
  R as rSet,
  ae as styleLevelProp,
  gt as wallets
};
