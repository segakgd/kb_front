/**
 * navigate.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import store from './store';

// Composables
import { createApp } from 'vue'
import axios from "axios";

axios.interceptors.request.use(config => {
  const tokenFromLocalStorage = localStorage.getItem('authToken');

  if (tokenFromLocalStorage) {
    config.headers.Authorization = `Bearer ${tokenFromLocalStorage}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});


const app = createApp(App)

registerPlugins(app)

app.use(store);

app.mount('#app')
