<template>
  <div class="tool-bar-container">
    <a-space :size="0" class="tool-bar">
      <a-button class="tool-btn" @click="clickScaleUp"
        ><PlusOutlined
      /></a-button>
      <a-button class="tool-btn" @click="clickScaleDown"
        ><MinusOutlined
      /></a-button>
      <a-button class="tool-btn" @click="$emit('toggleScreen')"
        ><CompressOutlined
      /></a-button>
      <!-- 測試用 -->
      <!-- <input
        type="file"
        class="select"
        accept="application/pdf"
        @change="inputOnChange2"
      /> -->
      <!-- <a-button class="download" type="primary" @click="downloadPDF2"
          >下載PDF
        </a-button> -->
      <!-- 測試用 -->
    </a-space>
    <a-space :size="0" class="tool-bar mobile">
      <a-button class="tool-btn" @click="$emit('clickSign')"
        ><EditOutlined
      /></a-button>

      <a-button class="tool-btn" @click="$emit('clickDate')">
        <CalendarOutlined />
      </a-button>
      <a-button class="tool-btn" @click="$emit('clickText')"
        ><FontSizeOutlined
      /></a-button>
    </a-space>
  </div>

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
  PlusOutlined,
  EditOutlined,
  CalendarOutlined,
  FontSizeOutlined
} from '@ant-design/icons-vue'

// import CalendarSvg from '../svg/CalendarSvg.vue'
// import TextSvg from '../svg/TextSvg.vue'

import { defineComponent, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import CreateSignCanvas from '@/components/assign-fields/CreateSignCanvas.vue'

import { printMultiPage } from '../../helper/pdf'
import PageCanvas from '@/components/assign-fields/PageCanvas.vue'
import PDFDrawer from '@/components/sign-and-send/PDFDrawer.vue'
import { downloadMultiPagePDF } from '@/helper/downloadPDF'

export default defineComponent({
  emits: [
    'updateImages',
    'clickCanvas',
    'clickScaleUp',
    'clickScaleDown',
    'toggleScreen',
    'clickSign',
    'clickDate',
    'clickText'
  ],
  components: {
    PageCanvas,
    CreateSignCanvas,
    PDFDrawer,
    // icons
    CompressOutlined,
    MinusOutlined,
    PlusOutlined,
    EditOutlined,
    FontSizeOutlined,
    CalendarOutlined
    // CalendarSvg
  },
  setup(props, { emit }) {
    const store = useStore()
    const pdfAllPageCanvas = ref([])
    const images = ref([])
    let canvasInstanceList = []
    const totalPages = ref(0)
    // const scale = ref(1 / window.devicePixelRatio)

    onMounted(() => {
      message.success({
        content: '載入中 ...',
        prefixCls: 'bg-neutral-2'
      })

      const pdfFile = store.state.pdfFile

      if (pdfFile) {
        renderPDF(pdfFile.originFileObj)
      }
    })
    /**
     *
     * for test
     */
    const inputOnChange2 = (e) => {
      canvasInstanceList = []
      pdfAllPageCanvas.value = []

      if (e.target.files[0]) {
        renderPDF(e.target.files[0])
        store.commit('SET_PDF_FILE', {
          originFileObj: e.target.files[0]
        })
      }
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
      const { pagesCanvas, pages } = await printMultiPage(file)
      totalPages.value = pages
      pdfAllPageCanvas.value = pagesCanvas
    }

    const onCanvasLoaded = (page, canvas) => {
      canvasInstanceList.push(canvas)

      const image = canvas.toDataURL('image/png')

      images.value.push({
        page,
        image
      })

      if (canvasInstanceList.length === totalPages.value) {
        emit('updateImages', images.value)

        store.commit('SET_CANVAS_LIST', canvasInstanceList)
      }
    }

    const downloadPDF2 = () => {
      downloadMultiPagePDF(canvasInstanceList)
    }

    const clickScaleUp = () => {
      //   scale.value = scale.value + 0.05
      //   canvasInstanceList.forEach((canvas) => {
      //     canvas.setZoom(scale.value)
      //   })
    }
    const clickScaleDown = () => {
      // scale.value = scale.value - 0.05
      // canvasInstanceList.forEach((canvas) => {
      //   canvas.setZoom(scale.value)
      // })
    }
    const toggleScreen = () => {}

    return {
      // PDF
      pdfAllPageCanvas,
      canvasInstanceList,
      renderPDF,
      // props canvas
      onCanvasLoaded,
      images,
      // tool btn
      clickScaleUp,
      clickScaleDown,
      toggleScreen,
      //
      // test
      inputOnChange2,
      downloadPDF2
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin';

.tool-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  &.mobile {
    display: flex;
    @include ipad {
      display: none;
    }
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
</style>
