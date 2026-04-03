<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>

<template>
  <div :class="['size-full mx-auto max-w-6xl px-4 md:px-12', className]">
    <slot></slot>
  </div>
</template>
