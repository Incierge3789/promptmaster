<template>
  <div id="app" :class="{ 'dark-mode': isDark }">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>{{ title }}</h1>
    <HelloWorld :msg="title" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { useDarkMode } from "./composables/useDarkMode";

export default defineComponent({
  components: { HelloWorld },
  setup() {
    const title = ref<string>("Welcome to Your Vue.js + TypeScript App");
    const { isDark } = useDarkMode();

    return { title, isDark };
  },
});
</script>

<style>
/* ダークモード適用 */
.dark-mode {
  background-color: #121212;
  color: #f0f0f0;
}
</style>
