<script setup lang="ts">
import EasingEditor from './components/EasingEditor.vue'

const easing = 'cubic-bezier(2.45, 0.6, 4, 0.1)'

</script>



<template>
 <easing-editor :easing="easing" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
