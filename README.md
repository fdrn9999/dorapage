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
  cannon.js              # 공기포 스크롤 디바이더
  sections.js            # ScrollTrigger 애니메이션
  wiki-loader.js         # 위키 렌더링 엔진 (페이지네이션, 필터)
wiki/
  articles.js            # ← 위키 글 데이터 (Add-on!)
assets/images/           # 도라에몽 이미지
```

---

## Wiki Add-on 가이드

위키는 **add-on 방식**으로 동작합니다. `wiki/articles.js` 파일 하나만 수정하면 됩니다.

### 글 추가하기

`wiki/articles.js`를 열고 배열에 객체를 하나 추가하세요:

```js
window.DoraWiki = [
  // 기존 글들...

  // ↓ 새 글 추가
  {
    id: "my-new-article",       // 고유 ID (영문, 하이픈)
    title: "글 제목",            // 카드에 표시될 제목
    category: "Algorithm",      // 카테고리 (필터에 자동 추가됨)
    date: "2026-04-20",         // 작성일
    summary: "한줄 요약...",     // 카드 미리보기 텍스트
    content: `                  // 본문 (HTML)
      <p>여기에 본문을 작성합니다.</p>
      <h4>소제목</h4>
      <p>내용...</p>
    `
  },
];
```

### 필드 설명

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | 고유 식별자. 영문 소문자 + 하이픈 권장 |
| `title` | string | 글 제목 |
| `category` | string | 카테고리명. 새 카테고리를 쓰면 필터에 자동 추가 |
| `date` | string | 작성일 (YYYY-MM-DD) |
| `summary` | string | 카드에 보이는 요약 (1~2문장) |
| `content` | string | 펼쳤을 때 보이는 본문. HTML 태그 사용 가능 |

### 본문에서 사용 가능한 HTML 태그

```html
<p>문단</p>
<h4>소제목</h4>
<strong>굵게</strong>, <em>기울임</em>
<code>인라인 코드</code>
<ul><li>리스트</li></ul>
<table><tr><th>헤더</th><td>데이터</td></tr></table>
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

### 예시: 새 글 작성

```js
{
  id: "tcp-handshake",
  title: "TCP 3-Way Handshake, 왜 3번?",
  category: "Network",
  date: "2026-04-20",
  summary: "TCP 연결이 왜 꼭 3번 악수해야 하는지, 2번이면 안 되는 이유.",
  content: `
    <p>TCP 연결은 3단계로 이루어집니다...</p>

    <h4>도라에몽 비유</h4>
    <p>도라에몽이 노비타에게 도구를 빌려주는 과정이라면...</p>
    <ul>
      <li><strong>SYN:</strong> "도라에몽, 타케콥터 빌려줘!" (요청)</li>
      <li><strong>SYN-ACK:</strong> "응 있어! 받을 준비 됐어?" (확인+준비)</li>
      <li><strong>ACK:</strong> "됐어, 보내줘!" (최종 확인)</li>
    </ul>

    <h4>왜 2번이면 안 될까?</h4>
    <p>2번만 하면 서버는 클라이언트가 진짜 받을 준비가 됐는지 모릅니다.
    오래된 요청이 늦게 도착해서 유령 연결이 생길 수 있거든요.</p>
  `
},
```

## Deploy

```bash
git push origin main
```

GitHub Actions가 자동으로 Pages에 배포합니다.
