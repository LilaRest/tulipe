import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default"

export default defineUserConfig({
  lang: "en-US",
  title: "vuethers",
  description: "A DApp frontend framework for Vue 3 built with Ethers (ethers.js)",
  head: [['link', { rel: 'icon', href: '/images/favicon.png' }]],
  theme: defaultTheme({
    logo: "",
    logoDark: "",
    repo: "https://github.com/LilaRest/vuethers",
    docsDir: "docs/",
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: "Guide",
        link: "/guide/",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          link: "/guide/index.md",
        },
        {
          text: 'Safers',
          link: '/guide/safers.md',
        }
      ]
    },
  }),
})

