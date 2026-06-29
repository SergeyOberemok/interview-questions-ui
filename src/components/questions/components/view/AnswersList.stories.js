import { AnswerFactory } from '@/components/questions/models/answer.model.js'
import AnswersList from './AnswersList.vue'

export default {
  title: 'Components/Questions/View/AnswersList',
  component: AnswersList,
}

export const Default = {
  args: {
    answers: AnswerFactory.createMany(3),
  }
}
