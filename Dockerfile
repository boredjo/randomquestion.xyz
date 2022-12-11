FROM node
WORKDIR /app
COPY . .
RUN npm install --global typescript
RUN npm install
RUN tsc --build
WORKDIR /app/frontend
RUN npm install
RUN npm run build
WORKDIR /app/dist
EXPOSE 3000
CMD [ "node", "server.js" ]
