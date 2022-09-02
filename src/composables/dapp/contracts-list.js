import { TulipeContract, Status, dapp } from "../../index.js"
import { computed, watch, getCurrentInstance } from "vue";

export class ContractsList {

  constructor () {
    this.status = new Status("contracts", [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED",
    ])

    dapp.provider.status.watchAny((status) => {
      if (status === "WRONG") {
        this.status.set("WRONG_PROVIDER");
      }
      else if (["DISCONNECTED","ERROR"].includes(status)) {
        this.status.set("NO_PROVIDER");
      }
    });

    for (const networkConfig of dapp.config.networks.getAll()) {
      if (networkConfig.contracts) {
        for (const contractName of Object.keys(networkConfig.contracts)) {
          this[contractName] = new TulipeContract(contractName);
        }
      }
    }

    this.areReadSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("INITIALIZED");
    })
    this.areWriteSafe = computed(() => {
      return dapp.signer.isSafe.value && this.status.is("INITIALIZED");
    })

    this.status.set("INITIALIZED")
  }

  getAll () {
    const all = {}
    for (const [propName, prop] of Object.entries(this)) {
      if (prop instanceof TulipeContract) {
        all[propName] = prop;
      }
    }
    return all;
  }

  onReadSafe(func) {
    const component = getCurrentInstance();
    if (this.areReadSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.areReadSafe, () => {
        if (this.areReadSafe.value) {
            func(component)
            unwatch()
        }
      })
    }
  }

  onWriteSafe(func) {
    const component = getCurrentInstance();
    if (this.areWriteSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.areWriteSafe, () => {
        if (this.areWriteSafe.value) {
            func(component)
            unwatch()
        }
      })
    }
  }
}
