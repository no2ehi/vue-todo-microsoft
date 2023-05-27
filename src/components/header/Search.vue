<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "../../store/todo";

const router = useRouter();
const route = useRoute();
const todoStore = useTodoStore();
const searchText = ref<string>((route.query.search as string) || "");

const searchTodo = () => {
  let selectedCategories = route.query.selectedCategories;
  if (searchText.value.trim().length > 2) {
    router.push({
      name: "todos",
      query: { selectedCategories: selectedCategories, search: searchText.value, page: "1" },
    });
  } else if (searchText.value.trim().length === 0) {
    searchText.value = "";
    todoStore.clearSearchTodo();
    router.push({ name: "todos", query: { selectedCategories: selectedCategories, page: "1" } });
  }
};
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
