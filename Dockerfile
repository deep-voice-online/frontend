FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_GRAPHQL_URL=https://gql.deep-voice.online/
ARG VITE_API_URL=https://api.deep-voice.online/
ARG VITE_WS_URL=wss://deep-voice.online
ENV VITE_GRAPHQL_URL=$VITE_GRAPHQL_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WS_URL=$VITE_WS_URL
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
