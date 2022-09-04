import { ethers } from "ethers";

export class Wallet {

  constructor () {
    this.provider = null;
    this.id = "";
  }

  getProvider () {
    return null;
  }

  getEthersProvider () {
    if (this.provider) {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider, "any")
      return ethersProvider
    }
    return null
  }

  async getSigner () {
    if (this.provider) {
      const ethersProvider = this.getEthersProvider()
      return await ethersProvider.getSigner();
    }
    return null
  }

  async connect () {
    throw `connect() method of ${this.id} wallet is not implemented.`
  }
}
