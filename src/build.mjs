import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, tel, wa } from './config.mjs';
import {
  render, SERVICES, ICONS, DEP_NAMES, btnCall, btnWa, specimen, needForm, assure, steps, faq, faqSchema,
  btnQuote, idfMap, depList, closing,
} from './lib.mjs';
import { SERVICE_PAGES } from './content/services.mjs';
import { SECTEURS } from './content/secteurs.mjs';
import { POSTS } from './content/blog.mjs';
import { portal } from './portal.mjs';
import { FAVICON } from './logo.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, '..', 'anti-nuisible');
rmSync(out, { recursive: true, force: true });
const pages = [];
const emit = (opts) => {
  const file = join(out, opts.path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(opts));
  pages.push(opts.path);
};

const rows = (items) => `<ul class="rows">${items.map(([t, p]) => `<li><h3>${t}</h3><p>${p}</p></li>`).join('')}</ul>`;
const pairs = (items) => `<div class="pairs">${items.map(([t, p]) => `<div><h3>${t}</h3><p>${p}</p></div>`).join('')}</div>`;
const postCard = (p) => `<a class="post-card" href="{{r}}blog/${p.slug}.html"><small>${p.serviceName} · ${p.read}</small><h3>${p.title}</h3><p>${p.desc}</p></a>`;
const serviceName = (h) => (SERVICES.find((s) => s.href === h) || { name: 'Professionnels' }).name;
const recentPosts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

// ═════════════════════ ACCUEIL
const homeFaq = [
  ['Comment obtenir un devis ?', 'Demandez-le en ligne, par téléphone ou sur WhatsApp, avec une photo si possible. Le devis est gratuit, sans engagement et ferme : le montant annoncé avant le traitement ne change plus. <a href="{{r}}devis.html">Demander un devis</a>.'],
  ['Sous quel délai pouvez-vous venir ?', `Nous intervenons ${SITE.delay} en Île-de-France, ${SITE.hoursLabel}. En cas d'urgence, appelez plutôt que d'écrire : c'est le plus rapide.`],
  ['Y a-t-il un supplément le soir ou le week-end ?', 'Non. Le devis est le même un dimanche qu\'un mardi, sans majoration d\'urgence ni frais de déplacement.'],
  ['Les produits sont-ils dangereux pour mes enfants ou mes animaux ?', 'Nous utilisons des produits professionnels autorisés, dans des postes verrouillés ou en micro-doses hors de portée. Le technicien vous donne les consignes et les délais de retour par écrit.'],
  ['Le traitement est-il garanti ?', `Oui, par écrit sur le devis. Si le nuisible réapparaît dans les ${SITE.guarantee} suivant le protocole complet, nous revenons traiter gratuitement.`],
  ['Locataire ou propriétaire, qui paie ?', 'En location, le traitement revient en principe au propriétaire si l\'infestation n\'est pas liée au comportement du locataire. Notre rapport écrit vous aide dans cet échange. <a href="{{r}}blog/punaises-de-lit-qui-paie.html">En savoir plus</a>.'],
];
emit({
  path: 'index.html',
  title: `Anti-nuisible à Paris et en Île-de-France : dératisation, désinsectisation | ${SITE.name}`,
  description: `Dératisation, désinsectisation, punaises de lit, cafards, guêpes, frelons, désinfection : intervention ${SITE.delay} à Paris et en Île-de-France. Appel direct ou WhatsApp : ${SITE.phone}.`,
  schema: [faqSchema(homeFaq)],
  body: `
<section class="hero"><div class="wrap hero__grid">
  <div>
    <h1 class="reveal">Rats, punaises, cafards, frelons : <em>on s'en occupe</em> ${SITE.delay}.</h1>
    <p class="lede reveal reveal--2">Dératisation, désinsectisation et désinfection à Paris et dans toute l'Île-de-France. Devis gratuit et ferme avant que l'on commence.</p>
    <div class="actions reveal reveal--3">${btnQuote('btn--lg')}${btnCall('btn--lg', `Appeler le ${SITE.phone}`)}${btnWa('Bonjour, j\'ai un problème de nuisibles.', 'btn--lg')}</div>
    ${assure(['Devis gratuit', `${SITE.hoursLabel}, sans majoration`, 'Techniciens certifiés Certibiocide', `Garantie écrite de ${SITE.guarantee}`]).replace('class="assure"', 'class="assure reveal reveal--4"')}
  </div>
  <div class="reveal reveal--3">${needForm({ urgent: true })}</div>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><p class="kicker">Nos services</p><h2>Qu'avez-vous trouvé chez vous ?</h2></div>
  <div class="ledger">
    ${SERVICES.map((s) => `<a class="ledger__row" href="{{r}}${s.href}">${specimen(s.spec)}<h3>${s.name}</h3><p class="ledger__sign" style="margin:0">${s.sign}</p><span class="ledger__price">Demander un devis</span><span class="ledger__arrow">${ICONS.arrow}</span></a>`).join('')}
    <a class="ledger__row" href="{{r}}identifier-nuisible.html">${specimen('souris')}<h3>Je ne sais pas</h3><p class="ledger__sign" style="margin:0">Comparez nos planches, ou envoyez une photo. On vous dira ce que c'est.</p><span class="ledger__price">Envoyer une photo</span><span class="ledger__arrow">${ICONS.arrow}</span></a>
  </div>
</div></section>

<section class="section urgent"><div class="wrap urgent__grid">
  <div>
    <p class="kicker">Urgence</p>
    <h2>Une situation qui ne peut pas attendre ?</h2>
    <p class="lede">Nid près d'une porte, rat dans la cuisine, restaurant qui ouvre ce soir. Appelez-nous, on vous dit tout de suite quoi faire en attendant le technicien.</p>
    <div class="actions"><a class="btn btn--bright btn--lg" href="${tel}">${ICONS.phone}${SITE.phone}</a><a class="btn btn--on-forest btn--lg" href="${wa('URGENT. Bonjour, j\'ai besoin d\'une intervention rapide. Lieu : ')}" target="_blank" rel="noopener">${ICONS.wa}Urgence WhatsApp</a></div>
  </div>
  <ul class="urgent__list">
    <li><a href="{{r}}urgence-nuisibles.html#nid">Un nid de frelons ou de guêpes ${ICONS.arrow}</a></li>
    <li><a href="{{r}}urgence-nuisibles.html#rat">Un rat ou une souris dans le logement ${ICONS.arrow}</a></li>
    <li><a href="{{r}}urgence-nuisibles.html#punaises">Des piqûres ou des punaises dans le lit ${ICONS.arrow}</a></li>
    <li><a href="{{r}}urgence-nuisibles.html#commerce">Des nuisibles dans un commerce ${ICONS.arrow}</a></li>
    <li><a href="{{r}}urgence-nuisibles.html#sinistre">Un sinistre, un décès, un lieu à assainir ${ICONS.arrow}</a></li>
  </ul>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><h2>Une intervention, du premier message au rapport</h2></div>
  ${steps([
    ['Vous nous contactez', 'Par téléphone ou sur WhatsApp, avec une photo si possible. On identifie le nuisible et on vous donne une fourchette.'],
    ['Devis ferme', 'Après inspection, le montant est annoncé avant de commencer. Une fois signé, il ne bouge plus.'],
    ['Traitement', 'Technicien certifié, produits professionnels autorisés, protocole adapté aux enfants et aux animaux.'],
    ['Contrôle et garantie', `Rapport écrit et certificat de passage. Si le nuisible revient sous ${SITE.guarantee}, on revient gratuitement.`],
  ])}
</div></section>

<section class="section section--mint"><div class="wrap split">
  <div class="split__aside"><h2>Ce que vous pouvez exiger de nous</h2><p class="lede" style="margin-top:1rem">Pas de promesses vagues : tout est écrit sur le devis, et vous pouvez nous le rappeler.</p></div>
  ${rows([
    ['Un devis ferme', 'Gratuit, écrit et signé avant le traitement. Pas de frais de déplacement, pas de majoration le soir, le week-end ou les jours fériés.'],
    [`Une garantie de ${SITE.guarantee}`, 'Si le nuisible réapparaît après le protocole complet, nous revenons traiter sans rien facturer.'],
    ['Un technicien certifié', 'Certibiocide, la certification requise pour l\'usage professionnel de ces produits. Attestation présentée sur simple demande.'],
    ['Des documents à chaque passage', 'Rapport d\'intervention et certificat, pour votre bailleur, votre syndic, votre assurance ou un contrôle d\'hygiène.'],
    ['De la discrétion', 'Véhicule banalisé sur demande. Vos voisins n\'ont pas besoin de savoir.'],
  ])}
</div></section>

<section class="section"><div class="wrap map-grid">
  <div>${idfMap()}</div>
  <div>
    <p class="kicker">Secteur d'intervention</p>
    <h2>Toute l'Île-de-France, Paris compris</h2>
    <p class="lede" style="margin:1rem 0 1.4rem">Les 8 départements de la région, déplacement compris. Cliquez sur le vôtre.</p>
    ${depList()}
  </div>
</div></section>

<section class="section section--mint section--tight"><div class="wrap split">
  <div><p class="kicker">Professionnels</p><h2>Restaurants, syndics, hôtels, commerces</h2></div>
  <div><p class="lede">Contrats annuels, registre conforme HACCP, passages hors ouverture et rapports pour vos audits. Commencez par un audit gratuit de vos locaux.</p><div class="actions" style="margin-top:1.2rem"><a class="btn btn--call" href="{{r}}professionnels.html">Voir l'offre pro</a></div></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:12px;max-width:none"><h2>Nos conseils</h2><a href="{{r}}blog/index.html">Tous les articles</a></div>
  <div class="posts">${recentPosts.slice(0, 3).map(postCard).join('')}</div>
</div></section>

<section class="section section--mint"><div class="wrap split">
  <div class="split__aside"><h2>Vos questions</h2></div>
  ${faq(homeFaq)}
</div></section>
${closing()}`,
});

// ═════════════════════ SERVICES
for (const s of SERVICE_PAGES) {
  const prefillForm = needForm({ preset: s.need, title: 'Décrivez votre besoin' });
  const plates = s.plates ? `<section class="section section--mint"><div class="wrap">
    <div class="sec-head"><h2>${s.platesTitle}</h2><p>${s.platesIntro}</p></div>
    <div class="plates">${s.plates.map(([k, t, size, p]) => `<div class="plate">${specimen(k)}<h3>${t}</h3><p class="plate__size">${size}</p><p>${p}</p></div>`).join('')}</div>
  </div></section>` : '';
  emit({
    path: s.path,
    title: s.title,
    description: s.description,
    waText: s.waText,
    crumbs: [[s.crumb]],
    schema: [faqSchema(s.faq), { '@context': 'https://schema.org', '@type': 'Service', name: s.crumb, provider: { '@type': 'PestControl', name: SITE.name, telephone: SITE.phoneIntl }, areaServed: 'Île-de-France' }],
    body: `
<section class="page-hero"><div class="wrap page-hero__grid">
  <div>
    <h1 class="reveal">${s.h1}</h1>
    <p class="lede reveal reveal--2">${s.lede}</p>
    <div class="actions reveal reveal--3">${btnQuote('btn--lg')}${btnCall('btn--lg', `Appeler le ${SITE.phone}`)}${btnWa(s.waText, 'btn--lg')}</div>
    ${assure(s.assure)}
  </div>
  <div class="reveal reveal--2">${specimen(s.spec)}</div>
</div></section>
${s.alertTop ? `<div class="wrap" style="padding-top:28px"><div class="note note--alert">${s.alertTop}</div></div>` : ''}

<section class="section"><div class="wrap">
  <div class="sec-head"><h2>${s.signsTitle}</h2><p>${s.signsIntro}</p></div>
  ${pairs(s.signs)}
</div></section>
${plates}
<section class="section"><div class="wrap split">
  <div class="split__aside"><h2>${s.risksTitle}</h2></div>
  <div>${rows(s.risks)}<div class="note note--alert">${s.warning}</div></div>
</div></section>

<section class="section section--mint"><div class="wrap">
  <div class="sec-head"><h2>${s.stepsTitle}</h2></div>
  ${steps(s.steps)}
  ${s.sensitive ? `<div class="note" style="background:var(--white);margin-top:2.4rem">${s.sensitive}</div>` : ''}
</div></section>

<section class="section" id="devis"><div class="wrap split">
  <div class="split__aside"><h2>Un devis gratuit, ferme avant le traitement</h2><p class="lede" style="margin:1rem 0 1.4rem">Déplacement compris. Aucune majoration le soir, le week-end ou les jours fériés.</p></div>
  <div><p class="lede" style="margin-bottom:1.4rem">Le montant dépend de la surface, du niveau d'infestation et de l'accès. Décrivez votre situation, avec une photo si possible : nous revenons vers vous avec un devis précis.</p><div class="actions">${btnQuote('btn--lg', 'Demander mon devis gratuit')}${btnCall('btn--lg')}${btnWa(s.waText, 'btn--lg')}</div></div>
</div></section>

<section class="section section--mint"><div class="wrap split">
  <div><h2>${s.preventTitle}</h2><ul class="checks" style="margin-top:1.4rem">${s.prevent.map((p) => `<li>${p}</li>`).join('')}</ul></div>
  <div>${prefillForm}</div>
</div></section>

<section class="section"><div class="wrap split">
  <div class="split__aside"><h2>Questions fréquentes</h2></div>
  ${faq(s.faq)}
</div></section>
${closing({ title: s.closing, need: s.waText })}`,
  });
}

// ═════════════════════ URGENCE
const emergencies = [
  { id: 'nid', title: 'Un nid de frelons ou de guêpes', need: 'Guêpes ou frelons', msg: 'URGENT. Nid de guêpes ou frelons. Lieu : ', link: 'guepes-frelons.html',
    do: ['Éloignez-vous à au moins 5 mètres, avec les enfants et les animaux.', 'Fermez fenêtres et portes proches du nid.', 'Prenez une photo de loin, avec un repère pour la hauteur.'],
    dont: 'N\'arrosez pas, ne bouchez pas l\'entrée, n\'enfumez pas et n\'utilisez pas d\'échelle.' },
  { id: 'rat', title: 'Un rat ou une souris dans le logement', need: 'Rats ou souris', msg: 'URGENT. Rat ou souris dans le logement. Lieu : ', link: 'deratisation.html',
    do: ['Fermez la porte de la pièce et bloquez le bas avec une serviette.', 'Laissez une sortie vers l\'extérieur si l\'animal est dans une pièce qui donne dehors.', 'Mettez les aliments à l\'abri, et jetez tout ce qui a pu être touché.'],
    dont: 'Ne tentez pas de l\'attraper à mains nues, et ne le coincez pas : il peut mordre.' },
  { id: 'punaises', title: 'Des piqûres ou des punaises dans le lit', need: 'Punaises de lit', msg: 'URGENT. Suspicion de punaises de lit. Lieu : ', link: 'punaises-de-lit.html',
    do: ['Photographiez les insectes et les points noirs sur le matelas.', 'Lavez draps et vêtements exposés à 60 °C et gardez-les dans un sac fermé.', 'Continuez à dormir dans la même chambre si vous le pouvez.'],
    dont: 'Ne déplacez pas vos affaires ou votre matelas et n\'utilisez aucun fumigène.' },
  { id: 'commerce', title: 'Des nuisibles dans un commerce ou un restaurant', need: 'Cafards, fourmis ou puces', msg: 'URGENT. Nuisibles dans mon établissement. Type de commerce : ', link: 'professionnels.html',
    do: ['Isolez les denrées exposées et jetez ce qui est contaminé.', 'Notez ce que vous voyez, l\'heure et l\'endroit, et conservez une photo.', 'Appelez-nous : nous passons de préférence hors ouverture et remettons un rapport.'],
    dont: 'Ne pulvérisez pas d\'insecticide près des denrées et des plans de travail.' },
  { id: 'sinistre', title: 'Un sinistre, un décès, un lieu à assainir', need: 'Désinfection', msg: 'URGENT. Besoin d\'une désinfection. Situation : ', link: 'desinfection.html',
    do: ['Aérez si c\'est possible, et limitez les allers et venues.', 'Prévenez votre assurance en cas de sinistre.', 'Écrivez-nous sur WhatsApp si vous préférez ne pas en parler au téléphone.'],
    dont: 'Ne balayez pas et ne passez pas l\'aspirateur sur des déjections ou des zones souillées.' },
];
emit({
  path: 'urgence-nuisibles.html',
  title: `Urgence nuisibles à Paris et en Île-de-France : ${SITE.phone}`,
  description: `Nid de frelons, rat dans le logement, punaises, sinistre : que faire tout de suite, et intervention rapide en Île-de-France ${SITE.hoursLabel}, sans majoration.`,
  crumbs: [['Urgence nuisibles']],
  waText: 'URGENT. Bonjour, j\'ai besoin d\'une intervention rapide. Lieu : ',
  body: `
<section class="urgent section--tight" style="padding-block:clamp(40px,6vw,88px)"><div class="wrap urgent__grid">
  <div>
    <p class="kicker"><span class="status" data-status data-open="1"><i></i><span>${SITE.hoursLabel}</span></span></p>
    <h1 style="color:var(--white)">Une urgence ? Appelez, on vous guide tout de suite.</h1>
    <p class="lede">Sans majoration, même le dimanche. Nous vous disons quoi faire en attendant, et nous fixons le premier créneau possible.</p>
    <div class="actions"><a class="btn btn--bright btn--lg" href="${tel}">${ICONS.phone}${SITE.phone}</a><a class="btn btn--on-forest btn--lg" href="${wa('URGENT. Bonjour, j\'ai besoin d\'une intervention rapide. Lieu : ')}" target="_blank" rel="noopener">${ICONS.wa}Urgence WhatsApp</a></div>
  </div>
  <div>
    <h2 style="font-size:1.4rem;margin-bottom:.8rem">Votre situation</h2>
    <ul class="urgent__list">${emergencies.map((e) => `<li><a href="#${e.id}">${e.title} ${ICONS.arrow}</a></li>`).join('')}</ul>
  </div>
</div></section>

<div class="wrap" style="padding-top:clamp(28px,4vw,48px)"><div class="note note--alert"><strong>Danger immédiat pour une personne</strong> (malaise après une piqûre, difficulté à respirer, gonflement du visage, morsure grave) : appelez d'abord le <a href="tel:15">15</a> ou le <a href="tel:112">112</a>. En cas de fuite de gaz ou d'incendie : le <a href="tel:18">18</a>.</div></div>

<section class="section"><div class="wrap">
  <div class="sec-head"><h2>Que faire en attendant</h2></div>
  <div style="display:grid;gap:clamp(36px,5vw,64px)">
  ${emergencies.map((e) => `<article id="${e.id}" class="split" style="scroll-margin-top:100px;border-top:1.5px solid var(--forest);padding-top:1.4rem">
    <div><h3 style="font-size:clamp(1.4rem,1.2rem + 1vw,2rem);font-weight:700">${e.title}</h3>
      <div class="actions" style="margin-top:1.2rem">${btnCall('', 'Appeler')}${btnWa(e.msg)}</div>
      <p style="margin-top:1rem"><a href="{{r}}${e.link}">En savoir plus</a></p></div>
    <div><ul class="checks">${e.do.map((d) => `<li>${d}</li>`).join('')}</ul><div class="note note--alert"><strong>À éviter :</strong> ${e.dont}</div></div>
  </article>`).join('')}
  </div>
</div></section>

<section class="section section--mint"><div class="wrap split">
  <div><h2>Ce qu'il faut nous dire</h2><p class="lede" style="margin:1rem 0">Quatre informations suffisent pour gagner du temps.</p>
    <ul class="checks"><li>Votre commune ou votre code postal.</li><li>Ce que vous avez vu, avec une photo si vous pouvez.</li><li>Le lieu : appartement, maison, commerce, étage, hauteur du nid.</li><li>S'il y a sur place des enfants, des personnes fragiles ou des animaux.</li></ul>
    <p style="margin-top:1.4rem;color:var(--ink-soft)">Nous répondons ${SITE.hoursLabel}. En dehors de ces heures, laissez un message WhatsApp : nous vous recontactons dès la réouverture.</p>
  </div>
  <div>${needForm({ urgent: true, title: 'Message urgent', full: false })}</div>
</div></section>
${closing({ title: 'Mieux vaut un appel de trop.', text: 'Si ce n\'est pas urgent, nous vous le dirons. Le conseil est gratuit.', need: 'URGENT. Bonjour, j\'ai besoin d\'une intervention rapide. Lieu : ' })}`,
});

// ═════════════════════ DEVIS
const devisFaq = [
  ['Le devis est-il vraiment gratuit ?', 'Oui, et sans engagement : vous restez libre de ne pas donner suite. La venue du technicien pour établir le devis est gratuite.'],
  ['Comment le montant est-il fixé ?', 'Il dépend du nuisible, de la surface, du niveau d\'infestation et de l\'accès. Une photo nous permet de vous répondre plus vite, et le devis écrit fixe ensuite le montant exact.'],
  ['Combien de passages faut-il ?', 'Cela dépend du nuisible : souvent deux pour les punaises de lit, parfois un contrôle pour les rongeurs. Le nombre de passages est toujours annoncé sur le devis.'],
  ['Proposez-vous un contrat annuel ?', 'Oui, pour les particuliers comme pour les professionnels : plusieurs passages par an, préventifs ou curatifs, avec rapport à chaque visite. Précisez-le dans votre demande, le devis sera établi sur mesure.'],
];
emit({
  path: 'devis.html',
  title: `Devis gratuit dératisation et désinsectisation en Île-de-France | ${SITE.name}`,
  description: 'Demandez un devis gratuit et sans engagement : rats, souris, punaises de lit, cafards, nids de frelons, désinfection. Réponse rapide, Paris et Île-de-France.',
  crumbs: [['Devis']],
  waText: 'Bonjour, je souhaite un devis.',
  schema: [faqSchema(devisFaq)],
  body: `
<section class="page-hero"><div class="wrap" style="padding-top:clamp(24px,3.4vw,44px)">
  <div class="narrow"><h1>Un devis gratuit, ferme avant le traitement.</h1><p class="lede">Dites-nous ce que vous avez observé. Nous vous répondons ${SITE.hoursLabel}, avec un montant précis, sans surprise.</p></div>
  ${assure(['Devis gratuit et sans engagement', 'Déplacement compris', 'Aucune majoration soir et week-end', `Garantie de ${SITE.guarantee}`])}
</div></section>

<section class="section"><div class="wrap split split--even">
  <div><h2>Votre demande, en 30 secondes</h2><p class="lede" style="margin-top:1rem">Choisissez votre besoin, indiquez votre commune : votre message s'ouvre dans WhatsApp, déjà rempli. Une photo accélère tout.</p>
    <ul class="checks" style="margin-top:1.6rem"><li>Réponse ${SITE.hoursLabel}.</li><li>Devis écrit, valable pour le protocole complet.</li><li>Tout est indiqué : passages, produits, garantie.</li></ul>
    <div class="actions" style="margin-top:1.6rem">${btnCall('btn--lg', `Appeler le ${SITE.phone}`)}</div></div>
  <div>${needForm({ full: true, title: 'Demander un devis' })}</div>
</div></section>

<section class="section section--mint"><div class="wrap split">
  <div class="split__aside"><h2>Questions sur le devis</h2></div>
  ${faq(devisFaq)}
</div></section>
${closing({ title: 'Décrivez votre besoin, on s\'occupe du reste.', need: 'Bonjour, je souhaite un devis.' })}`,
});

// ═════════════════════ PROFESSIONNELS
const proFaq = [
  ['Suis-je légalement obligé d\'avoir un contrat ?', 'Le règlement européen CE 852/2004 impose aux établissements alimentaires de prévenir les nuisibles avec des procédures documentées. Un contrat n\'est pas nommément exigé, mais c\'est le moyen le plus simple de prouver votre conformité.'],
  ['Pouvez-vous intervenir sans que mes clients le voient ?', 'Oui. Véhicule banalisé sur demande, tenue neutre, passage avant l\'ouverture, après la fermeture ou le dimanche.'],
  ['Comment gérez-vous une copropriété entière ?', 'Nous préparons un devis global pour l\'assemblée générale, coordonnons les accès avec le gardien ou le conseil syndical, puis remettons un rapport par bâtiment.'],
  ['Quels documents vais-je recevoir ?', 'Après chaque passage, un rapport daté et le registre mis à jour. En permanence, les fiches de données de sécurité, l\'attestation Certibiocide et l\'attestation d\'assurance.'],
  ['Comment se passe la facturation ?', 'Facture entreprise avec TVA, mensualisation possible sur les contrats annuels. Le coût annuel est détaillé dès la proposition.'],
];
emit({
  path: 'professionnels.html',
  title: `Contrat anti-nuisibles pour professionnels en Île-de-France | ${SITE.name}`,
  description: 'Restaurants, syndics, hôtels, commerces : plan de lutte HACCP, registre, passages discrets et audit gratuit de vos locaux, partout en Île-de-France.',
  crumbs: [['Professionnels']],
  waText: 'Bonjour, je suis un professionnel et je souhaite un audit de mes locaux. Activité : ',
  schema: [faqSchema(proFaq)],
  body: `
<section class="page-hero"><div class="wrap" style="padding-top:clamp(24px,3.4vw,44px)">
  <div class="narrow"><h1>Pour vos clients, aucun nuisible. Pour l'inspecteur, un dossier complet.</h1><p class="lede">Un cafard aperçu en salle coûte bien plus cher qu'un contrat. Nous prévenons le problème toute l'année, sans gêner votre activité.</p>
  <div class="actions" style="margin-top:1.5rem">${btnCall('btn--lg', `Appeler le ${SITE.phone}`)}${btnWa('Bonjour, je suis un professionnel et je souhaite un audit de mes locaux. Activité : ', 'btn--lg', 'Demander un audit')}</div></div>
  ${assure(['Registre conforme HACCP', 'Discrétion, véhicule banalisé', 'Ligne directe 7j/7'])}
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><h2>Chaque métier a ses obligations</h2></div>
  ${pairs([
    ['Restaurants et métiers de bouche', 'Plan de lutte, registre à jour, passages hors service.'],
    ['Syndics et copropriétés', 'Parties communes et logements coordonnés, devis pour l\'AG, rapport par bâtiment.'],
    ['Hôtels et hébergements', 'Protocole punaises de lit prioritaire, traitement de chambre en toute discrétion.'],
    ['Commerces et bureaux', 'Prévention continue, passages tôt le matin ou après la fermeture.'],
    ['Écoles et crèches', 'Produits ciblés, postes inaccessibles, interventions hors présence du public.'],
    ['Établissements de santé', 'Désinfection normée EN 14476, traçabilité complète, certificats pour vos audits.'],
    ['Chantiers et BTP', 'Dératisation avant démolition quand elle est exigée, attestations pour vos dossiers.'],
    ['Collectivités', 'Bâtiments publics et réseaux, reporting consolidé et plan de prévention.'],
  ])}
</div></section>

<section class="section section--mint"><div class="wrap">
  <div class="sec-head"><h2>Ponctuel ou contrat annuel ?</h2></div>
  <div class="pairs">
    <div><h3>Intervention ponctuelle</h3><p>Pour régler vite un problème déclaré.</p><ul class="checks" style="margin-top:1rem"><li>Intervention ${SITE.delay}, 7j/7</li><li>Rapport et facture entreprise</li><li>Garantie de ${SITE.guarantee}</li><li><a href="{{r}}devis.html">Demander un devis</a></li></ul></div>
    <div><h3>Contrat annuel de prévention</h3><p>Pour ne plus découvrir le problème en même temps que vos clients.</p><ul class="checks" style="margin-top:1rem"><li>4 passages par an, plus si votre activité l'exige</li><li>Urgences à 25 % de remise</li><li>Registre tenu à jour, plan des postes, fiches de sécurité</li><li>Facturation mensualisée possible</li></ul></div>
  </div>
</div></section>

<section class="section"><div class="wrap split">
  <div class="split__aside"><h2>Un contrôle d'hygiène ? Vous êtes prêt.</h2><p class="lede" style="margin-top:1rem">Le paquet hygiène impose aux professionnels de l'alimentaire de documenter leur lutte contre les nuisibles.</p><p style="margin-top:1rem"><a href="{{r}}blog/restaurant-plan-de-lutte-nuisibles-haccp.html">Lire notre guide du plan de lutte</a></p></div>
  <div><ul class="checks"><li>Plan de dératisation avec postes numérotés et cartographiés.</li><li>Registre des passages daté et signé, consultable à tout moment.</li><li>Fiches de données de sécurité des produits utilisés.</li><li>Certificats d'intervention, attestation Certibiocide et assurance.</li></ul>
  <div class="note">En cas de contrôle, l'absence de plan de lutte documenté peut être relevée comme une non-conformité, même sans nuisible constaté.</div></div>
</div></section>

<section class="section section--mint"><div class="wrap">
  <div class="sec-head"><h2>Comment on démarre</h2></div>
  ${steps([
    ['Audit gratuit', 'Un technicien inspecte vos locaux, repère les risques et les accès. Sans engagement.'],
    ['Plan sur mesure', 'Fréquence, dispositifs et protocole dimensionnés à votre activité et à votre budget.'],
    ['Passages programmés', 'Avant l\'ouverture, après le service ou le dimanche.'],
    ['Suivi', 'Registre à jour après chaque passage, alerte en cas d\'activité, bilan annuel.'],
  ])}
</div></section>

<section class="section"><div class="wrap split">
  <div class="split__aside"><h2>Questions des professionnels</h2></div>
  ${faq(proFaq)}
</div></section>
${closing({ title: 'Commencez par un audit gratuit.', text: 'Un passage sur place, un diagnostic écrit, une proposition claire. Et si tout va bien, on vous le dira aussi.', need: 'Bonjour, je suis un professionnel et je souhaite un audit de mes locaux. Activité : ' })}`,
});

// ═════════════════════ IDENTIFIER
const clueRows = [
  ['Piqûres en ligne au réveil, points noirs sur le matelas', 'Punaises de lit', 'punaises-de-lit.html'],
  ['Petits insectes bruns qui fuient à l\'allumage, grains de poivre dans les placards', 'Blattes', 'cafards-blattes.html'],
  ['Crottes de 3 à 6 mm, sachets percés, petits bruits dans les cloisons', 'Souris', 'deratisation.html'],
  ['Crottes de 1 à 2 cm, traces grasses, bruits lourds, odeur d\'ammoniac', 'Rats', 'deratisation.html'],
  ['Colonnes d\'insectes le long des plinthes', 'Fourmis', 'cafards-blattes.html'],
  ['Moucherons autour des siphons, papillons ou toiles dans la farine, trous dans les lainages', 'Mouches, moucherons, mites', 'desinsectisation.html'],
  ['Piqûres aux chevilles, animal qui se gratte', 'Puces', 'cafards-blattes.html'],
  ['Va-et-vient d\'insectes rayés au même endroit, nid visible', 'Guêpes ou frelons', 'guepes-frelons.html'],
];
emit({
  path: 'identifier-nuisible.html',
  title: `Identifier un nuisible : indices et photos | ${SITE.name}`,
  description: 'Crottes, piqûres, bruits, traces : comparez ce que vous observez à nos planches, ou envoyez une photo sur WhatsApp pour une identification gratuite.',
  crumbs: [['Identifier un nuisible']],
  waText: 'Bonjour, voici une photo. Pouvez-vous identifier ce nuisible ?',
  body: `
<section class="page-hero"><div class="wrap" style="padding-top:clamp(24px,3.4vw,44px)">
  <div class="narrow"><h1>Quel est cet intrus ?</h1><p class="lede">Comparez ce que vous observez à nos planches. Si vous hésitez, envoyez une photo, même floue : un technicien vous répond gratuitement.</p>
  <div class="actions" style="margin-top:1.5rem">${btnWa('Bonjour, voici une photo. Pouvez-vous identifier ce nuisible ?', 'btn--lg', 'Envoyer une photo')}${btnCall('btn--lg')}</div></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><h2>Ce que vous observez</h2></div>
  <div class="table-wrap"><table><thead><tr><th>Indices</th><th>Plutôt</th></tr></thead><tbody>
  ${clueRows.map(([c, r, h]) => `<tr><td>${c}</td><td><a href="{{r}}${h}">${r}</a></td></tr>`).join('')}
  </tbody></table></div>
</div></section>

<section class="section section--mint"><div class="wrap">
  <div class="sec-head"><h2>Nos planches</h2><p>Dessins vus de dessus. Cliquez pour voir la méthode.</p></div>
  <div class="plates" style="background:var(--white)">
  ${[
    ['rat', 'Rat', '20 à 27 cm sans la queue', 'Caves, combles, réseaux. Crottes de 1 à 2 cm.', 'deratisation.html'],
    ['souris', 'Souris', '7 à 10 cm', 'Cuisine, doublages. Passe par un trou de 6 mm environ.', 'deratisation.html'],
    ['punaise', 'Punaise de lit', '4 à 7 mm', 'Plate et brun-rouge. Coutures du matelas, plinthes.', 'punaises-de-lit.html'],
    ['cafard', 'Blatte', '1,2 à 3 cm', 'Cuisine, salle de bain, gaines. Active la nuit.', 'cafards-blattes.html'],
    ['fourmi', 'Fourmi', 'Quelques mm', 'En colonnes le long des murs, vers la nourriture.', 'cafards-blattes.html'],
    ['frelon', 'Guêpe ou frelon', '1 à 3,5 cm', 'Va-et-vient vers un nid. Ne vous en approchez pas.', 'guepes-frelons.html'],
  ].map(([k, t, sz, p, h]) => `<a class="plate" href="{{r}}${h}">${specimen(k)}<h3>${t}</h3><p class="plate__size">${sz}</p><p>${p}</p></a>`).join('')}
  </div>
</div></section>
${closing({ title: 'Toujours un doute ? Envoyez la photo.', text: 'Une photo de l\'insecte, de la trace ou des crottes, la pièce concernée et depuis quand. On s\'occupe du reste.', need: 'Bonjour, voici une photo. Pouvez-vous identifier ce nuisible ?' })}`,
});

// ═════════════════════ SECTEURS
const secCfg = {};
emit({
  path: 'secteurs/index.html',
  title: `Secteur d'intervention : Paris et Île-de-France | ${SITE.name}`,
  description: 'Dératisation, punaises de lit, cafards, nids de frelons et désinfection à Paris, dans les Hauts-de-Seine, le 93, le 94, le 77, le 78, le 91 et le 95.',
  crumbs: [['Secteurs d\'intervention']],
  extraCfg: secCfg,
  body: `
<section class="page-hero"><div class="wrap" style="padding-top:clamp(24px,3.4vw,44px)">
  <div class="narrow"><h1>Paris et toute l'Île-de-France.</h1><p class="lede">Nous nous déplaçons dans les 8 départements de la région, sans frais de déplacement. Le créneau exact est confirmé à la prise de contact.</p>
  <div class="zipcheck" data-zip><label class="field"><span style="display:block;font-weight:600;margin-bottom:.4rem">Vérifiez votre code postal</span><input inputmode="numeric" maxlength="5" placeholder="Ex. 94000" autocomplete="postal-code"></label><p class="zipcheck__out" aria-live="polite"></p></div></div>
</div></section>
<section class="section"><div class="wrap map-grid"><div>${idfMap()}</div><div>${depList()}</div></div></section>
<section class="section section--mint"><div class="wrap">
  <div class="sec-head"><h2>Les communes par département</h2></div>
  <div class="pairs">${SECTEURS.map((s) => `<div><h3><a href="{{r}}secteurs/${s.slug}.html">${s.name} (${s.code})</a></h3><p>${s.cities.slice(0, 8).join(', ')}…</p></div>`).join('')}</div>
</div></section>
${closing({ title: 'Votre commune n\'apparaît pas ?', text: 'Ces listes ne sont pas exhaustives : nous couvrons toute la région. Appelez-nous ou écrivez-nous.' })}`,
});

for (const s of SECTEURS) {
  emit({
    path: `secteurs/${s.slug}.html`,
    title: `Dératisation et désinsectisation ${s.a} (${s.code}) | ${SITE.name}`,
    description: `Rats, souris, punaises de lit, cafards, nids de frelons et désinfection ${s.a}. Intervention ${SITE.delay}, sans majoration. Appelez le ${SITE.phone}.`,
    crumbs: [['Secteurs', 'secteurs/index.html'], [s.name]],
    waText: `Bonjour, j'ai un problème de nuisibles ${s.a}. Commune : `,
    body: `
<section class="page-hero"><div class="wrap page-hero__grid page-hero__grid--map">
  <div>
    <h1>Nuisibles ${s.a} : intervention ${SITE.delay}.</h1>
    <p class="lede">${s.intro}</p>
    <div class="actions">${btnCall('btn--lg', `Appeler le ${SITE.phone}`)}${btnWa(`Bonjour, j'ai un problème de nuisibles ${s.a}. Commune : `, 'btn--lg')}</div>
  </div>
  <div>${idfMap(s.code)}</div>
</div></section>
<section class="section"><div class="wrap split">
  <div class="split__aside"><h2>Ce que l'on rencontre ${s.a}</h2></div>
  ${rows(s.context)}
</div></section>
<section class="section section--mint"><div class="wrap split">
  <div>
    <h2>${s.citiesLabel || 'Communes desservies'}</h2>
    <p style="margin:.8rem 0 1.2rem;color:var(--ink-soft)">${s.citiesLabel ? 'Tout Paris, sans exception.' : 'Parmi d\'autres : nous couvrons tout le département.'}</p>
    <ul class="cities">${s.cities.map((c) => `<li>${c}</li>`).join('')}</ul>
    <div class="note" style="background:var(--white)"><strong>Le conseil du technicien.</strong> ${s.tip}</div>
  </div>
  <div>${needForm({ title: `Votre besoin ${s.a}` })}</div>
</div></section>
<section class="section"><div class="wrap">
  <div class="sec-head"><h2>Nos services ${s.a}</h2></div>
  <div class="ledger">
    ${SERVICES.map((v) => `<a class="ledger__row" href="{{r}}${v.href}">${specimen(v.spec)}<h3>${v.name}</h3><p class="ledger__sign" style="margin:0">${v.sign}</p><span class="ledger__price">Demander un devis</span><span class="ledger__arrow">${ICONS.arrow}</span></a>`).join('')}
  </div>
</div></section>
${closing({ title: `Un problème ${s.a} ?`, need: `Bonjour, j'ai un problème de nuisibles ${s.a}. Commune : ` })}`,
  });
}

// ═════════════════════ BLOG
emit({
  path: 'blog/index.html',
  title: `Blog : conseils contre les nuisibles | ${SITE.name}`,
  description: 'Reconnaître les nuisibles, réagir, prévenir, connaître vos droits : nos conseils pratiques sur les rats, punaises de lit, cafards, frelons et la désinfection.',
  crumbs: [['Blog']],
  body: `
<section class="page-hero"><div class="wrap" style="padding-top:clamp(24px,3.4vw,44px)"><div class="narrow"><h1>Comprendre, réagir, prévenir.</h1><p class="lede">Des conseils concrets, y compris pour ce que vous pouvez régler seul.</p></div></div></section>
<section class="section"><div class="wrap"><div class="posts">${recentPosts.map(postCard).join('')}</div></div></section>
${closing()}`,
});

for (const p of POSTS) {
  const others = recentPosts.filter((o) => o.slug !== p.slug).slice(0, 3);
  emit({
    path: `blog/${p.slug}.html`,
    title: `${p.title} | ${SITE.name}`,
    description: p.desc,
    crumbs: [['Blog', 'blog/index.html'], [p.title.length > 44 ? `${p.title.slice(0, 42)}…` : p.title]],
    schema: [{ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.desc, datePublished: p.date, author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name } }],
    body: `
<section class="section--tight"><div class="wrap article">
  <article>
    <p class="kicker"><a href="{{r}}${p.service}">${p.serviceName}</a> · ${p.dateLabel} · ${p.read}</p>
    <h1 style="font-size:clamp(2rem,1.4rem + 2.4vw,3.3rem)">${p.title}</h1>
    <div class="prose" style="margin-top:1.8rem">${p.body}</div>
    <div class="actions" style="margin-top:2.4rem"><a class="btn btn--ghost" href="{{r}}${p.service}">Voir ${p.serviceName.toLowerCase()} ${ICONS.arrow}</a></div>
  </article>
  <aside class="article__aside">${needForm({ preset: p.need, title: 'Besoin d\'un avis ?' })}</aside>
</div></section>
<section class="section section--mint section--tight"><div class="wrap"><div class="sec-head"><h2>À lire aussi</h2></div><div class="posts">${others.map(postCard).join('')}</div></div></section>
${closing()}`,
  });
}

// ═════════════════════ À PROPOS
emit({
  path: 'a-propos.html',
  title: `À propos | ${SITE.name}`,
  description: `${SITE.name}, entreprise de dératisation, désinsectisation et désinfection à Paris et en Île-de-France. Des devis gratuits et des engagements écrits.`,
  crumbs: [['À propos']],
  body: `
<section class="page-hero"><div class="wrap" style="padding-top:clamp(24px,3.4vw,44px)"><div class="narrow"><h1>Dire la vérité, sur le diagnostic comme sur le reste.</h1><p class="lede">Dans ce métier, la confiance se gagne en expliquant ce qui marche, ce qui ne marche pas et ce que vous devez attendre d'un devis.</p></div></div></section>
<section class="section"><div class="wrap split">
  <div class="split__aside"><h2>Une seule équipe, du diagnostic à la garantie</h2></div>
  <div class="prose">
    <p>${SITE.name} intervient chez les particuliers et les professionnels à Paris et dans toute l'Île-de-France : rats et souris, punaises de lit, cafards, fourmis, puces, guêpes, frelons et désinfection.</p>
    <p>Notre principe est simple : celui qui établit le diagnostic est celui qui traite, et celui qui traite répond quand vous rappelez. Vous n'avez pas de plateforme ni de commercial entre vous et le technicien.</p>
    <p>Quand vous n'avez pas besoin de nous, nous vous le disons : un vieux nid vide en hiver, une piqûre qui ne vient pas d'une punaise, un problème que vous pouvez régler avec un bon rebouchage.</p>
  </div>
</div></section>
<section class="section section--mint"><div class="wrap">
  <div class="sec-head"><h2>Nos engagements</h2></div>
  ${pairs([
    ['Transparence', 'Devis gratuit et écrit. Le devis signé ne bouge pas, et aucune majoration ne s\'applique le soir, le week-end ou les jours fériés.'],
    ['Rigueur', `Protocoles écrits, rapport d'intervention à chaque passage et garantie de ${SITE.guarantee}.`],
    ['Responsabilité', 'Usage raisonné des biocides, protocoles adaptés aux enfants et aux animaux, et pas de destruction d\'abeilles.'],
    ['Respect', 'Dans les situations sensibles, nous intervenons sans jugement et en toute discrétion.'],
  ])}
</div></section>
<section class="section"><div class="wrap split">
  <div class="split__aside"><h2>Des garanties que vous pouvez vérifier</h2></div>
  <ul class="checks">
    <li><strong>Certibiocide :</strong> la certification requise pour l'usage professionnel de ces produits. Attestation présentée sur demande.</li>
    <li><strong>Assurance responsabilité civile professionnelle :</strong> attestation présentée sur demande.</li>
    <li><strong>Produits professionnels autorisés :</strong> fiches de données de sécurité disponibles et traçabilité de ce qui est appliqué chez vous.</li>
    <li><strong>Entreprise immatriculée :</strong> <a href="{{r}}mentions-legales.html">voir les mentions légales</a>.</li>
  </ul>
</div></section>
${closing({ title: 'Mettez-nous à l\'épreuve.', text: 'Le devis est gratuit et vous restez libre. C\'est la meilleure façon de nous juger.' })}`,
});

// ═════════════════════ CONTACT
emit({
  path: 'contact.html',
  title: `Contact : ${SITE.phone} | ${SITE.name}`,
  description: `Appelez le ${SITE.phone} ou écrivez sur WhatsApp en indiquant votre besoin. Dératisation, désinsectisation et désinfection en Île-de-France, ${SITE.hoursLabel}.`,
  crumbs: [['Contact']],
  body: `
<section class="section--tight"><div class="wrap split split--even">
  <div>
    <h1 style="font-size:clamp(2.1rem,1.4rem + 3vw,3.9rem)">Parlons de votre problème.</h1>
    <p class="lede" style="margin-top:1.1rem">Le plus rapide reste le téléphone. Sur WhatsApp, une photo nous aide à répondre vite.</p>
    <a href="${tel}" style="display:block;margin-top:1.6rem;font:700 clamp(2.1rem,1.5rem + 2.6vw,3.6rem)/1 var(--font-display);letter-spacing:-.03em;color:var(--forest);text-decoration:none">${SITE.phone}</a>
    <p style="margin-top:.6rem"><span class="status" data-status data-open="1"><i style="background:var(--green)"></i><span>${SITE.hoursLabel}</span></span></p>
    <div class="actions" style="margin-top:1.4rem">${btnCall('btn--lg', 'Appeler')}${btnWa('Bonjour, j\'ai un problème de nuisibles.', 'btn--lg')}</div>
    <ul class="checks" style="margin-top:2.2rem">
      <li><strong>Horaires :</strong> ${SITE.hoursLabel}, sans majoration.</li>
      <li><strong>Zone :</strong> Paris et toute l'<a href="{{r}}secteurs/index.html">Île-de-France</a>.</li>
      <li><strong>Urgence ?</strong> <a href="{{r}}urgence-nuisibles.html">Les gestes à faire tout de suite</a>.</li>
    </ul>
  </div>
  <div>${needForm({ full: true, title: 'Votre besoin, en 30 secondes' })}</div>
</div></section>`,
});

// ═════════════════════ LÉGAL
emit({
  path: 'mentions-legales.html',
  title: `Mentions légales | ${SITE.name}`,
  description: `Mentions légales du site ${SITE.name}.`,
  crumbs: [['Mentions légales']],
  body: `<section class="section--tight"><div class="wrap narrow prose">
    <h1 style="font-size:clamp(2rem,1.5rem + 2vw,3rem)">Mentions légales</h1>
    <div class="note note--alert"><strong>À compléter avant la mise en ligne :</strong> les champs entre crochets ci-dessous.</div>
    <h2>Éditeur du site</h2>
    <p>${SITE.name}<br>[Forme juridique et capital]<br>[Adresse du siège]<br>SIRET : [numéro]<br>TVA intracommunautaire : [numéro]<br>Téléphone : <a href="${tel}">${SITE.phone}</a><br>E-mail : [adresse]</p>
    <p>Directeur de la publication : [nom]</p>
    <h2>Certification et assurance</h2>
    <p>Certificat individuel Certibiocide : [numéro et date de validité]<br>Assurance responsabilité civile professionnelle : [assureur et numéro de contrat]</p>
    <h2>Hébergement</h2>
    <p>[Nom, adresse et téléphone de l'hébergeur]</p>
    <h2>Propriété intellectuelle</h2>
    <p>Les textes et illustrations de ce site sont protégés. Toute reproduction nécessite une autorisation préalable.</p>
    <h2>Informations sanitaires</h2>
    <p>Les conseils publiés sur ce site sont donnés à titre d'information générale et ne remplacent ni un avis médical ni un conseil juridique. En cas d'urgence médicale, appelez le 15 ou le 112.</p>
  </div></section>`,
});
emit({
  path: 'confidentialite.html',
  title: `Confidentialité | ${SITE.name}`,
  description: `Comment ${SITE.name} traite vos données personnelles.`,
  crumbs: [['Confidentialité']],
  body: `<section class="section--tight"><div class="wrap narrow prose">
    <h1 style="font-size:clamp(2rem,1.5rem + 2vw,3rem)">Confidentialité</h1>
    <h2>Ce que le site collecte</h2>
    <p>Ce site ne stocke aucune donnée saisie dans ses formulaires. Lorsque vous cliquez sur « Envoyer sur WhatsApp », le texte est transmis à l'application WhatsApp, et le message n'est envoyé que si vous le validez. Le site n'utilise ni cookie publicitaire ni outil de mesure d'audience.</p>
    <h2>Ce que nous faisons de vos messages</h2>
    <p>Les informations que vous nous envoyez par téléphone ou par WhatsApp servent uniquement à répondre à votre demande, à établir un devis et à réaliser l'intervention. Elles ne sont ni revendues ni cédées.</p>
    <p>L'utilisation de WhatsApp est soumise aux conditions et à la politique de confidentialité de son éditeur.</p>
    <h2>Vos droits</h2>
    <p>Vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant au <a href="${tel}">${SITE.phone}</a> ou à [adresse e-mail]. Vous pouvez aussi saisir la CNIL.</p>
  </div></section>`,
});

// ═════════════════════ 404, ASSETS, SITEMAP
writeFileSync(join(out, '404.html'), render({
  path: '404.html', title: `Page introuvable | ${SITE.name}`, description: 'Cette page n\'existe pas.',
  body: `<section class="section"><div class="wrap narrow"><h1>Cette page s'est échappée.</h1><p class="lede" style="margin-top:1rem">Revenez à l'accueil, ou appelez-nous directement.</p><div class="actions" style="margin-top:1.5rem"><a class="btn btn--ghost" href="index.html">Accueil</a>${btnCall()}</div></div></section>`,
}).replace('<meta name="description"', '<meta name="robots" content="noindex"><meta name="description"'));

cpSync(join(root, 'assets'), join(out, 'assets'), { recursive: true });
writeFileSync(join(out, 'assets', 'favicon.svg'), FAVICON);
writeFileSync(join(root, '..', 'assets', 'favicon.svg'), FAVICON);
writeFileSync(join(root, '..', 'nettoyage', 'assets', 'favicon.svg'), FAVICON);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE.url}/${p.replace(/index\.html$/, '')}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(root, '..', 'index.html'), portal());
console.log(`${pages.length} pages générées dans anti-nuisible/, accueil Baye Clean mis à jour`);
