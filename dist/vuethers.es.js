import { ref as I, withAsyncContext as A, openBlock as c, createElementBlock as d, unref as b, toDisplayString as y, createCommentVNode as x, createBlock as U, Suspense as G, withCtx as F, createVNode as B, Fragment as _, createElementVNode as p, renderList as g, withDirectives as N, vModelDynamic as L, vModelText as V, vModelSelect as K, createTextVNode as H, watch as O, markRaw as T } from "vue";
import { ethers as S } from "ethers";
class q extends Object {
  constructor(e, t, u) {
    super(), super.constructor(), this._items = e, this._statelessSource = t, this._statefulSource = u;
    for (const [s, n] of Object.entries(e))
      if (!["stateless", "stateful"].includes(n))
        throw `Mixed stores items must have 'stateless' or 'stateful' as value. Got; ${n} for item '${s}'`;
    return new Proxy(this, {
      get: function(s, n, l) {
        if (Object.keys(s._items).includes(n)) {
          const f = s._items[n];
          if (f === "stateless")
            return s._statelessSource[n];
          if (f === "stateful")
            return s._statefulSource[n];
        }
      },
      set: function(s, n, l) {
        if (Object.keys(s._items).includes(n)) {
          const f = s._items[n];
          f === "stateless" ? s._statelessSource[n] = l : f === "stateful" && (s._statefulSource[n] = l);
        }
        return !0;
      }
    });
  }
}
const Q = {
  config: {},
  status: {
    add: (r, e) => {
      if (Object.keys(o.status).includes(r))
        throw `You cannot add a new status called '${r}', this name is either reserved by Vuethers or already existing.`;
      o.status[r] = new ve(r, e);
    }
  }
}, Y = I({
  provider: null,
  signer: null,
  contracts: {}
}), o = new q({
  config: "stateless",
  status: "stateless",
  networks: "stateless",
  defaults: "stateless",
  provider: "stateful",
  signer: "stateful",
  contracts: "stateful"
}, Q, Y.value), $ = {
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
}, X = { class: "ConnectWalletButton" }, z = {
  key: 1,
  disabled: ""
}, J = {
  key: 2,
  disabled: ""
}, Z = {
  key: 3,
  disabled: ""
}, ee = {
  key: 4,
  disabled: ""
}, te = {
  __name: "_ConnectWalletButton",
  async setup(r) {
    let e, t;
    async function u() {
      try {
        return await o.signer.getAddress(), o.status.wallet.set("CONNECTED"), !0;
      } catch {
        return !1;
      }
    }
    [e, t] = A(() => u()), await e, t();
    async function s() {
      if (!await u())
        try {
          o.status.wallet.set("REQUESTED"), await o.provider.send("eth_requestAccounts", []), o.signer = o.provider.getSigner(), o.status.wallet.set("CONNECTED");
          for (const [l, f] of Object.entries(o.contracts))
            o.contracts[l] = await f.connect(o.signer);
        } catch (l) {
          l.code === 4001 ? o.status.wallet.set("REFUSED") : o.status.wallet.set("ERROR");
        }
    }
    function n() {
      o.status.wallet.set("DISCONNECTED");
    }
    return (l, f) => (c(), d("div", X, [
      b(o).status.wallet.is("DISCONNECTED") ? (c(), d("button", {
        key: 0,
        onClick: s
      }, "Connect Wallet")) : b(o).status.wallet.is("REQUESTED") ? (c(), d("button", z, "Connection requested...")) : b(o).status.wallet.is("REFUSED") ? (c(), d("button", J, "Connection refused!")) : b(o).status.wallet.is("ERROR") ? (c(), d("button", Z, "Connection error!")) : b(o).status.network.is("WRONG") ? (c(), d("button", ee, "Wrong network! (" + y(b(o).networks.current.displayName) + ")", 1)) : b(o).status.wallet.is("CONNECTED") ? (c(), d("button", {
        key: 5,
        onClick: n
      }, "Disconnect")) : x("", !0)
    ]));
  }
}, Ie = {
  __name: "ConnectWalletButton",
  setup(r) {
    return (e, t) => (c(), U(G, null, {
      default: F(() => [
        B(te)
      ]),
      _: 1
    }));
  }
}, ne = /* @__PURE__ */ H("Functions : "), ae = ["onClick"], se = ["onUpdate:modelValue", "type", "placeholder"], re = { key: 0 }, oe = ["onUpdate:modelValue"], le = ["onUpdate:modelValue"], ce = ["value"], ie = ["onUpdate:modelValue", "placeholder"], ue = { key: 1 }, de = /* @__PURE__ */ H(" Events : "), me = /* @__PURE__ */ p("p", null, "Logs:", -1), he = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(r) {
    let e, t;
    const u = r, s = o.contracts[u.contractName];
    console.log(s.interface);
    const n = ([e, t] = A(() => s.owner()), e = await e, t(), e), l = ["wei", "gwei", "ether"];
    async function f(a, i, m = {}) {
      let k, h, w = null;
      return i ? Array.isArray(i) ? w = a(...i, m) : w = a(i, m) : w = a(m), await w.then((E) => k = E).catch((E) => h = E), { data: k, error: h };
    }
    async function P(a) {
      const i = [];
      for (const w of v.value[a].inputs)
        i.push(w.value);
      const m = {};
      v.value[a].payable && v.value[a].tx.value != "" && (m.value = S.utils.parseUnits(v.value[a].tx.value.value, v.value[a].tx.value.unit));
      const { data: k, error: h } = await f(s.functions[a], i, m);
      if (h)
        v.value[a].error = h.reason;
      else
        for (let w = 0; w < k.length; w++)
          v.value[a].outputs[w].value = k[w];
    }
    const v = I({});
    for (const a of Object.values(s.interface.functions)) {
      v.value[a.name] = {
        inputs: [],
        outputs: [],
        error: null,
        constant: a.constant,
        payable: a.payable,
        tx: {
          value: {
            value: "",
            unit: "wei"
          }
        }
      };
      for (let i = 0; i < a.inputs.length; i++)
        v.value[a.name].inputs[i] = {
          name: a.inputs[i].name,
          type: a.inputs[i].type,
          value: ""
        };
      for (let i = 0; i < a.outputs.length; i++)
        v.value[a.name].outputs[i] = {
          name: a.outputs[i].name,
          type: a.outputs[i].type,
          value: ""
        };
    }
    async function j(a) {
      C.value[a.event].count += 1;
      let i = `Block ${a.blockNumber} -> {`;
      for (const m of C.value[a.event].inputs)
        i += `${m.name}:${a.args[m.name]}, `;
      i = i.substring(0, i.length - 2) + "}", C.value[a.event].logs.push(i);
    }
    const C = I({});
    for (const a of Object.values(s.interface.events))
      C.value[a.name] = {
        count: 0,
        logs: [],
        inputs: a.inputs
      }, s.on(a, j);
    function W(a) {
      return a.includes("int") ? "number" : "text";
    }
    function D(a) {
      return `${a.name && a.name !== "null" ? a.name : "unnamed"} (${a.type})`;
    }
    return (a, i) => (c(), d(_, null, [
      p("p", null, "Interact with '" + y(r.contractName) + "' contract :", 1),
      p("ul", null, [
        p("li", null, "Address : " + y(b(s).address), 1),
        p("li", null, "Owner : " + y(b(n)), 1),
        p("li", null, [
          ne,
          p("ul", null, [
            (c(!0), d(_, null, g(v.value, (m, k) => (c(), d("li", null, [
              p("button", {
                onClick: (h) => P(k)
              }, y(k) + " (" + y(m.constant ? "read-only" : "") + y(m.payable ? ", payable" : "") + ")", 9, ae),
              (c(!0), d(_, null, g(m.inputs, (h, w) => N((c(), d("input", {
                "onUpdate:modelValue": (E) => h.value = E,
                type: W(h.type),
                placeholder: D(h)
              }, null, 8, se)), [
                [L, h.value]
              ])), 256)),
              m.payable ? (c(), d("span", re, [
                N(p("input", {
                  "onUpdate:modelValue": (h) => m.tx.value.value = h,
                  type: "text",
                  placeholder: "TX value"
                }, null, 8, oe), [
                  [V, m.tx.value.value]
                ]),
                N(p("select", {
                  "onUpdate:modelValue": (h) => m.tx.value.unit = h
                }, [
                  (c(), d(_, null, g(l, (h) => p("option", { value: h }, y(h), 9, ce)), 64))
                ], 8, le), [
                  [K, m.tx.value.unit]
                ])
              ])) : x("", !0),
              (c(!0), d(_, null, g(m.outputs, (h, w) => N((c(), d("input", {
                "onUpdate:modelValue": (E) => h.value = E,
                type: "text",
                placeholder: D(h),
                disabled: ""
              }, null, 8, ie)), [
                [V, h.value]
              ])), 256)),
              m.error ? (c(), d("p", ue, y(m.error), 1)) : x("", !0)
            ]))), 256))
          ])
        ]),
        p("li", null, [
          de,
          p("ul", null, [
            (c(!0), d(_, null, g(C.value, (m, k) => (c(), d("li", null, [
              p("h3", null, y(k), 1),
              p("p", null, "Count : " + y(m.count), 1),
              me,
              p("ul", null, [
                (c(!0), d(_, null, g(m.logs, (h) => (c(), d("li", null, y(h), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, xe = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, u) => (c(), U(G, null, {
      default: F(() => [
        B(he, {
          contractName: e.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, pe = { class: "SelectNetworkDropdown" }, fe = {
  key: 0,
  selected: ""
}, be = ["src", "alt"], ye = ["onClick"], we = ["src", "alt"], Se = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    async function e(s) {
      const n = o.networks.available.find((l) => l.chainId === parseInt(s));
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
        const l = await o.provider.getNetwork();
        o.networks.current.chainId !== l.chainId && window.location.reload();
      }
    }
    let t = I(!1);
    function u() {
      t.value = !t.value;
    }
    return (s, n) => (c(), d("div", pe, [
      p("ul", { onClick: u }, [
        b(o).networks.current ? (c(), d("li", fe, [
          p("img", {
            width: "40",
            src: b(o).networks.current.icon ? b(o).networks.current.icon : b(o).defaults.networks.icon,
            alt: b(o).networks.current.name + " logo"
          }, null, 8, be),
          p("p", null, y(b(o).networks.current.displayName), 1)
        ])) : x("", !0),
        t.value ? (c(!0), d(_, { key: 1 }, g(b(o).networks.available, (l) => (c(), d("li", {
          key: l.chainId,
          onClick: (f) => e(l.chainId)
        }, [
          p("img", {
            width: "40",
            src: l.icon ? l.icon : b(o).defaults.networks.icon,
            alt: l.name + " logo"
          }, null, 8, we),
          p("p", null, y(l.displayName), 1)
        ], 8, ye))), 128)) : x("", !0)
      ])
    ]));
  }
};
class ve {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const u of t)
      this.states.push(this._formatState(u));
    this._state = I(this.states[0]);
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
    O(this._state, (u, s) => {
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
function ke(r) {
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
    for (const u in t)
      M(t[u]) ? (r[u] || Object.assign(r, {
        [u]: {}
      }), R(r[u], t[u])) : Object.assign(r, {
        [u]: t[u]
      });
  return R(r, ...e);
}
async function _e(r) {
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
async function Ee(r) {
  return await _e(o), r.config.globalProperties.dapp = o, o;
}
async function Ne(r, e) {
  const t = await Ee(r);
  t.provider = T(new S.providers.Web3Provider(window.ethereum, "any")), t.signer = T(t.provider.getSigner()), t.provider.on("network", (s, n) => {
    n && n !== s && window.location.reload();
  });
  const u = await t.provider.getNetwork();
  if (e) {
    const s = R({ ...$ }, { ...e });
    s.networks = [];
    for (let n of e.networks)
      if (n.chainId) {
        const l = $.networks.find((f) => f.chainId === n.chainId);
        n = R({ ...l }, { ...n }), n.displayName || (n.displayName = n.name), s.networks.push(n);
      }
    if (t.defaults = s.defaults, s.networks)
      if (t.networks = {
        available: s.networks.filter((n) => n.chainId !== u.chainId),
        current: s.networks.find((n) => n.chainId === u.chainId),
        known: $.networks
      }, t.networks.current && t.networks.current.contracts) {
        let n = !1;
        try {
          await t.signer.getAddress(), n = !0;
        } catch {
        }
        for (const [l, f] of Object.entries(t.networks.current.contracts)) {
          const P = new S.Contract(f.address, f.abi, n ? t.signer : t.provider);
          t.contracts[l] = T(P);
        }
      } else {
        const n = t.networks.known.find((l) => l.chainId === u.chainId);
        n ? t.networks.current = n : (t.networks.current = u, t.networks.current.displayName = ke(t.networks.current.name)), t.status.network.set("WRONG");
      }
  }
}
export {
  Ie as ConnectWalletButton,
  xe as ContractInteractor,
  Se as SelectNetworkDropdown,
  ve as Status,
  o as dapp,
  Ne as initVuethers
};
