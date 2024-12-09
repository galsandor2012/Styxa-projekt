import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cities',
      name: 'cities',
      component: () => import('../views/CityView.vue'),
    },
    {
      path: '/cities/:id',
      name: 'cityById',
      component: () => import('../views/CityDetailView.vue'),
    },
    {
      path: '/points',
      name: 'points',
      component: () => import('../views/PointsView.vue'),
    },
    {
      path: '/point/:id',
      name: 'pointById',
      component: () => import('../views/PointsDetailView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
