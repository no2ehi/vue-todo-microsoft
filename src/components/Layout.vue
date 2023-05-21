<script setup lang="ts">
import Header from './header/Header.vue';
import Sidebar from './sidebar/Sidebar.vue';
</script>

<template>
    <div>
        <Header/>
        <main class="flex w-full bg-['#11100f']">
            <Sidebar/>
            <slot />
        </main>
    </div>
</template>