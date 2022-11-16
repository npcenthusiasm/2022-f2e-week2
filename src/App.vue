<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view name="navbar" />
  <router-view />
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
