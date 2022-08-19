import { dapp, onProviderSafe, isSignerSafe, isProviderSafe } from "../index.js";
import { watch } from "vue";

export default async function initContracts () {

  onProviderSafe(async function () {
    const networkConfig = await dapp.config.networks.getCurrent()
    
    if (networkConfig) {
      // Initialize all the contracts for the current network.
      for (const [name, contract] of Object.entries(networkConfig.contracts)) {
        dapp.contracts.add(name, contract.address, contract.abi)
      }

    watch ([isSignerSafe, isProviderSafe], (newValue, oldValue) => {
      console.log("Refresh contracts !")
      if (newValue !== oldValue) {
        for (const contractName of dapp.contracts._contracts) {
          const name = dapp.contracts[contractName].name;
          const address = dapp.contracts[contractName].address;
          const abi = dapp.contracts[contractName].abi;

          // Here the contract are removed and then recreated in order to fully destroy the old signer and providers.
          // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
          dapp.contracts.remove(contractName);
          try {
            dapp.contracts.add(name, address, abi)
          }
          catch (e) {
            console.log(e)
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
