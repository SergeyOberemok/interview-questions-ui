import { fn } from 'storybook/test'
import SwipeForAnswer from './SwipeForAnswer.vue'

export default {
  title: 'Features/Inqueries/SwipeForAnswer',
  component: SwipeForAnswer,
  args: {
    onAnswered: fn(),
  },
}

export const Default = {
  args: {
    question: '2 + 2',
    goal: 4,
  },
}

export const Highlighted = {
  args: {
    question: '2 + 2',
    goal: 4,
    isHighlighted: true,
    isCorrectChosen: true,
  },
}
