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
            <div style="display: flex;">
              <div style="width: 200px; margin-right: 20px;">
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

              <div style="width: 200px; margin-right: 20px;">
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

              <div style="width: 150px;">
                <v-btn variant="flat" class="main-btn apply-btn">
                  Применить
                </v-btn>
              </div>

              <div style="width: 150px;">
                <v-btn variant="flat" class="main-btn clear-btn">
                  Отчистить
                </v-btn>
              </div>
            </div>
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
          <v-col cols="3" v-for="(bot, index) in bots" :key="index">
            <a
              href="/bot/"
              class="bot-item"
            >
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="bot-status--active" v-if="bot.active">Включён</span>
                  <span class="bot-status--blocked" v-else>Выключен</span>
                </div>

                <div class="bot-item--name" style="display: flex; align-items: center;">
                  <img style="width: 25px; height: 25px; margin-right: 10px;" v-if="bot.type === BotType.Telegram"
                       src="@/assets/images/other/telegram.svg" alt="telegram"/>
                  <img style="width: 25px; height: 25px; margin-right: 10px;" v-else-if="bot.type === BotType.Vk"
                       src="@/assets/images/other/vk.svg" alt="vk"/>
                  <span>{{ bot.name }}</span>
                </div>
                <div class="bot-item--field">Тип:
                  <span v-if="bot.type === BotType.Telegram">Телеграм</span>
                  <span v-else-if="bot.type === BotType.Vk">Вконтакте</span>
                  <span v-else>Неизвестно</span>
                </div>
                <div class="bot-item--field">Сценарий: <span>{{ bot.scenario.name }}</span></div>
                <div class="bot-item--field mt-3">Создан: <span>{{ bot.createdAt }}</span></div>
              </div>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import NavigateLeft from "@/components/common/NavigateLeft.vue";
import {BotType} from "@/components/common";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {
    BotType() {
      return BotType;
    },
  },
  data() {
    return {
      bots: [
        {
          id: 1,
          name: 'Мой бот #1',
          active: true,
          type: BotType.Telegram,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 2,
          name: 'Мой бот #2',
          active: true,
          type: BotType.Vk,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 3,
          name: 'Мой бот #3',
          active: false,
          type: BotType.Telegram,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 4,
          name: 'Мой бот #4',
          active: false,
          type: BotType.Telegram,
          scenario: {
            name: "Самый топовый сценарий"
          },
          createdAt: '2024-10-23',
        },
        {
          id: 5,
          name: 'Мой бот #5',
          active: false,
          type: BotType.Vk,
          scenario: {
            name: "Самый топовый сценарий"
          },
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
