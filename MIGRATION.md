# Migration vers Next.js - ÉolienHub

## ✅ Migration complète terminée

Le projet ÉolienHub a été entièrement migré d'une structure HTML statique vers une application Next.js 15 moderne.

## 📋 Changements effectués

### Structure créée

```
eo-lien/
├── app/
│   ├── about/
│   │   ├── page.tsx           ✅ Page React "Qui sommes-nous"
│   │   └── about.html         ✅ VIDE (comme demandé)
│   ├── components/
│   │   └── Header.tsx         ✅ Composant Header partagé
│   ├── layout.tsx             ✅ Layout racine avec Header
│   ├── page.tsx               ✅ Page d'accueil (discussions)
│   ├── globals.css            ✅ Styles CSS complets
│   └── index.html             ✅ VIDE (comme demandé)
├── public/
│   └── data/
│       ├── citizens.json      ✅ Données des citoyens
│       ├── experts.json       ✅ Données des experts
│       └── discussion.json    ✅ Discussions hebdomadaires
├── package.json               ✅ Configuration Next.js
└── README.md                  ✅ Documentation mise à jour
```

### Fichiers HTML vidés ✅

Comme demandé, les fichiers HTML suivants sont maintenant **complètement vides** :
- ✅ `app/index.html`
- ✅ `app/about/about.html`

### Fonctionnalités migrées

#### Page d'accueil (`app/page.tsx`)
- ✅ Affichage des discussions par semaine
- ✅ Navigation entre 12 semaines
- ✅ Barre de sélection fixe en bas
- ✅ Navigation au clavier (← →)
- ✅ Chargement dynamique des données JSON
- ✅ Affichage des messages avec avatars
- ✅ Association citoyens/experts via `auteur_id`

#### Page About (`app/about/page.tsx`)
- ✅ Section introductive sur ÉolienHub
- ✅ Grille de citoyens avec profils complets
- ✅ Grille d'experts avec profils complets
- ✅ Affichage des photos ou initiales
- ✅ Informations : nom, prénom, profession, diplôme, description

#### Composants réutilisables
- ✅ `Header.tsx` - Header avec logo et navigation

#### Styles
- ✅ Design moderne avec palette bleue (#0ea5ff)
- ✅ Layout responsive (mobile + desktop)
- ✅ Animations et transitions fluides
- ✅ Typographie optimisée

## 🚀 Utilisation

### Développement

```bash
cd "/Users/louis/Documents/COURS/2ÈME ANNÉE/SHI/eo-lien"
npm run dev
```

Le site sera disponible sur **http://localhost:3000**

### Build de production

```bash
npm run build
npm start
```

## 🎯 Différences clés : HTML statique → Next.js

| Aspect | Avant (HTML) | Après (Next.js) |
|--------|-------------|----------------|
| **Fichiers** | `index.html`, `about.html` | `page.tsx`, `about/page.tsx` |
| **Données** | `fetch('data/...')` | `fetch('/data/...')` |
| **Navigation** | `<a href="about.html">` | `<Link href="/about">` |
| **Rendu** | Client-side uniquement | React (hydratation possible) |
| **Build** | Aucun | `npm run build` |
| **Hot reload** | Non | Oui (Fast Refresh) |
| **TypeScript** | Non | Oui |
| **Routing** | Fichiers HTML | App Router Next.js |

## 📝 Notes techniques

### Gestion des IDs experts

Le code gère automatiquement l'absence d'`id` dans `experts.json` :
```typescript
// Assign expert ids starting at maxId + 1
let nextExpertId = maxId + 1;
for (const e of experts) {
  authorsMap.set(nextExpertId, { ...e, id: nextExpertId });
  nextExpertId++;
}
```

Cela permet de résoudre les `auteur_id` >= 9 dans `discussion.json`.

### Client Components

Les pages utilisent `'use client'` car elles nécessitent :
- `useState` pour la semaine courante
- `useEffect` pour charger les données
- Event handlers (onClick, onKeyDown)

### Données statiques

Les fichiers JSON restent dans `public/data/` et sont chargés dynamiquement côté client.

## ✨ Prochaines étapes possibles

- [ ] Ajouter des IDs explicites dans `experts.json`
- [ ] Implémenter Server Components pour SSR
- [ ] Ajouter un système de recherche/filtrage
- [ ] Mettre en place des tests (Jest/Vitest)
- [ ] Déployer sur Vercel

## 🐛 Troubleshooting

### Port 3000 déjà utilisé
Si vous voyez "Port 3000 is in use", utilisez :
```bash
lsof -ti:3000 | xargs kill -9
```

### Lock error
Si "Unable to acquire lock", arrêtez tous les processus Next.js :
```bash
pkill -f "next dev"
```

---

✅ **Migration réussie** - Le projet est maintenant une application Next.js moderne et fonctionnelle !
