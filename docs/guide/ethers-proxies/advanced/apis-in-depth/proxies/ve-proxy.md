# `VEProxy`

The `VEProxy` class is never used directly in Vuethers but is the parent of every other Ethers proxies classes.

Here is the detailed Application Programming Interface of a `VEProxy` instance :


## Properties

- **`.<ethersInstance.*>`** : all the properties of `proxy.ethersInstance`
- **`.<extensionInstance.*>`** : all the properties of `proxy.extensionInstance`
- **`.<placeholderInstance.*>`** : all the properties of `proxy.placeholderInstance`
- **`.proxy`** : allows to interact with the Ethers proxy
  - type: `Object`

## Methods

- **`.proxy.setEthersInstance(<ethersInstance>)`** : set the current Ethers.js instance
- **`.proxy.getEthersInstance()`** : returns the current Ethers.js instance
- **`.proxy.setExtensionInstance(<extensionInstance>)`** : set the current `Extension` instance
- **`.proxy.getExtensionInstance()`** : returns the current `Extension` instance
- **`.proxy.setPlaceholderInstance(<placeholderInstance>)`** : set the current `Placeholder` instance
- **`.proxy.getPlaceholderInstance()`** : returns the current `Placeholder` instance
