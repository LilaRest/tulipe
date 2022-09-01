---
title: Ethers proxies ~ Usage
layout: doc
---


# Usage

**Most of the usage of Ethers proxies are transparent**, it means you don't have to directly instanciate the Ethers proxies classes but instead Tulipe performs some automatic instanciations and provides you with simple methods to do so.

When your DApp initialize :
- `dapp.provider` is automatically filled with an instance of `VEProviderProxy`
- `dapp.signer` is automatically filled with an instance of `VESignerProxy`
- and the contracts you have configured in [`tulipe.config.js` file](/guide/configurations/intuition) are used to fill `dapp.contracts.*` with instances of `VEContractProxy`

And those methods create Ethers proxies instances :
- `dapp.contracts.add()`. See `ContractsList` API
- `dapp.transactions.add()`. See `TransactionsList` API
<br/><br/>

In case you work in some advanced scenarios and want to directly instanciate the Ethers proxies classes, see: [Instanciation](/guide/ethers-proxies/advanced/instanciation).
