# NestJs Typescript Rest API

### Technologies involved
- [Nest](https://github.com/nestjs/nest) + Typescript
- Postgres + TypeORM
- [Docker](https://www.docker.com/get-started/Docker-compose)

### Description

[Nest](https://github.com/nestjs/nest)

### Installation
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [Docker Desktop](https://www.docker.com/get-started/Docker-compose)
- Create a folder in your machine to install projects (or go to folder you normally use)
- Clone this project ```git clone git@github.com:maxinuss/typescript-rest-api.git```
- Be sure to be in the project folder (where this Readme.md file is)
- Run ```make up``` (Linux & Mac) or ```docker-compose up -d```
- Run ```make logs``` (Linux & Mac) or ```docker-compose logs -f``` to check everything is up
- Access to the endpoints using the port 3503 configured in docker-compose.yml file.
- [Postman collection](https://github.com/maxinuss/typescript-rest-api/blob/main/NestJs%20Typescript%20Rest%20API.postman_collection.json)


### How to create database migrations
- Edit your entities in this case Product or Category. For example add a field in product to mark is this is an offer.
- Run ```make backend```(Linux & Mac) or ```docker exec -it backend-api bash``` to access to the Node container
- Run ```npm run migration:generate ./src/migrations/MIGRATION_NAME_HERE``` (ej: npm run migration:generate ./src/migrations/product-offer-field-added)
- Run ```npm run migration:run```
- Run ```exit``` to exit from the container.

### How to run the unit test
- Run ```make backend```(Linux & Mac) or ```docker exec -it backend-api bash``` to access to the Node container
- Run ```npm run test```
- Run ```exit``` to exit from the container.
