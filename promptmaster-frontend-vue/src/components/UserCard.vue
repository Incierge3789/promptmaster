<template>
  <div class="user-card">
    <div class="avatar">{{ user.name.charAt(0) }}</div>
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<{ id: number; name: string; email: string }>,
      required: true,
    },
  },
});
</script>

<style scoped>
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
</style>
