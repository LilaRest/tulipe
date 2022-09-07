import { dapp, Status, OnContractReadSafe, OnContractWriteSafe } from "../../index.js";
import { computed, watch, getCurrentInstance, createVNode } from "vue";
import { BaseARS } from "./base.js";

export class ContractARS extends BaseARS {

  constructor (name) {
    super();

    this.name = name;

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

  _initEthersInstanceARS () {

  }

  _initPlaceholderInstanceARS () {
    watch(dapp.signer.isSafe, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        // Here the contract is removed and then recreated in order to fully destroy the old signer and provider.
        // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
        const abi = dapp.contracts[this.name].proxy.ethersInstance.interface
        const address = dapp.contracts[this.name].proxy.ethersInstance.address
        dapp.contracts[this.name].proxy.ethersInstance = null;
        dapp.contracts[this.name]._updateContract(address, abi);
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

  start () {
    super.start(dapp.contracts[name]);
  }
}
