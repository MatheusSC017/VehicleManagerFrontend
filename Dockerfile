# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production;

# Runtime
FROM nginx:1.25-alpine
COPY --from=build /app/dist/vehicle-manager/browser /usr/share/nginx/html
EXPOSE 80
