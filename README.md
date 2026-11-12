# Baye Clean

Site statique : déposer le dossier `baye-clean/` tel quel chez l'hébergeur (sans `src/`).

- `index.html` : accueil, choix Dératisation / Nettoyage
- `deratisation/` : généré par `src/build.mjs` (contenu dans `src/content/`, style dans `src/assets/style.css`)
- `nettoyage/` : généré par `src/build-nettoyage.py` à partir des pages d'origine du dossier `R- BOUBA MENAGE`
  (styles : `nettoyage/assets/style.css` + `nettoyage/assets/nettoyage.css`, menus : `nettoyage/assets/site.js`)
- Logo : `src/logo.mjs` dessine le logo horizontal en SVG (utilisé partout sur le site).
  Fichiers prêts à l'emploi dans `assets/` : `logo-horizontal.svg`, `logo-horizontal-blanc.svg` (fonds sombres),
  `logo-compact.svg`, `logo-compact-blanc.svg` (sans slogan). Le logo carré d'origine est `assets/logo.webp`.

Régénérer après une modification, depuis le dossier `baye-clean` :

```bash
node src/build.mjs
```

```bash
python3 src/build-nettoyage.py
```

Aperçu local, sans cache (chaque rechargement montre la dernière version) :

```bash
python3 src/serve.py 4180
```
