let dapp = null;

export function initVuethers (app, args) {
  const vuethersCustomConfig = args.config;
  const start = args.start;

  import("./dapp.js")
    .then((dappjs) => {
      dapp = new dappjs.Dapp(vuethersCustomConfig);

      // Makes the dapp stores available globally in the project.
      app.config.globalProperties.dapp = dapp;

      const initImport = import("./inits/index.js")
      initImport.then(async function (init) {

        // Initialize Vuethers components.
        init.initComponents(app);

        // Start the Vue app.
        start();

        // Initialize DApp's provider.
        await init.initProvider();

        // Initialize DApp's signer.
        await init.initSigner();

        // Initialize DApp's contracts.
        await init.initContracts()

        // Initialize DApp's watchers.
        await init.initWatchers()

        // Set the DApp safe.
        dapp.status.set("SAFE");
    })
  })
}

export { dapp } 
export * from "./components/index.js"
export * from "./composables/index.js"
export * from "./utils/index.js"
