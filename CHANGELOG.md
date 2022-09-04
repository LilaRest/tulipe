## [1.7.1](https://github.com/LilaRest/tulipe/compare/v1.7.0...v1.7.1) (2022-09-04)


### Bug Fixes

* remove fake variable ([b040435](https://github.com/LilaRest/tulipe/commit/b040435e8e75e70fbffbb1e09fda607a26550108))

# [1.7.0](https://github.com/LilaRest/tulipe/compare/v1.6.0...v1.7.0) (2022-09-04)


### Bug Fixes

* _autoInstantiateFromWallet() method was still using the old Wallet API ([61ee43a](https://github.com/LilaRest/tulipe/commit/61ee43a4bf4acec5830ec71c241e4ba4eb6d8d3a))
* remove temporary error catcher in SelectWalletDropdown ([3356581](https://github.com/LilaRest/tulipe/commit/33565817a557209f82c5c0817669af597ed76254))


### Features

* auto-instanciate provider in priority with connected wallet, else with others ([3b85069](https://github.com/LilaRest/tulipe/commit/3b85069135a7df553bb163015a7d98e5cd3566c2))

# [1.6.0](https://github.com/LilaRest/tulipe/compare/v1.5.0...v1.6.0) (2022-09-04)


### Bug Fixes

* fix currentWallet and currentNetwork retrieving in unsafe contexts ([7078cab](https://github.com/LilaRest/tulipe/commit/7078cab659473ffec05100027d83b41ecc2d553c))


### Features

* create an Eip1193Wallet that allows connection to any wallet that respect the eip-1993 ([55a75c5](https://github.com/LilaRest/tulipe/commit/55a75c50002356381d14dd01aa6d481c3943f722))
* improve SelectWalletDropdown by displaying connection states + improve signer ARS ([f2c23a5](https://github.com/LilaRest/tulipe/commit/f2c23a581e9a025b7ab7a74a20d117c299c01cc1))
* improvement in the wallets / signer code ([2b0cad4](https://github.com/LilaRest/tulipe/commit/2b0cad474da2180b762a39b1b0337639145a5920))
* remove ContractsList safers and update code that was depending on them ([1afd6c0](https://github.com/LilaRest/tulipe/commit/1afd6c0964273eb39146a9b8d8f46f4773f4e71b))
* support wallets that doesn't allow lazy connect ([f2dd647](https://github.com/LilaRest/tulipe/commit/f2dd6475104fa4999ffabecc15661e9f8ef263e7))
* throw a proper message if onSafe() method is called on a TulipeContract instance ([12f2d0e](https://github.com/LilaRest/tulipe/commit/12f2d0e542d37502acd25698699bd4189142277c))

# [1.5.0](https://github.com/LilaRest/tulipe/compare/v1.4.1...v1.5.0) (2022-09-02)


### Bug Fixes

* **package.json:** remove type 'module' ([d4f46fc](https://github.com/LilaRest/tulipe/commit/d4f46fc82b453d633bf5e8ee331a1bdf1e6f434b))


### Features

* improve wallets system and add a first version of SelectWalletDropdown component ([3b02971](https://github.com/LilaRest/tulipe/commit/3b02971a0aa5bbc36888445bd3ae9c0a04572ef0))

## [1.4.1](https://github.com/LilaRest/tulipe/compare/v1.4.0...v1.4.1) (2022-09-01)


### Bug Fixes

* fix tulipe domain name ([8c0062d](https://github.com/LilaRest/tulipe/commit/8c0062da3e72e353e7bd3a5dd64b2e516f8137e0))

# [1.4.0](https://github.com/LilaRest/tulipe/compare/v1.3.1...v1.4.0) (2022-09-01)


### Bug Fixes

* resolve pull conflicts ([f890be8](https://github.com/LilaRest/tulipe/commit/f890be8f1eb1c41bd556beab1c95e52d6299ab6f))


### Features

* re-enable documentation build and add tulipe as dev dep ([cf1e894](https://github.com/LilaRest/tulipe/commit/cf1e894e36b205de95c3974ba09f87ecf0a20760))

## [1.3.1](https://github.com/LilaRest/tulipe/compare/v1.3.0...v1.3.1) (2022-09-01)


### Bug Fixes

* fix package version ([3407ee3](https://github.com/LilaRest/tulipe/commit/3407ee3e5682dcb6afa04ba9503cea627fbae79e))
* try to fix version ([590095a](https://github.com/LilaRest/tulipe/commit/590095a6655ddbce4a08e45d00ad823f9edef00d))

# [1.3.0](https://github.com/LilaRest/tulipe/compare/v1.2.1...v1.3.0) (2022-09-01)


### Bug Fixes

* comment documentation build ATM ([8bbbb5a](https://github.com/LilaRest/tulipe/commit/8bbbb5a623a80f0cc794f7556a756926a49ade26))
* fix 'vuethers' in files names ([7775a41](https://github.com/LilaRest/tulipe/commit/7775a41dc90d020978e77f81ccb3545804c1c668))
* fix renaming conflicts ([a684fc4](https://github.com/LilaRest/tulipe/commit/a684fc4ae2b2b3d3380b07ed50c760a64154e9f5))


### Features

* rename Vuethers to Tulipe ([0e82ad0](https://github.com/LilaRest/tulipe/commit/0e82ad0ad711b11c50a61b73560d28bf1460d068))
