FROM node:18.17.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

RUN mkdir -p .next && chown -R node:node .

USER node

CMD ["npm", "run", "dev"] 