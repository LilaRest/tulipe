---
title: Ethers proxies ~ VETransaction
layout: doc
---

# `VETransaction`

The `VETransaction` class is used to represent the current provider of your DApp stored at `dapp.transactions.<transactionName>`.


## Available before Ethers.js object instanciated
- `.proxy`
 - `.setEthersObject()`
 - `.getEthersObject()`
 - `.setExtensionObject()`
 - `.getExtensionObject()`
 - `.setPlaceholderObject()`
 - `.getPlaceholderObject()`
- `.isSafe`
- `.onSafe`
- `.OnSafe`

## Available after Ethers.js object instanciated
- all the properties of the associated Ethers.js `Transaction` instance
