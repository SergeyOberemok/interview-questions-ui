import AddQuestion from '@/features/questions/components/edit/AddQuestion.vue'
import EditQuestion from '@/features/questions/components/edit/EditQuestion.vue'
import QuestionsView from '@/views/QuestionsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: '/questions' },
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
      path: '/assessment',
      name: 'assessment',
      component: () => import('@/views/AssessmentView.vue'),
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import('@/views/DevView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
