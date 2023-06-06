<template>
  <nav>
    <ul class="flex items-center ml-8">
      <li
        class="text-blue-400 cursor-pointer px-2 py-1 bg-stone-900 rounded transition-all hover:bg-stone-800"
        :class="{ disabled: page === 1 }"
      >
        <router-link
          :to="{ name: 'todos', query: { ...queries, page: page - 1 } }"
          rel="prev"
          @click="setCurrentPage(page - 1)"
          >Previous</router-link
        >
      </li>  

      <li v-for="pageNumber in pageNumbers" :key="pageNumber">
        <router-link
          @click="setCurrentPage(pageNumber)"
          :to="{ name: 'todos', query: { ...queries, page: pageNumber } }"
          class="text-blue-400 cursor-pointer px-2 py-1 bg-stone-900 rounded transition-all hover:bg-stone-800 mx-1"
          :class="{ active: page === pageNumber }"
          >{{ pageNumber }}</router-link
        >
      </li>

      <li
        class="text-blue-400 cursor-pointer px-2 py-1 bg-stone-900 rounded transition-all hover:bg-stone-800"
        :class="{ disabled: page === totalPages }"
      >
        <router-link
          @click="setCurrentPage(page + 1)"
          :to="{ name: 'todos', query: { ...queries, page: page + 1 } }"
          rel="next"
          >Next</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { LocationQueryRaw, useRoute } from "vue-router";
import { useTodoStore } from "../../store/todo.js";

const props = defineProps(["totalCount", "pageSize"]);
const queries = ref<LocationQueryRaw>({});
const todoStore = useTodoStore();

const totalPages = computed(() => Math.ceil(props.totalCount / props.pageSize));

const route = useRoute();

const page = computed(() => parseInt(route.query.page?.toString() || "1", 10));
const pageNumbers = computed(() => {
  const count = Math.min(5, totalPages.value);
  const start = Math.max(1, page.value - Math.floor(count / 2));
  const end = Math.min(totalPages.value, start + count - 1);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

function setCurrentPage(currentPage: number) {
  if(!currentPage) return;
  todoStore.setCurrentPage(currentPage);
}

</script>

<style scoped>
.active {
  background-color: transparent;
  color: white;
  margin: 0;
}
.active:hover {
  background-color: transparent;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
