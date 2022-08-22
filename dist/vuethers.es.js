import { resolveComponent as A, openBlock as l, createBlock as W, withCtx as M, createElementVNode as o, unref as u, createElementBlock as c, toDisplayString as p, createCommentVNode as w, computed as N, ref as C, Fragment as y, renderList as O, withDirectives as D, vModelDynamic as z, vModelText as K, vModelSelect as J, createTextVNode as H, pushScopeId as ee, popScopeId as te, renderSlot as v, watch as R, markRaw as se, getCurrentInstance as $, onUnmounted as T } from "vue";
import { ethers as F } from "ethers";
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
}, Be = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (e, t) => {
      const s = A("OnProviderSafe");
      return l(), W(s, null, {
        default: M(() => [
          o("div", ne, [
            u(n).signer.status.is("DISCONNECTED") ? (l(), c("button", {
              key: 0,
              onClick: t[0] || (t[0] = (...r) => u(Q) && u(Q)(...r))
            }, "Connect Wallet")) : u(n).signer.status.is("REQUESTED") ? (l(), c("button", ae, "Connection requested...")) : u(n).signer.status.is("REFUSED") ? (l(), c("button", re, "Connection refused!")) : u(n).signer.status.is("ERROR") ? (l(), c("button", oe, "Connection error!")) : u(n).provider.status.is("WRONG") ? (l(), c("button", ie, "Wrong network! (" + p(u(n).networks.current.displayName) + ")", 1)) : u(n).signer.status.is("CONNECTED") ? (l(), c("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...r) => u(Z) && u(Z)(...r))
            }, "Disconnect")) : w("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, le = /* @__PURE__ */ H("Functions : "), ce = ["onClick"], ue = /* @__PURE__ */ o("br", null, null, -1), de = { key: 0 }, he = /* @__PURE__ */ o("small", null, "Inputs :", -1), pe = ["onUpdate:modelValue", "type", "placeholder"], me = { key: 0 }, fe = ["onUpdate:modelValue"], be = ["onUpdate:modelValue"], ve = ["value"], ye = { key: 1 }, _e = /* @__PURE__ */ o("small", null, "Outputs :", -1), ge = ["onUpdate:modelValue", "placeholder"], Ee = { key: 2 }, ke = /* @__PURE__ */ H(" Events : "), Se = /* @__PURE__ */ o("p", null, "Logs:", -1), Ge = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    async function t(i, d, k = {}) {
      let b, S, h = null;
      return d ? Array.isArray(d) ? h = i(...d, k) : h = i(d, k) : h = i(k), await h.then((P) => b = P).catch((P) => S = P), { data: b, error: S };
    }
    async function s(i) {
      const d = [];
      for (const h of E.value[i].inputs)
        d.push(h.value);
      const k = {};
      E.value[i].payable && E.value[i].tx.value.value !== "" && (k.value = F.utils.parseUnits(E.value[i].tx.value.value, E.value[i].tx.value.unit));
      const { data: b, error: S } = await t(_.value.functions[i], d, k);
      if (S)
        E.value[i].error = S.reason;
      else
        for (let h = 0; h < b.length; h++)
          E.value[i].outputs[h].value = b[h];
    }
    async function r(i) {
      x.value[i.event].count += 1;
      let d = `Block ${i.blockNumber} -> {`;
      for (const k of x.value[i.event].inputs)
        d += `${k.name}:${i.args[k.name]}, `;
      d = d.substring(0, d.length - 2) + "}", x.value[i.event].logs.push(d);
    }
    function m(i) {
      return i.includes("int") ? "number" : "text";
    }
    function f(i) {
      return `${i.name && i.name !== "null" ? i.name : "unnamed"} (${i.type})`;
    }
    function g(i) {
      const d = [];
      return d.push(i.mutability), i.payable && d.push("payable"), d.join(", ");
    }
    const I = e.contract, _ = N(() => n.contracts[e.contract]);
    let U = C("no owner");
    const Y = ["wei", "gwei", "ether"], x = C({}), E = C({});
    return n.contracts.onReadSafe(async function() {
      console.log(_.value);
      try {
        U.value = await _.value.owner();
      } catch {
      }
      for (const i of Object.values(_.value.interface.functions)) {
        E.value[i.name] = {
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
        for (let d = 0; d < i.inputs.length; d++)
          E.value[i.name].inputs[d] = {
            name: i.inputs[d].name,
            type: i.inputs[d].type,
            value: ""
          };
        for (let d = 0; d < i.outputs.length; d++)
          E.value[i.name].outputs[d] = {
            name: i.outputs[d].name,
            type: i.outputs[d].type,
            value: ""
          };
      }
      for (const i of Object.values(_.value.interface.events))
        x.value[i.name] = {
          count: 0,
          logs: [],
          inputs: i.inputs
        }, _.value.on(i, r);
    }), (i, d) => {
      const k = A("OnContractsReadSafe");
      return l(), W(k, null, {
        default: M(() => [
          _.value ? (l(), c(y, { key: 0 }, [
            o("p", null, "Interact with '" + p(u(I)) + "' contract :", 1),
            o("ul", null, [
              o("li", null, "Address : " + p(_.value.address), 1),
              o("li", null, "Owner : " + p(U.value), 1),
              o("li", null, [
                le,
                o("ul", null, [
                  (l(!0), c(y, null, O(E.value, (b, S) => (l(), c("li", null, [
                    o("button", {
                      onClick: (h) => s(S)
                    }, p(S), 9, ce),
                    o("small", null, "(" + p(g(b)) + ")", 1),
                    ue,
                    Object.keys(b.inputs).length > 0 || b.payable ? (l(), c("div", de, [
                      he,
                      o("ul", null, [
                        (l(!0), c(y, null, O(b.inputs, (h, P) => (l(), c("li", null, [
                          D(o("input", {
                            "onUpdate:modelValue": (V) => h.value = V,
                            type: m(h.type),
                            placeholder: f(h)
                          }, null, 8, pe), [
                            [z, h.value]
                          ])
                        ]))), 256)),
                        b.payable ? (l(), c("li", me, [
                          D(o("input", {
                            "onUpdate:modelValue": (h) => b.tx.value.value = h,
                            type: "text",
                            placeholder: "TX value"
                          }, null, 8, fe), [
                            [K, b.tx.value.value]
                          ]),
                          D(o("select", {
                            "onUpdate:modelValue": (h) => b.tx.value.unit = h
                          }, [
                            (l(), c(y, null, O(Y, (h) => o("option", { value: h }, p(h), 9, ve)), 64))
                          ], 8, be), [
                            [J, b.tx.value.unit]
                          ])
                        ])) : w("", !0)
                      ])
                    ])) : w("", !0),
                    Object.keys(b.outputs).length > 0 ? (l(), c("div", ye, [
                      _e,
                      o("ul", null, [
                        (l(!0), c(y, null, O(b.outputs, (h, P) => (l(), c("li", null, [
                          D(o("input", {
                            "onUpdate:modelValue": (V) => h.value = V,
                            type: "text",
                            placeholder: f(h),
                            disabled: ""
                          }, null, 8, ge), [
                            [K, h.value]
                          ])
                        ]))), 256))
                      ])
                    ])) : w("", !0),
                    b.error ? (l(), c("p", Ee, p(b.error), 1)) : w("", !0)
                  ]))), 256))
                ])
              ]),
              o("li", null, [
                ke,
                o("ul", null, [
                  (l(!0), c(y, null, O(x.value, (b, S) => (l(), c("li", null, [
                    o("h3", null, p(S), 1),
                    o("p", null, "Count : " + p(b.count), 1),
                    Se,
                    o("ul", null, [
                      (l(!0), c(y, null, O(b.logs, (h) => (l(), c("li", null, p(h), 1))), 256))
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
}, Oe = { class: "SelectNetworkDropdown" }, we = {
  key: 0,
  selected: ""
}, Ce = ["src", "alt"], Ie = ["onClick"], Re = ["src", "alt"], Fe = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    let e = C({}), t = C([]);
    n.onSafe(async function() {
      e.value = await n.config.providers.getCurrent(), t.value = await n.config.providers.getAvailable();
    });
    async function s(f) {
      const g = t.value.find((I) => I.chainId === parseInt(f));
      if (g) {
        f = F.utils.hexlify(parseInt(f)).toString(), f = F.utils.hexValue(f);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: f
            }]
          });
        } catch (I) {
          I.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: f,
              rpcUrls: [g.defaultRPC],
              chainName: g.name,
              nativeCurrency: {
                name: g.currency.symbol,
                symbol: g.currency.symbol,
                decimals: g.currency.decimals
              },
              blockExplorerUrls: g.explorer && g.explorer.url !== "" ? [g.explorer.url] : null
            }]
          });
        }
      }
    }
    function r() {
      m.value = !m.value;
    }
    let m = C(!1);
    return (f, g) => {
      const I = A("OnDappSafe");
      return l(), W(I, null, {
        default: M(() => [
          o("div", Oe, [
            o("ul", { onClick: r }, [
              e.value ? (l(), c("li", we, [
                o("img", {
                  width: "40",
                  src: e.value.icon ? e.value.icon : u(n).config.defaults.providers.icon,
                  alt: e.value.name + " logo"
                }, null, 8, Ce),
                o("p", null, p(e.value.displayName), 1)
              ])) : w("", !0),
              m.value ? (l(!0), c(y, { key: 1 }, O(t.value, (_) => (l(), c("li", {
                key: _.chainId,
                onClick: (U) => s(_.chainId)
              }, [
                o("img", {
                  width: "40",
                  src: _.icon ? _.icon : u(n).config.defaults.providers.icon,
                  alt: _.name + " logo"
                }, null, 8, Re),
                o("p", null, p(_.displayName), 1)
              ], 8, Ie))), 128)) : w("", !0)
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
}, X = (a) => (ee("data-v-9c1aef71"), a = a(), te(), a), Pe = /* @__PURE__ */ X(() => /* @__PURE__ */ o("h3", null, "Safe Runners", -1)), Ne = /* @__PURE__ */ X(() => /* @__PURE__ */ o("h3", null, "Status", -1)), $e = {
  __name: "DebugBar",
  setup(a) {
    return (e, t) => {
      const s = A("OnDappSafe");
      return l(), W(s, null, {
        default: M(() => [
          o("section", null, [
            o("div", null, [
              Pe,
              o("ul", null, [
                o("li", null, "DApp safe : " + p(u(n).isSafe), 1),
                o("li", null, "Network safe : " + p(u(n).provider.isSafe), 1),
                o("li", null, "Wallet safe : " + p(u(n).signer.isSafe), 1),
                o("li", null, "Contracts read safe : " + p(u(n).contracts.areReadSafe), 1),
                o("li", null, "Contracts write safe : " + p(u(n).contracts.areWriteSafe), 1),
                (l(!0), c(y, null, O(u(n).contracts.getAll(), (r, m) => (l(), c("li", null, [
                  H(" contract " + p(m) + " : ", 1),
                  o("ul", null, [
                    o("li", null, "read safe : " + p(r.isReadSafe), 1),
                    o("li", null, "write safe : " + p(r.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            o("div", null, [
              Ne,
              o("ul", null, [
                o("li", null, "dapp : " + p(u(n).status.get()), 1),
                o("li", null, "provider : " + p(u(n).provider.status.get()), 1),
                o("li", null, "signer : " + p(u(n).signer.status.get()), 1),
                o("li", null, "contracts : " + p(u(n).contracts.status.get()), 1),
                (l(!0), c(y, null, O(u(n).contracts.getAll(), (r, m) => (l(), c("li", null, " contract " + p(m) + " : " + p(r.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, He = /* @__PURE__ */ xe($e, [["__scopeId", "data-v-9c1aef71"]]), Le = {
  __name: "OnDappSafe",
  setup(a) {
    return (e, t) => u(n).isSafe.value ? (l(), c(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, qe = {
  __name: "OnProviderSafe",
  setup(a) {
    return (e, t) => u(n).provider.isSafe.value ? (l(), c(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Ke = {
  __name: "OnSignerSafe",
  setup(a) {
    return (e, t) => u(n).signer.isSafe.value ? (l(), c(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Qe = {
  __name: "OnContractsReadSafe",
  setup(a) {
    return (e, t) => u(n).contracts.areReadSafe.value ? (l(), c(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Ze = {
  __name: "OnContractsWriteSafe",
  setup(a) {
    return (e, t) => u(n).contracts.areWriteSafe.value ? (l(), c(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Xe = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    return (t, s) => u(n).contracts[e.contract].isReadSafe.value ? (l(), c(y, { key: 0 }, [
      v(t.$slots, "default"),
      v(t.$slots, "safe")
    ], 64)) : v(t.$slots, "unsafe", { key: 1 });
  }
}, Ye = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    return (t, s) => u(n).contracts[e.contract].isWriteSafe.value ? (l(), c(y, { key: 0 }, [
      v(t.$slots, "default"),
      v(t.$slots, "safe")
    ], 64)) : v(t.$slots, "unsafe", { key: 1 });
  }
};
class L {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const s of t)
      this.states.push(this._formatState(s));
    this._state = C(this.states[0]);
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
      R(this._state, () => {
        e.includes(this._state) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      R(this._state, () => {
        e === this._state && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
class De {
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
        const r = s.state.value;
        s.state.value = await this.contract[s.name](...s.args);
        for (const m of Object.values(s.dependents))
          m && m(s.state.value, r);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, s = null) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: t,
      state: C(null),
      dependents: {}
    }, this.contract[e](...t).then((f) => {
      this.sources[r].state.value = f;
    }));
    const m = this._generateDependentUUID();
    return this.sources[r].dependents[m] = s || null, m;
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
async function Q(a = !1) {
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
function Z() {
  n.signer.proxy.setEthersObject(null), n.signer.status.set("DISCONNECTED");
}
function Te(a) {
  for (var e = []; a && a !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(a)), a = Object.getPrototypeOf(a);
  return e;
}
class je {
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
      const e = Te(this._parent._extensionObject);
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
class q {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new je(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(s, r, m) {
        if (s._ethersObject && s._ethersObject[r])
          try {
            return s._ethersObject[r].bind(s._ethersObject);
          } catch (f) {
            if (f.message.includes(".bind is not a function"))
              return s._ethersObject[r];
            throw f;
          }
        else if (s[r])
          return s[r];
      },
      set: function(s, r, m) {
        return s._ethersObject && s._ethersObject[r] ? (s._ethersObject[r] = m, !0) : (s[r] = m, !0);
      }
    });
  }
}
class Ae {
}
class ze extends q {
  constructor(e = null) {
    const t = new Ae();
    super(e, t), this.status = new L("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = N(() => n.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"]));
  }
  onSafe(e) {
    const t = $();
    if (this.isSafe.value)
      e(t);
    else {
      const s = R(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class We {
}
class Je extends q {
  constructor(e = null) {
    const t = new We();
    super(e, t), this.status = new L("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "CONNECTED"
    ]), this.isSafe = N(() => n.provider.isSafe.value && this.status.is("CONNECTED"));
  }
  onSafe(e) {
    const t = $();
    if (this.isSafe.value)
      e(t);
    else {
      const s = R(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class Me {
  _watch(e, t, s = null) {
    return Object.keys(n._chainWatchers).includes(this.address) || (n._chainWatchers[this.address] = new De(this)), n._chainWatchers[this.address].add(e, t, s);
  }
  watch(e, t, s, r = null) {
    const m = this._watch(e, t, s);
    return $(), r ? T(() => {
      n._chainWatchers[this.address].remove(e, t, m);
    }, r) : T(() => {
      n._chainWatchers[this.address].remove(e, t, m);
    }), n._chainWatchers[this.address].remove.bind(n._chainWatchers[this.address], e, t, m);
  }
  watchRef(e, t, s = null) {
    const r = this._watch(e, t, null);
    return s ? T(() => {
      n._chainWatchers[this.address].remove(e, t, r);
    }, s) : T(() => {
      n._chainWatchers[this.address].remove(e, t, r);
    }), n._chainWatchers[this.address].getRef(e, t);
  }
}
class et extends q {
  constructor(e, t) {
    const s = new Me();
    super(t, s), this.status = new L(`contract:${e}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), this.isReadSafe = N(() => n.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = N(() => n.signer.isSafe.value && this.status.is("INITIALIZED"));
  }
  onReadSafe(e) {
    const t = $();
    if (this.isReadSafe.value)
      e(t);
    else {
      const s = R(this.isReadSafe, () => {
        this.isReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = $();
    if (this.isWriteSafe.value)
      e(t);
    else {
      const s = R(this.isWriteSafe, () => {
        this.isWriteSafe.value && (e(t), s());
      });
    }
  }
}
const B = {
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
class tt {
  constructor(e = null) {
    if (this.providers = [], e && e.providers) {
      for (const t of e.providers)
        if (t.chainId) {
          const s = B.providers.find((m) => m.chainId === t.chainId), r = j({ ...s }, { ...t });
          r.available !== !1 && (r.available = !0), r.displayName || (r.displayName = r.name), this.providers.push(r);
        }
    }
    this.providers.getCurrent = this._getCurrentProvider, this.providers.getDefault = this._getDefaultProvider, this.providers.getAvailable = this._getAvailableProviders, this.providers.getAll = this._getAllProviders, this.defaults = {}, e && e.defaults ? this.defaults = j({ ...B.defaults }, { ...e.defaults }) : this.defaults = B.defaults;
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
function G(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function j(a, ...e) {
  if (!e.length)
    return a;
  const t = e.shift();
  if (G(a) && G(t))
    for (const s in t)
      G(t[s]) ? (a[s] || Object.assign(a, {
        [s]: {}
      }), j(a[s], t[s])) : Object.assign(a, {
        [s]: t[s]
      });
  return j(a, ...e);
}
function st(a) {
  const e = a.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
let n = null;
function nt(a, e) {
  const t = e.config, s = e.start;
  import("./dapp.8f4bb39e.mjs").then((r) => {
    n = new r.Dapp(t), a.config.globalProperties.dapp = n, import("./index.7aaf3507.mjs").then(async function(f) {
      f.initComponents(a), s(), await f.initProvider(), await f.initSigner(), await f.initContracts(), await f.initWatchers(), n.status.set("SAFE");
    });
  });
}
export {
  De as ChainWatcher,
  Be as ConnectWalletButton,
  Ge as ContractInteractor,
  He as DebugBar,
  et as EthersContractProxy,
  ze as EthersProviderProxy,
  Je as EthersSignerProxy,
  Xe as OnContractReadSafe,
  Ye as OnContractWriteSafe,
  Qe as OnContractsReadSafe,
  Ze as OnContractsWriteSafe,
  Le as OnDappSafe,
  qe as OnProviderSafe,
  Ke as OnSignerSafe,
  Fe as SelectNetworkDropdown,
  L as Status,
  tt as VuethersConfig,
  st as capitalizeWords,
  Q as connectWallet,
  n as dapp,
  j as deepMerge,
  Z as disconnectWallet,
  nt as initVuethers,
  G as isObject
};
