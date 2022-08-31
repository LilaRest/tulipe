---
title: Safers ~ Contract
layout: doc
---


# Contract safety

In cases ...
- your DApp is not initialized yet
- or if it is neither connected to any wallet nor to any network
- or if the connected wallet or network is not in the ones you've configured

... using the `dapp.contracts.<contractName>` instance is considered unsafe since it is simply unavailable or can lead to errors and/or unexpected behaviors.

So Vuethers provides developers with many safers that allows you to easily write safe code when your are using a `dapp.contracts.<contractName>` object, here are them.

## In scripts

### Read
To make a piece of code that is safe when using a read method of a contract (a method that doesn't mutate any on-chain data), you can use the `onReadSafe()` method of the `dapp.contracts.<contractName>` object :
```js
import { dapp } from "vuethers";

dapp.contracts.MyContract.onReadSafe(() => {
  // Code here will be executed only when the dapp.contracts.MyContract is safe to read.
})
```

And if at some point in your code you have to test if the `dapp.contracts.<contractName>` object is safe to be read, you can use the `isReadSafe` computed property of the `dapp.contracts.<contractName>` object :
```js
import { dapp } from "vuethers";

if (dapp.contracts.MyContract.isReadSafe.value) {
  console.log("The DApp contract is read safe !")
}
```

### Write
To make a piece of code that is safe when using a write method of a contract (a method that doesn't mutate any on-chain data), you can use the `onWriteSafe()` method of the `dapp.contracts.<contractName>` object :
```js
import { dapp } from "vuethers";

dapp.contracts.MyContract.onWriteSafe(() => {
  // Code here will be executed only when the dapp.contracts.MyContract is safe to write.
})
```

And if at some point in your code you have to test if the `dapp.contracts.<contractName>` object is safe to be write, you can use the `isWriteSafe` computed property of the `dapp.contracts.<contractName>` object :
```js
import { dapp } from "vuethers";

if (dapp.contracts.MyContract.isWriteSafe.value) {
  console.log("The DApp contract is write safe !")
}
```


## In templates

### Read
To make a part of a template safe when using a read method of `dapp.contracts.<contractName>`, you can wrap it in the `OnReadSafe` component of the `dapp.contracts.<contractName>` object :
```html
<template>
  <dapp.contracts.MyContract.OnReadSafe>
    <p>If I'm rendered is that the DApp contract is safe to read</p>
  </dapp.contracts.MyContract.OnReadSafe>
</template>
```

And if you want to define a content to render when the DApp contract is unsafe to be read and a content to render when the DApp contract is safe to be read you can use the `#safe` and `#unsafe` slots of the component :
```html
<template>
  <dapp.contracts.MyContract.OnReadSafe>
    <template #safe>
      <p>If I'm rendered is that the DApp contract is safe to read</p>
    </template>
    <template #unsafe>
      <p>If I'm rendered is that the DApp contract is NOT safe to read</p>
    </template>
  </dapp.contracts.MyContract.OnReadSafe>
</template>
```

### Write
To make a part of a template safe when using a write method of `dapp.contracts.<contractName>`, you can wrap it in the `OnWriteSafe` component of the `dapp.contracts.<contractName>` object :
```html
<template>
  <dapp.contracts.MyContract.OnWriteSafe>
    <p>If I'm rendered is that the DApp contract is safe to write</p>
  </dapp.contracts.MyContract.OnWriteSafe>
</template>
```

And if you want to define a content to render when the DApp contract is unsafe to be write and a content to render when the DApp contract is safe to be write you can use the `#safe` and `#unsafe` slots of the component :
```html
<template>
  <dapp.contracts.MyContract.OnWriteSafe>
    <template #safe>
      <p>If I'm rendered is that the DApp contract is safe to write</p>
    </template>
    <template #unsafe>
      <p>If I'm rendered is that the DApp contract is NOT safe to write</p>
    </template>
  </dapp.contracts.MyContract.OnWriteSafe>
</template>
```
