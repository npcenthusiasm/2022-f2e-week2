<template>
  <div>
    <canvas ref="canvas" id="canvas" width="500" height="300"></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {},
  setup() {
    const store = useStore()
    const compeleteSrc = ref(store.state.compeleteSrc)
    // const compeleteSrc = localStorage.getItem('img')
    console.log('compeleteSrc: ', compeleteSrc.value)
    const canvas = ref(null)
    onMounted(() => {
      console.log('canvas: ', canvas.value)
      store.commit('SET_PROGRESS_STATE', 4)
      const background = new Image()
      background.src = compeleteSrc.value

      const ctx = canvas.value.getContext('2d')
      console.log('ctx: ', ctx)
      background.onload = function () {
        ctx.drawImage(background, 0, 0)
      }
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
