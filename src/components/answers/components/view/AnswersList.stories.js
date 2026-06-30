import { AnswerFactory } from '@/components/answers/models/answer.model.js'
import AnswersList from './AnswersList.vue'

export default {
  title: 'Components/Answers/View/AnswersList',
  component: AnswersList,
}

export const Default = {
  args: {
    answers: AnswerFactory.createMany(3),
  },
}
