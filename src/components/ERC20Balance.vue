<script setup>
import { dapp, safeRun, watchChainRef } from "../index.js";
const props = defineProps({
  contractName: {
    type: String,
    required: true
  },
  walletAddress: {
    type: String,
    required: false,
  }
})

let balance = $ref(0);
let symbol = $ref(null);

async function fetchDatas () {
  const walletAddress = props.walletAddress ? props.walletAddress : await dapp.signer.getAddress()
  balance = watchChainRef(dapp.contracts[props.contractName], "balanceOf", [walletAddress]);
  symbol = dapp.contracts[props.contractName].symbol();    
}

safeRun(() => {
  if (!dapp.status.signer.is("CONNECTED") && !props.walletAddress) {
    dapp.status.signer.watch("CONNECTED", fetchDatas);
  }
  else {
    fetchDatas();
  }
})
</script>

<template>
  <template v-if="dapp.signer.isSafe.value">
    <p class="ERC20Balance" v-if="dapp.status.signer.is('CONNECTED')">{{ balance }} {{ symbol }}</p>
  </template>
</template>
