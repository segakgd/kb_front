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
            <h3>Crm</h3>
          </v-col>

          <v-col cols="3" v-for="(crmItem, index) in crm" :key="index">
            <div class="bot-item">
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="bot-status--active" v-if="crmItem.active">Включён</span>
                  <span class="bot-status--blocked" v-else>Выключен</span>
                </div>
                <div class="bot-item--name">
                  <img style="width: 35px; height: 35px; margin-right: 10px;" v-if="crmItem.type === IntegrationType.AmoCrm"
                       src="@/assets/images/other/amocrm-logo-white 1.svg" alt="telegram"/>
                  <span>{{ crmItem.name }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3>Платёжные системы</h3>
          </v-col>

          <v-col cols="3" v-for="(payment, index) in payments" :key="index">
            <div class="bot-item">
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="bot-status--active" v-if="payment.active">Включён</span>
                  <span class="bot-status--blocked" v-else>Выключен</span>
                </div>
                <div class="bot-item--name" style="display: flex;">
                    <img style="width: 35px; height: 35px; margin-right: 10px;" v-if="payment.type === IntegrationType.Sber"
                         src="@/assets/images/other/Sber.svg" alt="telegram"/>
                    <img style="width: 35px; height: 35px; margin-right: 10px;" v-if="payment.type === IntegrationType.Robokassa"
                         src="@/assets/images/other/Robokassa.svg" alt="telegram"/>
                  <span>{{ payment.name }}</span>
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
import {IntegrationType} from "@/components/common";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {
    IntegrationType() {
      return IntegrationType;
    }
  },
  data() {
    return {
      crm: [
        {
          name: "AmoCrm",
          active: true,
          type: IntegrationType.AmoCrm,
        },
      ],
      payments: [
        {
          name: "Robokassa",
          active: true,
          type: IntegrationType.Robokassa,
        },
        {
          name: "Sber",
          active: false,
          type: IntegrationType.Sber,
        },
      ]
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
.bot-item {
  -webkit-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
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

.bot-item:hover {
  -webkit-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
}

.bot-item .bot-status--active, .bot-item .bot-status--blocked {
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

.bot-item .bot-status--active {
  color: #067306;
  background: #D9FABF;
}

.bot-item .bot-status--blocked {
  color: #9E0038;
  background: #FFD4F5;
}

.bot-item--name {
  padding-bottom: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #3C415E;
}

.bot-item--field {
  color: #3C415E;
  font-weight: 300;
  font-size: 15px;
}
</style>
