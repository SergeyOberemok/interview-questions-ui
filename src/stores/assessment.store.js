import { AssessmentService } from '@/features/assessment/assessment.service'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  const assessmentService = new AssessmentService()

  const isStarted = ref(false)
  const isEnded = computed(() => !isStarted.value)
  const question = ref({})
  const goal = ref(0)
  const isCorrect = ref(false)
  const results = shallowRef([])
  const isStripped = ref(false)

  async function start(quantity) {
    isStarted.value = await assessmentService.start(quantity)
  }

  async function end() {
    isStarted.value = await assessmentService.end()
  }

  async function obtainQuestion(direction = 'next') {
    if (!isStarted.value) {
      return
    }

    question.value = await assessmentService.nextQuestion(direction)
  }

  async function nextQuestion() {
    await obtainQuestion('next')
    await acquireGoal()
  }

  async function prevQuestion() {
    await obtainQuestion('prev')
    await acquireGoal()
  }

  async function assess(answer) {
    const result = await assessmentService.assess(answer)

    isCorrect.value = result
  }

  async function acquireGoal() {
    const result = await assessmentService.currentGoal()

    goal.value = result
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
    end,
    nextQuestion,
    prevQuestion,
    acquireGoal,
    assess,
    bindEvents,
  }
})
