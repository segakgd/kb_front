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

        <v-row v-if="loader">
          <ItemsLoader/>
        </v-row>

        <v-row v-else-if="!loader">
          <v-col cols="4" v-for="(scenario, index) in scenarios" :key="index">
            <a
              :href="`/scenario/${scenario.id}`"
              class="box-block-item"
            >
              <div style="width: 100%;">
                <div style="display: flex; justify-content: end; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span class="status--active" v-if="scenario.active">Используется</span>
                  <span class="status--blocked" v-else>Не используется</span>
                </div>

                <div class="box-block-item--name" style="display: flex; align-items: center;">
                  <span>{{ scenario.name }}</span>
                </div>
                <div class="box-block-item--field">Шаблон:
                  <span>{{ scenario.template }}</span>
                </div>
                <div class="box-block-item--field mt-3">Последнее изменение: <span>{{ scenario.updatedAt }}</span></div>
                <div class="box-block-item--field">Создан: <span>{{ scenario.createdAt }}</span></div>
              </div>
            </a>
          </v-col>
        </v-row>

        <v-row style="min-height: 65px;">
          <v-col cols="12" class="info-block">
            <v-pagination
              v-model="paginate.currentPage"
              :length="paginate.totalPages"
              @update:modelValue="upload()"
              density="compact"
              style="width: 230px; color: #838383;"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <FiltersLoader v-if="loader && !filterLoaded"/>

    <FilterForm
      v-else
      btn-name="Добавить сценарий"
      :uri="`http://0.0.0.0/api/admin/project/${this.projectId}/scenario-template/`"
      :httpMethod=HttpMethodEnum.Get
      @btnClick="triggerDialog"
      @loadedData="updateScenarios"
      @loaded="loaded"
      @loading="loading"
    />

    <v-dialog v-model="dialog.visible">
      <div class="main-dialog--wrapper" style="margin: auto; min-width: 400px; min-height: 100px;">
        <div class="mb-6">
          <h3 style="font-size: 24px; font-weight: 300;">Создание сценария</h3>
        </div>

        <div class="mb-5">
          <v-text-field
            v-model="dialog.fields.name"
            label="Название сценария"
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
import {clearEmptyQuery, HttpMethodEnum} from "@/components/common";
import {Paginate, Scenario} from "@/components/type";
import axios from "axios";
import store from "@/store";
import ItemsLoader from "@/components/common/ItemsLoader.vue";

export default {
  components: {ItemsLoader, FiltersLoader, FilterForm, NavigateHeader},
  computed: {
    HttpMethodEnum() {
      return HttpMethodEnum
    },
  },
  data() {
    return {
      scenarios: [] as Scenario[],
      paginate: {} as Paginate,
      projectId: null,
      dialog: {
        fields: {
          name: ''
        },
        visible: false,
      },

      loader: false,
      filterLoaded: false,
    };
  },
  mounted() {
    this.projectId = this.$route.params.projectId;
    this.upload();
  },
  methods: {
    loaded() {
      this.loader = false;
    },
    loading() {
      this.loader = true;
    },
    updateScenarios(scenarios: Scenario[]) {
      this.scenarios = scenarios;
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
        .get(`http://0.0.0.0/api/admin/project/${this.projectId}/scenario-template/`, requestData)
        .then(response => {
          this.scenarios = response.data.items as Scenario[];
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
        .post( `http://0.0.0.0/api/admin/project/${this.projectId}/scenario-template/`, requestData)
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
</style>
