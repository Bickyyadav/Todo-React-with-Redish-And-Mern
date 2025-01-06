FROM  node:18-alpine
#working directry inside docker
WORKDIR /app

#copy.json file 
COPY package*.json ./ 
RUN npm install

#COPY REST OF THE CODE
COPY . .

EXPOSE 8000

#START THE BACKEND
CMD ["nodemon","app.js"]