<template>
  <div class="container">
    <!-- ローディング -->
    <div v-if="isLoading" class="loading">Loading users...</div>

    <!-- エラー表示 -->
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
      <button @click="userStore.fetchUserData()" class="retry">Retry</button>
    </div>

    <!-- ユーザーカード一覧 -->
    <div v-if="!isLoading && !errorMessage" class="user-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="avatar">{{ user.name.charAt(0) }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/userStore";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { users, isLoading, errorMessage } = storeToRefs(userStore);

    onMounted(() => {
      userStore.fetchUserData();
    });

    return {
      users,
      isLoading,
      errorMessage,
      userStore,
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
}

h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* ユーザーリストのレイアウト */
.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 40px;
  max-width: 80vw;
}

/* ユーザーカードのデザイン（ネオモーフィズム） */
.user-card {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: transform 0.4s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 250px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(255, 255, 255, 0.5);
}

.user-card:hover {
  transform: translateY(-8px);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.6);
}

/* ユーザーアバター */
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 10px;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .user-list {
    flex-direction: column;
    align-items: center;
  }
}
</style>


