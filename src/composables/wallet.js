export async function isConnected () {
  try {
    await dapp.signer.getAddress();
    dapp.status.wallet.set("CONNECTED");
    return true
  }
  catch {
    return false
  }
}

export async function connectWallet() {
  if (!await isConnected()) {

    try {
      dapp.status.wallet.set("REQUESTED");
      await dapp.provider.send("eth_requestAccounts", []);
      dapp.signer = dapp.provider.getSigner();
      dapp.status.wallet.set("CONNECTED");
    }
    catch (e) {
      console.log(e)
      if (e.code === 4001) {
        dapp.status.wallet.set("REFUSED");
      }
      else {
        dapp.status.wallet.set("ERROR");
      }
    }
  }
}

export function disconnectWallet() {
  dapp.status.wallet.set("DISCONNECTED")
}

