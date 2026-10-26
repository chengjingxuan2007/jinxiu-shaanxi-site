(function () {
  'use strict';

  const D = window.SX_DATA || { videos: {}, posters: [], heritage: [], cultures: [] };
  const APP = window.SX_APP;
  const state = { cityId: null, craftId: null, view: 'city' };

  function lang() { return APP.getLang(); }
  function F(item, base) { return APP.field(item, base); }
  function esc(v) { return APP.esc(v); }
  function cityById(id) { return (D.cities || []).find(c => c.id === id); }
  function cityName(item) {
    const obj = cityById(item.cityId);
    return lang() === 'en' ? ((obj && obj.nameEn) || item.city) : item.city;
  }
  function craftsOf(cityId) { return D.cultures.filter(c => c.cityId === cityId).length; }
  function craftList(cityId) { return D.cultures.filter(c => c.cityId === cityId); }
  function craftById(id) { return D.cultures.find(c => c.id === id); }
  function en() { return lang() === 'en'; }

  /* 条目的地图定位点：优先用 data.js 的 geo，没有就退回所属城市 */
  function coordOf(item) {
    const geo = D.geo || {};
    if (geo[item.id]) return geo[item.id];
    const city = cityById(item.cityId);
    return city && window.SX_MAP ? window.SX_MAP.cityLngLat(city) : null;
  }

  function focusItem(item) {
    if (!atlas || !window.SX_MAP || !item) return;
    atlas.focusOn(coordOf(item), en() ? (item.nameEn || item.name) : item.name);
  }

  /* ---------- 04 地图：天地图真实底图 + 非遗目录 ---------- */
  let atlas = null;

  function renderMap() {
    const stage = document.getElementById('cultureMap');
    if (!stage || !window.SX_MAP) return;
    if (!atlas) atlas = window.SX_MAP.create(stage, { interactive: false, mask: true, maskColor: 'rgba(38,52,47,1)' });
    if (!atlas) return;
    atlas.clearMarkers();
    const english = lang() === 'en';
    (D.cities || []).forEach(city => {
      const total = craftsOf(city.id);
      atlas.addMarker(city, {
        county: city.county,
        major: city.major,
        disabled: total === 0,
        label: english ? city.nameEn : city.name,
        onClick: () => openCity(city.id)
      });
    });
    highlight();
  }

  function highlight() {
    document.querySelectorAll('#cultureMap .map-marker').forEach(el => {
      el.classList.toggle('active', el.dataset.id === state.cityId);
    });
  }

  /* ---------- 右侧抽屉（广西模板同款：地图后退 + 面板滑出） ---------- */
  function panelEls() {
    return {
      panel: document.getElementById('detailPanel'),
      wrap: document.getElementById('cultureWrap'),
      img: document.getElementById('dpImg'),
      kicker: document.getElementById('dpKicker'),
      title: document.getElementById('dpTitle'),
      sub: document.getElementById('dpSub'),
      body: document.getElementById('dpBody')
    };
  }

  function showPanel() {
    const el = panelEls();
    if (!el.panel) return;
    el.panel.classList.add('open');
    el.panel.setAttribute('aria-hidden', 'false');
    if (el.wrap) el.wrap.classList.add('push-back');
    document.querySelectorAll('#cultureMap .map-marker').forEach(m => {
      m.classList.toggle('dimmed', m.dataset.id !== state.cityId);
    });
  }

  function closePanel() {
    const el = panelEls();
    if (!el.panel) return;
    el.panel.classList.remove('open');
    el.panel.setAttribute('aria-hidden', 'true');
    if (el.wrap) el.wrap.classList.remove('push-back');
    document.querySelectorAll('#cultureMap .map-marker').forEach(m => m.classList.remove('dimmed'));
    syncPicker(state.cityId, '');
    if (atlas) atlas.resetView();
  }

  function listHTML(items) {
    return items.map(item => {
      const name = en() ? item.nameEn : item.name;
      return '<button class="dp-item" data-id="' + item.id + '">' +
        '<img src="' + item.img + '" alt="' + esc(name) + '" loading="lazy">' +
        '<span class="dp-item-copy"><strong>' + esc(name) + '</strong>' +
          (item.location ? '<em>' + esc(item.location) + '</em>' : '') + '</span></button>';
    }).join('');
  }

  function bindList(body) {
    body.querySelectorAll('.dp-item').forEach(btn => {
      btn.addEventListener('click', () => openCraft(btn.dataset.id));
    });
  }

  function renderCity(city) {
    const el = panelEls();
    if (!el.panel || !city) return;
    const list = craftList(city.id);
    const idx = String((D.cities || []).findIndex(x => x.id === city.id) + 1).padStart(2, '0');
    const name = en() ? city.nameEn : city.name;

    el.img.src = city.img;
    el.img.alt = name;
    el.kicker.innerHTML = '<span>' + esc(en() ? city.regionEn : city.region) + '</span><span>NO. ' + idx + '</span>';
    el.title.textContent = name;
    el.sub.textContent = city.coord || '';

    el.body.innerHTML =
      '<p class="dp-desc">' + esc(en() ? city.introEn : city.intro) + '</p>' +
      '<div class="dp-meta"><span class="dp-tag">' + (en() ? list.length + ' crafts' : list.length + ' 项手艺') + '</span>' +
        '<span class="dp-tag">' + D.cultures.length + (en() ? ' in total' : ' 项全省合计') + '</span></div>' +
      (list.length
        ? '<div class="dp-section-title">' + (en() ? 'Crafts of this city' : '这座城的手艺') +
            '<em>' + String(list.length).padStart(2, '0') + ' / ' + D.cultures.length + '</em></div>' +
          '<div class="dp-list">' + listHTML(list) + '</div>'
        : '<div class="dp-section-title">' + (en() ? 'Crafts of this city' : '这座城的手艺') + '<em>00</em></div>' +
          '<p class="dp-desc">' + (en() ? 'No craft entry for this city yet.' : '这座城暂未收录手艺条目。') + '</p>') +
      '<div class="dp-actions">' +
        '<a class="btn btn-outline" href="./scenic.html?city=' + encodeURIComponent(city.name) + '">' + (en() ? 'Landscapes' : '看风景') + '</a>' +
        '<a class="btn btn-outline" href="./food.html?city=' + encodeURIComponent(city.name) + '">' + (en() ? 'Flavours' : '品美食') + '</a>' +
        '<button class="btn btn-outline" data-act="scroll-gallery">' + (en() ? 'All pieces ↓' : '下滑看全部手艺 ↓') + '</button>' +
      '</div>' +
      '<p class="dp-note">' + (en()
        ? 'Every craft of this city is listed above — nothing is left out.'
        : '这座城收录的每一项手艺都列在上面，一件不漏。') + '</p>';

    bindList(el.body);
    const scroller = el.body.querySelector('[data-act="scroll-gallery"]');
    if (scroller) scroller.addEventListener('click', () => {
      closePanel();
      const target = document.getElementById('cultureGallery');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    syncPicker(city.id, '');
  }

  function renderCraft(craft) {
    const el = panelEls();
    if (!el.panel || !craft) return;
    const city = cityById(craft.cityId);
    const name = en() ? craft.nameEn : craft.name;
    const others = craftList(craft.cityId).filter(c => c.id !== craft.id);
    const idx = String(D.cultures.findIndex(c => c.id === craft.id) + 1).padStart(2, '0');

    el.img.src = craft.img;
    el.img.alt = name;
    el.kicker.innerHTML = '<span>' + esc(cityName(craft)) + '</span><span>NO. ' + idx + ' / ' + D.cultures.length + '</span>';
    el.title.textContent = name;
    el.sub.textContent = [craft.location, city ? (en() ? city.nameEn : city.name) : craft.city].filter(Boolean).join(' · ');

    el.body.innerHTML =
      '<div class="dp-meta"><span class="dp-tag">' + esc(cityName(craft)) + '</span>' +
        '<span class="dp-tag">' + (en() ? 'CRAFT' : '非遗文创') + '</span></div>' +
      '<p class="dp-desc">' + esc(F(craft, 'desc')) + '</p>' +
      '<div class="dp-actions">' +
        '<button class="btn btn-outline" data-act="back-city">← ' + esc(en() ? 'All crafts of ' + (city ? city.nameEn : craft.city) : '返回' + craft.city + '的全部手艺') + '</button>' +
        '<button class="btn btn-outline" data-act="zoom">' + (en() ? 'Enlarge photo' : '放大这张照片') + '</button>' +
        '<button class="btn btn-outline" data-act="story">' + (en() ? 'Read full story' : '阅读完整来历') + '</button>' +
      '</div>' +
      (others.length
        ? '<div class="dp-section-title">' + (en() ? 'More from ' + (city ? city.nameEn : craft.city) : '同城还有') +
            '<em>' + String(others.length).padStart(2, '0') + ' MORE</em></div>' +
          '<div class="dp-list">' + listHTML(others) + '</div>'
        : '');

    bindList(el.body);
    const back = el.body.querySelector('[data-act="back-city"]');
    if (back) back.addEventListener('click', () => openCity(craft.cityId));
    const zoom = el.body.querySelector('[data-act="zoom"]');
    if (zoom) zoom.addEventListener('click', () => APP.openLightbox(craft.img, name));
    const story = el.body.querySelector('[data-act="story"]');
    if (story) story.addEventListener('click', () => APP.openDetail(craft, 'culture'));
    syncPicker(craft.cityId, craft.id);
  }

  function openCity(id) {
    const city = cityById(id);
    if (!city) return;
    state.cityId = id;
    state.craftId = null;
    state.view = 'city';
    highlight();
    renderCity(city);
    if (atlas) atlas.resetView();
    showPanel();
  }

  function openCraft(id) {
    const craft = craftById(id);
    if (!craft) return;
    state.cityId = craft.cityId;
    state.craftId = craft.id;
    state.view = 'craft';
    highlight();
    renderCraft(craft);
    showPanel();
    focusItem(craft);
  }

  /* ---------- 下拉菜单：按城市列出全部 31 项手艺 ---------- */
  function buildPicker() {
    const sel = document.getElementById('craftPicker');
    if (!sel) return;
    sel.innerHTML = '';
    const ph = document.createElement('option');
    ph.value = '';
    ph.textContent = en() ? '— Jump to a craft —' : '— 下拉选择一项手艺 —';
    sel.appendChild(ph);
    cultureCities().forEach(city => {
      const group = document.createElement('optgroup');
      group.label = (en() ? city.nameEn : city.name) + ' · ' + craftsOf(city.id);
      craftList(city.id).forEach(craft => {
        const opt = document.createElement('option');
        opt.value = craft.id;
        opt.textContent = en() ? craft.nameEn : craft.name;
        group.appendChild(opt);
      });
      sel.appendChild(group);
    });
  }

  function syncPicker(cityId, craftId) {
    const sel = document.getElementById('craftPicker');
    if (!sel) return;
    const ph = sel.options[0];
    const city = cityById(cityId);
    if (craftId) { sel.value = craftId; return; }
    sel.value = '';
    if (ph && city) ph.textContent = (en() ? '— ' + city.nameEn + ' · ' + craftsOf(city.id) + ' crafts —' : '— ' + city.name + ' · ' + craftsOf(city.id) + ' 项手艺 —');
    else if (ph) ph.textContent = en() ? '— Jump to a craft —' : '— 下拉选择一项手艺 —';
  }

  /* ---------- 01 影像 ---------- */
  function renderFilms() {
    const grid = document.getElementById('filmGrid');
    if (!grid) return;
    const en = lang() === 'en';
    grid.innerHTML = (D.videos.cartoons || []).map((film, i) => {
      const title = en ? film.titleEn : film.title;
      return '<button class="film-card" data-src="' + film.src + '" data-title="' + esc(title) + '">' +
        '<div class="film-frame">' +
          '<img src="' + film.poster + '" alt="' + esc(title) + '" loading="lazy">' +
          '<span class="film-play" aria-hidden="true"></span>' +
          '<div class="film-label"><span>FILM ' + String(i + 1).padStart(2, '0') + '</span>' +
          '<h3>' + esc(title) + '</h3><p>' + esc(en ? film.subtitleEn : film.subtitle) + '</p></div>' +
        '</div></button>';
    }).join('');

    grid.querySelectorAll('.film-card').forEach(card => {
      card.addEventListener('click', () => APP.openVideo(card.dataset.src, card.dataset.title));
    });
  }

  /* ---------- 02 海报 ---------- */
  function renderPosters() {
    const grid = document.getElementById('posterGrid');
    if (!grid) return;
    const en = lang() === 'en';
    grid.innerHTML = (D.posters || []).map((poster, i) => {
      const name = en ? (poster.nameEn || poster.name) : poster.name;
      const desc = en ? (poster.descEn || poster.desc) : poster.desc;
      return '<article class="poster-card reveal">' +
        '<div class="poster-media" data-img="' + poster.img + '" data-cap="' + esc(name) + '">' +
          '<img src="' + poster.img + '" alt="' + esc(name) + '" loading="lazy">' +
        '</div>' +
        '<div class="poster-body">' +
          '<div class="poster-no">POSTER ' + String(i + 1).padStart(2, '0') + '</div>' +
          '<h3>' + esc(name) + '</h3>' +
          '<p>' + esc(desc) + '</p>' +
          '<button class="poster-more" data-detail="' + i + '">' + (en ? 'Read more' : '阅读全文') + '</button>' +
        '</div></article>';
    }).join('');

    grid.querySelectorAll('.poster-media').forEach(media => {
      media.addEventListener('click', () => APP.openLightbox(media.dataset.img, media.dataset.cap));
    });
    grid.querySelectorAll('[data-detail]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = D.posters[Number(btn.dataset.detail)];
        if (!p) return;
        APP.openDetail({
          n: p.n, img: p.img, name: p.name, nameEn: p.nameEn,
          desc: p.desc, descEn: p.descEn, city: '城固 · 汉中', location: 'POSTER'
        }, 'culture');
      });
    });
    APP.observeReveals(grid);
  }

  /* ---------- 03 时光轴 ---------- */
  function renderTimeline() {
    const box = document.getElementById('timeline');
    if (!box) return;
    const en = lang() === 'en';
    box.innerHTML = (D.heritage || []).map((item, i) => {
      const name = en ? (item.nameEn || item.name) : item.name;
      return '<div class="tl-item reveal" data-idx="' + i + '">' +
        '<div class="tl-era"><strong>' + esc(en ? item.eraEn : item.era) + '</strong>' +
          '<small>' + esc(en ? item.yearEn : item.year) + '</small></div>' +
        '<div class="tl-node"><i></i></div>' +
        '<div class="tl-body">' +
          '<div><h3>' + esc(name) + '</h3><p>' + esc(en ? item.descEn : item.desc) + '</p>' +
          '<div class="tl-meta">' + esc(item.city) + ' · ' + (en ? 'OPEN STORY' : '展开阅读') + '</div></div>' +
          '<div class="tl-thumb"><img src="' + item.img + '" alt="' + esc(name) + '" loading="lazy"></div>' +
        '</div></div>';
    }).join('');

    box.querySelectorAll('.tl-item').forEach(row => {
      row.addEventListener('click', () => {
        const item = D.heritage[Number(row.dataset.idx)];
        if (!item) return;
        APP.openDetail({
          n: Number(row.dataset.idx) + 1, img: item.img, name: item.name, nameEn: item.nameEn,
          desc: item.desc, descEn: item.descEn, city: item.city,
          location: (lang() === 'en' ? item.eraEn : item.era) + ' · ' + (lang() === 'en' ? item.yearEn : item.year)
        }, 'culture');
      });
    });
    APP.observeReveals(box);
  }

  /* ---------- 04 民俗图谱 ---------- */
  function cultureCities() {
    const seen = [];
    D.cultures.forEach(c => { if (!seen.includes(c.cityId)) seen.push(c.cityId); });
    return seen.map(cityById).filter(Boolean);
  }

  function renderFilters() {
    const bar = document.getElementById('cultureFilters');
    if (!bar) return;
    const en = lang() === 'en';
    bar.innerHTML = '';
    const all = document.createElement('button');
    all.className = 'filter-btn' + (state.cityId ? '' : ' active');
    all.textContent = en ? 'All cities' : '全部城市';
    all.addEventListener('click', () => { state.cityId = null; highlight(); renderFilters(); renderGrid(); });
    bar.appendChild(all);
    cultureCities().forEach(city => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (state.cityId === city.id ? ' active' : '');
      btn.textContent = en ? city.nameEn : city.name;
      btn.addEventListener('click', () => { state.cityId = city.id; highlight(); renderFilters(); renderGrid(); });
      bar.appendChild(btn);
    });
  }

  function renderGrid() {
    const grid = document.getElementById('cultureGrid');
    const count = document.getElementById('cultureCount');
    if (!grid) return;
    const en = lang() === 'en';
    const list = state.cityId ? D.cultures.filter(c => c.cityId === state.cityId) : D.cultures.slice();

    grid.innerHTML = list.map((item, i) => {
      const name = F(item, 'name');
      return '<article class="story-card reveal">' +
        '<div class="story-card-media" data-img="' + item.img + '" data-cap="' + esc(name) + '">' +
          '<img src="' + item.img + '" alt="' + esc(name) + '" loading="lazy">' +
          '<span class="card-index">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<button class="card-zoom" aria-label="' + (en ? 'Enlarge' : '放大查看') + '">' + APP.icon('zoom') + '</button>' +
        '</div>' +
        '<div class="story-card-body">' +
          '<div class="card-meta"><span>' + esc(cityName(item)) + '</span>' +
            (item.location ? '<span>' + esc(item.location) + '</span>' : '') + '</div>' +
          '<h3>' + esc(name) + '</h3>' +
          '<p class="card-desc">' + esc(F(item, 'desc')) + '</p>' +
          '<div class="card-footer"><button data-detail="' + item.id + '">' + (en ? 'Read story' : '阅读详情') + '</button>' +
            '<span class="muted">' + (en ? 'CULTURE' : '民俗') + '</span></div>' +
        '</div></article>';
    }).join('');

    if (count) {
      const obj = state.cityId ? cityById(state.cityId) : null;
      const label = obj ? (en ? obj.nameEn : obj.name) : (en ? 'all cities' : '全部城市');
      count.textContent = en ? list.length + ' crafts · ' + label : list.length + ' 项民俗 · ' + label;
    }

    grid.querySelectorAll('.story-card-media').forEach(media => {
      media.addEventListener('click', e => {
        if (e.target.closest('.card-zoom')) return;
        APP.openLightbox(media.dataset.img, media.dataset.cap);
      });
    });
    grid.querySelectorAll('.card-zoom').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const media = btn.closest('.story-card-media');
        APP.openLightbox(media.dataset.img, media.dataset.cap);
      });
    });
    grid.querySelectorAll('[data-detail]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = D.cultures.find(c => c.id === btn.dataset.detail);
        if (item) APP.openDetail(item, 'culture');
      });
    });
    APP.observeReveals(grid);
  }

  /* ---------- 初始化 ---------- */
  function init() {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const detailParam = params.get('detail');
    const matched = cityParam && (D.cities || []).find(c => c.name === cityParam || c.nameEn === cityParam);
    state.cityId = matched ? matched.id : null;

    renderFilms();
    renderPosters();
    renderTimeline();
    renderMap();
    buildPicker();
    renderFilters();
    renderGrid();

    /* 抽屉交互 */
    const closeBtn = document.getElementById('dpClose');
    if (closeBtn) closeBtn.addEventListener('click', e => { e.stopPropagation(); closePanel(); });
    const hero = document.getElementById('dpHero');
    if (hero) hero.addEventListener('click', e => {
      /* 关闭按钮就在大图里，点它时不能再触发放大 */
      if (e.target.closest('.dp-close')) return;
      const item = state.view === 'craft' ? craftById(state.craftId) : (state.cityId ? cityById(state.cityId) : null);
      if (item) APP.openLightbox(item.img, en() ? (item.nameEn || item.name) : item.name);
    });
    const picker = document.getElementById('craftPicker');
    if (picker) picker.addEventListener('change', () => {
      if (picker.value) openCraft(picker.value);
      else closePanel();
    });
    const stage = document.getElementById('gallerySection');
    if (stage) stage.addEventListener('click', e => {
      if (!e.target.closest('.map-marker') && !e.target.closest('.map-picker')) closePanel();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

    if (detailParam) {
      const item = D.cultures.find(c => c.id === detailParam);
      if (item) setTimeout(() => openCraft(item.id), 320);
    } else if (matched) {
      setTimeout(() => openCity(matched.id), 320);
      const anchor = document.getElementById('gallerySection');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.addEventListener('sx:language', () => {
      const keepCity = state.cityId;
      const keepCraft = state.craftId;
      renderFilms();
      renderPosters();
      renderTimeline();
      renderMap();
      buildPicker();
      renderFilters();
      renderGrid();
      if (keepCraft && craftById(keepCraft)) {
        renderCraft(craftById(keepCraft));
        focusItem(craftById(keepCraft));
      } else if (keepCity && cityById(keepCity)) renderCity(cityById(keepCity));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
