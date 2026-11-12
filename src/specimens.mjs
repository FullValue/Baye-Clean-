// Planches d'identification : dessins au trait, vus de dessus, à la manière d'une planche d'entomologie.
const wrap = (inner, label) =>
  `<svg class="specimen" viewBox="0 0 200 200" role="img" aria-label="${label}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

// Dessine une moitié gauche puis la reflète pour garantir la symétrie de l'insecte.
const sym = (half) => `<g>${half}</g><g transform="translate(200 0) scale(-1 1)">${half}</g>`;
const fill = 'fill="var(--specimen-fill)"';

export const specimens = {
  punaise: wrap(`
    ${sym(`
      <path d="M92 58 C80 46 72 38 66 24"/>
      <path d="M78 84 L56 74 L38 56"/>
      <path d="M72 108 L46 108 L26 96"/>
      <path d="M76 134 L52 146 L38 170"/>
    `)}
    <ellipse cx="100" cy="124" rx="35" ry="46" ${fill}/>
    <path d="M70 72 C80 62 120 62 130 72 C134 84 122 92 100 92 C78 92 66 84 70 72Z" ${fill}/>
    <path d="M90 64 C90 52 110 52 110 64" ${fill}/>
    <path d="M70 108 C88 114 112 114 130 108M67 128 C86 134 114 134 133 128M73 148 C88 153 112 153 127 148" stroke-width="1.6"/>
  `, 'Punaise de lit vue de dessus'),

  cafard: wrap(`
    ${sym(`
      <path d="M94 34 C82 22 62 18 44 8"/>
      <path d="M80 70 L52 56 L30 58"/>
      <path d="M78 92 L46 96 L24 112"/>
      <path d="M80 124 L50 148 L40 186"/>
    `)}
    <path d="M100 56 C72 58 70 96 72 126 C74 158 90 188 100 192 C110 188 126 158 128 126 C130 96 128 58 100 56Z" ${fill}/>
    <path d="M100 76 L100 192" stroke-width="1.6"/>
    <path d="M70 62 C72 44 86 36 100 36 C114 36 128 44 130 62 C130 74 116 80 100 80 C84 80 70 74 70 62Z" ${fill}/>
    <path d="M86 56 C92 50 108 50 114 56" stroke-width="1.6"/>
    <path d="M90 37 C90 28 110 28 110 37" ${fill}/>
  `, 'Blatte vue de dessus'),

  fourmi: wrap(`
    ${sym(`
      <path d="M92 38 C82 30 76 18 62 16"/>
      <path d="M90 72 L62 56 L42 34"/>
      <path d="M90 84 L56 88 L32 88"/>
      <path d="M92 96 L64 124 L48 164"/>
    `)}
    <ellipse cx="100" cy="46" rx="18" ry="19" ${fill}/>
    <ellipse cx="100" cy="84" rx="12" ry="22" ${fill}/>
    <circle cx="100" cy="113" r="6" ${fill}/>
    <ellipse cx="100" cy="150" rx="24" ry="32" ${fill}/>
    <path d="M78 142 C90 148 110 148 122 142M78 158 C90 164 110 164 122 158" stroke-width="1.6"/>
  `, 'Fourmi vue de dessus'),

  frelon: wrap(`
    ${sym(`
      <path d="M92 28 C84 20 76 16 66 18"/>
      <path d="M78 76 C52 58 26 58 14 72 C20 92 52 96 80 86" ${fill} stroke-width="1.8"/>
      <path d="M80 92 C60 94 38 106 32 124 C48 130 70 118 84 102" ${fill} stroke-width="1.8"/>
      <path d="M82 72 L66 50 L52 44"/>
      <path d="M82 104 L66 134 L56 160"/>
    `)}
    <path d="M100 108 C80 110 78 136 84 156 C88 170 96 184 100 188 C104 184 112 170 116 156 C122 136 120 110 100 108Z" ${fill}/>
    <path d="M81 128 C92 134 108 134 119 128M82 146 C92 152 108 152 118 146M89 166 C95 169 105 169 111 166" stroke-width="5"/>
    <ellipse cx="100" cy="86" rx="21" ry="23" ${fill}/>
    <path d="M100 66 L100 106" stroke-width="1.6"/>
    <path d="M84 48 C84 30 116 30 116 48 C116 60 108 64 100 64 C92 64 84 60 84 48Z" ${fill}/>
    <circle cx="90" cy="44" r="3.4" fill="currentColor"/><circle cx="110" cy="44" r="3.4" fill="currentColor"/>
  `, 'Frelon vu de dessus'),

  rat: wrap(`
    <path d="M104 150 C128 164 138 172 128 182 C118 192 88 182 72 190 C58 196 48 192 42 186" stroke-width="3"/>
    <path d="M100 12 C92 14 84 26 78 44 C66 62 58 86 60 112 C62 142 80 158 100 158 C120 158 138 142 140 112 C142 86 134 62 122 44 C116 26 108 14 100 12Z" ${fill}/>
    <path d="M78 46 C68 34 54 40 58 54 C60 60 68 62 74 58" ${fill}/>
    <path d="M122 46 C132 34 146 40 142 54 C140 60 132 62 126 58" ${fill}/>
    <circle cx="89" cy="36" r="2.8" fill="currentColor"/><circle cx="111" cy="36" r="2.8" fill="currentColor"/>
    ${sym(`<path d="M94 20 L66 12M92 25 L62 24" stroke-width="1.3"/><path d="M70 130 L58 142 L46 142" /><path d="M72 70 L54 80 L44 76"/>`)}
    <path d="M100 66 C97 84 97 112 100 142" stroke-width="1.4" stroke-dasharray="3 6"/>
  `, 'Rat vu de dessus'),

  souris: wrap(`
    <path d="M102 142 C116 152 140 150 150 164 C158 176 146 188 130 186" stroke-width="2.4"/>
    <path d="M100 42 C92 46 86 56 82 66 C72 80 68 96 70 112 C72 134 86 148 100 148 C114 148 128 134 130 112 C132 96 128 80 118 66 C114 56 108 46 100 42Z" ${fill}/>
    <circle cx="70" cy="66" r="16" ${fill}/><circle cx="130" cy="66" r="16" ${fill}/>
    <circle cx="92" cy="60" r="2.6" fill="currentColor"/><circle cx="108" cy="60" r="2.6" fill="currentColor"/>
    ${sym(`<path d="M96 48 L72 38M95 52 L68 48" stroke-width="1.2"/><path d="M78 126 L68 136 L58 136"/><path d="M78 90 L62 94 L54 90"/>`)}
  `, 'Souris vue de dessus'),

  desinfection: wrap(`
    <path d="M100 26 C100 26 52 86 52 124 C52 152 74 174 100 174 C126 174 148 152 148 124 C148 86 100 26 100 26Z" ${fill}/>
    <path d="M100 96 L100 148M74 122 L126 122" stroke-width="5"/>
    <path d="M152 40 l0 16M144 48 l16 0M40 58 l0 12M34 64 l12 0M166 92 l0 8M162 96 l8 0" stroke-width="2"/>
  `, 'Goutte de désinfectant'),
};
