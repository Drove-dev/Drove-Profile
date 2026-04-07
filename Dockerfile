# Use Node.js 20.19 Alpine as the base image
FROM node:20.19-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4201

# Command to run the development server
CMD ["npm", "start"]
