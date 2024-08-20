<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="2">
      <NavigateLeft/>
    </v-col>
    <v-col cols="10">
      <h1>Мой проект</h1>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import NavigateLeft from "@/components/common/NavigateLeft.vue";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {},
  data() {
    return {};
  },
  mounted() {
  },
};
</script>

<style>
</style>
