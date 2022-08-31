import{_ as s,o as n,c as e,d as a}from"./app.902cdb4f.js";const y=JSON.parse('{"title":"Configurations ~ Usage","description":"","frontmatter":{"title":"Configurations ~ Usage","layout":"doc"},"headers":[],"relativePath":"guide/configurations/usage.md"}'),o={name:"guide/configurations/usage.md"},l=a(`<h1 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h1><p>All your Vuethers DApp configuration happens under the <code>vuethers.config.js</code> file.</p><p>This file export a Javascript object usually called <code>vuethersConfig</code> :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF7B72;">export</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">vuethersConfig</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#FF7B72;">...</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>This object can contains the following keys :</p><ul><li><strong><code>networks</code></strong> (<code>Array</code>) : contains supported chains configuration. See : <a href="/guide/configurations/networks.html">Networks config</a></li><li><strong><code>wallets</code></strong> (<code>Array</code>) : contains supported wallets configuration. See : <a href="/guide/configurations/wallets.html">Wallets config</a></li><li><strong><code>style</code></strong> (<code>Object</code>) : contains DApp styling configurations. See : <a href="/guide/configurations/style.html">Style config</a></li><li><strong><code>defaults</code></strong> (<code>Object</code>) : contains many defaults used for unconfigured elements. See: <a href="/guide/configurations/defaults.html">Defaults config</a><br><br></li></ul><p>Then you just have to feed Vuethers with that configurations file by passing it in the <code>config</code> key of Vuethers plugin registration&#39;s arguments :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#8B949E;">// ...</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { vuethersConfig } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&quot;./vuethers.config.js&quot;</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#8B949E;">// ...</span></span>
<span class="line"><span style="color:#C9D1D9;">app.</span><span style="color:#D2A8FF;">use</span><span style="color:#C9D1D9;">(initVuethers, {</span></span>
<span class="line"><span style="color:#C9D1D9;">  config: vuethersConfig,</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#D2A8FF;">start</span><span style="color:#C9D1D9;">: () </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> app.</span><span style="color:#D2A8FF;">mount</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&quot;#app&quot;</span><span style="color:#C9D1D9;">),</span></span>
<span class="line"><span style="color:#C9D1D9;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>See : <a href="/guide/get-started/setup-your-dapp.html">Setup your DApp</a><br><br></p><p>In the next pages of this documentation you&#39;ll learn how to configure networks, wallets, style, etc. inside this <code>vuethers.config.js</code> file.</p>`,10),t=[l];function p(r,c,i,u,d,g){return n(),e("div",null,t)}const h=s(o,[["render",p]]);export{y as __pageData,h as default};
