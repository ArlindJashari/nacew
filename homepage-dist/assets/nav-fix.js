/* ---------------------------------------------------------------------------
   Mobile-menu cross-page navigation fix.

   The mobile menus (Framer nav on the homepage, custom nav on /about) close
   themselves on tap via a handler that re-renders and unmounts the menu link.
   For in-page hash links that's fine (Framer scrolls first). But for links to
   a DIFFERENT document (/about/, /) the link is torn out of the DOM before the
   browser's tap-driven navigation resolves, so the menu just closes and you go
   nowhere.

   We intercept the tap in the CAPTURE phase — which always runs before the
   menu's own (bubble-phase) close handler — and perform the navigation
   ourselves for cross-document menu links. Hash / mailto / tel links are left
   untouched so their existing behaviour (smooth scroll, mail client) stays.
--------------------------------------------------------------------------- */
(function () {
  var MENU_SELECTOR =
    '.framer-1xw88z8-container, .nacew-nav-mobile-panel, .nacew-nav--mobile';

  function isCrossDocument(href) {
    if (!href) return false;
    var h = href.trim();
    if (h.charAt(0) === '#') return false;            // in-page anchor
    if (h.indexOf('#') === 0) return false;
    if (h.indexOf('./#') === 0 || h.indexOf('/#') === 0) return false; // home hash links
    if (/^(mailto:|tel:|sms:)/i.test(h)) return false;
    return true; // /about/, /, https://…
  }

  var downX = 0,
    downY = 0;

  document.addEventListener(
    'pointerdown',
    function (e) {
      downX = e.clientX;
      downY = e.clientY;
    },
    true
  );

  function maybeNavigate(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (!a.closest(MENU_SELECTOR)) return;

    var href = a.getAttribute('href');
    if (!isCrossDocument(href)) return;

    // ignore drags / scroll gestures
    if (
      e.clientX != null &&
      (Math.abs(e.clientX - downX) > 10 || Math.abs(e.clientY - downY) > 10)
    ) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    window.location.assign(a.href);
  }

  // pointerup fires before the menu's click/pointerup close handler (capture);
  // click is the mouse/keyboard fallback.
  document.addEventListener('pointerup', maybeNavigate, true);
  document.addEventListener('click', maybeNavigate, true);
})();
