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
  const currentIndex = ref(-1)
  const history = ref([])
  const isAnswered = computed(() => history.value[currentIndex.value]?.answer !== undefined)

  async function start(quantity) {
    isStarted.value = await assessmentService.start(quantity)
    currentIndex.value = -1
    history.value = []
  }

  async function end() {
    isStarted.value = await assessmentService.end()
  }

  async function obtainQuestion(direction = 'next') {
    if (!isStarted.value) {
      return
    }

    const nextIndex = currentIndex.value + (direction === 'next' ? 1 : -1)
    if (nextIndex < 0) {
      return
    }

    const cached = history.value[nextIndex]
    if (cached) {
      question.value = cached.question
      goal.value = cached.goal
      isCorrect.value = cached.isCorrect ?? false
    } else {
      question.value = await assessmentService.nextQuestion(direction)
      await acquireGoal()
      isCorrect.value = false
      history.value[nextIndex] = { question: question.value, goal: goal.value }
    }
    currentIndex.value = nextIndex
  }

  async function nextQuestion() {
    await obtainQuestion('next')
  }

  async function prevQuestion() {
    await obtainQuestion('prev')
  }

  async function assess(answer) {
    const result = await assessmentService.assess(answer)

    isCorrect.value = result
    history.value[currentIndex.value] = {
      ...history.value[currentIndex.value],
      answer,
      isCorrect: result,
    }
  }

  async function acquireGoal() {
    const result = await assessmentService.currentGoal()

    goal.value = result
  }

  function bindEvents() {
    assessmentService.bindEvents({
      end: (results) => {
        isStarted.value = false
        results.value = results
      },
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
    currentIndex,
    history,
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
