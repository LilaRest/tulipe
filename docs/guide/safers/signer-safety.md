---
title: Safers ~ Safety
layout: doc
---

# Signer safety

If cases ...
- your DApp is not initialized yet
- or if it is not connected to any wallet
- or if the connected wallet is not in the wallets you've configured

... using the `dapp.signer` instance is considered unsafe since it is simply unavailable or can lead to errors and/or unexpected behaviors.

So Vuethers provides developers with many safers that allows you to easily write safe code when your are using the `dapp.signer` object, here are them.

## In scripts

To make a piece of code that use the `dapp.signer` instance safe in scripts you can use the `onSafe()` method of the `dapp.signer` object :
```js
import { dapp } from "vuethers";

dapp.signer.onSafe(() => {
  // Code here will be executed only when the dapp.signer is safe to use.
})
```

And if at some point in your code you have to test if the `dapp.signer` object is safe, you can use the `isSafe` computed property of the `dapp.signer` object :
```js
import { dapp } from "vuethers";

if (dapp.signer.isSafe.value) {
  console.log("The DApp signer is safe !")
}
```


## In templates
To make a part of a template that use the `dapp.signer` object safe, you can wrap it in the `OnSafe` component of the `dapp.signer` object :
```html
<template>
  <dapp.signer.OnSafe>
    <p>If I'm rendered is that the DApp signer is safe to use</p>
  </dapp.signer.OnSafe>
</template>
```

And if you want to define a content to render when the DApp signer is unsafe and a content to render when the DApp signer is safe you can use the `#safe` and `#unsafe` slots of the component :
```html
<template>
  <dapp.signer.OnSafe>
    <template #safe>
      <p>If I'm rendered is that the DApp signer is safe to use</p>
    </template>
    <template #unsafe>
      <p>If I'm rendered is that the DApp signer is NOT safe to use</p>
    </template>
  </dapp.signer.OnSafe>
</template>
```
