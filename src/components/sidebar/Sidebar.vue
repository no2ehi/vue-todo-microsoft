<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTodoStore } from "../../store/todo";
import Category from "../../type/category";
import { TagIcon } from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const todoStore = useTodoStore();
const categories = ref<Category[]>(todoStore.categories);
const selectedOptions = ref<string[] | null>([]);

const filterCategories = () => {
  const queries = route.query;
  if (selectedOptions.value?.length === 0) {
    selectedOptions.value = [];
    todoStore.filterTodo(['']);
    router.push({ name: "todos", query: { ...queries, page: 1 } });
  }
    const filteredCategories = selectedOptions.value?.join(",");
    todoStore.filterTodo(selectedOptions.value);
    router.push({
      name: "todos",
      query: {  ...queries, selectedCategories: filteredCategories, page: 1 },
    })
};

onMounted( () => {
  selectedOptions.value = todoStore.selectedCategories ;
});
</script>

<template>
  <div class="w-1/5 min-h-screen bg-[#252423] p-5">

    <div class="flex items-center mb-2">
      <TagIcon class="w-4 h-4 mr-2 text-white" />
      <h2 class="text-white">Categories</h2>
    </div>

    <div>
      <div class="flex flex-col">
        <label
          v-for="category in categories"
          :key="category.name"
          class="flex items-center my-1 cursor-pointer text-white transition-all hover:text-blue-400"
        >
          <input
            @change="filterCategories"
            type="checkbox"
            :value="category.name"
            v-model="selectedOptions"
            class="mr-3 w-4 h-4 cursor-pointer"
          />
          {{ category.name }}
        </label>
      </div>
    </div>
    
  </div>
</template>
