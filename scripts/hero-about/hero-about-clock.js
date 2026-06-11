(function () {
  const el = document.getElementById('hero-about-time');
  if (!el) return;

  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Belgrade',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const tick = () => {
    el.textContent = `${fmt.format(new Date())} Gjilan, Kosovo`;
  };

  tick();
  window.setInterval(tick, 30_000);
})();
