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

        <v-row v-if="loader">
          <ItemsLoader/>
        </v-row>

        <v-row v-else-if="!loader">
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
      btn-name="Добавить бот"
      :fields="fields"
      :uri="`http://0.0.0.0/api/admin/project/${this.projectId}/bot/`"
      :httpMethod=HttpMethodEnum.Get
      @btnClick="triggerDialog"
      @loadedData="updateBots"
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
import {BotTypeEnum, clearEmptyQuery, FilterFormTypeEnum, HttpMethodEnum} from "@/components/common";
import {Bot, Paginate, Scenario} from "@/components/type";
import axios from "axios";
import store from "@/store";
import FilterForm from "@/components/common/FilterForm.vue";
import FiltersLoader from "@/components/common/FiltersLoader.vue";
import ItemsLoader from "@/components/common/ItemsLoader.vue";

export default {
  components: {ItemsLoader, FiltersLoader, FilterForm, NavigateHeader},
  computed: {
    BotTypeEnum() {
      return BotTypeEnum;
    },
    HttpMethodEnum() {
      return HttpMethodEnum
    },
  },
  data() {
    return {
      bots: [] as Bot[],
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
      fields: [
        {
          label: "Статус",
          name: "status",
          value: null,
          type: FilterFormTypeEnum.Select,
          options: [
            {
              title: "Включён",
              value: true,
            },
            {
              title: "Выключен",
              value: false,
            },
          ]
        },
      ],
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
    updateBots(bots: Bot[]) {
      this.bots = bots;
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
        .get(`http://0.0.0.0/api/admin/project/${this.projectId}/bot/`, requestData)
        .then(response => {
          this.bots = response.data.items as Scenario[];
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
        .post( `http://0.0.0.0/api/admin/project/${this.projectId}/bot/`, requestData)
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
