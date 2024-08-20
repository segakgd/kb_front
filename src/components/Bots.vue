<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="2">
      <NavigateLeft/>
    </v-col>
    <v-col cols="10">
      <div style="height: 150px; display: flex; justify-content: space-between;">
        <div style="display: flex;">
          <div style="width: 150px; margin-right: 20px;">
            <v-select
              label="Статус"
              :items="['Все', 'Включён', 'Выключен']"
              variant="outlined"
              hide-details
            ></v-select>
          </div>

          <div style="width: 150px; margin-right: 20px;">
            <v-select
              label="Тип"
              :items="['Все', 'Телеграм', 'Вконтакте']"
              variant="outlined"
              hide-details
            ></v-select>
          </div>

          <div style="width: 150px;">
            <v-btn variant="outlined">
              Отчистить
            </v-btn>
          </div>
        </div>

        <div style="width: 400px;">
          <v-pagination :length="3"></v-pagination>
        </div>
      </div>

      <div class="project-items--wrapper">
        <a
          v-for="(project, index) in bots" :key="index"
          href="/bot/"
          class="project-item"
        >
          <div style="width: 100%;">
            <div style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
              <span class="project-status--active" v-if="project.active">Включён</span>
              <span class="project-status--blocked" v-else>Выключен</span>
            </div>

            <div class="project-item--name" style="display: flex; align-items: center;">
              <img style="width: 25px; height: 25px; margin-right: 10px;" v-if="project.type === BotType.Telegram"
                   src="@/assets/images/other/telegram.svg" alt="telegram"/>
              <img style="width: 25px; height: 25px; margin-right: 10px;" v-else-if="project.type === BotType.Vk"
                   src="@/assets/images/other/vk.svg" alt="vk"/>
              <span>{{ project.name }}</span>
            </div>
            <div class="project-item--field">Тип:
              <span v-if="project.type === BotType.Telegram">Телеграм</span>
              <span v-else-if="project.type === BotType.Vk">Вконтакте</span>
              <span v-else>Неизвестно</span>
            </div>
            <div class="project-item--field">Сценарий: <span>{{ project.scenario.name }}</span></div>
            <div class="project-item--field mt-3">Создан: <span>{{ project.createdAt }}</span></div>
          </div>
        </a>
      </div>
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
.project-items--wrapper {
  display: flex;
  flex-wrap: wrap;
}

.project-item {
  -webkit-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  padding: 30px 20px 20px 20px;
  display: flex;
  max-width: 350px;
  width: 100%;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #3C415E;
  position: relative;
  transition: 0.4s;
  overflow: hidden;
}

.project-item:hover {
  -webkit-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
}

.project-item .project-status--active, .project-item .project-status--blocked {
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

.project-item .project-status--active {
  color: #067306;
  background: #D9FABF;
}

.project-item .project-status--blocked {
  color: #9E0038;
  background: #FFD4F5;
}

.project-item--name {
  padding-bottom: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #3C415E;
}

.project-item--field {
  color: #3C415E;
  font-weight: 300;
  font-size: 15px;
}
</style>
