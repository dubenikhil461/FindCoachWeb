<template>
    <header class="app-header">
        <h2 class="text-6xl font-bold">{{ title }}</h2>
    </header>
</template>

<script setup>
// no need to export the component as use script setup
import { ref } from 'vue'

const title = ref('Find Coach')
</script>
