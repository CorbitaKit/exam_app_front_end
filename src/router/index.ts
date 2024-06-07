import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/login.vue'
import RegisterView from '../views/auth/register.vue'
import TaskView from '../views/task/index.vue'
import { isAuthenticated } from '@/service/authservice'
import { useUserStore } from '@/stores/user/UserStore'
import TaskDetails from '../views/task/details.vue'
import CreateTask from '../views/task/create.vue'
import UpdateTask from '../views/task/update.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const useStore = useUserStore()
        if (!isAuthenticated(useStore)) {
          next()
        } else {
          next('/tasks')
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskView,
      beforeEnter: (to, from, next) => {
        const useStore = useUserStore()
        if (isAuthenticated(useStore)) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/details',
      name: 'details',
      component: TaskDetails,
      beforeEnter: (to, from, next) => {
        const useStore = useUserStore()
        if (isAuthenticated(useStore)) {
          next()
        } else {
          next('/')
        }
      },
    },
    {
      path: '/create',
      name: 'create',
      component: CreateTask,
      beforeEnter: (to, from, next) => {
        const useStore = useUserStore()
        if (isAuthenticated(useStore)) {
          next()
        } else {
          next('/')
        }
      },
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateTask,
      beforeEnter: (to, from, next) => {
        const useStore = useUserStore()
        if (isAuthenticated(useStore)) {
          next()
        } else {
          next('/')
        }
      },
    },
  ]
})
export default router
