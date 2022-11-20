<template>
  <div class="sign-send-page">
    <SignSendNavbar :okBtn="false" :modalOk="modalOk" />
    <div class="desktop-container">
      <a-card class="sign-card">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1">
            <template #tab>
              <span> 上傳檔案 </span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span> 掃描檔案 </span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #tab>
              <span> 歷史上傳 </span>
            </template>
          </a-tab-pane>
        </a-tabs>

        <div></div>
        <div v-if="activeKey === '1'">
          <FileUploader @upload-success="uploadSuccess" />

          <span class="text-neutral-6">檔案大小不得超過 10 MB</span>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import FileUploader from '@/components/sign-and-send/FileUploader.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import SignSendNavbar from '@/components/sign-and-send/SignSendNavbar.vue'

export default defineComponent({
  components: { FileUploader, PlusOutlined, SignSendNavbar },
  setup() {
    const router = useRouter()
    const store = useStore()
    onMounted(() => {
      store.commit('SET_PROGRESS_STATE', 0)
    })
    const handleMenuClick = (e) => {}

    const uploadSuccess = () => {
      router.push({ name: 'preparedoc' })
    }

    const modalOk = () => {
      router.push({ name: 'task' })
    }
    return {
      handleMenuClick,
      uploadSuccess,
      modalOk,
      activeKey: ref('1')
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';

.sign-send-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: #f1f2f5;

  margin: 0 auto;

  ::v-deep(.ant-tabs-nav) {
    margin-bottom: 40px;
  }

  .desktop-container {
    max-width: 1024px;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0 auto;
    width: 100%;
  }

  .sign-card {
    margin-top: 28px;
    padding-bottom: 80px;
    @include ipad {
      margin-top: 116px;
    }

    ::v-deep(.ant-upload) {
      width: 100%;
      height: 280px;
    }
  }
}
</style>
