import { fn } from 'storybook/test'
import DragOneFromMany from './DragOneFromMany.vue'

export default {
  title: 'Common/Components/Inqueries/DragOneFromMany',
  component: DragOneFromMany,
  args: {
    onSelected: fn(),
  },
}

const Template = (args) => ({
  components: { DragOneFromMany },
  setup() {
    return { args }
  },
  template: `<div class="relative p-8">
    <DragOneFromMany v-bind="args"></DragOneFromMany>
  </div>`,
})

export const Default = {
  render: Template,
  args: {
    choices: [1, 2, 3],
  },
}

export const Highlighted = {
  render: Template,
  args: {
    choices: [1, 2, 3],
    isHighlighted: true,
    isCorrectChosen: true,
  },
}
