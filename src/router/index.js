import AddQuestion from '@/questions/components/AddQuestion.vue'
import EditQuestion from '@/questions/components/EditQuestion.vue'
import QuestionsView from '@/views/QuestionsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: AddQuestion,
    },
    {
      path: '/edit-question/:id',
      name: 'edit-question',
      component: EditQuestion,
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import('@/views/DevView.vue'),
    },
  ],
})

export default router
