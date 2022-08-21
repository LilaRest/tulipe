import { Status as h, EthersContractProxy as i, dapp as s, VuethersConfig as l, EthersProviderProxy as d, EthersSignerProxy as p } from "./vuethers.es.js";
import { ethers as o } from "ethers";
import { computed as a, getCurrentInstance as n, watch as c } from "vue";
class u {
  constructor(e) {
    this.status = new h("contracts", [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED"
    ]);
    for (const t of e.config.providers)
      if (t.contracts)
        for (const [r, v] of Object.entries(t.contracts))
          this[r] = new i(r);
    this.areReadSafe = a(() => e.provider.isSafe.value && this.status.is("INITIALIZED")), this.areWriteSafe = a(() => e.signer.isSafe.value && this.status.is("INITIALIZED"));
  }
  add(e, t, r) {
    if (Object.keys(this).includes(e)) {
      if (!this[e] instanceof i)
        throw `You cannot add a new contract called '${e}', this name is reserved by Vuethers.`;
      if (s.signer.isSafe.value)
        this[e].proxy.setEthersObject(new o.Contract(t, r, s.signer.proxy.getEthersObject()));
      else if (s.provider.isSafe.value)
        this[e].proxy.setEthersObject(new o.Contract(t, r, s.provider.proxy.getEthersObject()));
      else
        throw "A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.";
    } else if (s.signer.isSafe.value)
      this[e] = new i(new o.Contract(t, r, s.signer.proxy.getEthersObject()));
    else if (s.provider.isSafe.value)
      this[e] = new i(new o.Contract(t, r, s.provider.proxy.getEthersObject()));
    else
      throw "A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.";
  }
  remove(e) {
    Object.keys(this).includes(e) && delete this[e];
  }
  getAll() {
    const e = {};
    for (const [t, r] of Object.entries(this))
      r instanceof i && (e[t] = r);
    return e;
  }
  onReadSafe(e) {
    const t = n();
    if (this.areReadSafe.value)
      e(t);
    else {
      const r = c(this.areReadSafe, () => {
        this.areReadSafe.value && (e(t), r());
      });
    }
  }
  onWriteSafe(e) {
    const t = n();
    if (this.areWriteSafe.value)
      e(t);
    else {
      const r = c(this.areWriteSafe, () => {
        this.areWriteSafe.value && (e(t), r());
      });
    }
  }
}
class E {
  constructor(e) {
    this.config = new l(e), this.status = new h("dapp", [
      "UNSAFE",
      "SAFE"
    ]), this.provider = new d(), this.signer = new p(), this.contracts = new u(this), this.isSafe = a(() => this.status.is("SAFE")), this._chainWatchers = {};
  }
  onSafe(e) {
    const t = n();
    if (this.isSafe.value)
      e(t);
    else {
      const r = c(this.isSafe, () => {
        this.isSafe.value && (e(t), r());
      });
    }
  }
}
export {
  E as Dapp
};
