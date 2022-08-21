import { ethers as a } from "ethers";
import { dapp as t, capitalizeWords as p, connectWallet as l, OnDappSafe as v, OnProviderSafe as u, OnSignerSafe as O, OnContractsReadSafe as g, OnContractsWriteSafe as m } from "./vuethers.es.js";
import { watch as h } from "vue";
async function E() {
  try {
    t.provider.proxy.setEthersObject(new a.providers.Web3Provider(window.ethereum, "any"));
  } catch (e) {
    console.log(e), t.provider.status.set("ERROR");
  }
  if (t.provider._ethersObject) {
    const e = await t.provider.getNetwork();
    let o = await t.config.providers.find((n) => n.chainId === e.chainId);
    if (o)
      t.provider.status.set("CONNECTED");
    else if (t.provider.status.set("WRONG"), o = t.config.providers.getAll().find((n) => n.chainId === e.chainId), !o) {
      const n = {
        name: e.name,
        displayName: p(e.name),
        chainId: e.chainId
      };
      t.config.providers.append(n);
    }
    t.provider.on("network", (n, r) => {
      r && r !== n && window.location.reload();
    }), t.provider.on("error", () => {
      t.provider.status.set("ERROR");
    }), o && o.pollingInterval && (t.provider.pollingInterval = o.pollingInterval);
  } else {
    const e = t.config.providers.getDefault();
    e && e.defaultRPC ? (t.provider.proxy.setEthersObject(new a.providers.JsonRpcProvider(e.defaultRPC)), t.provider.status.set("CONNECTED")) : t.provider.status.set("DISCONNECTED");
  }
}
async function I() {
  t.provider.onSafe(async function() {
    await l(!0);
  });
}
async function S() {
  t.provider.onSafe(async function() {
    if (t.provider.status.is("WRONG")) {
      for (const [n, r] of t.contracts.getAll())
        r.status.set("WRONG_NETWORK");
      t.contracts.status.set("WRONG_NETWORK");
      return;
    }
    const e = await t.config.providers.getCurrent(), o = [];
    for (const [n, r] of Object.entries(e.contracts))
      t.contracts.add(n, r.address, r.abi), o.push(n);
    for (const [n, r] of Object.entries(t.contracts.getAll()))
      o.includes(n) ? r.status.set("INITIALIZED") : r.status.set("WRONG_NETWORK");
    h([t.signer.isSafe], (n, r) => {
      if (console.log("Refresh contracts !"), n !== r)
        for (const s of o) {
          const i = s, c = t.contracts[s].address, f = t.contracts[s].interface.format("json");
          t.contracts[s].proxy.setEthersObject(null);
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
async function W() {
  t.provider.onSafe(() => {
    t.provider.on("block", async function(e) {
      const o = await t.provider.getBlockWithTransactions(e);
      for (const n of o.transactions)
        Object.keys(t._chainWatchers).includes(n.to) && await t._chainWatchers[n.to].update(), t.signer.status.is("CONNECTED") && (await t.signer.getAddress(), n.from);
    });
  });
}
async function w(e) {
  e.component("OnDappSafe", v), e.component("OnProviderSafe", u), e.component("OnSignerSafe", O), e.component("OnContractsReadSafe", g), e.component("OnContractsWriteSafe", m);
}
export {
  w as initComponents,
  S as initContracts,
  E as initProvider,
  I as initSigner,
  W as initWatchers
};
