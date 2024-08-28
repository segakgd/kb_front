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
          <div v-if="loadedNavigate" style="width: 100%; display:flex; justify-content: center;">

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
              <v-list-item>
                <v-list-item-title>Настройки аккаунта</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title @click="logout">Выход</v-list-item-title>
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
      loadedNavigate: false,
      navItems: null,
    };
  },
  mounted() {
    this.getNavigate()
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');

      this.$router.push({name: 'Login'});
    },
    getNavigate() {
      const projectId = this.$route.params.projectId;

      if (!projectId) {
        return;
      }

      this.navItems = [
        {
          text: 'Мой проект',
          image: '/src/assets/images/navigate/folder/bold.svg',
          link: `/project/${projectId}`
        },
        {
          text: 'Сценарии',
          image: '/src/assets/images/navigate/scenarios/bold.svg',
          link: `/project/${projectId}/scenarios`
        },
        {
          text: 'Боты',
          image: '/src/assets/images/navigate/bot/bold.svg',
          link: `/project/${projectId}/bots`,
        },
        {
          text: 'Заявки и заказы',
          image: '/src/assets/images/navigate/orders/bold.svg',
          link: `/project/${projectId}/orders`,
        },
        {
          text: 'Товары и услуги',
          image: '/src/assets/images/navigate/bag/bold.svg',
          link: `/project/${projectId}/products`,
        },
        {
          text: 'Категории',
          image: '/src/assets/images/navigate/bag/bold.svg',
          link: `/project/${projectId}/categories`,
        },
        {
          text: 'Скидки и промокоды',
          image: '/src/assets/images/navigate/discount/bold.svg',
          link: `/project/${projectId}/promotions`,
        },
        {
          text: 'Доставка',
          image: '/src/assets/images/navigate/delivery/bold.svg',
          link: `/project/${projectId}/shippings`,
        },
        {
          text: 'Интеграции',
          image: '/src/assets/images/navigate/integrations/bold.svg',
          link: `/project/${projectId}/integrations`,
        },
        {
          text: 'Настройки проекта',
          image: '/src/assets/images/navigate/setting/bold.svg',
          link: `/project/${projectId}/settings`,
        },
      ];

      this.loadedNavigate = true;
    }
  }
};
</script>
