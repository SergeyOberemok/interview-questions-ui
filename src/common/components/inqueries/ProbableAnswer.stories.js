import { generateChoices } from '@/common/utils/numbers.js'
import { fn } from 'storybook/test'
import ProbableAnswer from './ProbableAnswer.vue'

export default {
  title: 'Common/Components/Inqueries/ProbableAnswer',
  component: ProbableAnswer,
  args: {
    onChosen: fn(),
  },
}

export const Default = {
  args: {
    choices: generateChoices(3),
  },
}

export const Highlighted = {
  args: {
    choices: generateChoices(3),
    isHighlighted: true,
    isCorrectChosen: true,
  },
}
