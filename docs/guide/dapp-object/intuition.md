---
title: DApp object ~ Intuition
layout: doc
---

# Intuition
When developing a DApp with tools like [Ethers.js](https://ethers.org/), we are provided with many classes that abstract some blockchain concepts like : `Provider` (network), `Signer` (wallet), `Contract`, `Transaction`, etc.

## Problems

### 1) A lot of instances
As seen above, to interact with chains, wallets, etc. we have to create many instances that represents them.
Even for simple projects we can quickly end with a lot of unorganized instances.

Also, when those instances a required at multiple place in the code project, we have to perform a lot of `import` statement or additional line of codes to retrieve the instances we require.

### 2) Consistency
A most serious problem is that in case instances are not clearly organized, our code is more errors-prone since developers can forget to manage some isolated instances, which may lead to inconsistent behaviors compared to other instances of the same type.

Also, those instances are hard to manage individually and a DApp code may quickly become complex in case this management is not clearly organized and centralized.

### 3) Huge amount of datas
Also, all those instances requires a consequent amount of static datas to be created. Dealing with that number of heterogenous datas can quickly become hard.

In addition, all those datas have to be imported in the project' code files, this again leads to multiple `import` statements that makes our DApp's code even more complex.


## Tulipe' approach
In order to solves the 3 above problems, Tulipe provides the DApp object.

This object can be imported from anywhere in the project and contains properly organized instances and datas.

Also, most of the concepts that you'll see later in that documentation like [Ethers proxies](/guide/ethers-proxies/intuition), [Safers](/guide/safers/intuition), [Chain watcher](/guide/chain-watchers/intuition), etc. are available through the `dapp` object.

So now, only one `import` statement is required to access most of the things you need to build your DApp.
