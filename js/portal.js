(function () {
  'use strict';
  const CARDS = [
    { title: '特色风景', en: 'Landscapes', subtitle: '山河万里', subEn: 'Across the land', tag: '风景', tagEn: 'SCENERY', image: './image/scenic4.jpg', href: './scenic.html' },
    { title: '民俗文化', en: 'Living Culture', subtitle: '薪火相传', subEn: 'Traditions alive', tag: '民俗', tagEn: 'CULTURE', image: './image/culture29.jpg', href: './culture.html' },
    { title: '特色美食', en: 'Local Flavours', subtitle: '一城一味', subEn: 'A taste of place', tag: '美食', tagEn: 'FLAVOUR', image: './image/card3.jpg', href: './food.html' },
    { title: '汉人老家', en: 'Chenggu Stories', subtitle: '城固特辑', subEn: 'Chenggu collection', tag: '城固', tagEn: 'CHENGGU', image: './image/card2.jpg', href: './scenic.html?city=城固' },
    { title: '秦岭秘境', en: 'Qinling Wilderness', subtitle: '中央山脉', subEn: 'The central mountains', tag: '自然', tagEn: 'NATURE', image: './image/scenic18.jpg', href: './scenic.html?detail=scenic-4' },
    { title: '非遗文创', en: 'Creative Heritage', subtitle: '古艺新生', subEn: 'Old crafts, new forms', tag: '非遗', tagEn: 'HERITAGE', image: './image/card4.jpg', href: './culture.html#heritageSection' }
  ];
  function initPortal() {
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('indicators');
    const COUNT = CARDS.length;
    const STEP = 360 / COUNT;
    let radius = innerWidth < 700 ? 240 : 350;
    let rotation = 0, dragging = false, startX = 0, startRotation = 0, active = 0, timer = null, moved = false, pointerId = null;
    const cardEls = [];

    CARDS.forEach((card, i) => {
      const el = document.createElement('a');
      el.className = 'carousel-card'; el.href = card.href; el.style.opacity = '0';
      el.innerHTML = `<div class="card-inner"><div class="card-img"><img src="${card.image}" alt="" draggable="false"><div class="card-shade"></div><span class="card-no">${String(i + 1).padStart(2, '0')}</span><span class="card-tag"></span><div class="card-text"><p class="subtitle"></p><h3></h3><div class="card-hint"><span></span><b>↗</b></div></div></div></div>`;
      carousel.appendChild(el); cardEls.push(el);
      const dot = document.createElement('button'); dot.setAttribute('aria-label', `Card ${i + 1}`); dot.addEventListener('click', () => snapTo(i)); indicators.appendChild(dot);
      el.addEventListener('click', e => {
        if (moved) { e.preventDefault(); return; }
        if (i !== active) { e.preventDefault(); snapTo(i); }
      });
    });

    function updateText() {
      const english = window.SX_APP.getLang() === 'en';
      cardEls.forEach((el, i) => {
        const card = CARDS[i];
        el.querySelector('h3').textContent = english ? card.en : card.title;
        el.querySelector('.subtitle').textContent = english ? card.subEn : card.subtitle;
        el.querySelector('.card-tag').textContent = english ? card.tagEn : card.tag;
        el.querySelector('.card-img img').alt = english ? card.en : card.title;
      });
      render();
    }

    function transformFor(i) {
      const angle = (i * STEP - rotation) * Math.PI / 180;
      const x = Math.sin(angle) * radius, z = Math.cos(angle) * radius;
      const ry = -i * STEP + rotation, nz = (z + radius) / (2 * radius);
      const scale = .62 + nz * .42;
      return { transform: `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${i === active ? scale * 1.06 : scale})`, opacity: nz < .12 ? .12 : .25 + nz * .75, filter: `brightness(${i === active ? 1.03 : .38 + nz * .58})`, zIndex: Math.round(nz * 100) };
    }
    function render() {
      cardEls.forEach((el, i) => {
        const t = transformFor(i); Object.assign(el.style, { transform: t.transform, opacity: t.opacity, filter: t.filter, zIndex: t.zIndex });
        el.classList.toggle('active', i === active);
        el.querySelector('.card-hint span').textContent = i === active ? (window.SX_APP.getLang() === 'en' ? 'ENTER' : '点击进入') : (window.SX_APP.getLang() === 'en' ? 'FOCUS' : '点击聚焦');
      });
      indicators.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === active));
    }
    function startAuto() {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      clearInterval(timer); timer = setInterval(() => { if (!dragging) { rotation += .13; active = Math.round((((rotation % 360) + 360) % 360) / STEP) % COUNT; render(); } }, 50);
    }
    function stopAuto() { clearInterval(timer); timer = null; }
    function snapTo(index) {
      stopAuto();
      const target = index * STEP; let diff = target - (rotation % 360);
      if (diff > 180) diff -= 360; if (diff < -180) diff += 360;
      const from = rotation, change = diff, begin = performance.now();
      function frame(now) {
        const p = Math.min((now - begin) / 600, 1), ease = 1 - Math.pow(1 - p, 3);
        rotation = from + change * ease; active = index; render();
        if (p < 1) requestAnimationFrame(frame); else startAuto();
      }
      requestAnimationFrame(frame);
    }
    function pointerMove(e) {
      if (e.pointerId !== pointerId) return;
      if (Math.abs(e.clientX - startX) > 5) moved = true;
      rotation = startRotation + (e.clientX - startX) * .3;
      active = Math.round((((rotation % 360) + 360) % 360) / STEP) % COUNT; render();
    }
    function pointerUp(e) {
      if (e.pointerId !== pointerId) return;
      dragging = false; pointerId = null;
      removeEventListener('pointermove', pointerMove); removeEventListener('pointerup', pointerUp);
      if (moved) { rotation = Math.round(rotation / STEP) * STEP; active = Math.round((((rotation % 360) + 360) % 360) / STEP) % COUNT; render(); }
      startAuto(); setTimeout(() => { moved = false; }, 60);
    }
    carousel.addEventListener('pointerdown', e => { dragging = true; moved = false; pointerId = e.pointerId; startX = e.clientX; startRotation = rotation; stopAuto(); addEventListener('pointermove', pointerMove); addEventListener('pointerup', pointerUp); });
    addEventListener('resize', () => { radius = innerWidth < 700 ? 240 : 350; render(); });
    addEventListener('sx:language', updateText);
    updateText(); startAuto();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPortal); else initPortal();
})();
