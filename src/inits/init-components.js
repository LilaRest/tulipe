import { OnDappSafe, OnProviderSafe, OnSignerSafe, OnContractsSafe } from "../components/index.js";

export default async function initComponents(app) {
  app.component('OnDappSafe', OnDappSafe);
  app.component('OnProviderSafe', OnProviderSafe);
  app.component('OnSignerSafe', OnSignerSafe);
  app.component('OnContractsSafe', OnContractsSafe);
}
