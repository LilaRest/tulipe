
<script setup>
import { dapp, ConnectWalletButton } from "vuethers";
</script>

<DemoCreator>
  <h1>My DApp</h1>
  <dapp.OnSafe>
    <ConnectWalletButton/>
  </dapp.OnSafe>
  <dapp.signer.OnSafe>
    <template #safe>
      <p>A wallet is connected !</p>
      <p>Its address is : '{{ dapp.signer.address.value }}'</p>
    </template>
    <template #unsafe>
      <p>No wallet connected yet.</p>
    </template>
  </dapp.signer.OnSafe>
</DemoCreator>
