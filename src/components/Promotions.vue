<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row style="height: 65px;">
          <v-col cols="12">
            <v-pagination
              :length="3"
              density="compact"
              style="width: 230px; color: #838383;"
            ></v-pagination>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3 style="font-style: normal; font-weight: 500; font-size: 22px; line-height: 22px; color: #61657C;">
              Промокды
            </h3>
          </v-col>

          <v-col cols="4" v-for="(promocodeItem, index) in promocode" :key="index">
            <div class="block-item">
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="block-status--active" v-if="promocodeItem.active">Активен</span>
                  <span class="block-status--blocked" v-else>Не активен</span>
                </div>

                <div v-if="promocodeItem.type === DiscountTypeEnum.Percent" class="shipping-item--field mb-3">
                  <span style="font-size: 30px; color: #7095FF; font-weight: bold;">{{ promocodeItem.amount}} %</span>
                </div>
                <div v-else-if="promocodeItem.type === DiscountTypeEnum.Cash" class="shipping-item--field mb-3">
                  <span style="font-size: 30px; color: #7095FF; font-weight: bold;">{{ promocodeItem.amount}} ₽</span>
                </div>

                <div class="block-item--name" style="display: flex;">
                  <span>{{ promocodeItem.name }}</span>
                </div>

                <div class="shipping-item--field">
                  Промокод: <span style="background: #BFBEFC; padding: 2px 8px; border-radius: 8px;">{{ promocodeItem.code}}</span>
                </div>

                <div class="shipping-item--field">
                  Осталось применений: <span>{{ promocodeItem.availableCount}}</span>
                </div>

                <div class="shipping-item--field mb-3">
                  Применяется от суммы: <span>{{ promocodeItem.availableFrom}} ₽</span>
                </div>

                <div class="shipping-item--field">
                  Активен с: <span> {{ promocodeItem.validFrom}}</span>
                </div>

                <div class="shipping-item--field">
                  Активен до: <span> {{ promocodeItem.validTo}}</span>
                </div>

                <div class="shipping-item--field mt-3">
                  Создан: <span>{{ promocodeItem.createdAt}}</span>
                </div>

              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-15">
          <v-col cols="12">
            <h3 style="font-style: normal; font-weight: 500; font-size: 22px; line-height: 22px; color: #61657C;">
              Скидки
            </h3>
          </v-col>

          <v-col cols="4" v-for="(promocodeItem, index) in promocode" :key="index">
            <div class="block-item">
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="block-status--active" v-if="promocodeItem.active">Активна</span>
                  <span class="block-status--blocked" v-else>Не активна</span>
                </div>

                <div v-if="promocodeItem.type === DiscountTypeEnum.Percent" class="shipping-item--field mb-3">
                  <span style="font-size: 30px; color: #7095FF; font-weight: bold;">{{ promocodeItem.amount}} %</span>
                </div>
                <div v-else-if="promocodeItem.type === DiscountTypeEnum.Cash" class="shipping-item--field mb-3">
                  <span style="font-size: 30px; color: #7095FF; font-weight: bold;">{{ promocodeItem.amount}} ₽</span>
                </div>

                <div class="block-item--name" style="display: flex;">
                  <span>{{ promocodeItem.name }}</span>
                </div>

                <div class="shipping-item--field mb-3">
                  Применяется от суммы: <span>{{ promocodeItem.availableFrom}} ₽</span>
                </div>

                <div class="shipping-item--field">
                  Активен с: <span> {{ promocodeItem.validFrom}}</span>
                </div>

                <div class="shipping-item--field">
                  Активен до: <span> {{ promocodeItem.validTo}}</span>
                </div>

                <div class="shipping-item--field mt-3">
                  Создан: <span>{{ promocodeItem.createdAt}}</span>
                </div>

              </div>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </v-col>

    <v-col cols="3">
      <v-container fluid style="margin-top: 65px;">
        <div class="tools-main">
          <div class="tools-main--group">
            <div class="tools-main--group-btn">
              <v-btn variant="flat" class="main-btn w-100">
                Добавить проект
              </v-btn>
            </div>
          </div>

          <div class="tools-main--group">
            <div class="tools-main--group-name">
              <span>Фильтры:</span>
            </div>

            <div class="tools-main--group-field">
              <v-select
                class="select-status-field"
                label="Статус"
                :items="['Включён', 'Выключен']"
                variant="outlined"
                clearable
                hide-details
                density="compact"
                :hideSelected=true
                color="#9b61d8"
              ></v-select>
            </div>

            <div class="tools-main--group-field">
              <v-select
                label="Тип"
                :items="['Телеграм', 'Вконтакте']"
                variant="outlined"
                clearable
                hide-details
                density="compact"
                :hideSelected=true
                color="#9b61d8"
              ></v-select>
            </div>

            <div class="tools-main--group-btn">
              <v-btn variant="flat" class="main-btn w-100">
                Применить
              </v-btn>
              <!-- todo показываем "Отчистить" когда выбраны фильтры-->
              <!--              <v-btn variant="flat" class="main-btn clear-btn">-->
              <!--                Отчистить-->
              <!--              </v-btn>-->
            </div>
          </div>
        </div>

      </v-container>
    </v-col>

  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import NavigateLeft from "@/components/common/NavigateLeft.vue";
import {DiscountTypeEnum} from "@/components/common";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {
    DiscountTypeEnum() {
      return DiscountTypeEnum;
    }
  },
  data() {
    return {
      promocode: [
        {
          name: "На 23-е февраля",
          active: true,
          type: DiscountTypeEnum.Percent,
          code: '23-FE',
          availableCount: 4,
          amount: 20,
          availableFrom: 1000,
          validFrom: '2024-10-23',
          validTo: '2024-10-23',
          createdAt: '2024-10-23',
        },
        {
          name: "На 8-е марта",
          active: false,
          type: DiscountTypeEnum.Cash,
          code: 'FOR-WOMEN',
          availableCount: 4,
          amount: 200,
          availableFrom: 1000,
          validFrom: '2024-10-23',
          validTo: '2024-10-23',
          createdAt: '2024-10-23',
        },
      ],
      discount: [
        {
          name: "Скидка от души брат",
          active: true,
          type: DiscountTypeEnum.Percent,
          amount: 20,
          availableFrom: 1000,
          validFrom: '2024-10-23',
          validTo: '2024-10-23',
          createdAt: '2024-10-23',
        },
        {
          name: "На 8-е марта",
          active: false,
          type: DiscountTypeEnum.Cash,
          amount: 200,
          availableFrom: 1000,
          validFrom: '2024-10-23',
          validTo: '2024-10-23',
          createdAt: '2024-10-23',
        },
      ],
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
