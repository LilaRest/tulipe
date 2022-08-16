import { ref as C, watch as P, onUnmounted as H, markRaw as M, openBlock as u, createElementBlock as d, unref as m, toDisplayString as y, createCommentVNode as E, Fragment as k, createElementVNode as c, renderList as g, withDirectives as N, vModelDynamic as K, vModelText as A, vModelSelect as L, createTextVNode as U } from "vue";
import { ethers as x } from "ethers";
class q extends Object {
  constructor(e, n) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = n, new Proxy(this, {
      get: function(a, r, i) {
        if (Object.keys(a._statefulSource.value).includes(r))
          return a._statefulSource.value[r];
        if (Object.keys(a._statelessSource).includes(r))
          return a._statelessSource[r];
      },
      set: function(a, r, i) {
        if (Object.keys(a._statefulSource.value).includes(r))
          return a._statefulSource.value[r] = i, !0;
        if (Object.keys(a._statelessSource).includes(r))
          return a._statelessSource[r] = i, !0;
        throw `MixedStore object doesn't have any property called '${r}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`;
      }
    });
  }
  add(e, n, a) {
    if (e === "stateful")
      this._statefulSource.value[n] = a;
    else if (e === "stateless")
      this._statelessSource[n] = a;
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
class Y {
  constructor(e, n) {
    if (this._name = e, this.states = [], !Array.isArray(n))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${n}`;
    for (const a of n)
      this.states.push(this._formatState(a));
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
  getRef() {
    return this.state;
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
  watch(e, n) {
    let a = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (Array.isArray(e)) {
      if (!this._areStatesValid(e))
        throw a;
      P(this._state, () => {
        e.includes(this._state) && n(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw a;
      P(this._state, () => {
        e === this._state && n(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
function W(s, e) {
  if (t.safe)
    s();
  else {
    const n = P(() => t.safe, () => {
      s(), n();
    });
  }
}
class Q {
  constructor(e) {
    this.contract = e, this.sources = {}, this.lastUpdateBlock = 0;
  }
  _buildSourceName(e, n) {
    return `${e}:${n.toString}`;
  }
  async update() {
    const e = await t.provider.getBlockNumber();
    if (this.lastUpdateBlock < e) {
      for (const [n, a] of Object.entries(this.sources)) {
        const r = a.state.value;
        a.state.value = await this.contract[a.name](...a.args);
        for (const i of a.callbacks)
          i(a.state.value, r);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, n, a = null) {
    const r = this._buildSourceName(e, n);
    return Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: n,
      state: C(null),
      callbacks: []
    }, this.contract[e](...n).then((i) => {
      this.sources[r].state.value = i;
    })), a && (this.sources[r].callbacks.includes(a) || this.sources[r].callbacks.push(a)), this.sources[r].state;
  }
  remove(e, n, a) {
    const r = this._buildSourceName(e, n);
    Object.keys(this.sources).includes(r) || (this.sources[r].callbacks = this.sources[r].callbacks.filter((i) => i !== a));
  }
  getRef(e, n) {
    const a = this._buildSourceName(e, n);
    return this.sources[a].state;
  }
}
function B(s, e, n, a = null) {
  Object.keys(t._chainWatchers).includes(s.address) || (t._chainWatchers[s.address] = new Q(s)), t._chainWatchers[s.address].add(e, n, a);
}
function X(s, e, n, a) {
  return B(s, e, n, a), H(() => t._chainWatchers[s.address].remove(e, n, a)), t._chainWatchers[s.address].remove.bind(t._chainWatchers[s.address], e, n, a);
}
function z(s, e, n) {
  return B(s, e, n, null), t._chainWatchers[s.address].getRef(e, n);
}
async function F() {
  try {
    return await dapp.signer.getAddress(), dapp.status.wallet.set("CONNECTED"), !0;
  } catch {
    return !1;
  }
}
async function V() {
  if (!await F())
    try {
      dapp.status.wallet.set("REQUESTED"), await dapp.provider.send("eth_requestAccounts", []), dapp.signer = dapp.provider.getSigner(), dapp.status.wallet.set("CONNECTED");
    } catch (s) {
      console.log(s), s.code === 4001 ? dapp.status.wallet.set("REFUSED") : dapp.status.wallet.set("ERROR");
    }
}
function j() {
  dapp.status.wallet.set("DISCONNECTED");
}
const J = {
  config: {},
  defaults: {},
  networks: {},
  status: {
    add: (s, e) => {
      if (Object.keys(t.status).includes(s))
        throw `You cannot add a new status called '${s}', this name is either reserved by Vuethers or already existing.`;
      t.status[s] = new Y(s, e);
    }
  },
  _chainWatchers: {}
}, Z = C({
  safe: !1,
  provider: null,
  signer: null,
  contracts: {
    _contracts: [],
    add: (s, e, n) => {
      if (Object.keys(t.contracts).includes(s))
        throw `You cannot add a new contract called '${s}', this name is either reserved by Vuethers or already existing.`;
      let a = null;
      try {
        a = new x.Contract(e, n, t.signer);
      } catch {
        a = new x.Contract(e, n, t.provider);
      }
      t.contracts[s] = M(a), t.contracts[s].watch = X.bind(null, t.contracts[s]), t.contracts[s].watchRef = z.bind(null, t.contracts[s]), t.contracts._contracts.push(s), P(() => t.signer, () => {
        console.log("refresh signer of " + s);
        try {
          t.contracts[s].connect(t.signer);
        } catch (r) {
          console.log("error while refreshing"), console.log(r), t.contracts[s].connect(t.provider);
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
}), t = new q(J, Z), T = {
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
}, ee = { class: "ConnectWalletButton" }, te = {
  key: 1,
  disabled: ""
}, ne = {
  key: 2,
  disabled: ""
}, se = {
  key: 3,
  disabled: ""
}, ae = {
  key: 4,
  disabled: ""
}, Te = {
  __name: "ConnectWalletButton",
  setup(s) {
    return W(async function() {
      await F();
    }), (e, n) => (u(), d("div", ee, [
      m(t).status.wallet.is("DISCONNECTED") ? (u(), d("button", {
        key: 0,
        onClick: n[0] || (n[0] = (...a) => m(V) && m(V)(...a))
      }, "Connect Wallet")) : m(t).status.wallet.is("REQUESTED") ? (u(), d("button", te, "Connection requested...")) : m(t).status.wallet.is("REFUSED") ? (u(), d("button", ne, "Connection refused!")) : m(t).status.wallet.is("ERROR") ? (u(), d("button", se, "Connection error!")) : m(t).status.network.is("WRONG") ? (u(), d("button", ae, "Wrong network! (" + y(m(t).networks.current.displayName) + ")", 1)) : m(t).status.wallet.is("CONNECTED") ? (u(), d("button", {
        key: 5,
        onClick: n[1] || (n[1] = (...a) => m(j) && m(j)(...a))
      }, "Disconnect")) : E("", !0)
    ]));
  }
}, re = /* @__PURE__ */ U("Functions : "), oe = ["onClick"], le = /* @__PURE__ */ c("br", null, null, -1), ie = { key: 0 }, ce = /* @__PURE__ */ c("small", null, "Inputs :", -1), ue = ["onUpdate:modelValue", "type", "placeholder"], de = { key: 0 }, he = ["onUpdate:modelValue"], pe = ["onUpdate:modelValue"], me = ["value"], fe = { key: 1 }, be = /* @__PURE__ */ c("small", null, "Outputs :", -1), ye = ["onUpdate:modelValue", "placeholder"], ve = { key: 2 }, we = /* @__PURE__ */ U(" Events : "), ke = /* @__PURE__ */ c("p", null, "Logs:", -1), $e = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const e = s;
    async function n(o, l, h = {}) {
      let w, p, b = null;
      return l ? Array.isArray(l) ? b = o(...l, h) : b = o(l, h) : b = o(h), await b.then((_) => w = _).catch((_) => p = _), { data: w, error: p };
    }
    async function a(o) {
      const l = [];
      for (const b of v.value[o].inputs)
        l.push(b.value);
      const h = {};
      v.value[o].payable && v.value[o].tx.value.value !== "" && (console.log(v.value[o].tx.value.value), h.value = x.utils.parseUnits(v.value[o].tx.value.value, v.value[o].tx.value.unit));
      const { data: w, error: p } = await n(I.functions[o], l, h);
      if (p)
        v.value[o].error = p.reason;
      else
        for (let b = 0; b < w.length; b++)
          v.value[o].outputs[b].value = w[b];
    }
    async function r(o) {
      S.value[o.event].count += 1;
      let l = `Block ${o.blockNumber} -> {`;
      for (const h of S.value[o.event].inputs)
        l += `${h.name}:${o.args[h.name]}, `;
      l = l.substring(0, l.length - 2) + "}", S.value[o.event].logs.push(l);
    }
    function i(o) {
      return o.includes("int") ? "number" : "text";
    }
    function f(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function R(o) {
      const l = [];
      return l.push(o.mutability), o.payable && l.push("payable"), l.join(", ");
    }
    const I = t.contracts[e.contractName];
    let D = C("");
    const G = ["wei", "gwei", "ether"], S = C({}), v = C({});
    return W(async function() {
      D.value = await I.owner();
      for (const o of Object.values(I.interface.functions)) {
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
        for (let l = 0; l < o.inputs.length; l++)
          v.value[o.name].inputs[l] = {
            name: o.inputs[l].name,
            type: o.inputs[l].type,
            value: ""
          };
        for (let l = 0; l < o.outputs.length; l++)
          v.value[o.name].outputs[l] = {
            name: o.outputs[l].name,
            type: o.outputs[l].type,
            value: ""
          };
      }
      for (const o of Object.values(I.interface.events))
        S.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, I.on(o, r);
    }), (o, l) => (u(), d(k, null, [
      c("p", null, "Interact with '" + y(s.contractName) + "' contract :", 1),
      c("ul", null, [
        c("li", null, "Address : " + y(m(I).address), 1),
        c("li", null, "Owner : " + y(D.value), 1),
        c("li", null, [
          re,
          c("ul", null, [
            (u(!0), d(k, null, g(v.value, (h, w) => (u(), d("li", null, [
              c("button", {
                onClick: (p) => a(w)
              }, y(w), 9, oe),
              c("small", null, "(" + y(R(h)) + ")", 1),
              le,
              Object.keys(h.inputs).length > 0 || h.payable ? (u(), d("div", ie, [
                ce,
                c("ul", null, [
                  (u(!0), d(k, null, g(h.inputs, (p, b) => (u(), d("li", null, [
                    N(c("input", {
                      "onUpdate:modelValue": (_) => p.value = _,
                      type: i(p.type),
                      placeholder: f(p)
                    }, null, 8, ue), [
                      [K, p.value]
                    ])
                  ]))), 256)),
                  h.payable ? (u(), d("li", de, [
                    N(c("input", {
                      "onUpdate:modelValue": (p) => h.tx.value.value = p,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, he), [
                      [A, h.tx.value.value]
                    ]),
                    N(c("select", {
                      "onUpdate:modelValue": (p) => h.tx.value.unit = p
                    }, [
                      (u(), d(k, null, g(G, (p) => c("option", { value: p }, y(p), 9, me)), 64))
                    ], 8, pe), [
                      [L, h.tx.value.unit]
                    ])
                  ])) : E("", !0)
                ])
              ])) : E("", !0),
              Object.keys(h.outputs).length > 0 ? (u(), d("div", fe, [
                be,
                c("ul", null, [
                  (u(!0), d(k, null, g(h.outputs, (p, b) => (u(), d("li", null, [
                    N(c("input", {
                      "onUpdate:modelValue": (_) => p.value = _,
                      type: "text",
                      placeholder: f(p),
                      disabled: ""
                    }, null, 8, ye), [
                      [A, p.value]
                    ])
                  ]))), 256))
                ])
              ])) : E("", !0),
              h.error ? (u(), d("p", ve, y(h.error), 1)) : E("", !0)
            ]))), 256))
          ])
        ]),
        c("li", null, [
          we,
          c("ul", null, [
            (u(!0), d(k, null, g(S.value, (h, w) => (u(), d("li", null, [
              c("h3", null, y(w), 1),
              c("p", null, "Count : " + y(h.count), 1),
              ke,
              c("ul", null, [
                (u(!0), d(k, null, g(h.logs, (p) => (u(), d("li", null, y(p), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, _e = { class: "SelectNetworkDropdown" }, ge = {
  key: 0,
  selected: ""
}, Ee = ["src", "alt"], Ce = ["onClick"], Ie = ["src", "alt"], Me = {
  __name: "SelectNetworkDropdown",
  setup(s) {
    async function e(r) {
      const i = t.networks.available.find((f) => f.chainId === parseInt(r));
      if (i) {
        r = x.utils.hexlify(parseInt(r)).toString(), r = x.utils.hexValue(r);
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
              rpcUrls: [i.defaultRPC],
              chainName: i.name,
              nativeCurrency: {
                name: i.currency.symbol,
                symbol: i.currency.symbol,
                decimals: i.currency.decimals
              },
              blockExplorerUrls: i.explorer && i.explorer.url !== "" ? [i.explorer.url] : null
            }]
          });
        }
        const f = await t.provider.getNetwork();
        t.networks.current.chainId !== f.chainId && window.location.reload();
      }
    }
    function n() {
      a.value = !a.value;
    }
    let a = C(!1);
    return (r, i) => (u(), d("div", _e, [
      c("ul", { onClick: n }, [
        m(t).networks.current ? (u(), d("li", ge, [
          c("img", {
            width: "40",
            src: m(t).networks.current.icon ? m(t).networks.current.icon : m(t).defaults.networks.icon,
            alt: m(t).networks.current.name + " logo"
          }, null, 8, Ee),
          c("p", null, y(m(t).networks.current.displayName), 1)
        ])) : E("", !0),
        a.value ? (u(!0), d(k, { key: 1 }, g(m(t).networks.available, (f) => (u(), d("li", {
          key: f.chainId,
          onClick: (R) => e(f.chainId)
        }, [
          c("img", {
            width: "40",
            src: f.icon ? f.icon : m(t).defaults.networks.icon,
            alt: f.name + " logo"
          }, null, 8, Ie),
          c("p", null, y(f.displayName), 1)
        ], 8, Ce))), 128)) : E("", !0)
      ])
    ]));
  }
};
function xe(s) {
  const e = s.split(" ");
  for (let n = 0; n < e.length; n++)
    e[n] = e[n][0].toUpperCase() + e[n].substring(1);
  return e.join(" ");
}
function $(s) {
  return s && typeof s == "object" && !Array.isArray(s);
}
function O(s, ...e) {
  if (!e.length)
    return s;
  const n = e.shift();
  if ($(s) && $(n))
    for (const a in n)
      $(n[a]) ? (s[a] || Object.assign(s, {
        [a]: {}
      }), O(s[a], n[a])) : Object.assign(s, {
        [a]: n[a]
      });
  return O(s, ...e);
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
  ]), t.status.wallet.watch(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      t.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function Re() {
  t.provider = M(new x.providers.Web3Provider(window.ethereum, "any")), t.provider.on("network", (s, e) => {
    e && e !== s && window.location.reload();
  }), t.provider.on("error", () => {
    console.log("Provider error !"), t.status.network.set("ERROR");
  }), t.provider.on("block", async function(s) {
    console.log("new block"), console.log(s);
    const e = await t.provider.getBlockWithTransactions(s);
    for (const n of e.transactions)
      Object.keys(t._chainWatchers).includes(n.to) && (console.log("call update of = " + n.to), await t._chainWatchers[n.to].update());
    console.log(e);
  });
}
async function Ne() {
  t.signer = M(t.provider.getSigner());
}
async function De(s, e) {
  console.log(s), s.config.globalProperties.dapp = t, await Se(), await Re(), await Ne();
  const n = await t.provider.getNetwork();
  if (e) {
    const a = O({ ...T }, { ...e });
    a.networks = [];
    for (let r of e.networks)
      if (r.chainId) {
        const i = T.networks.find((f) => f.chainId === r.chainId);
        r = O({ ...i }, { ...r }), r.displayName || (r.displayName = r.name), a.networks.push(r);
      }
    if (t.defaults = a.defaults, a.networks)
      if (t.networks = {
        available: a.networks.filter((r) => r.chainId !== n.chainId),
        current: a.networks.find((r) => r.chainId === n.chainId),
        known: T.networks
      }, t.networks.current && t.networks.current.contracts)
        for (const [r, i] of Object.entries(t.networks.current.contracts))
          t.contracts.add(r, i.address, i.abi);
      else {
        const r = t.networks.known.find((i) => i.chainId === n.chainId);
        r ? t.networks.current = r : (t.networks.current = n, t.networks.current.displayName = xe(t.networks.current.name)), t.status.network.set("WRONG");
      }
  }
  t.safe = !0;
}
export {
  Te as ConnectWalletButton,
  $e as ContractInteractor,
  Me as SelectNetworkDropdown,
  Y as Status,
  V as connectWallet,
  t as dapp,
  j as disconnectWallet,
  De as initVuethers,
  F as isConnected,
  W as safeRun,
  X as watchChain,
  z as watchChainRef
};
