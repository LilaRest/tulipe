import { ref as R, watch as E, markRaw as te, computed as I, getCurrentInstance as x, onUnmounted as j, resolveComponent as U, openBlock as o, createBlock as M, withCtx as V, createElementBlock as l, Fragment as v, createElementVNode as i, toDisplayString as d, unref as h, renderList as C, withDirectives as A, vModelDynamic as se, vModelText as Z, vModelSelect as ne, createCommentVNode as O, createTextVNode as F, renderSlot as b, pushScopeId as ae, popScopeId as re } from "vue";
import { ethers as P } from "ethers";
class W {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const s of t)
      this.states.push(this._formatState(s));
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
    let s = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (Array.isArray(e)) {
      if (!this._areStatesValid(e))
        throw s;
      E(this._state, () => {
        this.isIn(e) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      E(this._state, () => {
        this.is(e) && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
const D = {
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
class ie {
  constructor(e = null) {
    if (this._list = [], e) {
      for (const t of e)
        if (t.chainId) {
          const s = D.networks.find((u) => u.chainId === t.chainId), n = T({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of D.networks)
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
class oe {
  constructor(e = null) {
    if (this._list = [], e) {
      for (const t of e)
        if (t.name) {
          const s = D.wallets.find((u) => u.name === t.name), n = T({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of D.wallets)
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
class ce {
  constructor(e = null) {
    let t = {};
    return e ? t = T({ ...D.defaults }, { ...e }) : t = D.defaults, t;
  }
}
class le {
  constructor(e = null) {
    this.networks = new ie(e ? e.networks : null), this.wallets = new oe(e ? e.wallets : null), this.defaults = new ce(e ? e.defaults : null);
  }
}
class ue {
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
    Object.keys(this.contracts).includes(e.address) || (this.contracts[e.address] = new he(e));
  }
  removeContractWatcher(e) {
    Object.keys(this.contracts).includes(e.address) && delete this.contracts[e.address];
  }
  addWalletWatcher(e) {
    Object.keys(this.wallets).includes(e) || (this.wallets[e] = new de(e));
  }
  removeContractWatcher(e) {
    Object.keys(this.wallets).includes(e) && delete this.wallets[e];
  }
}
class Q {
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
class he extends Q {
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
    let u = !1;
    Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: e,
      args: t,
      state: R(null),
      dependents: {}
    }, u = !0);
    let m = null;
    s && (m = E(this.sources[n].state, s));
    const _ = this._generateDependentUUID();
    return this.sources[n].dependents[_] = m, u && this._updateState(this.sources[n]), _;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const u = this.sources[n].dependents[s];
      u && u(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
class de extends Q {
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
    let u = null;
    s && (u = watch(this.sources[n].state, s));
    const m = this._generateDependentUUID();
    return this.sources[n].dependents[m] = u, newSource && this._updateState(this.sources[n]), m;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const u = this.sources[n].dependents[s];
      u && u(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
function pe(r) {
  for (var e = []; r && r !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(r)), r = Object.getPrototypeOf(r);
  return e;
}
class fe {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && te(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = pe(this._parent._extensionObject);
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
class B {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new fe(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(s, n, u) {
        if (s._ethersObject && s._ethersObject[n])
          try {
            return s._ethersObject[n].bind(s._ethersObject);
          } catch (m) {
            if (m.message.includes(".bind is not a function"))
              return s._ethersObject[n];
            throw m;
          }
        else if (s[n])
          return s[n];
      },
      set: function(s, n, u) {
        return s._ethersObject && s._ethersObject[n] ? (s._ethersObject[n] = u, !0) : (s[n] = u, !0);
      }
    });
  }
}
class me {
}
class be extends B {
  constructor(e = null) {
    const t = new me();
    super(e, t), this.status = new W("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = I(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this._asyncInit();
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
      this.proxy.setEthersObject(new P.providers.Web3Provider(e, "any"));
    else {
      const t = a.config.networks.getDefault();
      t && t.defaultRPC && this.proxy.setEthersObject(new P.providers.JsonRpcProvider(t.defaultRPC));
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
          displayName: ot(e.name),
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
    const t = x();
    if (this.isSafe.value)
      e(t);
    else {
      const s = E(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class ye {
}
class ve extends B {
  constructor(e = null) {
    const t = new ye();
    super(e, t), this.status = new W("signer", [
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
    }), this.isSafe = I(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this._asyncInit();
  }
  async _asyncInit() {
    const e = this;
    a.provider.onSafe(async function() {
      for (const t of Object.values(a.wallets))
        await e.connectWallet(t, !0);
    });
  }
  onSafe(e) {
    const t = x();
    if (this.isSafe.value)
      e(t);
    else {
      const s = E(this.isSafe, () => {
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
            if (n instanceof q)
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
class X {
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
class q extends Error {
  constructor(e, ...t) {
    super(e, ...t), this.message = `${e} wallet has rejected the connection request.`;
  }
}
class Y extends X {
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
      throw e.code === 4001 ? q(this.name) : e;
    }
  }
}
class _e extends X {
  constructor(e, t = {}) {
    super(), this.name = "Coinbase";
    const s = t.appName || "", n = t.appLogoUrl, u = t.darkMode || !1;
    this.coinbaseWalletSdk = new e({
      appName: s,
      appLogoUrl: n,
      darkMode: u
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
      throw q(this.name);
    }
  }
}
class we extends Y {
  constructor() {
    super(), this.name = "BinanceChain";
  }
  getProvider() {
    return window.BinanceChain;
  }
}
class ge {
  constructor() {
    const e = a.config.wallets.getAvailable();
    for (const t of e) {
      const s = Se[t.name];
      s && (this[t.name] = new s());
    }
  }
}
const Se = {
  metamask: Y,
  coinbase: _e,
  binanceChain: we
};
class Ee {
  _watch(e, t, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(e, t, s);
  }
  watch(e, t, s, n = null) {
    const u = this._watch(e, t, s);
    return n ? j(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, u);
    }, n) : j(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, u);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], e, t, u);
  }
  watchRef(e, t, s = null) {
    const n = this._watch(e, t, null);
    return s ? j(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }, s) : j(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }), a.chainWatchers.contracts[this.address].getRef(e, t);
  }
}
class K extends B {
  constructor(e, t) {
    const s = new Ee();
    super(t, s), this.name = e, this.status = new W(`contract:${e}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((n) => {
      n === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(n) && this.status.set("NO_PROVIDER");
    }), this.isReadSafe = I(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = I(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this._asyncInit();
  }
  _watchSignerChanges(e, t) {
    E([a.signer.isSafe], (s, n) => {
      console.log("Refresh contract " + this.name), s !== n && (this.proxy.setEthersObject(null), this._updateContract(e, t));
    });
  }
  _updateContract(e, t) {
    if (a.signer.isSafe.value)
      this.proxy.setEthersObject(new P.Contract(e, t, a.signer.proxy.getEthersObject()));
    else if (a.provider.isSafe.value)
      this.proxy.setEthersObject(new P.Contract(e, t, a.provider.proxy.getEthersObject()));
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
    const t = x();
    if (this.isReadSafe.value)
      e(t);
    else {
      const s = E(this.isReadSafe, () => {
        this.isReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = x();
    if (this.isWriteSafe.value)
      e(t);
    else {
      const s = E(this.isWriteSafe, () => {
        this.isWriteSafe.value && (e(t), s());
      });
    }
  }
}
class Oe {
  constructor() {
    this.status = new W("contracts", [
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
          this[t] = new K(t);
    this.areReadSafe = I(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = I(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.status.set("INITIALIZED");
  }
  getAll() {
    const e = {};
    for (const [t, s] of Object.entries(this))
      s instanceof K && (e[t] = s);
    return e;
  }
  onReadSafe(e) {
    const t = x();
    if (this.areReadSafe.value)
      e(t);
    else {
      const s = E(this.areReadSafe, () => {
        this.areReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = x();
    if (this.areWriteSafe.value)
      e(t);
    else {
      const s = E(this.areWriteSafe, () => {
        this.areWriteSafe.value && (e(t), s());
      });
    }
  }
}
class ke {
}
class z extends B {
  constructor(e, t = null) {
    const s = new ke();
    super(t, s), this.func = e, this.constant = !1, this.status = new W("tx", [
      "UNSENT",
      "SENT",
      "ERROR",
      "SUCCESS"
    ]), this.status.watch(["ERROR", "SUCCESS"], () => {
      setTimeout(() => {
        this.status.set("UNSENT");
      }, 5e3);
    }), this.data = null, this.error = null, this.call = null;
  }
  send(e = [], t = {}) {
    e ? Array.isArray(e) ? this.call = this.func(...e, t) : this.call = this.func(e, t) : this.call = this.func(t), this.status.set("SENT"), this.constant ? this.call.then((s) => {
      this.data = s, this.status.set("SUCCESS");
    }).catch((s) => {
      this.error = s, this.status.set("ERROR");
    }) : this.call.then((s) => s.wait()).then((s) => {
      this.data = s, this.status.set("SUCCESS");
    }).catch((s) => {
      this.error = s, this.status.set("ERROR");
    });
  }
}
class Ce {
  constructor() {
  }
  init(e = null) {
    this.config = new le(e), this.status = new W("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = I(() => this.status.is("INITIALIZED")), this.chainWatchers = new ue(), this.wallets = new ge(), this.provider = new be(), this.signer = new ve(), this.contracts = new Oe();
  }
  onSafe(e) {
    const t = x();
    if (this.isSafe.value)
      e(t);
    else {
      const s = E(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
const a = new Ce(), Re = /* @__PURE__ */ F("Functions : "), Ie = ["onClick"], Ne = /* @__PURE__ */ i("br", null, null, -1), xe = { key: 0 }, Pe = /* @__PURE__ */ i("small", null, "Inputs :", -1), De = ["onUpdate:modelValue", "type", "placeholder"], We = { key: 0 }, $e = ["onUpdate:modelValue"], Te = ["onUpdate:modelValue"], je = ["value"], Ae = { key: 1 }, Ue = /* @__PURE__ */ i("small", null, "Outputs :", -1), Me = ["onUpdate:modelValue", "placeholder"], Ve = { key: 2 }, Be = /* @__PURE__ */ F(" Events : "), Ge = /* @__PURE__ */ i("p", null, "Logs:", -1), ut = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    async function t(c) {
      const p = [];
      for (const S of g.value[c].inputs)
        p.push(S.value);
      const N = {};
      g.value[c].payable && g.value[c].tx.value.value !== "" && (N.value = P.utils.parseUnits(g.value[c].tx.value.value, g.value[c].tx.value.unit));
      const y = new z(w.value.functions[c]);
      y.send(p, N), y.call.then((S) => {
        for (let f = 0; f < S.length; f++)
          g.value[c].outputs[f].value = S[f];
      }).catch((S) => {
        g.value[c].error = S.reason;
      });
    }
    async function s(c) {
      $.value[c.event].count += 1;
      let p = `Block ${c.blockNumber} -> {`;
      for (const N of $.value[c.event].inputs)
        p += `${N.name}:${c.args[N.name]}, `;
      p = p.substring(0, p.length - 2) + "}", $.value[c.event].logs.push(p);
    }
    function n(c) {
      return c.includes("int") ? "number" : "text";
    }
    function u(c) {
      return `${c.name && c.name !== "null" ? c.name : "unnamed"} (${c.type})`;
    }
    function m(c) {
      const p = [];
      return p.push(c.mutability), c.payable && p.push("payable"), p.join(", ");
    }
    const _ = e.contract, w = I(() => a.contracts[e.contract]);
    let k = R("no owner");
    const H = ["wei", "gwei", "ether"], $ = R({}), g = R({});
    return a.contracts.onReadSafe(async function() {
      try {
        k.value = await w.value.owner();
      } catch {
      }
      for (const c of Object.values(w.value.interface.functions)) {
        g.value[c.name] = {
          inputs: [],
          outputs: [],
          error: null,
          payable: c.payable,
          mutability: c.stateMutability === "view" || c.stateMutability === "pure" ? "read" : "write",
          tx: {
            value: {
              value: "",
              unit: "wei"
            }
          }
        };
        for (let p = 0; p < c.inputs.length; p++)
          g.value[c.name].inputs[p] = {
            name: c.inputs[p].name,
            type: c.inputs[p].type,
            value: ""
          };
        for (let p = 0; p < c.outputs.length; p++)
          g.value[c.name].outputs[p] = {
            name: c.outputs[p].name,
            type: c.outputs[p].type,
            value: ""
          };
      }
      for (const c of Object.values(w.value.interface.events))
        $.value[c.name] = {
          count: 0,
          logs: [],
          inputs: c.inputs
        }, w.value.on(c, s);
    }), (c, p) => {
      const N = U("OnContractsReadSafe");
      return o(), M(N, null, {
        default: V(() => [
          w.value ? (o(), l(v, { key: 0 }, [
            i("p", null, "Interact with '" + d(h(_)) + "' contract :", 1),
            i("ul", null, [
              i("li", null, "Address : " + d(w.value.address), 1),
              i("li", null, "Owner : " + d(k.value), 1),
              i("li", null, [
                Re,
                i("ul", null, [
                  (o(!0), l(v, null, C(g.value, (y, S) => (o(), l("li", null, [
                    i("button", {
                      onClick: (f) => t(S)
                    }, d(S), 9, Ie),
                    i("small", null, "(" + d(m(y)) + ")", 1),
                    Ne,
                    Object.keys(y.inputs).length > 0 || y.payable ? (o(), l("div", xe, [
                      Pe,
                      i("ul", null, [
                        (o(!0), l(v, null, C(y.inputs, (f, ee) => (o(), l("li", null, [
                          A(i("input", {
                            "onUpdate:modelValue": (G) => f.value = G,
                            type: n(f.type),
                            placeholder: u(f)
                          }, null, 8, De), [
                            [se, f.value]
                          ])
                        ]))), 256)),
                        y.payable ? (o(), l("li", We, [
                          A(i("input", {
                            "onUpdate:modelValue": (f) => y.tx.value.value = f,
                            type: "text",
                            placeholder: "TX value"
                          }, null, 8, $e), [
                            [Z, y.tx.value.value]
                          ]),
                          A(i("select", {
                            "onUpdate:modelValue": (f) => y.tx.value.unit = f
                          }, [
                            (o(), l(v, null, C(H, (f) => i("option", { value: f }, d(f), 9, je)), 64))
                          ], 8, Te), [
                            [ne, y.tx.value.unit]
                          ])
                        ])) : O("", !0)
                      ])
                    ])) : O("", !0),
                    Object.keys(y.outputs).length > 0 ? (o(), l("div", Ae, [
                      Ue,
                      i("ul", null, [
                        (o(!0), l(v, null, C(y.outputs, (f, ee) => (o(), l("li", null, [
                          A(i("input", {
                            "onUpdate:modelValue": (G) => f.value = G,
                            type: "text",
                            placeholder: u(f),
                            disabled: ""
                          }, null, 8, Me), [
                            [Z, f.value]
                          ])
                        ]))), 256))
                      ])
                    ])) : O("", !0),
                    y.error ? (o(), l("p", Ve, d(y.error), 1)) : O("", !0)
                  ]))), 256))
                ])
              ]),
              i("li", null, [
                Be,
                i("ul", null, [
                  (o(!0), l(v, null, C($.value, (y, S) => (o(), l("li", null, [
                    i("h3", null, d(S), 1),
                    i("p", null, "Count : " + d(y.count), 1),
                    Ge,
                    i("ul", null, [
                      (o(!0), l(v, null, C(y.logs, (f) => (o(), l("li", null, d(f), 1))), 256))
                    ])
                  ]))), 256))
                ])
              ])
            ])
          ], 64)) : O("", !0)
        ]),
        _: 1
      });
    };
  }
}, Le = {
  key: 1,
  disabled: ""
}, Fe = {
  key: 2,
  disabled: ""
}, qe = {
  key: 3,
  disabled: ""
}, He = { key: 4 }, ht = {
  __name: "Transact",
  props: {
    content: {
      type: String,
      required: !1
    },
    contract: {
      type: String,
      required: !0
    },
    action: {
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
    }
  },
  setup(r) {
    const e = r;
    let t = new z(null);
    a.contracts.onReadSafe(() => {
      try {
        t.func = a.contracts[e.contract][e.action];
      } catch (n) {
        throw console.log(n), `Error in Transact component : contract '${e.contract}' doesn't exist or it doesn't have any property '${e.action}'`;
      }
    });
    function s() {
      const n = e.args ? e.args : [], u = e.txArgs ? e.txArgs : {};
      t.send(n, u);
    }
    return (n, u) => (o(), l(v, null, [
      h(t).status.is("UNSENT") ? (o(), l("button", {
        key: 0,
        onClick: s
      }, d(e.content ? e.content : "Transact"), 1)) : h(t).status.is("SENT") ? (o(), l("button", Le, "Transaction sent...")) : h(t).status.is("ERROR") ? (o(), l("button", Fe, "Transaction error!")) : h(t).status.is("SUCCESS") ? (o(), l("button", qe, "Success !")) : O("", !0),
      h(t).status.is("ERROR") ? (o(), l("p", He, d(h(t).error.reason), 1)) : O("", !0)
    ], 64));
  }
}, Ze = { class: "ConnectWalletButton" }, Ke = {
  key: 1,
  disabled: ""
}, Qe = {
  key: 2,
  disabled: ""
}, Xe = {
  key: 3,
  disabled: ""
}, Ye = {
  key: 4,
  disabled: ""
}, dt = {
  __name: "ConnectWalletButton",
  setup(r) {
    return (e, t) => {
      const s = U("OnProviderSafe");
      return o(), M(s, null, {
        default: V(() => [
          i("div", Ze, [
            h(a).signer.status.is("DISCONNECTED") ? (o(), l("button", {
              key: 0,
              onClick: t[0] || (t[0] = (n) => h(a).signer.connectWallet(h(a).wallets.metamask))
            }, "Connect Wallet")) : h(a).signer.status.is("REQUESTED") ? (o(), l("button", Ke, "Connection requested...")) : h(a).signer.status.is("REFUSED") ? (o(), l("button", Qe, "Connection refused!")) : h(a).signer.status.is("ERROR") ? (o(), l("button", Xe, "Connection error!")) : h(a).provider.status.is("WRONG") ? (o(), l("button", Ye, "Wrong network! (" + d(h(a).networks.current.displayName) + ")", 1)) : h(a).signer.status.is("CONNECTED") ? (o(), l("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...n) => h(a).signer.disconnectWallet && h(a).signer.disconnectWallet(...n))
            }, "Disconnect")) : O("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, ze = { class: "SelectNetworkDropdown" }, Je = {
  key: 0,
  selected: ""
}, et = ["src", "alt"], tt = ["onClick"], st = ["src", "alt"], pt = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    let e = R({}), t = R([]);
    a.onSafe(async function() {
      e.value = await a.config.networks.getCurrent(), t.value = a.config.networks.getAvailable(), t.value = t.value.filter((m) => m != e.value);
    });
    async function s(m) {
      const _ = t.value.find((w) => w.chainId === parseInt(m));
      if (_) {
        m = P.utils.hexlify(parseInt(m)).toString(), m = P.utils.hexValue(m);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: m
            }]
          });
        } catch (w) {
          w.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: m,
              rpcUrls: [_.defaultRPC],
              chainName: _.name,
              nativeCurrency: {
                name: _.currency.symbol,
                symbol: _.currency.symbol,
                decimals: _.currency.decimals
              },
              blockExplorerUrls: _.explorer && _.explorer.url !== "" ? [_.explorer.url] : null
            }]
          });
        }
      }
    }
    function n() {
      u.value = !u.value;
    }
    let u = R(!1);
    return (m, _) => {
      const w = U("OnDappSafe");
      return o(), M(w, null, {
        default: V(() => [
          i("div", ze, [
            i("ul", { onClick: n }, [
              e.value ? (o(), l("li", Je, [
                i("img", {
                  width: "40",
                  src: e.value.icon ? e.value.icon : h(a).config.defaults.providers.icon,
                  alt: e.value.name + " logo"
                }, null, 8, et),
                i("p", null, d(e.value.displayName), 1)
              ])) : O("", !0),
              u.value ? (o(!0), l(v, { key: 1 }, C(t.value, (k) => (o(), l("li", {
                key: k.chainId,
                onClick: (H) => s(k.chainId)
              }, [
                i("img", {
                  width: "40",
                  src: k.icon ? k.icon : h(a).config.defaults.providers.icon,
                  alt: k.name + " logo"
                }, null, 8, st),
                i("p", null, d(k.displayName), 1)
              ], 8, tt))), 128)) : O("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, ft = {
  __name: "OnDappSafe",
  setup(r) {
    return (e, t) => h(a).isSafe.value ? (o(), l(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, mt = {
  __name: "OnProviderSafe",
  setup(r) {
    return (e, t) => h(a).provider.isSafe.value ? (o(), l(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, bt = {
  __name: "OnSignerSafe",
  setup(r) {
    return (e, t) => h(a).signer.isSafe.value ? (o(), l(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, yt = {
  __name: "OnContractsReadSafe",
  setup(r) {
    return (e, t) => h(a).contracts.areReadSafe.value ? (o(), l(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, vt = {
  __name: "OnContractsWriteSafe",
  setup(r) {
    return (e, t) => h(a).contracts.areWriteSafe.value ? (o(), l(v, { key: 0 }, [
      b(e.$slots, "default"),
      b(e.$slots, "safe")
    ], 64)) : b(e.$slots, "unsafe", { key: 1 });
  }
}, _t = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => h(a).contracts[e.contract].isReadSafe.value ? (o(), l(v, { key: 0 }, [
      b(t.$slots, "default"),
      b(t.$slots, "safe")
    ], 64)) : b(t.$slots, "unsafe", { key: 1 });
  }
}, wt = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => h(a).contracts[e.contract].isWriteSafe.value ? (o(), l(v, { key: 0 }, [
      b(t.$slots, "default"),
      b(t.$slots, "safe")
    ], 64)) : b(t.$slots, "unsafe", { key: 1 });
  }
};
const nt = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, n] of e)
    t[s] = n;
  return t;
}, J = (r) => (ae("data-v-d83f3980"), r = r(), re(), r), at = /* @__PURE__ */ J(() => /* @__PURE__ */ i("h3", null, "Safe Runners", -1)), rt = /* @__PURE__ */ J(() => /* @__PURE__ */ i("h3", null, "Status", -1)), it = {
  __name: "DebugBar",
  setup(r) {
    return (e, t) => {
      const s = U("OnDappSafe");
      return o(), M(s, null, {
        default: V(() => [
          i("section", null, [
            i("div", null, [
              at,
              i("ul", null, [
                i("li", null, "DApp safe : " + d(h(a).isSafe), 1),
                i("li", null, "Network safe : " + d(h(a).provider.isSafe), 1),
                i("li", null, "Wallet safe : " + d(h(a).signer.isSafe), 1),
                i("li", null, "Contracts read safe : " + d(h(a).contracts.areReadSafe), 1),
                i("li", null, "Contracts write safe : " + d(h(a).contracts.areWriteSafe), 1),
                (o(!0), l(v, null, C(h(a).contracts.getAll(), (n, u) => (o(), l("li", null, [
                  F(" contract " + d(u) + " : ", 1),
                  i("ul", null, [
                    i("li", null, "read safe : " + d(n.isReadSafe), 1),
                    i("li", null, "write safe : " + d(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            i("div", null, [
              rt,
              i("ul", null, [
                i("li", null, "dapp : " + d(h(a).status.get()), 1),
                i("li", null, "provider : " + d(h(a).provider.status.get()), 1),
                i("li", null, "signer : " + d(h(a).signer.status.get()), 1),
                i("li", null, "contracts : " + d(h(a).contracts.status.get()), 1),
                (o(!0), l(v, null, C(h(a).contracts.getAll(), (n, u) => (o(), l("li", null, " contract " + d(u) + " : " + d(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, gt = /* @__PURE__ */ nt(it, [["__scopeId", "data-v-d83f3980"]]);
function L(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function T(r, ...e) {
  if (!e.length)
    return r;
  const t = e.shift();
  if (L(r) && L(t))
    for (const s in t)
      L(t[s]) ? (r[s] || Object.assign(r, {
        [s]: {}
      }), T(r[s], t[s])) : Object.assign(r, {
        [s]: t[s]
      });
  return T(r, ...e);
}
function ot(r) {
  const e = r.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function St(r, e) {
  const t = e.config, s = e.start;
  try {
    a.init(t);
  } catch (u) {
    throw a && a.status && a.status.set("ERROR"), u;
  }
  r.config.globalProperties.dapp = a;
  const n = await import("./index.6b7d50ef.mjs");
  r.component("OnDappSafe", n.OnDappSafe), r.component("OnProviderSafe", n.OnProviderSafe), r.component("OnSignerSafe", n.OnSignerSafe), r.component("OnContractsReadSafe", n.OnContractsReadSafe), r.component("OnContractsWriteSafe", n.OnContractsWriteSafe), r.component("OnContractReadSafe", n.OnContractReadSafe), r.component("OnContractWriteSafe", n.OnContractWriteSafe), s(), a.status.set("INITIALIZED");
}
export {
  ue as ChainWatchersList,
  dt as ConnectWalletButton,
  ut as ContractInteractor,
  he as ContractWatcher,
  Oe as ContractsList,
  gt as DebugBar,
  K as EthersContractProxy,
  be as EthersProviderProxy,
  ve as EthersSignerProxy,
  z as EthersTransactionProxy,
  _t as OnContractReadSafe,
  wt as OnContractWriteSafe,
  yt as OnContractsReadSafe,
  vt as OnContractsWriteSafe,
  ft as OnDappSafe,
  mt as OnProviderSafe,
  bt as OnSignerSafe,
  pt as SelectNetworkDropdown,
  W as Status,
  ht as Transact,
  le as VuethersConfig,
  q as WalletConnectionRejected,
  de as WalletWatcher,
  ge as WalletsList,
  ot as capitalizeWords,
  a as dapp,
  T as deepMerge,
  St as initVuethers,
  L as isObject,
  Se as wallets
};
