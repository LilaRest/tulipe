<script setup>
import { useDappStore } from "../stores/dapp.js";
//import { $ref } from "vue/macros";

//console.log($ref)
//const abc = $ref(1)

const dapp = useDappStore();

async function isConnected () {
  try {
    await dapp.signer.getAddress();
    dapp.status.wallet.setToConnected()
    return true
  }
  catch {
    return false
  }
}
await isConnected()

async function connectWallet() {
  if (!await isConnected()) {

    try {
      dapp.status.wallet.setToConnectionRequested()
      await dapp.provider.send("eth_requestAccounts", []);
      dapp.signer = dapp.provider.getSigner();
      dapp.status.wallet.setToConnected();
      
      // Connect the new signer to all DApp's contracts.
      for (const [contractName, contract] of Object.entries(dapp.contracts)) {
        dapp.contracts[contractName] = await contract.connect(dapp.signer)
      }
    }
    catch (e) {
      if (e.code === 4001) {
        dapp.status.wallet.setToConnectionRefused()
      }
      else {
        dapp.status.wallet.setToError()
      }
    }
  }
}

function disconnectWallet() {
  dapp.status.wallet.setToDisconnected()
}
</script>

<template>
  <div class="ConnectWalletButton">
      <button @click="connectWallet" v-if="dapp.status.wallet.status == 'disconnected'">Connect Wallet</button>
      <button v-else-if="dapp.status.wallet.status == 'connection-requested'" disabled>Connection requested...</button>
      <button v-else-if="dapp.status.wallet.status == 'connection-refused'" disabled>Connection refused!</button>
      <button v-else-if="dapp.status.wallet.status == 'connection-error'" disabled>Connection error!</button>
      <button v-else-if="dapp.status.wallet.status == 'wrong-network'" disabled>Wrong network! ({{ dapp.networks.current.displayName }})</button>
      <button @click="disconnectWallet" v-else-if="dapp.status.wallet.status == 'connected'">Disconnect</button>
  </div>
</template>

