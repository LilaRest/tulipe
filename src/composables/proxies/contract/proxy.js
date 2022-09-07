import { TulipeProxy } from "../proxy.js";
import { TulipeContractExtension } from "./extension.js";
import { dapp, Status, OnContractReadSafe, OnContractWriteSafe } from "../../../index.js";
import { TulipePlaceholder } from "../placeholder.js";
import { computed, watch, getCurrentInstance, createVNode } from "vue";
import { ethers } from "ethers";


export class TulipeContractProxy extends TulipeProxy {

  constructor (name, ethersInstance=null, extensionInstance=null) {
    console.log("init proxy")
    console.log(name)
    console.log(ethersInstance)

    // Call parent constructor
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeContractExtension(),
    );
    console.log("proxxx")
    console.log(this.proxy)

    // Initialize additional properties.
    this.name = name;

    // Initialize status instance.
    this.status = dapp._ars.contracts[this.name].status;
    this.isReadSafe = dapp._ars.contracts[this.name].isReadSafe;
    this.isWriteSafe = dapp._ars.contracts[this.name].isWriteSafe;
    this.OnReadSafe = dapp._ars.contracts[this.name].OnReadSafe;
    this.OnWriteSafe = dapp._ars.contracts[this.name].OnWriteSafe;
    this.onReadSafe = dapp._ars.contracts[this.name].onReadSafe;
    this.onWriteSafe = dapp._ars.contracts[this.name].onWriteSafe;

    console.log("proxxx 2")
    console.log(this.proxy)


    // this._asyncInit();
  }

  onSafe (func) {
    throw "TulipeContract instances don't have 'onSafe()' method, use 'onReadSafe()' and 'onWriteSafe()' instead."
  }



  async _asyncInit () {

    console.log("proxxx 3")
    console.log(this.proxy)

    // Delay init until provider is safe
    dapp.provider.onSafe(async function () {

      // If ethersInstance is not given during instantiation, set status to UNAVAILABLE
      if (!this.proxy.ethersInstance) {
        console.log(this.proxy)
        console.log("marked as UNVAILABLE !")
        this.status.set("UNAVAILABLE");
      }

      // Else, perform some initializations
      else {
        this.name = "TODO"
        this.status.set("INITIALIZED");
      }
    }.bind(this))
  }
}
