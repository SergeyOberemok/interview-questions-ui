import { fn } from 'storybook/test'
import { useTemplateRef } from 'vue'
import Stepper from './Stepper.vue'

export default {
  title: 'Common/Components/Stepper',
  component: Stepper,
  args: {
    onNext: fn(),
    onPrev: fn(),
  },
}

const Template = (args) => ({
  components: { Stepper },
  setup() {
    const stepperRef = useTemplateRef('stepperRef')
    return { args, stepperRef }
  },
  template: `<Stepper v-bind="args" ref="stepperRef">
    <template #prompt>Prompt</template>
    <template #summary>Summary</template>
  </Stepper>
  <template v-if="stepperRef?.currentStep">
    <button @click="stepperRef.prev()" class="btn me-2" type="button">Previous</button>
    <button @click="stepperRef.next()" class="btn" type="button">Next</button>
  </template>`,
})

export const Default = {
  render: Template,
  args: {
    stepsCount: 3,
  },
}
