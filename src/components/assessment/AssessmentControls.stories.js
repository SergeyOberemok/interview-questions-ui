import { fn } from 'storybook/test'
import AssessmentControls from './AssessmentControls.vue'

export default {
  title: 'Components/Assessment/AssessmentControls',
  component: AssessmentControls,
  args: {
    onStarted: fn(),
    onEnded: fn(),
    onStripped: fn(),
    onNext: fn(),
    onPrev: fn(),
    'onUpdate:modelValue': fn(),
  },
}

export const Default = {}
