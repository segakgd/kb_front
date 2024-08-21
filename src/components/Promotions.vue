<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="2">
      <NavigateLeft/>
    </v-col>
    <v-col cols="10">
      <v-container fluid>
        <v-row style="margin-bottom: 50px;">
          <v-col cols="8">
          </v-col>

          <v-col cols="4" class="d-flex">
            <v-pagination
              :length="3"
              density="compact"
              color="#9b61d8"
              style="width: 100%;"
            ></v-pagination>

            <v-btn variant="flat" class="main-btn">
              Добавить
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3 style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 22px; color: #61657C;">
              Промокды
            </h3>
          </v-col>

          <v-col cols="3" v-for="(promocodeItem, index) in promocode" :key="index">
            <div class="block-item">
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="block-status--active" v-if="promocodeItem.active">Включён</span>
                  <span class="block-status--blocked" v-else>Выключен</span>
                </div>

                <div v-if="promocodeItem.type === PromocodeType.Percent" class="shipping-item--field mb-3">
                  <span style="font-size: 30px; color: #7095FF; font-weight: bold;">{{ promocodeItem.amount}} %</span>
                </div>
                <div v-else-if="promocodeItem.type === PromocodeType.Cash" class="shipping-item--field mb-3">
                  <span style="font-size: 30px; color: #7095FF; font-weight: bold;">{{ promocodeItem.amount}} ₽</span>
                </div>

                <div class="block-item--name" style="display: flex;">
                  <span>{{ promocodeItem.name }}</span>
                </div>

                <div class="shipping-item--field">
                  Код: <span>{{ promocodeItem.code}}</span>
                </div>

              </div>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import NavigateLeft from "@/components/common/NavigateLeft.vue";
import {PromocodeType} from "@/components/common";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {
    PromocodeType() {
      return PromocodeType;
    }
  },
  data() {
    return {
      promocode: [
        {
          name: "На 23-е февраля",
          active: true,
          type: PromocodeType.Percent,
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
          type: PromocodeType.Cash,
          code: 'FOR-WOMEN',
          availableCount: 4,
          amount: 200,
          availableFrom: 1000,
          validFrom: '2024-10-23',
          validTo: '2024-10-23',
          createdAt: '2024-10-23',
        },
      ]
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
