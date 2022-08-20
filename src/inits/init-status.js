import { dapp } from "../dapp.js";

export default async function initStatus() {

  dapp.status.add("provider", [
    "DISCONNECTED",
    "WRONG",
    "UNKNOWN",
    "ERROR",
    "CONNECTED",
  ]),

  dapp.status.add("signer", [
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
    "NOPROVIDER",
    "INITIALIZED",
  ]),

  // Set a timeout to the wallet status that falls to DISCONNECTED after a certain amount of time.
  dapp.status.signer.watch(["REFUSED", "ERROR", "NOPROVIDER"], () => {
    setTimeout(() => {
      dapp.status.signer.set("DISCONNECTED");
    }, 5000)
  })
}
