import { fn } from 'storybook/test'
import LeftRightSwipe from './LeftRightSwipe.vue'

export default {
  title: 'Common/Components/Inqueries/LeftRightSwipe',
  component: LeftRightSwipe,
  args: {
    onMoved: fn(),
  },
}

const Template = (args) => ({
  components: { LeftRightSwipe },
  setup() {
    return { args }
  },
  template: `<LeftRightSwipe v-bind="args">Swiped Content</LeftRightSwipe>`,
})

export const Default = {
  render: Template,
  args: {},
}

export const Highlighted = {
  args: {
    isHighlighted: true,
    isCorrectChosen: true,
  },
}
