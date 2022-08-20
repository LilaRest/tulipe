import { connectWallet, dapp } from "../index.js";

export default async function initSigner () {
  if (!dapp.status.provider.is("DISCONNECTED")) {
    await connectWallet(true);
  }
}

