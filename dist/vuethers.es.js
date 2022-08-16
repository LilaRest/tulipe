import { ref as C, markRaw as $, watch as P, openBlock as c, createElementBlock as u, unref as m, toDisplayString as y, createCommentVNode as E, Fragment as k, createElementVNode as i, renderList as _, withDirectives as N, vModelDynamic as B, vModelText as A, vModelSelect as W, createTextVNode as U } from "vue";
import { ethers as x } from "ethers";
class K extends Object {
  constructor(e, n) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = n, new Proxy(this, {
      get: function(s, r, h) {
        if (Object.keys(s._statefulSource.value).includes(r))
          return s._statefulSource.value[r];
        if (Object.keys(s._statelessSource).includes(r))
          return s._statelessSource[r];
      },
      set: function(s, r, h) {
        if (Object.keys(s._statefulSource.value).includes(r))
          return s._statefulSource.value[r] = h, !0;
        if (Object.keys(s._statelessSource).includes(r))
          return s._statelessSource[r] = h, !0;
        throw `MixedStore object doesn't have any property called '${r}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`;
      }
    });
  }
  add(e, n, s) {
    if (e === "stateful")
      this._statefulSource.value[n] = s;
    else if (e === "stateless")
      this._statelessSource[n] = s;
    else
      throw `The the 'source' argument MixedStore.add() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
  remove(e, n) {
    if (e === "stateful")
      delete this._statefulSource.value[n];
    else if (e === "stateless")
      delete this._statelessSource[n];
    else
      throw `The the 'source' argument MixedStore.remove() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
}
const L = {
  config: {},
  defaults: {},
  networks: {},
  status: {
    add: (a, e) => {
      if (Object.keys(t.status).includes(a))
        throw `You cannot add a new status called '${a}', this name is either reserved by Vuethers or already existing.`;
      t.status[a] = new ke(a, e);
    }
  },
  _chainWatchers: {
    contracts: {}
  }
}, q = C({
  safe: !1,
  provider: null,
  signer: null,
  contracts: {
    _contracts: [],
    add: (a, e, n) => {
      if (Object.keys(t.contracts).includes(a))
        throw `You cannot add a new contract called '${a}', this name is either reserved by Vuethers or already existing.`;
      let s = null;
      try {
        s = new x.Contract(e, n, t.signer);
      } catch {
        s = new x.Contract(e, n, t.provider);
      }
      t.contracts[a] = $(s), t.contracts._contracts.push(a), P(() => t.signer, () => {
        console.log("refresh signer of " + a);
        try {
          t.contracts[a].connect(t.signer);
        } catch (r) {
          console.log("error while refreshing"), console.log(r), t.contracts[a].connect(t.provider);
        }
      });
    },
    getAll: () => {
      const a = {};
      for (const e of t.contracts._contracts)
        a[e] = t.contracts[e];
      return a;
    }
  }
}), t = new K(L, q), T = {
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
}, Y = { class: "ConnectWalletButton" }, Q = {
  key: 1,
  disabled: ""
}, X = {
  key: 2,
  disabled: ""
}, z = {
  key: 3,
  disabled: ""
}, J = {
  key: 4,
  disabled: ""
}, Re = {
  __name: "ConnectWalletButton",
  setup(a) {
    return F(async function() {
      await G();
    }), (e, n) => (c(), u("div", Y, [
      m(t).status.wallet.is("DISCONNECTED") ? (c(), u("button", {
        key: 0,
        onClick: n[0] || (n[0] = (...s) => m(V) && m(V)(...s))
      }, "Connect Wallet")) : m(t).status.wallet.is("REQUESTED") ? (c(), u("button", Q, "Connection requested...")) : m(t).status.wallet.is("REFUSED") ? (c(), u("button", X, "Connection refused!")) : m(t).status.wallet.is("ERROR") ? (c(), u("button", z, "Connection error!")) : m(t).status.network.is("WRONG") ? (c(), u("button", J, "Wrong network! (" + y(m(t).networks.current.displayName) + ")", 1)) : m(t).status.wallet.is("CONNECTED") ? (c(), u("button", {
        key: 5,
        onClick: n[1] || (n[1] = (...s) => m(j) && m(j)(...s))
      }, "Disconnect")) : E("", !0)
    ]));
  }
}, Z = /* @__PURE__ */ U("Functions : "), ee = ["onClick"], te = /* @__PURE__ */ i("br", null, null, -1), ne = { key: 0 }, ae = /* @__PURE__ */ i("small", null, "Inputs :", -1), se = ["onUpdate:modelValue", "type", "placeholder"], re = { key: 0 }, oe = ["onUpdate:modelValue"], le = ["onUpdate:modelValue"], ie = ["value"], ce = { key: 1 }, ue = /* @__PURE__ */ i("small", null, "Outputs :", -1), de = ["onUpdate:modelValue", "placeholder"], he = { key: 2 }, pe = /* @__PURE__ */ U(" Events : "), me = /* @__PURE__ */ i("p", null, "Logs:", -1), Ne = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    async function n(o, l, d = {}) {
      let w, p, b = null;
      return l ? Array.isArray(l) ? b = o(...l, d) : b = o(l, d) : b = o(d), await b.then((g) => w = g).catch((g) => p = g), { data: w, error: p };
    }
    async function s(o) {
      const l = [];
      for (const b of v.value[o].inputs)
        l.push(b.value);
      const d = {};
      v.value[o].payable && v.value[o].tx.value.value !== "" && (console.log(v.value[o].tx.value.value), d.value = x.utils.parseUnits(v.value[o].tx.value.value, v.value[o].tx.value.unit));
      const { data: w, error: p } = await n(I.functions[o], l, d);
      if (p)
        v.value[o].error = p.reason;
      else
        for (let b = 0; b < w.length; b++)
          v.value[o].outputs[b].value = w[b];
    }
    async function r(o) {
      S.value[o.event].count += 1;
      let l = `Block ${o.blockNumber} -> {`;
      for (const d of S.value[o.event].inputs)
        l += `${d.name}:${o.args[d.name]}, `;
      l = l.substring(0, l.length - 2) + "}", S.value[o.event].logs.push(l);
    }
    function h(o) {
      return o.includes("int") ? "number" : "text";
    }
    function f(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function R(o) {
      const l = [];
      return l.push(o.mutability), o.payable && l.push("payable"), l.join(", ");
    }
    const I = t.contracts[e.contractName];
    let D = C("");
    const H = ["wei", "gwei", "ether"], S = C({}), v = C({});
    return F(async function() {
      D.value = await I.owner();
      for (const o of Object.values(I.interface.functions)) {
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
      for (const o of Object.values(I.interface.events))
        S.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, I.on(o, r);
    }), (o, l) => (c(), u(k, null, [
      i("p", null, "Interact with '" + y(a.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + y(m(I).address), 1),
        i("li", null, "Owner : " + y(D.value), 1),
        i("li", null, [
          Z,
          i("ul", null, [
            (c(!0), u(k, null, _(v.value, (d, w) => (c(), u("li", null, [
              i("button", {
                onClick: (p) => s(w)
              }, y(w), 9, ee),
              i("small", null, "(" + y(R(d)) + ")", 1),
              te,
              Object.keys(d.inputs).length > 0 || d.payable ? (c(), u("div", ne, [
                ae,
                i("ul", null, [
                  (c(!0), u(k, null, _(d.inputs, (p, b) => (c(), u("li", null, [
                    N(i("input", {
                      "onUpdate:modelValue": (g) => p.value = g,
                      type: h(p.type),
                      placeholder: f(p)
                    }, null, 8, se), [
                      [B, p.value]
                    ])
                  ]))), 256)),
                  d.payable ? (c(), u("li", re, [
                    N(i("input", {
                      "onUpdate:modelValue": (p) => d.tx.value.value = p,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, oe), [
                      [A, d.tx.value.value]
                    ]),
                    N(i("select", {
                      "onUpdate:modelValue": (p) => d.tx.value.unit = p
                    }, [
                      (c(), u(k, null, _(H, (p) => i("option", { value: p }, y(p), 9, ie)), 64))
                    ], 8, le), [
                      [W, d.tx.value.unit]
                    ])
                  ])) : E("", !0)
                ])
              ])) : E("", !0),
              Object.keys(d.outputs).length > 0 ? (c(), u("div", ce, [
                ue,
                i("ul", null, [
                  (c(!0), u(k, null, _(d.outputs, (p, b) => (c(), u("li", null, [
                    N(i("input", {
                      "onUpdate:modelValue": (g) => p.value = g,
                      type: "text",
                      placeholder: f(p),
                      disabled: ""
                    }, null, 8, de), [
                      [A, p.value]
                    ])
                  ]))), 256))
                ])
              ])) : E("", !0),
              d.error ? (c(), u("p", he, y(d.error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          pe,
          i("ul", null, [
            (c(!0), u(k, null, _(S.value, (d, w) => (c(), u("li", null, [
              i("h3", null, y(w), 1),
              i("p", null, "Count : " + y(d.count), 1),
              me,
              i("ul", null, [
                (c(!0), u(k, null, _(d.logs, (p) => (c(), u("li", null, y(p), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, fe = { class: "SelectNetworkDropdown" }, be = {
  key: 0,
  selected: ""
}, ye = ["src", "alt"], ve = ["onClick"], we = ["src", "alt"], Pe = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    async function e(r) {
      const h = t.networks.available.find((f) => f.chainId === parseInt(r));
      if (h) {
        r = x.utils.hexlify(parseInt(r)).toString(), r = x.utils.hexValue(r);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: r
            }]
          });
        } catch (R) {
          R.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: r,
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
        const f = await t.provider.getNetwork();
        t.networks.current.chainId !== f.chainId && window.location.reload();
      }
    }
    function n() {
      s.value = !s.value;
    }
    let s = C(!1);
    return (r, h) => (c(), u("div", fe, [
      i("ul", { onClick: n }, [
        m(t).networks.current ? (c(), u("li", be, [
          i("img", {
            width: "40",
            src: m(t).networks.current.icon ? m(t).networks.current.icon : m(t).defaults.networks.icon,
            alt: m(t).networks.current.name + " logo"
          }, null, 8, ye),
          i("p", null, y(m(t).networks.current.displayName), 1)
        ])) : E("", !0),
        s.value ? (c(!0), u(k, { key: 1 }, _(m(t).networks.available, (f) => (c(), u("li", {
          key: f.chainId,
          onClick: (R) => e(f.chainId)
        }, [
          i("img", {
            width: "40",
            src: f.icon ? f.icon : m(t).defaults.networks.icon,
            alt: f.name + " logo"
          }, null, 8, we),
          i("p", null, y(f.displayName), 1)
        ], 8, ve))), 128)) : E("", !0)
      ])
    ]));
  }
};
class ke {
  constructor(e, n) {
    if (this._name = e, this.states = [], !Array.isArray(n))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${n}`;
    for (const s of n)
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
    for (const n of e)
      if (!this._isStateValid(n))
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
    for (const n of e)
      if (this.is(n))
        return !0;
    return !1;
  }
  watch(e, n) {
    let s = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (this.isArray(e)) {
      if (!this._areStatesValid(e))
        throw s;
      P(this._state, () => {
        e.includes(this._state) && n(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      P(this._state, () => {
        e === this._state && n(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
function F(a, e) {
  if (t.safe)
    a();
  else {
    const n = P(() => t.safe, () => {
      a(), n();
    });
  }
}
class ge {
  constructor(e) {
    this.contract = e, this.dependents = {};
  }
  async update() {
    for (const [e, n] of Object.entries(this.dependents))
      for (const [s, r] of Object.entries(n)) {
        const h = r.value.value;
        r.value.value = await this.contract[e](...r.args);
        for (const f of r.callbacks)
          f(r.value.value, h);
      }
  }
  add(e, n, s) {
    Object.keys(this.dependents).includes(e) || (this.dependents[e] = {}), Object.keys(this.dependents[e]).includes(n.toString()) || (this.dependents[e][n.toString()] = {
      callbacks: [],
      args: n,
      value: C(null)
    }), this.dependents[e][n.toString()].callbacks.push(s);
  }
}
function Oe(a, e, n, s) {
  Object.keys(t._watchers).includes(a.address) || (t._watchers[a.address] = new ge(a)), t._watchers[a.address].add(e, n, s);
}
async function G() {
  try {
    return await dapp.signer.getAddress(), dapp.status.wallet.set("CONNECTED"), !0;
  } catch {
    return !1;
  }
}
async function V() {
  if (!await G())
    try {
      dapp.status.wallet.set("REQUESTED"), await dapp.provider.send("eth_requestAccounts", []), dapp.signer = dapp.provider.getSigner(), dapp.status.wallet.set("CONNECTED");
    } catch (a) {
      console.log(a), a.code === 4001 ? dapp.status.wallet.set("REFUSED") : dapp.status.wallet.set("ERROR");
    }
}
function j() {
  dapp.status.wallet.set("DISCONNECTED");
}
function _e(a) {
  const e = a.split(" ");
  for (let n = 0; n < e.length; n++)
    e[n] = e[n][0].toUpperCase() + e[n].substring(1);
  return e.join(" ");
}
function M(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function O(a, ...e) {
  if (!e.length)
    return a;
  const n = e.shift();
  if (M(a) && M(n))
    for (const s in n)
      M(n[s]) ? (a[s] || Object.assign(a, {
        [s]: {}
      }), O(a[s], n[s])) : Object.assign(a, {
        [s]: n[s]
      });
  return O(a, ...e);
}
async function Ee() {
  t.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "CONNECTED"
  ]), t.status.add("network", [
    "OK",
    "WRONG",
    "ERROR"
  ]), t.status.wallet.watchStates(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      t.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function Ce() {
  t.provider = $(new x.providers.Web3Provider(window.ethereum, "any")), t.provider.on("network", (a, e) => {
    e && e !== a && window.location.reload();
  }), t.provider.on("error", () => {
    console.log("Provider error !"), t.status.network.set("ERROR");
  }), t.provider.on("block", async function(a) {
    console.log("new block"), console.log(a);
    const e = await t.provider.getBlockWithTransactions(a);
    for (const n of e.transactions)
      Object.keys(t._watchers).includes(n.to) && t._watchers[n.to].update();
    console.log(e);
  });
}
async function Ie() {
  t.signer = $(t.provider.getSigner());
}
async function Te(a, e) {
  console.log(a), a.config.globalProperties.dapp = t, await Ee(), await Ce(), await Ie();
  const n = await t.provider.getNetwork();
  if (e) {
    const s = O({ ...T }, { ...e });
    s.networks = [];
    for (let r of e.networks)
      if (r.chainId) {
        const h = T.networks.find((f) => f.chainId === r.chainId);
        r = O({ ...h }, { ...r }), r.displayName || (r.displayName = r.name), s.networks.push(r);
      }
    if (t.defaults = s.defaults, s.networks)
      if (t.networks = {
        available: s.networks.filter((r) => r.chainId !== n.chainId),
        current: s.networks.find((r) => r.chainId === n.chainId),
        known: T.networks
      }, t.networks.current && t.networks.current.contracts)
        for (const [r, h] of Object.entries(t.networks.current.contracts))
          t.contracts.add(r, h.address, h.abi);
      else {
        const r = t.networks.known.find((h) => h.chainId === n.chainId);
        r ? t.networks.current = r : (t.networks.current = n, t.networks.current.displayName = _e(t.networks.current.name)), t.status.network.set("WRONG");
      }
  }
  t.safe = !0;
}
export {
  Re as ConnectWalletButton,
  Ne as ContractInteractor,
  Pe as SelectNetworkDropdown,
  ke as Status,
  V as connectWallet,
  t as dapp,
  j as disconnectWallet,
  Te as initVuethers,
  G as isConnected,
  F as safeRun,
  Oe as watchChain
};
