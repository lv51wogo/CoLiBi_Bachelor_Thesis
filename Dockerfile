FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install -y git nodejs npm
RUN git clone https://github.com/lv51wogo/CoLiBi_Bachelor_Thesis.git
RUN cd ./CoLiBi_Bachelor_Thesis/
RUN npm install

