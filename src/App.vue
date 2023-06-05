<script setup lang="ts">
import { watch } from 'vue';
import LayoutView from './views/LayoutView.vue';
import { useRoute } from 'vue-router';
import { useTodoStore } from './store/todo';

const route = useRoute();
const todoStore = useTodoStore();

watch(() => route.query, () => {
  if(route.query?.page) {
    todoStore.setCurrentPage((route.query?.page as unknown) as number);
  }
})
</script>

<template>
  <LayoutView>
    <RouterView/>
  </LayoutView>
</template>