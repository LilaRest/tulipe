import { createApp } from "vue"
import { initVuethers } from "../../../src/index.js"
import App from "./App.vue"
import { vuethers_config } from "../vuethers.config.js"

console.log("MAAIN")
const app = createApp(App)
app.use(initVuethers, vuethers_config)
app.mount("#app")
