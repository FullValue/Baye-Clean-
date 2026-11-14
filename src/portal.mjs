
import { logoImg } from './logo.mjs';

const PHONE = '07 66 18 83 48';
const TEL = 'tel:+33766188348';
const WA = 'https://wa.me/33766188348?text=Bonjour%2C%20je%20souhaite%20des%20informations.';
const PHOTO = 'https://images.unsplash.com/photo-1771531072574-af6ed6b954c0?auto=format&fit=crop';
const PHOTO_DERAT = 'https://images.unsplash.com/photo-1747659629851-a92bd71149f6?auto=format&fit=crop';
const SPARK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c1 7 4.5 10.6 12 12-7.5 1.4-11 5-12 12-1-7-4.5-10.6-12-12C7.5 10.6 11 7 12 0Z" fill="currentColor"/></svg>';

const ICON = {
  phone: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.500-.7-2.500-1.400-3.500-3.100-.1-.2 0-.4.1-.5l.6-.7c.1-.2.1-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.200s.9 2.500 1.100 2.700c.1.2 1.800 2.800 4.400 3.900 1.600.7 2.300.8 3.100.6.5-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.1-1.200-.1-.1-.2-.2-.5-.3Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
};

export const portal = () => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Baye Clean | Anti-nuisible et nettoyage à Paris et en Île-de-France</title>
<meta name="description" content="Baye Clean : dératisation, désinsectisation et désinfection d'un côté, nettoyage pour particuliers et entreprises de l'autre. Île-de-France et Oise. Appel ou WhatsApp : ${PHONE}.">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Baye Clean">
<meta property="og:title" content="Baye Clean | Anti-nuisible et nettoyage">
<meta property="og:description" content="Dératisation, désinsectisation, désinfection et nettoyage en Île-de-France et dans l'Oise.">
<meta name="theme-color" content="#13254f">
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<link rel="preload" href="assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/portal.css">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Baye Clean', telephone: '+33766188348',
  areaServed: [{ '@type': 'AdministrativeArea', name: 'Île-de-France' }, { '@type': 'AdministrativeArea', name: 'Oise' }],
})}</script>
</head>
<body>
<a class="skip" href="#choix">Aller au choix de l'activité</a>
<h1 class="sr">Baye Clean : anti-nuisible et nettoyage</h1>
<header class="top">
  <a class="brand" href="index.html" aria-label="Baye Clean, anti-nuisible et nettoyage">${logoImg({ alt: '' }).replace('decoding="async"', 'fetchpriority="high"')}</a>
  <div class="top__contact">
    <a class="btn btn--call" href="${TEL}" aria-label="Appeler le ${PHONE}">${ICON.phone}<span>${PHONE}</span></a>
    <a class="btn btn--wa" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}<span>WhatsApp</span></a>
  </div>
</header>
<main id="choix" class="doors">
  <a class="door door--derat" href="anti-nuisible/index.html">
    <img class="door__photo" src="${PHOTO_DERAT}&w=1400&q=72" srcset="${PHOTO_DERAT}&w=640&q=72 640w, ${PHOTO_DERAT}&w=1000&q=72 1000w, ${PHOTO_DERAT}&w=1400&q=72 1400w" sizes="(max-width: 760px) 100vw, 50vw" alt="" fetchpriority="high">
    <div class="door__body">
      <p class="door__tag">Paris et Île-de-France</p>
      <h2>Anti-nuisible</h2>
      <p class="door__text">Dératisation, désinsectisation, punaises de lit, cafards, guêpes et frelons. Intervention sous 24&nbsp;h, devis gratuit.</p>
      <ul class="door__chips"><li>Dératisation</li><li>Désinsectisation</li><li>Punaises</li><li>Frelons</li><li>Désinfection</li></ul>
      <span class="door__go">Entrer ${ICON.arrow}</span>
    </div>
  </a>
  <a class="door door--menage" href="nettoyage/index.html">
    <span class="door__spark door__spark--a" aria-hidden="true">${SPARK}</span><span class="door__spark door__spark--b" aria-hidden="true">${SPARK}</span>
    <img class="door__photo" src="${PHOTO}&w=1400&q=72" srcset="${PHOTO}&w=640&q=72 640w, ${PHOTO}&w=1000&q=72 1000w, ${PHOTO}&w=1400&q=72 1400w" sizes="(max-width: 760px) 100vw, 50vw" alt="" fetchpriority="high">
    <div class="door__body">
      <p class="door__tag">Île-de-France et Oise</p>
      <h2>Nettoyage</h2>
      <p class="door__text">Nettoyage de canapés, matelas et tapis chez les particuliers. Entretien, industrie et fin de chantier pour les entreprises.</p>
      <ul class="door__chips"><li>Particuliers</li><li>Entreprises</li><li>Industrie</li><li>Vitrerie</li></ul>
      <span class="door__go">Entrer ${ICON.arrow}</span>
    </div>
  </a>
</main>
</body>
</html>
`;
