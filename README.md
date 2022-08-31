<h1 align="center">
  <a href="https://vuethers.org/">
    <img src="https://static.vuethers.org/vuethers-logo.png" alt="Logo" width="125" height="125">
    Vuethers
  </a>
</h1>

## A DApp frontend framework for Vue 3 built with Ethers.js

- 💡 **Intuitive Design** : Vuethers abstracts a lot of repetitive and heavy tasks but has been thought to always let developers feel what happens under the hood.

- 🦥 **Ready-to-use** : Vuethers comes with +20 EVM chains and +5 wallets pre-configured. Give it a chain's ID and a wallet name, and your DApp is ready to run !

- 🖖 **Flexible styling** : Vuethers comes with 3 levels of styling, from unstylized to opinionated, so you can choose your level of customization.

- 📦 **Extremely minimal** : Vuethers weight less than 15kB gzipped and relies on only 2 top-level dependencies : Vue3 and Ethers.js

## Alpha warning
This library is currently in development and not suitable yet for production environment, use at your own risks.
Beta and a stable versions should be released by the end of 2022.

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


## How to contribute ?

### Contribute by _**testing**_ Vuethers
1) Test the library's features
2) Observe a bug or an improvement that could be made
3) Report it by [creating an issue](https://github.com/0Lilian/vuethers/issues/new)

### Contribute by _**coding**_ Vuethers
- If you have found a bug or a potential improvement for the library and want to code it, we would be happy to accept your PRs!
  **Important :** It'd be good to talk about it beforehand to make sure that no one else is working on it. You can [open an issue](https://github.com/0Lilian/Vuethers/issues/new) for this.
- If you want to code but don't know where to start :
  1) Check out the issues labelled "[help wanted](https://github.com/0Lilian/vuethers/labels/help%20wanted)".
  2) Check out [our roadmap](https://github.com/0Lilian/vuethers/projects/1) and choose an unassigned task

**Here are the steps to contribute to the Vuethers's code :**
1) Fork this repository
2) Clone your fork on your computer using `git clone https://github.com/<YourGithubName>/vuethers.git`
3) In local, navigate into the cloned folder called `vuethers/`
4) Add the Vuethers project repository as the "upstream" remote using `git remote add upstream https://github.com/0Lilian/vuethers.git`
5) Now you can easily pull the new updates on the Vuethers repository using `git pull upstream main`
5) Apply changes in your local repository
6) Commit your changes using `git add -A` + `git commit -m "<YourChangesDescription>"`
7) Push your changes to your fork repository using `git push origin main`
8) Return to your fork on Github, refresh the page and you should see an highlighted area that invites you to initiate a Pull Request. (alternatively you can click on the "New pull request" button)
