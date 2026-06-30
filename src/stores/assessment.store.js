import { AssessmentService } from '@/components/assessment/assessment.service'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  const assessmentService = new AssessmentService()

  const isStarted = ref(false)
  const isEnded = computed(() => !isStarted.value)
  const question = ref('')
  const goal = ref()
  const isCorrect = ref(false)
  const results = shallowRef([])
  const isStripped = ref(false)

  async function start(quantity) {
    isStarted.value = await assessmentService.start(quantity)
  }

  async function nextQuestion() {
    if (!isStarted.value) {
      return
    }
    const { question: q, goal: g } = await assessmentService.nextQuestion()

    question.value = q
    goal.value = g
  }

  async function assess(answer) {
    const result = await assessmentService.assess(answer)

    isCorrect.value = result
  }

  function bindEvents() {
    assessmentService.bindEvents({
      end: ({ assessment, results: resultRecords, isPassed }) => (
        console.log(assessment),
        (isStarted.value = false),
        (results.value = resultRecords),
        console.log(isPassed)
      ),
    })
  }

  return {
    isStarted,
    isEnded,
    question,
    goal,
    results,
    isStripped,
    isCorrect,
    start,
    nextQuestion,
    assess,
    bindEvents,
  }
})
