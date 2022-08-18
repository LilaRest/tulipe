import { connectWallet, dapp } from "../index.js";

export default async function initSigner () {
  if (!dapp.status.network.is("DISCONNECTED")) {
    await connectWallet(true);
  }
}

