# Introduction 
A url shortener service

# Getting Started
- Visit the mini collection Docs here [https://documenter.getpostman.com/view/4898367/UVJWqKYx]

> Step 1 
- Clone the repo and cd into root dir.
> Step 2 
- Run `npm install`
> Step 3 
- Run `npm run dev` to start the server on your local machine

# TEST THE APPLICATION

> Step 1
- change NODE_ENV to 'test' in the .env file.
> Step 2
- Run `npm run test`
# RUN THE APPLICATION LOCALLY ON DOCKER
> Step 1 
- Run `npm install`
> Step 1 
- Run `npm run build`
> Step 2 
- Run `docker-compose up`


# RUN IT ON DOCKER VIA

-  docker run -it -p 5000:5000 --name url-api  quotech/urlshortenerapi:latest
___


