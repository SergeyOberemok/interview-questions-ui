import QuestionsView from '@/views/QuestionsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/questions',
      name: 'questions',
      component: QuestionsView,
    },
    {
      path: '/add-question',
      name: 'add-question',
      component: () => import('@/questions/components/AddQuestion.vue'),
    },
    {
      path: '/edit-question/:id',
      name: 'edit-question',
      component: () => import('@/questions/components/EditQuestion.vue'),
    },
  ],
})

export default router
