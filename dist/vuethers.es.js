import { resolveComponent as U, openBlock as l, createBlock as V, withCtx as B, createElementVNode as o, unref as c, createElementBlock as u, toDisplayString as m, createCommentVNode as w, computed as x, ref as O, Fragment as v, renderList as k, withDirectives as $, vModelDynamic as Y, vModelText as q, vModelSelect as z, createTextVNode as G, pushScopeId as J, popScopeId as ee, renderSlot as y, watch as C, markRaw as te, getCurrentInstance as P, onUnmounted as D } from "vue";
import { ethers as M } from "ethers";
const se = { class: "ConnectWalletButton" }, ne = {
  key: 1,
  disabled: ""
}, ae = {
  key: 2,
  disabled: ""
}, re = {
  key: 3,
  disabled: ""
}, oe = {
  key: 4,
  disabled: ""
}, Ve = {
  __name: "ConnectWalletButton",
  setup(r) {
    return (e, t) => {
      const s = U("OnProviderSafe");
      return l(), V(s, null, {
        default: B(() => [
          o("div", se, [
            c(n).signer.status.is("DISCONNECTED") ? (l(), u("button", {
              key: 0,
              onClick: t[0] || (t[0] = (...a) => c(K) && c(K)(...a))
            }, "Connect Wallet")) : c(n).signer.status.is("REQUESTED") ? (l(), u("button", ne, "Connection requested...")) : c(n).signer.status.is("REFUSED") ? (l(), u("button", ae, "Connection refused!")) : c(n).signer.status.is("ERROR") ? (l(), u("button", re, "Connection error!")) : c(n).provider.status.is("WRONG") ? (l(), u("button", oe, "Wrong network! (" + m(c(n).networks.current.displayName) + ")", 1)) : c(n).signer.status.is("CONNECTED") ? (l(), u("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...a) => c(Q) && c(Q)(...a))
            }, "Disconnect")) : w("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, ie = /* @__PURE__ */ G("Functions : "), le = ["onClick"], ce = /* @__PURE__ */ o("br", null, null, -1), ue = { key: 0 }, de = /* @__PURE__ */ o("small", null, "Inputs :", -1), he = ["onUpdate:modelValue", "type", "placeholder"], pe = { key: 0 }, me = ["onUpdate:modelValue"], fe = ["onUpdate:modelValue"], be = ["value"], ye = { key: 1 }, ve = /* @__PURE__ */ o("small", null, "Outputs :", -1), _e = ["onUpdate:modelValue", "placeholder"], ge = { key: 2 }, Ee = /* @__PURE__ */ G(" Events : "), ke = /* @__PURE__ */ o("p", null, "Logs:", -1), Be = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    async function t(i, h, g = {}) {
      let b, E, p = null;
      return h ? Array.isArray(h) ? p = i(...h, g) : p = i(h, g) : p = i(g), await p.then((R) => b = R).catch((R) => E = R), { data: b, error: E };
    }
    async function s(i) {
      const h = [];
      for (const p of _.value[i].inputs)
        h.push(p.value);
      const g = {};
      _.value[i].payable && _.value[i].tx.value.value !== "" && (g.value = M.utils.parseUnits(_.value[i].tx.value.value, _.value[i].tx.value.unit));
      const { data: b, error: E } = await t(S.value.functions[i], h, g);
      if (E)
        _.value[i].error = E.reason;
      else
        for (let p = 0; p < b.length; p++)
          _.value[i].outputs[p].value = b[p];
    }
    async function a(i) {
      I.value[i.event].count += 1;
      let h = `Block ${i.blockNumber} -> {`;
      for (const g of I.value[i.event].inputs)
        h += `${g.name}:${i.args[g.name]}, `;
      h = h.substring(0, h.length - 2) + "}", I.value[i.event].logs.push(h);
    }
    function d(i) {
      return i.includes("int") ? "number" : "text";
    }
    function f(i) {
      return `${i.name && i.name !== "null" ? i.name : "unnamed"} (${i.type})`;
    }
    function N(i) {
      const h = [];
      return h.push(i.mutability), i.payable && h.push("payable"), h.join(", ");
    }
    const S = x(() => n.contracts[e.contract]);
    let L = O("");
    const X = ["wei", "gwei", "ether"], I = O({}), _ = O({});
    return n.contracts.onReadSafe(async function() {
      L.value = await S.value.owner();
      for (const i of Object.values(S.value.interface.functions)) {
        _.value[i.name] = {
          inputs: [],
          outputs: [],
          error: null,
          payable: i.payable,
          mutability: i.stateMutability === "view" || i.stateMutability === "pure" ? "read" : "write",
          tx: {
            value: {
              value: "",
              unit: "wei"
            }
          }
        };
        for (let h = 0; h < i.inputs.length; h++)
          _.value[i.name].inputs[h] = {
            name: i.inputs[h].name,
            type: i.inputs[h].type,
            value: ""
          };
        for (let h = 0; h < i.outputs.length; h++)
          _.value[i.name].outputs[h] = {
            name: i.outputs[h].name,
            type: i.outputs[h].type,
            value: ""
          };
      }
      for (const i of Object.values(S.value.interface.events))
        I.value[i.name] = {
          count: 0,
          logs: [],
          inputs: i.inputs
        }, S.value.on(i, a);
    }), (i, h) => {
      const g = U("OnContractsReadSafe");
      return l(), V(g, null, {
        default: B(() => [
          S.value ? (l(), u(v, { key: 0 }, [
            o("p", null, "Interact with '" + m(i.contractName) + "' contract :", 1),
            o("ul", null, [
              o("li", null, "Address : " + m(S.value.address), 1),
              o("li", null, "Owner : " + m(L.value), 1),
              o("li", null, [
                ie,
                o("ul", null, [
                  (l(!0), u(v, null, k(_.value, (b, E) => (l(), u("li", null, [
                    o("button", {
                      onClick: (p) => s(E)
                    }, m(E), 9, le),
                    o("small", null, "(" + m(N(b)) + ")", 1),
                    ce,
                    Object.keys(b.inputs).length > 0 || b.payable ? (l(), u("div", ue, [
                      de,
                      o("ul", null, [
                        (l(!0), u(v, null, k(b.inputs, (p, R) => (l(), u("li", null, [
                          $(o("input", {
                            "onUpdate:modelValue": (j) => p.value = j,
                            type: d(p.type),
                            placeholder: f(p)
                          }, null, 8, he), [
                            [Y, p.value]
                          ])
                        ]))), 256)),
                        b.payable ? (l(), u("li", pe, [
                          $(o("input", {
                            "onUpdate:modelValue": (p) => b.tx.value.value = p,
                            type: "text",
                            placeholder: "TX value"
                          }, null, 8, me), [
                            [q, b.tx.value.value]
                          ]),
                          $(o("select", {
                            "onUpdate:modelValue": (p) => b.tx.value.unit = p
                          }, [
                            (l(), u(v, null, k(X, (p) => o("option", { value: p }, m(p), 9, be)), 64))
                          ], 8, fe), [
                            [z, b.tx.value.unit]
                          ])
                        ])) : w("", !0)
                      ])
                    ])) : w("", !0),
                    Object.keys(b.outputs).length > 0 ? (l(), u("div", ye, [
                      ve,
                      o("ul", null, [
                        (l(!0), u(v, null, k(b.outputs, (p, R) => (l(), u("li", null, [
                          $(o("input", {
                            "onUpdate:modelValue": (j) => p.value = j,
                            type: "text",
                            placeholder: f(p),
                            disabled: ""
                          }, null, 8, _e), [
                            [q, p.value]
                          ])
                        ]))), 256))
                      ])
                    ])) : w("", !0),
                    b.error ? (l(), u("p", ge, m(b.error), 1)) : w("", !0)
                  ]))), 256))
                ])
              ]),
              o("li", null, [
                Ee,
                o("ul", null, [
                  (l(!0), u(v, null, k(I.value, (b, E) => (l(), u("li", null, [
                    o("h3", null, m(E), 1),
                    o("p", null, "Count : " + m(b.count), 1),
                    ke,
                    o("ul", null, [
                      (l(!0), u(v, null, k(b.logs, (p) => (l(), u("li", null, m(p), 1))), 256))
                    ])
                  ]))), 256))
                ])
              ])
            ])
          ], 64)) : w("", !0)
        ]),
        _: 1
      });
    };
  }
}, we = {
  key: 0,
  class: "SelectNetworkDropdown"
}, Se = {
  key: 0,
  selected: ""
}, Oe = ["src", "alt"], Ce = ["onClick"], Ie = ["src", "alt"], Ge = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    async function e(a) {
      const d = n.networks.available.find((f) => f.chainId === parseInt(a));
      if (d) {
        a = M.utils.hexlify(parseInt(a)).toString(), a = M.utils.hexValue(a);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: a
            }]
          });
        } catch (N) {
          N.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: a,
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
        const f = await n.provider.getNetwork();
        n.networks.current.chainId !== f.chainId && window.location.reload();
      }
    }
    function t() {
      s.value = !s.value;
    }
    let s = O(!1);
    return (a, d) => c(n).safe ? (l(), u("div", we, [
      o("ul", { onClick: t }, [
        c(n).networks.current ? (l(), u("li", Se, [
          o("img", {
            width: "40",
            src: c(n).networks.current.icon ? c(n).networks.current.icon : c(n).defaults.networks.icon,
            alt: c(n).networks.current.name + " logo"
          }, null, 8, Oe),
          o("p", null, m(c(n).networks.current.displayName), 1)
        ])) : w("", !0),
        s.value ? (l(!0), u(v, { key: 1 }, k(c(n).networks.available, (f) => (l(), u("li", {
          key: f.chainId,
          onClick: (N) => e(f.chainId)
        }, [
          o("img", {
            width: "40",
            src: f.icon ? f.icon : c(n).defaults.networks.icon,
            alt: f.name + " logo"
          }, null, 8, Ie),
          o("p", null, m(f.displayName), 1)
        ], 8, Ce))), 128)) : w("", !0)
      ])
    ])) : w("", !0);
  }
};
const Re = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, a] of e)
    t[s] = a;
  return t;
}, Z = (r) => (J("data-v-9c1aef71"), r = r(), ee(), r), xe = /* @__PURE__ */ Z(() => /* @__PURE__ */ o("h3", null, "Safe Runners", -1)), Pe = /* @__PURE__ */ Z(() => /* @__PURE__ */ o("h3", null, "Status", -1)), Ne = {
  __name: "DebugBar",
  setup(r) {
    return (e, t) => {
      const s = U("OnDappSafe");
      return l(), V(s, null, {
        default: B(() => [
          o("section", null, [
            o("div", null, [
              xe,
              o("ul", null, [
                o("li", null, "DApp safe : " + m(c(n).isSafe), 1),
                o("li", null, "Network safe : " + m(c(n).provider.isSafe), 1),
                o("li", null, "Wallet safe : " + m(c(n).signer.isSafe), 1),
                o("li", null, "Contracts read safe : " + m(c(n).contracts.areReadSafe), 1),
                o("li", null, "Contracts write safe : " + m(c(n).contracts.areWriteSafe), 1),
                (l(!0), u(v, null, k(c(n).contracts.getAll(), (a, d) => (l(), u("li", null, [
                  G(" contract " + m(d) + " : ", 1),
                  o("ul", null, [
                    o("li", null, "read safe : " + m(a.isReadSafe), 1),
                    o("li", null, "write safe : " + m(a.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            o("div", null, [
              Pe,
              o("ul", null, [
                o("li", null, "dapp : " + m(c(n).status.get()), 1),
                o("li", null, "provider : " + m(c(n).provider.status.get()), 1),
                o("li", null, "signer : " + m(c(n).signer.status.get()), 1),
                o("li", null, "contracts : " + m(c(n).contracts.status.get()), 1),
                (l(!0), u(v, null, k(c(n).contracts.getAll(), (a, d) => (l(), u("li", null, " contract " + m(d) + " : " + m(a.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Fe = /* @__PURE__ */ Re(Ne, [["__scopeId", "data-v-9c1aef71"]]), He = {
  __name: "OnDappSafe",
  setup(r) {
    return (e, t) => c(n).isSafe.value ? (l(), u(v, { key: 0 }, [
      y(e.$slots, "default"),
      y(e.$slots, "safe")
    ], 64)) : y(e.$slots, "unsafe", { key: 1 });
  }
}, Le = {
  __name: "OnProviderSafe",
  setup(r) {
    return (e, t) => c(n).provider.isSafe.value ? (l(), u(v, { key: 0 }, [
      y(e.$slots, "default"),
      y(e.$slots, "safe")
    ], 64)) : y(e.$slots, "unsafe", { key: 1 });
  }
}, qe = {
  __name: "OnSignerSafe",
  setup(r) {
    return (e, t) => c(n).signer.isSafe.value ? (l(), u(v, { key: 0 }, [
      y(e.$slots, "default"),
      y(e.$slots, "safe")
    ], 64)) : y(e.$slots, "unsafe", { key: 1 });
  }
}, Ke = {
  __name: "OnContractsReadSafe",
  setup(r) {
    return (e, t) => c(n).contracts.areReadSafe.value ? (l(), u(v, { key: 0 }, [
      y(e.$slots, "default"),
      y(e.$slots, "safe")
    ], 64)) : y(e.$slots, "unsafe", { key: 1 });
  }
}, Qe = {
  __name: "OnContractsWriteSafe",
  setup(r) {
    return (e, t) => c(n).contracts.areWriteSafe.value ? (l(), u(v, { key: 0 }, [
      y(e.$slots, "default"),
      y(e.$slots, "safe")
    ], 64)) : y(e.$slots, "unsafe", { key: 1 });
  }
}, Ze = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => c(n).contracts[e.contract].isReadSafe.value ? (l(), u(v, { key: 0 }, [
      y(t.$slots, "default"),
      y(t.$slots, "safe")
    ], 64)) : y(t.$slots, "unsafe", { key: 1 });
  }
}, Xe = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => c(n).contracts[e.contract].isWriteSafe.value ? (l(), u(v, { key: 0 }, [
      y(t.$slots, "default"),
      y(t.$slots, "safe")
    ], 64)) : y(t.$slots, "unsafe", { key: 1 });
  }
};
class F {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const s of t)
      this.states.push(this._formatState(s));
    this._state = O(this.states[0]);
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
      C(this._state, () => {
        e.includes(this._state) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      C(this._state, () => {
        e === this._state && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
class $e {
  constructor(e) {
    this.contract = e, this.sources = {}, this.lastUpdateBlock = 0;
  }
  _buildSourceName(e, t) {
    return `${e}:${t.toString()}`;
  }
  _generateDependentUUID() {
    return "xxxxxxxx".replace(/[xy]/g, function(e) {
      var t = Math.random() * 16 | 0, s = e == "x" ? t : t & 3 | 8;
      return s.toString(16);
    });
  }
  async update() {
    const e = await n.provider.getBlockNumber();
    if (this.lastUpdateBlock < e) {
      for (const [t, s] of Object.entries(this.sources)) {
        const a = s.state.value;
        s.state.value = await this.contract[s.name](...s.args);
        for (const d of Object.values(s.dependents))
          d && d(s.state.value, a);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, s = null) {
    const a = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(a) || (this.sources[a] = {
      name: e,
      args: t,
      state: O(null),
      dependents: {}
    }, this.contract[e](...t).then((f) => {
      this.sources[a].state.value = f;
    }));
    const d = this._generateDependentUUID();
    return this.sources[a].dependents[d] = s || null, d;
  }
  remove(e, t, s) {
    const a = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(a) && Object.keys(this.sources[a].dependents).includes(s) && delete this.sources[a].dependents[s], Object.keys(this.sources[a].dependents).length === 0 && delete this.sources[a];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
async function K(r = !1) {
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
      if (r === !0)
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
function De(r) {
  for (var e = []; r && r !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(r)), r = Object.getPrototypeOf(r);
  return e;
}
class Te {
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
      const e = De(this._parent._extensionObject);
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
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new Te(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(s, a, d) {
        if (s._ethersObject && s._ethersObject[a])
          try {
            return s._ethersObject[a].bind(s._ethersObject);
          } catch (f) {
            if (f.message.includes(".bind is not a function"))
              return s._ethersObject[a];
            throw f;
          }
        else if (s[a])
          return s[a];
      },
      set: function(s, a, d) {
        return s._ethersObject && s._ethersObject[a] ? (s._ethersObject[a] = d, !0) : (s[a] = d, !0);
      }
    });
  }
}
class je {
}
class Ye extends H {
  constructor(e = null) {
    const t = new je();
    super(e, t), this.status = new F("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = x(() => n.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"]));
  }
  onSafe(e) {
    const t = P();
    if (this.isSafe.value)
      e(t);
    else {
      const s = C(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class Ae {
}
class ze extends H {
  constructor(e = null) {
    const t = new Ae();
    super(e, t), this.status = new F("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "CONNECTED"
    ]), this.isSafe = x(() => n.provider.isSafe.value && this.status.is("CONNECTED"));
  }
  onSafe(e) {
    const t = P();
    if (this.isSafe.value)
      e(t);
    else {
      const s = C(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class We {
  _watch(e, t, s = null) {
    return Object.keys(n._chainWatchers).includes(this.address) || (n._chainWatchers[this.address] = new $e(this)), n._chainWatchers[this.address].add(e, t, s);
  }
  watch(e, t, s, a = null) {
    const d = this._watch(e, t, s);
    return P(), a ? D(() => {
      n._chainWatchers[this.address].remove(e, t, d);
    }, a) : D(() => {
      n._chainWatchers[this.address].remove(e, t, d);
    }), n._chainWatchers[this.address].remove.bind(n._chainWatchers[this.address], e, t, d);
  }
  watchRef(e, t, s = null) {
    const a = this._watch(e, t, null);
    return s ? D(() => {
      n._chainWatchers[this.address].remove(e, t, a);
    }, s) : D(() => {
      n._chainWatchers[this.address].remove(e, t, a);
    }), n._chainWatchers[this.address].getRef(e, t);
  }
}
class Je extends H {
  constructor(e, t) {
    const s = new We();
    super(t, s), this.status = new F(`contract:${e}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), this.isReadSafe = x(() => n.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = x(() => n.signer.isSafe.value && this.status.is("INITIALIZED"));
  }
  onReadSafe(e) {
    const t = P();
    if (this.isReadSafe.value)
      e(t);
    else {
      const s = C(this.isReadSafe, () => {
        this.isReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = P();
    if (this.isWriteSafe.value)
      e(t);
    else {
      const s = C(this.isWriteSafe, () => {
        this.isWriteSafe.value && (e(t), s());
      });
    }
  }
}
const A = {
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
class et {
  constructor(e = null) {
    if (this.providers = [], e && e.providers) {
      for (const t of e.providers)
        if (t.chainId) {
          const s = A.providers.find((d) => d.chainId === t.chainId), a = T({ ...s }, { ...t });
          a.available !== !1 && (a.available = !0), a.displayName || (a.displayName = a.name), this.providers.push(a);
        }
    }
    this.providers.getCurrent = this._getCurrentProvider, this.providers.getDefault = this._getDefaultProvider, this.providers.getAvailable = this._getAvailableProviders, this.providers.getAll = this._getAllProviders, this.defaults = {}, e && e.defaults ? this.defaults = T({ ...A.defaults }, { ...e.defaults }) : this.defaults = A.defaults;
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
function W(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function T(r, ...e) {
  if (!e.length)
    return r;
  const t = e.shift();
  if (W(r) && W(t))
    for (const s in t)
      W(t[s]) ? (r[s] || Object.assign(r, {
        [s]: {}
      }), T(r[s], t[s])) : Object.assign(r, {
        [s]: t[s]
      });
  return T(r, ...e);
}
function tt(r) {
  const e = r.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
let n = null;
function st(r, e) {
  const t = e.config, s = e.start;
  import("./dapp.48b2326e.mjs").then((a) => {
    n = new a.Dapp(t), r.config.globalProperties.dapp = n, import("./index.ecdf308e.mjs").then(async function(f) {
      f.initComponents(r), s(), await f.initProvider(), await f.initSigner(), await f.initContracts(), await f.initWatchers(), n.status.set("SAFE");
    });
  });
}
export {
  $e as ChainWatcher,
  Ve as ConnectWalletButton,
  Be as ContractInteractor,
  Fe as DebugBar,
  Je as EthersContractProxy,
  Ye as EthersProviderProxy,
  ze as EthersSignerProxy,
  Ze as OnContractReadSafe,
  Xe as OnContractWriteSafe,
  Ke as OnContractsReadSafe,
  Qe as OnContractsWriteSafe,
  He as OnDappSafe,
  Le as OnProviderSafe,
  qe as OnSignerSafe,
  Ge as SelectNetworkDropdown,
  F as Status,
  et as VuethersConfig,
  tt as capitalizeWords,
  K as connectWallet,
  n as dapp,
  T as deepMerge,
  Q as disconnectWallet,
  st as initVuethers,
  W as isObject
};
