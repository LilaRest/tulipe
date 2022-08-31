---
title: DApp object ~ API
layout: doc
---


# API

Here is the detailed Application Programming Interface of the `dapp` object :

## Properties
- **`dapp.provider`** : holds everything related to current DApp's provider
  - type: `VEProviderProxy` object
<br/><br/>
- **`dapp.signer`** : holds everything related to current DApp's provider
  - type: `VESignerProxy` object
<br/><br/>
- **`dapp.contracts`** : holds everything related to current DApp's contracts
  - type: `VEContractsList` object
<br/><br/>
- **`dapp.transactions`** : holds everything related to current DApp's transactions
  - type: `VETransactionsList` object
<br/><br/>
- **`dapp.config`** : holds everything related to the DApp's configurations
  - type: `VEConfig` object
<br/><br/>
- **`dapp.wallets`** : holds instances of available DApp's wallets
  - type: `VEWalletsList` object
<br/><br/>
- **`dapp.pro`** : alias of `dapp.provider`
<br/><br/>
- **`dapp.sig`** : alias of `dapp.signer`
<br/><br/>
- **`dapp.con`** : alias of `dapp.contracts`
<br/><br/>
- **`dapp.txs`** : alias of `dapp.transactions`
<br/><br/>
- **`dapp.isSafe`** : contain the safety state of the DApp, see [Safers](/guide/safers/intuition)
  - type: Reactive object

## Methods
- **`dapp.onSafe(callback)`** : calls `callback()` when DApp is safe, see [Safers](/guide/safers/intuition)

## Components
- **`dapp.OnSafe`** : render encapsulated slot when DApp is safe, see [Safers](/guide/safers/intuition)
<br/><br/>
