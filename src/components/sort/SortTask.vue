
<script setup lang="ts">
import { ref } from 'vue';

import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['sort']);
const showSort = ref<boolean>(false);

interface typeSort {
    id: number,
    type: string,
    name: string
}

const listTypeSort: typeSort[] = [
    {
        id: 1,
        type: 'ASC',
        name: 'Alphabetical (Ascending)' 
    },
    {
        id: 1,
        type: 'DESC', 
        name: 'Alphabetical (Descending)'
    },
    {
        id: 1,
        type: 'ID',
        name: 'ID (Descending)'
    },
]
const ShowSortTask = () => {
    showSort.value = !showSort.value; 
}

const selectTypeSort = (list: typeSort) => {
    showSort.value = false;
    emit('sort', list.type);
}

</script>

<template>
    <div @click="ShowSortTask"  class="relative flex items-center cursor-pointer px-2 py-1 bg-stone-900 rounded transition-all hover:bg-stone-800">
        <ArrowLongDownIcon class="w-4 h-4 text-blue-400" />
        <ArrowLongUpIcon class="w-4 h-4 text-blue-400 -ml-2" />
        <span class="text-blue-400">Sort</span>

        <div v-if="showSort" @mouseleave="ShowSortTask" class="absolute top-9 right-0 w-[200px] h-auto flex flex-col bg-[#0b0b0b] border border-blue-300 rounded-md py-2 px-4 shadow-md">
            <div v-for="list in listTypeSort" @click="selectTypeSort(list)" :key="list.id" class="py-1.5 text-stone-200 hover:text-blue-300 transition-all text-sm">{{ list.name }}</div>
        </div>
    </div>
</template>

