export class WalletConnectionRejected extends Error {
  constructor(walletId, ...args) {
    super(walletId, ...args);
    this.message = `'${walletId}' wallet has rejected the connection request.`;
  }
}

export class WalletMethodNotImplemented extends Error {
  constructor(message, ...args) {
    super(walletId, ...args);
    this.message = message
  }
}
