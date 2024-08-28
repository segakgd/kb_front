<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Сценарии</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" v-for="(bot, index) in bots" :key="index">
            <a
              href="/bot/"
              class="bot-item"
            >
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="bot-status--active" v-if="bot.active">Используется</span>
                  <span class="bot-status--blocked" v-else>Не используется</span>
                </div>

                <div class="bot-item--name" style="display: flex; align-items: center;">
                  <span>{{ bot.name }}</span>
                </div>
                <div class="bot-item--field">Шаблон:
                  <span>{{ bot.template }}</span>
                </div>
                <div class="bot-item--field mt-3">Последнее изменение: <span>{{ bot.updatedAt }}</span></div>
                <div class="bot-item--field">Создан: <span>{{ bot.createdAt }}</span></div>
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

    <FiltersLoader v-if="loader && !filterLoaded"/>

    <FilterForm
      v-else
      btn-name="Добавить сценарий"
      uri="http://0.0.0.0/api/admin/project/"
      :httpMethod=HttpMethodEnum.Get
      :fields="fields"
      @btnClick="triggerDialog"
      @loadedData="updateProjects"
      @loaded="loaded"
      @loading="loading"
    />

    <v-dialog v-model="dialog.visible">
      <div class="main-dialog--wrapper" style="margin: auto; min-width: 400px; min-height: 100px;">
        <div class="mb-6">
          <h3 style="font-size: 24px; font-weight: 300;">Создание проекта</h3>
        </div>

        <div class="mb-5">
          <v-text-field
            v-model="dialog.fields.name"
            label="Название проекта"
            variant="outlined"
            clearable
            hide-details
            density="compact"
            :hideSelected=true
            color="#9b61d8"
          />
        </div>

        <v-btn variant="flat" class="main-btn-line w-100" @click="create()">
          Создать
        </v-btn>
      </div>
    </v-dialog>

  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import FilterForm from "@/components/common/FilterForm.vue";
import FiltersLoader from "@/components/common/FiltersLoader.vue";
import {clearEmptyQuery, FilterFormTypeEnum, HttpMethodEnum} from "@/components/common";
import {Paginate, Project} from "@/components/type";
import axios from "axios";
import store from "@/store";

export default {
  components: {FiltersLoader, FilterForm, NavigateHeader},
  computed: {
    HttpMethodEnum() {
      return HttpMethodEnum
    },
  },
  data() {
    return {
      scenarios: [] as Project[],
      paginate: {} as Paginate,

      fields: [
        {
          label: "Статус",
          name: "status",
          value: null,
          type: FilterFormTypeEnum.Select,
          options: [
            {
              title: "Активен",
              value: "active",
            },
            {
              title: "Заблокирован",
              value: "blocked",
            },
            {
              title: "Отключён",
              value: "enabled",
            },
            {
              title: "Пробная версия",
              value: "trial",
            },
          ]
        }
      ],

      dialog: {
        fields: {
          name: ''
        },
        visible: false,
      },

      loader: false,
      filterLoaded: false,


      bots: [
        {
          id: 1,
          name: 'Название сценария 1',
          active: true,
          template: 'Магазин',
          createdAt: '2024-10-23',
          updatedAt: '2024-10-23',
        },
        {
          id: 2,
          name: 'Самый топовый сценарий',
          active: true,
          template: 'Пользовательский',
          createdAt: '2024-10-23',
          updatedAt: '2024-10-23',
        },
        {
          id: 3,
          name: 'Название сценария 3',
          active: false,
          template: 'Курсы',
          createdAt: '2024-10-23',
          updatedAt: '2024-10-23',
        },
        {
          id: 4,
          name: 'Название сценария 4',
          active: false,
          template: 'Пользовательский',
          createdAt: '2024-10-23',
          updatedAt: '2024-10-23',
        },
        {
          id: 5,
          name: 'Мой старый сценарий',
          active: false,
          template: 'Пользовательский',
          createdAt: '2024-10-23',
          updatedAt: '2024-10-23',
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
    loaded() {
      this.loader = false;
    },
    loading() {
      this.loader = true;
    },
    updateProjects(projects: Project[]) {
      this.projects = projects;
    },

    // Main:
    search() {
      this.paginate.currentPage = 1;
      this.upload();
    },
    upload() {
      this.loader = true;

      const requestData = {
        params: {
          page: this.paginate.currentPage,
        }
      }

      requestData.params = clearEmptyQuery(requestData.params);

      axios
        .get('http://0.0.0.0/api/admin/project/', requestData)
        .then(response => {
          this.projects = response.data.items as Project[];
          this.paginate = response.data.paginate as Paginate;

          this.loader = false;

          if (!this.filterLoaded) {
            this.filterLoaded = true;
          }
        })
        .catch(error => {
          store.dispatch('error/triggerError', error.message);

          setTimeout(() => {
            store.dispatch('error/resetError');
          }, 3000);
        });
    },
    create() {
      const requestData = {
        name: this.dialog.fields.name
      }

      axios
        .post('http://0.0.0.0/api/admin/project/', requestData)
        .then(() => {
          this.triggerDialog()
          this.upload();
        })
        .catch(error => {
          store.dispatch('error/triggerError', error.message);

          setTimeout(() => {
            store.dispatch('error/resetError');
          }, 3000);
        });
    },
    // Dialog
    triggerDialog() {
      this.dialog.visible = !this.dialog.visible
    },
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
