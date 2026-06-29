import { QuestionFactory } from '@/features/questions/models/question.model.js'
import QuestionItem from './QuestionItem.vue'

export default {
  title: 'Features/Questions/View/QuestionItem',
  component: QuestionItem,
}

export const Default = {
  args: {
    question: QuestionFactory.create(),
  },
}
