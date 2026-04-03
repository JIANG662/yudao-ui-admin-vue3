<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  word: string
  className?: string
  duration?: number
}>()

const lines = computed(() => {
  return props.word.split('\n')
})

const durationStyle = computed(() => {
  return {
    animationDuration: `${props.duration || 1}s`
  }
})
</script>

<template>
  <h1
    :class="['text-center tracking-[-0.02em] drop-shadow-sm animate__animated animate__fadeInBlur', className]"
    :style="durationStyle"
  >
    <template v-for="(line, index) in lines" :key="index">
      {{ line }}
      <br v-if="index < lines.length - 1" class="hidden md:block" />
    </template>
  </h1>
</template>

<style scoped>
@keyframes fadeInBlur {
  from {
    filter: blur(10px);
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    filter: blur(0px);
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate__fadeInBlur {
  animation-name: fadeInBlur;
}
</style>
