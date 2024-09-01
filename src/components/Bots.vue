<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Боты</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" v-for="(bot, index) in bots" :key="index">
            <a
              :href="`/bot/${bot.id}`"
              class="box-block-item"
            >
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="status--active" v-if="bot.active">Включён</span>
                  <span class="status--blocked" v-else>Выключен</span>
                </div>

                <div class="box-block-item--name" style="display: flex; align-items: center;">
                  <img style="width: 25px; height: 25px; margin-right: 10px;" v-if="bot.type === BotTypeEnum.Telegram"
                       src="@/assets/images/other/telegram.svg" alt="telegram"/>
                  <img style="width: 25px; height: 25px; margin-right: 10px;" v-else-if="bot.type === BotTypeEnum.Vk"
                       src="@/assets/images/other/vk.svg" alt="vk"/>
                  <span>{{ bot.name }}</span>
                </div>
                <div class="box-block-item--field">Тип:
                  <span v-if="bot.type === BotTypeEnum.Telegram">Телеграм</span>
                  <span v-else-if="bot.type === BotTypeEnum.Vk">Вконтакте</span>
                  <span v-else>Неизвестно</span>
                </div>
                <div class="box-block-item--field">Сценарий: <span>{{ bot.scenario.name }}</span></div>
                <div class="box-block-item--field mt-3">Создан: <span>{{ bot.createdAt }}</span></div>
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
                Добавить бот
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
import {BotTypeEnum} from "@/components/common";

export default {
  components: {NavigateHeader},
  computed: {
    BotTypeEnum() {
      return BotTypeEnum;
    },
  },
  data() {
    return {
      bots: [
        {
          id: 1,
          name: 'Мой бот #1',
          active: true,
          type: BotTypeEnum.Telegram,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 2,
          name: 'Мой бот #2',
          active: true,
          type: BotTypeEnum.Vk,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 3,
          name: 'Мой бот #3',
          active: false,
          type: BotTypeEnum.Telegram,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 4,
          name: 'Мой бот #4',
          active: false,
          type: BotTypeEnum.Telegram,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 5,
          name: 'Мой бот #5',
          active: false,
          type: BotTypeEnum.Vk,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
      ],
    };
  },
  mounted() {
    this.projectId = this.$route.params.projectId;
  },
};
</script>

<style scoped>
</style>
