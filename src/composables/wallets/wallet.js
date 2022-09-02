export class Wallet {

  constructor () {
    this.provider = null;
    this.name = "";
  }

  getProvider () {
    return null;
  }

  async connect () {
    throw `connect() method of ${this.name} wallet is not implemented.`
  }
}
