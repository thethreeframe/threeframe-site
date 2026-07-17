(function () {
  var btn = document.getElementById('menuTrigger');
  var menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

(function () {
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(function (el) { observer.observe(el); });
})();

(function () {
  var forms = document.querySelectorAll('.inquiry-form');
  forms.forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString();
      var email = (data.get('email') || '').toString();
      var project = (data.get('project') || '').toString();
      var details = (data.get('details') || '').toString();
      var subject = encodeURIComponent('New inquiry from ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\nLooking for: ' + project + '\n\n' + details
      );
      status.textContent = 'Opening your email client…';
      window.location.href = 'mailto:thethreeframe@gmail.com?subject=' + subject + '&body=' + body;
    });
  });
})();

(function () {
  var openBtn = document.getElementById('openInquiry');
  var closeBtn = document.getElementById('modalClose');
  var backdrop = document.getElementById('modalBackdrop');
  var sheet = document.getElementById('modalSheet');
  if (!openBtn || !sheet || !backdrop) return;

  function openModal() {
    backdrop.classList.add('is-open');
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var firstField = sheet.querySelector('input, select, textarea');
    if (firstField) firstField.focus();
  }
  function closeModal() {
    backdrop.classList.remove('is-open');
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sheet.classList.contains('is-open')) closeModal();
  });
})();
