<script setup>
import { dapp, ConnectWalletButton } from "../../../../src/index.js"

</script>

<template>
  <h1>My DApp</h1>
  <dapp.OnSafe>
    <ConnectWalletButton/>
  </dapp.OnSafe>
</template>
