# === Stage 1: Build React App ===
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies with cache optimization
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Build the app for production
RUN npm run build


# === Stage 2: Serve with NGINX ===
FROM nginx:stable-alpine AS production

# Remove default NGINX config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Add custom config for React SPA
COPY nginx/default.conf /etc/nginx/conf.d/

# Copy React build from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html/converter-frontend-fastapi

# Make nginx output minimal logs (optional)
RUN sed -i 's/access_log.*/access_log off;/' /etc/nginx/nginx.conf

# Expose the default port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]