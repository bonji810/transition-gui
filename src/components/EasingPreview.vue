<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ easing: string }>()

const count = ref(0)
</script>

<template>
  <div class="preview-container">
    <div class="container">
      <div class="circle" :style="`animation-transition:${easing};`"></div>
    </div>
  </div>
</template>

<style scoped>
.circle {
  width: 20px;
  height: 20px;
  background-color: #800080;
  border-radius: 50%;
  animation: anime 1s infinite;
}

@keyframes anime {
 0% {
   transform: translateX(0);
 }
 100% {
   transform: translateX(100px);
 }
}
</style>
