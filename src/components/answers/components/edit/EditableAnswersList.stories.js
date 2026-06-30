import { AnswerFactory } from '../../models/answer.model.js'
import EditableAnswersList from './EditableAnswersList.vue'

export default {
  title: 'Components/Answers/Edit/EditableAnswersList',
  component: EditableAnswersList,
}

export const Default = {
  args: {
    modelValue: AnswerFactory.createMany(3),
  },
}
