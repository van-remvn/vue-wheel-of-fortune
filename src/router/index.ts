import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import WheelView from '../views/WheelView.vue';
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
        title: 'Home',
    }
  },
  {
    path: '/wheel-page',
    name: 'wheelpage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/WheelView.vue'),
    component: WheelView,
    meta: {
        title: 'Wheelpage',
    }
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    // component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        title: "Register"
      }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savePosition) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        }
    } else {
        return { top: 0 }
    }
  },
})

export default router
