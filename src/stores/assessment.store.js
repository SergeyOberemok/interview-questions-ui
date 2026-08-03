import { AssessmentService } from '@/components/assessment/assessment.service'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  const assessmentService = new AssessmentService()

  const isStarted = ref(false)
  const isEnded = computed(() => !isStarted.value)
  const question = ref('')
  const isCorrect = ref(false)
  const results = shallowRef([])
  const isStripped = ref(false)

  async function start(quantity) {
    isStarted.value = await assessmentService.start(quantity)
    await nextQuestion()
  }

  async function end() {
    isStarted.value = await assessmentService.end()
  }

  async function nextQuestion() {
    if (!isStarted.value) {
      return
    }

    question.value = await assessmentService.nextQuestion()
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
    results,
    isStripped,
    isCorrect,
    start,
    end,
    nextQuestion,
    assess,
    bindEvents,
  }
})
