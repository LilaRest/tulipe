---
title: ARS ~ Provider
layout: doc
---

# Provider ARS

Here is the list of requirements monitored by the ARS of `ProviderProxy` instances, you'll also find the list of updates performed in case any change occurs :
- on **provider change** :
  - **detailed**: when the `dapp.provider` instance changes
  - **performed update** : The whole DApp is reloaded for security reasons. See this [recommandation](https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes) from Ethers.js
