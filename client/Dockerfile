# Use the official Node.js image
FROM node:18.17.1

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files first (for caching dependencies)
COPY package.json package-lock.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the frontend code to the container
COPY . .

# Expose the port where the React app will run (default is 3000)
EXPOSE 3000

# Start the React development server

CMD ["yarn", "start"]

