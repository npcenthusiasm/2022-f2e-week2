<template>
  <div class="navbar">
    <a-steps v-model:current="current" size="small" class="step-bar">
      <a-step title="上傳檔案" />
      <a-step title="確認上傳檔案" />
      <a-step title="製作簽署檔案" />
      <a-step title="下載簽署檔案" />
    </a-steps>

    <div>
      <a-space :size="16">
        <a-button type="primary" ghost @click="showModal">取消</a-button>
        <a-button type="primary" @click="goNextPage" :disabled="isDisabled"
          >下一步</a-button
        >
        <a-button class="download" type="primary" @click="downloadPDF2"
          >下載PDF
        </a-button>
      </a-space>
    </div>

    <!-- modal -->
    <a-modal v-model:visible="visible" title="警告" @ok="handleOk">
      <p>確定要放棄編輯文件嗎？</p>

      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">確認</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { downloadPDF } from '@/helper/downloadPDF'
import {
  SearchOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons-vue'

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu'
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu'
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu'
  }
]
export default defineComponent({
  components: {
    UserOutlined,
    SearchOutlined,
    DownOutlined
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const current = ref(2)
    const visible = ref(false)
    const showModal = () => {
      visible.value = true
    }
    const handleOk = (e) => {
      console.log(e)
      visible.value = false
    }
    const handleCancel = () => {
      visible.value = false
    }
    const goNextPage = () => {
      switch (store.state.progress) {
        // case 0:
        case 2: {
          router.push({ name: 'assign-fields' })
          break
        }
        case 3: {
          router.push({ name: 'compelete' })
          break
        }
        // case 3:

        default: {
          break
        }
      }
    }

    const isDisabled = ref(false)
    const downloadPDF2 = () => {
      console.log(2)

      downloadPDF(this.canvasInstance)
    }
    return {
      downloadPDF2,
      activeKey: ref('1'),
      current,
      routes,
      visible,
      showModal,
      handleCancel,
      handleOk,
      goNextPage,
      isDisabled
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;

  height: 68px;

  border-bottom: 1px solid #f1f2f5;
  box-shadow: 0px 0px 15px rgba(25, 26, 27, 0.08);

  ::v-deep(.ant-page-header-content) {
    padding-top: 0;
  }

  ::v-deep(.ant-tabs-nav) {
    margin-bottom: 0px;
  }

  .username {
    display: inline-block;
    padding: 0 8px;
  }

  .step-bar {
    margin: 0 0;
    max-width: 65%;
  }
}
</style>
