<script setup lang="ts">
import { provide } from 'vue';
import EasingEditor from './components/EasingEditor.vue';
import { cubicBezierKey, useCubicBezier } from './composables/useCubicBezier';

provide(cubicBezierKey, useCubicBezier())

</script>

<template>
  <easing-editor />
</template>
