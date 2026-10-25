(function () {
  'use strict';

  const D = window.SX_DATA || { cities: [], spots: [] };
  const APP = window.SX_APP;

  /* state.view = 'city' | 'spot' */
  const state = { cityId: null, spotId: null, view: 'city' };

  function lang() { return APP.getLang(); }
  function F(item, base) { return APP.field(item, base); }
  function esc(v) { return APP.esc(v); }
  function en() { return lang() === 'en'; }

  function cityById(id) { return D.cities.find(c => c.id === id); }
  function spotById(id) { return D.spots.find(s => s.id === id); }
  function spotsOf(cityId) { return D.spots.filter(s => s.cityId === cityId); }

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
  function countsFor(cityId) {
    return {
      spots: D.spots.filter(s => s.cityId === cityId).length,
      cultures: D.cultures.filter(s => s.cityId === cityId).length,
      foods: D.foods.filter(s => s.cityId === cityId).length
    };
  }

  /* ---------- 地图：天地图真实底图 + 城市光点 ---------- */
  let atlas = null;

  function renderMap() {
    const stage = document.getElementById('shaanxiMap');
    if (!stage || !window.SX_MAP) return;
    if (!atlas) atlas = window.SX_MAP.create(stage, { wheel: false });
    if (!atlas) return;
    atlas.clearMarkers();
    D.cities.forEach(city => {
      atlas.addMarker(city, {
        county: city.county,
        major: city.major,
        label: en() ? city.nameEn : city.name,
        onClick: () => openCity(city.id)
      });
    });
    highlight();
  }

  function highlight() {
    document.querySelectorAll('.map-marker').forEach(el => {
      el.classList.toggle('active', el.dataset.id === state.cityId);
    });
  }

  /* ---------- 右侧抽屉（广西模板同款：地图后退 + 面板滑出） ---------- */
  function panelEls() {
    return {
      panel: document.getElementById('detailPanel'),
      wrap: document.getElementById('mapWrap'),
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
    document.querySelectorAll('.map-marker').forEach(m => {
      m.classList.toggle('dimmed', m.dataset.id !== state.cityId);
    });
  }

  function closePanel() {
    const el = panelEls();
    if (!el.panel) return;
    el.panel.classList.remove('open');
    el.panel.setAttribute('aria-hidden', 'true');
    if (el.wrap) el.wrap.classList.remove('push-back');
    document.querySelectorAll('.map-marker').forEach(m => m.classList.remove('dimmed'));
    if (atlas) atlas.resetView();
  }

  function listHTML(items, currentId) {
    return items.map(item => {
      const name = en() ? item.nameEn : item.name;
      const meta = en() ? (item.locationEn || item.location || '') : (item.location || '');
      const video = item.video ? '<span class="dp-item-video">' + (en() ? '▶ VIDEO' : '▶ 有视频') + '</span>' : '';
      return '<button class="dp-item' + (item.id === currentId ? ' is-current' : '') + '" data-id="' + item.id + '">' +
        '<img src="' + item.img + '" alt="' + esc(name) + '" loading="lazy">' +
        '<span class="dp-item-copy"><strong>' + esc(name) + '</strong>' +
          (meta ? '<em>' + esc(meta) + '</em>' : '') + video + '</span></button>';
    }).join('');
  }

  function bindList(body) {
    body.querySelectorAll('.dp-item').forEach(btn => {
      btn.addEventListener('click', () => openSpot(btn.dataset.id));
    });
  }

  function renderCity(city) {
    const el = panelEls();
    if (!el.panel || !city) return;
    const c = countsFor(city.id);
    const idx = String(D.cities.findIndex(x => x.id === city.id) + 1).padStart(2, '0');
    const name = en() ? city.nameEn : city.name;
    const region = en() ? city.regionEn : city.region;
    const spots = spotsOf(city.id);

    el.img.src = city.img;
    el.img.alt = name;
    el.kicker.innerHTML = '<span>' + esc(region) + '</span><span>NO. ' + idx + '</span>';
    el.title.textContent = name;
    el.sub.textContent = city.coord || '';

    el.body.innerHTML =
      '<p class="dp-desc">' + esc(en() ? city.introEn : city.intro) + '</p>' +
      '<div class="dp-meta">' +
        '<span class="dp-tag">' + c.spots + ' ' + (en() ? 'landscapes' : '处风景') + '</span>' +
        '<span class="dp-tag">' + c.cultures + ' ' + (en() ? 'crafts' : '项民俗') + '</span>' +
        '<span class="dp-tag">' + c.foods + ' ' + (en() ? 'flavours' : '种味道') + '</span>' +
      '</div>' +
      (spots.length
        ? '<div class="dp-section-title">' + (en() ? 'Landscapes of this city' : '这座城的风景') +
            '<em>' + String(spots.length).padStart(2, '0') + ' / ' + D.spots.length + '</em></div>' +
          '<div class="dp-list">' + listHTML(spots, null) + '</div>'
        : '<div class="dp-section-title">' + (en() ? 'Landscapes of this city' : '这座城的风景') + '<em>00</em></div>' +
          '<p class="dp-desc">' + (en() ? 'No landscape entry for this city yet.' : '这座城暂未收录风景条目。') + '</p>') +
      '<div class="dp-actions">' +
        '<a class="btn btn-outline" href="./culture.html?city=' + encodeURIComponent(city.name) + '">' + (en() ? 'Crafts' : '看民俗') + '</a>' +
        '<a class="btn btn-outline" href="./food.html?city=' + encodeURIComponent(city.name) + '">' + (en() ? 'Flavours' : '品美食') + '</a>' +
        '<button class="btn btn-outline" data-act="scroll-gallery">' + (en() ? 'All landscapes ↓' : '下滑看全部风景 ↓') + '</button>' +
      '</div>' +
      '<p class="dp-note">' + (city.county
        ? (en() ? 'Chenggu is a county of Hanzhong, marked separately on the map so its landscapes, crafts and food can be explored on their own.'
                : '城固县隶属汉中市，在地图中单独标注，可独立查看当地风景、民俗与美食。')
        : (en() ? 'Every landscape of this city is listed above — nothing is left out.'
                : '这座城收录的每一处风景都列在上面，一处不漏。')) + '</p>';

    bindList(el.body);
    const scroller = el.body.querySelector('[data-act="scroll-gallery"]');
    if (scroller) scroller.addEventListener('click', () => {
      closePanel();
      const target = document.getElementById('gallerySection');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    syncPicker(city.id, '');
  }

  function renderSpot(spot) {
    const el = panelEls();
    if (!el.panel || !spot) return;
    const city = cityById(spot.cityId);
    const name = en() ? spot.nameEn : spot.name;
    const others = spotsOf(spot.cityId).filter(s => s.id !== spot.id);
    const idx = String(D.spots.findIndex(s => s.id === spot.id) + 1).padStart(2, '0');

    el.img.src = spot.img;
    el.img.alt = name;
    el.kicker.innerHTML = '<span>' + esc(en() ? (city && city.nameEn) || spot.city : spot.city) + '</span><span>NO. ' + idx + ' / ' + D.spots.length + '</span>';
    el.title.textContent = name;
    el.sub.textContent = [en() ? (spot.locationEn || spot.location || '') : (spot.location || ''), spot.coord].filter(Boolean).join(' · ');

    el.body.innerHTML =
      '<div class="dp-meta">' +
        '<span class="dp-tag">' + esc(en() ? (city && city.nameEn) || spot.city : spot.city) + '</span>' +
        '<span class="dp-tag">' + (en() ? 'LANDSCAPE' : '风景') + '</span>' +
      '</div>' +
      '<p class="dp-desc">' + esc(F(spot, 'desc')) + '</p>' +
      '<div class="dp-actions">' +
        '<button class="btn btn-outline" data-act="back-city">← ' + esc(en() ? 'All landscapes of ' + ((city && city.nameEn) || spot.city) : '返回' + spot.city + '的全部风景') + '</button>' +
        '<button class="btn btn-outline" data-act="zoom">' + (en() ? 'Enlarge photo' : '放大这张照片') + '</button>' +
        '<button class="btn btn-outline" data-act="story">' + (en() ? 'Read full story' : '阅读完整故事') + '</button>' +
      '</div>' +
      (others.length
        ? '<div class="dp-section-title">' + (en() ? 'More in ' + ((city && city.nameEn) || spot.city) : '同城还有') +
            '<em>' + String(others.length).padStart(2, '0') + ' MORE</em></div>' +
          '<div class="dp-list">' + listHTML(others, null) + '</div>'
        : '');

    bindList(el.body);
    const back = el.body.querySelector('[data-act="back-city"]');
    if (back) back.addEventListener('click', () => openCity(spot.cityId));
    const zoom = el.body.querySelector('[data-act="zoom"]');
    if (zoom) zoom.addEventListener('click', () => APP.openLightbox(spot.img, name));
    const story = el.body.querySelector('[data-act="story"]');
    if (story) story.addEventListener('click', () => APP.openDetail(spot, 'scenic'));
    syncPicker(spot.cityId, spot.id);
  }

  function openCity(id) {
    const city = cityById(id);
    if (!city) return;
    state.cityId = id;
    state.spotId = null;
    state.view = 'city';
    highlight();
    renderCity(city);
    if (atlas) atlas.resetView();
    showPanel();
  }

  function openSpot(id) {
    const spot = spotById(id);
    if (!spot) return;
    state.cityId = spot.cityId;
    state.spotId = spot.id;
    state.view = 'spot';
    highlight();
    renderSpot(spot);
    showPanel();
    focusItem(spot);
  }

  /* ---------- 下拉菜单：按城市列出全部 24 处风景 ---------- */
  function buildPicker() {
    const sel = document.getElementById('spotPicker');
    if (!sel) return;
    sel.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = en() ? '— Jump to a landscape —' : '— 下拉选择一处风景 —';
    sel.appendChild(placeholder);

    citiesInSpots().forEach(city => {
      const group = document.createElement('optgroup');
      group.label = (en() ? city.nameEn : city.name) + ' · ' + spotsOf(city.id).length;
      spotsOf(city.id).forEach(spot => {
        const opt = document.createElement('option');
        opt.value = spot.id;
        opt.textContent = (en() ? spot.nameEn : spot.name);
        group.appendChild(opt);
      });
      sel.appendChild(group);
    });
    sel.value = state.spotId || '';
  }

  function syncPicker(cityId, spotId) {
    const sel = document.getElementById('spotPicker');
    if (!sel) return;
    const ph = sel.options[0];
    const city = cityById(cityId);
    if (spotId) { sel.value = spotId; }
    else {
      sel.value = '';
      if (ph && city) ph.textContent = (en() ? '— ' + city.nameEn + ' · ' + spotsOf(city.id).length + ' places —' : '— ' + city.name + ' · ' + spotsOf(city.id).length + ' 处风景 —');
      else if (ph) ph.textContent = en() ? '— Jump to a landscape —' : '— 下拉选择一处风景 —';
    }
  }

  /* ---------- 筛选条 + 24 张卡片合集（全量保留，一处不删） ---------- */
  function citiesInSpots() {
    const seen = [];
    D.spots.forEach(s => { if (!seen.includes(s.cityId)) seen.push(s.cityId); });
    return seen.map(cityById).filter(Boolean);
  }

  function renderFilters() {
    const bar = document.getElementById('scenicFilters');
    if (!bar) return;
    bar.innerHTML = '';
    const all = document.createElement('button');
    all.className = 'filter-btn' + (state.cityId ? '' : ' active');
    all.textContent = en() ? 'All cities' : '全部城市';
    all.addEventListener('click', () => { state.cityId = null; highlight(); renderFilters(); renderGallery(); });
    bar.appendChild(all);

    citiesInSpots().forEach(city => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (state.cityId === city.id ? ' active' : '');
      btn.textContent = en() ? city.nameEn : city.name;
      btn.addEventListener('click', () => { state.cityId = city.id; highlight(); renderFilters(); renderGallery(); });
      bar.appendChild(btn);
    });
  }

  function cardHTML(item, index) {
    const name = F(item, 'name');
    const loc = en() ? (item.locationEn || item.location || '') : (item.location || '');
    const cityObj = cityById(item.cityId);
    const cityLabel = en() ? ((cityObj && cityObj.nameEn) || item.city) : item.city;
    return '<article class="story-card reveal">' +
      '<div class="story-card-media" data-img="' + item.img + '" data-cap="' + esc(name) + '">' +
        '<img src="' + item.img + '" alt="' + esc(name) + '" loading="lazy">' +
        '<span class="card-index">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<button class="card-zoom" aria-label="' + (en() ? 'Enlarge' : '放大查看') + '">' + APP.icon('zoom') + '</button>' +
      '</div>' +
      '<div class="story-card-body">' +
        '<div class="card-meta"><span>' + esc(cityLabel) + '</span>' +
          (loc ? '<span>' + esc(loc) + '</span>' : '') + '</div>' +
        '<h3>' + esc(name) + '</h3>' +
        '<p class="card-desc">' + esc(F(item, 'desc')) + '</p>' +
        '<div class="card-footer"><button data-detail="' + item.id + '">' + (en() ? 'Read story' : '阅读详情') + '</button>' +
          '<span class="muted">' + (en() ? 'LANDSCAPE' : '风景') + '</span></div>' +
      '</div></article>';
  }

  function renderGallery() {
    const grid = document.getElementById('scenicGrid');
    const bar = document.getElementById('scenicCount');
    if (!grid) return;
    const list = state.cityId ? D.spots.filter(s => s.cityId === state.cityId) : D.spots.slice();
    grid.innerHTML = list.map((item, i) => cardHTML(item, i)).join('');

    if (bar) {
      const cityName = state.cityId ? (en() ? cityById(state.cityId).nameEn : cityById(state.cityId).name) : (en() ? 'all cities' : '全部城市');
      bar.textContent = en()
        ? list.length + ' stories · ' + cityName
        : list.length + ' 处风景 · ' + cityName;
    }
    bindCards(grid);
    APP.observeReveals(grid);
  }

  function bindCards(grid) {
    grid.querySelectorAll('.card-zoom').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const media = btn.closest('.story-card-media');
        APP.openLightbox(media.dataset.img, media.dataset.cap);
      });
    });
    grid.querySelectorAll('.story-card-media').forEach(media => {
      media.addEventListener('click', e => {
        if (e.target.closest('.card-zoom')) return;
        APP.openLightbox(media.dataset.img, media.dataset.cap);
      });
    });
    grid.querySelectorAll('[data-detail]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = D.spots.find(s => s.id === btn.dataset.detail);
        if (item) APP.openDetail(item, 'scenic');
      });
    });
  }

  /* ---------- 初始化 ---------- */
  function init() {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const detailParam = params.get('detail');
    const matched = cityParam && D.cities.find(c => c.name === cityParam || c.nameEn === cityParam);
    state.cityId = matched ? matched.id : null;

    renderMap();
    buildPicker();
    renderFilters();
    renderGallery();

    const closeBtn = document.getElementById('dpClose');
    if (closeBtn) closeBtn.addEventListener('click', e => { e.stopPropagation(); closePanel(); });
    const hero = document.getElementById('dpHero');
    if (hero) hero.addEventListener('click', e => {
      /* 关闭按钮就在大图里，点它时不能再触发放大 */
      if (e.target.closest('.dp-close')) return;
      const item = state.view === 'spot' ? spotById(state.spotId) : (state.cityId ? cityById(state.cityId) : null);
      if (item) APP.openLightbox(item.img, en() ? (item.nameEn || item.name) : item.name);
    });
    const picker = document.getElementById('spotPicker');
    if (picker) picker.addEventListener('change', () => {
      if (picker.value) openSpot(picker.value);
      else closePanel();
    });
    const stage = document.getElementById('mapSection');
    if (stage) stage.addEventListener('click', e => {
      if (!e.target.closest('.map-marker') && !e.target.closest('.map-picker')) closePanel();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closePanel();
    });

    if (detailParam) {
      const item = D.spots.find(s => s.id === detailParam) || D.spots.find(s => s.n === Number(String(detailParam).replace(/\D/g, '')));
      if (item) setTimeout(() => openSpot(item.id), 320);
    } else if (matched) {
      setTimeout(() => openCity(matched.id), 320);
      const target = document.getElementById('mapSection');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.addEventListener('sx:language', () => {
      const keepCity = state.cityId;
      const keepSpot = state.spotId;
      renderMap();
      buildPicker();
      renderFilters();
      renderGallery();
      if (keepSpot && spotById(keepSpot)) {
        renderSpot(spotById(keepSpot));
        focusItem(spotById(keepSpot));
      } else if (keepCity && cityById(keepCity)) renderCity(cityById(keepCity));
      void keepCity;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
