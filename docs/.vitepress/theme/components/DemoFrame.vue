<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: false,
  }
})

  // Dynamically resize the iframe height when receiving setHeight message from the iframe (it must have been created with the DemoCreator component).
  window.addEventListener('message', function (e) {
    // Retrieve the iframe element.
    const iframe = document.querySelector(`div.demo-frame iframe[src='${props.src}']`);

    const eventName = e.data[0];
    const data = e.data[1];
    if (eventName === "setHeight") {
      const demoFrameComputed = window.getComputedStyle(iframe.parentElement)
      const height = data + parseInt(demoFrameComputed.getPropertyValue("padding-top").replace("px", "")) + parseInt(demoFrameComputed.getPropertyValue("padding-bottom").replace("px", ""));
      iframe.parentElement.style.height = height + "px";
    }
  }, false);

function removeLoader (event) {
  event.target.parentElement.classList.remove("loading");
  event.target.style.visibility = "visible";
}
</script>

<template>
  <div class="demo-frame loading" :height="props.height" @load="initIframeAutoResize">
    <iframe :src="props.src" @load="removeLoader"></iframe>
  </div>
</template>

<style computed>
@keyframes placeHolderShimmer{
    0%{
        background-position: -1000px 0
    }
    100%{
        background-position: 1000px 0
    }
}

div.demo-frame {
  width: 100%;
  display: block;
  border-radius: 10px;
  border-color: #42b883;
  padding-right: 40px;
  padding-left: 40px;
  padding-top: 25px;
  padding-bottom: 29px;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
  margin-bottom: 1.2em;
  transition: background-color .5s ease, height 150ms ease;
  overflow: hidden;
  border-style: outset;
  border-color: #42d392;
  border-width: 4px;
}

div.demo-frame.loading {
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: darkgray;
  background: linear-gradient(80deg, whitesmoke 0%, #42d39244 25%, whitesmoke 50%, #42d39244 75%, whitesmoke 100%);
  background-size: 1000px 100%;
  height: 100%;
}
div.demo-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
  visibility: hidden;
  display: block;
}

</style>
