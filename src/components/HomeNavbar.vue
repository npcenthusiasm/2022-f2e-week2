<template>
  <div class="navbar">
    <div>
      <img src="~@/assets/images/Logo.png" alt="" class="logo" width="89" />
    </div>

    <div>
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <SearchOutlined />
              文件
            </span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span>
              <SearchOutlined />
              搜尋
            </span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab>
            <span>
              <SearchOutlined />
              通知
              <!-- <a-badge :count="1"> </a-badge> -->
            </span>
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
    </div>

    <div>
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar style="background-color: #87d068">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <div class="username">usrname</div>
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a href="#">1st menu item</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="#">2nd menu item</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">3rd menu item</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
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
    return {
      activeKey: ref('1'),
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
}
</style>
