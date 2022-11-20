<template>
  <div class="sign-and-send-page bg-neutral-2">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <!-- <keep-alive :include="['AssignFields', 'CompeleteView']"> -->
        <!-- v-if="$route.meta?.keepAlive" -->
        <component :is="Component" class="view" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.sign-and-send-page {
  // height: 100%;
  min-height: 100%;
}
</style>
