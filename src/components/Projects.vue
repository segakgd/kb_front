<template>
  <NavigateHeader></NavigateHeader>

  <v-row>
    <v-col cols="2">
      <div class="nav-left--wrapper">
        <v-list>
          <v-list-item
            v-for="(item, i) in navItems"
            :key="i"
            :value="item"
            color="primary"
            variant="plain"
          >
            <template v-slot:prepend>
              <v-img style="width: 30px; height: 30px; margin-right: 10px;" :inline=true :src="item.image"/>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-col>
    <v-col cols="10">
      <div class="project-items--wrapper">
        <a
          v-for="(project, index) in projects" :key="index"
          href="/project/"
          class="project-item"
        >
          <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 10px;">
              <div>
                <span class="project-status--active" v-if="project.status === ProjectStatusEnum.Active">Активен</span>
                <span class="project-status--blocked" v-else-if="project.status === ProjectStatusEnum.Block">Заблокирован</span>
                <span class="project-status--frozen" v-else-if="project.status === ProjectStatusEnum.Frozen">Заморожен</span>
              </div>
              <v-btn icon="mdi-cog-outline" variant="plain"/>
            </div>

            <div style="font-weight: 400; font-size: 18px;"><span>{{ project.name }}</span></div>
            <div>Количество заказов: <span>{{ project.orderCount }}</span></div>
            <div>Количество ботов: <span>{{ project.botCount }}</span></div>
            <div>Активен до: <span>{{ project.activeTo }}</span></div>
          </div>
        </a>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import {ProjectStatusEnum} from "@/components/common";

export default {
  components: {NavigateHeader},
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
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
        },
        {
          id: 2,
          name: 'Мой новый проект 2',
          status: ProjectStatusEnum.Block,
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
        },
        {
          id: 3,
          name: 'Мой новый проект 3',
          status: ProjectStatusEnum.Frozen,
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
        },
        {
          id: 4,
          name: 'Мой новый проект 4',
          status: ProjectStatusEnum.Block,
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
        },
        {
          id: 5,
          name: 'Мой новый проект 5',
          status: ProjectStatusEnum.Active,
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
        },
        {
          id: 6,
          name: 'Мой новый проект 6',
          status: ProjectStatusEnum.Active,
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
        },
        {
          id: 7,
          name: 'Мой новый проект 7',
          status: ProjectStatusEnum.Active,
          orderCount: '122',
          botCount: '2',
          activeTo: '2024-10-23',
        },
      ],
      navItems: [
        {text: 'Мой проект', image: '/src/assets/images/navigate/folder/bold.svg'},
        {text: 'Сценарии', image: '/src/assets/images/navigate/scenarios/bold.svg'},
        {text: 'Боты', image: '/src/assets/images/navigate/bot/bold.svg'},
        {text: 'Сценарии', image: '/src/assets/images/navigate/scenarios/bold.svg'},
        {text: 'Заявки и заказы', image: '/src/assets/images/navigate/orders/bold.svg'},
        {text: 'Товары и услуги', image: '/src/assets/images/navigate/bag/bold.svg'},
        {text: 'Скидки и промокоды', image: '/src/assets/images/navigate/discount/bold.svg'},
        {text: 'Доставка', image: '/src/assets/images/navigate/delivery/bold.svg'},
        {text: 'Интеграции', image: '/src/assets/images/navigate/integrations/bold.svg'},
        {text: 'Настройки проекта', image: '/src/assets/images/navigate/setting/bold.svg'},
      ],
    };
  },
  methods: {
    async loadImages() {
      for (const key in this.navItems) {
        const image = await this.navItems[key].image();
        this.navItems[key].image = image.default;
      }
    },
  },
  mounted() {
    this.loadImages();
  },
};
</script>

<style>
.project-items--wrapper {
  display: flex;
  flex-wrap: wrap;
}

.project-item {
  -webkit-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  padding: 20px;
  display: flex;
  max-width: 350px;
  width: 100%;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #3C415E;
  position: relative;
}

.project-item .project-status--active, .project-item .project-status--blocked, .project-item .project-status--frozen {
  padding: 3px 10px;
  font-size: 11px;
  border-radius: 10px;
}

.project-item .project-status--active {
  background: #68e600;
}

.project-item .project-status--blocked {
  background: #ff0c55;
  color: #ededed;
}

.project-item .project-status--frozen {
  background: #00dee6;
}


</style>
