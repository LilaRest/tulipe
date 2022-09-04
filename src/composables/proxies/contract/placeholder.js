import { dapp, Status, OnContractReadSafe, OnContractWriteSafe } from "../../../index.js";
import { TulipePlaceholder } from "../placeholder.js";
import { computed, watch, getCurrentInstance, createVNode } from "vue";
import { ethers } from "ethers";

export class TulipeContractPlaceholder extends TulipePlaceholder {

  constructor () {
    super();

    // Initialize additional properties.
    this.name = "TODO";

    // Initialize status instance.
    this.status = new Status(`contract:${name}`, [
      "NO_PROVIDER",     // Default status. If not changed it means that app don't have provider.
      "UNAVAILABLE",     // Set when contract is not available for the current network or not available at all.
      "ERROR",           // Set on unknown error during contract initialization.
      "INITIALIZED",     // Set when contract successfuly initialized for the current connect provider.
    ])

    // Initialize safers properties.
    this.isReadSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("INITIALIZED");
    })
    this.isWriteSafe = computed(() => {
      return dapp.signer.isSafe.value && this.status.is("INITIALIZED");
    })
    this.OnReadSafe = createVNode(OnContractReadSafe, {contract: this.name});
    this.OnWriteSafe = createVNode(OnContractWriteSafe, {contract: this.name});
  }

  onSafe (func) {
    throw "TulipeContract instances don't have 'onSafe()' method, use 'onReadSafe()' and 'onWriteSafe()' instead."
  }

  onReadSafe (func) {
    const component = getCurrentInstance();
    if (this.isReadSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.isReadSafe, () => {
        if (this.isReadSafe.value) {
            func(component)
            unwatch()
        }
      })
    }
  }

  onWriteSafe (func) {
    const component = getCurrentInstance();
    if (this.isWriteSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.isWriteSafe, () => {
        if (this.isWriteSafe.value) {
            func(component)
            unwatch()
        }
      })
    }
  }

  _updateContract (address, abi) {
    if (dapp.signer.isSafe.value) {
      this.proxy.ethersInstance = new ethers.Contract(address, abi, dapp.signer.proxy.ethersInstance)
    }
    else if (dapp.provider.isSafe.value) {
      this.proxy.ethersInstance = new ethers.Contract(address, abi, dapp.provider.proxy.ethersInstance)
    }
    else {
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`
    }
  }


  _initARS (address, abi) {
    // 1) Purge old ethersInstance ARS
    this._purgeARS()

    // 2) Auto-update status when provider status is WRONG, DISCONNECTED or in ERROR
    this._ars.unwatchers.push(
      dapp.provider.status.watchAny((status) => {
        if (status === "WRONG_NETWORK") {
          this.status.set("UNAVAILABLE");
        }
        else if (["DISCONNECTED", "ERROR"].includes(status)) {
          this.status.set("NO_PROVIDER");
        }
      })
    );

    // 3) Automatically update the contract ethersInstance when the signer changes.
    this._ars.unwatchers.push(
      watch ([dapp.signer.isSafe], (newValue, oldValue) => {
        if (newValue !== oldValue) {
          // Here the contract is removed and then recreated in order to fully destroy the old signer and provider.
          // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
          this.proxy.ethersInstance = null;
          this._updateContract(address, abi);
        }
      })
    );
  }

  async _asyncInit () {
    this.proxy._initIsRunning = true;

    // Delay init until provider is safe
    dapp.provider.onSafe(async function () {

      // If ethersInstance is not given during instantiation, set status to UNAVAILABLE
      if (!this.proxy.ethersInstance) {
        this.status.set("UNAVAILABLE");
      }

      // Else, perform some initializations
      else {

        // Initialize the signer ARS
        this._initARS()
      }

      this.proxy._initIsRunning = false;
    }.bind(this))
  }
}
