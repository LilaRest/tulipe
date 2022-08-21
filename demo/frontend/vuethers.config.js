export const vuethersConfig = {
  providers: [
    {
      chainId: 31337,
      contracts: {
        "Lock": await import("../backend/deployments/localhost/Lock.json"),
      },
      default: true,
      pollingInterval: 4000,
    },
    {chainId: 1},
    {chainId: 3},
    {chainId: 4},
    {chainId: 5},
    {chainId: 10},
    {chainId: 25},
    {chainId: 40},
    {chainId: 56},
    {chainId: 100},
    {chainId: 122},
    {chainId: 128},
    {chainId: 137},
    {chainId: 250},
    {chainId: 1088},
    {chainId: 1284},
    {chainId: 1285},
    {chainId: 8217},
    {chainId: 42161},
    {chainId: 42220},
    {chainId: 42262},
    {chainId: 43114},
    {chainId: 1313161554},
    {chainId: 1666600000},
  ],
}


