/**
 * About ProgressiveBlur — 8 stacked backdrop layers (Midu how-we-work).
 * @see src/about/components/ProgressiveBlur.tsx
 */
(function () {
  const LAYERS = Array.from({ length: 8 }, (_, i) => ({
    blur: 0.13671875 * 2 ** i,
    mask: `linear-gradient(to bottom, rgba(0,0,0,0) ${i * 12.5}%, rgba(0,0,0,1) ${(i + 1) * 12.5}%, rgba(0,0,0,1) ${(i + 2) * 12.5}%, rgba(0,0,0,0) ${(i + 3) * 12.5}%)`,
  }));

  const HERO_ID = 'hero';
  const HEIGHT = 100;

  function mount() {
    if (document.querySelector('.progressive-blur')) return;

    const root = document.createElement('div');
    root.className = 'progressive-blur progressive-blur-bottom';
    root.setAttribute('aria-hidden', 'true');
    root.style.setProperty('--pb-height', `${HEIGHT}px`);

    for (let i = 0; i < LAYERS.length; i += 1) {
      const layer = LAYERS[i];
      const el = document.createElement('div');
      el.className = 'progressive-blur-layer';
      el.style.zIndex = String(i + 1);
      el.style.backdropFilter = `blur(${layer.blur}px)`;
      el.style.webkitBackdropFilter = `blur(${layer.blur}px)`;
      el.style.maskImage = layer.mask;
      el.style.webkitMaskImage = layer.mask;
      root.appendChild(el);
    }

    document.body.appendChild(root);
  }

  function sync() {
    const root = document.querySelector('.progressive-blur');
    if (!root) return;

    const hero = document.getElementById(HERO_ID);
    if (!hero) {
      root.classList.add('is-on');
      return;
    }

    const on = hero.getBoundingClientRect().bottom < window.innerHeight * 0.98;
    root.classList.toggle('is-on', on);
  }

  function init() {
    mount();
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
