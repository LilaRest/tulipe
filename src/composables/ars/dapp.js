import { Status, OnDappSafe } from "../../index.js";
import { computed, watch, getCurrentInstance } from "vue";

export class DappARS {
  constructor () {
    this.status = new Status("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED",
    ]);
    this.isSafe = computed(() => this.status.is("INITIALIZED"))
    this.OnSafe = OnDappSafe;
  }

  onSafe (func) {
    // Note : Component is passed to the executed function in orders to allows it to use lifecycle hook on this one. Because by default any asynchronous call in a component makes it loss the component instance's context which makes impossible to use lifecycle hooks or any actions related to the component. If a lifecycle hook is called without an attached component, a warning will be raised ("xxx is called when there is no active component instance to be associated with") and will just no work.
    const component = getCurrentInstance();
    if (this.isSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.isSafe, () => {
        if (this.isSafe.value) {
          func(component)
          unwatch()
        }
      })
    }
  }
}
