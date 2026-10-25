// GA4 イベント計測（クリック系）
(function(){
  if (typeof gtag !== 'function') return;
  document.addEventListener('click', function(e){
    var a = e.target.closest('a'); if (!a) return;
    var href = a.getAttribute('href') || '';
    if (a.dataset.cta) gtag('event', 'cta_click', { cta_location: a.dataset.cta, page_path: location.pathname });
    else if (a.dataset.article) gtag('event', 'article_click', { article: a.dataset.article });
    else if (href.indexOf('mailto:') === 0) gtag('event', 'mail_click', { page_path: location.pathname });
    else if (/^https?:\/\//.test(href) && a.hostname !== location.hostname) gtag('event', 'outbound_click', { link_url: href });
  }, { passive: true });
  // FAQ の開閉（どの質問が読まれているか）
  document.querySelectorAll('details.faq-item').forEach(function(d){
    d.addEventListener('toggle', function(){ if (d.open) gtag('event', 'faq_open', { question: d.querySelector('summary').textContent.trim().slice(0,80), page_path: location.pathname }); });
  });
})();
