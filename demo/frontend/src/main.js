import { createApp } from "vue"
import { initTulipe } from "../../../src/index.js"
import App from "./App.vue"
import { tulipeConfig } from "../tulipe.config.js"

const app = createApp(App)

await initTulipe(app, tulipeConfig)

app.mount("#app")
