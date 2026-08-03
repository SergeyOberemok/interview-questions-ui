import { fn } from 'storybook/test'
import ProbableAnswer from './ProbableAnswer.vue'

export default {
  title: 'Components/Questions/ProbableAnswer',
  component: ProbableAnswer,
  args: {
    onChosen: fn(),
  },
}

export const Default = {
  args: {
    correct: 1,
  },
}
