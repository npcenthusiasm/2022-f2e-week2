<template>
  <div class="compelete-view">
    <img :src="compeleteSrc" alt="" />
    <div v-for="image in images" :key="image" class="preview-item">
      <img :src="image" alt="" />
    </div>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {},
  setup() {
    const store = useStore()
    const compeleteSrc = ref(store.state.compeleteSrc)
    const images = ref([])
    const canvasInstanceList = ref(store.state.canvasInstanceList)

    // const compeleteSrc = localStorage.getItem('img')
    console.log('compeleteSrc: ', compeleteSrc.value)
    const canvas = ref(null)
    onMounted(() => {
      message.success('創建成功')
      store.commit('SET_PROGRESS_STATE', 3)

      canvasInstanceList.value.forEach((instance) => {
        const canvasUrl = instance.toDataURL('image/JPEG')
        images.value.push(canvasUrl)
      })
    })
    // console.log('canvas: ', canvas.value)
    // const background = new Image()
    // background.src = compeleteSrc.value

    // const ctx = canvas.value.getContext('2d')
    // console.log('ctx: ', ctx)
    // background.onload = function () {
    //   ctx.drawImage(background, 0, 0)
    // }
    // ctx.drawImage(compeleteSrc, 0, 0)
    // ctx.setBackgroundImage(
    //   compeleteSrc,
    //   canvas.value.renderAll.bind(canvas)
    // )

    //  canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))

    return {
      images,
      canvas,
      compeleteSrc
    }
  }
})
</script>
<style lang="scss" scoped>
.compelete-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
