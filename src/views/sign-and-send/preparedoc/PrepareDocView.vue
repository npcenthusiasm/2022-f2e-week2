<template>
  <div class="task-page">
    <div class="container max-1010 pt-10p pb-10p">
      <a-card>
        <div></div>
        <div class="doc-card-header">
          <router-link to="/sign-and-send/">上一步</router-link>
        </div>
        <a-form
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          class="doc-form"
          layout="vertical"
          :model="formState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish"
        >
          <a-form-item
            :label-col="labelCol"
            :name="['user', 'name']"
            label="文件名稱"
            :rules="[{ required: true }]"
          >
            <a-input
              v-model:value="formState.user.name"
              placeholder="請輸入檔案名稱"
            />
          </a-form-item>

          <a-form-item
            :label-col="labelCol"
            :name="['user', 'email']"
            label="上傳文件"
            :rules="[{ required: true }]"
          >
            <div class="update-file-info">
              <div class="page text-neutral-6">{{ totalPages }}頁</div>
              <div class="file-info-name text-neutral-7">
                {{ formState.user.email }}
              </div>
            </div>
            <!-- <a-input v-model:value="formState.user.email" /> -->
          </a-form-item>

          <a-form-item
            :name="['user', 'labels']"
            label="建立標籤"
            :label-col="labelCol"
          >
            <!-- <a-input v-model:value="formState.user.labels" /> -->
            <a-select
              v-model:value="formState.user.labels"
              mode="tags"
              style="width: 100%"
              placeholder="請輸入標籤名稱"
              :options="options"
              @change="handleChange"
            ></a-select>
          </a-form-item>

          <!-- <a-form-item>
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item> -->
        </a-form>
      </a-card>
    </div>

    <div class="task-content"></div>
  </div>
</template>

<script>
import FileUploader from '@/components/sign-and-send/FileUploader.vue'
import { getPDFTotalPages } from '@/helper/pdf'
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  components: { FileUploader, PlusOutlined },
  setup() {
    const router = useRouter()
    const store = useStore()

    const totalPages = ref(0)
    const layout = {
      labelCol: {
        span: 2
      }
      // wrapperCol: {
      //   span: 16
      // }
    }

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!'
      },
      number: {
        range: '${label} must be between ${min} and ${max}'
      }
    }

    const formState = reactive({
      user: {
        name: '',
        labels: [],
        email: '',
        website: '',
        introduction: ''
      }
    })

    onMounted(() => {
      store.commit('SET_PROGRESS_STATE', 2)

      const pdfFile = store.state.pdfFile

      if (pdfFile) {
        formState.user.name = pdfFile.name
        formState.user.email = pdfFile.name
        getPDFTotalPages(pdfFile.originFileObj).then((pages) => {
          console.log('pages: ', pages)
          totalPages.value = pages
        })
      }
    })
    const goNextPage = () => {
      router.push({ name: 'assign-fields' })
    }
    const handleMenuClick = (e) => {
      console.log('click', e)
    }

    const onFinish = (values) => {
      console.log('Success:', values)
      goNextPage()
    }

    const handleChange = (value) => {
      console.log(`selected ${value}`)
    }

    return {
      totalPages,
      handleMenuClick,
      activeKey: ref('1'),
      formState,
      onFinish,
      layout,
      validateMessages,
      value: ref([]),
      handleChange,
      labelCol: {
        // span: 4
      },
      wrapperCol: {
        // span: 14
      },
      options: ['產品教學', '產品流程', '產品試用', '產品A', '產品B'].map(
        (item) => {
          return {
            value: item
          }
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.doc-card-header {
  margin-bottom: 42px;
}

.update-file-info {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  cursor: default;

  .page {
    font-size: 12px;
  }
  .file-info-name {
    font-weight: 700;
  }
}
</style>
