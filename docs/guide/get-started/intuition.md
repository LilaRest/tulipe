# Intuition

## Current context
Nowadays, libraries like [Web3.js](https://web3js.org/) and [Ethers.js](https://docs.ethers.io/v5/) provide robust interfaces to interact with EVM blockchains from any Javascript environment.

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

Then, all the safety checks are internally managed and developers are provided with tools called [safers](/guide/safers/) allowing them to write safe pieces of code by simply wrapping them in functions or components.

Also, [chain watchers](/guide/chain-watchers/) allows developer to efficiently track an on-chain data with a single line of code.

Finally, a lot of Vue [components](/guide/components/) are included in order to provide developers with pre-made and robust components for the most common parts of a DApp : **allowing them to focus more on the real innovation of their DApps**.

All of those components  are thought to be flexible and to allows developers to choose to be more or less free :
- they are made of smaller components that can be used to re-build bigger custom components
- 3 levels of styling are offered from "unstylized" to "opinionated", leaving the choice to developers of being more or less helped in the style of their DApp

### Final words
Here are only exposed the major functionalities offered by Vuethers, there are much more in reality and you can find them in the rest of this documentation.


## How does it tastes ? 😋
With Vuethers most of the DApp datas are accessible through the `dapp` object.
When the DApp is initialized, this object is filled with everything the DApp needs to work.

To illustrate how Vuethers taste, let's imagine a simple ERC20 contract called MyToken.

Here is how it feels with Vuethers :
- if we want to interact with our `MyToken` contract :
```html
<script setup>
import { dapp } from "vuethers";

const userAddress = "0xf39Fd6e5..."
const userBalance = dapp.contracts.MyToken.balanceOf(userAddress)
</script>
```
::: tip Explanations
Our `MyToken` contract is directly available in the `dapp` object at `dapp.contracts.MyToken`.
It is a simple Ethers.js contract object with few additional methods.
:::
- if we want to ensure our interaction with MyToken contract is safe in script :
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
- if we want to ensure our interaction with MyToken contract is safe in template :
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
- if we want to watch (track) an on-chain data
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
```
::: tip Explanations
The `dapp.contracts.MyToken.watch()` method allows to efficiently watch for mutations of an on-chain data and to run a given callback each time it occurs. In this case it allows us to keep an up to date user's balance.
:::
Vuethers offers a lot more of syntactic sugar to make DApp developers' life easier, you'll be able to learn about each them in that documentation.
