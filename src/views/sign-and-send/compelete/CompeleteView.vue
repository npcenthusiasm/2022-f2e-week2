<template>
  <div class="compelete-page">
    <SignSendNavbar>
      <template #right>
        <a-button type="primary" ghost @click="goTaskPage">返回主頁</a-button>
        <a-button type="primary" @click="handleClickOk">下載檔案</a-button>
      </template>
    </SignSendNavbar>

    <a-layout-header class="layout-header">
      <AssignFiieldHeader
        :visableDrawer="visableDrawer"
        @togglePreviewSide="togglePreviewSide"
      />
    </a-layout-header>
    <div class="container">
      <a-layout class="page-layout bg-gray">
        <div class="compelete-view">
          <img :src="compeleteSrc" alt="" />
          <div v-for="image in images" :key="image" class="preview-item">
            <img :src="image" alt="" />
          </div>
        </div>
      </a-layout>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import SignSendNavbar from '@/components/sign-and-send/SignSendNavbar.vue'
import AssignFiieldHeader from '@/components/assign-fields/AssignFiieldHeader.vue'
import { downloadMultiPagePDF } from '@/helper/downloadPDF'

export default defineComponent({
  name: 'CompeleteView',
  components: { SignSendNavbar, AssignFiieldHeader },
  setup() {
    const router = useRouter()

    const visableDrawer = ref(false)
    const togglePreviewSide = () => {
      visableDrawer.value ? drawerOnClose() : showPreviewSide()
    }
    const showPreviewSide = () => {
      visableDrawer.value = true
    }
    const drawerOnClose = () => {
      visableDrawer.value = false
    }

    const store = useStore()
    const compeleteSrc = ref(store.state.compeleteSrc)
    const images = ref([])
    const canvasInstanceList = ref(store.state.canvasInstanceList)

    // const compeleteSrc = localStorage.getItem('img')

    const canvas = ref(null)
    onMounted(() => {
      console.log('mounted')

      message.success('創建成功')
      store.commit('SET_PROGRESS_STATE', 3)

      canvasInstanceList.value.forEach((instance) => {
        const canvasUrl = instance.toDataURL('image/JPEG')
        images.value.push(canvasUrl)
      })
    })

    const goNextPage = () => {
      router.push({ name: 'compelete' })
    }

    const handleClickOk = () => {
      downloadMultiPagePDF(canvasInstanceList.value)
    }

    const goTaskPage = () => {
      store.commit('SET_PDF_FILE', null)
      router.replace({ name: 'task' })
    }

    return {
      images,
      canvas,
      compeleteSrc,
      visableDrawer,
      togglePreviewSide,
      goNextPage,
      handleClickOk,
      goTaskPage
    }
  }
})
</script>
<style lang="scss" scoped>
.compelete-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    margin-bottom: 20px;
    max-width: 100%;
  }
}

.compelete-page {
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
