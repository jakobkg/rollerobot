FROM node:latest
WORKDIR /usr/src/robot
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]