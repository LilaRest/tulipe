---
title: Ethers proxies ~ Intuition
layout: doc
---


# Intuition
When building DApps with libraries like [Ethers.js](https://ethers.org/) we are provided with multiple class and methods facilitating the interactions with EVM blockchains.

## Problems

### 1) Customization
However, since those libraries are very specific and doesn't cover 100% of uses case,  we usually need to create custom methods that performs additional operations related to those same concepts. So we usually end with many independent functions, additional classes and / or methods, all related to the same concept, but all separated.

This implies a less intuitive code, since all the tools related to a concept are not bundled in a same object that represent the concept.

Also, while we have to deal with all those independent additional functions, classes and methods, our code is less maintainable and it will be more difficult to scale it.

### 2) Flexibility
A solution to solve the previous problem could be to override Ethers.js classes to implement our additional methods directly in their instances.

Sure it will allow us to bundle all methods related to a concept in a single object, but however this method is really inflexible when it comes to advanced scenarios.

Imagine (and it's the case for Tulipe) that we want to bundle everything associated to `Provider` under a `dapp.provider` object, and imagine also that we have a [computed property](https://vuejs.org/guide/essentials/computed.html) called `isSafe` that return `true` or `false` indicating if the provider is safe to be used or not.

In that scenario we want the `isSafe` property to be accessible even if the Ethers provider object is not instanciated yet, else this method would be useless since it would be accessible only when the provider is safe and so will never return `false`.

So we need a way to bundle under the same object, methods from distinct objects.

### 3) Good practices
The last problem, which is not a blocking one but important when designing a library, is that it's recommended to don't override when possible the classes provided by and external library.

This can lead to :
- **unexpected behaviors** : if the external library relies on properties that have been overridden
- **user lock-in** : since the user is now restricted by the design of the library that overrides the other
- **confusions** : since the user cannot clearly see the distinction between what is brought by the original library and what is brought by the library that overrides

So we ideally need a way to overload the original Ethers.js instances without mutating them directly.


## Tulipe' approach
To solves that problems, Tulipe introduces **Ethers proxies**, which are under the hood, simple JS object proxies.

Those proxies allows Tulipe and DApps developers to :
- defines methods and properties that are accessible even before the Ethers.js objects are instanciated
- extends Ethers.js instances without directly mutating them
- bundle everything related to the same concept under the same object

For example everything related to provider is accessible at `dapp.provider`.
