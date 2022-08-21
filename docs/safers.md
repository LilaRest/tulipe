## Context safety
When a Vuethers' DApp loads, it firstly perform some asynchronous calls in order to fetch the on-chain datas required by the DApp.
In addition, it performs many others operations like the initialization of the global store, the connection attempt to user's web wallet, etc.

Accessing and/or mutating the DApp's datas before all that initialization stuff has ended is considered unsafe, this can lead to many unexpected behaviors and errors.
Vuethers comes with two useful tools that allows any developer to easily delay the part of its DApp that access critical datas when initialization has finished. 

### `dapp.safe`
Vuethers exposes a stateful variable at `dapp.safe` that contains a boolean value indicating if yes (true) or not (false) the DApp is successfuly initialized, and so if it's 'safe' to access / mutate its datas. 
Here is an example of `dapp.safe` usage in a SFC :
```js
<script setup>
import { dapp } from "vuethers";
import { watch } from "vue";

let userAddress = $ref("");
let userBalance = $ref(0);

async function getDatas() {
    userAddress = await dapp.signer.getAddress();
    userBalance = await dapp.contracts.MyToken.balanceOf(signerAddress);
}

if (dapp.safe) {
    await getDatas();
}
else {
    const unwatch = watch(() => dapp.safe, async function () {
        await getDatas();
        unwatch();
    })
}

</script>

<template>
    <template v-if="dapp.safe">
	<p>Your address: {{ userAddress }}</p>
	<p>Your balance: {{ userBalance }}</p>
    </template>
	
    <template v-else>
        <p>Loading...</p>
    <template>
</template>
```
In that example :
- `<script>` part : if the DApp is safe we directly retrieve datas, else we use a watcher in order to retrieve datas when the DApp will have finished its initialization.
- `<template>` part : if the DApp is safe we display the user's address and balance, else we display a loader until the DApp is initialized.

As you can see it, if the syntax is pretty neat and readable in the `<template>` part, in the `<script>` part being safe implies many additional lines of codes that makes this very simple program hard to read.
Read the next section to learn about the `safeRun()` method that prevents this overhead and makes life easier for developers.

### `safeRun()`
As seen in the previous section, developers can ensure their code is safe by using the `dapp.safe` state. However we have also seen that using `dapp.safe` implies a lot of overhead in the `<script>` section of components (SFCs).
Vuethers introduces a `safeRun()` method that prevents all this overhead.
`safeRun()` takes a sync or async function as single argument, any code in that function will be safely run.

Look at how the code of the example in the previous' section can be rewritten with `safeRun()` to makes code much more shorter and cleaner :
```js
<script setup>
import { dapp, safeRun } from "vuethers";

let userAddress = $ref("");
let userBalance = $ref(0);

safeRun(async function () {
    userAddress = await dapp.signer.getAddress();
    userBalance = await dapp.contracts.MyToken.balanceOf(signerAddress);
})
</script>

<template>
    <template v-if="dapp.safe">
        <p>Your address: {{ userAddress }}</p>
        <p>Your balance: {{ userBalance }}</p>
    </template>

    <template v-else> 
        <p>Loading...</p>
    <template>
</template>
```

Maybe you have noticed that the old `getDatas()` method has simply been wrapped into `safeRun()` and all the codes that previously followed the `getDatas()` has simply been removed.
All the `dapp.safe` check and watch stuff is now automatically managed by `safeRun()`. 


### Vuethers' components and composables
Every Vuethers components and composables are natively safe.
This means that you can for example put a `<ConnectWalletButton/>` component anywhere in your app without having to ensure that the context is safe :
```js
<script setup>
import { ConnectWalletButton } from "vuethers";
</script>

<template>
    <header>
	<ConnectWalletButton/>     <!-- THIS IS SAFE -->
    </header>
</template>
```

However you can still use `dapp.safe` in order to display a clean loader for example :
```js
<script setup>
import { ConnectWalletButton } from "vuethers";
</script>

<template>
    <header v-if="dapp.safe">
        <ConnectWalletButton/>     <!-- THIS IS SAFE -->
    </header>
    <header v-else>
	<p>The app is loading...</p>
    </header>
</template>
```

### Order of safers execution

dapp.isSafe = dapp is successfuly initialized 
dapp.provider.isSafe = dapp.isSafe + dapp connected to a provider (don't means it's a right one)
dapp.signer.isSafe = dapp.provider.isSafe + dapp connected to a wallet (a signer is available)
dapp.contracts.<contract>.isReadSafe = dapp.provider.isSafe + contract successfuly initialized
dapp.contracts.<contract>.isWriteSafe = dapp.signer.isSafe + contract successfuly initialized
dapp.contracts.areReadSafe = dapp.provider.isSafe + all contracts successfuly initialized
dapp.contracts.areWriteSafe = dapp.signer.isSafe + all contracts successfuly initialized
