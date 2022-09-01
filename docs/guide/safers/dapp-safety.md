---
title: Safers ~ DApp
layout: doc
---

# DApp safety

When you build a DApp with Tulipe, this one will perform many initialization operations before it starts and accessing the `dapp` object before a part of this initialization stuff has ended is considered unsafe and can lead to errors and/or unexpected behaviors.

So Tulipe provides developers with many safers that allows you to easily write safe code when your are using the `dapp` object, here are them.

## Strong defaults
Most of the Tulipe' components and some of its methods are DApp safe by default.
Here are the elements natively safe in Tulipe :
- TODO
```html
<script setup>
import { ConnectWalletButton } from "tulipe";
</script>

<template>
   <header>
     <ConnectWalletButton/>     <!-- THIS IS SAFE -->
   </header>
</template>
```

However you can still use safers in order to display a clean loader for example :
```html
<template>
  <dapp.OnSafe>
    <template #safe>
      <p>I'm the content !</p>
    </template>
    <template #unsafe>
      <p>Loading...</p>
      <MySpinner/>
    </template>
  </dapp.OnSafe>
</template>
```

For all others elements you must use safers wrappers in order to make your code safe, in the next heading you'll learn how to use them.


## In scripts

To make a piece of code that use the `dapp` object safe in scripts you can use the `onSafe()` method of the `dapp` object :
```js
import { dapp } from "tulipe";

dapp.onSafe(() => {
  // Code here will be executed only when the DApp is safe to use.
})
```

And if at some point in your code you have to test if the `dapp` object is safe, you can use the `isSafe` computed property of the `dapp` object :
```js
import { dapp } from "tulipe";

if (dapp.isSafe.value) {
  console.log("The DApp is safe !")
}
```


## In templates
To make a part of a template that use the `dapp` object safe, you can wrap it in the `OnSafe` component of the `dapp` object :
```html
<template>
  <dapp.OnSafe>
    <p>If I'm rendered is that the DApp is safe to use</p>
  </dapp.OnSafe>
</template>
```

And if you want to define a content to render when the DApp is unsafe and a content to render when the DApp is safe you can use the `#safe` and `#unsafe` slots of the component :
```html
<template>
  <dapp.OnSafe>
    <template #safe>
      <p>If I'm rendered is that the DApp is safe to use</p>
    </template>
    <template #unsafe>
      <p>If I'm rendered is that the DApp is NOT safe to use</p>
    </template>
  </dapp.OnSafe>
</template>
```
