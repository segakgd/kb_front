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
import Registration from "@/components/Registration.vue";
import Login from "@/components/Login.vue";

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
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId',
    name: 'Project',
    component: Project,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/bots',
    name: 'Bots',
    component: Bots,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/scenarios',
    name: 'Scenarios',
    component: Scenarios,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/promotions',
    name: 'Promotions',
    component: Promotions,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/shippings',
    name: 'Shippings',
    component: Shippings,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/integrations',
    name: 'Integrations',
    component: Integrations,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/project/:projectId/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router
