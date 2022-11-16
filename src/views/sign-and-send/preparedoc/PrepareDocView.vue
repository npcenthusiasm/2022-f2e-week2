<template>
  <div class="task-page">
    <div class="container max-1010 pt-10p pb-10p">
      <a-card>
        <div></div>
        <div class="mb-15">
          <router-link to="/sign-and-send/">上一步</router-link>
        </div>
        <a-form
          :model="formState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish"
        >
          <a-form-item
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
            :name="['user', 'email']"
            label="上傳文件"
            :rules="[{ required: true }]"
          >
            <a-input v-model:value="formState.user.email" />
          </a-form-item>

          <a-form-item :name="['user', 'labels']" label="建立標籤">
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

          <a-form-item>
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>

    <div class="task-content"></div>
  </div>
</template>

<script>
import FileUploader from '@/components/sign-and-send/FileUploader.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { FileUploader, PlusOutlined },
  setup() {
    const router = useRouter()

    const goNextPage = () => {
      router.push({ name: 'assign-fields' })
    }
    const handleMenuClick = e => {
      console.log('click', e)
    }

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

    const onFinish = values => {
      console.log('Success:', values)
      goNextPage()
    }

    const handleChange = value => {
      console.log(`selected ${value}`)
    }

    return {
      handleMenuClick,
      activeKey: ref('1'),
      formState,
      onFinish,
      layout,
      validateMessages,
      value: ref([]),
      handleChange,
      options: ['產品教學', '產品流程', '產品試用', '產品A', '產品B'].map(
        item => {
          return {
            value: item
          }
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped></style>
