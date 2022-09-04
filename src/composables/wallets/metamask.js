import { Wallet } from "./wallet.js";
import { WalletConnectionRejected } from "./errors.js";
import { dapp } from "../../index.js";
import { ethers } from "ethers";

export class MetamaskWallet extends Wallet {

  constructor () {
    super();
    this.id = "metamask";
    this.provider = window.ethereum;
  }

  async connect () {
    try {
      await this.provider.request({ method: 'eth_requestAccounts' })
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

  async addNetwork (id) {
    const networkConfig = dapp.config.networks.getById(id);

    await window.ethereum.request({
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

  async changeNetwork (id) {
    const networkConfig = dapp.config.networks.getById(id);

    if (networkConfig) {
      id = ethers.utils.hexlify(parseInt(id)).toString()
      id = ethers.utils.hexValue(id)

      try {
        await window.ethereum.request({
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
