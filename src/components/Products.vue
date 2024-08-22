<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Товары и услуги</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="table-wrapper">
              <div class="table-header">
                <p></p>

                <p>
                  Название
                </p>

                <p>
                  Категория
                </p>

                <p>
                  Варианты
                </p>

                <p>
                  Цена
                </p>

                <p>
                  Тип
                </p>

                <p>
                  Количество
                </p>
              </div>

              <div
                class="table-item"
                v-for="(product) in products"
              >
                <div>
                  <div style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 4px; overflow: hidden;">
                    <img v-if="product.image" style="width: 30px; height: 30px;" :src=product.image :alt=product.name>
                    <img v-else src="@/assets/images/other/image.svg" style="width: 30px; height: 30px;" :alt=product.name>
                  </div>
                </div>

                <p>
                  {{ product.name }}
                </p>

                <p>
                  {{ product.category }}
                </p>

                <p>
                  {{ product.variantCount }}
                </p>

                <p>
                  {{ product.amount }}
                </p>

                <p>
                  {{ product.type }}
                </p>

                <p>
                  {{ product.count }}
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
                label="Категория"
                :items="['Моя', 'Новая', 'Категория']"
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

      products: [
        {
          name: "Новый товар",
          category: "Рыба",
          variantCount: 2,
          amount: 210,
          type: "product",
          count: 12,
          image: null,
        },
        {
          name: "Новый товар 2",
          category: "Рыба",
          variantCount: 2,
          amount: 210,
          type: "product",
          count: 12,
          image: null,
        },
        {
          name: "Новый товар 2",
          category: "Рыба",
          variantCount: 2,
          amount: 210,
          type: "product",
          count: 12,
          image: null,
        },
        {
          name: "Новый товар 2",
          category: "Рыба",
          variantCount: 2,
          amount: 210,
          type: "product",
          count: 12,
          image: null,
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
  grid-template-columns: 0.6fr 2fr 2fr 1.5fr 1.5fr 1fr 1fr !important;
}
</style>
