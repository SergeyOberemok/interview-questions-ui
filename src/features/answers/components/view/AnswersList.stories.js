import { AnswerFactory } from '@/features/answers/models/answer.model.js'
import AnswersList from './AnswersList.vue'

export default {
  title: 'Features/Answers/View/AnswersList',
  component: AnswersList,
}

export const Default = {
  args: {
    answers: AnswerFactory.createMany(3),
  },
}
