<template>
  <div class="container">
    <!-- ダークモード切り替えボタン -->
    <button class="toggle-theme" @click="toggleDarkMode">
      {{ isDark ? "🌙 Dark Mode" : "☀️ Light Mode" }}
    </button>

    <!-- ローディング -->
    <div v-if="isLoading" class="loading">Loading users...</div>

    <!-- エラー表示 -->
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
      <button @click="userStore.fetchUserData()" class="retry">Retry</button>
    </div>

    <!-- ユーザーリストを表示 -->
    <UserList v-if="!isLoading && !errorMessage" :users="users" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/userStore";
import { useDarkMode } from "../composables/useDarkMode";
import UserList from "./UserList.vue";

export default defineComponent({
  components: { UserList },
  setup() {
    const userStore = useUserStore();
    const { users, isLoading, errorMessage } = storeToRefs(userStore);
    const { isDark, toggleDarkMode } = useDarkMode();

    onMounted(() => {
      userStore.fetchUserData();
    });

    return {
      users,
      isLoading,
      errorMessage,
      userStore,
      isDark,
      toggleDarkMode,
    };
  },
});
</script>

<style scoped>
/* 背景のグラデーション */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #e3f2fd, #bbdefb);
  color: #333;
  font-family: "Inter", sans-serif;
  padding: 20px;
  transition: background 0.3s, color 0.3s;
}

/* ダークモード用 */
.dark-mode .container {
  background: linear-gradient(to bottom, #121212, #1e1e1e);
  color: #f0f0f0;
}

/* ダークモード切り替えボタン */
.toggle-theme {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: 2px solid #333;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
}

.dark-mode .toggle-theme {
  border: 2px solid #f0f0f0;
  color: #f0f0f0;
}

.toggle-theme:hover {
  background: rgba(0, 0, 0, 0.1);
}

.dark-mode .toggle-theme:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
