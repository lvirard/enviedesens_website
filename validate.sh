#!/bin/bash

# Script de validation locale avant commit
# Usage: ./validate.sh

echo "🔍 Validation de la structure HTML..."
echo ""

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

# Lancer les tests
echo "🧪 Exécution des tests..."
npm test

# Vérifier le code de sortie
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Tous les tests sont passés !"
    echo "✅ Vous pouvez commit et push en toute sécurité."
    exit 0
else
    echo ""
    echo "❌ Certains tests ont échoué."
    echo "❌ Veuillez corriger les erreurs avant de commit."
    exit 1
fi