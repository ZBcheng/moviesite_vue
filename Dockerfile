FROM daocloud.io/node
RUN mkdir /mv_vue
COPY . /mv_vue
WORKDIR /mv_vue
RUN npm config set registry "https://registry.npm.taobao.org/" \
    && npm install
RUN npm run serve
EXPOSE 8080
