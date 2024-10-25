import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';
import LoginView from '@/views/login/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/playground',
      name: 'playground',
      component: () => import('../views/playground/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('../views/login/ForgotView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/login/RegisterView.vue'),
    },
    {
      path: '/activate',
      name: 'activate',
      component: () => import('../views/login/ActivateView.vue'),
    },
    {
      path: '/resend',
      name: 'resend',
      component: () => import('../views/login/ResendView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/appList',
      children: [
        {
          path: 'appList',
          name: 'app-list',
          component: () => import('../views/home/AppList.vue'),
        },
        {
          path: 'app/:appId',
          name: 'app',
          component: () => import('../views/app/AppView.vue'),
          redirect: '/app/:appId/dashboard',
          children: [
            {
              path: 'dashboard',
              name: 'dashboard',
              component: () => import('../views/app/dashboard/DashboardView.vue'),
              meta: { belong: 'dashboard', needToNaviagte: true },
            },
            {
              path: 'data/:dataFormId?',
              name: 'data',
              component: () => import('../views/app/data/DataFormView.vue'),
              meta: { belong: 'data', needToNaviagte: false },
            },
            {
              path: 'storage',
              name: 'storage',
              component: () => import('../views/app/storage/StorageView.vue'),
              meta: { belong: 'storage', needToNaviagte: true },
            },
            {
              path: 'internal/:internalAPIId?',
              name: 'internal',
              component: () => import('../views/app/api/APIInternalView.vue'),
              meta: { belong: 'internal', needToNaviagte: false },
            },
            {
              path: 'external/:externalAPIId?',
              name: 'external',
              component: () => import('../views/app/api/APIExternalView.vue'),
              meta: { belong: 'external', needToNaviagte: false },
            },
            {
              path: 'page/pageId?',
              name: 'page',
              component: () => import('../views/app/page/PageView.vue'),
              meta: { belong: 'page', needToNaviagte: false },
            },
            {
              path: 'localization',
              name: 'localization',
              component: () => import('../views/app/localization/LocalizationView.vue'),
              meta: { belong: 'localization', needToNaviagte: true },
            },
            {
              path: 'flow/flowId?',
              name: 'flow',
              component: () => import('../views/app/flow/FlowView.vue'),
              meta: { belong: 'flow', needToNaviagte: false },
            },
            {
              path: 'import/importId?',
              name: 'import',
              component: () => import('../views/app/file/FileImportView.vue'),
              meta: { belong: 'import', needToNaviagte: false },
            },
            {
              path: 'export/exportId?',
              name: 'export',
              component: () => import('../views/app/file/FileExportView.vue'),
              meta: { belong: 'export', needToNaviagte: false },
            },
          ],
        },
      ],
    },
  ],
});

export default router;
