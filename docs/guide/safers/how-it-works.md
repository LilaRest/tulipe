---
title: Safers ~ How it works ?
layout: doc
---

# How it works ?

## Safers testers
Safers testers are computed properties held by all [Ethers proxies](/guide/ethers-proxies/intuition) instances.

Those ones contain `true` or `false` indicating if the tested element is safe or not to be used.

Here is the list of safers testers :
- `dapp.isSafe`
- `dapp.provider.isSafe`
- `dapp.signer.isSafe`
- `dapp.contracts.isReadSafe`
- `dapp.contracts.isWriteSafe`
- `dapp.contracts.<contractName>.isReadSafe`
- `dapp.contracts.<contractName>.isWriteSafe`
- `dapp.transactions.<transactionName>.isSafe`
- `dapp.transactions.<transactionName>.isSafe`

Under the hood safers testers are testing many things to determine if the element is safe, which are :
- test if the status of the element is equal to `SAFE`
- test if the status of the elements on which depend this element are equal to `SAFE`
- some custom tests specific to each element

## Safers delayers
Safers delayers are method held by all [Ethers proxies](/guide/ethers-proxies/intuition) instances.

Those ones accept a callback that will :
- be immediately called if `<instance>.isSafe.value` is equal to `true`
- else will be delayed and executed only when it becomes `true`

Here is the list of safers delayers :
- `dapp.onSafe(<callback>)`
- `dapp.provider.onSafe(<callback>)`
- `dapp.signer.onSafe(<callback>)`
- `dapp.contracts.onReadSafe(<callback>)`
- `dapp.contracts.onWriteSafe(<callback>)`
- `dapp.contracts.<contractName>.onReadSafe(<callback>)`
- `dapp.contracts.<contractName>.onWriteSafe(<callback>)`
- `dapp.transactions.<transactionName>.onSafe(<callback>)`
- `dapp.transactions.<transactionName>.onSafe(<callback>)`


## Safers components
Safers delayers are components held by all [Ethers proxies](/guide/ethers-proxies/intuition) instances.

Those ones accept a `<slot>` that will :
- be immediately rendered if `<instance>.isSafe.value` is equal to `true`
- else will be delayed and rendered only when it becomes `true`

They can also accept to named slots called `#safe` and `#unsafe` which allow to display different contents when the element is safe or unsafe.

Here is the list of safers components :
- `<dapp.OnSafe/>`
- `<dapp.provider.OnSafe/>`
- `<dapp.signer.OnSafe/>`
- `<dapp.contracts.OnReadSafe/>`
- `<dapp.contracts.OnWriteSafe/>`
- `<dapp.contracts.<contractName>.OnReadSafe/>`
- `<dapp.contracts.<contractName>.OnWriteSafe/>`
- `<dapp.transactions.<transactionName>.OnSafe/>`
- `<dapp.transactions.<transactionName>.OnSafe/>`
