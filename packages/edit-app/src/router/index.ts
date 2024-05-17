import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/appList',
      children: [
        {
          path: '/appList',
          name: 'app-list',
          component: () => import('../views/home/AppList.vue')
        },
        {
          path: '/app/:id',
          name: 'app',
          component: () => import('../views/app/AppView.vue')
        }
      ]
    },
  ]
})

export default router
