# Vuethers ~ DApp frontend helper for VueJS and ethers.js

## Alpha warning
This library is currently in development and not suitable yet for production environment, use at your own risks.
Beta and a stable versions should be released by the end of 2022.


## Philosophy
Vuethers contains many unstyled components and composables to help interacting with web wallets (eg. Metamask, Wallet Connect, etc.) and EVM chains and smart contracts in VueJS applications.

The philosophy behind this package is to make it as minimalist/lightweight as possible and to allow developers to fully customize each of the components provided.

This way developers can focus less on boring / repetitive tasks and more on the macro level of their application, and on innovation. All of that with the possibility of easily customize each component to make a fully unique DApp.

On the other hand, Vuethers also provides few optional CSS files that contain style for components in case some developers don't want to style them from scratch or don't want to style them at all.


## Main features :
- **Ready-to-use** : Not any configurations are required to start building with Vuethers
- **Adaptive styling** : Vuethers provides 3 levels of styling that allows developers to be more or less free / helped about the design of their app.
- **Components & Composables** : Vuethers provides many components and composables to help DApp development (eg. a "Connect Wallet" button, a "Select Network" dropdown, etc.)
- **Global data access** : thanks to a DApp global store built with Pinia, all the DApp's datas can be accessed and mutated from anywhere in the app
- **Single-file configuration** : the whole DApp's settings (supported networks, available smart contracts, etc.) can be configured from a single file called `vuethers.config.js`
- **Strong configuration defaults** : by the way Vuethers provides strong default configuration (+20 EVM chains pre-configured, chain icons, etc.) that allows developers to start building with Vuethers by simply giving the ID of the chain they are working on.
- **Smart contract frameworks support** : Natively Vuethers supports Hardhat and provides a documentation about how to integrate it in Vuethers. Other frameworks will come later
- **Demo DApp** : Vuethers provides a demo DApp that can be cloned to quickly start a new Vuethers project with Hardhat
- **Few dependencies** : Vuethers relies on only 3 external dependencies (vuejs, ethers.js, pinia)
- **Lightweight** : Vuethers is powerful but weight less than 10kB when compressed in browsers

Here are more details about some of these features :


### Adaptative styling
More precisely Vuethers comes with 3 levels of styles (coming soon) :
- Unstyled : no CSS file applied
- Minimalist : only few CSS rules in order to make components consistent and readable
- Fancy : pretty styling for each components, loaders, etc. Make Vuethers usable in production out of the box

Note : Minimalist and Fancy styles come with a CSS reset that allows these styling to be displayed uniformly on any browser. Can be disabled in settings (not recommended).


### Components & Composables
Here are the ones currently implemented :
- a ConnectWalletButton component : A button that allows to connect and interact with web wallet like Metamask
- a SelectNetworkDropdown component : A dropdown that allows users to easily change the network (chain) they are connected to
- a ContractInteractor component : A dynamic component that displays informations and provides inputs fields and button in order to interact with a given smart contract 


### DApp global store
Many datas like DApp statuses, the `provider` and `signer` objects (ethers.js), the list of available contracts, etc. have to be shared across the entire app in order to allow any component to access and mutate them.
Vuethers provides a way to do that with a DApp store built with Pinia, that can be imported anywhere in the app in order to access/mutate the DApp datas.
It's as simple as that :
```js
import { useDAppStore } from "vuethers";
const dapp = useDAppStore()
console.log(dapp.networks.available)
// --> [...] displays the list of the networks supported by the DApp
```


### Dependencies
All provided components and composables works out of the box and rely on only 3 simples dependencies that should be already included in any VueJS DApp project :
- VueJS 3
- ethers.js
- Pinia


### TODO
- Add multiple RPC ethers providers support by default
- Add an unstyled popup system (?)
