---
title: Get started ~ Setup your DApp
layout: doc
---

# Setup your DApp
Now you have created a [minimalist configurations](/guide/get-started/minimal-configuration) file, you can start creating a simple DApp by following the below headings.


## The `App.vue` component
Like in any Vue app we firstly have to create a `App.vue` component in the `src/` folder of our project.
Here is a minimalist DApp component that simply displays a "Connect Wallet" button and displays some infos depending on the wallet connection status.
```html
<script setup>
import { dapp, ConnectWalletButton } from "tulipe";
</script>

<template>
  <h1>My DApp</h1>
  <dapp.OnSafe>
    <ConnectWalletButton/>
  </dapp.OnSafe>
  <dapp.signer.OnSafe>
    <template #safe>
      <p>A wallet is connected !</p>
      <p>Its address is : '{{ dapp.signer.address.value }}'</p>
    </template>
    <template #unsafe>
      <p>No wallet connected yet.</p>
    </template>
  </dapp.signer.OnSafe>
</template>
```
Here are some explanations :
- When the is DApp is safe (successfuly initialized) displays a `ConnectWalletButton`
- When the signer is safe (a wallet is connected) displays a message and the address of the connected wallet
- Else displays : "No wallet connected yet."

## The `main.js` file
A view app also requires a `main.js` file from which the app will be created and the `App.vue` component mounted.
This file is also usually created in the `src/` folder.

Here is a minimal `main.js` file to create a Tulipe project.
```js{3,4,8-11}
import { createApp } from "vue";
import App from "./App.vue";
import { initTulipe } from "tulipe";
import { tulipeConfig } from "./tulipe.config.js";

const app = createApp(App)

await initTulipe(app, tulipeConfig)

app.mount("#app")
```

The `initTulipe()` function takes the `app` object as first argument and an optional `tulipeConfig` which contains the object exported from `tulipe.config.js`.

## Run the DApp
Finally you can run the DApp like any Vue project with :
```bash
npm run dev
```
You're frontend should now be accessible at : `http://localhost:5173/`


You can try to connect your Metamask web wallet if you have one, by clicking the "Connect wallet" button.

**Result**
<ClientOnly>
  <VEDemoFrame src="./demo/setup-your-dapp.html" height="200px"/>
</ClientOnly>
