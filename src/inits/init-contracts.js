import { dapp, onNetworkSafe } from "../index.js";

export default async function initContracts () {

  onNetworkSafe(async function () {
    const networkConfig = await dapp.config.networks.getCurrent()
    
    if (networkConfig) {
      // Initialize all the contracts for the current network.
      for (const [name, contract] of Object.entries(networkConfig.contracts)) {
        dapp.contracts.add(name, contract.address, contract.abi)
      }
      dapp.status.contracts.set("INITIALIZED")
    }
    else {
      dapp.status.contracts.set("NOCONFIG")
    }
  })
}
