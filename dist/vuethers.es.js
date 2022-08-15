import { ref as C, markRaw as $, watch as N, withAsyncContext as V, openBlock as c, createElementBlock as u, unref as f, toDisplayString as y, createCommentVNode as E, createBlock as A, Suspense as U, withCtx as j, createVNode as G, Fragment as k, createElementVNode as i, renderList as g, withDirectives as R, vModelDynamic as L, vModelText as D, vModelSelect as q, createTextVNode as F } from "vue";
import { ethers as I } from "ethers";
class z extends Object {
  constructor(e, n) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = n, new Proxy(this, {
      get: function(o, a, h) {
        if (Object.keys(o._statefulSource.value).includes(a))
          return o._statefulSource.value[a];
        if (Object.keys(o._statelessSource).includes(a))
          return o._statelessSource[a];
      },
      set: function(o, a, h) {
        if (Object.keys(o._statefulSource.value).includes(a))
          return o._statefulSource.value[a] = h, !0;
        if (Object.keys(o._statelessSource).includes(a))
          return o._statelessSource[a] = h, !0;
        throw `MixedStore object doesn't have any property called '${a}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`;
      }
    });
  }
  add(e, n, o) {
    if (e === "stateful")
      this._statefulSource.value[n] = o;
    else if (e === "stateless")
      this._statelessSource[n] = o;
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
const Y = {
  config: {},
  defaults: {},
  networks: {},
  status: {
    add: (s, e) => {
      if (Object.keys(t.status).includes(s))
        throw `You cannot add a new status called '${s}', this name is either reserved by Vuethers or already existing.`;
      t.status[s] = new Ie(s, e);
    }
  }
}, Q = C({
  initialized: C(!1),
  provider: null,
  signer: null,
  contracts: {
    _contracts: [],
    add: (s, e, n) => {
      if (Object.keys(t.contracts).includes(s))
        throw `You cannot add a new contract called '${s}', this name is either reserved by Vuethers or already existing.`;
      let o = null;
      try {
        o = new I.Contract(e, n, t.signer);
      } catch {
        o = new I.Contract(e, n, t.provider);
      }
      t.contracts[s] = $(o), t.contracts._contracts.push(s), N(() => t.signer, () => {
        console.log("refresh signer of " + s);
        try {
          t.contracts[s].connect(t.signer);
        } catch (a) {
          console.log("error while refreshing"), console.log(a), t.contracts[s].connect(t.provider);
        }
      });
    },
    getAll: () => {
      const s = {};
      for (const e of t.contracts._contracts)
        s[e] = t.contracts[e];
      return s;
    }
  }
}), t = new z(Y, Q), O = {
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
}, X = { class: "ConnectWalletButton" }, J = {
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
  async setup(s) {
    let e, n;
    async function o() {
      try {
        return await t.signer.getAddress(), t.status.wallet.set("CONNECTED"), !0;
      } catch {
        return !1;
      }
    }
    [e, n] = V(() => o()), await e, n();
    async function a() {
      if (!await o())
        try {
          t.status.wallet.set("REQUESTED"), await t.provider.send("eth_requestAccounts", []), t.signer = t.provider.getSigner(), t.status.wallet.set("CONNECTED");
        } catch (p) {
          console.log(p), p.code === 4001 ? t.status.wallet.set("REFUSED") : t.status.wallet.set("ERROR");
        }
    }
    function h() {
      t.status.wallet.set("DISCONNECTED");
    }
    return (p, x) => (c(), u("div", X, [
      f(t).status.wallet.is("DISCONNECTED") ? (c(), u("button", {
        key: 0,
        onClick: a
      }, "Connect Wallet")) : f(t).status.wallet.is("REQUESTED") ? (c(), u("button", J, "Connection requested...")) : f(t).status.wallet.is("REFUSED") ? (c(), u("button", Z, "Connection refused!")) : f(t).status.wallet.is("ERROR") ? (c(), u("button", ee, "Connection error!")) : f(t).status.network.is("WRONG") ? (c(), u("button", te, "Wrong network! (" + y(f(t).networks.current.displayName) + ")", 1)) : f(t).status.wallet.is("CONNECTED") ? (c(), u("button", {
        key: 5,
        onClick: h
      }, "Disconnect")) : E("", !0)
    ]));
  }
}, Te = {
  __name: "ConnectWalletButton",
  setup(s) {
    return (e, n) => (c(), A(U, null, {
      default: j(() => [
        G(ne)
      ]),
      _: 1
    }));
  }
}, ae = /* @__PURE__ */ F("Functions : "), se = ["onClick"], re = /* @__PURE__ */ i("br", null, null, -1), oe = { key: 0 }, le = /* @__PURE__ */ i("small", null, "Inputs :", -1), ie = ["onUpdate:modelValue", "type", "placeholder"], ce = { key: 0 }, ue = ["onUpdate:modelValue"], de = ["onUpdate:modelValue"], he = ["value"], me = { key: 1 }, pe = /* @__PURE__ */ i("small", null, "Outputs :", -1), fe = ["onUpdate:modelValue", "placeholder"], be = { key: 2 }, ye = /* @__PURE__ */ F(" Events : "), ve = /* @__PURE__ */ i("p", null, "Logs:", -1), we = {
  __name: "_ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  async setup(s) {
    let e, n;
    const o = s, a = t.contracts[o.contractName], h = ([e, n] = V(() => a.owner()), e = await e, n(), e), p = ["wei", "gwei", "ether"];
    async function x(r, l, d = {}) {
      let w, m, b = null;
      return l ? Array.isArray(l) ? b = r(...l, d) : b = r(l, d) : b = r(d), await b.then((_) => w = _).catch((_) => m = _), { data: w, error: m };
    }
    async function B(r) {
      const l = [];
      for (const b of v.value[r].inputs)
        l.push(b.value);
      const d = {};
      v.value[r].payable && v.value[r].tx.value.value !== "" && (console.log(v.value[r].tx.value.value), d.value = I.utils.parseUnits(v.value[r].tx.value.value, v.value[r].tx.value.unit));
      const { data: w, error: m } = await x(a.functions[r], l, d);
      if (m)
        v.value[r].error = m.reason;
      else
        for (let b = 0; b < w.length; b++)
          v.value[r].outputs[b].value = w[b];
    }
    const v = C({});
    for (const r of Object.values(a.interface.functions)) {
      v.value[r.name] = {
        inputs: [],
        outputs: [],
        error: null,
        payable: r.payable,
        mutability: r.stateMutability === "view" || r.stateMutability === "pure" ? "read" : "write",
        tx: {
          value: {
            value: "",
            unit: "wei"
          }
        }
      };
      for (let l = 0; l < r.inputs.length; l++)
        v.value[r.name].inputs[l] = {
          name: r.inputs[l].name,
          type: r.inputs[l].type,
          value: ""
        };
      for (let l = 0; l < r.outputs.length; l++)
        v.value[r.name].outputs[l] = {
          name: r.outputs[l].name,
          type: r.outputs[l].type,
          value: ""
        };
    }
    async function H(r) {
      S.value[r.event].count += 1;
      let l = `Block ${r.blockNumber} -> {`;
      for (const d of S.value[r.event].inputs)
        l += `${d.name}:${r.args[d.name]}, `;
      l = l.substring(0, l.length - 2) + "}", S.value[r.event].logs.push(l);
    }
    const S = C({});
    for (const r of Object.values(a.interface.events))
      S.value[r.name] = {
        count: 0,
        logs: [],
        inputs: r.inputs
      }, a.on(r, H);
    function W(r) {
      return r.includes("int") ? "number" : "text";
    }
    function M(r) {
      return `${r.name && r.name !== "null" ? r.name : "unnamed"} (${r.type})`;
    }
    function K(r) {
      const l = [];
      return l.push(r.mutability), r.payable && l.push("payable"), l.join(", ");
    }
    return (r, l) => (c(), u(k, null, [
      i("p", null, "Interact with '" + y(s.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + y(f(a).address), 1),
        i("li", null, "Owner : " + y(f(h)), 1),
        i("li", null, [
          ae,
          i("ul", null, [
            (c(!0), u(k, null, g(v.value, (d, w) => (c(), u("li", null, [
              i("button", {
                onClick: (m) => B(w)
              }, y(w), 9, se),
              i("small", null, "(" + y(K(d)) + ")", 1),
              re,
              Object.keys(d.inputs).length > 0 || d.payable ? (c(), u("div", oe, [
                le,
                i("ul", null, [
                  (c(!0), u(k, null, g(d.inputs, (m, b) => (c(), u("li", null, [
                    R(i("input", {
                      "onUpdate:modelValue": (_) => m.value = _,
                      type: W(m.type),
                      placeholder: M(m)
                    }, null, 8, ie), [
                      [L, m.value]
                    ])
                  ]))), 256)),
                  d.payable ? (c(), u("li", ce, [
                    R(i("input", {
                      "onUpdate:modelValue": (m) => d.tx.value.value = m,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, ue), [
                      [D, d.tx.value.value]
                    ]),
                    R(i("select", {
                      "onUpdate:modelValue": (m) => d.tx.value.unit = m
                    }, [
                      (c(), u(k, null, g(p, (m) => i("option", { value: m }, y(m), 9, he)), 64))
                    ], 8, de), [
                      [q, d.tx.value.unit]
                    ])
                  ])) : E("", !0)
                ])
              ])) : E("", !0),
              Object.keys(d.outputs).length > 0 ? (c(), u("div", me, [
                pe,
                i("ul", null, [
                  (c(!0), u(k, null, g(d.outputs, (m, b) => (c(), u("li", null, [
                    R(i("input", {
                      "onUpdate:modelValue": (_) => m.value = _,
                      type: "text",
                      placeholder: M(m),
                      disabled: ""
                    }, null, 8, fe), [
                      [D, m.value]
                    ])
                  ]))), 256))
                ])
              ])) : E("", !0),
              d.error ? (c(), u("p", be, y(d.error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          ye,
          i("ul", null, [
            (c(!0), u(k, null, g(S.value, (d, w) => (c(), u("li", null, [
              i("h3", null, y(w), 1),
              i("p", null, "Count : " + y(d.count), 1),
              ve,
              i("ul", null, [
                (c(!0), u(k, null, g(d.logs, (m) => (c(), u("li", null, y(m), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, $e = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const e = s;
    return (n, o) => (c(), A(U, null, {
      default: j(() => [
        G(we, {
          contractName: e.contractName
        }, null, 8, ["contractName"])
      ]),
      _: 1
    }));
  }
}, ke = { class: "SelectNetworkDropdown" }, _e = {
  key: 0,
  selected: ""
}, ge = ["src", "alt"], Ee = ["onClick"], Ce = ["src", "alt"], Me = {
  __name: "SelectNetworkDropdown",
  setup(s) {
    async function e(a) {
      const h = t.networks.available.find((p) => p.chainId === parseInt(a));
      if (h) {
        a = I.utils.hexlify(parseInt(a)).toString(), a = I.utils.hexValue(a);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: a
            }]
          });
        } catch (x) {
          x.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: a,
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
        const p = await t.provider.getNetwork();
        t.networks.current.chainId !== p.chainId && window.location.reload();
      }
    }
    let n = C(!1);
    function o() {
      n.value = !n.value;
    }
    return (a, h) => (c(), u("div", ke, [
      i("ul", { onClick: o }, [
        f(t).networks.current ? (c(), u("li", _e, [
          i("img", {
            width: "40",
            src: f(t).networks.current.icon ? f(t).networks.current.icon : f(t).defaults.networks.icon,
            alt: f(t).networks.current.name + " logo"
          }, null, 8, ge),
          i("p", null, y(f(t).networks.current.displayName), 1)
        ])) : E("", !0),
        n.value ? (c(!0), u(k, { key: 1 }, g(f(t).networks.available, (p) => (c(), u("li", {
          key: p.chainId,
          onClick: (x) => e(p.chainId)
        }, [
          i("img", {
            width: "40",
            src: p.icon ? p.icon : f(t).defaults.networks.icon,
            alt: p.name + " logo"
          }, null, 8, Ce),
          i("p", null, y(p.displayName), 1)
        ], 8, Ee))), 128)) : E("", !0)
      ])
    ]));
  }
};
class Ie {
  constructor(e, n) {
    if (this._name = e, this.states = [], !Array.isArray(n))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${n}`;
    for (const o of n)
      this.states.push(this._formatState(o));
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
  watch(e) {
    N(this._state, () => {
      e(this.get());
    });
  }
  watchState(e, n) {
    if (!this._isStateValid(e))
      throw `The state given to the watchState() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    N(this._state, (o, a) => {
      this.is(e) && n(this.get());
    });
  }
  watchStates(e, n) {
    if (!this._areStatesValid(e))
      throw `The states given to the watchStates() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
    N(this._state, () => {
      this.isIn(e) && n(this.get());
    });
  }
}
function De(s, e) {
  if (t.initialized)
    s();
  else {
    const n = N(() => t.initialized, () => {
      s(), n();
    });
  }
}
function xe(s) {
  const e = s.split(" ");
  for (let n = 0; n < e.length; n++)
    e[n] = e[n][0].toUpperCase() + e[n].substring(1);
  return e.join(" ");
}
function T(s) {
  return s && typeof s == "object" && !Array.isArray(s);
}
function P(s, ...e) {
  if (!e.length)
    return s;
  const n = e.shift();
  if (T(s) && T(n))
    for (const o in n)
      T(n[o]) ? (s[o] || Object.assign(s, {
        [o]: {}
      }), P(s[o], n[o])) : Object.assign(s, {
        [o]: n[o]
      });
  return P(s, ...e);
}
async function Se() {
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
async function Ne() {
  t.provider = $(new I.providers.Web3Provider(window.ethereum, "any")), t.provider.on("network", (s, e) => {
    e && e !== s && window.location.reload();
  });
}
async function Re() {
  t.signer = $(t.provider.getSigner());
}
async function Ve(s, e) {
  console.log(s), s.config.globalProperties.dapp = t, await Se(), await Ne(), await Re();
  const n = await t.provider.getNetwork();
  if (e) {
    const o = P({ ...O }, { ...e });
    o.networks = [];
    for (let a of e.networks)
      if (a.chainId) {
        const h = O.networks.find((p) => p.chainId === a.chainId);
        a = P({ ...h }, { ...a }), a.displayName || (a.displayName = a.name), o.networks.push(a);
      }
    if (t.defaults = o.defaults, o.networks)
      if (t.networks = {
        available: o.networks.filter((a) => a.chainId !== n.chainId),
        current: o.networks.find((a) => a.chainId === n.chainId),
        known: O.networks
      }, t.networks.current && t.networks.current.contracts)
        for (const [a, h] of Object.entries(t.networks.current.contracts))
          t.contracts.add(a, h.address, h.abi);
      else {
        const a = t.networks.known.find((h) => h.chainId === n.chainId);
        a ? t.networks.current = a : (t.networks.current = n, t.networks.current.displayName = xe(t.networks.current.name)), t.status.network.set("WRONG");
      }
  }
  t.initialized = !0;
}
export {
  Te as ConnectWalletButton,
  $e as ContractInteractor,
  Me as SelectNetworkDropdown,
  Ie as Status,
  t as dapp,
  Ve as initVuethers,
  De as safeRun
};
