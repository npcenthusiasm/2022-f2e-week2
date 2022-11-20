<template>
  <a-space :size="0" class="tool-bar">
    <a-button class="tool-btn"><PlusOutlined /></a-button>
    <a-button class="tool-btn"><MinusOutlined /></a-button>
    <a-button class="tool-btn"><CompressOutlined /></a-button>
    <!-- 測試用 -->
    <input
      type="file"
      class="select"
      accept="application/pdf"
      @change="inputOnChange2"
    />
    <a-button class="download" type="primary" @click="downloadPDF2"
      >下載PDF
    </a-button>
    <!-- 測試用 -->
  </a-space>

  <div class="view-wrapper">
    <div class="viewer-container">
      <div class="viewer" v-if="pdfAllPageCanvas.length > 0">
        <div
          class="page-container"
          v-for="(item, index) in pdfAllPageCanvas"
          :key="item"
        >
          <PageCanvas
            :canvas="item"
            :page="index + 1"
            @onCanvasLoaded="onCanvasLoaded"
            @clickCanvas="(canvas, page) => $emit('clickCanvas', canvas, page)"
          >
          </PageCanvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  CompressOutlined,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import { defineComponent, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import CreateSignCanvas from '@/components/assign-fields/CreateSignCanvas.vue'

import { printMultiPage } from '../../helper/pdf'
import PageCanvas from '@/components/assign-fields/PageCanvas.vue'
import PDFDrawer from '@/components/sign-and-send/PDFDrawer.vue'
import { downloadMultiPagePDF } from '@/helper/downloadPDF'

export default defineComponent({
  emits: ['updateImages', 'clickCanvas'],
  components: {
    PageCanvas,
    CreateSignCanvas,
    PDFDrawer,
    // icons
    CompressOutlined,
    MinusOutlined,
    PlusOutlined
  },
  setup(props, { emit }) {
    const store = useStore()
    const pdfAllPageCanvas = ref([])
    const images = ref([])
    let canvasInstanceList = []
    const totalPages = ref(0)

    onMounted(() => {
      const pdfFile = store.state.pdfFile

      if (pdfFile) {
        renderPDF(pdfFile.originFileObj)
      }

      message.success({
        // duration: 20,
        content: '載入中 ...',
        prefixCls: 'bg-primary'
      })
    })
    /**
     *
     * for test
     */
    const inputOnChange2 = (e) => {
      canvasInstanceList = []
      pdfAllPageCanvas.value = []
      renderPDF(e.target.files[0])
    }

    /**
     *
     * for test
     */

    //
    // const signPate = (image) => {
    //
    //   pdfCanvas2.value.add(image)
    // }

    const renderPDF = async (file) => {
      console.log('render')
      const { pagesCanvas, pages } = await printMultiPage(file)
      console.log('printMultiPage compelete')
      totalPages.value = pages
      pdfAllPageCanvas.value = pagesCanvas
      console.log('to')
    }

    const onCanvasLoaded = (page, canvas) => {
      console.log('onCanvasLoaded')
      canvasInstanceList.push(canvas)

      console.log('canvasInstanceList.length: ', canvasInstanceList.length)
      console.log('totalPages.value: ', totalPages.value)

      const image = canvas.toDataURL('image/png')

      images.value.push({
        page,
        image
      })

      if (canvasInstanceList.length === totalPages.value) {
        emit('updateImages', images.value)
        console.log('store.commit')
        store.commit('SET_CANVAS_LIST', canvasInstanceList)
      }
    }

    const downloadPDF2 = () => {
      downloadMultiPagePDF(canvasInstanceList)
    }

    return {
      // PDF
      pdfAllPageCanvas,
      canvasInstanceList,
      renderPDF,
      // props canvas
      onCanvasLoaded,
      images,
      // test
      inputOnChange2,
      downloadPDF2
    }
  }
})
</script>
<style lang="scss" scoped>
.assign-fields-page {
  .layout-header {
    position: relative;
    z-index: 10;
    background-color: #fff;
    padding-left: 24px;
    padding-right: 24px;
    filter: drop-shadow(0px 0px 15px rgba(25, 26, 27, 0.08));
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .page-layout {
    // FIXME:
    min-height: 100vh;
    // height: calc(100vh - 68px - 64px);
    .ant-layout-sider {
      background-color: #fff;
    }

    ::v-deep(.ant-layout-sider-trigger) {
      background-color: #1890ff;
    }

    .layout-sider {
      box-shadow: 0px 0px 15px rgba(25, 26, 27, 0.08);
    }
  }

  .tool-bar {
    margin-bottom: 16px;
    .tool-btn {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .sign-btn {
    display: block;
    width: 100%;
  }

  .page-container {
    margin-bottom: 20px;
    //   height: 100%;
    //   min-height: 0;
    //   flex-shrink: 0;
    //   display: flex;
    //   flex-direction: column;
  }

  // .view-wrapper {
  //   display: flex;
  //   height: 100%;
  // }

  // .viewer-container {
  //   display: inline-flex;
  //   flex-direction: column;
  //   height: 100%;
  //   overflow: hidden;
  // }
  // .viewer {
  //   display: flex;
  //   flex-direction: column;
  //   height: 100%;
  //   justify-content: center;
  //   align-items: center;
  //   overflow-y: auto;
  // }
}
</style>
