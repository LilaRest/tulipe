import{_ as e,o,c as t,d as r}from"./app.902cdb4f.js";const b=JSON.parse('{"title":"DApp object ~ API","description":"","frontmatter":{"title":"DApp object ~ API","layout":"doc"},"headers":[{"level":2,"title":"Properties","slug":"properties","link":"#properties","children":[]},{"level":2,"title":"Methods","slug":"methods","link":"#methods","children":[]},{"level":2,"title":"Components","slug":"components","link":"#components","children":[]}],"relativePath":"guide/dapp-object/api.md"}'),a={name:"guide/dapp-object/api.md"},i=r('<h1 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h1><p>Here is the detailed Application Programming Interface of the <code>dapp</code> object :</p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><ul><li><strong><code>dapp.provider</code></strong> : holds everything related to current DApp&#39;s provider <ul><li>type: <code>VEProviderProxy</code> object <br><br></li></ul></li><li><strong><code>dapp.signer</code></strong> : holds everything related to current DApp&#39;s provider <ul><li>type: <code>VESignerProxy</code> object <br><br></li></ul></li><li><strong><code>dapp.contracts</code></strong> : holds everything related to current DApp&#39;s contracts <ul><li>type: <code>VEContractsList</code> object <br><br></li></ul></li><li><strong><code>dapp.transactions</code></strong> : holds everything related to current DApp&#39;s transactions <ul><li>type: <code>VETransactionsList</code> object <br><br></li></ul></li><li><strong><code>dapp.config</code></strong> : holds everything related to the DApp&#39;s configurations <ul><li>type: <code>VEConfig</code> object <br><br></li></ul></li><li><strong><code>dapp.wallets</code></strong> : holds instances of available DApp&#39;s wallets <ul><li>type: <code>VEWalletsList</code> object <br><br></li></ul></li><li><strong><code>dapp.pro</code></strong> : alias of <code>dapp.provider</code><br><br></li><li><strong><code>dapp.sig</code></strong> : alias of <code>dapp.signer</code><br><br></li><li><strong><code>dapp.con</code></strong> : alias of <code>dapp.contracts</code><br><br></li><li><strong><code>dapp.txs</code></strong> : alias of <code>dapp.transactions</code><br><br></li><li><strong><code>dapp.isSafe</code></strong> : contain the safety state of the DApp, see <a href="/guide/safers/intuition.html">Safers</a><ul><li>type: Reactive object</li></ul></li></ul><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h2><ul><li><strong><code>dapp.onSafe(callback)</code></strong> : calls <code>callback()</code> when DApp is safe, see <a href="/guide/safers/intuition.html">Safers</a></li></ul><h2 id="components" tabindex="-1">Components <a class="header-anchor" href="#components" aria-hidden="true">#</a></h2><ul><li><strong><code>dapp.OnSafe</code></strong> : render encapsulated slot when DApp is safe, see <a href="/guide/safers/intuition.html">Safers</a><br><br></li></ul>',8),s=[i];function d(l,c,n,p,h,g){return o(),t("div",null,s)}const f=e(a,[["render",d]]);export{b as __pageData,f as default};
