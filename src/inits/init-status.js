import { dapp } from "../index.js";

export default async function initStatus() {

  dapp.status.add("network", [
    "DISCONNECTED",
    "WRONG",
    "UNKNOWN",
    "ERROR",
    "CONNECTED",
  ]),

  dapp.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "NOPROVIDER",
    "CONNECTED",
  ]),

  dapp.status.add("contracts", [
    "WAITING",
    "ERROR",
    "INITIALIZED",
  ]),


  // Set a timeout to the wallet status that falls to DISCONNECTED after a certain amount of time.
  dapp.status.wallet.watch(["REFUSED", "ERROR", "NOPROVIDER"], () => {
    setTimeout(() => {
      dapp.status.wallet.set("DISCONNECTED");
    }, 5000)
  })
}

