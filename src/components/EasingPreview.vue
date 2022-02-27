<script setup lang="ts">
import { inject } from 'vue'
import { cubicBezierKey, cubicBezierStore } from '../composables/useCubicBezier';

const { easing } = inject(cubicBezierKey) as cubicBezierStore
</script>

<template>
  <div class="preview-container">
    <div class="container">
      <div class="circle" :style="`animation-timing-function: cubic-bezier(${easing[0]},${easing[1]},${easing[2]},${easing[3]})`"></div>
    </div>
  </div>
</template>
