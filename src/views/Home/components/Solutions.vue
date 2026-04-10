<script setup lang="ts">
import LuroContainer from './LuroContainer.vue'
import Icon from '@/components/Icon/src/Icon.vue'

const solutions = [
  {
    title: '数字化协同办公',
    subtitle: '办公自动化解决方案',
    description: '通过 BPM 流程建模与任务分发，实现跨部门、跨系统的流程自动化，提升管理效能。',
    features: ['流程自定义配置', '任务智能提醒', '多级审批看板', '历史数据回溯']
  },
  {
    title: '数据要素全生命周期管理',
    subtitle: '数据资产化解决方案',
    description: '从数据治理、质量评估到资产入表，协助企业实现数据确权与价值释放。',
    features: ['数据血缘追踪', '资产合规评估', '多维价值度量', '智能化运营驾驶舱']
  },
  {
    title: '全场景 AI 赋能',
    subtitle: '智能化升级解决方案',
    description: '集成大模型能力的知识库助手、图文创作中心，全面提升业务流程的智能化水平。',
    features: ['多模态大模型对接', '行业知识库构建', '智能文案创作', '自动化图片生成']
  }
]
</script>

<template>
  <div class="py-24 bg-white/5 relative overflow-hidden">
    <div
      class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
    ></div>

    <LuroContainer>
      <div class="text-center mb-16 px-4">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">行业领先的行业解决方案</h2>
        <p class="text-white/50 text-xl max-w-4xl mx-auto"
          >深度结合业务场景，助力企业跨越数字化转型深水区。</p
        >
      </div>
    </LuroContainer>

    <div class="max-w-7xl mx-auto px-4 space-y-12">
      <div v-for="(solution, index) in solutions" :key="index" class="overflow-hidden">
        <LuroContainer :delay="0.1">
          <div
            :class="[
              'flex flex-col lg:flex-row gap-12 p-10 rounded-[32px] border border-white/10 bg-white/5 hover:bg-white/10 transition-all group',
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            ]"
          >
            <div class="flex-1 space-y-8">
              <div class="space-y-4">
                <span class="text-blue-500 font-bold tracking-widest text-sm uppercase">{{
                  solution.subtitle
                }}</span>
                <h3 class="text-3xl md:text-4xl font-bold text-white leading-tight">{{
                  solution.title
                }}</h3>
                <p class="text-white/60 text-lg leading-relaxed">{{ solution.description }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="feat in solution.features"
                  :key="feat"
                  class="flex items-center text-white/70"
                >
                  <Icon icon="ep:circle-check-filled" class="text-green-500 mr-2 w-5 h-5" />
                  <span>{{ feat }}</span>
                </div>
              </div>
              <div class="pt-4">
                <el-button
                  size="large"
                  type="primary"
                  class="!bg-blue-600 !border-none px-10 !rounded-full hover:!bg-blue-700"
                >
                  立即咨询
                </el-button>
              </div>
            </div>
            <div
              class="flex-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/5 min-h-[300px] flex items-center justify-center"
            >
              <!-- 占位图示 -->
              <div class="relative w-full h-full flex items-center justify-center p-12">
                <div
                  class="absolute inset-0 bg-[url('https://www.fe-cred.com/pages/services/images/dashboard.png')] bg-cover bg-center opacity-40 rounded-2xl"
                ></div>
                <Icon
                  :icon="
                    index === 0
                      ? 'ep:office-building'
                      : index === 1
                        ? 'ep:data-analysis'
                        : 'ep:lightning'
                  "
                  class="text-[120px] text-white/20 relative z-10"
                />
              </div>
            </div>
          </div>
        </LuroContainer>
      </div>
    </div>
  </div>
</template>
