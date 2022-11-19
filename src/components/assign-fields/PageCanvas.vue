<template>
  <div class="page-canvas">
    <canvas ref="canvasDom" width="500" height="300"></canvas>
  </div>
</template>

<script>
import { pdfToImage } from '@/helper/pdf'
import { defineComponent, onMounted, ref } from '@vue/runtime-core'

export default defineComponent({
  props: {
    canvas: {
      type: HTMLCanvasElement
    }
  },
  setup(props) {
    // const canvas = props.canvas
    const canvasDom = ref(null)
    console.log('canvas: ', props.canvas)
    onMounted(() => {
      renaderCanvas()
    })

    const renaderCanvas = async () => {
      const canvas = new window.fabric.Canvas(canvasDom.value)

      const pdfData = props.canvas
      const pdfImage = await pdfToImage(pdfData)

      // const canvas = canvasDom.value
      console.log('canvas: ', canvas)
      // 透過比例設定 canvas 尺寸
      canvas.setWidth(pdfImage.width / window.devicePixelRatio)
      canvas.setHeight(pdfImage.height / window.devicePixelRatio)

      // 將 PDF 畫面設定為背景
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
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
