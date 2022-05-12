FROM node:16 AS ui-build
COPY ./ /usr/app  
WORKDIR /usr/app
RUN cd src/app && npm install @angular/cli && npm install && npm run build


FROM node:16 AS server-build
WORKDIR /root
COPY ./ ./
COPY --from=ui-build usr/app/src/app/dist ./src/app/dist
# COPY package*.json ./
RUN npm install 
# COPY server.js .
CMD ["node", "server.js"]