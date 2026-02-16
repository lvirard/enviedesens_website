# enviedesens_website
Site web réalisé pour l'auto-entreprise Envie de Sens, spécialisée dans les bilans de compétences sur la région de Béziers.
Le client connaissant le html, il a la main sur ce repository pour pouvoir réaliser lui-même des modifications mineures dans le texte.


# CI/CD Setup

## 🎯 Objectif

Pipeline CI pour valider automatiquement la structure HTML à chaque push sur `main`, afin d'éviter que des modifications cassent le site.

## 📋 Prérequis

- Node.js 18.x ou 20.x
- Compte GitHub avec accès au repository

## 🚀 Installation locale

1. Cloner le repository
```bash
git clone <votre-repo>
cd envie-de-sens
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer les tests localement
```bash
npm test
```
ou
```bash
chmod +x /**chemin vers la racine du dossier**/validate.sh
./validate.sh
```
## ⚙️ Configuration GitHub Actions

### 1. Activer GitHub Actions

1. Aller dans votre repository GitHub
2. Cliquer sur l'onglet **"Actions"**
3. Si c'est la première fois, cliquer sur **"I understand my workflows, go ahead and enable them"**

### 2. Vérifier que le workflow est détecté

Le fichier `.github/workflows/ci.yml` doit apparaître dans la liste des workflows.

### 3. Configuration CD à venir

Pour l'instant, la CI ne nécessite **aucun secret** car elle fait uniquement des tests de structure HTML.

**Les secrets seront nécessaires plus tard pour la CD (déploiement OVH)** :
- `OVH_SSH_HOST` : adresse du serveur OVH
- `OVH_SSH_USER` : nom d'utilisateur SSH
- `OVH_SSH_PRIVATE_KEY` : clé privée SSH pour l'authentification
- `OVH_DEPLOY_PATH` : chemin du répertoire de déploiement

### 4. Protection de la branche main (recommandé)

Pour bloquer automatiquement les merges si les tests échouent :

1. Aller dans **Settings** → **Branches**
2. Cliquer sur **"Add rule"** ou modifier la règle existante pour `main`
3. Cocher :
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ Sélectionner le check **"test-html"**
4. Sauvegarder


## 🧪 Tests effectués

### Tests globaux (tous les fichiers HTML)
- ✅ DOCTYPE présent
- ✅ Balise `<html>` avec `lang="fr"`
- ✅ Balise `<head>` présente
- ✅ Meta charset UTF-8
- ✅ Balise `<title>` non vide
- ✅ Meta viewport
- ✅ Balise `<body>` présente
- ✅ Balise `<main id="main">` présente
- ✅ Au moins une `<section>`
- ✅ Toutes les balises ouvrantes ont leur balise fermante
- ✅ Pas de `<script>` ou `<link>` cassés

### Tests spécifiques index.html
- ✅ Sections : `#presentation`, `#qui`, `#offres`, `#temoignages`, `#contact`
- ✅ Divs : `#header-placeholder`, `#footer-placeholder`
- ✅ Cartes d'offres avec détails cachés
- ✅ Formulaire de contact présent

### Tests pages légales
- ✅ Section `#presentation`
- ✅ Au moins une section `.section--legal`
- ✅ CSS `pages-legales.css` chargé

### Tests de cohérence
- ✅ Même feuille de style principale partout
- ✅ Même fichier JS partout
- ✅ Éléments décoratifs présents
- ✅ Lien d'accessibilité "Aller au contenu"



## 📝 Workflow de travail

### Pour le développeur
```bash
# Faire vos modifications
git add .
git commit -m "feat: amélioration du site"
git push origin main
```

Les tests se lancent automatiquement. Si ça passe ✅, tout est OK.

### Pour le client

1. Le client modifie le texte directement sur GitHub
2. Il commit sur `main`
3. Les tests se lancent automatiquement
4. **Si ça passe ✅** : tout est OK
5. **Si ça casse ❌** : vous recevez une notification et pouvez corriger

## 🔍 Voir les résultats des tests

1. Aller dans l'onglet **"Actions"** du repository
2. Cliquer sur le dernier workflow
3. Voir les détails des tests

## 🛠️ Commandes utiles

```bash
# Lancer les tests
npm test

# Lancer les tests en mode watch (développement)
npm run test:watch

# Générer un rapport de couverture
npm run test:coverage
```

## 📦 Fichiers du projet CI

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          # Configuration GitHub Actions
├── tests/
│   └── html-structure.test.js  # Tests de structure HTML
├── package.json            # Dépendances npm
└── .gitignore             # Fichiers à ignorer
```

## 🔜 Prochaine étape : CD (Déploiement OVH)

La CD sera configurée dans une seconde phase et ajoutera :
- Déploiement automatique sur OVH via SSH/FTP
- Secrets GitHub pour les credentials
- Notification en cas de déploiement réussi/échoué

## 📞 Support

En cas de problème avec la CI, vérifier :
1. Les logs dans l'onglet "Actions"
2. Que `package.json` et `package-lock.json` sont bien commités
3. Que les fichiers HTML sont bien à la racine du projet
