import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Products from '../views/Products.vue';
import Form from '@/views/Form.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Products
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/products/add',
    component: Form
  },
  {
    path: '/products/:id',
    component: Form,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
