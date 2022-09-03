# `VESigner`

The `VESigner` class inherits from the [`VEProxy` class](/guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-proxy) and is used to represent the current signer of your DApp.

The Application Programming Interface of a `VESignerProxy` instance is very smilar to the one of a `VEProxy` instance, except that :
- If `ethersInstance` argument is not explicitly given during instantiation, the class will automatically try to find one
- If `extensionInstance` argument in not explicitly given during instantiation, it defaults to a `VESignerExtension` instance
- If `placeholderInstance` argument in not explicitly given during instantiation, it defaults to a `VESignerPlaceholder` instance
