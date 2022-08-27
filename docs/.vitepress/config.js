export default {
  lang: "en-US",
  title: "Vuethers",
  description: "A DApp frontend framework for Vue 3 built with Ethers (ethers.js)",
  markdown: {
    lineNumbers: true,
    theme: "github-dark"
  },
  themeConfig: {
    siteTitle: "Vuethers",
    repo: "https://github.com/LilaRest/vuethers",
    docsDir: "docs",
    docsBranch: "main",
    logo: "",
    editLink: {
      pattern: "https://github.com/LilaRest/vuethers/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    },
    lastUpdated: true,
    socialLinks: [
      { icon: "github", link: "https://github.com/LilaRest/vuethers" }
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Made with 💚 by LilaRest",
    },
    algolia: {
      appId: "LO0BP2FIPN",
      apiKey: "6d9dde8ed80a80c5e3880f84fa8a158c",
      indexName: "vuethers"
    },
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "API",
        link: "/api/",
      },
      {
        text: "Changelog",
        link: "/changelog/",
      }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Welcome",
          items: [
            {
              text: "Introduction",
              link: "/guide/index.md",
            }
          ]
        },
        {
          text: "Get started",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/get-started/intuition.md",
            },
            {
              text: "Installation",
              link: "/guide/get-started/installation.md",
            },
            {
              text: "Minimal configuration",
              link: "/guide/get-started/minimal-configuration.md",
            },
            {
              text: "Minimal DApp setup",
              link: "/guide/get-started/minimal-dapp-setup.md"
            }
          ],
        },
        {
          text: "Configurations",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/configurations/intuition.md",
            },
            {
              text: "Networks config",
              link: "/guide/configurations/networks-config.md",
            },
            {
              text: "Wallets config",
              link: "/guide/configurations/wallets-config.md",
            },
            {
              text: "Defaults config",
              link: "/guide/configurations/defaults-config.md",
            }
          ]
        },
        {
          text: "The `dapp` object",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: ""
            },
            {
              text: "Ethers proxies",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "Introduction",
                  link: "/guide/in-depth/ethers-proxies/introduction.md"
                },
                {
                  text: "Provider proxy",
                  link: ""
                },
                {
                  text: "Signer proxy",
                  link: ""
                },
                {
                  text: "Contract proxy",
                  link: ""
                },
                {
                  text: "Transaction proxy",
                  link: ""
                },
              ]
            },
          ],
        },
        {
          text: "Safers",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: ""
            },
            {
              text: "Provider safety",
              link: ""
            },
            {
              text: "Signer safety",
              link: ""
            },
            {
              text: "Contract safety",
              link: ""
            },
            {
              text: "Transaction safety",
              link: ""
            },
          ],
        },
        {
          text: "Chain watchers",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: ""
            },
            {
              text: "Contract watcher",
              link: ""
            },
            {
              text: "Wallet watcher",
              link: ""
            },
          ],
        },
        {
          text: "Components",
          collapsible: true,
          items: [
            {
              text: "Provider components",
              collapsed: true,
              collapsible: true,
              items: [
                {
                  text: "Index",
                  link: ""
                },
                {
                  text: "SelectNetworkDropdown",
                  link: ""
                },
                {
                  text: "CurrentNetwork",
                  link: ""
                },
              ]
            },
            {
              text: "Signer components",
              collapsed: true,
              collapsible: true,
              items: [
                {
                  text: "Index",
                  link: ""
                },
                {
                  text: "ConnectWalletButton",
                  link: ""
                },
                {
                  text: "AvailableWallets",
                  link: ""
                },
              ]
            },
            {
              text: "Contracts components",
              collapsed: true,
              collapsible: true,
              items: [
                {
                  text: "Index",
                  link: ""
                },
                {
                  text: "ContractInteractor",
                  link: ""
                },
                {
                  text: "EventsInteractor",
                  link: ""
                },
                {
                  text: "EventInteractor",
                  link: ""
                },
                {
                  text: "MethodsInteractor",
                  link: ""
                },
                {
                  text: "MethodInteractor",
                  link: ""
                },
                {
                  text: "ERC20Balance",
                  link: ""
                },
              ]
            },
            {
              text: "Transactions components",
              collapsed: true,
              collapsible: true,
              items: [
                {
                  text: "Index",
                  link: ""
                },
                {
                  text: "Transact",
                  link: ""
                },
                {
                  text: "ERC20ApproveAndTransact",
                  link: ""
                },
              ]
            },
            {
              text: "Debugging components",
              collapsed: true,
              collapsible: true,
              items: [
                {
                  text: "Index",
                  link: ""
                },
                {
                  text: "DebugBar",
                  link: ""
                },
              ]
            },

          ]
        },
        {
          text: "Styling",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: ""
            },
            {
              text: "The 3 styling levels",
              link: ""
            },
          ],
        },
        {
          text: "In-depth",
          collapsible: true,
          items: [
            {
              text: "Setup",
              link: ""
            },
          ],
        },
        {
          text: "Troubleshooting",
          collapsible: true,
          items: [

          ]
        },
      ]
    }

  }
}
