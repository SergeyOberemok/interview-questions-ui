import { isProxy, toRaw } from 'vue'

export function hashCode(value) {
  return `${value}`.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}

export function toHash(obj) {
  obj = isProxy(obj) ? toRaw(obj) : obj
  return Object.values(obj).map(hashCode).join('')
}
