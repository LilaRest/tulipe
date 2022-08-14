import { ref as E, withAsyncContext as M, openBlock as l, createElementBlock as d, unref as p, toDisplayString as b, createCommentVNode as C, createBlock as D, Suspense as A, withCtx as V, createVNode as G, Fragment as w, createElementVNode as m, renderList as k, withDirectives as $, vModelDynamic as H, vModelText as U, createTextVNode as F, watch as R, markRaw as P } from "vue";
import { ethers as I } from "ethers";
class j extends Object {
  constructor(e, t, i) {
    super(), super.constructor(), this._items = e, this._statelessSource = t, this._statefulSource = i;
    for (const [s, n] of Object.entries(e))
      if (!["stateless", "stateful"].includes(n))
        throw `Mixed stores items must have 'stateless' or 'stateful' as value. Got; ${n} for item '${s}'`;
    return new Proxy(this, {
      get: function(s, n, o) {
        if (Object.keys(s._items).includes(n)) {
          const u = s._items[n];
          if (u === "stateless")
            return s._statelessSource[n];
          if (u === "stateful")
            return s._statefulSource[n];
        }
      },
      set: function(s, n, o) {
        if (Object.keys(s._items).includes(n)) {
          const u = s._items[n];
          u === "stateless" ? s._statelessSource[n] = o : u === "stateful" && (s._statefulSource[n] = o);
        }
        return !0;
      }
    });
  }
}
const W = {
  config: {},
  status: {
    add: (a, e) => {
      if (Object.keys(r.status).includes(a))
        throw `You cannot add a new status called '${a}', this name is either reserved by Vuethers or already existing.`;
      r.status[a] = new de(a, e);
    }
  }
}, L = E({
  provider: null,
  signer: null,
  contracts: {}
}), r = new j({
  config: "stateless",
  status: "stateless",
  networks: "stateless",
  defaults: "stateless",
  provider: "stateful",
  signer: "stateful",
  contracts: "stateful"
}, W, L.value), O = {
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
}, K = { class: "ConnectWalletButton" }, q = {
  key: 1,
  disabled: ""
}, Q = {
  key: 2,
  disabled: ""
}, Y = {
  key: 3,
  disabled: ""
}, z = {
  key: 4,
  disabled: ""
}, X = {
  __name: "_ConnectWalletButton",
  async setup(a) {
    let e, t;
    async function i() {
      try {
        return await r.signer.getAddress(), r.status.wallet.set("CONNECTED"), !0;
      } catch {
        return !1;
      }
    }
    [e, t] = M(() => i()), await e, t();
    async function s() {
      if (!await i())
        try {
          r.status.wallet.set("REQUESTED"), await r.provider.send("eth_requestAccounts", []), r.signer = r.provider.getSigner(), r.status.wallet.set("CONNECTED");
          for (const [o, u] of Object.entries(r.contracts))
            r.contracts[o] = await u.connect(r.signer);
        } catch (o) {
          o.code === 4001 ? r.status.wallet.set("REFUSED") : r.status.wallet.set("ERROR");
        }
    }
    function n() {
      r.status.wallet.set("DISCONNECTED");
    }
    return (o, u) => (l(), d("div", K, [
      p(r).status.wallet.is("DISCONNECTED") ? (l(), d("button", {
        key: 0,
        onClick: s
      }, "Connect Wallet")) : p(r).status.wallet.is("REQUESTED") ? (l(), d("button", q, "Connection requested...")) : p(r).status.wallet.is("REFUSED") ? (l(), d("button", Q, "Connection refused!")) : p(r).status.wallet.is("ERROR") ? (l(), d("button", Y, "Connection error!")) : p(r).status.network.is("WRONG") ? (l(), d("button", z, "Wrong network! (" + b(p(r).networks.current.displayName) + ")", 1)) : p(r).status.wallet.is("CONNECTED") ? (l(), d("button", {
        key: 5,
        onClick: n
      }, "Disconnect")) : C("", !0)
    ]));
  }
}, ye = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (e, t) => (l(), D(A, null, {
      default: V(() => [
        G(X)
      ]),
      _: 1
    }));
  }
}, J = /* @__PURE__ */ F("Functions : "), Z = ["onClick"], ee = ["onUpdate:modelValue", "type", "placeholder"], te = ["onUpdate:modelValue", "placeholder"], ne = { key: 0 }, se = /* @__PURE__ */ F(" Events : "), ae = /* @__PURE__ */ m("p", null, "Logs:", -1), re = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(a) {
    let e, t;
    const i = a, s = r.contracts[i.contractName], n = ([e, t] = M(() => s.owner()), e = await e, t(), e);
    async function o(c) {
      try {
        const f = await s[c](...u.value[c].inputs);
        u.value[c].outputs[0] = f;
      } catch (f) {
        u.value[c].error = f.reason;
      }
    }
    const u = E({});
    for (const c of Object.values(s.interface.functions)) {
      u.value[c.name] = {
        inputs: [],
        outputs: [],
        error: null,
        properties: {
          constant: c.constant,
          payable: c.payable,
          inputs: c.inputs,
          outputs: c.outputs
        }
      };
      for (const f in c.inputs)
        u.value[c.name].inputs[f] = "";
      for (const f in c.outputs)
        u.value[c.name].outputs[f] = "";
    }
    async function S(c) {
      v.value[c.event].count += 1;
      let f = `Block ${c.blockNumber} -> {`;
      for (const h of v.value[c.event].properties.inputs)
        f += `${h.name}:${c.args[h.name]}, `;
      f = f.substring(0, f.length - 2) + "}", v.value[c.event].logs.push(f);
    }
    const v = E({});
    for (const c of Object.values(s.interface.events))
      v.value[c.name] = {
        count: 0,
        logs: [],
        properties: {
          inputs: c.inputs
        }
      }, s.on(c, S);
    function B(c) {
      return c.includes("int") ? "number" : "text";
    }
    return (c, f) => (l(), d(w, null, [
      m("p", null, "Interact with '" + b(a.contractName) + "' contract :", 1),
      m("ul", null, [
        m("li", null, "Address : " + b(p(s).address), 1),
        m("li", null, "Owner : " + b(p(n)), 1),
        m("li", null, [
          J,
          m("ul", null, [
            (l(!0), d(w, null, k(u.value, (h, g) => (l(), d("li", null, [
              m("button", {
                onClick: (y) => o(g)
              }, b(g) + " (" + b(h.properties.constant ? "read-only" : "") + b(h.properties.payable ? ", payable" : "") + ")", 9, Z),
              (l(!0), d(w, null, k(h.properties.inputs, (y, _) => $((l(), d("input", {
                "onUpdate:modelValue": (x) => h.inputs[_] = x,
                type: B(y.type),
                placeholder: y.type
              }, null, 8, ee)), [
                [H, h.inputs[_]]
              ])), 256)),
              (l(!0), d(w, null, k(h.properties.outputs, (y, _) => $((l(), d("input", {
                "onUpdate:modelValue": (x) => h.outputs[_] = x,
                type: "text",
                placeholder: y.type,
                disabled: ""
              }, null, 8, te)), [
                [U, h.outputs[_]]
              ])), 256)),
              h.error ? (l(), d("p", ne, b(h.error), 1)) : C("", !0)
            ]))), 256))
          ])
        ]),
        m("li", null, [
          se,
          m("ul", null, [
            (l(!0), d(w, null, k(v.value, (h, g) => (l(), d("li", null, [
              m("h3", null, b(g), 1),
              m("p", null, "Count : " + b(h.count), 1),
              ae,
              m("ul", null, [
                (l(!0), d(w, null, k(h.logs, (y) => (l(), d("li", null, b(y), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, we = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    return (t, i) => (l(), D(A, null, {
      default: V(() => [
        G(re, {
          contractName: e.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, oe = { class: "SelectNetworkDropdown" }, ce = {
  key: 0,
  selected: ""
}, ie = ["src", "alt"], le = ["onClick"], ue = ["src", "alt"], ke = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    async function e(s) {
      const n = r.networks.available.find((o) => o.chainId === parseInt(s));
      if (n) {
        s = I.utils.hexlify(parseInt(s)).toString(), s = I.utils.hexValue(s);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: s
            }]
          });
        } catch (u) {
          u.code === 4902 && await window.ethereum.request({
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
        const o = await r.provider.getNetwork();
        r.networks.current.chainId !== o.chainId && window.location.reload();
      }
    }
    let t = E(!1);
    function i() {
      t.value = !t.value;
    }
    return (s, n) => (l(), d("div", oe, [
      m("ul", { onClick: i }, [
        p(r).networks.current ? (l(), d("li", ce, [
          m("img", {
            width: "40",
            src: p(r).networks.current.icon ? p(r).networks.current.icon : p(r).defaults.networks.icon,
            alt: p(r).networks.current.name + " logo"
          }, null, 8, ie),
          m("p", null, b(p(r).networks.current.displayName), 1)
        ])) : C("", !0),
        t.value ? (l(!0), d(w, { key: 1 }, k(p(r).networks.available, (o) => (l(), d("li", {
          key: o.chainId,
          onClick: (u) => e(o.chainId)
        }, [
          m("img", {
            width: "40",
            src: o.icon ? o.icon : p(r).defaults.networks.icon,
            alt: o.name + " logo"
          }, null, 8, ue),
          m("p", null, b(o.displayName), 1)
        ], 8, le))), 128)) : C("", !0)
      ])
    ]));
  }
};
class de {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const i of t)
      this.states.push(this._formatState(i));
    this._state = E(this.states[0]);
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
    R(this._state, () => {
      e(this.get());
    });
  }
  watchState(e, t) {
    if (!this._isStateValid(e))
      throw `The state given to the watchState() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    R(this._state, (i, s) => {
      this.is(e) && t(this.get());
    });
  }
  watchStates(e, t) {
    if (!this._areStatesValid(e))
      throw `The states given to the watchStates() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
    R(this._state, () => {
      this.isIn(e) && t(this.get());
    });
  }
}
function me(a) {
  const e = a.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
function T(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function N(a, ...e) {
  if (!e.length)
    return a;
  const t = e.shift();
  if (T(a) && T(t))
    for (const i in t)
      T(t[i]) ? (a[i] || Object.assign(a, {
        [i]: {}
      }), N(a[i], t[i])) : Object.assign(a, {
        [i]: t[i]
      });
  return N(a, ...e);
}
async function pe(a) {
  a.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "CONNECTED"
  ]), a.status.add("network", [
    "OK",
    "WRONG",
    "ERROR"
  ]), a.status.wallet.watchStates(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      a.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function he(a) {
  return await pe(r), a.config.globalProperties.dapp = r, r;
}
async function ve(a, e) {
  const t = await he(a);
  t.provider = P(new I.providers.Web3Provider(window.ethereum, "any")), t.signer = P(t.provider.getSigner()), t.provider.on("network", (s, n) => {
    n && n !== s && window.location.reload();
  });
  const i = await t.provider.getNetwork();
  if (e) {
    const s = N({ ...O }, { ...e });
    s.networks = [];
    for (let n of e.networks)
      if (n.chainId) {
        const o = O.networks.find((u) => u.chainId === n.chainId);
        n = N({ ...o }, { ...n }), n.displayName || (n.displayName = n.name), s.networks.push(n);
      }
    if (t.defaults = s.defaults, s.networks)
      if (t.networks = {
        available: s.networks.filter((n) => n.chainId !== i.chainId),
        current: s.networks.find((n) => n.chainId === i.chainId),
        known: O.networks
      }, t.networks.current && t.networks.current.contracts) {
        let n = !1;
        try {
          await t.signer.getAddress(), n = !0;
        } catch {
        }
        for (const [o, u] of Object.entries(t.networks.current.contracts)) {
          const S = new I.Contract(u.address, u.abi, n ? t.signer : t.provider);
          t.contracts[o] = P(S);
        }
      } else {
        const n = t.networks.known.find((o) => o.chainId === i.chainId);
        n ? t.networks.current = n : (t.networks.current = i, t.networks.current.displayName = me(t.networks.current.name)), t.status.network.set("WRONG");
      }
  }
}
export {
  ye as ConnectWalletButton,
  we as ContractInteractor,
  ke as SelectNetworkDropdown,
  de as Status,
  r as dapp,
  ve as initVuethers
};
