import { ref as O, watch as I, computed as R, markRaw as H, onUnmounted as L, unref as h, openBlock as l, createElementBlock as u, toDisplayString as m, createCommentVNode as _, Fragment as g, createElementVNode as i, renderList as E, withDirectives as P, vModelDynamic as K, vModelText as V, vModelSelect as q, createTextVNode as B, pushScopeId as Y, popScopeId as Q } from "vue";
import { ethers as S } from "ethers";
class Z {
  add(e, t) {
    if (Object.keys(s.status).includes(e))
      throw `You cannot add a new status called '${e}', this name is either reserved by Vuethers or already existing.`;
    s.status[e] = new J(e, t);
  }
}
class J {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const n of t)
      this.states.push(this._formatState(n));
    this._state = O(this.states[0]);
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
      I(this._state, () => {
        e.includes(this._state) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw n;
      I(this._state, () => {
        e === this._state && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
class X {
  constructor() {
    this._contracts = [], this.areSafe = R(() => s.provider.isSafe.value && s.status.contracts.is("INITIALIZED"));
  }
  add(e, t, n) {
    if (Object.keys(this).includes(e))
      throw `You cannot add a new contract called '${e}', this name is either reserved by Vuethers or already existing.`;
    if (s.signer.isSafe.value)
      this[e] = new W(new S.Contract(t, n, s.signer.proxy.getEthersObject()));
    else if (s.provider.isSafe.value)
      this[e] = new W(new S.Contract(t, n, s.provider.proxy.getEthersObject()));
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
        const t = I(this.areSafe, () => {
          this.areSafe.value && (e(), t());
        });
      }
    });
  }
}
function z(a) {
  for (var e = []; a && a !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(a)), a = Object.getPrototypeOf(a);
  return e;
}
class ee {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && H(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = z(this._parent._extensionObject);
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
class M {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new ee(this), this.proxy.setEthersObject(e), new Proxy(this, {
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
class te {
}
class se extends M {
  constructor(e = null) {
    const t = new te();
    super(e, t), this.isSafe = R(() => s.isSafe.value && !s.status.provider.is("DISCONNECTED"));
  }
  onSafe(e) {
    s.onSafe(() => {
      if (this.isSafe.value)
        e();
      else {
        const t = I(this.isSafe, () => {
          this.isSafe.value && (e(), t());
        });
      }
    });
  }
}
class ne {
}
class ae extends M {
  constructor(e = null) {
    const t = new ne();
    super(e, t), this.isSafe = R(() => s.provider.isSafe.value && s.status.signer.is("CONNECTED"));
  }
  onSafe(e) {
    s.provider.onSafe(() => {
      if (this.isSafe.value)
        e();
      else {
        const t = I(this.isSafe, () => {
          this.isSafe.value && (e(), t());
        });
      }
    });
  }
}
class re {
  _watch(e, t, n = null) {
    Object.keys(s._chainWatchers).includes(this.address) || (s._chainWatchers[this.address] = new Le(this)), s._chainWatchers[this.address].add(e, t, n);
  }
  watch(e, t, n) {
    return this._watch(e, t, n), L(() => s._chainWatchers[this.address].remove(e, t, n)), s._chainWatchers[this.address].remove.bind(s._chainWatchers[this.address], e, t, n);
  }
  watchRef(e, t) {
    return this._watch(e, t, null), s._chainWatchers[this.address].getRef(e, t);
  }
}
class W extends M {
  constructor(e = null) {
    const t = new re();
    super(e, t);
  }
}
class oe {
  constructor() {
    this.config = {}, this.defaults = {}, this.networks = {}, this._chainWatchers = {}, this.status = new Z(), this.provider = new se(), this.signer = new ae(), this.contracts = new X(), this.safe = O(!1), this.isSafe = R(() => this.safe.value);
  }
  onSafe(e) {
    if (this.isSafe.value)
      e();
    else {
      const t = I(this.isSafe, () => {
        this.isSafe.value && (e(), t());
      });
    }
  }
}
const s = new oe(), D = {
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
async function ie() {
  const a = await s.provider.getNetwork().then((e) => e.chainId);
  return s.config.networks.find((e) => e.chainId === a);
}
async function ce(a = null) {
  if (a) {
    const e = j({ ...D }, { ...a });
    e.networks = [];
    for (let t of a.networks)
      if (t.chainId) {
        const n = D.networks.find((r) => r.chainId === t.chainId);
        t = j({ ...n }, { ...t }), t.displayName || (t.displayName = t.name), e.networks.push(t);
      }
    e.networks.getCurrent = ie, s.config = e;
  }
}
async function le() {
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
async function ue() {
  if (s.provider.proxy.setEthersObject(new S.providers.Web3Provider(window.ethereum, "any")), s.provider._ethersObject) {
    const a = await s.provider.getNetwork().then((t) => t.chainId);
    let e = s.config.networks.find((t) => t.chainId === a);
    e ? (s.provider = s.provider, s.status.provider.set("CONNECTED")) : (e = D.networks.find((t) => t.chainId === a), e ? (s.provider = s.provider.proxy.setEthersObject(new S.providers.JsonRpcProvider(knownNetwork.defaultRPC)), s.status.provider.set("WRONG")) : (s.provider = s.provider, s.status.provider.set("UNKNOWN"))), s.provider.on("network", (t, n) => {
      n && n !== t && window.location.reload();
    }), s.provider.on("error", () => {
      console.log("Provider error !"), s.status.provider.set("ERROR");
    }), e && (s.provider.pollingInterval = e.pollingInterval);
  } else {
    const a = s.config.networks.find((e) => e.default === !0);
    network ? s.provider = s.provider.proxy.setEthersObject(new S.providers.JsonRpcProvider(a.defaultRPC)) : s.status.provider.set("DISCONNECTED");
  }
}
async function de() {
  s.status.provider.is("DISCONNECTED") || await $(!0);
}
async function he() {
  s.provider.onSafe(async function() {
    const a = await s.config.networks.getCurrent();
    if (a) {
      for (const [e, t] of Object.entries(a.contracts))
        s.contracts.add(e, t.address, t.abi);
      I([s.signer.isSafe, s.provider.isSafe], (e, t) => {
        if (console.log("Refresh contracts !"), e !== t)
          for (const [n, r] of Object.entries(s.contracts.getAll())) {
            const d = n, b = r.address, x = r.interface.format("json");
            s.contracts.remove(n);
            try {
              s.contracts.add(d, b, x);
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
async function pe() {
  s.provider.onSafe(() => {
    s.provider.on("block", async function(a) {
      const e = await s.provider.getBlockWithTransactions(a);
      for (const t of e.transactions)
        Object.keys(s._chainWatchers).includes(t.to) && await s._chainWatchers[t.to].update(), s.status.signer.is("CONNECTED") && (await s.signer.getAddress(), t.from);
    });
  });
}
const fe = {
  key: 0,
  class: "ConnectWalletButton"
}, me = {
  key: 1,
  disabled: ""
}, be = {
  key: 2,
  disabled: ""
}, ye = {
  key: 3,
  disabled: ""
}, ve = {
  key: 4,
  disabled: ""
}, Ye = {
  __name: "ConnectWalletButton",
  setup(a) {
    return (e, t) => h(s).provider.isSafe.value ? (l(), u("div", fe, [
      h(s).status.signer.is("DISCONNECTED") ? (l(), u("button", {
        key: 0,
        onClick: t[0] || (t[0] = (...n) => h($) && h($)(...n))
      }, "Connect Wallet")) : h(s).status.signer.is("REQUESTED") ? (l(), u("button", me, "Connection requested...")) : h(s).status.signer.is("REFUSED") ? (l(), u("button", be, "Connection refused!")) : h(s).status.signer.is("ERROR") ? (l(), u("button", ye, "Connection error!")) : h(s).status.provider.is("WRONG") ? (l(), u("button", ve, "Wrong network! (" + m(h(s).networks.current.displayName) + ")", 1)) : h(s).status.signer.is("CONNECTED") ? (l(), u("button", {
        key: 5,
        onClick: t[1] || (t[1] = (...n) => h(U) && h(U)(...n))
      }, "Disconnect")) : _("", !0)
    ])) : _("", !0);
  }
}, _e = /* @__PURE__ */ B("Functions : "), we = ["onClick"], ke = /* @__PURE__ */ i("br", null, null, -1), ge = { key: 0 }, Ee = /* @__PURE__ */ i("small", null, "Inputs :", -1), Se = ["onUpdate:modelValue", "type", "placeholder"], Ce = { key: 0 }, Oe = ["onUpdate:modelValue"], Ie = ["onUpdate:modelValue"], xe = ["value"], Ne = { key: 1 }, Re = /* @__PURE__ */ i("small", null, "Outputs :", -1), Pe = ["onUpdate:modelValue", "placeholder"], je = { key: 2 }, Te = /* @__PURE__ */ B(" Events : "), De = /* @__PURE__ */ i("p", null, "Logs:", -1), Qe = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(a) {
    const e = a;
    async function t(o, c, p = {}) {
      let w, f, y = null;
      return c ? Array.isArray(c) ? y = o(...c, p) : y = o(c, p) : y = o(p), await y.then((C) => w = C).catch((C) => f = C), { data: w, error: f };
    }
    async function n(o) {
      const c = [];
      for (const y of v.value[o].inputs)
        c.push(y.value);
      const p = {};
      v.value[o].payable && v.value[o].tx.value.value !== "" && (p.value = S.utils.parseUnits(v.value[o].tx.value.value, v.value[o].tx.value.unit));
      const { data: w, error: f } = await t(k.value.functions[o], c, p);
      if (f)
        v.value[o].error = f.reason;
      else
        for (let y = 0; y < w.length; y++)
          v.value[o].outputs[y].value = w[y];
    }
    async function r(o) {
      N.value[o.event].count += 1;
      let c = `Block ${o.blockNumber} -> {`;
      for (const p of N.value[o.event].inputs)
        c += `${p.name}:${o.args[p.name]}, `;
      c = c.substring(0, c.length - 2) + "}", N.value[o.event].logs.push(c);
    }
    function d(o) {
      return o.includes("int") ? "number" : "text";
    }
    function b(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function x(o) {
      const c = [];
      return c.push(o.mutability), o.payable && c.push("payable"), c.join(", ");
    }
    const k = R(() => s.contracts[e.contractName]);
    let A = O("");
    const F = ["wei", "gwei", "ether"], N = O({}), v = O({});
    return s.contracts.onSafe(async function() {
      A.value = await k.value.owner();
      for (const o of Object.values(k.value.interface.functions)) {
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
        for (let c = 0; c < o.inputs.length; c++)
          v.value[o.name].inputs[c] = {
            name: o.inputs[c].name,
            type: o.inputs[c].type,
            value: ""
          };
        for (let c = 0; c < o.outputs.length; c++)
          v.value[o.name].outputs[c] = {
            name: o.outputs[c].name,
            type: o.outputs[c].type,
            value: ""
          };
      }
      for (const o of Object.values(k.value.interface.events))
        N.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, k.value.on(o, r);
    }), (o, c) => h(s).contracts.areSafe && k.value ? (l(), u(g, { key: 0 }, [
      i("p", null, "Interact with '" + m(a.contractName) + "' contract :", 1),
      i("ul", null, [
        i("li", null, "Address : " + m(k.value.address), 1),
        i("li", null, "Owner : " + m(A.value), 1),
        i("li", null, [
          _e,
          i("ul", null, [
            (l(!0), u(g, null, E(v.value, (p, w) => (l(), u("li", null, [
              i("button", {
                onClick: (f) => n(w)
              }, m(w), 9, we),
              i("small", null, "(" + m(x(p)) + ")", 1),
              ke,
              Object.keys(p.inputs).length > 0 || p.payable ? (l(), u("div", ge, [
                Ee,
                i("ul", null, [
                  (l(!0), u(g, null, E(p.inputs, (f, y) => (l(), u("li", null, [
                    P(i("input", {
                      "onUpdate:modelValue": (C) => f.value = C,
                      type: d(f.type),
                      placeholder: b(f)
                    }, null, 8, Se), [
                      [K, f.value]
                    ])
                  ]))), 256)),
                  p.payable ? (l(), u("li", Ce, [
                    P(i("input", {
                      "onUpdate:modelValue": (f) => p.tx.value.value = f,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, Oe), [
                      [V, p.tx.value.value]
                    ]),
                    P(i("select", {
                      "onUpdate:modelValue": (f) => p.tx.value.unit = f
                    }, [
                      (l(), u(g, null, E(F, (f) => i("option", { value: f }, m(f), 9, xe)), 64))
                    ], 8, Ie), [
                      [q, p.tx.value.unit]
                    ])
                  ])) : _("", !0)
                ])
              ])) : _("", !0),
              Object.keys(p.outputs).length > 0 ? (l(), u("div", Ne, [
                Re,
                i("ul", null, [
                  (l(!0), u(g, null, E(p.outputs, (f, y) => (l(), u("li", null, [
                    P(i("input", {
                      "onUpdate:modelValue": (C) => f.value = C,
                      type: "text",
                      placeholder: b(f),
                      disabled: ""
                    }, null, 8, Pe), [
                      [V, f.value]
                    ])
                  ]))), 256))
                ])
              ])) : _("", !0),
              p.error ? (l(), u("p", je, m(p.error), 1)) : _("", !0)
            ]))), 256))
          ])
        ]),
        i("li", null, [
          Te,
          i("ul", null, [
            (l(!0), u(g, null, E(N.value, (p, w) => (l(), u("li", null, [
              i("h3", null, m(w), 1),
              i("p", null, "Count : " + m(p.count), 1),
              De,
              i("ul", null, [
                (l(!0), u(g, null, E(p.logs, (f) => (l(), u("li", null, m(f), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64)) : _("", !0);
  }
}, $e = {
  key: 0,
  class: "SelectNetworkDropdown"
}, Me = {
  key: 0,
  selected: ""
}, Ae = ["src", "alt"], Ve = ["onClick"], We = ["src", "alt"], Ze = {
  __name: "SelectNetworkDropdown",
  setup(a) {
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
    let n = O(!1);
    return (r, d) => h(s).safe ? (l(), u("div", $e, [
      i("ul", { onClick: t }, [
        h(s).networks.current ? (l(), u("li", Me, [
          i("img", {
            width: "40",
            src: h(s).networks.current.icon ? h(s).networks.current.icon : h(s).defaults.networks.icon,
            alt: h(s).networks.current.name + " logo"
          }, null, 8, Ae),
          i("p", null, m(h(s).networks.current.displayName), 1)
        ])) : _("", !0),
        n.value ? (l(!0), u(g, { key: 1 }, E(h(s).networks.available, (b) => (l(), u("li", {
          key: b.chainId,
          onClick: (x) => e(b.chainId)
        }, [
          i("img", {
            width: "40",
            src: b.icon ? b.icon : h(s).defaults.networks.icon,
            alt: b.name + " logo"
          }, null, 8, We),
          i("p", null, m(b.displayName), 1)
        ], 8, Ve))), 128)) : _("", !0)
      ])
    ])) : _("", !0);
  }
};
const Ue = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, G = (a) => (Y("data-v-82af2e89"), a = a(), Q(), a), Be = { key: 0 }, Ge = /* @__PURE__ */ G(() => /* @__PURE__ */ i("h3", null, "Safe Runners", -1)), Fe = /* @__PURE__ */ G(() => /* @__PURE__ */ i("h3", null, "Status", -1)), He = {
  __name: "DebugBar",
  setup(a) {
    return (e, t) => h(s).isSafe.value ? (l(), u("section", Be, [
      i("div", null, [
        Ge,
        i("ul", null, [
          i("li", null, "DApp safe : " + m(h(s).isSafe), 1),
          i("li", null, "Network safe : " + m(h(s).provider.isSafe), 1),
          i("li", null, "Wallet safe : " + m(h(s).signer.isSafe), 1),
          i("li", null, "Contracts safe : " + m(h(s).contracts.areSafe), 1)
        ])
      ]),
      i("div", null, [
        Fe,
        i("ul", null, [
          (l(!0), u(g, null, E(h(s).status, (n, r) => (l(), u("li", null, m(r) + " : " + m(n.get()), 1))), 256))
        ])
      ])
    ])) : _("", !0);
  }
}, Je = /* @__PURE__ */ Ue(He, [["__scopeId", "data-v-82af2e89"]]);
class Le {
  constructor(e) {
    this.contract = e, this.sources = {}, this.lastUpdateBlock = 0;
  }
  _buildSourceName(e, t) {
    return `${e}:${t.toString}`;
  }
  async update() {
    const e = await s.provider.getBlockNumber();
    if (this.lastUpdateBlock < e) {
      for (const [t, n] of Object.entries(this.sources)) {
        const r = n.state.value;
        n.state.value = await this.contract[n.name](...n.args);
        for (const d of n.callbacks)
          d(n.state.value, r);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, n = null) {
    const r = this._buildSourceName(e, t);
    return Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: t,
      state: O(null),
      callbacks: []
    }, this.contract[e](...t).then((d) => {
      this.sources[r].state.value = d;
    })), n && (this.sources[r].callbacks.includes(n) || this.sources[r].callbacks.push(n)), this.sources[r].state;
  }
  remove(e, t, n) {
    const r = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(r) || (this.sources[r].callbacks = this.sources[r].callbacks.filter((d) => d !== n));
  }
  getRef(e, t) {
    const n = this._buildSourceName(e, t);
    return this.sources[n].state;
  }
}
async function $(a = !1) {
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
function U() {
  s.signer.proxy.setEthersObject(null), s.status.signer.set("DISCONNECTED");
}
class Xe extends Object {
  constructor(e, t) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = t, new Proxy(this, {
      get: function(n, r, d) {
        if (Object.keys(n._statefulSource.value).includes(r))
          return n._statefulSource.value[r];
        if (Object.keys(n._statelessSource).includes(r))
          return n._statelessSource[r];
      },
      set: function(n, r, d) {
        if (Object.keys(n._statefulSource.value).includes(r))
          return n._statefulSource.value[r] = d, !0;
        if (Object.keys(n._statelessSource).includes(r))
          return n._statelessSource[r] = d, !0;
        throw `MixedStore object doesn't have any property called '${r}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`;
      }
    });
  }
  add(e, t, n) {
    if (e === "stateful")
      this._statefulSource.value[t] = n;
    else if (e === "stateless")
      this._statelessSource[t] = n;
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
function T(a) {
  return a && typeof a == "object" && !Array.isArray(a);
}
function j(a, ...e) {
  if (!e.length)
    return a;
  const t = e.shift();
  if (T(a) && T(t))
    for (const n in t)
      T(t[n]) ? (a[n] || Object.assign(a, {
        [n]: {}
      }), j(a[n], t[n])) : Object.assign(a, {
        [n]: t[n]
      });
  return j(a, ...e);
}
function ze(a) {
  const e = a.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function et(a, e) {
  a.config.globalProperties.dapp = s, await ce(e), await le(), await ue(), await de(), await he(), await pe(), s.safe.value = !0;
}
export {
  Le as ChainWatcher,
  Ye as ConnectWalletButton,
  Qe as ContractInteractor,
  Je as DebugBar,
  W as EthersContractProxy,
  se as EthersProviderProxy,
  ae as EthersSignerProxy,
  Xe as MixedStore,
  Ze as SelectNetworkDropdown,
  J as Status,
  Z as StatusList,
  ze as capitalizeWords,
  $ as connectWallet,
  s as dapp,
  j as deepMerge,
  U as disconnectWallet,
  et as initVuethers,
  T as isObject
};
