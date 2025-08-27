<template>
  <ClientOnly>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-purple-800/90 via-pink-700/90 to-orange-600/90 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <NuxtLink to="/" class="flex items-center space-x-3 group cursor-pointer">
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
          </div>
          <span class="text-xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">가져가구</span>
        </NuxtLink>

        <!-- 네비게이션 -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">가구 둘러보기</NuxtLink>
          <NuxtLink to="/furniture/create" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">내 가구 팔기</NuxtLink>
          <NuxtLink to="/about" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">서비스 소개</NuxtLink>
          <NuxtLink to="/faq" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">자주 묻는 질문</NuxtLink>
          <NuxtLink to="/contact" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">문의하기</NuxtLink>
        </nav>

        <!-- 사용자 메뉴/버튼 -->
        <div class="flex items-center space-x-4">

          <div v-if="user" class="relative">
            <button
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
            >
              <img
                v-if="user.user_metadata?.avatar_url"
                :src="user.user_metadata.avatar_url"
                :alt="user.user_metadata?.name || 'User'"
                class="h-8 w-8 rounded-full"
              />
              <div v-else class="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-white text-sm font-medium drop-shadow-sm">
                  {{ (user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase() }}
                </span>
              </div>
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- 드롭다운 메뉴 -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >
              <NuxtLink
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="isUserMenuOpen = false"
              >
                프로필
              </NuxtLink>
              <NuxtLink
                to="/my-furniture"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="isUserMenuOpen = false"
              >
                내 가구
              </NuxtLink>
              <button
                @click="handleSignOut"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                로그아웃
              </button>
            </div>
          </div>

          <!-- 로그인/회원가입 버튼 -->
          <div v-else class="flex items-center space-x-2">
            <NuxtLink
              to="/auth/login"
              class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm"
            >
              로그인
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-3 rounded-xl transition-colors text-sm drop-shadow-sm"
            >
              회원가입
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
  </ClientOnly>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isUserMenuOpen = ref(false)

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as Element
    if (!target.closest('.relative')) {
      isUserMenuOpen.value = false
    }
  })
})

// 로그아웃
const handleSignOut = async () => {
  try {
    await authStore.signOut()
    isUserMenuOpen.value = false
    await navigateTo('/')
  } catch (error) {
    console.error('로그아웃 실패:', error)
  }
}

// 외부 클릭 시 메뉴 닫기
 

</script>
