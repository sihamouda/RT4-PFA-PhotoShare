start:
	docker compose --env-file .dev.env -f docker-compose.dev.yaml up --build
stop: 
	docker compose --env-file .dev.env -f docker-compose.dev.yaml down
destroy:
	docker compose --env-file .dev.env -f docker-compose.dev.yaml down -v
