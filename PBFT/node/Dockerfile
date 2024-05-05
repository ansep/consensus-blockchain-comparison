# Use the official Node.js image as base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JavaScript files into the container
COPY ./receiver.js /app/
COPY ./sender.js /app/
COPY ./package.json /app/

# Install SQLite3
RUN apk add --no-cache sqlite

# Install any dependencies if required
RUN npm install

# Command to run when the container starts
CMD ["node", "receiver.js"]
