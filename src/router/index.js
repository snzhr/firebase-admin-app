import { createRouter, createWebHistory } from 'vue-router'
import AddCar from '../views/AddCar.vue'

const routes = [
  {
    path: '/addcar',
    name: 'AddCar',
    component: AddCar
  },
  {
    path: '/',
    name: 'CarsPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarsPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/cars',
    name: 'CarlistAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarlistAdmin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
