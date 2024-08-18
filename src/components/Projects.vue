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
              <v-img style="width: 30px; height: 30px; margin-right: 10px;" :inline=true :src="item.image"/>
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

// Используем import.meta.glob для загрузки всех изображений
const images = import.meta.glob('@/assets/images/*.svg');

export default {
  components: {NavigateHeader},
  data() {
    return {
      items: [
        {text: 'Мой проект', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Сценарии', image: images['/src/assets/images/navigate/scenarios/bold.svg']},
        {text: 'Боты', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Сценарии', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Боты', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Бронирования', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Заявки и заказы', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Товары и услуги', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Скидки и промокоды', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Доставка', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Интеграции', image: images['/src/assets/images/navigate/bot/bold.svg']},
        {text: 'Настройки проекта', image: images['/src/assets/images/navigate/setting/bold.svg']},
      ],
    };
  },
  methods: {
    async loadImages() {
      for (const key in this.items) {
        const image = await this.items[key].image();
        this.items[key].image = image.default;
      }
    },
  },
  mounted() {
    this.loadImages();
  },
};
</script>
