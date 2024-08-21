<template>
  <NavigateHeader></NavigateHeader>

  <v-row style="height: 100%;">
    <v-col cols="2">
      <NavigateLeft/>
    </v-col>
    <v-col cols="10">
      <v-container fluid>
        <v-row style="margin-bottom: 50px;">
          <v-col cols="8">
          </v-col>

          <v-col cols="4" class="d-flex">
            <v-pagination
              :length="3"
              density="compact"
              color="#9b61d8"
              style="width: 100%;"
            ></v-pagination>

            <v-btn variant="flat" class="main-btn">
              Добавить
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="table-wrapper">
              <div class="table-item">
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
                  Статус
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
                  <span v-if="order.status === OrderStatusEnum.New" class="order-status order-status--new">Новый</span>
                  <span v-else-if="order.status === OrderStatusEnum.Reject" class="order-status order-status--reject">Отменён</span>
                  <span v-else-if="order.status === OrderStatusEnum.InProcess" class="order-status order-status--in_process">В процессе</span>
                  <span v-else-if="order.status === OrderStatusEnum.Success" class="order-status order-status--success">Завершён</span>
                </p>

                <p>
                  {{ order.contacts.name }}
                  {{ order.contacts.mail }}
                  {{ order.contacts.phone }}
                  {{ order.contacts.telegram }}
                </p>

                <p>
                  {{ order.payment.amount }}
                </p>

                <p>
                  {{ order.payment.status }}
                </p>

                <p>
                  {{ order.createdAt }}
                </p>
              </div>
            </div>

          </v-col>
        </v-row>

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
            phone: "89999999999",
            mail: "example-long-mail-mail-mail@mail.ru",
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
            mail: "example-long-mail-mail-mail@mail.ru",
            telegram: "@sobakasutulaya",
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
            phone: "89999999999",
            mail: "example-long-mail-mail-mail@mail.ru",
            telegram: "@sobakasutulaya",
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
            status: PaymentStatusEnum.UponReceipt,
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
  -webkit-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
  color: #3C415E;
}

.table-wrapper .table-item {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 2fr 2fr 7fr 3fr 2fr 2fr;
  grid-column-gap: 1em;
  padding: .32em 1em;
  margin: 0;
  background: #fff;
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

.order-status--new{
  background: #93E5FF;
  color: #0073B4;
}

.order-status--reject{
  background: #FFD4F5;
  color: #9E0038;
}

.order-status--in_process{
  background: #FFDBBA;
  color: #C05223;
}

.order-status--success{
  background: #D9FABF;
  color: #067306;
}
</style>
