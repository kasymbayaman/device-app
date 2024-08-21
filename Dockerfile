# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the pnpm-lock.yaml and package.json files to the container
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install pnpm
RUN npm install -g pnpm

# Install the dependencies
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the Nest.js application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start:prod"]
