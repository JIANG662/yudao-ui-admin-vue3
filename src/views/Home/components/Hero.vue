<script setup lang="ts">
import { computed } from 'vue'
import LuroContainer from './LuroContainer.vue'
import BlurText from './BlurText.vue'
import Icon from '@/components/Icon/src/Icon.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

const isLogin = computed(() => !!userStore.getIsSetUser)

const handleStart = () => {
  if (isLogin.value) {
    router.push('/index')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div class="flex flex-col items-center text-center w-full max-w-5xl my-24 mx-auto z-40 relative">
    <LuroContainer :delay="0.0">
      <div
        class="pl-2 pr-1 py-1 rounded-full border border-white/10 hover:border-white/15 backdrop-blur-lg cursor-pointer flex items-center gap-2.5 select-none w-max mx-auto"
      >
        <div
          class="w-3.5 h-3.5 rounded-full bg-blue-500/40 flex items-center justify-center relative"
        >
          <div
            class="w-2.5 h-2.5 rounded-full bg-blue-500/60 flex items-center justify-center animate-ping"
          >
            <div
              class="w-2.5 h-2.5 rounded-full bg-blue-500/60 flex items-center justify-center animate-ping"
            ></div>
          </div>
          <div
            class="w-1.5 h-1.5 rounded-full bg-blue-500 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
          </div>
        </div>
        <span
          class="inline-flex items-center justify-center gap-2 animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-sm text-transparent"
        >
          企业级数字化转型底座
          <span
            class="text-xs text-white/80 px-1.5 py-0.5 rounded-full bg-gradient-to-b from-white/20 to-white/10 flex items-center justify-center"
          >
            V2.0 现已发布
            <Icon icon="ep:arrow-right" class="w-3.5 h-3.5 ml-1 text-white/50" />
          </span>
        </span>
      </div>
    </LuroContainer>

    
    <BlurText
      word="释放数据价值"
      className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent py-2 md:py-0 lg:!leading-snug font-medium tracking-[-0.0125em] mt-6 font-heading"
    />   
    <BlurText
      word="驱动企业智慧决策"
      className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent py-2 md:py-0 lg:!leading-snug font-medium tracking-[-0.0125em] mt-2 font-heading"
    />
    <LuroContainer :delay="0.1">
      <p class="text-sm sm:text-base lg:text-lg mt-4 text-white/60 max-w-3xl mx-auto">
        集成 BPM 流程引擎、智能 CRM、全渠道电商、工业级 IoT 及 AI 助手的一站式数字化解决方案。
        <span class="hidden sm:inline"
          >通过标准化的数据治理与资产化运营，助力企业构建高效、敏捷的数字核心。</span
        >
      </p>
    </LuroContainer>

    <LuroContainer :delay="0.2">
      <div class="flex items-center justify-center md:gap-x-6 mt-8">
        <el-button
          size="large"
          type="primary"
          class="!bg-white !text-black hover:!opacity-70 !border-none px-10"
          @click="handleStart"
        >
          {{ isLogin ? '进入管理后台' : '立即免费体验' }}
        </el-button>
        <el-button
          size="large"
          plain
          class="hidden md:flex !bg-transparent !border-white/20 !text-white hover:!bg-white/10 px-10"
        >
          了解解决方案
        </el-button>
      </div>
    </LuroContainer>
    
  </div>
</template>

<style scoped>
.animate-text-gradient {
  background-size: 200% auto;
  animation: background-shine 3s linear infinite;
}

@keyframes background-shine {
  from {
    background-position: 0% center;
  }
  to {
    background-position: 200% center;
  }
}

.gradient {
  background: radial-gradient(circle, rgba(134, 120, 249, 0.4) 0%, rgba(134, 120, 249, 0) 70%);
}
</style>
