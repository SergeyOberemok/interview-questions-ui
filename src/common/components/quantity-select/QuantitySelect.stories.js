import { fn } from 'storybook/test'
import QuantitySelect from './QuantitySelect.vue'

export default {
  title: 'Common/Components/QuantitySelect',
  component: QuantitySelect,
  args: { 'onUpdate:modelValue': fn() },
}

export const Default = {}
