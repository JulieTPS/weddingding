# ANALYSE BUSINESS — FAIRE-PART MARIAGE NFC + SITE DIGITAL
## Business Analyst — Cadre 7 étapes
*Généré le 27/06/2026*

---

## TL;DR / VERDICT

**GO CONDITIONNEL** — avec des bémols sérieux.

Gap concurrentiel réel en France, marge brute solide (~67%), faisabilité technique excellente pour un dev solo. Le pari central : des couples français en 2026 sont prêts à payer un surcoût de €80-100 sur leur budget faire-part pour l'effet "wow" du NFC — ET ce surcoût se justifie par le fait de ne pas avoir à payer un site mariage séparé. Si ce pari est faux (ils utilisent Joy gratuitement de toute façon), le modèle s'effondre. Le bottleneck opérationnel (collage manuel) est le vrai plafond de verre.

---

## 0. CADRAGE

**En une phrase :** Vendre aux couples français un kit physique + digital (100 cartes premium avec puce NFC collée, donnant accès à un site de mariage personnalisé RSVP/programme/photos) à ~€199-299 la commande, sur un marché de 247 000 mariages/an, contre des spécialistes du faire-part (CottonBird, Monfairepart) qui ne font pas de NFC, et des sites de mariage gratuits (Joy, Zankyou) qui ne font pas de physique.

---

## 1. SIZING DU MARCHÉ

### Volumes officiels (France)

- **247 000 mariages/an** (INSEE 2024). [Source](https://laplace-groupe.com/publications/chiffre-du-mois/le-chiffre-du-mois-247000-soit-le-nombre-de-mariages-celebre-en-2024-en-france)
- Tendance : stable sur 3 ans après rebond post-COVID 2022, légère baisse tendancielle depuis 2019.
- Saisonnalité forte : **60-70% des mariages entre mai et septembre**. Commandes de faire-part 3-4 mois avant : pic janvier-avril. Hors saison quasi mort.

### TAM / SAM / SOM

| Niveau | Définition | Estimation | Méthode |
|--------|-----------|-----------|---------|
| **TAM** | Tous les mariages FR | 247 000 couples/an | INSEE |
| **SAM** | Couples achetant des faire-parts imprimés premium (excluent DIY Canva, faire-parts numériques purs, mariages sans faire-part) | ~75 000-100 000 couples/an | ~30-40% du total, prix ≥ €100 pour 100 unités |
| **SOM réaliste an 1** | Couples urbains, tech-savvy, prêts à payer surcoût NFC | **200-600 commandes/an** | 0,2-0,5% du SAM, acquisition organique + bouche-à-oreille |

**Point critique :** Le SOM ne représente pas 1% du marché en an 1. C'est un marché de niche premium, pas un marché de masse.

---

## 2. CARTOGRAPHIE + TEARDOWN CONCURRENCE

### Sites de mariage (digital only)

| Acteur | Modèle éco | Prix couple | Forces | Faiblesses |
|--------|-----------|-----------|--------|-----------|
| **Joy (Withjoy)** | Freemium — gratuit, revenu via registre et add-ons | Gratuit · domaine perso ~€18/an | UX irréprochable, RSVP, app mobile, 600+ templates | Aucun physique, US-first |
| **Zankyou** | Freemium + commission liste cadeaux (1,3% + €1/transaction) | Gratuit · Design Pack +€40 | Fort en France, liste cadeaux intégrée | Site mariage basique, pas de NFC, pas de physique |
| **Mariages.net** | Marketplace BtoB (prestataires) | — | Trafic fort en FR | Pas de produit faire-part |

**Conclusion digital : Joy et Zankyou offrent le site mariage GRATUITEMENT.** L'argument "site mariage inclus" vaut €0 dans l'esprit du client si Joy existe. Il faut vendre sur le faire-part physique premium, pas sur le site.

### Faire-parts imprimés (physique, sans NFC)

| Acteur | Prix 100 unités | Forces | Faiblesses |
|--------|----------------|--------|-----------|
| **CottonBird (FR)** | €118-264 (€1.18-2.64/pièce) | Qualité, marque, éco-responsable | Aucun digital, aucun NFC |
| **Monfairepart (FR)** | ~€100-200 | Service perso | Aucun digital |
| **Minted (US/EU)** | $480 moy. pour 100 suites (~€4-5/pièce) | Qualité luxe | Prix élevé, US-centré, pas de NFC |
| **MOO (EU)** | €30-50 pour 100 cartes standard | Qualité premium accessible | Pas de faire-part mariage spécifique, pas de NFC |

### Cartes NFC génériques + mariage

| Acteur | Prix unitaire | Marché | Notes |
|--------|-------------|--------|-------|
| **Etsy (vendeurs indépendants)** | ~$5/carte NFC mariage | US/UK | LuxeLink : carte + puce NFC. Artisanal, pas de plateforme derrière |
| **NFCfied** | Non communiqué | US/Inde | NFC immersive mariage, AR, pricing opaque |
| **Tinydabba** | Non communiqué | Inde | Carte NFC + landing page mariage, Amazon.in |

**Conclusion NFC mariage France :** Il n'existe pas d'acteur français structuré sur ce créneau en 2026. C'est le signal le plus positif de cette analyse.

---

## 3. MARKET GAP

**Le gap réel :**
La combinaison **carte physique premium + puce NFC + plateforme digitale dédiée mariage + UX française** n'est pas couverte en France.

Ce qui existe séparément mais jamais ensemble :
- Physique seul : CottonBird, Monfairepart
- Digital seul et gratuit : Joy, Zankyou
- NFC nu sans plateforme : Etsy artisanaux, Alibaba
- NFC + plateforme mais en anglais, hors France : NFCfied, BizLite

**Ce qui n'existe pas en FR :** Un produit clé-en-main où le couple commande, reçoit les cartes NFC déjà prêtes à distribuer, et dispose d'un dashboard français pour gérer son site mariage.

**Nuance importante :** Ce gap est réel aujourd'hui mais c'est le type de gap que CottonBird, un dev concurrent, ou même Canva peut combler en 3-6 mois. La barrière à l'entrée est basse.

---

## 4. KILLER FEATURE — 3 CANDIDATS

### Candidat A — "Scan & Done" : NFC préconfigurée, zéro friction

La puce est déjà programmée à l'expédition. L'invité scanne, il arrive directement sur le site. Pas de QR code à imprimer, pas d'app à télécharger.

| Critère | Note /5 |
|---------|---------|
| Défensibilité | 2/5 — Techniquement simple, copiable facilement |
| Douleur résolue | 4/5 — Le QR code est perçu comme "cheap", le NFC comme premium |
| Faisabilité (dev solo) | 5/5 — URL write sur NTAG213 = trivial |
| **Score total** | **11/15** |

### Candidat B — Dashboard couple ultra-simple : site mariage en 10 min

Builder façon Linktree pour mariage : templates beaux, RSVP avec export CSV, plan d'accès intégré Maps, compte à rebours.

| Critère | Note /5 |
|---------|---------|
| Défensibilité | 1/5 — Joy fait ça gratuitement et mieux |
| Douleur résolue | 3/5 — Douleur existe mais solution gratuite disponible |
| Faisabilité | 4/5 — MVP faisable solo |
| **Score total** | **8/15** |

### Candidat C — "Objet mémorable" : carte NFC design premium comme objet collector

Papier 400g, dorure, format original. La puce redirige aussi vers un album photos post-mariage. L'invité garde la carte et la rescanne des années après.

| Critère | Note /5 |
|---------|---------|
| Défensibilité | 3/5 — Le design est différenciant mais copiable |
| Douleur résolue | 4/5 — Résout le "faire-part qu'on jette" + angle émotionnel fort |
| Faisabilité | 3/5 — Nécessite partenariat imprimeur premium sérieux |
| **Score total** | **10/15** |

**Killer feature retenue : Candidat A amplifié par C.**
Le NFC sans friction est le seul différenciateur défendable à court terme. Le dashboard est un "table stakes", pas la raison d'achat.

**Formulation produit :** *"La première carte d'invitation française qui se scanne — sans QR code, sans app, directement sur votre site mariage."*

---

## 5. WEDGE / SEGMENT D'ENTRÉE

| Segment | Description | Avantage | Risque |
|---------|------------|---------|--------|
| **Option A — Couples urbains CSP+** | Paris, Lyon, Bordeaux, budget faire-part ≥ €200, sensibles à l'originalité | Willingness to pay élevée | Acquisition compétitive, CPL élevé |
| **Option B — Couples eco-responsables** | 1 carte NFC remplace faire-part + carton programme + menu + plan papier | Angle émotionnel fort (moins de déchets) | La puce NFC peut sembler peu "naturelle" |
| **Option C — Couples tech-savvy / early adopters** | 25-35 ans, travaillent dans la tech ou creative industries | Comprendront la valeur NFC sans éducation, ambassadeurs naturels | Volume limité |

**Recommandation : commencer par Option C (tech-savvy) puis pivoter vers A.**
Les early adopters tech valideront l'usage, généreront du bouche-à-oreille organique et permettront d'itérer vite.

---

## 6. MODÈLE ÉCONOMIQUE & WILLINGNESS TO PAY

### COGS décomposé par commande (100 cartes + site mariage 12 mois)

| Poste | Source / Proxy | Coût bas | Coût haut |
|-------|--------------|---------|---------|
| **100 puces NFC NTAG213** (autocollants AliExpress) | Fruugo/AliExpress : ~€12-15/100 pcs | **€13** | **€20** |
| **100 puces NFC NTAG213** (fournisseur FR, livraison rapide) | nfcw.fr : ~€0.79/pièce min 100 | *(€79 si FR)* | *(€79 si FR)* |
| **Impression 100 cartes premium** (300-350g, pelliculage mat) | PrintShot 350g mat ~€9-15 · MOO €30-50 · imprimeur local ~€40-80 | **€30** | **€60** |
| **Expédition couple** (Colissimo, ~150g emballées) | Tarif Colissimo 2025 : €5.30-7.90 selon poids | **€6** | **€9** |
| **Emballage** (boîte rigide ou pochette kraft premium) | Packhelp, Rajapack | **€2** | **€5** |
| **Hébergement plateforme** (pro rata/commande) | Vercel Hobby gratuit + Supabase Free jusqu'à ~500 users actifs | **€0.5** | **€3** |
| **TOTAL COGS variable** | | **€51.50** | **€97** |

**Note décisive sur les puces :** AliExpress (€0.12-0.20/puce) divise par 5 ce poste. Délai 15-25 jours. Pour un budget de 150€, c'est le seul chemin viable. Les fournisseurs FR (€0.65-0.79/puce) sont viables à partir d'un prix de vente ≥ €280.

**Budget 150€ fondateur :** Couvre 1 commande de test (puces AliExpress €15 + impression €35 + expédition €7 + domaine €10 = ~€67-72), avec marge pour imprévus.

### Prix de vente & marge brute

| Scénario | Prix TTC | COGS (médian ~€65) | Marge brute € | Marge brute % |
|---------|---------|------------------|-------------|-------------|
| **Entrée de gamme** | €149 | €65 | €84 | 56% |
| **Milieu de gamme** (recommandé) | €199 | €65 | €134 | 67% |
| **Premium** | €279 | €80 | €199 | 71% |

**Benchmark :** CottonBird 100 cartes = €118-264 SANS NFC SANS site. Facturer €199 avec NFC + site mariage 12 mois est dans la fourchette haute du marché faire-part, justifiable par la valeur ajoutée digitale.

### Charges fixes mensuelles estimées (état de croisière)

| Poste | €/mois |
|-------|-------|
| Supabase Pro | €23 |
| Vercel Pro (si dépassement hobby) | €20 |
| Domaine(s) | €1 |
| Publicité (Meta/Pinterest minimal) | €0-100 |
| **Total charges fixes** | **€44-144/mois** |

### Rentabilité

- Break-even charges fixes à €199/commande : **moins d'1 commande/mois**
- Pour générer €1 000/mois net avant impôts : **~9 commandes/mois**
- Pour SMIC net (~€1 400/mois) : **~11 commandes/mois**

**Le bottleneck n'est pas la marge — c'est l'opérationnel.**

Coller 100 puces NFC manuellement = environ 45-90 min de travail manuel par commande. À 30 commandes/mois : **22-45 heures de collage pur**, soit ~1 jour plein par semaine passé à coller des puces. Non scalable au-delà de 20-25 commandes/mois sans externaliser cette étape.

### Barrières et risques de copie

| Risque | Délai estimé | Gravité |
|--------|-------------|---------|
| Un dev concurrent réplique le produit | 1-3 mois | Élevée |
| CottonBird ajoute QR code ou NFC | 6-18 mois | Sévère |
| Canva lance une intégration NFC | 12-24 mois | Mortelle |
| Joy propose un kit physique via partenaire impression | 18-36 mois | Sévère |

**Il n'existe aucun brevet défendable sur la combinaison NFC + site mariage.** La barrière est la marque, la distribution et l'exécution — pas la technologie.

---

## 7. VERDICT GO / NO-GO

### Verdict : **GO CONDITIONNEL**

Ce n'est pas un "Go enthousiaste". C'est un **"Go de validation minimum"** dans des conditions strictes.

**Pourquoi Go (et pas No-Go) :**
1. Le gap concurrentiel est réel en France aujourd'hui
2. La marge brute est solide (~67%)
3. Le budget 150€ est suffisant pour une preuve de concept à 1-2 commandes
4. Dev solo avec Claude Code = avantage coût absolu sur la partie plateforme

**Le pari central :** Des couples français en 2026 sont prêts à payer un surcoût de €80-100 sur leur budget faire-part pour l'effet "wow" du NFC — ET ce surcoût se justifie par le fait de ne pas avoir à payer un site mariage séparé. Si ce pari est faux (ils utilisent Joy gratis de toute façon), le modèle s'effondre.

### Signaux d'invalidation dans les 6 premiers mois

- Moins de 5 commandes payantes après 3 mois de présence active
- Taux de conversion landing page < 1% après 500 visites qualifiées
- Plus de 50% des prospects disent "je vais juste prendre Joy + CottonBird séparément"
- Retours sur la qualité de lecture NFC (puces défectueuses, incompatibilité iOS)
- Temps moyen d'assemblage > 90 min/commande → modèle opérationnel non viable

### Conditions précises du Go

1. **Première commande = entourage** (ami/frère/sœur qui se marie) pour validation produit sans risque commercial
2. **Budget 150€ = uniquement :** puces AliExpress (€15) + impression test 100 cartes (€35) + domaine + Vercel/Supabase gratuit au démarrage
3. **Ne pas dépenser en pub avant** 10 commandes validées à prix plein
4. **Kill switch clair :** si < 3 commandes en 60 jours de vente active → pivot ou abandon

### 2 premières actions cette semaine

**Action 1 (dans les 48h) — Validation tarifaire terrain :**
Poster dans 2-3 groupes Facebook "Mariage [ville]" (10k-50k membres) un sondage simple : "Pour votre faire-part, seriez-vous prêt(e) à payer €199 pour 100 cartes premium avec NFC intégré (scan → votre site mariage) au lieu de carte papier classique + site gratuit séparé ?" Cible : 50+ réponses. Si < 20% "oui ou peut-être" → repricing ou No-Go immédiat.

**Action 2 (dans les 7 jours) — Prototype physique fonctionnel :**
Commander 10 puces NFC NTAG213 chez nfcw.fr (livraison FR 48h, ~€8) + imprimer 10 cartes test chez PrintShot ou MOO (€5-10). Programmer chaque puce avec NFC Tools (app gratuite iOS/Android). Photographier, filmer un Reel 30 secondes montrant la scène "invité scanne → site mariage". **Ce Reel est l'asset marketing de lancement.** Sans ça, rien.

---

### Alternative si No-Go : même budget €150

**Cartes NFC de networking B2B** : même technologie (NTAG213), même opérationnel, marché B2B (freelances, startups, salons tech), cycle de décision court (jours vs mois), pas de saisonnalité, répétabilité (renouvellement professionnel). Concurrents : DOT, HiHello, Mobilo — mais aucun ne fait impression physique premium + plateforme en France à prix compétitif.

---

## Pistes ouvertes / chantiers non faits

- Volume de recherche exact "faire-part mariage NFC" et "faire-part avec site mariage" (nécessite Ahrefs/SEMrush payant)
- Willingness to pay réelle en France (aucune étude publiée — proxy Etsy US à $5/carte)
- Coût d'assemblage externalisé (micro-prestataire local pour collage NFC)
- Tarif Salon du Mariage Paris pour un exposant solo
- Taux de conversion réel sur groupes Facebook mariage FR (test à faire)

---

## Sources

- [NTAG213 NFC Tag — nfcw.fr](https://nfcw-shop.com/nfc-tags/ntag213/)
- [100 NFC Tag NTAG213 autocollants — Fruugo FR (~€12.49/100 pcs)](https://www.fruugo.fr/100pcs-nfc-tag-ntag213-ntag215-ntag216-autocollant-1356mhz-iso14443a-ntag-213-puce-nfc-telephone-rfid-tags-autocollants-etiquette-adhesive/p-218376088-465973157)
- [Impression cartons d'invitation MOO France](https://www.moo.com/fr/invitations)
- [100 Cartes de visite Canva PrintShot 350g](https://www.printshot.fr/family/1499-100-cartes-de-visite-canva)
- [CottonBird — Faire-part mariage prix](https://www.cottonbird.fr/faire-part-cartes/faire-part-mariage)
- [Prix faire-part mariage (0.5€ - 4€/pièce) — UnGrandJour](https://blog.ungrandjour.com/en/fr/prix-faire-part-mariage)
- [LuxeLink NFC Wedding Invitation — Etsy (~$5/unité)](https://www.etsy.com/listing/1833624683/luxelink-nfc-wedding-invitation-elegant)
- [Joy (Withjoy) — Site mariage gratuit, tarifs](https://withjoy.com/pricing/?l=fr-FR)
- [Zankyou — Liste mariage + tarifs add-ons](https://www.zankyou.fr/pourquoi-zankyou/tarifs-conditions-generales)
- [Supabase Pricing](https://supabase.com/pricing)
- [Bulk NFC Wedding Invitation Card — Alibaba](https://www.alibaba.com/showroom/nfc-wedding-invitation-card.html)
- [INSEE — 247 000 mariages France 2024](https://laplace-groupe.com/publications/chiffre-du-mois/le-chiffre-du-mois-247000-soit-le-nombre-de-mariages-celebre-en-2024-en-france)
