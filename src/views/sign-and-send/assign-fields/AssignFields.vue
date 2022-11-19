<template>
  <div class="assign-fields-page">
    <a-layout-header class="layout-header">
      <div class="header-bar">
        <div class="doc-name-content">
          <FormOutlined />
          <div class="doc-name text-neutral-7'">產品測試文件</div>
        </div>

        <div class="tags-content">
          <TagOutlined class="tag-icon" />
          <div class="tags">
            <a-tag color="pink">產品教學</a-tag>
            <a-tag color="red">產品測試</a-tag>
            <a-tag color="orange">產品測試</a-tag>
            <a-tag color="green">產品教學</a-tag>
          </div>
        </div>
      </div>
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
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-content style="margin: 24px 32px" class="">
          <!-- <CreateSignCanvas :pdfCanvas="pdfCanvas2" @signPate="signPate" /> -->
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
            <!-- 測試用 -->
          </a-space>

          <div class="view-wrapper">
            <div class="viewer-container">
              <div class="viewer">
                <div
                  class="page-container"
                  v-for="item in pdfAllPageCanvas"
                  :key="item"
                >
                  <PageCanvas class="" :canvas="item"> </PageCanvas>
                </div>
              </div>
              <!-- <canvas
              ref="pdfCanvas"
              id="pdfCanvas"
              width="500"
              height="300"
            ></canvas> -->
            </div>
          </div>
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
      <CreateSignCanvas
        v-if="modeIs('sign')"
        :pdfCanvas="pdfCanvas2"
        @compeleteSign="compeleteSign"
      />
      <!-- <CreateSignCanvas v-if="false" /> -->
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
  FileOutlined,
  FormOutlined,
  TagOutlined
} from '@ant-design/icons-vue'
import { defineComponent, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import CreateSignCanvas from '@/components/assign-fields/CreateSignCanvas.vue'

import { printMultiPage } from '../../../helper/pdf'
import PageCanvas from '@/components/assign-fields/PageCanvas.vue'

export default defineComponent({
  components: {
    PageCanvas,
    CreateSignCanvas,
    // icons
    CompressOutlined,
    MinusOutlined,
    PlusOutlined,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    FormOutlined,
    TagOutlined
  },
  setup() {
    const store = useStore()
    const modalVisible = ref(false)
    const modalTitle = ref('')
    const currnetMode = ref('')
    const pdfCanvas2 = ref()
    const signHistories = ref(store.state.signHistories)
    const selectedSign = ref('') // img arc
    const pdfAllPageCanvas = ref([])
    onMounted(() => {
      store.commit('SET_PROGRESS_STATE', 3)
      const pdfFile = store.state.pdfFile
      console.log('pdfFile: ', pdfFile)

      if (pdfFile) {
        console.log(1)
        renderPDF(pdfFile.originFileObj)
        console.log(3)
      }

      message.success({
        duration: 20,
        content: '載入中 ...',
        prefixCls: 'bg-primary'
      })

      /**
       *
       * for test
       */

      // showModal()
      // setSignMode()
    })
    /**
     *
     * for test
     */
    const inputOnChange2 = (e) => {
      renderPDF(e.target.files[0])
    }

    /**
     *
     * for test
     */

    //
    // const signPate = (image) => {
    //   console.log('image: ', image)
    //   pdfCanvas2.value.add(image)
    // }

    const renderPDF = async (file) => {
      const pdfAllPageData = await printMultiPage(file)
      pdfAllPageCanvas.value = pdfAllPageData
    }

    const clickSignBtn = (e) => {
      console.log('e: ', e)
      console.log('clickSignBtn')
      showModal()
    }

    // modal - methods - start
    const showModal = () => {
      modalVisible.value = true
    }
    const handleOk = (e) => {
      console.log(e)
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

    const createSign = () => {
      setSignMode()
    }

    const modeIs = (mode) => {
      return currnetMode.value === mode
    }

    const afterCloseModal = () => {
      // reset mode
      currnetMode.value = ''
    }

    const compeleteSign = () => {
      setDefaultMode()
    }

    const clickUseBtn = () => {
      handleCancel()
      // createSignImgFollowMouse()
      signPasteFromSrc(selectedSign.value)
    }

    // const createSignImgFollowMouse = (src) => {

    // }

    const signPasteFromSrc = (src) => {
      // const vm = this
      window.fabric.Image.fromURL(src, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400
        image.scaleX = 0.5
        image.scaleY = 0.5
        pdfCanvas2.value.add(image)

        const resultImg = pdfCanvas2.value.toDataURL('image/png')
        store.commit('SET_COMPELETE_IMG', resultImg)
        console.log('resultImg: ', resultImg)

        // vm.$emit('signPate', image)
        // vm.pdfCanvas.add(image)
      })
    }
    return {
      selectedSign,
      signHistories,
      modeIs,
      compeleteSign,
      clickSignBtn,
      createSign,
      clickUseBtn,
      pdfCanvas2,
      // PDF
      pdfAllPageCanvas,
      renderPDF,
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
      // test
      inputOnChange2
    }
  }
})
</script>
<style lang="scss" scoped>
.assign-fields-page {
  .layout-header {
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

  .header-bar {
    display: flex;
    align-items: center;
    .doc-name {
      margin-left: 16px;
      font-size: 20px;
      font-weight: 700;
    }

    .tags-content {
      margin-left: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .tag-icon {
        margin-right: 16px;
      }
    }

    .doc-name-content {
      display: flex;
      justify-content: center;
      align-items: center;
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
