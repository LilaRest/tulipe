import{_ as e,o,c as d,d as t}from"./app.ab7c4970.js";const m=JSON.parse('{"title":"VEPlaceholder","description":"","frontmatter":{},"headers":[{"level":2,"title":"Properties","slug":"properties","link":"#properties","children":[]},{"level":2,"title":"Methods","slug":"methods","link":"#methods","children":[]},{"level":2,"title":"Components","slug":"components","link":"#components","children":[]}],"relativePath":"guide/ethers-proxies/advanced/apis-in-depth/placeholders/ve-placeholder.md"}'),c={name:"guide/ethers-proxies/advanced/apis-in-depth/placeholders/ve-placeholder.md"},a=t('<h1 id="veplaceholder" tabindex="-1"><code>VEPlaceholder</code> <a class="header-anchor" href="#veplaceholder" aria-hidden="true">#</a></h1><p>The <code>VEPlaceholder</code> class is never used directly in Tulipe but is the parent of every other Ethers placeholder classes.</p><p>Here is the detailed Application Programming Interface of a <code>VEPlaceholder</code> instance :</p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><ul><li><code>.status</code>:</li><li>type: <code>null</code></li><li>indication: must be overriden with a <code>VEStatus</code> instance by child classes</li><li><code>.safeStatus</code>:</li><li>type: <code>null</code></li><li>indication: must be overriden with a status name <code>String</code> by child classes</li><li><code>.isSafe</code> : <ul><li>type: computed property</li><li>returns :<code>true</code> if <code>.status</code> is equal to <code>.safeStatus</code>, else <code>false</code></li></ul></li></ul><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h2><ul><li><code>.onSafe(&lt;callback&gt;)</code> : execute <code>callback</code> when <code>.isSafe</code> is <code>true</code></li></ul><h2 id="components" tabindex="-1">Components <a class="header-anchor" href="#components" aria-hidden="true">#</a></h2><ul><li><code>.OnSafe</code> : render given <code>slot</code> when <code>.isSafe</code> is <code>true</code></li></ul>',9),l=[a];function i(s,r,n,h,p,u){return o(),d("div",null,l)}const f=e(c,[["render",i]]);export{m as __pageData,f as default};
