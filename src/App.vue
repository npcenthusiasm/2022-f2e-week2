<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <!-- <router-view name="navbar" /> -->
  <!-- <router-view /> -->

  <router-view name="navbar" v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" class="view" />
    </transition>
  </router-view>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" class="view" />
    </transition>
  </router-view>
</template>

<style lang="scss">
html,
body {
  // height: 100%;
  // min-height: 80vh;
}

#app {
  height: 100%;
}
</style>
