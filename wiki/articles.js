/**
 * DoraPage Wiki - Articles (Add-on)
 *
 * 새 글을 추가하려면 아래 배열에 객체를 하나 추가하면 됩니다.
 * 자세한 가이드는 README.md를 참고하세요.
 *
 * 필드 설명:
 *   id       : 고유 식별자 (영문, 하이픈 가능)
 *   title    : 글 제목
 *   category : 카테고리 (예: "Algorithm", "AI", "Architecture", "Database", "Network", "Security")
 *   date     : 작성일 (YYYY-MM-DD)
 *   summary  : 카드에 보이는 한줄 요약
 *   format   : "md" (Markdown) 또는 생략 시 HTML로 처리
 *   content  : 펼쳤을 때 보이는 본문 (Markdown 또는 HTML 문자열)
 *
 * Markdown 예시:
 *   {
 *     id: "big-o-notation",
 *     title: "Big-O 표기법, 왜 중요할까?",
 *     category: "Algorithm",
 *     date: "2026-04-13",
 *     summary: "for문 하나면 O(n), 두 개 중첩하면 O(n²) — 근데 이게 실제로 얼마나 차이 나는 걸까?",
 *     format: "md",
 *     content: `
 * ## 시간 복잡도란?
 *
 * 알고리즘이 **입력 크기(n)**에 따라 얼마나 오래 걸리는지를 나타내는 척도입니다.
 *
 * ### 주요 복잡도 비교
 *
 * | 표기법 | 이름 | 예시 |
 * |--------|------|------|
 * | O(1) | 상수 | 배열 인덱스 접근 |
 * | O(log n) | 로그 | 이진 탐색 |
 * | O(n) | 선형 | 단순 반복문 |
 * | O(n²) | 이차 | 중첩 반복문 |
 *
 * > 면접에서 자주 물어보는 핵심 개념!
 *
 * \`\`\`javascript
 * // O(n) 예시
 * for (let i = 0; i < n; i++) {
 *   console.log(i);
 * }
 * \`\`\`
 *     `
 *   },
 *
 * HTML 예시 (기존 방식도 계속 지원):
 *   {
 *     id: "example-html",
 *     title: "HTML 방식 글",
 *     category: "Algorithm",
 *     date: "2026-04-13",
 *     summary: "HTML로 작성한 글도 동작합니다.",
 *     content: `
 *       <p>본문을 여기에 작성합니다.</p>
 *       <h4>소제목</h4>
 *       <p>내용...</p>
 *     `
 *   },
 */
window.DoraWiki = [
  {
    id: "markdown-demo",
    title: "Markdown 렌더링 테스트",
    category: "Guide",
    date: "2026-04-13",
    summary: "위키에서 Markdown이 어떻게 렌더링되는지 보여주는 데모 글입니다.",
    format: "md",
    content: `
## Markdown 문법 데모

이 글은 **Markdown**으로 작성되었습니다. \`format: "md"\`만 추가하면 됩니다!

### 텍스트 스타일

- **굵게** / *기울임* / ~~취소선~~
- \`인라인 코드\`도 지원합니다

### 코드 블록

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10)); // 55
\`\`\`

### 인용문

> 도라에몽의 주머니에서 꺼낸 듯한 마크다운 렌더링!

### 표

| 문법 | 결과 |
|------|------|
| \`**bold**\` | **bold** |
| \`*italic*\` | *italic* |
| \`~~strike~~\` | ~~strike~~ |
| \`\\\`code\\\`\` | \`code\` |

### 순서 있는 목록

1. Markdown으로 글 작성
2. \`format: "md"\` 추가
3. 자동 렌더링 완료!

---

*이 글은 위키 Markdown 기능 데모입니다.*
    `
  },
];
