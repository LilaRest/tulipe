<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { computed, inject, ref } from 'vue'
import { useData } from 'vitepress'
import { isActive } from '../../../../node_modules/vitepress/dist/client/theme-default/support/utils.js'
import VPLink from '../../../../node_modules/vitepress/dist/client/theme-default/components/VPLink.vue'

const props = withDefaults(defineProps<{ item: DefaultTheme.SidebarItem; depth?: number }>(), { depth: 1 })

const { page, frontmatter } = useData()
const maxDepth = computed<number>(() => frontmatter.value.sidebarDepth || Infinity)
const closeSideBar = inject('close-sidebar') as () => void
let collapsed = props.item.collapsed ? ref(props.item.collapsed) : ref(false);
const toggleCollapse = () => {collapsed.value = !collapsed.value}
</script>

<template>
  <VPLink
    class="link"
    :class="{ active: isActive(page.relativePath, item.link), offset: depth > 1 }"
    :href="item.link"
  >
  <!-- @click="closeSideBar" -->
    <span class="link-text" :class="{ light: depth > 1 }" @click="toggleCollapse">
      <span v-html="item.text"></span>
      <span class="collapse-symbol">{{ item.collapsible ? ` ${collapsed ? "+" : "-"}` : ""}}</span>
    </span>
    <template v-if="!collapsed">
      <template
      v-if="'items' in item && depth < maxDepth"
      v-for="child in item.items"
      :key="child.link"
      >
      <VPSidebarLink :item="child" :depth="depth + 1" />
    </template>
    </template>
  </VPLink>
</template>

<style scoped>
.link {
  display: block;
  margin: 4px 0;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.link.offset {
  padding-left: 16px;
}

.link:hover {
  color: var(--vp-c-text-1);
}

.link.active {
  color: var(--vp-c-brand);
}

.link :deep(.icon) {
  width: 12px;
  height: 12px;
  fill: currentColor;
}

.link-text {
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}

.link-text.light {
  font-size: 13px;
  font-weight: 400;
}

.link-text .collapse-symbol {
  font-weight: bold;
  font-size: 16px;
  color: var(--vp-c-brand);
  opacity: 0.7;
  transition-duration: 300ms;
}

.link-text:hover .collapse-symbol {
  opacity: 1;
}
</style>
