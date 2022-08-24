<script setup>
import { dapp, EventInteractor } from "../../index.js";
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
    <div class="EventsInteractor">
      <ul>
        <li v-for="(event, eventName) of contract.interface.events">
          <EventInteractor :contract="props.contract" :event="eventName"/>
        </li>
      </ul>
    </div>
  </OnContractReadSafe>
</template>
