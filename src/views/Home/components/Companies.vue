<script setup lang="ts">
import LuroMarquee from './LuroMarquee.vue'
import LuroContainer from './LuroContainer.vue'

const companies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Netflix',
  'YouTube',
  'Instagram',
  'Uber',
  'Spotify'
]
</script>

<template>
  <div class="py-20 relative overflow-hidden">
    <LuroContainer :delay="0.1">
      <div class="text-center mb-10">
        <h2 class="text-sm font-semibold text-white/40 uppercase tracking-widest">
          Trusted by the world's best companies
        </h2>
      </div>
    </LuroContainer>

    <LuroMarquee class="[--duration:20s] opacity-40">
      <div
        v-for="company in companies"
        :key="company"
        class="flex items-center justify-center min-w-[150px]"
      >
        <span class="text-2xl font-bold text-white/50 hover:text-white transition-colors cursor-default">
          {{ company }}
        </span>
      </div>
    </LuroMarquee>
  </div>
</template>
