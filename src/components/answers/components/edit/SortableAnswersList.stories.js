import { AnswerFactory } from '../../models/answer.model.js'
import SortableAnswersList from './SortableAnswersList.vue'

export default {
  title: 'Components/Answers/Edit/SortableAnswersList',
  component: SortableAnswersList,
}

export const Default = {
  args: {
    modelValue: AnswerFactory.createMany(3),
  },
}
