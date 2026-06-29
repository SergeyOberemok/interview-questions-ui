import PutMissingInOrder from '../put-missing-in-order/PutMissingInOrder.vue'
import SwipeForImageAnswer from '../swipe-for-answer/SwipeForImageAnswer.vue'

export function createInqueryComponent(type) {
  switch (type) {
    case 'calculation':
      return SwipeForImageAnswer
    case 'equation':
      return PutMissingInOrder
  }
}
