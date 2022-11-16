<template>
  <div>
    <div class="top-bar">
      <h4 style="margin-bottom: 16px">產品測試文件</h4>

      <div></div>
      <a-tag color="pink">pink</a-tag>
      <a-tag color="red">red</a-tag>
      <a-tag color="orange">orange</a-tag>
      <a-tag color="green">green</a-tag>
    </div>
    <a-layout style="min-height: 100vh" class="page-layout">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
          <a-menu-item key="1">
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

          <!-- <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu> -->
          <!-- <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item> -->
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" />
        <a-layout-content style="margin: 0 16px">
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim,
            animi ducimus dolorum rem nihil cumque distinctio ipsam quae minima?
            Autem accusamus perspiciatis ad blanditiis non nisi dolorum
            reiciendis porro quis.
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1'])
    }
  }
})
</script>
<style lang="scss">
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  /* background: rgba(255, 255, 255, 0.3); */
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  /* background: #141414; */
}

.page-layout {
  .ant-layout-sider {
    background-color: #fff;
  }
}

.top-bar {
  display: flex;
  // justify-content: center;
  align-items: center;
}
</style>
