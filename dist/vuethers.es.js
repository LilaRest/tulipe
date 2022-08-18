import { ref as S, watch as R, computed as W, onUnmounted as Y, markRaw as $, openBlock as c, createElementBlock as u, unref as p, toDisplayString as f, createCommentVNode as I, Fragment as k, createElementVNode as l, renderList as N, withDirectives as T, vModelDynamic as Q, vModelText as F, vModelSelect as Z, createTextVNode as L } from "vue";
import { ethers as g } from "ethers";
class J extends Object {
  constructor(e, n) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = n, new Proxy(this, {
      get: function(a, r, m) {
        if (Object.keys(a._statefulSource.value).includes(r))
          return a._statefulSource.value[r];
        if (Object.keys(a._statelessSource).includes(r))
          return a._statelessSource[r];
      },
      set: function(a, r, m) {
        if (Object.keys(a._statefulSource.value).includes(r))
          return a._statefulSource.value[r] = m, !0;
        if (Object.keys(a._statelessSource).includes(r))
          return a._statelessSource[r] = m, !0;
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
class X {
  constructor(e, n) {
    if (this._name = e, this.states = [], !Array.isArray(n))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${n}`;
    for (const a of n)
      this.states.push(this._formatState(a));
    this._state = S(this.states[0]);
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
      R(this._state, () => {
        e.includes(this._state) && n(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw a;
      R(this._state, () => {
        e === this._state && n(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
const O = W(() => t.safe);
function z(s) {
  if (O.value)
    s();
  else {
    const e = R(O, () => {
      O.value && (s(), e());
    });
  }
}
const _ = W(() => O.value && !t.status.network.is("DISCONNECTED"));
function V(s) {
  z(() => {
    if (_.value)
      s();
    else {
      const e = R(_, () => {
        _.value && (s(), e());
      });
    }
  });
}
const P = W(() => _.value && t.status.wallet.is("CONNECTED"));
function Ge(s) {
  V(() => {
    if (P.value)
      s();
    else {
      const e = R(P, () => {
        P.value && (s(), e());
      });
    }
  });
}
const A = W(() => _.value && t.status.contracts.is("INITIALIZED"));
function Fe(s) {
  V(() => {
    if (A.value)
      s();
    else {
      const e = R(A, () => {
        A.value && (s(), e());
      });
    }
  });
}
class ee {
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
        for (const m of a.callbacks)
          m(a.state.value, r);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, n, a = null) {
    const r = this._buildSourceName(e, n);
    return Object.keys(this.sources).includes(r) || (this.sources[r] = {
      name: e,
      args: n,
      state: S(null),
      callbacks: []
    }, this.contract[e](...n).then((m) => {
      this.sources[r].state.value = m;
    })), a && (this.sources[r].callbacks.includes(a) || this.sources[r].callbacks.push(a)), this.sources[r].state;
  }
  remove(e, n, a) {
    const r = this._buildSourceName(e, n);
    Object.keys(this.sources).includes(r) || (this.sources[r].callbacks = this.sources[r].callbacks.filter((m) => m !== a));
  }
  getRef(e, n) {
    const a = this._buildSourceName(e, n);
    return this.sources[a].state;
  }
}
function K(s, e, n, a = null) {
  Object.keys(t._chainWatchers).includes(s.address) || (t._chainWatchers[s.address] = new ee(s)), t._chainWatchers[s.address].add(e, n, a);
}
function te(s, e, n, a) {
  return K(s, e, n, a), Y(() => t._chainWatchers[s.address].remove(e, n, a)), t._chainWatchers[s.address].remove.bind(t._chainWatchers[s.address], e, n, a);
}
function ne(s, e, n) {
  return K(s, e, n, null), t._chainWatchers[s.address].getRef(e, n);
}
async function j(s = !1) {
  if (_) {
    if (t.status.wallet.is("DISCONNECTED"))
      try {
        const e = await t.provider.getSigner();
        await e.getAddress(), t.signer = e, t.status.wallet.set("CONNECTED");
      } catch {
        if (s === !0)
          t.status.wallet.set("DISCONNECTED");
        else
          try {
            t.status.wallet.set("REQUESTED"), await t.provider.send("eth_requestAccounts", []);
            const n = await t.provider.getSigner();
            await n.getAddress(), t.signer = n, t.status.wallet.set("CONNECTED");
          } catch (n) {
            console.log(n), n.code === 4001 ? t.status.wallet.set("REFUSED") : t.status.wallet.set("ERROR");
          }
      }
  } else
    t.status.wallet.set("NOPROVIDER");
}
function H() {
  t.signer = null, t.status.wallet.set("DISCONNECTED");
}
const se = {
  config: {},
  defaults: {},
  networks: {},
  status: {
    add: (s, e) => {
      if (Object.keys(t.status).includes(s))
        throw `You cannot add a new status called '${s}', this name is either reserved by Vuethers or already existing.`;
      t.status[s] = new X(s, e);
    }
  },
  _chainWatchers: {}
}, ae = S({
  safe: !1,
  provider: null,
  signer: null,
  contracts: {
    _contracts: [],
    add: (s, e, n) => {
      if (Object.keys(t.contracts).includes(s))
        throw `You cannot add a new contract called '${s}', this name is either reserved by Vuethers or already existing.`;
      let a = null;
      if (P.value)
        a = new g.Contract(e, n, t.signer);
      else if (_.value)
        a = new g.Contract(e, n, t.provider);
      else
        throw "A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.";
      t.contracts[s] = $(a), t.contracts[s].watch = te.bind(null, t.contracts[s]), t.contracts[s].watchRef = ne.bind(null, t.contracts[s]), t.contracts._contracts.push(s), R(() => t.signer, () => {
        console.log("refresh signer of " + s);
        try {
          console.log(t.signer), console.log(t.contract[s]), t.contracts[s].connect(t.signer), console.log(t.contract[s]);
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
}), t = new J(se, ae), B = {
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
async function oe() {
  const s = await t.provider.getNetwork().then((e) => e.chainId);
  return t.config.networks.find((e) => e.chainId === s);
}
async function re(s = null) {
  if (s) {
    console.log("AAA");
    const e = M({ ...B }, { ...s });
    e.networks = [];
    for (let n of s.networks)
      if (n.chainId) {
        const a = B.networks.find((r) => r.chainId === n.chainId);
        n = M({ ...a }, { ...n }), n.displayName || (n.displayName = n.name), e.networks.push(n);
      }
    e.networks.getCurrent = oe, t.config = e;
  }
}
async function le() {
  t.status.add("network", [
    "DISCONNECTED",
    "WRONG",
    "UNKNOWN",
    "ERROR",
    "CONNECTED"
  ]), t.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "NOPROVIDER",
    "CONNECTED"
  ]), t.status.add("contracts", [
    "WAITING",
    "ERROR",
    "INITIALIZED"
  ]), t.status.wallet.watch(["REFUSED", "ERROR", "NOPROVIDER"], () => {
    setTimeout(() => {
      t.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function ie() {
  const s = $(new g.providers.Web3Provider(window.ethereum, "any"));
  if (s) {
    const e = await s.getNetwork().then((a) => a.chainId);
    let n = t.config.networks.find((a) => a.chainId === e);
    console.log("DEBUG NETWORK"), console.log(e), console.log(n), n ? (console.log("already connected"), t.provider = s, t.status.network.set("CONNECTED")) : (n = B.networks.find((a) => a.chainId === e), n ? (t.provider = $(new g.providers.JsonRpcProvider(knownNetwork.defaultRPC)), t.status.network.set("WRONG")) : (t.provider = s, t.status.network.set("UNKNOWN"))), s.on("network", (a, r) => {
      r && r !== a && window.location.reload();
    }), s.on("error", () => {
      console.log("Provider error !"), t.status.network.set("ERROR");
    }), n && (console.log("Default polling interval = " + t.provider.pollingInterval), t.provider.pollingInterval = n.pollingInterval);
  } else {
    const e = t.config.networks.find((n) => n.default === !0);
    network ? t.provider = $(new g.providers.JsonRpcProvider(e.defaultRPC)) : t.status.network.set("DISCONNECTED");
  }
}
async function ce() {
  t.status.network.is("DISCONNECTED") || await j(!0);
}
async function ue() {
  V(async function() {
    const s = await t.config.networks.getCurrent();
    if (s) {
      for (const [e, n] of Object.entries(s.contracts))
        t.contracts.add(e, n.address, n.abi);
      t.status.contracts.set("INITIALIZED");
    } else
      t.status.contracts.set("NOCONFIG");
  });
}
async function de() {
  t.status.network.is("DISCONNECTED") || t.provider.on("block", async function(s) {
    console.log("new block"), console.log(s);
    const e = await t.provider.getBlockWithTransactions(s);
    for (const n of e.transactions)
      Object.keys(t._chainWatchers).includes(n.to) && (console.log("call update of = " + n.to), await t._chainWatchers[n.to].update()), t.status.wallet.is("CONNECTED") && (await t.signer.getAddress(), n.from);
    console.log(e);
  });
}
const he = { class: "ConnectWalletButton" }, pe = {
  key: 1,
  disabled: ""
}, me = {
  key: 2,
  disabled: ""
}, fe = {
  key: 3,
  disabled: ""
}, be = {
  key: 4,
  disabled: ""
}, He = {
  __name: "ConnectWalletButton",
  setup(s) {
    return (e, n) => (c(), u("div", he, [
      p(t).status.wallet.is("DISCONNECTED") ? (c(), u("button", {
        key: 0,
        onClick: n[0] || (n[0] = (...a) => p(j) && p(j)(...a))
      }, "Connect Wallet")) : p(t).status.wallet.is("REQUESTED") ? (c(), u("button", pe, "Connection requested...")) : p(t).status.wallet.is("REFUSED") ? (c(), u("button", me, "Connection refused!")) : p(t).status.wallet.is("ERROR") ? (c(), u("button", fe, "Connection error!")) : p(t).status.network.is("WRONG") ? (c(), u("button", be, "Wrong network! (" + f(p(t).networks.current.displayName) + ")", 1)) : p(t).status.wallet.is("CONNECTED") ? (c(), u("button", {
        key: 5,
        onClick: n[1] || (n[1] = (...a) => p(H) && p(H)(...a))
      }, "Disconnect")) : I("", !0)
    ]));
  }
}, ye = /* @__PURE__ */ L("Functions : "), ve = ["onClick"], we = /* @__PURE__ */ l("br", null, null, -1), ke = { key: 0 }, ge = /* @__PURE__ */ l("small", null, "Inputs :", -1), _e = ["onUpdate:modelValue", "type", "placeholder"], Ee = { key: 0 }, Ce = ["onUpdate:modelValue"], Ne = ["onUpdate:modelValue"], Ie = ["value"], Se = { key: 1 }, Re = /* @__PURE__ */ l("small", null, "Outputs :", -1), xe = ["onUpdate:modelValue", "placeholder"], Oe = { key: 2 }, Pe = /* @__PURE__ */ L(" Events : "), De = /* @__PURE__ */ l("p", null, "Logs:", -1), Le = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const e = s;
    async function n(o, i, d = {}) {
      let w, h, y = null;
      return i ? Array.isArray(i) ? y = o(...i, d) : y = o(i, d) : y = o(d), await y.then((C) => w = C).catch((C) => h = C), { data: w, error: h };
    }
    async function a(o) {
      const i = [];
      for (const y of v.value[o].inputs)
        i.push(y.value);
      const d = {};
      v.value[o].payable && v.value[o].tx.value.value !== "" && (console.log(v.value[o].tx.value.value), d.value = g.utils.parseUnits(v.value[o].tx.value.value, v.value[o].tx.value.unit));
      const { data: w, error: h } = await n(E.functions[o], i, d);
      if (h)
        v.value[o].error = h.reason;
      else
        for (let y = 0; y < w.length; y++)
          v.value[o].outputs[y].value = w[y];
    }
    async function r(o) {
      x.value[o.event].count += 1;
      let i = `Block ${o.blockNumber} -> {`;
      for (const d of x.value[o.event].inputs)
        i += `${d.name}:${o.args[d.name]}, `;
      i = i.substring(0, i.length - 2) + "}", x.value[o.event].logs.push(i);
    }
    function m(o) {
      return o.includes("int") ? "number" : "text";
    }
    function b(o) {
      return `${o.name && o.name !== "null" ? o.name : "unnamed"} (${o.type})`;
    }
    function D(o) {
      const i = [];
      return i.push(o.mutability), o.payable && i.push("payable"), i.join(", ");
    }
    const E = t.contracts[e.contractName];
    let G = S("");
    const q = ["wei", "gwei", "ether"], x = S({}), v = S({});
    return V(async function() {
      E.connect(t.provider);
      try {
        G.value = await E.owner();
      } catch {
      }
      for (const o of Object.values(E.interface.functions)) {
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
      for (const o of Object.values(E.interface.events))
        x.value[o.name] = {
          count: 0,
          logs: [],
          inputs: o.inputs
        }, E.on(o, r);
    }), (o, i) => (c(), u(k, null, [
      l("p", null, "Interact with '" + f(s.contractName) + "' contract :", 1),
      l("ul", null, [
        l("li", null, "Address : " + f(p(E).address), 1),
        l("li", null, "Owner : " + f(G.value), 1),
        l("li", null, [
          ye,
          l("ul", null, [
            (c(!0), u(k, null, N(v.value, (d, w) => (c(), u("li", null, [
              l("button", {
                onClick: (h) => a(w)
              }, f(w), 9, ve),
              l("small", null, "(" + f(D(d)) + ")", 1),
              we,
              Object.keys(d.inputs).length > 0 || d.payable ? (c(), u("div", ke, [
                ge,
                l("ul", null, [
                  (c(!0), u(k, null, N(d.inputs, (h, y) => (c(), u("li", null, [
                    T(l("input", {
                      "onUpdate:modelValue": (C) => h.value = C,
                      type: m(h.type),
                      placeholder: b(h)
                    }, null, 8, _e), [
                      [Q, h.value]
                    ])
                  ]))), 256)),
                  d.payable ? (c(), u("li", Ee, [
                    T(l("input", {
                      "onUpdate:modelValue": (h) => d.tx.value.value = h,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, Ce), [
                      [F, d.tx.value.value]
                    ]),
                    T(l("select", {
                      "onUpdate:modelValue": (h) => d.tx.value.unit = h
                    }, [
                      (c(), u(k, null, N(q, (h) => l("option", { value: h }, f(h), 9, Ie)), 64))
                    ], 8, Ne), [
                      [Z, d.tx.value.unit]
                    ])
                  ])) : I("", !0)
                ])
              ])) : I("", !0),
              Object.keys(d.outputs).length > 0 ? (c(), u("div", Se, [
                Re,
                l("ul", null, [
                  (c(!0), u(k, null, N(d.outputs, (h, y) => (c(), u("li", null, [
                    T(l("input", {
                      "onUpdate:modelValue": (C) => h.value = C,
                      type: "text",
                      placeholder: b(h),
                      disabled: ""
                    }, null, 8, xe), [
                      [F, h.value]
                    ])
                  ]))), 256))
                ])
              ])) : I("", !0),
              d.error ? (c(), u("p", Oe, f(d.error), 1)) : I("", !0)
            ]))), 256))
          ])
        ]),
        l("li", null, [
          Pe,
          l("ul", null, [
            (c(!0), u(k, null, N(x.value, (d, w) => (c(), u("li", null, [
              l("h3", null, f(w), 1),
              l("p", null, "Count : " + f(d.count), 1),
              De,
              l("ul", null, [
                (c(!0), u(k, null, N(d.logs, (h) => (c(), u("li", null, f(h), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, Te = { class: "SelectNetworkDropdown" }, $e = {
  key: 0,
  selected: ""
}, Ae = ["src", "alt"], Me = ["onClick"], We = ["src", "alt"], Ke = {
  __name: "SelectNetworkDropdown",
  setup(s) {
    async function e(r) {
      const m = t.networks.available.find((b) => b.chainId === parseInt(r));
      if (m) {
        r = g.utils.hexlify(parseInt(r)).toString(), r = g.utils.hexValue(r);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: r
            }]
          });
        } catch (D) {
          D.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: r,
              rpcUrls: [m.defaultRPC],
              chainName: m.name,
              nativeCurrency: {
                name: m.currency.symbol,
                symbol: m.currency.symbol,
                decimals: m.currency.decimals
              },
              blockExplorerUrls: m.explorer && m.explorer.url !== "" ? [m.explorer.url] : null
            }]
          });
        }
        const b = await t.provider.getNetwork();
        t.networks.current.chainId !== b.chainId && window.location.reload();
      }
    }
    function n() {
      a.value = !a.value;
    }
    let a = S(!1);
    return (r, m) => (c(), u("div", Te, [
      l("ul", { onClick: n }, [
        p(t).networks.current ? (c(), u("li", $e, [
          l("img", {
            width: "40",
            src: p(t).networks.current.icon ? p(t).networks.current.icon : p(t).defaults.networks.icon,
            alt: p(t).networks.current.name + " logo"
          }, null, 8, Ae),
          l("p", null, f(p(t).networks.current.displayName), 1)
        ])) : I("", !0),
        a.value ? (c(!0), u(k, { key: 1 }, N(p(t).networks.available, (b) => (c(), u("li", {
          key: b.chainId,
          onClick: (D) => e(b.chainId)
        }, [
          l("img", {
            width: "40",
            src: b.icon ? b.icon : p(t).defaults.networks.icon,
            alt: b.name + " logo"
          }, null, 8, We),
          l("p", null, f(b.displayName), 1)
        ], 8, Me))), 128)) : I("", !0)
      ])
    ]));
  }
};
const Ve = (s, e) => {
  const n = s.__vccOpts || s;
  for (const [a, r] of e)
    n[a] = r;
  return n;
}, Ue = {
  __name: "DebugBar",
  setup(s) {
    return (e, n) => (c(), u("ul", null, [
      l("li", null, "DApp safe : " + f(p(O)), 1),
      l("li", null, "Network safe : " + f(p(_)), 1),
      l("li", null, "Wallet safe : " + f(p(P)), 1),
      l("li", null, "Contracts safe : " + f(p(A)), 1)
    ]));
  }
}, qe = /* @__PURE__ */ Ve(Ue, [["__scopeId", "data-v-7c2381f5"]]);
function U(s) {
  return s && typeof s == "object" && !Array.isArray(s);
}
function M(s, ...e) {
  if (!e.length)
    return s;
  const n = e.shift();
  if (U(s) && U(n))
    for (const a in n)
      U(n[a]) ? (s[a] || Object.assign(s, {
        [a]: {}
      }), M(s[a], n[a])) : Object.assign(s, {
        [a]: n[a]
      });
  return M(s, ...e);
}
function Ye(s) {
  const e = s.split(" ");
  for (let n = 0; n < e.length; n++)
    e[n] = e[n][0].toUpperCase() + e[n].substring(1);
  return e.join(" ");
}
async function Qe(s, e) {
  s.config.globalProperties.dapp = t, await re(e), await le(), await ie(), await ce(), await ue(), await de(), t.safe = !0;
}
export {
  He as ConnectWalletButton,
  Le as ContractInteractor,
  qe as DebugBar,
  Ke as SelectNetworkDropdown,
  X as Status,
  A as areContractsSafe,
  Ye as capitalizeWords,
  j as connectWallet,
  t as dapp,
  M as deepMerge,
  H as disconnectWallet,
  Qe as initVuethers,
  O as isDAppSafe,
  _ as isNetworkSafe,
  U as isObject,
  P as isWalletSafe,
  Fe as onContractsSafe,
  z as onDAppSafe,
  V as onNetworkSafe,
  Ge as onWalletSafe,
  te as watchChain,
  ne as watchChainRef
};
