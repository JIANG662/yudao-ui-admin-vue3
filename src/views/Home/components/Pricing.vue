<script setup lang="ts">
import LuroContainer from './LuroContainer.vue'
import Icon from '@/components/Icon/src/Icon.vue'

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Get started with essential tools for social media content creation',
    features: [
      'Basic AI content generation',
      '4 social media integrations',
      'Community support',
      '1 project limit',
      'Standard analytics'
    ]
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Unlock advance features for enhanced content and strategy',
    popular: true,
    features: [
      'Advanced AI content generation',
      '10 social media integrations',
      'Priority email support',
      '10 project limit',
      'Enhanced analytics & insights',
      'Pro model image generation',
      'Team collaboration tools'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations and agencies',
    features: [
      'Unlimited AI content generation',
      'All social media integrations',
      'Dedicated account manager',
      'Unlimited projects',
      'Custom analytics & reporting',
      'Enterprise-grade security'
    ]
  }
]
</script>

<template>
  <div class="py-24 relative overflow-hidden">
    <LuroContainer>
      <div class="text-center mb-16 px-4">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
          Simple and transparent pricing
        </h2>
        <p class="text-white/50 text-xl max-w-2xl mx-auto">
          Choose the plan that suits your needs. No hidden fees, no surprises.
        </p>
      </div>
    </LuroContainer>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      <LuroContainer v-for="plan in pricingPlans" :key="plan.name" :delay="0.2">
        <div
          :class="[
            'relative flex flex-col h-full p-8 rounded-3xl border border-white/10 bg-white/5 transition-all hover:bg-white/10',
            plan.popular ? 'border-blue-500/50 shadow-[0_0_2rem_-1rem_rgba(59,130,246,0.5)]' : ''
          ]"
        >
          <div v-if="plan.popular" class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-xs font-bold text-white uppercase tracking-widest">
            Most Popular
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-bold text-white">{{ plan.price }}</span>
              <span v-if="plan.price !== 'Custom'" class="text-white/40 text-sm">/month</span>
            </div>
            <p class="mt-4 text-sm text-white/60 leading-relaxed">{{ plan.description }}</p>
          </div>

          <div class="space-y-4 mb-8">
            <div v-for="feat in plan.features" :key="feat" class="flex items-center gap-3">
              <Icon icon="ep:circle-check-filled" class="text-blue-500 w-5 h-5 shrink-0" />
              <span class="text-sm text-white/80">{{ feat }}</span>
            </div>
          </div>

          <div class="mt-auto">
            <el-button
              size="large"
              :type="plan.popular ? 'primary' : 'default'"
              :class="[
                'w-full !rounded-xl !h-12 !font-bold',
                plan.popular ? '!bg-blue-600 !border-none' : '!bg-white/10 !border-none !text-white'
              ]"
            >
              Get Started
            </el-button>
          </div>
        </div>
      </LuroContainer>
    </div>
  </div>
</template>
