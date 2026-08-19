import AssessmentSummary from './AssessmentSummary.vue'

export default {
  title: 'Features/Assessment/AssessmentSummary',
  component: AssessmentSummary,
}

export const Default = {
  args: {
    results: [
      ['2 + 2', true],
      ['3 + 5', false],
    ],
  },
}
