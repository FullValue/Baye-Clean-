// Logo officiel Baye Clean (horizontal), fourni par le client.
//   assets/logo.webp        : couleurs d'origine, pour les fonds clairs
//   assets/logo-blanc.webp  : bleu marine passé en blanc, pour les fonds sombres
//   assets/logo-horizontal-source.webp : fichier d'origine non recadré
// `base` est le chemin vers la racine du site (là où se trouve le dossier assets/).

export const LOGO_SIZE = { w: 1400, h: 259 };

export function logoImg({ base = '', dark = false, cls = 'bc-logo', alt = '' } = {}) {
  const file = dark ? 'logo-blanc.webp' : 'logo.webp';
  return `<img class="${cls}" src="${base}assets/${file}" width="${LOGO_SIZE.w}" height="${LOGO_SIZE.h}" alt="${alt}" decoding="async">`;
}

const STAR = 'M12 0c1 7 4.5 10.6 12 12-7.5 1.4-11 5-12 12-1-7-4.5-10.6-12-12C7.5 10.6 11 7 12 0Z';

// Favicon commun : pastille bleu marine, toit blanc, étincelle bleue.
export const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#13254f"/><path d="M12 38 32 22l20 16" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 50c10-8 28-10 44-6" fill="none" stroke="#2a72e0" stroke-width="4.5" stroke-linecap="round"/><path d="${STAR}" fill="#8cc3ff" transform="translate(40 6) scale(.62)"/></svg>`;
