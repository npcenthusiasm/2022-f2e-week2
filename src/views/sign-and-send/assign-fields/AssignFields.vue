<template>
  <div class="assign-fields-page">
    <SignSendNavbar :onOk="goNextPage" :modalOk="modalOk" />
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
          <a-menu-item key="nav-name" @click="clickSignBtn('name')">
            <PieChartOutlined />
            <span>簽名</span>
          </a-menu-item>
          <a-menu-item key="nav-date" @click="clickSignBtn('date')">
            <DesktopOutlined />
            <span>日期</span>
          </a-menu-item>
          <a-menu-item key="nav-text" @click="clickSignBtn('text')">
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

      <!-- relative 是給 PDFDrawer 定位用 -->
      <a-layout style="position: relative">
        <PDFDrawer
          :visable="visableDrawer"
          @onClose="drawerOnClose"
          :images="images"
        />

        <a-layout-content class="layout-content">
          <AssignFieldsContent
            @updateImages="updateImages"
            @clickCanvas="clickCanvas"
            @clickSign="clickSignBtn('name')"
            @clickDate="clickSignBtn('date')"
            @clickText="clickSignBtn('text')"
          />
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- modal -->
    <a-modal
      v-model:visible="modalVisible"
      :width="modalWidth"
      :title="modalTitle"
      :afterClose="afterCloseModal"
      @ok="handleOk"
      :footer="null"
    >
      <CreateSignCanvas v-if="modeIs('sign')" @compeleteSign="compeleteSign" />

      <!-- 簽名 -->
      <div v-else-if="modeIs('signDefault')">
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

        <div v-if="modalMenuTabSelected === '1'">
          <!-- modal 使用簽名 -->

          <a-space :size="16" direction="vertical" style="display: flex">
            <a-radio-group
              class="w-full"
              v-model:value="selectedSign"
              v-if="signHistories.length > 0"
            >
              <a-row :gutter="[16, 16]" :wrap="true">
                <a-col
                  class="gutter-row"
                  :span="24"
                  v-for="sign in signHistories"
                  :key="sign.id"
                >
                  <div class="gutter-box">
                    <a-radio-button
                      :style="{
                        width: '100%',
                        'text-align': 'center'
                      }"
                      :value="sign.imgSrc"
                    >
                      <img
                        :src="sign.imgSrc"
                        alt=""
                        height="50"
                        class="custom-sign-img"
                      />
                    </a-radio-button>
                  </div>
                </a-col>
              </a-row>
            </a-radio-group>
            <a-button class="save" type="primary" @click="clickUseBtn"
              >使用
            </a-button>
            <a-button
              block
              class="sign-btn"
              @click="createSign"
              style="height: 50px"
            >
              創建簽名
              <PlusOutlined
            /></a-button>
          </a-space>
        </div>

        <div v-else-if="modalMenuTabSelected === '2'">
          <div class="file-upload-content">
            <FileUploader2 @upload-success="uploadSuccess" />
            <a-radio-group v-model:value="selectedImg">
              <a-radio-button
                :value="image.id"
                v-for="image in updateLoadImageList"
                :key="image.id"
              >
                <img :src="image.url" alt="" width="126" height="126" />
              </a-radio-button>
            </a-radio-group>
            <!-- <img
              v-for="imageUrl in updateLoadImageList"
              :key="imageUrl"
              :src="imageUrl"
              @click="selectImg"
              width="126"
              height="126"
              alt="avatar"
            /> -->
          </div>
          <!-- modal 使用簽名 -->
          <a-button class="save" type="primary" @click="clickUseImgBtn"
            >使用
          </a-button>
        </div>
      </div>

      <!-- 圖片 -->
      <div v-else-if="modeIs('img')">
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
          >使用2
        </a-button>
      </div>
      <!-- 日期 -->
      <div v-else-if="modeIs('date')">
        <a-space :size="16" direction="vertical" style="display: flex">
          <a-radio-group v-model:value="selectedDate">
            <a-row :gutter="[16, 16]" :wrap="true">
              <a-col
                class="gutter-row"
                :span="12"
                v-for="date in dateList"
                :key="date.id"
              >
                <div class="gutter-box">
                  <a-radio-button
                    :style="{
                      width: '100%',
                      'text-align': 'center'
                    }"
                    :value="date.text"
                  >
                    {{ date.text }}
                  </a-radio-button>
                </div>
              </a-col>
            </a-row>
          </a-radio-group>

          <a-button class="save" type="primary" @click="clickUseDateBtn"
            >使用
          </a-button>
        </a-space>
      </div>
      <!-- 文字 -->
      <div v-else-if="modeIs('text')">
        <a-space :size="16" direction="vertical" style="display: flex">
          <a-input
            v-model:value="selectedText"
            size="large"
            placeholder="請輸入文字"
          >
          </a-input>

          <a-button class="save" type="primary" @click="clickUseTexteBtn"
            >使用
          </a-button>
        </a-space>
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
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref
} from 'vue'
import { useStore } from 'vuex'
import CreateSignCanvas from '@/components/assign-fields/CreateSignCanvas.vue'

import PDFDrawer from '@/components/sign-and-send/PDFDrawer.vue'
import AssignFiieldHeader from '@/components/assign-fields/AssignFiieldHeader.vue'
import AssignFieldsContent from '@/components/assign-fields/AssignFieldsContent.vue'
import { useMouse } from '@vueuse/core'
import { formatDateString } from '../../../helper/date'
import SignSendNavbar from '@/components/sign-and-send/SignSendNavbar.vue'
import FileUploader2 from '@/components/assign-fields/FileUploader2.vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'AssignFields',
  components: {
    AssignFiieldHeader,
    AssignFieldsContent,
    CreateSignCanvas,
    FileUploader2,
    PDFDrawer,
    SignSendNavbar,
    // icons
    PlusOutlined,
    PieChartOutlined,
    DesktopOutlined
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const mouse = reactive(useMouse())

    const signSampleDom = ref(null)
    // modal
    const modalVisible = ref(false)
    const modalTitle = ref('')
    const modalWidth = computed(() => {
      // 簽名板
      if (
        sideNavSelcted.value[0] === 'nav-name' &&
        currnetMode.value === 'sign' &&
        modalMenuTabSelected.value === '1'
      ) {
        return '646px'
      }

      return '412px'
    })
    // mode
    const currnetMode = ref('text') // signDefault
    const sideNavSelcted = ref(['nav-text'])
    // text
    const selectedText = ref('')
    // img
    const selectedImg = ref('')
    const updateLoadImageList = ref([])
    const modalMenuTabSelected = ref('1')

    // date
    const selectedDate = ref('')
    const dateList = ref([
      { id: 1, text: formatDateString('YYYY/MM/DD') },
      { id: 2, text: formatDateString('DD/MM/YYYY') },
      { id: 3, text: formatDateString('YYYY-MM-DD') },
      { id: 4, text: formatDateString('MM-DD-YYYY') }
    ])
    // sign
    const signHistories = computed(() => store.state.signHistories)
    const selectedSign = ref('') // img arc
    // pdf
    const images = ref([])
    const insertMode = ref(false)
    // drawer
    const visableDrawer = ref(false)

    onBeforeMount(() => {
      const pdfFile = store.state.pdfFile
      if (!pdfFile) {
        message.success({
          // duration: 20,
          content: '檔案載入失敗',
          prefixCls: 'bg-neutral-2'
        })
        router.replace({ name: 'task' })
      }
    })

    onMounted(() => {
      store.commit('SET_PROGRESS_STATE', 2)

      // showModal()
      // setSignMode()
      // clickSignBtn('text')
    })

    const clickSignBtn = (mode) => {
      switch (mode) {
        case 'name':
          setSignMode('signDefault', '')
          break
        case 'date':
          setSignMode('date', '日期')
          break
        case 'text':
          setSignMode('text', '文字')
          break
        default:
          break
      }
      showModal()
    }
    const createSign = (sign) => {
      setSignMode('sign', '創建簽名')
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

    const setSignMode = (mode, title) => {
      currnetMode.value = mode
      modalTitle.value = title
    }

    const setDefaultMode = () => {
      modalTitle.value = ''
      currnetMode.value = 'signDefault'
    }

    const modeIs = (mode) => {
      return currnetMode.value === mode
    }

    const afterCloseModal = () => {
      // reset mode
      currnetMode.value = 'signDefault'
    }

    const compeleteSign = (newImgSrc) => {
      store.commit('ADD_SIGN_HISTORY', {
        id: Date.now(),
        imgSrc: newImgSrc
      })
      setDefaultMode()
    }

    const clickUseImgBtn = () => {
      handleCancel()
      insertMode.value = true
    }

    const clickUseBtn = () => {
      handleCancel()
      insertMode.value = true
    }
    const clickUseDateBtn = () => {
      handleCancel()
      insertMode.value = true
    }

    const clickUseTexteBtn = () => {
      handleCancel()
      insertMode.value = true
    }

    const clickFollowBtn = () => {}

    const handleDatePaste = (canvas) => {
      const left = canvas._previousPointer.x

      const top = canvas._previousPointer.y

      const text = new window.fabric.Text(selectedDate.value, {
        left,
        top,
        hasControls: true
      })

      canvas.add(text)
    }

    const handleTextPaste = (canvas) => {
      const left = canvas._previousPointer.x
      const top = canvas._previousPointer.y

      const text = new window.fabric.Text(selectedText.value, {
        left,
        top,
        hasControls: true
      })

      canvas.add(text)
    }

    const handleImgPaste = (canvas) => {
      const img = updateLoadImageList.value.find(
        (item) => item.id === selectedImg.value
      )

      addImgToCanvasBySrc(canvas, {
        x: mouse.x,
        y: mouse.y,
        imgSrc: img.url
      })
    }
    const handleSignNamePaste = (canvas) => {
      addImgToCanvasBySrc(canvas, {
        x: mouse.x,
        y: mouse.y,
        imgSrc: selectedSign.value
      })
    }
    const clickCanvas = (canvas, page) => {
      if (!insertMode.value) return

      const navSelect = sideNavSelcted.value[0]

      if (navSelect === 'nav-name' && modalMenuTabSelected.value === '2') {
        handleImgPaste(canvas)
        insertMode.value = false
        return
      }

      if (navSelect === 'nav-name' && modalMenuTabSelected.value === '1') {
        handleSignNamePaste(canvas)
        insertMode.value = false
        return
      }

      if (navSelect === 'nav-date') {
        handleDatePaste(canvas)
        insertMode.value = false

        return
      }
      if (navSelect === 'nav-text') {
        handleTextPaste(canvas)
        insertMode.value = false
      }
    }

    const addImgToCanvasBySrc = (canvas, options) => {
      // const vm = this
      // TODO: retur promise to await
      window.fabric.Image.fromURL(options.imgSrc, function (image) {
        const left = canvas._previousPointer.x

        const top = canvas._previousPointer.y

        // 設定簽名出現的位置及大小，後續可調整
        image.top = top
        image.left = left
        image.scaleX = 0.4
        image.scaleY = 0.4

        canvas.add(image)
      })
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

    const uploadSuccess = (image) => {
      updateLoadImageList.value.push({
        url: image,
        id: Date.now()
      })
    }

    const goNextPage = () => {
      console.log(123)
      router.push({ name: 'compelete' })
    }

    const modalOk = () => {
      store.commit('SET_PDF_FILE', null)
      router.replace({ name: 'task' })
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
      modalMenuTabSelected,
      modalWidth,
      showModal,
      handleOk,
      handleCancel,
      afterCloseModal,
      // sideer layout
      collapsed: ref(false),
      sideNavSelcted,
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
      clickCanvas,
      // date
      selectedDate,
      dateList,
      clickUseDateBtn,
      // text
      selectedText,
      clickUseTexteBtn,
      // img
      updateLoadImageList,
      uploadSuccess,
      clickUseImgBtn,
      selectedImg,
      // navbar
      modalOk,
      goNextPage
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin';

.assign-fields-page {
  .layout-header {
    position: relative;
    z-index: 10;
    background-color: #fff;
    padding-left: 24px;
    padding-right: 24px;
    filter: drop-shadow(0px 0px 15px rgba(25, 26, 27, 0.08));
  }

  .layout-content {
    margin: 16px;
    height: calc(100vh - 180px);
    overflow: auto;
    @include ipad {
      margin: 24px 32px;
    }
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .page-layout {
    // FIXME:

    // height: calc(100vh - 68px - 64px);
    .ant-layout-sider {
      background-color: #fff;
    }

    ::v-deep(.ant-layout) {
      overflow: hidden;
    }

    ::v-deep(.ant-layout-sider-trigger) {
      background-color: #1890ff;
    }

    .layout-sider {
      display: none;
      @include ipad {
        display: block;
      }
      box-shadow: 0px 0px 15px rgba(25, 26, 27, 0.08);
    }
  }

  .sign-btn {
    display: block;
    width: 100%;
  }
}
</style>
