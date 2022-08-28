# Wallets config

The wallets supported by your DApp can be configured into the `wallets` key of the [`vuethers.config.js` file](/guide/vuethers-config-js.html).
The `wallets` key must be filled with an array of objects where each object represents a supported wallet. It looks like that :
```js
export const vuethersConfig = {
  wallets: [
    {
      // Wallet A configs...
    },
    {
      // Wallet B configs...
    },
    // ...
  ]
}
```

## Configure a wallet
If the wallet you want your DApp supports is contained in the [pre-filled wallets](/guide/configurations/wallets-config.html#pre-filled-wallets) list (see below), the only requirement to make it available is to fill its `walletId` to explicitely tells to Vuethers that you want to support it :
```js
export const vuethersConfig = {
  wallets: [
    // Supports Ethereum Mainnet
    {
      walletId: "metamask",
    },
  ]
}
```
As Metamask in the list of pre-filled wallets we only have to indicates its ID (`metamask`).


However if you want to customize a pre-filled wallet here is the detailed list of available wallet's properties :
- **`walletId`** : the ID of that represents the wallet.
  - type: `String`
  - required: **true**
  - role: it indicates to Vuethers the wallet represented in that object
<br/><br/>
- **`displayName`** : the display name of the wallet.
  - type: `String`
  - required: **false** (defaults to `name`'s value)
  - indication : should not end with `wallet` as it will be automatically appended when rendered, eg. should be `Metamask` and not `Metamask wallet`
  - role: used in Vuethers' components to represents the wallet.
<br/><br/>
- **`icon`** : the URL of the wallet's icon / logo
  - type: `String`
  - required: **false** (defaults to `TODO`)
<br/><br/>

Here is an example of wallets configuration :
```js
wallets = [
  // Support Metamask
  {
    walletId: "metamask",
  },
  // Support Binance Chain wallet
  {
    walletId: "binanceChain",
    // ---- override default displayName
    displayName: "BSC"
  },
  // Support Coinbase wallet
  {
    walletId: "coinbase",
    // ---- override default icon URL
    icon: "https://mydomain.com/my-custom-icon.svg",
  }
]
```

## Pre-filled wallets
Vuethers comes with 5+ pre-filled wallets configurations.

That means that in order to use in your DApp the networks in the below list, you only need to fill their `walletId`.

Here is the list of the currently pre-filled networks.
| wallet ID    | display name  |
| ------------ | ------------- |
| metamask     | Metamask      |
| binanceChain | Binance Chain |
| coinbase     | Coinbase      |


You can find the detailed wallets' defaults configurations [here](https://github.com/LilaRest/vuethers/blob/main/src/composables/config/vuethers.config-default.js).
