# Base image
FROM node:20 AS base
WORKDIR /usr/local/app

# Set environment variables
ENV NEXTAUTH_SECRET="test" \
    NEXTAUTH_URL="http://localhost:5173" \
    NODE_ENV="development" \
    API_URL="test" \
    GOOGLE_CLIENT_ID="test" \
    GOOGLE_CLIENT_SECRET="test"

# Client base stage
FROM base AS client-base
COPY package.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
    npm install

COPY . .

# Development stage
FROM client-base AS client-dev
CMD ["npm", "run", "dev"]

# Build stage
FROM client-base AS client-build
RUN npm run build

# Production final stage
FROM base AS final
ENV NODE_ENV=production

# Copy necessary files for production
COPY --from=client-base /usr/local/app/package.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
    npm install --production --frozen-lockfile

COPY src ./src
COPY --from=client-build /usr/local/app/dist ./src/static

# Expose port and define command
EXPOSE 3000
CMD ["npm", "run", "dev"]
