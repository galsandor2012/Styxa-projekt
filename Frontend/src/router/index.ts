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
      path: '/point/:id',
      name: 'pointById',
      component: () => import('../views/PointOfInterestView.vue'),
    },
  ],
})

export default router
