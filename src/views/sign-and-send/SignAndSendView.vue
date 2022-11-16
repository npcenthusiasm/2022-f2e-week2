<template>
  <div class="task-page">
    <div class="container max-1010 pt-10p">
      ro
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

          <div v-if="activeKey === '2'">23</div>
          <!-- <a-tab-pane key="3">
          <template #tab>
            <span>
              <SearchOutlined />
              通知
            </span>
          </template>
        </a-tab-pane> -->
        </a-tabs>

        <div>
          <FileUploader @upload-success="uploadSuccess" />
        </div>
        檔案大小不得超過 10 MB

        <a-button @click="$router.push({ name: 'preparedoc' })"
          >preparedoc</a-button
        >
        <!-- <FileUp /> -->
      </a-card>
    </div>

    <div class="task-content"></div>
  </div>
</template>

<script>
// import FileUp from '@/components/sign-and-send/FileUp.vue'
import FileUploader from '@/components/sign-and-send/FileUploader.vue'
import { PlusOutlined } from '@ant-design/icons-vue'

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { FileUploader, PlusOutlined },
  setup() {
    const router = useRouter()
    const handleMenuClick = e => {
      console.log('click', e)
    }

    const uploadSuccess = () => {
      router.push({ name: 'preparedoc' })
    }
    return {
      handleMenuClick,
      uploadSuccess,
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
