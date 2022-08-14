<script setup>
import ContractInteractor from "./_ContractInteractor.vue"

const props = defineProps({
  contractName: {
    type: String,
    required: true
  }
})

</script>

<template>
  <Suspense>
    <ContractInteractor :contractName="props.contractName"/>
  </Suspense>
</template>
