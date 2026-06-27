# PLAN LANCEMENT J+14 — NFC Mariage
*Objectif : première vidéo TikTok publiée + landing page live + emails collectés*

---

## SEMAINE 1 — Créer les assets

### J+1 (aujourd'hui)
- [ ] S'inscrire Midjourney Basic (10$/mo)
- [ ] S'inscrire ElevenLabs Starter (6$/mo)
- [ ] Télécharger CapCut (gratuit)
- [ ] Commander 10 puces NFC NTAG213 sur nfcw.fr (~8€, livraison 48h FR)

### J+2 — Générer l'image fixe (Midjourney)
Utiliser le prompt final v3 du fichier `prompts-ia-scene-nfc.md`.
Générer 10 variantes, sélectionner la meilleure main.
Si main ratée → uploader une vraie photo de main avec `--cref`.

### J+3 — Animer l'image (Kling AI — gratuit)

**L'IA ne sait pas gérer la transition écran éteint → allumé en un seul clip.**
Solution : 2 clips + 1 coupe dans CapCut.

**Clip 1 — IA Kling : main approche téléphone ÉTEINT**

Image Midjourney séparée avec téléphone écran noir :
```
young woman's hand mid-20s holding a cream French wedding invitation card 
with a small NFC symbol in pale gold, slowly bringing the card close 
to the back of an iPhone 15 in black, the iPhone screen is completely OFF 
and dark, black mirror screen, shot from above at 30 degree angle, 
light wooden table, overcast window light, casual snapshot feel, jpeg grain 
--ar 9:16 --style raw --v 7 
--no screen glow, no lit screen, no website visible
```

Prompt Kling animation :
```
hand slowly brings the wedding card toward the back of the iPhone, 
phone screen stays completely dark and off, 
movement stops just as card touches the phone, 
natural hand speed, slight camera shake, 3 seconds
```

**Clip 2 — Mockup animé (option recommandée phase test)**

Tu n'as pas encore de vrai site NFC. Donc :
1. Faire un screenshot du mockup Canva "site mariage"
2. L'insérer dans **Rotato** ou **ScreenMockup** (animation téléphone qui s'allume, outil dev app)
3. Exporter la vidéo propre de l'écran qui s'active

Résultat professionnel, zéro filmage, aucun problème de transition IA.

**Alternative encore plus simple (valable pour J+1) :**
```
Image 1 Midjourney : main + carte + téléphone éteint
→ transition flash 0.2s dans CapCut
→ Screenshot mockup site Canva plein écran
```
Pas de Kling, pas de screen recording. Deux images et une coupe. Publiable aujourd'hui.

### J+3 — Voix off française (ElevenLabs)
Tester les voix "Charlotte" ou "Mathieu" avec ce texte :
```
Vous recevez ce faire-part. Vous tapez. Et votre site de mariage s'ouvre. 
C'est ça, l'invitation NFC.
```
Exporter en MP3.

### J+4 — Mockup du site mariage (Canva gratuit)
Créer une page simple "Sophie & Thomas — Notre mariage" avec belle photo.
Screen record sur téléphone. Pas besoin de vrai site encore.

### SPECS TECHNIQUES TIKTOK (à garder en tête)

| Paramètre | Valeur |
|-----------|--------|
| Format | 9:16 vertical, 1080x1920px |
| Durée optimale | 15-21 secondes |
| FPS | 30fps (pas 24) |
| Son | Obligatoire — TikTok pénalise les muettes |
| Fichier | MP4, H.264 |

**Zones masquées par l'interface TikTok :**
- Haut 15% → barre de profil
- Bas 25% → boutons like/commentaire
- Droite 10% → icônes d'action

Garder tous les textes entre 20% et 75% de la hauteur. Le clip peut aller bord à bord, pas les textes.

**Sous-titres :** police Bold/Heavy, blanc + contour noir, position centre-bas. 80% des vidéos regardées sans son → sous-titres non optionnels.

**Hook :** une ligne de texte dès la frame 0, avant même que l'action commence. TikTok décide si la vidéo est poussée dans les 1,5 premières secondes.

---

### J+4 — Montage TikTok (CapCut)

**Structure finale validée (9 sec de vidéo + voix off) :**
```
0s      → Hook texte frame 0 : "Cette invitation fait quelque chose d'inattendu..."
0s-4s   → Clip 1 : main approche + écran s'allume
4s-7s   → Clip 2 : zoom vers l'écran
7s-9s   → Clip 3 : screen recording mockup Canva en français (vrai écran)
9s-16s  → Voix off ElevenLabs
16s-18s → CTA : "Le faire-part qui ouvre votre site. Lien en bio."
```

**Étapes CapCut dans l'ordre :**
1. Importer les 3 clips dans l'ordre, coupes sèches entre chaque
2. Son "chime" ou "ping notification" synchronisé sur le moment où l'écran s'allume (Clip 1)
3. Voix off ElevenLabs (texte ci-dessous) démarre au début du Clip 2
4. Hook texte Bold blanc + contour noir dès la frame 0
5. Sous-titres auto → Français → position centre-bas
6. CTA texte dernière seconde
7. Export 1080p / 30fps / MP4

**Texte voix off ElevenLabs (voix Charlotte ou Mathieu) :**
```
Vous recevez ce faire-part. Vous approchez votre téléphone. 
Et votre site de mariage s'ouvre. 
C'est ça, l'invitation NFC.
```

**Checklist avant publication :**
- [ ] 3 clips importés dans l'ordre
- [ ] Son chime synchronisé sur l'allumage écran
- [ ] Voix off présente
- [ ] Hook texte visible dès la frame 0
- [ ] Sous-titres français visibles
- [ ] Aucun texte dans le bas/haut de l'écran (zones masquées TikTok)
- [ ] CTA "Lien en bio" en dernière seconde
- [ ] Export 1080p 30fps MP4
- [ ] Durée entre 15 et 21 secondes
- Sous-titres auto FR → valider
- Musique : chercher "wedding cinematic" dans bibliothèque CapCut
- Export 1080p, format 9:16

### J+5 — Landing page
Une page, un seul objectif : collecter des emails.
Contenu :
- Titre : "Le premier faire-part qui se scanne — site de mariage inclus"
- Sous-titre : "Fait à la main, sur commande. 100 cartes NFC + votre site de mariage personnalisé."
- La vidéo TikTok intégrée
- Input email + bouton "Je veux en savoir plus"
- CTA secondaire : lien TikTok/Instagram (pour ceux pas prêts à donner leur email)

Page de confirmation après email :
```
"Vous mariez en 2026 ? Répondez à ce mail — je prends 5 commandes pilotes 
à tarif fondateur (149€ au lieu de 199€)."
```

Stack landing page : Carrd.co (9$/an) ou Framer free ou simple HTML déployé sur Vercel.

---

## SEMAINE 2 — Distribuer et mesurer

### J+8 — Publier TikTok #1
Publier entre 18h-21h (pic audience FR).
Hashtags : #mariagefrance #fairepartmariage #mariageidee #innovation #mariage2026

### J+8 — Poster dans groupes Facebook
Groupes cibles : "Organisation Mariage 2026 France", "Future Mariée France", "Mariage [ville]"
Format : photo du prototype (ou image Midjourney) + question ouverte :
```
"Est-ce que vous auriez aimé recevoir une invitation comme ça ? 
Scannez avec votre téléphone et votre site de mariage s'ouvre 👆"
```

### J+9 — Répondre aux threads Mariages.net
Chercher les threads "QR code faire-part", "site mariage", "faire-part original".
Répondre utilement + mentionner le projet naturellement.

### J+10 — Setup Pinterest
Board : "Faire-part mariage original / NFC"
Générer 5-10 visuels flat lay avec Midjourney (version editorial premium).
Programmer avec Tailwind ou Pinterest natif.

### J+11-14 — TikToks #2 et #3
**TikTok #2 — Dans les coulisses :**
```
"Comment je fabrique ces invitations NFC à la main"
→ Filmer (ou IA) la puce NFC, la carte, le collage, l'emballage
```

**TikTok #3 — Réaction invité :**
```
"La réaction de ma mère quand elle a tapé son invitation de mariage"
→ Format réaction, très performant sur TikTok
```

---

## KPIs DE VALIDATION À J+14

| Métrique | Signal vert | Signal orange | Kill switch |
|----------|------------|---------------|-------------|
| Emails collectés | > 50 | 20-50 | < 10 |
| Vues TikTok cumulées | > 5 000 | 1 000-5 000 | < 500 |
| Réponses à l'email fondateur (149€) | ≥ 1 | 0 mais emails collectés | 0 + peu d'emails |
| Commentaires positifs FB | > 10 | 3-10 | 0 |

**Si à J+14 : 0 email + 0 commentaire positif → le problème est le message, pas le produit. Pivoter l'angle avant d'abandonner.**

---

## BUDGET TOTAL SEMAINE 1

| Poste | Coût |
|-------|------|
| Midjourney Basic | 10$/mo |
| ElevenLabs Starter | 6$/mo |
| 10 puces NFC NTAG213 (nfcw.fr) | ~8€ |
| Domaine (Namecheap ou OVH) | ~10€ |
| Carrd.co landing page | 9$/an = ~0.75$/mo |
| Kling Free | 0$ |
| CapCut | 0$ |
| **TOTAL** | **~35€** |

---

## STACK COMPLET

| Étape | Outil | Coût |
|-------|-------|------|
| Image fixe | Midjourney Basic | 10$/mo |
| Animation | Kling Free | Gratuit |
| Voix off FR | ElevenLabs Starter | 6$/mo |
| Montage + sous-titres | CapCut | Gratuit |
| Mockup site | Canva Free | Gratuit |
| Landing page | Carrd.co | 9$/an |
| Distribution | TikTok + FB groupes + Mariages.net | Gratuit |
| **TOTAL** | | **~16$/mo + 10€ domaine** |
