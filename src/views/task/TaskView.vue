<template>
  <div class="task-page bg-neutral-2">
    <div class="">
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

        <div class="dp-btn">
          <a-dropdown :trigger="['click']" :overlayClassName="['task-dp']">
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                  <div class="dp-item">
                    <SignInvitationSvg class="dp-item-img" />
                    <div>
                      <div class="text-black title">自己簽署</div>
                      <div class="text-neutral-6 desc">你是文件唯一簽署者</div>
                    </div>
                  </div>
                </a-menu-item>
                <a-menu-item key="2">
                  <div class="dp-item">
                    <SignPersonallySvg class="dp-item-img" />
                    <div>
                      <div class="text-black title">邀請他人簽署</div>
                      <div class="text-neutral-6 desc">
                        指派簽署欄位給其他簽署人
                      </div>
                    </div>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
            <a-button type="primary" size="large">
              新增
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>
          </a-dropdown>
        </div>
      </div>
    </div>

    <div class="query-bar bg-neutral-2">
      <div>
        <a-select
          size="large"
          ref="select"
          v-model:value="selectedType"
          :options="options1"
          style="width: 120px"
        >
        </a-select>

        <a-select
          size="large"
          class="tag-select"
          ref="select"
          v-model:value="selectedTag"
          :options="tagOptions"
          style="width: 120px"
        >
        </a-select>
      </div>

      <div>
        <a-space :size="24">
          <a-input v-model:value="search" size="large" placeholder="搜尋">
            <template #prefix>
              <SearchOutlined />
            </template>
            <template #suffix>
              <a-tooltip title="Extra information">
                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
              </a-tooltip>
            </template>
          </a-input>

          <div>
            <a-button size="large">
              <BarsOutlined />
            </a-button>
            <a-button size="large">
              <AppstoreOutlined />
            </a-button>
          </div>
          <ReloadOutlined />
        </a-space>
      </div>
    </div>
    <a-divider class="divider"></a-divider>

    <!-- <a-card class="sign-card"> 123 </a-card> -->
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
import {
  PlusOutlined,
  SearchOutlined,
  BarsOutlined,
  AppstoreOutlined,
  ReloadOutlined
} from '@ant-design/icons-vue'

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import SignPersonallySvg from '../../components/svg/SignPersonally.vue'
import SignInvitationSvg from '../../components/svg/SignInvitation.vue'

export default defineComponent({
  components: {
    PlusOutlined,
    SearchOutlined,
    BarsOutlined,
    AppstoreOutlined,
    ReloadOutlined,
    SignPersonallySvg,
    SignInvitationSvg
  },
  setup() {
    const router = useRouter()
    const selectedType = ref('all')
    const selectedTag = ref('all')
    const search = ref('all')

    const options1 = ref([
      {
        value: 'all',
        label: '全部'
      },
      {
        value: 'will_expired',
        label: '即將過期'
      }
    ])
    const tagOptions = ref([
      {
        value: 'all',
        label: '標籤類別'
      },
      {
        value: 'product_teach',
        label: '產品教學'
      }
    ])
    const handleMenuClick = (e) => {
      console.log('click', e)
      router.push('/sign-and-send/')
    }
    return {
      handleMenuClick,
      options1,
      tagOptions,
      selectedType,
      selectedTag,
      search,
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
    background-color: #ffffff;

    padding-left: 16px;
    padding-right: 16px;
    ::v-deep(.ant-tabs-nav) {
      margin-bottom: 0;
    }
  }

  .divider {
    // background-color: $bg-neutral-2;
    // background-color: #f1f2f5;
  }

  .task-content {
    background-color: #f1f2f5;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .query-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 32px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .tag-select {
    margin-left: 24px;
  }
}
</style>
