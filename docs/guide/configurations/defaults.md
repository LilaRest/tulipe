---
title: Configurations ~ Defaults
layout: doc
---

# Defaults config

As seen in the previous configuration section, many informations can be given to Tulipe. However in some cases your DApp has to deal with elements that are missing in your configuration file, for example and unknown network.

The `defaults` key of the [`tulipe.config.js` file](/guide/configurations/intuition) can be used to define many fallback / defaults configurations that Tulipe will use in case it encounter unconfigured elements.

The `defaults` key must be filled with an object. It looks like that :
```js
export const tulipeConfig = {
  defaults: {
    // Defaults configs
  }
}
```

## Set defaults
Below is the list of defaults properties that are currently supported by this `defaults` object :
- **`networks`** : contains defaults informations for networks
  - type: `Object`
  - required: **false**
  - properties:
    - **`icon`** : the URL of the default network's icon / logo
      - type: `String`
      - required: **false** (defaults to `"https://storage.tulipe.org/networks/unknown.svg"`)
<br/><br/>
- **`wallets`** : contains defaults informations for wallets
  - type: `Object`
  - required: **false**
  - properties:
    - **`icon`** : the URL of the default wallet's icon / logo
      - type: `String`
      - required: **false** (defaults to `"https://storage.tulipe.org/wallets/unknown.svg"`)
<br/><br/>

Here is an example of `defaults` configuration:
```js
defaults: {
  networks: {
    // ---- override default networks' icon URL
    icon: "https://mydomain.com/my-custom-icon.svg",
  }
}
```
