<template>
  <NavigateHeader></NavigateHeader>

  <v-row class="h-100">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Проекты</h3>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="loader">
          <ItemsLoader/>
        </v-row>

        <v-row v-else-if="!loader">
          <v-col cols="4" v-for="(project, index) in projects" :key="index">
            <a
              :href="`/project/${project.id}/`"
              class="project-item"
            >
              <div style="width: 100%;">
                <div
                  style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="project-status--active" v-if="project.status === ProjectStatusEnum.Active">
                    Активен до {{ project.activeTo }}</span>
                  <span class="project-status--trial" v-if="project.status === ProjectStatusEnum.Trial">
                    Пробная версия до {{ project.activeTo }}</span>
                  <span class="project-status--blocked"
                        v-else-if="project.status === ProjectStatusEnum.Blocked">Заблокирован</span>
                  <span class="project-status--frozen"
                        v-else-if="project.status === ProjectStatusEnum.Enabled">Отключён</span>
                </div>

                <div class="project-item--name"><span>{{ project.name }}</span></div>
                <div class="project-item--field">Количество заказов: <span>{{ project.orderCount }}</span></div>
                <div class="project-item--field">Количество ботов: <span>{{ project.botCount }}</span></div>
              </div>
            </a>
          </v-col>
        </v-row>

        <v-row v-if="!loader && paginate" style="min-height: 65px;">
          <v-col cols="12" class="info-block">
            <v-pagination
              v-model="paginate.currentPage"
              :length="paginate.totalPages"
              @update:modelValue="upload()"
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
      btn-name="Добавить проект"
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
import {clearEmptyQuery, FilterFormTypeEnum, HttpMethodEnum, ProjectStatusEnum} from "@/components/common";
import axios from "axios";
import {Paginate, Project} from "@/components/type";
import ItemsLoader from "@/components/common/ItemsLoader.vue";
import FiltersLoader from "@/components/common/FiltersLoader.vue";
import store from "@/store";
import FilterForm from "@/components/common/FilterForm.vue";

export default {
  components: {FilterForm, FiltersLoader, ItemsLoader, NavigateHeader},
  computed: {
    HttpMethodEnum() {
      return HttpMethodEnum
    },
    ProjectStatusEnum() {
      return ProjectStatusEnum
    },
  },
  data() {
    return {
      projects: [] as Project[],
      paginate: {} as Paginate,
      dialog: {
        fields: {
          name: ''
        },
        visible: false,
      },

      loader: false,
      filterLoaded: false,

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
    };
  },
  mounted() {
    this.upload();
  },
  methods: {
    loaded(){
      this.loader = false;
    },
    loading(){
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

.project-item {
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

.project-item:hover {
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
