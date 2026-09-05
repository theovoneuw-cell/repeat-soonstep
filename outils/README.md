# Outils de développement

Rien ici n'est nécessaire au fonctionnement de l'application : `index.html` est
autonome. Ces fichiers servent à travailler dessus.

## `simulateur-iphone15.html`

Charge l'application dans deux cadres aux dimensions réelles d'un iPhone 15
(393 × 852 points) : installée sur l'écran d'accueil et ouverte dans Safari iOS.
Les marges de sécurité iOS y sont injectées à la main, `env(safe-area-inset-*)`
valant zéro dans un iframe.

À servir depuis le même dossier que l'application :

```sh
python3 -m http.server 8777
open http://localhost:8777/outils/simulateur-iphone15.html
```

C'est ce simulateur qui a révélé le débordement de la ligne de zoom à 393 px,
invisible dans un cadre de test à 430 px.

## `piloter-safari.py`

Exécute un fichier JavaScript dans l'onglet Safari qui affiche l'application, et
renvoie le résultat. Sert à inspecter et à piloter la page en cours d'exécution
plutôt qu'à supposer son comportement.

```sh
python3 outils/piloter-safari.py outils/tests/tourA.js
```

Prérequis, à activer une fois dans Safari : Réglages → Avancé → « Afficher les
fonctionnalités pour développeurs web », puis onglet Développement → « Autoriser
JavaScript depuis les Apple Events ».

## `tests/`

Scénarios joués dans la page réelle, pas dans un simulacre de DOM.

| fichier | ce qu'il vérifie |
|---|---|
| `tourA.js` `tourA2.js` | import par glisser-déposer, décodage, tempo, blanc de départ |
| `tourB.js` | aimantation, annulation, passages mémorisés, mesure, vitesse, zoom, pincement |
| `tourC*.js` | persistance après rechargement, régularité du compte, instant réel du départ |
| `veilleD*.js` `veilleE.js` | verrou d'écran : prise, libération, absence de fuite, reprise après arrière-plan |
| `clean.js` `diag.js` | ménage et état courant |
