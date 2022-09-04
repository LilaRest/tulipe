import { Wallet } from "./wallet.js";
import { ethers } from "ethers";
import { WalletConnectionRejected } from "./errors.js";
import { dapp } from "../../index.js";

export class Eip1193Wallet extends Wallet {

  constructor (id, exposedObject=null) {
    super(id);
    this.exposedObject = exposedObject;
    this.provider = this.getProvider();
    this.signer = this.getSigner();
  }

  getProvider () {
    if (this.exposedObject) {
      const ethersProvider = new ethers.providers.Web3Provider(this.exposedObject, "any")
      return ethersProvider
    }
    return null
  }

  async getSigner () {
    if (this.provider) {
      // const ethersProvider = this.getEthersProvider()
      return await this.provider.getSigner();
    }
    return null
  }

  async connect (lazy=false) {
    if (this.provider) {
      try {
        await this.exposedObject.request({ method: 'eth_requestAccounts' })
        // this.signer = this.getSigner()
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
