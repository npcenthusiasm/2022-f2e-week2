<template>
  <div class="sign-and-send-page bg-primary">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" class="view" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.sign-and-send-page {
  height: 100%;
}
</style>
