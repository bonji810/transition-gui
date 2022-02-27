import { InjectionKey, ref } from 'vue';
interface TransformCoordinate {
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  min: number;
  max: number;
  size: number;
}

interface CreateEasing {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  min: number;
  max: number;
  size: number;
}

export const useCubicBezier = () => {
  /**
   * cubic-bezierの値
  */
  const easing = ref([0.76, 0, 0.24, 1]);
  /**
   * 座標の値
  */
  const points = ref([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  /**
   * 座標からcubic-bezierで使用する値を出す為の正規化処理
   * どれが選択されたかをEasingEditorにemitする
   * @return {number} - 0 ~ 1に正規化された値で戻る
  */
  const normalizeEasing = (
    point: number,
    min: number,
    max: number,
    size: number
  ) => {
    if (point === min) return 0;
    if (point == max) return 1;
    return Math.floor((100 * (point - min)) / size) / 100;
  };

  /**
   * cubic-bezierを更新する
  */
  const createEasing = (arg: CreateEasing) => {
    const { x1, y1, x2, y2, min, max, size } = arg;
    const params = {
      x1: normalizeEasing(x1, min, max, size),
      y1: normalizeEasing(max - y1, min, max, size),
      x2: normalizeEasing(x2, min, max, size),
      y2: normalizeEasing(max - y2, min, max, size),
    };
    easing.value = [params.x1, params.y1, params.x2, params.y2];
  };

  /**
   * cubic-bezierの値から座標の値に変換する
   * @return {number} - 座標の値が戻る
  */
  const normalizePoint = (
    point: number,
    min: number,
    max: number,
    size: number
  ) => {
    if (point === 0) return max;
    if (point === 1) return min;
    return point * size + min;
  };

  /**
   * 座標の値を更新する
  */
  const transformCoordinate = (arg: TransformCoordinate) => {
    const { x1, x2, x3, x4, min, max, size } = arg;

    points.value[0].x = normalizePoint(x1, min, max, size);
    points.value[0].y = normalizePoint(x2, min, max, size);
    points.value[1].x = normalizePoint(x3, min, max, size);
    points.value[1].y = normalizePoint(x4, min, max, size);
  };

  return { easing, points, createEasing, transformCoordinate };
};

export type cubicBezierStore = ReturnType<typeof useCubicBezier>;
export const cubicBezierKey: InjectionKey<cubicBezierStore> =
  Symbol('cubicBezierStore');
