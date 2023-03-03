# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
RUN mkdir -p /user/src/ALX_FILE_MANAGER
WORKDIR /user/src/ALX_FILE_MANAGER

# Copy the package.json and package-lock.json files to the container
COPY package*.json /user/src/ALX_FILE_MANAGER/
# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /user/src/ALX_FILE_MANAGER

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]