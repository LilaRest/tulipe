# Minimal configuration

Vuethers is designed to work out-of-the-box, however in order to allow it to manage our DApp we have to tells it :
- which networks our DApp is supporting
- which wallets are available to connect to it

To achieve that we firstly have to create a `vuethers.config.js` file in the `src/` folder of our Vue project :
```bash
touch src/vuethers.config.js
```

Then we invites you to fill it with this minimal example :
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

This minimal configuration indicates that our DApp is available on Ethereum Mainnet (chain ID = 1) and that the Metamask wallet can be used to connect to it.

Because Vuethers comes with 20+ EVM chain and 5+ pre-configured wallets, in that case we only need to indicate the `chainId` and the wallet's `name`.

So our minimal configuration is done !
