<script setup lang="ts">
import { gsap, Power2 } from 'gsap'
import EasingPreview from './EasingPreview.vue'
import EasingList from './EasingList.vue'
import { onMounted, ref, inject } from 'vue'
import { cubicBezierKey, cubicBezierStore } from '../composables/useCubicBezier'
const { easing, points, createEasing, transformCoordinate } = inject(cubicBezierKey) as cubicBezierStore
const CANVAS_SIZE = 400
const CURVE_MIN = 10
const CURVE_MAX = 410
const pathElem = ref()
const circleTopElem = ref()
const circleBottomElem = ref()
const lineTopElem = ref()
const lineBottomElem = ref()
const svgPath = ref('');
const circleIndex = ref(0);
const isGrabing = ref(false);
const controlPoints = ref([
  { x: 10, y: 410 },
  { x: 316, y: 410 },
  { x: 106, y: 20 },
  { x: 410, y: 10 }
])
const canvasOffset = ref({
  x: 0,
  y: 0
})

/**
 * 円の座標位置が最大値、最小値を超えないようにする
 * @return {number} - 最大/最小値と比較して超えた場合は最大/最小値が戻る
 */
const minify = (num: number) => {
  return Math.min(CURVE_MAX, Math.max(CURVE_MIN, num))
}

/**
 * マウスドラッグでSVGのパスを変更
 */
const mouseMove = (e: MouseEvent) => {
  if (isGrabing.value) {
    const x = e.pageX - canvasOffset.value.x
    const y = e.pageY - canvasOffset.value.y
    controlPoints.value.splice(circleIndex.value, 1, {
      x: minify(x),
      y: minify(y)
    })

    const easingArg = {
      x1: controlPoints.value[1].x,
      y1: controlPoints.value[1].y,
      x2: controlPoints.value[2].x,
      y2: controlPoints.value[2].y,
      min: CURVE_MIN,
      max: CURVE_MAX,
      size: CANVAS_SIZE,
    }
    createEasing(easingArg)

    const coordinateArg = {
      x1: easing.value[0],
      x2: easing.value[1],
      x3: easing.value[2],
      x4: easing.value[3],
      min: CURVE_MIN,
      max: CURVE_MAX,
      size: CANVAS_SIZE,
    }
    transformCoordinate(coordinateArg)

    svgPath.value = `M${controlPoints.value[0].x} ${controlPoints.value[0].y} C ${controlPoints.value[1].x} ${controlPoints.value[1].y}, ${controlPoints.value[2].x} ${controlPoints.value[2].y}, ${controlPoints.value[3].x} ${controlPoints.value[3].y}`
    pathElem.value.setAttribute('d', svgPath.value)
    circleTopElem.value.setAttribute('cx', controlPoints.value[1].x)
    circleTopElem.value.setAttribute('cy', controlPoints.value[1].y)
    circleBottomElem.value.setAttribute('cx', controlPoints.value[2].x)
    circleBottomElem.value.setAttribute('cy', controlPoints.value[2].y)
    lineTopElem.value.setAttribute('x1', controlPoints.value[0].x)
    lineTopElem.value.setAttribute('x2', controlPoints.value[1].x)
    lineTopElem.value.setAttribute('y1', controlPoints.value[0].y)
    lineTopElem.value.setAttribute('y2', controlPoints.value[1].y)
    lineBottomElem.value.setAttribute('x1', controlPoints.value[2].x)
    lineBottomElem.value.setAttribute('x2', controlPoints.value[3].x)
    lineBottomElem.value.setAttribute('y1', controlPoints.value[2].y)
    lineBottomElem.value.setAttribute('y2', controlPoints.value[3].y)

  }
}

/**
 * ドラッグ状態を終了する
 */
const mouseUp = () => {
  isGrabing.value = false
}

/**
 * ドラッグ状態を終了する
 */
const mouseDown = (e: number) => {
  isGrabing.value = true
  circleIndex.value = e
}

/**
 * 左側にあるベジェ曲線一覧を選択された際の処理
 * 
 */
const selectCubicBezier = () => {
  controlPoints.value[1].x = points.value[0].x
  controlPoints.value[1].y = points.value[0].y
  controlPoints.value[2].x = points.value[1].x
  controlPoints.value[2].y = points.value[1].y

  svgPath.value = `M${controlPoints.value[0].x} ${controlPoints.value[0].y} C ${controlPoints.value[1].x} ${controlPoints.value[1].y}, ${controlPoints.value[2].x} ${controlPoints.value[2].y}, ${controlPoints.value[3].x} ${controlPoints.value[3].y}`

  // パスをモーフィングさせる
  gsap.to(pathElem.value, 0.3, {
    ease: Power2.easeOut,
    attr: {
      d: svgPath.value
    }
  })

  gsap.to(circleTopElem.value, 0.3, {
    ease: Power2.easeOut,
    attr: {
      cx: controlPoints.value[1].x,
      cy: controlPoints.value[1].y
    }
  })
  gsap.to(circleBottomElem.value, 0.3, {
    ease: Power2.easeOut,
    attr: {
      cx: controlPoints.value[2].x,
      cy: controlPoints.value[2].y
    }
  })
  gsap.to(lineTopElem.value, 0.3, {
    ease: Power2.easeOut,
    attr: {
      x1: controlPoints.value[0].x,
      x2: controlPoints.value[1].x,
      y1: controlPoints.value[0].y,
      y2: controlPoints.value[1].y,
    }
  })
  gsap.to(lineBottomElem.value, 0.3, {
    ease: Power2.easeOut,
    attr: {
      x1: controlPoints.value[2].x,
      x2: controlPoints.value[3].x,
      y1: controlPoints.value[2].y,
      y2: controlPoints.value[3].y,
    }
  })

  const easingArg = {
    x1: controlPoints.value[1].x,
    y1: controlPoints.value[1].y,
    x2: controlPoints.value[2].x,
    y2: controlPoints.value[2].y,
    min: CURVE_MIN,
    max: CURVE_MAX,
    size: CANVAS_SIZE,
  }
  createEasing(easingArg)
}

onMounted(() => {
  const { x, y } = document.getElementById('editor')!.getBoundingClientRect()
  const { pageXOffset, pageYOffset } = window
  canvasOffset.value.x = pageXOffset + x
  canvasOffset.value.y = pageYOffset + y
})

</script>

<template>
  <div class="section-container" @mousemove="mouseMove" @mouseup="mouseUp">
    <div>
      <EasingPreview />
      <div class="flex-container">
        <div class="container">
          <EasingList :isGrabbing="isGrabing" @select-cubic-bezier="selectCubicBezier" />
          <div class="editor-container">
            <div id="editor" class="container">
              <div class="background"></div>
              <svg class="svg">
                <line
                  x1="10"
                  y1="410"
                  x2="316"
                  y2="410"
                  stroke="#ddb2dd"
                  stroke-width="3"
                  ref="lineTopElem"
                />
                <line
                  x1="106"
                  y1="20"
                  x2="410"
                  y2="10"
                  stroke="#ddb2dd"
                  stroke-width="3"
                  ref="lineBottomElem"
                />
                <path
                  :d="`M10 410 C 316 410, 106 20, 410 10`"
                  stroke="#444"
                  stroke-width="3"
                  fill="transparent"
                  ref="pathElem"
                />
                <circle
                  :cx="controlPoints[0].x"
                  :cy="controlPoints[0].y"
                  r="10"
                  fill="#666666"
                  class
                />
                <circle
                  cx="316"
                  cy="410"
                  r="10"
                  fill="#800080"
                  class="circle"
                  ref="circleTopElem"
                  @mousedown="mouseDown(1)"
                />
                <circle
                  cx="106"
                  cy="20"
                  r="10"
                  fill="#800080"
                  class="circle"
                  ref="circleBottomElem"
                  @mousedown="mouseDown(2)"
                />
                <circle
                  :cx="controlPoints[3].x"
                  :cy="controlPoints[3].y"
                  r="10"
                  fill="#666666"
                  class
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p
        class="easing-text"
      >cubic-bezier( {{ easing[0] }}, {{ easing[1] }}, {{ easing[2] }}, {{ easing[3] }} )</p>
    </div>
  </div>
</template>