// ─────────────────────────────────────────────────────────────
// TOUT CE QUI EST PROPRE À L'ENTREPRISE SE CHANGE ICI.
// Après modification : `node src/build.mjs` régénère le dossier site/.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Baye Clean',
  nameA: 'Baye',
  nameB: 'Clean',
  // Libellé de l'univers, affiché à côté du logo.
  universe: 'Dératisation',
  // Domaine à remplacer une fois réservé (sert au sitemap et aux balises SEO).
  url: 'https://www.baye-clean.fr/deratisation',
  phone: '06 52 27 24 40',
  phoneIntl: '+33652272440',
  wa: '33652272440',
  // Horaires : utilisés aussi par l'indicateur « disponible maintenant ».
  openHour: 8,
  closeHour: 20,
  hoursLabel: '7j/7, de 8 h à 20 h',
  // Engagements commerciaux affichés sur tout le site : à confirmer.
  delay: 'sous 24 h',
  guarantee: '30 jours',
};

export const tel = `tel:${SITE.phoneIntl}`;
export const wa = (text = 'Bonjour, j\'ai un problème de nuisibles.') =>
  `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`;
