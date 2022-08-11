import { defineStore } from "pinia";
import { useWalletStatusStore } from "./wallet-status.js";
import { ethers } from "ethers";
import { $ref } from "vue/macros";

export const useDappStore = defineStore("dapp", () => {

  const provider = $ref(new ethers.providers.Web3Provider(window.ethereum, "any"));
  let signer = $ref(provider.getSigner());

  let networks = {};
  let contracts = {};
  let config = {};

  const status = ({
    wallet: useWalletStatusStore(),
  })

  return $$({ 
    provider,
    signer,
    networks,
    contracts,
    config,
    status
  })
});

