import { ref as I, watch as N, computed as P, markRaw as Z, getCurrentInstance as G, onUnmounted as D, resolveComponent as H, openBlock as c, createBlock as L, withCtx as K, createElementVNode as i, unref as h, createElementBlock as l, toDisplayString as b, createCommentVNode as E, Fragment as v, renderList as O, withDirectives as j, vModelDynamic as J, vModelText as W, vModelSelect as X, createTextVNode as q, pushScopeId as z, popScopeId as ee, renderSlot as _ } from "vue";
import { ethers as C } from "ethers";
class te {
  add(e, t) {
    if (Object.keys(s.status).includes(e))
      throw `You cannot add a new status called '${e}', this name is either reserved by Vuethers or already existing.`;
    s.status[e] = new se(e, t);
  }
}
class se {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const n of t)
      this.states.push(this._formatState(n));
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
    let n = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (Array.isArray(e)) {
      if (!this._areStatesValid(e))
        throw n;
      N(this._state, () => {
        e.includes(this._state) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw n;
      N(this._state, () => {
        e === this._state && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
class ne {
  constructor() {
    this._contracts = [], this.areSafe = P(() => s.provider.isSafe.value && s.status.contracts.is("INITIALIZED"));
  }
  add(e, t, n) {
    if (Object.keys(this).includes(e))
      throw `You cannot add a new contract called '${e}', this name is either reserved by Vuethers or already existing.`;
    if (s.signer.isSafe.value)
      this[e] = new B(new C.Contract(t, n, s.signer.proxy.getEthersObject()));
    else if (s.provider.isSafe.value)
      this[e] = new B(new C.Contract(t, n, s.provider.proxy.getEthersObject()));
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
    s.provider.onSafe((t) => {
      if (this.areSafe.value)
        e(t);
      else {
        const n = N(this.areSafe, () => {
          this.areSafe.value && (e(t), n());
        });
      }
    });
  }
}
function ae(a) {
  for (var e = []; a && a !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(a)), a = Object.getPrototypeOf(a);
  return e;
}
class re {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && Z(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = ae(this._parent._extensionObject);
      for (const t of e)
        if (t !== "constructor")
          try {
            this._parent._ethersObject[t] = this._parent._extensionObject[t].bind(this._parent._ethersObject);
          } catch (n) {
            if (n instanceof TypeError)
              this._parent._ethersObject[t] = this._parent._extensionObject[t];
            else
              throw n;
          }
    }
  }
}
class U {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new re(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(n, r, u) {
        if (n._ethersObject && n._ethersObject[r])
          try {
            return n._ethersObject[r].bind(n._ethersObject);
          } catch (m) {
            if (m.message.includes(".bind is not a function"))
              return n._ethersObject[r];
            throw m;
          }
        else if (n[r])
          return n[r];
      },
      set: function(n, r, u) {
        return n._ethersObject && n._ethersObject[r] ? (n._ethersObject[r] = u, !0) : (n[r] = u, !0);
      }
    });
  }
}
class oe {
}
class ie extends U {
  constructor(e = null) {
    const t = new oe();
    super(e, t), this.isSafe = P(() => s.isSafe.value && !s.status.provider.is("DISCONNECTED"));
  }
  onSafe(e) {
    s.onSafe((t) => {
      if (this.isSafe.value)
        e(t);
      else {
        const n = N(this.isSafe, () => {
          this.isSafe.value && (e(t), n());
        });
      }
    });
  }
}
class ce {
}
class le extends U {
  constructor(e = null) {
    const t = new ce();
    super(e, t), this.isSafe = P(() => s.provider.isSafe.value && s.status.signer.is("CONNECTED"));
  }
  onSafe(e) {
    s.provider.onSafe((t) => {
      if (this.isSafe.value)
        e(t);
      else {
        const n = N(this.isSafe, () => {
          this.isSafe.value && (e(t), n());
        });
      }
    });
  }
}
class ue {
  _watch(e, t, n = null) {
    return Object.keys(s._chainWatchers).includes(this.address) || (s._chainWatchers[this.address] = new et(this)), s._chainWatchers[this.address].add(e, t, n);
  }
  watch(e, t, n, r = null) {
    const u = this._watch(e, t, n);
    return G(), r ? D(() => {
      s._chainWatchers[this.address].remove(e, t, u);
    }, r) : D(() => {
      s._chainWatchers[this.address].remove(e, t, u);
    }), s._chainWatchers[this.address].remove.bind(s._chainWatchers[this.address], e, t, u);
  }
  watchRef(e, t, n = null) {
    const r = this._watch(e, t, null);
    return n ? D(() => {
      s._chainWatchers[this.address].remove(e, t, r);
    }, n) : D(() => {
      s._chainWatchers[this.address].remove(e, t, r);
    }), s._chainWatchers[this.address].getRef(e, t);
  }
}
class B extends U {
  constructor(e = null) {
    const t = new ue();
    super(e, t);
  }
}
class de {
  constructor() {
    this.config = {}, this.defaults = {}, this.networks = {}, this._chainWatchers = {}, this.status = new te(), this.provider = new ie(), this.signer = new le(), this.contracts = new ne(), this.safe = I(!1), this.isSafe = P(() => this.safe.value);
  }
  onSafe(e) {
    const t = G();
    if (this.isSafe.value)
      e(t);
    else {
      const n = N(this.isSafe, () => {
        this.isSafe.value && (e(t), n());
      });
    }
  }
}
const s = new de(), A = {
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
async function he() {
  const a = await s.provider.getNetwork().then((e) => e.chainId);
  return s.config.networks.find((e) => e.chainId === a);
}
async function pe(a = null) {
  if (a) {
    const e = T({ ...A }, { ...a });
    e.networks = [];
    for (let t of a.networks)
      if (t.chainId) {
        const n = A.networks.find((r) => r.chainId === t.chainId);
        t = T({ ...n }, { ...t }), t.displayName || (t.displayName = t.name), e.networks.push(t);
      }
    e.networks.getCurrent = he, s.config = e;
  }
}
async function fe() {
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
async function me() {
  if (s.provider.proxy.setEthersObject(new C.providers.Web3Provider(window.ethereum, "any")), s.provider._ethersObject) {
    const a = await s.provider.getNetwork().then((t) => t.chainId);
    let e = s.config.networks.find((t) => t.chainId === a);
    e ? (s.provider = s.provider, s.status.provider.set("CONNECTED")) : (e = A.networks.find((t) => t.chainId === a), e ? (s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(knownNetwork.defaultRPC)), s.status.provider.set("WRONG")) : (s.provider = s.provider, s.status.provider.set("UNKNOWN"))), s.provider.on("network", (t, n) => {
      n && n !== t && window.location.reload();
    }), s.provider.on("error", () => {
      console.log("Provider error !"), s.status.provider.set("ERROR");
    }), e && (s.provider.pollingInterval = e.pollingInterval);
  } else {
    const a = s.config.networks.find((e) => e.default === !0);
    network ? s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(a.defaultRPC)) : s.status.provider.set("DISCONNECTED");
  }
}
async function be() {
  s.status.provider.is("DISCONNECTED") || await M(!0);
}
async function ye() {
  s.provider.onSafe(async function() {
    const a = await s.config.networks.getCurrent();
    if (a) {
      for (const [e, t] of Object.entries(a.contracts))
        s.contracts.add(e, t.address, t.abi);
      N([s.signer.isSafe, s.provider.isSafe], (e, t) => {
        if (console.log("Refresh contracts !"), e !== t)
          for (const [n, r] of Object.entries(s.contracts.getAll())) {
            const u = n, m = r.address, x = r.interface.format("json");
            s.contracts.remove(n);
            try {
              s.contracts.add(u, m, x);
            } catch (k) {
              console.log(k), s.status.contracts.set("NOPROVIDER");
              break;
            }
          }
      }), s.status.contracts.set("INITIALIZED");
    } else
      s.status.contracts.set("NOPROVIDER");
  });
}
async function ve() {
  s.provider.onSafe(() => {
    s.provider.on("block", async function(a) {
      const e = await s.provider.getBlockWithTransactions(a);
      for (const t of e.transactions)
        Object.keys(s._chainWatchers).includes(t.to) && await s._chainWatchers[t.to].update(), s.status.signer.is("CONNECTED") && (await s.signer.getAddress(), t.from);
    });
  });
}
const _e = { class: "ConnectWalletButton" }, we = {
  key: 1,
  disabled: ""
}, ge = {
  key: 2,
  disabled: ""
}, ke = {
  key: 3,
  disabled: ""
}, Ee = {
  key: 4,
  disabled: ""
}, nt = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (e, t) => {
      const n = H("OnProviderSafe");
      return c(), L(n, null, {
        default: K(() => [
          i("div", _e, [
            h(s).status.signer.is("DISCONNECTED") ? (c(), l("button", {
              key: 0,
              onClick: t[0] || (t[0] = (...r) => h(M) && h(M)(...r))
            }, "Connect Wallet")) : h(s).status.signer.is("REQUESTED") ? (c(), l("button", we, "Connection requested...")) : h(s).status.signer.is("REFUSED") ? (c(), l("button", ge, "Connection refused!")) : h(s).status.signer.is("ERROR") ? (c(), l("button", ke, "Connection error!")) : h(s).status.provider.is("WRONG") ? (c(), l("button", Ee, "Wrong network! (" + b(h(s).networks.current.displayName) + ")", 1)) : h(s).status.signer.is("CONNECTED") ? (c(), l("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...r) => h(F) && h(F)(...r))
            }, "Disconnect")) : E("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, Oe = /* @__PURE__ */ q("Functions : "), Ce = ["onClick"], Se = /* @__PURE__ */ i("br", null, null, -1), Ie = { key: 0 }, Ne = /* @__PURE__ */ i("small", null, "Inputs :", -1), xe = ["onUpdate:modelValue", "type", "placeholder"], Re = { key: 0 }, Pe = ["onUpdate:modelValue"], De = ["onUpdate:modelValue"], je = ["value"], Te = { key: 1 }, $e = /* @__PURE__ */ i("small", null, "Outputs :", -1), Ae = ["onUpdate:modelValue", "placeholder"], Me = { key: 2 }, Ue = /* @__PURE__ */ q(" Events : "), Ve = /* @__PURE__ */ i("p", null, "Logs:", -1), at = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    async function t(o, d, p = {}) {
      let g, f, y = null;
      return d ? Array.isArray(d) ? y = o(...d, p) : y = o(d, p) : y = o(p), await y.then((S) => g = S).catch((S) => f = S), { data: g, error: f };
    }
    async function n(o) {
      const d = [];
      for (const y of w.value[o].inputs)
        d.push(y.value);
      const p = {};
      w.value[o].payable && w.value[o].tx.value.value !== "" && (p.value = C.utils.parseUnits(w.value[o].tx.value.value, w.value[o].tx.value.unit));
      const { data: g, error: f } = await t(k.value.functions[o], d, p);
      if (f)
        w.value[o].error = f.reason;
      else
        for (let y = 0; y < g.length; y++)
          w.value[o].outputs[y].value = g[y];
    }
    async function r(o) {
      R.value[o.event].count += 1;
      let d = `Block ${o.blockNumber} -> {`;
      for (const p of R.value[o.event].inputs)
        d += `${p.name}:${o.args[p.name]}, `;
      d = d.substring(0, d.length - 2) + "}", R.value[o.event].logs.push(d);
    }
    function u(o) {
      return o.includes("int") ? "number" : "text";
    }
    function m(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function x(o) {
      const d = [];
      return d.push(o.mutability), o.payable && d.push("payable"), d.join(", ");
    }
    const k = P(() => s.contracts[e.contractName]);
    let V = I("");
    const Q = ["wei", "gwei", "ether"], R = I({}), w = I({});
    return s.contracts.onSafe(async function() {
      V.value = await k.value.owner();
      for (const o of Object.values(k.value.interface.functions)) {
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
        for (let d = 0; d < o.inputs.length; d++)
          w.value[o.name].inputs[d] = {
            name: o.inputs[d].name,
            type: o.inputs[d].type,
            value: ""
          };
        for (let d = 0; d < o.outputs.length; d++)
          w.value[o.name].outputs[d] = {
            name: o.outputs[d].name,
            type: o.outputs[d].type,
            value: ""
          };
      }
      for (const o of Object.values(k.value.interface.events))
        R.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, k.value.on(o, r);
    }), (o, d) => h(s).contracts.areSafe && k.value ? (c(), l(v, { key: 0 }, [
      i("p", null, "Interact with '" + b(a.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + b(k.value.address), 1),
        i("li", null, "Owner : " + b(V.value), 1),
        i("li", null, [
          Oe,
          i("ul", null, [
            (c(!0), l(v, null, O(w.value, (p, g) => (c(), l("li", null, [
              i("button", {
                onClick: (f) => n(g)
              }, b(g), 9, Ce),
              i("small", null, "(" + b(x(p)) + ")", 1),
              Se,
              Object.keys(p.inputs).length > 0 || p.payable ? (c(), l("div", Ie, [
                Ne,
                i("ul", null, [
                  (c(!0), l(v, null, O(p.inputs, (f, y) => (c(), l("li", null, [
                    j(i("input", {
                      "onUpdate:modelValue": (S) => f.value = S,
                      type: u(f.type),
                      placeholder: m(f)
                    }, null, 8, xe), [
                      [J, f.value]
                    ])
                  ]))), 256)),
                  p.payable ? (c(), l("li", Re, [
                    j(i("input", {
                      "onUpdate:modelValue": (f) => p.tx.value.value = f,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, Pe), [
                      [W, p.tx.value.value]
                    ]),
                    j(i("select", {
                      "onUpdate:modelValue": (f) => p.tx.value.unit = f
                    }, [
                      (c(), l(v, null, O(Q, (f) => i("option", { value: f }, b(f), 9, je)), 64))
                    ], 8, De), [
                      [X, p.tx.value.unit]
                    ])
                  ])) : E("", !0)
                ])
              ])) : E("", !0),
              Object.keys(p.outputs).length > 0 ? (c(), l("div", Te, [
                $e,
                i("ul", null, [
                  (c(!0), l(v, null, O(p.outputs, (f, y) => (c(), l("li", null, [
                    j(i("input", {
                      "onUpdate:modelValue": (S) => f.value = S,
                      type: "text",
                      placeholder: m(f),
                      disabled: ""
                    }, null, 8, Ae), [
                      [W, f.value]
                    ])
                  ]))), 256))
                ])
              ])) : E("", !0),
              p.error ? (c(), l("p", Me, b(p.error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          Ue,
          i("ul", null, [
            (c(!0), l(v, null, O(R.value, (p, g) => (c(), l("li", null, [
              i("h3", null, b(g), 1),
              i("p", null, "Count : " + b(p.count), 1),
              Ve,
              i("ul", null, [
                (c(!0), l(v, null, O(p.logs, (f) => (c(), l("li", null, b(f), 1))), 256))
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
}, Be = {
  key: 0,
  selected: ""
}, Fe = ["src", "alt"], Ge = ["onClick"], He = ["src", "alt"], rt = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    async function e(r) {
      const u = s.networks.available.find((m) => m.chainId === parseInt(r));
      if (u) {
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
              rpcUrls: [u.defaultRPC],
              chainName: u.name,
              nativeCurrency: {
                name: u.currency.symbol,
                symbol: u.currency.symbol,
                decimals: u.currency.decimals
              },
              blockExplorerUrls: u.explorer && u.explorer.url !== "" ? [u.explorer.url] : null
            }]
          });
        }
        const m = await s.provider.getNetwork();
        s.networks.current.chainId !== m.chainId && window.location.reload();
      }
    }
    function t() {
      n.value = !n.value;
    }
    let n = I(!1);
    return (r, u) => h(s).safe ? (c(), l("div", We, [
      i("ul", { onClick: t }, [
        h(s).networks.current ? (c(), l("li", Be, [
          i("img", {
            width: "40",
            src: h(s).networks.current.icon ? h(s).networks.current.icon : h(s).defaults.networks.icon,
            alt: h(s).networks.current.name + " logo"
          }, null, 8, Fe),
          i("p", null, b(h(s).networks.current.displayName), 1)
        ])) : E("", !0),
        n.value ? (c(!0), l(v, { key: 1 }, O(h(s).networks.available, (m) => (c(), l("li", {
          key: m.chainId,
          onClick: (x) => e(m.chainId)
        }, [
          i("img", {
            width: "40",
            src: m.icon ? m.icon : h(s).defaults.networks.icon,
            alt: m.name + " logo"
          }, null, 8, He),
          i("p", null, b(m.displayName), 1)
        ], 8, Ge))), 128)) : E("", !0)
      ])
    ])) : E("", !0);
  }
};
const Le = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, Y = (a) => (z("data-v-ceed920c"), a = a(), ee(), a), Ke = /* @__PURE__ */ Y(() => /* @__PURE__ */ i("h3", null, "Safe Runners", -1)), qe = /* @__PURE__ */ Y(() => /* @__PURE__ */ i("h3", null, "Status", -1)), Ye = {
  __name: "DebugBar",
  setup(a) {
    return (e, t) => {
      const n = H("OnDappSafe");
      return c(), L(n, null, {
        default: K(() => [
          i("section", null, [
            i("div", null, [
              Ke,
              i("ul", null, [
                i("li", null, "DApp safe : " + b(h(s).isSafe), 1),
                i("li", null, "Network safe : " + b(h(s).provider.isSafe), 1),
                i("li", null, "Wallet safe : " + b(h(s).signer.isSafe), 1),
                i("li", null, "Contracts safe : " + b(h(s).contracts.areSafe), 1)
              ])
            ]),
            i("div", null, [
              qe,
              i("ul", null, [
                (c(!0), l(v, null, O(h(s).status, (r, u) => (c(), l("li", null, b(u) + " : " + b(r.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, ot = /* @__PURE__ */ Le(Ye, [["__scopeId", "data-v-ceed920c"]]), Qe = {
  __name: "OnDappSafe",
  setup(a) {
    return (e, t) => h(s).isSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Ze = {
  __name: "OnProviderSafe",
  setup(a) {
    return (e, t) => h(s).provider.isSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Je = {
  __name: "OnSignerSafe",
  setup(a) {
    return (e, t) => h(s).signer.isSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Xe = {
  __name: "OnContractsSafe",
  setup(a) {
    return (e, t) => h(s).contracts.areSafe.value ? (c(), l(v, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
};
async function ze(a) {
  a.component("OnDappSafe", Qe), a.component("OnProviderSafe", Ze), a.component("OnSignerSafe", Je), a.component("OnContractsSafe", Xe);
}
class et {
  constructor(e) {
    this.contract = e, this.sources = {}, this.lastUpdateBlock = 0;
  }
  _buildSourceName(e, t) {
    return `${e}:${t.toString()}`;
  }
  _generateDependentUUID() {
    return "xxxxxxxx".replace(/[xy]/g, function(e) {
      var t = Math.random() * 16 | 0, n = e == "x" ? t : t & 3 | 8;
      return n.toString(16);
    });
  }
  async update() {
    const e = await s.provider.getBlockNumber();
    if (this.lastUpdateBlock < e) {
      for (const [t, n] of Object.entries(this.sources)) {
        const r = n.state.value;
        n.state.value = await this.contract[n.name](...n.args);
        for (const u of Object.values(n.dependents))
          u && u(n.state.value, r);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, n = null) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: t,
      state: I(null),
      dependents: {}
    }, this.contract[e](...t).then((m) => {
      this.sources[r].state.value = m;
    }));
    const u = this._generateDependentUUID();
    return this.sources[r].dependents[u] = n || null, u;
  }
  remove(e, t, n) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) && Object.keys(this.sources[r].dependents).includes(n) && delete this.sources[r].dependents[n], Object.keys(this.sources[r].dependents).length === 0 && delete this.sources[r];
  }
  getRef(e, t) {
    const n = this._buildSourceName(e, t);
    return this.sources[n].state;
  }
}
async function M(a = !1) {
  s.provider.isSafe.value || s.status.signer.set("NOPROVIDER"), s.provider.onSafe(async function() {
    if (!s.signer.isSafe.value)
      try {
        const e = await s.provider.getSigner();
        await e.getAddress(), s.signer.proxy.setEthersObject(e), s.status.signer.set("CONNECTED");
      } catch {
        if (a === !0)
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
function F() {
  s.signer.proxy.setEthersObject(null), s.status.signer.set("DISCONNECTED");
}
function $(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function T(a, ...e) {
  if (!e.length)
    return a;
  const t = e.shift();
  if ($(a) && $(t))
    for (const n in t)
      $(t[n]) ? (a[n] || Object.assign(a, {
        [n]: {}
      }), T(a[n], t[n])) : Object.assign(a, {
        [n]: t[n]
      });
  return T(a, ...e);
}
function it(a) {
  const e = a.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function ct(a, e) {
  a.config.globalProperties.dapp = s, await ze(a), await pe(e), await fe(), await me(), await be(), await ye(), await ve(), s.safe.value = !0;
}
export {
  et as ChainWatcher,
  nt as ConnectWalletButton,
  at as ContractInteractor,
  ot as DebugBar,
  B as EthersContractProxy,
  ie as EthersProviderProxy,
  le as EthersSignerProxy,
  Xe as OnContractsSafe,
  Qe as OnDappSafe,
  Ze as OnProviderSafe,
  Je as OnSignerSafe,
  rt as SelectNetworkDropdown,
  se as Status,
  te as StatusList,
  it as capitalizeWords,
  M as connectWallet,
  s as dapp,
  T as deepMerge,
  F as disconnectWallet,
  ct as initVuethers,
  $ as isObject
};
