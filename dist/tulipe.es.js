import { computed as k, getCurrentInstance as N, watch as w, isRef as W, ref as m, resolveComponent as C, openBlock as l, createBlock as g, withCtx as R, createElementVNode as c, toDisplayString as f, unref as o, createVNode as O, createTextVNode as $, createElementBlock as u, Fragment as v, renderList as S, shallowRef as Q, withDirectives as V, vModelText as B, createCommentVNode as E, normalizeClass as J, renderSlot as y, pushScopeId as X, popScopeId as tt, vModelSelect as et, markRaw as L, onUnmounted as A } from "vue";
import { ethers as x } from "ethers";
class st {
  constructor() {
  }
  init(t = null) {
    this.config = new ve(t), this.status = new P("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = k(() => this.status.is("INITIALIZED")), this.OnSafe = ee, this.chainWatchers = new Ne(), this.wallets = new We(), this.provider = new ge(), this.pro = this.provider, this.signer = new Ce(), this.sig = this.signer, this.contracts = new pe(), this.con = this.contracts;
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
function M(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function D(r, ...t) {
  if (!t.length)
    return r;
  const e = t.shift();
  if (M(r) && M(e))
    for (const s in e)
      M(e[s]) ? (r[s] || Object.assign(r, {
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
function T(r) {
  return W(r) ? T(r.value) : r;
}
function I(r, t) {
  W(r) ? r.value = t : r = t;
}
const at = {
  required: !1,
  type: String,
  default: "minimal",
  validator(r) {
    return ["unstylized", "minimal", "opinionated"].includes(r);
  }
}, rt = { class: "ContractInteractor" }, ot = /* @__PURE__ */ $(" Methods : "), it = /* @__PURE__ */ c("br", null, null, -1), ct = /* @__PURE__ */ $(" Events : "), lt = /* @__PURE__ */ c("br", null, null, -1), Ue = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r, e = a.contracts[t.contract];
    let s = m("not owned");
    return a.contracts[t.contract].onReadSafe(async function() {
      try {
        s.value = await e.owner();
      } catch {
      }
    }), (n, i) => {
      const d = C("OnContractReadSafe");
      return l(), g(d, {
        contract: t.contract
      }, {
        default: R(() => [
          c("div", rt, [
            c("ul", null, [
              c("li", null, "Address : " + f(o(e).address), 1),
              c("li", null, "Owner : " + f(o(s)), 1),
              c("li", null, [
                ot,
                it,
                O(o(dt), {
                  contract: t.contract
                }, null, 8, ["contract"])
              ]),
              c("li", null, [
                ct,
                lt,
                O(o(Ct), {
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
}, ut = { class: "MethodsInteractor" }, dt = {
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
      const i = C("OnContractReadSafe");
      return l(), g(i, {
        contract: t.contract
      }, {
        default: R(() => [
          c("div", ut, [
            c("ul", null, [
              (l(!0), u(v, null, S(o(e).interface.functions, (d, h) => (l(), u("li", null, [
                O(o(Rt), {
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
}, ht = { class: "MethodInteractor" }, pt = { key: 0 }, ft = /* @__PURE__ */ c("p", null, "Inputs :", -1), mt = ["onUpdate:modelValue", "placeholder"], yt = { key: 0 }, _t = { key: 1 }, vt = /* @__PURE__ */ c("p", null, "Outputs :", -1), wt = ["onUpdate:modelValue", "placeholder"], St = ["placeholder"], gt = { key: 2 }, Rt = {
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
    const t = r, e = Q(new H(t.contract, t.method));
    function s(n) {
      return `${n.name && n.name !== "null" ? n.name : ""} (${n.type})`;
    }
    return (n, i) => {
      const d = C("OnContractReadSafe");
      return l(), g(d, {
        contract: t.contract
      }, {
        default: R(() => [
          c("div", ht, [
            O(o(Pt), {
              contract: t.contract,
              method: t.method,
              modelValue: o(e),
              "onUpdate:modelValue": i[0] || (i[0] = (h) => W(e) ? e.value = h : null),
              configs: { content: t.method, notx: !0, noerror: !0 }
            }, null, 8, ["contract", "method", "modelValue", "configs"]),
            c("small", null, f(o(e).methodInfos.stateMutability), 1),
            Object.keys(o(e).methodInfos.inputs).length > 0 || o(e).methodInfos.payable ? (l(), u("div", pt, [
              ft,
              c("ul", null, [
                (l(!0), u(v, null, S(o(e).methodInfos.inputs, (h, p) => (l(), u("li", null, [
                  V(c("input", {
                    "onUpdate:modelValue": (_) => o(e).args.value[p] = _,
                    type: "text",
                    placeholder: s(h)
                  }, null, 8, mt), [
                    [B, o(e).args.value[p]]
                  ]),
                  $(" " + f(o(e).args.value[p]) + " " + f(typeof o(e).args.value[p]), 1)
                ]))), 256)),
                o(e).methodInfos.payable ? (l(), u("li", yt, [
                  O(o(he), {
                    modelValue: o(e).txArgs.value.value,
                    "onUpdate:modelValue": i[1] || (i[1] = (h) => o(e).txArgs.value.value = h)
                  }, null, 8, ["modelValue"]),
                  $(" " + f(o(e).txArgs.value.value) + " " + f(typeof o(e).txArgs.value.value), 1)
                ])) : E("", !0)
              ])
            ])) : E("", !0),
            Object.keys(o(e).methodInfos.outputs).length > 0 ? (l(), u("div", _t, [
              vt,
              c("ul", null, [
                (l(!0), u(v, null, S(o(e).methodInfos.outputs, (h, p) => (l(), u("li", null, [
                  o(e).data.value ? V((l(), u("input", {
                    key: 0,
                    "onUpdate:modelValue": (_) => o(e).data.value[p] = _,
                    type: "text",
                    placeholder: s(h),
                    disabled: ""
                  }, null, 8, wt)), [
                    [B, o(e).data.value[p]]
                  ]) : (l(), u("input", {
                    key: 1,
                    type: "text",
                    placeholder: s(h),
                    disabled: ""
                  }, null, 8, St))
                ]))), 256))
              ])
            ])) : E("", !0),
            o(e).status.is("ERROR") ? (l(), u("p", gt, f(o(e).error.value.reason), 1)) : E("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Et = { class: "EventsInteractor" }, Ct = {
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
      const i = C("OnContractReadSafe");
      return l(), g(i, {
        contract: t.contract
      }, {
        default: R(() => [
          c("div", Et, [
            c("ul", null, [
              (l(!0), u(v, null, S(o(e).interface.events, (d, h) => (l(), u("li", null, [
                O(o(Ot), {
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
}, It = { class: "EventInteractor" }, kt = /* @__PURE__ */ $("Logs: "), Ot = {
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
    let s = m({}), n = m({}), i = m(0), d = m([]);
    return e.onReadSafe(() => {
      s.value = e.interface.events[t.event], n.value = e.filters[s.value.name], e.on(n.value, (h) => {
        i.value++;
        let p = `Block ${h.blockNumber} -> {`;
        for (const _ of s.value.inputs)
          p += `${_.name}:${h.args[_.name]}, `;
        p = p.substring(0, p.length - 2) + "}", d.value.push(p);
      });
    }), (h, p) => {
      const _ = C("OnContractReadSafe");
      return l(), g(_, {
        contract: t.contract
      }, {
        default: R(() => [
          c("div", It, [
            c("p", null, f(o(s).name), 1),
            c("ul", null, [
              c("li", null, "Count : " + f(o(i)), 1),
              c("li", null, [
                kt,
                c("ul", null, [
                  (l(!0), u(v, null, S(o(d), (z) => (l(), u("li", null, f(z), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, bt = { class: "TransactButton" }, Nt = {
  key: 1,
  disabled: ""
}, xt = {
  key: 2,
  disabled: ""
}, $t = {
  key: 3,
  disabled: ""
}, Dt = { key: 4 }, Pt = {
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
    let n = k({
      get() {
        return e.modelValue;
      },
      set(d) {
        t("update:modelValue", d);
      }
    });
    function i() {
      const d = e.args ? e.args : [], h = e.txArgs ? e.txArgs : {};
      n.value.send(d, h);
    }
    return e.config && e.configs.notx && s.onReadSafe(() => {
      n = new H(e.contract, e.method);
    }), (d, h) => {
      const p = C("OnContractReadSafe");
      return l(), g(p, {
        contract: e.contract
      }, {
        default: R(() => [
          c("div", bt, [
            o(n).status.is("READY") ? (l(), u("button", {
              key: 0,
              onClick: i
            }, f(e.configs && e.configs.content ? e.configs.content : "Transact"), 1)) : o(n).status.is("SENT") ? (l(), u("button", Nt, "Transaction sent...")) : o(n).status.is("ERROR") ? (l(), u("button", xt, "Transaction error!")) : o(n).status.is("SUCCESS") ? (l(), u("button", $t, "Success !")) : E("", !0),
            !(e.configs && e.configs.noerror) && o(n).status.is("ERROR") ? (l(), u("p", Dt, f(o(n).error.value.reason), 1)) : E("", !0)
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
}, Tt = {
  key: 2,
  disabled: ""
}, At = {
  key: 3,
  disabled: ""
}, Vt = {
  key: 4,
  disabled: ""
}, Ut = {
  __name: "ConnectWalletButton",
  props: {
    styleLevel: at
  },
  setup(r) {
    const t = r;
    let e = m({});
    return a.provider.onSafe(async function() {
      e.value = await a.config.networks.getCurrent();
    }), (s, n) => (l(), g(o(a).provider.OnSafe, null, {
      default: R(() => [
        c("div", {
          class: J(["ConnectWalletButton", `ve-${t.styleLevel}`])
        }, [
          o(a).signer.status.is("DISCONNECTED") ? (l(), u("button", {
            key: 0,
            onClick: n[0] || (n[0] = (i) => o(a).signer.connectWallet(o(a).wallets.metamask))
          }, "Connect Wallet")) : o(a).signer.status.is("REQUESTED") ? (l(), u("button", Wt, "Connection requested...")) : o(a).signer.status.is("REFUSED") ? (l(), u("button", Tt, "Connection refused!")) : o(a).signer.status.is("ERROR") ? (l(), u("button", At, "Connection error!")) : o(a).provider.status.is("WRONG") ? (l(), u("button", Vt, "Wrong network! (" + f(o(e) ? o(e).displayName : "unknown") + ")", 1)) : o(a).signer.status.is("CONNECTED") ? (l(), u("button", {
            key: 5,
            onClick: n[1] || (n[1] = (...i) => o(a).signer.disconnectWallet && o(a).signer.disconnectWallet(...i))
          }, "Disconnect")) : E("", !0)
        ], 2)
      ]),
      _: 1
    }));
  }
}, Me = /* @__PURE__ */ q(Ut, [["__scopeId", "data-v-b6827a89"]]), Mt = { class: "SelectWalletDropdown" }, Bt = { key: 0 }, jt = ["src", "alt"], Lt = { key: 1 }, Gt = /* @__PURE__ */ c("p", null, "Select a wallet", -1), qt = [
  Gt
], Ft = ["onClick"], Ht = ["src", "alt"], Be = {
  __name: "SelectWalletDropdown",
  setup(r) {
    let t = m({}), e = m([]), s = m(!1);
    a.onSafe(async function() {
      t.value = await a.config.wallets.getCurrent(), e.value = a.config.wallets.getAvailable().filter((i) => i !== t.value);
    });
    function n() {
      s.value = !s.value;
    }
    return (i, d) => {
      const h = C("OnDappSafe");
      return l(), g(h, null, {
        default: R(() => [
          c("div", Mt, [
            c("ul", { onClick: n }, [
              o(t) ? (l(), u("li", Bt, [
                c("img", {
                  width: "40",
                  src: o(t).icon ? o(t).icon : o(a).config.defaults.wallets.icon,
                  alt: o(t).displayName + " logo"
                }, null, 8, jt),
                c("p", null, "cur" + f(o(t).displayName), 1)
              ])) : (l(), u("li", Lt, qt)),
              o(s) ? (l(!0), u(v, { key: 2 }, S(o(e), (p) => (l(), u("li", {
                key: p.id,
                onClick: (_) => o(a).signer.connectWallet(o(a).wallets[p.id])
              }, [
                c("img", {
                  width: "40",
                  src: p.icon ? p.icon : o(a).config.defaults.wallets.icon,
                  alt: p.displayName + " logo"
                }, null, 8, Ht),
                c("p", null, f(p.displayName), 1)
              ], 8, Ft))), 128)) : E("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Zt = { class: "SelectNetworkDropdown" }, Yt = { key: 0 }, Kt = ["src", "alt"], zt = { key: 1 }, Qt = /* @__PURE__ */ c("p", null, "Select a network", -1), Jt = [
  Qt
], Xt = ["onClick"], te = ["src", "alt"], je = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    let t = m({}), e = m([]), s = m(!1);
    a.onSafe(async function() {
      t.value = await a.config.networks.getCurrent(), e.value = a.config.networks.getAvailable().filter((i) => i.id !== t.value.id);
    });
    function n() {
      s.value = !s.value;
    }
    return (i, d) => {
      const h = C("OnDappSafe");
      return l(), g(h, null, {
        default: R(() => [
          c("div", Zt, [
            c("ul", { onClick: n }, [
              o(t) ? (l(), u("li", Yt, [
                c("img", {
                  width: "40",
                  src: o(t).icon ? o(t).icon : o(a).config.defaults.networks.icon,
                  alt: o(t).displayName + " logo"
                }, null, 8, Kt),
                c("p", null, f(o(t).displayName), 1)
              ])) : (l(), u("li", zt, Jt)),
              o(s) ? (l(!0), u(v, { key: 2 }, S(o(e), (p) => (l(), u("li", {
                key: p.id,
                onClick: (_) => o(a).provider.changeNetwork(p.id)
              }, [
                c("img", {
                  width: "40",
                  src: p.icon ? p.icon : o(a).config.defaults.networks.icon,
                  alt: p.displayName + " logo"
                }, null, 8, te),
                c("p", null, f(p.displayName), 1)
              ], 8, Xt))), 128)) : E("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, ee = {
  __name: "OnDappSafe",
  setup(r) {
    return (t, e) => o(a).isSafe.value ? (l(), u(v, { key: 0 }, [
      y(t.$slots, "default"),
      y(t.$slots, "safe")
    ], 64)) : y(t.$slots, "unsafe", { key: 1 });
  }
}, se = {
  __name: "OnProviderSafe",
  setup(r) {
    return (t, e) => o(a).provider.isSafe.value ? (l(), u(v, { key: 0 }, [
      y(t.$slots, "default"),
      y(t.$slots, "safe")
    ], 64)) : y(t.$slots, "unsafe", { key: 1 });
  }
}, ne = {
  __name: "OnSignerSafe",
  setup(r) {
    return (t, e) => o(a).signer.isSafe.value ? (l(), u(v, { key: 0 }, [
      y(t.$slots, "default"),
      y(t.$slots, "safe")
    ], 64)) : y(t.$slots, "unsafe", { key: 1 });
  }
}, Le = {
  __name: "OnContractsReadSafe",
  setup(r) {
    return (t, e) => o(a).contracts.areReadSafe.value ? (l(), u(v, { key: 0 }, [
      y(t.$slots, "default"),
      y(t.$slots, "safe")
    ], 64)) : y(t.$slots, "unsafe", { key: 1 });
  }
}, Ge = {
  __name: "OnContractsWriteSafe",
  setup(r) {
    return (t, e) => o(a).contracts.areWriteSafe.value ? (l(), u(v, { key: 0 }, [
      y(t.$slots, "default"),
      y(t.$slots, "safe")
    ], 64)) : y(t.$slots, "unsafe", { key: 1 });
  }
}, ae = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r;
    return (e, s) => o(a).contracts[t.contract].isReadSafe.value ? (l(), u(v, { key: 0 }, [
      y(e.$slots, "default"),
      y(e.$slots, "safe")
    ], 64)) : y(e.$slots, "unsafe", { key: 1 });
  }
}, re = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const t = r;
    return (e, s) => o(a).contracts[t.contract].isWriteSafe.value ? (l(), u(v, { key: 0 }, [
      y(e.$slots, "default"),
      y(e.$slots, "safe")
    ], 64)) : y(e.$slots, "unsafe", { key: 1 });
  }
};
const F = (r) => (X("data-v-8361140f"), r = r(), tt(), r), oe = /* @__PURE__ */ F(() => /* @__PURE__ */ c("h3", null, "Safe Runners", -1)), ie = /* @__PURE__ */ F(() => /* @__PURE__ */ c("h3", null, "Status", -1)), ce = {
  __name: "DebugBar",
  setup(r) {
    return (t, e) => {
      const s = C("OnDappSafe");
      return l(), g(s, null, {
        default: R(() => [
          c("section", null, [
            c("div", null, [
              oe,
              c("ul", null, [
                c("li", null, "DApp safe : " + f(o(a).isSafe), 1),
                c("li", null, "Provider safe : " + f(o(a).provider.isSafe), 1),
                c("li", null, "Signer safe : " + f(o(a).signer.isSafe), 1),
                c("li", null, "Contracts read safe : " + f(o(a).contracts.areReadSafe), 1),
                c("li", null, "Contracts write safe : " + f(o(a).contracts.areWriteSafe), 1),
                (l(!0), u(v, null, S(o(a).contracts.getAll(), (n, i) => (l(), u("li", null, [
                  $(" contract " + f(i) + " : ", 1),
                  c("ul", null, [
                    c("li", null, "read safe : " + f(n.isReadSafe), 1),
                    c("li", null, "write safe : " + f(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            c("div", null, [
              ie,
              c("ul", null, [
                c("li", null, "dapp : " + f(o(a).status.get()), 1),
                c("li", null, "provider : " + f(o(a).provider.status.get()), 1),
                c("li", null, "signer : " + f(o(a).signer.status.get()), 1),
                c("li", null, "contracts : " + f(o(a).contracts.status.get()), 1),
                (l(!0), u(v, null, S(o(a).contracts.getAll(), (n, i) => (l(), u("li", null, " contract " + f(i) + " : " + f(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, qe = /* @__PURE__ */ q(ce, [["__scopeId", "data-v-8361140f"]]), le = { class: "InputUnits" }, ue = ["placeholder"], de = ["value"], he = {
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
    let s = m(null);
    const n = ["wei", "gwei", "ether"];
    let i = m("wei");
    function d() {
      if (s.value) {
        const h = x.utils.parseUnits(s.value, i.value);
        t("update:modelValue", h);
      }
    }
    return (h, p) => (l(), u("div", le, [
      V(c("input", {
        onInput: d,
        "onUpdate:modelValue": p[0] || (p[0] = (_) => W(s) ? s.value = _ : s = _),
        type: "text",
        placeholder: o(e).placeholder
      }, null, 40, ue), [
        [B, o(s)]
      ]),
      V(c("select", {
        onChange: d,
        "onUpdate:modelValue": p[1] || (p[1] = (_) => W(i) ? i.value = _ : i = _)
      }, [
        (l(), u(v, null, S(n, (_) => c("option", { value: _ }, f(_), 9, de)), 64))
      ], 544), [
        [et, o(i)]
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
    this._state = m(this.states[0]);
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
    return T(this._state);
  }
  getRef() {
    return this._state;
  }
  set(t) {
    if (t = this._formatState(t), !this._isStateValid(t))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${t}`;
    I(this._state, t), console.log(`Status '${this._name}' set to '${T(this._state)}'`);
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
class pe {
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
          this[e] = new G(e);
    this.areReadSafe = k(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = k(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.status.set("INITIALIZED");
  }
  getAll() {
    const t = {};
    for (const [e, s] of Object.entries(this))
      s instanceof G && (t[e] = s);
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
const b = {
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
class fe {
  constructor(t = null) {
    let e = {};
    return t ? e = D({ ...b.style }, { ...t }) : e = b.style, window.addEventListener("load", () => {
      const s = document.getElementsByClassName("ve-app");
      if (s)
        for (const n of s)
          n && n.classList.add(`ve-${e.level}`);
    }), e;
  }
}
class me {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const s = b.networks.find((i) => i.id === e.id), n = D({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const e of b.networks)
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
class ye {
  constructor(t = null) {
    if (this._list = [], t) {
      for (const e of t)
        if (e.id) {
          const s = b.wallets.find((i) => i.id === e.id), n = D({ ...s }, { ...e });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.id), this._list.push(n);
        }
    }
    for (const e of b.wallets)
      this._list.find((n) => n.id === e.id) || (e.available = !1, this._list.push(e));
  }
  async getCurrent() {
    if (a.signer.proxy.ethersInstance) {
      const t = a.provider.connection.url;
      return this.getById(t);
    }
    return null;
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
class _e {
  constructor(t = null) {
    let e = {};
    return t ? e = D({ ...b.defaults }, { ...t }) : e = b.defaults, e;
  }
}
class ve {
  constructor(t = null) {
    this.style = new fe(t ? t.style : null), this.networks = new me(t ? t.networks : null), this.wallets = new ye(t ? t.wallets : null), this.defaults = new _e(t ? t.defaults : null);
  }
}
class U {
  constructor(t = null, e = null, s = null) {
    return this.proxy = {
      _ethersInstance: t && L(t),
      get ethersInstance() {
        return this._ethersInstance;
      },
      set ethersInstance(n) {
        this._ethersInstance = n && L(n);
      },
      extensionInstance: e,
      placeholderInstance: s
    }, new Proxy(this, {
      get: function(n, i, d) {
        if (i === "proxy")
          return n.proxy;
        if (n.proxy.ethersInstance && n.proxy.ethersInstance[i])
          return typeof n.proxy.ethersInstance[i] == "function" ? n.proxy.ethersInstance[i].bind(n.proxy.ethersInstance) : n.proxy.ethersInstance[i];
        if (n.proxy.ethersInstance && n.proxy.extensionInstance && n.proxy.extensionInstance[i])
          return typeof n.proxy.extensionInstance[i] == "function" ? n.proxy.extensionInstance[i].bind(d) : n.proxy.extensionInstance[i];
        if (n.proxy.placeholderInstance && n.proxy.placeholderInstance[i])
          return typeof n.proxy.placeholderInstance[i] == "function" ? n.proxy.placeholderInstance[i].bind(d) : n.proxy.placeholderInstance[i];
      },
      set: function(n, i, d, h) {
        if (n.proxy.ethersInstance && n.proxy.ethersInstance[i])
          return n.proxy.ethersInstance[i] = d, !0;
        if (n.proxy.extensionInstance && n.proxy.extensionInstance[i])
          return n.proxy.extensionInstance[i] = d, !0;
        if (n.proxy.placeholderInstance && n.proxy.placeholderInstance[i])
          return n.proxy.placeholderInstance[i] = d, !0;
        throw "New properties cannot be set on TulipeProxy instances. Please define them in instances constructor firstly.";
      }
    });
  }
}
class we {
}
class Se {
  constructor() {
    this.status = new P("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = k(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this.OnSafe = se;
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
      this.proxy.ethersInstance = new x.providers.Web3Provider(t, "any");
    else {
      const e = a.config.networks.getDefault();
      e && e.defaultRPC && (this.proxy.ethersInstance = new x.providers.JsonRpcProvider(e.defaultRPC));
    }
  }
  _initARS() {
    this.on("network", (t, e) => {
      e && e !== t && window.location.reload();
    }), this.on("error", () => {
      this.status.set("ERROR");
    });
  }
  async _asyncInit() {
    if (await this._initProviderConnection(), !this.proxy.ethersInstance)
      this.status.set("DISCONNECTED");
    else {
      const t = await this.getNetwork();
      let e = await a.config.networks.getById(t.chainId);
      if (e)
        this.status.set("CONNECTED");
      else if (this.status.set("WRONG"), e = a.config.networks.getAll().find((s) => s.id === t.id), !e) {
        const s = {
          name: t.name,
          displayName: nt(t.name),
          id: t.chainId
        };
        console.log(s), a.config.networks.add(s);
      }
      e && e.pollingInterval && (this.pollingInterval = e.pollingInterval), this._initARS();
    }
  }
  async changeNetwork(t) {
    const e = await a.config.wallets.getCurrent();
    e && a.wallets[e.id].changeNetwork(t);
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
class ge extends U {
  constructor(t, e = null, s = null, n = null) {
    s = s || new we(), n = n || new Se(), super(e, s, n), this._asyncInit();
  }
}
class Re {
}
class Ee {
  constructor() {
    this.address = m(null), this.status = new P("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "CONNECTED"
    ]), this.isSafe = k(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this.OnSafe = ne;
  }
  initARS() {
    a.provider.status.watchAny((t) => {
      t === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(t) && this.status.set("NO_PROVIDER");
    }), this.status.watch(["REFUSED", "ERROR"], () => {
      setTimeout(() => {
        this.status.set("DISCONNECTED");
      }, 5e3);
    });
  }
  async _asyncInit() {
    const t = this;
    a.provider.onSafe(async function() {
      for (const e of Object.values(a.wallets))
        await t.connectWallet(e, !0);
    }), this.initARS();
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
        a.signer.proxy.ethersInstance = s, this.address.value = n, a.signer.status.set("CONNECTED");
      } catch {
        if (e === !0)
          a.signer.status.set("DISCONNECTED");
        else {
          this.status.set("REQUESTED");
          try {
            await t.connect(), this.status.set("CONNECTED");
          } catch (n) {
            if (n instanceof j)
              this.status.set("REFUSED");
            else
              throw this.status.set("ERROR"), n;
          }
        }
      }
  }
  disconnectWallet() {
    a.signer.proxy.ethersInstance = null, this.address.value = null, a.signer.status.set("DISCONNECTED");
  }
}
class Ce extends U {
  constructor(t, e = null, s = null, n = null) {
    s = s || new Re(), n = n || new Ee(), super(e, s, n), this._asyncInit();
  }
}
class Ie {
  _watch(t, e, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(t, e, s);
  }
  watch(t, e, s, n = null) {
    const i = this._watch(t, e, s);
    return n ? A(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, i);
    }, n) : A(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, i);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], t, e, i);
  }
  watchRef(t, e, s = null) {
    const n = this._watch(t, e, null);
    return s ? A(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, n);
    }, s) : A(() => {
      a.chainWatchers.contracts[this.address].remove(t, e, n);
    }), a.chainWatchers.contracts[this.address].getRef(t, e);
  }
}
class ke {
  constructor(t) {
    this.name = t, this.status = new P(`contract:${t}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), this.isReadSafe = k(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = k(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.OnReadSafe = O(ae, { contract: this.name }), this.OnWriteSafe = O(re, { contract: this.name });
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
  _updateContract(t, e) {
    if (a.signer.isSafe.value)
      this.proxy.ethersInstance = new x.Contract(t, e, a.signer.proxy.ethersInstance);
    else if (a.provider.isSafe.value)
      this.proxy.ethersInstance = new x.Contract(t, e, a.provider.proxy.ethersInstance);
    else
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`;
  }
  _initARS(t, e) {
    a.provider.status.watchAny((s) => {
      s === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(s) && this.status.set("NO_PROVIDER");
    }), w([a.signer.isSafe], (s, n) => {
      s !== n && (this.proxy.ethersInstance = null, this._updateContract(t, e));
    });
  }
  async _asyncInit() {
    a.provider.onSafe(async function() {
      try {
        const t = await a.config.networks.getCurrent();
        if (t && t.contracts && Object.keys(t.contracts).includes(this.name)) {
          const e = t.contracts[this.name];
          this._updateContract(e.address, e.abi), this._initARS(e.address, e.abi), this.status.set("INITIALIZED");
        } else
          this.status.set("WRONG_PROVIDER");
      } catch (t) {
        throw this.status.set("ERROR"), t;
      }
    }.bind(this));
  }
}
class G extends U {
  constructor(t, e = null, s = null, n = null) {
    s = s || new Ie(), n = n || new ke(t), super(e, s, n), this._asyncInit();
  }
}
class Oe {
}
class be {
  constructor(t, e, s = [], n = { value: 0 }) {
    this.contractName = t, this.methodName = e, this.methodInfos = {}, this.args = m(s), this.txArgs = m(n), this.data = m([]), this.error = m(null), this.call = null, this.status = new P(`tx:${t}:${e}`, [
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
    a.contracts[this.contractName].isReadSafe.value && this._initEthersInstance(), a.contracts[this.contractName].onReadSafe(() => {
      this._initEthersInstance();
    }), this.initARS();
  }
  _initEthersInstance() {
    this.methodInfos = a.contracts[this.contractName].interface.functions[this.methodName], this.methodInfos.inputs.forEach((t) => this.args.value.push(null)), this.methodInfos.outputs.forEach((t) => this.data.value.push(null)), this.proxy.ethersInstance = a.contracts[this.contractName][this.methodName], this.status.set("READY");
  }
  send(t = null, e = null) {
    t = t && t.length > 0 ? t : T(this.args), t ? Array.isArray(t) ? this.call = this.proxy.ethersInstance(...t, e) : this.call = this.proxy.ethersInstance(t, e) : this.call = this.proxy.ethersInstance(e), this.status.set("SENT"), this.methodInfos.constant ? this.call.then((s) => {
      Array.isArray(s) || (s = [s]), I(this.data, s), I(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      I(this.error, s), this.status.set("ERROR");
    }) : this.call.then((s) => s.wait()).then((s) => {
      Array.isArray(s) || (s = [s]), I(this.data, s), I(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      I(this.error, s), this.status.set("ERROR"), console.log(s);
    });
  }
}
class H extends U {
  constructor(t, e, s = [], n = { value: 0 }, i = null, d = null, h = null) {
    d = d || new Oe(), h = h || new be(t, e, s = [], n = { value: 0 }), super(i, d, h), this._asyncInit();
  }
}
class Ne {
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
    Object.keys(this.contracts).includes(t.address) || (this.contracts[t.address] = new xe(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.contracts).includes(t.address) && delete this.contracts[t.address];
  }
  addWalletWatcher(t) {
    Object.keys(this.wallets).includes(t) || (this.wallets[t] = new $e(t));
  }
  removeContractWatcher(t) {
    Object.keys(this.wallets).includes(t) && delete this.wallets[t];
  }
}
class Z {
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
class xe extends Z {
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
      state: m(null),
      dependents: {}
    }, i = !0);
    let d = null;
    s && (d = w(this.sources[n].state, s));
    const h = this._generateDependentUUID();
    return this.sources[n].dependents[h] = d, i && this._updateState(this.sources[n]), h;
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
class $e extends Z {
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
    const d = this._generateDependentUUID();
    return this.sources[n].dependents[d] = i, newSource && this._updateState(this.sources[n]), d;
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
class Y {
  constructor() {
    this.provider = null, this.id = "";
  }
  getProvider() {
    return null;
  }
  async connect() {
    throw `connect() method of ${this.id} wallet is not implemented.`;
  }
}
class j extends Error {
  constructor(t, ...e) {
    super(t, ...e), this.message = `${t} wallet has rejected the connection request.`;
  }
}
class K extends Y {
  constructor() {
    super(), this.id = "metamask", this.provider = this.getProvider();
  }
  getProvider() {
    return window.ethereum;
  }
  async connect() {
    try {
      await this.provider.request({ method: "eth_requestAccounts" });
    } catch (t) {
      throw t.code === 4001 ? j(this.id) : t;
    }
  }
  async addNetwork(t) {
    const e = a.config.networks.getById(t);
    await window.ethereum.request({
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
  async changeNetwork(t) {
    if (a.config.networks.getById(t)) {
      t = x.utils.hexlify(parseInt(t)).toString(), t = x.utils.hexValue(t);
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{
            chainId: t
          }]
        });
      } catch (s) {
        if (s.code === 4902)
          this.addNetwork(t);
        else
          throw s;
      }
    }
  }
}
class De extends Y {
  constructor(t, e = {}) {
    super(), this.id = "coinbase";
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
      throw j(this.id);
    }
  }
}
class Pe extends K {
  constructor() {
    super(), this.id = "binanceChain";
  }
  getProvider() {
    return window.BinanceChain;
  }
  async connect() {
    super.connect.call(this);
  }
}
class We {
  constructor() {
    const t = a.config.wallets.getAvailable();
    for (const e of t) {
      const s = Te[e.id];
      s && (this[e.id] = new s());
    }
  }
}
const Te = {
  metamask: K,
  coinbase: De,
  binanceChain: Pe
};
async function Fe(r, t) {
  const e = t;
  try {
    a.init(e);
  } catch (n) {
    throw a && a.status && a.status.set("ERROR"), n;
  }
  r.config.globalProperties.dapp = a, r.config.globalProperties.rGet = T, r.config.globalProperties.rSet = I, window.dapp = a;
  const s = await import("./index.25897989.mjs");
  r.component("OnDappSafe", s.OnDappSafe), r.component("OnProviderSafe", s.OnProviderSafe), r.component("OnSignerSafe", s.OnSignerSafe), r.component("OnContractsReadSafe", s.OnContractsReadSafe), r.component("OnContractsWriteSafe", s.OnContractsWriteSafe), r.component("OnContractReadSafe", s.OnContractReadSafe), r.component("OnContractWriteSafe", s.OnContractWriteSafe), a.status.set("INITIALIZED");
}
export {
  Ne as ChainWatchersList,
  Me as ConnectWalletButton,
  Ue as ContractInteractor,
  xe as ContractWatcher,
  pe as ContractsList,
  qe as DebugBar,
  Ot as EventInteractor,
  Ct as EventsInteractor,
  he as InputUnits,
  Rt as MethodInteractor,
  dt as MethodsInteractor,
  ae as OnContractReadSafe,
  re as OnContractWriteSafe,
  Le as OnContractsReadSafe,
  Ge as OnContractsWriteSafe,
  ee as OnDappSafe,
  se as OnProviderSafe,
  ne as OnSignerSafe,
  je as SelectNetworkDropdown,
  Be as SelectWalletDropdown,
  P as Status,
  Pt as Transact,
  ve as TulipeConfig,
  G as TulipeContract,
  ge as TulipeProvider,
  U as TulipeProxy,
  Ce as TulipeSigner,
  H as TulipeTransaction,
  j as WalletConnectionRejected,
  $e as WalletWatcher,
  We as WalletsList,
  nt as capitalizeWords,
  a as dapp,
  D as deepMerge,
  Fe as initTulipe,
  M as isObject,
  T as rGet,
  I as rSet,
  at as styleLevelProp,
  Te as wallets
};
