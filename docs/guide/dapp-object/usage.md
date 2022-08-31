---
title: DApp object ~ Usage
layout: doc
---

# Usage

The `dapp` object is **available anywhere** in your Vue project.

It is **always safe to be accessed** (but not to be used, see [Safers](/guide/safers/intuition)).

The below headings will show you how to access it from different contexts :

## From Javascript

### Using the Composition API
If your are using the Vue's [Composition API](https://vuejs.org/guide/introduction.html#composition-api) you can access the `dapp` object with a simple `import` statement :
```js
import { dapp } from "vuethers";

function getSignerAddress() {
  return dapp.signer.address
}
```

### Using the Options API
If your are using the Vue's [Options API](https://vuejs.org/guide/introduction.html#options-api) you can access the `dapp` object without import at `this.dapp` :
```js
export default {
  methods: {
    getSignerAddress() {
      return this.dapp.signer.address
    }
  },
}
```

However you can still import the `dapp` object explicitly if your prefer :
```js
import { dapp } from "vuethers";

export default {
  methods: {
    getSignerAddress() {
      return dapp.signer.address
    }
  },
}
```

## From templates
In template you can access the `dapp` object without any imports as it has been registered as Vue's [`globalProperties`](https://vuejs.org/api/application.html#app-config-globalproperties) :
```html
<template>
  <dapp.signer.OnSafe>
    <p>Wallet address : {{ dapp.signer.address }}</p>
  </dapp.signer.OnSafe>
</template>
```

Again, if you prefer, you can still import it explicitly in `<script>` :
```html
<script setup>
import { dapp } from "vuethers";
</script>

<template>
  <dapp.signer.OnSafe>
    <p>Wallet address : {{ dapp.signer.address }}</p>
  </dapp.signer.OnSafe>
</template>
```
