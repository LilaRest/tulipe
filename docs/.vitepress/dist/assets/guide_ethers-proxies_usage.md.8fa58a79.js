import{_ as e,o as t,c as o,d as a}from"./app.906b7b89.js";const f=JSON.parse('{"title":"Ethers proxies ~ Usage","description":"","frontmatter":{"title":"Ethers proxies ~ Usage","layout":"doc"},"headers":[],"relativePath":"guide/ethers-proxies/usage.md"}'),s={name:"guide/ethers-proxies/usage.md"},i=a('<h1 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h1><p><strong>Most of the usage of Ethers proxies are transparent</strong>, it means you don&#39;t have to directly instanciate the Ethers proxies classes but instead Tulipe performs some automatic instantiations and provides you with simple methods to do so.</p><p>When your DApp initialize :</p><ul><li><code>dapp.provider</code> is automatically filled with an instance of <code>VEProviderProxy</code></li><li><code>dapp.signer</code> is automatically filled with an instance of <code>VESignerProxy</code></li><li>and the contracts you have configured in <a href="/guide/configurations/intuition.html"><code>tulipe.config.js</code> file</a> are used to fill <code>dapp.contracts.*</code> with instances of <code>VEContractProxy</code></li></ul><p>And those methods create Ethers proxies instances :</p><ul><li><code>dapp.contracts.add()</code>. See <code>ContractsList</code> API</li><li><code>dapp.transactions.add()</code>. See <code>TransactionsList</code> API <br><br></li></ul><p>In case you work in some advanced scenarios and want to directly instanciate the Ethers proxies classes, see: <a href="/guide/ethers-proxies/advanced/instantiation.html">Instantiation</a>.</p>',7),n=[i];function r(c,d,p,l,h,u){return t(),o("div",null,n)}const g=e(s,[["render",r]]);export{f as __pageData,g as default};
