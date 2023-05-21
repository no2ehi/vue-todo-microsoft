<script setup lang="ts">
import Layout from './Layout.vue';
import TodoList from './TodoList.vue';
import { useTodoStore } from '../store/todo';

const todoStore = useTodoStore();
todoStore.fetchTodos();


</script>

<template>
    <Layout>
        <TodoList/>
    </Layout>
</template>
