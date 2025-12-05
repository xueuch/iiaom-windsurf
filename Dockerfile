# Image de base
FROM node:20-alpine

# Configuration de pnpm avec le miroir (puisque ça a bien marché)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install -g pnpm@8.10.0

WORKDIR /app

# On copie TOUT le projet d'un coup
COPY . .

# Installation des dépendances
# On utilise le miroir pour la rapidité et la fiabilité
RUN pnpm config set registry https://registry.npmmirror.com/ && \
    pnpm install --no-frozen-lockfile

# Construction du projet (Turbo va compiler l'API)
RUN pnpm build

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposition du port
EXPOSE 3000

# COMMANDE DE LANCEMENT
# Comme on est dans un monorepo, le fichier compilé se trouve dans le dossier de l'app
CMD ["node", "apps/api/dist/main.js"]