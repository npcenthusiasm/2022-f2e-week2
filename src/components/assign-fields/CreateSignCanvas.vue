<template>
  <div class="create-sign-canvas">
    <div>
      <!-- NOTE:
        canvas 目前 width 是寫死的
      -->
      <canvas
        ref="canvas"
        id="canvas"
        width="598"
        height="202"
        class="border-neutral-4 bg-neutral-2"
        style="border-style: solid; border-width: 1px"
      ></canvas>

      <a-menu-divider />
      <div class="btn-group">
        <a-button class="save" type="primary" @click="clickSaveBtn"
          >使用
        </a-button>
        <a-button class="clear" type="primary" ghost @click="reset"
          >清除
        </a-button>
        <!-- NOTE:
        測試用
        -->
        <!-- <button class="save" @click="saveImage">Save</button> -->

        <!-- <img
        ref="showImage"
        class="show-img"
        width="646"
        height="292"
        style="border: 1px solid"
      /> -->
        <a-space class="colors-pick" :size="12">
          <div class="color-btn bg-neutral-7"></div>
          <div class="color-btn" style="background-color: #2766e0"></div>
          <div class="color-btn" style="background-color: #f64331"></div>
          <PlusOutlined />
        </a-space>
      </div>

      <a-button class="download" type="primary" @click="downloadPDF2"
        >下載PDF
      </a-button>
    </div>
  </div>
</template>

<script>
import { downloadPDF } from '../../helper/downloadPDF'
import { PlusOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    PlusOutlined
  },
  props: {
    pdfCanvas: {
      type: Object
    }
  },
  data() {
    return {
      canvasInstance: null,
      isPainting: false
    }
  },

  mounted() {
    console.log('123')
    const canvas = this.$refs.canvas
    console.log(canvas)

    const ctx = canvas.getContext('2d')

    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    this.canvasInstance = canvas

    // event listener 電腦板
    canvas.addEventListener('mousedown', this.startPosition)
    canvas.addEventListener('mouseup', this.finishedPosition)
    canvas.addEventListener('mouseleave', this.finishedPosition)
    canvas.addEventListener('mousemove', this.draw)

    // event listener 手機板
    canvas.addEventListener('touchstart', this.startPosition)
    canvas.addEventListener('touchend', this.finishedPosition)
    canvas.addEventListener('touchcancel', this.finishedPosition)
    canvas.addEventListener('touchmove', this.draw)

    // clearBtn.addEventListener("click", reset);
    // this.renderPDF('/static/sample.pdf')

    // this.setImgFromStorage()
  },
  methods: {
    getCtx() {
      const ctx = this.canvasInstance.getContext('2d')
      return ctx
    },
    getPaintPosition(e) {
      const canvasSize = this.canvasInstance.getBoundingClientRect()
      console.log('canvasSize: ', canvasSize)

      if (e.type === 'mousemove') {
        return {
          x: e.clientX - canvasSize.left,
          y: e.clientY - canvasSize.top
        }
      } else {
        return {
          x: e.touches[0].clientX - canvasSize.left,
          y: e.touches[0].clientY - canvasSize.top
        }
      }
    },
    startPosition(e) {
      e.preventDefault()
      this.isPainting = true
    },
    finishedPosition() {
      this.isPainting = false
      this.getCtx().beginPath()
    },
    draw(e) {
      // 滑鼠移動過程中，若非繪圖狀態，則跳出
      if (!this.isPainting) return

      // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
      const paintPosition = this.getPaintPosition(e)

      // 移動滑鼠位置並產生圖案
      this.getCtx().lineTo(paintPosition.x, paintPosition.y)
      this.getCtx().stroke()
    },
    reset() {
      this.getCtx().clearRect(
        0,
        0,
        this.canvasInstance.width,
        this.canvasInstance.height
      )
    },
    clickSaveBtn() {
      const newImgSrc = this.canvasInstance.toDataURL('image/png')
      // this.saveImage()
      this.signPasteFromSrc(newImgSrc)
    },
    signPasteFromSrc(src) {
      const vm = this
      window.fabric.Image.fromURL(src, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400
        image.scaleX = 0.5
        image.scaleY = 0.5
        console.log('vm.pdfCanvas: ', vm.pdfCanvas)
        // vm.$emit('signPate', image)
        vm.pdfCanvas.add(image)
      })
    },
    // 測試用
    // saveImage() {
    //   // 圖片儲存的類型選擇 png ，並將值放入 img 的 src
    //   const newImg = this.canvasInstance.toDataURL('image/png')
    //   const showImage = this.$refs.showImage
    //   showImage.src = newImg
    //   localStorage.setItem('img', newImg)
    // },

    downloadPDF2() {
      console.log(2)
      downloadPDF(this.canvasInstance)
    }
  }
}
</script>

<style lang="scss" scoped>
.create-sign-canvas {
  .btn-group {
    display: flex;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 12px;
  }
  canvas {
    margin-bottom: 32px;
  }
  .colors-pick {
    margin-left: 36px;
    display: flex;
    align-items: center;

    .color-btn {
      width: 20px;
      height: 20px;
      padding: 4px;
      border-radius: 50%;

      &.active {
      }
    }
  }
}
</style>
