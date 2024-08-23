<template>
  <v-row style="height: 100%;">
    <v-col cols="12">
      <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
        <div class="login--wrapper">
          <div style="display:flex; justify-content: center; align-items: center; height: 50px;">
            <a href="/projects" class="logo">
              <img class="logo--image" src="@/assets/images/logo.svg" alt="logo"/>
              <span>Kraiber</span>
            </a>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <h4 style="font-size: 20px; font-weight: 300; letter-spacing: 0.2px;">Войти</h4>
          </div>

          <div style="margin-top: 20px;">
            <div style="margin-bottom: 20px">
              <v-text-field
                v-model="email"
                label="Эл. почта"
                variant="outlined"
                clearable
                density="compact"
                :hideSelected=true
                color="#9b61d8"
                :rules="[rules.isEmail]"
              />
            </div>

            <div style="margin-bottom: 20px">
              <v-text-field
                v-model="password"
                label="Пароль"
                variant="outlined"
                clearable
                density="compact"
                :hideSelected=true
                color="#9b61d8"
                :rules="[rules.isValidLength]"
              />
            </div>
          </div>

          <div v-if="errorMessages" style="margin-bottom: 15px; color: #9E0038; font-size: 13px;">
            {{ errorMessages }}
          </div>

          <div style="margin-bottom: 20px">
            <a href="#" style="text-decoration: none; color: #7900b6; ">Забыли пароль?</a>
          </div>

          <div>
            <v-btn
              variant="flat"
              class="main-btn w-100"
              @click=login()
              :disabled=isDisabledButton()
            >
              Войти
            </v-btn>
          </div>

          <div style="text-align: center;">
            <button @click="toRegistration()" style="font-size: 12px; color: #8d08b8;">Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import axios from "axios";

// todo ещё стоит прикрутить лодер

export default {
  components: {NavigateHeader},
  computed: {},
  data() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    const lengthRegex = /^.{6,}$/i

    const rules = {
      isEmail: (value: string) => {
        return !value || emailRegex.test(value) || 'Поле должно быть формата email'
      },
      isValidLength: (value: string) => {
        return !value || lengthRegex.test(value) || 'Минимальное количество символов 6'
      },
    }

    return {
      email: '',
      password: '',
      errorMessages: null,
      rules,
    };
  },
  mounted() {
  },
  methods: {
    login() {
      axios
        .post('http://0.0.0.0/api/user/authenticate/',
          {
            username: this.email,
            password: this.password,
          }
        )
        .then(response => {

          const token = response.data.accessToken;

          localStorage.setItem('authToken', token);

          this.$router.push({ name: 'Projects' });
        })
        .catch(error => {
          this.errorMessages = error.response.data.detail ?? error.message;
        });
    },
    isDisabledButton(): boolean
    {
      return !(this.email && this.password);
    },
    toRegistration(){
      this.$router.push({ name: 'Registration' });
    },
  },
};
</script>

<style scoped>
.login--wrapper {
  padding: 20px;
  min-width: 320px;
  min-height: 320px;
  -webkit-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
}
</style>
