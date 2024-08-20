<template>
  <v-app>
    <div class="app-wrapper">

      <v-main class="d-flex flex-column justify-space-between">
        <router-view/>
      </v-main>

      <v-footer app>
        <Footer></Footer>
      </v-footer>
    </div>
  </v-app>

</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
v-main {
  flex: 1;
}
</style>
<script setup lang="ts">
</script>
