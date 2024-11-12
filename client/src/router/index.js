import AllJobs from '@/component/AllJobs.vue'
import LoginView from '@/view/LoginView.vue'
import SignUp from '@/view/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Essai from '../components/essai.vue'
import Es from '@/components/es.vue'
import AllJobs from '@/components/AllJobs.vue';
import HomePage from '@/views/HomePage.vue';

const routes = [
    {
      path: '/',
      name: '',
      component: HomePage,
    },
    {
      path: '/es',
      name: 'es',
      component: Es,
    },
    {
      path: '/allJobs',
      name: 'allJobs',
      component: AllJobs,
    },
  ]
;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
    },
    {
      path: '/sign-up',
      component: SignUp,
    },
    {
      path: '/home',
      component: AllJobs,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router;
