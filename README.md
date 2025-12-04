# IIAOM - Gestion Scolaire

Application de gestion complète pour l'Institut Islamique Aïchatou Oumm Al-Mou'minin (IIAOM).

## 📋 Fonctionnalités

- 🎯 Gestion des utilisateurs (Élèves, Parents, Enseignants, Admins)
- 📅 Emploi du temps dynamique
- ✅ Suivi des présences intelligent
- 📊 Tableaux de bord et statistiques
- 📱 Applications mobiles (iOS & Android)
- 🖥️ Version Desktop (Windows)
- ☁️ Synchronisation cloud
- 🔒 Sécurité avancée (RBAC, JWT, chiffrement)

## 🚀 Technologies

- **Frontend Mobile**: React Native (Expo) + TypeScript
- **Backend**: NestJS + TypeScript
- **Base de données**: PostgreSQL
- **Authentification**: JWT + Refresh Tokens
- **UI/UX**: React Native Paper + Custom Components
- **Desktop**: Tauri
- **CI/CD**: GitHub Actions + Expo EAS

## 🏗️ Structure du Projet

```
iiaom-app/
├── apps/
│   ├── mobile/          # Application mobile (Expo)
│   ├── desktop/         # Application desktop (Tauri)
│   └── api/             # API NestJS
├── packages/
│   ├── ui/              # Composants UI partagés
│   ├── types/           # Types TypeScript partagés
│   └── utils/           # Utilitaires partagés
└── README.md
```

## 🛠️ Installation

### Prérequis

- Node.js 18+
- Yarn 1.22+
- PostgreSQL 14+
- Expo CLI
- Tauri CLI (pour la version desktop)

### Configuration

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   yarn install
   ```
3. Configurer les variables d'environnement (voir `.env.example`)
4. Lancer le serveur de développement :
   ```bash
   # API
   cd apps/api
   yarn start:dev

   # Mobile
   cd apps/mobile
   yarn start

   # Desktop
   cd apps/desktop
   yarn tauri dev
   ```

## 📄 Licence

MIT
