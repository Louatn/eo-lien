# ÉolienHub

Plateforme collaborative dédiée aux discussions hebdomadaires sur les enjeux de société, la transition écologique et le développement durable.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
eo-lien/
├── app/
│   ├── about/
│   │   └── page.tsx          # Page "Qui sommes-nous"
│   ├── components/
│   │   └── Header.tsx         # Composant Header partagé
│   ├── layout.tsx             # Layout principal
│   ├── page.tsx               # Page d'accueil (discussions)
│   └── globals.css            # Styles globaux
├── public/
│   └── data/
│       ├── citizens.json      # Base de données des citoyens
│       ├── experts.json       # Base de données des experts
│       └── discussion.json    # Discussions hebdomadaires
└── package.json
```

## 🎨 Fonctionnalités

- **Discussions hebdomadaires** : Navigation entre 12 semaines de discussions
- **Profils citoyens et experts** : Affichage des participants avec leurs informations
- **Navigation au clavier** : Utilisez ← et → pour naviguer entre les semaines
- **Design responsive** : Interface adaptée mobile et desktop

## 🛠 Technologies

- [Next.js 15](https://nextjs.org/) - Framework React
- TypeScript - Typage statique
- CSS Modules - Styles scoped

## 📝 Données

Les données sont stockées dans des fichiers JSON statiques :

- `public/data/citizens.json` : Liste des citoyens participants
- `public/data/experts.json` : Liste des experts
- `public/data/discussion.json` : Discussions organisées par semaine

### Format des données

**Citizens/Experts** :
```json
{
  "id": 1,
  "nom": "Dupont",
  "prenom": "Marie",
  "profession": "Médecin",
  "image": null,
  "age": 34,
  "diplome": "Doctorat en médecine",
  "commentaire": "Description..."
}
```

**Discussions** :
```json
{
  "semaine": "1",
  "date": "2025-11-12",
  "topo": "Thème de la semaine",
  "messages": [
    {
      "auteur_id": 1,
      "heure": "09:00",
      "message": "Contenu du message..."
    }
  ]
}
```

## 🎯 Pages

- `/` - Page d'accueil avec les discussions hebdomadaires
- `/about` - Page de présentation des citoyens et experts

## 📄 License

MIT

