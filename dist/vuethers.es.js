import { ref as v, withAsyncContext as D, openBlock as o, createElementBlock as l, unref as p, toDisplayString as f, createCommentVNode as C, createBlock as M, Suspense as A, withCtx as V, createVNode as F, Fragment as w, createElementVNode as d, renderList as k, withDirectives as $, vModelDynamic as U, vModelText as W, createTextVNode as B, watch as S, markRaw as P } from "vue";
import { defineStore as j, getActivePinia as L, createPinia as q } from "pinia";
import { ethers as I } from "ethers";
const R = j("dapp", () => {
  const s = {}, e = v(null);
  let t = v(null);
  const n = {}, u = {};
  function a(c, i) {
    u[c] = new pe(c, i);
  }
  return u.add = a, {
    config: s,
    provider: e,
    signer: t,
    contracts: n,
    status: u
  };
}), T = {
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
}, K = { class: "ConnectWalletButton" }, Q = {
  key: 1,
  disabled: ""
}, Y = {
  key: 2,
  disabled: ""
}, z = {
  key: 3,
  disabled: ""
}, X = {
  key: 4,
  disabled: ""
}, J = {
  __name: "_ConnectWalletButton",
  async setup(s) {
    let e, t;
    const n = R();
    async function u() {
      try {
        return await n.signer.getAddress(), n.status.wallet.set("CONNECTED"), !0;
      } catch {
        return !1;
      }
    }
    [e, t] = D(() => u()), await e, t();
    async function a() {
      if (!await u())
        try {
          n.status.wallet.set("REQUESTED"), await n.provider.send("eth_requestAccounts", []), n.signer = n.provider.getSigner(), n.status.wallet.set("CONNECTED");
          for (const [i, h] of Object.entries(n.contracts))
            n.contracts[i] = await h.connect(n.signer);
        } catch (i) {
          i.code === 4001 ? n.status.wallet.set("REFUSED") : n.status.wallet.set("ERROR");
        }
    }
    function c() {
      n.status.wallet.set("DISCONNECTED");
    }
    return (i, h) => (o(), l("div", K, [
      p(n).status.wallet.is("DISCONNECTED") ? (o(), l("button", {
        key: 0,
        onClick: a
      }, "Connect Wallet")) : p(n).status.wallet.is("REQUESTED") ? (o(), l("button", Q, "Connection requested...")) : p(n).status.wallet.is("REFUSED") ? (o(), l("button", Y, "Connection refused!")) : p(n).status.wallet.is("ERROR") ? (o(), l("button", z, "Connection error!")) : p(n).status.network.is("WRONG") ? (o(), l("button", X, "Wrong network! (" + f(p(n).networks.current.displayName) + ")", 1)) : p(n).status.wallet.is("CONNECTED") ? (o(), l("button", {
        key: 5,
        onClick: c
      }, "Disconnect")) : C("", !0)
    ]));
  }
}, we = {
  __name: "ConnectWalletButton",
  setup(s) {
    return (e, t) => (o(), M(A, null, {
      default: V(() => [
        F(J)
      ]),
      _: 1
    }));
  }
}, Z = /* @__PURE__ */ B("Functions : "), ee = ["onClick"], te = ["onUpdate:modelValue", "type", "placeholder"], ne = ["onUpdate:modelValue", "placeholder"], ae = { key: 0 }, se = /* @__PURE__ */ B(" Events : "), re = /* @__PURE__ */ d("p", null, "Logs:", -1), oe = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(s) {
    let e, t;
    const n = s, a = R().contracts[n.contractName], c = ([e, t] = D(() => a.owner()), e = await e, t(), e);
    async function i(r) {
      try {
        const b = await a[r](...h.value[r].inputs);
        h.value[r].outputs[0] = b;
      } catch (b) {
        h.value[r].error = b.reason;
      }
    }
    const h = v({});
    for (const r of Object.values(a.interface.functions)) {
      h.value[r.name] = {
        inputs: [],
        outputs: [],
        error: null,
        properties: {
          constant: r.constant,
          payable: r.payable,
          inputs: r.inputs,
          outputs: r.outputs
        }
      };
      for (const b in r.inputs)
        h.value[r.name].inputs[b] = "";
      for (const b in r.outputs)
        h.value[r.name].outputs[b] = "";
    }
    async function G(r) {
      E.value[r.event].count += 1;
      let b = `Block ${r.blockNumber} -> {`;
      for (const m of E.value[r.event].properties.inputs)
        b += `${m.name}:${r.args[m.name]}, `;
      b = b.substring(0, b.length - 2) + "}", E.value[r.event].logs.push(b);
    }
    const E = v({});
    for (const r of Object.values(a.interface.events))
      E.value[r.name] = {
        count: 0,
        logs: [],
        properties: {
          inputs: r.inputs
        }
      }, a.on(r, G);
    function H(r) {
      return r.includes("int") ? "number" : "text";
    }
    return (r, b) => (o(), l(w, null, [
      d("p", null, "Interact with '" + f(s.contractName) + "' contract :", 1),
      d("ul", null, [
        d("li", null, "Address : " + f(p(a).address), 1),
        d("li", null, "Owner : " + f(p(c)), 1),
        d("li", null, [
          Z,
          d("ul", null, [
            (o(!0), l(w, null, k(h.value, (m, _) => (o(), l("li", null, [
              d("button", {
                onClick: (y) => i(_)
              }, f(_) + " (" + f(m.properties.constant ? "read-only" : "") + f(m.properties.payable ? ", payable" : "") + ")", 9, ee),
              (o(!0), l(w, null, k(m.properties.inputs, (y, g) => $((o(), l("input", {
                "onUpdate:modelValue": (x) => m.inputs[g] = x,
                type: H(y.type),
                placeholder: y.type
              }, null, 8, te)), [
                [U, m.inputs[g]]
              ])), 256)),
              (o(!0), l(w, null, k(m.properties.outputs, (y, g) => $((o(), l("input", {
                "onUpdate:modelValue": (x) => m.outputs[g] = x,
                type: "text",
                placeholder: y.type,
                disabled: ""
              }, null, 8, ne)), [
                [W, m.outputs[g]]
              ])), 256)),
              m.error ? (o(), l("p", ae, f(m.error), 1)) : C("", !0)
            ]))), 256))
          ])
        ]),
        d("li", null, [
          se,
          d("ul", null, [
            (o(!0), l(w, null, k(E.value, (m, _) => (o(), l("li", null, [
              d("h3", null, f(_), 1),
              d("p", null, "Count : " + f(m.count), 1),
              re,
              d("ul", null, [
                (o(!0), l(w, null, k(m.logs, (y) => (o(), l("li", null, f(y), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, ke = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const e = s;
    return (t, n) => (o(), M(A, null, {
      default: V(() => [
        F(oe, {
          contractName: e.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, ce = { class: "SelectNetworkDropdown" }, ie = {
  key: 0,
  selected: ""
}, le = ["src", "alt"], ue = ["onClick"], de = ["src", "alt"], ve = {
  __name: "SelectNetworkDropdown",
  setup(s) {
    const e = R();
    async function t(a) {
      const c = e.networks.available.find((i) => i.chainId === parseInt(a));
      if (c) {
        a = I.utils.hexlify(parseInt(a)).toString(), a = I.utils.hexValue(a);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: a
            }]
          });
        } catch (h) {
          h.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: a,
              rpcUrls: [c.defaultRPC],
              chainName: c.name,
              nativeCurrency: {
                name: c.currency.symbol,
                symbol: c.currency.symbol,
                decimals: c.currency.decimals
              },
              blockExplorerUrls: c.explorer && c.explorer.url !== "" ? [c.explorer.url] : null
            }]
          });
        }
        const i = await e.provider.getNetwork();
        e.networks.current.chainId !== i.chainId && window.location.reload();
      }
    }
    let n = v(!1);
    function u() {
      n.value = !n.value;
    }
    return (a, c) => (o(), l("div", ce, [
      d("ul", { onClick: u }, [
        p(e).networks.current ? (o(), l("li", ie, [
          d("img", {
            width: "40",
            src: p(e).networks.current.icon ? p(e).networks.current.icon : p(e).defaults.networks.icon,
            alt: p(e).networks.current.name + " logo"
          }, null, 8, le),
          d("p", null, f(p(e).networks.current.displayName), 1)
        ])) : C("", !0),
        n.value ? (o(!0), l(w, { key: 1 }, k(p(e).networks.available, (i) => (o(), l("li", {
          key: i.chainId,
          onClick: (h) => t(i.chainId)
        }, [
          d("img", {
            width: "40",
            src: i.icon ? i.icon : p(e).defaults.networks.icon,
            alt: i.name + " logo"
          }, null, 8, de),
          d("p", null, f(i.displayName), 1)
        ], 8, ue))), 128)) : C("", !0)
      ])
    ]));
  }
};
class pe {
  constructor(e, t) {
    this._name = e;
    const n = v(null);
    if (this._state = n.value, this.states = [], Array.isArray(t))
      for (const u of t)
        this.states.push(this._formatState(u));
    else
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
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
    return this._state;
  }
  set(e) {
    if (e = this._formatState(e), this._isStateValid(e))
      this._state = e;
    else
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
  }
  is(e) {
    if (this._isStateValid(e))
      return this.get() == this._formatState(e);
    throw `The state given to the is() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
  }
  isIn(e) {
    if (this._areStatesValid(e)) {
      for (const t of e)
        if (this.is(t))
          return !0;
      return !1;
    }
    throw `The states given to the isIn() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
  }
  watch(e) {
    S(this.get(), () => {
      e(this.get());
    });
  }
  watchState(e, t) {
    if (this._isStateValid(e))
      S(this.get(), (n, u) => {
        this.is(e) && t(this.get());
      });
    else
      throw `The state given to the watchState() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
  }
  watchStates(e, t) {
    if (this._areStatesValid(e))
      S(this.get(), () => {
        this.isIn(e) && t(this.get());
      });
    else
      throw `The states given to the watchStates() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
  }
}
function me(s) {
  const e = s.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
function O(s) {
  return s && typeof s == "object" && !Array.isArray(s);
}
function N(s, ...e) {
  if (!e.length)
    return s;
  const t = e.shift();
  if (O(s) && O(t))
    for (const n in t)
      O(t[n]) ? (s[n] || Object.assign(s, {
        [n]: {}
      }), N(s[n], t[n])) : Object.assign(s, {
        [n]: t[n]
      });
  return N(s, ...e);
}
async function he(s) {
  return L() || s.use(q()), R();
}
async function Ee(s, e) {
  const t = await he(s);
  t.provider = P(new I.providers.Web3Provider(window.ethereum, "any")), t.signer = P(t.provider.getSigner()), t.provider.on("network", (u, a) => {
    a && a !== u && window.location.reload();
  }), t.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "CONNECTED"
  ]), t.status.add("network", [
    "WRONG",
    "ERROR"
  ]), t.status.wallet.watchStates(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      t.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
  const n = await t.provider.getNetwork();
  if (e) {
    const u = N({ ...T }, { ...e });
    u.networks = [];
    for (let a of e.networks)
      if (a.chainId) {
        const c = T.networks.find((i) => i.chainId === a.chainId);
        a = N({ ...c }, { ...a }), a.displayName || (a.displayName = a.name), u.networks.push(a);
      }
    if (t.defaults = u.defaults, u.networks)
      if (t.networks = {
        available: u.networks.filter((a) => a.chainId !== n.chainId),
        current: u.networks.find((a) => a.chainId === n.chainId),
        known: T.networks
      }, t.networks.current && t.networks.current.contracts) {
        let a = !1;
        try {
          await t.signer.getAddress(), a = !0;
        } catch {
        }
        for (const [c, i] of Object.entries(t.networks.current.contracts)) {
          const h = new I.Contract(i.address, i.abi, a ? t.signer : t.provider);
          t.contracts[c] = P(h);
        }
      } else {
        const a = t.networks.known.find((c) => c.chainId === n.chainId);
        a ? t.networks.current = a : (t.networks.current = n, t.networks.current.displayName = me(t.networks.current.name)), t.status.wallet.setToWrongNetwork();
      }
  }
}
export {
  we as ConnectWalletButton,
  ke as ContractInteractor,
  ve as SelectNetworkDropdown,
  pe as Status,
  Ee as initVuethers,
  R as useDappStore
};
