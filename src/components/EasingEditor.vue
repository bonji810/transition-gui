<script setup lang="ts">
import EasingPreview from './EasingPreview.vue'
import { computed, onMounted, ref } from 'vue'

defineProps<{ easing: string }>()

const circleIndex = ref(0);
const isGrab = ref(false);

const points = ref([
  {x: 10,  y: 510},
  {x: 460, y: 450},
  {x: 60,  y: 50},
  {x: 510, y: 10}
])

const offset = ref({
  x: 0,
  y: 0
})

const mouseMove = (e: MouseEvent) => {
  if(isGrab.value) {
    const x = e.pageX - offset.value.x
    const y = e.pageY - offset.value.y

    points.value.splice(circleIndex.value, 1, {
      x: x,
      y: y
    })
  }
}

const mouseUp = () => {
  isGrab.value = false
}

const mouseDownCircle = (e: number) => {
  isGrab.value = true
  circleIndex.value = e
}

const editEasing = computed(() => {
  const params = [
    {x:points.value[1].x, y:points.value[1].y},
    {x:points.value[2].x, y:points.value[2].y}
  ]
  return `cubic-bezier(${params[0].x}, ${params[0].y}, ${params[1].x}, ${params[1].y})`
})

onMounted(() => {
  const rect = document.querySelector('.editor-container')?.getBoundingClientRect()
  offset.value.x = rect!.x
  offset.value.y = rect!.y
})
</script>

<template>
  <EasingPreview :easing="easing" />
  <div class="editor-container">
    <div class="container" @mousemove="mouseMove" @mouseup="mouseUp">
      <svg class="svg">
        <line :x1="points[0].x" :y1="points[0].y" :x2="points[1].x" :y2="points[1].y" stroke="#ddb2dd" stroke-width="4"/>
        <line :x1="points[2].x" :y1="points[2].y" :x2="points[3].x" :y2="points[3].y" stroke="#ddb2dd" stroke-width="4"/>
        <path :d="`M${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`" stroke="#444" stroke-width="4" fill="transparent"/>
        <circle :cx="points[0].x" :cy="points[0].y" r="10" fill="#666666" class="" />
        <circle :cx="points[1].x" :cy="points[1].y" r="10" fill="#800080" class="circle" @mousedown="mouseDownCircle(1)" />
        <circle :cx="points[2].x" :cy="points[2].y" r="10" fill="#800080" class="circle" @mousedown="mouseDownCircle(2)" />
        <circle :cx="points[3].x" :cy="points[3].y" r="10" fill="#666666" class="" />
      </svg>
    </div>
  </div>
  <p class="easing-text">{{ easing }}</p>
  <p>{{editEasing}}</p>
  
</template>

<style scoped>

.easing-text {
  font-size: 16px;
  padding: 4px 16px;
}

.editor-container .container {
  width: 100%;
  height: 600px;
  background-color: #ededed;
}

.svg {
  width: 100%;
  height: 100%;
}

.circle {
  cursor: grab;
}
</style>
