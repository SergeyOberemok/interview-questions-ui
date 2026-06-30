import { AnswerFactory } from '@/components/answers/models/answer.model.js'
import AnswerItem from './AnswerItem.vue'

export default {
  title: 'Components/Answers/View/AnswerItem',
  component: AnswerItem,
}

export const Default = {
  args: {
    answer: AnswerFactory.create(),
  },
}
