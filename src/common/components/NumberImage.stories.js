import NumberImage from './NumberImage.vue'

export default {
  title: 'Common/Components/NumberImage',
  component: NumberImage,
}

export const Default = {
  args: {
    number: 1,
  },
}

export const Revealed = {
  args: {
    number: 1,
    isRevealed: true,
  },
}
