export class Wallet {

    constructor (id) {
      this.id = id;
    }

    async connect () {
      throw `connect() method of ${this.id} wallet is not implemented.`
    }
}
