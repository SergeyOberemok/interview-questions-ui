import { AnswerFactory } from '@/components/questions/models/answer.model.js'
import AnswerItem from './AnswerItem.vue'

export default {
  title: 'Components/Questions/View/AnswerItem',
  component: AnswerItem,
}

export const Default = {
  args: {
    answer: AnswerFactory.create(),
  },
}
