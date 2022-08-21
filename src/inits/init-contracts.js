import { dapp } from "../index.js";
import { watch } from "vue";

export default async function initContracts () {

  dapp.provider.onSafe(async function () {
    const networkConfig = await dapp.config.networks.getCurrent()

    if (networkConfig) {
      // Initialize all the contracts for the current network.
      for (const [name, contract] of Object.entries(networkConfig.contracts)) {
        dapp.contracts.add(name, contract.address, contract.abi)
      }

    watch ([dapp.signer.isSafe, dapp.provider.isSafe], (newValue, oldValue) => {
      console.log("Refresh contracts !")
      if (newValue !== oldValue) {
        for (const [contractName, contract] of Object.entries(dapp.contracts.getAll())) {
          const name = contractName;
          const address = contract.address;
          const abi = contract.interface.format("json");

          // Here the contract are removed and then recreated in order to fully destroy the old signer and providers.
          // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
          dapp.contracts.remove(contractName);
          try {
            dapp.contracts.add(name, address, abi)
          }
          catch (e) {
            console.log(e)
            dapp.contracts.status.set("NOPROVIDER");
            break;
          }
        }
      }
    })

      dapp.contracts.status.set("INITIALIZED")
    }
    else {
      dapp.contracts.status.set("NOPROVIDER")
    }
  })
}
