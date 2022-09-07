import { dapp, Status, OnContractReadSafe, OnContractWriteSafe } from "../../index.js";
import { computed, watch, getCurrentInstance, createVNode } from "vue";

export class ContractARS {

  constructor (name) {
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
    this.OnReadSafe = createVNode(OnContractReadSafe, {contract: name});
    this.OnWriteSafe = createVNode(OnContractWriteSafe, {contract: name});
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

  init() {
    watch(dapp.signer.isSafe, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        // Here the contract is removed and then recreated in order to fully destroy the old signer and provider.
        // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
        const abi = this.proxy.ethersInstance.interface
        const address = this.proxy.ethersInstance.address
        this.proxy.ethersInstance = null;
        this._updateContract(address, abi);
      }
    })

    dapp.provider.status.watchAny((status) => {
      if (status === "WRONG_NETWORK") {
        this.status.set("UNAVAILABLE");
      }
      else if (["DISCONNECTED", "ERROR"].includes(status)) {
        this.status.set("NO_PROVIDER");
      }
    })
  }
}
