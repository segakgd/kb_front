<template>
  <NavigateHeader></NavigateHeader>

  <v-row>
    <v-col cols="2">
      <v-card
        class="mx-auto"
        max-width="300"
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            color="primary"
            variant="plain"
          >
            <template v-slot:prepend>
              <v-img style="width: 30px; height: 30px;" :inline=true :src="item.image"/>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";

export default {
  components: {NavigateHeader},
  data: () => ({
    items: [
      {text: 'Мой проект', image: '/assets/images/logo.svg'},
      {text: 'Сценарии', image: '/assets/images/logo.svg'},
      {text: 'Боты', image: '/assets/images/logo.svg'},
      {text: 'Бронирования', image: '/assets/images/logo.svg'},
      {text: 'Заявки и заказы', image: '/assets/images/logo.svg'},
      {text: 'Товары и услуги', image: '/assets/images/logo.svg'},
      {text: 'Скидки и промокоды', image: '/assets/images/logo.svg'},
      {text: 'Доставка', image: '/assets/images/logo.svg'},
      {text: 'Интеграции', image: '/assets/images/logo.svg'},
      {text: 'Настройки проекта', image: '/assets/images/logo.svg'},
    ],
  }),
}
</script>
