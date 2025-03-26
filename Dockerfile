#########################################
#   DEVELOPMENT STAGE
#########################################
FROM node:21-alpine as development

RUN apk add --no-cache libc6-compat

ENV NODE_ENV development

WORKDIR /app

COPY package*.json .

RUN npm install

RUN chown -R node:node /app/node_modules

COPY . .

#########################################
#   BUILD STAGE
#########################################

FROM node:21-alpine as builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

ARG VITE_APP_API_URL

RUN touch .env.production
RUN echo "VITE_APP_API_URL=$VITE_APP_API_URL" >> .env.production
RUN cat .env.production

RUN npm run build

USER node

#########################################
#   PRODUCTION STAGE
########################################

FROM nginx:alpine as production

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
