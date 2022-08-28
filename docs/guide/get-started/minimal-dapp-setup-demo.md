
<script setup>
import DemoCreator from "../../.vitepress/theme/components/DemoCreator.vue";
import { dapp, ConnectWalletButton } from "vuethers";
</script>

<DemoCreator>
  <h1>My DApp</h1>
  <dapp.OnSafe>
    <ConnectWalletButton/>
  </dapp.OnSafe>
</DemoCreator>
