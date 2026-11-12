(function () {
  var cfg = window.SITE_CFG;

  // Disponibilité en temps réel, calculée à l'heure de Paris.
  var hour = Number(new Intl.DateTimeFormat('fr-FR', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Europe/Paris' }).format(new Date()));
  var open = hour >= cfg.open && hour < cfg.close;
  document.querySelectorAll('[data-status]').forEach(function (el) {
    el.dataset.open = open ? '1' : '0';
    el.querySelector('span').textContent = open
      ? 'Disponible maintenant, jusqu\'à ' + cfg.close + ' h'
      : 'Fermé, réouverture à ' + cfg.open + ' h. Laissez un WhatsApp';
  });

  // Menu mobile.
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger) burger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Ferme le sous-menu Services quand on clique ailleurs.
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dropdown[open]').forEach(function (d) { if (!d.contains(e.target)) d.open = false; });
  });

  // Formulaire « besoin » : compose le message et ouvre WhatsApp. Rien n'est stocké sur le site.
  document.querySelectorAll('form[data-need]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { var f = form.elements[n]; return f ? String(f.value || '').trim() : ''; };
      var lines = ['Bonjour, j\'ai besoin d\'une intervention.', 'Besoin : ' + (v('besoin') || 'à préciser')];
      if (v('delai')) lines.push('Délai : ' + v('delai'));
      if (v('lieu')) lines.push('Lieu : ' + v('lieu'));
      if (v('nom')) lines.push('Nom : ' + v('nom'));
      if (v('details')) lines.push('Détails : ' + v('details'));
      window.open('https://wa.me/' + cfg.wa + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  });

  // Le bouton flottant s'efface quand un formulaire WhatsApp est déjà à l'écran.
  var floating = document.querySelector('.wa-float');
  if (floating && 'IntersectionObserver' in window) {
    var seen = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) seen.add(en.target); else seen.delete(en.target); });
      floating.classList.toggle('is-hidden', seen.size > 0);
    });
    document.querySelectorAll('.need,.urgent .actions,.closing .actions').forEach(function (el) { io.observe(el); });
  }

  // Vérification du code postal sur les pages secteurs.
  document.querySelectorAll('[data-zip]').forEach(function (box) {
    var input = box.querySelector('input');
    var out = box.querySelector('.zipcheck__out');
    input.addEventListener('input', function () {
      var z = input.value.replace(/\D/g, '');
      if (z.length < 5) { out.textContent = ''; return; }
      var dep = cfg.deps[z.slice(0, 2)];
      out.textContent = dep
        ? 'Oui, nous intervenons à ce code postal : ' + dep + '.'
        : 'Ce code postal est hors Île-de-France. Écrivez-nous quand même, nous vous dirons ce qui est possible.';
    });
  });
})();
