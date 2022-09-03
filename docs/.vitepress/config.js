export default {
  lang: "en-US",
  title: "Tulipe",
  description: "A DApp frontend framework for Vue 3 built with Ethersjs",
  markdown: {
    lineNumbers: true,
    theme: "github-dark"
  },
  themeConfig: {
    siteTitle: "Tulipe",
    repo: "https://github.com/0Lilian/tulipe",
    docsDir: "docs",
    docsBranch: "main",
    logo: "https://static.tuli.pe/tulipe-logo.png",
    editLink: {
      pattern: "https://github.com/0Lilian/tulipe/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    },
    lastUpdated: true,
    socialLinks: [
      { icon: "github", link: "https://github.com/0Lilian/tulipe" }
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Made with 💚 by 0Lilian",
    },
    algolia: {
      appId: "LO0BP2FIPN",
      apiKey: "6d9dde8ed80a80c5e3880f84fa8a158c",
      indexName: "tulipe"
    },
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Guide",
        link: "/guide/welcome/introduction",
      },
      {
        text: "API",
        link: "/api/",
      },
      {
        text: "Changelog",
        link: "https://github.com/0Lilian/tulipe/blob/main/CHANGELOG.md",
      }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Welcome",
          items: [
            {
              text: "Introduction",
              link: "/guide/welcome/introduction",
            }
          ]
        },
        {
          text: "Get started",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/get-started/intuition",
            },
            {
              text: "Installation",
              link: "/guide/get-started/installation",
            },
            {
              text: "Minimal configuration",
              link: "/guide/get-started/minimal-configuration",
            },
            {
              text: "Setup your DApp",
              link: "/guide/get-started/setup-your-dapp"
            }
          ],
        },
        {
          text: "Configurations",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/configurations/intuition",
            },
            {
              text: "Usage",
              link: "/guide/configurations/usage",
            },
            {
              text: "Networks",
              link: "/guide/configurations/networks",
            },
            {
              text: "Wallets",
              link: "/guide/configurations/wallets",
            },
            {
              text: "Style",
              link: "/guide/configurations/style",
            },
            {
              text: "Defaults",
              link: "/guide/configurations/defaults",
            }
          ]
        },
        {
          text: "DApp object",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/dapp-object/intuition"
            },
            {
              text: "Usage",
              link: "/guide/dapp-object/usage"
            },
            {
              text: "API",
              link: "/guide/dapp-object/api"
            },
            {
              text: "Customization",
              link: "/guide/dapp-object/customization"
            },
          ],
        },
        {
          text: "Ethers proxies",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/ethers-proxies/intuition"
            },
            {
              text: "How it works ?",
              link: "/guide/ethers-proxies/how-it-works"
            },
            {
              text: "Usage",
              link: "/guide/ethers-proxies/usage"
            },
            {
              text: "APIs (simplified)",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "VEProviderProxy",
                  link: "/guide/ethers-proxies/apis-simplified/ve-provider"
                },
                {
                  text: "VESignerProxy",
                  link: "/guide/ethers-proxies/apis-simplified/ve-signer"
                },
                {
                  text: "VEContractProxy",
                  link: "/guide/ethers-proxies/apis-simplified/ve-contract"
                },
                {
                  text: "VETransactionProxy",
                  link: "/guide/ethers-proxies/apis-simplified/ve-transaction"
                },
              ]
            },
            {
              text: "Customization",
              link: "/guide/ethers-proxies/customization"
            },
            {
              text: "Advanced",
              collapsible: true,
              collapsed: true,
              items: [
                  {
                    text: "Instantiation",
                    link: "/guide/ethers-proxies/advanced/instantiation"
                  },
                  {
                    text: "APIs (in-depth)",
                    collapsible: true,
                    collapsed: true,
                    items: [
                      {
                        text: "Proxies",
                        collapsible: true,
                        collapsed: true,
                        items: [
                          {
                            text: "VEProxy",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-proxy"
                          },
                          {
                            text: "VEProvider",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-provider"
                          },
                          {
                            text: "VESigner",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-signer"
                          },
                          {
                            text: "VEContract",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-contract"
                          },
                          {
                            text: "VETransaction",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-transaction"
                          },
                        ]
                      },
                      {
                        text: "Extensions",
                        collapsible: true,
                        collapsed: true,
                        items: [
                          {
                            text: "VEExtension",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/extensions/ve-extension"
                          },
                          {
                            text: "VEProviderExtension",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/extensions/ve-provider-extension"
                          },
                          {
                            text: "VESignerExtension",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/extensions/ve-signer-extension"
                          },
                          {
                            text: "VEContractExtension",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/extensions/ve-contract-extension"
                          },
                          {
                            text: "VETransactionExtension",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/extensions/ve-transaction-extension"
                          },
                        ]
                      },
                      {
                        text: "Placeholders",
                        collapsible: true,
                        collapsed: true,
                        items: [
                          {
                            text: "VEPlaceholder",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/placeholders/ve-placeholder"
                          },
                          {
                            text: "VEProviderPlaceholder",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/placeholders/ve-provider-placeholder"
                          },
                          {
                            text: "VESignerPlaceholder",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/placeholders/ve-signer-placeholder"
                          },
                          {
                            text: "VEContractPlaceholder",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/placeholders/ve-contract-placeholder"
                          },
                          {
                            text: "VETransactionPlaceholder",
                            link: "/guide/ethers-proxies/advanced/apis-in-depth/placeholders/ve-transaction-placeholder"
                          },
                        ]
                      }
                    ]
                  }
              ]
            },
          ]
        },
        {
          text: "Automated Relation Safety (ARS)",
          items: [
            {
              text: "Intuition",
              link: "/guide/ars/intuition"
            },
            {
              text: "How it works ?",
              link: "/guide/ars/how-it-works"
            },
            {
              text: "Usage",
              link: "/guide/ars/usage"
            },
            {
              text: "Advanced",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "Provider ARS",
                  link: "/guide/ars/in-depth/provider-ars"
                },
                {
                  text: "Signer ARS",
                  link: "/guide/ars/in-depth/signer-ars"
                },
                {
                  text: "Contract ARS",
                  link: "/guide/ars/in-depth/contract-ars"
                },
              ]
            },
          ]
        },
        {
          text: "Safers",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/safers/intuition"
            },
            {
              text: "How it works ?",
              link: "/guide/safers/how-it-works",
            },
            {
              text: "Provider safety",
              link: "/guide/safers/provider-safety",
            },
            {
              text: "Signer safety",
              link: "/guide/safers/signer-safety",
            },
            {
              text: "Contract safety",
              link: "/guide/safers/contract-safety",
            },
            {
              text: "Transaction safety",
              link: "/guide/safers/transaction-safety",
            },
          ],
        },
        {
          text: "Chain watchers",
          collapsible: true,
          items: [
            {
              text: "Intuition",
              link: "/guide/chain-watchers/intuition"
            },
            {
              text: "Contract watcher",
              link: "/guide/chain-watchers/contract-watcher"
            },
            {
              text: "Wallet watcher",
              link: "/guide/chain-watchers/wallet-watcher"
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
