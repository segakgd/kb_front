<template>
  <NavigateHeader></NavigateHeader>

  <v-row>
    <v-col cols="2">
      <div class="nav-left--wrapper">
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
      </div>
    </v-col>
    <v-col cols="10">
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";

export default {
  components: {NavigateHeader},
  data() {
    return {
      items: [
        {text: 'Мой проект', image: '/src/assets/images/navigate/folder/bold.svg'},
        {text: 'Сценарии', image: '/src/assets/images/navigate/scenarios/bold.svg'},
        {text: 'Боты', image: '/src/assets/images/navigate/bot/bold.svg'},
        {text: 'Сценарии', image: '/src/assets/images/navigate/scenarios/bold.svg'},
        {text: 'Заявки и заказы', image: '/src/assets/images/navigate/orders/bold.svg'},
        {text: 'Товары и услуги', image: '/src/assets/images/navigate/bag/bold.svg'},
        {text: 'Скидки и промокоды', image: '/src/assets/images/navigate/discount/bold.svg'},
        {text: 'Доставка', image: '/src/assets/images/navigate/delivery/bold.svg'},
        {text: 'Интеграции', image: '/src/assets/images/navigate/integrations/bold.svg'},
        {text: 'Настройки проекта', image: '/src/assets/images/navigate/setting/bold.svg'},
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
