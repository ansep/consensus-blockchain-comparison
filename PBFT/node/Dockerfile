# Use the official Node.js LTS image as a base
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the entire src directory to /app/src
COPY src/ ./src

# Define the command to run the script
CMD ["node", "src/receiver.js"]
