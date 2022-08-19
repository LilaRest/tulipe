var J = Object.defineProperty;
var X = (n, e, t) => e in n ? J(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var W = (n, e, t) => (X(n, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as I, watch as N, markRaw as D, openBlock as c, createElementBlock as u, unref as m, toDisplayString as f, createCommentVNode as C, computed as $, Fragment as k, createElementVNode as l, renderList as g, withDirectives as M, vModelDynamic as z, vModelText as H, vModelSelect as ee, createTextVNode as q, pushScopeId as te, popScopeId as se, onUnmounted as ne } from "vue";
import { ethers as S } from "ethers";
class ae {
  add(e, t) {
    if (Object.keys(s.status).includes(e))
      throw `You cannot add a new status called '${e}', this name is either reserved by Vuethers or already existing.`;
    s.status[e] = new re(e, t);
  }
}
class re {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const a of t)
      this.states.push(this._formatState(a));
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
  getRef() {
    return this.state;
  }
  set(e) {
    if (console.log(`status ${this._name} set to ${e}`), e = this._formatState(e), !this._isStateValid(e))
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
  watch(e, t) {
    let a = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (Array.isArray(e)) {
      if (!this._areStatesValid(e))
        throw a;
      N(this._state, () => {
        e.includes(this._state) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw a;
      N(this._state, () => {
        e === this._state && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
class oe extends Object {
  constructor(e, t) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = t, new Proxy(this, {
      get: function(a, r, d) {
        if (Object.keys(a._statefulSource.value).includes(r))
          return a._statefulSource.value[r];
        if (Object.keys(a._statelessSource).includes(r))
          return a._statelessSource[r];
      },
      set: function(a, r, d) {
        if (Object.keys(a._statefulSource.value).includes(r))
          return a._statefulSource.value[r] = d, !0;
        if (Object.keys(a._statelessSource).includes(r))
          return a._statelessSource[r] = d, !0;
        throw `MixedStore object doesn't have any property called '${r}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`;
      }
    });
  }
  add(e, t, a) {
    if (e === "stateful")
      this._statefulSource.value[t] = a;
    else if (e === "stateless")
      this._statelessSource[t] = a;
    else
      throw `The the 'source' argument MixedStore.add() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
  remove(e, t) {
    if (e === "stateful")
      delete this._statefulSource.value[t];
    else if (e === "stateless")
      delete this._statelessSource[t];
    else
      throw `The the 'source' argument MixedStore.remove() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
}
class L extends S.Contract {
  constructor(t, a, r, d) {
    super(a, r, d);
    W(this, "watch", Ze.bind(null, this));
    W(this, "watchRef", Je.bind(null, this));
    return this.name = t, this.abi = r, D(this);
  }
}
class le {
  constructor() {
    this._contracts = [];
  }
  add(e, t, a) {
    if (Object.keys(this).includes(e))
      throw `You cannot add a new contract called '${e}', this name is either reserved by Vuethers or already existing.`;
    if (x.value)
      this[e] = new L(e, t, a, s.signer);
    else if (_.value)
      this[e] = new L(e, t, a, s.provider);
    else
      throw "A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.";
    this._contracts.push(e);
  }
  remove(e) {
    Object.keys(this).includes(e) && (delete this[e], this._contracts = this._contracts.filter((t) => t !== e));
  }
  getAll() {
    const e = {};
    for (const t of this._contracts)
      e[t] = this[t];
    return e;
  }
}
const ie = {
  config: {},
  defaults: {},
  networks: {},
  status: new ae(),
  _chainWatchers: {}
}, ce = I({
  safe: !1,
  provider: null,
  signer: null,
  contracts: new le()
}), s = new oe(ie, ce), j = {
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
};
async function ue() {
  const n = await s.provider.getNetwork().then((e) => e.chainId);
  return s.config.networks.find((e) => e.chainId === n);
}
async function de(n = null) {
  if (n) {
    console.log("AAA");
    const e = V({ ...j }, { ...n });
    e.networks = [];
    for (let t of n.networks)
      if (t.chainId) {
        const a = j.networks.find((r) => r.chainId === t.chainId);
        t = V({ ...a }, { ...t }), t.displayName || (t.displayName = t.name), e.networks.push(t);
      }
    e.networks.getCurrent = ue, s.config = e;
  }
}
async function he() {
  s.status.add("network", [
    "DISCONNECTED",
    "WRONG",
    "UNKNOWN",
    "ERROR",
    "CONNECTED"
  ]), s.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "NOPROVIDER",
    "CONNECTED"
  ]), s.status.add("contracts", [
    "WAITING",
    "ERROR",
    "NOPROVIDER",
    "INITIALIZED"
  ]), s.status.wallet.watch(["REFUSED", "ERROR", "NOPROVIDER"], () => {
    setTimeout(() => {
      s.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function pe() {
  const n = D(new Xe(window.ethereum, "any"));
  if (n) {
    const e = await n.getNetwork().then((a) => a.chainId);
    let t = s.config.networks.find((a) => a.chainId === e);
    t ? (s.provider = n, s.status.network.set("CONNECTED")) : (t = j.networks.find((a) => a.chainId === e), t ? (s.provider = D(new S.providers.JsonRpcProvider(knownNetwork.defaultRPC)), s.status.network.set("WRONG")) : (s.provider = n, s.status.network.set("UNKNOWN"))), n.on("network", (a, r) => {
      r && r !== a && window.location.reload();
    }), n.on("error", () => {
      console.log("Provider error !"), s.status.network.set("ERROR");
    }), t && (s.provider.pollingInterval = t.pollingInterval);
  } else {
    const e = s.config.networks.find((t) => t.default === !0);
    network ? s.provider = D(new S.providers.JsonRpcProvider(e.defaultRPC)) : s.status.network.set("DISCONNECTED");
  }
}
async function me() {
  s.status.network.is("DISCONNECTED") || await B(!0);
}
async function fe() {
  G(async function() {
    const n = await s.config.networks.getCurrent();
    if (n) {
      for (const [e, t] of Object.entries(n.contracts))
        s.contracts.add(e, t.address, t.abi);
      N([x, _], (e, t) => {
        if (console.log("Refresh contracts !"), e !== t)
          for (const a of s.contracts._contracts) {
            const r = s.contracts[a].name, d = s.contracts[a].address, b = s.contracts[a].abi;
            s.contracts.remove(a);
            try {
              s.contracts.add(r, d, b);
            } catch (R) {
              console.log(R), s.status.contracts.set("NOPROVIDER");
              break;
            }
          }
      }), s.status.contracts.set("INITIALIZED");
    } else
      s.status.contracts.set("NOPROVIDER");
  });
}
async function be() {
  s.status.network.is("DISCONNECTED") || s.provider.on("block", async function(n) {
    const e = await s.provider.getBlockWithTransactions(n);
    for (const t of e.transactions)
      Object.keys(s._chainWatchers).includes(t.to) && await s._chainWatchers[t.to].update(), s.status.wallet.is("CONNECTED") && (await s.signer.getAddress(), t.from);
  });
}
const ye = { class: "ConnectWalletButton" }, ve = {
  key: 1,
  disabled: ""
}, we = {
  key: 2,
  disabled: ""
}, ke = {
  key: 3,
  disabled: ""
}, _e = {
  key: 4,
  disabled: ""
}, st = {
  __name: "ConnectWalletButton",
  setup(n) {
    return (e, t) => (c(), u("div", ye, [
      m(s).status.wallet.is("DISCONNECTED") ? (c(), u("button", {
        key: 0,
        onClick: t[0] || (t[0] = (...a) => m(B) && m(B)(...a))
      }, "Connect Wallet")) : m(s).status.wallet.is("REQUESTED") ? (c(), u("button", ve, "Connection requested...")) : m(s).status.wallet.is("REFUSED") ? (c(), u("button", we, "Connection refused!")) : m(s).status.wallet.is("ERROR") ? (c(), u("button", ke, "Connection error!")) : m(s).status.network.is("WRONG") ? (c(), u("button", _e, "Wrong network! (" + f(m(s).networks.current.displayName) + ")", 1)) : m(s).status.wallet.is("CONNECTED") ? (c(), u("button", {
        key: 5,
        onClick: t[1] || (t[1] = (...a) => m(K) && m(K)(...a))
      }, "Disconnect")) : C("", !0)
    ]));
  }
}, ge = /* @__PURE__ */ q("Functions : "), Ee = ["onClick"], Ce = /* @__PURE__ */ l("br", null, null, -1), Ie = { key: 0 }, Ne = /* @__PURE__ */ l("small", null, "Inputs :", -1), Se = ["onUpdate:modelValue", "type", "placeholder"], Re = { key: 0 }, Oe = ["onUpdate:modelValue"], xe = ["onUpdate:modelValue"], Pe = ["value"], De = { key: 1 }, Te = /* @__PURE__ */ l("small", null, "Outputs :", -1), $e = ["onUpdate:modelValue", "placeholder"], Me = { key: 2 }, Ae = /* @__PURE__ */ q(" Events : "), Ve = /* @__PURE__ */ l("p", null, "Logs:", -1), nt = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = n;
    async function t(o, i, h = {}) {
      let w, p, y = null;
      return i ? Array.isArray(i) ? y = o(...i, h) : y = o(i, h) : y = o(h), await y.then((E) => w = E).catch((E) => p = E), { data: w, error: p };
    }
    async function a(o) {
      const i = [];
      for (const y of v.value[o].inputs)
        i.push(y.value);
      const h = {};
      v.value[o].payable && v.value[o].tx.value.value !== "" && (console.log(v.value[o].tx.value.value), h.value = S.utils.parseUnits(v.value[o].tx.value.value, v.value[o].tx.value.unit));
      const { data: w, error: p } = await t(O.value.functions[o], i, h);
      if (p)
        v.value[o].error = p.reason;
      else
        for (let y = 0; y < w.length; y++)
          v.value[o].outputs[y].value = w[y];
    }
    async function r(o) {
      P.value[o.event].count += 1;
      let i = `Block ${o.blockNumber} -> {`;
      for (const h of P.value[o.event].inputs)
        i += `${h.name}:${o.args[h.name]}, `;
      i = i.substring(0, i.length - 2) + "}", P.value[o.event].logs.push(i);
    }
    function d(o) {
      return o.includes("int") ? "number" : "text";
    }
    function b(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function R(o) {
      const i = [];
      return i.push(o.mutability), o.payable && i.push("payable"), i.join(", ");
    }
    const O = $(() => s.contracts[e.contractName]);
    let F = I("");
    const Z = ["wei", "gwei", "ether"], P = I({}), v = I({});
    return Ye(async function() {
      F.value = await O.value.owner();
      for (const o of Object.values(O.value.interface.functions)) {
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
        for (let i = 0; i < o.inputs.length; i++)
          v.value[o.name].inputs[i] = {
            name: o.inputs[i].name,
            type: o.inputs[i].type,
            value: ""
          };
        for (let i = 0; i < o.outputs.length; i++)
          v.value[o.name].outputs[i] = {
            name: o.outputs[i].name,
            type: o.outputs[i].type,
            value: ""
          };
      }
      for (const o of Object.values(O.value.interface.events))
        P.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, O.value.on(o, r);
    }), (o, i) => (c(), u(k, null, [
      l("p", null, "Interact with '" + f(n.contractName) + "' contract :", 1),
      l("ul", null, [
        l("li", null, "Address : " + f(O.value.address), 1),
        l("li", null, "Owner : " + f(F.value), 1),
        l("li", null, [
          ge,
          l("ul", null, [
            (c(!0), u(k, null, g(v.value, (h, w) => (c(), u("li", null, [
              l("button", {
                onClick: (p) => a(w)
              }, f(w), 9, Ee),
              l("small", null, "(" + f(R(h)) + ")", 1),
              Ce,
              Object.keys(h.inputs).length > 0 || h.payable ? (c(), u("div", Ie, [
                Ne,
                l("ul", null, [
                  (c(!0), u(k, null, g(h.inputs, (p, y) => (c(), u("li", null, [
                    M(l("input", {
                      "onUpdate:modelValue": (E) => p.value = E,
                      type: d(p.type),
                      placeholder: b(p)
                    }, null, 8, Se), [
                      [z, p.value]
                    ])
                  ]))), 256)),
                  h.payable ? (c(), u("li", Re, [
                    M(l("input", {
                      "onUpdate:modelValue": (p) => h.tx.value.value = p,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, Oe), [
                      [H, h.tx.value.value]
                    ]),
                    M(l("select", {
                      "onUpdate:modelValue": (p) => h.tx.value.unit = p
                    }, [
                      (c(), u(k, null, g(Z, (p) => l("option", { value: p }, f(p), 9, Pe)), 64))
                    ], 8, xe), [
                      [ee, h.tx.value.unit]
                    ])
                  ])) : C("", !0)
                ])
              ])) : C("", !0),
              Object.keys(h.outputs).length > 0 ? (c(), u("div", De, [
                Te,
                l("ul", null, [
                  (c(!0), u(k, null, g(h.outputs, (p, y) => (c(), u("li", null, [
                    M(l("input", {
                      "onUpdate:modelValue": (E) => p.value = E,
                      type: "text",
                      placeholder: b(p),
                      disabled: ""
                    }, null, 8, $e), [
                      [H, p.value]
                    ])
                  ]))), 256))
                ])
              ])) : C("", !0),
              h.error ? (c(), u("p", Me, f(h.error), 1)) : C("", !0)
            ]))), 256))
          ])
        ]),
        l("li", null, [
          Ae,
          l("ul", null, [
            (c(!0), u(k, null, g(P.value, (h, w) => (c(), u("li", null, [
              l("h3", null, f(w), 1),
              l("p", null, "Count : " + f(h.count), 1),
              Ve,
              l("ul", null, [
                (c(!0), u(k, null, g(h.logs, (p) => (c(), u("li", null, f(p), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, We = { class: "SelectNetworkDropdown" }, Ue = {
  key: 0,
  selected: ""
}, je = ["src", "alt"], Be = ["onClick"], Ge = ["src", "alt"], at = {
  __name: "SelectNetworkDropdown",
  setup(n) {
    async function e(r) {
      const d = s.networks.available.find((b) => b.chainId === parseInt(r));
      if (d) {
        r = S.utils.hexlify(parseInt(r)).toString(), r = S.utils.hexValue(r);
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
              rpcUrls: [d.defaultRPC],
              chainName: d.name,
              nativeCurrency: {
                name: d.currency.symbol,
                symbol: d.currency.symbol,
                decimals: d.currency.decimals
              },
              blockExplorerUrls: d.explorer && d.explorer.url !== "" ? [d.explorer.url] : null
            }]
          });
        }
        const b = await s.provider.getNetwork();
        s.networks.current.chainId !== b.chainId && window.location.reload();
      }
    }
    function t() {
      a.value = !a.value;
    }
    let a = I(!1);
    return (r, d) => (c(), u("div", We, [
      l("ul", { onClick: t }, [
        m(s).networks.current ? (c(), u("li", Ue, [
          l("img", {
            width: "40",
            src: m(s).networks.current.icon ? m(s).networks.current.icon : m(s).defaults.networks.icon,
            alt: m(s).networks.current.name + " logo"
          }, null, 8, je),
          l("p", null, f(m(s).networks.current.displayName), 1)
        ])) : C("", !0),
        a.value ? (c(!0), u(k, { key: 1 }, g(m(s).networks.available, (b) => (c(), u("li", {
          key: b.chainId,
          onClick: (R) => e(b.chainId)
        }, [
          l("img", {
            width: "40",
            src: b.icon ? b.icon : m(s).defaults.networks.icon,
            alt: b.name + " logo"
          }, null, 8, Ge),
          l("p", null, f(b.displayName), 1)
        ], 8, Be))), 128)) : C("", !0)
      ])
    ]));
  }
};
const Fe = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [a, r] of e)
    t[a] = r;
  return t;
}, Y = (n) => (te("data-v-80e9b638"), n = n(), se(), n), He = /* @__PURE__ */ Y(() => /* @__PURE__ */ l("h3", null, "Safe Runners", -1)), Le = /* @__PURE__ */ Y(() => /* @__PURE__ */ l("h3", null, "Status", -1)), Ke = {
  __name: "DebugBar",
  setup(n) {
    return (e, t) => (c(), u("section", null, [
      l("div", null, [
        He,
        l("ul", null, [
          l("li", null, "DApp safe : " + f(m(T)), 1),
          l("li", null, "Network safe : " + f(m(_)), 1),
          l("li", null, "Wallet safe : " + f(m(x)), 1),
          l("li", null, "Contracts safe : " + f(m(A)), 1)
        ])
      ]),
      l("div", null, [
        Le,
        l("ul", null, [
          (c(!0), u(k, null, g(m(s).status, (a, r) => (c(), u("li", null, f(r) + " : " + f(a.get()), 1))), 256))
        ])
      ])
    ]));
  }
}, rt = /* @__PURE__ */ Fe(Ke, [["__scopeId", "data-v-80e9b638"]]), T = $(() => s.safe);
function qe(n) {
  if (T.value)
    n();
  else {
    const e = N(T, () => {
      T.value && (n(), e());
    });
  }
}
const _ = $(() => T.value && !s.status.network.is("DISCONNECTED"));
function G(n) {
  qe(() => {
    if (_.value)
      n();
    else {
      const e = N(_, () => {
        _.value && (n(), e());
      });
    }
  });
}
const x = $(() => _.value && s.status.wallet.is("CONNECTED"));
function ot(n) {
  G(() => {
    if (x.value)
      n();
    else {
      const e = N(x, () => {
        x.value && (n(), e());
      });
    }
  });
}
const A = $(() => _.value && s.status.contracts.is("INITIALIZED"));
function Ye(n) {
  G(() => {
    if (A.value)
      n();
    else {
      const e = N(A, () => {
        A.value && (n(), e());
      });
    }
  });
}
class Qe {
  constructor(e) {
    this.contract = e, this.sources = {}, this.lastUpdateBlock = 0;
  }
  _buildSourceName(e, t) {
    return `${e}:${t.toString}`;
  }
  async update() {
    const e = await s.provider.getBlockNumber();
    if (this.lastUpdateBlock < e) {
      for (const [t, a] of Object.entries(this.sources)) {
        const r = a.state.value;
        a.state.value = await this.contract[a.name](...a.args);
        for (const d of a.callbacks)
          d(a.state.value, r);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, a = null) {
    const r = this._buildSourceName(e, t);
    return Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: t,
      state: I(null),
      callbacks: []
    }, this.contract[e](...t).then((d) => {
      this.sources[r].state.value = d;
    })), a && (this.sources[r].callbacks.includes(a) || this.sources[r].callbacks.push(a)), this.sources[r].state;
  }
  remove(e, t, a) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) || (this.sources[r].callbacks = this.sources[r].callbacks.filter((d) => d !== a));
  }
  getRef(e, t) {
    const a = this._buildSourceName(e, t);
    return this.sources[a].state;
  }
}
function Q(n, e, t, a = null) {
  Object.keys(s._chainWatchers).includes(n.address) || (s._chainWatchers[n.address] = new Qe(n)), s._chainWatchers[n.address].add(e, t, a);
}
function Ze(n, e, t, a) {
  return Q(n, e, t, a), ne(() => s._chainWatchers[n.address].remove(e, t, a)), s._chainWatchers[n.address].remove.bind(s._chainWatchers[n.address], e, t, a);
}
function Je(n, e, t) {
  return Q(n, e, t, null), s._chainWatchers[n.address].getRef(e, t);
}
async function B(n = !1) {
  if (_) {
    if (s.status.wallet.is("DISCONNECTED"))
      try {
        const e = await s.provider.getSigner();
        await e.getAddress(), s.signer = e, s.status.wallet.set("CONNECTED");
      } catch {
        if (console.log("ERROOOOOOR"), n === !0)
          s.status.wallet.set("DISCONNECTED");
        else
          try {
            s.status.wallet.set("REQUESTED"), await s.provider.send("eth_requestAccounts", []);
            const t = await s.provider.getSigner();
            await t.getAddress(), s.signer = t, s.status.wallet.set("CONNECTED");
          } catch (t) {
            console.log(t), t.code === 4001 ? s.status.wallet.set("REFUSED") : s.status.wallet.set("ERROR");
          }
      }
  } else
    s.status.wallet.set("NOPROVIDER");
}
function K() {
  console.log(s.provider), s.signer = null, s.status.wallet.set("DISCONNECTED");
}
class Xe extends S.providers.Web3Provider {
  constructor(...e) {
    return super(...e), D(this);
  }
}
function U(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function V(n, ...e) {
  if (!e.length)
    return n;
  const t = e.shift();
  if (U(n) && U(t))
    for (const a in t)
      U(t[a]) ? (n[a] || Object.assign(n, {
        [a]: {}
      }), V(n[a], t[a])) : Object.assign(n, {
        [a]: t[a]
      });
  return V(n, ...e);
}
function lt(n) {
  const e = n.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function it(n, e) {
  n.config.globalProperties.dapp = s, await de(e), await he(), await pe(), await me(), await fe(), await be(), s.safe = !0;
}
export {
  st as ConnectWalletButton,
  L as Contract,
  nt as ContractInteractor,
  le as ContractsList,
  rt as DebugBar,
  oe as MixedStore,
  at as SelectNetworkDropdown,
  re as Status,
  ae as StatusList,
  Xe as Web3Provider,
  A as areContractsSafe,
  lt as capitalizeWords,
  B as connectWallet,
  s as dapp,
  V as deepMerge,
  K as disconnectWallet,
  it as initVuethers,
  T as isDappSafe,
  U as isObject,
  _ as isProviderSafe,
  x as isSignerSafe,
  Ye as onContractsSafe,
  qe as onDappSafe,
  G as onProviderSafe,
  ot as onSignerSafe,
  Ze as watchChain,
  Je as watchChainRef
};
