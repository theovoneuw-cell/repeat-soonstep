# Repeat by Soonstep — module de répétition

Application installable (PWA) pour les profs de danse : importer une musique,
délimiter un passage, le boucler, le ralentir sans le désaccorder et repartir
sur un compte de « 5-6-7-8 ». Gratuite, sans compte, hors ligne.

## Contenu

```
index.html              l'application entière (aucune dépendance à compiler)
manifest.webmanifest    nom, icônes, couleurs, mode plein écran
sw.js                   cache hors-ligne
icons/                  le logo Soonstep en SVG + PNG 192, 512, maskable, apple-touch
outils/                 simulateur iPhone et tests — inutiles au déploiement
```

`index.html` est la seule source : pas d'étape de compilation, pas de
dépendance à installer. On l'ouvre, on l'édite, on la sert.

## Installation dans Soonstep

1. Copier le dossier tel quel dans le site, par exemple `public/repeat/`,
   pour qu'il soit servi sur `https://soonstep.com/repeat/`.
2. Vérifier que `sw.js` est servi **depuis ce chemin** (`/repeat/sw.js`) : la
   portée d'un service worker est le dossier qui le contient.
3. Ne pas mettre `sw.js` en cache long côté CDN (`Cache-Control: no-cache`).
4. Ajouter le lien depuis l'espace prof.

Aucune brique serveur : pas d'API, pas de base, pas de compte.

## Vie privée

Les musiques importées ne quittent jamais l'appareil. Elles sont conservées en
local (IndexedDB) avec les passages mémorisés, le tempo et la vitesse de chaque
morceau. Les octets sont copiés à l'import — on ne garde pas une référence au
fichier d'origine, que le navigateur perdrait au redémarrage.

## Fonctions

**Poser un passage** — pendant la lecture, taper `Début` puis `Fin`. À la seconde
frappe la boucle démarre, la vue zoome sur le passage, un message le confirme.
`Annuler` rétablit le passage précédent.

**Aimantation** — quand le tempo est reconnu de façon sûre, `Début` se pose sur
le temps le plus proche et la longueur du passage s'arrondit à un nombre entier
de comptes. L'aimantation agit pendant le glisser : le passage s'accroche par
blocs. Désactivable dans Réglages.

**Analyse du tempo** — flux d'onsets, autocorrélation peignée avec a priori
log-normal centré sur 130 bpm, puis raffinage conjoint de la période et de la
phase. Sur 36 morceaux d'essai (valses 3/4, triolets 12/8, shuffle, trap,
dembow, salsa, contemporain clairsemé, house, hip-hop, bachata) : la grille
tombe sur de vrais temps dans 34 cas, et parmi les 34 où l'aimantation
s'active, elle est juste 34 fois sur 34 — aucune fausse aimantation. Les cas
douteux sont refusés par le seuil de confiance. Correction d'octave par `÷2`
et `×2`.

**Mesure** — 3 ou 4 temps, détectée et proposée, réglable d'un geste. En valse,
les passages s'arrondissent en groupes de 6 et le compte part sur 1-2-3.

**Blanc de départ** — le silence d'intro (et le délai que tout encodeur MP3
laisse en tête) est mesuré à l'import ; le départ se pose sur le premier son
réel, aligné au temps, sans jamais rogner l'attaque.

**Précision du départ** — les clics du compte sont programmés sur l'horloge de
l'AudioContext et la latence de démarrage du lecteur est mesurée en continu puis
compensée. Mesuré dans Safari : compte régulier à 2 ms près (498 / 500 / 500 ms
pour 500 attendus), musique à l'heure après le « 8 ».

**Écran maintenu allumé** — pendant la lecture, l'appli prend un verrou d'écran
(Wake Lock API) pour que le téléphone posé sur l'enceinte ne s'éteigne pas entre
deux passages. Le verrou est relâché dès l'arrêt, et repris automatiquement au
retour d'arrière-plan. Sans effet sur les navigateurs qui ne le gèrent pas.

**Le reste** — ralenti de 40 % à 120 % sans changement de tonalité
(`preservesPitch`) ; compte de départ affiché en grand ; nombre de reprises et
pause « replacez-vous » ; passages nommés et mémorisés par morceau ; forme
d'onde découpée en comptes numérotés, pincer pour zoomer, glisser pour se
déplacer.

## Compatibilité

Safari 16.4+, Chrome 90+, Firefox 100+. Le ralenti sans transposition repose sur
`preservesPitch`, pris en charge par ces trois navigateurs.
