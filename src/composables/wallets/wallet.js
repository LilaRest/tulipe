export class Wallet {

  constructor () {
    this.provider = null;
    this.id = "";
  }

  getProvider () {
    return null;
  }

  async connect () {
    throw `connect() method of ${this.id} wallet is not implemented.`
  }
}
