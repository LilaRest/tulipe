<script setup>
import { dapp } from "../index.js";
</script>

<template>
  <template v-if="dapp.isSafe.value">
    <section>
      <div>
        <h3>Safe Runners</h3>
        <ul>
          <li>DApp safe : {{ dapp.isSafe }}</li>
          <li>Network safe : {{ dapp.provider.isSafe }}</li>
          <li>Wallet safe : {{ dapp.signer.isSafe }}</li>
          <li>Contracts safe : {{ dapp.contracts.areSafe }}</li>
        </ul>
      </div>
      <div>
        <h3>Status</h3>
        <ul>
          <li v-for="(status, statusName) of dapp.status">
            {{ statusName }} : {{ status.get() }}
          </li>
        </ul>
      </div>
    </section>
  </template>
</template>

<style scoped>
section {
  background-color: darkslategray;
  color: whitesmoke;
  display: flex;
  justify-content: space-around;
}
</style>
