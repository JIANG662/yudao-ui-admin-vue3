<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Solutions from './components/Solutions.vue'
import LuroWrapper from './components/LuroWrapper.vue'
import LuroContainer from './components/LuroContainer.vue'
import Spotlight from './components/Spotlight.vue'

defineOptions({
  name: 'LuroIndex'
})

// 修复无法滑动的问题：强制覆盖 App.vue 中的 overflow: hidden 和 height: 100%
onMounted(() => {
  document.documentElement.style.overflow = 'auto'
  document.body.style.overflow = 'auto'
  document.documentElement.style.height = 'auto'
  document.body.style.height = 'auto'
  document.body.style.backgroundColor = 'black' // 首页强制黑色背景
  const app = document.getElementById('app')
  if (app) {
    app.style.height = 'auto'
    app.style.overflow = 'visible'
  }
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.documentElement.style.height = ''
  document.body.style.height = ''
  document.body.style.backgroundColor = '' // 离开首页恢复默认背景
  const app = document.getElementById('app')
  if (app) {
    app.style.height = ''
    app.style.overflow = ''
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden"
  >
    <Navbar />

    <main class="relative">
      <div class="py-20 relative">
        <LuroWrapper className="relative">
          <LuroContainer className="relative">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="rgba(255, 255, 255, 0.5)"
            />
            <Hero />
          </LuroContainer>
        </LuroWrapper>
      </div>

      <Features />

      <Solutions />
    </main>

        <footer class="py-20 border-t border-white/10 bg-[#050505]">
      <LuroWrapper>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1 space-y-6">
            <div class="flex items-center gap-2">
              <img src="@/assets/imgs/logo.png" alt="Logo" style="height: 40px; width: auto;" class="w-auto h-20" />
              <span class="text-xl font-bold tracking-tighter">图腾瑞智</span>
            </div>
            <p class="text-white/40 text-sm leading-relaxed">
              致力于为企业提供最前沿的数字化转型解决方案，释放数据要素价值，驱动业务智慧增长。
            </p>
          </div>
          <div>
            <h4 class="text-white font-bold mb-6">核心产品</h4>
            <ul class="space-y-4 text-sm text-white/40">
              <li
                ><router-link to="#" class="hover:text-white transition-colors"
                  >BPM 流程引擎</router-link
                ></li
              >
              <li
                ><router-link to="#" class="hover:text-white transition-colors"
                  >CRM 客户管理</router-link
                ></li
              >
              <li
                ><router-link to="#" class="hover:text-white transition-colors"
                  >ERP 资源规划</router-link
                ></li
              >
              <li
                ><router-link to="#" class="hover:text-white transition-colors"
                  >AI 智能助手</router-link
                ></li
              >
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-6">解决方案</h4>
            <ul class="space-y-4 text-sm text-white/40">
              <li
                ><router-link to="#" class="hover:text-white transition-colors"
                  >工业物联网</router-link
                ></li
              >
              <li
                ><router-link to="#" class="hover:text-white transition-colors"
                  >数据资产化</router-link
                ></li
              >
              <li
                ><router-link to="#" class="hover:text-white transition-colors"
                  >数字化协同</router-link
                ></li
              >
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-6">联系我们</h4>
            <ul class="space-y-4 text-sm text-white/40">
              <li class="flex items-center gap-2"><Icon icon="ep:phone" /> 400-888-8888</li>
              <li class="flex items-center gap-2"
                ><Icon icon="ep:message" /> contact@luro.digital</li
              >
              <li class="flex items-center gap-2"><Icon icon="ep:location" /> 潍坊</li>
            </ul>
          </div>
        </div>
        <div
          class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20"
        >
          <p>© 2026 图腾瑞智 Technology. All rights reserved.</p>
          <div class="flex gap-6">
            <router-link to="#" class="hover:text-white transition-colors">隐私政策</router-link>
            <router-link to="#" class="hover:text-white transition-colors">服务条款</router-link>
            <router-link to="#" class="hover:text-white transition-colors"
              >沪ICP备XXXXXXXX号</router-link
            >
          </div>
        </div>
      </LuroWrapper>
    </footer>
  </div>
</template>

<style>
/* 首页全局样式引入 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>
