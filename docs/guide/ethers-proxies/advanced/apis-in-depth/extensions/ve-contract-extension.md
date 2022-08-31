# `VEContractExtension`

The `VEContractExtension` class inherits from the [`VEExtension` class](/guide/ethers-proxies/advanced/apis-in-depth/extensions/ve-extension) and is used to extend an Ethers.js `Signer` object without mutating it.

Here is the detailed Application Programming Interface of a `VEContractExtension` instance :

## Methods
- `.watch(<source>, <args>, <callback>)` : is an alias for `dapp.chainWatchers.contracts.addCallback()`, See: [Chain watchers](/guide/chain-watchers/intuition.md)
- `.watchRef(<source>, <args>, <callback>)` : is an alias for `dapp.chainWatchers.contracts.addRef()`, See: [Chain watchers](/guide/chain-watchers/intuition.md)
