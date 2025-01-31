FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# ==== RUN =======
FROM nginx:1.24.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
