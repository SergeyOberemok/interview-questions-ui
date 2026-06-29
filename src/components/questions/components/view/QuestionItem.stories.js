import { QuestionFactory } from '@/components/questions/models/question.model.js'
import QuestionItem from './QuestionItem.vue'

export default {
  title: 'Components/Questions/View/QuestionItem',
  component: QuestionItem,
}

export const Default = {
  args: {
    question: QuestionFactory.create(),
  },
}
