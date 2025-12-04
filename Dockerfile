# 1. Image de base légère
FROM node:20-alpine AS base

# Installation de pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. Étape de construction
FROM base AS builder
WORKDIR /app

# Copie des fichiers de configuration globaux
COPY . .

# Installation des dépendances
RUN pnpm install --frozen-lockfile

# Construction du projet (on suppose que turbo build lance nest build pour api)
# Si cette commande échoue, assurez-vous que "build" est bien défini dans package.json
RUN pnpm build

# 3. Étape de production
FROM base AS runner
WORKDIR /app

# Création d'un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copie uniquement du nécessaire depuis l'étape de build
# On copie le dossier dist de l'API compilée
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Configuration de l'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Utilisation de l'utilisateur sécurisé
USER nestjs

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/main.js"]