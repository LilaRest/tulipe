import { dapp } from "../index.js";

export async function connectWallet(lazy=false) {
  if (!dapp.provider.isSafe.value) {
    dapp.status.signer.set("NOPROVIDER");
  }

  dapp.provider.onSafe(async function () { 
    if (!dapp.signer.isSafe.value) {

      try {
        const signer = await dapp.provider.getSigner();
        await signer.getAddress()
        dapp.signer.proxy.setEthersObject(signer);
        dapp.status.signer.set("CONNECTED");
      }
      catch (e) {
        
        // If lazy simply mark the wallet as DISCONNECTED
        if (lazy === true) {
          dapp.status.signer.set("DISCONNECTED")
        }

        // Else request user's web wallet for a connection.
        else {

          try {
            dapp.status.signer.set("REQUESTED");
            await dapp.provider.send("eth_requestAccounts", []);
            const signer = await dapp.provider.getSigner();
            await signer.getAddress()
            dapp.signer.proxy.setEthersObject(signer);
            dapp.status.signer.set("CONNECTED");
          }
          catch (e) {
            console.log(e)
            if (e.code === 4001) {
              dapp.status.signer.set("REFUSED");
            }
            else {
              dapp.status.signer.set("ERROR");
            }
          }
        }
      }
    }
  })
}

export function disconnectWallet() {
  dapp.signer.proxy.setEthersObject(null);
  dapp.status.signer.set("DISCONNECTED")
}

