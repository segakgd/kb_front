<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Категории товаров</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="table-wrapper">
              <div class="table-header">
                <p>
                  Название
                </p>

                <p>
                  Статус
                </p>
              </div>

              <div
                class="table-item"
                v-for="(category) in categories"
              >
                <p>
                  {{ category.name }}
                </p>

                <p>
                  <span v-if="category.active" class="category--enabled">Активен</span>
                  <span v-else class="category--disabled">Не активен</span>
                </p>
              </div>
            </div>

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
    <v-col cols="3">
      <v-container fluid style="margin-top: 110px;">
        <div class="tools-main">
          <div class="tools-main--group">
            <div class="tools-main--group-btn">
              <v-btn variant="flat" class="main-btn w-100">
                Добавить
              </v-btn>
            </div>
          </div>

          <div class="tools-main--group">
            <div class="tools-main--group-name">
              <span>Фильтры:</span>
            </div>

            <div class="tools-main--group-field">
              <v-select
                class="select-status-field"
                label="Активность"
                :items="['Активен', 'Не активен']"
                variant="outlined"
                clearable
                hide-details
                density="compact"
                :hideSelected=true
                color="#9b61d8"
              ></v-select>
            </div>

            <div class="tools-main--group-btn">
              <v-btn variant="flat" class="main-btn-line w-100">
                Применить
              </v-btn>
              <!-- todo показываем "Отчистить" когда выбраны фильтры-->
              <!--              <v-btn variant="flat" class="main-btn clear-btn">-->
              <!--                Отчистить-->
              <!--              </v-btn>-->
            </div>
          </div>
        </div>

      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";

export default {
  components: {NavigateHeader},
  computed: {},
  data() {
    return {
      categories: [
        {
          name: "Новый товар",
          active: true,
        },
        {
          name: "Новый товар",
          active: false,
        },
        {
          name: "Новый товар",
          active: true,
        },
        {
          name: "Новый товар",
          active: false,
        },
        {
          name: "Новый товар",
          active: false,
        },
      ],
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
.table-item, .table-header {
  grid-template-columns: 2fr 2fr !important;
}

.category--enabled, .category--disabled{
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 24px;
  padding: 4px 10px;
  border-radius: 10px;
}

.category--enabled {
  background: #D9FABF;
  color: #067306;
}

.category--disabled {
  background: #FFD4F5;
  color: #9E0038;
}
</style>
