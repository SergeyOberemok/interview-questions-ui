import { fn } from 'storybook/test'
import PutMissingInOrder from './PutMissingInOrder.vue'

export default {
  title: 'Features/Inqueries/PutMissingInOrder',
  component: PutMissingInOrder,
  args: {
    onAnswered: fn(),
  },
}

export const Default = {
  args: {
    question: 'x + 2',
    goal: 4,
  },
}

export const Highlighted = {
  args: {
    question: 'x + 2',
    goal: 4,
    isHighlighted: true,
    isCorrectChosen: true,
  },
}
