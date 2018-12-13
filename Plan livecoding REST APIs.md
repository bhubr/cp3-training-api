# LiveCoding API REST avec Express

"Correction" de l'entraînement au checkpoint 3.

## Mise en place

* Création du repo
* Création dossier `back` (si on veut avoir un front dans un dossier séparé)
* Dans `back`:
  * `npm init` pour initialiser le `package.json`, qui va référencer les dépendances du projet
  * Création `.gitignore` contenant au minimum `node_modules`, pour ignorer ces derniers
  * `npm install express body-parser mysql` car le projet en a besoin pour fonctionner (dépendances de l'app serveur elle-même)
  * Config ESLint: `eslint --init` (installer au préalable ESLint globalement avec `npm install -g eslint` éventuellement précédé de `sudo`), puis dans les menus, choisir:

    * Choose a popular style guide
    * AirBnB
    * JavaScript
  * Création de l'appli server (`app.js` ou `server.js` ou encore `index.js`)
* Création de la BDD
* À nouveau dans `back`, création d'un fichier `connection.js` ou `db.js` qui va créer la connexion MySQL.
* Les paramètres pour MySQL peuvent être extraits de ce dernier pour être stockés dans un fichier non suivi dans Git (exemple: `db-config.json` ou `db-settings.json` à mettre dans `.gitignore`)

## Création d'une route pour lire des données d'un type

* Pluriel ou singulier ? `/api/article` ou `/api/articles` ?
* Dès qu'on commence à avoir beaucoup de routes, songer à les organiser avec des routeurs Express

## Création des routeurs par type de données pour le CRUD

* 2 routes GET, 1 POST, 1 PUT, 1 DELETE
* Rôle des query params (filtrer)
* *Réponses appropriées* pour chaque: statut + payload (charge utile). Ex: renvoyé l'objet créé sur un POST, avec un statut 201
* `router.route`
* "Contrôleurs" - MVC
* Ne pas oublier les "sous-routeurs" pour des données "enfant" d'un "parent": https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
* Factoriser: scinder le contrôleur en une méthode pour interroger le modèle, et le reste qui gère la validation, la réponse, les codes d'erreur...