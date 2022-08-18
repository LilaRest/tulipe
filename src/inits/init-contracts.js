import { dapp, onNetworkSafe, isWalletSafe, isNetworkSafe } from "../index.js";
import { watch } from "vue";

export default async function initContracts () {

  onNetworkSafe(async function () {
    const networkConfig = await dapp.config.networks.getCurrent()
    
    if (networkConfig) {
      // Initialize all the contracts for the current network.
      for (const [name, contract] of Object.entries(networkConfig.contracts)) {
        dapp.contracts.add(name, contract.address, contract.abi)
      }

    watch ([isWalletSafe, isNetworkSafe], (newValue, oldValue) => {
      console.log("Refresh contracts !")
      if (newValue !== oldValue) {
        for (const contractName of dapp.contracts._contracts) {
          const name = dapp.contracts[contractName].name;
          const address = dapp.contracts[contractName].address;
          const abi = dapp.contracts[contractName].abi;

          dapp.contracts.remove(contractName);
          try {
            dapp.contracts.add(name, address, abi)
          }
          catch (e) {
            dapp.status.contracts.set("NOPROVIDER");
            break;
          }
        }
      }
    })


      dapp.status.contracts.set("INITIALIZED")
    }
    else {
      dapp.status.contracts.set("NOPROVIDER")
    }
  })
}
