---
title: ARS ~ Intuition
layout: doc
---

# Intuition
Creating a DApp frontend implies having to deal with many distinct but intimately related concepts like : providers, signers, contracts, transactions, etc.

When working with [Ethers.js](https://ethers.org/) for example, we firstly have to instanciate one of the `Provider` classes that represent the network (chain) our DApp is working with.

Once done we will be able to instanciate one of the `Signer` classes that will represent the wallet connected to our DApp.

Finally we are able to create `Contract` instances to interact with on-chain contracts through simple JS interfaces and we implicitly create `Transaction` instances when calling one of the contracts methods.

## Problem : Relations requirements

All of those objects are distinct but at the same time intimately related. Here are some of the relations we can observe between them :
- signers require a valid `Provider` instance to work properly
- contracts' interactions will not work without a valid `Provider` or `Signer` instance
- when the signer changes, contracts must be updated with the new `Signer` instance
- when the signer is removed, contracts must be linked back to the valid `Provider` instance (if there is one)
- when provider changes, the DApp must be refreshed in order to safely re-initialize all other instances

In order to create a safe DApp environment, those relations requirements must be strongly managed, and an instance change should conduces to an update of all instances that depends on it.

In other words it means that some pieces of code have to monitor these changes and to perform the required operations when they occur.

Creating such a safe system is an heavy task and DApp developers loose a lot of time

## Tulipe' approach
In order to provides developers with an always-safe environment, Tulipe introduces the ARS (Automated Relation Safety) system.

With the ARS you don't have anymore to think about "_Have I updated my contract with the new signer ?_" or "_What should I do if the network changes ?_" all those problems are internally and transparently managed by Tulipe.

Just relax, and enjoy your DApp frontend development ! <span style="font-size: 20px;">:bear:</span>
