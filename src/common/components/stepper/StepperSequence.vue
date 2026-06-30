<script setup>
import { uniq } from 'lodash-es'
import { computed, getCurrentInstance } from 'vue'

const self = getCurrentInstance()
const steps = computed(() => uniq(self.parent.props.steps))
const currentStep = self.parent.exposed.currentStep
</script>

<template>
  <div>
    <template v-for="step in steps" :key="step">
      <div v-if="$slots[step] && step === currentStep">
        <slot :name="step"></slot>
      </div>
    </template>
  </div>
</template>
