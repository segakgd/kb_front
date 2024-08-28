<template>
  <v-col cols="3">
    <v-container fluid style="margin-top: 110px;">
      <div class="tools-main">
        <div class="tools-main--group">
          <div class="tools-main--group-btn">
            <v-btn variant="flat" class="main-btn w-100" @click="btnClick()">
              {{ btnName }}
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
            <v-btn variant="flat" class="main-btn-line w-100" @click="upload()">
              Применить
            </v-btn>
            <v-btn
              v-if="false"
              variant="flat"
              class="main-btn w-100 mt-3 clear-btn">
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
    'btnClick',
    'loadedData',
    'loading',
    'loaded',
  ],
  props: {
    btnName: {
      type: String,
      required: true
    },
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
    };
  },
  methods: {
    btnClick() {
      this.$emit('btnClick');
    },
    upload() {
      this.$emit('loading');

      const requestData = {}

      this.fields.map((item) => {
        requestData[item.name] = item.value;
      })

      if (this.httpMethod === HttpMethodEnum.Get) {
        this.load(requestData);
      }

      if (this.httpMethod === HttpMethodEnum.Post) {
        this.create(requestData);
      }

      if (this.httpMethod === HttpMethodEnum.Patch) {
        this.update(requestData);
      }
    },
    load(data: object) {
      const requestData = {
        params: data,
      }

      requestData.params = clearEmptyQuery(requestData.params);

      axios
        .get(this.uri, requestData)
        .then(response => {
          // Эмитируем событие с результатом
          this.$emit('loadedData', response.data.items);
          this.$emit('loaded');

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
    },
    create(data: object) {
      axios.post<{ message: string, status: string }>(this.uri, data)
        .then(() => {
          this.$emit('loaded');
        })
        .catch(error => {
          store.dispatch('error/triggerError', error.message);

          setTimeout(() => {
            store.dispatch('error/resetError');
          }, 3000);
        });
    },
    update(data: object) {
      axios.patch<{ message: string, status: string }>(this.uri, data)
        .then(() => {
          this.$emit('loaded');
        })
        .catch(error => {
          store.dispatch('error/triggerError', error.message);

          setTimeout(() => {
            store.dispatch('error/resetError');
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
</style>
