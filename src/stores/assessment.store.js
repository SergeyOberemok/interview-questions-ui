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
  const history = ref({})
  const isAnswered = computed(() => history.value[question.value?.id]?.answer !== undefined)
  const resultsWithAnswers = computed(() =>
    results.value.map((result) => ({
      ...result,
      answer: history.value[result.id]?.answer,
    })),
  )

  function cacheGoal(id, goalValue) {
    history.value[id] = { ...history.value[id], goal: goalValue }
  }

  function cacheAnswer(id, answer) {
    history.value[id] = { ...history.value[id], answer }
  }

  function cacheCorrectness(id, correct) {
    history.value[id] = { ...history.value[id], isCorrect: correct }
  }

  async function start(quantity) {
    isStarted.value = await assessmentService.start(quantity)
    history.value = {}
    results.value = []
    question.value = {}
    goal.value = 0
    isCorrect.value = false
  }

  async function end() {
    isStarted.value = await assessmentService.end()
  }

  async function obtainQuestion(direction = 'next') {
    if (!isStarted.value) {
      return
    }

    const nextQuestion = await assessmentService.nextQuestion(direction)

    if (!isStarted.value || !nextQuestion) {
      return
    }

    question.value = nextQuestion

    const cached = history.value[question.value.id]
    if (cached) {
      goal.value = cached.goal
      isCorrect.value = cached.isCorrect ?? false
    } else {
      goal.value = await acquireGoal()
      isCorrect.value = false
      cacheGoal(question.value.id, goal.value)
    }
  }

  async function nextQuestion() {
    await obtainQuestion('next')
  }

  async function prevQuestion() {
    await obtainQuestion('prev')
  }

  async function assess(answer) {
    const id = question.value.id
    cacheAnswer(id, answer)

    const result = await assessmentService.assess(answer)

    isCorrect.value = result
    cacheCorrectness(id, result)
  }

  async function acquireGoal() {
    goal.value = await assessmentService.currentGoal()
    return goal.value
  }

  function bindEvents() {
    assessmentService.bindEvents({
      end: (value) => {
        isStarted.value = false
        results.value = value
      },
    })
  }

  return {
    isStarted,
    isEnded,
    question,
    goal,
    results,
    resultsWithAnswers,
    isCorrect,
    isAnswered,
    start,
    end,
    nextQuestion,
    prevQuestion,
    acquireGoal,
    assess,
    bindEvents,
  }
})
