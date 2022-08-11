This packages contains many unstilized components and composables to help integrating smart contract interaction in any Vue app. 
This is especially useful to fastly build a Dapp.
All provided components and composables works out of the box and rely on only 3 simples dependencies :
- VueJS 3
- ethers.js
- Pinia

Some of the major features are :
- A "Connect Wallet" button (component)
- A "dapp" store that allows sharing Dapp's data accross the entire Vue project (Pinia store)
- Easy import of contracts ABI from a single place
- Easy configurations of supported networks
- A "Contract Interactor" component that allows to easily interact with a contract's functions and to easily observe its events, very useful for debugging contracts



TODO :
- Add multiple RPC ethers providers natively
- Add an unstilized popup system (?)
