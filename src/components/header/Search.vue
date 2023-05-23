<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchText = ref<string>('');
const router = useRouter();

const searchTodo = () => {
    if(searchText.value.trim().length > 2) {
        router.push({ name: 'search', params: { term: searchText.value } });
    } else if(searchText.value.length === 0) {
        router.push('/')
    }
}

</script>

<template>
    <div class="w-1/4">
        <input @input="searchTodo" v-model.trim="searchText" type="text" class="w-full px-3 py-1 rounded bg-[#484644] text-white outline-none " placeholder="search..." />
    </div>
</template>