import { socket } from '@/socket'

export class AssessmentService {
  constructor() {
    this.bindEvents()
  }

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

  nextQuestion() {
    return new Promise((resolve, reject) => {
      try {
        socket.emit('question', {}, (question, goal) => {
          resolve({ question, goal })
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  assess(answer) {
    return new Promise((resolve, reject) => {
      try {
        socket.emit('answer', answer, (target, expected, received, isCorrect) => resolve(isCorrect))
      } catch (error) {
        reject(error)
      }
    })
  }
}
