<script setup lang="ts">
import Search from './Search.vue';
import {RectangleStackIcon} from '@heroicons/vue/24/solid'
</script>

<template>
    <div class="flex bg-[#1b1a19] px-5 py-2 text-white border-b border-stone-700">
        <div class="flex items-center w-1/4">
            <RectangleStackIcon class="w-6 h-6" />
            <h1 class="font-bold uppercase ml-4 text-xl">To Do</h1>
        </div>
        <Search/>
    </div>

</template>

<style scoped>
</style>