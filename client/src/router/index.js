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
  history: createWebHistory(), // Utiliser l'historique HTML5 pour les URL propres (sans #)
  routes,                      // Liste des routes
});

export default router;
