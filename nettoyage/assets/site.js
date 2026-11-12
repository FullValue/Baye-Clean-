/* Numéro WhatsApp au format international, sans le + ni le 0 initial */
var WHATSAPP = '33652272440';

document.documentElement.classList.add('js');

/* Menu mobile */
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* Menus déroulants Particuliers / Entreprises */
(function () {
  var items = document.querySelectorAll('.has-sub');
  if (!items.length) return;
  function closeAll(except) {
    items.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('open');
      li.querySelector('.sub-btn').setAttribute('aria-expanded', 'false');
    });
  }
  items.forEach(function (li) {
    var btn = li.querySelector('.sub-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      closeAll(li);
    });
  });
  document.addEventListener('click', function () { closeAll(null); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(null); });
})();

/* Apparition au défilement */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { io.observe(e); });
})();

/* Carte des départements */
(function () {
  var map = document.querySelector('.map-svg');
  var panel = document.querySelector('.map-panel');
  if (!map || !panel) return;
  var title = panel.querySelector('h3');
  var note = panel.querySelector('p');
  var list = panel.querySelector('ul');
  var deps = map.querySelectorAll('.dep');
  var chips = document.querySelectorAll('.map-chips button');
  var locked = null;

  function show(code) {
    var dep = map.querySelector('.dep[data-dep="' + code + '"]');
    deps.forEach(function (d) { d.classList.toggle('on', d === dep); });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.dep === code ? 'true' : 'false'); });
    title.textContent = dep.dataset.num + ' · ' + dep.dataset.name;
    note.textContent = dep.dataset.note;
    list.innerHTML = '';
    dep.dataset.towns.split('|').forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      list.appendChild(li);
    });
  }
  deps.forEach(function (d) {
    d.addEventListener('click', function () { locked = d.dataset.dep; show(locked); });
    if (window.matchMedia('(hover: hover)').matches) {
      d.addEventListener('mouseenter', function () { show(d.dataset.dep); });
      d.addEventListener('mouseleave', function () { if (locked) show(locked); });
    }
  });
  chips.forEach(function (c) {
    c.addEventListener('click', function () { locked = c.dataset.dep; show(locked); });
  });
})();

/* Formulaire de devis vers WhatsApp */
(function () {
  var form = document.getElementById('devis-form');
  if (!form) return;

  var SERVICES = {
    pro: [
      ['entretien', 'Entretien régulier de locaux'],
      ['industriel', 'Site industriel ou logistique'],
      ['remise-en-etat', 'Remise en état ou fin de chantier'],
      ['vitrerie', 'Vitrerie et surfaces vitrées'],
      ['textiles', 'Moquettes, sièges et textiles'],
      ['autre', 'Autre besoin']
    ],
    part: [
      ['canape', 'Canapé ou mobilier'],
      ['literie', 'Matelas et literie'],
      ['tapis', 'Tapis'],
      ['moquette', 'Moquette'],
      ['sols', 'Parquet ou sol dur'],
      ['odeurs', 'Odeurs et acariens'],
      ['autre', 'Autre besoin']
    ]
  };

  var service = form.elements.prestation;
  var sent = document.getElementById('devis-sent');
  var sentLink = document.getElementById('devis-link');

  var isPro = form.dataset.profil === 'pro';

  /* Préremplissage depuis les liens du site : devis.html?prestation=industriel&secteur=... */
  var q = new URLSearchParams(location.search);
  service.innerHTML = '<option value="">Choisir une prestation</option>';
  SERVICES[form.dataset.profil].forEach(function (s) {
    var o = document.createElement('option');
    o.value = s[0];
    o.textContent = s[1];
    if (s[0] === q.get('prestation')) o.selected = true;
    service.appendChild(o);
  });
  if (q.get('secteur') && form.elements.secteur) form.elements.secteur.value = q.get('secteur');

  function clearError(f) {
    f.classList.remove('bad');
    f.removeAttribute('aria-invalid');
    var e = document.getElementById(f.id + '-err');
    if (e) e.remove();
  }
  function setError(f, msg) {
    clearError(f);
    f.classList.add('bad');
    f.setAttribute('aria-invalid', 'true');
    var e = document.createElement('span');
    e.className = 'err';
    e.id = f.id + '-err';
    e.textContent = msg;
    f.setAttribute('aria-describedby', e.id);
    f.after(e);
  }
  var MESSAGES = {
    societe: 'Indiquez le nom de votre société.',
    nom: 'Indiquez votre nom.',
    telephone: 'Indiquez un numéro à 10 chiffres, par exemple 06 12 34 56 78.',
    ville: 'Indiquez la ville du site.',
    cp: 'Indiquez un code postal à 5 chiffres.',
    email: 'Vérifiez l’adresse e-mail, par exemple nom@societe.fr.',
    prestation: 'Choisissez une prestation.'
  };
  form.querySelectorAll('input, select, textarea').forEach(function (f) {
    if (f.type === 'radio') return;
    f.addEventListener('input', function () { if (f.classList.contains('bad') && f.checkValidity()) clearError(f); });
    f.addEventListener('change', function () { if (f.classList.contains('bad') && f.checkValidity()) clearError(f); });
  });

  function validate() {
    var first = null;
    form.querySelectorAll('input, select, textarea').forEach(function (f) {
      if (f.type === 'radio') return;
      if (!f.checkValidity()) {
        setError(f, MESSAGES[f.name] || 'Vérifiez ce champ.');
        if (!first) first = f;
      } else clearError(f);
    });
    if (first) first.focus();
    return !first;
  }

  function val(name) {
    var f = form.elements[name];
    if (!f) return '';
    return String(f.value || '').trim();
  }
  function selectedText(f) {
    if (!f || !f.value) return '';
    return f.options[f.selectedIndex].textContent;
  }

  function buildMessage() {
    var freq = form.querySelector('input[name="frequence"]:checked');
    var date = val('date');
    if (date) date = date.split('-').reverse().join('/');
    var blocks = [
      ['Bonjour, je souhaite un devis.'],
      [
        'Profil : ' + (isPro ? 'Professionnel' : 'Particulier'),
        val('societe') && 'Société : ' + val('societe'),
        'Contact : ' + val('nom'),
        'Téléphone : ' + val('telephone'),
        val('email') && 'E-mail : ' + val('email')
      ],
      [
        'Prestation : ' + selectedText(service),
        selectedText(form.elements.secteur) && 'Secteur : ' + selectedText(form.elements.secteur),
        'Lieu : ' + [val('adresse'), val('cp'), val('ville')].filter(Boolean).join(', '),
        val('surface') && 'Surface ou quantité : ' + val('surface'),
        (isPro && freq) ? 'Fréquence : ' + freq.value : '',
        date && 'Date souhaitée : ' + date
      ],
      [val('message') && 'Précisions : ' + val('message')]
    ];
    return blocks.map(function (b) { return b.filter(Boolean).join('\n'); }).filter(Boolean).join('\n\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(buildMessage());
    sentLink.href = url;
    sent.hidden = false;
    var win = window.open(url, '_blank');
    if (win) win.opener = null;
    else location.href = url;
  });
})();
