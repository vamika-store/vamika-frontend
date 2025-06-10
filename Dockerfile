# --- Stage 1: Build React app ---
FROM node:22.14.0-alpine3.21 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of the code
COPY . .

# Build static files for production
RUN npm run build


# --- Stage 2: Serve static files using 'serve' ---
FROM node:22.14.0-alpine3.21

# Install 'serve' globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build output from builder
COPY --from=builder /app/build .

# Expose default port
EXPOSE 3000

# Serve static files
CMD ["serve", "-s", ".", "-l", "3000"]