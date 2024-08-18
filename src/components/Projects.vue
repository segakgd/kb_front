<template>

  <NavigateHeader></NavigateHeader>

  
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";

export default {
  components: {NavigateHeader},
  data: () => ({review: '30%'}),
}
</script>
