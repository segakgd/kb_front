<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="10">
      <h1>Мой проект</h1>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import {ProjectStatusEnum} from "@/components/common";

export default {
  components: {NavigateHeader},
  computed: {},
  data() {
    return {
      project: {
        id: 5,
        name: 'Мой новый проект 5',
        status: ProjectStatusEnum.Trial,
        orderCount: '12',
        botCount: '3',
        activeTo: '2024-10-23',
        trialTo: '2024-10-23',
      },
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
