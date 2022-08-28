# The `vuethers.config.js` file

All your Vuethers DApp configuration happens under the `vuethers.config.js` file.

This file export a Javascript object usually called `vuethersConfig` :
```js
export const vuethersConfig = {
  ...
}
```

This object can contains the following keys :
- `networks` (array) : contains supported chains configuration. See : [Networks config](/guide/configurations/networks-config.md)
- `wallets` (array) : contains supported wallets configuration. See : [Wallets config](/guide/configurations/wallets-config.md)
- `style` (object) : contains DApp styling configurations. See : [Style config](/guide/configurations/style-config.md)
- `defaults` (object) : contains many defaults used for unconfigured elements. See: [Defaults config](/guide/configurations/defaults-config.md)
