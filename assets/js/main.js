/* WÄRME — site interactions */
(function () {
  var doc = document.documentElement;
  doc.classList.remove('no-js');

  /* Header: solid background once the hero scrolls away */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); }
    });
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Forms (front-end only — connect to your form/CRM provider) */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var target = form.getAttribute('data-success');
      var success = target ? document.getElementById(target) : form.parentElement.querySelector('.thanks');
      if (success) {
        form.style.display = 'none';
        success.classList.add('show');
        success.style.display = 'block';
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  });

  /* Weekly schedule (classes page) */
  var sched = document.getElementById('schedule');
  if (sched) {
    var C = {
      flow:    { n: 'Wärme Flow',      d: 'Heated vinyasa',            t: '95–100°F', h: 3, len: '60 min', room: 'Studio I' },
      sculpt:  { n: 'Wärme Sculpt',    d: 'Hot yoga with light weights', t: '95°F',   h: 3, len: '50 min', room: 'Studio II' },
      pilates: { n: 'Hot Pilates',     d: 'Infrared mat pilates',      t: '90–95°F', h: 2, len: '50 min', room: 'Studio II' },
      red:     { n: 'Into the Red',    d: 'Signature 75-minute practice', t: '100°F', h: 3, len: '75 min', room: 'Studio I' },
      slow:    { n: 'Slow Burn',       d: 'Warm yin & breath',         t: '85–90°F', h: 1, len: '60 min', room: 'Studio I' },
      restore: { n: 'Red Light Restore', d: 'Recovery under red light', t: '85°F',   h: 1, len: '45 min', room: 'Studio II' }
    };
    var week = {
      Mon: [['6:00 am', 'flow'], ['7:15 am', 'sculpt'], ['9:30 am', 'pilates'], ['12:15 pm', 'flow'], ['5:30 pm', 'red'], ['7:15 pm', 'slow']],
      Tue: [['6:00 am', 'sculpt'], ['7:15 am', 'flow'], ['9:30 am', 'flow'], ['12:15 pm', 'pilates'], ['5:30 pm', 'sculpt'], ['7:15 pm', 'restore']],
      Wed: [['6:00 am', 'flow'], ['7:15 am', 'pilates'], ['9:30 am', 'red'], ['12:15 pm', 'sculpt'], ['5:30 pm', 'flow'], ['7:15 pm', 'slow']],
      Thu: [['6:00 am', 'sculpt'], ['7:15 am', 'flow'], ['9:30 am', 'pilates'], ['12:15 pm', 'flow'], ['5:30 pm', 'red'], ['7:15 pm', 'restore']],
      Fri: [['6:00 am', 'flow'], ['7:15 am', 'sculpt'], ['9:30 am', 'flow'], ['12:15 pm', 'pilates'], ['5:00 pm', 'slow']],
      Sat: [['7:30 am', 'red'], ['9:00 am', 'flow'], ['10:30 am', 'sculpt'], ['12:00 pm', 'pilates'], ['4:00 pm', 'restore']],
      Sun: [['8:00 am', 'flow'], ['9:30 am', 'red'], ['11:00 am', 'pilates'], ['4:30 pm', 'slow'], ['6:00 pm', 'restore']]
    };
    var tabs = sched.querySelectorAll('.tab');
    var list = sched.querySelector('.sched-list');
    function dots(h) {
      var s = '<span class="dots" aria-label="Heat level ' + h + ' of 3">';
      for (var i = 1; i <= 3; i++) s += '<i class="' + (i <= h ? '' : 'off') + '"></i>';
      return s + '</span>';
    }
    function render(day) {
      list.innerHTML = week[day].map(function (r) {
        var c = C[r[1]];
        return '<div class="sched-row" role="listitem">' +
          '<span class="time">' + r[0] + '</span>' +
          '<span class="name">' + c.n + '<small>' + c.d + ' · ' + c.len + '</small></span>' +
          '<span class="room">' + c.room + '</span>' +
          '<span class="temp">' + c.t + ' &nbsp;' + dots(c.h) + '</span>' +
          '<a class="btn btn--dark btn--sm" href="membership.html#intro">Book</a>' +
          '</div>';
      }).join('');
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); t.tabIndex = -1; });
        tab.setAttribute('aria-selected', 'true'); tab.tabIndex = 0;
        render(tab.dataset.day);
      });
      tab.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!k) return;
        var next = tabs[(i + k + tabs.length) % tabs.length];
        next.focus(); next.click();
      });
    });
    var today = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
    var start = sched.querySelector('.tab[data-day="' + today + '"]') || tabs[0];
    start.click();
  }

  /* Footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
