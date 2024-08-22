<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Crm</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" v-for="(crmItem, index) in crm" :key="index">
            <div class="integration-item">
              <div style="width: 100%; ">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="integration-status--active" v-if="crmItem.active">Включён</span>
                  <span class="integration-status--blocked" v-else>Выключен</span>
                </div>
                <div class="integration-item--name" style="display: flex;">
                  <img style="width: 35px; height: 35px; margin-right: 10px;" v-if="crmItem.type === IntegrationTypeEnum.AmoCrm"
                       src="@/assets/images/other/amocrm-logo-white 1.svg" alt="telegram"/>
                  <span>{{ crmItem.name }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Платёжные системы</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" v-for="(payment, index) in payments" :key="index">
            <div class="integration-item">
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="integration-status--active" v-if="payment.active">Включён</span>
                  <span class="integration-status--blocked" v-else>Выключен</span>
                </div>
                <div class="integration-item--name" style="display: flex;">
                    <img style="width: 35px; height: 35px; margin-right: 10px;" v-if="payment.type === IntegrationTypeEnum.Sber"
                         src="@/assets/images/other/Sber.svg" alt="telegram"/>
                    <img style="width: 35px; height: 35px; margin-right: 10px;" v-if="payment.type === IntegrationTypeEnum.Robokassa"
                         src="@/assets/images/other/Robokassa.svg" alt="telegram"/>
                  <span>{{ payment.name }}</span>
                </div>
              </div>
            </div>
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
                Добавить интеграцию
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
import NavigateLeft from "@/components/common/NavigateLeft.vue";
import {IntegrationTypeEnum} from "@/components/common";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {
    IntegrationTypeEnum() {
      return IntegrationTypeEnum;
    }
  },
  data() {
    return {
      crm: [
        {
          name: "AmoCrm",
          active: true,
          type: IntegrationTypeEnum.AmoCrm,
        },
      ],
      payments: [
        {
          name: "Robokassa",
          active: true,
          type: IntegrationTypeEnum.Robokassa,
        },
        {
          name: "Sber",
          active: false,
          type: IntegrationTypeEnum.Sber,
        },
      ]
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
.integration-item {
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

.integration-item:hover {
  -webkit-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
}

.integration-item .integration-status--active, .integration-item .integration-status--blocked {
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

.integration-item .integration-status--active {
  color: #067306;
  background: #D9FABF;
}

.integration-item .integration-status--blocked {
  color: #9E0038;
  background: #FFD4F5;
}

.integration-item--name {
  padding-bottom: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #3C415E;
}
</style>
