---
title: Chain watchers ~ Contract
layout: doc
---


# Contract watcher

You can easily track an on-chain data by calling the `watch` or `watchRef` methods of any `VEContract` instance when this one is safe to be used.

## `watch()`

The `dapp.contracts.<contractName>.watch(<method>, <args>, <callback>)` method allows to watch for the data returned by a `method` of the contract, with the given `args`, and to execute a `callback` with the new data each time this one changes.

Here is a simple code that allows to track the balance of an ERC20 contract user :
```js
import { dapp } from "tulipe";

let userBalance = $ref(null);

dapp.contracts.MyToken.watch("balanceOf", [dapp.signer.address], (newValue) => {
  userBalance = newValue;
})
```


## `watchRef()`
This method is still experimental and may be removed in the next versions of Tulipe, that's why at the moment, it is not documented.
