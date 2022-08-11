import { defineStore } from "pinia";
import { $ref } from "vue/macros";

export const useWalletStatusStore = defineStore("wallet-status", () => {
  let status = $ref("disconnected");

  function setToDisconnected () {
    status = "disconnected";
  };

  function setToConnectionRequested () {
    status = "connection-requested";
    console.log("connection requested called");
    console.log(status);
  };

  function setToConnectionRefused () {
    status = "connection-refused";
    setTimeout(setToDisconnected, 5000);
  };

  function setToError () {
    status = "connection-error";
    setTimeout(setToDisconnected, 5000);
  };

  function setToConnected () {
    status = "connected";
  };

  function setToWrongNetwork () {
    status = "wrong-network"
  };

  return $$({ 
    status,
    setToDisconnected,
    setToConnectionRequested,
    setToConnectionRefused,
    setToConnected,
    setToWrongNetwork,
    setToError,
  })
});

