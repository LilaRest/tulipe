import { ref as v, withAsyncContext as O, openBlock as s, createElementBlock as l, unref as p, toDisplayString as f, createCommentVNode as I, createBlock as S, Suspense as $, withCtx as B, createVNode as H, Fragment as k, createElementVNode as d, renderList as w, withDirectives as A, vModelDynamic as q, vModelText as j, createTextVNode as D, markRaw as R } from "vue";
import { defineStore as F, getActivePinia as G, createPinia as L } from "pinia";
import { ethers as E } from "ethers";
const U = F("wallet-status", () => {
  let o = v("disconnected");
  function a() {
    o.value = "disconnected";
  }
  function e() {
    o.value = "connection-requested", console.log("connection requested called"), console.log(o.value);
  }
  function t() {
    o.value = "connection-refused", setTimeout(a, 5e3);
  }
  function u() {
    o.value = "connection-error", setTimeout(a, 5e3);
  }
  function n() {
    o.value = "connected";
  }
  function c() {
    o.value = "wrong-network";
  }
  return {
    status: o,
    setToDisconnected: a,
    setToConnectionRequested: e,
    setToConnectionRefused: t,
    setToConnected: n,
    setToWrongNetwork: c,
    setToError: u
  };
}), P = F("dapp", () => {
  const o = v(null);
  let a = v(null), e = {}, t = {}, u = {};
  const n = {
    wallet: U()
  };
  return {
    provider: o,
    signer: a,
    networks: e,
    contracts: t,
    config: u,
    status: n
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
  async setup(o) {
    let a, e;
    const t = P();
    async function u() {
      try {
        return await t.signer.getAddress(), t.status.wallet.setToConnected(), !0;
      } catch {
        return !1;
      }
    }
    [a, e] = O(() => u()), await a, e();
    async function n() {
      if (!await u())
        try {
          t.status.wallet.setToConnectionRequested(), await t.provider.send("eth_requestAccounts", []), t.signer = t.provider.getSigner(), t.status.wallet.setToConnected();
          for (const [i, h] of Object.entries(t.contracts))
            t.contracts[i] = await h.connect(t.signer);
        } catch (i) {
          i.code === 4001 ? t.status.wallet.setToConnectionRefused() : t.status.wallet.setToError();
        }
    }
    function c() {
      t.status.wallet.setToDisconnected();
    }
    return (i, h) => (s(), l("div", K, [
      p(t).status.wallet.status == "disconnected" ? (s(), l("button", {
        key: 0,
        onClick: n
      }, "Connect Wallet")) : p(t).status.wallet.status == "connection-requested" ? (s(), l("button", Y, "Connection requested...")) : p(t).status.wallet.status == "connection-refused" ? (s(), l("button", z, "Connection refused!")) : p(t).status.wallet.status == "connection-error" ? (s(), l("button", X, "Connection error!")) : p(t).status.wallet.status == "wrong-network" ? (s(), l("button", J, "Wrong network! (" + f(p(t).networks.current.displayName) + ")", 1)) : p(t).status.wallet.status == "connected" ? (s(), l("button", {
        key: 5,
        onClick: c
      }, "Disconnect")) : I("", !0)
    ]));
  }
}, fe = {
  __name: "ConnectWalletButton",
  setup(o) {
    return (a, e) => (s(), S($, null, {
      default: B(() => [
        H(Q)
      ]),
      _: 1
    }));
  }
}, Z = /* @__PURE__ */ D("Functions : "), ee = ["onClick"], te = ["onUpdate:modelValue", "type", "placeholder"], ne = ["onUpdate:modelValue", "placeholder"], ae = { key: 0 }, oe = /* @__PURE__ */ D(" Events : "), re = /* @__PURE__ */ d("p", null, "Logs:", -1), se = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(o) {
    let a, e;
    const t = o, n = P().contracts[t.contractName], c = ([a, e] = O(() => n.owner()), a = await a, e(), a);
    async function i(r) {
      try {
        const b = await n[r](...h.value[r].inputs);
        h.value[r].outputs[0] = b;
      } catch (b) {
        h.value[r].error = b.reason;
      }
    }
    const h = v({});
    for (const r of Object.values(n.interface.functions)) {
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
    async function V(r) {
      g.value[r.event].count += 1;
      let b = `Block ${r.blockNumber} -> {`;
      for (const m of g.value[r.event].properties.inputs)
        b += `${m.name}:${r.args[m.name]}, `;
      b = b.substring(0, b.length - 2) + "}", g.value[r.event].logs.push(b);
    }
    const g = v({});
    for (const r of Object.values(n.interface.events))
      g.value[r.name] = {
        count: 0,
        logs: [],
        properties: {
          inputs: r.inputs
        }
      }, n.on(r, V);
    function W(r) {
      return r.includes("int") ? "number" : "text";
    }
    return (r, b) => (s(), l(k, null, [
      d("p", null, "Interact with '" + f(o.contractName) + "' contract :", 1),
      d("ul", null, [
        d("li", null, "Address : " + f(p(n).address), 1),
        d("li", null, "Owner : " + f(p(c)), 1),
        d("li", null, [
          Z,
          d("ul", null, [
            (s(!0), l(k, null, w(h.value, (m, _) => (s(), l("li", null, [
              d("button", {
                onClick: (y) => i(_)
              }, f(_) + " (" + f(m.properties.constant ? "read-only" : "") + f(m.properties.payable ? ", payable" : "") + ")", 9, ee),
              (s(!0), l(k, null, w(m.properties.inputs, (y, C) => A((s(), l("input", {
                "onUpdate:modelValue": (N) => m.inputs[C] = N,
                type: W(y.type),
                placeholder: y.type
              }, null, 8, te)), [
                [q, m.inputs[C]]
              ])), 256)),
              (s(!0), l(k, null, w(m.properties.outputs, (y, C) => A((s(), l("input", {
                "onUpdate:modelValue": (N) => m.outputs[C] = N,
                type: "text",
                placeholder: y.type,
                disabled: ""
              }, null, 8, ne)), [
                [j, m.outputs[C]]
              ])), 256)),
              m.error ? (s(), l("p", ae, f(m.error), 1)) : I("", !0)
            ]))), 256))
          ])
        ]),
        d("li", null, [
          oe,
          d("ul", null, [
            (s(!0), l(k, null, w(g.value, (m, _) => (s(), l("li", null, [
              d("h3", null, f(_), 1),
              d("p", null, "Count : " + f(m.count), 1),
              re,
              d("ul", null, [
                (s(!0), l(k, null, w(m.logs, (y) => (s(), l("li", null, f(y), 1))), 256))
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
  setup(o) {
    const a = o;
    return (e, t) => (s(), S($, null, {
      default: B(() => [
        H(se, {
          contractName: a.contractName
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
  setup(o) {
    const a = P();
    async function e(n) {
      const c = a.networks.available.find((i) => i.chainId === parseInt(n));
      if (c) {
        n = E.utils.hexlify(parseInt(n)).toString(), n = E.utils.hexValue(n);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: n
            }]
          });
        } catch (h) {
          h.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: n,
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
        const i = await a.provider.getNetwork();
        a.networks.current.chainId !== i.chainId && window.location.reload();
      }
    }
    let t = v(!1);
    function u() {
      t.value = !t.value;
    }
    return (n, c) => (s(), l("div", ce, [
      d("ul", { onClick: u }, [
        p(a).networks.current ? (s(), l("li", le, [
          d("img", {
            width: "40",
            src: p(a).networks.current.icon ? p(a).networks.current.icon : p(a).defaults.networks.icon,
            alt: p(a).networks.current.name + " logo"
          }, null, 8, ie),
          d("p", null, f(p(a).networks.current.displayName), 1)
        ])) : I("", !0),
        t.value ? (s(!0), l(k, { key: 1 }, w(p(a).networks.available, (i) => (s(), l("li", {
          key: i.chainId,
          onClick: (h) => e(i.chainId)
        }, [
          d("img", {
            width: "40",
            src: i.icon ? i.icon : p(a).defaults.networks.icon,
            alt: i.name + " logo"
          }, null, 8, de),
          d("p", null, f(i.displayName), 1)
        ], 8, ue))), 128)) : I("", !0)
      ])
    ]));
  }
};
function pe(o) {
  const a = o.split(" ");
  for (let e = 0; e < a.length; e++)
    a[e] = a[e][0].toUpperCase() + a[e].substring(1);
  return a.join(" ");
}
function M(o) {
  return o && typeof o == "object" && !Array.isArray(o);
}
function x(o, ...a) {
  if (!a.length)
    return o;
  const e = a.shift();
  if (M(o) && M(e))
    for (const t in e)
      M(e[t]) ? (o[t] || Object.assign(o, {
        [t]: {}
      }), x(o[t], e[t])) : Object.assign(o, {
        [t]: e[t]
      });
  return x(o, ...a);
}
async function we(o) {
  G() || app.use(L());
  const e = P();
  e.provider = R(new E.providers.Web3Provider(window.ethereum, "any")), e.signer = R(e.provider.getSigner()), e.provider.on("network", (u, n) => {
    n && n !== u && window.location.reload();
  });
  const t = await e.provider.getNetwork();
  if (o) {
    const u = x({ ...T }, { ...o });
    u.networks = [];
    for (let n of o.networks)
      if (n.chainId) {
        const c = T.networks.find((i) => i.chainId === n.chainId);
        n = x({ ...c }, { ...n }), n.displayName || (n.displayName = n.name), u.networks.push(n);
      }
    if (e.defaults = u.defaults, u.networks)
      if (e.networks = {
        available: u.networks.filter((n) => n.chainId !== t.chainId),
        current: u.networks.find((n) => n.chainId === t.chainId),
        known: T.networks
      }, e.networks.current && e.networks.current.contracts) {
        let n = !1;
        try {
          await e.signer.getAddress(), n = !0;
        } catch {
        }
        for (const [c, i] of Object.entries(e.networks.current.contracts)) {
          const h = new E.Contract(i.address, i.abi, n ? e.signer : e.provider);
          e.contracts[c] = R(h);
        }
      } else {
        const n = e.networks.known.find((c) => c.chainId === t.chainId);
        n ? e.networks.current = n : (e.networks.current = t, e.networks.current.displayName = pe(e.networks.current.name)), e.status.wallet.setToWrongNetwork();
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
