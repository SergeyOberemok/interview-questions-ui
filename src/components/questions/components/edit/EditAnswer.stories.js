import { AnswerFactory } from '@/components/questions/models/answer.model.js'
import EditAnswer from './EditAnswer.vue'

export default {
  title: 'Components/Questions/Edit/EditAnswer',
  component: EditAnswer,
}

export const Default = {
  args: {
    modelValue: AnswerFactory.create(),
  },
}
