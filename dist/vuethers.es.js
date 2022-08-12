import { ref as v, withAsyncContext as S, openBlock as c, createElementBlock as i, unref as p, toDisplayString as f, createCommentVNode as I, createBlock as $, Suspense as B, withCtx as H, createVNode as D, Fragment as k, createElementVNode as d, renderList as w, withDirectives as O, vModelDynamic as q, vModelText as j, createTextVNode as F, markRaw as T } from "vue";
import { defineStore as V, getActivePinia as G, createPinia as L } from "pinia";
import { ethers as E } from "ethers";
const U = V("wallet-status", () => {
  let a = v("disconnected");
  function t() {
    a.value = "disconnected";
  }
  function s() {
    a.value = "connection-requested", console.log("connection requested called"), console.log(a.value);
  }
  function e() {
    a.value = "connection-refused", setTimeout(t, 5e3);
  }
  function h() {
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
    setToError: h
  };
}), P = V("dapp", () => {
  const a = v(null);
  let t = v(null), s = {}, e = {}, h = {};
  const o = {
    wallet: U()
  };
  return {
    provider: a,
    signer: t,
    networks: s,
    contracts: e,
    config: h,
    status: o
  };
}), M = {
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
}, K = { class: "ConnectWalletButton" }, Y = {
  key: 1,
  disabled: ""
}, z = {
  key: 2,
  disabled: ""
}, X = {
  key: 3,
  disabled: ""
}, J = {
  key: 4,
  disabled: ""
}, Q = {
  __name: "_ConnectWalletButton",
  async setup(a) {
    let t, s;
    const e = P();
    async function h() {
      try {
        return await e.signer.getAddress(), e.status.wallet.setToConnected(), !0;
      } catch {
        return !1;
      }
    }
    [t, s] = S(() => h()), await t, s();
    async function o() {
      if (!await h())
        try {
          e.status.wallet.setToConnectionRequested(), await e.provider.send("eth_requestAccounts", []), e.signer = e.provider.getSigner(), e.status.wallet.setToConnected();
          for (const [l, u] of Object.entries(e.contracts))
            e.contracts[l] = await u.connect(e.signer);
        } catch (l) {
          l.code === 4001 ? e.status.wallet.setToConnectionRefused() : e.status.wallet.setToError();
        }
    }
    function n() {
      e.status.wallet.setToDisconnected();
    }
    return (l, u) => (c(), i("div", K, [
      p(e).status.wallet.status == "disconnected" ? (c(), i("button", {
        key: 0,
        onClick: o
      }, "Connect Wallet")) : p(e).status.wallet.status == "connection-requested" ? (c(), i("button", Y, "Connection requested...")) : p(e).status.wallet.status == "connection-refused" ? (c(), i("button", z, "Connection refused!")) : p(e).status.wallet.status == "connection-error" ? (c(), i("button", X, "Connection error!")) : p(e).status.wallet.status == "wrong-network" ? (c(), i("button", J, "Wrong network! (" + f(p(e).networks.current.displayName) + ")", 1)) : p(e).status.wallet.status == "connected" ? (c(), i("button", {
        key: 5,
        onClick: n
      }, "Disconnect")) : I("", !0)
    ]));
  }
}, fe = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (t, s) => (c(), $(B, null, {
      default: H(() => [
        D(Q)
      ]),
      _: 1
    }));
  }
}, Z = /* @__PURE__ */ F("Functions : "), ee = ["onClick"], te = ["onUpdate:modelValue", "type", "placeholder"], ne = ["onUpdate:modelValue", "placeholder"], ae = { key: 0 }, oe = /* @__PURE__ */ F(" Events : "), re = /* @__PURE__ */ d("p", null, "Logs:", -1), se = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(a) {
    let t, s;
    const e = a, o = P().contracts[e.contractName], n = ([t, s] = S(() => o.owner()), t = await t, s(), t);
    async function l(r) {
      try {
        const b = await o[r](...u.value[r].inputs);
        u.value[r].outputs[0] = b;
      } catch (b) {
        u.value[r].error = b.reason;
      }
    }
    const u = v({});
    for (const r of Object.values(o.interface.functions)) {
      u.value[r.name] = {
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
        u.value[r.name].inputs[b] = "";
      for (const b in r.outputs)
        u.value[r.name].outputs[b] = "";
    }
    async function N(r) {
      g.value[r.event].count += 1;
      let b = `Block ${r.blockNumber} -> {`;
      for (const m of g.value[r.event].properties.inputs)
        b += `${m.name}:${r.args[m.name]}, `;
      b = b.substring(0, b.length - 2) + "}", g.value[r.event].logs.push(b);
    }
    const g = v({});
    for (const r of Object.values(o.interface.events))
      g.value[r.name] = {
        count: 0,
        logs: [],
        properties: {
          inputs: r.inputs
        }
      }, o.on(r, N);
    function W(r) {
      return r.includes("int") ? "number" : "text";
    }
    return (r, b) => (c(), i(k, null, [
      d("p", null, "Interact with '" + f(a.contractName) + "' contract :", 1),
      d("ul", null, [
        d("li", null, "Address : " + f(p(o).address), 1),
        d("li", null, "Owner : " + f(p(n)), 1),
        d("li", null, [
          Z,
          d("ul", null, [
            (c(!0), i(k, null, w(u.value, (m, _) => (c(), i("li", null, [
              d("button", {
                onClick: (y) => l(_)
              }, f(_) + " (" + f(m.properties.constant ? "read-only" : "") + f(m.properties.payable ? ", payable" : "") + ")", 9, ee),
              (c(!0), i(k, null, w(m.properties.inputs, (y, C) => O((c(), i("input", {
                "onUpdate:modelValue": (R) => m.inputs[C] = R,
                type: W(y.type),
                placeholder: y.type
              }, null, 8, te)), [
                [q, m.inputs[C]]
              ])), 256)),
              (c(!0), i(k, null, w(m.properties.outputs, (y, C) => O((c(), i("input", {
                "onUpdate:modelValue": (R) => m.outputs[C] = R,
                type: "text",
                placeholder: y.type,
                disabled: ""
              }, null, 8, ne)), [
                [j, m.outputs[C]]
              ])), 256)),
              m.error ? (c(), i("p", ae, f(m.error), 1)) : I("", !0)
            ]))), 256))
          ])
        ]),
        d("li", null, [
          oe,
          d("ul", null, [
            (c(!0), i(k, null, w(g.value, (m, _) => (c(), i("li", null, [
              d("h3", null, f(_), 1),
              d("p", null, "Count : " + f(m.count), 1),
              re,
              d("ul", null, [
                (c(!0), i(k, null, w(m.logs, (y) => (c(), i("li", null, f(y), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, ye = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const t = a;
    return (s, e) => (c(), $(B, null, {
      default: H(() => [
        D(se, {
          contractName: t.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, ce = { class: "SelectNetworkDropdown" }, le = {
  key: 0,
  selected: ""
}, ie = ["src", "alt"], ue = ["onClick"], de = ["src", "alt"], ke = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    const t = P();
    async function s(o) {
      const n = t.networks.available.find((l) => l.chainId === parseInt(o));
      if (n) {
        o = E.utils.hexlify(parseInt(o)).toString(), o = E.utils.hexValue(o);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: o
            }]
          });
        } catch (u) {
          u.code === 4902 && await window.ethereum.request({
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
          });
        }
        const l = await t.provider.getNetwork();
        t.networks.current.chainId !== l.chainId && window.location.reload();
      }
    }
    let e = v(!1);
    function h() {
      e.value = !e.value;
    }
    return (o, n) => (c(), i("div", ce, [
      d("ul", { onClick: h }, [
        p(t).networks.current ? (c(), i("li", le, [
          d("img", {
            width: "40",
            src: p(t).networks.current.icon ? p(t).networks.current.icon : p(t).defaults.networks.icon,
            alt: p(t).networks.current.name + " logo"
          }, null, 8, ie),
          d("p", null, f(p(t).networks.current.displayName), 1)
        ])) : I("", !0),
        e.value ? (c(!0), i(k, { key: 1 }, w(p(t).networks.available, (l) => (c(), i("li", {
          key: l.chainId,
          onClick: (u) => s(l.chainId)
        }, [
          d("img", {
            width: "40",
            src: l.icon ? l.icon : p(t).defaults.networks.icon,
            alt: l.name + " logo"
          }, null, 8, de),
          d("p", null, f(l.displayName), 1)
        ], 8, ue))), 128)) : I("", !0)
      ])
    ]));
  }
};
function pe(a) {
  const t = a.split(" ");
  for (let s = 0; s < t.length; s++)
    t[s] = t[s][0].toUpperCase() + t[s].substring(1);
  return t.join(" ");
}
function A(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function x(a, ...t) {
  if (!t.length)
    return a;
  const s = t.shift();
  if (A(a) && A(s))
    for (const e in s)
      A(s[e]) ? (a[e] || Object.assign(a, {
        [e]: {}
      }), x(a[e], s[e])) : Object.assign(a, {
        [e]: s[e]
      });
  return x(a, ...t);
}
async function we(a, t) {
  G() || a.use(L());
  const e = P();
  e.provider = T(new E.providers.Web3Provider(window.ethereum, "any")), e.signer = T(e.provider.getSigner()), e.provider.on("network", (o, n) => {
    n && n !== o && window.location.reload();
  });
  const h = await e.provider.getNetwork();
  if (t) {
    const o = x({ ...M }, { ...t });
    o.networks = [];
    for (let n of t.networks)
      if (n.chainId) {
        const l = M.networks.find((u) => u.chainId === n.chainId);
        n = x({ ...l }, { ...n }), n.displayName || (n.displayName = n.name), o.networks.push(n);
      }
    if (e.defaults = o.defaults, o.networks)
      if (e.networks = {
        available: o.networks.filter((n) => n.chainId !== h.chainId),
        current: o.networks.find((n) => n.chainId === h.chainId),
        known: M.networks
      }, e.networks.current && e.networks.current.contracts) {
        let n = !1;
        try {
          await e.signer.getAddress(), n = !0;
        } catch {
        }
        for (const [l, u] of Object.entries(e.networks.current.contracts)) {
          const N = new E.Contract(u.address, u.abi, n ? e.signer : e.provider);
          e.contracts[l] = T(N);
        }
      } else {
        const n = e.networks.known.find((l) => l.chainId === h.chainId);
        n ? e.networks.current = n : (e.networks.current = h, e.networks.current.displayName = pe(e.networks.current.name)), e.status.wallet.setToWrongNetwork();
      }
  }
}
export {
  fe as ConnectWalletButton,
  ye as ContractInteractor,
  ke as SelectNetworkDropdown,
  we as initVuethers,
  P as useDappStore
};
