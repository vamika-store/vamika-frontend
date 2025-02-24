# Step 1: Use the specific Node.js 22.12 image as the base image
ARG BUILDER_IMAGE=node:22.12
FROM ${BUILDER_IMAGE}

# Step 2: Set the working directory inside the container
WORKDIR /app

RUN chmod -R 777 /app

# Step 3: Copy package.json and package-lock.json (if it exists) into the container
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 7: Expose the port your app will run on
EXPOSE 3000

# Step 8: Run the app
CMD ["npm", "start"]
