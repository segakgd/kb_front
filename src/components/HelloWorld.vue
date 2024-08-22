<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="8">
      <v-btn variant="plain" href="/projects">Проекты</v-btn>
    </v-col>
  </v-row>

</template>

<script setup lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
</script>
