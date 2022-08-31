---
title: Ethers proxies ~ VEProvider
layout: doc
---

# `VEProvider`

The `VEProvider` class is used to represent the current provider of your DApp stored at `dapp.provider`.


## Available before Ethers object instanciated
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

## Available after Ethers object instanciated
- all the properties of the associated Ethers.js `Provider` instance
