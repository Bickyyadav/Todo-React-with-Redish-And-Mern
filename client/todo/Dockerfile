#base image
FROM node:18-alpine
#this /app will create in docker
WORKDIR /app
#first copy everythings and pass to the /app which is creating in the docker
COPY package*.json ./
#run to install all dependency from the package .json file     
RUN npm i
#copy all reamaining . means source and . next dot means in docker file 
COPY . .
