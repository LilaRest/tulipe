import { ContractWatcher, WalletWatcher } from "./index.js";
import { dapp } from "../../index.js";

export class ChainWatchersList {

    constructor () {
        this.contracts = {}
        this.wallets = {}
    }

    async _asyncInit() {

      dapp.provider.onSafe(() => {

        // Update watchers on new block.
        dapp.provider.on("block", async function (blockNumber) {
          const block = await dapp.provider.getBlockWithTransactions(blockNumber);

          for (const transaction of block.transactions) {

            // Refresh if transaction.to included in watched contracts or wallets.
            if (Object.keys(this.contracts).includes(transaction.to)) {
              this.contracts[transaction.to].update();
            }
            else if (Object.keys(this.wallets).includes(transaction.to) ) {
              this.wallets[transaction.to].update();
            }

            // Refresh if transaction.from included in watched contracts or wallets.
            if (Object.keys(this.contracts).includes(transaction.from)) {
              this.contracts[transaction.from].update();
            }
            else if(Object.keys(this.wallets).includes(transaction.from)) {
              this.wallets[transaction.from].update();
            }
          }
        })
      })
    }
  
  addContractWatcher (contract) {
    if (!Object.keys(this.contracts).includes(contract.address)) {
      this.contracts[contract.address] = new ContractWatcher(contract);
    }
  }

  removeContractWatcher (contract) {
    if (Object.keys(this.contracts).includes(contract.address)) {
      delete this.contracts[contract.address];
    }
  }

  addWalletWatcher (address) {
    if (!Object.keys(this.wallets).includes(address)) {
      this.wallets[address] = new WalletWatcher(address);
    }
  }

  removeContractWatcher (address) {
    if (Object.keys(this.wallets).includes(address)) {
      delete this.wallets[address];
    }
  }
}
