<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "../../store/todo";

const router = useRouter();
const route = useRoute();
const todoStore = useTodoStore();
const searchText = ref<string>("");
let timeoutId:null | number = null;

const searchTodo = () => {
  if (timeoutId) {
      clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    
    let queries = route.query;
    if (searchText.value.trim().length === 0) {
      searchText.value = "";
      todoStore.searchTodo('')
      router.push({ name: "todos", query: { ...queries, page: "1" } });
    }
    todoStore.searchTodo(searchText.value);
    router.push({
      name: "todos",
      query: { ...queries, search: searchText.value, page: "1" },
    })
  }, 500);

};
onMounted(() => {
  searchText.value = todoStore.searchText;
})
</script>

<template>
  <div class="w-1/4">
    <input
      @input="searchTodo"
      v-model.trim="searchText"
      type="text"
      class="w-full px-3 py-1 rounded bg-[#484644] text-white outline-none focus:shadow-md"
      placeholder="search..."
    />
  </div>
</template>
