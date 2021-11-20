FROM node:14-alpine
ENV NODE_ENV=development
ENV PORT=5000
ENV MONGO_DB_URL_PROD=mongodb+srv://urlshortener:urlshortener@cluster0.w2fdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV BASE_URL_PROD=https://shortify-url-api.herokuapp.com
ENV BASE_URL=http://localhost:5000
ENV MONGO_DB_URL_DEV=mongodb+srv://urlshortener:urlshortener@cluster0.w2fdq.mongodb.net/url-shortener-db?retryWrites=true&w=majority
ENV LOG_FILE=url-shortener.log
ENV LOG_LEVEL=info
ENV LOG_LABEL=url-shortener


WORKDIR /build/index

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 5000
RUN chown -R node /build/index
USER node
CMD ["npm", "start"]