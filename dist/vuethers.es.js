import { ref as y, watch as v, markRaw as K, computed as k, getCurrentInstance as C, onUnmounted as W, isRef as L, resolveComponent as w, openBlock as i, createBlock as S, withCtx as E, createElementVNode as o, toDisplayString as f, unref as l, createVNode as N, createTextVNode as T, createElementBlock as u, Fragment as b, renderList as g, shallowRef as Q, withDirectives as j, vModelText as U, createCommentVNode as O, renderSlot as _, pushScopeId as z, popScopeId as J, vModelSelect as X } from "vue";
import { ethers as I } from "ethers";
class P {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const s of t)
      this.states.push(this._formatState(s));
    this._state = y(this.states[0]);
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
    return $(this._state);
  }
  getRef() {
    return this._state;
  }
  set(e) {
    if (e = this._formatState(e), !this._isStateValid(e))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    R(this._state, e), console.log(`Status '${this._name}' set to '${$(this._state)}'`);
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
    let s = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (Array.isArray(e)) {
      if (!this._areStatesValid(e))
        throw s;
      v(this._state, () => {
        this.isIn(e) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      v(this._state, () => {
        this.is(e) && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
const x = {
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
  wallets: [
    {
      name: "metamask",
      displayName: "Metamask",
      icon: null
    },
    {
      name: "binanceChain",
      displayName: "Binance Chain",
      icon: null
    },
    {
      name: "coinbase",
      displayName: "Coinbase",
      icon: null
    }
  ],
  defaults: {
    providers: {
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/unknown.svg"
    }
  }
};
class ee {
  constructor(e = null) {
    if (this._list = [], e) {
      for (const t of e)
        if (t.chainId) {
          const s = x.networks.find((c) => c.chainId === t.chainId), n = D({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of x.networks)
      this._list.find((n) => n.chainId === t.chainId) || (t.available = !1, this._list.push(t));
  }
  async getCurrent() {
    if (a.provider.proxy.getEthersObject()) {
      const e = await a.provider.getNetwork().then((t) => t.chainId);
      return this._list.find((t) => t.chainId === e);
    }
    return null;
  }
  getDefault() {
    return this._list.find((e) => e.default === !0);
  }
  getAvailable() {
    return this._list.filter((e) => e.available);
  }
  getAll() {
    return this._list;
  }
}
class te {
  constructor(e = null) {
    if (this._list = [], e) {
      for (const t of e)
        if (t.name) {
          const s = x.wallets.find((c) => c.name === t.name), n = D({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of x.wallets)
      this._list.find((n) => n.name === t.name) || (t.available = !1, this._list.push(t));
  }
  async getCurrent() {
    if (a.signer.getEthersObject()) {
      const e = a.signer.name;
      return this._list.find((t) => t.name === e);
    }
    return null;
  }
  getDefault() {
    return this._list.find((e) => e.default === !0);
  }
  getAvailable() {
    return this._list.filter((e) => e.available);
  }
  getAll() {
    return this._list;
  }
}
class se {
  constructor(e = null) {
    let t = {};
    return e ? t = D({ ...x.defaults }, { ...e }) : t = x.defaults, t;
  }
}
class ne {
  constructor(e = null) {
    this.networks = new ee(e ? e.networks : null), this.wallets = new te(e ? e.wallets : null), this.defaults = new se(e ? e.defaults : null);
  }
}
class ae {
  constructor() {
    this.contracts = {}, this.wallets = {};
  }
  async _asyncInit() {
    a.provider.onSafe(() => {
      a.provider.on("block", async function(e) {
        const t = await a.provider.getBlockWithTransactions(e);
        for (const s of t.transactions)
          Object.keys(this.contracts).includes(s.to) ? this.contracts[s.to].update() : Object.keys(this.wallets).includes(s.to) && this.wallets[s.to].update(), Object.keys(this.contracts).includes(s.from) ? this.contracts[s.from].update() : Object.keys(this.wallets).includes(s.from) && this.wallets[s.from].update();
      });
    });
  }
  addContractWatcher(e) {
    Object.keys(this.contracts).includes(e.address) || (this.contracts[e.address] = new re(e));
  }
  removeContractWatcher(e) {
    Object.keys(this.contracts).includes(e.address) && delete this.contracts[e.address];
  }
  addWalletWatcher(e) {
    Object.keys(this.wallets).includes(e) || (this.wallets[e] = new oe(e));
  }
  removeContractWatcher(e) {
    Object.keys(this.wallets).includes(e) && delete this.wallets[e];
  }
}
class q {
  constructor() {
    this.lastUpdateBlock = 0, this.sources = {};
  }
  _generateDependentUUID() {
    return "xxxxxxxx".replace(/[xy]/g, function(e) {
      var t = Math.random() * 16 | 0, s = e == "x" ? t : t & 3 | 8;
      return s.toString(16);
    });
  }
  async requiresUpdate() {
    if (!a.provider.isSafe.value)
      return !1;
    const e = await a.provider.getBlockNumber();
    return this.lastUpdateBlock < e;
  }
  async updateLastUpdateBlock() {
    const e = await a.provider.getBlockNumber();
    this.lastUpdateBlock = e;
  }
  async _update() {
    throw "_update() method not implemented in that ChainWatcher child class.";
  }
  update() {
    this._update();
  }
}
class re extends q {
  constructor(e) {
    super(), this.contract = e;
  }
  _buildSourceName(e, t) {
    return `${e}:${t ? t.toString() : ""}`;
  }
  async _updateState(e) {
    e.args ? e.state.value = await this.contract[e.name](...e.args) : e.state.value = await this.contract[e.name]();
  }
  async _update() {
    if (await this.requiresUpdate()) {
      for (const e of Object.values(this.sources))
        this._updateState(e);
      await this.updateLastUpdateBlock();
    }
  }
  add(e, t, s = null) {
    const n = this._buildSourceName(e, t);
    let c = !1;
    Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: e,
      args: t,
      state: y(null),
      dependents: {}
    }, c = !0);
    let h = null;
    s && (h = v(this.sources[n].state, s));
    const d = this._generateDependentUUID();
    return this.sources[n].dependents[d] = h, c && this._updateState(this.sources[n]), d;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const c = this.sources[n].dependents[s];
      c && c(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
class oe extends q {
  constructor(e) {
    super(), this.address = e, this.availableSources = ["balance"];
  }
  async _updateState(e) {
    e.name === "balance" && (e.state.value = await a.provider.getBalance(this.address));
  }
  async _update() {
    if (await this.requiresUpdate()) {
      for (const e of Object.values(this.sources))
        await this._updateState(e);
      await this.updateLastUpdateBlock();
    }
  }
  add(e, t, s = null) {
    if (!this.availableSources.includes(e))
      throw `Sources added to a ChainWalletWatcher must be in ${this.availableSources}. Got ${e}`;
    const n = this._buildSourceName(e, t);
    newSource = !1, Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: e,
      args: t,
      state: ref(null),
      dependents: {}
    }, newSource = !0);
    let c = null;
    s && (c = watch(this.sources[n].state, s));
    const h = this._generateDependentUUID();
    return this.sources[n].dependents[h] = c, newSource && this._updateState(this.sources[n]), h;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const c = this.sources[n].dependents[s];
      c && c(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
function ie(r) {
  for (var e = []; r && r !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(r)), r = Object.getPrototypeOf(r);
  return e;
}
class ce {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && K(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = ie(this._parent._extensionObject);
      for (const t of e)
        if (t !== "constructor")
          try {
            this._parent._ethersObject[t] = this._parent._extensionObject[t].bind(this._parent._ethersObject);
          } catch (s) {
            if (s instanceof TypeError)
              this._parent._ethersObject[t] = this._parent._extensionObject[t];
            else
              throw s;
          }
    }
  }
}
class A {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new ce(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(s, n, c) {
        if (s._ethersObject && s._ethersObject[n])
          try {
            return s._ethersObject[n].bind(s._ethersObject);
          } catch (h) {
            if (h.message.includes(".bind is not a function"))
              return s._ethersObject[n];
            throw h;
          }
        else if (s[n])
          return s[n];
      },
      set: function(s, n, c) {
        return s._ethersObject && s._ethersObject[n] ? (s._ethersObject[n] = c, !0) : (s[n] = c, !0);
      }
    });
  }
}
class le {
}
class ue extends A {
  constructor(e = null) {
    const t = new le();
    super(e, t), this.status = new P("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = k(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this._asyncInit();
  }
  async _getProviderFromWebWallet() {
    for (const e of Object.values(a.wallets))
      if (e) {
        const t = e.getProvider();
        if (t)
          return t;
      }
    return null;
  }
  async _initProviderConnection() {
    const e = await this._getProviderFromWebWallet();
    if (e)
      this.proxy.setEthersObject(new I.providers.Web3Provider(e, "any"));
    else {
      const t = a.config.networks.getDefault();
      t && t.defaultRPC && this.proxy.setEthersObject(new I.providers.JsonRpcProvider(t.defaultRPC));
    }
  }
  async _asyncInit() {
    if (await this._initProviderConnection(), !this._ethersObject)
      this.status.set("DISCONNECTED");
    else {
      const e = await this.getNetwork();
      let t = await a.config.networks.getAvailable().find((s) => s.chainId === e.chainId);
      if (t)
        this.status.set("CONNECTED");
      else if (this.status.set("WRONG"), t = a.config.networks.find((s) => s.chainId === e.chainId), !t) {
        const s = {
          name: e.name,
          displayName: we(e.name),
          chainId: e.chainId
        };
        a.config.network.append(s);
      }
      this.on("network", (s, n) => {
        n && n !== s && window.location.reload();
      }), this.on("error", () => {
        this.status.set("ERROR");
      }), t && t.pollingInterval && (this.pollingInterval = t.pollingInterval);
    }
  }
  onSafe(e) {
    const t = C();
    if (this.isSafe.value)
      e(t);
    else {
      const s = v(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class he {
}
class de extends A {
  constructor(e = null) {
    const t = new he();
    super(e, t), this.status = new P("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "CONNECTED"
    ]), a.provider.status.watchAny((s) => {
      s === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(s) && this.status.set("NO_PROVIDER");
    }), this.status.watch(["REFUSED", "ERROR"], () => {
      setTimeout(() => {
        this.status.set("DISCONNECTED");
      }, 5e3);
    }), this.isSafe = k(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this._asyncInit();
  }
  async _asyncInit() {
    const e = this;
    a.provider.onSafe(async function() {
      for (const t of Object.values(a.wallets))
        await e.connectWallet(t, !0);
    });
  }
  onSafe(e) {
    const t = C();
    if (this.isSafe.value)
      e(t);
    else {
      const s = v(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
  async connectWallet(e, t = !1) {
    if (a.signer.status.is("DISCONNECTED"))
      try {
        const s = await a.provider.getSigner();
        await s.getAddress(), a.signer.proxy.setEthersObject(s), a.signer.status.set("CONNECTED");
      } catch {
        if (t === !0)
          a.signer.status.set("DISCONNECTED");
        else {
          this.status.set("REQUESTED");
          try {
            await e.connect(), this.status.set("CONNECTED");
          } catch (n) {
            if (n instanceof M)
              this.status.set("REFUSED");
            else
              throw this.status.set("ERROR"), n;
          }
        }
      }
  }
  disconnectWallet() {
    a.signer.proxy.setEthersObject(null), a.signer.status.set("DISCONNECTED");
  }
}
class F {
  constructor() {
    this.provider = null, this.name = "";
  }
  getProvider() {
    return null;
  }
  async connect() {
    throw `connect() method of ${this.name} wallet is not implemented.`;
  }
}
class M extends Error {
  constructor(e, ...t) {
    super(e, ...t), this.message = `${e} wallet has rejected the connection request.`;
  }
}
class H extends F {
  constructor() {
    super(), this.name = "Metamask", this.provider = this.getProvider();
  }
  getProvider() {
    return window.ethereum;
  }
  async connect() {
    try {
      await this.provider.request({ method: "eth_requestAccounts" });
    } catch (e) {
      throw e.code === 4001 ? M(this.name) : e;
    }
  }
}
class fe extends F {
  constructor(e, t = {}) {
    super(), this.name = "Coinbase";
    const s = t.appName || "", n = t.appLogoUrl, c = t.darkMode || !1;
    this.coinbaseWalletSdk = new e({
      appName: s,
      appLogoUrl: n,
      darkMode: c
    }), this.provider = this.getProvider();
  }
  getProvider() {
    try {
      return this.coinbaseWalletSdk.makeWeb3Provider();
    } catch (e) {
      return console.log(e), null;
    }
  }
  async connect() {
    try {
      await this.provider.send("eth_requestAccounts");
    } catch {
      throw M(this.name);
    }
  }
}
class pe extends H {
  constructor() {
    super(), this.name = "BinanceChain";
  }
  getProvider() {
    return window.BinanceChain;
  }
}
class me {
  constructor() {
    const e = a.config.wallets.getAvailable();
    for (const t of e) {
      const s = _e[t.name];
      s && (this[t.name] = new s());
    }
  }
}
const _e = {
  metamask: H,
  coinbase: fe,
  binanceChain: pe
};
class be {
  _watch(e, t, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(e, t, s);
  }
  watch(e, t, s, n = null) {
    const c = this._watch(e, t, s);
    return n ? W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, c);
    }, n) : W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, c);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], e, t, c);
  }
  watchRef(e, t, s = null) {
    const n = this._watch(e, t, null);
    return s ? W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }, s) : W(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }), a.chainWatchers.contracts[this.address].getRef(e, t);
  }
}
class G extends A {
  constructor(e, t) {
    const s = new be();
    super(t, s), this.name = e, this.status = new P(`contract:${e}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((n) => {
      n === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(n) && this.status.set("NO_PROVIDER");
    }), this.isReadSafe = k(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = k(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this._asyncInit();
  }
  _watchSignerChanges(e, t) {
    v([a.signer.isSafe], (s, n) => {
      console.log("Refresh contract " + this.name), s !== n && (this.proxy.setEthersObject(null), this._updateContract(e, t));
    });
  }
  _updateContract(e, t) {
    if (a.signer.isSafe.value)
      this.proxy.setEthersObject(new I.Contract(e, t, a.signer.proxy.getEthersObject()));
    else if (a.provider.isSafe.value)
      this.proxy.setEthersObject(new I.Contract(e, t, a.provider.proxy.getEthersObject()));
    else
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`;
  }
  async _asyncInit() {
    const e = this;
    a.provider.onSafe(async function() {
      try {
        const t = await a.config.networks.getCurrent();
        if (Object.keys(t.contracts).includes(e.name)) {
          const s = t.contracts[e.name];
          e._updateContract(s.address, s.abi), e._watchSignerChanges(s.address, s.abi), e.status.set("INITIALIZED");
        } else
          e.status.set("WRONG_PROVIDER");
      } catch (t) {
        throw e.status.set("ERROR"), t;
      }
    });
  }
  onReadSafe(e) {
    const t = C();
    if (this.isReadSafe.value)
      e(t);
    else {
      const s = v(this.isReadSafe, () => {
        this.isReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = C();
    if (this.isWriteSafe.value)
      e(t);
    else {
      const s = v(this.isWriteSafe, () => {
        this.isWriteSafe.value && (e(t), s());
      });
    }
  }
}
class ye {
  constructor() {
    this.status = new P("contracts", [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((e) => {
      e === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(e) && this.status.set("NO_PROVIDER");
    });
    for (const e of a.config.networks.getAll())
      if (e.contracts)
        for (const t of Object.keys(e.contracts))
          this[t] = new G(t);
    this.areReadSafe = k(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = k(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.status.set("INITIALIZED");
  }
  getAll() {
    const e = {};
    for (const [t, s] of Object.entries(this))
      s instanceof G && (e[t] = s);
    return e;
  }
  onReadSafe(e) {
    const t = C();
    if (this.areReadSafe.value)
      e(t);
    else {
      const s = v(this.areReadSafe, () => {
        this.areReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = C();
    if (this.areWriteSafe.value)
      e(t);
    else {
      const s = v(this.areWriteSafe, () => {
        this.areWriteSafe.value && (e(t), s());
      });
    }
  }
}
class ve {
}
class Z extends A {
  constructor(e, t, s = [], n = { value: 0 }) {
    super(null, new ve()), this.contractName = e, this.methodName = t, this.methodInfos = {}, this.args = y(s), this.txArgs = y(n), this.status = new P(`tx:${e}:${t}`, [
      "NOT_READY",
      "READY",
      "SENT",
      "ERROR",
      "SUCCESS"
    ]), this.status.watch(["ERROR", "SUCCESS"], () => {
      setTimeout(() => {
        this.status.set("READY");
      }, 3e3);
    }), this.data = y([]), this.error = y(null), this.call = null, this._init();
  }
  _init() {
    a.contracts[this.contractName].isReadSafe.value && this._initEthersObject(), a.contracts[this.contractName].onReadSafe(() => {
      this._initEthersObject();
    });
  }
  _initEthersObject() {
    this.methodInfos = a.contracts[this.contractName].interface.functions[this.methodName], this.methodInfos.inputs.forEach((e) => this.args.value.push(null)), this.methodInfos.outputs.forEach((e) => this.data.value.push(null)), this.proxy.setEthersObject(a.contracts[this.contractName][this.methodName]), this.status.set("READY");
  }
  send(e = null, t = null) {
    e = e || $(this.args), t = t || $(this.txArgs), e ? Array.isArray(e) ? this.call = this.proxy.getEthersObject()(...e, t) : this.call = this.proxy.getEthersObject()(e, t) : this.call = this.proxy.getEthersObject()(t), this.status.set("SENT"), this.methodInfos.constant ? this.call.then((s) => {
      Array.isArray(s) || (s = [s]), R(this.data, s), R(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      R(this.error, s), this.status.set("ERROR");
    }) : this.call.then((s) => s.wait()).then((s) => {
      Array.isArray(s) || (s = [s]), R(this.data, s), R(this.error, null), this.status.set("SUCCESS");
    }).catch((s) => {
      R(this.error, s), this.status.set("ERROR");
    });
  }
}
class ge {
  constructor() {
  }
  init(e = null) {
    this.config = new ne(e), this.status = new P("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = k(() => this.status.is("INITIALIZED")), this.chainWatchers = new ae(), this.wallets = new me(), this.provider = new ue(), this.signer = new de(), this.contracts = new ye();
  }
  onSafe(e) {
    const t = C();
    if (this.isSafe.value)
      e(t);
    else {
      const s = v(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
const a = new ge();
function V(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function D(r, ...e) {
  if (!e.length)
    return r;
  const t = e.shift();
  if (V(r) && V(t))
    for (const s in t)
      V(t[s]) ? (r[s] || Object.assign(r, {
        [s]: {}
      }), D(r[s], t[s])) : Object.assign(r, {
        [s]: t[s]
      });
  return D(r, ...e);
}
function we(r) {
  const e = r.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
function $(r) {
  return L(r) ? r.value : r;
}
function R(r, e) {
  L(r) ? r.value = e : r = e;
}
const Se = { class: "ContractInteractor" }, Ee = /* @__PURE__ */ T(" Methods : "), Oe = /* @__PURE__ */ o("br", null, null, -1), Re = /* @__PURE__ */ T(" Events : "), ke = /* @__PURE__ */ o("br", null, null, -1), yt = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    let s = y("not owned");
    return a.contracts[e.contract].onReadSafe(async function() {
      try {
        s.value = await t.owner();
      } catch {
      }
    }), (n, c) => {
      const h = w("OnContractReadSafe");
      return i(), S(h, {
        contract: e.contract
      }, {
        default: E(() => [
          o("div", Se, [
            o("ul", null, [
              o("li", null, "Address : " + f(l(t).address), 1),
              o("li", null, "Owner : " + f(s.value), 1),
              o("li", null, [
                Ee,
                Oe,
                N(l(Ie), {
                  contract: e.contract
                }, null, 8, ["contract"])
              ]),
              o("li", null, [
                Re,
                ke,
                N(l(Be), {
                  contract: e.contract
                }, null, 8, ["contract"])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ce = { class: "MethodsInteractor" }, Ie = {
  __name: "MethodsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    return (s, n) => {
      const c = w("OnContractReadSafe");
      return i(), S(c, {
        contract: e.contract
      }, {
        default: E(() => [
          o("div", Ce, [
            o("ul", null, [
              (i(!0), u(b, null, g(l(t).interface.functions, (h, d) => (i(), u("li", null, [
                N(l(Ue), {
                  contract: e.contract,
                  method: d
                }, null, 8, ["contract", "method"])
              ]))), 256))
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ne = { class: "MethodInteractor" }, xe = { key: 0 }, Pe = /* @__PURE__ */ o("p", null, "Inputs :", -1), De = ["onUpdate:modelValue", "placeholder"], $e = { key: 0 }, We = { key: 1 }, je = /* @__PURE__ */ o("p", null, "Outputs :", -1), Te = ["onUpdate:modelValue", "placeholder"], Ae = ["placeholder"], Ve = { key: 2 }, Ue = {
  __name: "MethodInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = Q(new Z(e.contract, e.method));
    function s(n) {
      return `${n.name && n.name !== "null" ? n.name : ""} (${n.type})`;
    }
    return (n, c) => {
      const h = w("OnContractReadSafe");
      return i(), S(h, {
        contract: e.contract
      }, {
        default: E(() => [
          o("div", Ne, [
            N(l(Qe), {
              contract: e.contract,
              method: e.method,
              modelValue: t.value,
              "onUpdate:modelValue": c[0] || (c[0] = (d) => t.value = d),
              configs: { content: e.method, notx: !0, noerror: !0 }
            }, null, 8, ["contract", "method", "modelValue", "configs"]),
            o("small", null, f(t.value.methodInfos.stateMutability), 1),
            Object.keys(t.value.methodInfos.inputs).length > 0 || t.value.methodInfos.payable ? (i(), u("div", xe, [
              Pe,
              o("ul", null, [
                (i(!0), u(b, null, g(t.value.methodInfos.inputs, (d, p) => (i(), u("li", null, [
                  j(o("input", {
                    "onUpdate:modelValue": (m) => t.value.args[p] = m,
                    type: "text",
                    placeholder: s(d)
                  }, null, 8, De), [
                    [U, t.value.args[p]]
                  ])
                ]))), 256)),
                t.value.methodInfos.payable ? (i(), u("li", $e, [
                  N(l(mt), {
                    modelValue: t.value.txArgs.value.value,
                    "onUpdate:modelValue": c[1] || (c[1] = (d) => t.value.txArgs.value.value = d)
                  }, null, 8, ["modelValue"])
                ])) : O("", !0)
              ])
            ])) : O("", !0),
            Object.keys(t.value.methodInfos.outputs).length > 0 ? (i(), u("div", We, [
              je,
              o("ul", null, [
                (i(!0), u(b, null, g(t.value.methodInfos.outputs, (d, p) => (i(), u("li", null, [
                  t.value.data.value ? j((i(), u("input", {
                    key: 0,
                    "onUpdate:modelValue": (m) => t.value.data.value[p] = m,
                    type: "text",
                    placeholder: s(d),
                    disabled: ""
                  }, null, 8, Te)), [
                    [U, t.value.data.value[p]]
                  ]) : (i(), u("input", {
                    key: 1,
                    type: "text",
                    placeholder: s(d),
                    disabled: ""
                  }, null, 8, Ae))
                ]))), 256))
              ])
            ])) : O("", !0),
            t.value.status.is("ERROR") ? (i(), u("p", Ve, f(t.value.error.value.reason), 1)) : O("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Me = { class: "EventsInteractor" }, Be = {
  __name: "EventsInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    return (s, n) => {
      const c = w("OnContractReadSafe");
      return i(), S(c, {
        contract: e.contract
      }, {
        default: E(() => [
          o("div", Me, [
            o("ul", null, [
              (i(!0), u(b, null, g(l(t).interface.events, (h, d) => (i(), u("li", null, [
                N(l(qe), {
                  contract: e.contract,
                  event: d
                }, null, 8, ["contract", "event"])
              ]))), 256))
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Ge = { class: "EventInteractor" }, Le = /* @__PURE__ */ T("Logs: "), qe = {
  __name: "EventInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    },
    event: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    let s = y({}), n = y({}), c = y(0), h = y([]);
    return t.onReadSafe(() => {
      s.value = t.interface.events[e.event], n.value = t.filters[s.value.name], t.on(n.value, (d) => {
        c.value++;
        let p = `Block ${d.blockNumber} -> {`;
        for (const m of s.value.inputs)
          p += `${m.name}:${d.args[m.name]}, `;
        p = p.substring(0, p.length - 2) + "}", h.value.push(p);
      });
    }), (d, p) => {
      const m = w("OnContractReadSafe");
      return i(), S(m, {
        contract: e.contract
      }, {
        default: E(() => [
          o("div", Ge, [
            o("p", null, f(s.value.name), 1),
            o("ul", null, [
              o("li", null, "Count : " + f(c.value), 1),
              o("li", null, [
                Le,
                o("ul", null, [
                  (i(!0), u(b, null, g(h.value, (B) => (i(), u("li", null, f(B), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Fe = { class: "TransactButton" }, He = {
  key: 1,
  disabled: ""
}, Ze = {
  key: 2,
  disabled: ""
}, Ye = {
  key: 3,
  disabled: ""
}, Ke = { key: 4 }, Qe = {
  __name: "Transact",
  props: {
    modelValue: {},
    contract: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      required: !0
    },
    args: {
      type: Array,
      required: !1
    },
    txArgs: {
      type: Object,
      required: !1
    },
    configs: {
      type: Object,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r, s = a.contracts[t.contract], n = k({
      get() {
        return t.modelValue;
      },
      set(h) {
        e("update:modelValue", h);
      }
    });
    function c() {
      const h = t.args ? t.args : [], d = t.txArgs ? t.txArgs : {};
      n.value.send(h, d);
    }
    return t.config && t.configs.notx && s.onReadSafe(() => {
      n = new Z(t.contract, t.method);
    }), (h, d) => {
      const p = w("OnContractReadSafe");
      return i(), S(p, {
        contract: t.contract
      }, {
        default: E(() => [
          o("div", Fe, [
            l(n).status.is("READY") ? (i(), u("button", {
              key: 0,
              onClick: c
            }, f(t.configs && t.configs.content ? t.configs.content : "Transact"), 1)) : l(n).status.is("SENT") ? (i(), u("button", He, "Transaction sent...")) : l(n).status.is("ERROR") ? (i(), u("button", Ze, "Transaction error!")) : l(n).status.is("SUCCESS") ? (i(), u("button", Ye, "Success !")) : O("", !0),
            !(t.configs && t.configs.noerror) && l(n).status.is("ERROR") ? (i(), u("p", Ke, f(l(n).error.value.reason), 1)) : O("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, ze = { class: "ConnectWalletButton" }, Je = {
  key: 1,
  disabled: ""
}, Xe = {
  key: 2,
  disabled: ""
}, et = {
  key: 3,
  disabled: ""
}, tt = {
  key: 4,
  disabled: ""
}, vt = {
  __name: "ConnectWalletButton",
  setup(r) {
    return (e, t) => {
      const s = w("OnProviderSafe");
      return i(), S(s, null, {
        default: E(() => [
          o("div", ze, [
            l(a).signer.status.is("DISCONNECTED") ? (i(), u("button", {
              key: 0,
              onClick: t[0] || (t[0] = (n) => l(a).signer.connectWallet(l(a).wallets.metamask))
            }, "Connect Wallet")) : l(a).signer.status.is("REQUESTED") ? (i(), u("button", Je, "Connection requested...")) : l(a).signer.status.is("REFUSED") ? (i(), u("button", Xe, "Connection refused!")) : l(a).signer.status.is("ERROR") ? (i(), u("button", et, "Connection error!")) : l(a).provider.status.is("WRONG") ? (i(), u("button", tt, "Wrong network! (" + f(l(a).networks.current.displayName) + ")", 1)) : l(a).signer.status.is("CONNECTED") ? (i(), u("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...n) => l(a).signer.disconnectWallet && l(a).signer.disconnectWallet(...n))
            }, "Disconnect")) : O("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, st = /* @__PURE__ */ o("p", null, "Available wallets :", -1), gt = {
  __name: "AvailableWallets",
  setup(r) {
    return (e, t) => {
      const s = w("OnDappSafe");
      return i(), S(s, null, {
        default: E(() => [
          st,
          o("ul", null, [
            (i(!0), u(b, null, g(l(a).wallets, (n) => (i(), u("li", null, f(n.name), 1))), 256))
          ])
        ]),
        _: 1
      });
    };
  }
}, nt = { class: "SelectNetworkDropdown" }, at = {
  key: 0,
  selected: ""
}, rt = ["src", "alt"], ot = ["onClick"], it = ["src", "alt"], wt = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    let e = y({}), t = y([]);
    a.onSafe(async function() {
      e.value = await a.config.networks.getCurrent(), t.value = a.config.networks.getAvailable(), t.value = t.value.filter((h) => h != e.value);
    });
    async function s(h) {
      const d = t.value.find((p) => p.chainId === parseInt(h));
      if (d) {
        h = I.utils.hexlify(parseInt(h)).toString(), h = I.utils.hexValue(h);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: h
            }]
          });
        } catch (p) {
          p.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: h,
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
      }
    }
    function n() {
      c.value = !c.value;
    }
    let c = y(!1);
    return (h, d) => {
      const p = w("OnDappSafe");
      return i(), S(p, null, {
        default: E(() => [
          o("div", nt, [
            o("ul", { onClick: n }, [
              e.value ? (i(), u("li", at, [
                o("img", {
                  width: "40",
                  src: e.value.icon ? e.value.icon : l(a).config.defaults.providers.icon,
                  alt: e.value.name + " logo"
                }, null, 8, rt),
                o("p", null, f(e.value.displayName), 1)
              ])) : O("", !0),
              c.value ? (i(!0), u(b, { key: 1 }, g(t.value, (m) => (i(), u("li", {
                key: m.chainId,
                onClick: (B) => s(m.chainId)
              }, [
                o("img", {
                  width: "40",
                  src: m.icon ? m.icon : l(a).config.defaults.providers.icon,
                  alt: m.name + " logo"
                }, null, 8, it),
                o("p", null, f(m.displayName), 1)
              ], 8, ot))), 128)) : O("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, St = {
  __name: "OnDappSafe",
  setup(r) {
    return (e, t) => l(a).isSafe.value ? (i(), u(b, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Et = {
  __name: "OnProviderSafe",
  setup(r) {
    return (e, t) => l(a).provider.isSafe.value ? (i(), u(b, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Ot = {
  __name: "OnSignerSafe",
  setup(r) {
    return (e, t) => l(a).signer.isSafe.value ? (i(), u(b, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Rt = {
  __name: "OnContractsReadSafe",
  setup(r) {
    return (e, t) => l(a).contracts.areReadSafe.value ? (i(), u(b, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, kt = {
  __name: "OnContractsWriteSafe",
  setup(r) {
    return (e, t) => l(a).contracts.areWriteSafe.value ? (i(), u(b, { key: 0 }, [
      _(e.$slots, "default"),
      _(e.$slots, "safe")
    ], 64)) : _(e.$slots, "unsafe", { key: 1 });
  }
}, Ct = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => l(a).contracts[e.contract].isReadSafe.value ? (i(), u(b, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
}, It = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => l(a).contracts[e.contract].isWriteSafe.value ? (i(), u(b, { key: 0 }, [
      _(t.$slots, "default"),
      _(t.$slots, "safe")
    ], 64)) : _(t.$slots, "unsafe", { key: 1 });
  }
};
const ct = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, n] of e)
    t[s] = n;
  return t;
}, Y = (r) => (z("data-v-d83f3980"), r = r(), J(), r), lt = /* @__PURE__ */ Y(() => /* @__PURE__ */ o("h3", null, "Safe Runners", -1)), ut = /* @__PURE__ */ Y(() => /* @__PURE__ */ o("h3", null, "Status", -1)), ht = {
  __name: "DebugBar",
  setup(r) {
    return (e, t) => {
      const s = w("OnDappSafe");
      return i(), S(s, null, {
        default: E(() => [
          o("section", null, [
            o("div", null, [
              lt,
              o("ul", null, [
                o("li", null, "DApp safe : " + f(l(a).isSafe), 1),
                o("li", null, "Network safe : " + f(l(a).provider.isSafe), 1),
                o("li", null, "Wallet safe : " + f(l(a).signer.isSafe), 1),
                o("li", null, "Contracts read safe : " + f(l(a).contracts.areReadSafe), 1),
                o("li", null, "Contracts write safe : " + f(l(a).contracts.areWriteSafe), 1),
                (i(!0), u(b, null, g(l(a).contracts.getAll(), (n, c) => (i(), u("li", null, [
                  T(" contract " + f(c) + " : ", 1),
                  o("ul", null, [
                    o("li", null, "read safe : " + f(n.isReadSafe), 1),
                    o("li", null, "write safe : " + f(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            o("div", null, [
              ut,
              o("ul", null, [
                o("li", null, "dapp : " + f(l(a).status.get()), 1),
                o("li", null, "provider : " + f(l(a).provider.status.get()), 1),
                o("li", null, "signer : " + f(l(a).signer.status.get()), 1),
                o("li", null, "contracts : " + f(l(a).contracts.status.get()), 1),
                (i(!0), u(b, null, g(l(a).contracts.getAll(), (n, c) => (i(), u("li", null, " contract " + f(c) + " : " + f(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Nt = /* @__PURE__ */ ct(ht, [["__scopeId", "data-v-d83f3980"]]), dt = { class: "InputUnits" }, ft = ["placeholder"], pt = ["value"], mt = {
  __name: "InputUnits",
  props: {
    modelValue: {},
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r;
    let s = y(null);
    const n = ["wei", "gwei", "ether"];
    let c = y("wei");
    function h() {
      if (console.log("update value"), s.value) {
        const d = I.utils.parseUnits(s.value, c.value);
        e("update:modelValue", d);
      }
    }
    return (d, p) => (i(), u("div", dt, [
      j(o("input", {
        onInput: h,
        "onUpdate:modelValue": p[0] || (p[0] = (m) => s.value = m),
        type: "text",
        placeholder: t.placeholder
      }, null, 40, ft), [
        [U, s.value]
      ]),
      j(o("select", {
        onChange: h,
        "onUpdate:modelValue": p[1] || (p[1] = (m) => c.value = m)
      }, [
        (i(), u(b, null, g(n, (m) => o("option", { value: m }, f(m), 9, pt)), 64))
      ], 544), [
        [X, c.value]
      ])
    ]));
  }
};
async function xt(r, e) {
  const t = e.config, s = e.start;
  try {
    a.init(t);
  } catch (c) {
    throw a && a.status && a.status.set("ERROR"), c;
  }
  r.config.globalProperties.dapp = a, r.config.globalProperties.rGet = $, r.config.globalProperties.rSet = R;
  const n = await import("./index.540535ab.mjs");
  r.component("OnDappSafe", n.OnDappSafe), r.component("OnProviderSafe", n.OnProviderSafe), r.component("OnSignerSafe", n.OnSignerSafe), r.component("OnContractsReadSafe", n.OnContractsReadSafe), r.component("OnContractsWriteSafe", n.OnContractsWriteSafe), r.component("OnContractReadSafe", n.OnContractReadSafe), r.component("OnContractWriteSafe", n.OnContractWriteSafe), s(), a.status.set("INITIALIZED");
}
export {
  gt as AvailableWallets,
  ae as ChainWatchersList,
  vt as ConnectWalletButton,
  yt as ContractInteractor,
  re as ContractWatcher,
  ye as ContractsList,
  Nt as DebugBar,
  G as EthersContractProxy,
  ue as EthersProviderProxy,
  de as EthersSignerProxy,
  Z as EthersTransactionProxy,
  qe as EventInteractor,
  Be as EventsInteractor,
  mt as InputUnits,
  Ue as MethodInteractor,
  Ie as MethodsInteractor,
  Ct as OnContractReadSafe,
  It as OnContractWriteSafe,
  Rt as OnContractsReadSafe,
  kt as OnContractsWriteSafe,
  St as OnDappSafe,
  Et as OnProviderSafe,
  Ot as OnSignerSafe,
  wt as SelectNetworkDropdown,
  P as Status,
  Qe as Transact,
  ne as VuethersConfig,
  M as WalletConnectionRejected,
  oe as WalletWatcher,
  me as WalletsList,
  we as capitalizeWords,
  a as dapp,
  D as deepMerge,
  xt as initVuethers,
  V as isObject,
  $ as rGet,
  R as rSet,
  _e as wallets
};
