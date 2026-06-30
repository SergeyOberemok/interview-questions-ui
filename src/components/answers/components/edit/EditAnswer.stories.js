import { AnswerFactory } from '@/components/answers/models/answer.model.js'
import EditAnswer from './EditAnswer.vue'

export default {
  title: 'Components/Answers/Edit/EditAnswer',
  component: EditAnswer,
}

export const Default = {
  args: {
    modelValue: AnswerFactory.create(),
  },
}
