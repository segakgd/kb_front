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
            <h4 style="font-size: 20px; font-weight: 300; letter-spacing: 0.2px;">Регистрация</h4>
          </div>

          <div style="margin-top: 20px;">
            <div style="margin-bottom: 20px">
              <v-text-field
                v-model="email"
                label="Эл. почта"
                variant="outlined"
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
                density="compact"
                :hideSelected=true
                color="#9b61d8"
                :rules="[
                  rules.isValidLength,
                  rules.mainRegex,
                  rules.mainNumberRegex,
                ]"
              />
            </div>
          </div>

          <div v-if="errorMessages" style="margin-bottom: 15px; color: #9E0038; font-size: 13px;">
            {{ errorMessages }}
          </div>

          <div>
            <v-btn
              variant="flat"
              class="main-btn w-100"
              @click=registration()
              :disabled=isDisabledButton()
            >
              Войти
            </v-btn>
          </div>

          <div style="display: flex; justify-content: center; margin-top: 10px;">
            <button @click="toLogin()" style="font-size: 12px; color: #8d08b8;">Уже есть аккаунт</button>
          </div>

        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import NavigateHeader from "@/components/common/NavigateHeader.vue";
import axios from "axios";

export default {
  components: {NavigateHeader},
  computed: {},
  data() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    const lengthRegex = /^.{6,}$/i
    const mainRegex = /[A-ZА-ЯЁ]/
    const mainNumberRegex = /\d/i

    const rules = {
      isEmail: (value: string) => {
        return !value || emailRegex.test(value) || 'Поле должно быть формата email'
      },
      isValidLength: (value: string) => {
        return !value || lengthRegex.test(value) || 'Минимальное количество символов 6'
      },
      mainRegex: (value: string) => {
        return !value || mainRegex.test(value) || 'Добавьте хотя бы одну заглавную букву'
      },
      mainNumberRegex: (value: string) => {
        return !value || mainNumberRegex.test(value) || 'Добавьте хотя бы одну цифру'
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
    registration() {
      axios
        .post('http://0.0.0.0/api/user/registration/',
          {
            email: this.email,
            password: this.password,
          }
        )
        .then(response => {

          const token = response.data.accessToken;

          localStorage.setItem('authToken', token);
        })
        .catch(error => {
          this.errorMessages = error.response.data.detail ?? error.message;
        });
    },
    isDisabledButton(): boolean
    {
        return !(this.email && this.password);
    },
    toLogin(){
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped>
.login--wrapper {
  padding: 20px;
  min-width: 330px;
  min-height: 320px;
  box-shadow: 0 0 5px 2px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
}
</style>
