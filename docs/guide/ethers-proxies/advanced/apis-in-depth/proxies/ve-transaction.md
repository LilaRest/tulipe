# `VETransaction`

The `VETransaction` class inherits from the [`VEProxy` class](/guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-proxy) and is used to represent a transaction in your DApp.

The Application Programming Interface of a `VETransactionProxy` instance is very smilar to the one of a `VEProxy` instance, except that :
- If `extensionInstance` argument in not explicitly given during instanciation, it defaults to a `VETransactionExtension` instance
- If `placeholderInstance` argument in not explicitly given during instanciation, it defaults to a `VETransactionPlaceholder` instance
