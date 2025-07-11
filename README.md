# 🤖 Orbio 로봇 추천 시스템

AI 기반 로봇 추천 시스템으로, 사용자가 작업 조건을 입력하면 가장 적합한 로봇을 추천해주는 웹 애플리케이션입니다.

## ✨ 주요 기능

- **자연어 입력**: 사용자가 텍스트로 작업 조건을 입력
- **AI 추천**: OpenAI GPT-4를 활용한 지능형 로봇 추천
- **상세 정보**: 추천 이유, 신뢰도, 일치하는 능력 등 상세 정보 제공
- **현대적 UI**: Tailwind CSS를 활용한 반응형 디자인

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 OpenAI API 키를 설정하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 📋 사용 방법

1. 웹페이지에 접속
2. 작업 조건을 텍스트로 입력 (예: "저온 창고 운반 작업")
3. "로봇 추천받기" 버튼 클릭
4. AI가 분석한 추천 로봇과 상세 정보 확인

## 🤖 지원하는 로봇

- **Orbio ColdBot X1**: 저온 창고 운반 로봇
- **Orbio WarehouseBot Pro**: 일반 창고 운반 로봇
- **Orbio PrecisionBot S1**: 정밀 작업 로봇
- **Orbio HeavyBot M1**: 중량 물품 운반 로봇
- **Orbio CleanBot H1**: 청소 및 유지보수 로봇

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o API
- **Deployment**: Vercel (권장)

## 📁 프로젝트 구조

```
orbio-robot-recommender/
├── app/
│   ├── api/recommend/route.ts    # 로봇 추천 API
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지
├── lib/
│   ├── openai.ts                # OpenAI API 연동
│   └── robots.ts                # 로봇 데이터
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔧 개발

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 