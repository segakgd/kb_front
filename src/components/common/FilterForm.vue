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

          <div class="tools-main--group-field" v-for="(field, index) in filter.fields" :key="index">
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
import {clearEmptyQuery, FilterFormTypeEnum} from "@/components/common";
import axios from "axios";
import ItemsLoader from "@/components/common/ItemsLoader.vue";
import FiltersLoader from "@/components/common/FiltersLoader.vue";
import store from "@/store";

export default {
  components: {FiltersLoader, ItemsLoader, NavigateHeader},
  computed: {
    FilterFormTypeEnum() {
      return FilterFormTypeEnum;
    }
  },
  props: {
    fields: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      filter: {

        loaded: false,
      },
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

      const requestData = {
        params: {
          status: this.filter.fields.status,
        }
      }

      requestData.params = clearEmptyQuery(requestData.params);

      axios
        .get('http://0.0.0.0/api/admin/project/', requestData)
        .then(response => {
          this.projects = response.data.items as Project[]
          this.paginate = response.data.paginate as Paginate

          this.loader = false;

          if (!this.filter.loaded) {
            this.filter.loaded = true;
          }
        })
        .catch(error => {
          store.dispatch('error/triggerError', error.message);

          setTimeout(() => {
            store.dispatch('error/resetError');
          }, 3000);
        });
    },
    // Filters:
    clearFilters() {
      this.filter.fields.status = null;
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
