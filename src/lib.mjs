import { SITE, tel, wa } from './config.mjs';
import { specimens } from './specimens.mjs';
import { logoImg } from './logo.mjs';
import { readFileSync } from 'node:fs';

const map = JSON.parse(readFileSync(new URL('./content/idf-map.json', import.meta.url)));

export const ICONS = {
  phone: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2A9.9 9.9 0 0 0 3.5 16.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07c0 1.22.89 2.4 1.01 2.57.13.16 1.75 2.67 4.24 3.74 1.57.68 2.19.74 2.97.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.23-.17-.48-.29z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
};

export const SERVICES = [
  { href: 'deratisation.html', name: 'Dératisation', key: 'rats', spec: 'rat', need: 'Rats ou souris', sign: 'Grattements la nuit, déjections, câbles ou emballages rongés.' },
  { href: 'punaises-de-lit.html', name: 'Punaises de lit', key: 'punaises', spec: 'punaise', need: 'Punaises de lit', sign: 'Piqûres alignées au réveil, points noirs sur le matelas.' },
  { href: 'cafards-blattes.html', name: 'Cafards, fourmis et puces', key: 'cafards', spec: 'cafard', need: 'Cafards, fourmis ou puces', sign: 'Fuite vers l\'évier quand la lumière s\'allume, colonnes sur les plinthes.' },
  { href: 'guepes-frelons.html', name: 'Guêpes et frelons', key: 'frelons', spec: 'frelon', need: 'Guêpes ou frelons', sign: 'Allées et venues sous un toit, nid dans un arbre ou un volet.' },
  { href: 'desinfection.html', name: 'Désinfection', key: 'desinfection', spec: 'desinfection', need: 'Désinfection', sign: 'Après rongeurs, sinistre, décès, logement insalubre.' },
];

export const DEP_NAMES = {
  75: 'Paris', 92: 'Hauts-de-Seine', 93: 'Seine-Saint-Denis', 94: 'Val-de-Marne',
  77: 'Seine-et-Marne', 78: 'Yvelines', 91: 'Essonne', 95: 'Val-d\'Oise',
};

export const btnCall = (cls = '', label = SITE.phone) => `<a class="btn btn--call ${cls}" href="${tel}">${ICONS.phone}${label}</a>`;
export const btnQuote = (cls = '', label = 'Demander un devis') => `<a class="btn btn--bright ${cls}" href="{{r}}devis.html">${ICONS.doc}${label}</a>`;
export const btnWa = (text, cls = '', label = 'WhatsApp') => `<a class="btn btn--wa ${cls}" href="${wa(text)}" target="_blank" rel="noopener">${ICONS.wa}${label}</a>`;
export const specimen = (k) => specimens[k];

export const needForm = ({ preset = '', title = 'Quel est votre besoin ?', urgent = false, full = false } = {}) => {
  const options = [...SERVICES.map((s) => s.need), 'Je ne sais pas'];
  const chosen = preset || options[0];
  const delays = ['Urgent, aujourd\'hui', 'Sous 48 h', 'Je me renseigne'];
  const chosenDelay = urgent ? delays[0] : delays[1];
  return `<form class="need" data-need action="https://wa.me/${SITE.wa}" target="_blank">
  <p class="need__title">${title}</p>
  <fieldset><legend>C'est pour</legend><div class="chips">
    ${options.map((o) => `<label><input type="radio" name="besoin" value="${o}"${o === chosen ? ' checked' : ''}><span>${o}</span></label>`).join('')}
  </div></fieldset>
  <fieldset><legend>Délai souhaité</legend><div class="chips">
    ${delays.map((d) => `<label><input type="radio" name="delai" value="${d}"${d === chosenDelay ? ' checked' : ''}><span>${d}</span></label>`).join('')}
  </div></fieldset>
  ${full ? `<label class="field"><span>Votre nom</span><input name="nom" autocomplete="name"></label>` : ''}
  <label class="field"><span>Ville ou code postal</span><input name="lieu" autocomplete="postal-code" placeholder="Ex. 75011, Créteil"></label>
  ${full ? `<label class="field"><span>Ce que vous avez observé</span><textarea name="details" placeholder="Depuis quand, dans quelle pièce, appartement ou maison…"></textarea></label>` : ''}
  <button class="btn btn--wa btn--lg" type="submit">${ICONS.wa}Envoyer sur WhatsApp</button>
  <div class="need__or"><a class="btn btn--ghost" href="${tel}">${ICONS.phone}Appeler le ${SITE.phone}</a></div>
  <p class="need__hint">Votre message s'ouvre dans WhatsApp, déjà rempli. Ajoutez une photo si vous pouvez, elle suffit souvent à identifier le nuisible.</p>
</form>`;
};

export const assure = (items) => `<ul class="assure">${items.map((i) => `<li>${ICONS.check}${i}</li>`).join('')}</ul>`;

export const steps = (items) => `<div class="steps-wrap"><ol class="steps">${items.map(([t, p]) => `<li><h3>${t}</h3><p>${p}</p></li>`).join('')}</ol></div>`;

export const faq = (items) => `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><div>${a}</div></details>`).join('')}</div>`;

export const idfMap = (current = null) => {
  const inner = ['92', '93', '94'];
  // Paris se dessine en dernier : le département est minuscule et doit rester cliquable.
  const order = ['77', '78', '91', '95', '92', '93', '94', '75'];
  const slugs = { 75: 'paris', 92: 'hauts-de-seine', 93: 'seine-saint-denis', 94: 'val-de-marne', 77: 'seine-et-marne', 78: 'yvelines', 91: 'essonne', 95: 'val-d-oise' };
  const labelPos = { 77: [590, 350], 78: [150, 290], 91: [300, 470], 95: [240, 95] };
  return `<svg class="idf" viewBox="0 0 ${map.w} ${map.h}" role="group" aria-label="Carte des départements d'Île-de-France">
  ${order.map((c) => {
    const d = map.deps[c];
    const cl = [c === String(current) ? 'is-current' : '', inner.includes(c) ? 'is-inner' : ''].join(' ').trim();
    return `<a href="{{r}}secteurs/${slugs[c]}.html" id="dep${c}" class="${cl}" aria-label="${DEP_NAMES[c]}"><title>${DEP_NAMES[c]} (${c})</title><path d="${d.d}"/></a>`;
  }).join('')}
  ${Object.entries(labelPos).map(([c, [x, y]]) => `<text x="${x}" y="${y}"${String(current) === c ? ' style="fill:white"' : ''}>${DEP_NAMES[c]}</text>`).join('')}
</svg>`;
};

export const depList = () => `<ul class="dep-list">
${[[75, 'paris'], [92, 'hauts-de-seine'], [93, 'seine-saint-denis'], [94, 'val-de-marne'], [77, 'seine-et-marne'], [78, 'yvelines'], [91, 'essonne'], [95, 'val-d-oise']]
  .map(([c, s]) => `<li><a href="{{r}}secteurs/${s}.html">${DEP_NAMES[c]} <span>${c}</span></a></li>`).join('')}
</ul>`;

export const closing = ({ title = 'Plus on attend, plus le traitement est lourd.', text = `Une photo sur WhatsApp ou un appel suffisent pour savoir à quoi vous avez affaire. Devis gratuit, ${SITE.hoursLabel}.`, need = 'Bonjour, j\'ai un problème de nuisibles. Pouvez-vous m\'aider ?' } = {}) => `
<section class="closing"><div class="wrap">
  <div><h2>${title}</h2><p>${text}</p></div>
  <div class="actions"><a class="btn btn--bright btn--lg" href="{{r}}devis.html">${ICONS.doc}Demander un devis</a><a class="btn btn--on-forest btn--lg" href="${tel}">${ICONS.phone}${SITE.phone}</a><a class="btn btn--on-forest btn--lg" href="${wa(need)}" target="_blank" rel="noopener">${ICONS.wa}WhatsApp</a></div>
</div></section>`;

const NAV = `
<details class="dropdown"><summary>Nos services</summary><div class="dropdown__panel">
  ${SERVICES.map((s) => `<a href="{{r}}${s.href}">${s.name}</a>`).join('')}
  <a href="{{r}}identifier-nuisible.html">Identifier un nuisible</a>
</div></details>
<a class="is-urgent" href="{{r}}urgence-nuisibles.html">Urgence</a>
<a href="{{r}}professionnels.html">Professionnels</a>
<a href="{{r}}secteurs/index.html">Secteurs</a>
<a href="{{r}}blog/index.html">Blog</a>
<a href="{{r}}contact.html">Contact</a>`;

export function render({ path, title, description, body, crumbs = null, schema = [], waText = 'Bonjour, j\'ai un problème de nuisibles.', extraCfg = {} }) {
  const depth = path.split('/').length - 1;
  const r = '../'.repeat(depth);
  const canonical = `${SITE.url}/${path.replace(/index\.html$/, '')}`;

  const breadcrumb = crumbs ? `<nav class="crumbs wrap" aria-label="Fil d'Ariane"><ol><li><a href="{{r}}index.html">Accueil</a></li>${crumbs.map(([l, h]) => `<li>${h ? `<a href="{{r}}${h}">${l}</a>` : `<span aria-current="page">${l}</span>`}</li>`).join('')}</ol></nav>` : '';

  const business = {
    '@context': 'https://schema.org', '@type': 'PestControl', name: SITE.name, url: SITE.url + '/', telephone: SITE.phoneIntl,
    areaServed: { '@type': 'AdministrativeArea', name: 'Île-de-France' },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: `0${SITE.openHour}:00`, closes: `${SITE.closeHour}:00` },
  };
  const crumbSchema = crumbs ? {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [['Accueil', 'index.html'], ...crumbs].map(([n, h], i) => ({ '@type': 'ListItem', position: i + 1, name: n, ...(h ? { item: `${SITE.url}/${h}` } : {}) })),
  } : null;
  const ld = [business, crumbSchema, ...schema].filter(Boolean).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');

  const cfg = {
    wa: SITE.wa, open: SITE.openHour, close: SITE.closeHour, deps: DEP_NAMES, ...extraCfg,
  };

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta name="theme-color" content="#13254f">
<link rel="icon" type="image/svg+xml" href="{{r}}assets/favicon.svg">
<link rel="preload" href="{{r}}assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{{r}}assets/style.css">
${ld}
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
<div class="strip"><div class="wrap">
  <nav class="strip__switch" aria-label="Univers Baye Clean"><a href="{{r}}../index.html">Baye Clean</a><span aria-current="true">Dératisation</span><a href="{{r}}../nettoyage/index.html">Nettoyage</a></nav>
  <span class="strip__info"><span class="status" data-status data-open="1"><i></i><span>${SITE.hoursLabel}</span></span><span class="hide-sm">Urgence nuisibles : <a href="${tel}">${SITE.phone}</a></span></span>
</div></div>
<header class="header"><div class="wrap">
  <a class="logo" href="{{r}}index.html" aria-label="${SITE.name} ${SITE.universe}, accueil">${logoImg({ base: '{{r}}../' })}<small>${SITE.universe}</small></a>
  <nav class="nav" aria-label="Navigation principale">${NAV}</nav>
  <a class="btn btn--bright header__quote" href="{{r}}devis.html">Devis gratuit</a>
  <a class="btn btn--call header__phone" href="${tel}">${ICONS.phone}${SITE.phone}</a>
  <button class="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false">${ICONS.menu}</button>
</div></header>
${breadcrumb}
<main id="contenu">
${body}
</main>
<footer class="footer"><div class="wrap">
  <div class="footer__grid">
    <div class="footer__brand">
      <a class="logo logo--full" href="{{r}}index.html" aria-label="${SITE.name}, accueil">${logoImg({ base: '{{r}}../' })}</a>
      <a class="footer__tel" href="${tel}">${SITE.phone}</a>
      <p>${SITE.hoursLabel}.<br>Dératisation, désinsectisation et désinfection à Paris et dans toute l'Île-de-France.</p>
    </div>
    <div><h4>Services</h4><ul>
      ${SERVICES.map((s) => `<li><a href="{{r}}${s.href}">${s.name}</a></li>`).join('')}
      <li><a href="{{r}}urgence-nuisibles.html">Urgence nuisibles</a></li>
      <li><a href="{{r}}identifier-nuisible.html">Identifier un nuisible</a></li>
    </ul></div>
    <div><h4>Secteurs</h4><ul>
      ${[[75, 'paris'], [92, 'hauts-de-seine'], [93, 'seine-saint-denis'], [94, 'val-de-marne'], [77, 'seine-et-marne'], [78, 'yvelines'], [91, 'essonne'], [95, 'val-d-oise']].map(([c, s]) => `<li><a href="{{r}}secteurs/${s}.html">${DEP_NAMES[c]} (${c})</a></li>`).join('')}
    </ul></div>
    <div><h4>L'entreprise</h4><ul>
      <li><a href="{{r}}devis.html">Devis</a></li>
      <li><a href="{{r}}professionnels.html">Professionnels</a></li>
      <li><a href="{{r}}a-propos.html">À propos</a></li>
      <li><a href="{{r}}blog/index.html">Blog</a></li>
      <li><a href="{{r}}contact.html">Contact</a></li>
      <li><a href="{{r}}../nettoyage/index.html">Baye Clean Nettoyage</a></li>
    </ul></div>
  </div>
  <div class="footer__legal"><span>© ${new Date().getFullYear()} ${SITE.name}</span><span><a href="{{r}}mentions-legales.html">Mentions légales</a> · <a href="{{r}}confidentialite.html">Confidentialité</a></span></div>
</div></footer>
<a class="wa-float" href="${wa(waText)}" target="_blank" rel="noopener" aria-label="Nous écrire sur WhatsApp">${ICONS.wa}WhatsApp</a>
<nav class="dock" aria-label="Contact rapide">
  <a class="dock__call" href="${tel}">${ICONS.phone}Appeler</a>
  <a class="dock__wa" href="${wa(waText)}" target="_blank" rel="noopener">${ICONS.wa}WhatsApp</a>
  <a class="dock__urg" href="{{r}}devis.html">Devis</a>
</nav>
<script>window.SITE_CFG=${JSON.stringify(cfg)}</script>
<script src="{{r}}assets/main.js" defer></script>
</body>
</html>`;
  // Typographie française : espace insécable devant la ponctuation haute et les unités, hors balises et scripts.
  const typo = (txt) => txt
    .replace(/ ([?!:;»])/g, '\u00A0$1')
    .replace(/« /g, '«\u00A0')
    .replace(/(\d) (€|h\b|m²|mm\b|cm\b|m\b|°C|%|jours\b|min\b|passages?\b)/g, '$1\u00A0$2');
  const parts = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<head>[\s\S]*?<\/head>)/);
  const fixed = parts.map((part, i) => (i % 2 ? part : part.replace(/>([^<]+)</g, (m, t) => `>${typo(t)}<`))).join('');
  return fixed.replaceAll('{{r}}', r);
}

export const faqSchema = (items) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});
