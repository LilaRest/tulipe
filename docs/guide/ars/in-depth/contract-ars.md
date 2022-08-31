---
title: ARS ~ Contract
layout: doc
---

# Contract ARS

Here is the list of requirements monitored by the ARS of `ContractProxy` instances, you'll also find the list of updates performed in case any change occurs :
- on **signer change** :
  - **detailed**: when the `dapp.signer` instance changes
  - **performed update** : The contract object is connected to the new signer
- on **signer remove** :
  - **detailed**: when the `dapp.signer` instance is removed
  - **performed update** : The contract object is connected to the provider if there is one, else it is set unsafe to use
