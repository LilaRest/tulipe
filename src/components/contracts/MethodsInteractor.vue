<script setup>
import { dapp, MethodInteractor } from "../../index.js";

const props = defineProps({
  contract: {
    type: String,
    required: true
  }
})

const contract = dapp.contracts[props.contract]
</script>

<template>
  <OnContractReadSafe :contract="props.contract">
    <div class="MethodsInteractor">
      <ul>
        <li v-for="(method, methodName) of contract.interface.functions">
          <MethodInteractor :contract="props.contract" :method="methodName"/>
        </li>
      </ul>
    </div>
  </OnContractReadSafe>
</template>
