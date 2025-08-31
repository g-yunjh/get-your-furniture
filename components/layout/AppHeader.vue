<template>
  <ClientOnly>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-purple-800/90 via-pink-700/90 to-orange-600/90 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <NuxtLink to="/" class="flex items-center space-x-3 group cursor-pointer">
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <img src="/logo.svg" alt="가져가구 로고" class="w-6 h-6 brightness-0 invert" />
          </div>
          <span class="text-xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">가져가구</span>
        </NuxtLink>

        <!-- 네비게이션 -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/#furniture-list" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">가구 둘러보기</NuxtLink>
          <NuxtLink to="/furniture/create" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">내 가구 팔기</NuxtLink>
          <NuxtLink to="/about" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">서비스 소개</NuxtLink>
          <NuxtLink to="/faq" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">자주 묻는 질문</NuxtLink>
          <NuxtLink to="/contact" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">문의하기</NuxtLink>
        </nav>

        <!-- 우측 여백 (기존 사용자 메뉴 공간) -->
        <div class="w-24"></div>
      </div>
    </div>
  </nav>
  </ClientOnly>
</template>

<script setup lang="ts">
// 인증 관련 코드 제거됨
</script>
