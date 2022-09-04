import { WalletMethodNotImplemented } from "./errors.js";

export class Wallet {

    constructor (id) {
      this.id = id; // The Tulipe's wallet ID of the wallet
      this.lazyConnectAvailable = true; // Set to true if lazy connection is available for that wallet
    }

    isConnected () {
      throw new WalletMethodNotImplemented(`isConnected() method is not implemented in ${this.id} wallet class.`)
    }

    getProvider () {
      throw new WalletMethodNotImplemented(`getProvider() method is not implemented in ${this.id} wallet class.`)
    }

    getSigner (lazy=false) {
      throw new WalletMethodNotImplemented(`getSigner() method is not implemented in ${this.id} wallet class.`)
    }

    async connect (lazy=false) {
      throw new WalletMethodNotImplemented(`connect() method is not implemented in ${this.id} wallet class.`)
    }

    addNetwork (id) {
      throw new WalletMethodNotImplemented(`addNetwork() method is not implemented in ${this.id} wallet class.`)
    }

    switchNetwork (id, lazy=false) {
      throw new WalletMethodNotImplemented(`switchNetwork() method is not implemented in ${this.id} wallet class.`)
    }
}
