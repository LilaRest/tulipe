---
title: Safers ~ Provider
layout: doc
---

# Provider safety

In cases ...
- your DApp is not initialized yet
- or if it is not connected to any network
- or if the connected network is not in the networks you've configured

... using the `dapp.provider` instance is considered unsafe since it is simply unavailable or can lead to errors and/or unexpected behaviors.

So Vuethers provides developers with many safers that allows you to easily write safe code when your are using the `dapp.provider` object, here are them.

## In scripts

To make a piece of code that use the `dapp.provider` instance safe in scripts you can use the `onSafe()` method of the `dapp.provider` object :
```js
import { dapp } from "vuethers";

dapp.provider.onSafe(() => {
  // Code here will be executed only when the dapp.provider is safe to use.
})
```

And if at some point in your code you have to test if the `dapp.provider` object is safe, you can use the `isSafe` computed property of the `dapp.provider` object :
```js
import { dapp } from "vuethers";

if (dapp.provider.isSafe.value) {
  console.log("The DApp provider is safe !")
}
```


## In templates
To make a part of a template that use the `dapp.provider` object safe, you can wrap it in the `OnSafe` component of the `dapp.provider` object :
```html
<template>
  <dapp.provider.OnSafe>
    <p>If I'm rendered is that the DApp provider is safe to use</p>
  </dapp.provider.OnSafe>
</template>
```

And if you want to define a content to render when the DApp provider is unsafe and a content to render when the DApp provider is safe you can use the `#safe` and `#unsafe` slots of the component :
```html
<template>
  <dapp.provider.OnSafe>
    <template #safe>
      <p>If I'm rendered is that the DApp provider is safe to use</p>
    </template>
    <template #unsafe>
      <p>If I'm rendered is that the DApp provider is NOT safe to use</p>
    </template>
  </dapp.provider.OnSafe>
</template>
```
