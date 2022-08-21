import { dapp } from "../index.js";
import { watch } from "vue";

export default async function initContracts () {

  dapp.provider.onSafe(async function () {

    if (dapp.provider.status.is("WRONG")) {
      for (const [contractName, contract] of dapp.contracts.getAll()) {
        contract.status.set("WRONG_NETWORK");
      }
      dapp.contracts.status.set("WRONG_NETWORK");
      return;
    }

    const providerConfig = await dapp.config.providers.getCurrent()
    const initializedContracts = []
  
    // Initialize contracts
    for (const [contractName, contractConfig] of Object.entries(providerConfig.contracts)) {
      dapp.contracts.add(contractName, contractConfig.address, contractConfig.abi)
      initializedContracts.push(contractName);

    }

    // Update contracts status.
    for (const [contractName, contract] of Object.entries(dapp.contracts.getAll())) {
      if (initializedContracts.includes(contractName)) {
        contract.status.set("INITIALIZED");
      }
      else {
        contract.status.set("WRONG_NETWORK");
      }
    }

    watch ([dapp.signer.isSafe], (newValue, oldValue) => {
      console.log("Refresh contracts !")
      if (newValue !== oldValue) {
        for (const contractName of initializedContracts) {
          const name = contractName;
          const address = dapp.contracts[contractName].address;
          const abi = dapp.contracts[contractName].interface.format("json");

          // Here the contract are removed and then recreated in order to fully destroy the old signer and providers.
          // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
          dapp.contracts[contractName].proxy.setEthersObject(null);
          try {
            dapp.contracts.add(name, address, abi)
          }
          catch (e) {
            console.log(e)
            dapp.contracts.status.set("ERROR");
            break;
          }
        }
      }
    })
    dapp.contracts.status.set("INITIALIZED")
  })
}
