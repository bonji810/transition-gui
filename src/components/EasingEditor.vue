<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>hello</h1>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>
