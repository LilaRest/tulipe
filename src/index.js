import { dapp } from "./composables/dapp.js";
import { rGet, rSet } from "./utils/index.js";

export async function initVuethers (app, args) {
  const vuethersCustomConfig = args.config;
  const start = args.start;

  try {
    dapp.init(vuethersCustomConfig);
  }
  catch (e) {
    if (dapp && dapp.status) {
      dapp.status.set("ERROR")
    }
    throw e
  }

  // Makes the dapp stores available globally in the project.
  app.config.globalProperties.dapp = dapp;
  app.config.globalProperties.rGet = rGet;
  app.config.globalProperties.rSet = rSet;

  // Initialize Vuethers components.
  const components = await import("./components/index.js");
  app.component('OnDappSafe', components.OnDappSafe);
  app.component('OnProviderSafe', components.OnProviderSafe);
  app.component('OnSignerSafe', components.OnSignerSafe);
  app.component('OnContractsReadSafe', components.OnContractsReadSafe);
  app.component('OnContractsWriteSafe', components.OnContractsWriteSafe);
  app.component('OnContractReadSafe', components.OnContractReadSafe);
  app.component('OnContractWriteSafe', components.OnContractWriteSafe);

  // Start the Vue app.
  start();

  // Set the DApp safe.
  dapp.status.set("INITIALIZED");
}

export { dapp } 
export * from "./components/index.js";
export * from "./composables/index.js";
export * from "./utils/index.js";
