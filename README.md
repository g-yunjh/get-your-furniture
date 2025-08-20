# Get Your Furniture - 중고가구 거래 플랫폼

안전하고 편리한 중고가구 거래 플랫폼입니다. Nuxt.js, TypeScript, Supabase를 사용하여 구축되었습니다.

## 🚀 기술 스택

- **Frontend**: Nuxt.js 4, Vue.js 3, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: Pinia
- **Deployment**: Vercel
- **Icons**: Heroicons
- **UI Components**: Headless UI

## ✨ 주요 기능

- 🔐 사용자 인증 (회원가입, 로그인, 로그아웃)
- 🏠 가구 상품 CRUD (생성, 조회, 수정, 삭제)
- 🔍 가구 검색 및 필터링
- 📱 반응형 디자인
- 🌙 다크모드 지원
- 📸 이미지 업로드
- 📍 지역 기반 매칭
- 💰 가격 정보 표시

## 🛠️ 설치 및 설정

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd get-your-furniture
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase 설정
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성하세요.
2. 다음 SQL을 실행하여 데이터베이스 스키마를 생성하세요:

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

-- 가구 테이블
CREATE TABLE furniture (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category_id UUID REFERENCES categories(id),
  seller_id UUID REFERENCES users(id),
  condition TEXT CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  location TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  is_sold BOOLEAN DEFAULT FALSE,
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

-- 가구 정책
CREATE POLICY "Furniture is viewable by everyone" ON furniture FOR SELECT USING (true);
CREATE POLICY "Users can insert own furniture" ON furniture FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Users can update own furniture" ON furniture FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Users can delete own furniture" ON furniture FOR DELETE USING (auth.uid() = seller_id);

-- 기본 카테고리 데이터 삽입
INSERT INTO categories (name, description) VALUES
  ('소파', '거실 소파 및 안락의자'),
  ('테이블', '식탁, 책상, 커피테이블'),
  ('침대', '침대 프레임 및 매트리스'),
  ('옷장', '옷장 및 수납장'),
  ('의자', '식탁의자, 책상의자'),
  ('기타', '기타 가구류');
```

3. Storage 버킷을 생성하세요:
   - 버킷 이름: `furniture-images`
   - Public bucket으로 설정

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
get-your-furniture/
├── app.vue                 # 메인 앱 레이아웃
├── nuxt.config.ts          # Nuxt 설정
├── package.json            # 의존성 및 스크립트
├── tsconfig.json           # TypeScript 설정
├── assets/
│   └── css/
│       └── main.css        # 전역 스타일
├── components/
│   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   ├── furniture/          # 가구 관련 컴포넌트
│   │   └── FurnitureCard.vue
│   └── ui/                 # UI 컴포넌트
├── composables/            # 컴포저블 함수
├── pages/                  # 페이지 컴포넌트
│   ├── index.vue           # 홈페이지
│   ├── furniture/          # 가구 관련 페이지
│   └── auth/               # 인증 관련 페이지
├── stores/                 # Pinia 스토어
│   ├── auth.ts
│   └── furniture.ts
├── types/                  # TypeScript 타입 정의
│   ├── index.ts
│   └── supabase.ts
└── utils/                  # 유틸리티 함수
    └── supabase.ts         # Supabase 클라이언트
```

## 🚀 배포 (Vercel)

### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

### 2. Vercel에 배포

```bash
vercel
```

### 3. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## 🔧 개발 가이드

### 새로운 페이지 추가

```bash
# pages 디렉토리에 Vue 파일 생성
touch pages/new-page.vue
```

### 새로운 컴포넌트 추가

```bash
# components 디렉토리에 Vue 파일 생성
touch components/NewComponent.vue
```

### 스토어 사용

```typescript
// 컴포넌트에서 스토어 사용
const authStore = useAuthStore()
const furnitureStore = useFurnitureStore()
```

## 📝 라이센스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
