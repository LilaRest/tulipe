<script setup>
import { initVuethers } from "vuethers";
import { default as vuethersStyle } from "../../../../../dist/style.css";

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
  config: {
    type: Object,
    required: false,
  }
})

props.app.use(initVuethers, {
  config: props.config ? props.config : {},
  start: loadDemo,
})

document.body.style.overflow = "hidden";
document.body.style.visibility = "hidden";

function loadDemo () {
  const appEl = document.querySelector("#app");
  app.classList.add("ve-app");
  document.head.innerHTML = "";
  const style = document.createElement("style");
  style.innerHTML = vuethersStyle;
  document.head.append(style)
  const demoEl = document.getElementById("demo");
  document.body.innerHTML = "";
  appEl.innerHTML = "";
  appEl.appendChild(demoEl)
  document.body.appendChild(appEl);
  document.body.style.visibility = "visible";

  // Observe changes on the document's height
  const resizeObserver = new ResizeObserver(entries => {
    //Send message to iframe parent when document height changes and send it the new height value.
    window.parent.postMessage(['setHeight', document.documentElement.offsetHeight], '*');
  })
  resizeObserver.observe(document.body)

  // Send the height of the current document state to iframe parent
  window.parent.postMessage(['setHeight', document.documentElement.offsetHeight], '*');
}
</script>

<template>
  <div id="demo">
    <slot></slot>
  </div>
</template>
