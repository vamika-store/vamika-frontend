# Step 1: Use the specific Node.js 22.12 image as the base image
ARG BUILDER_IMAGE=node:22.14.0-alpine3.21
FROM ${BUILDER_IMAGE}

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists) into the container
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Ensure writable directories for tmp and cache
RUN mkdir -p /tmp /app/node_modules/.cache && chmod -R 777 /tmp /app/node_modules

# Step 7: Expose the port your app will run on
EXPOSE 3000

# Step 8: Run the app
CMD ["npm", "start"]
