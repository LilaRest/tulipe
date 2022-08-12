import { ref as g, withAsyncContext as S, openBlock as s, createElementBlock as i, unref as d, toDisplayString as f, createCommentVNode as E, createBlock as $, Suspense as H, withCtx as B, createVNode as D, Fragment as w, createElementVNode as u, renderList as v, withDirectives as O, vModelDynamic as j, vModelText as G, createTextVNode as F, markRaw as L } from "vue";
import { defineStore as V, getActivePinia as U, createPinia as K } from "pinia";
import { ethers as x } from "ethers";
const Y = V("wallet-status", () => {
  let a = g("disconnected");
  function t() {
    a.value = "disconnected";
  }
  function r() {
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
    setToConnectionRequested: r,
    setToConnectionRefused: e,
    setToConnected: o,
    setToWrongNetwork: n,
    setToError: m
  };
}), N = V("dapp", () => {
  const a = g(new x.providers.Web3Provider(window.ethereum, "any"));
  let t = g(a.value.getSigner()), r = {}, e = {}, m = {};
  const o = {
    wallet: Y()
  };
  return {
    provider: a,
    signer: t,
    networks: r,
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
    let t, r;
    const e = N();
    async function m() {
      try {
        return await e.signer.getAddress(), e.status.wallet.setToConnected(), !0;
      } catch {
        return !1;
      }
    }
    [t, r] = S(() => m()), await t, r();
    async function o() {
      if (!await m())
        try {
          e.status.wallet.setToConnectionRequested(), await e.provider.send("eth_requestAccounts", []), e.signer = e.provider.getSigner(), e.status.wallet.setToConnected();
          for (const [c, h] of Object.entries(e.contracts))
            e.contracts[c] = await h.connect(e.signer);
        } catch (c) {
          c.code === 4001 ? e.status.wallet.setToConnectionRefused() : e.status.wallet.setToError();
        }
    }
    function n() {
      e.status.wallet.setToDisconnected();
    }
    return (c, h) => (s(), i("div", z, [
      d(e).status.wallet.status == "disconnected" ? (s(), i("button", {
        key: 0,
        onClick: o
      }, "Connect Wallet")) : d(e).status.wallet.status == "connection-requested" ? (s(), i("button", X, "Connection requested...")) : d(e).status.wallet.status == "connection-refused" ? (s(), i("button", J, "Connection refused!")) : d(e).status.wallet.status == "connection-error" ? (s(), i("button", Q, "Connection error!")) : d(e).status.wallet.status == "wrong-network" ? (s(), i("button", Z, "Wrong network! (" + f(d(e).networks.current.displayName) + ")", 1)) : d(e).status.wallet.status == "connected" ? (s(), i("button", {
        key: 5,
        onClick: n
      }, "Disconnect")) : E("", !0)
    ]));
  }
}, ke = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (t, r) => (s(), $(H, null, {
      default: B(() => [
        D(ee)
      ]),
      _: 1
    }));
  }
}, te = /* @__PURE__ */ F("Functions : "), ne = ["onClick"], ae = ["onUpdate:modelValue", "type", "placeholder"], oe = ["onUpdate:modelValue", "placeholder"], re = { key: 0 }, se = /* @__PURE__ */ F(" Events : "), ce = /* @__PURE__ */ u("p", null, "Logs:", -1), le = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(a) {
    let t, r;
    const e = a, o = N().contracts[e.contractName], n = ([t, r] = S(() => o.owner()), t = await t, r(), t);
    async function c(l) {
      try {
        const b = await o[l](...y.value[l].inputs);
        y.value[l].outputs[0] = b;
      } catch (b) {
        y.value[l].error = b.reason;
      }
    }
    const h = o.interface.functions, y = g({});
    for (const l of Object.values(h)) {
      y.value[l.name] = {
        inputs: [],
        outputs: [],
        error: null,
        properties: {
          constant: l.constant,
          payable: l.payable,
          inputs: l.inputs,
          outputs: l.outputs
        }
      };
      for (const b in h[funcName].inputs)
        y.value[l.name].inputs[b] = "";
      for (const b in h[funcName].outputs)
        y.value[l.name].outputs[b] = "";
    }
    async function W(l) {
      _.value[l.event].count += 1;
      let b = `Block ${l.blockNumber} -> {`;
      for (const p of A[l.eventSignature].inputs)
        b += `${p.name}:${l.args[p.name]}, `;
      b = b.substring(0, b.length - 2) + "}", _.value[l.event].logs.push(b);
    }
    const A = o.interface.events, _ = g({});
    for (const l of Object.values(A))
      _.value[l.name] = {
        count: 0,
        logs: []
      }, o.on(l, W);
    function q(l) {
      return l.includes("int") ? "number" : "text";
    }
    return (l, b) => (s(), i(w, null, [
      u("p", null, "Interact with '" + f(a.contractName) + "' contract :", 1),
      u("ul", null, [
        u("li", null, "Address : " + f(d(o).address), 1),
        u("li", null, "Owner : " + f(d(n)), 1),
        u("li", null, [
          te,
          u("ul", null, [
            (s(!0), i(w, null, v(y.value, (p, I) => (s(), i("li", null, [
              u("button", {
                onClick: (k) => c(I)
              }, f(I) + " (" + f(p.properties.constant ? "read-only" : "") + f(p.properties.payable ? ", payable" : "") + ")", 9, ne),
              (s(!0), i(w, null, v(p.properties.inputs, (k, C) => O((s(), i("input", {
                "onUpdate:modelValue": (R) => p.inputs[C] = R,
                type: q(k.type),
                placeholder: k.type
              }, null, 8, ae)), [
                [j, p.inputs[C]]
              ])), 256)),
              (s(!0), i(w, null, v(p.properties.outputs, (k, C) => O((s(), i("input", {
                "onUpdate:modelValue": (R) => p.outputs[C] = R,
                type: "text",
                placeholder: k.type,
                disabled: ""
              }, null, 8, oe)), [
                [G, p.outputs[C]]
              ])), 256)),
              p.error ? (s(), i("p", re, f(p.error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        u("li", null, [
          se,
          u("ul", null, [
            (s(!0), i(w, null, v(_.value, (p, I) => (s(), i("li", null, [
              u("h3", null, f(I), 1),
              u("p", null, "Count : " + f(p.count), 1),
              ce,
              u("ul", null, [
                (s(!0), i(w, null, v(p.logs, (k) => (s(), i("li", null, f(k), 1))), 256))
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
    return (r, e) => (s(), $(H, null, {
      default: B(() => [
        D(le, {
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
    async function r(o) {
      const n = t.networks.available.find((c) => c.chainId === parseInt(o));
      if (n) {
        o = x.utils.hexlify(parseInt(o)).toString(), o = x.utils.hexValue(o);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: o
            }]
          });
        } catch (h) {
          h.code === 4902 && (console.log("ADD CHAIN"), await window.ethereum.request({
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
        const c = await t.provider.getNetwork();
        t.networks.current.chainId !== c.chainId && window.location.reload();
      }
    }
    let e = g(!1);
    function m() {
      e.value = !e.value;
    }
    return (o, n) => (s(), i("div", ie, [
      u("ul", { onClick: m }, [
        d(t).networks.current ? (s(), i("li", ue, [
          u("img", {
            width: "40",
            src: d(t).networks.current.icon ? d(t).networks.current.icon : d(t).defaults.networks.icon,
            alt: d(t).networks.current.name + " logo"
          }, null, 8, de),
          u("p", null, f(d(t).networks.current.displayName), 1)
        ])) : E("", !0),
        e.value ? (s(!0), i(w, { key: 1 }, v(d(t).networks.available, (c) => (s(), i("li", {
          key: c.chainId,
          onClick: (h) => r(c.chainId)
        }, [
          u("img", {
            width: "40",
            src: c.icon ? c.icon : d(t).defaults.networks.icon,
            alt: c.name + " logo"
          }, null, 8, me),
          u("p", null, f(c.displayName), 1)
        ], 8, pe))), 128)) : E("", !0)
      ])
    ]));
  }
};
function he(a) {
  const t = a.split(" ");
  for (let r = 0; r < t.length; r++)
    t[r] = t[r][0].toUpperCase() + t[r].substring(1);
  return t.join(" ");
}
function M(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function P(a, ...t) {
  if (!t.length)
    return a;
  const r = t.shift();
  if (M(a) && M(r))
    for (const e in r)
      M(r[e]) ? (a[e] || Object.assign(a, {
        [e]: {}
      }), P(a[e], r[e])) : Object.assign(a, {
        [e]: r[e]
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
        const c = T.networks.find((h) => h.chainId === n.chainId);
        n = P({ ...c }, { ...n }), n.displayName || (n.displayName = n.name), o.networks.push(n);
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
        for (const [c, h] of Object.entries(e.networks.current.contracts)) {
          const y = new x.Contract(h.address, h.abi, n ? e.signer : e.provider);
          e.contracts[c] = L(y);
        }
      } else {
        const n = e.networks.known.find((c) => c.chainId === m.chainId);
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
