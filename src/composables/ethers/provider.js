import { ethers } from "ethers";
import { markRaw } from "vue";

export class Web3Provider extends ethers.providers.Web3Provider {

  constructor (...args) {
    super(...args);
    return markRaw(this);
  }
}
