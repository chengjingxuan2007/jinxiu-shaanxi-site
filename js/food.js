(function () {
  'use strict';

  const D = window.SX_DATA || { cities: [], foods: [] };
  const APP = window.SX_APP;
  const state = { cityId: null, dishId: null, view: 'city' };

  const EN = () => APP.getLang() === 'en';
  const F = (item, base) => APP.field(item, base);
  const esc = v => APP.esc(v);
  const cityById = id => D.cities.find(c => c.id === id);

  function citiesWithFood() {
    const seen = [];
    D.foods.forEach(f => { if (!seen.includes(f.cityId)) seen.push(f.cityId); });
    return seen.map(cityById).filter(Boolean);
  }

  function foodCountOf(cityId) { return D.foods.filter(f => f.cityId === cityId).length; }
  function dishList(cityId) { return D.foods.filter(f => f.cityId === cityId); }
  function dishById(id) { return D.foods.find(f => f.id === id); }

  /* 条目的地图定位点：优先用 data.js 的 geo，没有就退回所属城市 */
  function coordOf(item) {
    const geo = D.geo || {};
    if (geo[item.id]) return geo[item.id];
    const city = cityById(item.cityId);
    return city && window.SX_MAP ? window.SX_MAP.cityLngLat(city) : null;
  }

  function focusItem(item) {
    if (!atlas || !window.SX_MAP || !item) return;
    atlas.focusOn(coordOf(item), EN() ? (item.nameEn || item.name) : item.name);
  }

  /* ---------- 地图：天地图真实底图 + 城市光点 ---------- */
  let atlas = null;

  function renderMap() {
    const stage = document.getElementById('foodMap');
    if (!stage || !window.SX_MAP) return;
    if (!atlas) atlas = window.SX_MAP.create(stage, { interactive: false, mask: true, maskColor: 'rgba(38,52,47,1)' });
    if (!atlas) return;
    atlas.clearMarkers();
    D.cities.forEach(city => {
      const total = foodCountOf(city.id);
      atlas.addMarker(city, {
        county: city.county,
        major: city.major,
        disabled: total === 0,
        label: EN() ? city.nameEn : city.name,
        onClick: () => openCity(city.id)
      });
    });
    highlight();
  }

  function highlight() {
    document.querySelectorAll('#foodMap .map-marker').forEach(el => {
      el.classList.toggle('active', el.dataset.id === state.cityId);
    });
    document.querySelectorAll('.food-index-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === state.cityId);
    });
  }

  /* ---------- 右侧抽屉（广西模板同款：地图后退 + 面板滑出） ---------- */
  function panelEls() {
    return {
      panel: document.getElementById('detailPanel'),
      wrap: document.getElementById('foodWrap'),
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
    document.querySelectorAll('#foodMap .map-marker').forEach(m => {
      m.classList.toggle('dimmed', m.dataset.id !== state.cityId);
    });
  }

  function closePanel() {
    const el = panelEls();
    if (!el.panel) return;
    el.panel.classList.remove('open');
    el.panel.setAttribute('aria-hidden', 'true');
    if (el.wrap) el.wrap.classList.remove('push-back');
    document.querySelectorAll('#foodMap .map-marker').forEach(m => m.classList.remove('dimmed'));
    syncPicker(state.cityId, '');
    if (atlas) atlas.resetView();
  }

  function listHTML(items) {
    return items.map(item => {
      const name = F(item, 'name');
      return '<button class="dp-item" data-id="' + item.id + '">' +
        '<img src="' + item.img + '" alt="' + esc(name) + '" loading="lazy">' +
        '<span class="dp-item-copy"><strong>' + esc(name) + '</strong>' +
          (EN() ? (item.locationEn || item.location || '') : (item.location || '') ? '<em>' + esc(EN() ? (item.locationEn || item.location) : item.location) + '</em>' : '') +
          (item.video ? '<span class="dp-item-video">▶ ' + (EN() ? 'VIDEO' : '有视频') + '</span>' : '') +
        '</span></button>';
    }).join('');
  }

  function bindList(body) {
    body.querySelectorAll('.dp-item').forEach(btn => {
      btn.addEventListener('click', () => openDish(btn.dataset.id));
    });
  }

  function renderCity(city) {
    const el = panelEls();
    if (!el.panel || !city) return;
    const list = dishList(city.id);
    const idx = String(citiesWithFood().findIndex(c => c.id === city.id) + 1).padStart(2, '0');
    const name = EN() ? city.nameEn : city.name;

    el.img.src = city.img;
    el.img.alt = name;
    el.kicker.innerHTML = '<span>' + esc(EN() ? city.regionEn : city.region) + '</span><span>NO. ' + idx + '</span>';
    el.title.textContent = name;
    el.sub.textContent = city.coord || '';

    el.body.innerHTML =
      '<p class="dp-desc">' + esc(EN() ? city.introEn : city.intro) + '</p>' +
      '<div class="dp-meta"><span class="dp-tag">' + (EN() ? list.length + ' dishes' : list.length + ' 道菜') + '</span>' +
        '<span class="dp-tag">' + D.foods.length + (EN() ? ' in total' : ' 道全省合计') + '</span></div>' +
      (list.length
        ? '<div class="dp-section-title">' + (EN() ? 'Dishes of this city' : '这座城的味道') +
            '<em>' + String(list.length).padStart(2, '0') + ' / ' + D.foods.length + '</em></div>' +
          '<div class="dp-list">' + listHTML(list) + '</div>'
        : '<div class="dp-section-title">' + (EN() ? 'Dishes of this city' : '这座城的味道') + '<em>00</em></div>' +
          '<p class="dp-desc">' + (EN() ? 'No dish entry for this city yet.' : '这座城暂未收录菜品。') + '</p>') +
      '<div class="dp-actions">' +
        '<a class="btn btn-outline" href="./scenic.html?city=' + encodeURIComponent(city.name) + '">' + (EN() ? 'Landscapes' : '看风景') + '</a>' +
        '<a class="btn btn-outline" href="./culture.html?city=' + encodeURIComponent(city.name) + '">' + (EN() ? 'Culture' : '看民俗') + '</a>' +
        '<button class="btn btn-outline" data-act="scroll-dishes">' + (EN() ? 'All dishes ↓' : '下滑看全部菜品 ↓') + '</button>' +
      '</div>' +
      '<p class="dp-note">' + (EN()
        ? 'Every dish of this city is listed above — nothing is left out.'
        : '这座城收录的每一道菜都列在上面，一道不漏。') + '</p>';

    bindList(el.body);
    const scroller = el.body.querySelector('[data-act="scroll-dishes"]');
    if (scroller) scroller.addEventListener('click', () => {
      closePanel();
      const target = document.getElementById('dishesSection');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    syncPicker(city.id, '');
  }

  function renderDish(dish) {
    const el = panelEls();
    if (!el.panel || !dish) return;
    const city = cityById(dish.cityId);
    const name = F(dish, 'name');
    const others = dishList(dish.cityId).filter(f => f.id !== dish.id);
    const idx = String(D.foods.findIndex(f => f.id === dish.id) + 1).padStart(2, '0');

    el.img.src = dish.img;
    el.img.alt = name;
    /* 图片来源标注 */
    const hero = document.getElementById('dpHero');
    let srcEl = hero ? hero.querySelector('.dp-source') : null;
    if (dish.source) {
      if (!srcEl) { srcEl = document.createElement('span'); srcEl.className = 'dp-source'; if (hero) hero.appendChild(srcEl); }
      srcEl.textContent = dish.source; srcEl.style.display = '';
    } else if (srcEl) { srcEl.style.display = 'none'; }
    el.kicker.innerHTML = '<span>' + esc(EN() ? ((city && city.nameEn) || dish.city) : dish.city) + '</span><span>NO. ' + idx + ' / ' + D.foods.length + '</span>';
    el.title.textContent = name;
    el.sub.textContent = [EN() ? (dish.locationEn || dish.location || '') : (dish.location || ''), city ? (EN() ? city.nameEn : city.name) : dish.city].filter(Boolean).join(' · ');

    el.body.innerHTML =
      '<div class="dp-meta"><span class="dp-tag">' + esc(EN() ? ((city && city.nameEn) || dish.city) : dish.city) + '</span>' +
        '<span class="dp-tag">' + (EN() ? 'FLAVOUR' : '味道') + '</span>' +
        (dish.video ? '<span class="dp-tag">' + (EN() ? 'VIDEO' : '有视频') + '</span>' : '') +
      '</div>' +
      '<p class="dp-desc">' + esc(F(dish, 'desc')) + '</p>' +
      '<div class="dp-actions">' +
        '<button class="btn btn-outline" data-act="back-city">← ' + esc(EN() ? 'All dishes of ' + ((city && city.nameEn) || dish.city) : '返回' + dish.city + '的全部菜品') + '</button>' +
        '<button class="btn btn-outline" data-act="zoom">' + (EN() ? 'Enlarge photo' : '放大这张照片') + '</button>' +
        (dish.video ? '<button class="btn btn-outline" data-act="video">' + (EN() ? 'Watch video ▶' : '看视频 ▶') + '</button>' : '') +
        '<button class="btn btn-outline" data-act="story">' + (EN() ? 'Read full story' : '阅读详情') + '</button>' +
      '</div>' +
      (others.length
        ? '<div class="dp-section-title">' + (EN() ? 'More from ' + ((city && city.nameEn) || dish.city) : '同城还有') +
            '<em>' + String(others.length).padStart(2, '0') + ' MORE</em></div>' +
          '<div class="dp-list">' + listHTML(others) + '</div>'
        : '');

    bindList(el.body);
    const back = el.body.querySelector('[data-act="back-city"]');
    if (back) back.addEventListener('click', () => openCity(dish.cityId));
    const zoom = el.body.querySelector('[data-act="zoom"]');
    if (zoom) zoom.addEventListener('click', () => APP.openLightbox(dish.img, name));
    const video = el.body.querySelector('[data-act="video"]');
    if (video) video.addEventListener('click', () => APP.openVideo(dish.video, name));
    const story = el.body.querySelector('[data-act="story"]');
    if (story) story.addEventListener('click', () => APP.openDetail(dish, 'food'));
    syncPicker(dish.cityId, dish.id);
  }

  function openCity(id) {
    const city = cityById(id);
    if (!city) return;
    state.cityId = id;
    state.dishId = null;
    state.view = 'city';
    highlight();
    renderCity(city);
    if (atlas) atlas.resetView();
    showPanel();
  }

  function openDish(id) {
    const dish = dishById(id);
    if (!dish) return;
    state.cityId = dish.cityId;
    state.dishId = dish.id;
    state.view = 'dish';
    highlight();
    renderDish(dish);
    showPanel();
    focusItem(dish);
  }

  /* ---------- 下拉菜单：按城市列出全部 30 道菜 ---------- */
  function buildPicker() {
    const sel = document.getElementById('dishPicker');
    if (!sel) return;
    sel.innerHTML = '';
    const ph = document.createElement('option');
    ph.value = '';
    ph.textContent = EN() ? '— Jump to a dish —' : '— 下拉选择一道菜 —';
    sel.appendChild(ph);
    citiesWithFood().forEach(city => {
      const group = document.createElement('optgroup');
      group.label = (EN() ? city.nameEn : city.name) + ' · ' + foodCountOf(city.id);
      dishList(city.id).forEach(dish => {
        const opt = document.createElement('option');
        opt.value = dish.id;
        opt.textContent = F(dish, 'name');
        group.appendChild(opt);
      });
      sel.appendChild(group);
    });
  }

  function syncPicker(cityId, dishId) {
    const sel = document.getElementById('dishPicker');
    if (!sel) return;
    const ph = sel.options[0];
    const city = cityById(cityId);
    if (dishId) { sel.value = dishId; return; }
    sel.value = '';
    if (ph && city) ph.textContent = (EN() ? '— ' + city.nameEn + ' · ' + foodCountOf(city.id) + ' dishes —' : '— ' + city.name + ' · ' + foodCountOf(city.id) + ' 道菜 —');
    else if (ph) ph.textContent = EN() ? '— Jump to a dish —' : '— 下拉选择一道菜 —';
  }

  /* ---------- 筛选条 ---------- */
  function renderFilters() {
    const bar = document.getElementById('foodFilters');
    if (!bar) return;
    bar.innerHTML = '';
    const all = document.createElement('button');
    all.className = 'filter-btn' + (state.cityId ? '' : ' active');
    all.textContent = EN() ? 'All cities' : '全部城市';
    all.addEventListener('click', () => { state.cityId = null; highlight(); renderFilters(); renderGroups(); });
    bar.appendChild(all);

    citiesWithFood().forEach(city => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (state.cityId === city.id ? ' active' : '');
      btn.textContent = EN() ? city.nameEn : city.name;
      btn.addEventListener('click', () => { state.cityId = city.id; highlight(); renderFilters(); renderGroups(); });
      bar.appendChild(btn);
    });
  }

  /* ---------- 分组卡片 ---------- */
  function cardHTML(item, index) {
    const name = F(item, 'name');
    const loc = EN() ? (item.locationEn || item.location || '') : (item.location || '');
    return '<article class="story-card food-card reveal">' +
      '<div class="story-card-media" data-img="' + item.img + '" data-cap="' + esc(name) + '">' +
        '<img src="' + item.img + '" alt="' + esc(name) + '" loading="lazy">' +
        '<span class="card-index">' + String(index + 1).padStart(2, '0') + '</span>' +
        (item.video ? '<span class="food-video-tag">' + (EN() ? 'VIDEO' : '视频') + '</span>' : '') +
        '<button class="card-zoom" aria-label="' + (EN() ? 'Enlarge' : '放大查看') + '">' + APP.icon('zoom') + '</button>' +
      '</div>' +
      '<div class="story-card-body">' +
        '<div class="card-meta">' + (loc ? '<span>' + esc(loc) + '</span>' : '') +
          '<span>' + (EN() ? 'FLAVOUR' : '味道') + '</span></div>' +
        '<h3>' + esc(name) + '</h3>' +
        '<p class="card-desc">' + esc(F(item, 'desc')) + '</p>' +
        '<div class="card-footer"><button data-detail="' + item.id + '">' + (EN() ? 'Read story' : '阅读详情') + '</button>' +
          (item.video ? '<button class="play-link" data-video="' + item.video + '" data-title="' + esc(name) + '">' + (EN() ? 'Watch ▶' : '看视频 ▶') + '</button>' : '<span class="muted">' + (EN() ? 'LOCAL' : '本地') + '</span>') +
        '</div>' +
      '</div></article>';
  }

  function renderGroups() {
    const box = document.getElementById('foodGroups');
    const count = document.getElementById('foodCount');
    if (!box) return;

    const list = citiesWithFood().filter(c => !state.cityId || c.id === state.cityId);
    const total = list.reduce((sum, c) => sum + foodCountOf(c.id), 0);

    box.innerHTML = list.map(city => {
      const dishes = D.foods.filter(f => f.cityId === city.id);
      return '<section class="food-group">' +
        '<div class="food-group-head"><h3>' + esc(EN() ? city.nameEn : city.name) +
          '<span>' + esc(EN() ? city.regionEn : city.region) + '</span></h3>' +
          '<div class="food-group-count">' + (EN() ? dishes.length + ' dishes' : dishes.length + ' 种味道') + '</div></div>' +
        '<p class="food-group-intro">' + esc(EN() ? city.introEn : city.intro) + '</p>' +
        '<div class="card-grid">' + dishes.map((d, i) => cardHTML(d, i)).join('') + '</div>' +
      '</section>';
    }).join('');

    if (count) {
      const cityObj = state.cityId ? cityById(state.cityId) : null;
      const label = cityObj ? (EN() ? cityObj.nameEn : cityObj.name) : (EN() ? 'all cities' : '全部城市');
      count.textContent = EN() ? total + ' dishes · ' + label : total + ' 种味道 · ' + label;
    }

    bind(box);
    APP.observeReveals(box);
  }

  function bind(box) {
    box.querySelectorAll('.story-card-media').forEach(media => {
      media.addEventListener('click', e => {
        if (e.target.closest('.card-zoom')) return;
        APP.openLightbox(media.dataset.img, media.dataset.cap);
      });
    });
    box.querySelectorAll('.card-zoom').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const media = btn.closest('.story-card-media');
        APP.openLightbox(media.dataset.img, media.dataset.cap);
      });
    });
    box.querySelectorAll('[data-detail]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = D.foods.find(f => f.id === btn.dataset.detail);
        if (item) APP.openDetail(item, 'food');
      });
    });
    box.querySelectorAll('[data-video]').forEach(btn => {
      btn.addEventListener('click', () => APP.openVideo(btn.dataset.video, btn.dataset.title));
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
    renderGroups();

    /* 抽屉交互 */
    const closeBtn = document.getElementById('dpClose');
    if (closeBtn) closeBtn.addEventListener('click', e => { e.stopPropagation(); closePanel(); });
    const hero = document.getElementById('dpHero');
    if (hero) hero.addEventListener('click', e => {
      /* 关闭按钮就在大图里，点它时不能再触发放大 */
      if (e.target.closest('.dp-close')) return;
      const item = state.view === 'dish' ? dishById(state.dishId) : (state.cityId ? cityById(state.cityId) : null);
      if (item) APP.openLightbox(item.img, EN() ? (item.nameEn || item.name) : item.name);
    });
    const picker = document.getElementById('dishPicker');
    if (picker) picker.addEventListener('change', () => {
      if (picker.value) openDish(picker.value);
      else closePanel();
    });
    const stage = document.getElementById('mapSection');
    if (stage) stage.addEventListener('click', e => {
      if (!e.target.closest('.map-marker') && !e.target.closest('.map-picker')) closePanel();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

    if (detailParam) {
      const item = D.foods.find(f => f.id === detailParam);
      if (item) setTimeout(() => openDish(item.id), 320);
    } else if (matched) {
      setTimeout(() => openCity(matched.id), 320);
      const anchor = document.getElementById('mapSection');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.addEventListener('sx:language', () => {
      const keepCity = state.cityId;
      const keepDish = state.dishId;
      renderMap();
      buildPicker();
      renderFilters();
      renderGroups();
      if (keepDish && dishById(keepDish)) {
        renderDish(dishById(keepDish));
        focusItem(dishById(keepDish));
      } else if (keepCity && cityById(keepCity)) renderCity(cityById(keepCity));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
