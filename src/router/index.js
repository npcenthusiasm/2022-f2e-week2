import { createRouter, createWebHashHistory } from 'vue-router'
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
    components: {
      // navbar: () => import(/* webpackChunkName: "task" */ '../components/sign-and-send/SignSendNavbar.vue'),
      default: () => import(/* webpackChunkName: "task" */ '../views/sign-and-send/IndexView.vue')
    },
    children: [
      {
        name: 'sign-and-send',
        path: '',
        component: () => import(/* webpackChunkName: "task" */ '../views/sign-and-send/SignAndSendView.vue')
      },
      {
        name: 'preparedoc',
        path: 'preparedoc',
        component: () => import(/* webpackChunkName: "preparedoc" */ '../views/sign-and-send/preparedoc/PrepareDocView.vue')
      },
      {
        name: 'assign-fields',
        path: 'assign-fields',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "assign-fields" */ '../views/sign-and-send/assign-fields/AssignFields.vue')
      },
      {
        name: 'compelete',
        path: 'compelete',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "compelete" */ '../views/sign-and-send/compelete/CompeleteView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
