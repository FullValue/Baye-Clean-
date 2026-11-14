# Baye Clean

Site statique : déposer le dossier `baye-clean/` tel quel chez l'hébergeur (sans `src/`).

- `index.html` : accueil, choix Anti-nuisible / Nettoyage
- `anti-nuisible/` : généré par `src/build.mjs` (contenu dans `src/content/`, style dans `src/assets/style.css`)
- `nettoyage/` : généré par `src/build-nettoyage.py` à partir des pages d'origine du dossier `R- BOUBA MENAGE`
  (styles : `nettoyage/assets/style.css` + `nettoyage/assets/nettoyage.css`, menus : `nettoyage/assets/site.js`)
- Logo officiel (horizontal), utilisé partout via `src/logo.mjs` :
  `assets/logo.webp` (couleurs d'origine, fonds clairs), `assets/logo-blanc.webp` (bleu marine passé en blanc,
  fonds sombres), `assets/logo-horizontal-source.webp` (fichier d'origine non recadré).

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
