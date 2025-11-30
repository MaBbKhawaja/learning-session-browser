<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue'
import Toggle from './components/Toggle.vue'
const userName = ref('John Doe')
const search = ref('')
const isDarkMode = ref(false)
</script>

<template>
  <div>
    <Input v-model="search" />
    <Toggle v-model="isDarkMode" />
  </div>
</template>

<style scoped>
</style>
