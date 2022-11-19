<template>
  <div>
    <!-- <canvas ref="canvas" id="canvas" width="500" height="300"></canvas> -->
    <FileUp />
  </div>
</template>
<script>
import FileUp from '@/components/sign-and-send/FileUp.vue'
import { message } from 'ant-design-vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    FileUp
  },
  setup() {
    const store = useStore()
    const compeleteSrc = ref(store.state.compeleteSrc)
    // const compeleteSrc = localStorage.getItem('img')
    console.log('compeleteSrc: ', compeleteSrc.value)
    const canvas = ref(null)
    onMounted(() => {
      message.success('創建成功')
      store.commit('SET_PROGRESS_STATE', 3)

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
    })

    return {
      canvas
    }
  }
})
</script>
<style lang="scss" scoped></style>
