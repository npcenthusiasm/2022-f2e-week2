<template>
  <div class="header-bar">
    <div class="doc-name-content">
      <FormOutlined />
      <div class="doc-name text-neutral-7'">產品測試文件</div>
    </div>

    <div class="tags-content">
      <TagOutlined class="tag-icon" />
      <div class="tags">
        <a-tag color="pink">產品教學</a-tag>
        <a-tag color="red">產品測試</a-tag>
        <a-tag color="orange">產品測試</a-tag>
        <a-tag color="green">產品教學</a-tag>
      </div>
    </div>

    <div
      class="preview-btn text-neutral-6"
      @click="$emit('togglePreviewSide')"
      :class="visableDrawer ? ['text-primary-1'] : []"
    >
      <EyeOutlined />
      <span class="preview-text">預覽</span>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { FormOutlined, TagOutlined, EyeOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  emits: ['togglePreviewSide'],
  components: {
    FormOutlined,
    TagOutlined,
    EyeOutlined
  },
  props: {
    visableDrawer: {
      typeo: Boolean
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin';

.header-bar {
  display: flex;
  align-items: center;
  .doc-name {
    margin-left: 16px;
    font-size: 20px;
    font-weight: 700;
  }

  .tags-content {
    margin-left: 32px;
    justify-content: center;
    align-items: center;
    display: none;
    @include ipad {
      display: flex;
    }
    .tag-icon {
      margin-right: 16px;
    }
  }

  .doc-name-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preview-btn {
    margin-left: auto;
    font-weight: 500;
    cursor: pointer;
    .preview-text {
      margin-left: 8px;
    }
  }
}
</style>
