import { createApp } from "vue"
import { initVuethers } from "../../../src/index.js"
import App from "./App.vue"
import { vuethersConfig } from "../vuethers.config.js"
import { createPinia } from "pinia";

const app = createApp(App)

// Initialize Vue plugins
app.use(createPinia, {})

// Initialize Vuethers
await initVuethers(vuethersConfig)

app.mount("#app")
