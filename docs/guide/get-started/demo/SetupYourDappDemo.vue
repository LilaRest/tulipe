<script setup>
import { dapp, ConnectWalletButton } from "tulipe";

const tulipeConfig = {
  networks: [
    {id: 1},
  ],
  wallets: [
    {name: "metamask"},
  ]
}
</script>

<template>
  <VEDemoCreator :config="tulipeConfig">
    <h1>My DApp</h1>
    <dapp.OnSafe>
      <dapp.provider.OnSafe>
        <template #safe>
          <ConnectWalletButton/>
          <dapp.signer.OnSafe>
            <template #safe>
              <p>A wallet is connected !</p>
              <p>Its address is : '{{ dapp.signer.address.value }}'</p>
            </template>
            <template #unsafe>
              <p>No wallet connected yet.</p>
            </template>
          </dapp.signer.OnSafe>
        </template>
        <template #unsafe>
          Cannot connect to Ethereum network, please check your Metamask.
        </template>
      </dapp.provider.OnSafe>
    </dapp.OnSafe>
  </VEDemoCreator>
</template>
