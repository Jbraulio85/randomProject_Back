# Dockerfile para backend
FROM node:lts-alpine
WORKDIR /server
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
