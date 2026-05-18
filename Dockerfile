# Dockerfile para backend
FROM node:lts-alpine
WORKDIR /server
COPY package.json ./
RUN pnpm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
