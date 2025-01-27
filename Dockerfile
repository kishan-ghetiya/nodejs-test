# Use Node.js official image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies (both production and dev)
COPY package.json ./
RUN npm install --only=production
RUN npm install --only=dev

# Copy the rest of the application
COPY . .

# Expose the app port
EXPOSE 3000

# Start the application with nodemon for local development
CMD ["npm", "run", "dev"]
