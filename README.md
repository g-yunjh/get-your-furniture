# 🪑 Get Your Furniture - 중고가구 거래 플랫폼

> 안전하고 편리한 중고가구 거래 플랫폼입니다. Nuxt.js, TypeScript, Supabase를 사용하여 구축되었습니다.

[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-4.0-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.0-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 기술 스택

### Frontend
- **Framework**: Nuxt.js 4, Vue.js 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **UI Components**: Headless UI
- **Icons**: Heroicons

### Backend & Database
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **File Storage**: Supabase Storage

### Development & Deployment
- **Package Manager**: npm
- **Deployment**: Vercel
- **Code Quality**: ESLint, Prettier

## ✨ 주요 기능

### 🔐 사용자 관리
- 회원가입, 로그인, 로그아웃
- 프로필 관리 및 아바타 설정
- 비회원도 제품 등록 가능 (비밀번호 기반 권한 관리)

### 🏠 가구 거래
- 가구 상품 CRUD (생성, 조회, 수정, 삭제)
- 이미지 업로드 (최대 5장)
- 가격 정보 및 상태 표시
- 지역 기반 매칭

### 🔍 검색 및 필터링
- 제품명, 설명 기반 검색
- 카테고리별 필터링
- 가격대, 상태별 필터링
- 지역별 검색

### 📱 사용자 경험
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 다크모드 지원
- 이미지 캐러셀 (터치/마우스/키보드 네비게이션)
- 로딩 상태 및 에러 처리

### 💬 커뮤니케이션
- 채팅 링크 연결 (카카오톡 오픈채팅방 등)
- 판매자 연락처 정보

## 🆕 최신 기능

### 비회원 전용 기능
- ✅ 회원가입 없이도 제품 등록 가능
- ✅ 등록 시 비밀번호 설정으로 수정/삭제 권한 관리
- ✅ 디시인사이드 스타일의 간편한 관리 시스템

### 제품 상세 페이지
- ✅ 이미지 캐러셀 (키보드 화살표 키 지원)
- ✅ 판매자 정보 표시
- ✅ 채팅 링크 연결
- ✅ 비회원 수정/삭제 기능
- ✅ 연락처 입력 모달

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

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase 설정
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🗄️ 데이터베이스 설정

### Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성하세요.
2. 프로젝트 설정에서 URL과 anon key를 복사하여 `.env` 파일에 설정하세요.

### 데이터베이스 스키마 생성

SQL 편집기에서 다음 스크립트를 실행하세요:

```sql
-- 사용자 테이블
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 카테고리 테이블
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 가구 테이블 (비회원 기능 포함)
CREATE TABLE furniture (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category_id UUID REFERENCES categories(id),
  seller_id UUID REFERENCES users(id), -- nullable (비회원 등록 가능)
  seller_phone TEXT, -- 비회원 연락처
  condition TEXT CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  location TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  is_sold BOOLEAN DEFAULT FALSE,
  password TEXT, -- 비회원 수정/삭제용 비밀번호
  chat_link TEXT, -- 채팅 링크 (카카오톡 오픈채팅방 등)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE furniture ENABLE ROW LEVEL SECURITY;

-- 사용자 정책
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- 카테고리 정책
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);

-- 가구 정책 (비회원 기능 포함)
CREATE POLICY "Furniture is viewable by everyone" ON furniture FOR SELECT USING (true);
CREATE POLICY "Users can insert own furniture" ON furniture FOR INSERT WITH CHECK (
  auth.uid() = seller_id OR 
  (seller_id IS NULL AND password IS NOT NULL)
);
CREATE POLICY "Users can update own furniture" ON furniture FOR UPDATE USING (
  auth.uid() = seller_id OR 
  (seller_id IS NULL AND password IS NOT NULL)
);
CREATE POLICY "Users can delete own furniture" ON furniture FOR DELETE USING (
  auth.uid() = seller_id OR 
  (seller_id IS NULL AND password IS NOT NULL)
);

-- 기본 카테고리 데이터 삽입
INSERT INTO categories (name, description) VALUES
  ('소파', '거실 소파 및 안락의자'),
  ('테이블', '식탁, 책상, 커피테이블'),
  ('침대', '침대 프레임 및 매트리스'),
  ('옷장', '옷장 및 수납장'),
  ('의자', '식탁의자, 책상의자'),
  ('기타', '기타 가구류');
```

### Storage 버킷 설정

1. Storage 메뉴에서 새 버킷 생성
2. 버킷 이름: `furniture-images`
3. Public bucket으로 설정
4. RLS 정책 설정 (필요시)

## 📱 페이지 구조

### 주요 페이지

| 경로 | 설명 | 기능 |
|------|------|------|
| `/` | 홈페이지 | 제품 목록, 검색, 필터링 |
| `/furniture/[id]` | 제품 상세 | 이미지 캐러셀, 판매자 정보, 채팅 링크 |
| `/furniture/[id]/edit` | 제품 수정 | 비밀번호 검증, 수정 폼 |
| `/auth/login` | 로그인 | 사용자 인증 |
| `/auth/register` | 회원가입 | 새 계정 생성 |

### 컴포넌트 구조

```
components/
├── ui/           # 기본 UI 컴포넌트
├── forms/        # 폼 관련 컴포넌트
├── layout/       # 레이아웃 컴포넌트
└── furniture/    # 가구 관련 컴포넌트
```

## 🔧 API 구조

### 가구 관련 API

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| `GET` | `/api/furniture` | 제품 목록 조회 (검색/필터링 지원) |
| `GET` | `/api/furniture/[id]` | 단일 제품 조회 |
| `POST` | `/api/furniture` | 제품 등록 |
| `PUT` | `/api/furniture/[id]` | 제품 수정 |
| `DELETE` | `/api/furniture/[id]` | 제품 삭제 |

### 비회원 기능

- 비밀번호 검증을 통한 수정/삭제
- 회원가입 없이 제품 등록 가능
- 안전한 권한 관리 시스템

## 🎨 UI/UX 특징

### 디자인 시스템
- **반응형 디자인**: 모바일 퍼스트 접근법
- **다크모드**: 시스템 설정에 따른 자동 전환
- **컴포넌트 기반**: 재사용 가능한 UI 컴포넌트

### 사용자 경험
- **이미지 캐러셀**: 터치/마우스/키보드 네비게이션
- **로딩 상태**: 스켈레톤 로딩 및 스피너
- **에러 처리**: 사용자 친화적인 에러 메시지
- **접근성**: 키보드 네비게이션 지원

## 🔒 보안 기능

- **Row Level Security (RLS)**: 데이터베이스 레벨 보안
- **비밀번호 기반 권한 관리**: 비회원 기능 보안
- **이미지 업로드 검증**: 파일 타입 및 크기 제한
- **XSS 방지**: 입력 데이터 검증 및 이스케이프

## 🚀 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 GitHub 계정 연결
2. 프로젝트 import
3. 환경 변수 설정
4. 자동 배포 설정

### 수동 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 📊 성능 최적화

- **이미지 최적화**: WebP 포맷 지원, lazy loading
- **코드 스플리팅**: 페이지별 번들 분리
- **캐싱**: 정적 자산 캐싱
- **SEO**: 메타 태그 및 구조화된 데이터

## 🧪 테스트

```bash
# 단위 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e

# 테스트 커버리지 확인
npm run test:coverage
```

## 📝 개발 가이드

### 코드 스타일

- TypeScript strict 모드 사용
- ESLint + Prettier 설정
- 컴포넌트 네이밍: PascalCase
- 파일 네이밍: kebab-case

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 또는 보조 도구 변경
```

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:

1. **Fork the Project** - 프로젝트를 포크하세요
2. **Create your Feature Branch** - `git checkout -b feature/AmazingFeature`
3. **Commit your Changes** - `git commit -m 'Add some AmazingFeature'`
4. **Push to the Branch** - `git push origin feature/AmazingFeature`
5. **Open a Pull Request** - Pull Request를 생성하세요

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 린터 실행
npm run lint

# 타입 체크
npm run type-check
```

## 📞 지원 및 문의

- **이슈 리포트**: [GitHub Issues](https://github.com/yourusername/get-your-furniture/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/yourusername/get-your-furniture/discussions)
- **문서**: [Wiki](https://github.com/yourusername/get-your-furniture/wiki)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [Nuxt.js](https://nuxt.com/) - Vue.js 기반 풀스택 프레임워크
- [Supabase](https://supabase.com/) - 오픈소스 Firebase 대안
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 퍼스트 CSS 프레임워크
- [Vercel](https://vercel.com/) - 최고의 배포 플랫폼

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
