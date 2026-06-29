import { AnswerFactory } from '@/features/answers/models/answer.model.js'
import EditAnswer from './EditAnswer.vue'

export default {
  title: 'Features/Answers/Edit/EditAnswer',
  component: EditAnswer,
}

export const Default = {
  args: {
    modelValue: AnswerFactory.create(),
  },
}
