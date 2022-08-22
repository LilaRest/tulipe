import { ethers as s } from "ethers";
import { dapp as t, capitalizeWords as p, connectWallet as l, OnDappSafe as v, OnProviderSafe as O, OnSignerSafe as u, OnContractsReadSafe as m, OnContractsWriteSafe as g, OnContractReadSafe as C, OnContractWriteSafe as R } from "./vuethers.es.js";
import { watch as h } from "vue";
async function E() {
  try {
    t.provider.proxy.setEthersObject(new s.providers.Web3Provider(window.ethereum, "any"));
  } catch (n) {
    console.log(n), t.provider.status.set("ERROR");
  }
  if (t.provider._ethersObject) {
    const n = await t.provider.getNetwork();
    let o = await t.config.providers.find((e) => e.chainId === n.chainId);
    if (o)
      t.provider.status.set("CONNECTED");
    else if (t.provider.status.set("WRONG"), o = t.config.providers.getAll().find((e) => e.chainId === n.chainId), !o) {
      const e = {
        name: n.name,
        displayName: p(n.name),
        chainId: n.chainId
      };
      t.config.providers.append(e);
    }
    t.provider.on("network", (e, r) => {
      r && r !== e && window.location.reload();
    }), t.provider.on("error", () => {
      t.provider.status.set("ERROR");
    }), o && o.pollingInterval && (t.provider.pollingInterval = o.pollingInterval);
  } else {
    const n = t.config.providers.getDefault();
    n && n.defaultRPC ? (t.provider.proxy.setEthersObject(new s.providers.JsonRpcProvider(n.defaultRPC)), t.provider.status.set("CONNECTED")) : t.provider.status.set("DISCONNECTED");
  }
}
async function I() {
  t.provider.onSafe(async function() {
    await l(!0);
  });
}
async function W() {
  t.provider.onSafe(async function() {
    if (t.provider.status.is("WRONG")) {
      for (const [e, r] of t.contracts.getAll())
        r.status.set("WRONG_NETWORK");
      t.contracts.status.set("WRONG_NETWORK");
      return;
    }
    const n = await t.config.providers.getCurrent(), o = [];
    for (const [e, r] of Object.entries(n.contracts))
      t.contracts.add(e, r.address, r.abi), o.push(e);
    for (const [e, r] of Object.entries(t.contracts.getAll()))
      o.includes(e) ? r.status.set("INITIALIZED") : r.status.set("WRONG_NETWORK");
    h([t.signer.isSafe], (e, r) => {
      if (console.log("Refresh contracts !"), e !== r)
        for (const a of o) {
          const i = a, c = t.contracts[a].address, f = t.contracts[a].interface.format("json");
          t.contracts[a].proxy.setEthersObject(null);
          try {
            t.contracts.add(i, c, f);
          } catch (d) {
            console.log(d), t.contracts.status.set("ERROR");
            break;
          }
        }
    }), t.contracts.status.set("INITIALIZED");
  });
}
async function w() {
  t.provider.onSafe(() => {
    t.provider.on("block", async function(n) {
      const o = await t.provider.getBlockWithTransactions(n);
      for (const e of o.transactions)
        Object.keys(t._chainWatchers).includes(e.to) && await t._chainWatchers[e.to].update(), t.signer.status.is("CONNECTED") && (await t.signer.getAddress(), e.from);
    });
  });
}
async function y(n) {
  n.component("OnDappSafe", v), n.component("OnProviderSafe", O), n.component("OnSignerSafe", u), n.component("OnContractsReadSafe", m), n.component("OnContractsWriteSafe", g), n.component("OnContractReadSafe", C), n.component("OnContractWriteSafe", R);
}
export {
  y as initComponents,
  W as initContracts,
  E as initProvider,
  I as initSigner,
  w as initWatchers
};
