import { generateChoices } from '@/common/utils/numbers.js'
import { fn } from 'storybook/test'
import SwipeForAnswer from './SwipeForAnswer.vue'

export default {
  title: 'Components/Questions/Inquery/SwipeForAnswer',
  component: SwipeForAnswer,
  args: {
    onAnswered: fn(),
  },
}

export const Default = {
  args: {
    question: '2 + 2',
    choices: generateChoices(4),
  },
}

export const Highlighted = {
  args: {
    question: '2 + 2',
    choices: generateChoices(4),
    isHighlighted: true,
    isCorrectChosen: true,
  },
}
