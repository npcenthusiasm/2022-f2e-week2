<template>
  <div class="assign-fields-page">
    <a-layout-header style="background: #fff; padding: 0">
      <div class="top-bar">
        <h4 style="margin-bottom: 16px">產品測試文件</h4>

        <div></div>
        <a-tag color="pink">pink</a-tag>
        <a-tag color="red">red</a-tag>
        <a-tag color="orange">orange</a-tag>
        <a-tag color="green">green</a-tag>
      </div>
    </a-layout-header>

    <a-layout style="min-height: 100vh" class="page-layout bg-gray">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
          <a-menu-item key="1" @click="clickSignBtn">
            <pie-chart-outlined />
            <span>簽名</span>
          </a-menu-item>
          <a-menu-item key="2">
            <desktop-outlined />
            <span>日期</span>
          </a-menu-item>
          <a-menu-item key="3">
            <desktop-outlined />
            <span>文字</span>
          </a-menu-item>

          <!-- <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu> -->
          <!-- <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item> -->
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content style="margin: 24px 32px" class="">
          <!-- <CreateSignCanvas :pdfCanvas="pdfCanvas2" @signPate="signPate" /> -->
          <a-space :size="0" class="tool-bar">
            <a-button class="tool-btn"><PlusOutlined /></a-button>
            <a-button class="tool-btn"><MinusOutlined /></a-button>
            <a-button class="tool-btn"><CompressOutlined /></a-button>
          </a-space>
          <div>
            <canvas
              ref="pdfCanvas"
              id="pdfCanvas"
              width="500"
              height="300"
            ></canvas>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>

    <!-- modal -->
    <a-modal
      v-model:visible="visible"
      width="646px"
      :title="modalTitle"
      :afterClose="afterCloseModal"
      @ok="handleOk"
      :footer="null"
    >
      <CreateSignCanvas v-if="modeIs('sign')" :pdfCanvas="pdfCanvas2" />
      <!-- <CreateSignCanvas v-if="false" /> -->
      <div v-else>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1">
            <template #tab>
              <span> 簽名 </span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span> 圖片 </span>
            </template>
          </a-tab-pane>
        </a-tabs>
        <div v-if="activeKey === '1'">
          <a-button block class="sign-btn" @click="createSign">
            創建簽名
            <PlusOutlined
          /></a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import {
  CompressOutlined,
  MinusOutlined,
  PlusOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons-vue'
import { defineComponent, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import CreateSignCanvas from '@/components/assign-fields/CreateSignCanvas.vue'

export default defineComponent({
  components: {
    CreateSignCanvas,
    // icons
    CompressOutlined,
    MinusOutlined,
    PlusOutlined,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
  },
  setup() {
    const store = useStore()
    const visible = ref(false)
    const modalTitle = ref('')
    const currnetMode = ref('')
    const pdfCanvas2 = ref()

    onMounted(() => {
      const pdfFile = store.state.pdfFile
      console.log('pdfFile: ', pdfFile)
      console.log(123)

      if (pdfFile) {
        inputOnChange2(pdfFile.originFileObj)
        // formState.user.name = pdfFile.name
        // formState.user.email = pdfFile.name
      }
      console.log(123)
      message.success({
        duration: 20,
        content: '載入中 ...',
        prefixCls: 'bg-primary'
      })
      // for test
      // showModal()
      // setSignMode()
    })

    //
    const signPate = image => {
      console.log('image: ', image)

      pdfCanvas2.value.add(image)
    }
    //

    const readBlob = blob => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result))
        reader.addEventListener('error', reject)
        reader.readAsDataURL(blob)
      })
    }

    const printPDF = async pdfData => {
      const Base64Prefix = 'data:application/pdf;base64,'
      console.log('typeof pdfData: ', typeof pdfData)
      // 將檔案處理成 base64
      pdfData = await readBlob(pdfData)

      // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(pdfData.substring(Base64Prefix.length))
      const pdfDoc = await window.pdfjsLib.getDocument({ data }).promise
      const pdfPage = await pdfDoc.getPage(1)

      // 設定尺寸及產生 canvas
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      // 設定 PDF 所要顯示的寬高及渲染
      canvas.height = viewport.height
      canvas.width = viewport.width
      const renderContext = {
        canvasContext: context,
        viewport
      }
      const renderTask = pdfPage.render(renderContext)

      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => canvas)
    }
    const pdfToImage = async pdfData => {
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio

      // 回傳圖片
      return new window.fabric.Image(pdfData, {
        id: 'renderPDF',
        scaleX: scale,
        scaleY: scale
      })
    }
    // TODO:
    const inputOnChange2 = async file => {
      console.log('file: ', file)
      // const a = true
      // if (a) return
      // 此處 canvas 套用 fabric.js
      const canvas = new window.fabric.Canvas('pdfCanvas')
      pdfCanvas2.value = canvas
      console.log('canvas: ', canvas)
      // pdfCanvas.value = canvas
      // document.querySelector('input').addEventListener('change', async (e) => {
      canvas.requestRenderAll()
      const pdfData = await printPDF(file)
      console.log('pdfData: ', pdfData)
      const pdfImage = await pdfToImage(pdfData)
      console.log('pdfImage: ', pdfImage)

      // 透過比例設定 canvas 尺寸
      canvas.setWidth(pdfImage.width / window.devicePixelRatio)
      canvas.setHeight(pdfImage.height / window.devicePixelRatio)

      // 將 PDF 畫面設定為背景
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
      console.log(123123)
      // })
    }

    const clickSignBtn = e => {
      console.log('e: ', e)
      console.log('clickSignBtn')
      showModal()
    }

    const showModal = () => {
      visible.value = true
    }
    const handleOk = e => {
      console.log(e)
      visible.value = false
    }
    const handleCancel = () => {
      visible.value = false
    }

    const setSignMode = () => {
      modalTitle.value = '創建簽名'
      currnetMode.value = 'sign'
    }

    const createSign = () => {
      setSignMode()
    }

    const modeIs = mode => {
      return currnetMode.value === mode
    }

    const afterCloseModal = () => {
      // reset mode
      currnetMode.value = ''
    }

    return {
      afterCloseModal,
      modeIs,
      modalTitle,
      visible,
      activeKey: ref('1'),
      showModal,
      handleOk,
      handleCancel,
      clickSignBtn,
      createSign,
      pdfCanvas2,
      inputOnChange2,
      signPate,
      collapsed: ref(false),
      selectedKeys: ref(['1'])
    }
  }
})
</script>
<style lang="scss" scoped>
.assign-fields-page {
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    /* background: rgba(255, 255, 255, 0.3); */
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  [data-theme='dark'] .site-layout .site-layout-background {
    /* background: #141414; */
  }

  .page-layout {
    .ant-layout-sider {
      background-color: #fff;
    }
  }

  .top-bar {
    display: flex;
    // justify-content: center;
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
  }

  .sign-btn {
    display: block;
    width: 100%;
  }
}
</style>
