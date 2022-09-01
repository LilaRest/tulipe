---
title: Ethers proxies ~ Instanciation
layout: doc
---

# Instanciation

In some advanced cases you may need to directly instanciate the Ethers proxies classes.

Firstly all those classes are available through the `tulipe` package :
```js
import {
  VEProviderProxy,
  VESignerProxy,
  VEContractProxy,
  VETransactionProxy
} from "tulipe";
```

Each of them wait for 3 **optional** arguments during instanciation :
- `ethersInstance`
  - type: any [Ethers.js](https://ethers.org/) instance
<br/><br/>
- `extensionInstance`
  - type: `VEExtension` instance
<br/><br/>
- `placeholderInstance`
  - type: `VEPlaceholder` instance

Some of those class will try to automatically retrieve an `ethersInstance` if this one is done explicitely provided.
