<template>
  <a-drawer
    class="pdf-drawer"
    :title="drawerTitle"
    placement="right"
    :closable="true"
    :width="250"
    :headerStyle="{
      textAlign: 'right'
    }"
    :maskStyle="{
      backgroundColor: 'transparent'
    }"
    :autofocus="false"
    :visible="visable"
    :get-container="false"
    :style="{ position: 'absolute', zIndex: 5, width: 250 }"
    @close="onClose"
  >
    <div class="preview-container">
      <div v-for="image in images" :key="image.page" class="preview-item">
        <div
          class="preview-img-item"
          :class="
            activePage === image.page
              ? ['bg-primary-2']
              : ['bg-neutral-2', 'cursor-pointer']
          "
          @click="setActivePage(image.page)"
        >
          <img :src="image.image" alt="" />
        </div>
        <div class="page-item">
          <div
            class="page"
            :class="
              activePage === image.page
                ? ['bg-primary-1', 'text-white']
                : ['cursor-pointer']
            "
          >
            {{ image.page }}
          </div>
        </div>
      </div>
    </div>
    <a-empty v-if="images.length === 0"></a-empty>
  </a-drawer>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    visable: {
      type: Boolean
    },
    images: {
      type: Array
    }
  },
  setup(props, { emit }) {
    const activePage = ref(1)

    const drawerTitle = computed(() => {
      if (props.images.length === 0) {
        return '--/--'
      }
      return `${activePage.value}/${props.images.length}頁`
    })

    const setActivePage = (page) => {
      activePage.value = page
    }

    const onClose = () => {
      emit('onClose', false)
      // visible.value = false
    }
    return {
      // drawer
      drawerTitle,
      onClose,
      // page
      setActivePage,
      activePage
    }
  }
})
</script>

<style lang="scss" scoped>
.preview-container {
  .preview-item {
    margin-bottom: 20px;
    .preview-img-item {
      padding: 16px;
      margin-bottom: 8px;
      transition: all 0.3s;
      img {
        width: 100%;
      }
    }

    .page-item {
      text-align: center;

      .page {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 14px;
        font-weight: 400;
        display: inline-block;
        transition: all 0.3s;
      }
    }
  }
}
</style>
