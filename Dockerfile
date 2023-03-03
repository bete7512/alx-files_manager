# Use an official Node.js runtime as a parent image
FROM node:14

RUN mkdir -p /user/src/ALX_FILE_MANAGER
WORKDIR /user/src/ALX_FILE_MANAGER

COPY package*.json /user/src/ALX_FILE_MANAGER/
RUN npm install

COPY . /user/src/ALX_FILE_MANAGER

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]