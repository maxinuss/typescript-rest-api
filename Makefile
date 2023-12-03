## Up
up:
	docker-compose up -d

## Down
down:
	docker-compose down

## Connect the backend container
backend:
	docker exec -it backend-api bash

##Connect to the db container
db:
	docker exec -it db-api bash

## Logs
logs:
	docker-compose logs -f