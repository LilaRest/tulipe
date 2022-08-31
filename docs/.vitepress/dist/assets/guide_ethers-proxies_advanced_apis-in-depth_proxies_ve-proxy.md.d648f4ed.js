import{_ as e,o as t,c as o,d as r}from"./app.902cdb4f.js";const u=JSON.parse('{"title":"VEProxy","description":"","frontmatter":{},"headers":[{"level":2,"title":"Properties","slug":"properties","link":"#properties","children":[]},{"level":2,"title":"Methods","slug":"methods","link":"#methods","children":[]}],"relativePath":"guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-proxy.md"}'),s={name:"guide/ethers-proxies/advanced/apis-in-depth/proxies/ve-proxy.md"},n=r('<h1 id="veproxy" tabindex="-1"><code>VEProxy</code> <a class="header-anchor" href="#veproxy" aria-hidden="true">#</a></h1><p>The <code>VEProxy</code> class is never used directly in Vuethers but is the parent of every other Ethers proxies classes.</p><p>Here is the detailed Application Programming Interface of a <code>VEProxy</code> instance :</p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><ul><li><strong><code>.&lt;ethersInstance.*&gt;</code></strong> : all the properties of <code>proxy.ethersInstance</code></li><li><strong><code>.&lt;extensionInstance.*&gt;</code></strong> : all the properties of <code>proxy.extensionInstance</code></li><li><strong><code>.&lt;placeholderInstance.*&gt;</code></strong> : all the properties of <code>proxy.placeholderInstance</code></li><li><strong><code>.proxy</code></strong> : allows to interact with the Ethers proxy <ul><li>type: <code>Object</code></li></ul></li></ul><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h2><ul><li><strong><code>.proxy.setEthersInstance(&lt;ethersInstance&gt;)</code></strong> : set the current Ethers.js instance</li><li><strong><code>.proxy.getEthersInstance()</code></strong> : returns the current Ethers.js instance</li><li><strong><code>.proxy.setExtensionInstance(&lt;extensionInstance&gt;)</code></strong> : set the current <code>Extension</code> instance</li><li><strong><code>.proxy.getExtensionInstance()</code></strong> : returns the current <code>Extension</code> instance</li><li><strong><code>.proxy.setPlaceholderInstance(&lt;placeholderInstance&gt;)</code></strong> : set the current <code>Placeholder</code> instance</li><li><strong><code>.proxy.getPlaceholderInstance()</code></strong> : returns the current <code>Placeholder</code> instance</li></ul>',7),c=[n];function d(i,a,l,h,p,x){return t(),o("div",null,c)}const _=e(s,[["render",d]]);export{u as __pageData,_ as default};
