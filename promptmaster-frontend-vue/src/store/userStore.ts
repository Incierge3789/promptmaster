import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchUsers } from "../services/api";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as { id: number; name: string; email: string }[],
    isLoading: false,
    errorMessage: null as string | null,
  }),
  actions: {
    async fetchUserData() {
      try {
        this.isLoading = true;
        this.errorMessage = null;
        this.users = await fetchUsers();
      } catch (error) {
        this.errorMessage = "Failed to fetch users. Please try again later.";
        console.error("API Error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});