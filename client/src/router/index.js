import AllJob from '@/component/AllJobs.vue'
import LoginView from '@/view/LoginView.vue'
import SignUp from '@/view/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Es from '@/components/es.vue'

import HomePage from '@/views/HomePage.vue';

// Définition des routes
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true }, // Page protégée
  },
  {
    path: '/es',
    name: 'es',
    component: Es,
    meta: { requiresAuth: true }, // Page protégée

  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/homes',
    name: 'alljobs',
    component: AllJob,
    meta: { requiresAuth: true }, // Page protégée

  },
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
