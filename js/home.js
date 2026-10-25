(function () {
  'use strict';
  function initHome() {
    const gate = document.getElementById('languageGate');
    let chosen = false;
    try { chosen = sessionStorage.getItem('sx-language-chosen') === 'yes'; } catch (e) {}
    if (!chosen) {
      gate.classList.add('open');
      document.body.classList.add('modal-open');
    }
    gate.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
      window.SX_APP.setLang(button.dataset.lang);
      try { sessionStorage.setItem('sx-language-chosen', 'yes'); } catch (e) {}
      gate.classList.remove('open');
      document.body.classList.remove('modal-open');
    }));

    const video = document.getElementById('heroVideo');
    const sound = document.getElementById('soundToggle');
    sound.addEventListener('click', () => {
      video.muted = !video.muted;
      sound.classList.toggle('playing', !video.muted);
      sound.querySelector('span:last-child').textContent = video.muted ? (window.SX_APP.getLang() === 'en' ? 'Sound on' : '聆听山河') : (window.SX_APP.getLang() === 'en' ? 'Mute' : '关闭声音');
      if (!video.muted) video.play().catch(() => {});
    });

    const cinema = document.querySelector('.cinema-section');
    const background = document.getElementById('cinemaBg');
    let ticking = false;
    function parallax() {
      const rect = cinema.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
        background.style.transform = `translate3d(0, ${(progress - .5) * 70}px, 0)`;
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(parallax); ticking = true; } }, { passive: true });
    parallax();

    /* 城市缩影地图：天地图真实底图，光点可直接跳转到对应城市 */
    const mapBox = document.getElementById('homeMap');
    if (mapBox && window.SX_MAP) {
      const atlas = window.SX_MAP.create(mapBox, { interactive: false });
      if (atlas) {
        const draw = () => {
          atlas.clearMarkers();
          const english = window.SX_APP.getLang() === 'en';
          (window.SX_DATA.cities || []).forEach(city => {
            atlas.addMarker(city, {
              county: city.county,
              major: city.major,
              label: english ? city.nameEn : city.name,
              href: './scenic.html?city=' + encodeURIComponent(city.name)
            });
          });
        };
        draw();
        window.addEventListener('sx:language', draw);
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHome); else initHome();
})();
