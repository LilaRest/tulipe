import { ref as I, watch as N, computed as P, markRaw as L, onUnmounted as K, unref as c, openBlock as u, createElementBlock as d, toDisplayString as m, createCommentVNode as _, Fragment as g, createElementVNode as i, renderList as E, withDirectives as D, vModelDynamic as q, vModelText as W, vModelSelect as Y, createTextVNode as F, pushScopeId as Q, popScopeId as Z, renderSlot as O } from "vue";
import { ethers as C } from "ethers";
class J {
  add(e, t) {
    if (Object.keys(s.status).includes(e))
      throw `You cannot add a new status called '${e}', this name is either reserved by Vuethers or already existing.`;
    s.status[e] = new X(e, t);
  }
}
class X {
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
class z {
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
function ee(n) {
  for (var e = []; n && n !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(n)), n = Object.getPrototypeOf(n);
  return e;
}
class te {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && L(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = ee(this._parent._extensionObject);
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
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new te(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(a, o, p) {
        if (a._ethersObject && a._ethersObject[o])
          try {
            return a._ethersObject[o].bind(a._ethersObject);
          } catch (b) {
            if (b.message.includes(".bind is not a function"))
              return a._ethersObject[o];
            throw b;
          }
        else if (a[o])
          return a[o];
      },
      set: function(a, o, p) {
        return a._ethersObject && a._ethersObject[o] ? (a._ethersObject[o] = p, !0) : (a[o] = p, !0);
      }
    });
  }
}
class se {
}
class ne extends M {
  constructor(e = null) {
    const t = new se();
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
class ae {
}
class re extends M {
  constructor(e = null) {
    const t = new ae();
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
class oe {
  _watch(e, t, a = null) {
    Object.keys(s._chainWatchers).includes(this.address) || (s._chainWatchers[this.address] = new Je(this)), s._chainWatchers[this.address].add(e, t, a);
  }
  watch(e, t, a) {
    return this._watch(e, t, a), K(() => s._chainWatchers[this.address].remove(e, t, a)), s._chainWatchers[this.address].remove.bind(s._chainWatchers[this.address], e, t, a);
  }
  watchRef(e, t) {
    return this._watch(e, t, null), s._chainWatchers[this.address].getRef(e, t);
  }
}
class U extends M {
  constructor(e = null) {
    const t = new oe();
    super(e, t);
  }
}
class ie {
  constructor() {
    this.config = {}, this.defaults = {}, this.networks = {}, this._chainWatchers = {}, this.status = new J(), this.provider = new ne(), this.signer = new re(), this.contracts = new z(), this.safe = I(!1), this.isSafe = P(() => this.safe.value);
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
const s = new ie(), $ = {
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
async function ce() {
  const n = await s.provider.getNetwork().then((e) => e.chainId);
  return s.config.networks.find((e) => e.chainId === n);
}
async function le(n = null) {
  if (n) {
    const e = T({ ...$ }, { ...n });
    e.networks = [];
    for (let t of n.networks)
      if (t.chainId) {
        const a = $.networks.find((o) => o.chainId === t.chainId);
        t = T({ ...a }, { ...t }), t.displayName || (t.displayName = t.name), e.networks.push(t);
      }
    e.networks.getCurrent = ce, s.config = e;
  }
}
async function ue() {
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
async function de() {
  if (s.provider.proxy.setEthersObject(new C.providers.Web3Provider(window.ethereum, "any")), s.provider._ethersObject) {
    const n = await s.provider.getNetwork().then((t) => t.chainId);
    let e = s.config.networks.find((t) => t.chainId === n);
    e ? (s.provider = s.provider, s.status.provider.set("CONNECTED")) : (e = $.networks.find((t) => t.chainId === n), e ? (s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(knownNetwork.defaultRPC)), s.status.provider.set("WRONG")) : (s.provider = s.provider, s.status.provider.set("UNKNOWN"))), s.provider.on("network", (t, a) => {
      a && a !== t && window.location.reload();
    }), s.provider.on("error", () => {
      console.log("Provider error !"), s.status.provider.set("ERROR");
    }), e && (s.provider.pollingInterval = e.pollingInterval);
  } else {
    const n = s.config.networks.find((e) => e.default === !0);
    network ? s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(n.defaultRPC)) : s.status.provider.set("DISCONNECTED");
  }
}
async function he() {
  s.status.provider.is("DISCONNECTED") || await A(!0);
}
async function pe() {
  s.provider.onSafe(async function() {
    const n = await s.config.networks.getCurrent();
    if (n) {
      for (const [e, t] of Object.entries(n.contracts))
        s.contracts.add(e, t.address, t.abi);
      N([s.signer.isSafe, s.provider.isSafe], (e, t) => {
        if (console.log("Refresh contracts !"), e !== t)
          for (const [a, o] of Object.entries(s.contracts.getAll())) {
            const p = a, b = o.address, x = o.interface.format("json");
            s.contracts.remove(a);
            try {
              s.contracts.add(p, b, x);
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
async function fe() {
  s.provider.onSafe(() => {
    s.provider.on("block", async function(n) {
      const e = await s.provider.getBlockWithTransactions(n);
      for (const t of e.transactions)
        Object.keys(s._chainWatchers).includes(t.to) && await s._chainWatchers[t.to].update(), s.status.signer.is("CONNECTED") && (await s.signer.getAddress(), t.from);
    });
  });
}
const me = {
  key: 0,
  class: "ConnectWalletButton"
}, be = {
  key: 1,
  disabled: ""
}, ye = {
  key: 2,
  disabled: ""
}, ve = {
  key: 3,
  disabled: ""
}, _e = {
  key: 4,
  disabled: ""
}, et = {
  __name: "ConnectWalletButton",
  setup(n) {
    return (e, t) => c(s).provider.isSafe.value ? (u(), d("div", me, [
      c(s).status.signer.is("DISCONNECTED") ? (u(), d("button", {
        key: 0,
        onClick: t[0] || (t[0] = (...a) => c(A) && c(A)(...a))
      }, "Connect Wallet")) : c(s).status.signer.is("REQUESTED") ? (u(), d("button", be, "Connection requested...")) : c(s).status.signer.is("REFUSED") ? (u(), d("button", ye, "Connection refused!")) : c(s).status.signer.is("ERROR") ? (u(), d("button", ve, "Connection error!")) : c(s).status.provider.is("WRONG") ? (u(), d("button", _e, "Wrong network! (" + m(c(s).networks.current.displayName) + ")", 1)) : c(s).status.signer.is("CONNECTED") ? (u(), d("button", {
        key: 5,
        onClick: t[1] || (t[1] = (...a) => c(B) && c(B)(...a))
      }, "Disconnect")) : _("", !0)
    ])) : _("", !0);
  }
}, we = /* @__PURE__ */ F("Functions : "), ke = ["onClick"], ge = /* @__PURE__ */ i("br", null, null, -1), Ee = { key: 0 }, Ce = /* @__PURE__ */ i("small", null, "Inputs :", -1), Oe = ["onUpdate:modelValue", "type", "placeholder"], Se = { key: 0 }, Ie = ["onUpdate:modelValue"], Ne = ["onUpdate:modelValue"], xe = ["value"], Re = { key: 1 }, Pe = /* @__PURE__ */ i("small", null, "Outputs :", -1), De = ["onUpdate:modelValue", "placeholder"], Te = { key: 2 }, je = /* @__PURE__ */ F(" Events : "), $e = /* @__PURE__ */ i("p", null, "Logs:", -1), tt = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = n;
    async function t(r, l, h = {}) {
      let w, f, y = null;
      return l ? Array.isArray(l) ? y = r(...l, h) : y = r(l, h) : y = r(h), await y.then((S) => w = S).catch((S) => f = S), { data: w, error: f };
    }
    async function a(r) {
      const l = [];
      for (const y of v.value[r].inputs)
        l.push(y.value);
      const h = {};
      v.value[r].payable && v.value[r].tx.value.value !== "" && (h.value = C.utils.parseUnits(v.value[r].tx.value.value, v.value[r].tx.value.unit));
      const { data: w, error: f } = await t(k.value.functions[r], l, h);
      if (f)
        v.value[r].error = f.reason;
      else
        for (let y = 0; y < w.length; y++)
          v.value[r].outputs[y].value = w[y];
    }
    async function o(r) {
      R.value[r.event].count += 1;
      let l = `Block ${r.blockNumber} -> {`;
      for (const h of R.value[r.event].inputs)
        l += `${h.name}:${r.args[h.name]}, `;
      l = l.substring(0, l.length - 2) + "}", R.value[r.event].logs.push(l);
    }
    function p(r) {
      return r.includes("int") ? "number" : "text";
    }
    function b(r) {
      return `${r.name && r.name !== "null" ? r.name : "unnamed"} (${r.type})`;
    }
    function x(r) {
      const l = [];
      return l.push(r.mutability), r.payable && l.push("payable"), l.join(", ");
    }
    const k = P(() => s.contracts[e.contractName]);
    let V = I("");
    const H = ["wei", "gwei", "ether"], R = I({}), v = I({});
    return s.contracts.onSafe(async function() {
      V.value = await k.value.owner();
      for (const r of Object.values(k.value.interface.functions)) {
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
      for (const r of Object.values(k.value.interface.events))
        R.value[r.name] = {
          count: 0,
          logs: [],
          inputs: r.inputs
        }, k.value.on(r, o);
    }), (r, l) => c(s).contracts.areSafe && k.value ? (u(), d(g, { key: 0 }, [
      i("p", null, "Interact with '" + m(n.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + m(k.value.address), 1),
        i("li", null, "Owner : " + m(V.value), 1),
        i("li", null, [
          we,
          i("ul", null, [
            (u(!0), d(g, null, E(v.value, (h, w) => (u(), d("li", null, [
              i("button", {
                onClick: (f) => a(w)
              }, m(w), 9, ke),
              i("small", null, "(" + m(x(h)) + ")", 1),
              ge,
              Object.keys(h.inputs).length > 0 || h.payable ? (u(), d("div", Ee, [
                Ce,
                i("ul", null, [
                  (u(!0), d(g, null, E(h.inputs, (f, y) => (u(), d("li", null, [
                    D(i("input", {
                      "onUpdate:modelValue": (S) => f.value = S,
                      type: p(f.type),
                      placeholder: b(f)
                    }, null, 8, Oe), [
                      [q, f.value]
                    ])
                  ]))), 256)),
                  h.payable ? (u(), d("li", Se, [
                    D(i("input", {
                      "onUpdate:modelValue": (f) => h.tx.value.value = f,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, Ie), [
                      [W, h.tx.value.value]
                    ]),
                    D(i("select", {
                      "onUpdate:modelValue": (f) => h.tx.value.unit = f
                    }, [
                      (u(), d(g, null, E(H, (f) => i("option", { value: f }, m(f), 9, xe)), 64))
                    ], 8, Ne), [
                      [Y, h.tx.value.unit]
                    ])
                  ])) : _("", !0)
                ])
              ])) : _("", !0),
              Object.keys(h.outputs).length > 0 ? (u(), d("div", Re, [
                Pe,
                i("ul", null, [
                  (u(!0), d(g, null, E(h.outputs, (f, y) => (u(), d("li", null, [
                    D(i("input", {
                      "onUpdate:modelValue": (S) => f.value = S,
                      type: "text",
                      placeholder: b(f),
                      disabled: ""
                    }, null, 8, De), [
                      [W, f.value]
                    ])
                  ]))), 256))
                ])
              ])) : _("", !0),
              h.error ? (u(), d("p", Te, m(h.error), 1)) : _("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          je,
          i("ul", null, [
            (u(!0), d(g, null, E(R.value, (h, w) => (u(), d("li", null, [
              i("h3", null, m(w), 1),
              i("p", null, "Count : " + m(h.count), 1),
              $e,
              i("ul", null, [
                (u(!0), d(g, null, E(h.logs, (f) => (u(), d("li", null, m(f), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64)) : _("", !0);
  }
}, Ae = {
  key: 0,
  class: "SelectNetworkDropdown"
}, Me = {
  key: 0,
  selected: ""
}, Ve = ["src", "alt"], We = ["onClick"], Ue = ["src", "alt"], st = {
  __name: "SelectNetworkDropdown",
  setup(n) {
    async function e(o) {
      const p = s.networks.available.find((b) => b.chainId === parseInt(o));
      if (p) {
        o = C.utils.hexlify(parseInt(o)).toString(), o = C.utils.hexValue(o);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: o
            }]
          });
        } catch (x) {
          x.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: o,
              rpcUrls: [p.defaultRPC],
              chainName: p.name,
              nativeCurrency: {
                name: p.currency.symbol,
                symbol: p.currency.symbol,
                decimals: p.currency.decimals
              },
              blockExplorerUrls: p.explorer && p.explorer.url !== "" ? [p.explorer.url] : null
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
    return (o, p) => c(s).safe ? (u(), d("div", Ae, [
      i("ul", { onClick: t }, [
        c(s).networks.current ? (u(), d("li", Me, [
          i("img", {
            width: "40",
            src: c(s).networks.current.icon ? c(s).networks.current.icon : c(s).defaults.networks.icon,
            alt: c(s).networks.current.name + " logo"
          }, null, 8, Ve),
          i("p", null, m(c(s).networks.current.displayName), 1)
        ])) : _("", !0),
        a.value ? (u(!0), d(g, { key: 1 }, E(c(s).networks.available, (b) => (u(), d("li", {
          key: b.chainId,
          onClick: (x) => e(b.chainId)
        }, [
          i("img", {
            width: "40",
            src: b.icon ? b.icon : c(s).defaults.networks.icon,
            alt: b.name + " logo"
          }, null, 8, Ue),
          i("p", null, m(b.displayName), 1)
        ], 8, We))), 128)) : _("", !0)
      ])
    ])) : _("", !0);
  }
};
const Be = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [a, o] of e)
    t[a] = o;
  return t;
}, G = (n) => (Q("data-v-82af2e89"), n = n(), Z(), n), Fe = { key: 0 }, Ge = /* @__PURE__ */ G(() => /* @__PURE__ */ i("h3", null, "Safe Runners", -1)), He = /* @__PURE__ */ G(() => /* @__PURE__ */ i("h3", null, "Status", -1)), Le = {
  __name: "DebugBar",
  setup(n) {
    return (e, t) => c(s).isSafe.value ? (u(), d("section", Fe, [
      i("div", null, [
        Ge,
        i("ul", null, [
          i("li", null, "DApp safe : " + m(c(s).isSafe), 1),
          i("li", null, "Network safe : " + m(c(s).provider.isSafe), 1),
          i("li", null, "Wallet safe : " + m(c(s).signer.isSafe), 1),
          i("li", null, "Contracts safe : " + m(c(s).contracts.areSafe), 1)
        ])
      ]),
      i("div", null, [
        He,
        i("ul", null, [
          (u(!0), d(g, null, E(c(s).status, (a, o) => (u(), d("li", null, m(o) + " : " + m(a.get()), 1))), 256))
        ])
      ])
    ])) : _("", !0);
  }
}, nt = /* @__PURE__ */ Be(Le, [["__scopeId", "data-v-82af2e89"]]), Ke = {
  __name: "OnDappSafe",
  setup(n) {
    return (e, t) => c(s).isSafe.value ? O(e.$slots, "safe", { key: 0 }) : O(e.$slots, "unsafe", { key: 1 });
  }
}, qe = {
  __name: "OnProviderSafe",
  setup(n) {
    return (e, t) => c(s).provider.isSafe.value ? O(e.$slots, "safe", { key: 0 }) : O(e.$slots, "unsafe", { key: 1 });
  }
}, Ye = {
  __name: "OnSignerSafe",
  setup(n) {
    return (e, t) => c(s).signer.isSafe.value ? O(e.$slots, "safe", { key: 0 }) : O(e.$slots, "unsafe", { key: 1 });
  }
}, Qe = {
  __name: "OnContractsSafe",
  setup(n) {
    return (e, t) => c(s).contracts.areSafe.value ? O(e.$slots, "safe", { key: 0 }) : O(e.$slots, "unsafe", { key: 1 });
  }
};
async function Ze(n) {
  n.component("OnDappSafe", Ke), n.component("OnProviderSafe", qe), n.component("OnSignerSafe", Ye), n.component("OnContractsSafe", Qe);
}
class Je {
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
        const o = a.state.value;
        a.state.value = await this.contract[a.name](...a.args);
        for (const p of a.callbacks)
          p(a.state.value, o);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, a = null) {
    const o = this._buildSourceName(e, t);
    return Object.keys(this.sources).includes(o) || (this.sources[o] = {
      name: e,
      args: t,
      state: I(null),
      callbacks: []
    }, this.contract[e](...t).then((p) => {
      this.sources[o].state.value = p;
    })), a && (this.sources[o].callbacks.includes(a) || this.sources[o].callbacks.push(a)), this.sources[o].state;
  }
  remove(e, t, a) {
    const o = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(o) || (this.sources[o].callbacks = this.sources[o].callbacks.filter((p) => p !== a));
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
function j(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function T(n, ...e) {
  if (!e.length)
    return n;
  const t = e.shift();
  if (j(n) && j(t))
    for (const a in t)
      j(t[a]) ? (n[a] || Object.assign(n, {
        [a]: {}
      }), T(n[a], t[a])) : Object.assign(n, {
        [a]: t[a]
      });
  return T(n, ...e);
}
function at(n) {
  const e = n.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function rt(n, e) {
  n.config.globalProperties.dapp = s, await Ze(n), await le(e), await ue(), await de(), await he(), await pe(), await fe(), s.safe.value = !0;
}
export {
  Je as ChainWatcher,
  et as ConnectWalletButton,
  tt as ContractInteractor,
  nt as DebugBar,
  U as EthersContractProxy,
  ne as EthersProviderProxy,
  re as EthersSignerProxy,
  Qe as OnContractsSafe,
  Ke as OnDappSafe,
  qe as OnProviderSafe,
  Ye as OnSignerSafe,
  st as SelectNetworkDropdown,
  X as Status,
  J as StatusList,
  at as capitalizeWords,
  A as connectWallet,
  s as dapp,
  T as deepMerge,
  B as disconnectWallet,
  rt as initVuethers,
  j as isObject
};
