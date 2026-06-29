import { fn } from 'storybook/test'
import Search from './Search.vue'

export default {
  title: 'Common/Components/Search',
  component: Search,
  args: { onChanged: fn() },
}

export const Default = {}

export const WithValue = {
  args: {
    modelValue: 'test',
  },
}
