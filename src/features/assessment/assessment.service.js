import { socket } from '@/socket'

export class AssessmentService {
  bindEvents(params = {}) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const callback = params[key]
        socket.on(key, (message) => callback(message))
      }
    }
  }

  start(quantity) {
    return new Promise((resolve, reject) => {
      try {
        socket.emit('start', quantity, () => resolve(true))
      } catch (e) {
        reject(e)
      }
    })
  }

  end() {
    return new Promise((resolve, reject) => {
      try {
        socket.emit('end')
        resolve(false)
      } catch (e) {
        reject(e)
      }
    })
  }

  nextQuestion(direction = 'next') {
    return new Promise((resolve, reject) => {
      try {
        socket.emit('question', { direction }, (question) => resolve(question))
      } catch (error) {
        reject(error)
      }
    })
  }

  assess(answer) {
    return new Promise((resolve, reject) => {
      try {
        socket.emit('answer', answer, (isCorrect) => resolve(isCorrect))
      } catch (error) {
        reject(error)
      }
    })
  }

  currentGoal() {
    return new Promise((resolve, reject) => {
      try {
        socket.emit('goal', {}, (goal) => resolve(goal))
      } catch (error) {
        reject(error)
      }
    })
  }
}
