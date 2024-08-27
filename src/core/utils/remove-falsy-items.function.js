import { identity, pickBy } from 'lodash-es'

export function removeFalsyItems(items) {
  return pickBy(items, identity)
}
