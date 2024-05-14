# Use Node.js image as base
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source files
COPY . .

# Build the React app
RUN yarn build

# Use Nginx as base image for serving the app
FROM nginx:alpine

# Copy built app from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
