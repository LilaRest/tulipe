import { ref as C, withAsyncContext as O, openBlock as c, createElementBlock as i, unref as p, toDisplayString as b, createCommentVNode as E, createBlock as S, Suspense as $, withCtx as H, createVNode as B, Fragment as w, createElementVNode as d, renderList as g, withDirectives as A, vModelDynamic as j, vModelText as G, createTextVNode as D, markRaw as L } from "vue";
import { defineStore as F, getActivePinia as U, createPinia as K } from "pinia";
import { ethers as x } from "ethers";
const Y = F("wallet-status", () => {
  let a = C("disconnected");
  function t() {
    a.value = "disconnected";
  }
  function s() {
    a.value = "connection-requested", console.log("connection requested called"), console.log(a.value);
  }
  function e() {
    a.value = "connection-refused", setTimeout(t, 5e3);
  }
  function m() {
    a.value = "connection-error", setTimeout(t, 5e3);
  }
  function o() {
    a.value = "connected";
  }
  function n() {
    a.value = "wrong-network";
  }
  return {
    status: a,
    setToDisconnected: t,
    setToConnectionRequested: s,
    setToConnectionRefused: e,
    setToConnected: o,
    setToWrongNetwork: n,
    setToError: m
  };
}), N = F("dapp", () => {
  const a = C(new x.providers.Web3Provider(window.ethereum, "any"));
  let t = C(a.value.getSigner()), s = {}, e = {}, m = {};
  const o = {
    wallet: Y()
  };
  return {
    provider: a,
    signer: t,
    networks: s,
    contracts: e,
    config: m,
    status: o
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
}, z = { class: "ConnectWalletButton" }, X = {
  key: 1,
  disabled: ""
}, J = {
  key: 2,
  disabled: ""
}, Q = {
  key: 3,
  disabled: ""
}, Z = {
  key: 4,
  disabled: ""
}, ee = {
  __name: "_ConnectWalletButton",
  async setup(a) {
    let t, s;
    const e = N();
    async function m() {
      try {
        return await e.signer.getAddress(), e.status.wallet.setToConnected(), !0;
      } catch {
        return !1;
      }
    }
    [t, s] = O(() => m()), await t, s();
    async function o() {
      if (!await m())
        try {
          e.status.wallet.setToConnectionRequested(), await e.provider.send("eth_requestAccounts", []), e.signer = e.provider.getSigner(), e.status.wallet.setToConnected();
          for (const [r, l] of Object.entries(e.contracts))
            e.contracts[r] = await l.connect(e.signer);
        } catch (r) {
          r.code === 4001 ? e.status.wallet.setToConnectionRefused() : e.status.wallet.setToError();
        }
    }
    function n() {
      e.status.wallet.setToDisconnected();
    }
    return (r, l) => (c(), i("div", z, [
      p(e).status.wallet.status == "disconnected" ? (c(), i("button", {
        key: 0,
        onClick: o
      }, "Connect Wallet")) : p(e).status.wallet.status == "connection-requested" ? (c(), i("button", X, "Connection requested...")) : p(e).status.wallet.status == "connection-refused" ? (c(), i("button", J, "Connection refused!")) : p(e).status.wallet.status == "connection-error" ? (c(), i("button", Q, "Connection error!")) : p(e).status.wallet.status == "wrong-network" ? (c(), i("button", Z, "Wrong network! (" + b(p(e).networks.current.displayName) + ")", 1)) : p(e).status.wallet.status == "connected" ? (c(), i("button", {
        key: 5,
        onClick: n
      }, "Disconnect")) : E("", !0)
    ]));
  }
}, ke = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (t, s) => (c(), S($, null, {
      default: H(() => [
        B(ee)
      ]),
      _: 1
    }));
  }
}, te = /* @__PURE__ */ D("Functions : "), ne = ["onClick"], ae = ["onUpdate:modelValue", "type", "placeholder"], oe = ["onUpdate:modelValue", "placeholder"], re = {
  key: 0,
  style: { color: "red" }
}, se = /* @__PURE__ */ D(" Events : "), ce = /* @__PURE__ */ d("p", null, "Logs:", -1), le = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(a) {
    let t, s;
    const e = a, o = N().contracts[e.contractName], n = ([t, s] = O(() => o.owner()), t = await t, s(), t), r = o.interface.functions, l = C({});
    for (const u of Object.keys(r)) {
      l.value[u] = {
        inputs: [],
        outputs: [],
        error: null
      };
      for (const h in r[u].inputs)
        l.value[u].inputs[h] = "";
      for (const h in r[u].outputs)
        l.value[u].outputs[h] = "";
    }
    const I = o.interface.events, v = C({});
    async function V(u) {
      v.value[u.event].count += 1;
      let h = `Block ${u.blockNumber} -> {`;
      for (const y of I[u.eventSignature].inputs)
        h += `${y.name}:${u.args[y.name]}, `;
      h = h.substring(0, h.length - 2) + "}", v.value[u.event].logs.push(h);
    }
    for (const u of Object.values(I))
      v.value[u.name] = {
        count: 0,
        logs: []
      }, o.on(u, V);
    async function W(u) {
      try {
        const h = await o[u](...l.value[u].inputs);
        l.value[u].outputs[0] = h;
      } catch (h) {
        l.value[u].error = h.reason;
      }
    }
    function q(u) {
      return u.includes("int") ? "number" : "text";
    }
    return (u, h) => (c(), i(w, null, [
      d("p", null, "Interact with '" + b(a.contractName) + "' contract :", 1),
      d("ul", null, [
        d("li", null, "Address : " + b(p(o).address), 1),
        d("li", null, "Owner : " + b(p(n)), 1),
        d("li", null, [
          te,
          d("ul", null, [
            (c(!0), i(w, null, g(p(r), (y, f) => (c(), i("li", null, [
              d("button", {
                onClick: (k) => W(f)
              }, b(y.name) + " (" + b(y.constant ? "read-only" : "") + b(y.payable ? ", payable" : "") + ")", 9, ne),
              (c(!0), i(w, null, g(y.inputs, (k, _) => A((c(), i("input", {
                "onUpdate:modelValue": (R) => l.value[f].inputs[_] = R,
                type: q(k.type),
                placeholder: k.type
              }, null, 8, ae)), [
                [j, l.value[f].inputs[_]]
              ])), 256)),
              (c(!0), i(w, null, g(y.outputs, (k, _) => A((c(), i("input", {
                "onUpdate:modelValue": (R) => l.value[f].outputs[_] = R,
                type: "text",
                placeholder: k.type,
                disabled: ""
              }, null, 8, oe)), [
                [G, l.value[f].outputs[_]]
              ])), 256)),
              l.value[f].error ? (c(), i("p", re, b(l.value[f].error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        d("li", null, [
          se,
          d("ul", null, [
            (c(!0), i(w, null, g(v.value, (y, f) => (c(), i("li", null, [
              d("h3", null, b(f), 1),
              d("p", null, "Count : " + b(v.value[f].count), 1),
              ce,
              d("ul", null, [
                (c(!0), i(w, null, g(v.value[f].logs, (k) => (c(), i("li", null, b(k), 1))), 256))
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
    const t = a;
    return (s, e) => (c(), S($, null, {
      default: H(() => [
        B(le, {
          contractName: t.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, ie = { class: "SelectNetworkDropdown" }, ue = {
  key: 0,
  selected: ""
}, de = ["src", "alt"], pe = ["onClick"], me = ["src", "alt"], ve = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    const t = N();
    async function s(o) {
      const n = t.networks.available.find((r) => r.chainId === parseInt(o));
      if (n) {
        o = x.utils.hexlify(parseInt(o)).toString(), o = x.utils.hexValue(o);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: o
            }]
          });
        } catch (l) {
          l.code === 4902 && (console.log("ADD CHAIN"), await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: o,
              rpcUrls: [n.defaultRPC],
              chainName: n.name,
              nativeCurrency: {
                name: n.currency.symbol,
                symbol: n.currency.symbol,
                decimals: n.currency.decimals
              },
              blockExplorerUrls: n.explorer && n.explorer.url !== "" ? [n.explorer.url] : null
            }]
          }));
        }
        const r = await t.provider.getNetwork();
        t.networks.current.chainId !== r.chainId && window.location.reload();
      }
    }
    let e = C(!1);
    function m() {
      e.value = !e.value;
    }
    return (o, n) => (c(), i("div", ie, [
      d("ul", { onClick: m }, [
        p(t).networks.current ? (c(), i("li", ue, [
          d("img", {
            width: "40",
            src: p(t).networks.current.icon ? p(t).networks.current.icon : p(t).defaults.networks.icon,
            alt: p(t).networks.current.name + " logo"
          }, null, 8, de),
          d("p", null, b(p(t).networks.current.displayName), 1)
        ])) : E("", !0),
        e.value ? (c(!0), i(w, { key: 1 }, g(p(t).networks.available, (r) => (c(), i("li", {
          key: r.chainId,
          onClick: (l) => s(r.chainId)
        }, [
          d("img", {
            width: "40",
            src: r.icon ? r.icon : p(t).defaults.networks.icon,
            alt: r.name + " logo"
          }, null, 8, me),
          d("p", null, b(r.displayName), 1)
        ], 8, pe))), 128)) : E("", !0)
      ])
    ]));
  }
};
function he(a) {
  const t = a.split(" ");
  for (let s = 0; s < t.length; s++)
    t[s] = t[s][0].toUpperCase() + t[s].substring(1);
  return t.join(" ");
}
function M(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function P(a, ...t) {
  if (!t.length)
    return a;
  const s = t.shift();
  if (M(a) && M(s))
    for (const e in s)
      M(s[e]) ? (a[e] || Object.assign(a, {
        [e]: {}
      }), P(a[e], s[e])) : Object.assign(a, {
        [e]: s[e]
      });
  return P(a, ...t);
}
async function ge(a, t) {
  U() || a.use(K());
  const e = N();
  e.provider.on("network", (o, n) => {
    n && n !== o && window.location.reload();
  });
  const m = await e.provider.getNetwork();
  if (t) {
    const o = P({ ...T }, { ...t });
    o.networks = [];
    for (let n of t.networks)
      if (n.chainId) {
        const r = T.networks.find((l) => l.chainId === n.chainId);
        n = P({ ...r }, { ...n }), n.displayName || (n.displayName = n.name), o.networks.push(n);
      }
    if (e.defaults = o.defaults, o.networks)
      if (e.networks = {
        available: o.networks.filter((n) => n.chainId !== m.chainId),
        current: o.networks.find((n) => n.chainId === m.chainId),
        known: T.networks
      }, e.networks.current && e.networks.current.contracts) {
        let n = !1;
        try {
          await e.signer.getAddress(), n = !0;
        } catch {
        }
        for (const [r, l] of Object.entries(e.networks.current.contracts)) {
          const I = new x.Contract(l.address, l.abi, n ? e.signer : e.provider);
          e.contracts[r] = L(I);
        }
      } else {
        const n = e.networks.known.find((r) => r.chainId === m.chainId);
        n ? e.networks.current = n : (e.networks.current = m, e.networks.current.displayName = he(e.networks.current.name)), e.status.wallet.setToWrongNetwork();
      }
  }
}
export {
  ke as ConnectWalletButton,
  we as ContractInteractor,
  ve as SelectNetworkDropdown,
  ge as initVuethers,
  N as useDappStore
};
