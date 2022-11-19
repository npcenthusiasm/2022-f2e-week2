<template>
  <div class="page-canvas">
    <canvas ref="canvasDom" width="500" height="300"></canvas>
  </div>
</template>

<script>
import { pdfToImage } from '@/helper/pdf'
import { defineComponent, onMounted, ref } from '@vue/runtime-core'

export default defineComponent({
  emits: ['onCanvasLoaded'],
  props: {
    canvas: {
      type: HTMLCanvasElement
    },
    page: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const canvasDom = ref(null)

    onMounted(() => {
      renaderCanvas()
    })

    const renaderCanvas = async () => {
      const canvas = new window.fabric.Canvas(canvasDom.value)

      const pdfData = props.canvas
      const pdfImage = await pdfToImage(pdfData)

      // 透過比例設定 canvas 尺寸
      canvas.setWidth(pdfImage.width / window.devicePixelRatio)
      canvas.setHeight(pdfImage.height / window.devicePixelRatio)

      // 將 PDF 畫面設定為背景
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))

      emit('onCanvasLoaded', props.page, canvas)
    }

    return {
      renaderCanvas,
      canvasDom
    }
  }
})
</script>

<style lang="scss" scoped>
.page-canvas {
  position: relative;
}
</style>
