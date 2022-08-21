import { connectWallet, dapp } from "../index.js";

export default async function initSigner () {
  if (!dapp.provider.status.is("DISCONNECTED")) {
    await connectWallet(true);
  }
}

