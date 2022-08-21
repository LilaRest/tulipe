import { connectWallet, dapp } from "../index.js";

export default async function initSigner () {
  dapp.provider.onSafe(async function () {
    await connectWallet(true);
  })
}

