<template>
  <div class="home">
    <img src="~@/assets/images/Logo.png" alt="" class="logo" />
    <img src="~@/assets/images/home-bg.png" alt="" class="home-bg" />

    <a-card class="home-card">
      <a-tabs v-model:activeKey="activeKey" centered class="home-tabs">
        <a-tab-pane class="login-pane" key="1" tab="登入">
          <div>
            <!-- <a-button type="primary" block html-type="submit">登入</a-button> -->
            <a-space :size="32" class="oauth-btn-wrap">
              <a-button type="primary" size="large" class="oauth-login-btn">
                <template #icon>
                  <!-- <LockOutlined class="site-form-item-icon" /> -->
                  <img
                    src="~@/assets/images/facebook.svg"
                    alt=""
                    width="30"
                    height="30"
                  />
                </template>
              </a-button>
              <a-button type="primary" size="large" class="oauth-login-btn">
                <template #icon>
                  <img src="~@/assets/images/google.svg" alt="" />
                </template>
              </a-button>
            </a-space>
          </div>
          <a-divider class="text-gray">或使用電子信箱登入</a-divider>

          <a-form
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              name="username"
              placeholder="123213"
              :rules="[{ required: true, message: '' }]"
            >
              <a-input
                v-model:value="formState.username"
                size="large"
                placeholder="請輸入您的電子信箱"
              >
                <template #prefix>
                  <MailOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              name="password"
              :rules="[{ required: true, message: '' }]"
            >
              <a-input-password
                v-model:value="formState.password"
                size="large"
                placeholder="請輸入您的密碼"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                block
                size="large"
                :disabled="disabledSubmitBtn"
                html-type="submit"
                >登入</a-button
              >
            </a-form-item>
          </a-form>

          <div class="card-footer">
            <div class="text-gray">
              還沒有帳號？
              <a-typography-link href=""> 註冊 </a-typography-link>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="註冊" force-render> <a-empty /></a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue'

import { defineComponent, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    MailOutlined,
    LockOutlined
  },
  setup() {
    const router = useRouter()
    const formState = reactive({
      username: '',
      password: '',
      remember: true
    })
    const onFinish = values => {
      console.log('Success:', values)
      router.push({ name: 'task' })
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    const disabledSubmitBtn = computed(
      () => formState.password.trim() === '' || formState.username.trim() === ''
    )
    return {
      activeKey: ref('1'),
      formState,
      disabledSubmitBtn,
      onFinish,
      onFinishFailed
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dcecff;
  min-height: 100vh;
  .home-card {
    font-size: 16px;
    max-width: 527px;
    // max-height: 497px;
    // height: 100%;
    width: 100%;
  }

  .logo {
    margin-bottom: 80px;
  }
  .login-pane {
    padding-left: 60px;
    padding-right: 60px;
  }

  .oauth-btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .oauth-login-btn {
      background-color: #dcecff;
      border: none;
      width: 60px;
      height: 60px;
    }
  }

  ::v-deep(.home-tabs .ant-tabs-nav) {
    margin-bottom: 40px;
  }

  .card-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home-bg {
    position: absolute;
    bottom: 0;
    right: 111px;
  }
}

.text-gray {
  color: #b7bac0 !important;
}
</style>
