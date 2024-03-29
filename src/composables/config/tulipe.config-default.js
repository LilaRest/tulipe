export const tulipeDefaultConfig = {
  style: {
    level: "minimal",
  },
  /*
   * Important : Some properties of network objects must exactly match chain datas at https://chainid.network/chains.json in order to don't raise a warning in Metamask when adding a new network in users' wallets :
     - 'name' in Tulipe must match 'name' in ChainId
     - 'defautRPC' in Tulipe must match 'rpc[0]' in ChainId
     - 'id' in Tulipe must match 'id' in ChainId
     - 'currency.name' in Tulipe must match 'nativeCurrency.name' in ChainId
     - 'currency.symbol' in Tulipe must match 'nativeCurrency.symbol' in ChainId
     - 'currency.decimals' in Tulipe must match 'nativeCurrency.decimals' in ChainId
     - 'explorer.url' in Tulipe must match 'explorers[0].url' in ChainId
    All others properties should also be near of ChainId datas even if it is not required.
  */
  networks: [
    {
      name: "Ethereum Mainnet",
      displayName: "Ethereum",
      id: 1,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/ethereum.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://etherscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://mainnet.infura.io/v3/",
    },
    {
      name: "Ropsten",
      displayName: "Ropsten (Ethereum Testnet)",
      id: 3,
      type: "testnet",
      icon: null,
      currency: {
        name: "Ropsten Ether",
        symbol: "ETH",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://ropsten.etherscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://ropsten.infura.io/v3/",
    },
    {
      name: "Rinkeby",
      displayName: "Rinkeby (Ethereum Testnet)",
      id: 4,
      type: "testnet",
      icon: null,
      currency: {
        name: "Rinkeby Ether",
        symbol: "ETH",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://rinkeby.etherscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://rinkeby.infura.io/v3/",
    },
    {
      name: "Görli",
      displayName: "Görli (Ethereum Testnet)",
      id: 5,
      type: "testnet",
      icon: null,
      currency: {
        name: "Görli Ether",
        symbol: "ETH",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://goerli.etherscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://goerli.infura.io/v3/",
    },
    {
      name: "Optimism",
      id: 10,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/optimism.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://optimistic.etherscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://mainnet.optimism.io/",
    },
    {
      name: "Cronos Mainnet Beta",
      displayName: "Cronos",
      id: 25,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/cronos.svg",
      currency: {
        name: "Cronos",
        symbol: "CRO",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Cronos Explorer",
        url: "https://cronos.org/explorer",
        standard: "EIP3091",
      },
      defaultRPC: "https://evm.cronos.org",
    },
    {
      name: "Telos EVM Mainnet",
      displayName: "Telos",
      id: 40,
      type: "mainnet",
      icon: null,
      currency: {
        name: "Telos",
        symbol: "TLOS",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Teloscan",
        url: "https://teloscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://mainnet.telos.net/evm",
    },
    {
      name: "Binance Smart Chain Mainnet",
      displayName: "BSC",
      id: 56,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/bsc.svg",
      currency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Bscscan",
        url: "https://bscscan.com/",
        standard: "EIP3091",
      },
      defaultRPC: "https://bsc-dataseed1.binance.org/",
    },
    {
      name: "Gnosis Chain",
      displayName: "Gnosis",
      id: 100,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/gnosis.svg",
      currency: {
        name: "xDAI",
        symbol: "xDAI",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Blockscout",
        url: "https://blockscout.com/xdai/mainnet/",
        standard: "EIP3091",
      },
      defaultRPC: "https://rpc.gnosischain.com",
    },
    {
      name: "Fuse Mainnet",
      displayName: "Fuse",
      id: 122,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/fuse.svg",
      currency: {
        name: "Fuse",
        symbol: "FUSE",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Fuse Explorer",
        url: "https://explorer.fuse.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://rpc.fuse.io",
    },
    {
      name: "Huobi ECO Chain Mainnet",
      displayName: "HECO",
      id: 128,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/heco.svg",
      currency: {
        name: "Huobi ECO Chain Native Token",
        symbol: "HT",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Hecoinfo",
        url: "https://hecoinfo.com",
        standard: "EIP3091",
      },
      defaultRPC: "https://http-mainnet.hecochain.com",
    },
    {
      name: "Polygon Mainnet",
      displayName: "Polygon",
      id: 137,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/polygon.svg",
      currency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Polygonscan",
        url: "https://polygonscan.com/",
        standard: "EIP3091",
      },
      defaultRPC: "https://polygon-rpc.com/",
    },
    {
      name: "Fantom Opera",
      displayName: "Fantom",
      id: 250,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/fantom.svg",
      currency: {
        name: "Fantom",
        symbol: "FTM",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Ftmscan",
        url: "https://ftmscan.com/",
        standard: "EIP3091",
      },
      defaultRPC: "https://rpc.ftm.tools",
    },
    {
      name: "Metis Andromeda Mainnet",
      displayName: "Metis",
      id: 1088,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/metis.svg",
      currency: {
        name: "Metis",
        symbol: "METIS",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Metis Explorer",
        url: "https://andromeda-explorer.metis.io",
        standard: "EIP3091",
      },
      defaultRPC: "https://andromeda.metis.io/?owner=1088",
    },
    {
      name: "Moonbeam",
      id: 1284,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/moonbeam.svg",
      currency: {
        name: "Glimmer",
        symbol: "GLMR",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Moonscan",
        url: "https://moonbeam.moonscan.io",
        standard: "EIP3091",
      },
      defaultRPC: "https://rpc.api.moonbeam.network",
    },
    {
      name: "Moonriver",
      id: 1285,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/moonriver.svg",
      currency: {
        name: "Moonriver",
        symbol: "MOVR",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Moonscan",
        url: "https://moonriver.moonscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://rpc.api.moonriver.moonbeam.network",
    },
    {
      name: "Klaytn Mainnet Cypress",
      displayName: "Klaytn",
      id: 8217,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/klaytn.svg",
      currency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Klaytnscope",
        url: "https://scope.klaytn.com",
        standard: "EIP3091",
      },
      defaultRPC: "https://public-node-api.klaytnapi.com/v1/cypress",
    },
    {
      name: "Hardhat",
      displayName: "Hardhat",
      id: 31337,
      type: "testnet",
      icon: null,
      currency: {
        name: "GoChain Coin",
        symbol: "GO",
        decimals: 18,
      },
      contracts: null,
      explorer: null,
      defaultRPC: "http://127.0.0.1:8545/",
    },
    {
      name: "Arbitrum One",
      displayName: "Arbitrum",
      id: 42161,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/arbitrum.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Arbiscan",
        url: "https://arbiscan.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://arbitrum-mainnet.infura.io/v3/",
    },
    {
      name: "Celo Mainnet",
      displayName: "Celo",
      id: 42220,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/celo.svg",
      currency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Celo Explorer",
        url: "https://explorer.celo.org/",
        standard: "EIP3091",
      },
      defaultRPC: "https://forno.celo.org",
    },
    {
      name: "Emerald Paratime Mainnet",
      displayName: "Emerald",
      id: 42262,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/emerald.svg",
      currency: {
        name: "Emerald Rose",
        symbol: "ROSE",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Emerald Explorer",
        url: "https://explorer.emerald.oasis.dev/",
        standard: "EIP3091",
      },
      defaultRPC: "https://emerald.oasis.dev",
    },
    {
      name: "Avalanche C-Chain",
      displayName: "Avalanche",
      id: 43114,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/avalanche.svg",
      currency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Snowtrace",
        url: "https://snowtrace.io/",
        standard: "EIP3091",
      },
      defaultRPC: "https://api.avax.network/ext/bc/C/rpc",
    },
    {
      name: "Aurora Mainnet",
      displayName: "Aurora",
      id: 1313161554,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/aurora.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Aurorascan",
        url: "https://aurorascan.dev",
        standard: "EIP3091",
      },
      defaultRPC: "https://mainnet.aurora.dev",
    },
    {
      name: "Harmony Mainnet Shard 0",
      displayName: "Harmony",
      id: 1666600000,
      type: "mainnet",
      icon: "https://static.tuli.pe/icons/networks/harmony.svg",
      currency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18,
      },
      contracts: null,
      explorer: {
        name: "Harmony Block Explorer",
        url: "https://explorer.harmony.one",
        standard: "EIP3091",
      },
      defaultRPC: "https://api.harmony.one",
    },
  ],
  wallets: [
    {
      id: "metamask",
      displayName: "Metamask",
      icon: null,
    },
    {
      id: "binanceChain",
      displayName: "Binance Chain",
      icon: null,
    },
    {
      id: "coinbase",
      displayName: "Coinbase",
      icon: null,
    }
  ],
  defaults: {
    networks: {
      icon: "https://static.tuli.pe/icons/networks/unknown.svg",
    },
    wallets: {
      icon: "TODO"
    }
  }
}
