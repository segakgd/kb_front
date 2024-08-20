<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="2">
      <NavigateLeft/>
    </v-col>
    <v-col cols="10">
      <div class="project-items--wrapper">
        <a
          v-for="(project, index) in projects" :key="index"
          href="/project/"
          class="project-item"
        >
          <div style="width: 100%;">
            <div style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
              <span class="project-status--active"
                    v-if="project.status === ProjectStatusEnum.Active">Активен до {{ project.activeTo }}</span>
              <span class="project-status--trial"
                    v-if="project.status === ProjectStatusEnum.Trial">Пробная версия до {{ project.activeTo }}</span>
              <span class="project-status--blocked"
                    v-else-if="project.status === ProjectStatusEnum.Block">Заблокирован</span>
              <span class="project-status--frozen"
                    v-else-if="project.status === ProjectStatusEnum.Enabled">Отключён</span>
            </div>

            <div class="project-item--name"><span>{{ project.name }}</span></div>
            <div class="project-item--field">Количество заказов: <span>{{ project.orderCount }}</span></div>
            <div class="project-item--field">Количество ботов: <span>{{ project.botCount }}</span></div>
          </div>
        </a>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import {ProjectStatusEnum} from "@/components/common";
import NavigateLeft from "@/components/common/NavigateLeft.vue";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {
    ProjectStatusEnum() {
      return ProjectStatusEnum
    },
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          name: 'Мой новый проект 1',
          status: ProjectStatusEnum.Active,
          orderCount: '0',
          botCount: '0',
          activeTo: '2024-10-23',
          trialTo: '2024-10-23',
        },
        {
          id: 2,
          name: 'Мой новый проект 2',
          status: ProjectStatusEnum.Block,
          orderCount: '9',
          botCount: '1',
          activeTo: '2024-10-23',
          trialTo: '2024-10-23',
        },
        {
          id: 3,
          name: 'Мой новый проект 3',
          status: ProjectStatusEnum.Enabled,
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
          trialTo: '2024-10-23',
        },
        {
          id: 4,
          name: 'Мой новый проект 4',
          status: ProjectStatusEnum.Trial,
          orderCount: '22',
          botCount: '1',
          activeTo: '2024-10-23',
          trialTo: '2024-10-23',
        },
        {
          id: 5,
          name: 'Мой новый проект 5',
          status: ProjectStatusEnum.Trial,
          orderCount: '12',
          botCount: '3',
          activeTo: '2024-10-23',
          trialTo: '2024-10-23',
        },
        {
          id: 6,
          name: 'Мой новый проект 6',
          status: ProjectStatusEnum.Active,
          orderCount: '329',
          botCount: '2',
          activeTo: '2024-10-23',
          trialTo: '2024-10-23',
        },
        {
          id: 7,
          name: 'Мой новый проект 7',
          status: ProjectStatusEnum.Active,
          orderCount: '98',
          botCount: '1',
          activeTo: '2024-10-23',
          trialTo: '2024-10-23',
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

.project-item .project-status--active, .project-item .project-status--blocked, .project-item .project-status--frozen, .project-item .project-status--trial {
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

.project-item .project-status--frozen {
  background: #EFF0F6;
  color: #3C415E;
}

.project-item .project-status--trial {
  background: #f6f3ef;
  color: #5e563c;
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
