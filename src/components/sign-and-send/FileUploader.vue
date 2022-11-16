<template>
  <a-upload
    v-model:file-list="fileList"
    :customRequest="customRequest"
    accept="application/pdf"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
// function getBase64(img, callback) {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result))
//   reader.readAsDataURL(img)
// }
export default defineComponent({
  emits: ['upload-success'],
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  setup(props, { emit }) {
    const fileList = ref([])
    const loading = ref(false)
    const imageUrl = ref('')
    const customRequest = data => {
      console.log('data: ', data)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve((data.file.status = 'done'))
        }, 2000)
      })
    }
    const handleChange = info => {
      console.log('info: ', info)

      if (!checkFileSize(info.file)) {
        return
      }
      setTimeout(() => {
        if (info.file.status !== 'done') {
          info.file.status = 'done'
          handleChange(info)
        }
      }, 2000)

      if (info.file.status === 'uploading') {
        loading.value = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, base64Url => {
        //   imageUrl.value = base64Url
        //   loading.value = false
        // })
        loading.value = false

        message.success('上傳成功')
        emit('upload-success')
      }
      // if (info.file.status === 'error') {
      //   loading.value = false
      //   message.error('upload error')
      // }
    }

    const checkFileSize = file => {
      const isLt10M = file.size / 1024 / 1024 < 10
      return isLt10M
    }
    const beforeUpload = file => {
      // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      // if (!isJpgOrPng) {
      //   message.error('You can only upload JPG file!')
      // }
      const isLt10M = checkFileSize(file)
      if (!isLt10M) {
        message.error('檔案超過 10MB，請選擇其他檔案上傳')
      }
      return isLt10M
      // return isJpgOrPng && isLt10M
    }
    return {
      fileList,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
      customRequest
    }
  }
})
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
