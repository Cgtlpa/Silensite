(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var btn = document.querySelector('.menu-btn');
  var drawer = document.getElementById('nav-links');
  var mq = window.matchMedia('(max-width: 760px)');

  function isOpen() { return root.classList.contains('menu-open'); }

  function setOpen(open, returnFocus) {
    root.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');
    if (!open && returnFocus) btn.focus({ preventScroll: true });
  }

  if (btn && drawer) {
    btn.addEventListener('click', function () { setOpen(!isOpen(), false); });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false, false);
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { setOpen(false, true); return; }
      if (e.key === 'Tab') {
        var items = [btn].concat([].slice.call(drawer.querySelectorAll('a[href]')));
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    var onChange = function () { if (!mq.matches && isOpen()) setOpen(false, false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
  }

  // About page: mark the table of contents entry for the section in view
  var tocLinks = [].slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('on'); });
          var a = map[en.target.id];
          if (a) a.classList.add('on');
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
