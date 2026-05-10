# Developer Portfolio

Vite + React 기반 포트폴리오 사이트입니다.  
프런트는 정적 배포하고, GitHub 통계는 서버에서 안전하게 가져오도록 구성했습니다.

## 주요 구성

- 포트폴리오 메인 페이지: `src/App.jsx`
- 스타일: `src/styles.css`
- GitHub 통계 API
  - 로컬 개발: `server.js`
  - Vercel 배포: `api/github/stats.js`
- 문의 폼 API
  - 로컬 개발: `server.js`
  - Vercel 배포: `api/contact.js`
- 공용 GitHub 통계 로직: `lib/github-stats.js`
- 공용 문의 저장 로직: `lib/contact-inquiries.js`

## 기술 스택

- React
- Vite
- Express
- GitHub GraphQL API
- Vercel Serverless Functions
- Supabase

## 로컬 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 넣습니다.

```env
PORT=3000
GITHUB_USERNAME=choi9970
GITHUB_TOKEN=your_github_token
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

실행 후 아래 주소에서 확인할 수 있습니다.

- 프런트: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## 빌드

```bash
npm run build
```

## Vercel 배포

현재 프로젝트는 Vercel에 바로 올릴 수 있도록 준비되어 있습니다.

### 필요한 Vercel 환경 변수

- `GITHUB_USERNAME`
- `GITHUB_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

### 배포 절차

1. GitHub 저장소를 Vercel에 연결
2. Framework Preset은 `Vite` 사용
3. Environment Variables에 위 두 값 추가
4. Deploy 실행

배포 후 GitHub 통계는 `/api/github/stats` 서버리스 함수에서 처리됩니다.
문의 폼은 `/api/contact` 서버리스 함수에서 Supabase `contact_inquiries` 테이블로 저장됩니다.

## Supabase 관련

현재 버전에서는 문의 폼 저장용으로 Supabase를 사용합니다.

### 필요한 테이블

SQL Editor에서 아래 파일 내용을 실행하면 됩니다.

- `supabase/contact_inquiries.sql`

테이블 이름:

- `public.contact_inquiries`

저장 컬럼:

- `name`
- `email`
- `message`
- `source`
- `user_agent`
- `referrer`
- `created_at`

이 구조는 브라우저에서 직접 Supabase에 쓰지 않고, 서버에서만 `SUPABASE_SECRET_KEY`를 사용해 저장하도록 설계했습니다.

## 파일 구조

```text
Playground/
├─ api/
│  └─ github/
│     └─ stats.js
├─ lib/
│  ├─ contact-inquiries.js
│  └─ github-stats.js
├─ supabase/
│  └─ contact_inquiries.sql
├─ public/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ .env.example
├─ package.json
├─ server.js
├─ vercel.json
└─ vite.config.js
```
