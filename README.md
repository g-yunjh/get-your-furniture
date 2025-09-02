# 🪑 가져가구 (Get Your Furniture) - 중고가구 거래 플랫폼

> 안전하고 편리한 중고가구 거래 플랫폼입니다. Nuxt.js 4, TypeScript, Supabase를 사용하여 구축되었습니다.

[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-4.0-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.55-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 기술 스택

### Frontend
- **Framework**: Nuxt.js 4, Vue.js 3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **UI Components**: Headless UI, Heroicons
- **Image Optimization**: @nuxt/image

### Backend & Database
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### Development & Deployment
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Color Mode**: @nuxtjs/color-mode

## ✨ 주요 기능

- 🏠 가구 상품 CRUD (생성, 조회, 수정, 삭제)
- 🔐 비회원도 제품 등록 가능 (비밀번호 기반 권한 관리)
- 📱 반응형 디자인 및 다크모드 지원
- 💬 문의하기 시스템 (첨부파일 지원)
- 🖼️ 이미지 업로드 및 최적화

## 🛠️ 빠른 시작

### 1. 프로젝트 클론
```bash
git clone https://github.com/yourusername/get-your-furniture.git
cd get-your-furniture
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일 생성:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

## 🗄️ 데이터베이스 설정

Supabase에서 다음 테이블들을 생성하세요:

```sql
-- 가구 테이블
CREATE TABLE furniture (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  seller_phone TEXT NOT NULL,
  condition TEXT CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  location TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  is_sold BOOLEAN DEFAULT FALSE,
  password TEXT NOT NULL,
  chat_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 문의 테이블
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 문의 첨부파일 테이블
CREATE TABLE contact_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage 버킷
- `furniture-images`: 가구 이미지용
- `contact-attachments`: 문의 첨부파일용

## 📱 페이지 구조

- `/` - 홈페이지 (제품 목록)
- `/furniture/[id]` - 제품 상세
- `/furniture/create` - 제품 등록
- `/furniture/[id]/edit` - 제품 수정
- `/contact` - 문의하기
- `/about` - 회사 소개
- `/faq` - 자주 묻는 질문

## 🚀 배포

```bash
# 프로덕션 빌드
npm run build

# 미리보기
npm run preview
```

## 📝 개발 가이드

### 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
