import { createApp } from "vue"
import { initVuethers } from "../../../src/index.js"
import App from "./App.vue"
import { vuethersConfig } from "../vuethers.config.js"

const app = createApp(App)

// Initialize Vue plugins
app.use(initVuethers, {
  config: vuethersConfig,
  start: () => {
    app.mount("#app");
  }
})
