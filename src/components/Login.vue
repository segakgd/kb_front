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
          </div>`

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
                @focus="hideErrorMessage"
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
                @focus="hideErrorMessage"
              >
                <template v-slot:append>
                  <v-icon
                    :class="['password-toggle-icon', { 'visible': password && password.length > 0 }]"
                    @click.stop="togglePasswordVisibility"
                    :icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                  />
                </template>
              </v-text-field>
            </div>
          </div>

          <div v-if="errorMessages" class="error-message">
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
              {{ isLoading ? 'Вход...' : 'Войти' }}
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
      isLoading: false,
    };
  },
  mounted() {
  },
  methods: {
    login() {
      if (this.isLoading) return;

      this.isLoading = true;
      this.errorMessages = null;

      axios
        .post('http://localhost:8000/api/user/authenticate/',
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
          this.errorMessages = error.response.data ?? error.message;
        })
        .finally(() => {
          this.isLoading = false;
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
    },
    hideErrorMessage() {
      this.errorMessages = null;
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
  position: relative;
}

.v-text-field {
  position: relative;
}

.v-input__append .v-icon {
  font-size: 24px;
  position: absolute;
  right: 10px
}

:deep(.v-text-field .v-input__append) {
  margin-inline-start: 0 !important;
}

/** an eye icon styling */
.password-field :deep(.v-field__append-inner) {
  padding-inline-start: 0;
}

.password-field :deep(.v-field__clearable) {
  margin-right: 24px;
}

.password-field :deep(.v-input__append) {
  margin-inline-start: 0 !important;
}

.password-toggle-icon {
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s ease;
  position: absolute;
  right: 10px;
}

.password-toggle-icon.visible {
  opacity: 1;
}

/** error message */
.error-message {
  position: absolute;
  color: #9E0038;
  font-size: 13px;
  margin-top: -30px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
