// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // 모듈 설정
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],

  // 런타임 설정
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY
    }
  },

  // 앱 설정
  app: {
    head: {
      title: '가져가구 - 중고가구 거래 플랫폼',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '안전하고 편리한 중고가구 거래 플랫폼' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap' }
      ]
    }
  },

  // CSS 설정
  css: [],

  // Tailwind CSS 설정
  tailwindcss: {
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue'
      ],
      theme: {
        extend: {
          fontFamily: {
            'sans': ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
            'display': ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif']
          },
          colors: {
            primary: {
              50: '#faf5ff',
              100: '#f3e8ff',
              200: '#e9d5ff',
              300: '#d8b4fe',
              400: '#c084fc',
              500: '#a855f7',
              600: '#9333ea',
              700: '#7c3aed',
              800: '#6b21a8',
              900: '#581c87'
            }
          }
        }
      }
    }
  },

  // 이미지 설정
  image: {
    provider: 'ipx'
  },

  // 색상 모드 설정
  colorMode: {
    preference: 'light',
    fallback: 'light'
  }
})
