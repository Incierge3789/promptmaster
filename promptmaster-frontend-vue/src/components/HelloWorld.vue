<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <h3>Users List</h3>
    <p v-if="isLoading">Loading users...</p>
    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
      <button @click="retryFetchUsers">Retry</button>
    </p>
    <ul v-if="!isLoading && !errorMessage">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>

    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank"
          rel="noopener">typescript</a>
      </li>
    </ul>

    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>

    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import { fetchUsers } from "../services/api";

// ✅ ユーザーの型を定義
interface User {
  id: number;
  name: string;
  email: string;
}

export default defineComponent({
  props: {
    msg: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup() {
    // ✅ 型安全な `ref` を定義
    const users = ref<User[]>([]);
    const isLoading = ref<boolean>(true);
    const errorMessage = ref<string | null>(null);

    // ✅ ユーザーデータを取得する関数
    const loadUsers = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = null;
        users.value = await fetchUsers();
      } catch (error) {
        errorMessage.value = "Failed to fetch users. Please try again later.";
        console.error("API Error:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // ✅ 再試行ボタン用の関数
    const retryFetchUsers = () => {
      loadUsers();
    };

    // ✅ コンポーネントがマウントされたらAPIを実行
    onMounted(loadUsers);

    return {
      users,
      isLoading,
      errorMessage,
      retryFetchUsers,
    };
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.error {
  color: red;
  font-weight: bold;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
