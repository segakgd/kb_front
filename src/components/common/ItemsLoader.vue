<template>
  <v-col cols="4">
    <v-skeleton-loader
      class="mx-auto border project-item"
      style="padding: 0;"
      type="article"
    ></v-skeleton-loader>
  </v-col>

  <v-col cols="4">
    <v-skeleton-loader
      class="mx-auto border project-item"
      style="padding: 0;"
      type="article"
    ></v-skeleton-loader>
  </v-col>

  <v-col cols="4">
    <v-skeleton-loader
      class="mx-auto border project-item"
      style="padding: 0;"
      type="article"
    ></v-skeleton-loader>
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

.project-item {
  -webkit-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  padding: 30px 20px 20px 20px;
  display: flex;
  width: 100%;
  border-radius: 10px;
  text-decoration: none;
  color: #3C415E;
  position: relative;
  transition: 0.4s;
  overflow: hidden;
}

.project-item:hover {
  -webkit-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
}

</style>
