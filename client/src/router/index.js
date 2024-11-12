import All from '@/component/AllJobs.vue'
import LoginView from '@/view/LoginView.vue'
import SignUp from '@/view/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Essai from '../components/essai.vue'
import Es from '@/components/es.vue'
import AllJobs from '@/components/AllJobs.vue';

import HomePage from '@/views/HomePage.vue';
import AddJobs from '@/components/AddJobs.vue'
import Profil from '@/components/Profil.vue'
import Statistique from '@/components/Statistique.vue'
import Header from '@/components/Header.vue'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/es',
      name: 'es',
      component: Es,
    },
    {
      path: '/header',
      name: 'header',
      component: Header,
    },
    {
      path: '/statistiques',
      name: 'statistiques',
      component: Statistique,
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil,
    },
    {
      path: '/addJobs',
      name: 'addJobs',
      component: AddJobs,
    },
    {
      path: '/allJob',
      name: 'allJob',
      component: AllJobs,
    },
    {
      path: '/all',
      name: 'all',
      component: All,
    },
    {
      path: '/',
      component: LoginView,
    },
    {
      path: '/sign-up',
      component: SignUp,
    },
    // {
    //   path: '/homes',
    //   component: AllJobs,
    // },
  ]
});

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
    
//     // {
//     //   path: '/about',
//     //   name: 'about',
//     //   // route level code-splitting
//     //   // this generates a separate chunk (About.[hash].js) for this route
//     //   // which is lazy-loaded when the route is visited.
//     //   component: () => import('../views/AboutView.vue'),
//     // },
//   ],
// })

export default routes;
