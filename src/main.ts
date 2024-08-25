// Plugins
import {registerPlugins} from '@/plugins'

// Components
import App from './App.vue'
import store from './store';
import router from './router';

// Composables
import {createApp} from 'vue'
import axios from "axios";

// Перехватчик запросов
axios.interceptors.request.use(config => {
  const tokenFromLocalStorage = localStorage.getItem('authToken');

  if (tokenFromLocalStorage) {
    config.headers.Authorization = `Bearer ${tokenFromLocalStorage}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

// Перехватчик ответов для обработки 401 ошибки
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('authToken');

    // Используем router напрямую
    router.push({name: 'Login'});

    // Можно также добавить уведомление через store, если нужно
    store.commit('setSnackbar', {
      message: 'Авторизация истекла, пожалуйста, войдите заново.',
      color: 'error'
    });
  }

  return Promise.reject(error);
});

const app = createApp(App)

registerPlugins(app)

app.use(store);
app.use(router);

app.mount('#app')
