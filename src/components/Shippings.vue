<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Доставка</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" v-for="(shipping, index) in shippings" :key="index">
            <a
              href="/shipping/"
              class="shipping-item"
            >
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="shipping-status--active" v-if="shipping.active">Включён</span>
                  <span class="shipping-status--blocked" v-else>Выключен</span>
                </div>

                <div class="shipping-item--name" style="display: flex; align-items: center;">
                  <span>{{ shipping.name }}</span>
                </div>
                <div class="shipping-item--field">Тип:
                  <span v-if="shipping.type === ShippingTypeEnum.Pickup">Самовывоз</span>
                  <span v-else-if="shipping.type === ShippingTypeEnum.Courier">Курьер</span>
                  <span v-else>Неизвестно</span>
                </div>
                <div v-if="shipping.price" class="shipping-item--field">Стоимость: <span>{{ shipping.price }}</span></div>
                <div v-else class="shipping-item--field">Стоимость: <span>бесплатно</span></div>

                <div v-if="shipping.freeFrom" class="shipping-item--field">Бесплатно от: <span>{{ shipping.freeFrom }}</span></div>
                <div v-else class="shipping-item--field">Бесплатно от: <span>-</span></div>

                <div class="shipping-item--field mt-3">Создан: <span>{{ shipping.createdAt }}</span></div>
              </div>
            </a>
          </v-col>
        </v-row>

        <v-row style="min-height: 65px;">
          <v-col cols="12" class="info-block">
            <v-pagination
              :length="3"
              density="compact"
              style="width: 230px; color: #838383;"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col cols="3">
      <v-container fluid style="margin-top: 110px;">
        <div class="tools-main">
          <div class="tools-main--group">
            <div class="tools-main--group-btn">
              <v-btn variant="flat" class="main-btn w-100">
                Добавить доставку
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
              <v-btn variant="flat" class="main-btn-line w-100">
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
import {ShippingTypeEnum} from "@/components/common";

export default {
  components: {NavigateHeader},
  computed: {
    ShippingTypeEnum() {
      return ShippingTypeEnum;
    }
  },
  data() {
    return {
      shippings: [
        {
          name: "Самовывоз",
          type: ShippingTypeEnum.Pickup,
          price: null,
          freeFrom: null,
          active: true,
          createdAt: '2024-10-23',
        },
        {
          name: "Стандартная",
          type: ShippingTypeEnum.Courier,
          price: 300,
          freeFrom: 1500,
          active: true,
          createdAt: '2024-10-23',
        },
        {
          name: "Экспресс",
          type: ShippingTypeEnum.Courier,
          price: 800,
          freeFrom: 3000,
          active: true,
          createdAt: '2024-10-23',
        },
        {
          name: "Экспресс +",
          type: ShippingTypeEnum.Courier,
          price: 1000,
          freeFrom: 5000,
          active: false,
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

.shipping-item {
  box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  padding: 30px 20px 20px 20px;
  display: flex;
  width: 100%;
  border-radius: 10px;
  text-decoration: none;
  color: #3C415E;
  position: relative;
  transition: 0.4s;
  overflow: hidden;
}

.shipping-item:hover {
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
}

.shipping-item .shipping-status--active, .shipping-item .shipping-status--blocked {
  padding: 1px 10px;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 24px;
  display: flex;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.shipping-item .shipping-status--active {
  color: #067306;
  background: #D9FABF;
}

.shipping-item .shipping-status--blocked {
  color: #9E0038;
  background: #FFD4F5;
}

.shipping-item--name {
  padding-bottom: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #3C415E;
}

.shipping-item--field {
  color: #3C415E;
  font-weight: 300;
  font-size: 15px;
}

</style>
