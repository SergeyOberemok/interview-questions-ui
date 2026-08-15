import PutMissingInOrder from '../put-missing-in-order/PutMissingInOrder.vue'
import SwipeForAnswer from '../swipe-for-answer/SwipeForAnswer.vue'

export function createInqueryComponent(type) {
  switch (type) {
    case 'calculation':
      return SwipeForAnswer
    case 'equation':
      return PutMissingInOrder
  }
}
