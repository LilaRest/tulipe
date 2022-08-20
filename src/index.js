import { dapp } from "./dapp.js";
import * as init from "./inits/index.js";

export async function initVuethers (app, vuethersCustomConfig) {

  // Makes the dapp stores available globally in the project.
  app.config.globalProperties.dapp = dapp;

  // Initialize Vuethers components.
  await init.initComponents(app);

  // Initialize DApp's config.
  await init.initConfig(vuethersCustomConfig);
  
  // Initialize DApp status.
  await init.initStatus();

  // Initialize DApp's provider.
  await init.initProvider();

  // Initialize DApp's signer.
  await init.initSigner();

  // Initialize DApp's contracts.
  await init.initContracts()

  // Initialize DApp's watchers.
  await init.initWatchers()

  // Set the DApp safe.
  dapp.safe.value = true;
}

export { dapp } from "./dapp.js";
export * from "./components/index.js"
export * from "./composables/index.js"
export * from "./utils/index.js"
