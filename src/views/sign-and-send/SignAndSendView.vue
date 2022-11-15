<template>
  <div class="task-page">
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
          <FileUploader />
        </div>
        檔案大小不得超過 10 MB
      </a-card>
    </div>

    <div class="task-content"></div>
  </div>
</template>

<script>
import FileUploader from '@/components/sign-and-send/FileUploader.vue'
import { PlusOutlined } from '@ant-design/icons-vue'

import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { FileUploader, PlusOutlined },
  setup() {
    const handleMenuClick = e => {
      console.log('click', e)
    }
    return {
      handleMenuClick,
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
.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 476px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 768px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 992px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 1200px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 476px) {
  .container {
    width: 100%;
  }
}
@media (min-width: 768px) {
  .container {
    width: 720px;
    max-width: 100%;
  }
}
@media (min-width: 992px) {
  .container {
    width: 960px;
    max-width: 100%;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1140px;
    max-width: 100%;
  }
}
@media (min-width: 1400px) {
  .container {
    width: 1340px;
    max-width: 100%;
  }
}

.max-1010 {
  max-width: 1010px;
}

.pt-10p {
  padding-top: 10%;
}
</style>
