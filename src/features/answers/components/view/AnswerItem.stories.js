import { AnswerFactory } from '@/features/answers/models/answer.model.js'
import AnswerItem from './AnswerItem.vue'

export default {
  title: 'Features/Answers/View/AnswerItem',
  component: AnswerItem,
}

export const Default = {
  args: {
    answer: AnswerFactory.create(),
  },
}
