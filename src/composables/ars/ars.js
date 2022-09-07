import { DappARS } from "./dapp.js";
import { ProviderARS } from "./provider.js";
import { SignerARS } from "./signer.js";
import { ContractsARS } from "./contracts.js";

export class ARS {
  constructor () {
    this.dapp = new DappARS();
    this.provider = new ProviderARS();
    this.signer = new SignerARS();
    this.contracts = new ContractsARS()
  }
}
