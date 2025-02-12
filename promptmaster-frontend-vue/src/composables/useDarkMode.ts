import { ref, watchEffect } from "vue";

export function useDarkMode() {
  const isDark = ref(localStorage.getItem("theme") === "dark");

  // ダークモードを切り替え
  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    updateBodyClass();
  };

  // body のクラスを更新
  const updateBodyClass = () => {
    document.body.classList.toggle("dark-mode", isDark.value);
  };

  watchEffect(() => {
    updateBodyClass();
  });

  return { isDark, toggleDarkMode };
}
