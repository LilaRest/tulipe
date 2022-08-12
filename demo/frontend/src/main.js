import { createApp } from "vue"
import { initVuethers } from "../../../src/index.js"
import App from "./App.vue"
import { vuethersConfig } from "../vuethers.config.js"
import { createPinia } from "pinia";

const app = createApp(App)
app.use(createPinia, {})
app.use(initVuethers, vuethersConfig)
app.mount("#app")
