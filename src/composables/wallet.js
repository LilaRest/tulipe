import { dapp, isProviderSafe } from "../index.js";

export async function connectWallet(lazy=false) {
  if (isProviderSafe) { 

    if (dapp.status.wallet.is("DISCONNECTED")) {

      try {
        const signer = await dapp.provider.getSigner();
        await signer.getAddress()
        dapp.signer = signer;
        dapp.status.wallet.set("CONNECTED");
      }
      catch (e) {
        console.log("ERROOOOOOR")
        
        // If lazy simply mark the wallet as DISCONNECTED
        if (lazy === true) {
          dapp.status.wallet.set("DISCONNECTED")
        }

        // Else request user's web wallet for a connection.
        else {

          try {
            dapp.status.wallet.set("REQUESTED");
            await dapp.provider.send("eth_requestAccounts", []);
            const signer = await dapp.provider.getSigner();
            await signer.getAddress()
            dapp.signer = signer;
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
    }
  }
  else {
    dapp.status.wallet.set("NOPROVIDER");
  }
}

export function disconnectWallet() {
  console.log(dapp.provider)
  dapp.signer = null;
  dapp.status.wallet.set("DISCONNECTED")
}

