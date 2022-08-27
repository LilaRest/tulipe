import { createApp } from "vue"
import App from "./App.vue"
import { vuethersConfig } from "./vuethers.config.js"
import { initVuethers } from "vuethers";

const app = createApp(App)

app.use(initVuethers, {
  config: vuethersConfig,
  start: () => app.mount("#app");
})
