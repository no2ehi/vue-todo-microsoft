
<script setup lang="ts">
import { ref, Ref } from 'vue';

import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['sort']);

// false: ASC ------- true: DESC
const typeSort: Ref<boolean> = ref(false);

const sortTask = () => {
    typeSort.value = !typeSort.value;
    emit('sort', typeSort.value)
}

</script>

<template>
    <div @click="sortTask" class="flex items-center cursor-pointer px-2 py-1 bg-stone-900 rounded transition-all hover:bg-stone-800">
        <ArrowLongDownIcon class="w-4 h-4 text-blue-400" />
        <ArrowLongUpIcon class="w-4 h-4 text-blue-400 -ml-2" />
        <span class="text-blue-400">Sort</span>
    </div>
</template>