<script setup>
import AddAnswer from './AddAnswer.vue'
import EditableAnswersList from './EditableAnswersList.vue'

const answers = defineModel({ default: [] })

function pushAnswer(answer) {
  answers.value = [...answers.value, answer]
}
function removeAnswer(index) {
  answers.value = answers.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div class="wrapper grid grid-cols-2 gap-3">
    <editable-answers-list
      :answers="answers"
      class="w-full"
      @edited="removeAnswer"
    ></editable-answers-list>

    <add-answer @added="pushAnswer" class="w-full"></add-answer>
  </div>
</template>
