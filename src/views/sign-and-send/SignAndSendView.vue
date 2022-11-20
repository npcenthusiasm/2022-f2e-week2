<template>
  <div class="task-page">
    <SignSendNavbar :okBtn="false" :modalOk="modalOk" />
    <div class="container max-1010 pt-10p">
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
          檔案大小不得超過 10 MB
        </div>
      </a-card>
    </div>

    <div class="task-content"></div>
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
    const handleMenuClick = (e) => {
      console.log('click', e)
    }

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
.task-container {
  padding-top: 10%;
  max-width: 1010px;
}

.task-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: #f1f2f5;

  margin: 0 auto;
  .header-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .task-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .sign-card {
    padding-bottom: 80px;
  }
}
</style>
