import{_ as s,o as n,c as a,d as e}from"./app.f40b3264.js";const b=JSON.parse('{"title":"DApp object ~ Usage","description":"","frontmatter":{"title":"DApp object ~ Usage","layout":"doc"},"headers":[{"level":2,"title":"From Javascript","slug":"from-javascript","link":"#from-javascript","children":[{"level":3,"title":"Using the Composition API","slug":"using-the-composition-api","link":"#using-the-composition-api","children":[]},{"level":3,"title":"Using the Options API","slug":"using-the-options-api","link":"#using-the-options-api","children":[]}]},{"level":2,"title":"From templates","slug":"from-templates","link":"#from-templates","children":[]}],"relativePath":"guide/dapp-object/usage.md"}'),p={name:"guide/dapp-object/usage.md"},l=e(`<h1 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h1><p>The <code>dapp</code> object is <strong>available anywhere</strong> in your Vue project.</p><p>It is <strong>always safe to be accessed</strong> (but not to be used, see <a href="/guide/safers/intuition.html">Safers</a>).</p><p>The below headings will show you how to access it from different contexts :</p><h2 id="from-javascript" tabindex="-1">From Javascript <a class="header-anchor" href="#from-javascript" aria-hidden="true">#</a></h2><h3 id="using-the-composition-api" tabindex="-1">Using the Composition API <a class="header-anchor" href="#using-the-composition-api" aria-hidden="true">#</a></h3><p>If your are using the Vue&#39;s <a href="https://vuejs.org/guide/introduction.html#composition-api" target="_blank" rel="noreferrer">Composition API</a> you can access the <code>dapp</code> object with a simple <code>import</code> statement :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { dapp } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&quot;tulipe&quot;</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">getSignerAddress</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#FF7B72;">return</span><span style="color:#C9D1D9;"> dapp.signer.address</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="using-the-options-api" tabindex="-1">Using the Options API <a class="header-anchor" href="#using-the-options-api" aria-hidden="true">#</a></h3><p>If your are using the Vue&#39;s <a href="https://vuejs.org/guide/introduction.html#options-api" target="_blank" rel="noreferrer">Options API</a> you can access the <code>dapp</code> object without import at <code>this.dapp</code> :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF7B72;">export</span><span style="color:#FFA657;"> </span><span style="color:#FF7B72;">default</span><span style="color:#FFA657;"> {</span></span>
<span class="line"><span style="color:#FFA657;">  </span><span style="color:#C9D1D9;">methods: {</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#D2A8FF;">getSignerAddress</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">      </span><span style="color:#FF7B72;">return</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">this</span><span style="color:#C9D1D9;">.dapp.signer.address</span></span>
<span class="line"><span style="color:#C9D1D9;">    }</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span><span style="color:#FFA657;">,</span></span>
<span class="line"><span style="color:#FFA657;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>However you can still import the <code>dapp</code> object explicitly if your prefer :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { dapp } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&quot;tulipe&quot;</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">export</span><span style="color:#FFA657;"> </span><span style="color:#FF7B72;">default</span><span style="color:#FFA657;"> {</span></span>
<span class="line"><span style="color:#FFA657;">  </span><span style="color:#C9D1D9;">methods: {</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#D2A8FF;">getSignerAddress</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">      </span><span style="color:#FF7B72;">return</span><span style="color:#C9D1D9;"> dapp.signer.address</span></span>
<span class="line"><span style="color:#C9D1D9;">    }</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span><span style="color:#FFA657;">,</span></span>
<span class="line"><span style="color:#FFA657;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="from-templates" tabindex="-1">From templates <a class="header-anchor" href="#from-templates" aria-hidden="true">#</a></h2><p>In template you can access the <code>dapp</code> object without any imports as it has been registered as Vue&#39;s <a href="https://vuejs.org/api/application.html#app-config-globalproperties" target="_blank" rel="noreferrer"><code>globalProperties</code></a> :</p><div class="language-html line-numbers-mode"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;</span><span style="color:#FFA198;">dapp.signer.OnSafe</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">p</span><span style="color:#C9D1D9;">&gt;Wallet address : {{ dapp.signer.address }}&lt;/</span><span style="color:#7EE787;">p</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;/</span><span style="color:#FFA198;">dapp.signer.OnSafe</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Again, if you prefer, you can still import it explicitly in <code>&lt;script&gt;</code> :</p><div class="language-html line-numbers-mode"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">setup</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { dapp } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&quot;tulipe&quot;</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;</span><span style="color:#FFA198;">dapp.signer.OnSafe</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">p</span><span style="color:#C9D1D9;">&gt;Wallet address : {{ dapp.signer.address }}&lt;/</span><span style="color:#7EE787;">p</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;/</span><span style="color:#FFA198;">dapp.signer.OnSafe</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,18),o=[l];function t(r,c,i,d,u,y){return n(),a("div",null,o)}const m=s(p,[["render",t]]);export{b as __pageData,m as default};