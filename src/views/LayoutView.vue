<script setup lang="ts">
import Header from "../components/header/Header-item.vue";
import Sidebar from "../components/sidebar/Sidebar-item.vue";

import { useTodoStore } from "../store/todo";

const todoStore = useTodoStore();
todoStore.fetchTodos();
</script>

<template>
  <div>
    <Header />
    <main class="flex w-full bg-['#11100f']">
      <Sidebar />
      <slot />
    </main>
  </div>
</template>
