import { ref as b, watch as S, markRaw as ee, computed as R, getCurrentInstance as I, onUnmounted as U, isRef as K, resolveComponent as O, openBlock as c, createBlock as k, withCtx as C, createElementVNode as o, toDisplayString as f, unref as l, createVNode as j, createTextVNode as M, createElementBlock as u, Fragment as _, renderList as g, shallowRef as te, withDirectives as L, vModelText as H, createCommentVNode as E, renderSlot as m, pushScopeId as se, popScopeId as ne, vModelSelect as ae } from "vue";
import { ethers as N } from "ethers";
class D {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const s of t)
      this.states.push(this._formatState(s));
    this._state = b(this.states[0]);
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
    return q(this._state);
  }
  getRef() {
    return this._state;
  }
  set(e) {
    if (e = this._formatState(e), !this._isStateValid(e))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    $(this._state, e), console.log(`Status '${this._name}' set to '${q(this._state)}'`);
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
      S(this._state, () => {
        this.isIn(e) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw s;
      S(this._state, () => {
        this.is(e) && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
const P = {
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
class re {
  constructor(e = null) {
    if (this._list = [], e) {
      for (const t of e)
        if (t.chainId) {
          const s = P.networks.find((i) => i.chainId === t.chainId), n = A({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of P.networks)
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
          const s = P.wallets.find((i) => i.name === t.name), n = A({ ...s }, { ...t });
          n.available !== !1 && (n.available = !0), n.displayName || (n.displayName = n.name), this._list.push(n);
        }
    }
    for (const t of P.wallets)
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
class ie {
  constructor(e = null) {
    let t = {};
    return e ? t = A({ ...P.defaults }, { ...e }) : t = P.defaults, t;
  }
}
class ce {
  constructor(e = null) {
    this.networks = new re(e ? e.networks : null), this.wallets = new oe(e ? e.wallets : null), this.defaults = new ie(e ? e.defaults : null);
  }
}
class le {
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
    Object.keys(this.contracts).includes(e.address) || (this.contracts[e.address] = new ue(e));
  }
  removeContractWatcher(e) {
    Object.keys(this.contracts).includes(e.address) && delete this.contracts[e.address];
  }
  addWalletWatcher(e) {
    Object.keys(this.wallets).includes(e) || (this.wallets[e] = new he(e));
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
class ue extends Q {
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
    let i = !1;
    Object.keys(this.sources).includes(n) || (this.sources[n] = {
      name: e,
      args: t,
      state: b(null),
      dependents: {}
    }, i = !0);
    let h = null;
    s && (h = S(this.sources[n].state, s));
    const d = this._generateDependentUUID();
    return this.sources[n].dependents[d] = h, i && this._updateState(this.sources[n]), d;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const i = this.sources[n].dependents[s];
      i && i(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
class he extends Q {
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
    let i = null;
    s && (i = watch(this.sources[n].state, s));
    const h = this._generateDependentUUID();
    return this.sources[n].dependents[h] = i, newSource && this._updateState(this.sources[n]), h;
  }
  remove(e, t, s) {
    const n = this._buildSourceName(e, t);
    if (Object.keys(this.sources).includes(n) && Object.keys(this.sources[n].dependents).includes(s)) {
      const i = this.sources[n].dependents[s];
      i && i(), delete this.sources[n].dependents[s];
    }
    Object.keys(this.sources[n].dependents).length === 0 && delete this.sources[n];
  }
  getRef(e, t) {
    const s = this._buildSourceName(e, t);
    return this.sources[s].state;
  }
}
function de(r) {
  for (var e = []; r && r !== Object.prototype; )
    e.push.apply(e, Object.getOwnPropertyNames(r)), r = Object.getPrototypeOf(r);
  return e;
}
class fe {
  constructor(e) {
    this._parent = e;
  }
  setEthersObject(e) {
    this._parent._ethersObject = e && ee(e), this.extendsEthersObject();
  }
  getEthersObject() {
    return this._parent._ethersObject;
  }
  extendsEthersObject() {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const e = de(this._parent._extensionObject);
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
class V {
  constructor(e = null, t = null) {
    return this._ethersObject = null, this._extensionObject = t, this.proxy = new fe(this), this.proxy.setEthersObject(e), new Proxy(this, {
      get: function(s, n, i) {
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
      set: function(s, n, i) {
        return s._ethersObject && s._ethersObject[n] ? (s._ethersObject[n] = i, !0) : (s[n] = i, !0);
      }
    });
  }
}
class pe {
}
class me extends V {
  constructor(e = null) {
    const t = new pe();
    super(e, t), this.status = new D("provider", [
      "DISCONNECTED",
      "WRONG",
      "ERROR",
      "CONNECTED"
    ]), this.isSafe = R(() => a.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"])), this._asyncInit();
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
      this.proxy.setEthersObject(new N.providers.Web3Provider(e, "any"));
    else {
      const t = a.config.networks.getDefault();
      t && t.defaultRPC && this.proxy.setEthersObject(new N.providers.JsonRpcProvider(t.defaultRPC));
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
          displayName: Ce(e.name),
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
    const t = I();
    if (this.isSafe.value)
      e(t);
    else {
      const s = S(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
class _e {
}
class be extends V {
  constructor(e = null) {
    const t = new _e();
    super(e, t), this.status = new D("signer", [
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
    }), this.isSafe = R(() => a.provider.isSafe.value && this.status.is("CONNECTED")), this._asyncInit();
  }
  async _asyncInit() {
    const e = this;
    a.provider.onSafe(async function() {
      for (const t of Object.values(a.wallets))
        await e.connectWallet(t, !0);
    });
  }
  onSafe(e) {
    const t = I();
    if (this.isSafe.value)
      e(t);
    else {
      const s = S(this.isSafe, () => {
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
            if (n instanceof F)
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
class Y {
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
class F extends Error {
  constructor(e, ...t) {
    super(e, ...t), this.message = `${e} wallet has rejected the connection request.`;
  }
}
class z extends Y {
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
      throw e.code === 4001 ? F(this.name) : e;
    }
  }
}
class ye extends Y {
  constructor(e, t = {}) {
    super(), this.name = "Coinbase";
    const s = t.appName || "", n = t.appLogoUrl, i = t.darkMode || !1;
    this.coinbaseWalletSdk = new e({
      appName: s,
      appLogoUrl: n,
      darkMode: i
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
      throw F(this.name);
    }
  }
}
class ve extends z {
  constructor() {
    super(), this.name = "BinanceChain";
  }
  getProvider() {
    return window.BinanceChain;
  }
}
class we {
  constructor() {
    const e = a.config.wallets.getAvailable();
    for (const t of e) {
      const s = Se[t.name];
      s && (this[t.name] = new s());
    }
  }
}
const Se = {
  metamask: z,
  coinbase: ye,
  binanceChain: ve
};
class ge {
  _watch(e, t, s = null) {
    return Object.keys(a.chainWatchers.contracts).includes(this.address) || a.chainWatchers.addContractWatcher(this), a.chainWatchers.contracts[this.address].add(e, t, s);
  }
  watch(e, t, s, n = null) {
    const i = this._watch(e, t, s);
    return n ? U(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, i);
    }, n) : U(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, i);
    }), a.chainWatchers.contracts[this.address].remove.bind(a.chainWatchers.contracts[this.address], e, t, i);
  }
  watchRef(e, t, s = null) {
    const n = this._watch(e, t, null);
    return s ? U(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }, s) : U(() => {
      a.chainWatchers.contracts[this.address].remove(e, t, n);
    }), a.chainWatchers.contracts[this.address].getRef(e, t);
  }
}
class Z extends V {
  constructor(e, t) {
    const s = new ge();
    super(t, s), this.name = e, this.status = new D(`contract:${e}`, [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]), a.provider.status.watchAny((n) => {
      n === "WRONG" ? this.status.set("WRONG_PROVIDER") : ["DISCONNECTED", "ERROR"].includes(n) && this.status.set("NO_PROVIDER");
    }), this.isReadSafe = R(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.isWriteSafe = R(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this._asyncInit();
  }
  _watchSignerChanges(e, t) {
    S([a.signer.isSafe], (s, n) => {
      console.log("Refresh contract " + this.name), s !== n && (this.proxy.setEthersObject(null), this._updateContract(e, t));
    });
  }
  _updateContract(e, t) {
    if (a.signer.isSafe.value)
      this.proxy.setEthersObject(new N.Contract(e, t, a.signer.proxy.getEthersObject()));
    else if (a.provider.isSafe.value)
      this.proxy.setEthersObject(new N.Contract(e, t, a.provider.proxy.getEthersObject()));
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
    const t = I();
    if (this.isReadSafe.value)
      e(t);
    else {
      const s = S(this.isReadSafe, () => {
        this.isReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = I();
    if (this.isWriteSafe.value)
      e(t);
    else {
      const s = S(this.isWriteSafe, () => {
        this.isWriteSafe.value && (e(t), s());
      });
    }
  }
}
class Ee {
  constructor() {
    this.status = new D("contracts", [
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
          this[t] = new Z(t);
    this.areReadSafe = R(() => a.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = R(() => a.signer.isSafe.value && this.status.is("INITIALIZED")), this.status.set("INITIALIZED");
  }
  getAll() {
    const e = {};
    for (const [t, s] of Object.entries(this))
      s instanceof Z && (e[t] = s);
    return e;
  }
  onReadSafe(e) {
    const t = I();
    if (this.areReadSafe.value)
      e(t);
    else {
      const s = S(this.areReadSafe, () => {
        this.areReadSafe.value && (e(t), s());
      });
    }
  }
  onWriteSafe(e) {
    const t = I();
    if (this.areWriteSafe.value)
      e(t);
    else {
      const s = S(this.areWriteSafe, () => {
        this.areWriteSafe.value && (e(t), s());
      });
    }
  }
}
class Oe {
}
class J extends V {
  constructor(e, t) {
    let s = null;
    const n = a.contracts[e];
    if (n && (s = n[t]), !s)
      throw `Cannot create EthersTransactionExtension object for method ${t} of ${e}. One of them doesn't exist.`;
    super(s, new Oe()), this.txInfos = n.interface.functions[t], this.status = new D(`tx:${e}:${t}`, [
      "UNSENT",
      "SENT",
      "ERROR",
      "SUCCESS"
    ]), this.status.watch(["ERROR", "SUCCESS"], () => {
      setTimeout(() => {
        this.status.set("UNSENT");
      }, 5e3);
    }), this.data = b(null), this.error = b(null), this.call = null;
  }
  send(e = [], t = {}) {
    e ? Array.isArray(e) ? this.call = this.proxy.getEthersObject()(...e, t) : this.call = this.proxy.getEthersObject()(e, t) : this.call = this.proxy.getEthersObject()(t), this.status.set("SENT"), this.txInfos.constant ? this.call.then((s) => {
      $(this.data, s), this.status.set("SUCCESS");
    }).catch((s) => {
      $(this.error, s), this.status.set("ERROR");
    }) : this.call.then((s) => s.wait()).then((s) => {
      $(this.data, s), this.status.set("SUCCESS");
    }).catch((s) => {
      $(this.error, s), this.status.set("ERROR");
    });
  }
}
class ke {
  constructor() {
  }
  init(e = null) {
    this.config = new ce(e), this.status = new D("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED"
    ]), this.isSafe = R(() => this.status.is("INITIALIZED")), this.chainWatchers = new le(), this.wallets = new we(), this.provider = new me(), this.signer = new be(), this.contracts = new Ee();
  }
  onSafe(e) {
    const t = I();
    if (this.isSafe.value)
      e(t);
    else {
      const s = S(this.isSafe, () => {
        this.isSafe.value && (e(t), s());
      });
    }
  }
}
const a = new ke();
function G(r) {
  return r && typeof r == "object" && !Array.isArray(r);
}
function A(r, ...e) {
  if (!e.length)
    return r;
  const t = e.shift();
  if (G(r) && G(t))
    for (const s in t)
      G(t[s]) ? (r[s] || Object.assign(r, {
        [s]: {}
      }), A(r[s], t[s])) : Object.assign(r, {
        [s]: t[s]
      });
  return A(r, ...e);
}
function Ce(r) {
  const e = r.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
function q(r) {
  return K(r) ? r.value : r;
}
function $(r, e) {
  K(r) ? r.value = e : r = e;
}
const Re = { class: "ContractInteractor" }, Ie = /* @__PURE__ */ M(" Methods : "), Ne = /* @__PURE__ */ o("br", null, null, -1), xe = /* @__PURE__ */ M(" Events : "), $e = /* @__PURE__ */ o("br", null, null, -1), wt = {
  __name: "ContractInteractor",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = a.contracts[e.contract];
    let s = b("not owned");
    return a.contracts[e.contract].onReadSafe(async function() {
      try {
        s.value = await t.owner();
      } catch {
      }
    }), (n, i) => {
      const h = O("OnContractReadSafe");
      return c(), k(h, {
        contract: e.contract
      }, {
        default: C(() => [
          o("div", Re, [
            o("ul", null, [
              o("li", null, "Address : " + f(l(t).address), 1),
              o("li", null, "Owner : " + f(s.value), 1),
              o("li", null, [
                Ie,
                Ne,
                j(l(De), {
                  contract: e.contract
                }, null, 8, ["contract"])
              ]),
              o("li", null, [
                xe,
                $e,
                j(l(Fe), {
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
}, Pe = { class: "MethodsInteractor" }, De = {
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
      const i = O("OnContractReadSafe");
      return c(), k(i, {
        contract: e.contract
      }, {
        default: C(() => [
          o("div", Pe, [
            o("ul", null, [
              (c(!0), u(_, null, g(l(t).interface.functions, (h, d) => (c(), u("li", null, [
                j(l(Le), {
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
}, We = { class: "MethodInteractor" }, Te = { key: 0 }, je = /* @__PURE__ */ o("p", null, "Inputs :", -1), Ae = ["onUpdate:modelValue", "placeholder"], Ue = { key: 0 }, Me = { key: 1 }, Ve = /* @__PURE__ */ o("p", null, "Outputs :", -1), Be = ["onUpdate:modelValue", "placeholder"], Ge = { key: 2 }, Le = {
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
    const e = r, t = a.contracts[e.contract];
    let s = te({}), n = b({});
    const i = b([]), h = b([]), d = b({
      value: 0
    });
    function p() {
      const v = [];
      i.value.forEach((w) => {
        v.push(w);
      }), s.value.send(v, d.value), s.value.call.then((w) => {
        if (Array.isArray(w))
          for (let x = 0; x < w.length; x++)
            h.value[x] = w[x];
        else
          h.value[0] = w;
      }).catch((w) => {
        w = w.reason;
      });
    }
    function y(v) {
      return `${v.name && v.name !== "null" ? v.name : ""} (${v.type})`;
    }
    return a.contracts[e.contract].onReadSafe(async function() {
      n.value = t.interface.functions[e.method], s.value = new J(e.contract, e.method), n.value.inputs.forEach((v) => i.value.push(null)), n.value.outputs.forEach((v) => h.value.push(null));
    }), (v, w) => {
      const x = O("OnContractReadSafe");
      return c(), k(x, {
        contract: e.contract
      }, {
        default: C(() => [
          o("div", We, [
            o("button", { onClick: p }, f(n.value.name), 1),
            o("small", null, f(n.value.stateMutability), 1),
            Object.keys(n.value.inputs).length > 0 || n.value.payable ? (c(), u("div", Te, [
              je,
              o("ul", null, [
                (c(!0), u(_, null, g(n.value.inputs, (W, T) => (c(), u("li", null, [
                  L(o("input", {
                    "onUpdate:modelValue": (B) => i.value[T] = B,
                    type: "text",
                    placeholder: y(W)
                  }, null, 8, Ae), [
                    [H, i.value[T]]
                  ])
                ]))), 256)),
                n.value.payable ? (c(), u("li", Ue, [
                  j(l(bt), {
                    modelValue: d.value.value,
                    "onUpdate:modelValue": w[0] || (w[0] = (W) => d.value.value = W)
                  }, null, 8, ["modelValue"])
                ])) : E("", !0)
              ])
            ])) : E("", !0),
            Object.keys(n.value.outputs).length > 0 ? (c(), u("div", Me, [
              Ve,
              o("ul", null, [
                (c(!0), u(_, null, g(n.value.outputs, (W, T) => (c(), u("li", null, [
                  L(o("input", {
                    "onUpdate:modelValue": (B) => h.value[T] = B,
                    type: "text",
                    placeholder: y(W),
                    disabled: ""
                  }, null, 8, Be), [
                    [H, h.value[T]]
                  ])
                ]))), 256))
              ])
            ])) : E("", !0),
            s.value.status.is("ERROR") ? (c(), u("p", Ge, f(s.value.error.value.reason), 1)) : E("", !0)
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, qe = { class: "EventsInteractor" }, Fe = {
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
      const i = O("OnContractReadSafe");
      return c(), k(i, {
        contract: e.contract
      }, {
        default: C(() => [
          o("div", qe, [
            o("ul", null, [
              (c(!0), u(_, null, g(l(t).interface.events, (h, d) => (c(), u("li", null, [
                j(l(Ke), {
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
}, He = { class: "EventInteractor" }, Ze = /* @__PURE__ */ M("Logs: "), Ke = {
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
    let s = b({}), n = b({}), i = b(0), h = b([]);
    return t.onReadSafe(() => {
      s.value = t.interface.events[e.event], n.value = t.filters[s.value.name], t.on(n.value, (d) => {
        i.value++;
        let p = `Block ${d.blockNumber} -> {`;
        for (const y of s.value.inputs)
          p += `${y.name}:${d.args[y.name]}, `;
        p = p.substring(0, p.length - 2) + "}", h.value.push(p);
      });
    }), (d, p) => {
      const y = O("OnContractReadSafe");
      return c(), k(y, {
        contract: e.contract
      }, {
        default: C(() => [
          o("div", He, [
            o("p", null, f(s.value.name), 1),
            o("ul", null, [
              o("li", null, "Count : " + f(i.value), 1),
              o("li", null, [
                Ze,
                o("ul", null, [
                  (c(!0), u(_, null, g(h.value, (v) => (c(), u("li", null, f(v), 1))), 256))
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["contract"]);
    };
  }
}, Qe = {
  key: 1,
  disabled: ""
}, Ye = {
  key: 2,
  disabled: ""
}, ze = {
  key: 3,
  disabled: ""
}, Je = { key: 4 }, St = {
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
    let t = new J(null);
    a.contracts.onReadSafe(() => {
      try {
        t.func = a.contracts[e.contract][e.action];
      } catch (n) {
        throw console.log(n), `Error in Transact component : contract '${e.contract}' doesn't exist or it doesn't have any property '${e.action}'`;
      }
    });
    function s() {
      const n = e.args ? e.args : [], i = e.txArgs ? e.txArgs : {};
      t.send(n, i);
    }
    return (n, i) => (c(), u(_, null, [
      l(t).status.is("UNSENT") ? (c(), u("button", {
        key: 0,
        onClick: s
      }, f(e.content ? e.content : "Transact"), 1)) : l(t).status.is("SENT") ? (c(), u("button", Qe, "Transaction sent...")) : l(t).status.is("ERROR") ? (c(), u("button", Ye, "Transaction error!")) : l(t).status.is("SUCCESS") ? (c(), u("button", ze, "Success !")) : E("", !0),
      l(t).status.is("ERROR") ? (c(), u("p", Je, f(l(t).error.reason), 1)) : E("", !0)
    ], 64));
  }
}, Xe = { class: "ConnectWalletButton" }, et = {
  key: 1,
  disabled: ""
}, tt = {
  key: 2,
  disabled: ""
}, st = {
  key: 3,
  disabled: ""
}, nt = {
  key: 4,
  disabled: ""
}, gt = {
  __name: "ConnectWalletButton",
  setup(r) {
    return (e, t) => {
      const s = O("OnProviderSafe");
      return c(), k(s, null, {
        default: C(() => [
          o("div", Xe, [
            l(a).signer.status.is("DISCONNECTED") ? (c(), u("button", {
              key: 0,
              onClick: t[0] || (t[0] = (n) => l(a).signer.connectWallet(l(a).wallets.metamask))
            }, "Connect Wallet")) : l(a).signer.status.is("REQUESTED") ? (c(), u("button", et, "Connection requested...")) : l(a).signer.status.is("REFUSED") ? (c(), u("button", tt, "Connection refused!")) : l(a).signer.status.is("ERROR") ? (c(), u("button", st, "Connection error!")) : l(a).provider.status.is("WRONG") ? (c(), u("button", nt, "Wrong network! (" + f(l(a).networks.current.displayName) + ")", 1)) : l(a).signer.status.is("CONNECTED") ? (c(), u("button", {
              key: 5,
              onClick: t[1] || (t[1] = (...n) => l(a).signer.disconnectWallet && l(a).signer.disconnectWallet(...n))
            }, "Disconnect")) : E("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
}, at = /* @__PURE__ */ o("p", null, "Available wallets :", -1), Et = {
  __name: "AvailableWallets",
  setup(r) {
    return (e, t) => {
      const s = O("OnDappSafe");
      return c(), k(s, null, {
        default: C(() => [
          at,
          o("ul", null, [
            (c(!0), u(_, null, g(l(a).wallets, (n) => (c(), u("li", null, f(n.name), 1))), 256))
          ])
        ]),
        _: 1
      });
    };
  }
}, rt = { class: "SelectNetworkDropdown" }, ot = {
  key: 0,
  selected: ""
}, it = ["src", "alt"], ct = ["onClick"], lt = ["src", "alt"], Ot = {
  __name: "SelectNetworkDropdown",
  setup(r) {
    let e = b({}), t = b([]);
    a.onSafe(async function() {
      e.value = await a.config.networks.getCurrent(), t.value = a.config.networks.getAvailable(), t.value = t.value.filter((h) => h != e.value);
    });
    async function s(h) {
      const d = t.value.find((p) => p.chainId === parseInt(h));
      if (d) {
        h = N.utils.hexlify(parseInt(h)).toString(), h = N.utils.hexValue(h);
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
      i.value = !i.value;
    }
    let i = b(!1);
    return (h, d) => {
      const p = O("OnDappSafe");
      return c(), k(p, null, {
        default: C(() => [
          o("div", rt, [
            o("ul", { onClick: n }, [
              e.value ? (c(), u("li", ot, [
                o("img", {
                  width: "40",
                  src: e.value.icon ? e.value.icon : l(a).config.defaults.providers.icon,
                  alt: e.value.name + " logo"
                }, null, 8, it),
                o("p", null, f(e.value.displayName), 1)
              ])) : E("", !0),
              i.value ? (c(!0), u(_, { key: 1 }, g(t.value, (y) => (c(), u("li", {
                key: y.chainId,
                onClick: (v) => s(y.chainId)
              }, [
                o("img", {
                  width: "40",
                  src: y.icon ? y.icon : l(a).config.defaults.providers.icon,
                  alt: y.name + " logo"
                }, null, 8, lt),
                o("p", null, f(y.displayName), 1)
              ], 8, ct))), 128)) : E("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, kt = {
  __name: "OnDappSafe",
  setup(r) {
    return (e, t) => l(a).isSafe.value ? (c(), u(_, { key: 0 }, [
      m(e.$slots, "default"),
      m(e.$slots, "safe")
    ], 64)) : m(e.$slots, "unsafe", { key: 1 });
  }
}, Ct = {
  __name: "OnProviderSafe",
  setup(r) {
    return (e, t) => l(a).provider.isSafe.value ? (c(), u(_, { key: 0 }, [
      m(e.$slots, "default"),
      m(e.$slots, "safe")
    ], 64)) : m(e.$slots, "unsafe", { key: 1 });
  }
}, Rt = {
  __name: "OnSignerSafe",
  setup(r) {
    return (e, t) => l(a).signer.isSafe.value ? (c(), u(_, { key: 0 }, [
      m(e.$slots, "default"),
      m(e.$slots, "safe")
    ], 64)) : m(e.$slots, "unsafe", { key: 1 });
  }
}, It = {
  __name: "OnContractsReadSafe",
  setup(r) {
    return (e, t) => l(a).contracts.areReadSafe.value ? (c(), u(_, { key: 0 }, [
      m(e.$slots, "default"),
      m(e.$slots, "safe")
    ], 64)) : m(e.$slots, "unsafe", { key: 1 });
  }
}, Nt = {
  __name: "OnContractsWriteSafe",
  setup(r) {
    return (e, t) => l(a).contracts.areWriteSafe.value ? (c(), u(_, { key: 0 }, [
      m(e.$slots, "default"),
      m(e.$slots, "safe")
    ], 64)) : m(e.$slots, "unsafe", { key: 1 });
  }
}, xt = {
  __name: "OnContractReadSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => l(a).contracts[e.contract].isReadSafe.value ? (c(), u(_, { key: 0 }, [
      m(t.$slots, "default"),
      m(t.$slots, "safe")
    ], 64)) : m(t.$slots, "unsafe", { key: 1 });
  }
}, $t = {
  __name: "OnContractWriteSafe",
  props: {
    contract: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const e = r;
    return (t, s) => l(a).contracts[e.contract].isWriteSafe.value ? (c(), u(_, { key: 0 }, [
      m(t.$slots, "default"),
      m(t.$slots, "safe")
    ], 64)) : m(t.$slots, "unsafe", { key: 1 });
  }
};
const ut = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, n] of e)
    t[s] = n;
  return t;
}, X = (r) => (se("data-v-d83f3980"), r = r(), ne(), r), ht = /* @__PURE__ */ X(() => /* @__PURE__ */ o("h3", null, "Safe Runners", -1)), dt = /* @__PURE__ */ X(() => /* @__PURE__ */ o("h3", null, "Status", -1)), ft = {
  __name: "DebugBar",
  setup(r) {
    return (e, t) => {
      const s = O("OnDappSafe");
      return c(), k(s, null, {
        default: C(() => [
          o("section", null, [
            o("div", null, [
              ht,
              o("ul", null, [
                o("li", null, "DApp safe : " + f(l(a).isSafe), 1),
                o("li", null, "Network safe : " + f(l(a).provider.isSafe), 1),
                o("li", null, "Wallet safe : " + f(l(a).signer.isSafe), 1),
                o("li", null, "Contracts read safe : " + f(l(a).contracts.areReadSafe), 1),
                o("li", null, "Contracts write safe : " + f(l(a).contracts.areWriteSafe), 1),
                (c(!0), u(_, null, g(l(a).contracts.getAll(), (n, i) => (c(), u("li", null, [
                  M(" contract " + f(i) + " : ", 1),
                  o("ul", null, [
                    o("li", null, "read safe : " + f(n.isReadSafe), 1),
                    o("li", null, "write safe : " + f(n.isWriteSafe), 1)
                  ])
                ]))), 256))
              ])
            ]),
            o("div", null, [
              dt,
              o("ul", null, [
                o("li", null, "dapp : " + f(l(a).status.get()), 1),
                o("li", null, "provider : " + f(l(a).provider.status.get()), 1),
                o("li", null, "signer : " + f(l(a).signer.status.get()), 1),
                o("li", null, "contracts : " + f(l(a).contracts.status.get()), 1),
                (c(!0), u(_, null, g(l(a).contracts.getAll(), (n, i) => (c(), u("li", null, " contract " + f(i) + " : " + f(n.status.get()), 1))), 256))
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Pt = /* @__PURE__ */ ut(ft, [["__scopeId", "data-v-d83f3980"]]), pt = { class: "InputUnits" }, mt = ["placeholder"], _t = ["value"], bt = {
  __name: "InputUnits",
  props: {
    modelValue: {},
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r, s = ["wei", "gwei", "ether"];
    let n = b("wei");
    function i(h) {
      return N.utils.parseUnits(h, n.value);
    }
    return (h, d) => (c(), u("div", pt, [
      o("input", {
        onInput: d[0] || (d[0] = (p) => h.$emit("update:modelValue", i(p.target.value))),
        type: "text",
        placeholder: t.placeholder
      }, null, 40, mt),
      L(o("select", {
        "onUpdate:modelValue": d[1] || (d[1] = (p) => n.value = p)
      }, [
        (c(), u(_, null, g(s, (p) => o("option", { value: p }, f(p), 9, _t)), 64))
      ], 512), [
        [ae, n.value]
      ])
    ]));
  }
};
async function Dt(r, e) {
  const t = e.config, s = e.start;
  try {
    a.init(t);
  } catch (i) {
    throw a && a.status && a.status.set("ERROR"), i;
  }
  r.config.globalProperties.dapp = a, r.config.globalProperties.rGet = q, r.config.globalProperties.rSet = $;
  const n = await import("./index.16dd0600.mjs");
  r.component("OnDappSafe", n.OnDappSafe), r.component("OnProviderSafe", n.OnProviderSafe), r.component("OnSignerSafe", n.OnSignerSafe), r.component("OnContractsReadSafe", n.OnContractsReadSafe), r.component("OnContractsWriteSafe", n.OnContractsWriteSafe), r.component("OnContractReadSafe", n.OnContractReadSafe), r.component("OnContractWriteSafe", n.OnContractWriteSafe), s(), a.status.set("INITIALIZED");
}
export {
  Et as AvailableWallets,
  le as ChainWatchersList,
  gt as ConnectWalletButton,
  wt as ContractInteractor,
  ue as ContractWatcher,
  Ee as ContractsList,
  Pt as DebugBar,
  Z as EthersContractProxy,
  me as EthersProviderProxy,
  be as EthersSignerProxy,
  J as EthersTransactionProxy,
  Ke as EventInteractor,
  Fe as EventsInteractor,
  bt as InputUnits,
  Le as MethodInteractor,
  De as MethodsInteractor,
  xt as OnContractReadSafe,
  $t as OnContractWriteSafe,
  It as OnContractsReadSafe,
  Nt as OnContractsWriteSafe,
  kt as OnDappSafe,
  Ct as OnProviderSafe,
  Rt as OnSignerSafe,
  Ot as SelectNetworkDropdown,
  D as Status,
  St as Transact,
  ce as VuethersConfig,
  F as WalletConnectionRejected,
  he as WalletWatcher,
  we as WalletsList,
  Ce as capitalizeWords,
  a as dapp,
  A as deepMerge,
  Dt as initVuethers,
  G as isObject,
  q as rGet,
  $ as rSet,
  Se as wallets
};
