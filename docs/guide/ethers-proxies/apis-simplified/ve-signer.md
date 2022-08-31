---
title: Ethers proxies ~ VESigner
layout: doc
---


# `VESigner`

The `VESigner` class is used to represent the current provider of your DApp stored at `dapp.signer`.


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
- all the properties of the associated Ethers.js `Signer` instance
