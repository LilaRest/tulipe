import { ref as R, watch as k, computed as I, getCurrentInstance as N, markRaw as X, onUnmounted as j, resolveComponent as B, openBlock as c, createBlock as F, withCtx as G, createElementVNode as i, unref as l, createElementBlock as u, toDisplayString as f, createCommentVNode as S, Fragment as y, renderList as O, withDirectives as T, vModelDynamic as z, vModelText as K, vModelSelect as ee, createTextVNode as Q, pushScopeId as te, popScopeId as se, renderSlot as v } from "vue";
import { ethers as C } from "ethers";
class $ {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const n of t)
      this.states.push(this._formatState(n));
    this._state = R(this.states[0]);
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
      k(this._state, () => {
        e.includes(this._state) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw n;
      k(this._state, () => {
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
    this._contracts = [], this.status = new $("contracts", [
      "WAITING",
      "ERROR",
      "NOPROVIDER",
      "INITIALIZED"
    ]), this.areReadSafe = I(() => s.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = I(() => s.signer.isSafe.value && this.status.is("INITIALIZED"));
  }
  add(e, t, n) {
    if (Object.keys(this).includes(e))
      throw `You cannot add a new contract called '${e}', this name is either reserved by Vuethers or already existing.`;
    if (s.signer.isSafe.value)
      this[e] = new Z(new C.Contract(t, n, s.signer.proxy.getEthersObject()));
    else if (s.provider.isSafe.value)
      this[e] = new Z(new C.Contract(t, n, s.provider.proxy.getEthersObject()));
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
  onReadSafe(e) {
    const t = N();
    if (this.areReadSafe.value)
      e(t);
    else {
      const n = k(this.areReadSafe, () => {
        this.areReadSafe.value && (e(t), n());
      });
    }
  }
  onWriteSafe(e) {
    const t = N();
    if (this.areWriteSafe.value)
      e(t);
    else {
      const n = k(this.areWriteSafe, () => {
        this.areWriteSafe.value && (e(t), n());
      });
    }
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
    this._parent._ethersObject = e && X(e), this.extendsEthersObject();
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
class H {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new re(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(n, r, d) {
        if (n._ethersObject && n._ethersObject[r])
          try {
            return n._ethersObject[r].bind(n._ethersObject);
          } catch (b) {
            if (b.message.includes(".bind is not a function"))
              return n._ethersObject[r];
            throw b;
          }
        else if (n[r])
          return n[r];
      },
      set: function(n, r, d) {
        return n._ethersObject && n._ethersObject[r] ? (n._ethersObject[r] = d, !0) : (n[r] = d, !0);
      }
    });
  }
}
class oe {
}
class ie extends H {
  constructor(e = null) {
    const t = new oe();
    super(e, t), this.status = new $("provider", [
      "DISCONNECTED",
      "WRONG",
      "UNKNOWN",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = I(() => s.isSafe.value && !this.status.is("DISCONNECTED"));
  }
  onSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const n = k(this.isSafe, () => {
        this.isSafe.value && (e(t), n());
      });
    }
  }
}
class ce {
}
class le extends H {
  constructor(e = null) {
    const t = new ce();
    super(e, t), this.status = new $("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NOPROVIDER",
      "CONNECTED"
    ]), this.isSafe = I(() => s.provider.isSafe.value && this.status.is("CONNECTED"));
  }
  onSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const n = k(this.isSafe, () => {
        this.isSafe.value && (e(t), n());
      });
    }
  }
}
class ue {
  _watch(e, t, n = null) {
    return Object.keys(s._chainWatchers).includes(this.address) || (s._chainWatchers[this.address] = new et(this)), s._chainWatchers[this.address].add(e, t, n);
  }
  watch(e, t, n, r = null) {
    const d = this._watch(e, t, n);
    return N(), r ? j(() => {
      s._chainWatchers[this.address].remove(e, t, d);
    }, r) : j(() => {
      s._chainWatchers[this.address].remove(e, t, d);
    }), s._chainWatchers[this.address].remove.bind(s._chainWatchers[this.address], e, t, d);
  }
  watchRef(e, t, n = null) {
    const r = this._watch(e, t, null);
    return n ? j(() => {
      s._chainWatchers[this.address].remove(e, t, r);
    }, n) : j(() => {
      s._chainWatchers[this.address].remove(e, t, r);
    }), s._chainWatchers[this.address].getRef(e, t);
  }
}
class Z extends H {
  constructor(e) {
    const t = new ue();
    super(e, t), this.status = new $("", []), this.isReadSafe = I(() => s.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = I(() => s.signer.isSafe.value && this.status.is("INITIALIZED"));
  }
  onReadSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const n = k(this.isSafe, () => {
        this.isSafe.value && (e(t), n());
      });
    }
  }
  onWriteSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const n = k(this.isSafe, () => {
        this.isSafe.value && (e(t), n());
      });
    }
  }
}
class de {
  constructor() {
    this.config = {}, this.defaults = {}, this.networks = {}, this._chainWatchers = {}, this.status = new $("dapp", [
      "UNSAFE",
      "SAFE"
    ]), this.provider = new ie(), this.signer = new le(), this.contracts = new ne(), this.isSafe = I(() => this.status.is("SAFE"));
  }
  onSafe(e) {
    const t = N();
    if (this.isSafe.value)
      e(t);
    else {
      const n = k(this.isSafe, () => {
        this.isSafe.value && (e(t), n());
      });
    }
  }
}
const s = new de(), U = {
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
    const e = A({ ...U }, { ...a });
    e.networks = [];
    for (let t of a.networks)
      if (t.chainId) {
        const n = U.networks.find((r) => r.chainId === t.chainId);
        t = A({ ...n }, { ...t }), t.displayName || (t.displayName = t.name), e.networks.push(t);
      }
    e.networks.getCurrent = he, s.config = e;
  }
}
async function fe() {
  if (s.provider.proxy.setEthersObject(new C.providers.Web3Provider(window.ethereum, "any")), s.provider._ethersObject) {
    const a = await s.provider.getNetwork().then((t) => t.chainId);
    let e = s.config.networks.find((t) => t.chainId === a);
    e ? (s.provider = s.provider, s.provider.status.set("CONNECTED")) : (e = U.networks.find((t) => t.chainId === a), e ? (s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(knownNetwork.defaultRPC)), s.provider.status.set("WRONG")) : (s.provider = s.provider, s.provider.status.set("UNKNOWN"))), s.provider.on("network", (t, n) => {
      n && n !== t && window.location.reload();
    }), s.provider.on("error", () => {
      console.log("Provider error !"), s.provider.status.set("ERROR");
    }), e && (s.provider.pollingInterval = e.pollingInterval);
  } else {
    const a = s.config.networks.find((e) => e.default === !0);
    network ? s.provider = s.provider.proxy.setEthersObject(new C.providers.JsonRpcProvider(a.defaultRPC)) : s.provider.status.set("DISCONNECTED");
  }
}
async function me() {
  s.provider.status.is("DISCONNECTED") || await V(!0);
}
async function be() {
  s.provider.onSafe(async function() {
    const a = await s.config.networks.getCurrent();
    if (a) {
      for (const [e, t] of Object.entries(a.contracts))
        s.contracts.add(e, t.address, t.abi);
      k([s.signer.isSafe, s.provider.isSafe], (e, t) => {
        if (console.log("Refresh contracts !"), e !== t)
          for (const [n, r] of Object.entries(s.contracts.getAll())) {
            const d = n, b = r.address, x = r.interface.format("json");
            s.contracts.remove(n);
            try {
              s.contracts.add(d, b, x);
            } catch (E) {
              console.log(E), s.contracts.status.set("NOPROVIDER");
              break;
            }
          }
      }), s.contracts.status.set("INITIALIZED");
    } else
      s.contracts.status.set("NOPROVIDER");
  });
}
async function ve() {
  s.provider.onSafe(() => {
    s.provider.on("block", async function(a) {
      const e = await s.provider.getBlockWithTransactions(a);
      for (const t of e.transactions)
        Object.keys(s._chainWatchers).includes(t.to) && await s._chainWatchers[t.to].update(), s.signer.status.is("CONNECTED") && (await s.signer.getAddress(), t.from);
    });
  });
}
const ye = { class: "ConnectWalletButton" }, _e = {
  key: 1,
  disabled: ""
}, we = {
  key: 2,
  disabled: ""
}, ge = {
  key: 3,
  disabled: ""
}, ke = {
  key: 4,
  disabled: ""
}, nt = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (e, t) => {
      const n = B("OnProviderSafe");
      return c(), F(n, null, {
        default: G(() => [
          i("div", ye, [
            l(s).signer.status.is("DISCONNECTED") ? (c(), u("button", {
              key: 0,
              onClick: t[0] || (t[0] = (...r) => l(V) && l(V)(...r))
            }, "Connect Wallet")) : l(s).signer.status.is("REQUESTED") ? (c(), u("button", _e, "Connection requested...")) : l(s).signer.status.is("REFUSED") ? (c(), u("button", we, "Connection refused!")) : l(s).signer.status.is("ERROR") ? (c(), u("button", ge, "Connection error!")) : l(s).provider.status.is("WRONG") ? (c(), u("button", ke, "Wrong network! (" + f(l(s).networks.current.displayName) + ")", 1)) : l(s).signer.status.is("CONNECTED") ? (c(), u("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...r) => l(q) && l(q)(...r))
            }, "Disconnect")) : S("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, Ee = /* @__PURE__ */ Q("Functions : "), Se = ["onClick"], Oe = /* @__PURE__ */ i("br", null, null, -1), Ce = { key: 0 }, Ie = /* @__PURE__ */ i("small", null, "Inputs :", -1), Ne = ["onUpdate:modelValue", "type", "placeholder"], xe = { key: 0 }, Re = ["onUpdate:modelValue"], Pe = ["onUpdate:modelValue"], De = ["value"], $e = { key: 1 }, je = /* @__PURE__ */ i("small", null, "Outputs :", -1), Te = ["onUpdate:modelValue", "placeholder"], Ae = { key: 2 }, We = /* @__PURE__ */ Q(" Events : "), Me = /* @__PURE__ */ i("p", null, "Logs:", -1), at = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    async function t(o, h, w = {}) {
      let m, g, p = null;
      return h ? Array.isArray(h) ? p = o(...h, w) : p = o(h, w) : p = o(w), await p.then((D) => m = D).catch((D) => g = D), { data: m, error: g };
    }
    async function n(o) {
      const h = [];
      for (const p of _.value[o].inputs)
        h.push(p.value);
      const w = {};
      _.value[o].payable && _.value[o].tx.value.value !== "" && (w.value = C.utils.parseUnits(_.value[o].tx.value.value, _.value[o].tx.value.unit));
      const { data: m, error: g } = await t(E.value.functions[o], h, w);
      if (g)
        _.value[o].error = g.reason;
      else
        for (let p = 0; p < m.length; p++)
          _.value[o].outputs[p].value = m[p];
    }
    async function r(o) {
      P.value[o.event].count += 1;
      let h = `Block ${o.blockNumber} -> {`;
      for (const w of P.value[o.event].inputs)
        h += `${w.name}:${o.args[w.name]}, `;
      h = h.substring(0, h.length - 2) + "}", P.value[o.event].logs.push(h);
    }
    function d(o) {
      return o.includes("int") ? "number" : "text";
    }
    function b(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function x(o) {
      const h = [];
      return h.push(o.mutability), o.payable && h.push("payable"), h.join(", ");
    }
    const E = I(() => s.contracts[e.contractName]);
    let L = R("");
    const J = ["wei", "gwei", "ether"], P = R({}), _ = R({});
    return s.contracts.onReadSafe(async function() {
      L.value = await E.value.owner();
      for (const o of Object.values(E.value.interface.functions)) {
        _.value[o.name] = {
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
        for (let h = 0; h < o.inputs.length; h++)
          _.value[o.name].inputs[h] = {
            name: o.inputs[h].name,
            type: o.inputs[h].type,
            value: ""
          };
        for (let h = 0; h < o.outputs.length; h++)
          _.value[o.name].outputs[h] = {
            name: o.outputs[h].name,
            type: o.outputs[h].type,
            value: ""
          };
      }
      for (const o of Object.values(E.value.interface.events))
        P.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, E.value.on(o, r);
    }), (o, h) => {
      const w = B("OnContractsReadSafe");
      return c(), F(w, null, {
        default: G(() => [
          E.value ? (c(), u(y, { key: 0 }, [
            i("p", null, "Interact with '" + f(a.contractName) + "' contract :", 1),
            i("ul", null, [
              i("li", null, "Address : " + f(E.value.address), 1),
              i("li", null, "Owner : " + f(L.value), 1),
              i("li", null, [
                Ee,
                i("ul", null, [
                  (c(!0), u(y, null, O(_.value, (m, g) => (c(), u("li", null, [
                    i("button", {
                      onClick: (p) => n(g)
                    }, f(g), 9, Se),
                    i("small", null, "(" + f(x(m)) + ")", 1),
                    Oe,
                    Object.keys(m.inputs).length > 0 || m.payable ? (c(), u("div", Ce, [
                      Ie,
                      i("ul", null, [
                        (c(!0), u(y, null, O(m.inputs, (p, D) => (c(), u("li", null, [
                          T(i("input", {
                            "onUpdate:modelValue": (W) => p.value = W,
                            type: d(p.type),
                            placeholder: b(p)
                          }, null, 8, Ne), [
                            [z, p.value]
                          ])
                        ]))), 256)),
                        m.payable ? (c(), u("li", xe, [
                          T(i("input", {
                            "onUpdate:modelValue": (p) => m.tx.value.value = p,
                            type: "text",
                            placeholder: "TX value"
                          }, null, 8, Re), [
                            [K, m.tx.value.value]
                          ]),
                          T(i("select", {
                            "onUpdate:modelValue": (p) => m.tx.value.unit = p
                          }, [
                            (c(), u(y, null, O(J, (p) => i("option", { value: p }, f(p), 9, De)), 64))
                          ], 8, Pe), [
                            [ee, m.tx.value.unit]
                          ])
                        ])) : S("", !0)
                      ])
                    ])) : S("", !0),
                    Object.keys(m.outputs).length > 0 ? (c(), u("div", $e, [
                      je,
                      i("ul", null, [
                        (c(!0), u(y, null, O(m.outputs, (p, D) => (c(), u("li", null, [
                          T(i("input", {
                            "onUpdate:modelValue": (W) => p.value = W,
                            type: "text",
                            placeholder: b(p),
                            disabled: ""
                          }, null, 8, Te), [
                            [K, p.value]
                          ])
                        ]))), 256))
                      ])
                    ])) : S("", !0),
                    m.error ? (c(), u("p", Ae, f(m.error), 1)) : S("", !0)
                  ]))), 256))
                ])
              ]),
              i("li", null, [
                We,
                i("ul", null, [
                  (c(!0), u(y, null, O(P.value, (m, g) => (c(), u("li", null, [
                    i("h3", null, f(g), 1),
                    i("p", null, "Count : " + f(m.count), 1),
                    Me,
                    i("ul", null, [
                      (c(!0), u(y, null, O(m.logs, (p) => (c(), u("li", null, f(p), 1))), 256))
                    ])
                  ]))), 256))
                ])
              ])
            ])
          ], 64)) : S("", !0)
        ]),
        _: 1
      });
    };
  }
}, Ue = {
  key: 0,
  class: "SelectNetworkDropdown"
}, Ve = {
  key: 0,
  selected: ""
}, Be = ["src", "alt"], Fe = ["onClick"], Ge = ["src", "alt"], rt = {
  __name: "SelectNetworkDropdown",
  setup(a) {
    async function e(r) {
      const d = s.networks.available.find((b) => b.chainId === parseInt(r));
      if (d) {
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
      n.value = !n.value;
    }
    let n = R(!1);
    return (r, d) => l(s).safe ? (c(), u("div", Ue, [
      i("ul", { onClick: t }, [
        l(s).networks.current ? (c(), u("li", Ve, [
          i("img", {
            width: "40",
            src: l(s).networks.current.icon ? l(s).networks.current.icon : l(s).defaults.networks.icon,
            alt: l(s).networks.current.name + " logo"
          }, null, 8, Be),
          i("p", null, f(l(s).networks.current.displayName), 1)
        ])) : S("", !0),
        n.value ? (c(!0), u(y, { key: 1 }, O(l(s).networks.available, (b) => (c(), u("li", {
          key: b.chainId,
          onClick: (x) => e(b.chainId)
        }, [
          i("img", {
            width: "40",
            src: b.icon ? b.icon : l(s).defaults.networks.icon,
            alt: b.name + " logo"
          }, null, 8, Ge),
          i("p", null, f(b.displayName), 1)
        ], 8, Fe))), 128)) : S("", !0)
      ])
    ])) : S("", !0);
  }
};
const He = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, Y = (a) => (te("data-v-e9ef85ef"), a = a(), se(), a), Le = /* @__PURE__ */ Y(() => /* @__PURE__ */ i("h3", null, "Safe Runners", -1)), Ke = /* @__PURE__ */ Y(() => /* @__PURE__ */ i("h3", null, "Status", -1)), Ze = {
  __name: "DebugBar",
  setup(a) {
    return (e, t) => {
      const n = B("OnDappSafe");
      return c(), F(n, null, {
        default: G(() => [
          i("section", null, [
            i("div", null, [
              Le,
              i("ul", null, [
                i("li", null, "DApp safe : " + f(l(s).isSafe), 1),
                i("li", null, "Network safe : " + f(l(s).provider.isSafe), 1),
                i("li", null, "Wallet safe : " + f(l(s).signer.isSafe), 1),
                i("li", null, "Contracts safe : " + f(l(s).contracts.areSafe), 1)
              ])
            ]),
            i("div", null, [
              Ke,
              i("ul", null, [
                i("li", null, "dapp : " + f(l(s).status.get()), 1),
                i("li", null, "provider : " + f(l(s).provider.status.get()), 1),
                i("li", null, "signer : " + f(l(s).signer.status.get()), 1),
                i("li", null, "contracts : " + f(l(s).contracts.status.get()), 1),
                (c(!0), u(y, null, O(l(s).contracts.getAll(), (r, d) => (c(), u("li", null, " contract " + f(d) + " : " + f(r.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, ot = /* @__PURE__ */ He(Ze, [["__scopeId", "data-v-e9ef85ef"]]), qe = {
  __name: "OnDappSafe",
  setup(a) {
    return (e, t) => l(s).isSafe.value ? (c(), u(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Qe = {
  __name: "OnProviderSafe",
  setup(a) {
    return (e, t) => l(s).provider.isSafe.value ? (c(), u(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Ye = {
  __name: "OnSignerSafe",
  setup(a) {
    return (e, t) => l(s).signer.isSafe.value ? (c(), u(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Je = {
  __name: "OnContractsReadSafe",
  setup(a) {
    return (e, t) => l(s).contracts.areReadSafe.value ? (c(), u(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
}, Xe = {
  __name: "OnContractsWriteSafe",
  setup(a) {
    return (e, t) => l(s).contracts.areWriteSafe.value ? (c(), u(y, { key: 0 }, [
      v(e.$slots, "default"),
      v(e.$slots, "safe")
    ], 64)) : v(e.$slots, "unsafe", { key: 1 });
  }
};
async function ze(a) {
  a.component("OnDappSafe", qe), a.component("OnProviderSafe", Qe), a.component("OnSignerSafe", Ye), a.component("OnContractsReadSafe", Je), a.component("OnContractsWriteSafe", Xe);
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
        for (const d of Object.values(n.dependents))
          d && d(n.state.value, r);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, n = null) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: t,
      state: R(null),
      dependents: {}
    }, this.contract[e](...t).then((b) => {
      this.sources[r].state.value = b;
    }));
    const d = this._generateDependentUUID();
    return this.sources[r].dependents[d] = n || null, d;
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
async function V(a = !1) {
  s.provider.isSafe.value || s.signer.status.set("NOPROVIDER"), s.provider.onSafe(async function() {
    if (!s.signer.isSafe.value)
      try {
        const e = await s.provider.getSigner();
        await e.getAddress(), s.signer.proxy.setEthersObject(e), s.signer.status.set("CONNECTED");
      } catch {
        if (a === !0)
          s.signer.status.set("DISCONNECTED");
        else
          try {
            s.signer.status.set("REQUESTED"), await s.provider.send("eth_requestAccounts", []);
            const t = await s.provider.getSigner();
            await t.getAddress(), s.signer.proxy.setEthersObject(t), s.signer.status.set("CONNECTED");
          } catch (t) {
            console.log(t), t.code === 4001 ? s.signer.status.set("REFUSED") : s.signer.status.set("ERROR");
          }
      }
  });
}
function q() {
  s.signer.proxy.setEthersObject(null), s.signer.status.set("DISCONNECTED");
}
function M(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function A(a, ...e) {
  if (!e.length)
    return a;
  const t = e.shift();
  if (M(a) && M(t))
    for (const n in t)
      M(t[n]) ? (a[n] || Object.assign(a, {
        [n]: {}
      }), A(a[n], t[n])) : Object.assign(a, {
        [n]: t[n]
      });
  return A(a, ...e);
}
function it(a) {
  const e = a.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function ct(a, e) {
  a.config.globalProperties.dapp = s, await ze(a), await pe(e), await fe(), await me(), await be(), await ve(), s.status.set("SAFE");
}
export {
  et as ChainWatcher,
  nt as ConnectWalletButton,
  at as ContractInteractor,
  ot as DebugBar,
  Z as EthersContractProxy,
  ie as EthersProviderProxy,
  le as EthersSignerProxy,
  Je as OnContractsReadSafe,
  Xe as OnContractsWriteSafe,
  qe as OnDappSafe,
  Qe as OnProviderSafe,
  Ye as OnSignerSafe,
  rt as SelectNetworkDropdown,
  $ as Status,
  it as capitalizeWords,
  V as connectWallet,
  s as dapp,
  A as deepMerge,
  q as disconnectWallet,
  ct as initVuethers,
  M as isObject
};
