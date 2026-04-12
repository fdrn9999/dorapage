# DoraPage - Doraemon-Themed Developer Portfolio

## Project Overview
도라에몽 테마 개발자 포트폴리오 싱글페이지. GitHub Pages로 배포.
URL: https://fdrn9999.github.io/dorapage/

## Tech Stack
- Vanilla HTML/CSS/JS (빌드 도구 없음)
- GSAP 3.12 (CDN): ScrollTrigger, ScrollToPlugin
- Google Fonts: Inter, Poppins

## Structure
```
index.html          # 싱글페이지 전체 마크업
css/variables.css   # 도라에몽 컬러 팔레트, 디자인 토큰
css/styles.css      # 전체 스타일 (레이아웃, 컴포넌트, 반응형)
js/main.js          # GSAP 초기화, 어디로든 문 인트로, 히어로 애니메이션
js/navigation.js    # 네비게이션, 스무스 스크롤, 모바일 메뉴
js/pocket.js        # 사차원 주머니 인터랙션 (스킬 카드 등장)
js/cannon.js        # 공기포 스크롤 애니메이션
js/sections.js      # 섹션별 ScrollTrigger 애니메이션
assets/images/      # 도라에몽 PNG, 도라야끼 이미지
```

## Key Sections & Interactions
1. **어디로든 문 인트로** - 풀스크린 핑크 문, 클릭→3D 열림→zoom in→포트폴리오 진입
2. **히어로** - 도라에몽 PNG 등장 애니메이션 + 부유 효과
3. **Skills** - 사차원 주머니(위 직선, 아래 반달) 클릭→스킬 카드 비행 등장
4. **Projects** - 공기포 동심원 디바이더 후 프로젝트 카드
5. **Contact** - 도라야끼 사주기 (도라에몽+도라야끼 이미지)

## Deploy
`git push origin main` → GitHub Actions가 자동으로 Pages 배포

## Dev
`npx live-server` 로 로컬 개발 서버 실행

## Design Notes
- 도라에몽 이미지는 외부 PNG 사용 (assets/images/)
- SVG는 주머니, 공기포 등 인터랙티브 요소에만 사용
- 반응형: 768px (태블릿), 480px (모바일) 브레이크포인트
- prefers-reduced-motion 지원
