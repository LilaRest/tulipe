<script setup>
import { isDappSafe, isProviderSafe, isSignerSafe, areContractsSafe, dapp } from "../index.js";
</script>

<template v-if="isDappSafe">
  <section>
    <div>
      <h3>Safe Runners</h3>
      <ul>
        <li>DApp safe : {{ isDappSafe }}</li>
        <li>Network safe : {{ isProviderSafe }}</li>
        <li>Wallet safe : {{ isSignerSafe }}</li>
        <li>Contracts safe : {{ areContractsSafe }}</li>
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

<style scoped>
section {
  background-color: darkslategray;
  color: whitesmoke;
  display: flex;
  justify-content: space-around;
}
</style>
