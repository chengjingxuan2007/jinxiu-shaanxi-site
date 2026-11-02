(function () {
  'use strict';

  const I18N = {
    zh: {
      home: '首页', portal: '探索陕西', scenic: '特色风景', culture: '民俗文化', food: '特色美食',
      search: '搜索', searchTitle: '寻找你的陕西印象', searchPlaceholder: '输入城市、风景、非遗或美食…',
      searchHint: '试试“西安”“城固”“皮影”或“面皮”', searchEmpty: '没有找到相关内容，换个关键词试试。',
      scenicType: '风景', cultureType: '民俗', foodType: '美食', viewDetail: '阅读详情', close: '关闭',
      footerSlogan: '山河为卷，文明为墨。沿着地理与时间的脉络，重新遇见陕西。',
      explore: '开始探索', navigation: '网站导航', regions: '城市索引', all: '全部',
      copyright: '© 2026 锦绣陕西 · 陕西文化数字图志', crafted: '以当代设计，叙千年文明'
    },
    en: {
      home: 'Home', portal: 'Explore', scenic: 'Landscapes', culture: 'Culture', food: 'Flavours',
      search: 'Search', searchTitle: 'Find your Shaanxi story', searchPlaceholder: 'City, landscape, heritage or food…',
      searchHint: 'Try “Xi’an”, “Chenggu”, “shadow puppetry” or “noodles”', searchEmpty: 'No stories found. Try another keyword.',
      scenicType: 'Landscape', cultureType: 'Culture', foodType: 'Flavour', viewDetail: 'Read story', close: 'Close',
      footerSlogan: 'Landscapes as scrolls, civilisation as ink. Encounter Shaanxi through place and time.',
      explore: 'Explore', navigation: 'Navigation', regions: 'Regions', all: 'All',
      copyright: '© 2026 Splendid Shaanxi · A Digital Cultural Atlas', crafted: 'Contemporary design, enduring stories'
    }
  };

  let memoryLang = null; /* 兜底：file:// 或隐私模式下 localStorage 不可用时，仍能切换语言 */
  function getLang() {
    if (memoryLang) return memoryLang;
    try { return localStorage.getItem('sx-language') || 'zh'; } catch (e) { return 'zh'; }
  }
  function t(key) { return (I18N[getLang()] && I18N[getLang()][key]) || I18N.zh[key] || key; }
  function field(item, base) {
    if (!item) return '';
    return getLang() === 'en' ? (item[base + 'En'] || item[base] || '') : (item[base] || '');
  }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
  }
  function icon(name) {
    const icons = {
      arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg>',
      menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
      zoom: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4 4M10.5 7.5v6M7.5 10.5h6"/></svg>'
    };
    return icons[name] || '';
  }

  function setLang(lang) {
    const next = lang === 'en' ? 'en' : 'zh';
    memoryLang = next;
    try { localStorage.setItem('sx-language', next); } catch (e) {}
    document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';
    applyTranslations();
    document.querySelectorAll('.lang-toggle').forEach(btn => { btn.textContent = next === 'en' ? '中 / EN' : 'EN / 中'; });
    window.dispatchEvent(new CustomEvent('sx:language', { detail: next }));
  }

  function applyTranslations(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    (root || document).querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    (root || document).querySelectorAll('[data-zh][data-en]').forEach(el => { el.textContent = getLang() === 'en' ? el.dataset.en : el.dataset.zh; });
  }

  function currentPage() {
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    return page === 'main' ? 'index' : page;
  }

  /* 顶部下拉菜单：按城市把这一页的全部条目列出来，一个都不漏 */
  function navDrop(id) {
    const D = window.SX_DATA;
    if (!D) return '';
    const en = getLang() === 'en';
    const nm = item => esc(en ? (item.nameEn || item.name) : item.name);

    /* 探索陕西：城市直达 */
    if (id === 'portal') {
      const cities = (D.cities || []).map(city =>
        '<a class="nd-city" href="./scenic.html?city=' + encodeURIComponent(city.name) + '"' +
        ' data-zh="' + esc(city.name) + '" data-en="' + esc(city.nameEn || city.name) + '">' + nm(city) + '</a>'
      ).join('');
      return '<div class="nav-drop"><div class="nd-inner">' +
        '<div class="nd-head"><span class="eyebrow" data-zh="城市直达 · 点一座城，看它的风景" data-en="Jump straight to a city">城市直达 · 点一座城，看它的风景</span></div>' +
        '<div class="nd-cities">' + cities + '</div></div></div>';
    }

    const spec = {
      scenic: { items: D.spots, base: './scenic.html', unitZh: ' 处风景', unitEn: ' landscapes' },
      culture: { items: D.cultures, base: './culture.html', unitZh: ' 项手艺', unitEn: ' crafts' },
      food: { items: D.foods, base: './food.html', unitZh: ' 道菜', unitEn: ' dishes' }
    }[id];
    if (!spec || !spec.items || !spec.items.length) return '';

    const items = spec.items;
    const unit = en ? spec.unitEn : spec.unitZh;
    const groups = [];
    (D.cities || []).forEach(city => {
      const list = items.filter(it => it.cityId === city.id);
      if (list.length) groups.push({ city: city, list: list });
    });
    const orphan = items.filter(it => !it.cityId || !(D.cities || []).some(c => c.id === it.cityId));
    if (orphan.length) groups.push({ city: null, list: orphan });

    /* 一行一座城：左边城市名，右边横排这座城的全部条目，紧凑且不漏 */
    const rows = groups.map(g => {
      const zh = (g.city ? g.city.name : '其它') + ' · ' + g.list.length;
      const enTitle = (g.city ? (g.city.nameEn || g.city.name) : 'Other') + ' · ' + g.list.length;
      return '<div class="nd-row">' +
        '<span class="nd-title" data-zh="' + esc(zh) + '" data-en="' + esc(enTitle) + '">' + esc(en ? enTitle : zh) + '</span>' +
        '<div class="nd-row-items">' + g.list.map(it =>
          '<a href="' + spec.base + '?detail=' + encodeURIComponent(it.id) + '"' +
          ' data-zh="' + esc(it.name) + '" data-en="' + esc(it.nameEn || it.name) + '">' + nm(it) + '</a>'
        ).join('') + '</div></div>';
    }).join('');

    return '<div class="nav-drop"><div class="nd-inner">' +
      '<div class="nd-head">' +
        '<span class="eyebrow" data-zh="按城市浏览 · 共 ' + items.length + unit + '" data-en="By city · ' + items.length + unit + '">按城市浏览 · 共 ' + items.length + unit + '</span>' +
        '<a class="nd-all" href="' + spec.base + '" data-zh="查看全部 →" data-en="See all →">查看全部 →</a>' +
      '</div>' +
      '<div class="nd-rows">' + rows + '</div></div></div>';
  }

  function buildNav() {
    const mount = document.getElementById('site-nav');
    if (!mount) return;
    const page = currentPage();
    const links = [
      ['index', 'home', './main.html'], ['portal', 'portal', './portal.html'],
      ['scenic', 'scenic', './scenic.html'], ['culture', 'culture', './culture.html'], ['food', 'food', './food.html']
    ];
    mount.innerHTML = `
      <nav class="nav" aria-label="Primary navigation">
        <div class="nav-inner">
          <a class="nav-brand" href="./main.html" aria-label="Splendid Shaanxi">
            <span class="brand-seal"><span>秦</span></span>
            <span class="brand-copy"><span class="brand-name">锦绣陕西</span><span class="brand-en">Splendid Shaanxi</span></span>
          </a>
          <div class="nav-menu" id="navMenu">
            <ul class="nav-links">${links.map(([id, key, href]) => {
              const drop = navDrop(id);
              return '<li class="nav-item' + (drop ? ' has-drop' : '') + '">' +
                '<a class="' + (page === id ? 'active' : '') + '" href="' + href + '" data-i18n="' + key + '">' + t(key) + '</a>' +
                (drop ? '<button class="nd-toggle" type="button" aria-label="展开子菜单">▾</button>' + drop : '') +
                '</li>';
            }).join('')}</ul>
            <div class="nav-actions">
              <button class="icon-btn" id="searchBtn" aria-label="${t('search')}">${icon('search')}</button>
              <button class="lang-toggle" id="langToggle" aria-label="Switch language">${getLang() === 'en' ? '中 / EN' : 'EN / 中'}</button>
            </div>
          </div>
          <button class="icon-btn nav-toggle" id="navToggle" aria-label="Menu">${icon('menu')}</button>
        </div>
      </nav>`;
    document.getElementById('navToggle').addEventListener('click', () => document.getElementById('navMenu').classList.toggle('open'));
    /* 窄屏：点 ▾ 展开子菜单（宽屏靠 hover） */
    mount.querySelectorAll('.nd-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const item = btn.closest('.nav-item');
        const wasOpen = item.classList.contains('open');
        mount.querySelectorAll('.nav-item.open').forEach(el => el.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
    document.getElementById('searchBtn').addEventListener('click', openSearch);
    document.getElementById('langToggle').addEventListener('click', () => setLang(getLang() === 'zh' ? 'en' : 'zh'));
  }

  function buildFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand"><h2>锦绣陕西</h2><div class="footer-en">SPLENDID SHAANXI</div><p data-i18n="footerSlogan">${t('footerSlogan')}</p></div>
            <div><h3 data-i18n="navigation">${t('navigation')}</h3><ul class="footer-links"><li><a href="./scenic.html" data-i18n="scenic">${t('scenic')}</a></li><li><a href="./culture.html" data-i18n="culture">${t('culture')}</a></li><li><a href="./food.html" data-i18n="food">${t('food')}</a></li></ul></div>
            <div><h3 data-i18n="regions">${t('regions')}</h3><ul class="footer-links"><li><a href="./scenic.html?city=${encodeURIComponent('西安')}">西安 · Xi’an</a></li><li><a href="./scenic.html?city=${encodeURIComponent('城固')}">城固 · Chenggu</a></li><li><a href="./portal.html" data-i18n="portal">${t('portal')}</a></li></ul></div>
          </div>
          <div class="footer-bottom"><span data-i18n="copyright">${t('copyright')}</span><span data-i18n="crafted">${t('crafted')}</span></div>
        </div>
      </footer>`;
  }

  function buildOverlays() {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-label="Search">
        <button class="overlay-close" data-close="searchOverlay" aria-label="Close">×</button>
        <div class="search-panel"><div class="search-kicker">DISCOVER SHAANXI</div><h2 class="search-title" data-i18n="searchTitle">${t('searchTitle')}</h2>
          <div class="search-field">${icon('search')}<input id="globalSearch" type="search" data-i18n-placeholder="searchPlaceholder" placeholder="${t('searchPlaceholder')}" autocomplete="off"></div>
          <div class="search-results" id="searchResults"></div><p class="search-hint" data-i18n="searchHint">${t('searchHint')}</p>
        </div>
      </div>
      <div class="overlay" id="detailOverlay" role="dialog" aria-modal="true"><div class="detail-dialog" id="detailDialog"></div></div>
      <div class="overlay" id="lightboxOverlay" role="dialog" aria-modal="true"><button class="overlay-close" data-close="lightboxOverlay" aria-label="Close">×</button><div class="lightbox-content"><img id="lightboxImage" alt=""></div><div class="lightbox-caption" id="lightboxCaption"></div></div>
      <div class="overlay" id="videoOverlay" role="dialog" aria-modal="true"><button class="overlay-close" data-close="videoOverlay" aria-label="Close">×</button><div class="video-dialog"><video id="modalVideo" controls playsinline></video></div></div>
      <button class="back-top" id="backTop" aria-label="Back to top">↑</button>`);

    document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => closeOverlay(btn.dataset.close)));
    document.querySelectorAll('.overlay').forEach(overlay => overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(overlay.id); }));
    document.getElementById('globalSearch').addEventListener('input', e => renderSearch(e.target.value));
    document.getElementById('backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.querySelectorAll('.overlay.open').forEach(el => closeOverlay(el.id));
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    });
  }

  function openOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    document.body.classList.add('modal-open');
  }
  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    if (id === 'videoOverlay') { const video = document.getElementById('modalVideo'); if (video) video.pause(); }
    if (!document.querySelector('.overlay.open') && !document.querySelector('.language-gate.open')) document.body.classList.remove('modal-open');
  }

  function openSearch() {
    openOverlay('searchOverlay');
    const input = document.getElementById('globalSearch');
    renderSearch(input.value);
    setTimeout(() => input.focus(), 180);
  }

  function allSearchItems() {
    const data = window.SX_DATA || {};
    return [
      ...(data.spots || []).map(item => ({ item, type: 'scenic' })),
      ...(data.cultures || []).map(item => ({ item, type: 'culture' })),
      ...(data.foods || []).map(item => ({ item, type: 'food' }))
    ];
  }

  function renderSearch(query) {
    const q = query.trim().toLowerCase();
    const matches = (q ? allSearchItems().filter(({ item }) => [item.name, item.nameEn, item.city, item.location, item.desc, item.descEn].join(' ').toLowerCase().includes(q)) : allSearchItems().filter((_, i) => i % 8 === 0)).slice(0, 12);
    const mount = document.getElementById('searchResults');
    mount.innerHTML = matches.length ? matches.map(({ item, type }) => `
      <a class="search-result" href="./${type}.html?detail=${item.id}">
        <img src="${item.img}" alt="${esc(field(item, 'name'))}"><div><h3>${esc(field(item, 'name'))}</h3><p>${esc(item.city)} · ${esc(item.location || '')}</p></div><span class="search-result-type">${t(type + 'Type')}</span>
      </a>`).join('') : `<p class="empty-state">${t('searchEmpty')}</p>`;
  }

  function openDetail(item, type) {
    if (!item) return;
    const dialog = document.getElementById('detailDialog');
    dialog.innerHTML = `
      <button class="overlay-close" data-close-detail aria-label="Close">×</button>
      <div class="detail-image"><img src="${item.img}" alt="${esc(field(item, 'name'))}"></div>
      <div class="detail-copy"><div class="eyebrow">${t((type || 'scenic') + 'Type')} · ${String(item.n || '').padStart(2, '0')}</div><h2>${esc(field(item, 'name'))}</h2><p class="detail-location">${esc(item.city || '')}${item.location ? ' · ' + esc(item.location) : ''}</p><div class="detail-desc">${esc(field(item, 'desc'))}</div></div>`;
    dialog.querySelector('[data-close-detail]').addEventListener('click', () => closeOverlay('detailOverlay'));
    openOverlay('detailOverlay');
  }

  function openLightbox(src, caption) {
    const img = document.getElementById('lightboxImage');
    img.src = src;
    img.alt = caption || '';
    document.getElementById('lightboxCaption').textContent = caption || '';
    openOverlay('lightboxOverlay');
  }

  function openVideo(src, title) {
    const video = document.getElementById('modalVideo');
    video.src = src;
    video.title = title || '';
    openOverlay('videoOverlay');
    video.play().catch(() => {});
  }

  let revealObserver;
  function observeReveals(root) {
    if (!('IntersectionObserver' in window)) { (root || document).querySelectorAll('.reveal').forEach(el => el.classList.add('in')); return; }
    if (!revealObserver) revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); } }), { threshold: .08, rootMargin: '0px 0px -40px' });
    (root || document).querySelectorAll('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
  }

  function init() {
    document.documentElement.lang = getLang() === 'en' ? 'en' : 'zh-CN';
    buildNav();
    buildFooter();
    buildOverlays();
    applyTranslations();
    observeReveals();
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
      const back = document.getElementById('backTop');
      if (back) back.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
  }

  window.SX_APP = { t, field, esc, icon, getLang, setLang, applyTranslations, openDetail, openLightbox, openVideo, openOverlay, closeOverlay, openSearch, observeReveals };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
