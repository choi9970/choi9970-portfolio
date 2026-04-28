# CLAUDE.md

이 문서는 Claude 같은 AI 코딩 에이전트가 이 저장소에서 작업할 때 참고하는 프로젝트 가이드입니다.

## 프로젝트 개요

- 이 프로젝트는 개인 개발자 포트폴리오 사이트입니다.
- 프런트엔드는 React + Vite를 사용합니다.
- 백엔드는 Express 서버(`server.js`)를 사용합니다.
- GitHub GraphQL API를 통해 기여 수와 잔디 데이터를 가져옵니다.

## 주요 파일

- `src/App.jsx`
  포트폴리오 메인 UI와 섹션 구성
- `src/styles.css`
  전체 스타일
- `src/main.jsx`
  React 진입점
- `server.js`
  Express 서버, `.env` 로딩, GitHub 통계 API
- `vite.config.js`
  Vite 설정 및 `/api` 프록시
- `dev.js`
  개발 시 Vite와 Express를 함께 실행하는 스크립트
- `.env`
  로컬 비밀값 저장
- `.env.example`
  환경변수 예시

## 실행 명령어

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

- 프런트엔드: `http://localhost:5173`
- API 서버: `http://localhost:3000`

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

## 환경변수

현재 핵심 환경변수는 아래와 같습니다.

```env
PORT=3000
GITHUB_USERNAME=choi9970
GITHUB_TOKEN=your_github_token
```

규칙:

- `.env`는 절대 커밋하지 않습니다.
- 토큰은 클라이언트 코드로 전달하지 않습니다.
- GitHub API 호출은 반드시 `server.js`에서만 처리합니다.

## GitHub 통계 기능

- 엔드포인트: `/api/github/stats`
- 서버가 GitHub GraphQL API를 호출해 아래 데이터를 반환합니다.
  - 총 기여 수
  - 총 커밋 수
  - 공개 저장소 수
  - 팔로워 수
  - contribution calendar

프런트는 이 API를 fetch해서 화면에 렌더링합니다.

## 수정 시 원칙

- UI 문구/섹션 변경은 `src/App.jsx`에서 처리합니다.
- 스타일 변경은 `src/styles.css`에서 처리합니다.
- API 응답 구조를 바꾸면 프런트 렌더링 코드도 함께 확인합니다.
- 환경변수 로직을 바꿀 때는 `.env.example`도 같이 갱신합니다.

## 작업 주의사항

- 이 저장소는 포트폴리오용이므로 디자인 품질과 문구 톤이 중요합니다.
- GitHub 토큰은 민감정보이므로 출력하거나 로그에 남기지 않습니다.
- 개발 서버 관련 로그 파일은 임시 파일이므로 배포 대상에 포함하지 않습니다.
- 불필요한 이전 프로젝트 파일은 이미 정리된 상태라고 가정하되, 삭제 전에는 현재 구조를 다시 확인합니다.

## 검증 방법

작업 후 최소한 아래를 확인합니다.

1. `npm run build` 성공
2. `npm run dev` 실행 가능
3. `http://localhost:3000/api/health` 응답 확인
4. `http://localhost:3000/api/github/stats` 응답 확인
5. `http://localhost:5173`에서 화면 확인

## 배포 메모

- 배포 전에 `npm install` 후 `npm run build` 실행
- 서버 진입점은 `server.js`
- 배포 환경에도 `GITHUB_TOKEN`이 필요
- 정적 파일은 `dist/`에서 서비스됨
