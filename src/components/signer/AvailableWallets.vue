<script setup>
import { dapp } from "../../index.js";
</script>

<template>
  <OnDappSafe>
    <p>Available wallets :</p>
    <ul>
      <li v-for="wallet of dapp.wallets">
        {{ wallet.name }}
      </li>
    </ul>
  </OnDappSafe>
</template>

