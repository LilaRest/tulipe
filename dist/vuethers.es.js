import { ref as C, markRaw as $, watch as x, openBlock as c, createElementBlock as u, unref as m, toDisplayString as y, createCommentVNode as E, createBlock as j, Suspense as U, withCtx as G, createVNode as F, withAsyncContext as z, Fragment as k, createElementVNode as i, renderList as g, withDirectives as N, vModelDynamic as Y, vModelText as D, vModelSelect as Q, createTextVNode as B } from "vue";
import { ethers as I } from "ethers";
class X extends Object {
  constructor(e, t) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = t, new Proxy(this, {
      get: function(r, s, h) {
        if (Object.keys(r._statefulSource.value).includes(s))
          return r._statefulSource.value[s];
        if (Object.keys(r._statelessSource).includes(s))
          return r._statelessSource[s];
      },
      set: function(r, s, h) {
        if (Object.keys(r._statefulSource.value).includes(s))
          return r._statefulSource.value[s] = h, !0;
        if (Object.keys(r._statelessSource).includes(s))
          return r._statelessSource[s] = h, !0;
        throw `MixedStore object doesn't have any property called '${s}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`;
      }
    });
  }
  add(e, t, r) {
    if (e === "stateful")
      this._statefulSource.value[t] = r;
    else if (e === "stateless")
      this._statelessSource[t] = r;
    else
      throw `The the 'source' argument MixedStore.add() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
  remove(e, t) {
    if (e === "stateful")
      delete this._statefulSource.value[t];
    else if (e === "stateless")
      delete this._statelessSource[t];
    else
      throw `The the 'source' argument MixedStore.remove() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
}
const J = {
  config: {},
  defaults: {},
  networks: {},
  status: {
    add: (a, e) => {
      if (Object.keys(n.status).includes(a))
        throw `You cannot add a new status called '${a}', this name is either reserved by Vuethers or already existing.`;
      n.status[a] = new Re(a, e);
    }
  },
  _watchers: {}
}, Z = C({
  initialized: !1,
  provider: null,
  signer: null,
  contracts: {
    _contracts: [],
    add: (a, e, t) => {
      if (Object.keys(n.contracts).includes(a))
        throw `You cannot add a new contract called '${a}', this name is either reserved by Vuethers or already existing.`;
      let r = null;
      try {
        r = new I.Contract(e, t, n.signer);
      } catch {
        r = new I.Contract(e, t, n.provider);
      }
      n.contracts[a] = $(r), n.contracts._contracts.push(a), x(() => n.signer, () => {
        console.log("refresh signer of " + a);
        try {
          n.contracts[a].connect(n.signer);
        } catch (s) {
          console.log("error while refreshing"), console.log(s), n.contracts[a].connect(n.provider);
        }
      });
    },
    getAll: () => {
      const a = {};
      for (const e of n.contracts._contracts)
        a[e] = n.contracts[e];
      return a;
    }
  }
}), n = new X(J, Z), O = {
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
  defaults: {
    networks: {
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/unknown.svg"
    }
  }
}, ee = { class: "ConnectWalletButton" }, te = {
  key: 1,
  disabled: ""
}, ne = {
  key: 2,
  disabled: ""
}, ae = {
  key: 3,
  disabled: ""
}, se = {
  key: 4,
  disabled: ""
}, re = {
  __name: "_ConnectWalletButton",
  setup(a) {
    return Ne(async function() {
      await H();
    }), (e, t) => (c(), u("div", ee, [
      m(n).status.wallet.is("DISCONNECTED") ? (c(), u("button", {
        key: 0,
        onClick: t[0] || (t[0] = (...r) => m(V) && m(V)(...r))
      }, "Connect Wallet")) : m(n).status.wallet.is("REQUESTED") ? (c(), u("button", te, "Connection requested...")) : m(n).status.wallet.is("REFUSED") ? (c(), u("button", ne, "Connection refused!")) : m(n).status.wallet.is("ERROR") ? (c(), u("button", ae, "Connection error!")) : m(n).status.network.is("WRONG") ? (c(), u("button", se, "Wrong network! (" + y(m(n).networks.current.displayName) + ")", 1)) : m(n).status.wallet.is("CONNECTED") ? (c(), u("button", {
        key: 5,
        onClick: t[1] || (t[1] = (...r) => m(A) && m(A)(...r))
      }, "Disconnect")) : E("", !0)
    ]));
  }
}, Ae = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (e, t) => (c(), j(U, null, {
      default: G(() => [
        F(re)
      ]),
      _: 1
    }));
  }
}, oe = /* @__PURE__ */ B("Functions : "), le = ["onClick"], ie = /* @__PURE__ */ i("br", null, null, -1), ce = { key: 0 }, ue = /* @__PURE__ */ i("small", null, "Inputs :", -1), de = ["onUpdate:modelValue", "type", "placeholder"], he = { key: 0 }, pe = ["onUpdate:modelValue"], me = ["onUpdate:modelValue"], fe = ["value"], be = { key: 1 }, ye = /* @__PURE__ */ i("small", null, "Outputs :", -1), ve = ["onUpdate:modelValue", "placeholder"], we = { key: 2 }, ke = /* @__PURE__ */ B(" Events : "), _e = /* @__PURE__ */ i("p", null, "Logs:", -1), ge = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(a) {
    let e, t;
    const r = a, s = n.contracts[r.contractName], h = ([e, t] = z(() => s.owner()), e = await e, t(), e), f = ["wei", "gwei", "ether"];
    async function R(o, l, d = {}) {
      let w, p, b = null;
      return l ? Array.isArray(l) ? b = o(...l, d) : b = o(l, d) : b = o(d), await b.then((_) => w = _).catch((_) => p = _), { data: w, error: p };
    }
    async function W(o) {
      const l = [];
      for (const b of v.value[o].inputs)
        l.push(b.value);
      const d = {};
      v.value[o].payable && v.value[o].tx.value.value !== "" && (console.log(v.value[o].tx.value.value), d.value = I.utils.parseUnits(v.value[o].tx.value.value, v.value[o].tx.value.unit));
      const { data: w, error: p } = await R(s.functions[o], l, d);
      if (p)
        v.value[o].error = p.reason;
      else
        for (let b = 0; b < w.length; b++)
          v.value[o].outputs[b].value = w[b];
    }
    const v = C({});
    for (const o of Object.values(s.interface.functions)) {
      v.value[o.name] = {
        inputs: [],
        outputs: [],
        error: null,
        payable: o.payable,
        mutability: o.stateMutability === "view" || o.stateMutability === "pure" ? "read" : "write",
        tx: {
          value: {
            value: "",
            unit: "wei"
          }
        }
      };
      for (let l = 0; l < o.inputs.length; l++)
        v.value[o.name].inputs[l] = {
          name: o.inputs[l].name,
          type: o.inputs[l].type,
          value: ""
        };
      for (let l = 0; l < o.outputs.length; l++)
        v.value[o.name].outputs[l] = {
          name: o.outputs[l].name,
          type: o.outputs[l].type,
          value: ""
        };
    }
    async function K(o) {
      S.value[o.event].count += 1;
      let l = `Block ${o.blockNumber} -> {`;
      for (const d of S.value[o.event].inputs)
        l += `${d.name}:${o.args[d.name]}, `;
      l = l.substring(0, l.length - 2) + "}", S.value[o.event].logs.push(l);
    }
    const S = C({});
    for (const o of Object.values(s.interface.events))
      S.value[o.name] = {
        count: 0,
        logs: [],
        inputs: o.inputs
      }, s.on(o, K);
    function L(o) {
      return o.includes("int") ? "number" : "text";
    }
    function M(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function q(o) {
      const l = [];
      return l.push(o.mutability), o.payable && l.push("payable"), l.join(", ");
    }
    return (o, l) => (c(), u(k, null, [
      i("p", null, "Interact with '" + y(a.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + y(m(s).address), 1),
        i("li", null, "Owner : " + y(m(h)), 1),
        i("li", null, [
          oe,
          i("ul", null, [
            (c(!0), u(k, null, g(v.value, (d, w) => (c(), u("li", null, [
              i("button", {
                onClick: (p) => W(w)
              }, y(w), 9, le),
              i("small", null, "(" + y(q(d)) + ")", 1),
              ie,
              Object.keys(d.inputs).length > 0 || d.payable ? (c(), u("div", ce, [
                ue,
                i("ul", null, [
                  (c(!0), u(k, null, g(d.inputs, (p, b) => (c(), u("li", null, [
                    N(i("input", {
                      "onUpdate:modelValue": (_) => p.value = _,
                      type: L(p.type),
                      placeholder: M(p)
                    }, null, 8, de), [
                      [Y, p.value]
                    ])
                  ]))), 256)),
                  d.payable ? (c(), u("li", he, [
                    N(i("input", {
                      "onUpdate:modelValue": (p) => d.tx.value.value = p,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, pe), [
                      [D, d.tx.value.value]
                    ]),
                    N(i("select", {
                      "onUpdate:modelValue": (p) => d.tx.value.unit = p
                    }, [
                      (c(), u(k, null, g(f, (p) => i("option", { value: p }, y(p), 9, fe)), 64))
                    ], 8, me), [
                      [Q, d.tx.value.unit]
                    ])
                  ])) : E("", !0)
                ])
              ])) : E("", !0),
              Object.keys(d.outputs).length > 0 ? (c(), u("div", be, [
                ye,
                i("ul", null, [
                  (c(!0), u(k, null, g(d.outputs, (p, b) => (c(), u("li", null, [
                    N(i("input", {
                      "onUpdate:modelValue": (_) => p.value = _,
                      type: "text",
                      placeholder: M(p),
                      disabled: ""
                    }, null, 8, ve), [
                      [D, p.value]
                    ])
                  ]))), 256))
                ])
              ])) : E("", !0),
              d.error ? (c(), u("p", we, y(d.error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          ke,
          i("ul", null, [
            (c(!0), u(k, null, g(S.value, (d, w) => (c(), u("li", null, [
              i("h3", null, y(w), 1),
              i("p", null, "Count : " + y(d.count), 1),
              _e,
              i("ul", null, [
                (c(!0), u(k, null, g(d.logs, (p) => (c(), u("li", null, y(p), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, je = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    return (t, r) => (c(), j(U, null, {
      default: G(() => [
        F(ge, {
          contractName: e.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, Ee = { class: "SelectNetworkDropdown" }, Ce = {
  key: 0,
  selected: ""
}, Ie = ["src", "alt"], Se = ["onClick"], xe = ["src", "alt"], Ue = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    async function e(s) {
      const h = n.networks.available.find((f) => f.chainId === parseInt(s));
      if (h) {
        s = I.utils.hexlify(parseInt(s)).toString(), s = I.utils.hexValue(s);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: s
            }]
          });
        } catch (R) {
          R.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: s,
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
        const f = await n.provider.getNetwork();
        n.networks.current.chainId !== f.chainId && window.location.reload();
      }
    }
    let t = C(!1);
    function r() {
      t.value = !t.value;
    }
    return (s, h) => (c(), u("div", Ee, [
      i("ul", { onClick: r }, [
        m(n).networks.current ? (c(), u("li", Ce, [
          i("img", {
            width: "40",
            src: m(n).networks.current.icon ? m(n).networks.current.icon : m(n).defaults.networks.icon,
            alt: m(n).networks.current.name + " logo"
          }, null, 8, Ie),
          i("p", null, y(m(n).networks.current.displayName), 1)
        ])) : E("", !0),
        t.value ? (c(!0), u(k, { key: 1 }, g(m(n).networks.available, (f) => (c(), u("li", {
          key: f.chainId,
          onClick: (R) => e(f.chainId)
        }, [
          i("img", {
            width: "40",
            src: f.icon ? f.icon : m(n).defaults.networks.icon,
            alt: f.name + " logo"
          }, null, 8, xe),
          i("p", null, y(f.displayName), 1)
        ], 8, Se))), 128)) : E("", !0)
      ])
    ]));
  }
};
class Re {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const r of t)
      this.states.push(this._formatState(r));
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
  set(e) {
    if (e = this._formatState(e), !this._isStateValid(e))
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
  watch(e) {
    x(this._state, () => {
      e(this.get());
    });
  }
  watchState(e, t) {
    if (!this._isStateValid(e))
      throw `The state given to the watchState() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    x(this._state, (r, s) => {
      this.is(e) && t(this.get());
    });
  }
  watchStates(e, t) {
    if (!this._areStatesValid(e))
      throw `The states given to the watchStates() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
    x(this._state, () => {
      this.isIn(e) && t(this.get());
    });
  }
}
function Ne(a, e) {
  if (n.initialized)
    a();
  else {
    const t = x(() => n.initialized, () => {
      a(), t();
    });
  }
}
class Pe {
  constructor(e) {
    this.contract = e, this.dependents = {};
  }
  async update() {
    for (const [e, t] of Object.entries(this.dependents))
      for (const [r, s] of Object.entries(t)) {
        const h = s.value.value;
        s.value.value = await this.contract[e](...s.args);
        for (const f of s.callbacks)
          f(s.value.value, h);
      }
  }
  add(e, t, r) {
    Object.keys(this.dependents).includes(e) || (this.dependents[e] = {}), Object.keys(this.dependents[e]).includes(t.toString()) || (this.dependents[e][t.toString()] = {
      callbacks: [],
      args: t,
      value: C(null)
    }), this.dependents[e][t.toString()].callbacks.push(r);
  }
}
function Ge(a, e, t, r) {
  Object.keys(n._watchers).includes(a.address) || (n._watchers[a.address] = new Pe(a)), n._watchers[a.address].add(e, t, r);
}
async function H() {
  try {
    return await dapp.signer.getAddress(), dapp.status.wallet.set("CONNECTED"), !0;
  } catch {
    return !1;
  }
}
async function V() {
  if (!await H())
    try {
      dapp.status.wallet.set("REQUESTED"), await dapp.provider.send("eth_requestAccounts", []), dapp.signer = dapp.provider.getSigner(), dapp.status.wallet.set("CONNECTED");
    } catch (a) {
      console.log(a), a.code === 4001 ? dapp.status.wallet.set("REFUSED") : dapp.status.wallet.set("ERROR");
    }
}
function A() {
  dapp.status.wallet.set("DISCONNECTED");
}
function Oe(a) {
  const e = a.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
function T(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function P(a, ...e) {
  if (!e.length)
    return a;
  const t = e.shift();
  if (T(a) && T(t))
    for (const r in t)
      T(t[r]) ? (a[r] || Object.assign(a, {
        [r]: {}
      }), P(a[r], t[r])) : Object.assign(a, {
        [r]: t[r]
      });
  return P(a, ...e);
}
async function Te() {
  n.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "CONNECTED"
  ]), n.status.add("network", [
    "OK",
    "WRONG",
    "ERROR"
  ]), n.status.wallet.watchStates(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      n.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function $e() {
  n.provider = $(new I.providers.Web3Provider(window.ethereum, "any")), n.provider.on("network", (a, e) => {
    e && e !== a && window.location.reload();
  }), n.provider.on("error", () => {
    console.log("Provider error !"), n.status.network.set("ERROR");
  }), n.provider.on("block", async function(a) {
    console.log("new block"), console.log(a);
    const e = await n.provider.getBlockWithTransactions(a);
    for (const t of e.transactions)
      Object.keys(n._watchers).includes(t.to) && n._watchers[t.to].update();
    console.log(e);
  });
}
async function Me() {
  n.signer = $(n.provider.getSigner());
}
async function Fe(a, e) {
  console.log(a), a.config.globalProperties.dapp = n, await Te(), await $e(), await Me();
  const t = await n.provider.getNetwork();
  if (e) {
    const r = P({ ...O }, { ...e });
    r.networks = [];
    for (let s of e.networks)
      if (s.chainId) {
        const h = O.networks.find((f) => f.chainId === s.chainId);
        s = P({ ...h }, { ...s }), s.displayName || (s.displayName = s.name), r.networks.push(s);
      }
    if (n.defaults = r.defaults, r.networks)
      if (n.networks = {
        available: r.networks.filter((s) => s.chainId !== t.chainId),
        current: r.networks.find((s) => s.chainId === t.chainId),
        known: O.networks
      }, n.networks.current && n.networks.current.contracts)
        for (const [s, h] of Object.entries(n.networks.current.contracts))
          n.contracts.add(s, h.address, h.abi);
      else {
        const s = n.networks.known.find((h) => h.chainId === t.chainId);
        s ? n.networks.current = s : (n.networks.current = t, n.networks.current.displayName = Oe(n.networks.current.name)), n.status.network.set("WRONG");
      }
  }
  n.initialized = !0;
}
export {
  Ae as ConnectWalletButton,
  je as ContractInteractor,
  Ue as SelectNetworkDropdown,
  Re as Status,
  V as connectWallet,
  n as dapp,
  A as disconnectWallet,
  Fe as initVuethers,
  H as isConnected,
  Ne as safeRun,
  Ge as watchChain
};
