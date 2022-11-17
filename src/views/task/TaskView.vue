<template>
  <div class="task-page">
    <div class="container">
      <div class="header-menu">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1">
            <template #tab>
              <span> 待自己簽署 </span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span> 待他人簽署 </span>
              <a-badge :count="1"> </a-badge>
            </template>
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #tab>
              <span>
                已完成
                <a-badge :count="1"> </a-badge>
              </span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="4">
            <template #tab>
              <span> 已取消 </span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="5">
            <template #tab>
              <span> 草稿 </span>
              <a-badge :count="1"> </a-badge>
            </template>
          </a-tab-pane>
          <a-tab-pane key="6">
            <template #tab>
              <span> 已封存 </span>
            </template>
          </a-tab-pane>
        </a-tabs>

        <a-dropdown :trigger="['click']">
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1"> 自己簽署 </a-menu-item>
              <a-menu-item key="2"> 邀請他人簽署 </a-menu-item>
            </a-menu>
          </template>
          <a-button type="primary" size="large">
            <template #icon>
              <PlusOutlined />
            </template>
            新增
          </a-button>
        </a-dropdown>
      </div>
    </div>

    <div class="task-content">
      <div class="container">
        <a-empty image="/static/empty_state.png" :image-style="{}">
          <template #description>
            <span>目前尚無需簽署的文件</span>
          </template>
        </a-empty>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusOutlined } from '@ant-design/icons-vue'

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { PlusOutlined },
  setup() {
    const router = useRouter()
    const handleMenuClick = e => {
      console.log('click', e)
      router.push('/sign-and-send/')
    }
    return {
      handleMenuClick,
      activeKey: ref('1')
    }
  }
})
</script>

<style lang="scss" scoped>
.task-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .header-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .task-content {
    background-color: #f1f2f5;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
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
</style>
