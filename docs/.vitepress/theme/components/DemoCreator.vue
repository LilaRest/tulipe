<script setup>
import { default as vuethersStyle } from "../../../../dist/style.css";

// Set body to overflow hidden.
document.body.style.overflow = "hidden";

// The follow trick allows to benefits of the Vitepress build for Vuethers demos
// This allows to quickly run isolated Vuethers examples in iframe
// The trick is to start from a vitepress page and to remove everything except
// the Vuethers example to only benefits of the initialized Vue instance
// without any other script and styles.
document.body.style.visibility = "hidden";
window.addEventListener("load", () => {
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

  // Observe changes on the document's height
  const resizeObserver = new ResizeObserver(entries => {
    //Send message to iframe parent when document height changes and send it the new height value.
    window.parent.postMessage(['setHeight', document.documentElement.offsetHeight], '*');
  })
  resizeObserver.observe(document.body)

  // Send the height of the current document state to iframe parent
  window.parent.postMessage(['setHeight', document.documentElement.offsetHeight], '*');
})
</script>

<template>
  <div id="demo">
    <slot></slot>
  </div>
</template>
