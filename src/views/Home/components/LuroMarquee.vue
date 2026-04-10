<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  reverse?: boolean
  pauseOnHover?: boolean
  className?: string
  repeat?: number
}>()

const repeatCount = computed(() => props.repeat || 4)
</script>

<template>
  <div
    :class="[
      'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [flex-direction:row]',
      className
    ]"
  >
    <div
      v-for="i in repeatCount"
      :key="i"
      :class="[
        'flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row',
        reverse ? '[animation-direction:reverse]' : '',
        pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

.animate-marquee {
  animation: marquee var(--duration) linear infinite;
}
</style>
