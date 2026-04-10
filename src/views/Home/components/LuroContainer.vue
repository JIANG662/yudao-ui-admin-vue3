<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  className?: string
  delay?: number
  simple?: boolean
  once?: boolean
}>()

const target = ref(null)
const isVisible = ref(false)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
    } else {
      if (!props.once) {
        isVisible.value = false
      }
    }
  },
  {
    threshold: 0.1 // 降低阈值，让动画更早触发
  }
)

const animationClass = computed(() => {
  return isVisible.value ? 'animate-fade-in-up' : 'invisible opacity-0'
})

const delayStyle = computed(() => {
  return {
    animationDelay: `${props.delay || 0}s`,
    animationDuration: props.simple ? '0.4s' : '2s', // 增加持续时间，让滑动更有“质感”
    animationFillMode: 'both'
  }
})
</script>

<template>
  <div
    ref="target"
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
    transform: translate3d(0, 150px, 0); /* 增加滑动距离到 120px，效果更明显 */
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation-name: fadeInUp;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); /* 使用更平滑的贝塞尔曲线 */
}
</style>
