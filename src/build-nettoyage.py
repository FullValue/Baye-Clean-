"""Génère le site Baye Clean Nettoyage (dossier nettoyage/) à partir des pages d'origine « Bouba Ménage ».

- reprend le contenu des pages particuliers et professionnels (renommées « entreprises »),
- remplace en-tête, navigation déroulante, pied de page et barre mobile,
- crée l'accueil ménage et une page par service.

Usage : python3 src/build-nettoyage.py   (depuis le dossier baye-clean)
Les styles (nettoyage/assets/nettoyage.css) et le JS (nettoyage/assets/site.js) ne sont pas touchés.
"""
import json
import pathlib
import re

SRC = pathlib.Path('/Users/m/Desktop/R- BOUBA MENAGE')
HERE = pathlib.Path(__file__).resolve().parent


# Logo officiel (version blanche, fonds bleu marine) : fichiers à la racine du site, dans assets/.
def logo(r):
    return f'<img class="bc-logo" src="{r}../assets/logo-blanc.webp" width="1400" height="259" alt="" decoding="async">'
DST = pathlib.Path(__file__).resolve().parent.parent / 'nettoyage'

PHONE_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>'
WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.5-.7-2.5-1.4-3.5-3.1-.1-.2 0-.4.1-.5l.6-.7c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3Z"/></svg>'
DOC_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7"/></svg>'
CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'
ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'
WA_URL = 'https://wa.me/33766188348?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20prestations%20de%20m%C3%A9nage.'
U = 'https://images.unsplash.com/'
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Instrument+Sans:wght@400..700&display=swap" rel="stylesheet">'

PART = [('canape', 'Canapés et mobilier'), ('literie', 'Matelas et literie'), ('tapis', 'Tapis'),
        ('moquette', 'Moquettes'), ('sols', 'Parquets et sols durs'), ('odeurs', 'Odeurs et acariens')]
ENT = [('entretien', 'Entretien de locaux'), ('industriel', 'Sites industriels et logistiques'),
       ('remise-en-etat', 'Remise en état et fin de chantier'), ('vitrerie', 'Vitrerie et surfaces vitrées'),
       ('textiles', 'Moquettes, sièges et textiles')]


# ───────────── En-tête et pied de page communs ─────────────
def sub(r, space, items, extra):
    lis = ''.join(f'<li><a href="{r}{space}/{a}.html">{n}</a></li>' for a, n in items)
    lis += '<li class="sub-sep" role="presentation"></li>'
    lis += ''.join(f'<li class="sub-more"><a href="{r}{space}/{f}">{n}</a></li>' for f, n in extra)
    return f'<ul class="sub">{lis}</ul>'


def header(r, space):
    cur = lambda s: ' aria-current="true"' if space == s else ''
    part_extra = [('prestations.html', 'Toutes les prestations'), ('maison.html', 'La maison'),
                  ('zone.html', 'Zone d’intervention'), ('devis.html', 'Demander un devis')]
    ent_extra = [('prestations.html', 'Toutes les prestations'), ('secteurs.html', 'Secteurs'),
                 ('zone.html', 'Zone d’intervention'), ('devis.html', 'Demander un devis')]
    quote = f'{r}{space}/devis.html' if space else f'{r}index.html#espaces'
    return f'''<div class="universe"><div class="wrap universe-in"><nav aria-label="Univers Baye Clean"><a href="{r}../index.html">Baye Clean</a><a href="{r}../anti-nuisible/index.html">Anti-nuisible</a><a href="{r}index.html" aria-current="true">Nettoyage</a></nav><span>Île-de-France et Oise</span></div></div>
<header class="site-header"><div class="wrap header-in">
<a class="logo" href="{r}index.html" aria-label="Baye Clean Nettoyage, accueil">{logo(r)}<small>Nettoyage</small></a>
<nav class="main-nav" aria-label="Navigation principale"><ul>
<li class="has-sub"><a href="{r}entreprises/index.html"{cur('entreprises')}>Entreprises</a><button class="sub-btn" type="button" aria-label="Services pour entreprises" aria-expanded="false">{CHEV}</button>{sub(r, 'entreprises', ENT, ent_extra)}</li>
<li class="has-sub"><a href="{r}particuliers/index.html"{cur('particuliers')}>Particuliers</a><button class="sub-btn" type="button" aria-label="Services pour particuliers" aria-expanded="false">{CHEV}</button>{sub(r, 'particuliers', PART, part_extra)}</li>
</ul></nav>
<div class="header-cta">
<a class="btn btn-signal btn-quote" href="{quote}">{DOC_SVG}<span>Devis gratuit</span></a>
<a class="btn btn-line" href="tel:+33766188348" aria-label="Appeler le 07 66 18 83 48">{PHONE_SVG}<span class="lbl">07 66 18 83 48</span></a>
<a class="btn btn-wa" href="{WA_URL}" target="_blank" rel="noopener" aria-label="WhatsApp">{WA_SVG}<span class="lbl">WhatsApp</span></a>
</div>
<button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
</div></header>'''


def footer(r, space):
    pl = ''.join(f'<li><a href="{r}particuliers/{a}.html">{n}</a></li>' for a, n in PART)
    el = ''.join(f'<li><a href="{r}entreprises/{a}.html">{n}</a></li>' for a, n in ENT)
    quote = f'{r}{space}/devis.html' if space else f'{r}index.html#espaces'
    return f'''<footer class="site-footer"><div class="wrap">
<div class="footer-grid">
<div><a class="logo logo--full" href="{r}index.html" aria-label="Baye Clean, accueil">{logo(r)}</a><p>Nettoyage pour les particuliers, les entreprises et les industriels, en Île-de-France et dans l’Oise.</p></div>
<div><h2>Entreprises</h2><ul>{el}</ul></div>
<div><h2>Particuliers</h2><ul>{pl}</ul></div>
<div><h2>Contact</h2><ul><li><a href="tel:+33766188348">07 66 18 83 48</a></li><li><a href="{WA_URL}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="{r}entreprises/devis.html">Devis entreprises</a></li><li><a href="{r}particuliers/devis.html">Devis particuliers</a></li><li><a href="{r}../anti-nuisible/index.html">Anti-nuisible Baye Clean</a></li></ul></div>
</div>
<div class="footer-end"><span>© 2026 Baye Clean</span><a href="{r}mentions-legales.html">Mentions légales et confidentialité</a></div>
</div></footer>
<nav class="call-bar" aria-label="Contact rapide">
<a href="tel:+33766188348">{PHONE_SVG}Appeler</a>
<a class="wa" href="{WA_URL}" target="_blank" rel="noopener">{WA_SVG}WhatsApp</a>
<a class="dv" href="{quote}">{DOC_SVG}Devis</a>
</nav>'''


def head(r, title, desc, ld, og_title=None):
    return f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{og_title or title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta name="theme-color" content="#0f2a30">
<link rel="icon" href="{r}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
{FONTS}
<link rel="stylesheet" href="{r}assets/style.css">
<link rel="stylesheet" href="{r}assets/nettoyage.css">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body class="nettoyage">
<a class="skip" href="#contenu">Aller au contenu</a>'''


def tail(r):
    return f'<script src="{r}assets/site.js"></script>\n</body></html>\n'


# ───────────── Pages d'origine réhabillées ─────────────
def transform(html, space, depth):
    r = '../' * depth
    s = re.sub(r'<body class="[^"]*">', '<body class="nettoyage">', html)
    a = s.index('<div class="universe">'); b = s.index('</header>', a) + len('</header>')
    s = s[:a] + header(r, space) + s[b:]
    a = s.index('<footer class="site-footer">'); b = s.index('</nav>', s.index('class="call-bar"', a)) + len('</nav>')
    s = s[:a] + footer(r, space) + s[b:]
    s = re.sub(r'<link href="https://fonts.googleapis.com/css2[^>]*>', FONTS, s)
    s = re.sub(r'<link rel="stylesheet" href="[^"]*particuliers\.css">\n?', '', s)
    if 'nettoyage.css' not in s:
        s = re.sub(r'(<link rel="stylesheet" href="([^"]*)style\.css">)', r'\1\n<link rel="stylesheet" href="\2nettoyage.css">', s)
    s = s.replace('| Bouba Ménage', '| Baye Clean Nettoyage').replace('Bouba Ménage', 'Baye Clean')
    s = s.replace('33652272440', '33766188348').replace('06 52 27 24 40', '07 66 18 83 48')  # ancien numéro des pages d'origine
    s = s.replace('professionnels/', 'entreprises/')
    s = re.sub(r'prestations\.html#([a-z-]+)', r'\1.html', s)
    s = s.replace('Prix annoncé', 'Devis gratuit').replace('Le prix est fixé avant l’intervention, sans surprise.', 'Le devis est établi avant l’intervention et ne change plus.')
    s = s.replace(' Tarif sur devis.', ' Devis gratuit.')
    s = s.replace('prix annoncé et honnêteté', 'devis gratuit et honnêteté').replace('et à quel prix.', 'et pour quel devis.')
    return s


def add_detail_links(html):
    """Dans les pages Prestations, chaque bloc renvoie vers sa page dédiée."""
    def repl(m):
        art = m.group(0)
        id_ = m.group(1)
        link = f'<a class="btn btn-line" href="{id_}.html">En savoir plus {ARROW}</a>'
        return re.sub(r'(<div class="btn-row">)', r'\1' + link, art, count=1)
    return re.sub(r'<article class="(?:p-service|service)" id="([^"]+)">.*?</article>', repl, html, flags=re.S)


# ───────────── Accueil ménage ─────────────
def img(id_, w, alt):
    u = f'{U}{id_}?auto=format&fit=crop'
    return f'<img src="{u}&w={w}&q=72" srcset="{u}&w=640&q=72 640w, {u}&w=1000&q=72 1000w, {u}&w={w}&q=72 {w}w" sizes="(max-width: 900px) 100vw, 50vw" alt="{alt}" loading="lazy" decoding="async">'


def home():
    r = ''
    pl = ''.join(f'<li><a href="particuliers/{a}.html">{n}{ARROW}</a></li>' for a, n in PART)
    el = ''.join(f'<li><a href="entreprises/{a}.html">{n}{ARROW}</a></li>' for a, n in ENT)
    desc = 'Baye Clean Nettoyage : nettoyage de canapés, matelas et tapis à domicile pour les particuliers, ménage, industrie, fin de chantier et vitrerie pour les entreprises. Île-de-France et Oise.'
    ld = {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Baye Clean", "telephone": "+33766188348",
          "description": "Nettoyage pour particuliers, entreprises et industriels en Île-de-France et dans l’Oise.",
          "areaServed": [{"@type": "AdministrativeArea", "name": "Île-de-France"}, {"@type": "AdministrativeArea", "name": "Oise"}]}
    hp = f'{U}photo-1771531072574-af6ed6b954c0?auto=format&fit=crop'
    html = f'''{head(r, 'Nettoyage pour particuliers et entreprises | Baye Clean Nettoyage', desc, ld, 'Baye Clean Nettoyage | Particuliers et entreprises')}
{header(r, None)}
<main id="contenu">

<section class="hero hero--home dark">
<img class="hero-photo" src="{hp}&w=2000&q=72" srcset="{hp}&w=640&q=72 640w, {hp}&w=1000&q=72 1000w, {hp}&w=2000&q=72 2000w" sizes="100vw" alt="" fetchpriority="high">
<div class="wrap hero-in">
<h1>Le nettoyage, chez vous comme dans vos locaux.</h1>
<p class="lead">Nettoyage à domicile pour les particuliers, entretien, industrie, fin de chantier et vitrerie pour les entreprises. En Île-de-France et dans l’Oise.</p>
<div class="btn-row"><a class="btn btn-signal" href="#espaces">Choisir mon espace {ARROW}</a><a class="btn btn-line" href="tel:+33766188348">{PHONE_SVG}Appeler le 07 66 18 83 48</a><a class="btn btn-wa" href="{WA_URL}" target="_blank" rel="noopener">{WA_SVG}WhatsApp</a></div>
<dl class="spec">
<div><dt>Zone</dt><dd>Île-de-France et Oise</dd></div>
<div><dt>Clients</dt><dd>Particuliers et entreprises</dd></div>
<div><dt>Prestations</dt><dd>Du canapé à l’entrepôt</dd></div>
<div><dt>Devis</dt><dd>Gratuit et sans engagement</dd></div>
</dl>
</div>
</section>
<div class="hazard" aria-hidden="true"></div>

<section class="section" id="espaces"><div class="wrap">
<div class="head-split reveal"><div><span class="eyebrow">Deux espaces</span><h2>Vous êtes particulier ou entreprise&nbsp;?</h2></div><p>Chaque espace a ses prestations, ses méthodes et son devis. Choisissez le vôtre pour voir les services en détail.</p></div>
<div class="spaces reveal">
<article class="space">
<a class="space-photo" href="particuliers/index.html" tabindex="-1" aria-hidden="true">{img('photo-1664711942326-2c3351e215e6', 1000, '')}</a>
<div class="space-body"><span class="eyebrow">À domicile</span><h2>Particuliers</h2><p>Canapés, matelas, tapis, moquettes et sols : une méthode choisie pour chaque matière, chez vous.</p>
<ul class="space-list">{pl}</ul>
<div class="btn-row"><a class="btn btn-ink" href="particuliers/index.html">Espace particuliers {ARROW}</a><a class="btn btn-signal" href="particuliers/devis.html">{DOC_SVG}Devis gratuit</a></div></div>
</article>
<article class="space">
<a class="space-photo" href="entreprises/index.html" tabindex="-1" aria-hidden="true">{img('photo-1771531072574-af6ed6b954c0', 1000, '')}</a>
<div class="space-body"><span class="eyebrow">Bureaux, usines, commerces</span><h2>Entreprises</h2><p>Un seul interlocuteur pour tous vos espaces : entretien régulier, sites industriels, fin de chantier, vitrerie.</p>
<ul class="space-list">{el}</ul>
<div class="btn-row"><a class="btn btn-ink" href="entreprises/index.html">Espace entreprises {ARROW}</a><a class="btn btn-signal" href="entreprises/devis.html">{DOC_SVG}Devis gratuit</a></div></div>
</article>
</div>
</div></section>

<section class="section dark"><div class="wrap">
<div class="head-split reveal"><div><span class="eyebrow">Zone d’intervention</span><h2>Île-de-France et Oise</h2></div><p>Paris, les sept autres départements d’Île-de-France et l’Oise. Votre commune n’apparaît pas&nbsp;? Écrivez-nous, nous vous dirons ce qui est possible.</p></div>
<div class="btn-row reveal"><a class="btn btn-signal" href="particuliers/zone.html">Zone particuliers</a><a class="btn btn-line" href="entreprises/zone.html">Zone entreprises</a></div>
</div></section>

<section class="cta"><div class="wrap cta-in">
<h2>Un besoin de nettoyage&nbsp;?</h2>
<div><a class="phone" href="tel:+33766188348">07 66 18 83 48</a>
<div class="btn-row stack"><a class="btn btn-ink" href="#espaces">{DOC_SVG}Demander un devis</a><a class="btn btn-wa" href="{WA_URL}" target="_blank" rel="noopener">{WA_SVG}WhatsApp</a></div></div>
</div></section>
</main>
{footer(r, None)}
{tail(r)}'''
    (DST / 'index.html').write_text(html)


# ───────────── Une page par service ─────────────
SPACES = {
    'particuliers': dict(src='particuliers', label='Particuliers', where='à domicile',
        steps=[('Vous décrivez votre besoin', 'Par le formulaire, au téléphone ou sur WhatsApp, avec une photo et les dimensions si possible.'),
               ('Votre devis gratuit', 'Nous choisissons la méthode selon la matière et son état, et vous recevez un devis clair avant toute intervention.'),
               ('L’intervention chez vous', 'À la date convenue, avec un matériel professionnel, dans le respect de votre intérieur.')]),
    'entreprises': dict(src='professionnels', label='Entreprises', where='pour les entreprises',
        steps=[('Visite ou échange', 'Vous nous présentez le site, les surfaces, les contraintes d’accès et la fréquence souhaitée.'),
               ('Devis et plan de nettoyage', 'Un devis gratuit et un plan d’intervention calés sur vos horaires et vos consignes de sécurité.'),
               ('Interventions suivies', 'Une équipe régulière, un interlocuteur unique, et des ajustements quand votre activité évolue.')]),
}


def extract(space_src):
    html = (SRC / space_src / 'prestations.html').read_text()
    out = []
    for m in re.finditer(r'<article class="(?:p-service|service)" id="([^"]+)">(.*?)</article>', html, re.S):
        id_, body = m.group(1), m.group(2)
        who = re.search(r'<p class="who">(.*?)</p>', body, re.S)
        out.append(dict(
            id=id_,
            img=re.search(r'<img [^>]*>', body).group(0),
            name=re.search(r'<h2>(.*?)</h2>', body, re.S).group(1),
            intro=re.search(r'<p class="intro">(.*?)</p>', body, re.S).group(1),
            items=re.findall(r'<li>(.*?)</li>', re.search(r'<ul class="(?:p-list|ticks)">(.*?)</ul>', body, re.S).group(1)),
            who=who.group(1) if who else '',
        ))
    return out


def service_pages():
    r = '../'
    count = 0
    for space, cfg in SPACES.items():
        svcs = extract(cfg['src'])
        for v in svcs:
            hero_img = (v['img'].replace(' loading="lazy"', '').replace(' decoding="async"', ' fetchpriority="high"')
                        .replace('sizes="(max-width: 720px) 100vw, 60vw"', 'sizes="(max-width: 900px) 100vw, 50vw"'))
            items = ''.join(f'<li>{x}</li>' for x in v['items'])
            who = f'<p class="who">{v["who"]}</p>' if v['who'] else ''
            steps = ''.join(f'<li><span>0{k + 1}</span><h3>{t}</h3><p>{d}</p></li>' for k, (t, d) in enumerate(cfg['steps']))
            others = ''.join(f'<li><a href="{o["id"]}.html">{o["name"]}{ARROW}</a></li>' for o in svcs if o['id'] != v['id'])
            name = re.sub(r'<[^>]+>', '', v['name'])
            intro = re.sub(r'<[^>]+>', '', v['intro'])
            devis = f'devis.html?prestation={v["id"]}'
            ld = {"@context": "https://schema.org", "@type": "Service", "name": name, "description": intro,
                  "provider": {"@type": "ProfessionalService", "name": "Baye Clean", "telephone": "+33766188348"},
                  "areaServed": [{"@type": "AdministrativeArea", "name": "Île-de-France"}, {"@type": "AdministrativeArea", "name": "Oise"}]}
            html = f'''{head(r, f'{name} {cfg["where"]} en Île-de-France et dans l’Oise | Baye Clean Nettoyage', f'{intro} Devis gratuit, Île-de-France et Oise.', ld, f'{name} | Baye Clean Nettoyage')}
{header(r, space)}
<main id="contenu">

<section class="svc-hero"><div class="wrap svc-hero-in">
<div class="svc-hero-text">
<nav class="svc-crumbs" aria-label="Fil d’Ariane"><a href="index.html">{cfg['label']}</a><span aria-hidden="true">/</span><a href="prestations.html">Prestations</a><span aria-hidden="true">/</span><span aria-current="page">{name}</span></nav>
<h1>{v['name']}</h1>
<p class="lead">{v['intro']}</p>
<div class="btn-row"><a class="btn btn-signal" href="{devis}">{DOC_SVG}Demander un devis gratuit</a><a class="btn btn-line" href="tel:+33766188348">{PHONE_SVG}07 66 18 83 48</a><a class="btn btn-wa" href="{WA_URL}" target="_blank" rel="noopener">{WA_SVG}WhatsApp</a></div>
</div>
<figure class="svc-hero-photo">{hero_img}</figure>
</div></section>
<div class="hazard" aria-hidden="true"></div>

<section class="section"><div class="wrap svc-detail">
<div class="reveal"><span class="eyebrow">Ce que nous prenons en charge</span><h2>{v['name']}</h2>{who}</div>
<ul class="ticks svc-ticks reveal">{items}</ul>
</div></section>

<section class="section bone"><div class="wrap">
<div class="head-split reveal"><div><span class="eyebrow">Comment ça se passe</span><h2>Trois étapes, un devis gratuit</h2></div><p>Aucune intervention sans devis validé&nbsp;: vous savez à l’avance ce qui sera fait.</p></div>
<ol class="p-steps reveal">{steps}</ol>
</div></section>

<section class="section"><div class="wrap svc-others">
<div class="reveal"><span class="eyebrow">{cfg['label']}</span><h2>Nos autres prestations</h2><p><a class="text-link" href="prestations.html">Voir toutes les prestations</a></p></div>
<ul class="space-list reveal">{others}</ul>
</div></section>

<section class="cta"><div class="wrap cta-in">
<h2>{name}&nbsp;: parlons-en.</h2>
<div><a class="phone" href="tel:+33766188348">07 66 18 83 48</a>
<div class="btn-row stack"><a class="btn btn-ink" href="{devis}">{DOC_SVG}Demander un devis</a><a class="btn btn-wa" href="{WA_URL}" target="_blank" rel="noopener">{WA_SVG}WhatsApp</a></div></div>
</div></section>
</main>
{footer(r, space)}
{tail(r)}'''
            (DST / space / f'{v["id"]}.html').write_text(html)
            count += 1
    return count


def main():
    for d in ('particuliers', 'entreprises'):
        (DST / d).mkdir(parents=True, exist_ok=True)
    n = 0
    for src_dir, dst_dir in (('particuliers', 'particuliers'), ('professionnels', 'entreprises')):
        for f in sorted((SRC / src_dir).glob('*.html')):
            out = transform(f.read_text(), dst_dir, 1)
            if f.name == 'prestations.html':
                out = add_detail_links(out)
            (DST / dst_dir / f.name).write_text(out)
            n += 1
    (DST / 'mentions-legales.html').write_text(transform((SRC / 'mentions-legales.html').read_text(), None, 0))
    home()
    s = service_pages()
    print(f'{n + 2} pages réhabillées, {s} pages de service générées dans nettoyage/')


if __name__ == '__main__':
    main()
