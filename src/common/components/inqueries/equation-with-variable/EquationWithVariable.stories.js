import EquationWithVariable from './EquationWithVariable.vue'

export default {
  title: 'Common/Components/Inqueries/EquationWithVariable',
  component: EquationWithVariable,
}

export const Default = {
  args: {
    question: [2, 2],
    goal: 4,
    operation: '+',
  },
}

export const Highlighted = {
  args: {
    question: [2, 2],
    goal: 4,
    operation: '+',
    isHighlighted: true,
    isCorrectChosen: true,
  },
}
