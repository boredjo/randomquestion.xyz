FROM node
WORKDIR /app
COPY . .
RUN npm install
#RUN npx run build
#RUN npx tsc
EXPOSE 300
CMD [ "node", "server.js" ]
