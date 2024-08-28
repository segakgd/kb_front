<template>
  <v-col cols="3">
    <v-container fluid style="margin-top: 110px;">
      <div class="tools-main">
        <div class="tools-main--group">
          <div class="tools-main--group-btn">
            <v-btn variant="flat" class="main-btn w-100" @click="triggerDialog()">
              Добавить проект
            </v-btn>
          </div>
        </div>

        <div class="tools-main--group">
          <div class="tools-main--group-name">
            <span>Фильтры:</span>
          </div>

          <div class="tools-main--group-field" v-for="(field, index) in fields" :key="index">
            <v-select
              v-if="field.type === FilterFormTypeEnum.Select"
              label="Статус"
              :items="field.options"
              v-model="field.value"
              :name=field.name
              variant="outlined"
              clearable
              hide-details
              density="compact"
              :hideSelected=true
              color="#9b61d8"
            />
          </div>

          <div class="tools-main--group-btn">
            <v-btn variant="flat" class="main-btn-line w-100" @click="search()">
              Применить
            </v-btn>
            <v-btn
              v-if="isNotEmptyFilters()"
              variant="flat"
              class="main-btn w-100 mt-3 clear-btn"
              @click="clearFilters()">
              Сбросить фильтры
            </v-btn>
          </div>
        </div>
      </div>

    </v-container>
  </v-col>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import {clearEmptyQuery, FilterFormTypeEnum, HttpMethodEnum} from "@/components/common";
import axios from "axios";
import ItemsLoader from "@/components/common/ItemsLoader.vue";
import FiltersLoader from "@/components/common/FiltersLoader.vue";
import store from "@/store";
import {PropType} from "vue";

export default {
  components: {FiltersLoader, ItemsLoader, NavigateHeader},
  computed: {
    FilterFormTypeEnum() {
      return FilterFormTypeEnum;
    }
  },
  emits: [
    'projectsLoaded',
  ],
  props: {
    uri: {
      type: String,
      required: true
    },
    httpMethod: {
      type: HttpMethodEnum,
      required: true
    },
    fields: {
      type: Object as PropType<any>,
      required: true
    },
  },
  data() {
    return {
      // filterData: {
      //   loaded: false,
      // },
      loader: false,
    };
  },
  mounted() {
    this.upload();
  },
  methods: {
    // Main:
    search() {
      this.upload();
    },
    upload() {
      this.loader = true;

      const requestData = {}

      this.fields.map((item) => {
        requestData[item.name] = item.value;
      })

      // const requestData = {
      //   params: {
      //     // status: this.filter.fields.status,
      //   }
      // }

      requestData.params = clearEmptyQuery(requestData.params);

      if (this.httpMethod === HttpMethodEnum.Get) {
        axios
          .get(this.uri, requestData)
          .then(response => {
            this.loader = false;

            // Эмитируем событие с результатом
            this.$emit('projectsLoaded', response.data.items);

            if (!this.fields.loaded) {
              this.fields.loaded = true;
            }
          })
          .catch(error => {
            store.dispatch('error/triggerError', error.message);

            setTimeout(() => {
              store.dispatch('error/resetError');
            }, 3000);
          });
      }
    },
    // Filters:
    clearFilters() {
      this.fields.fields.status = null;
      this.upload();
    },
    isNotEmptyFilters() {
      return false;
    },
  },
};
</script>

<style scoped>
</style>
