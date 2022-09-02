**<h1 align="center">Tulipe</h1>**
<div align="center">
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/0Lilian/tulipe/Build,%20Commit%20&%20Publish%20Tulipe%20Packages?label=Build">
  <img alt="npm" src="https://img.shields.io/npm/v/tulipe?label=Version">
  <img alt="npm" src="https://img.shields.io/npm/dw/tulipe?color=%23bcf&label=Downloads">
  <img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/librariesio/release/npm/tulipe?color=%23faf&label=Dependencies">
  <img alt="NPM" src="https://img.shields.io/npm/l/tulipe?color=def&label=License">
  <img alt="GitHub file size in bytes" src="https://img.shields.io/github/size/0Lilian/tulipe/dist/tulipe.min.js?label=Raw size">
</div>

<h3 align="center" style="color:red">A DApp frontend framework for Vue 3 built with Ethers.js</h2>

<br/>

<p align="center">
  <a href="https://tuli.pe/">
    <img src="https://static.tuli.pe/tulipe-logo.png" alt="Tulipe logo">
  </a>
</p>

- 💡 **Intuitive Design** : Tulipe abstracts a lot of repetitive and heavy tasks but has been thought to always let developers feel what happens under the hood.

- 🦥 **Ready-to-use** : Tulipe comes with +20 EVM chains and +5 wallets pre-configured. Give it a chain's ID and a wallet name, and your DApp is ready to run !

- 🖖 **Flexible styling** : Tulipe comes with 3 levels of styling, from unstylized to opinionated, so you can choose your level of customization.

- 📦 **Extremely minimal** : Tulipe weight less than 15kB gzipped and relies on only 2 top-level dependencies : Vue3 and Ethers.js

<br/>

<h3 align="center">
  <a href="https://tuli.pe/">Website</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://tuli.pe/guide/welcome/introduction">Documentation</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://tuli.pe/api/">API</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://tuli.pe/changelog/">Changelog</a>
</h3>

<br/>

## Alpha warning
This library is currently in development and **not suitable yet for production environment**, use at your own risks.

**Please :star: this repository to show us your interest in a future stable release.**

Beta and stable versions should be released by the **end of 2022**.

<br/>

## How does it tastes ? :yum:

### Easy configurations
Firstly, you can configure your entire DApp frontend in a single file called `tulipe.config.js`.
```js
export const tulipeConfig = {
  networks: [
    {
      id: 1,
      contracts: {
        "MyToken": import("./MyToken.json")
      }
    }
  ],
  wallets: [
    {id: "metamask"}
  ],
}
```
With this minimal configuration, your DApp frontend will :
- support the [Ethereum Mainnet](https://ethereum.org/en/) network (`id: 1`)
- will be able to interact with the `MyToken` contract
- and allows users to connect to it using the [Metamask](https://metamask.io/) wallet (`id: "metamask"`).

### The `dapp` object
Most of the things you need to built are available through the `dapp` object, which can be simply imported from the `tulipe` package.
```js
import { dapp } from "tulipe";
```

### Auto-instanciations
When your DApp loads, Tulipe will read your `tulipe.config.js` file and populates, if possible, the `dapp` object with all the [Ethers.js](https://ethers.org/) instances your DApp requires.
```js
import { dapp } from "tulipe";

dapp.provider            // An Ethers.js Provider instance
dapp.signer              // An Ethers.js Signer instance
dapp.contracts.MyToken   // An Ethers.js Contract instance

// They can be used normally
const userAddress = "0xf39Fd6e5..."
const userBalance = dapp.contracts.MyToken.balanceOf(userAddress)
```

You don't have anymore to deal with multiple manual instanciations.

### ARS (Automated Relations Safety)
While a DApp has a very unstable context (eg. a user can connect/deconnect a wallet, chain connection can be lost, etc.) it may be difficult to always write safe code.

Tulipe comes with ARS, an internal system that ensure that your DApp instances always remain safe to use.

For example, if the signer of your DApp has changed, all the contracts instances will be automatically updated with the new signer.

With the ARS you don't have anymore to think about "Have I updated my contract with the new signer ?" or "What should I do if the network changes ?" all those problems are internally and transparently managed by Tulipe.

### Safers
Also, in such an unstable context, writing safe code may became quickly complex.

To help developers always writing safe code, Tulipe provides many safers methods and components.

Making your code safe has never been so easy !

```js
dapp.contracts.MyToken.onReadSafe(() => {
  // Code here will be executed when MyToken contract is safe to be read
  const userBalance = dapp.contracts.MyToken.balanceOf(userAddress)
})
```
```js
dapp.provider.onSafe(() => {
  // Code here will be executed when the DApp provider is safe to use
  const block = dapp.provider.getBlock(123456)
})
```
```html
<template>
  <dapp.signer.OnSafe>
    <p>A wallet is connected to this DApp !</p>
  </dapp.signer.OnSafe>
</template>
```

### Chain watchers
When developing reactive web DApps frontends we need to regularly fetch on-chain datas to always display the most up-to-date ones to the users.

Tulipe provides chain watchers to efficiently watch for mutations of an on-chain data and to run a given callback each time it occurs.

Here is how we can track and display an always up-to-date ERC20 balance to the user :
```html
<script setup>
import { dapp } from "tulipe";

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

### Final words
Tulipe offers a lot more things to makes safe DApp frontend development a real piece of cake.

You can find them all by reading [its documentations](https://tuli.pe/).

<br/>

## Contributions
See : [CONTRIBUTING](/CONTRIBUTING.md)
