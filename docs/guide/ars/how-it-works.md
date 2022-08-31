---
title: ARS ~ How it works ?
layout: doc
---

# How it works ?
The ARS system is in reality composed of distinct `initARS()` methods contained in [Ethers proxies](/guide/ethers-proxies/intuition.html) classes.

The `initARS()` method of an Ethers proxy instance is asynchronously called when its Ethers object is successfully initialized.

Those methods automatically setup a monitoring of the requirements of each Ethers instance. If the requirements change, the required updates to maintain a safe environment are automatically performed.
