<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  className?: string
  delay?: number
  reverse?: boolean
  simple?: boolean
}>()

const animationClass = computed(() => {
  return props.reverse ? 'animate-fade-in-down' : 'animate-fade-in-up'
})

const delayStyle = computed(() => {
  return {
    animationDelay: `${props.delay || 0.2}s`,
    animationDuration: props.simple ? '0.2s' : '0.4s'
  }
})
</script>

<template>
  <div
    :class="['w-full h-full animate__animated', animationClass, className]"
    :style="delayStyle"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation-name: fadeInUp;
}

.animate-fade-in-down {
  animation-name: fadeInDown;
}
</style>
