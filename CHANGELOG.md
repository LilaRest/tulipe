# 1.0.0 (2022-12-30)


### Bug Fixes

* _autoInstantiateFromWallet() method was still using the old Wallet API ([8362829](https://github.com/LilaRest/tulipe/commit/83628298b077d634fbe534c8293672a5ec835510))
* add a fake var in index.js to force new dist files ([e853e91](https://github.com/LilaRest/tulipe/commit/e853e91fc39f7d2a9fef52e9f99b5e610a8f6ed7))
* comment documentation build ATM ([54c3bcb](https://github.com/LilaRest/tulipe/commit/54c3bcbb2cf85221da319e6a7db87b7280062063))
* Fake update ([ca4663c](https://github.com/LilaRest/tulipe/commit/ca4663c667c299ae248febf17401d443cbb9d238))
* Fake update ([ff6ff2c](https://github.com/LilaRest/tulipe/commit/ff6ff2cca9c4c118a34787a09e00d8eb24455aab))
* fix 'vuethers' in files names ([6b38454](https://github.com/LilaRest/tulipe/commit/6b38454ecaca0d0d2933cd92171f8c706f3f0998))
* fix currentWallet and currentNetwork retrieving in unsafe contexts ([7da1759](https://github.com/LilaRest/tulipe/commit/7da17590d2a448483042b9d9327c1f66c37372a6))
* fix export typo in composables/ethers/index.js ([4d6aa08](https://github.com/LilaRest/tulipe/commit/4d6aa084dabd797ea3b6db5b3469b00500e16371))
* fix package version ([e02ad50](https://github.com/LilaRest/tulipe/commit/e02ad50f62c8150b4aec76dec8b86be451a283e1))
* fix renaming conflicts ([d6d199d](https://github.com/LilaRest/tulipe/commit/d6d199dc34c1f979ba9ddd66fc831056ced41bc4))
* fix tulipe domain name ([33c1e23](https://github.com/LilaRest/tulipe/commit/33c1e23104b9a475623ec56da7ea2ee9e73c159d))
* fix TulipeContractProxy class that was not setting status to INITIALIZED on successful init ([4da1b2f](https://github.com/LilaRest/tulipe/commit/4da1b2fab72f5fd80b9edbccfb49430c932d8c21))
* Make dapp path explicit in index.js ([1d8ffa6](https://github.com/LilaRest/tulipe/commit/1d8ffa6db6135ee232d0f00765589359a37549bb))
* **package.json:** remove type 'module' ([da0f5c9](https://github.com/LilaRest/tulipe/commit/da0f5c94f76742641774cbc4fc6fa66fa3fc6109))
* remove fake variable ([ae97b8d](https://github.com/LilaRest/tulipe/commit/ae97b8d6f6162a25e5c3f31a0ef54683312c9c4d))
* remove temporary error catcher in SelectWalletDropdown ([ccc51aa](https://github.com/LilaRest/tulipe/commit/ccc51aa450b2932552185d8d447ca6c9a7a636a1))
* Remove unnecessary ENV variable in CI/CD workflow ([7908ec8](https://github.com/LilaRest/tulipe/commit/7908ec8b401f8c7f5f2b66fcc6561135244d4883))
* resolve pull conflicts ([3b27283](https://github.com/LilaRest/tulipe/commit/3b2728363dc1e3a4272596a7f4b4bbce971ee4a9))
* try to fix version ([efc8fcb](https://github.com/LilaRest/tulipe/commit/efc8fcb91a845bbba6be34dd6dda9a8899b740d5))


### Features

* a change watcher system to proxies ([a3097dc](https://github.com/LilaRest/tulipe/commit/a3097dce779889cc2b58c2a1b02830e619f931d9))
* adapt contract related classes to new ARS and proxies design ([0af2287](https://github.com/LilaRest/tulipe/commit/0af22879fc1793f04690b157900c580b7df3c570))
* Add automatic changelog to Release bot ([bb9c8b0](https://github.com/LilaRest/tulipe/commit/bb9c8b082d3a3334b0db5097b2b45f343d3bd2d5))
* add Tulipe wrapper for all Ethers.js contract classes ([553bc74](https://github.com/LilaRest/tulipe/commit/553bc7480594e659b85bc6bc74a998e28122a5b7))
* add Tulipe wrapper for all Ethers.js provider classes ([7b0803b](https://github.com/LilaRest/tulipe/commit/7b0803ba5a2c5450fea9f12f54f0ceb14d80f7ef))
* add Tulipe wrapper for all Ethers.js signer classes ([8494719](https://github.com/LilaRest/tulipe/commit/84947198e1e1153778dcfbd54af03f3c0b88dd4b))
* auto-instanciate provider in priority with connected wallet, else with others ([00b972f](https://github.com/LilaRest/tulipe/commit/00b972f9b6cf2e54d38cc995ec469780335114c5))
* create an Eip1193Wallet that allows connection to any wallet that respect the eip-1993 ([eef08f7](https://github.com/LilaRest/tulipe/commit/eef08f7423618f2c9762a96cc5a8f547423c3a08))
* expose a Tulipe wrapped version of Ethers.js at dapp.ethers ([6c4142e](https://github.com/LilaRest/tulipe/commit/6c4142e9cf3a5cc52994410ac9552b9f9ca3c79e))
* externalize ARS from proxies and simplify proxies ([5657994](https://github.com/LilaRest/tulipe/commit/5657994139b787c4e21c633bb734cb2799d48225))
* improve SelectWalletDropdown by displaying connection states + improve signer ARS ([671b4f0](https://github.com/LilaRest/tulipe/commit/671b4f09b6cae05e4745c743f2b9830c1128fa2e))
* improve wallets system and add a first version of SelectWalletDropdown component ([d8a0f54](https://github.com/LilaRest/tulipe/commit/d8a0f5479b822e2d76fe41806bf6f47e6c76ce83))
* improvement in the wallets / signer code ([10d3f95](https://github.com/LilaRest/tulipe/commit/10d3f95757cbdf94a1660d8cad6b95af095a8625))
* move all methods commons to many ARS classes into a BaseARS class ([2003ece](https://github.com/LilaRest/tulipe/commit/2003ece93b41b95a4edbaf84b508b84d90e173f2))
* move proxies initialization safety in the Proxy class + remove unecessary commented code ([e9bb296](https://github.com/LilaRest/tulipe/commit/e9bb296343c8cf2b854f86f102ef3c7dbed8bab0))
* re-enable documentation build and add tulipe as dev dep ([c458a09](https://github.com/LilaRest/tulipe/commit/c458a0994ad147c5f5e3b00793ed87ff05ae5984))
* re-enable in the new ARS classes auto-purging and auto-init on ethersInstance change ([c50c032](https://github.com/LilaRest/tulipe/commit/c50c0329a021367abcc1ec77f075039a3ce0400c))
* remove comitizen from package, fake change in index.js to test CI/CD ([7c9fee9](https://github.com/LilaRest/tulipe/commit/7c9fee9f0a15ddb0710df3f09abb02cf97924e79))
* remove ContractsList safers and update code that was depending on them ([028c684](https://github.com/LilaRest/tulipe/commit/028c6845be815644104b4bb6f51ae1e42ce781e0))
* rename Vuethers to Tulipe ([696d7c9](https://github.com/LilaRest/tulipe/commit/696d7c901b79a2ab51a23ab5fb1845af918bcfbc))
* split TulipeContractPlaceholder's ARS in two methods like for signer ([49568a6](https://github.com/LilaRest/tulipe/commit/49568a6b1131509d7fa9fe55091c02dcc2dade52))
* support wallets that doesn't allow lazy connect ([1b6cdaf](https://github.com/LilaRest/tulipe/commit/1b6cdaf00129f1b967eb0322906519ad4dde0922))
* throw a proper message if onSafe() method is called on a TulipeContract instance ([9374dab](https://github.com/LilaRest/tulipe/commit/9374dab46c66acaec24c0ac18ffa3ad4b6130d25))
* tiny improvements about wrappers and contract proxy ([f0b33ef](https://github.com/LilaRest/tulipe/commit/f0b33ef48fc3c930bf7a14e6d78da27c8d2b7301))

# [1.11.0](https://github.com/LilaRest/tulipe/compare/v1.10.0...v1.11.0) (2022-09-07)


### Features

* a change watcher system to proxies ([879f850](https://github.com/LilaRest/tulipe/commit/879f85041d14c60c28bc215d18151544ee399c04))
* adapt contract related classes to new ARS and proxies design ([c96a7de](https://github.com/LilaRest/tulipe/commit/c96a7de3ee4390c1179c4cd8a3dd0e4aa80e2c32))
* re-enable in the new ARS classes auto-purging and auto-init on ethersInstance change ([2e2abb8](https://github.com/LilaRest/tulipe/commit/2e2abb8c65c03f43de9b58c4603e0eaa4e3c0214))

# [1.10.0](https://github.com/LilaRest/tulipe/compare/v1.9.0...v1.10.0) (2022-09-07)


### Features

* externalize ARS from proxies and simplify proxies ([e002c5d](https://github.com/LilaRest/tulipe/commit/e002c5de291e5d70e6cff776ffabe5f3aac8837f))
* move all methods commons to many ARS classes into a BaseARS class ([50cbecc](https://github.com/LilaRest/tulipe/commit/50cbeccb2d00fa24040a15e4d45333cb10235d0a))
* move proxies initialization safety in the Proxy class + remove unecessary commented code ([f2746ce](https://github.com/LilaRest/tulipe/commit/f2746ceda5e7c089b7c5e2af4f1efcc9c9c3e929))

# [1.9.0](https://github.com/LilaRest/tulipe/compare/v1.8.0...v1.9.0) (2022-09-05)


### Bug Fixes

* fix TulipeContractProxy class that was not setting status to INITIALIZED on successful init ([52dca17](https://github.com/LilaRest/tulipe/commit/52dca177c2ad5e69732cdb0320acdf7ec8b50f46))


### Features

* add Tulipe wrapper for all Ethers.js contract classes ([d60bf57](https://github.com/LilaRest/tulipe/commit/d60bf573c99731e59e430f346fd67264cd45ba33))
* add Tulipe wrapper for all Ethers.js signer classes ([76d85f9](https://github.com/LilaRest/tulipe/commit/76d85f97500542de8904e4748418b917c6fbedf9))
* expose a Tulipe wrapped version of Ethers.js at dapp.ethers ([457723c](https://github.com/LilaRest/tulipe/commit/457723cc314ada330a8d7f0e88c3a5d70d35a8f2))
* tiny improvements about wrappers and contract proxy ([254cfc0](https://github.com/LilaRest/tulipe/commit/254cfc0421312e69c34560cb8b8b0fe581e190a1))

# [1.8.0](https://github.com/LilaRest/tulipe/compare/v1.7.1...v1.8.0) (2022-09-04)


### Bug Fixes

* fix export typo in composables/ethers/index.js ([a1e4e70](https://github.com/LilaRest/tulipe/commit/a1e4e70d54e47037c15e177257abcc1d51755dc4))


### Features

* add Tulipe wrapper for all Ethers.js provider classes ([2700573](https://github.com/LilaRest/tulipe/commit/2700573e7bfd4654d03161d4bd47f2928a941ba1))
* split TulipeContractPlaceholder's ARS in two methods like for signer ([7091cf3](https://github.com/LilaRest/tulipe/commit/7091cf38a8f65c3990237bc41430706f1cdf7d0a))

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
