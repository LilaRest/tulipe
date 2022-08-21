<script setup>
import { dapp } from "../index.js";
</script>

<template>
  <OnDappSafe>
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
          <li>dapp : {{ dapp.status.get() }}</li>
          <li>provider : {{ dapp.provider.status.get() }}</li>
          <li>signer : {{ dapp.signer.status.get() }}</li>
          <li>contracts : {{ dapp.contracts.status.get() }}</li>
          <li v-for="(contract, contractName) of dapp.contracts.getAll()">
            contract {{ contractName }} : {{ contract.status.get() }}
          </li>
        </ul>
      </div>
    </section>
  </OnDappSafe>
</template>

<style scoped>
section {
  background-color: darkslategray;
  color: whitesmoke;
  display: flex;
  justify-content: space-around;
}
</style>
