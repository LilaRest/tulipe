export class WalletConnectionRejected extends Error {
  constructor(walletName, ...args) {
    super(walletName, ...args);
    this.message = `${walletName} wallet has rejected the connection request.`;
  }
}

