/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import HelloWorld from "@/components/HelloWorld.vue";
import Projects from "@/components/Projects.vue";
import Project from "@/components/Project.vue";
import Scenarios from "@/components/Scenarios.vue";
import Bots from "@/components/Bots.vue";
import Orders from "@/components/Orders.vue";
import Products from "@/components/Products.vue";
import Promotions from "@/components/Promotions.vue";
import Shippings from "@/components/Shippings.vue";
import Integrations from "@/components/Integrations.vue";
import Settings from "@/components/Settings.vue";
import Categories from "@/components/Categories.vue";

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/bots',
    name: 'Bots',
    component: Bots,
  },
  {
    path: '/scenarios',
    name: 'Scenarios',
    component: Scenarios,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: Promotions,
  },
  {
    path: '/shippings',
    name: 'Shippings',
    component: Shippings,
  },
  {
    path: '/integrations',
    name: 'Integrations',
    component: Integrations,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
