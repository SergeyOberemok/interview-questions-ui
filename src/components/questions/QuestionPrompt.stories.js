import { fn } from 'storybook/test'
import QuestionPrompt from './QuestionPrompt.vue'

export default {
  title: 'Components/Questions/Prompt',
  component: QuestionPrompt,
  args: {
    onAnswered: fn(),
  },
}

export const Default = {
  args: {
    question: '2+2',
    goal: 4,
  },
}
