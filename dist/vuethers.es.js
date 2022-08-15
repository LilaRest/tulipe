import { ref as x, withAsyncContext as A, openBlock as c, createElementBlock as d, unref as b, toDisplayString as w, createCommentVNode as C, createBlock as U, Suspense as F, withCtx as G, createVNode as j, Fragment as _, createElementVNode as i, renderList as E, withDirectives as N, vModelDynamic as L, vModelText as V, vModelSelect as q, createTextVNode as B, watch as O, markRaw as T } from "vue";
import { ethers as S } from "ethers";
class Q extends Object {
  constructor(e, t, h) {
    super(), super.constructor(), this._items = e, this._statelessSource = t, this._statefulSource = h;
    for (const [s, n] of Object.entries(e))
      if (!["stateless", "stateful"].includes(n))
        throw `Mixed stores items must have 'stateless' or 'stateful' as value. Got; ${n} for item '${s}'`;
    return new Proxy(this, {
      get: function(s, n, u) {
        if (Object.keys(s._items).includes(n)) {
          const f = s._items[n];
          if (f === "stateless")
            return s._statelessSource[n];
          if (f === "stateful")
            return s._statefulSource[n];
        }
      },
      set: function(s, n, u) {
        if (Object.keys(s._items).includes(n)) {
          const f = s._items[n];
          f === "stateless" ? s._statelessSource[n] = u : f === "stateful" && (s._statefulSource[n] = u);
        }
        return !0;
      }
    });
  }
}
const Y = {
  config: {},
  status: {
    add: (r, e) => {
      if (Object.keys(o.status).includes(r))
        throw `You cannot add a new status called '${r}', this name is either reserved by Vuethers or already existing.`;
      o.status[r] = new Ie(r, e);
    }
  }
}, X = x({
  provider: null,
  signer: null,
  contracts: {}
}), o = new Q({
  config: "stateless",
  status: "stateless",
  networks: "stateless",
  defaults: "stateless",
  provider: "stateful",
  signer: "stateful",
  contracts: "stateful"
}, Y, X.value), $ = {
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
}, z = { class: "ConnectWalletButton" }, J = {
  key: 1,
  disabled: ""
}, Z = {
  key: 2,
  disabled: ""
}, ee = {
  key: 3,
  disabled: ""
}, te = {
  key: 4,
  disabled: ""
}, ne = {
  __name: "_ConnectWalletButton",
  async setup(r) {
    let e, t;
    async function h() {
      try {
        return await o.signer.getAddress(), o.status.wallet.set("CONNECTED"), !0;
      } catch {
        return !1;
      }
    }
    [e, t] = A(() => h()), await e, t();
    async function s() {
      if (!await h())
        try {
          o.status.wallet.set("REQUESTED"), await o.provider.send("eth_requestAccounts", []), o.signer = o.provider.getSigner(), o.status.wallet.set("CONNECTED");
          for (const [u, f] of Object.entries(o.contracts))
            o.contracts[u] = await f.connect(o.signer);
        } catch (u) {
          u.code === 4001 ? o.status.wallet.set("REFUSED") : o.status.wallet.set("ERROR");
        }
    }
    function n() {
      o.status.wallet.set("DISCONNECTED");
    }
    return (u, f) => (c(), d("div", z, [
      b(o).status.wallet.is("DISCONNECTED") ? (c(), d("button", {
        key: 0,
        onClick: s
      }, "Connect Wallet")) : b(o).status.wallet.is("REQUESTED") ? (c(), d("button", J, "Connection requested...")) : b(o).status.wallet.is("REFUSED") ? (c(), d("button", Z, "Connection refused!")) : b(o).status.wallet.is("ERROR") ? (c(), d("button", ee, "Connection error!")) : b(o).status.network.is("WRONG") ? (c(), d("button", te, "Wrong network! (" + w(b(o).networks.current.displayName) + ")", 1)) : b(o).status.wallet.is("CONNECTED") ? (c(), d("button", {
        key: 5,
        onClick: n
      }, "Disconnect")) : C("", !0)
    ]));
  }
}, Oe = {
  __name: "ConnectWalletButton",
  setup(r) {
    return (e, t) => (c(), U(F, null, {
      default: G(() => [
        j(ne)
      ]),
      _: 1
    }));
  }
}, ae = /* @__PURE__ */ B("Functions : "), se = ["onClick"], re = /* @__PURE__ */ i("br", null, null, -1), oe = { key: 0 }, le = /* @__PURE__ */ i("small", null, "Inputs :", -1), ie = ["onUpdate:modelValue", "type", "placeholder"], ce = { key: 0 }, ue = ["onUpdate:modelValue"], de = ["onUpdate:modelValue"], me = ["value"], he = { key: 1 }, pe = /* @__PURE__ */ i("small", null, "Outputs :", -1), fe = ["onUpdate:modelValue", "placeholder"], be = { key: 2 }, ye = /* @__PURE__ */ B(" Events : "), we = /* @__PURE__ */ i("p", null, "Logs:", -1), ve = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(r) {
    let e, t;
    const h = r, s = o.contracts[h.contractName];
    console.log(s.interface);
    const n = ([e, t] = A(() => s.owner()), e = await e, t(), e), u = ["wei", "gwei", "ether"];
    async function f(a, l, m = {}) {
      let k, p, y = null;
      return l ? Array.isArray(l) ? y = a(...l, m) : y = a(l, m) : y = a(m), await y.then((g) => k = g).catch((g) => p = g), { data: k, error: p };
    }
    async function P(a) {
      const l = [];
      for (const y of v.value[a].inputs)
        l.push(y.value);
      const m = {};
      v.value[a].payable && v.value[a].tx.value != "" && (m.value = S.utils.parseUnits(v.value[a].tx.value.value, v.value[a].tx.value.unit));
      const { data: k, error: p } = await f(s.functions[a], l, m);
      if (p)
        v.value[a].error = p.reason;
      else
        for (let y = 0; y < k.length; y++)
          v.value[a].outputs[y].value = k[y];
    }
    const v = x({});
    for (const a of Object.values(s.interface.functions)) {
      v.value[a.name] = {
        inputs: [],
        outputs: [],
        error: null,
        payable: a.payable,
        mutability: a.stateMutability === "view" || a.stateMutability === "pure" ? "read" : "write",
        tx: {
          value: {
            value: "",
            unit: "wei"
          }
        }
      }, console.log(a);
      for (let l = 0; l < a.inputs.length; l++)
        v.value[a.name].inputs[l] = {
          name: a.inputs[l].name,
          type: a.inputs[l].type,
          value: ""
        };
      for (let l = 0; l < a.outputs.length; l++)
        v.value[a.name].outputs[l] = {
          name: a.outputs[l].name,
          type: a.outputs[l].type,
          value: ""
        };
    }
    async function H(a) {
      I.value[a.event].count += 1;
      let l = `Block ${a.blockNumber} -> {`;
      for (const m of I.value[a.event].inputs)
        l += `${m.name}:${a.args[m.name]}, `;
      l = l.substring(0, l.length - 2) + "}", I.value[a.event].logs.push(l);
    }
    const I = x({});
    for (const a of Object.values(s.interface.events))
      I.value[a.name] = {
        count: 0,
        logs: [],
        inputs: a.inputs
      }, s.on(a, H);
    function W(a) {
      return a.includes("int") ? "number" : "text";
    }
    function D(a) {
      return `${a.name && a.name !== "null" ? a.name : "unnamed"} (${a.type})`;
    }
    function K(a) {
      const l = [];
      return l.push(a.mutability), a.payable && l.push("payable"), l.join(", ");
    }
    return (a, l) => (c(), d(_, null, [
      i("p", null, "Interact with '" + w(r.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + w(b(s).address), 1),
        i("li", null, "Owner : " + w(b(n)), 1),
        i("li", null, [
          ae,
          i("ul", null, [
            (c(!0), d(_, null, E(v.value, (m, k) => (c(), d("li", null, [
              i("button", {
                onClick: (p) => P(k)
              }, w(k), 9, se),
              i("small", null, "(" + w(K(m)) + ")", 1),
              re,
              Object.keys(m.inputs).length > 0 || m.payable ? (c(), d("div", oe, [
                le,
                i("ul", null, [
                  (c(!0), d(_, null, E(m.inputs, (p, y) => (c(), d("li", null, [
                    N(i("input", {
                      "onUpdate:modelValue": (g) => p.value = g,
                      type: W(p.type),
                      placeholder: D(p)
                    }, null, 8, ie), [
                      [L, p.value]
                    ])
                  ]))), 256)),
                  m.payable ? (c(), d("li", ce, [
                    N(i("input", {
                      "onUpdate:modelValue": (p) => m.tx.value.value = p,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, ue), [
                      [V, m.tx.value.value]
                    ]),
                    N(i("select", {
                      "onUpdate:modelValue": (p) => m.tx.value.unit = p
                    }, [
                      (c(), d(_, null, E(u, (p) => i("option", { value: p }, w(p), 9, me)), 64))
                    ], 8, de), [
                      [q, m.tx.value.unit]
                    ])
                  ])) : C("", !0)
                ])
              ])) : C("", !0),
              Object.keys(m.outputs).length > 0 ? (c(), d("div", he, [
                pe,
                i("ul", null, [
                  (c(!0), d(_, null, E(m.outputs, (p, y) => (c(), d("li", null, [
                    N(i("input", {
                      "onUpdate:modelValue": (g) => p.value = g,
                      type: "text",
                      placeholder: D(p),
                      disabled: ""
                    }, null, 8, fe), [
                      [V, p.value]
                    ])
                  ]))), 256))
                ])
              ])) : C("", !0),
              m.error ? (c(), d("p", be, w(m.error), 1)) : C("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          ye,
          i("ul", null, [
            (c(!0), d(_, null, E(I.value, (m, k) => (c(), d("li", null, [
              i("h3", null, w(k), 1),
              i("p", null, "Count : " + w(m.count), 1),
              we,
              i("ul", null, [
                (c(!0), d(_, null, E(m.logs, (p) => (c(), d("li", null, w(p), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, Te = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, h) => (c(), U(F, null, {
      default: G(() => [
        j(ve, {
          contractName: e.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, ke = { class: "SelectNetworkDropdown" }, _e = {
  key: 0,
  selected: ""
}, ge = ["src", "alt"], Ee = ["onClick"], Ce = ["src", "alt"], $e = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    async function e(s) {
      const n = o.networks.available.find((u) => u.chainId === parseInt(s));
      if (n) {
        s = S.utils.hexlify(parseInt(s)).toString(), s = S.utils.hexValue(s);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: s
            }]
          });
        } catch (f) {
          f.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: s,
              rpcUrls: [n.defaultRPC],
              chainName: n.name,
              nativeCurrency: {
                name: n.currency.symbol,
                symbol: n.currency.symbol,
                decimals: n.currency.decimals
              },
              blockExplorerUrls: n.explorer && n.explorer.url !== "" ? [n.explorer.url] : null
            }]
          });
        }
        const u = await o.provider.getNetwork();
        o.networks.current.chainId !== u.chainId && window.location.reload();
      }
    }
    let t = x(!1);
    function h() {
      t.value = !t.value;
    }
    return (s, n) => (c(), d("div", ke, [
      i("ul", { onClick: h }, [
        b(o).networks.current ? (c(), d("li", _e, [
          i("img", {
            width: "40",
            src: b(o).networks.current.icon ? b(o).networks.current.icon : b(o).defaults.networks.icon,
            alt: b(o).networks.current.name + " logo"
          }, null, 8, ge),
          i("p", null, w(b(o).networks.current.displayName), 1)
        ])) : C("", !0),
        t.value ? (c(!0), d(_, { key: 1 }, E(b(o).networks.available, (u) => (c(), d("li", {
          key: u.chainId,
          onClick: (f) => e(u.chainId)
        }, [
          i("img", {
            width: "40",
            src: u.icon ? u.icon : b(o).defaults.networks.icon,
            alt: u.name + " logo"
          }, null, 8, Ce),
          i("p", null, w(u.displayName), 1)
        ], 8, Ee))), 128)) : C("", !0)
      ])
    ]));
  }
};
class Ie {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const h of t)
      this.states.push(this._formatState(h));
    this._state = x(this.states[0]);
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
    O(this._state, () => {
      e(this.get());
    });
  }
  watchState(e, t) {
    if (!this._isStateValid(e))
      throw `The state given to the watchState() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    O(this._state, (h, s) => {
      this.is(e) && t(this.get());
    });
  }
  watchStates(e, t) {
    if (!this._areStatesValid(e))
      throw `The states given to the watchStates() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
    O(this._state, () => {
      this.isIn(e) && t(this.get());
    });
  }
}
function xe(r) {
  const e = r.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
function M(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function R(r, ...e) {
  if (!e.length)
    return r;
  const t = e.shift();
  if (M(r) && M(t))
    for (const h in t)
      M(t[h]) ? (r[h] || Object.assign(r, {
        [h]: {}
      }), R(r[h], t[h])) : Object.assign(r, {
        [h]: t[h]
      });
  return R(r, ...e);
}
async function Se(r) {
  r.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "CONNECTED"
  ]), r.status.add("network", [
    "OK",
    "WRONG",
    "ERROR"
  ]), r.status.wallet.watchStates(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      r.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function Ne(r) {
  return await Se(o), r.config.globalProperties.dapp = o, o;
}
async function Me(r, e) {
  const t = await Ne(r);
  t.provider = T(new S.providers.Web3Provider(window.ethereum, "any")), t.signer = T(t.provider.getSigner()), t.provider.on("network", (s, n) => {
    n && n !== s && window.location.reload();
  });
  const h = await t.provider.getNetwork();
  if (e) {
    const s = R({ ...$ }, { ...e });
    s.networks = [];
    for (let n of e.networks)
      if (n.chainId) {
        const u = $.networks.find((f) => f.chainId === n.chainId);
        n = R({ ...u }, { ...n }), n.displayName || (n.displayName = n.name), s.networks.push(n);
      }
    if (t.defaults = s.defaults, s.networks)
      if (t.networks = {
        available: s.networks.filter((n) => n.chainId !== h.chainId),
        current: s.networks.find((n) => n.chainId === h.chainId),
        known: $.networks
      }, t.networks.current && t.networks.current.contracts) {
        let n = !1;
        try {
          await t.signer.getAddress(), n = !0;
        } catch {
        }
        for (const [u, f] of Object.entries(t.networks.current.contracts)) {
          const P = new S.Contract(f.address, f.abi, n ? t.signer : t.provider);
          t.contracts[u] = T(P);
        }
      } else {
        const n = t.networks.known.find((u) => u.chainId === h.chainId);
        n ? t.networks.current = n : (t.networks.current = h, t.networks.current.displayName = xe(t.networks.current.name)), t.status.network.set("WRONG");
      }
  }
}
export {
  Oe as ConnectWalletButton,
  Te as ContractInteractor,
  $e as SelectNetworkDropdown,
  Ie as Status,
  o as dapp,
  Me as initVuethers
};
