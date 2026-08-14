import { fn } from 'storybook/test'
import PutMissingInOrder from './PutMissingInOrder.vue'

export default {
  title: 'Features/Questions/Inqueries/PutMissingInOrder',
  component: PutMissingInOrder,
  args: {
    onAnswered: fn(),
  },
}

export const Default = {
  args: {
    question: [2, 2],
    goal: 4,
    operation: '+',
  },
}
