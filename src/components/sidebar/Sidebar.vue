<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../../store/todo';
import Category from '../../type/category.js';
import { TagIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

const router = useRouter();

const todoStore = useTodoStore();
const categories = ref<Category[]>(todoStore.categories);
const selectedOptions = ref<string[]>([]);

const filterCategories = () => {
    if(selectedOptions.value.length > 0) {
        const filteredCategories = selectedOptions.value.join(',');
        router.push({ name: 'filter', params: { selectedCategories: filteredCategories } });
    } else {
        router.push('/')
    }   
}

</script>

<template>
    <div class="w-1/5  min-h-screen bg-[#252423] p-5">
        <div class="flex items-center mb-2">
            <TagIcon class="w-4 h-4 mr-2 text-white" />
            <h2 class="text-white">Categories</h2>
        </div>
        
        <div>
            <div class="flex flex-col">
                <label v-for="category in categories" :key="category.name" class="flex items-center my-1 cursor-pointer text-white transition-all hover:text-blue-400">
                    <input @change="filterCategories" type="checkbox" :value="category.name" v-model="selectedOptions" class="mr-3 w-4 h-4 cursor-pointer">
                    {{ category.name }}
                </label>
            </div>
        </div>
    </div>
</template>
