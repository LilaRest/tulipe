---
title: Configurations ~ Networks
layout: doc
---

# Networks config

The chains (networks) supported by your DApp can be configured into the `networks` key of the [`tulipe.config.js` file](/guide/configurations/intuition).
The `networks` key must be filled with an array of objects where each object represents a supported chain. It looks like that :
```js
export const tulipeConfig = {
  networks: [
    {
      // Chain A configs...
    },
    {
      // Chain B configs...
    },
    // ...
  ]
}
```

## Configure a network
If the network you want your DApp supports is contained in the [pre-filled networks](/guide/configurations/networks#pre-filled-networks) list (see below), the only requirement to make it available is to fill its `chainId` to explicitly tells to Tulipe that you want to support it :
```js
export const tulipeConfig = {
  networks: [
    // Supports Ethereum Mainnet
    {
      chainId: 1,
    },
  ]
}
```
As Ethereum Mainnet is in the list of pre-filled networks we only have to indicates its chain ID (1).


However if the network you want to works with is not in the [pre-filled networks](/guide/configurations/networks#pre-filled-networks) list or if you want to customize a pre-filled networks here is the detailed list of available network's properties :
- **`chainId`** : the chain ID of the network.
  - type: `Number`
  - required: **true**
  - **Metamask sensible**. See [prevent metamask warnings](/guide/configurations/networks#prevent-metamask-warnings) (below)
<br/><br/>
- **`name`**: the full name of the network.
  - type: `String`
  - required: **true**
  - role: Used when adding new chain to user's wallet.
  - **Metamask sensible**. See [prevent metamask warnings](/guide/configurations/networks#prevent-metamask-warnings) (below)
<br/><br/>
- **`displayName`** : the display name of the network.
  - type: `String`
  - required: **false** (defaults to `name`'s value)
  - role: used in Tulipe' components to represents the network.
<br/><br/>
- **`type`** : the type of network
  - type: `String` in `mainnet|testnet`
  - required: **false** (defaults to `"mainnet"`)
<br/><br/>
- **`icon`** : the URL of the network's icon / logo
  - type: `String`
  - required: **false**
  - role: used in Tulipe' components to represents the network.
<br/><br/>
- **`currency`** : holds informations about the network's currency.
  - type: `Object`
  - required: **true**
  - role: used in some Tulipe components and when adding a new chain to user's wallet
  - properties :
    - **`name`** : the name of the coin
      - type: `String`
    - **`symbol`** : the symbol of the coin
      - type: `String`
    - **`decimals`** : the number of decimals of the coin
      - type: `Number`
      - role: also used when converting users inputs to wei values
  - **Metamask sensible**. See [prevent metamask warnings](/guide/configurations/networks#prevent-metamask-warnings) (below)
<br/><br/>
- **`contracts`** : the contracts available for that network
  - type: `Object` where keys are contracts' names and values contracts objects
  - required: **false**
  - role: Used to pre-populate `dapp.contracts`
  - properties of contracts objects :
    - **`address`** : the contract's public address
      - type: `String`
      - required: **true**
    - **`abi`** : the contract's ABI
      - type: `Object` (JSON ABI converted to JS object)
      - required: **true**
<br/><br/>
- **`explorer`** : holds informations about the network's web explorer.
  - type: `Object`
  - required: **false**
  - role: used in some Tulipe components and when adding a new chain to user's wallet
  - properties :
    - **`name`** : the name of the explorer
      - type: `String`
      - required: **true**
    - **`url`** : the symbol of the coin
      - type: `String`
      - required: **true**
      - **Metamask sensible**. See [prevent metamask warnings](/guide/configurations/networks#prevent-metamask-warnings) (below)
    - **`standard`** : the number of decimals of the coin
      - type: `String`
      - required: **false** (defaults to `EIP3091`)
<br/><br/>
- **`defaultRPC`**: the fallback RPC URL for the network
  - type: `String`
  - required: **false**
  - **Metamask sensible**. See [prevent metamask warnings](/guide/configurations/networks#prevent-metamask-warnings) (below)
<br/><br/>

Here is an example of networks configuration :
```js
networks: [
  // Ethereum Mainnet
  {
    chainId: 1,
  },

  // Polygon Mainnet
  {
    chainId: 137,
    // ---- Override default icon URL
    icon: "https://mydomain.com/my-custom-icon.svg",
    // ---- Load Lock contract for Polygon chain
    contracts: {  
      "Lock": await import("../backend/deployments/polygon/Lock.json"),
    },
  },

  // Fantom Opera
  {
    chainId: 250,
    // ---- Load Lock contract for Fantom chain
    contracts: {  
      "Lock": await import("../backend/deployments/fantom/Lock.json"),
    },
  },

  // Custom Network
  {
    // ---- Define a custom network
    chainId: 123456789,
    name: "Custom Network Mainnet",
    displayName: "Custom Network",
    type: "mainnet",
    currency: {
      name: "Custom Network Coin",
      symbol: "CNC",
      decimals: 18,
    },
    explorer: {
      name: "Customscan",
      url: "https://customscan.com/",
      standard: "EIP3091",
    },
    defaultRPC: "https://customrpc.com/",
  }
]
```


## Prevent Metamask warnings
When a DApp requests Metamask for adding a new network to it, this one will perform some checks to ensure that the networks is not fraudulent.

It means that if the networks informations given to Metamask don't comply to their requirements, Metamask will display a warning to the user indicating that this network is a "potential fraud".

(**TODO** : Add an illustration here.)

The easiest way to prevent Metamask of warning the user is to exactly match some of ours networks datas with datas contained in [this file from ChainId](https://chainid.network/chains.json) (which is compliant).

Here are preciselly how datas must be matched :
- `chainId` in Tulipe must match `chainId` in ChainId file
- `name` in Tulipe must match `name` in ChainId file
- `currency.name` in Tulipe must match `nativeCurrency.name` in ChainId file
- `currency.symbol` in Tulipe must match `nativeCurrency.symbol` in ChainId file
- `currency.decimals` in Tulipe must match `nativeCurrency.decimals` in ChainId file
- `explorer.url` in Tulipe must match `explorers[0].url` in ChainId file
- `defautRPC` in Tulipe must match `rpc[0]` in ChainId file


## Pre-filled networks
Tulipe comes with 20+ pre-filled EVM networks configurations.

That means that in order to use in your DApp the networks in the below list, you only need to fill their `chainId`.

Here is the list of the currently pre-filled networks.
| chain ID   | name |
| ---------- | ---- |
| 1          | Ethereum Mainnet |
| 3          | Ropsten |
| 4          | Rinkeby |
| 5          | Görli |
| 10         | Optimism |
| 25         | Cronos Mainnet Beta |
| 40         | Telos EVM Mainnet |
| 56         | Binance Smart Chain Mainnet |
| 100        | Gnosis Chain |
| 122        | Fuse Mainnet |
| 128        | Huobi ECO Chain Mainnet |
| 137        | Polygon Mainnet |
| 250        | Fantom Opera |
| 1088       | Metis Andromeda Mainnet |
| 1284       | Moonbeam |
| 1285       | Moonriver |
| 8217       | Klaytn Mainnet Cypress |
| 31337      | Hardhat |
| 42161      | Arbitrum One |
| 42220      | Celo Mainnet |
| 42262      | Emerald Paratime Mainnet |
| 43114      | Avalanche C-Chain |
| 1313161554 | Aurora Mainnet |
| 1666600000 | Harmony Mainnet Shard 0 |

You can find the detailed networks' defaults configurations [here](https://github.com/0Lilian/tulipe/blob/main/src/composables/config/tulipe.config-default.js).
