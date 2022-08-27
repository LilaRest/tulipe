# Minimal configuration

Vuethers is designed to work out-of-the-box, however in order to allow it to manage our DApp we have to tells it :
- which networks our DApp is supporting
- which wallets are available to connect to it

To achieve that we firstly have to create a `vuethers.config.js` file in the root of our Vue project :
```bash
touch vuethers.config.js
```

Then we have to fill it like that :
```js
export const vuethersConfig = {
  networks: [
    {chainId: 1},
  ],
  wallets: [
    {name: "metamask"},
  ]
}
```

This minimal configuration indicates that our DApp is available on Ethereum Mainnet and Metmask wallet can be used to connect to it.

Our minimal configuration is done !

Because Vuethers comes with 20+ EVM chain and 5+ pre-configured wallets, we simply need to indicate the `chainId` and the wallet's `name`.
