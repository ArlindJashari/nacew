(function () {
  const REDUCED =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  function clamp01(n) {
    return Math.max(0, Math.min(1, n));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function interpolate(progress, stops, values) {
    if (progress <= stops[0]) return values[0];
    if (progress >= stops[stops.length - 1]) return values[values.length - 1];

    for (let i = 0; i < stops.length - 1; i += 1) {
      if (progress <= stops[i + 1]) {
        const local = (progress - stops[i]) / (stops[i + 1] - stops[i]);
        return lerp(values[i], values[i + 1], local);
      }
    }

    return values[values.length - 1];
  }

  function shadowForProgress(p) {
    const alpha = interpolate(p, [0, 0.45, 1], [0.55, 0.2, 0]);
    const blur = interpolate(p, [0, 0.45, 1], [100, 64, 0]);
    const y = interpolate(p, [0, 0.45, 1], [40, 24, 0]);
    if (alpha <= 0.001) return 'none';
    return `0 ${y}px ${blur}px rgba(0, 0, 0, ${alpha})`;
  }

  /** ProcessHero enterProgress — offset ["start end", "start 0.1"] */
  function enterProgress(targetEl) {
    const rect = targetEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh;
    const end = vh * 0.1;
    return clamp01((start - rect.top) / (start - end));
  }

  function applyStage(lane, stage, target) {
    const p = enterProgress(target);
    const scale = interpolate(p, [0, 0.55, 1], [0.84, 0.96, 1]);
    const radius = interpolate(p, [0, 0.72, 1], [52, 16, 0]);

    stage.style.transform = `scale(${scale})`;
    stage.style.borderRadius = `${radius}px`;
    stage.style.boxShadow = shadowForProgress(p);

    if (p >= 0.995) {
      lane.style.visibility = 'hidden';
      lane.style.opacity = '0';
    } else {
      lane.style.visibility = '';
      lane.style.opacity = '1';
    }
  }

  function bindScroll(lane, stage, target) {
    if (REDUCED) {
      lane.style.display = 'none';
      return;
    }

    const tick = () => {
      applyStage(lane, stage, target);
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  function init() {
    const lane = document.querySelector('.bento-enter');
    const stage = document.querySelector('.bento-enter-stage');
    const target = document.getElementById('why-nacew');
    if (!lane || !stage || !target) return false;
    if (lane.dataset.bentoBound === '1') return true;

    lane.dataset.bentoBound = '1';
    bindScroll(lane, stage, target);
    return true;
  }

  function boot() {
    if (init()) return;

    let attempts = 0;
    const poll = window.setInterval(() => {
      attempts += 1;
      if (init() || attempts > 150) window.clearInterval(poll);
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
