# Intuition

Usually a DApp requires many static informations to be able to interact with nodes, smart contracts, wallets, etc. Some of them are :
- **Contracts** : Addresses, ABIs, chains, etc.
- **Networks** : chain IDs, RPCs, currencies, explorers URLs, icons URLs, etc.
- **Wallets** : names, display names, icons URLs

All those informations can be difficult to organize and they often implies a lot of `import` statement in the project's files since they are often required almost everywhere in the app.
<br/>

## Vuethers' approach
Vuethers allows developers to structure all those informations in **a single file** called `vuethers.config.js`.

During DApp's initialization, all those informations are deeply merged with internally pre-populated informations, allowing to **configure 20+ EVM chain and 5+ wallets by simply indicating their ID and names** in the configurations file.

Finally, Vuethers uses all those informations to perform initialization stuffs and to setup ready-to-use interfaces available across the entire app through the [the `dapp` object](/guide/the-dapp-object/).

This removes the requirements of multiple `import` statement and instanciations, and so **reduces errors and improves maintainability**.
