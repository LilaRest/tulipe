---
title: Ethers proxies ~ VEContract
layout: doc
---

# `VEContract`

The `VEContract` class is used to represent the current provider of your DApp stored at `dapp.contracts.<contractName>`.


## Available before Ethers.js object instanciated
- `.proxy`
 - `.setEthersObject()`
 - `.getEthersObject()`
 - `.setExtensionObject()`
 - `.getExtensionObject()`
 - `.setPlaceholderObject()`
 - `.getPlaceholderObject()`
- `.isReadSafe`
- `.isWriteSafe`
- `.onReadSafe()`
- `.onWriteSafe()`
- `.OnReadSafe`
- `.OnWriteSafe`

## Available after Ethers.js object instanciated
- all the properties of the associated Ethers.js `Contract` instance
- `watch()`
- `watchRef()`
