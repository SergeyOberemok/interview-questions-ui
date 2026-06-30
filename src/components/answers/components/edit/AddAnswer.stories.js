import { fn } from 'storybook/test'
import AddAnswer from './AddAnswer.vue'

export default {
  title: 'Components/Answers/Edit/AddAnswer',
  component: AddAnswer,
  args: { onAdded: fn() },
}

export const Default = {}
