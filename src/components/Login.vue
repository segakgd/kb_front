<template>
  <v-row style="height: 100%;">
    <v-col cols="12">
      <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
        <div class="login--wrapper">
          <div style="display:flex; justify-content: center; align-items: center; height: 50px;">
            <a href="/" class="logo">
              <img class="logo--image" src="@/assets/images/logo.svg" alt="logo"/>
              <span>Kraiber</span>
            </a>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <h4 style="font-size: 20px; font-weight: 300; letter-spacing: 0.2px;">Авторизация</h4>
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
                :type="passwordVisible ? 'text' : 'password'"
                label="Пароль"
                variant="outlined"
                clearable
                density="compact"
                color="#9b61d8"
                :rules="[rules.isValidLength]"
                class="password-field"
              >
                <template v-slot:append>
                  <v-icon
                    @click.stop="togglePasswordVisibility"
                    :icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    class="password-toggle-icon"
                  />
                </template>
              </v-text-field>
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
      passwordVisible: false,
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
    isDisabledButton(): boolean {
      const isEmailValid = this.rules.isEmail(this.email) === true;
      const isPasswordValid = this.rules.isValidLength(this.password) === true;

      return !(this.email && this.password && isEmailValid && isPasswordValid);
    },
    toRegistration(){
      this.$router.push({ name: 'Registration' });
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
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

.v-text-field {
  position: relative;
}

.v-input__append .v-icon {
  font-size: 20px;
  position: absolute;
  right: 10px
}

:deep(.v-text-field .v-input__append) {
  margin-inline-start: 0 !important;
}



.password-field :deep(.v-field__append-inner) {
  padding-inline-start: 0;
}

.password-field :deep(.v-field__clearable) {
  margin-right: 16px;
}

.password-field :deep(.v-input__append) {
  margin-inline-start: 0 !important;
}

.password-toggle-icon {
  cursor: pointer;
}
</style>
