<script setup>
import { dapp } from "../index.js";

async function isConnected () {
  try {
    await dapp.signer.getAddress();
    dapp.status.wallet.set("CONNECTED");
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
      dapp.status.wallet.set("REQUESTED");
      await dapp.provider.send("eth_requestAccounts", []);
      dapp.signer = dapp.provider.getSigner();
      dapp.status.wallet.set("CONNECTED");
      
      // Connect the new signer to all DApp's contracts.
      for (const [contractName, contract] of Object.entries(dapp.contracts)) {
        dapp.contracts[contractName] = await contract.connect(dapp.signer)
      }
    }
    catch (e) {
      if (e.code === 4001) {
        dapp.status.wallet.set("REFUSED");
      }
      else {
        dapp.status.wallet.set("ERROR");
      }
    }
  }
}

function disconnectWallet() {
  dapp.status.wallet.set("DISCONNECTED")
}
</script>

<template>
  <div class="ConnectWalletButton">
      <button @click="connectWallet" v-if="dapp.status.wallet.is('DISCONNECTED')">Connect Wallet</button>
      <button v-else-if="dapp.status.wallet.is('REQUESTED')" disabled>Connection requested...</button>
      <button v-else-if="dapp.status.wallet.is('REFUSED')" disabled>Connection refused!</button>
      <button v-else-if="dapp.status.wallet.is('ERROR')" disabled>Connection error!</button>
      <button v-else-if="dapp.status.network.is('WRONG')" disabled>Wrong network! ({{ dapp.networks.current.displayName }})</button>
      <button @click="disconnectWallet" v-else-if="dapp.status.wallet.is('CONNECTED')">Disconnect</button>
  </div>
</template>

