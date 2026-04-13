/**
 * DoraPage - Wiki Loader
 * wiki/articles.js의 DoraWiki 데이터를 읽어 위키 섹션을 렌더링합니다.
 * 카테고리 필터 + 페이지네이션 + 펼치기/접기 지원.
 *
 * NOTE: article.content는 개발자가 직접 작성하는 wiki/articles.js에서만 오므로
 * innerHTML 사용이 안전합니다 (외부/사용자 입력이 아님).
 */

document.addEventListener('DOMContentLoaded', () => {
  const articles = window.DoraWiki || [];
  const grid = document.getElementById('wikiGrid');
  const filtersEl = document.getElementById('wikiFilters');
  const paginationEl = document.getElementById('wikiPagination');
  const emptyEl = document.getElementById('wikiEmpty');

  if (!grid) return;

  const PER_PAGE = 6;
  let currentPage = 1;
  let currentCategory = 'all';

  if (articles.length === 0) {
    emptyEl.style.display = 'block';
    return;
  }

  buildFilters();
  render();

  function buildFilters() {
    const categories = ['all', ...new Set(articles.map(a => a.category))];
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'wiki__filter' + (cat === 'all' ? ' wiki__filter--active' : '');
      btn.dataset.category = cat;
      btn.textContent = cat === 'all' ? 'All' : cat;
      btn.addEventListener('click', () => {
        currentCategory = cat;
        currentPage = 1;
        filtersEl.querySelectorAll('.wiki__filter').forEach(b =>
          b.classList.toggle('wiki__filter--active', b.dataset.category === currentCategory)
        );
        render();
      });
      filtersEl.appendChild(btn);
    });
  }

  function getFiltered() {
    if (currentCategory === 'all') return articles;
    return articles.filter(a => a.category === currentCategory);
  }

  function createCard(article) {
    const card = document.createElement('article');
    card.className = 'wiki-card';
    card.dataset.id = article.id;

    // Header
    const header = document.createElement('div');
    header.className = 'wiki-card__header';
    const categorySpan = document.createElement('span');
    categorySpan.className = 'wiki-card__category';
    categorySpan.textContent = article.category;
    const dateSpan = document.createElement('span');
    dateSpan.className = 'wiki-card__date';
    dateSpan.textContent = article.date;
    header.appendChild(categorySpan);
    header.appendChild(dateSpan);

    // Title
    const title = document.createElement('h3');
    title.className = 'wiki-card__title';
    title.textContent = article.title;

    // Summary
    const summary = document.createElement('p');
    summary.className = 'wiki-card__summary';
    summary.textContent = article.summary;

    // Content (HTML or Markdown from trusted local source)
    const content = document.createElement('div');
    content.className = 'wiki-card__content';
    content.style.display = 'none';
    // Safe: content comes from developer's own wiki/articles.js, not user input
    if (article.format === 'md' && typeof marked !== 'undefined') {
      content.innerHTML = marked.parse(article.content);  // eslint-disable-line no-unsanitized/property
    } else {
      content.innerHTML = article.content;  // eslint-disable-line no-unsanitized/property
    }

    // Toggle button
    const toggle = document.createElement('button');
    toggle.className = 'wiki-card__toggle';
    const toggleText = document.createElement('span');
    toggleText.className = 'wiki-card__toggle-text';
    toggleText.textContent = '\uB354 \uC77D\uAE30';
    toggle.appendChild(toggleText);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'wiki-card__toggle-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M6 9l6 6 6-6');
    svg.appendChild(path);
    toggle.appendChild(svg);

    toggle.addEventListener('click', () => {
      const isOpen = card.classList.contains('wiki-card--open');
      if (isOpen) {
        content.style.display = 'none';
        card.classList.remove('wiki-card--open');
        toggleText.textContent = '\uB354 \uC77D\uAE30';
      } else {
        content.style.display = 'block';
        card.classList.add('wiki-card--open');
        toggleText.textContent = '\uC811\uAE30';
      }
    });

    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(content);
    card.appendChild(toggle);

    return card;
  }

  function render() {
    const filtered = getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PER_PAGE;
    const pageItems = filtered.slice(start, start + PER_PAGE);

    // Clear grid
    grid.textContent = '';

    if (filtered.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'wiki__no-results';
      msg.textContent = '\uD574\uB2F9 \uCE74\uD14C\uACE0\uB9AC\uC5D0 \uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.';
      grid.appendChild(msg);
      paginationEl.textContent = '';
      return;
    }

    pageItems.forEach(article => grid.appendChild(createCard(article)));

    // Pagination
    paginationEl.textContent = '';
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'wiki__page' + (i === currentPage ? ' wiki__page--active' : '');
        btn.textContent = i;
        btn.addEventListener('click', () => {
          currentPage = i;
          render();
          document.getElementById('wiki').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        paginationEl.appendChild(btn);
      }
    }
  }
});
