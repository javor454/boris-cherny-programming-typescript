.PHONY: up down run
up:
	docker compose -f docker-compose.yml build && docker compose -f docker-compose.yml up -d
down:
	docker compose -f docker-compose.yml down --volumes
run:
	docker compose -f docker-compose.yml run --rm app npx ts-node src/$(file).ts
