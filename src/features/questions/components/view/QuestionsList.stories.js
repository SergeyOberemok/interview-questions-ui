import { QuestionFactory } from '@/features/questions/models/question.model.js'
import QuestionsList from './QuestionsList.vue'

export default {
  title: 'Features/Questions/View/QuestionsList',
  component: QuestionsList,
}

export const Default = {
  args: {
    questions: QuestionFactory.createMany(3),
  },
}
