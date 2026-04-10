<script setup lang="ts">
import LuroMarquee from './LuroMarquee.vue'
import LuroContainer from './LuroContainer.vue'
import Icon from '@/components/Icon/src/Icon.vue'

const reviews = [
  {
    name: 'Sarah J.',
    role: 'Marketing Manager',
    content: 'Luro AI has transformed our social media presence. The content quality is amazing!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    name: 'Mark T.',
    role: 'Small Business Owner',
    content: 'The automation features save me hours every week. Highly recommended!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark'
  },
  {
    name: 'Emily R.',
    role: 'Content Creator',
    content: "The best AI tool I've used so far. The integration with other tools is seamless.",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  },
  {
    name: 'David L.',
    role: 'Social Media Strategist',
    content: 'Analytics and insights from Luro are game-changers for our strategy.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  }
]
</script>

<template>
  <div class="py-24 relative overflow-hidden bg-white/5">
    <LuroContainer>
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">客户反馈</h2>
        <p class="text-white/50 text-xl max-w-2xl mx-auto">
          We are proud to have helped thousands of customers across the globe.
        </p>
      </div>
    </LuroContainer>

    <div class="relative flex flex-col items-center justify-center overflow-hidden">
      <LuroMarquee pauseOnHover class="[--duration:40s]">
        <div
          v-for="review in reviews"
          :key="review.name"
          class="relative w-80 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
        >
          <div class="flex items-center gap-4">
            <img class="rounded-full h-10 w-10" :src="review.avatar" alt="" />
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white">{{ review.name }}</span>
              <span class="text-xs font-medium text-white/40">{{ review.role }}</span>
            </div>
          </div>
          <p class="mt-4 text-sm text-white/70 leading-relaxed">{{ review.content }}</p>
        </div>
      </LuroMarquee>
      
      <!-- Reverse marquee -->
      <LuroMarquee reverse pauseOnHover class="[--duration:40s] mt-8">
        <div
          v-for="review in [...reviews].reverse()"
          :key="review.name"
          class="relative w-80 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
        >
          <div class="flex items-center gap-4">
            <img class="rounded-full h-10 w-10" :src="review.avatar" alt="" />
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white">{{ review.name }}</span>
              <span class="text-xs font-medium text-white/40">{{ review.role }}</span>
            </div>
          </div>
          <p class="mt-4 text-sm text-white/70 leading-relaxed">{{ review.content }}</p>
        </div>
      </LuroMarquee>
    </div>
  </div>
</template>
