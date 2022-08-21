import { dapp } from "../index.js";

export async function connectWallet(lazy=false) {
  if (!dapp.provider.isSafe.value) {
    dapp.signer.status.set("NOPROVIDER");
  }

  dapp.provider.onSafe(async function () {
    if (!dapp.signer.isSafe.value) {

      try {
        const signer = await dapp.provider.getSigner();
        await signer.getAddress()
        dapp.signer.proxy.setEthersObject(signer);
        dapp.signer.status.set("CONNECTED");
      }
      catch (e) {

        // If lazy simply mark the wallet as DISCONNECTED
        if (lazy === true) {
          dapp.signer.status.set("DISCONNECTED")
        }

        // Else request user's web wallet for a connection.
        else {

          try {
            dapp.signer.status.set("REQUESTED");
            await dapp.provider.send("eth_requestAccounts", []);
            const signer = await dapp.provider.getSigner();
            await signer.getAddress()
            dapp.signer.proxy.setEthersObject(signer);
            dapp.signer.status.set("CONNECTED");
          }
          catch (e) {
            console.log(e)
            if (e.code === 4001) {
              dapp.signer.status.set("REFUSED");
            }
            else {
              dapp.signer.status.set("ERROR");
            }
          }
        }
      }
    }
  })
}

export function disconnectWallet() {
  dapp.signer.proxy.setEthersObject(null);
  dapp.signer.status.set("DISCONNECTED")
}
