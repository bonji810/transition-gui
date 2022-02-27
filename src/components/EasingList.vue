<script setup lang="ts">
import { ref, inject, watch } from "vue";
import {
  cubicBezierKey,
  cubicBezierStore,
} from "../composables/useCubicBezier";
import { CONTROL_POINTS, EASING_LIST } from "../utils/constants";
interface Emits {
  (e: "selectCubicBezier"): void;
}
const emit = defineEmits<Emits>();
const props = defineProps({ isGrabbing: Boolean });
const { transformCoordinate } = inject(cubicBezierKey) as cubicBezierStore;

const selectedCubicBezier = ref<number | null>(null);

/**
 * ベジェ曲線のリストが選択された際の処理
 * どれが選択されたかをEasingEditorにemitする
 * @param {number} index - 表示したい名前を指定する。
 */
const selectCubicBezier = (index: number) => {
  const easingList = EASING_LIST[index];
  selectedCubicBezier.value = index;
  const arg = {
    x1: easingList[0],
    x2: easingList[1],
    x3: easingList[2],
    x4: easingList[3],
    min: 10,
    max: 410,
    size: 400,
  };
  transformCoordinate(arg)
  emit("selectCubicBezier");
};

watch(
  () => props.isGrabbing,
  () => (selectedCubicBezier.value = null)
);
</script>

<template>
  <div class="list-container">
    <div class="container">
      <div
        class="item"
        :class="{ '-active': selectedCubicBezier === index }"
        v-for="(point, index) in CONTROL_POINTS"
        :key="index"
        @click="selectCubicBezier(index)"
      >
        <svg class="svg">
          <line
            :x1="point[0].x"
            :y1="point[0].y"
            :x2="point[1].x"
            :y2="point[1].y"
            stroke="#ddb2dd"
            stroke-width="2"
          />
          <line
            :x1="point[2].x"
            :y1="point[2].y"
            :x2="point[3].x"
            :y2="point[3].y"
            stroke="#ddb2dd"
            stroke-width="2"
          />
          <path
            :d="`M${point[0].x} ${point[0].y} C ${point[1].x} ${point[1].y}, ${point[2].x} ${point[2].y}, ${point[3].x} ${point[3].y}`"
            stroke="#444"
            stroke-width="2"
            fill="transparent"
          />
          <circle :cx="point[0].x" :cy="point[0].y" r="5" fill="#666666" class />
          <circle :cx="point[1].x" :cy="point[1].y" r="5" fill="#800080" class="circle" />
          <circle :cx="point[2].x" :cy="point[2].y" r="5" fill="#800080" class="circle" />
          <circle :cx="point[3].x" :cy="point[3].y" r="5" fill="#666666" class />
        </svg>
      </div>
    </div>
  </div>
</template>
