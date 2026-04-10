<script setup lang="ts">
import LuroContainer from './LuroContainer.vue'
import Icon from '@/components/Icon/src/Icon.vue'

const features = [
  {
    title: '数字化 BPM 流程引擎',
    description: '从零到一构建企业自动化流程，支持复杂业务逻辑，提升跨部门协作效率。',
    icon: 'ep:set-up',
    color: 'text-blue-500'
  },
  {
    title: '智能 CRM 客户管理',
    description: '全生命周期客户追踪，结合 AI 分析预测，助力企业实现精准营销与业绩增长。',
    icon: 'ep:avatar',
    color: 'text-purple-500'
  },
  {
    title: '企业级 ERP 资源规划',
    description: '打通进销存全链路数据，实现财务、供应链、人力资源的深度集成与实时管控。',
    icon: 'ep:files',
    color: 'text-green-500'
  },
  {
    title: '全渠道电商 Mall 系统',
    description: '覆盖移动端、小程序、H5 等全终端，集成秒杀、分销等多种营销玩法。',
    icon: 'ep:shopping-cart',
    color: 'text-orange-500'
  },
  {
    title: '工业级 IoT 物联网',
    description: '支持海量设备接入与实时监控，提供场景化的规则引擎，驱动工业智能化。',
    icon: 'ep:cpu',
    color: 'text-cyan-500'
  },
  {
    title: 'AI 智能助手集成',
    description: '内置大模型对话、知识库检索及图像生成能力，为企业办公注入 AI 生产力。',
    icon: 'ep:magic-stick',
    color: 'text-red-500'
  }
]
</script>

<template>
  <div class="py-24 relative overflow-hidden">
    <LuroContainer>
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">全方位数字化业务矩阵</h2>
        <p class="text-white/60 text-lg"
          >基于 100% 源码交付的自研底座，为您提供安全、稳定、可扩展的企业级技术支撑。</p
        >
      </div>
    </LuroContainer>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      <LuroContainer v-for="(feature, index) in features" :key="index" :delay="0.2 * Math.floor(index / 3)">
        <div
          class="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group h-full flex flex-col"
        >
          <div
            :class="[
              'w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110',
              feature.color
            ]"
          >
            <Icon :icon="feature.icon" class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
          <p class="text-white/50 leading-relaxed">{{ feature.description }}</p>
          <div
            class="mt-auto pt-6 flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors"
          >
            了解更多 <Icon icon="ep:arrow-right" class="ml-1 w-3 h-3" />
          </div>
        </div>
      </LuroContainer>
    </div>
  </div>
</template>
