<template>
  <a-drawer
    class="pdf-drawer"
    title=""
    placement="right"
    :closable="true"
    :autofocus="false"
    :visible="visable"
    :get-container="false"
    :style="{ position: 'absolute', zIndex: 5 }"
    @close="onClose"
  >
    <PDFDrawerContent />
  </a-drawer>
</template>
<script>
import { defineComponent } from 'vue'
import PDFDrawerContent from './PDFDrawerContent.vue'

export default defineComponent({
  components: {
    PDFDrawerContent
  },
  props: {
    visable: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    // const visible = ref(true)
    const afterVisibleChange = (bool) => {
      console.log('visible', bool)
    }
    const showDrawer = () => {
      // visible.value = true
    }
    const onClose = () => {
      emit('onClose', false)
      // visible.value = false
    }
    return {
      afterVisibleChange,
      showDrawer,
      onClose
    }
  }
})
</script>
