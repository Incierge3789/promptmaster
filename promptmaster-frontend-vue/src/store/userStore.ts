import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchUsers } from '../services/api';
import type { User } from '../services/api'; // 型のみのインポート

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([]);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const loadUsers = async () => {
    isLoading.value = true;
    try {
      users.value = await fetchUsers();
    } catch (error) {
      errorMessage.value = "Failed to fetch users.";
    } finally {
      isLoading.value = false;
    }
  };

  return { users, isLoading, errorMessage, loadUsers };
});
