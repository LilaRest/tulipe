<script setup>
import { default as vuethersStyle } from "../../../../dist/style.css";
console.log("AAA")
document.body.style.visibility = "hidden";
window.addEventListener("load", () => {
  console.log("bbb")
  const app = document.getElementById("app");
  app.classList.add("ve-app");
  document.head.innerHTML = "";
  const style = document.createElement("style");
  style.innerHTML = vuethersStyle;
  document.head.append(style)
  const demo = document.getElementById("demo");
  document.body.innerHTML = "";
  app.innerHTML = "";
  app.appendChild(demo)
  document.body.appendChild(app);
  document.body.style.visibility = "visible";
})
</script>

<template>
  <div id="demo">
    <slot></slot>
  </div>
</template>
