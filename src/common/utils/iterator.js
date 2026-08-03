export function makeIterator(arr) {
  let index = -1

  return {
    next() {
      if (index >= arr.length) {
        return { done: true }
      }

      index++
      const value = arr[index]

      return { value, done: false }
    },

    prev() {
      if (index <= 0) {
        return { done: true }
      }

      index--
      const value = arr[index]

      return { value, done: false }
    },

    *[Symbol.iterator]() {
      let nextNode

      while (((nextNode = this.next()), !nextNode.done)) {
        yield nextNode.value
      }
    },
  }
}
