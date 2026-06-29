import { fn } from 'storybook/test'
import AddAnswer from './AddAnswer.vue'

export default {
  title: 'Components/Questions/Edit/AddAnswer',
  component: AddAnswer,
  args: { onAdded: fn() },
}

export const Default = {}
