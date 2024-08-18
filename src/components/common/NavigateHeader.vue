<template>
  <v-row>
    <v-col cols="12">
      <v-layout style="height: 56px;">
        <v-col cols="3">
          <a href="/" class="logo">
            <v-img class="logo--image" :inline=true src="@/assets/images/logo.svg"/>
            <span>Kraiber</span>
          </a>
        </v-col>

        <v-col cols="6">
          <div class="header-navs--wrapper">
            <v-btn variant="plain" class="header-navs--link" href="/">Проекты</v-btn>

            <v-btn variant="plain" class="header-navs--link" href="/">Новости</v-btn>

            <v-btn variant="plain" class="header-navs--link" href="/">Чат с поддержкой</v-btn>
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
                <v-icon icon="mdi-account"/>
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
      items: [
        {title: 'Настройки аккаунта'},
        {title: 'Выход'},
      ],
    };
  },
};
</script>
