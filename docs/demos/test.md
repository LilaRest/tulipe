---
layout: page
---
<script setup>
import { default as vuethersStyle } from "../../dist/style.css";
import { ConnectWalletButton } from "vuethers";

window.addEventListener("load", () => {
  console.log(document.head.children)
  document.head.innerHTML = "";
  const style = document.createElement("style");
  style.innerHTML = vuethersStyle;
  document.head.append(style)
  const app = document.getElementById("app");
  const demo = document.getElementById("demo");
  document.body.innerHTML = "";
  document.body.appendChild(demo)
})
</script>

<div id="demo">
  <h1>My DApp</h1>
  <ConnectWalletButton/>
</div>
