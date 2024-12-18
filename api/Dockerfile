# Use Node.js image
# Use a stable Node.js version
FROM node:18.17.1

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install 


# Copy all backend code
COPY . .

# Expose the application port
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]

