# 온도 🌡️ - 광안리 로컬 맛집 지도

광안리의 따뜻한 공간을 발견하세요.

## 시작하기

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 API 키 입력

# 개발 서버 실행
npm run dev
```

## 기술 스택

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Map**: React-Leaflet + Leaflet
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 디렉토리 구조

```
src/
├── api/          # API 레이어
├── components/   # UI 컴포넌트
│   ├── common/   # 공통 컴포넌트
│   ├── map/      # 지도 관련
│   └── bottomSheet/
├── contexts/     # React Context
├── hooks/        # 커스텀 훅
├── constants/    # 상수
├── types/        # TypeScript 타입
├── utils/        # 유틸리티
└── styles/       # 스타일
```

## 기능

- 🗺️ 광안리 지역 맛집/카페/바/디저트 지도
- 🔍 장소 추천 (별도 랜딩 페이지 있음)
- 📂 카테고리 필터링
- 📱 모바일 최적화 UI
- 📝 장소 리스트 형 안내
