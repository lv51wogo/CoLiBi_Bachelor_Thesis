FROM ubuntu:latest
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get -y install git nodejs npm --no-install-recommends  && rm -rf /var/lib/apt/lists/* 
### funktioniert nur wenn meine server.js Änderungen im Repo vorhanden sind, deshalb auskommentiert, bei änderung workdir anpassen
# RUN git clone https://github.com/lv51wogo/CoLiBi_Bachelor_Thesis.git
COPY ./ /usr/app  
WORKDIR /usr/app
RUN npm install
RUN npm run sequelize db:migrate && npm run sequelize db:seed:all
RUN cd src/app && npm install @angular/cli && npm run build && node_modules/.bin/ng build --configuration production
CMD ["node", "server.js"]