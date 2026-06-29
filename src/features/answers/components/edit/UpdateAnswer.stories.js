import { AnswerFactory } from '@/features/answers/models/answer.model.js'
import { fn } from 'storybook/test'
import UpdateAnswer from './UpdateAnswer.vue'

export default {
  title: 'Features/Answers/Edit/UpdateAnswer',
  component: UpdateAnswer,
  args: {
    onUpdated: fn(),
    onCancelled: fn(),
  },
}

export const Default = {
  args: {
    answer: AnswerFactory.create(),
  },
}
