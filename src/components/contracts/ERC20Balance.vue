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
  if (!dapp.signer.status.is("CONNECTED") && !props.walletAddress) {
    dapp.signer.status.watch("CONNECTED", fetchDatas);
  }
  else {
    fetchDatas();
  }
})
</script>

<template>
  <OnSignerSafe>
    <p class="ERC20Balance" v-if="dapp.signer.status.is('CONNECTED')">{{ balance }} {{ symbol }}</p>
  </OnSignerSafe>
</template>
