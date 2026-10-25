/* =========================================================
   真实地图模块（OpenLayers 10 + 天地图）
   ---------------------------------------------------------
   ★ 想用天地图正图：把下面 token 填成你的「天地图密钥」（tk）
     申请地址：https://console.tianditu.gov.cn/api/key
     填好保存后刷新页面，底图与版权信息会自动切换成天地图。

   ★ 暂时没有密钥也能正常显示：会自动使用备用底图，
     页面不会出现空白地图。
   ========================================================= */
(function () {
  'use strict';

  const CONFIG = {
    /* 天地图密钥（tk），留空则自动使用备用底图 */
    token: 'c30e5b6adb5443eb95e4d89df28f19bf',
    /* 天地图底图类型：'img' 影像 | 'vec' 矢量 | 'ter' 地形 */
    layer: 'vec',
    /* 陕西省外接矩形（经纬度）：西、南、东、北 */
    bounds: [105.35, 31.55, 111.35, 39.75],
    /* 省外遮罩颜色，与首页深色板块背景一致 */
    maskColor: 'rgba(37,45,58,1)',
    minZoom: 5.5,
    maxZoom: 16
  };

  const TDT_LAYERS = {
    img: { base: 'img', label: 'cia' },
    vec: { base: 'vec', label: 'cva' },
    ter: { base: 'ter', label: 'cta' }
  };

  /* 备用底图：高德路网（无需密钥，仅作没有天地图密钥时的兜底） */
  const FALLBACK_URLS = [1, 2, 3, 4].map(i =>
    'https://webrd0' + i + '.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
  );

  const TDT_SUB = ['0', '1', '2', '3', '4', '5', '6', '7'];

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
  }

  /* 天地图 WMTS（EPSG:3857 / 球面墨卡托，对应矩阵集 w）瓦片地址 */
  function tdtUrls(name) {
    return TDT_SUB.map(i =>
      'https://t' + i + '.tianditu.gov.cn/' + name + '_w/wmts' +
      '?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
      '&LAYER=' + name + '&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}' +
      '&tk=' + encodeURIComponent(CONFIG.token)
    );
  }

  /* 从 data.js 的 coord 字段解析经纬度，例如 '34.34° N · 108.94° E' */
  function cityLngLat(city) {
    if (!city) return null;
    if (typeof city.lng === 'number' && typeof city.lat === 'number') return [city.lng, city.lat];
    const m = /([\d.]+)\s*°\s*N[^\d]*([\d.]+)\s*°\s*E/i.exec(city.coord || '');
    return m ? [parseFloat(m[2]), parseFloat(m[1])] : null;
  }

  function buildLayers() {
    const hasToken = !!(CONFIG.token && CONFIG.token.trim());
    const pair = TDT_LAYERS[CONFIG.layer] || TDT_LAYERS.img;
    const layers = [];

    if (hasToken) {
      layers.push(new ol.layer.Tile({
        source: new ol.source.XYZ({ urls: tdtUrls(pair.base), projection: 'EPSG:3857' })
      }));
      layers.push(new ol.layer.Tile({
        source: new ol.source.XYZ({ urls: tdtUrls(pair.label), projection: 'EPSG:3857' })
      }));
    } else {
      layers.push(new ol.layer.Tile({
        source: new ol.source.XYZ({ urls: FALLBACK_URLS, projection: 'EPSG:3857' })
      }));
    }
    return { layers: layers, fallback: !hasToken };
  }

  /* 用省界把陕西省以外的区域遮住，让陕西轮廓突出（首页缩影图用） */
  function addProvinceMask(map, color) {
    const rings = window.SX_SHAANXI_BOUNDARY;
    if (!rings || !rings.length) return;

    const world = [[-180, -85], [180, -85], [180, 85], [-180, 85], [-180, -85]];

    function signedArea(ring) {
      let sum = 0;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        sum += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
      }
      return sum;
    }

    const worldSign = signedArea(world);
    const holes = rings.map(function (ring) {
      const hole = ring.map(function (p) { return [p[0], p[1]]; });
      /* 洞的绕向要与外环相反，否则挖不出来 */
      if (signedArea(hole) * worldSign > 0) hole.reverse();
      return hole;
    });

    const maskGeom = new ol.geom.Polygon([world].concat(holes))
      .transform('EPSG:4326', 'EPSG:3857');
    map.addLayer(new ol.layer.Vector({
      source: new ol.source.Vector({ features: [new ol.Feature(maskGeom)] }),
      style: new ol.style.Style({ fill: new ol.style.Fill({ color: color }) }),
      zIndex: 20
    }));

    const outlineGeom = new ol.geom.MultiPolygon(holes.map(function (hole) { return [hole]; }))
      .transform('EPSG:4326', 'EPSG:3857');
    map.addLayer(new ol.layer.Vector({
      source: new ol.source.Vector({ features: [new ol.Feature(outlineGeom)] }),
      style: new ol.style.Style({
        fill: null,
        stroke: new ol.style.Stroke({ color: 'rgba(180,154,106,.85)', width: 1.2 })
      }),
      zIndex: 21
    }));
  }

  /**
   * 在指定容器里创建一张真实地图
   * @param {HTMLElement} container 地图容器
   * @param {Object} options { mask: 遮住省外区域, bare: 去掉地图框底与投影, interactive: 关闭拖拽/缩放, padding: 视图留白 }
   * @returns {Object|null} { map, addMarker, clearMarkers, fit, fallback }
   */
  function create(container, options) {
    if (!container || !window.ol) return null;
    const opt = options || {};
    container.classList.add('real-map');
    if (opt.bare) container.classList.add('is-bare');

    /* 地图单独占一层，容器里原有的标题、图例、版权文字保持不动 */
    let canvas = container.querySelector('.map-canvas');
    if (!canvas) {
      canvas = document.createElement('div');
      canvas.className = 'map-canvas';
      container.insertBefore(canvas, container.firstChild);
    }
    canvas.innerHTML = '';
    void canvas.offsetWidth; /* 先完成一次布局，避免 OpenLayers 读到 0 尺寸 */

    const built = buildLayers();

    const map = new ol.Map({
      target: canvas,
      layers: built.layers,
      controls: [],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([(CONFIG.bounds[0] + CONFIG.bounds[2]) / 2, (CONFIG.bounds[1] + CONFIG.bounds[3]) / 2]),
        zoom: 7,
        minZoom: CONFIG.minZoom,
        maxZoom: CONFIG.maxZoom
      })
    });

    /* 地图铺在整屏上时，滚轮缩放会抢走页面滚动，这里只保留拖拽与双击缩放 */
    if (opt.wheel === false) {
      map.getInteractions().getArray().slice().forEach(item => {
        if (item instanceof ol.interaction.MouseWheelZoom) map.removeInteraction(item);
      });
    }
    /* 小尺寸缩略图不开启拖拽，避免和页面滚动打架 */
    if (opt.interactive === false) {
      map.getInteractions().getArray().slice().forEach(item => map.removeInteraction(item));
    }

    const view = map.getView();
    const extent = ol.proj.transformExtent(CONFIG.bounds, 'EPSG:4326', 'EPSG:3857');
    map.updateSize();
    view.fit(extent, { padding: opt.padding || [0, 0, 0, 0], duration: 0 });

    if (opt.mask) addProvinceMask(map, opt.maskColor || CONFIG.maskColor);

    /* 版权信息：天地图要求标注来源 */
    const credit = document.createElement('span');
    credit.className = 'map-credit';
    credit.textContent = built.fallback
      ? '© 高德地图 · 备用底图'
      : '© 天地图 · 国家地理信息公共服务平台';
    container.appendChild(credit);

    const markerOverlays = [];
    let focusOverlay = null;

    function addMarker(city, cfg) {
      cfg = cfg || {};
      const lngLat = cityLngLat(city);
      if (!lngLat) return null;

      const side = cfg.side || city.side || '';
      const left = side === 'left';
      const top = side === 'top';
      const el = document.createElement(cfg.href ? 'a' : 'button');
      if (cfg.href) el.href = cfg.href;
      else { el.type = 'button'; el.disabled = !!cfg.disabled; }
      el.className = 'map-marker'
        + (cfg.county ? ' county' : '')
        + (cfg.major ? ' major' : '')
        + (left ? ' side-left' : '')
        + (top ? ' side-top' : '');
      el.dataset.id = city.id;
      el.setAttribute('aria-label', cfg.label || city.name);
      el.innerHTML = '<span class="marker-dot"></span><span class="marker-label">' + esc(cfg.label || city.name) + '</span>';
      if (cfg.disabled) el.style.opacity = '.32';
      else if (cfg.onClick) el.addEventListener('click', e => { e.stopPropagation(); cfg.onClick(); });

      const overlay = new ol.Overlay({
        element: el,
        position: ol.proj.fromLonLat(lngLat),
        positioning: top ? 'bottom-center' : (left ? 'center-right' : 'center-left'),
        offset: top ? [0, 8] : (left ? [4, 0] : [-4, 0]),
        stopEvent: true
      });
      map.addOverlay(overlay);
      markerOverlays.push(overlay);
      return el;
    }

    function clearMarkers() {
      markerOverlays.forEach(function (ov) { map.removeOverlay(ov); });
      markerOverlays.length = 0;
    }

    /* 飞到某个条目（景点 / 非遗 / 美食）的位置 */
    function focusOn(coord, label, zoom) {
      if (!coord) return;
      if (focusOverlay) { map.removeOverlay(focusOverlay); focusOverlay = null; }
      const el = document.createElement('div');
      el.className = 'map-focus';
      el.innerHTML = '<span class="focus-ring"></span><span class="focus-label">' + esc(label || '') + '</span>';
      focusOverlay = new ol.Overlay({
        element: el,
        position: ol.proj.fromLonLat(coord),
        positioning: 'bottom-center',
        offset: [0, 9],
        stopEvent: false
      });
      map.addOverlay(focusOverlay);
      view.animate({
        center: ol.proj.fromLonLat(coord),
        zoom: Math.max(view.getZoom(), zoom || 10.5),
        duration: 700
      });
    }

    /* 回到全省视野，并清掉定位点 */
    function resetView() {
      if (focusOverlay) { map.removeOverlay(focusOverlay); focusOverlay = null; }
      view.fit(extent, { padding: opt.padding || [0, 0, 0, 0], duration: 700 });
    }

    function fit() {
      map.updateSize();
      view.fit(extent, { padding: opt.padding || [0, 0, 0, 0], duration: 0 });
    }

    window.addEventListener('resize', () => map.updateSize());

    return {
      map: map,
      addMarker: addMarker,
      clearMarkers: clearMarkers,
      focusOn: focusOn,
      resetView: resetView,
      fit: fit,
      fallback: built.fallback
    };
  }

  window.SX_MAP = { create: create, cityLngLat: cityLngLat, config: CONFIG };
})();
