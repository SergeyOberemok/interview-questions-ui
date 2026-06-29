import { fn } from 'storybook/test'
import InqueryWrapper from './InqueryWrapper.vue'

export default {
  title: 'Features/Inqueries/InquiryWrapper',
  component: InqueryWrapper,
  args: {
    onAnswered: fn(),
  },
}

export const Calculation = {
  args: {
    question: {
      question: '2 + 2',
      goal: 4,
      type: 'calculation',
    },
  },
}

export const Equation = {
  args: {
    question: {
      question: 'x + 2 = 4',
      goal: 2,
      type: 'equation',
    },
  },
}
