# Use Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files and install dependencies
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the Node.js server
CMD ["node", "app.js"]