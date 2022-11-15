<template>
  <div class="navbar">
    <a-steps v-model:current="current" class="step-bar">
      <a-step title="上傳檔案" />
      <a-step title="確認上傳檔案" />
      <a-step title="製作簽署檔案" />
      <a-step title="下載簽署檔案" />
    </a-steps>

    <div></div>

    <a-button type="primary" ghost>取消</a-button>
  </div>
</template>
<script>
import {
  SearchOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons-vue'

import { defineComponent, ref } from 'vue'
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
    const current = ref(2)
    return {
      activeKey: ref('1'),
      current,
      routes
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
  padding: 0px 32px;

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
    margin: 0 32px;
    max-width: 65%;
  }
}
</style>
