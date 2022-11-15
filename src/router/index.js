import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/index/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/task',
    name: 'task',
    components: {
      navbar: () => import(/* webpackChunkName: "task" */ '../components/HomeNavbar.vue'),
      default: () => import(/* webpackChunkName: "task" */ '../views/task/TaskView.vue')
    }
  },
  {
    path: '/sign-and-send',
    name: 'sign-and-send',
    components: {
      navbar: () => import(/* webpackChunkName: "task" */ '../components/SignSendNavbar.vue'),
      default: () => import(/* webpackChunkName: "task" */ '../views/sign-and-send/SignAndSendView.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
