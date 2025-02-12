import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();
console.log("Pinia instance:", pinia); // ✅ デバッグ用に追加

const app = createApp(App);
app.use(pinia);
app.mount("#app");
