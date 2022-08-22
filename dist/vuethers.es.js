import { resolveComponent as A, openBlock as i, createBlock as j, withCtx as U, createElementVNode as o, unref as d, createElementBlock as c, toDisplayString as h, createCommentVNode as C, computed as N, ref as w, Fragment as v, renderList as O, withDirectives as P, vModelDynamic as z, vModelText as L, vModelSelect as J, createTextVNode as F, pushScopeId as ee, popScopeId as te, renderSlot as b, watch as I, markRaw as se, getCurrentInstance as D, onUnmounted as $ } from "vue";
import { ethers as G } from "ethers";
const ne = { class: "ConnectWalletButton" }, ae = {
  key: 1,
  disabled: ""
}, re = {
  key: 2,
  disabled: ""
}, oe = {
  key: 3,
  disabled: ""
}, ie = {
  key: 4,
  disabled: ""
}, qe = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (e, t) => {
      const s = A("OnProviderSafe");
      return i(), j(s, null, {
        default: U(() => [
          o("div", ne, [
            d(n).signer.status.is("DISCONNECTED") ? (i(), c("button", {
              key: 0,
              onClick: t[0] || (t[0] = (...r) => d(K) && d(K)(...r))
            }, "Connect Wallet")) : d(n).signer.status.is("REQUESTED") ? (i(), c("button", ae, "Connection requested...")) : d(n).signer.status.is("REFUSED") ? (i(), c("button", re, "Connection refused!")) : d(n).signer.status.is("ERROR") ? (i(), c("button", oe, "Connection error!")) : d(n).provider.status.is("WRONG") ? (i(), c("button", ie, "Wrong network! (" + h(d(n).networks.current.displayName) + ")", 1)) : d(n).signer.status.is("CONNECTED") ? (i(), c("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...r) => d(Q) && d(Q)(...r))
            }, "Disconnect")) : C("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, le = /* @__PURE__ */ F("Functions : "), ce = ["onClick"], ue = /* @__PURE__ */ o("br", null, null, -1), de = { key: 0 }, he = /* @__PURE__ */ o("small", null, "Inputs :", -1), pe = ["onUpdate:modelValue", "type", "placeholder"], me = { key: 0 }, fe = ["onUpdate:modelValue"], be = ["onUpdate:modelValue"], ye = ["value"], ve = { key: 1 }, _e = /* @__PURE__ */ o("small", null, "Outputs :", -1), ge = ["onUpdate:modelValue", "placeholder"], Ee = { key: 2 }, Se = /* @__PURE__ */ F(" Events : "), ke = /* @__PURE__ */ o("p", null, "Logs:", -1), Le = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    async function t(l) {
      const p = [];
      for (const k of S.value[l].inputs)
        p.push(k.value);
      const R = {};
      S.value[l].payable && S.value[l].tx.value.value !== "" && (R.value = G.utils.parseUnits(S.value[l].tx.value.value, S.value[l].tx.value.unit));
      const y = new Z(g.value.functions[l]);
      y.send(p, R), y.call.then((k) => {
        for (let f = 0; f < k.length; f++)
          S.value[l].outputs[f].value = k[f];
      }).catch((k) => {
        S.value[l].error = k.reason;
      });
    }
    async function s(l) {
      x.value[l.event].count += 1;
      let p = `Block ${l.blockNumber} -> {`;
      for (const R of x.value[l.event].inputs)
        p += `${R.name}:${l.args[R.name]}, `;
      p = p.substring(0, p.length - 2) + "}", x.value[l.event].logs.push(p);
    }
    function r(l) {
      return l.includes("int") ? "number" : "text";
    }
    function u(l) {
      return `${l.name && l.name !== "null" ? l.name : "unnamed"} (${l.type})`;
    }
    function m(l) {
      const p = [];
      return p.push(l.mutability), l.payable && p.push("payable"), p.join(", ");
    }
    const _ = e.contract, g = N(() => n.contracts[e.contract]);
    let E = w("no owner");
    const q = ["wei", "gwei", "ether"], x = w({}), S = w({});
    return n.contracts.onReadSafe(async function() {
      try {
        E.value = await g.value.owner();
      } catch {
      }
      for (const l of Object.values(g.value.interface.functions)) {
        S.value[l.name] = {
          inputs: [],
          outputs: [],
          error: null,
          payable: l.payable,
          mutability: l.stateMutability === "view" || l.stateMutability === "pure" ? "read" : "write",
          tx: {
            value: {
              value: "",
              unit: "wei"
            }
          }
        };
        for (let p = 0; p < l.inputs.length; p++)
          S.value[l.name].inputs[p] = {
            name: l.inputs[p].name,
            type: l.inputs[p].type,
            value: ""
          };
        for (let p = 0; p < l.outputs.length; p++)
          S.value[l.name].outputs[p] = {
            name: l.outputs[p].name,
            type: l.outputs[p].type,
            value: ""
          };
      }
      for (const l of Object.values(g.value.interface.events))
        x.value[l.name] = {
          count: 0,
          logs: [],
          inputs: l.inputs
        }, g.value.on(l, s);
    }), (l, p) => {
      const R = A("OnContractsReadSafe");
      return i(), j(R, null, {
        default: U(() => [
          g.value ? (i(), c(v, { key: 0 }, [
            o("p", null, "Interact with '" + h(d(_)) + "' contract :", 1),
            o("ul", null, [
              o("li", null, "Address : " + h(g.value.address), 1),
              o("li", null, "Owner : " + h(E.value), 1),
              o("li", null, [
                le,
                o("ul", null, [
                  (i(!0), c(v, null, O(S.value, (y, k) => (i(), c("li", null, [
                    o("button", {
                      onClick: (f) => t(k)
                    }, h(k), 9, ce),
                    o("small", null, "(" + h(m(y)) + ")", 1),
                    ue,
                    Object.keys(y.inputs).length > 0 || y.payable ? (i(), c("div", de, [
                      he,
                      o("ul", null, [
                        (i(!0), c(v, null, O(y.inputs, (f, Y) => (i(), c("li", null, [
                          P(o("input", {
                            "onUpdate:modelValue": (M) => f.value = M,
                            type: r(f.type),
                            placeholder: u(f)
                          }, null, 8, pe), [
                            [z, f.value]
                          ])
                        ]))), 256)),
                        y.payable ? (i(), c("li", me, [
                          P(o("input", {
                            "onUpdate:modelValue": (f) => y.tx.value.value = f,
                            type: "text",
                            placeholder: "TX value"
                          }, null, 8, fe), [
                            [L, y.tx.value.value]
                          ]),
                          P(o("select", {
                            "onUpdate:modelValue": (f) => y.tx.value.unit = f
                          }, [
                            (i(), c(v, null, O(q, (f) => o("option", { value: f }, h(f), 9, ye)), 64))
                          ], 8, be), [
                            [J, y.tx.value.unit]
                          ])
                        ])) : C("", !0)
                      ])
                    ])) : C("", !0),
                    Object.keys(y.outputs).length > 0 ? (i(), c("div", ve, [
                      _e,
                      o("ul", null, [
                        (i(!0), c(v, null, O(y.outputs, (f, Y) => (i(), c("li", null, [
                          P(o("input", {
                            "onUpdate:modelValue": (M) => f.value = M,
                            type: "text",
                            placeholder: u(f),
                            disabled: ""
                          }, null, 8, ge), [
                            [L, f.value]
                          ])
                        ]))), 256))
                      ])
                    ])) : C("", !0),
                    y.error ? (i(), c("p", Ee, h(y.error), 1)) : C("", !0)
                  ]))), 256))
                ])
              ]),
              o("li", null, [
                Se,
                o("ul", null, [
                  (i(!0), c(v, null, O(x.value, (y, k) => (i(), c("li", null, [
                    o("h3", null, h(k), 1),
                    o("p", null, "Count : " + h(y.count), 1),
                    ke,
                    o("ul", null, [
                      (i(!0), c(v, null, O(y.logs, (f) => (i(), c("li", null, h(f), 1))), 256))
                    ])
                  ]))), 256))
                ])
              ])
            ])
          ], 64)) : C("", !0)
        ]),
        _: 1
      });
    };
  }
}, Ce = { class: "SelectNetworkDropdown" }, Oe = {
  key: 0,
  selected: ""
}, we = ["src", "alt"], Re = ["onClick"], Ie = ["src", "alt"], Ke = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    let e = w({}), t = w([]);
    n.onSafe(async function() {
      e.value = await n.config.providers.getCurrent(), t.value = await n.config.providers.getAvailable();
    });
    async function s(m) {
      const _ = t.value.find((g) => g.chainId === parseInt(m));
      if (_) {
        m = G.utils.hexlify(parseInt(m)).toString(), m = G.utils.hexValue(m);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: m
            }]
          });
        } catch (g) {
          g.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: m,
              rpcUrls: [_.defaultRPC],
              chainName: _.name,
              nativeCurrency: {
                name: _.currency.symbol,
                symbol: _.currency.symbol,
                decimals: _.currency.decimals
              },
              blockExplorerUrls: _.explorer && _.explorer.url !== "" ? [_.explorer.url] : null
            }]
          });
        }
      }
    }
    function r() {
      u.value = !u.value;
    }
    let u = w(!1);
    return (m, _) => {
      const g = A("OnDappSafe");
      return i(), j(g, null, {
        default: U(() => [
          o("div", Ce, [
            o("ul", { onClick: r }, [
              e.value ? (i(), c("li", Oe, [
                o("img", {
                  width: "40",
                  src: e.value.icon ? e.value.icon : d(n).config.defaults.providers.icon,
                  alt: e.value.name + " logo"
                }, null, 8, we),
                o("p", null, h(e.value.displayName), 1)
              ])) : C("", !0),
              u.value ? (i(!0), c(v, { key: 1 }, O(t.value, (E) => (i(), c("li", {
                key: E.chainId,
                onClick: (q) => s(E.chainId)
              }, [
                o("img", {
                  width: "40",
                  src: E.icon ? E.icon : d(n).config.defaults.providers.icon,
                  alt: E.name + " logo"
                }, null, 8, Ie),
                o("p", null, h(E.displayName), 1)
              ], 8, Re))), 128)) : C("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
};
const xe = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [s, r] of e)
    t[s] = r;
  return t;
}, X = (a) => (ee("data-v-9c1aef71"), a = a(), te(), a), Ne = /* @__PURE__ */ X(() => /* @__PURE__ */ o("h3", null, "Safe Runners", -1)), Pe = /* @__PURE__ */ X(() => /* @__PURE__ */ o("h3", null, "Status", -1)), $e = {
  __name: "DebugBar",
  setup(a) {
    return (e, t) => {
      const s = A("OnDappSafe");
      return i(), j(s, null, {
        default: U(() => [
          o("section", null, [
            o("div", null, [
              Ne,
              o("ul", null, [
                o("li", null, "DApp safe : " + h(d(n).isSafe), 1),
                o("li", null, "Network safe : " + h(d(n).provider.isSafe), 1),
                o("li", null, "Wallet safe : " + h(d(n).signer.isSafe), 1),
                o("li", null, "Contracts read safe : " + h(d(n).contracts.areReadSafe), 1),
                o("li", null, "Contracts write safe : " + h(d(n).contracts.areWriteSafe), 1),
                (i(!0), c(v, null, O(d(n).contracts.getAll(), (r, u) => (i(), c("li", null, [
                  F(" contract " + h(u) + " : ", 1),
                  o("ul", null, [
                    o("li", null, "read safe : " + h(r.isReadSafe), 1),
                    o("li", null, "write safe : " + h(r.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            o("div", null, [
              Pe,
              o("ul", null, [
                o("li", null, "dapp : " + h(d(n).status.get()), 1),
                o("li", null, "provider : " + h(d(n).provider.status.get()), 1),
                o("li", null, "signer : " + h(d(n).signer.status.get()), 1),
                o("li", null, "contracts : " + h(d(n).contracts.status.get()), 1),
                (i(!0), c(v, null, O(d(n).contracts.getAll(), (r, u) => (i(), c("li", null, " contract " + h(u) + " : " + h(r.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Qe = /* @__PURE__ */ xe($e, [["__scopeId", "data-v-9c1aef71"]]), De = {
  key: 1,
  disabled: ""
}, Te = {
  key: 2,
  disabled: ""
}, Ae = {
  key: 3,
  disabled: ""
}, je = { key: 4 }, Xe = {
  __name: "Transact",
  props: {
    content: {
      type: String,
      required: !1
    },
    contract: {
      type: String,
      required: !0
    },
    action: {
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
    }
  },
  setup(a) {
    const e = a;
    let t = new Z(null);
    n.contracts.onReadSafe(() => {
      try {
        t.func = n.contracts[e.contract][e.action];
      } catch (r) {
        throw console.log(r), `Error in Transact component : contract '${e.contract}' doesn't exist or it doesn't have any property '${e.action}'`;
      }
    });
    function s() {
      const r = e.args ? e.args : [], u = e.txArgs ? e.txArgs : {};
      console.log(r), console.log(u), console.log(t), t.send(r, u);
    }
    return (r, u) => (i(), c(v, null, [
      d(t).status.is("UNSENT") ? (i(), c("button", {
        key: 0,
        onClick: s
      }, h(e.content ? e.content : "Transact"), 1)) : d(t).status.is("SENT") ? (i(), c("button", De, "Transaction sent...")) : d(t).status.is("ERROR") ? (i(), c("button", Te, "Transaction error!")) : d(t).status.is("SUCCESS") ? (i(), c("button", Ae, "Success !")) : C("", !0),
      d(t).status.is("ERROR") ? (i(), c("p", je, h(d(t).error.reason), 1)) : C("", !0)
    ], 64));
  }
}, Ze = {
  __name: "OnDappSafe",
  setup(a) {
    return (e, t) => d(n).isSafe.value ? (i(), c(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, Ye = {
  __name: "OnProviderSafe",
  setup(a) {
    return (e, t) => d(n).provider.isSafe.value ? (i(), c(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, ze = {
  __name: "OnSignerSafe",
  setup(a) {
    return (e, t) => d(n).signer.isSafe.value ? (i(), c(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, Je = {
  __name: "OnContractsReadSafe",
  setup(a) {
    return (e, t) => d(n).contracts.areReadSafe.value ? (i(), c(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, et = {
  __name: "OnContractsWriteSafe",
  setup(a) {
    return (e, t) => d(n).contracts.areWriteSafe.value ? (i(), c(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, tt = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    return (t, s) => d(n).contracts[e.contract].isReadSafe.value ? (i(), c(v, { key: 0 }, [
      b(t.$slots, "default"),
      b(t.$slots, "safe")
    ], 64)) : b(t.$slots, "unsafe", { key: 1 });
  }
}, st = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    return (t, s) => d(n).contracts[e.contract].isWriteSafe.value ? (i(), c(v, { key: 0 }, [
      b(t.$slots, "default"),
      b(t.$slots, "safe")
    ], 64)) : b(t.$slots, "unsafe", { key: 1 });
  }
};
class W {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const s of t)
      this.states.push(this._formatState(s));
    this._state = w(this.states[0]);
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
    return this._state.value;
  }
  getRef() {
    return this.state;
  }
  set(e) {
    if (console.log(`status ${this._name} set to ${e}`), e = this._formatState(e), !this._isStateValid(e))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    this._state.value = e;
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
      I(this._state, () => {
        this.isIn(e) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      I(this._state, () => {
        this.is(e) && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
class Ue {
  constructor(e) {
    this.contract = e, this.sources = {}, this.lastUpdateBlock = 0;
  }
  _buildSourceName(e, t) {
    return `${e}:${t ? t.toString() : ""}`;
  }
  _generateDependentUUID() {
    return "xxxxxxxx".replace(/[xy]/g, function(e) {
      var t = Math.random() * 16 | 0, s = e == "x" ? t : t & 3 | 8;
      return s.toString(16);
    });
  }
  async update(e, t) {
    const s = await n.provider.getBlockNumber();
    if (this.lastUpdateBlock < s) {
      for (const [r, u] of Object.entries(this.sources)) {
        const m = u.state.value;
        u.args ? u.state.value = await this.contract[u.name](...u.args) : u.state.value = await this.contract[u.name]();
        for (const _ of Object.values(u.dependents))
          _ && _(u.state.value, m);
      }
      this.lastUpdateBlock = s;
    }
  }
  add(e, t, s = null) {
    const r = this._buildSourceName(e, t);
    let u = !1;
    Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: t,
      state: w(null),
      dependents: {}
    }, u = !0);
    const m = this._generateDependentUUID();
    if (this.sources[r].dependents[m] = s || null, u) {
      const _ = this.sources[r].state.value;
      let g = null;
      t ? g = this.contract[e](...t) : g = this.contract[e](), g.then((E) => {
        this.sources[r].state.value = E, s(E, _);
      });
    }
    return m;
  }
  remove(e, t, s) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) && Object.keys(this.sources[r].dependents).includes(s) && delete this.sources[r].dependents[s], Object.keys(this.sources[r].dependents).length === 0 && delete this.sources[r];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
async function K(a = !1) {
  if (!n.provider.isSafe.value) {
    n.signer.status.set("NO_PROVIDER");
    return;
  }
  if (n.provider.status.is("WRONG")) {
    n.signer.status.set("WRONG_PROVIDER");
    return;
  }
  if (!n.signer.status.is("CONNECTED"))
    try {
      const e = await n.provider.getSigner();
      await e.getAddress(), n.signer.proxy.setEthersObject(e), n.signer.status.set("CONNECTED");
    } catch {
      if (a === !0)
        n.signer.status.set("DISCONNECTED");
      else
        try {
          n.signer.status.set("REQUESTED"), await n.provider.send("eth_requestAccounts", []);
          const t = await n.provider.getSigner();
          await t.getAddress(), n.signer.proxy.setEthersObject(t), n.signer.status.set("CONNECTED");
        } catch (t) {
          t.code === 4001 ? n.signer.status.set("REFUSED") : n.signer.status.set("ERROR");
        }
    }
}
function Q() {
  n.signer.proxy.setEthersObject(null), n.signer.status.set("DISCONNECTED");
}
function We(a) {
  for (var e = []; a && a !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(a)), a = Object.getPrototypeOf(a);
  return e;
}
class Me {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && se(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = We(this._parent._extensionObject);
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
class H {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new Me(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(s, r, u) {
        if (s._ethersObject && s._ethersObject[r])
          try {
            return s._ethersObject[r].bind(s._ethersObject);
          } catch (m) {
            if (m.message.includes(".bind is not a function"))
              return s._ethersObject[r];
            throw m;
          }
        else if (s[r])
          return s[r];
      },
      set: function(s, r, u) {
        return s._ethersObject && s._ethersObject[r] ? (s._ethersObject[r] = u, !0) : (s[r] = u, !0);
      }
    });
  }
}
class Ve {
}
class nt extends H {
  constructor(e = null) {
    const t = new Ve();
    super(e, t), this.status = new W("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = N(() => n.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"]));
  }
  onSafe(e) {
    const t = D();
    if (this.isSafe.value)
      e(t);
    else {
      const s = I(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class Be {
}
class at extends H {
  constructor(e = null) {
    const t = new Be();
    super(e, t), this.status = new W("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "CONNECTED"
    ]), this.status.watch(["REFUSED", "ERROR"], () => {
      setTimeout(() => {
        this.status.set("DISCONNECTED");
      }, 5e3);
    }), this.isSafe = N(() => n.provider.isSafe.value && this.status.is("CONNECTED"));
  }
  onSafe(e) {
    const t = D();
    if (this.isSafe.value)
      e(t);
    else {
      const s = I(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class Ge {
  _watch(e, t, s = null) {
    return Object.keys(n._chainWatchers).includes(this.address) || (n._chainWatchers[this.address] = new Ue(this)), n._chainWatchers[this.address].add(e, t, s);
  }
  watch(e, t, s, r = null) {
    const u = this._watch(e, t, s);
    return r ? $(() => {
      n._chainWatchers[this.address].remove(e, t, u);
    }, r) : $(() => {
      n._chainWatchers[this.address].remove(e, t, u);
    }), n._chainWatchers[this.address].remove.bind(n._chainWatchers[this.address], e, t, u);
  }
  watchRef(e, t, s = null) {
    const r = this._watch(e, t, null);
    return s ? $(() => {
      n._chainWatchers[this.address].remove(e, t, r);
    }, s) : $(() => {
      n._chainWatchers[this.address].remove(e, t, r);
    }), n._chainWatchers[this.address].getRef(e, t);
  }
}
class rt extends H {
  constructor(e, t) {
    const s = new Ge();
    super(t, s), this.status = new W(`contract:${e}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), this.isReadSafe = N(() => n.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = N(() => n.signer.isSafe.value && this.status.is("INITIALIZED"));
  }
  onReadSafe(e) {
    const t = D();
    if (this.isReadSafe.value)
      e(t);
    else {
      const s = I(this.isReadSafe, () => {
        this.isReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = D();
    if (this.isWriteSafe.value)
      e(t);
    else {
      const s = I(this.isWriteSafe, () => {
        this.isWriteSafe.value && (e(t), s());
      });
    }
  }
}
const V = {
  providers: [
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
  defaults: {
    providers: {
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/unknown.svg"
    }
  }
};
class ot {
  constructor(e = null) {
    if (this.providers = [], e && e.providers) {
      for (const t of e.providers)
        if (t.chainId) {
          const s = V.providers.find((u) => u.chainId === t.chainId), r = T({ ...s }, { ...t });
          r.available !== !1 && (r.available = !0), r.displayName || (r.displayName = r.name), this.providers.push(r);
        }
    }
    this.providers.getCurrent = this._getCurrentProvider, this.providers.getDefault = this._getDefaultProvider, this.providers.getAvailable = this._getAvailableProviders, this.providers.getAll = this._getAllProviders, this.defaults = {}, e && e.defaults ? this.defaults = T({ ...V.defaults }, { ...e.defaults }) : this.defaults = V.defaults;
  }
  async _getCurrentProvider() {
    const e = await n.provider.getNetwork().then((t) => t.chainId);
    return n.config.providers.find((t) => t.chainId === e);
  }
  _getDefaultProvider() {
    return n.config.providers.find((e) => e.default === !0);
  }
  async _getAvailableProviders() {
    const e = await this.getCurrent();
    return n.config.providers.filter((t) => t.available && t !== e);
  }
  _getAllProviders() {
    return n.config.providers;
  }
}
class Z {
  constructor(e) {
    this.func = e, this.constant = !1, this.status = new W("tx", [
      "UNSENT",
      "SENT",
      "ERROR",
      "SUCCESS"
    ]), this.status.watch(["ERROR", "SUCCESS"], () => {
      setTimeout(() => {
        this.status.set("UNSENT");
      }, 5e3);
    }), this.data = null, this.error = null, this.call = null;
  }
  send(e = [], t = {}) {
    e ? Array.isArray(e) ? this.call = this.func(...e, t) : this.call = this.func(e, t) : this.call = this.func(t), this.status.set("SENT"), this.constant ? this.call.then((s) => {
      this.data = s, this.status.set("SUCCESS");
    }).catch((s) => {
      this.error = s, this.status.set("ERROR");
    }) : this.call.then((s) => (console.log("TX"), console.log(s), s.wait())).then((s) => {
      this.data = s, this.status.set("SUCCESS");
    }).catch((s) => {
      this.error = s, this.status.set("ERROR");
    });
  }
}
function B(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function T(a, ...e) {
  if (!e.length)
    return a;
  const t = e.shift();
  if (B(a) && B(t))
    for (const s in t)
      B(t[s]) ? (a[s] || Object.assign(a, {
        [s]: {}
      }), T(a[s], t[s])) : Object.assign(a, {
        [s]: t[s]
      });
  return T(a, ...e);
}
function it(a) {
  const e = a.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
let n = null;
function lt(a, e) {
  const t = e.config, s = e.start;
  import("./dapp.17ee6974.mjs").then((r) => {
    n = new r.Dapp(t), a.config.globalProperties.dapp = n, import("./index.3c259a23.mjs").then(async function(m) {
      m.initComponents(a), s(), await m.initProvider(), await m.initSigner(), await m.initContracts(), await m.initWatchers(), n.status.set("SAFE");
    });
  });
}
export {
  Ue as ChainWatcher,
  qe as ConnectWalletButton,
  Le as ContractInteractor,
  Qe as DebugBar,
  rt as EthersContractProxy,
  nt as EthersProviderProxy,
  at as EthersSignerProxy,
  tt as OnContractReadSafe,
  st as OnContractWriteSafe,
  Je as OnContractsReadSafe,
  et as OnContractsWriteSafe,
  Ze as OnDappSafe,
  Ye as OnProviderSafe,
  ze as OnSignerSafe,
  Ke as SelectNetworkDropdown,
  W as Status,
  Xe as Transact,
  Z as Transaction,
  ot as VuethersConfig,
  it as capitalizeWords,
  K as connectWallet,
  n as dapp,
  T as deepMerge,
  Q as disconnectWallet,
  lt as initVuethers,
  B as isObject
};
