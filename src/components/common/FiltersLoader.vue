<template>
  <v-col cols="3">
    <v-container fluid style="margin-top: 110px;">
      <v-skeleton-loader
        class="mx-auto border "
        style="padding: 0;"
        type="heading, text, heading, heading"
      ></v-skeleton-loader>
    </v-container>
  </v-col>
</template>

<script lang="ts">
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
