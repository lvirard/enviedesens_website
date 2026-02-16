# 🔧 Guide de dépannage CI

## Erreurs courantes et solutions

### ❌ Erreur : "Toutes les balises ouvrantes n'ont pas leur balise fermante"

**Cause** : Une balise HTML n'est pas correctement fermée.

**Solution** :
1. Vérifier dans les logs quel tag est en déséquilibre (ex: `div (+2)` signifie 2 `<div>` en trop)
2. Chercher dans le fichier HTML concerné
3. Ajouter la balise fermante manquante ou retirer la balise ouvrante en trop

**Exemple d'erreur** :
```html
<div class="container">
  <p>Texte</p>
<!-- Oups, pas de </div> -->
```

**Correction** :
```html
<div class="container">
  <p>Texte</p>
</div>
```

---

### ❌ Erreur : "Section #contact n'existe pas"

**Cause** : Un identifiant de section critique a été supprimé ou renommé.

**Solution** :
1. Vérifier que la section existe dans le fichier HTML
2. Vérifier que l'attribut `id` est correct (sensible à la casse)

**Exemple d'erreur** :
```html
<!-- Mauvais -->
<section id="Contact">  <!-- C majuscule -->
```

**Correction** :
```html
<!-- Bon -->
<section id="contact">  <!-- c minuscule -->
```

---

### ❌ Erreur : "Balise <main> présente avec id='main'" échoue

**Cause** : La balise `<main>` n'a pas l'attribut `id="main"` ou a été supprimée.

**Solution** :
Vérifier que cette structure est présente :
```html
<main id="main">
  <!-- contenu -->
</main>
```

---

### ❌ Erreur : "DOCTYPE est présent" échoue

**Cause** : Le DOCTYPE a été supprimé ou modifié.

**Solution** :
La toute première ligne du fichier HTML doit être :
```html
<!DOCTYPE html>
```

**Attention** : Pas d'espace ou de ligne avant cette déclaration.

---

### ❌ Erreur : "Meta charset UTF-8" échoue

**Cause** : La balise meta charset est absente ou incorrecte.

**Solution** :
Dans le `<head>`, ajouter :
```html
<meta charset="utf-8">
```

Cette balise doit être **la première** dans le `<head>` (après `<head>`).

---

### ❌ Erreur : Tests qui passent localement mais échouent sur GitHub

**Cause possible 1** : Fichiers non commités
- Vérifier que tous les fichiers HTML sont bien commités
```bash
git status
git add *.html
git commit -m "fix: ajout fichiers HTML"
```

**Cause possible 2** : Différence de fin de ligne (Windows vs Linux)
- Configurer git pour normaliser les fins de ligne :
```bash
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input  # Mac/Linux
```

---

### ❌ Le workflow GitHub Actions ne se lance pas

**Solutions** :
1. Vérifier que le fichier `.github/workflows/ci.yml` existe et est commité
2. Vérifier que GitHub Actions est activé dans Settings → Actions
3. Vérifier que vous pushez bien sur la branche `main`

---

### ⚠️ Warning : "npm WARN deprecated"

**Cause** : Avertissement de dépendances obsolètes (normal)

**Action** : Aucune, ce n'est qu'un warning, pas une erreur bloquante.

---

## 🆘 Checklist avant de commit

✅ J'ai testé localement avec `npm test`  
✅ Tous mes fichiers HTML sont à la racine  
✅ J'ai vérifié que toutes mes balises sont bien fermées  
✅ Les IDs critiques sont présents (main, sections principales)  
✅ Le DOCTYPE est en première ligne  
✅ J'ai commit tous les fichiers nécessaires  

---

## 📞 Besoin d'aide ?

Si rien ne fonctionne :
1. Vérifier les logs détaillés dans l'onglet "Actions" de GitHub
2. Copier le message d'erreur exact
3. Vérifier ce guide de dépannage
4. Contacter le développeur principal avec :
   - Le message d'erreur complet
   - Le fichier HTML concerné
   - Ce que vous avez modifié

---

## 🔍 Comprendre les logs de test

```
PASS  tests/html-structure.test.js
  Fichier: index.html
    ✓ Le fichier HTML existe (5 ms)
    ✓ DOCTYPE est présent (2 ms)
    ✓ Balise <html> présente avec attribut lang="fr" (1 ms)
    ...
```

- `✓` = Test passé ✅
- `✕` = Test échoué ❌

En cas d'échec, le message d'erreur indique exactement quel élément manque.