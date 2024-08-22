<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="9">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="info-block">
            <div>
              <h3>Заявки и заказы</h3>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="table-wrapper">
              <div class="table-header">
                <p>
                  Номер
                </p>

                <p>
                  Статус
                </p>

                <p>
                  Контакты
                </p>

                <p>
                  Сумма
                </p>

                <p>
                  Оплата
                </p>

                <p>
                  Дата
                </p>
              </div>

              <div
                class="table-item"
                v-for="(order) in orders"
              >
                <p>
                  {{ order.number }}
                </p>

                <p>
                  <span v-if="order.status === OrderStatusEnum.New"
                        class="order-status order-status--new">Новый</span>
                  <span v-else-if="order.status === OrderStatusEnum.Reject"
                        class="order-status order-status--reject">Отменён</span>
                  <span v-else-if="order.status === OrderStatusEnum.InProcess"
                        class="order-status order-status--in_process">В процессе</span>
                  <span v-else-if="order.status === OrderStatusEnum.Success"
                        class="order-status order-status--success">Завершён</span>
                </p>

                <div>
                  <span v-if="order.contacts.name"
                        style="background: #f8f1ff; padding: 3px 8px; border-radius: 10px; cursor: pointer;">{{
                      order.contacts.name
                    }}</span>
                </div>

                <p>
                  <span v-if="order?.payment?.amount">{{ order.payment.amount }}</span>
                  <span v-else>-</span>
                </p>

                <p>
                  <span v-if="order?.payment?.status === PaymentStatusEnum.Success"
                        class="payment-status payment-status--success">Оплачено</span>
                  <span v-else-if="order?.payment?.status === PaymentStatusEnum.Waiting"
                        class="payment-status payment-status--waiting">Ожидает оплату</span>
                  <span v-else-if="order?.payment?.status === PaymentStatusEnum.Canceled"
                        class="payment-status payment-status--canceled">Отклонена</span>
                  <span v-else-if="order?.payment?.status === PaymentStatusEnum.Failed"
                        class="payment-status payment-status--failed">Ошибка оплаты</span>
                  <span v-else-if="order?.payment?.status === PaymentStatusEnum.Cash"
                        class="payment-status payment-status--cash">Наличными</span>
                  <span v-else class="payment-status">-</span>
                </p>

                <p>
                  {{ order.createdAt }}
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
                label="Статус"
                :items="['Новый', 'Отменён', 'В процессе', 'Завершён']"
                variant="outlined"
                clearable
                hide-details
                density="compact"
                :hideSelected=true
                color="#9b61d8"
              ></v-select>
            </div>

            <div class="tools-main--group-field">
              <v-select
                label="Оплата"
                :items="['Ожидает оплату', 'Отклонена', 'Оплачено', 'Наличными', 'Ошибка оплаты']"
                variant="outlined"
                clearable
                hide-details
                density="compact"
                :hideSelected=true
                color="#9b61d8"
              ></v-select>
            </div>

            <div class="tools-main--group-field">
              <v-text-field
                label="Телеграм"
                variant="outlined"
                clearable
                hide-details
                density="compact"
                :hideSelected=true
                color="#9b61d8"
              />
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
import NavigateLeft from "@/components/common/NavigateLeft.vue";
import {OrderStatusEnum, PaymentStatusEnum} from "@/components/common";

export default {
  components: {NavigateLeft, NavigateHeader},
  computed: {
    OrderStatusEnum() {
      return OrderStatusEnum;
    },
    PaymentStatusEnum() {
      return PaymentStatusEnum;
    },
  },
  data() {
    return {
      orders: [
        {
          number: 1,
          status: OrderStatusEnum.New,
          contacts: {
            name: "Александр Алексанров Алексанрович",
            telegram: "@sobakasutulaya",
          },
          payment: {
            status: PaymentStatusEnum.Waiting,
            amount: 12232.23,
          },
          createdAt: '2024-10-23 12:20',
        },
        {
          number: 2,
          status: OrderStatusEnum.Reject,
          contacts: {
            name: "Александр Алексанров Алексанрович",
            phone: "89999999999",
          },
          payment: {
            status: PaymentStatusEnum.Canceled,
            amount: 12232.23,
          },
          createdAt: '2024-10-23 12:20',
        },
        {
          number: 3,
          status: OrderStatusEnum.InProcess,
          contacts: {
            name: "Александр Алексанров Алексанрович",
            mail: "example-long-mail-mail-mail@mail.ru",
          },
          payment: {
            status: PaymentStatusEnum.Waiting,
            amount: 12232.23,
          },
          createdAt: '2024-10-23 12:20',
        },
        {
          number: 4,
          status: OrderStatusEnum.Success,
          contacts: {
            name: "Александр Алексанров Алексанрович",
            phone: "89999999999",
            mail: "example-long-mail-mail-mail@mail.ru",
            telegram: "@sobakasutulaya",
          },
          payment: {
            status: PaymentStatusEnum.Success,
            amount: 12232.23,
          },
          createdAt: '2024-10-23 12:20',
        },
        {
          number: 5,
          status: OrderStatusEnum.Success,
          contacts: {
            name: "Александр Алексанров Алексанрович",
            phone: "89999999999",
            mail: "example-long-mail-mail-mail@mail.ru",
            telegram: "@sobakasutulaya",
          },
          payment: {
            status: PaymentStatusEnum.Cash,
            amount: 12232.23,
          },
          createdAt: '2024-10-23 12:20',
        },
        {
          number: 5,
          status: OrderStatusEnum.Success,
          contacts: {
            name: "Александр Алексанров Алексанрович",
            phone: "89999999999",
            mail: "example-long-mail-mail-mail@mail.ru",
            telegram: "@sobakasutulaya",
          },
          payment: {
            status: PaymentStatusEnum.Failed,
            amount: 12232.23,
          },
          createdAt: '2024-10-23 12:20',
        },
        {
          number: 5,
          status: OrderStatusEnum.New,
          contacts: {
            name: "Александр Алексанров Алексанрович",
            mail: "example-long-mail-mail-mail@mail.ru",
          },
          createdAt: '2024-10-23 12:20',
        },
      ],
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
.table-wrapper {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: .5em 0 .5em 1em;
  color: #3C415E;
}

.table-wrapper .table-header {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 2fr 2fr 7fr 3fr 2fr 2fr;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #f1f1f1;
}

.table-wrapper .table-item {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 2fr 2fr 7fr 3fr 2fr 2fr;
  background: #fff;
  padding: 20px;
  align-items: center;

  -webkit-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
}

.table-wrapper .table-item p {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  margin-top: -2px;
  padding: 0;
}

.table-wrapper .table-item p button {
  padding: 0;
}

.table-wrapper .table-item:first-child {
  position: sticky;
  top: 0;
  left: 0;
  margin-bottom: 20px;
  z-index: 10;
  background: #fff;
  border-radius: 6px;
}

.table-wrapper .table-item:first-child a,
.table-wrapper .table-item:first-child p,
.table-wrapper .table-item:first-child h4 {
  width: 100%;
  height: 100%;
  color: #000000 !important;
  margin: auto 0;
  text-decoration: none;
  background: none !important;
  border: none !important;
}

.order-status {
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 24px;
  padding: 4px 10px;
  border-radius: 10px;
}

.order-status--new {
  background: #93E5FF;
  color: #0073B4;
}

.order-status--reject {
  background: #FFD4F5;
  color: #9E0038;
}

.order-status--in_process {
  background: #FFDBBA;
  color: #C05223;
}

.order-status--success {
  background: #D9FABF;
  color: #067306;
}

.payment-status {
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 24px;
  padding: 4px 10px;
  border-radius: 10px;
}

.payment-status--success {
  background: #D9FABF;
  color: #067306;
}

.payment-status--waiting {
  background: #FFDBBA;
  color: #C05223;
}

.payment-status--canceled {
  background: #ce93ff;
  color: #6300b4;
}

.payment-status--failed {
  background: #FFD4F5;
  color: #9E0038;
}

.payment-status--cash {
  background: #93E5FF;
  color: #0073B4;
}
</style>
