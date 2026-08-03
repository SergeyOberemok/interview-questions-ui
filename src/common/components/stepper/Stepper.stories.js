import { fn } from 'storybook/test'
import { ref } from 'vue'
import Stepper from './Stepper.vue'

export default {
  title: 'Common/Components/Stepper/Stepper',
  component: Stepper,
  args: {
    onNext: fn(),
    onPrev: fn(),
  },
}

const Template = (args) => ({
  components: { Stepper },
  setup() {
    const stepperRef = ref(null)
    return { args, stepperRef }
  },
  template: `<Stepper v-bind="args" ref="stepperRef" />
  <button @click="stepperRef.next()" class="btn me-2" type="button">Next</button>
  <button @click="stepperRef.prev()" class="btn" type="button">Previous</button>`,
})

export const Default = {
  render: Template,
  args: {
    steps: [1, 2, 3],
  },
}
