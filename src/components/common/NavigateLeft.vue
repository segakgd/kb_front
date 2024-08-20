<template>
  <div class="nav-left--wrapper">
    <v-list>
      <v-list-item
        v-for="(item, i) in navItems"
        :key="i"
        :value="item"
        color="primary"
        variant="plain"
        :href="item.link"
      >
        <template v-slot:prepend>
          <img style="width: 30px; height: 30px; margin-right: 10px;" :src="item.image" :alt="item.text"/>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      navItems: [
        {text: 'Мой проект', image: '/src/assets/images/navigate/folder/bold.svg', link: '/project'},
        {text: 'Сценарии', image: '/src/assets/images/navigate/scenarios/bold.svg', link: '/scenarios'},
        {text: 'Боты', image: '/src/assets/images/navigate/bot/bold.svg', link: '/bots'},
        {text: 'Заявки и заказы', image: '/src/assets/images/navigate/orders/bold.svg', link: '/'},
        {text: 'Товары и услуги', image: '/src/assets/images/navigate/bag/bold.svg', link: '/'},
        {text: 'Скидки и промокоды', image: '/src/assets/images/navigate/discount/bold.svg', link: '/'},
        {text: 'Доставка', image: '/src/assets/images/navigate/delivery/bold.svg', link: '/'},
        {text: 'Интеграции', image: '/src/assets/images/navigate/integrations/bold.svg', link: '/'},
        {text: 'Настройки проекта', image: '/src/assets/images/navigate/setting/bold.svg', link: '/'},
      ],
    };
  },
};
</script>
