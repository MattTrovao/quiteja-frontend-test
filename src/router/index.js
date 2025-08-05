import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import UsersView from '@/views/Users/UsersView.vue'
import CreatEditUserView from '@/views/Users/CreatEditUser/CreatEditUserView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/users/manage/:user_id?',
    name: 'manage user',
    component: CreatEditUserView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
