<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              Get Your Furniture
            </span>
          </NuxtLink>
        </div>

        <!-- 네비게이션 -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            홈
          </NuxtLink>
          <NuxtLink
            to="/furniture"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            가구 찾기
          </NuxtLink>
          <NuxtLink
            v-if="user"
            to="/furniture/create"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            판매하기
          </NuxtLink>
        </nav>

        <!-- 사용자 메뉴 -->
        <div class="flex items-center space-x-4">
          <!-- 다크모드 토글 -->
          <button
            @click="toggleColorMode"
            class="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <svg v-if="colorMode.value === 'dark'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- 사용자 메뉴 -->
          <div v-if="user" class="relative">
            <button
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <img
                v-if="user.user_metadata?.avatar_url"
                :src="user.user_metadata.avatar_url"
                :alt="user.user_metadata?.name || 'User'"
                class="h-8 w-8 rounded-full"
              />
              <div v-else class="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
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
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
            >
              <NuxtLink
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="isUserMenuOpen = false"
              >
                프로필
              </NuxtLink>
              <NuxtLink
                to="/my-furniture"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="isUserMenuOpen = false"
              >
                내 가구
              </NuxtLink>
              <button
                @click="handleSignOut"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                로그아웃
              </button>
            </div>
          </div>

          <!-- 로그인/회원가입 버튼 -->
          <div v-else class="flex items-center space-x-2">
            <NuxtLink
              to="/auth/login"
              class="btn-secondary text-sm"
            >
              로그인
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="btn-primary text-sm"
            >
              회원가입
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isUserMenuOpen = ref(false)

// 다크모드 토글
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

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
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as Element
    if (!target.closest('.relative')) {
      isUserMenuOpen.value = false
    }
  })
})
</script>
