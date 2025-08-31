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
- 📸 이미지 업로드 (최대 5장)
- 📍 지역 기반 매칭
- 💰 가격 정보 표시
- 💬 채팅 링크 연결 (카카오톡 오픈채팅방 등)
- 🔑 비회원 수정/삭제 (비밀번호 기반)
- 🖼️ 이미지 캐러셀 (상세 페이지)

## 🆕 새로운 기능

### 비회원 기능
- 회원가입 없이도 제품 등록 가능
- 등록 시 비밀번호 설정으로 수정/삭제 권한 관리
- 디시인사이드 스타일의 간편한 관리 시스템

### 제품 상세 페이지
- 이미지 캐러셀 (키보드 화살표 키 지원)
- 판매자 정보 표시
- 채팅 링크 연결
- 비회원 수정/삭제 기능
- 연락처 입력 모달

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

-- 가구 테이블 (비회원 기능 포함)
CREATE TABLE furniture (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category_id UUID REFERENCES categories(id),
  seller_id UUID REFERENCES users(id), -- nullable (비회원 등록 가능)
  seller_name TEXT, -- 비회원 판매자 이름
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

3. Storage 버킷을 생성하세요:
   - 버킷 이름: `furniture-images`
   - Public bucket으로 설정

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📱 주요 페이지

### 홈페이지 (`/`)
- 제품 목록 표시
- 검색 및 필터링
- 반응형 그리드 레이아웃

### 제품 상세 페이지 (`/furniture/[id]`)
- 이미지 캐러셀 (키보드 네비게이션 지원)
- 제품 정보 및 판매자 정보
- 채팅 링크 연결
- 비회원 수정/삭제 기능

### 제품 수정 페이지 (`/furniture/[id]/edit`)
- 비밀번호 검증 후 수정 폼 제공
- 이미지 업로드/삭제
- 모든 제품 정보 수정 가능

## 🔧 API 구조

### 가구 관련 API
- `GET /api/furniture` - 제품 목록 조회
- `GET /api/furniture/[id]` - 단일 제품 조회
- `POST /api/furniture` - 제품 등록
- `PUT /api/furniture/[id]` - 제품 수정
- `DELETE /api/furniture/[id]` - 제품 삭제

### 비회원 기능
- 비밀번호 검증을 통한 수정/삭제
- 회원가입 없이 제품 등록 가능

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **다크모드**: 시스템 설정에 따른 자동 전환
- **이미지 캐러셀**: 터치/마우스/키보드 네비게이션
- **로딩 상태**: 스켈레톤 로딩 및 스피너
- **에러 처리**: 사용자 친화적인 에러 메시지

## 🔒 보안

- Row Level Security (RLS) 적용
- 비밀번호 기반 비회원 권한 관리
- 이미지 업로드 검증
- XSS 방지

## 🚀 배포

### Vercel 배포

1. Vercel에 프로젝트 연결
2. 환경 변수 설정
3. 자동 배포 설정

```bash
npm run build
```

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.
