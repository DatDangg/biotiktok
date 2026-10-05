/* PEDA EDU - static clone, JS tối giản */
(function () {
  'use strict';

  var list = document.querySelector('.content-list');

  /* Gắn UTM cho mọi link ra ngoài:
     ?utm_medium=social&utm_source=<source>&utm_campaign=<tên button> */
  if (list) {
    var utmMedium = list.getAttribute('data-utm') || 'social';
    var utmSource = list.getAttribute('data-source') || 'pedalink';

    document.querySelectorAll('.content-list a[href^="http"]').forEach(function (a) {
      var url;
      try {
        url = new URL(a.getAttribute('href'));
      } catch (e) {
        return;
      }
      url.searchParams.set('utm_medium', utmMedium);
      url.searchParams.set('utm_source', utmSource);
      url.searchParams.set('utm_campaign', a.getAttribute('data-campaign') || '');
      a.href = url.toString();
    });
  }

  /* Nút "featured" (2K9) chạy animation jello, giống bản gốc */
  var featured = document.querySelector('.btn.jello');
  if (featured && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(function () {
      featured.classList.add('animate');
    }, 400);
  }

  /* Chặm tay: bỏ animation khi bấm giữ để không nhảy layout */
  document.querySelectorAll('.btn.jello').forEach(function (el) {
    el.addEventListener('pointerdown', function () {
      el.classList.remove('animate');
    });
  });

  /* Bỏ ripple/click delay: giữ hành vi mở tab như bản gốc */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    a.addEventListener('click', function () {
      a.rel = 'noopener noreferrer';
    });
  });
})();