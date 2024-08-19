<template>
  <NavigateHeader></NavigateHeader>

  <v-row>
    <v-col cols="2">
      <NavigateLeft/>
    </v-col>
    <v-col cols="8">
      <v-btn variant="plain" href="/projects">Проекты</v-btn>
    </v-col>
  </v-row>

</template>

<script setup lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import NavigateLeft from "@/components/common/NavigateLeft.vue";
</script>
