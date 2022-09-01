---
title: Configurations ~ Usage
layout: doc
---


# Usage

All your Tulipe DApp configuration happens under the `tulipe.config.js` file.

This file export a Javascript object usually called `tulipeConfig` :
```js
export const tulipeConfig = {
  ...
}
```

This object can contains the following keys :
- **`networks`** (`Array`) : contains supported chains configuration. See : [Networks config](/guide/configurations/networks)
- **`wallets`** (`Array`) : contains supported wallets configuration. See : [Wallets config](/guide/configurations/wallets)
- **`style`** (`Object`) : contains DApp styling configurations. See : [Style config](/guide/configurations/style)
- **`defaults`** (`Object`) : contains many defaults used for unconfigured elements. See: [Defaults config](/guide/configurations/defaults)
<br/><br/>

Then you just have to feed Tulipe with that configurations file by passing it in the `config` key of Tulipe plugin registration's arguments :
```js
// ...
import { tulipeConfig } from "./tulipe.config.js";
// ...
app.use(initTulipe, {
  config: tulipeConfig,
  start: () => app.mount("#app"),
})
```

See : [Setup your DApp](/guide/get-started/setup-your-dapp)
<br/><br/>

In the next pages of this documentation you'll learn how to configure networks, wallets, style, etc. inside this `tulipe.config.js` file.
