export function makeIterator(arr) {
  let index = 0

  return {
    next() {
      if (index >= arr.length) {
        return { done: true }
      }

      const value = arr[index]
      index++

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
