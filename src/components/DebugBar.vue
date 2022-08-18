<script setup>
import { isDAppSafe, isNetworkSafe, isWalletSafe, areContractsSafe, dapp } from "../index.js";
</script>

<template v-if="isDAppSafe">
  <section>
    <div>
      <h3>Safe Runners</h3>
      <ul>
        <li>DApp safe : {{ isDAppSafe }}</li>
        <li>Network safe : {{ isNetworkSafe }}</li>
        <li>Wallet safe : {{ isWalletSafe }}</li>
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
