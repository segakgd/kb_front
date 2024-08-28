<template>
  <v-alert
    v-if="hasError"
    position="fixed"
    style="bottom: 0; right: 0; z-index: 1010; width: 300px;"
    density="comfortable"
    type="error"
    title="Упс"
  >
    {{ 'Упс, что-то пошло не так!' }}
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    const hasError = computed(() => store.getters['error/hasError']);
    const errorMessage = computed(() => store.getters['error/errorMessage']);

    return {
      hasError,
      errorMessage,
    };
  },
});
</script>

<style scoped>
/* Если потребуется дополнительная стилизация, добавьте её сюда */
</style>
