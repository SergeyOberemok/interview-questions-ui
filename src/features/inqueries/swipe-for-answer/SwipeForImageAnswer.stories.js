import { fn } from 'storybook/test'
import SwipeForImageAnswer from './SwipeForImageAnswer.vue'

export default {
  title: 'Features/Inqueries/SwipeForImageAnswer',
  component: SwipeForImageAnswer,
  args: {
    onAnswered: fn(),
  },
}

export const Default = {
  args: {
    question: '2 + 2',
    goal: 4,
    isImagesStripped: false,
  },
}

export const Highlighted = {
  args: {
    question: '2 + 2',
    goal: 4,
    isHighlighted: true,
    isCorrectChosen: true,
    isImagesStripped: false,
  },
}
