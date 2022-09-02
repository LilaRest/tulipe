export const tulipeConfig = {
  networks: [
    {
      id: 31337,
      contracts: {
        "Lock": await import("../backend/deployments/localhost/Lock.json"),
      },
      default: true,
      pollingInterval: 4000,
    },
    {id: 1},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 10},
    {id: 25},
    {id: 40},
    {id: 56},
    {id: 100},
    {id: 122},
    {id: 128},
    {id: 137},
    {id: 250},
    {id: 1088},
    {id: 1284},
    {id: 1285},
    {id: 8217},
    {id: 42161},
    // {id: 42220},
    // {id: 42262},
    // {id: 43114},
    // {id: 1313161554},
    // {id: 1666600000},
  ],
  wallets: [
    {id: "metamask"},
    {id: "binanceChain"}
  ]
}
