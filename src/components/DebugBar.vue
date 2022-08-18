<script setup>
import { isDAppSafe, isNetworkSafe, isWalletSafe, areContractsSafe } from "../index.js";
</script>

<template>
  <ul>
    <li>DApp safe : {{ isDAppSafe }}</li>
    <li>Network safe : {{ isNetworkSafe }}</li>
    <li>Wallet safe : {{ isWalletSafe }}</li>
    <li>Contracts safe : {{ areContractsSafe }}</li>
  </ul>
</template>

<style scoped>
ul {
  background-color: darkslategray;
  color: whitesmoke;
}
</style>
