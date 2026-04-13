# DoraPage

도라에몽 테마 개발자 포트폴리오 + Wiki 시스템

**Live:** https://fdrn9999.github.io/dorapage/

## Quick Start

```bash
npx live-server
```

## 구조

```
index.html              # 메인 페이지
css/
  variables.css         # 도라에몽 컬러 팔레트, 디자인 토큰
  styles.css            # 전체 스타일 (레이아웃, 컴포넌트, 반응형)
js/
  main.js               # 어디로든 문 인트로 + 히어로 애니메이션
  navigation.js          # 네비게이션, 스무스 스크롤
  pocket.js              # 사차원 주머니 (스킬 카드)
  cannon.js              # 공기포 스프라이트 애니메이션 (발사 모션)
  sections.js            # ScrollTrigger 애니메이션
  wiki-loader.js         # 위키 렌더링 엔진 (페이지네이션, 필터)
wiki/
  articles.js            # ← 위키 글 데이터 (Add-on!)
assets/images/           # 도라에몽 이미지 + 스프라이트 (공기포, 발사 모션)
```

---

## Wiki Add-on 가이드

위키는 **add-on 방식**으로 동작합니다. `wiki/articles.js` 파일 하나만 수정하면 됩니다.

### 글 추가하기 (Markdown)

`wiki/articles.js`를 열고 배열에 객체를 하나 추가하세요. **`format: "md"`**를 넣으면 Markdown으로 작성할 수 있습니다:

```js
window.DoraWiki = [
  // 기존 글들...

  // ↓ 새 글 추가 (Markdown)
  {
    id: "my-new-article",       // 고유 ID (영문, 하이픈)
    title: "글 제목",            // 카드에 표시될 제목
    category: "Algorithm",      // 카테고리 (필터에 자동 추가됨)
    date: "2026-04-20",         // 작성일
    summary: "한줄 요약...",     // 카드 미리보기 텍스트
    format: "md",               // ← Markdown 사용!
    content: `
## 소제목

여기에 **Markdown**으로 본문을 작성합니다.

- 리스트 항목 1
- 리스트 항목 2

> 인용문도 됩니다

\`\`\`javascript
console.log("코드 블록도 지원!");
\`\`\`
    `
  },
];
```

### 필드 설명

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | O | 고유 식별자. 영문 소문자 + 하이픈 권장 |
| `title` | string | O | 글 제목 |
| `category` | string | O | 카테고리명. 새 카테고리를 쓰면 필터에 자동 추가 |
| `date` | string | O | 작성일 (YYYY-MM-DD) |
| `summary` | string | O | 카드에 보이는 요약 (1~2문장) |
| `format` | string | - | `"md"` 시 Markdown 렌더링. 생략하면 HTML로 처리 |
| `content` | string | O | 펼쳤을 때 보이는 본문 (Markdown 또는 HTML) |

### Markdown에서 사용 가능한 문법

```markdown
## 제목 (h2~h6)
**굵게**, *기울임*, ~~취소선~~
`인라인 코드`

- 순서 없는 리스트
1. 순서 있는 리스트

> 인용문

| 헤더 | 헤더 |
|------|------|
| 데이터 | 데이터 |

\`\`\`javascript
// 코드 블록 (언어 지정 가능)
\`\`\`

[링크](https://example.com)
![이미지](url)
---  (구분선)
```

### HTML로 작성하기 (기존 방식)

`format` 필드를 생략하면 기존처럼 HTML 문자열로 작성할 수 있습니다:

```js
{
  id: "html-example",
  title: "HTML 방식 글",
  category: "Algorithm",
  date: "2026-04-20",
  summary: "HTML로 작성한 글.",
  content: `
    <p>문단</p>
    <h4>소제목</h4>
    <code>인라인 코드</code>
    <ul><li>리스트</li></ul>
  `
},
```

### 카테고리 예시

자유롭게 만들 수 있습니다. 새 카테고리명을 쓰면 필터 버튼이 자동 생성됩니다.

- `Algorithm` - 알고리즘, 자료구조
- `AI` - 인공지능, 머신러닝
- `Architecture` - MSA, 디자인 패턴
- `Database` - DB 이론, 쿼리 최적화
- `Network` - 네트워크, 프로토콜
- `OS` - 운영체제
- `Security` - 보안
- `DevOps` - CI/CD, 컨테이너

### 페이지네이션

페이지당 **6개 글**이 표시됩니다. 글이 6개를 초과하면 하단에 페이지 번호가 자동 생성됩니다.

### 예시: Markdown으로 새 글 작성

```js
{
  id: "tcp-handshake",
  title: "TCP 3-Way Handshake, 왜 3번?",
  category: "Network",
  date: "2026-04-20",
  summary: "TCP 연결이 왜 꼭 3번 악수해야 하는지, 2번이면 안 되는 이유.",
  format: "md",
  content: `
## TCP 연결은 3단계

### 도라에몽 비유

도라에몽이 노비타에게 도구를 빌려주는 과정이라면...

- **SYN:** "도라에몽, 타케콥터 빌려줘!" (요청)
- **SYN-ACK:** "응 있어! 받을 준비 됐어?" (확인+준비)
- **ACK:** "됐어, 보내줘!" (최종 확인)

### 왜 2번이면 안 될까?

2번만 하면 서버는 클라이언트가 **진짜 받을 준비가 됐는지** 모릅니다.
오래된 요청이 늦게 도착해서 유령 연결이 생길 수 있거든요.

> 핵심: 3-way는 양쪽 모두 송수신 가능 상태를 확인하기 위한 최소 단계!
  `
},
```

## Deploy

```bash
git push origin main
```

GitHub Actions가 자동으로 Pages에 배포합니다.
