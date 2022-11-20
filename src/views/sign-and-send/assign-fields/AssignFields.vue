<template>
  <div class="assign-fields-page">
    <a-layout-header class="layout-header">
      <AssignFiieldHeader
        :visableDrawer="visableDrawer"
        @togglePreviewSide="togglePreviewSide"
      />
    </a-layout-header>

    <a-layout class="page-layout bg-gray">
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        class="layout-sider"
      >
        <div class="logo" />
        <a-menu v-model:selectedKeys="sideNavSelcted" mode="inline">
          <a-menu-item key="1" @click="clickSignBtn">
            <PieChartOutlined />
            <span>簽名</span>
          </a-menu-item>
          <a-menu-item key="2">
            <DesktopOutlined />
            <span>日期</span>
          </a-menu-item>
          <a-menu-item key="3">
            <DesktopOutlined />
            <span>文字</span>
          </a-menu-item>
          <!--
          <a-menu-item key="3" @click="clickFollowBtn">
            <span>clickFollowBtn</span>
            {{ mouse }}
          </a-menu-item> -->
        </a-menu>
      </a-layout-sider>

      <a-layout style="position: relative; overflow: hidden">
        <PDFDrawer
          :visable="visableDrawer"
          @onClose="drawerOnClose"
          :images="images"
        />

        <a-layout-content style="margin: 24px 32px" class="">
          <AssignFieldsContent
            @updateImages="updateImages"
            @clickCanvas="clickCanvas"
          />
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- modal -->
    <a-modal
      v-model:visible="modalVisible"
      width="646px"
      :title="modalTitle"
      :afterClose="afterCloseModal"
      @ok="handleOk"
      :footer="null"
    >
      <CreateSignCanvas v-if="modeIs('sign')" @compeleteSign="compeleteSign" />

      <!-- 簽名 -->
      <div v-else>
        <a-tabs v-model:activeKey="modalMenuTabSelected">
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

        <!-- modal 使用簽名 -->
        <a-button class="save" type="primary" @click="clickUseBtn"
          >使用
        </a-button>

        <div v-if="modalMenuTabSelected === '1'">
          <a-radio-group v-model:value="selectedSign">
            <a-radio-button
              :value="sign.imgSrc"
              v-for="sign in signHistories"
              :key="sign.id"
            >
              <img :src="sign.imgSrc" alt="" height="50" />
            </a-radio-button>
          </a-radio-group>

          <a-button
            block
            class="sign-btn"
            @click="createSign"
            style="height: 50px"
          >
            創建簽名
            <PlusOutlined
          /></a-button>
        </div>
      </div>
    </a-modal>

    <div
      v-show="insertMode"
      ref="signSampleDom"
      class="signSampleDom"
      :style="{
        top: `${mouse.y + 10}px`,
        left: `${mouse.x + 10}px`
      }"
    >
      <span class="sign-cursor-hint">點擊一處貼上</span>
    </div>
  </div>
</template>
<script>
import {
  PlusOutlined,
  DesktopOutlined,
  PieChartOutlined
} from '@ant-design/icons-vue'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import CreateSignCanvas from '@/components/assign-fields/CreateSignCanvas.vue'

import PDFDrawer from '@/components/sign-and-send/PDFDrawer.vue'
import AssignFiieldHeader from '@/components/assign-fields/AssignFiieldHeader.vue'
import AssignFieldsContent from '@/components/assign-fields/AssignFieldsContent.vue'
import { useLocalStorage, useMouse } from '@vueuse/core'

export default defineComponent({
  components: {
    AssignFiieldHeader,
    AssignFieldsContent,
    CreateSignCanvas,
    PDFDrawer,
    // icons
    PlusOutlined,
    PieChartOutlined,
    DesktopOutlined
  },
  setup() {
    const store = useStore()
    const mouse = reactive(useMouse())
    const historyStorage = useLocalStorage('img', [])
    console.log('historyStorage: ', historyStorage)

    const signSampleDom = ref(null)
    // modal
    const modalVisible = ref(false)
    const modalTitle = ref('')
    // mode
    const currnetMode = ref('')
    // pdf sign
    const signHistories = computed(() => store.state.signHistories)
    const selectedSign = ref('') // img arc
    const images = ref([])
    const insertMode = ref(false)
    // drawer
    const visableDrawer = ref(false)
    // eslint-disable-next-line
    let canvasInstanceList = []
    // const instance = getCurrentInstance()

    onMounted(() => {
      store.commit('SET_PROGRESS_STATE', 2)

      // showModal()
      // setSignMode()
    })

    const clickSignBtn = (e) => {
      showModal()
    }

    // modal - methods - start
    const showModal = () => {
      modalVisible.value = true
    }
    const handleOk = (e) => {
      modalVisible.value = false
    }
    const handleCancel = () => {
      modalVisible.value = false
    }
    // modal - methods - end

    const setSignMode = () => {
      modalTitle.value = '創建簽名'
      currnetMode.value = 'sign'
    }

    const setDefaultMode = () => {
      modalTitle.value = ''
      currnetMode.value = ''
    }

    const createSign = (sign) => {
      setSignMode()
    }

    const modeIs = (mode) => {
      return currnetMode.value === mode
    }

    const afterCloseModal = () => {
      // reset mode
      currnetMode.value = ''
    }

    const compeleteSign = (newImgSrc) => {
      store.commit('ADD_SIGN_HISTORY', {
        id: Date.now(),
        imgSrc: newImgSrc
      })
      setDefaultMode()
    }

    const clickUseBtn = () => {
      handleCancel()
      insertMode.value = true
    }

    const clickFollowBtn = () => {}

    const clickCanvas = (canvas, page) => {
      if (!insertMode.value) return

      console.log(canvas)
      console.log('page: ', page)
      // const selectedSign = selectedSign.value
      // console.log('history: ', history)
      console.log('history: ', history.imgSrc)
      console.log(1)
      // TODO:
      addImgToCanvasBySrc(canvas, {
        x: mouse.x,
        y: mouse.y,
        imgSrc: selectedSign.value,
        page
      })
      console.log(6)

      insertMode.value = false
    }

    const addImgToCanvasBySrc = (canvas, options) => {
      console.log(2)

      console.log('canvas: ', canvas)
      // const vm = this
      // TODO: retur promise to await
      window.fabric.Image.fromURL(options.imgSrc, function (image) {
        console.log(3)

        const left = canvas._previousPointer.x
        console.log('left: ', left)
        const top = canvas._previousPointer.y
        console.log('top: ', top)

        // 設定簽名出現的位置及大小，後續可調整
        image.top = top
        image.left = left
        image.scaleX = 0.4
        image.scaleY = 0.4

        canvas.add(image)
        console.log(4)
      })
      console.log(5)
    }

    const updateImages = (_images) => {
      images.value = []
      images.value = _images
    }

    const togglePreviewSide = () => {
      visableDrawer.value ? drawerOnClose() : showPreviewSide()
    }
    const showPreviewSide = () => {
      visableDrawer.value = true
    }
    const drawerOnClose = () => {
      visableDrawer.value = false
    }

    return {
      selectedSign,
      signHistories,
      modeIs,
      compeleteSign,
      clickSignBtn,
      createSign,
      clickUseBtn,
      // modal
      modalTitle,
      modalVisible,
      modalMenuTabSelected: ref('1'),
      showModal,
      handleOk,
      handleCancel,
      afterCloseModal,
      // sideer layout
      collapsed: ref(false),
      sideNavSelcted: ref(['1']),
      // previre
      visableDrawer,
      togglePreviewSide,
      showPreviewSide,
      drawerOnClose,
      // props canvas
      images,
      updateImages,
      mouse,
      signSampleDom,
      insertMode,
      clickFollowBtn,
      clickCanvas
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

  .sign-btn {
    display: block;
    width: 100%;
  }
}
</style>
