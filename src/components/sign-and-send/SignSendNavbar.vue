<template>
  <div class="navbar bg-white">
    <a-steps :current="current" size="small" class="step-bar desktop">
      <a-step title="上傳檔案" />
      <a-step title="確認上傳檔案" />
      <a-step title="製作簽署檔案" />
      <a-step title="下載簽署檔案" />
    </a-steps>

    <a-steps
      :current="current"
      :responsive="false"
      direction="horizontal"
      size="small"
      class="step-bar mobile"
    >
      <a-step />
      <a-step />
      <a-step />
      <a-step />
    </a-steps>

    <div class="button-content">
      <a-space :size="16">
        <QuestionCircleOutlined />

        <slot name="right">
          <a-button type="primary" ghost @click="showModal">取消</a-button>
          <a-button
            type="primary"
            v-if="okBtn"
            @click="handleClickOk"
            :disabled="isDisabledOk"
            >下一步</a-button
          >
        </slot>
      </a-space>
    </div>

    <!-- modal -->
    <a-modal v-model:visible="visible" title="警告" @ok="handleOk">
      <p>確定要放棄編輯文件嗎？</p>

      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="modalOk">確認</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { downloadMultiPagePDF } from '@/helper/downloadPDF'
import {
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue'

import { computed, defineComponent, ref } from 'vue'
// import { useRouter } from 'vue-router'
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
  props: {
    okBtn: {
      type: Boolean,
      default: true
    },
    onOk: {
      type: Function,
      default: () => {}
    },
    isDisabledOk: {
      type: Boolean,
      default: false
    },
    // modal
    modalOk: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    UserOutlined,
    SearchOutlined,
    DownOutlined,
    QuestionCircleOutlined
  },
  setup(props) {
    // const router = useRouter()
    const store = useStore()
    const current = computed(() => store.state.progress)
    const visible = ref(false)

    const canvasInstanceList = computed(() => store.state.canvasInstanceList)

    const showModal = () => {
      visible.value = true
    }
    const handleOk = (e) => {
      visible.value = false
    }
    const handleCancel = () => {
      visible.value = false
    }

    const handleClickOk = () => {
      props.onOk()
    }
    const goNextPage = () => {
      // switch (store.state.progress) {
      //   // case 0:
      //   case 1: {
      //     router.push({ name: 'assign-fields' })
      //     break
      //   }
      //   case 2: {
      //     router.push({ name: 'compelete' })
      //     break
      //   }
      //   // case 3:
      //   default: {
      //     break
      //   }
      // }
    }

    const isDisabled = ref(false)
    const downloadPDF2 = () => {
      //
      // downloadPDF(canvasInstanceList.value[0])
      downloadMultiPagePDF(canvasInstanceList.value)
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
      isDisabled,
      handleClickOk
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';

.navbar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  min-height: 68px;
  border-bottom: 1px solid #f1f2f5;
  padding-top: 16px;
  padding-bottom: 16px;
  box-shadow: 0px 0px 15px rgba(25, 26, 27, 0.08);

  @include ipad {
    flex-direction: row;
  }

  .button-content {
    margin-top: 16px;
    align-self: flex-end;
    @include ipad {
      margin-top: 0px;
      align-self: initial;
    }
  }

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

    &.desktop {
      max-width: 65%;
      display: none;
      @include ipad {
        display: flex;
      }
    }

    &.mobile {
      max-width: 100%;
      @include ipad {
        display: none;
      }
    }
  }
}
</style>
