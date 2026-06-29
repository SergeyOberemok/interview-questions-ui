import AssessmentSummary from './AssessmentSummary.vue'

export default {
  title: 'Features/Assessment/AssessmentSummary',
  component: AssessmentSummary,
}

export const Default = {
  args: {
    results: [
      {
        id: '1938bdcd1ae0d86ae08765fac2251b2f27f8936d05f3c1244a52dea5dac8b344',
        question: '3 + 7',
        answer: '10',
        result: true,
      },
      {
        id: 'de146422db8277e7243c570a62e773bdc2b345963e3a8f24f0d6facb9e9f3608',
        question: '2 + 6',
        answer: '8',
        result: true,
      },
    ],
  },
}
