# Minimal DApp setup

## The `App.vue` component
Like in any Vue app we firstly have to create a `App.vue` component in the `src/` folder of our project.
Here is a minimalist DApp component that simply displays a "Connect Wallet" button and displays some infos depending on the wallet connection status.
```html
<script setup>
import { dapp, ConnectWalletButton } from "vuethers";
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

Here is a minimal `main.js` file to create a Vuethers project.
```js{3,4,8-11}
import { createApp } from "vue";
import App from "./App.vue";
import { initVuethers } from "vuethers";
import { vuethersConfig } from "./vuethers.config.js";

const app = createApp(App)

app.use(initVuethers, {
  config: vuethersConfig,
  start: () => app.mount("#app"),
})
```

You may notice that usually `app.mount("#app")` is called at the end of the `main.js` file, outside of any function.

While Vuethers has to initialize many things before the app is mounted, we directly give `app.mount("#app")` to it and it will call it at the right moment.

You can learn more about this behavior in the [Setup in-depth](/guide/in-depth/setup.md) page of this documentation.

## Run the DApp
Finally you can run the DApp like any Vue project with :
```bash
npm run dev
```
You're frontend should now be accessible at : http://localhost:5173/

You can try to connect your Metamask web wallet if you have one, by clicking the "Connect wallet" button.

**Result**

<DemoFrame src="./minimal-dapp-setup-demo.html" height="200px"/>
