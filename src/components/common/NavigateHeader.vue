<template>
  <v-row>
    <v-col cols="12">
      <v-layout class="header--wrapper">
        <v-col cols="3">
          <a href="/projects" class="logo">
            <img class="logo--image" src="@/assets/images/logo.svg" alt="logo"/>
            <span>Kraiber</span>
          </a>
        </v-col>

        <v-col cols="6">
          <div style="width: 100%; display:flex; justify-content: center;">

            <v-btn
              v-for="(item, i) in navItems"
              :key="i"
              :value="item"
              variant="plain"
              class="header-navs--link"
              :href="item.link"
            >
              <template v-slot:prepend>
                <img style="width: 30px; height: 30px;" :src="item.image" :alt="item.text"/>
              </template>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="3" class="header-user--wrapper">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                class="header-navs--link"
              >
                <div class="header-navs--icon">
                  <v-icon icon="mdi-account"/>
                </div>
                Артём Котович
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-layout>

    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      navItems: [
        {text: 'Мой проект', image: '/src/assets/images/navigate/folder/bold.svg', link: '/project'},
        {text: 'Сценарии', image: '/src/assets/images/navigate/scenarios/bold.svg', link: '/scenarios'},
        {text: 'Боты', image: '/src/assets/images/navigate/bot/bold.svg', link: '/bots'},
        {text: 'Заявки и заказы', image: '/src/assets/images/navigate/orders/bold.svg', link: '/orders'},
        {text: 'Товары и услуги', image: '/src/assets/images/navigate/bag/bold.svg', link: '/products'},
        {text: 'Скидки и промокоды', image: '/src/assets/images/navigate/discount/bold.svg', link: '/promotions'},
        {text: 'Доставка', image: '/src/assets/images/navigate/delivery/bold.svg', link: '/shippings'},
        {text: 'Интеграции', image: '/src/assets/images/navigate/integrations/bold.svg', link: '/integrations'},
        {text: 'Настройки проекта', image: '/src/assets/images/navigate/setting/bold.svg', link: '/settings'},
      ],
      items: [
        {title: 'Настройки аккаунта'},
        {title: 'Выход'},
      ],
    };
  },
};
</script>
