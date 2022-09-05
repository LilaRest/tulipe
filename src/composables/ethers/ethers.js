import { tulipeProviderClasses } from "./provider.js";
import { tulipeSignerClasses } from "./signer.js";
import { tulipeContractClasses } from "./contract.js";
import { ethers } from "ethers";

const tulipeClasses = {
  ...tulipeProviderClasses,
  ...tulipeSignerClasses,
  ...tulipeContractClasses,
}
const tulipeEthers = {...ethers};

for (const [tulipeClassName, tulipeClass] of Object.entries(tulipeClasses)) {
  tulipeEthers[tulipeClassName] = tulipeClass;
}

export { tulipeEthers }
