import { Wallet } from "./wallet.js";
import { ethers } from "ethers";
import { WalletConnectionRejected } from "./errors.js";
import { dapp } from "../../index.js";

export class Eip1193Wallet extends Wallet {

  constructor (id, exposedObject=null) {
    super(id);
    this.exposedObject = exposedObject;
  }

  async isConnected () {
    if (this.exposedObject) {
      const signer = this.getSigner();
      if (signer) {
        try {
          const accounts = await this.exposedObject.request({ method: 'eth_accounts' })
          if (accounts && accounts.length > 0) {
            console.log(accounts)
            return true;
          }
        }
        catch (e) {}
      }
    }
    return false;
  }

  getProvider () {
    if (this.exposedObject) {
      const ethersProvider = new ethers.providers.Web3Provider(this.exposedObject, "any")
      return ethersProvider
    }
    return null
  }

  async getSigner () {
    if (this.exposedObject) {
      const provider = this.getProvider();
      if (provider) {
        const signer = await provider.getSigner();
        return signer
      }
    }
    return null
  }

  async connect (lazy=false) {
    if (this.exposedObject) {

      // If signer is already accessible or if lazy, returns
      if (await this.isConnected() || lazy) {
        return;
      }

      // Else, request the wallet for a signer.
      try {
        await this.exposedObject.request({ method: 'eth_requestAccounts' })
      }
      catch (e) {
        if (e.code === 4001) {
          throw new WalletConnectionRejected(this.id);
        }
        else {
          throw e
        }
      }
    }
    throw "exposedObject not available"
  }


  async addNetwork (id) {
    const networkConfig = dapp.config.networks.getById(id);

    await this.exposedObject.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: id,
          rpcUrls: [networkConfig.defaultRPC],
          chainName: networkConfig.name,
          nativeCurrency: {
              name: networkConfig.currency.symbol,
              symbol: networkConfig.currency.symbol,
              decimals: networkConfig.currency.decimals
          },
          blockExplorerUrls: networkConfig.explorer && networkConfig.explorer.url !== "" ? [networkConfig.explorer.url] : null,
      }]
    });
  }

  async changeNetwork (id, lazy=false) {
    const networkConfig = dapp.config.networks.getById(id);

    if (networkConfig) {
      id = ethers.utils.hexlify(parseInt(id)).toString()
      id = ethers.utils.hexValue(id)

      try {
        await this.exposedObject.request({
          method: "wallet_switchEthereumChain",
          params: [{
            chainId: id,
          }]
        });
      }
      catch (e) {

        // If the user don't have the network, add it.
        if (e.code === 4902) {
          this.addNetwork(id)
        }
        else {
          throw e
        }
      }
    }
  }

}
