---
title: Get started ~ Intuition
layout: doc
---

# Intuition

## Current context
Nowadays, libraries like [Web3.js](https://web3js.org/) and [Ethers.js](https://ethers.org/) provide robust interfaces to interact with EVM blockchains from any Javascript environment.

Those libraries allow to abstract blockchain-related concepts like nodes, smart contracts, wallets, transactions, etc. as simple JS objects.
Thanks to them we can already interact with blockchains from any popular web JS framework like [React](https://reactjs.org/), [VueJS](https://vuejs.org/), [Angular](https://angular.io/), etc.

At writing time, React is the mainly used framework for DApps development.

## DApp requirements / problems
So easily requesting EVM blockchain is solved by libraries mentioned above, but a DApp has many other requirements to work properly, here are some of them :
- it has to detect and communicate with user's wallet
- it has to track on-chain datas to display up-to-date content to users
- it has to provides users with an easy way to interact with chain and contracts
- it has to perform **a lot** of checks to ensure all those actions always remain safe

However very few libraries exist to help developers to fill those requirements, and it's especially true for VueJS : **there is currently no complete library to achieve that**.

## Vuethers' approach
Vuethers provides developers with **a fully simplified environment making the development of maintainable, robust and safe DApps a real piece of cake.**

Firstly, the entire DApp configuration is managed in a single file called `vuethers.config.js`.

The DApp is represented by a `dapp` object. This object is initialized with everything required to safely interact with the networks, contracts and wallets defined by the developer in the `vuethers.config.js` file.
By the way, Vuethers comes with 20+ EVM and 5+ wallets pre-configured allowing to use them by simply indicating their chain ID or wallet name in the `vuethers.config.js` file.

Then, all the safety checks are internally managed and developers are provided with tools called [safers](/guide/safers/intuition) allowing them to write safe pieces of code by simply wrapping them in functions or components.

Also, [chain watchers](/guide/chain-watchers/intuition) allows developer to efficiently track an on-chain data with a single line of code.

Finally, a lot of Vue [components](/guide/components/intuition) are included in order to provide developers with pre-made and robust components for the most common parts of a DApp : **allowing them to focus more on the real innovation of their DApps**.

All of those components  are thought to be flexible and to allows developers to choose to be more or less free :
- they are made of smaller components that can be used to re-build bigger custom components
- 3 levels of styling are offered from "unstylized" to "opinionated", leaving the choice to developers of being more or less helped in the style of their DApp

### Final words
Here are only exposed the major functionalities offered by Vuethers, there are much more in reality and you can find them in the rest of this documentation.


## How does it tastes ? 😋
Firstly, you can configure your entire DApp frontend in a single file called `vuethers.config.js`.
```js
export vuethersConfig = {
  networks: {
    chainId: 1
  },
  wallets: {
    walletId: "metamask"
  }
}
```
This minimalist configuration file make your DApp frontend support the Ethereum Mainnet network (chain ID : 1) and allows users to connect to it using the [Metamask](https://metamask.io/) wallet.

Then, with Vuethers most of the things you need to build your DApp fronted is available the `dapp` object.
This one can easily be imported from the `vuethers` package :
```js
import { dapp } from "vuethers";
```

For example if you have configured a `MyToken` ERC20 contract in `vuethers.config.js`, you can access its Ethers.js object at :
```js
dapp.contracts.MyToken
// Get the balance of userAddress
const userAddress = "0xf39Fd6e5..."
const userBalance = dapp.contracts.MyToken.balanceOf(userAddress)
```
And your DApp signer and provider are also accessible under the `dapp` object :
```js
console.("Connected wallet address is : " + dapp.signer.address)
const block = dapp.provider.getBlock(123456)
```
You don't have anymore to deal with multiple manual instanciations.

::: tip Explanations
When your DApp initializes, Vuethers will populate the `dapp` object with all the networks, wallets and contracts you have configured, and much more !
:::

Also, while a DApp has a very volatile context (eg. a user can connect/deconnect a wallet, chain connection can be lost, etc.) it may be difficult to always write safe code.

To solve that, Vuethers provides developers with many safers which helps making a piece of code safe by simply wrapping it in a method / component.

For example if we want to ensure our interaction with MyToken contract is safe in script :
```html
<script setup>
import { dapp } from "vuethers";

const userAddress = "0xf39Fd6e5..."
let userBalance = $ref(null);

dapp.contracts.MyToken.onReadSafe(() => {
  // Will be executed only when MyToken contract will be safe to read
  userBalance = dapp.contracts.MyToken.balanceOf(userAddress)
})
</script>
```
::: tip Explanations
By wrapping our code in the `dapp.contracts.MyToken.onReadSafe()`method, we ensure that it will be executed only when the `MyToken` contract is safe to be read.
:::

Or if we want to ensure our interaction with MyToken contract is safe in template :
```html
<template>
  <dapp.contracts.MyToken.OnReadSafe>
    <!-- Will be rendered only when MyToken contract will be safe to read -->
    <p>Address : {{ userAddress }}</p>
    <p>Balance : {{ userBalance }}</p>
  </dapp.contracts.MyToken.OnReadSafe>
</template>
```
::: tip Explanations
By wrapping our content in the `dapp.contracts.MyToken.OnReadSafe`component, we ensure that it will be rendered only when the `MyToken` contract is safe to be read.
:::

With Vuethers you can also track an on-chain data and it feels like using VueJS watchers methods (`watch()`, etc.)

Here is how we can track and display an always up-to-date balance to the user :
```html
<script setup>
import { dapp } from "vuethers";

const userAddress = "0xf39Fd6e5..."
let userBalance = $ref(null);

dapp.contracts.MyToken.watch("balanceOf", [userAddress], (newValue) => {
  // Will be executed each time 'balanceOf' of 'userAddress' changes
  userBalance = newValue;
})
</script>

<template>
  <p>Your balance is : {{ userBalance }} MTK</p>
</template>
```
::: tip Explanations
The `dapp.contracts.MyToken.watch()` method allows to efficiently watch for mutations of an on-chain data and to run a given callback each time it occurs.
:::

Vuethers offers a lot more things to makes safe DApp development a real piece of cake.

You can find them all on [its documentations](https://vuethers.org/).
