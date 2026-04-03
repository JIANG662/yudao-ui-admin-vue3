<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import LuroWrapper from './LuroWrapper.vue'
import Icon from '@/components/Icon/src/Icon.vue'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()
const isOpen = ref(false)

const isLogin = computed(() => !!userStore.getIsSetUser)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleLogin = () => {
  if (isLogin.value) {
    router.push('/index')
  } else {
    router.push('/login')
  }
}

const handleLogout = async () => {
  await userStore.loginOut()
  window.location.href = '/'
}

watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

onMounted(() => {
  // Initial state check if needed
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="relative w-full h-full">
    <div
      class="z-[99] fixed pointer-events-none inset-x-0 h-[88px] bg-[rgba(10,10,10,0.8)] backdrop-blur-sm [mask:linear-gradient(to_bottom,#000_20%,transparent_calc(100%-20%))]"
    ></div>

    <header
      :class="[
        'fixed top-4 inset-x-0 mx-auto max-w-6xl px-2 md:px-12 z-[100] transform transition-all duration-300',
        isOpen ? 'h-[calc(100%-24px)]' : 'h-12'
      ]"
    >
      <LuroWrapper
        className="backdrop-blur-lg rounded-xl lg:rounded-2xl border border-[rgba(124,124,124,0.2)] px-2 md:px-2 flex items-center justify-start"
      >
        <div
          class="flex items-center justify-between w-full sticky mt-[7px] lg:mt-auto mb-auto inset-x-0"
        >
          <div class="flex items-center flex-1 lg:flex-none pl-1">
            <router-link to="/" class="text-lg font-semibold text-white">
              <img src="@/assets/imgs/logo.png" alt="Logo" style="height: 40px; width: auto;" class="w-auto h-8" />
            </router-link>
            <span class="ml-2 text-lg font-semibold text-white">图腾瑞智·数字资产运营管理系统</span>
            <div class="items-center hidden ml-8 lg:flex gap-6">
              <el-dropdown trigger="hover">
                <span
                  class="text-sm font-medium text-white/70 hover:text-white cursor-pointer outline-none flex items-center"
                >
                  核心产品 <Icon icon="ep:arrow-down" class="ml-1 w-3 h-3" />
                </span>
                <template #dropdown>
                  <el-dropdown-menu class="!bg-[#1a1a1a] !border-white/10">
                    <el-dropdown-item class="!text-white/70 hover:!text-white hover:!bg-white/10">
                      <Icon icon="ep:set-up" class="mr-2" /> 数字化 BPM 流程引擎
                    </el-dropdown-item>
                    <el-dropdown-item class="!text-white/70 hover:!text-white hover:!bg-white/10">
                      <Icon icon="ep:avatar" class="mr-2" /> 智能 CRM 客户管理
                    </el-dropdown-item>
                    <el-dropdown-item class="!text-white/70 hover:!text-white hover:!bg-white/10">
                      <Icon icon="ep:shopping-cart" class="mr-2" /> 全渠道电商 Mall 系统
                    </el-dropdown-item>
                    <el-dropdown-item class="!text-white/70 hover:!text-white hover:!bg-white/10">
                      <Icon icon="ep:money" class="mr-2" /> 聚合支付 Pay 中心
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown trigger="hover">
                <span
                  class="text-sm font-medium text-white/70 hover:text-white cursor-pointer outline-none flex items-center"
                >
                  解决方案 <Icon icon="ep:arrow-down" class="ml-1 w-3 h-3" />
                </span>
                <template #dropdown>
                  <el-dropdown-menu class="!bg-[#1a1a1a] !border-white/10">
                    <el-dropdown-item class="!text-white/70 hover:!text-white hover:!bg-white/10">
                      <Icon icon="ep:cpu" class="mr-2" /> 工业 IoT 物联网方案
                    </el-dropdown-item>
                    <el-dropdown-item class="!text-white/70 hover:!text-white hover:!bg-white/10">
                      <Icon icon="ep:magic-stick" class="mr-2" /> AI 智能助手集成
                    </el-dropdown-item>
                    <el-dropdown-item class="!text-white/70 hover:!text-white hover:!bg-white/10">
                      <Icon icon="ep:files" class="mr-2" /> 企业级 ERP 资源规划
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <router-link to="#" class="text-sm font-medium text-white/70 hover:text-white">
                关于我们
              </router-link>
            </div>
          </div>
          <div class="items-center flex gap-2 lg:gap-4">
            <template v-if="isLogin">
              <el-button
                size="small"
                type="primary"
                class="!bg-[#232323] !border-none hover:!brightness-125 !text-white"
                @click="handleLogin"
              >
                进入系统
              </el-button>
              <el-button
                size="small"
                type="primary"
                class="!bg-red-500 !border-none hover:!bg-red-600 !text-white"
                @click="handleLogout"
              >
                退出登录
              </el-button>
            </template>
            <template v-else>
              <el-button
                size="small"
                type="primary"
                class="!bg-[#232323] !border-none hover:!brightness-125 !text-white"
                @click="handleLogin"
              >
                登录
              </el-button>
              
            </template>
            <el-button link class="lg:hidden p-2 w-8 h-8 text-white" @click="toggleMenu">
              <Icon :icon="isOpen ? 'ep:close' : 'ep:menu'" class="w-4 h-4" />
            </el-button>
          </div>
        </div>
        
      </LuroWrapper>
    </header>
  </div>
</template>

<style scoped>
:deep(.el-button) {
  border-radius: 8px;
  font-weight: 500;
}
</style>
