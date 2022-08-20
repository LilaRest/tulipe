import { ref as I, watch as N, computed as P, markRaw as Y, onUnmounted as Q, resolveComponent as F, openBlock as c, createBlock as G, withCtx as H, createElementVNode as i, unref as d, createElementBlock as l, toDisplayString as m, createCommentVNode as E, Fragment as v, renderList as O, withDirectives as D, vModelDynamic as Z, vModelText as W, vModelSelect as J, createTextVNode as L, pushScopeId as X, popScopeId as z, renderSlot as _ } from "vue";
import { ethers as C } from "ethers";
class ee {
  add(e, t) {
    if (Object.keys(s.status).includes(e))
      throw `You cannot add a new status called '${e}', this name is either reserved by Vuethers or already existing.`;
    s.status[e] = new te(e, t);
  }
}
class te {
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
class se {
  constructor() {
    this._contracts = [], this.areSafe = P(() => s.provider.isSafe.value && s.status.contracts.is("INITIALIZED"));
  }
  add(e, t, a) {
    if (Object.keys(this).includes(e))
      throw `You cannot add a new contract called '${e}', this name is either reserved by Vuethers or already existing.`;
    if (s.signer.isSafe.value)
      this[e] = new U(new C.Contract(t, a, s.signer.proxy.getEthersObject()));
    else if (s.provider.isSafe.value)
      this[e] = new U(new C.Contract(t, a, s.provider.proxy.getEthersObject()));
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
  onSafe(e) {
    s.provider.onSafe(() => {
      if (this.areSafe.value)
        e();
      else {
        const t = N(this.areSafe, () => {
          this.areSafe.value && (e(), t());
        });
      }
    });
  }
}
function ne(n) {
  for (var e = []; n && n !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(n)), n = Object.getPrototypeOf(n);
  return e;
}
class ae {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && Y(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = ne(this._parent._extensionObject);
      for (const t of e)
        if (t !== "constructor")
          try {
            this._parent._ethersObject[t] = this._parent._extensionObject[t].bind(this._parent._ethersObject);
          } catch (a) {
            if (a instanceof TypeError)
              this._parent._ethersObject[t] = this._parent._extensionObject[t];
            else
              throw a;
          }
    }
  }
}
class M {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new ae(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(a, r, h) {
        if (a._ethersObject && a._ethersObject[r])
          try {
            return a._ethersObject[r].bind(a._ethersObject);
          } catch (b) {
            if (b.message.includes(".bind is not a function"))
              return a._ethersObject[r];
            throw b;
          }
        else if (a[r])
          return a[r];
      },
      set: function(a, r, h) {
        return a._ethersObject && a._ethersObject[r] ? (a._ethersObject[r] = h, !0) : (a[r] = h, !0);
      }
    });
  }
}
class re {
}
class oe extends M {
  constructor(e = null) {
    const t = new re();
    super(e, t), this.isSafe = P(() => s.isSafe.value && !s.status.provider.is("DISCONNECTED"));
  }
  onSafe(e) {
    s.onSafe(() => {
      if (this.isSafe.value)
        e();
      else {
        const t = N(this.isSafe, () => {
          this.isSafe.value && (e(), t());
        });
      }
    });
  }
}
class ie {
}
class ce extends M {
  constructor(e = null) {
    const t = new ie();
    super(e, t), this.isSafe = P(() => s.provider.isSafe.value && s.status.signer.is("CONNECTED"));
  }
  onSafe(e) {
    s.provider.onSafe(() => {
      if (this.isSafe.value)
        e();
      else {
        const t = N(this.isSafe, () => {
          this.isSafe.value && (e(), t());
        });
      }
    });
  }
}
class le {
  _watch(e, t, a = null) {
    Object.keys(s._chainWatchers).includes(this.address) || (s._chainWatchers[this.address] = new ze(this)), s._chainWatchers[this.address].add(e, t, a);
  }
  watch(e, t, a) {
    return this._watch(e, t, a), Q(() => s._chainWatchers[this.address].remove(e, t, a)), s._chainWatchers[this.address].remove.bind(s._chainWatchers[this.address], e, t, a);
  }
  watchRef(e, t) {
    return this._watch(e, t, null), s._chainWatchers[this.address].getRef(e, t);
  }
}
class U extends M {
  constructor(e = null) {
    const t = new le();
    super(e, t);
  }
}
class ue {
  constructor() {
    this.config = {}, this.defaults = {}, this.networks = {}, this._chainWatchers = {}, this.status = new ee(), this.provider = new oe(), this.signer = new ce(), this.contracts = new se(), this.safe = I(!1), this.isSafe = P(() => this.safe.value);
  }
  onSafe(e) {
    if (this.isSafe.value)
      e();
    else {
      const t = N(this.isSafe, () => {
        this.isSafe.value && (e(), t());
      });
    }
  }
}
const s = new ue(), j = {
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
async function de() {
  const n = await s.provider.getNetwork().then((e) => e.chainId);
  return s.config.networks.find((e) => e.chainId === n);
}
async function he(n = null) {
  if (n) {
    const e = T({ ...j }, { ...n });
    e.networks = [];
    for (let t of n.networks)
      if (t.chainId) {
        const a = j.networks.find((r) => r.chainId === t.chainId);
        t = T({ ...a }, { ...t }), t.displayName || (t.displayName = t.name), e.networks.push(t);
      }
    e.networks.getCurrent = de, s.config = e;
  }
}
async function pe() {
  s.status.add("provider", [
    "DISCONNECTED",
    "WRONG",
    "UNKNOWN",
    "ERROR",
    "CONNECTED"
  ]), s.status.add("signer", [
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
  ]), s.status.signer.watch(["REFUSED", "ERROR", "NOPROVIDER"], () => {
    setTimeout(() => {
      s.status.signer.set("DISCONNECTED");
    }, 5e3);
  });
}
async function fe() {
  if (s.provider.proxy.setEthersObject(new C.providers.Web3Provider(window.ethereum, "any")), s.provider._ethersObject) {
    const n = await s.provider.getNetwork().then((t) => t.chainId);
    let e = s.config.networks.find((t) => t.chainId === n);
    e ? (s.provider = s.provider, s.status.provider.set("CONNECTED")) : (e = j.networks.find((t) => t.chainId === n), e ? (s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(knownNetwork.defaultRPC)), s.status.provider.set("WRONG")) : (s.provider = s.provider, s.status.provider.set("UNKNOWN"))), s.provider.on("network", (t, a) => {
      a && a !== t && window.location.reload();
    }), s.provider.on("error", () => {
      console.log("Provider error !"), s.status.provider.set("ERROR");
    }), e && (s.provider.pollingInterval = e.pollingInterval);
  } else {
    const n = s.config.networks.find((e) => e.default === !0);
    network ? s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(n.defaultRPC)) : s.status.provider.set("DISCONNECTED");
  }
}
async function me() {
  s.status.provider.is("DISCONNECTED") || await A(!0);
}
async function be() {
  s.provider.onSafe(async function() {
    const n = await s.config.networks.getCurrent();
    if (n) {
      for (const [e, t] of Object.entries(n.contracts))
        s.contracts.add(e, t.address, t.abi);
      N([s.signer.isSafe, s.provider.isSafe], (e, t) => {
        if (console.log("Refresh contracts !"), e !== t)
          for (const [a, r] of Object.entries(s.contracts.getAll())) {
            const h = a, b = r.address, x = r.interface.format("json");
            s.contracts.remove(a);
            try {
              s.contracts.add(h, b, x);
            } catch (g) {
              console.log(g), s.status.contracts.set("NOPROVIDER");
              break;
            }
          }
      }), s.status.contracts.set("INITIALIZED");
    } else
      s.status.contracts.set("NOPROVIDER");
  });
}
async function ye() {
  s.provider.onSafe(() => {
    s.provider.on("block", async function(n) {
      const e = await s.provider.getBlockWithTransactions(n);
      for (const t of e.transactions)
        Object.keys(s._chainWatchers).includes(t.to) && await s._chainWatchers[t.to].update(), s.status.signer.is("CONNECTED") && (await s.signer.getAddress(), t.from);
    });
  });
}
const ve = { class: "ConnectWalletButton" }, _e = {
  key: 1,
  disabled: ""
}, we = {
  key: 2,
  disabled: ""
}, ke = {
  key: 3,
  disabled: ""
}, ge = {
  key: 4,
  disabled: ""
}, st = {
  __name: "ConnectWalletButton",
  setup(n) {
    return (e, t) => {
      const a = F("OnProviderSafe");
      return c(), G(a, null, {
        default: H(() => [
          i("div", ve, [
            d(s).status.signer.is("DISCONNECTED") ? (c(), l("button", {
              key: 0,
              onClick: t[0] || (t[0] = (...r) => d(A) && d(A)(...r))
            }, "Connect Wallet")) : d(s).status.signer.is("REQUESTED") ? (c(), l("button", _e, "Connection requested...")) : d(s).status.signer.is("REFUSED") ? (c(), l("button", we, "Connection refused!")) : d(s).status.signer.is("ERROR") ? (c(), l("button", ke, "Connection error!")) : d(s).status.provider.is("WRONG") ? (c(), l("button", ge, "Wrong network! (" + m(d(s).networks.current.displayName) + ")", 1)) : d(s).status.signer.is("CONNECTED") ? (c(), l("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...r) => d(B) && d(B)(...r))
            }, "Disconnect")) : E("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, Ee = /* @__PURE__ */ L("Functions : "), Oe = ["onClick"], Ce = /* @__PURE__ */ i("br", null, null, -1), Se = { key: 0 }, Ie = /* @__PURE__ */ i("small", null, "Inputs :", -1), Ne = ["onUpdate:modelValue", "type", "placeholder"], xe = { key: 0 }, Re = ["onUpdate:modelValue"], Pe = ["onUpdate:modelValue"], De = ["value"], Te = { key: 1 }, $e = /* @__PURE__ */ i("small", null, "Outputs :", -1), je = ["onUpdate:modelValue", "placeholder"], Ae = { key: 2 }, Me = /* @__PURE__ */ L(" Events : "), Ve = /* @__PURE__ */ i("p", null, "Logs:", -1), nt = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = n;
    async function t(o, u, p = {}) {
      let k, f, y = null;
      return u ? Array.isArray(u) ? y = o(...u, p) : y = o(u, p) : y = o(p), await y.then((S) => k = S).catch((S) => f = S), { data: k, error: f };
    }
    async function a(o) {
      const u = [];
      for (const y of w.value[o].inputs)
        u.push(y.value);
      const p = {};
      w.value[o].payable && w.value[o].tx.value.value !== "" && (p.value = C.utils.parseUnits(w.value[o].tx.value.value, w.value[o].tx.value.unit));
      const { data: k, error: f } = await t(g.value.functions[o], u, p);
      if (f)
        w.value[o].error = f.reason;
      else
        for (let y = 0; y < k.length; y++)
          w.value[o].outputs[y].value = k[y];
    }
    async function r(o) {
      R.value[o.event].count += 1;
      let u = `Block ${o.blockNumber} -> {`;
      for (const p of R.value[o.event].inputs)
        u += `${p.name}:${o.args[p.name]}, `;
      u = u.substring(0, u.length - 2) + "}", R.value[o.event].logs.push(u);
    }
    function h(o) {
      return o.includes("int") ? "number" : "text";
    }
    function b(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function x(o) {
      const u = [];
      return u.push(o.mutability), o.payable && u.push("payable"), u.join(", ");
    }
    const g = P(() => s.contracts[e.contractName]);
    let V = I("");
    const q = ["wei", "gwei", "ether"], R = I({}), w = I({});
    return s.contracts.onSafe(async function() {
      V.value = await g.value.owner();
      for (const o of Object.values(g.value.interface.functions)) {
        w.value[o.name] = {
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
        for (let u = 0; u < o.inputs.length; u++)
          w.value[o.name].inputs[u] = {
            name: o.inputs[u].name,
            type: o.inputs[u].type,
            value: ""
          };
        for (let u = 0; u < o.outputs.length; u++)
          w.value[o.name].outputs[u] = {
            name: o.outputs[u].name,
            type: o.outputs[u].type,
            value: ""
          };
      }
      for (const o of Object.values(g.value.interface.events))
        R.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, g.value.on(o, r);
    }), (o, u) => d(s).contracts.areSafe && g.value ? (c(), l(v, { key: 0 }, [
      i("p", null, "Interact with '" + m(n.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + m(g.value.address), 1),
        i("li", null, "Owner : " + m(V.value), 1),
        i("li", null, [
          Ee,
          i("ul", null, [
            (c(!0), l(v, null, O(w.value, (p, k) => (c(), l("li", null, [
              i("button", {
                onClick: (f) => a(k)
              }, m(k), 9, Oe),
              i("small", null, "(" + m(x(p)) + ")", 1),
              Ce,
              Object.keys(p.inputs).length > 0 || p.payable ? (c(), l("div", Se, [
                Ie,
                i("ul", null, [
                  (c(!0), l(v, null, O(p.inputs, (f, y) => (c(), l("li", null, [
                    D(i("input", {
                      "onUpdate:modelValue": (S) => f.value = S,
                      type: h(f.type),
                      placeholder: b(f)
                    }, null, 8, Ne), [
                      [Z, f.value]
                    ])
                  ]))), 256)),
                  p.payable ? (c(), l("li", xe, [
                    D(i("input", {
                      "onUpdate:modelValue": (f) => p.tx.value.value = f,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, Re), [
                      [W, p.tx.value.value]
                    ]),
                    D(i("select", {
                      "onUpdate:modelValue": (f) => p.tx.value.unit = f
                    }, [
                      (c(), l(v, null, O(q, (f) => i("option", { value: f }, m(f), 9, De)), 64))
                    ], 8, Pe), [
                      [J, p.tx.value.unit]
                    ])
                  ])) : E("", !0)
                ])
              ])) : E("", !0),
              Object.keys(p.outputs).length > 0 ? (c(), l("div", Te, [
                $e,
                i("ul", null, [
                  (c(!0), l(v, null, O(p.outputs, (f, y) => (c(), l("li", null, [
                    D(i("input", {
                      "onUpdate:modelValue": (S) => f.value = S,
                      type: "text",
                      placeholder: b(f),
                      disabled: ""
                    }, null, 8, je), [
                      [W, f.value]
                    ])
                  ]))), 256))
                ])
              ])) : E("", !0),
              p.error ? (c(), l("p", Ae, m(p.error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          Me,
          i("ul", null, [
            (c(!0), l(v, null, O(R.value, (p, k) => (c(), l("li", null, [
              i("h3", null, m(k), 1),
              i("p", null, "Count : " + m(p.count), 1),
              Ve,
              i("ul", null, [
                (c(!0), l(v, null, O(p.logs, (f) => (c(), l("li", null, m(f), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64)) : E("", !0);
  }
}, We = {
  key: 0,
  class: "SelectNetworkDropdown"
}, Ue = {
  key: 0,
  selected: ""
}, Be = ["src", "alt"], Fe = ["onClick"], Ge = ["src", "alt"], at = {
  __name: "SelectNetworkDropdown",
  setup(n) {
    async function e(r) {
      const h = s.networks.available.find((b) => b.chainId === parseInt(r));
      if (h) {
        r = C.utils.hexlify(parseInt(r)).toString(), r = C.utils.hexValue(r);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: r
            }]
          });
        } catch (x) {
          x.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: r,
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
        const b = await s.provider.getNetwork();
        s.networks.current.chainId !== b.chainId && window.location.reload();
      }
    }
    function t() {
      a.value = !a.value;
    }
    let a = I(!1);
    return (r, h) => d(s).safe ? (c(), l("div", We, [
      i("ul", { onClick: t }, [
        d(s).networks.current ? (c(), l("li", Ue, [
          i("img", {
            width: "40",
            src: d(s).networks.current.icon ? d(s).networks.current.icon : d(s).defaults.networks.icon,
            alt: d(s).networks.current.name + " logo"
          }, null, 8, Be),
          i("p", null, m(d(s).networks.current.displayName), 1)
        ])) : E("", !0),
        a.value ? (c(!0), l(v, { key: 1 }, O(d(s).networks.available, (b) => (c(), l("li", {
          key: b.chainId,
          onClick: (x) => e(b.chainId)
        }, [
          i("img", {
            width: "40",
            src: b.icon ? b.icon : d(s).defaults.networks.icon,
            alt: b.name + " logo"
          }, null, 8, Ge),
          i("p", null, m(b.displayName), 1)
        ], 8, Fe))), 128)) : E("", !0)
      ])
    ])) : E("", !0);
  }
};
const He = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [a, r] of e)
    t[a] = r;
  return t;
}, K = (n) => (X("data-v-ceed920c"), n = n(), z(), n), Le = /* @__PURE__ */ K(() => /* @__PURE__ */ i("h3", null, "Safe Runners", -1)), Ke = /* @__PURE__ */ K(() => /* @__PURE__ */ i("h3", null, "Status", -1)), qe = {
  __name: "DebugBar",
  setup(n) {
    return (e, t) => {
      const a = F("OnDappSafe");
      return c(), G(a, null, {
        default: H(() => [
          i("section", null, [
            i("div", null, [
              Le,
              i("ul", null, [
                i("li", null, "DApp safe : " + m(d(s).isSafe), 1),
                i("li", null, "Network safe : " + m(d(s).provider.isSafe), 1),
                i("li", null, "Wallet safe : " + m(d(s).signer.isSafe), 1),
                i("li", null, "Contracts safe : " + m(d(s).contracts.areSafe), 1)
              ])
            ]),
            i("div", null, [
              Ke,
              i("ul", null, [
                (c(!0), l(v, null, O(d(s).status, (r, h) => (c(), l("li", null, m(h) + " : " + m(r.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, rt = /* @__PURE__ */ He(qe, [["__scopeId", "data-v-ceed920c"]]), Ye = {
  __name: "OnDappSafe",
  setup(n) {
    return (e, t) => d(s).isSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Qe = {
  __name: "OnProviderSafe",
  setup(n) {
    return (e, t) => d(s).provider.isSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Ze = {
  __name: "OnSignerSafe",
  setup(n) {
    return (e, t) => d(s).signer.isSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Je = {
  __name: "OnContractsSafe",
  setup(n) {
    return (e, t) => d(s).contracts.areSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
};
async function Xe(n) {
  n.component("OnDappSafe", Ye), n.component("OnProviderSafe", Qe), n.component("OnSignerSafe", Ze), n.component("OnContractsSafe", Je);
}
class ze {
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
        for (const h of a.callbacks)
          h(a.state.value, r);
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
    }, this.contract[e](...t).then((h) => {
      this.sources[r].state.value = h;
    })), a && (this.sources[r].callbacks.includes(a) || this.sources[r].callbacks.push(a)), this.sources[r].state;
  }
  remove(e, t, a) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) || (this.sources[r].callbacks = this.sources[r].callbacks.filter((h) => h !== a));
  }
  getRef(e, t) {
    const a = this._buildSourceName(e, t);
    return this.sources[a].state;
  }
}
async function A(n = !1) {
  s.provider.isSafe.value || s.status.signer.set("NOPROVIDER"), s.provider.onSafe(async function() {
    if (!s.signer.isSafe.value)
      try {
        const e = await s.provider.getSigner();
        await e.getAddress(), s.signer.proxy.setEthersObject(e), s.status.signer.set("CONNECTED");
      } catch {
        if (n === !0)
          s.status.signer.set("DISCONNECTED");
        else
          try {
            s.status.signer.set("REQUESTED"), await s.provider.send("eth_requestAccounts", []);
            const t = await s.provider.getSigner();
            await t.getAddress(), s.signer.proxy.setEthersObject(t), s.status.signer.set("CONNECTED");
          } catch (t) {
            console.log(t), t.code === 4001 ? s.status.signer.set("REFUSED") : s.status.signer.set("ERROR");
          }
      }
  });
}
function B() {
  s.signer.proxy.setEthersObject(null), s.status.signer.set("DISCONNECTED");
}
function $(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function T(n, ...e) {
  if (!e.length)
    return n;
  const t = e.shift();
  if ($(n) && $(t))
    for (const a in t)
      $(t[a]) ? (n[a] || Object.assign(n, {
        [a]: {}
      }), T(n[a], t[a])) : Object.assign(n, {
        [a]: t[a]
      });
  return T(n, ...e);
}
function ot(n) {
  const e = n.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function it(n, e) {
  n.config.globalProperties.dapp = s, await Xe(n), await he(e), await pe(), await fe(), await me(), await be(), await ye(), s.safe.value = !0;
}
export {
  ze as ChainWatcher,
  st as ConnectWalletButton,
  nt as ContractInteractor,
  rt as DebugBar,
  U as EthersContractProxy,
  oe as EthersProviderProxy,
  ce as EthersSignerProxy,
  Je as OnContractsSafe,
  Ye as OnDappSafe,
  Qe as OnProviderSafe,
  Ze as OnSignerSafe,
  at as SelectNetworkDropdown,
  te as Status,
  ee as StatusList,
  ot as capitalizeWords,
  A as connectWallet,
  s as dapp,
  T as deepMerge,
  B as disconnectWallet,
  it as initVuethers,
  $ as isObject
};
