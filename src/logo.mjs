// Logo horizontal Baye Clean, redessiné en SVG à partir du logo carré (assets/logo.webp).
// Pictogramme : toit de maison, fenêtre, courbe « coup de chiffon » et deux étincelles.
// Mot-symbole : BAYE (encre) + CLEAN (accent), slogan NETTOYAGE & DÉRATISATION.
// Les couleurs suivent deux variables CSS, pour passer en version blanche sur fond sombre :
//   --logo-ink (BAYE, toit, slogan)  et  --logo-accent (CLEAN, courbe, étincelles).

export const LOGO_COLORS = { ink: '#13254f', accent: '#2a72e0', inkDark: '#ffffff', accentDark: '#8cc3ff' };

const STAR = 'M12 0c1 7 4.5 10.6 12 12-7.5 1.4-11 5-12 12-1-7-4.5-10.6-12-12C7.5 10.6 11 7 12 0Z';

const mark = (ink, accent) => `
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 70 66 31l52 39" stroke="${ink}" stroke-width="9"/>
    <path d="M96 52V33h11v27" stroke="${ink}" stroke-width="7"/>
    <path d="M9 106C40 79 92 72 128 84" stroke="${accent}" stroke-width="6"/>
  </g>
  <g fill="${ink}"><rect x="56" y="52" width="9" height="9" rx="1"/><rect x="67" y="52" width="9" height="9" rx="1"/><rect x="56" y="63" width="9" height="9" rx="1"/><rect x="67" y="63" width="9" height="9" rx="1"/></g>
  <path d="${STAR}" fill="${accent}" transform="translate(118 10) scale(.95)"/>
  <path d="${STAR}" fill="${accent}" transform="translate(104 34) scale(.55)"/>`;

const FONT = `font-family="Archivo, 'Arial Black', 'Helvetica Neue', Arial, sans-serif"`;

// tagline: true = logo complet avec slogan ; false = version compacte pour les en-têtes.
export function logoSvg({ tagline = true, ink = 'var(--logo-ink, #13254f)', accent = 'var(--logo-accent, #2a72e0)', title = 'Baye Clean', cls = 'bc-logo', inline = true, decorative = false } = {}) {
  const st = (c) => (inline ? `style="fill:${c}"` : `fill="${c}"`);
  const vb = tagline ? '0 0 540 124' : '0 0 540 112';
  const word = tagline
    ? `<text x="150" y="78" ${FONT} font-weight="800" font-size="62" letter-spacing="1" textLength="382" lengthAdjust="spacingAndGlyphs"><tspan ${st(ink)}>BAYE</tspan><tspan ${st(accent)} dx="20">CLEAN</tspan></text>
  <text x="152" y="112" ${FONT} font-size="17" font-weight="700" textLength="378" lengthAdjust="spacingAndGlyphs" ${st(ink)}>NETTOYAGE &amp; DÉRATISATION</text>`
    : `<text x="150" y="86" ${FONT} font-weight="800" font-size="68" letter-spacing="1" textLength="382" lengthAdjust="spacingAndGlyphs"><tspan ${st(ink)}>BAYE</tspan><tspan ${st(accent)} dx="20">CLEAN</tspan></text>`;
  const m = inline
    ? mark(ink, accent).replace(/stroke="([^"]+)"/g, (s, c) => `style="stroke:${c}"`).replace(/fill="(var\([^"]+\))"/g, (s, c) => `style="fill:${c}"`)
    : mark(ink, accent);
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : `role="img" aria-label="${title}"`;
  return `<svg class="${cls}" viewBox="${vb}" ${a11y} xmlns="http://www.w3.org/2000/svg">${m}
  ${word}
</svg>`;
}

// Fichiers autonomes (couleurs fixes), à utiliser hors du site : signature mail, devis, réseaux.
export const logoFile = (dark = false, tagline = true) => logoSvg({
  tagline, inline: false,
  ink: dark ? LOGO_COLORS.inkDark : LOGO_COLORS.ink,
  accent: dark ? LOGO_COLORS.accentDark : LOGO_COLORS.accent,
}).replace('<svg ', '<svg width="540" height="' + (tagline ? 124 : 112) + '" ');

// Favicon commun : pastille bleu marine, toit blanc, étincelle bleue.
export const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#13254f"/><path d="M12 38 32 22l20 16" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 50c10-8 28-10 44-6" fill="none" stroke="#2a72e0" stroke-width="4.5" stroke-linecap="round"/><path d="${STAR}" fill="#8cc3ff" transform="translate(40 6) scale(.62)"/></svg>`;
