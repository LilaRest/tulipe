import "../../../dist/style.css"; // custom
import '../../../node_modules/vitepress/dist/client/theme-default/styles/fonts.css';
import '../../../node_modules/vitepress/dist/client/theme-default/styles/vars.css';
import '../../../node_modules/vitepress/dist/client/theme-default/styles/base.css';
import '../../../node_modules/vitepress/dist/client/theme-default/styles/utils.css';
import '../../../node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css';
import '../../../node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css';
import '../../../node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import '../../../node_modules/vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';
import Layout from './Layout.vue';
import NotFound from '../../../node_modules/vitepress/dist/client/theme-default/NotFound.vue';
import { vuethersConfig } from "./vuethers.config.js" // custom
import { initVuethers } from "vuethers"; // custom
import DemoCreator from "./components/DemoCreator.vue"; // custom
import DemoFrame from "./components/DemoFrame.vue"; // custom
import Badge from "./components/Badge.vue"; // custom
import "./style.css"; // custom
export { default as VPHomeHero } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue';
export { default as VPHomeFeatures } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue';
export { default as VPHomeSponsors } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue';
export { default as VPDocAsideSponsors } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue';
export { default as VPTeamPage } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue';
export { default as VPTeamPageTitle } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue';
export { default as VPTeamPageSection } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue';
export { default as VPTeamMembers } from '../../../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue';
const theme = {
    Layout,
    NotFound,
    // custom below
    enhanceApp({ app }) {
      app.use(initVuethers, {
        config: vuethersConfig,
        start: () => {},
      })
      app.component("DemoCreator", DemoCreator);
      app.component("DemoFrame", DemoFrame);
      app.component("Badge", Badge);
    }
    // custom above
};
export default theme;
