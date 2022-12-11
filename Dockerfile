# build
FROM node as build 
WORKDIR /app
COPY . .
RUN npm install --global typescript
RUN npm install
RUN tsc --build
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# production build stage
FROM node:16-alpine as production 

WORKDIR /app 
COPY --from=build /app/package*.json ./  
RUN npm install 
COPY --from=build /app/dist ./dist

WORKDIR /app/frontend 
COPY --from=build /app/frontend/package*.json ./  
RUN npm install --omit=dev
COPY --from=build /app/frontend/build ./build

WORKDIR /app 
EXPOSE 3000  
CMD ["node", "dist/server.js"] 
