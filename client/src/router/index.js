import All from '@/component/AllJobs.vue'
import LoginView from '@/view/LoginView.vue'
import SignUp from '@/view/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Es from '@/components/es.vue'

import AllJobs from '@/components/AllJobs.vue';

import HomePage from '@/views/HomePage.vue';
import AddJobs from '@/components/AddJobs.vue'
import Profil from '@/components/Profil.vue'
import Statistique from '@/components/Statistique.vue'
import Header from '@/components/Header.vue'

// Définition des routes
const routes = [
  
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
  ];

// Création du routeur
const router = createRouter({
  history: createWebHistory(),  
  routes,  
});

// Vérification de l'authentification avant chaque navigation
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Vérification du token
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Si la route nécessite une authentification et que l'utilisateur n'est pas connecté
    next({
      path: '/',
      query: { redirect: to.fullPath },  // Redirection vers la page de connexion
    });
  } else {
    next(); // Continuer la navigation
  }
});

export default router;
