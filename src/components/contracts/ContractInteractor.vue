<script setup>
import { dapp, MethodsInteractor, EventsInteractor } from "../../index.js";

const props = defineProps({
  contract: {
    type: String,
    required: true
  }
})

const contract = dapp.contracts[props.contract]
let owner = $ref("not owned")

dapp.contracts[props.contract].onReadSafe(async function () {
  // Retrieve the owner's address if there is one.
  try {
    owner = await contract.owner()
  }
  catch (e) {}
})
</script>

<template>
  <OnContractReadSafe :contract="props.contract">
    <div class="ContractInteractor">
      <ul>
        <li>Address : {{ contract.address }}</li>
        <li>Owner : {{ owner }}</li>
        <li>
          Methods :
          <br/>
          <MethodsInteractor :contract="props.contract"/>
        </li>
        <li>
          Events :
          <br/>
          <EventsInteractor :contract="props.contract"/>
        </li>
      </ul>
    </div>
  </OnContractReadSafe>
</template>
