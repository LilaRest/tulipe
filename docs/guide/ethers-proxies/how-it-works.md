---
title: Ethers proxies ~ How it works ?
layout: doc
---


# How it works ?

Vuethers provides many Ethers proxies classes that all inherit of the `VEProxy` class :
- `VEProviderProxy`
- `VESignerProxy`
- `VEContractProxy`
- `VETransactionProxy`

Instances of those classes are simple JS proxies that are able to receive 3 distinct source objects, which sorted by order of priority are :
1) **An Ethers.js instance** (optional) --> the original Ethers.js instance
2) **A `VEExtension` instance** (optional) --> used to extends the Ethers.js instance without mutating it
3) **A `VEPlaceholder` instance** (optional) --> used to add methods and properties related to the Ethers.js instance but that don't require it directly. Those one are available even before the Ethers.js instance is available.


It means that when accessing an Ethers proxy instance, this one will search for the requested property / method into its 3 sources objects. It looks like :

![ill](/guide/ethers-proxies/assets/ethers-proxies.svg)

As you can see on this diagram, an Ethers proxy instance will firstly search for the requested property / method in its **Ethers.js instance**.

If the **Ethers.js instance** is `null` or if the property / method is not found in it, it will search for it in its **`VEExtension` instance**.

If the **`VEExtension` instance** is also `null` or if the property / method is not found in it, it will search for it in its **`VEPlaceholder` instance**.

Finally if the request property / method is not found in all those instances, it will simply return `undefined`.

Here is an in-code illustration with the `dapp.provider` Ethers proxy :
```js
import { dapp } from "vuethers";
dapp.provider.getBlock(12345) // This property comes from the Ethers.js instance
dapp.provider.watch(...)      // This property comes from the VEExtension instance
dapp.provider.isSafe          // This property comes from the VEPlaceholder instance
```
