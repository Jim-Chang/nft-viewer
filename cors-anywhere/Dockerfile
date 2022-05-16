FROM node:14.17.6-slim

EXPOSE 8080
RUN npm install cors-anywhere@0.4.4
WORKDIR /app
COPY cors-anywhere.prod.js /app/cors-anywhere.prod.js
CMD ["node", "/app/cors-anywhere.prod.js"]
