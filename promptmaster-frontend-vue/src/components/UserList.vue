<template>
  <div class="user-list">
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import UserCard from "./UserCard.vue";

export default defineComponent({
  components: { UserCard },
  props: {
    users: {
      type: Array as PropType<{ id: number; name: string; email: string }[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 40px;
  max-width: 80vw;
}
</style>
