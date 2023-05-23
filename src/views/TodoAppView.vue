<script setup lang="ts">
import LayoutView from './LayoutView.vue';
import { useTodoStore } from '../store/todo';

const todoStore = useTodoStore();
todoStore.fetchTodos();

</script>

<template>
    <LayoutView>
        <RouterView/>
    </LayoutView>
</template>
